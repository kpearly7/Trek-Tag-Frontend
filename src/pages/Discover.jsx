
import { useState } from "react";

const categories = [
  "All places",
  "Food",
  "Nature",
  "Culture",
  "Artisans",
  "Eco-friendly",
];

function Discover({
  places,
  loading,
  apiError,
  favorites,
  toggleFavorite,
}) {
  const [category, setCategory] = useState("All places");
  const [search, setSearch] = useState("");

  const filteredPlaces = places.filter((place) => {
    const matchesCategory =
      category === "All places" ||
      (category === "Eco-friendly"
        ? place.ecoFriendly
        : place.category === category);

    const term = search.toLowerCase();

    const matchesSearch =
      place.name.toLowerCase().includes(term) ||
      place.location.toLowerCase().includes(term) ||
      place.category.toLowerCase().includes(term) ||
      place.description.toLowerCase().includes(term);

    return matchesCategory && matchesSearch;
  });

  return (
    <main>
      <section className="discover-section" id="discover">
        <div className="section-heading">
          <div>
            <div className="eyebrow dark-eyebrow">
              <span>✳</span> YOUR NEXT LITTLE ADVENTURE
            </div>
            <h2>
              Good places. <span>Great stories.</span>
            </h2>
            <p>Somewhere new is closer than you think.</p>
          </div>

          <span className="places-count">
            {filteredPlaces.length.toString().padStart(2, "0")} FINDS
          </span>
        </div>

        <div className="search-box">
          <span className="search-icon">⌕</span>
          <input
            type="search"
            placeholder="Try food, nature, culture, Hyderabad..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            aria-label="Search destinations"
          />

          {search && (
            <button
              className="clear-search"
              onClick={() => setSearch("")}
              aria-label="Clear search"
            >
              ×
            </button>
          )}

          <span className="search-hint">
            SEARCH YOUR NEXT FIND ↵
          </span>
        </div>

        <div className="category-row">
          <div className="category-filters">
            {categories.map((item) => (
              <button
                key={item}
                className={`category-chip ${
                  category === item ? "selected" : ""
                }`}
                onClick={() => setCategory(item)}
              >
                {item === "All places" ? "✳" : "↗"} {item}
              </button>
            ))}
          </div>

          <span className="filter-note">
            HANDPICKED INSPIRATION
          </span>
        </div>

        {loading ? (
          <div className="empty-state">
            <h3>Finding your little wonders...</h3>
            <p>Loading destinations from Trek & Tag.</p>
          </div>
        ) : apiError ? (
          <div className="empty-state">
            <h3>We couldn't load the destinations.</h3>
            <p>{apiError}</p>
            <button
              className="hero-button"
              onClick={() => window.location.reload()}
            >
              Try again ↗
            </button>
          </div>
        ) : filteredPlaces.length > 0 ? (
          <div className="places-grid">
            {filteredPlaces.map((place, index) => (
              <article className="place-card" key={place.id}>
                <div className="place-image-wrap">
                  <img
                    className="place-image"
                    src={place.image}
                    alt={place.name}
                    loading="lazy"
                  />

                  <span className="place-tag">{place.tag}</span>

                  <button
                    className={`heart-button ${
                      favorites.includes(place.id)
                        ? "is-favorite"
                        : ""
                    }`}
                    onClick={() => toggleFavorite(place.id)}
                    aria-label={
                      favorites.includes(place.id)
                        ? "Remove from saved places"
                        : "Save place"
                    }
                  >
                    {favorites.includes(place.id) ? "♥" : "♡"}
                  </button>

                  <span className="image-index">
                    {String(index + 1).padStart(2, "0")} / A FIND WORTH KEEPING
                  </span>
                </div>

                <div className="place-info">
                  <div className="place-meta">
                    <span>{place.category.toUpperCase()}</span>
                    <span>◷ {place.time || "Explore at your pace"}</span>
                  </div>

                  <h3>{place.name}</h3>

                  <div className="place-location">
                    <span>↗</span> {place.location}
                  </div>

                  <p>{place.description}</p>

                  <button
                    className="place-link"
                    onClick={() =>
                      window.alert(
                        `${place.name}\n\n${place.description}\n\nLocation: ${place.location}\nCategory: ${place.category}`
                      )
                    }
                  >
                    GET CURIOUS <span>↗</span>
                  </button>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <span>✳</span>
            <h3>No little wonders found just yet.</h3>
            <p>Try another search or explore all places.</p>

            <button
              className="hero-button"
              onClick={() => {
                setSearch("");
                setCategory("All places");
              }}
            >
              Show all places ↗
            </button>
          </div>
        )}

        <div className="discover-bottom">
          <span>GOOD THINGS HAPPEN OFF THE BEATEN PATH.</span>
          <span>YOU'VE SEEN {filteredPlaces.length} OF OUR FINDS ✳</span>
        </div>
      </section>
    </main>
  );
}

export default Discover;
