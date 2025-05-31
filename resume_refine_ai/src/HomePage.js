import React from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";

// PUBLIC_INTERFACE
/**
 * HomePage for ResumeRefine AI
 * - Full-screen background (dark, with stylish overlay)
 * - Centered branding/logo
 * - On-brand typography and palette
 * - "Sign In" call-to-action (CTA) button
 */
function HomePage() {
  const navigate = useNavigate();

  // Example background image (URL could be replaced with an asset in real deployment)
  const backgroundImage =
    "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1500&q=80";

  return (
    <div
      className="home-background"
      style={{
        minHeight: "100vh",
        minWidth: "100vw",
        background: `linear-gradient(120deg, rgba(26,34,56,0.88) 70%, rgba(157,170,242, 0.15) 100%), url('${backgroundImage}') center/cover no-repeat fixed`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div className="home-hero-content">
        <div className="home-logo">
          <span className="home-logo-symbol">*</span>{" "}
          <span>ResumeRefine <span className="home-ai-span">AI</span></span>
        </div>
        <h1 className="home-title">
          Refine. <span className="home-accent">Impress.</span> Succeed.
        </h1>
        <p className="home-description">
          Unleash the power of AI for your next career step.
          <br /> Upload your resume, tailor it for your dream job, and get expert instant suggestions—free.
        </p>
        <button
          className="btn btn-large home-cta"
          onClick={() => navigate("/signin")}
          style={{
            marginTop: 18,
            borderRadius: 8,
            fontWeight: 700,
            fontSize: "1.18rem",
            letterSpacing: "0.02em",
            minWidth: 160,
            boxShadow: "0 4px 26px 0 rgba(255,106,61,0.25)",
            background: "linear-gradient(90deg, var(--brand-accent), var(--brand-secondary) 80%)",
            transition: "background 0.2s, box-shadow 0.19s",
            border: "none",
            outline: "none"
          }}
        >
          Sign In
        </button>
      </div>
    </div>
  );
}

export default HomePage;
