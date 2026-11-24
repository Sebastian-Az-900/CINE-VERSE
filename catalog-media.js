/* Resolve missing catalog posters and provide a working trailer fallback. */
(function () {
  "use strict";

  const imageCache = new Map();
  const pending = new Map();
  const normalize = (value) => String(value || "").toLocaleLowerCase("es").normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  async function lookupPoster(title) {
    const key = normalize(title);
    if (imageCache.has(key)) return imageCache.get(key);
    if (pending.has(key)) return pending.get(key);

    const task = (async () => {
      for (const language of ["es", "en"]) {
        try {
          const params = new URLSearchParams({
            action: "query", generator: "search", gsrsearch: title,
            gsrnamespace: "0", gsrlimit: "5", prop: "pageimages",
            piprop: "thumbnail", pithumbsize: "600", format: "json", origin: "*"
          });
          const response = await fetch(`https://${language}.wikipedia.org/w/api.php?${params}`);
          if (!response.ok) continue;
          const data = await response.json();
          const pages = Object.values(data.query?.pages || {}).sort((a, b) => (a.index || 0) - (b.index || 0));
          const result = pages.find((page) => page.thumbnail?.source)?.thumbnail?.source || null;
          if (result) {
            imageCache.set(key, result);
            return result;
          }
        } catch { /* Continue with the next language and keep the local fallback. */ }
      }
      imageCache.set(key, null);
      return null;
    })().finally(() => pending.delete(key));

    pending.set(key, task);
    return task;
  }

  function movieForImage(image) {
    const card = image.closest(".movie-card");
    return card ? movies.find((movie) => movie.id === Number(card.dataset.id)) : null;
  }

  async function repairPoster(image) {
    if (!image || image.dataset.mediaLookup === "started") return;
    const movie = movieForImage(image);
    if (!movie) return;
    const isLocalFallback = image.currentSrc.startsWith("data:image/") || movie.poster.startsWith("data:image/");
    if (!isLocalFallback && image.dataset.mediaLookup !== "failed") return;

    image.dataset.mediaLookup = "started";
    const result = await lookupPoster(movie.title);
    if (result && image.isConnected) {
      image.src = result;
      image.dataset.mediaLookup = "loaded";
    } else if (image.isConnected) {
      image.dataset.mediaLookup = "unavailable";
      image.classList.add("poster-unavailable");
    }
  }

  function scanPosters() {
    document.querySelectorAll("#movieGrid .poster-image").forEach((image) => {
      const movie = movieForImage(image);
      if (movie && (movie.poster.startsWith("data:image/") || image.dataset.mediaLookup === "failed")) {
        repairPoster(image);
      }
    });
  }

  // Image errors from the base script get a local SVG fallback; check the
  // resolved movie image afterwards and replace local fallbacks with real art.
  document.addEventListener("error", (event) => {
    const image = event.target;
    if (!(image instanceof HTMLImageElement) || !image.matches("#movieGrid .poster-image")) return;
    image.dataset.mediaLookup = "failed";
    window.setTimeout(() => repairPoster(image), 0);
  }, true);

  const grid = document.querySelector("#movieGrid");
  new MutationObserver(scanPosters).observe(grid, { childList: true });
  scanPosters();

  // Category additions do not have verified YouTube IDs. Send those buttons to
  // YouTube's title search instead of showing a dead/missing-trailer message.
  const originalPlayTrailer = playTrailer;
  playTrailer = function (id) {
    const movie = getMovie(id);
    if (!movie) return;
    if (typeof movie.trailer === "string" && /^[a-zA-Z0-9_-]{11}$/.test(movie.trailer)) {
      return originalPlayTrailer(id);
    }
    const query = encodeURIComponent(`${movie.title} ${movie.year} tráiler oficial`);
    const opened = window.open(`https://www.youtube.com/results?search_query=${query}`, "_blank", "noopener,noreferrer");
    if (!opened) showToast("El navegador bloqueó la pestaña. Busca el tráiler en YouTube.");
  };
})();
