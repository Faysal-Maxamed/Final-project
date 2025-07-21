"use client"

import { useState, useEffect } from "react"
import { FaTachometerAlt, FaUsers, FaStethoscope, FaHistory, FaSignOutAlt, FaComments, FaBell, FaChartLine, FaHeartbeat, FaRegStar, FaChartBar, FaCube, FaRegEnvelope, FaSun, FaMoon, FaUserInjured, FaUserShield, FaBars, FaChevronLeft } from "react-icons/fa"
import axios from "axios"
import DashboardSection from "../components/DashboardSection"
import RegisterAdmin from "../components/RegisterAdmin"
import UsersList from "../components/UsersList"
import History from "./History"
import Advice from "./Advice"
import Feedback from "../pages/feedback"
import React from "react"
import PatientsList from "../components/PatientsList"
import AdminsList from "../components/AdminsList"

const Dashboard = () => {
  const [users, setUsers] = useState([])
  const [activeSection, setActiveSection] = useState("dashboard")
  const [userName, setUserName] = useState("")
  const [userEmail, setUserEmail] = useState("")
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [notificationCount, setNotificationCount] = useState(3)
  const [hoverIndex, setHoverIndex] = useState(null)
  const [fadeIn, setFadeIn] = useState(true)
  const [theme, setTheme] = useState("light")
  const [userAvatar, setUserAvatar] = useState("")
  const [darkMode, setDarkMode] = useState(localStorage.getItem("theme") === "dark")
  const [showLogoutModal, setShowLogoutModal] = useState(false)

  // Add logo/app name
  const appName = "MediAdmin";

  // Navigation items data
  const navItems = [
    { icon: <FaTachometerAlt />, label: "Dashboard", section: "dashboard" },
    { icon: <FaUserInjured />, label: "Patients", section: "patients" },
    { icon: <FaUserShield />, label: "Admins", section: "admins" },
    { icon: <FaStethoscope />, label: "Advice", section: "Advice" },
    { icon: <FaHistory />, label: "Patient History", section: "history" },
    { icon: <FaComments />, label: "Feedback", section: "Feedback" },
  ]

  // Handle section change with animation
  const handleSectionChange = (section) => {
    if (activeSection !== section) {
      setFadeIn(false)
      setTimeout(() => {
        setActiveSection(section)
        setFadeIn(true)
      }, 200)
    }
  }

  // Add sidebarCollapsed toggle handler
  const toggleSidebar = () => setSidebarCollapsed((prev) => !prev);

  // Component for nav items with enhanced hover effects
  function NavItem({ icon, label, active, section, index }) {
    return (
      <button
        className={`w-full flex items-center gap-3 py-3.5 px-4 rounded-xl transition-all duration-300 ease-in-out relative overflow-hidden group
          ${active 
            ? "bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 text-white font-medium" 
            : "text-gray-300 hover:text-white"
          }
          ${sidebarCollapsed ? "justify-center" : ""}
        `}
        onClick={() => handleSectionChange(section)}
        onMouseEnter={() => setHoverIndex(index)}
        onMouseLeave={() => setHoverIndex(null)}
      >
        {/* Background effect on hover */}
        {!active && (
          <div 
            className={`absolute inset-0 bg-gradient-to-r from-blue-600/80 via-indigo-500/80 to-purple-600/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10`}
          ></div>
        )}
        
        {/* Glow effect for active item */}
        {active && (
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 blur-xl opacity-30 -z-10"></div>
        )}
        
        <div className={`text-lg relative ${active ? "text-white" : "text-gray-300 group-hover:text-white"} transition-all duration-300 ${hoverIndex === index && !active ? "scale-110" : ""}`}>
          {icon}
        </div>
        
        {!sidebarCollapsed && (
          <span className={`text-sm relative ${active ? "text-white" : "text-gray-300 group-hover:text-white"} transition-all duration-300`}>
            {label}
          </span>
        )}
        
        {/* Indicator dot for active item */}
        {active && !sidebarCollapsed && (
          <div className="absolute right-3 w-1.5 h-1.5 rounded-full bg-white"></div>
        )}
      </button>
    )
  }

  useEffect(() => {
    // Get user information from localStorage
    const storedName = localStorage.getItem("userName")
    const storedEmail = localStorage.getItem("userEmail")
    const storedAvatar = localStorage.getItem("userAvatar")
    const storedTheme = localStorage.getItem("theme")

    if (storedName) {
      setUserName(storedName)
    }

    if (storedEmail) {
      setUserEmail(storedEmail)
    }

    if (storedAvatar) {
      setUserAvatar(storedAvatar)
    } else if (storedName) {
      // Generate avatar using initials if no avatar is stored
      const initials = storedName
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
      setUserAvatar(
        `https://ui-avatars.com/api/?name=${encodeURIComponent(storedName)}&background=4f8cff&color=fff&size=128&rounded=true&bold=true&length=2`
      )
    } else {
      // Default placeholder
      setUserAvatar("https://ui-avatars.com/api/?name=User&background=4f8cff&color=fff&size=128&rounded=true&bold=true&length=2")
    }

    // Set theme from localStorage or default to light
    if (storedTheme === "dark") {
      setTheme("dark")
      setDarkMode(true)
      document.documentElement.classList.add("dark")
    } else {
      setTheme("light")
      setDarkMode(false)
      document.documentElement.classList.remove("dark")
    }

    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/auth/users")
        setUsers(response.data)
      } catch (error) {
        console.error("Error fetching users:", error)
      }
    }

    fetchUsers()
  }, [])

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await axios.delete(`http://localhost:5000/api/auth/delete-user/${id}`)
        setUsers(users.filter((user) => user._id !== id))
      } catch (error) {
        console.error("Error deleting user:", error)
      }
    }
  }

  const handleLogout = () => {
    setShowLogoutModal(true)
  }

  const confirmLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("userName")
    localStorage.removeItem("userEmail")
    window.location.href = "/login"
  }

  // Theme toggle handler
  const handleThemeChange = (newTheme) => {
    setTheme(newTheme)
    setDarkMode(newTheme === "dark")
    localStorage.setItem("theme", newTheme)
    if (newTheme === "dark") {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }

  return (
    <div className={`flex min-h-screen ${darkMode ? "bg-gray-900" : "bg-[#f6f8fb]"}`}>
      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-8 max-w-sm w-full border border-gray-200 dark:border-gray-700 text-center">
            <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">Confirm Logout</h2>
            <p className="mb-6 text-gray-600 dark:text-gray-300">Are you sure you want to logout?</p>
            <div className="flex justify-center gap-4">
              <button
                onClick={confirmLogout}
                className="bg-gradient-to-r from-blue-600 to-teal-500 hover:shadow-lg text-white px-6 py-2 rounded-md font-semibold transition-all duration-200"
              >
                Yes, Logout
              </button>
              <button
                onClick={() => setShowLogoutModal(false)}
                className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-6 py-2 rounded-md font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition-all duration-200"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Sidebar */}
      <aside className={`fixed left-0 top-0 ${sidebarCollapsed ? "w-20" : "w-64"} h-screen bg-white/80 dark:bg-gray-800/80 border-r border-gray-100 dark:border-gray-700 flex flex-col justify-between py-6 px-2 shadow-xl z-20 transition-all duration-300 backdrop-blur-lg`}>
        {/* Logo & Collapse Button */}
        <div className="flex items-center justify-between mb-8 px-2">
          <div className="flex items-center gap-2">
            <img src="https://ui-avatars.com/api/?name=M+A&background=4f8cff&color=fff&size=40&rounded=true&bold=true" alt="Logo" className="w-10 h-10" />
            {!sidebarCollapsed && <span className="text-xl font-bold text-blue-700 dark:text-white tracking-wide">{appName}</span>}
          </div>
          <button onClick={toggleSidebar} className="p-2 rounded-lg hover:bg-blue-100 dark:hover:bg-gray-700 transition-all">
            {sidebarCollapsed ? <FaBars className="text-blue-700 dark:text-white" /> : <FaChevronLeft className="text-blue-700 dark:text-white" />}
          </button>
        </div>
        {/* User Info */}
        <div className={`flex flex-col items-center mb-8 transition-all duration-300 ${sidebarCollapsed ? "scale-0 h-0 mb-0" : "scale-100 h-auto mb-8"}`} style={{overflow: 'hidden'}}>
          <img
            src={userAvatar}
            alt="User Avatar"
            className="w-20 h-20 rounded-full mb-2 object-cover border-4 border-blue-200 shadow"
          />
          <div className="font-semibold text-gray-900 dark:text-white">{userName || "User"}</div>
          <div className="text-xs text-gray-400 dark:text-gray-300">{userEmail || "user@email.com"}</div>
        </div>
        {/* Navigation */}
        <nav className="flex flex-col gap-2">
          {navItems.map((item, idx) => (
            <div key={item.label} className="relative group">
              <button
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium transition-all duration-300 w-full overflow-hidden
                  ${activeSection === item.section
                    ? "bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 text-white shadow-lg"
                    : "text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-gray-700"}
                  ${sidebarCollapsed ? "justify-center px-2" : ""}
                `}
                onClick={() => handleSectionChange(item.section)}
                onMouseEnter={() => setHoverIndex(idx)}
                onMouseLeave={() => setHoverIndex(null)}
              >
                <span className={`text-lg ${activeSection === item.section ? "text-white" : "text-blue-700 dark:text-blue-300 group-hover:text-blue-700 dark:group-hover:text-white"}`}>{item.icon}</span>
                {!sidebarCollapsed && <span className="text-sm ml-2">{item.label}</span>}
              </button>
              {/* Tooltip for collapsed state */}
              {sidebarCollapsed && (
                <span className="absolute left-full top-1/2 -translate-y-1/2 ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 whitespace-nowrap">
                  {item.label}
                </span>
              )}
            </div>
          ))}
        </nav>
        {/* Bottom Section: Version & Logout */}
        <div className="flex flex-col items-center mt-8 mb-2">
          {!sidebarCollapsed && <div className="text-xs text-gray-400 mb-2">v1.0.0</div>}
          <button
            onClick={handleLogout}
            className="px-4 py-2 rounded-lg bg-red-500 text-white font-semibold shadow hover:bg-red-600 transition-all w-full"
            title="Logout"
          >
            <span className="flex items-center justify-center gap-2">
              <FaSignOutAlt />
              {!sidebarCollapsed && "Logout"}
            </span>
          </button>
        </div>
      </aside>
      {/* Main Content */}
      <main className={`flex-1 ${sidebarCollapsed ? "ml-20" : "ml-64"} ${darkMode ? "bg-gray-900" : "bg-[#f6f8fb]"} transition-all duration-300 min-h-screen`}>
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-8 py-4 bg-white/70 dark:bg-gray-800/70 shadow-sm mb-4 backdrop-blur-lg rounded-b-xl">
          <div className="text-2xl font-bold text-blue-700 dark:text-white tracking-wide">
            {`Hi Admin${userName ? ", " + userName : ""}`}
          </div>
          <div className="flex items-center gap-4">
            {/* Theme Toggle */}
            <button
              onClick={() => handleThemeChange(theme === "dark" ? "light" : "dark")}
              className="p-2 rounded-full bg-blue-100 dark:bg-gray-700 hover:bg-blue-200 dark:hover:bg-gray-600 transition-all"
              title="Toggle theme"
            >
              {theme === "dark" ? <FaSun className="text-yellow-400" /> : <FaMoon className="text-blue-700" />}
            </button>
            {/* User Avatar */}
            <img
              src={userAvatar}
              alt="User Avatar"
              className="w-10 h-10 rounded-full border-2 border-blue-200 shadow"
            />
          </div>
        </div>
        {/* Page Content - Centered with Fade Animation */}
        <div className="p-6 flex justify-center">
          <div className={`w-full max-w-7xl transition-opacity duration-300 ease-in-out ${fadeIn ? 'opacity-100' : 'opacity-0'}`}>
            {activeSection === "dashboard" && <DashboardSection theme={theme} darkMode={darkMode} setDarkMode={setDarkMode} />}
            {activeSection === "admin-register" && <RegisterAdmin theme={theme} darkMode={darkMode} setDarkMode={setDarkMode} />}
            {activeSection === "patients" && <PatientsList darkMode={darkMode} setDarkMode={setDarkMode} />}
            {activeSection === "admins" && <AdminsList darkMode={darkMode} setDarkMode={setDarkMode} />}
            {activeSection === "Advice" && <Advice theme={theme} darkMode={darkMode} setDarkMode={setDarkMode} />}
            {activeSection === "history" && <History theme={theme} darkMode={darkMode} setDarkMode={setDarkMode} />}
            {activeSection === "Feedback" && <Feedback theme={theme} darkMode={darkMode} setDarkMode={setDarkMode} />}
            {activeSection === "ViewPatients" && <ViewPatients darkMode={darkMode} setDarkMode={setDarkMode} />}
          </div>
        </div>
      </main>
    </div>
  )
}

export default Dashboard
