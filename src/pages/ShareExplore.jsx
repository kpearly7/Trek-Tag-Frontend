
import { useState } from "react";

function ShareExplore({
  places,
  favorites,
  formData,
  setFormData,
  handleSubmitPlace,
  submitting,
  submitMessage,
}) {
  const [activeSection, setActiveSection] = useState("share");

  const savedPlaces = places.filter((place) =>
    favorites.includes(place.id)
  );

  return (
    <main>
      <section className="discover-section">
        <div className="section-heading">
          <div>
            <div className="eyebrow dark-eyebrow">
              <span>✳</span> YOUR LITTLE CORNER OF TREK & TAG
            </div>
            <h2>
              Share more. <span>Discover more.</span>
            </h2>
            <p>
              Great discoveries get even better when they're shared.
            </p>
          </div>
        </div>

        <div className="category-filters">
          <button
            className={`category-chip ${
              activeSection === "share" ? "selected" : ""
            }`}
            onClick={() => setActiveSection("share")}
          >
            ↗ Share a hidden gem
          </button>

          <button
            className={`category-chip ${
              activeSection === "saved" ? "selected" : ""
            }`}
            onClick={() => setActiveSection("saved")}
          >
            ♡ Saved places ({savedPlaces.length})
          </button>

          <button
            className={`category-chip ${
              activeSection === "ai" ? "selected" : ""
            }`}
            onClick={() => setActiveSection("ai")}
          >
            ✳ AI Travel Match
          </button>
        </div>
      </section>

      {activeSection === "share" && (
        <section className="submit-section" id="submit">
          <div>
            <div className="eyebrow dark-eyebrow">
              <span>✳</span> KNOW A PLACE WE SHOULD KNOW?
            </div>

            <h2>
              Good finds are <span>meant to be shared.</span>
            </h2>

            <p>
              Help a local gem get discovered. Share the places
              you wish more people knew about.
            </p>
          </div>

          <form
            className="place-submit-form"
            onSubmit={handleSubmitPlace}
          >
            <input
              required
              placeholder="Place name"
              value={formData.name}
              onChange={(event) =>
                setFormData({
                  ...formData,
                  name: event.target.value,
                })
              }
            />

            <input
              required
              placeholder="Location"
              value={formData.location}
              onChange={(event) =>
                setFormData({
                  ...formData,
                  location: event.target.value,
                })
              }
            />

            <select
              value={formData.category}
              onChange={(event) =>
                setFormData({
                  ...formData,
                  category: event.target.value,
                })
              }
            >
              <option value="Food">Food</option>
              <option value="Nature">Nature</option>
              <option value="Culture">Culture</option>
              <option value="Artisans">Artisans</option>
              <option value="Eco-friendly">Eco-friendly</option>
            </select>

            <textarea
              required
              placeholder="Tell us what makes this place special..."
              value={formData.description}
              onChange={(event) =>
                setFormData({
                  ...formData,
                  description: event.target.value,
                })
              }
            />

            <input
              type="url"
              placeholder="Image URL (optional)"
              value={formData.imageUrl}
              onChange={(event) =>
                setFormData({
                  ...formData,
                  imageUrl: event.target.value,
                })
              }
            />

            <label>
              <input
                type="checkbox"
                checked={formData.ecoFriendly}
                onChange={(event) =>
                  setFormData({
                    ...formData,
                    ecoFriendly: event.target.checked,
                  })
                }
              />
              This place is eco-friendly
            </label>

            <button
              className="submit-button"
              type="submit"
              disabled={submitting}
            >
              {submitting
                ? "Submitting..."
                : "Share your hidden gem ↗"}
            </button>

            {submitMessage && (
              <p role="status">{submitMessage}</p>
            )}
          </form>
        </section>
      )}

      {activeSection === "saved" && (
        <section className="discover-section">
          <div className="section-heading">
            <div>
              <div className="eyebrow dark-eyebrow">
                <span>♡</span> YOUR PERSONAL COLLECTION
              </div>
              <h2>
                Little places. <span>Kept close.</span>
              </h2>
              <p>Your favourite discoveries, all in one place.</p>
            </div>
          </div>

          {savedPlaces.length === 0 ? (
            <div className="empty-state">
              <span>♡</span>
              <h3>Your collection starts here.</h3>
              <p>
                Visit Discover and tap the heart on any place
                you'd like to save.
              </p>
            </div>
          ) : (
            <div className="places-grid">
              {savedPlaces.map((place) => (
                <article className="place-card" key={place.id}>
                  <div className="place-image-wrap">
                    <img
                      className="place-image"
                      src={place.image || place.imageUrl}
                      alt={place.name}
                      loading="lazy"
                    />
                  </div>

                  <div className="place-info">
                    <div className="place-meta">
                      <span>{place.category.toUpperCase()}</span>
                    </div>
                    <h3>{place.name}</h3>
                    <div className="place-location">
                      ↗ {place.location}
                    </div>
                    <p>{place.description}</p>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      )}

      {activeSection === "ai" && (
        <section className="submit-section">
          <div>
            <div className="eyebrow dark-eyebrow">
              <span>✳</span> YOUR NEXT ADVENTURE, PERSONALised
            </div>

            <h2>
              Meet your <span>AI Travel Match.</span>
            </h2>

            <p>
              Tell Trek & Tag what you're in the mood for —
              peaceful nature trails, local food, creative
              communities, or something unexpected.
            </p>

            <p>
              We're setting up personalised recommendations here.
              The AI feature will be connected in a later step.
            </p>
          </div>
        </section>
      )}
    </main>
  );
}

export default ShareExplore;
