import React, { useState } from "react";
import axios from "axios";
import Header from "../components/header";
import "./contact.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");

    try {
      const res = await axios.post("http://localhost:5000/api/contact", formData);
      setStatus(res.data.message);
      setFormData({ name: "", email: "", phone: "", message: "" }); // Clear form on success
    } catch (error) {
      setStatus("Failed to send message. Please try again.");
    }
  };

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
              </div>
              <div className="contact-right">
                <h2>Send Us a Message</h2>
                <form className="contact-form" onSubmit={handleSubmit}>
                  <div className="form-group">
                    <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} required />
                  </div>
                  <div className="form-group">
                    <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
                  </div>
                  <div className="form-group">
                    <input type="tel" name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} />
                  </div>
                  <div className="form-group">
                    <textarea name="message" placeholder="Write anything" value={formData.message} onChange={handleChange} required></textarea>
                  </div>
                  <button type="submit" className="submit-btn">Submit</button>
                </form>
                {status && <p className="status-message">{status}</p>}
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Contact;
