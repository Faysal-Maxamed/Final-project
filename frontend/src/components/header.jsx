import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEnvelope, FaTwitter, FaFacebookF, FaLinkedin, FaSun, FaMoon } from "react-icons/fa";

const Header = () => {
  const [darkMode, setDarkMode] = useState(localStorage.getItem("theme") === "dark");
  const navigate = useNavigate();

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      document.body.classList.add("bg-gray-900", "text-white");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      document.body.classList.remove("bg-gray-900", "text-white");
      document.body.classList.add("bg-white", "text-gray-900");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const handleLogout = () => {
    localStorage.removeItem("token"); // Clear the token
    alert("Logged out successfully!");
    navigate("/login"); // Redirect to login page
  };

  return (
    <header className="transition-all duration-300">
      {/* Upper Bar */}
      <div className="bg-blue-700 text-white py-2 px-4 flex justify-between items-center text-sm">
        <div className="flex items-center space-x-4">
          <FaEnvelope className="text-white" />
          <span>info@gmail.com</span>
          <span>+252 614 388 477</span>
        </div>
        <div className="flex space-x-3">
          <FaTwitter className="cursor-pointer" />
          <FaFacebookF className="cursor-pointer" />
          <FaLinkedin className="cursor-pointer" />
        </div>
      </div>

      {/* Main Navigation */}
      <div className={`shadow-md py-3 px-4 transition-all duration-300 
        ${darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"}
      `}>
        <div className="container mx-auto flex justify-between items-center">
          <h1 className={`text-2xl font-bold transition-all 
            ${darkMode ? "text-yellow-400" : "text-blue-700"}
          `}>
            HRP <span className="text-yellow-500">MANAGEMENT</span>
          </h1>
          <nav>
            <ul className="flex space-x-6 transition-all">
              <li>
                <Link to="/" className={`hover:${darkMode ? "text-yellow-400" : "text-blue-500"}`}>
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className={`hover:${darkMode ? "text-yellow-400" : "text-blue-500"}`}>
                  About
                </Link>
              </li>
              <li>
                <Link to="/PredictorForm" className={`hover:${darkMode ? "text-yellow-400" : "text-blue-500"}`}>
                  Predict
                </Link>
              </li>
              <li>
                <Link to="/history" className={`hover:${darkMode ? "text-yellow-400" : "text-blue-500"}`}>
                  History
                </Link>
              </li>
              <li>
                <Link to="/contact" className={`hover:${darkMode ? "text-yellow-400" : "text-blue-500"}`}>
                  Contact
                </Link>
              </li>
            </ul>
          </nav>

          {/* Light/Dark Mode Toggle */}
          <div className="flex items-center space-x-4">
            <button onClick={() => setDarkMode(!darkMode)}>
              {darkMode ? <FaMoon className="text-yellow-400 text-xl" /> : <FaSun className="text-black text-xl" />}
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
              <Link to="/login" className="bg-blue-500 px-3 py-2 rounded hover:bg-blue-600 transition-all">
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
