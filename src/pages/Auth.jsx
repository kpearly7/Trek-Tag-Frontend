
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Auth.css";

const API = "https://trek-tag-backend.onrender.com";

export default function Auth() {
  const navigate = useNavigate();

  const [mode, setMode] = useState("login");
  const [role, setRole] = useState("CUSTOMER");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      const endpoint =
  mode === "signup" ? "/api/auth/register" : "/api/auth/login";

      const body =
        mode === "signup"
          ? { name, email, password, role }
          : { email, password };

      const response = await fetch(`${API}${endpoint}`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const responseText = await response.text();

      let data;
      try {
        data = JSON.parse(responseText);
      } catch {
        data = responseText;
      }

      if (!response.ok) {
        throw new Error(
          typeof data === "string"
            ? data
            : "Something went wrong. Please try again."
        );
      }

      setMessage(
        mode === "signup"
          ? "Account created successfully!"
          : "Welcome back!"
      );

      // Keep the returned user details for the current page flow.
      sessionStorage.setItem(
        "trektagUser",
        JSON.stringify(data)
      );

      navigate("/discover");
    } catch (error) {
      setMessage(
        error.message ||
          "Could not connect to Trek & Tag. Check that the backend is running."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="auth-page">
      <section className="auth-intro">
        <span className="auth-eyebrow">YOUR NEXT STORY STARTS HERE</span>

        <h1>
          Find the places
          <br />
          <em>worth finding.</em>
        </h1>

        <p>
          Little-known cafés, local artisans, quiet trails
          and stories hiding just around the corner.
        </p>

        <div className="auth-note">
          <span className="auth-note-icon">✳</span>
          <span>Travel curious. Discover differently.</span>
        </div>
      </section>

      <section className="auth-card">
        <div className="auth-brand">trek<span>&</span>tag</div>

        <h2>
          {mode === "login" ? "Welcome back" : "Join the journey"}
        </h2>

        <p className="auth-subtitle">
          {mode === "login"
            ? "Log in to continue exploring."
            : "Create your account to get started."}
        </p>

        <div className="auth-tabs">
          <button
            type="button"
            className={mode === "login" ? "active" : ""}
            onClick={() => {
              setMode("login");
              setMessage("");
            }}
          >
            Log in
          </button>

          <button
            type="button"
            className={mode === "signup" ? "active" : ""}
            onClick={() => {
              setMode("signup");
              setMessage("");
            }}
          >
            Sign up
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {mode === "signup" && (
            <>
              <label htmlFor="auth-name">Full name</label>
              <input
                id="auth-name"
                type="text"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoComplete="name"
                required
              />

              <label>I'm joining as a</label>
              <div className="auth-role-options">
                <button
                  type="button"
                  className={role === "CUSTOMER" ? "selected" : ""}
                  onClick={() => setRole("CUSTOMER")}
                >
                  <span>✦</span>
                  <strong>Explorer</strong>
                  <small>Discover hidden gems</small>
                </button>

                <button
                  type="button"
                  className={
                    role === "BUSINESS_OWNER" ? "selected" : ""
                  }
                  onClick={() => setRole("BUSINESS_OWNER")}
                >
                  <span>⌂</span>
                  <strong>Business owner</strong>
                  <small>Share my business</small>
                </button>
              </div>

              {role === "BUSINESS_OWNER" && (
                <p className="auth-hint">
                  Your business listing will need approval
                  before it appears publicly.
                </p>
              )}
            </>
          )}

          <label htmlFor="auth-email">Email address</label>
          <input
            id="auth-email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            required
          />

          <label htmlFor="auth-password">Password</label>
          <input
            id="auth-password"
            type="password"
            placeholder={
              mode === "signup"
                ? "At least 8 characters"
                : "Enter your password"
            }
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete={
              mode === "signup" ? "new-password" : "current-password"
            }
            minLength={mode === "signup" ? 8 : undefined}
            required
          />

          {message && (
            <p
              className="auth-message"
              role="status"
              aria-live="polite"
            >
              {message}
            </p>
          )}

          <button
            type="submit"
            className="auth-submit"
            disabled={loading}
          >
            {loading
              ? "Please wait..."
              : mode === "login"
                ? "Log in →"
                : "Create account →"}
          </button>
        </form>

        <p className="auth-switch">
          {mode === "login"
            ? "New around here? "
            : "Already part of the journey? "}
          <button
            type="button"
            onClick={() => {
              setMode(mode === "login" ? "signup" : "login");
              setMessage("");
            }}
          >
            {mode === "login" ? "Create an account" : "Log in"}
          </button>
        </p>

        <p className="auth-footnote">
          Every hidden gem has a story. Come find yours.
        </p>
      </section>
    </main>
  );
}
