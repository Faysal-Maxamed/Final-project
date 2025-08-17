"use client"

import { useState, useEffect } from "react"
import { FaTachometerAlt, FaUsers, FaStethoscope, FaHistory, FaSignOutAlt, FaComments, FaBell, FaChartLine, FaHeartbeat, FaRegStar, FaChartBar, FaCube, FaRegEnvelope, FaSun, FaMoon, FaUserInjured, FaUserShield, FaBars, FaChevronLeft, FaChartPie, FaTable, FaCog, FaSearch, FaUserCircle } from "react-icons/fa"
import axios from "axios"
import DashboardSection from "../components/DashboardSection"
import AdminProfile from "./AdminProfile"
import RegisterAdmin from "../components/RegisterAdmin"
import UsersList from "../components/UsersList"
import History from "./History"
import Advice from "./Advice"
import Feedback from "../pages/feedback"
import React from "react"
import PatientsList from "../components/PatientsList"
import AdminsList from "../components/AdminsList"
import Contact from "./contact"
import AdminContacts from "./AdminContacts"

const Dashboard = () => {
  const [users, setUsers] = useState([])
  const [activeSection, setActiveSection] = useState("dashboard")
  const [userName, setUserName] = useState("")
  const [userEmail, setUserEmail] = useState("")
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [notificationCount, setNotificationCount] = useState()
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
    { icon: <FaRegEnvelope />, label: "Contact", section: "contact" },
    { icon: <FaRegEnvelope />, label: "Admin Contact", section: "admincontacts" },
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
    confirmLogout()
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
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 w-64 h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white flex flex-col shadow-2xl z-30">
        {/* Logo and Menu */}
        <div>
          <div className="flex items-center gap-3 px-6 py-6">
            <FaChartPie className="text-3xl text-blue-400" />
            <span className="text-2xl font-bold tracking-wide">HRP System</span>
          </div>
          <nav className="mt-6 flex flex-col gap-1">
            {[ 
              { icon: <FaTachometerAlt />, label: "Dashboard", section: "dashboard" },
              { icon: <FaUserInjured />, label: "Patients", section: "patients" },
              { icon: <FaUserShield />, label: "Admins", section: "admins" },
              { icon: <FaUserCircle />, label: "Profile", section: "profile" },
              { icon: <FaStethoscope />, label: "Advice", section: "Advice" },
              { icon: <FaHistory />, label: "History", section: "history" },
              { icon: <FaComments />, label: "Feedback", section: "Feedback" },
              { icon: <FaComments />, label: "Contact", section: "admincontacts" },
            ].map((item, idx) => (
              <button
                key={item.label}
                className={`flex items-center gap-3 px-6 py-3 text-lg font-medium rounded-lg transition-all duration-200 ${activeSection === item.section ? "bg-gradient-to-r from-blue-600 to-indigo-500 shadow text-white" : "hover:bg-gray-800 text-gray-300"}`}
                onClick={() => handleSectionChange(item.section)}
              >
                <span className="text-xl">{item.icon}</span>
                <span>{item.label}</span>
              </button>
            ))}
          </nav>
        </div>
        {/* User Info and Logout */}
        <div className="px-6 py-6 border-t border-gray-800 flex flex-col gap-3 mt-auto">
          <div className="flex items-center gap-3 mb-2">
            <img src={userAvatar} alt="User Avatar" className="w-12 h-12 rounded-full border-2 border-blue-400" />
            <div>
              <div className="font-semibold text-white">{userName || "User"}</div>
              <div className="text-xs text-gray-400">{userEmail || "user@email.com"}</div>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-500 text-white font-semibold shadow hover:bg-red-600 transition-all w-full justify-center"
            title="Logout"
          >
            <FaSignOutAlt /> Logout
          </button>
        </div>
      </aside>
      {/* Main Content */}
      <main className="flex-1 min-h-screen bg-gray-50 dark:bg-gray-900 ml-64 text-gray-900 dark:text-gray-100">
        {/* Header */}
        <div className="flex items-center justify-between px-10 py-8 dark:bg-gray-900 shadow mb-8 sticky top-0 z-20">
          <div className="text-2xl italic font-bold text-gray-700 dark:text-white tracking-wide">
            Welcome Back, {userName || "Admin"} <span className="inline-block">!</span>
          </div>
          <div className="flex items-center gap-4">
            {/* Search Input */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 transition-all bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 min-w-[180px]"
              />
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-300" />
            </div>
            {/* Notification Icon */}
            <button
              className="relative p-2 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-blue-50 dark:hover:bg-gray-700 transition-all"
              onClick={() => setActiveSection('admincontacts')}
            >
              <FaBell className="text-blue-500 text-xl" />
              {notificationCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5 font-bold">{notificationCount}</span>
              )}
            </button>
            {/* Theme Toggle */}
            <button
              onClick={() => handleThemeChange(theme === "dark" ? "light" : "dark")}
              className="p-2 rounded-full bg-blue-100 dark:bg-gray-700 hover:bg-blue-200 dark:hover:bg-gray-600 transition-all"
              title="Toggle theme"
            >
              {theme === "dark" ? <FaMoon className="text-yellow-400" /> : <FaSun className="text-blue-700" />}
            </button>
          </div>
        </div>
        {/* Main Dashboard Section */}
        <div className="px-6 pb-10">
          {activeSection === "dashboard" && <DashboardSection theme={theme} darkMode={darkMode} setDarkMode={setDarkMode} />}
          {activeSection === "admin-register" && <RegisterAdmin theme={theme} darkMode={darkMode} setDarkMode={setDarkMode} />}
          {activeSection === "patients" && <PatientsList darkMode={darkMode} setDarkMode={setDarkMode} />}
          {activeSection === "admins" && <AdminsList darkMode={darkMode} setDarkMode={setDarkMode} />}
          {activeSection === "profile" && <AdminProfile onClose={() => setActiveSection('dashboard')} />}
          {activeSection === "Advice" && <Advice theme={theme} darkMode={darkMode} setDarkMode={setDarkMode} />}
          {activeSection === "history" && <History theme={theme} darkMode={darkMode} setDarkMode={setDarkMode} />}
          {activeSection === "Feedback" && <Feedback theme={theme} darkMode={darkMode} setDarkMode={setDarkMode} />}
          {activeSection === "ViewPatients" && <ViewPatients darkMode={darkMode} setDarkMode={setDarkMode} />}
          {activeSection === "admincontacts" && <AdminContacts darkMode={darkMode} setDarkMode={setDarkMode} />}
        </div>
      </main>
    </div>
  )
}

export default Dashboard
