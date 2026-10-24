
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <>
      <main>
        <section className="hero">
          <img
            className="hero-image"
            src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=2200&q=90"
            alt="A peaceful lake surrounded by mountains"
          />
          <div className="hero-overlay" />

          <div className="hero-content">
            <div className="eyebrow hero-eyebrow">
              <span>✳</span> FOR THE CURIOUS SOUL
            </div>

            <h1>
              Take the road
              <br />
              <span>less ordinary.</span>
            </h1>

            <p className="hero-description">
              The little places. The local stories. The
              unexpected moments. Find the side of a
              destination most people miss.
            </p>

            <button
              className="hero-button"
              onClick={() => navigate("/discover")}
            >
              Find your somewhere <span>↗</span>
            </button>

            <div className="hero-note">
              <span className="note-star">✳</span>
              Not just places to go. Stories to find.
            </div>
          </div>

          <div className="hero-caption">
            <span>01 / FOLLOW YOUR CURIOSITY</span>
            <span>THE WORLD IS FULL OF LITTLE WONDERS ↗</span>
          </div>
        </section>

        <section className="intro-section" id="about">
          <div className="intro-label">
            <span className="tiny-star">✳</span>
            A DIFFERENT KIND OF TRAVEL GUIDE
          </div>

          <div className="intro-content">
            <h2>
              The best discoveries
              <br />
              <span>aren't always on the map.</span>
            </h2>

            <p>
              A tucked-away café. A maker keeping an old craft alive.
              A trail with a view worth the detour. We're here for
              the places that make you feel like you found something
              special.
            </p>
          </div>

          <div className="intro-bottom">
            <span>LESS TOURISTY. MORE YOU.</span>
            <span>SCROLL A LITTLE. DISCOVER A LOT. ↓</span>
          </div>
        </section>

        <section className="intro-section">
          <div className="intro-label">
            <span className="tiny-star">✳</span>
            YOUR NEXT ADVENTURE STARTS HERE
          </div>

          <div className="intro-content">
            <h2>
              Follow your curiosity.
              <br />
              <span>Find your somewhere.</span>
            </h2>

            <p>
              Explore local food, nature, culture, and artisans.
              Find a place that speaks to you, save your favourites,
              and share hidden gems with other curious explorers.
            </p>

            <button
              className="hero-button"
              onClick={() => navigate("/discover")}
            >
              Explore hidden gems <span>↗</span>
            </button>
          </div>
        </section>
      </main>
    </>
  );
}

export default Home;
