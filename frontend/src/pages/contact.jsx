import React, { useState } from "react";
import { FaFacebook, FaTwitter, FaLinkedin } from "react-icons/fa";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      setError("Please fill in all fields.");
      return;
    }
    console.log("Message Sent:", formData);
    setFormData({ name: "", email: "", subject: "", message: "" });
    setError("");
  };

  return (
    <div className="flex flex-col md:flex-row bg-gray-100 p-8 rounded-lg shadow-lg max-w-5xl mx-auto mt-10">
      {/* Left Side - Contact Form */}
      <div className="w-full md:w-2/3 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-4xl font-bold text-teal-600 text-center mb-6">Contact Us</h2>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
          />

          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
          />

          <input
            type="text"
            name="subject"
            placeholder="Subject"
            value={formData.subject}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
          />

          <textarea
            name="message"
            placeholder="Your Message"
            rows="5"
            value={formData.message}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
          ></textarea>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-teal-500 to-teal-700 text-white p-3 rounded-lg text-lg font-semibold hover:shadow-lg transform transition duration-300 hover:scale-105"
          >
            Send Message
          </button>
        </form>
      </div>

      {/* Right Side - Contact Info & Socials */}
      <div className="w-full md:w-1/3 flex flex-col items-center justify-center text-center p-6">
        <h3 className="text-xl font-semibold text-gray-700">📍 Contact Information</h3>
        <p className="text-gray-600 mt-2">123 Street, City, Country</p>
        <p className="text-gray-600">📞 +123 456 7890</p>
        <p className="text-gray-600">📧 contact@yourwebsite.com</p>

        <div className="flex gap-6 mt-6 text-teal-600 text-3xl">
          <a href="#" className="hover:text-teal-800 transform transition duration-300 hover:scale-110"><FaFacebook /></a>
          <a href="#" className="hover:text-teal-800 transform transition duration-300 hover:scale-110"><FaTwitter /></a>
          <a href="#" className="hover:text-teal-800 transform transition duration-300 hover:scale-110"><FaLinkedin /></a>
        </div>
      </div>
    </div>
  );
};

export default Contact;
