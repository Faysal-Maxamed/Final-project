"use client"

import { useState, useEffect } from "react"
import React from "react"
import { Link, useNavigate } from "react-router-dom"
import {
  FaEnvelope,
  FaTwitter,
  FaFacebookF,
  FaLinkedin,
  FaSun,
  FaMoon,
  FaPhone,
  FaUserCircle,
  FaChevronDown,
} from "react-icons/fa"

const Header = ({ darkMode, setDarkMode }) => {
  const navigate = useNavigate()
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    // Body Background Color Switch for Dark Mode
    if (darkMode) {
      document.body.classList.add("bg-gray-900", "text-white")
      localStorage.setItem("theme", "dark")
    } else {
      document.body.classList.remove("bg-gray-900", "text-white")
      localStorage.setItem("theme", "light")
    }

    // Update header and navigation colors
    const header = document.querySelector("header")
    const footer = document.querySelector("footer")
    const aboutSection = document.querySelector(".about-section")

    if (header) {
      header.classList.toggle("bg-gray-900", darkMode)
      header.classList.toggle("text-white", darkMode)
      header.classList.toggle("bg-white", !darkMode)
      header.classList.toggle("text-gray-900", !darkMode)
    }

    if (footer) {
      footer.classList.toggle("bg-gray-900", darkMode)
      footer.classList.toggle("text-white", darkMode)
      footer.classList.toggle("bg-white", !darkMode)
      footer.classList.toggle("text-gray-900", !darkMode)
    }

    if (aboutSection) {
      aboutSection.classList.toggle("bg-gray-900", darkMode)
      aboutSection.classList.toggle("text-white", darkMode)
      aboutSection.classList.toggle("bg-white", !darkMode)
      aboutSection.classList.toggle("text-gray-900", !darkMode)
    }
  }, [darkMode])

  const handleLogout = () => {
    localStorage.removeItem("token")
    alert("Logged out successfully!")
    navigate("/login")
  }

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Predict", path: "/PredictorForm" },
    { name: "History", path: "/history" },
    { name: "Contact", path: "/contact" },
  ]

  return (
    <header
      className={` w-full z-50 transition-all duration-300 ${
        scrolled ? "shadow-lg" : ""
      } ${darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"}`}
    >
      {/* Upper Bar */}
      <div
        className={`py-2 px-4 md:px-8 flex justify-between items-center text-sm ${
          darkMode
            ? "bg-gradient-to-r from-blue-800 to-blue-600 text-white"
            : "bg-gradient-to-r from-blue-700 to-blue-500 text-white"
        }`}
      >
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2">
            <FaEnvelope className="text-white opacity-80" />
            <span className="hidden sm:inline">info@gmail.com</span>
          </div>
          <div className="flex items-center space-x-2">
            <FaPhone className="text-white opacity-80 transform rotate-90" />
            <span className="hidden sm:inline">+252 614 388 477</span>
          </div>
        </div>
        <div className="flex space-x-4">
          <a
            href="#"
            className="w-6 h-6 rounded-full bg-white bg-opacity-20 flex items-center justify-center hover:bg-opacity-30 transition-all duration-200"
          >
            <FaTwitter className="text-white text-xs" />
          </a>
          <a
            href="#"
            className="w-6 h-6 rounded-full bg-white bg-opacity-20 flex items-center justify-center hover:bg-opacity-30 transition-all duration-200"
          >
            <FaFacebookF className="text-white text-xs" />
          </a>
          <a
            href="#"
            className="w-6 h-6 rounded-full bg-white bg-opacity-20 flex items-center justify-center hover:bg-opacity-30 transition-all duration-200"
          >
            <FaLinkedin className="text-white text-xs" />
          </a>
        </div>
      </div>

      {/* Main Navigation */}
      <div
        className={`py-4 px-4 md:px-8 transition-all duration-300 ${
          darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"
        } ${scrolled ? "py-3" : "py-4"}`}
      >
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold transition-all">
            <span className="bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">HRP</span>{" "}
            <span className="bg-gradient-to-r from-yellow-500 to-yellow-400 bg-clip-text text-transparent">
              MANAGEMENT
            </span>
          </h1>

          {/* Mobile Menu Button */}
          <button className="md:hidden flex items-center" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            <svg
              className={`w-6 h-6 ${darkMode ? "text-white" : "text-gray-900"}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              />
            </svg>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:block">
            <ul className="flex space-x-8">
              {navLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.path}
                    className={`relative font-medium hover:text-blue-600 transition-colors duration-200 py-2 ${
                      darkMode ? "text-gray-100 hover:text-blue-400" : "text-gray-800"
                    } after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-blue-600 hover:after:w-full after:transition-all after:duration-300`}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Right Side: Dark Mode Toggle & Logout/Login */}
          <div className="hidden md:flex items-center space-x-6">
            {/* Dark Mode Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`relative w-10 h-5 rounded-full transition-colors duration-300 focus:outline-none ${
                darkMode ? "bg-blue-700" : "bg-gray-300"
              }`}
              aria-label="Toggle dark mode"
            >
              <span
                className={`absolute left-0.5 top-0.5 w-4 h-4 rounded-full bg-white transition-transform duration-300 transform ${
                  darkMode ? "translate-x-5" : "translate-x-0"
                } flex items-center justify-center`}
              >
                {darkMode ? (
                  <FaMoon className="text-blue-700 text-[8px]" />
                ) : (
                  <FaSun className="text-yellow-500 text-[8px]" />
                )}
              </span>
            </button>

            {/* User Menu */}
            <div className="relative">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center space-x-1 focus:outline-none"
              >
                <FaUserCircle className={`text-xl ${darkMode ? "text-gray-300" : "text-gray-700"}`} />
                <FaChevronDown
                  className={`text-xs transition-transform duration-200 ${
                    userMenuOpen ? "rotate-180" : ""
                  } ${darkMode ? "text-gray-300" : "text-gray-700"}`}
                />
              </button>

              {/* Dropdown Menu */}
              {userMenuOpen && (
                <div
                  className={`absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 z-10 ${
                    darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
                  } border ${darkMode ? "border-gray-700" : "border-gray-200"}`}
                >
                  {localStorage.getItem("token") ? (
                    <>
                      <Link
                        to="/profile"
                        className={`block px-4 py-2 text-sm ${darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"}`}
                      >
                        Profile
                      </Link>
                      <Link
                        to="/settings"
                        className={`block px-4 py-2 text-sm ${darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"}`}
                      >
                        Settings
                      </Link>
                      <div className={`border-t ${darkMode ? "border-gray-700" : "border-gray-200"} my-1`}></div>
                      <button
                        onClick={handleLogout}
                        className={`block w-full text-left px-4 py-2 text-sm text-red-600 ${
                          darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"
                        }`}
                      >
                        Logout
                      </button>
                    </>
                  ) : (
                    <Link
                      to="/login"
                      className={`block px-4 py-2 text-sm ${darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"}`}
                    >
                      Login
                    </Link>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-300 overflow-hidden ${
          mobileMenuOpen ? "max-h-96" : "max-h-0"
        } ${darkMode ? "bg-gray-800" : "bg-gray-50"}`}
      >
        <nav className="px-4 py-2">
          <ul className="space-y-2">
            {navLinks.map((link, index) => (
              <li key={index}>
                <Link
                  to={link.path}
                  className={`block py-2 px-4 rounded ${
                    darkMode ? "text-white hover:bg-gray-700" : "text-gray-900 hover:bg-gray-200"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              </li>
            ))}
            <li className="border-t border-gray-700 pt-2 mt-2">
              <div className="flex items-center justify-between px-4 py-2">
                <span className={darkMode ? "text-gray-300" : "text-gray-700"}>Dark Mode</span>
                <button
                  onClick={() => setDarkMode(!darkMode)}
                  className={`relative w-10 h-5 rounded-full transition-colors duration-300 focus:outline-none ${
                    darkMode ? "bg-blue-700" : "bg-gray-300"
                  }`}
                >
                  <span
                    className={`absolute left-0.5 top-0.5 w-4 h-4 rounded-full bg-white transition-transform duration-300 transform ${
                      darkMode ? "translate-x-5" : "translate-x-0"
                    } flex items-center justify-center`}
                  >
                    {darkMode ? (
                      <FaMoon className="text-blue-700 text-[8px]" />
                    ) : (
                      <FaSun className="text-yellow-500 text-[8px]" />
                    )}
                  </span>
                </button>
              </div>
            </li>
            <li>
              {localStorage.getItem("token") ? (
                <button
                  onClick={handleLogout}
                  className={`w-full text-left block py-2 px-4 rounded ${
                    darkMode ? "bg-red-900 text-white hover:bg-red-800" : "bg-red-500 text-white hover:bg-red-600"
                  }`}
                >
                  Logout
                </button>
              ) : (
                <Link
                  to="/login"
                  className={`block py-2 px-4 rounded ${
                    darkMode ? "bg-blue-900 text-white hover:bg-blue-800" : "bg-blue-500 text-white hover:bg-blue-600"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Login
                </Link>
              )}
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header
