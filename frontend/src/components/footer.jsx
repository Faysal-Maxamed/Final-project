

import { Facebook, Twitter, Instagram, Linkedin, Github } from "lucide-react"
import { useState } from "react"
import React from "react"
const Footer = ({ darkMode = false }) => {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear())
  const [hoveredIcon, setHoveredIcon] = useState(null)

  // Social media links with their respective hover colors
  const socialLinks = [
    { name: "Facebook", icon: Facebook, color: "hover:text-blue-600" },
    { name: "Instagram", icon: Instagram, color: "hover:text-pink-600" },
    { name: "Twitter", icon: Twitter, color: "hover:text-blue-400" },
    { name: "GitHub", icon: Github, color: "hover:text-gray-800 dark:hover:text-white" },
    { name: "LinkedIn", icon: Linkedin, color: "hover:text-blue-700" },
  ]

  // Navigation links
  const navLinks = [
    { name: "Home", href: "#" },
    { name: "About", href: "#" },
    { name: "Features", href: "#" },
    { name: "Pricing", href: "#" },
    { name: "Contact", href: "#" },
    { name: "Terms", href: "#" },
    { name: "Privacy", href: "#" },
  ]

  return (
    <footer
      className={`relative w-full py-12 overflow-hidden ${
        darkMode
          ? "bg-gradient-to-b from-gray-900 to-gray-950 text-gray-100"
          : "bg-gradient-to-b from-white to-gray-50 text-gray-800"
      }`}
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden opacity-5 pointer-events-none">
        <div className="absolute -right-10 -top-10 w-40 h-40 rounded-full bg-gradient-to-r from-purple-500 to-blue-500"></div>
        <div className="absolute -left-10 -bottom-10 w-40 h-40 rounded-full bg-gradient-to-r from-blue-500 to-teal-500"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center">
          {/* Logo and brand */}
          <div className="flex items-center mb-8 group">
            <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center text-white font-bold text-sm shadow-lg transform transition-transform group-hover:scale-110 duration-300">
              A
            </div>
            <span className="ml-3 text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
              Acme Inc
            </span>
          </div>

          {/* Social media links */}
          <div className="flex space-x-8 mb-10">
            {socialLinks.map((social, index) => (
              <a
                key={social.name}
                href="#"
                className={`transform transition-all duration-300 ${
                  hoveredIcon === social.name
                    ? "scale-125 " + social.color
                    : darkMode
                      ? "text-gray-400"
                      : "text-gray-500"
                }`}
                onMouseEnter={() => setHoveredIcon(social.name)}
                onMouseLeave={() => setHoveredIcon(null)}
                aria-label={social.name}
              >
                <social.icon className="h-5 w-5" />
              </a>
            ))}
          </div>

          {/* Navigation links */}
          <nav className="flex flex-wrap justify-center gap-x-8 gap-y-3 mb-10">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`text-sm font-medium relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-gradient-to-r after:from-blue-600 after:to-purple-600 hover:after:w-full after:transition-all after:duration-300 ${
                  darkMode ? "text-gray-300 hover:text-white" : "text-gray-600 hover:text-gray-900"
                }`}
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Divider */}
          <div className="w-24 h-1 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 mb-8 opacity-70"></div>

          {/* Copyright */}
          <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
            &copy; {currentYear} Acme Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
