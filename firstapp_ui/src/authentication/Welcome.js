import React from 'react';
import './Welcome.css';

function Welcome() {
  return (
    <div className="app-container">
      <div className="app-content">
        <div className="app-title">FirstAPP</div>
        <p className="app-description">
          Welcome to FirstAPP, the premier dating platform where meaningful
          connections are just a click away. Sign up or log in to start your
          journey of finding love and companionship today.
        </p>
        <a href="/login/" className="primary-button">
          Login
        </a>
      </div>
      <footer className="app-footer">
        <p>&copy; 2025 FirstAPP. All rights reserved.</p>
        <nav>
          <a href="/about/" className="footer-link">
            About Us
          </a>
          <a href="/privacy/" className="footer-link">
            Privacy Policy
          </a>
          <a href="/contact/" className="footer-link">
            Contact
          </a>
        </nav>
      </footer>
    </div>
  );
}

export default Welcome;
