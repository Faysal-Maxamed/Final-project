import React from 'react';
import Header from '../components/header';
import './contact.css';
const Contact = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />

      <main>
        <section className="hero-section">
          <div className="container">
            <div className="contact-card">
              <div className="contact-left">
                <h2>Get in touch</h2>
                <p>We'd love to hear from you! Whether you have questions, feedback, or need support, feel free to reach out.</p>

                <div className="call-us">
                  <h3>Call Us</h3>
                  <a href="tel:+252614388477">+252 614 388 477</a>
                  <a href="tel:+252618111920">+252 618 111 920</a>
                </div>

                <div className="social-media">
                  <h3>Follow Our Social Media</h3>
                  <div className="social-icons">
                    <a href="#" aria-label="Twitter" className="social-icon twitter">𝕏</a>
                    <a href="#" aria-label="Facebook" className="social-icon facebook">f</a>
                    <a href="#" aria-label="LinkedIn" className="social-icon linkedin">in</a>
                  </div>
                </div>
              </div>

              <div className="contact-right">
                <h2>Send Us a message</h2>
                <form className="contact-form">
                  <div className="form-group">
                    <input type="text" placeholder="Full Name" required />
                  </div>
                  <div className="form-group">
                    <input type="email" placeholder="Email" required />
                  </div>
                  <div className="form-group">
                    <input type="tel" placeholder="Phone" />
                  </div>
                  <div className="form-group">
                    <textarea placeholder="Write anything"></textarea>
                  </div>
                  <button type="submit" className="submit-btn">Submit</button>
                </form>
              </div>
            </div>
          </div>
        </section>

        <section className="cta-section">
          <div className="container">
            <div className="cta-content">
              <p>Ready to get started?</p>
              <button className="contact-btn">Contact Us</button>
            </div>
          </div>
        </section>

        <footer>
          <div className="container">
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

              <div className="footer-links">
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
        </footer>
      </main>
    </div>
  );
};

export default Contact;