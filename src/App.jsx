
import { useState, useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  NavLink,
  Link,
  Navigate,
} from "react-router-dom";

import Home from "./pages/Home.jsx";
import Discover from "./pages/Discover.jsx";
import ShareExplore from "./pages/ShareExplore.jsx";
import Auth from "./pages/Auth.jsx";

function App() {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState("");

  const [favorites, setFavorites] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    location: "",
    category: "Food",
    description: "",
    imageUrl: "",
    ecoFriendly: false,
  });

  const [submitMessage, setSubmitMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetch("https://trek-tag-backend.onrender.com")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Could not load destinations from the server.");
        }
        return response.json();
      })
      .then((data) => {
        const formattedPlaces = data.map((place) => ({
          ...place,
          image:
            place.imageUrl ||
            "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=1000&q=80",
          tag: place.ecoFriendly
            ? "CONSCIOUS FIND"
            : `${place.category.toUpperCase()} DISCOVERY`,
          time: "Explore at your pace",
        }));

        setPlaces(formattedPlaces);
      })
      .catch((error) => {
        setApiError(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  function toggleFavorite(id) {
    setFavorites((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    );
  }

  async function handleSubmitPlace(event) {
    event.preventDefault();
    setSubmitting(true);
    setSubmitMessage("");

    try {
      const response = await fetch(
        "https://trek-tag-backend.onrender.com",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        const errorDetails = await response.text();
        throw new Error(
          errorDetails || `Server returned error ${response.status}`
        );
      }

      setSubmitMessage(
        "Your hidden gem was submitted for approval!"
      );

      setFormData({
        name: "",
        location: "",
        category: "Food",
        description: "",
        imageUrl: "",
        ecoFriendly: false,
      });
    } catch (error) {
      console.error("Place submission failed:", error);

      setSubmitMessage(
        `Submission failed: ${error.message}. Check the backend terminal for details.`
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <BrowserRouter>
      <div className="app">
        <nav className="navbar">
          <Link
            className="brand"
            to="/"
            aria-label="Trek and Tag home"
          >
            <span className="brand-icon">✳</span>
            <span>
              trek<span className="brand-amp">&</span>tag
            </span>
          </Link>

          <div className="nav-links">
            <NavLink to="/" end>
              Home
            </NavLink>

            <NavLink to="/discover">
              Discover
            </NavLink>

            <NavLink to="/share">
              Share & Explore
            </NavLink>
          </div>

          <div className="nav-actions">
            <NavLink className="nav-login" to="/login">
              Log in
            </NavLink>

            <Link className="nav-cta" to="/share">
              Share a hidden gem <span>↗</span>
            </Link>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />

          <Route
            path="/discover"
            element={
              <Discover
                places={places}
                loading={loading}
                apiError={apiError}
                favorites={favorites}
                toggleFavorite={toggleFavorite}
              />
            }
          />

          <Route
            path="/share"
            element={
              <ShareExplore
                places={places}
                favorites={favorites}
                formData={formData}
                setFormData={setFormData}
                handleSubmitPlace={handleSubmitPlace}
                submitting={submitting}
                submitMessage={submitMessage}
              />
            }
          />

          <Route path="/login" element={<Auth />} />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>

        <footer className="footer">
          <Link className="brand footer-brand" to="/">
            <span className="brand-icon">✳</span>
            <span>
              trek<span className="brand-amp">&</span>tag
            </span>
          </Link>

          <span>MADE FOR THE CURIOUS. ROOTED IN THE LOCAL.</span>
          <span>GO A LITTLE FURTHER ↗</span>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
