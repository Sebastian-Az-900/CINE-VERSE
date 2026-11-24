/* Add complementary catalog content and interactions to the base CineVerse page. */
(function () {
  "use strict";

  const extraMovies = [
    {
      id: 26,
      title: "Spider-Man: A través del Spider-Verso",
      year: 2023,
      rating: 8.6,
      duration: "2h 20min",
      genres: ["Animación", "Acción", "Aventura"],
      poster: "https://image.tmdb.org/t/p/w500/8Vt6mWEReuy4Of61Lnj5Xj?format=jpg",
      backdrop: "https://image.tmdb.org/t/p/original/4HodYYKEIsGOdinkGi2Ucz6X9i0.jpg",
      overview: "Miles Morales regresa para una nueva aventura que lo lleva a encontrarse con héroes arácnidos de otros universos.",
      trailer: "cqGjhVJWtEg",
      director: "Joaquim Dos Santos, Kemp Powers y Justin K. Thompson",
      cast: "Shameik Moore, Hailee Steinfeld, Brian Tyree Henry"
    },
    {
      id: 27,
      title: "Buscando a Nemo",
      year: 2003,
      rating: 8.2,
      duration: "1h 40min",
      genres: ["Animación", "Aventura", "Comedia"],
      poster: "https://image.tmdb.org/t/p/w500/eHuGQ10FUzK1mdOY69wF5pGgEf5.jpg",
      backdrop: "https://image.tmdb.org/t/p/original/2CzKkQ3J2aS5K7yM5pN3Q6mV9dP.jpg",
      overview: "Un pez payaso cruza el océano junto a Dory para encontrar a su hijo Nemo, perdido en una aventura inolvidable.",
      trailer: "wZdpNglLbt8",
      director: "Andrew Stanton",
      cast: "Albert Brooks, Ellen DeGeneres, Alexander Gould"
    },
    {
      id: 28,
      title: "Toy Story",
      year: 1995,
      rating: 8.3,
      duration: "1h 21min",
      genres: ["Animación", "Aventura", "Comedia"],
      poster: "https://image.tmdb.org/t/p/w500/uXDfjJbdP4ijW5hWSBrPrlKpxab.jpg",
      backdrop: "https://image.tmdb.org/t/p/original/3Rfvhy1Nl6sSGJwyjb0QiZzZYlB.jpg",
      overview: "Cuando llega un nuevo juguete a la habitación de Andy, Woody y sus amigos descubren que la amistad puede superar cualquier rivalidad.",
      trailer: "KYz2wyBy3kc",
      director: "John Lasseter",
      cast: "Tom Hanks, Tim Allen, Don Rickles"
    },
    {
      id: 29,
      title: "Cómo entrenar a tu dragón",
      year: 2010,
      rating: 8.1,
      duration: "1h 38min",
      genres: ["Animación", "Aventura", "Acción"],
      poster: "https://image.tmdb.org/t/p/w500/ygGmAO60t8B8PqMioaXzQY0B2pz.jpg",
      backdrop: "https://image.tmdb.org/t/p/original/6bDL4e8xun7dCwM3x4TgJwFqj7b.jpg",
      overview: "Hipo, un joven vikingo, cambia la historia de su pueblo al crear un vínculo inesperado con un dragón llamado Chimuelo.",
      trailer: "oKiYuIsPxYk",
      director: "Dean DeBlois y Chris Sanders",
      cast: "Jay Baruchel, Gerard Butler, America Ferrera"
    },
    {
      id: 30,
      title: "El viaje de Arlo",
      year: 2015,
      rating: 6.7,
      duration: "1h 33min",
      genres: ["Animación", "Aventura"],
      poster: "https://image.tmdb.org/t/p/w500/8MhoRj5qQ1XwJx8Y4Y8t4b4M2Q.jpg",
      backdrop: "https://image.tmdb.org/t/p/original/8q1L7Y5G4B5wL8bW1gS6e5x4K2.jpg",
      overview: "Un joven dinosaurio y un niño humano recorren juntos una tierra salvaje mientras descubren el valor de la familia y la amistad.",
      trailer: "1F3hm6MfR1k",
      director: "Peter Sohn",
      cast: "Raymond Ochoa, Jack Bright, Jeffrey Wright"
    },
    {
      id: 31,
      title: "Encanto",
      year: 2021,
      rating: 7.2,
      duration: "1h 42min",
      genres: ["Animación", "Aventura", "Comedia"],
      poster: "https://image.tmdb.org/t/p/w500/4j0PNHkMr5ax3IA8xTh0g2CM.jpg",
      backdrop: "https://image.tmdb.org/t/p/original/4j0PNHkMr5ax3IA8xTh0g2CM.jpg",
      overview: "Mirabel es la única persona sin un don mágico en su familia, pero quizá sea precisamente quien pueda salvar la magia de Encanto.",
      trailer: "CaimKeDcudo",
      director: "Jared Bush y Byron Howard",
      cast: "Stephanie Beatriz, María Cecilia Botero, John Leguizamo"
    }
  ];

  movies.push(...extraMovies);

  // Renderizar tarjetas más completas con sinopsis y accesos rápidos.
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
      return `
        <article class="movie-card" data-id="${movie.id}">
          <div class="poster-wrap" data-action="details" data-id="${movie.id}"
               tabindex="0" role="button"
               aria-label="Ver información de ${escapeHTML(movie.title)}">
            <img class="poster-image" src="${escapeHTML(movie.poster)}"
                 alt="Póster de ${escapeHTML(movie.title)}" loading="lazy"
                 data-fallback="${escapeHTML(movie.title)}">
            <div class="poster-gradient"></div>
            <span class="movie-rating">★ ${movie.rating.toFixed(1)}</span>
            <button class="favorite-btn ${isFavorite ? "is-favorite" : ""}"
                    data-action="favorite" data-id="${movie.id}"
                    aria-label="${isFavorite ? "Quitar de" : "Añadir a"} favoritos"
                    aria-pressed="${isFavorite}"
                    title="${isFavorite ? "Quitar de favoritos" : "Añadir a favoritos"}">
              ${isFavorite ? "♥" : "♡"}
            </button>
            <span class="card-play" aria-hidden="true">▶</span>
          </div>
          <div class="card-info">
            <h3 class="card-title" data-action="details" data-id="${movie.id}"
                tabindex="0">${escapeHTML(movie.title)}</h3>
            <div class="card-meta">
              <span class="card-genre">${escapeHTML(movieGenreLabel(movie))}</span>
              <span class="card-year">${movie.year}</span>
            </div>
            <p class="card-overview">${escapeHTML(movie.overview)}</p>
            <div class="card-actions">
              <button class="card-action card-action-primary" type="button"
                      data-action="details" data-id="${movie.id}">Ver detalles</button>
              <button class="card-action" type="button" data-action="trailer"
                      data-id="${movie.id}" aria-label="Ver tráiler de ${escapeHTML(movie.title)}">▶ Tráiler</button>
            </div>
          </div>
        </article>`;
    }).join("");
  };

  // Abrir el tráiler directamente desde cada tarjeta.
  movieGrid.addEventListener("click", (event) => {
    const trailerButton = event.target.closest('[data-action="trailer"]');
    if (!trailerButton) return;
    event.preventDefault();
    event.stopPropagation();
    playTrailer(trailerButton.dataset.id);
  });

  // Carrusel de portada: botones, indicadores accesibles y avance automático.
  const pagination = document.querySelector("#heroPagination");
  const heroIds = [1, 3, 18];
  pagination.innerHTML = heroIds.map((_, index) => `
    <button class="pagination-line ${index === 0 ? "active" : ""}"
            type="button" data-hero="${index}"
            aria-label="Mostrar película destacada ${index + 1}"
            aria-current="${index === 0 ? "true" : "false"}"></button>
  `).join("");

  let carouselTimer;
  const restartCarousel = () => {
    window.clearInterval(carouselTimer);
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      carouselTimer = window.setInterval(() => renderHero(heroIndex + 1), 7000);
    }
  };

  document.querySelector("#heroPrev").addEventListener("click", () => {
    renderHero(heroIndex - 1);
    restartCarousel();
  });
  document.querySelector("#heroNext").addEventListener("click", () => {
    renderHero(heroIndex + 1);
    restartCarousel();
  });
  pagination.addEventListener("click", (event) => {
    const button = event.target.closest("[data-hero]");
    if (!button) return;
    renderHero(Number(button.dataset.hero));
    restartCarousel();
  });

  const originalRenderHero = renderHero;
  renderHero = function (index = 0) {
    originalRenderHero(index);
    pagination.querySelectorAll("[data-hero]").forEach((button, buttonIndex) => {
      const active = buttonIndex === heroIndex;
      button.classList.toggle("active", active);
      button.setAttribute("aria-current", String(active));
    });
  };

  // Al iniciar, actualizar los indicadores, mostrar el catálogo ampliado.
  renderHero(0);
  refreshCatalog();
  restartCarousel();
})();
