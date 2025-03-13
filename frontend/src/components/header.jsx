import React from "react";
import { Link } from "react-router-dom";
import { FaEnvelope, FaTwitter, FaFacebookF, FaLinkedin } from "react-icons/fa";

const Header = () => {
  return (
    <header>
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
      <div className="bg-white shadow-md py-3 px-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-700 ">
            HRP <span className="text-yellow-500">MANAGEMENT</span>
          </h1>
          <nav>
            <ul className="flex space-x-6 text-black ">
              <li>
                <Link to="/" className="hover:text-blue-500">Home</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-blue-500">About</Link>
              </li>
              <li>
                <Link to="/PredictorForm" className="hover:text-blue-500">Predict</Link>
              </li>
              <li>
                <Link to="/history" className="hover:text-blue-500">History</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-blue-500">Contact</Link>
              </li>
            </ul>
          </nav>
          {/* Light/Dark Mode Toggle Icon */}
          <span className="cursor-pointer">☀️</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
