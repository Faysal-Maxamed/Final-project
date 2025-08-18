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
import EditProfilePopup from "./edit"

const Header = ({ darkMode, setDarkMode }) => {
  const navigate = useNavigate()
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const [showEditProfile, setShowEditProfile] = useState(false)

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
    { name: "Contact", path: "/contact" },
  ]

  return (
    <>
      <header
        className={`sticky top-0 z-50 w-full transition-all duration-300 backdrop-blur-lg bg-white/70 dark:bg-gray-900/70 shadow-lg ${
          scrolled ? "shadow-2xl" : ""
        }`}
      >
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="flex justify-between items-center py-3 md:py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <span className="text-2xl font-extrabold bg-gradient-to-r from-indigo-500 to-emerald-400 bg-clip-text text-transparent tracking-tight drop-shadow-lg">
              HRP
            </span>
            <span className="hidden sm:inline text-lg font-bold text-gray-700 dark:text-gray-200 tracking-wide">Management</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link, index) => (
              <Link
                key={index}
                to={link.path}
                className="relative font-semibold text-gray-700 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-emerald-400 transition-colors duration-200 px-2 py-1 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-gradient-to-r after:from-indigo-500 after:to-emerald-400 hover:after:w-full after:transition-all after:duration-300"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Right Side: Dark Mode Toggle & User Menu */}
          <div className="flex items-center gap-4">
            {/* Dark Mode Toggle */}<button
              onClick={() => setDarkMode(!darkMode)}
              className={`w-10 h-10 flex items-center justify-center rounded-full border border-gray-200 dark:border-gray-700 bg-white/60 dark:bg-gray-800/60 shadow hover:scale-105 transition-all focus:outline-none`}
              aria-label="Toggle dark mode"
            >
              {darkMode ? (
                <FaMoon className="text-indigo-400 text-xl" />
              ) : (
                <FaSun className="text-yellow-400 text-xl" />
              )}
            </button>

            {/* User Menu */}
            <div className="relative">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center gap-1 focus:outline-none px-2 py-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition"
              >
                <FaUserCircle className="text-2xl text-gray-500 dark:text-gray-300" />
                <FaChevronDown
                  className={`text-xs transition-transform duration-200 ${
                    userMenuOpen ? "rotate-180" : ""
                  } text-gray-500 dark:text-gray-300`}
                />
              </button>

              {/* Dropdown Menu */}
              {userMenuOpen && (
                <div
                  className="absolute right-0 mt-2 w-48 rounded-xl shadow-2xl py-2 z-10 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 animate-fade-in"
                >
                  {localStorage.getItem("token") ? (
                    <>
                      <div className="border-t border-gray-200 dark:border-gray-700 my-1"></div>
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-800 rounded"
                      >
                        Logout
                      </button>
                    </>
                  ) : (
                    <Link
                      to="/login"
                      className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded"
                    >
                      Login
                    </Link>
                  )}
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden flex items-center justify-center w-10 h-10 rounded-full border border-gray-200 dark:border-gray-700 bg-white/60 dark:bg-gray-800/60 shadow ml-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <svg
                className="w-6 h-6 text-gray-700 dark:text-gray-200"
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
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-300 overflow-hidden ${
          mobileMenuOpen ? "max-h-96" : "max-h-0"} bg-white/90 dark:bg-gray-900/90 backdrop-blur-lg border-b border-gray-100 dark:border-gray-800`}
          >
            <nav className="px-4 py-2 flex flex-col gap-2">
              {navLinks.map((link, index) => (
                <Link
                  key={index}
                  to={link.path}
                  className="block py-2 px-4 rounded font-semibold text-gray-700 dark:text-gray-200 hover:bg-indigo-50 dark:hover:bg-gray-800 transition"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <div className="border-t border-gray-200 dark:border-gray-700 my-2"></div>
              <div className="flex items-center justify-between px-4 py-2">
                <span className="text-gray-500 dark:text-gray-300">Dark Mode</span>
                <button
                  onClick={() => setDarkMode(!darkMode)}
                  className={`w-10 h-5 rounded-full transition-colors duration-300 focus:outline-none border border-gray-200 dark:border-gray-700 bg-white/60 dark:bg-gray-800/60 flex items-center`}
                >
                  <span
                    className={`inline-block w-4 h-4 rounded-full bg-indigo-500 dark:bg-emerald-400 transition-transform duration-300 transform ${
                      darkMode ? "translate-x-5" : "translate-x-0"
                    }`}
                  ></span>
                </button>
              </div>
              <div className="flex flex-col gap-2 mt-2">
                {localStorage.getItem("token") ? (
                  <button
                    onClick={handleLogout}
                    className="w-full text-left block py-2 px-4 rounded bg-red-500 text-white hover:bg-red-600"
                  >
                    Logout
                  </button>
                ) : (
                  <Link
                    to="/login"
                    className="block py-2 px-4 rounded bg-indigo-500 text-white hover:bg-indigo-600"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Login
                  </Link>
                )}
              </div>
            </nav>
          </div>
        </header>
        
        {/* EditProfile Popup */}
        {showEditProfile && (
          <EditProfilePopup 
            onClose={() => setShowEditProfile(false)}
          />
        )}
      </>
    )
  }
  
  export default Header