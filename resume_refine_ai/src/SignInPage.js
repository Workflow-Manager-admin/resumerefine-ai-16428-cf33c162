import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";

/**
 * SignInPage - Modern dark-themed sign-in form with validation and feedback.
 * Features:
 * - Centered form
 * - Email/username and password fields
 * - Client-side validation with error feedback
 * - Mock authentication (accept any non-empty credentials)
 * - Redirect to MainToolPage on success
 */

// PUBLIC_INTERFACE
function SignInPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", password: "" });
  const [touched, setTouched] = useState({ username: false, password: false });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  // Validation helpers
  const validate = (field, value) => {
    if (field === "username") {
      // allow username or email, require at least 3 chars
      if (!value) return "Username or email is required.";
      if (value.length < 3) return "Must be at least 3 characters.";
      return "";
    }
    if (field === "password") {
      if (!value) return "Password is required.";
      if (value.length < 6) return "Password must be at least 6 characters.";
      return "";
    }
    return "";
  };

  const usernameError = touched.username ? validate("username", form.username) : "";
  const passwordError = touched.password ? validate("password", form.password) : "";

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Handle blur to show errors only after touch
  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  // Mock authentication (accepts any non-empty credentials)
  const handleSubmit = (e) => {
    e.preventDefault();
    setTouched({ username: true, password: true });
    setError(null);

    if (validate("username", form.username) || validate("password", form.password)) {
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setError(null);
      // Mock: "Log in" is always successful
      setTimeout(() => {
        navigate("/tool");
      }, 800);
    }, 800);
  };

  return (
    <div className="signin-background">
      <form className="signin-form" onSubmit={handleSubmit} autoComplete="off" noValidate>
        <h2 className="signin-title">Sign In</h2>
        <div className="signin-field">
          <label htmlFor="username" className="signin-label">
            Email or Username
          </label>
          <input
            id="username"
            name="username"
            className={`signin-input ${usernameError ? "signin-input-error" : ""}`}
            type="text"
            placeholder="you@email.com or username"
            value={form.username}
            onChange={handleChange}
            onBlur={handleBlur}
            disabled={loading || success}
            autoFocus
            autoComplete="username"
          />
          {usernameError && (
            <div className="signin-error">{usernameError}</div>
          )}
        </div>
        <div className="signin-field">
          <label htmlFor="password" className="signin-label">
            Password
          </label>
          <input
            id="password"
            name="password"
            className={`signin-input ${passwordError ? "signin-input-error" : ""}`}
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            onBlur={handleBlur}
            disabled={loading || success}
            autoComplete="current-password"
          />
          {passwordError && (
            <div className="signin-error">{passwordError}</div>
          )}
        </div>
        {error && <div className="signin-error signin-error-feedback">{error}</div>}
        {success && (
          <div className="signin-success">
            ✅ Signed in! Redirecting...
          </div>
        )}
        <button
          className="btn signin-btn"
          type="submit"
          disabled={
            loading ||
            success ||
            !!validate("username", form.username) ||
            !!validate("password", form.password)
          }
        >
          {loading ? "Signing in..." : "Sign In"}
        </button>
      </form>
    </div>
  );
}

export default SignInPage;
