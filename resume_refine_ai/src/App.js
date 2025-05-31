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
                    <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                      <div className="logo">
                        <span className="logo-symbol">*</span> KAVIA AI
                      </div>
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