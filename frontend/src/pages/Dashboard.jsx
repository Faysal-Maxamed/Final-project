"use client"

import { useState, useEffect } from "react"
import { FaTachometerAlt, FaUsers, FaStethoscope, FaHistory, FaSignOutAlt, FaComments, FaBell, FaChartLine, FaHeartbeat, FaRegStar, FaChartBar, FaCube, FaRegEnvelope, FaSun, FaMoon, FaUserInjured, FaUserShield } from "react-icons/fa"
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
      document.documentElement.classList.add("dark")
    } else {
      setTheme("light")
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
    localStorage.removeItem("token")
    localStorage.removeItem("userName")
    localStorage.removeItem("userEmail")
    window.location.href = "/login"
  }

  // Theme toggle handler
  const handleThemeChange = (newTheme) => {
    setTheme(newTheme)
    localStorage.setItem("theme", newTheme)
    if (newTheme === "dark") {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }

  return (
    <div className={`flex min-h-screen bg-[#f6f8fb] dark:bg-gray-900`}>
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 w-64 h-screen bg-white dark:bg-gray-800 border-r border-gray-100 dark:border-gray-700 flex flex-col justify-between py-6 px-4 shadow-sm z-20 transition-colors">
        {/* User Info */}
        <div>
          <div className="flex flex-col items-center mb-8">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgzCPZeVAjxjYRr3U4EDJmFwrUW45HpPF5G8tHsLAvGYHkuJyWhwczl6tHctWHLdIBFYo&usqp=CAU"
              alt="User Avatar"
              className="w-32 h-32 rounded-full mb-2 object-cover"
            />
            <div className="font-semibold text-gray-900 dark:text-white">{userName || "User"}</div>
            <div className="text-xs text-gray-400 dark:text-gray-300">{userEmail || "user@email.com"}</div>
          </div>
          {/* Navigation */}
          <nav className="flex flex-col gap-2">
            {navItems.map((item, idx) => (
              <button
                key={item.label}
                className={`flex items-center gap-3 px-4 py-2 rounded-lg text-base font-medium transition
                  ${activeSection === item.section
                    ? "bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 text-white"
                    : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"}
                `}
                onClick={() => handleSectionChange(item.section)}
              >
                <span className="text-lg">{item.icon}</span>
                {item.label}
              </button>
            ))}
          </nav>
        </div>
        {/* Light/Dark Toggle */}
        <h1>Version 1.0.0</h1>
        <div className="w-full flex flex-col items-center mt-8 mb-4">
      <div className="text-xs text-gray-400 mb-2">v1.0.0</div>
      <button
        onClick={() => {
          localStorage.removeItem('token');
          window.location.href = '/login';
        }}
        className="px-6 py-2 rounded-lg bg-red-500 text-white font-semibold shadow hover:bg-red-600 transition-all"
      >
        Logout
      </button>
    </div>
      </aside>
      {/* Main Content */}
      <main className="flex-1 ml-64 bg-[#f6f8fb] dark:bg-gray-900 transition-colors min-h-screen">

    
        {/* Page Content - Centered with Fade Animation */}
        <div className="p-6 flex justify-center">
          <div className={`w-full max-w-7xl transition-opacity duration-300 ease-in-out ${fadeIn ? 'opacity-100' : 'opacity-0'}`}>
            {activeSection === "dashboard" && <DashboardSection theme={theme} />}
            {activeSection === "admin-register" && <RegisterAdmin theme={theme} />}
            {activeSection === "patients" && <PatientsList />}
            {activeSection === "admins" && <AdminsList />}
            {activeSection === "Advice" && <Advice theme={theme} />}
            {activeSection === "history" && <History theme={theme} />}
            {activeSection === "Feedback" && <Feedback theme={theme} />}
          </div>
        </div>
      </main>
    </div>
  )
}

export default Dashboard
