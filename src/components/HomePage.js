// src/components/HomePage.js

import React from 'react';
import './HomePage.css'; // Import the external stylesheet

const HomePage = () => {
  return (
    <div className="home-page">
      <header className="header">
        <div className="logo">
          <img src="/streaks-logo.png" alt="Streaks Logo" />
          <span>Streaks</span>
        </div>
        <button className="cta-button">Add new Streak</button>
      </header>
      <main className="main-content">
        <h1 className="app-title">Welcome to Streaks</h1>
        <p className="app-description">Track your daily streaks and build positive habits.</p>
      </main>
      <footer className="footer">
        <p>made by sanskarfc with love</p>
      </footer>
    </div>
  );
};

export default HomePage;
