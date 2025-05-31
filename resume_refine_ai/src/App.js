import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from './HomePage';
import SignInPage from './SignInPage';
import MainToolPage from './MainToolPage';

function App() {
  return (
    <Router>
      <div className="app">
        {/* Hide navbar on home (root) route */}
        <Routes>
          <Route
            path="/"
            element={<HomePage />}
          />
          <Route
            path="*"
            element={
              <>
                <nav className="navbar">
                  <div className="container">
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      width: '100%'
                    }}>
                      <div className="logo">
                        <span className="logo-symbol">*</span> KAVIA AI
                      </div>
                      {/* Home button (only visible on non-home pages) */}
                      <a
                        href="/"
                        className="btn btn-large btn-home-nav"
                        style={{
                          marginLeft: '20px',
                          borderRadius: '7px',
                          fontWeight: 700,
                          fontSize: '1.08rem',
                          background: 'linear-gradient(90deg, var(--brand-secondary), var(--kavia-orange) 70%)',
                          color: '#fff',
                          textDecoration: 'none',
                          padding: '10px 20px',
                          boxShadow: '0 2px 24px 0 rgba(232,122,65,0.12)'
                        }}
                      >
                        Home
                      </a>
                    </div>
                  </div>
                </nav>
                <main>
                  <div className="container">
                    <Routes>
                      <Route path="/signin" element={<SignInPage />} />
                      <Route path="/tool" element={<MainToolPage />} />
                    </Routes>
                  </div>
                </main>
              </>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;