/* At least 20 additional films for every genre filter. */
(function () {
  "use strict";

  const filmsByGenre = {
    "Acción": [
      ["Misión: Imposible - Fallout", 2018], ["The Matrix Reloaded", 2003], ["Terminator 2: El juicio final", 1991],
      ["Kill Bill: Volumen 1", 2003], ["Los Vengadores", 2012], ["Iron Man", 2008], ["Capitán América: El Soldado del Invierno", 2014],
      ["Logan", 2017], ["Gladiator II", 2024], ["The Raid", 2011], ["Casino Royale", 2006],
      ["Duro de matar", 1988], ["Misión: Imposible - Protocolo fantasma", 2011], ["Rápidos y furiosos 5in Control", 2011],
      ["X-Men: Días del futuro pasado", 2014], ["El tigre y el dragón", 2000], ["Al filo del mañana", 2014],
      ["Kingsman: El servicio secreto", 2014], ["El protegido", 2000], ["Tron: Legacy", 2010]
    ],
    "Aventura": [
      ["Indiana Jones: En busca del arca perdida", 1981], ["Piratas del Caribe: La maldición del Perla Negra", 2003], ["El Hobbit: Un viaje inesperado", 2012],
      ["La princesa Mononoke", 1997], ["Up: Una aventura de altura", 2009], ["Ratatouille", 2007],
      ["La vida de Pi", 2012], ["Jumanji: En la selva", 2017], ["Kubo y la búsqueda samurái", 2016],
      ["El castillo ambulante", 2004], ["Las crónicas de Narnia: El león, la bruja y el ropero", 2005], ["La máscara del Zorro", 1998],
      ["El planeta del tesoro", 2002], ["Moana: Un mar de aventuras", 2016], ["Náufrago", 2000],
      ["La brújula dorada", 2007], ["Dora y la ciudad perdida", 2019], ["El libro de la selva", 2016],
      ["Viaje al centro de la Tierra", 2008], ["Las aventuras de Tintín", 2011]
    ],
    "Ciencia ficción": [
      ["Blade Runner 2049", 2017], ["La llegada", 2016], ["Blade Runner", 1982],
      ["Star Wars: Una nueva esperanza", 1977], ["Star Wars: El imperio contraataca", 1980], ["Alien: El octavo pasajero", 1979],
      ["E.T., el extraterrestre", 1982], ["Volver al futuro", 1985], ["2001: Odisea del espacio", 1968],
      ["Her", 2013], ["Ex Machina", 2014], ["Distrito 9", 2009],
      ["El planeta de los simios: (R)evolución", 2011], ["Minority Report", 2002], ["Looper: Asesinos del futuro", 2012],
      ["El quinto elemento", 1997], ["Hijos de los hombres", 2006], ["Todo en todas partes al mismo tiempo", 2022],
      ["Contact", 1997], ["Star Trek", 2009]
    ],
    "Drama": [
      ["Sueños de libertad", 1994], ["Forrest Gump", 1994], ["La lista de Schindler", 1993],
      ["En busca de la felicidad", 2006], ["El club de la pelea", 1999], ["Mujercitas", 2019],
      ["El discurso del rey", 2010], ["Una mente brillante", 2001], ["Moonlight", 2016],
      ["Manchester frente al mar", 2016], ["El curioso caso de Benjamin Button", 2008], ["Los infiltrados", 2006],
      ["El renacido", 2015], ["El pianista", 2002], ["Amores perros", 2000],
      ["Roma", 2018], ["Nomadland", 2020], ["El gran hotel Budapest", 2014],
      ["Bajo la misma estrella", 2014], ["El lado bueno de las cosas", 2012]
    ],
    "Animación": [
      ["WALL·E", 2008], ["Los increíbles", 2004], ["Los increíbles 2", 2018],
      ["Monsters, Inc.", 2001], ["Shrek", 2001], ["Shrek 2", 2004],
      ["Kung Fu Panda", 2008], ["Kung Fu Panda 2", 2011], ["Zootopia", 2016],
      ["Frozen: Una aventura congelada", 2013], ["Mi vecino Totoro", 1988], ["El castillo en el cielo", 1986],
      ["El niño y la garza", 2023], ["La tumba de las luciérnagas", 1988], ["Coraline y la puerta secreta", 2009],
      ["El cadáver de la novia", 2005], ["Lluvia de hamburguesas", 2009], ["Megamente", 2010],
      ["La era de hielo", 2002], ["Madagascar", 2005]
    ],
    "Comedia": [
      ["El gran Lebowski", 1998], ["¿Qué pasó ayer?", 2009], ["Damas en guerra", 2011],
      ["Supercool", 2007], ["Un príncipe en Nueva York", 1988], ["Día de la marmota", 1993],
      ["Legalmente rubia", 2001], ["Escuela de rock", 2003], ["Pequeña Miss Sunshine", 2006],
      ["El diario de Bridget Jones", 2001], ["Jojo Rabbit", 2019], ["Palm Springs", 2020],
      ["La muerte de Stalin", 2017], ["¿Y dónde está el policía?", 1988], ["Los cazafantasmas", 1984],
      ["Un lugar llamado Notting Hill", 1999], ["Tropic Thunder", 2008], ["La boda de mi mejor amigo", 1997],
      ["Paddington 2", 2017], ["El diablo viste a la moda", 2006]
    ],
    "Suspenso": [
      ["Seven: Los siete pecados capitales", 1995], ["El silencio de los inocentes", 1991], ["Perdida", 2014],
      ["Prisioneros", 2013], ["Zodiac", 2007], ["La isla siniestra", 2010],
      ["El cisne negro", 2010], ["El juego", 1997], ["Sicario", 2015],
      ["Fragmentado", 2016], ["El sexto sentido", 1999], ["La ventana indiscreta", 1954],
      ["Psicosis", 1960], ["Memento", 2000], ["El secreto de sus ojos", 2009],
      ["Nocturnal Animals", 2016], ["Un lugar en silencio", 2018], ["La invitación", 2015],
      ["El talentoso señor Ripley", 1999], ["La chica del tren", 2016]
    ]
  };

  const normalize = (title) => title.toLocaleLowerCase("es").normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  const existingByTitle = new Map(movies.map((movie) => [normalize(movie.title), movie]));
  let nextId = Math.max(...movies.map((movie) => movie.id)) + 1;

  Object.entries(filmsByGenre).forEach(([genre, films]) => {
    films.forEach(([title, year]) => {
      const existing = existingByTitle.get(normalize(title));
      if (existing) {
        if (!existing.genres.includes(genre)) existing.genres.push(genre);
        return;
      }

      const movie = {
        id: nextId++,
        title,
        year,
        rating: null,
        duration: "No disponible",
        genres: [genre],
        poster: posterFallback(title),
        backdrop: posterFallback(title),
        overview: `${title} forma parte de nuestra selección de ${genre.toLocaleLowerCase("es")}. Abre la ficha para consultar la información disponible.`,
        director: "Información no disponible",
        cast: "Información no disponible"
      };
      movies.push(movie);
      existingByTitle.set(normalize(title), movie);
    });
  });

  // Cada categoría muestra hasta 20 películas desde el primer clic; el botón
  // «Explorar más» permite continuar con el resto del catálogo.
  const baseRenderMovies = renderMovies;
  renderMovies = function () {
    const filtered = getFilteredMovies();
    const visible = filtered.slice(0, visibleCount);
    const query = searchInput.value.trim();
    resultsTitle.textContent = favoritesOnly
      ? "Tu colección personal"
      : query
        ? "Resultados de búsqueda"
        : activeGenre === "Todas"
          ? "Películas para descubrir"
          : activeGenre;
    resultsCount.textContent = `${filtered.length} ${filtered.length === 1 ? "película" : "películas"}`;
    emptyState.hidden = filtered.length !== 0;
    movieGrid.hidden = filtered.length === 0;
    loadMoreButton.hidden = visible.length >= filtered.length;

    movieGrid.innerHTML = visible.map((movie) => {
      const isFavorite = favorites.has(movie.id);
      const ratingLabel = Number.isFinite(movie.rating) ? `★ ${movie.rating.toFixed(1)}` : "★ Sin valoración";
      return `
        <article class="movie-card" data-id="${movie.id}">
          <div class="poster-wrap" data-action="details" data-id="${movie.id}"
               tabindex="0" role="button" aria-label="Ver información de ${escapeHTML(movie.title)}">
            <img class="poster-image" src="${escapeHTML(movie.poster)}"
                 alt="Póster de ${escapeHTML(movie.title)}" loading="lazy"
                 data-fallback="${escapeHTML(movie.title)}">
            <div class="poster-gradient"></div>
            <span class="movie-rating">${ratingLabel}</span>
            <button class="favorite-btn ${isFavorite ? "is-favorite" : ""}"
                    data-action="favorite" data-id="${movie.id}"
                    aria-label="${isFavorite ? "Quitar de" : "Añadir a"} favoritos"
                    aria-pressed="${isFavorite}" title="${isFavorite ? "Quitar de favoritos" : "Añadir a favoritos"}">
              ${isFavorite ? "♥" : "♡"}
            </button>
            <span class="card-play" aria-hidden="true">▶</span>
          </div>
          <div class="card-info">
            <h3 class="card-title" data-action="details" data-id="${movie.id}" tabindex="0">${escapeHTML(movie.title)}</h3>
            <div class="card-meta"><span class="card-genre">${escapeHTML(movieGenreLabel(movie))}</span><span class="card-year">${movie.year}</span></div>
            <p class="card-overview">${escapeHTML(movie.overview)}</p>
            <div class="card-actions">
              <button class="card-action card-action-primary" type="button" data-action="details" data-id="${movie.id}">Ver detalles</button>
              <button class="card-action" type="button" data-action="trailer" data-id="${movie.id}" aria-label="Ver tráiler de ${escapeHTML(movie.title)}">▶ Tráiler</button>
            </div>
          </div>
        </article>`;
    }).join("");
  };

  // No inventar puntuaciones en las fichas de películas sin valoración.
  const baseOpenMovieDetails = openMovieDetails;
  openMovieDetails = function (id) {
    const movie = getMovie(id);
    const hasRating = movie && Number.isFinite(movie.rating);
    if (!hasRating) {
      movie.rating = 0;
      baseOpenMovieDetails(id);
      movie.rating = null;
      const firstMeta = document.querySelector("#dialogMeta span");
      if (firstMeta) firstMeta.textContent = "★ Sin valoración";
      return;
    }
    baseOpenMovieDetails(id);
  };

  // Interceptar el clic después del filtro original para renderizar 20 tarjetas.
  genreFilters.addEventListener("click", (event) => {
    if (!event.target.closest("[data-genre]")) return;
    visibleCount = 20;
    window.setTimeout(refreshCatalog, 0);
  });

  // El botón de navegación superior activa el filtro y mantiene el mismo mínimo.
  document.querySelectorAll("[data-genre-link]").forEach((link) => {
    link.addEventListener("click", () => {
      visibleCount = 20;
      window.setTimeout(refreshCatalog, 0);
    });
  });

  // Mantener la referencia para que el catálogo use la versión extendida.
  void baseRenderMovies;
  visibleCount = 20;
  refreshCatalog();
})();
