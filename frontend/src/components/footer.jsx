import React from "react";

const Footer = () => {
  return (
    <footer >
    <div className="bg-blue-100">
    <div className="container p-8">
      <div className="footer-content">
        <div className="footer-logo">
          <div className="logo">
            <span className="logo-hrp">HRP</span>
            <span className="logo-management">MANAGEMENT</span>
          </div>
          <div className="footer-social">
            <a href="#" aria-label="Twitter" className="social-icon twitter">𝕏</a>
            <a href="#" aria-label="Facebook" className="social-icon facebook">f</a>
            <a href="#" aria-label="LinkedIn" className="social-icon linkedin">in</a>
          </div>
        </div>

        <div className="footer-links  ">
          <div className="footer-column">
            <h4>Company</h4>
            <ul>
              <li><a href="#">Home</a></li>
              <li><a href="#">About</a></li>
              <li><a href="#">Predict</a></li>
              <li><a href="#">Contact</a></li>
            </ul>
          </div>

          <div className="footer-column">
            <h4>Designes</h4>
            <ul>
              <li><a href="#">Home</a></li>
              <li><a href="#">About</a></li>
              <li><a href="#">Predict</a></li>
              <li><a href="#">Contact</a></li>
            </ul>
          </div>

          <div className="footer-column">
            <h4>Designes</h4>
            <ul>
              <li><a href="#">Home</a></li>
              <li><a href="#">About</a></li>
              <li><a href="#">Predict</a></li>
              <li><a href="#">Contact</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div className="footer-wave"></div>
    </div>
  </footer>
  );
};

export default Footer;