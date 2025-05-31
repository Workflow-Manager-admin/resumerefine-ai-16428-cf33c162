import React, { useState } from "react";
import "./App.css";

// PUBLIC_INTERFACE
/**
 * MainToolPage - Modern dark-themed card layout for ResumeRefine AI tool:
 * - Contains a form for user name, job role selection, and file upload.
 * - On "Analyze with AI", displays static AI resume suggestions.
 * - Clean, dual-card design and dark theme matching project palette.
 */
function MainToolPage() {
  const [form, setForm] = useState({
    name: "",
    jobRole: "",
    file: null,
    fileName: "",
  });
  const [touched, setTouched] = useState({
    name: false,
    jobRole: false,
    file: false,
  });
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Optionally, supply realistic job roles here
  const jobRoles = [
    "Software Engineer",
    "Product Manager",
    "Data Scientist",
    "Designer",
    "Marketing Specialist",
    "Project Coordinator",
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setForm((prev) => ({
      ...prev,
      file,
      fileName: file ? file.name : "",
    }));
    setTouched((prev) => ({ ...prev, file: true }));
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  const validate = () => {
    return {
      name: form.name.trim() === "" ? "Name is required." : "",
      jobRole: form.jobRole === "" ? "Please select a job role." : "",
      file: !form.file ? "Please upload your resume file." : "",
    };
  };

  const errors = validate();
  const isFormValid = !errors.name && !errors.jobRole && !errors.file;

  const handleSubmit = (e) => {
    e.preventDefault();
    setTouched({ name: true, jobRole: true, file: true });
    if (!isFormValid) return;
    // For demo: just show static AI output card
    setShowSuggestions(true);
  };

  const resetForm = () => {
    setForm({
      name: "",
      jobRole: "",
      file: null,
      fileName: "",
    });
    setTouched({
      name: false,
      jobRole: false,
      file: false,
    });
    setShowSuggestions(false);
  };

  return (
    <div
      style={{
        minHeight: "calc(100vh - 80px)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "none",
        paddingTop: "40px",
        paddingBottom: "40px",
      }}
    >
      <div
        style={{
          width: "96vw",
          maxWidth: "440px",
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          gap: "38px",
        }}
      >
        {/* ==== Card: Resume Input Form ==== */}
        <div
          className="tool-card"
          style={{
            background: "rgba(26, 34, 56, 0.98)",
            borderRadius: "18px",
            boxShadow:
              "0 6px 36px 0 rgba(30,40,70,0.18), 0 0 0 1.5px var(--border-color)",
            padding: "38px 28px 27px 28px",
            border: "1.6px solid var(--border-color, #24244d)",
            backdropFilter: "blur(2px)",
            display: showSuggestions ? "none" : "flex",
            flexDirection: "column",
            gap: "22px",
          }}
        >
          <h2
            style={{
              color: "var(--brand-secondary)",
              fontWeight: 700,
              fontSize: "2.03rem",
              margin: "0 0 14px 0",
              textAlign: "center",
              letterSpacing: "0.012em",
            }}
          >
            Resume Refinement <span style={{ color: "var(--brand-accent)" }}>AI</span>
          </h2>

          {/* Form Fields */}
          <form
            onSubmit={handleSubmit}
            noValidate
            autoComplete="off"
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "18px",
              marginTop: "8px"
            }}
          >
            {/* Name */}
            <div className="tool-field" style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <label htmlFor="name" style={{ color: "var(--text-secondary)", fontWeight: 500 }}>
                Name
              </label>
              <input
                id="name"
                name="name"
                className="tool-input"
                style={{
                  borderRadius: "6px",
                  border: errors.name && touched.name ? "1.2px solid #ec6262" : "1.2px solid var(--border-color)",
                  background: errors.name && touched.name ? "rgba(80, 38, 38, 0.14)" : "rgba(34, 42, 64, 0.93)",
                  color: "var(--text-color)",
                  padding: "10px 13px",
                  fontSize: "1rem",
                  transition: "border-color 0.15s",
                  outline: "none",
                }}
                type="text"
                placeholder="Your full name"
                value={form.name}
                onChange={handleInputChange}
                onBlur={handleBlur}
                disabled={showSuggestions}
                autoFocus
              />
              {errors.name && touched.name && (
                <span style={{ color: "#ec6262", fontSize: "0.98rem" }}>{errors.name}</span>
              )}
            </div>
            {/* Job Role */}
            <div className="tool-field" style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <label htmlFor="jobRole" style={{ color: "var(--text-secondary)", fontWeight: 500 }}>
                Desired Job Role
              </label>
              <select
                id="jobRole"
                name="jobRole"
                className="tool-input"
                style={{
                  borderRadius: "6px",
                  border: errors.jobRole && touched.jobRole ? "1.2px solid #ec6262" : "1.2px solid var(--border-color)",
                  background: errors.jobRole && touched.jobRole ? "rgba(80, 38, 38, 0.14)" : "rgba(34, 42, 64, 0.93)",
                  color: "var(--text-color)",
                  padding: "10px 13px",
                  fontSize: "1rem",
                  appearance: "none",
                }}
                value={form.jobRole}
                onChange={handleInputChange}
                onBlur={handleBlur}
                disabled={showSuggestions}
              >
                <option value="">Select a role…</option>
                {jobRoles.map((role) => (
                  <option key={role} value={role}>{role}</option>
                ))}
              </select>
              {errors.jobRole && touched.jobRole && (
                <span style={{ color: "#ec6262", fontSize: "0.98rem" }}>{errors.jobRole}</span>
              )}
            </div>
            {/* File Upload */}
            <div className="tool-field" style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <label htmlFor="resume-upload" style={{ color: "var(--text-secondary)", fontWeight: 500 }}>
                Upload Resume (PDF, DOCX)
              </label>
              <input
                id="resume-upload"
                name="resume"
                className="tool-input"
                style={{
                  borderRadius: "6px",
                  border: errors.file && touched.file ? "1.2px solid #ec6262" : "1.2px solid var(--border-color)",
                  background: errors.file && touched.file ? "rgba(80, 38, 38, 0.14)" : "rgba(34, 42, 64, 0.93)",
                  color: "var(--text-color)",
                  padding: "7px 13px",
                  fontSize: "1rem",
                }}
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleFileChange}
                disabled={showSuggestions}
                styleInput={{ colorScheme: "dark" }}
              />
              {form.fileName && (
                <span style={{
                  color: "var(--text-secondary)", fontSize: "0.99rem"
                }}>
                  {form.fileName}
                </span>
              )}
              {errors.file && touched.file && (
                <span style={{ color: "#ec6262", fontSize: "0.98rem" }}>{errors.file}</span>
              )}
            </div>
            <button
              className="btn btn-large"
              type="submit"
              style={{
                marginTop: "19px",
                borderRadius: "7px",
                fontWeight: 650,
                fontSize: "1.11rem",
              }}
              disabled={!isFormValid}
            >
              Analyze with AI
            </button>
          </form>
        </div>
        {/* ==== Card: Suggestions ==== */}
        <div
          className="suggestion-card"
          style={{
            background: "rgba(30,40,70,0.99)",
            borderRadius: "19px",
            boxShadow:
              "0 9px 38px 0 rgba(30,40,70,0.20), 0 0 0 1.8px var(--border-color)",
            padding: "36px 25px 32px 25px",
            border: "1.6px solid var(--border-color, #223)",
            display: showSuggestions ? "block" : "none",
            marginBottom: "0",
          }}
        >
          <h2
            style={{
              color: "var(--brand-secondary)",
              fontWeight: 700,
              fontSize: "1.85rem",
              margin: "0 0 7px 0",
              letterSpacing: "0.012em",
              textAlign: "center",
            }}
          >
            AI Suggestions for {form.name}
            <span style={{ color: "var(--brand-accent)", marginLeft: 4 }}>
              {form.jobRole ? `(${form.jobRole})` : ""}
            </span>
          </h2>
          <div
            style={{
              color: "var(--text-secondary)",
              fontSize: "1.1rem",
              margin: "9px 0 18px 0",
              textAlign: "center",
              fontWeight: 400,
            }}
          >
            These recommendations were generated based on your uploaded resume and the selected role:
          </div>
          <ul
            style={{
              padding: 0,
              margin: 0,
              listStyle: "none",
              color: "var(--text-color)",
              fontSize: "1.07rem",
            }}
          >
            {/* Static sample AI suggestions */}
            <li
              style={{
                background: "rgba(64,36,41,0.14)",
                borderRadius: "7px",
                padding: "10px 12px",
                marginBottom: "10px",
                borderLeft: "4px solid var(--brand-accent)",
              }}
            >
              <b>Quantify Achievements</b> — Turn vague statements into results with numbers or stats, e.g., "Reduced processing time by 30% through automation."
            </li>
            <li
              style={{
                background: "rgba(40,60,85,0.13)",
                borderRadius: "7px",
                padding: "10px 12px",
                marginBottom: "10px",
                borderLeft: "4px solid var(--brand-secondary)",
              }}
            >
              <b>Use Action Verbs</b> — Start each bullet with a strong verb like "Designed," "Implemented," or "Spearheaded."
            </li>
            <li
              style={{
                background: "rgba(90, 41, 38, 0.11)",
                borderRadius: "7px",
                padding: "10px 12px",
                marginBottom: "10px",
                borderLeft: "4px solid var(--kavia-orange)",
              }}
            >
              <b>Target Role Alignment</b> — Emphasize experience and skills that match <i>{form.jobRole || "the desired"}</i> role. Remove irrelevant content.
            </li>
            <li
              style={{
                background: "rgba(60,52,160,0.10)",
                borderRadius: "7px",
                padding: "10px 12px",
                marginBottom: "10px",
                borderLeft: "4px solid #E87A41",
              }}
            >
              <b>Correct Formatting</b> — Make sure headings and sections are clearly defined for readability (e.g., Experience, Skills, Education).
            </li>
            <li
              style={{
                background: "rgba(36,110,110,0.10)",
                borderRadius: "7px",
                padding: "10px 12px",
                marginBottom: "0px",
                borderLeft: "4px solid var(--brand-secondary)",
              }}
            >
              <b>Proofread</b> — Double-check for typos, grammar, or inconsistent tense.
            </li>
          </ul>
          <button
            className="btn btn-large"
            type="button"
            onClick={resetForm}
            style={{
              margin: "26px auto 0 auto",
              display: "block",
              borderRadius: "7px",
              background: "var(--kavia-orange, #E87A41)",
              minWidth: "130px"
            }}
          >
            Back to Form
          </button>
        </div>
      </div>
    </div>
  );
}

export default MainToolPage;
