import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaEnvelope,
  FaTwitter,
  FaFacebookF,
  FaLinkedin,
  FaSun,
  FaMoon,
} from "react-icons/fa";

const Header = ({ darkMode, setDarkMode }) => {
  const navigate = useNavigate();

  useEffect(() => {
    // Body Background Color Switch for Dark Mode
    if (darkMode) {
      document.body.classList.add("bg-gray-900", "text-white");
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.remove("bg-gray-900", "text-white");
      localStorage.setItem("theme", "light");
    }

    // Update header and navigation colors
    const header = document.querySelector("header");
    const footer = document.querySelector("footer");
    const aboutSection = document.querySelector(".about-section");

    if (header) {
      header.classList.toggle("bg-gray-900", darkMode);
      header.classList.toggle("text-white", darkMode);
      header.classList.toggle("bg-white", !darkMode);
      header.classList.toggle("text-gray-900", !darkMode);
    }

    if (footer) {
      footer.classList.toggle("bg-gray-900", darkMode);
      footer.classList.toggle("text-white", darkMode);
      footer.classList.toggle("bg-white", !darkMode);
      footer.classList.toggle("text-gray-900", !darkMode);
    }

    if (aboutSection) {
      aboutSection.classList.toggle("bg-gray-900", darkMode);
      aboutSection.classList.toggle("text-white", darkMode);
      aboutSection.classList.toggle("bg-white", !darkMode);
      aboutSection.classList.toggle("text-gray-900", !darkMode);
    }
  }, [darkMode]);

  const handleLogout = () => {
    localStorage.removeItem("token"); 
    alert("Logged out successfully!");
    navigate("/login"); 
  };

  return (
    <header className={`transition-all duration-300 ${darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"}`}>
      {/* Upper Bar */}
      <div className={`py-2 px-4 flex justify-between items-center text-sm ${darkMode ? "bg-blue-700  text-white" : "bg-blue-700 text-white"}`}>
        <div className="flex items-center space-x-4">
          <FaEnvelope className="text-white" />
          <span>info@gmail.com</span>
          <span>+252 614 388 477</span>
        </div>
        <div className="flex space-x-3">
          <FaTwitter className="cursor-pointer hover:text-gray-300 transition" />
          <FaFacebookF className="cursor-pointer hover:text-gray-300 transition" />
          <FaLinkedin className="cursor-pointer hover:text-gray-300 transition" />
        </div>
      </div>

      {/* Main Navigation */}
      <div className={`shadow-md py-3 px-4 transition-all duration-300 ${darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"}`}>
        <div className="container mx-auto flex justify-between items-center">
          <h1 className={`text-2xl font-bold transition-all text-blue-700`}>
            HRP <span className="text-yellow-500">MANAGEMENT</span>
          </h1>

          {/* Navigation Links */}
          <nav>
            <ul className="flex space-x-6">
              {[{ name: "Home", path: "/" }, { name: "About", path: "/about" }, { name: "Predict", path: "/PredictorForm" }, { name: "History", path: "/history" }, { name: "Contact", path: "/contact" }].map(
                (link, index) => (
                  <li key={index}>
                    <Link
                      to={link.path}
                      className={`hover:text-yellow-400 transition ${darkMode ? "text-white" : "text-gray-900"}`}
                    >
                      {link.name}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </nav>

          {/* Right Side: Dark Mode Toggle & Logout/Login */}
          <div className="flex items-center space-x-4">
            {/* Dark Mode Toggle */}
            <button onClick={() => setDarkMode(!darkMode)}>
              {darkMode ? (
                <FaMoon className="text-yellow-400 text-xl" />
              ) : (
                <FaSun className="text-black text-xl" />
              )}
            </button>

            {/* Logout/Login Button */}
            {localStorage.getItem("token") ? (
              <button
                onClick={handleLogout}
                className="bg-red-500 px-3 py-2 rounded hover:bg-red-600 transition-all"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                className="bg-blue-500 px-3 py-2 rounded hover:bg-blue-600 transition-all"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;