"use client"

import { useState, useEffect } from "react"
import { FaTachometerAlt, FaUsers, FaStethoscope, FaHistory, FaSignOutAlt, FaComments, FaBell, FaChartLine, FaHeartbeat, FaRegStar } from "react-icons/fa"
import axios from "axios"
import DashboardSection from "../components/DashboardSection"
import RegisterAdmin from "../components/RegisterAdmin"
import UsersList from "../components/UsersList"
import History from "./History"
import Advice from "./Advice"
import Feedback from "../pages/feedback"
import React from "react"

const Dashboard = () => {
  const [users, setUsers] = useState([])
  const [activeSection, setActiveSection] = useState("dashboard")
  const [userName, setUserName] = useState("")
  const [userEmail, setUserEmail] = useState("")
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [notificationCount, setNotificationCount] = useState(3)
  const [hoverIndex, setHoverIndex] = useState(null)
  const [fadeIn, setFadeIn] = useState(true)

  // Navigation items data
  const navItems = [
    { icon: <FaTachometerAlt />, label: "Dashboard", section: "dashboard" },
    { icon: <FaUsers />, label: "Users", section: "users" },
    { icon: <FaStethoscope />, label: "Advice", section: "Advice" },
    { icon: <FaHistory />, label: "History", section: "history" },
    { icon: <FaComments />, label: "Feedback", section: "Feedback" }
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

    if (storedName) {
      setUserName(storedName)
    }

    if (storedEmail) {
      setUserEmail(storedEmail)
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

  return (
    <div className="flex bg-gray-100 min-h-screen">
      {/* Modern Sidebar with Glass Effect */}
      <aside 
        className={`${sidebarCollapsed ? 'w-24' : 'w-80'} bg-[#111827] bg-opacity-95 backdrop-blur-lg text-white fixed top-0 left-0 h-full flex flex-col justify-between z-10 transition-all duration-300 ease-in-out shadow-2xl border-r border-white/5`}
      >
        {/* Sidebar Header with Logo */}
        <div>
          <div className="flex items-center justify-between px-6 py-6 border-b border-white/10">
            {!sidebarCollapsed && (
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center mr-3 shadow-lg shadow-blue-500/20">
                  <FaHeartbeat className="text-white text-lg" />
                </div>
                <h1 className="text-xl font-bold text-white">Health<span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Care</span></h1>
              </div>
            )}
            {sidebarCollapsed && (
              <div className="h-10 w-10 mx-auto rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
                <FaHeartbeat className="text-white text-lg" />
              </div>
            )}
            <button 
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="p-2 rounded-full hover:bg-white/10 transition-colors text-gray-400 hover:text-white"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                {sidebarCollapsed ? (
                  <path d="M13 17l5-5-5-5M6 17l5-5-5-5" />
                ) : (
                  <path d="M11 17l-5-5 5-5M18 17l-5-5 5-5" />
                )}
              </svg>
            </button>
          </div>

          {/* User Profile with Animated Border */}
          <div className={`${sidebarCollapsed ? 'justify-center' : 'px-6'} flex items-center py-6 border-b border-white/10`}>
            <div className={`${sidebarCollapsed ? 'w-14 h-14' : 'w-16 h-16'} rounded-full relative group`}>
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 animate-spin-slow opacity-70"></div>
              <div className="absolute inset-[2px] rounded-full overflow-hidden">
                <img src="https://i.ibb.co/4pDNDk1/avatar.png" alt="Profile" className="w-full h-full object-cover" />
              </div>
            </div>
            {!sidebarCollapsed && (
              <div className="ml-4">
                <h2 className="text-lg font-bold text-white">{userName || "Admin User"}</h2>
                <div className="flex items-center text-blue-300 text-xs">
                  <span className="mr-2">{userEmail || "admin@example.com"}</span>
                  <div className="h-2 w-2 rounded-full bg-green-400 animate-pulse"></div>
                </div>
              </div>
            )}
          </div>

          {/* Navigation Menu */}
          <div className="px-4 py-6">
            <div className={`text-xs text-gray-400 uppercase tracking-wider mb-4 ${sidebarCollapsed ? 'text-center' : 'px-2'}`}>
              {!sidebarCollapsed && "Main Menu"}
            </div>
            <div className="space-y-2">
              {navItems.map((item, index) => (
                <NavItem
                  key={index}
                  icon={item.icon}
                  label={item.label}
                  active={activeSection === item.section}
                  section={item.section}
                  index={index}
                />
              ))}
            </div>
            
            {/* Stats Section */}
            {!sidebarCollapsed && (
              <div className="mt-8 px-2">
                <div className="text-xs text-gray-400 uppercase tracking-wider mb-4">System Status</div>
                <div className="bg-white/5 rounded-xl p-4 backdrop-blur-sm">
                  <div className="flex items-center justify-between mb-3">
                    <div className="text-xs text-gray-300">System Health</div>
                    <div className="text-xs text-green-400">Excellent</div>
                  </div>
                  <div className="w-full h-1.5 bg-gray-700 rounded-full overflow-hidden mb-4">
                    <div className="h-full bg-gradient-to-r from-green-400 to-emerald-500 rounded-full" style={{ width: '95%' }}></div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="h-2 w-2 rounded-full bg-green-400 mr-2"></div>
                      <span className="text-xs text-gray-300">Online</span>
                    </div>
                    <div className="flex items-center">
                      <FaRegStar className="text-yellow-400 text-xs mr-1" />
                      <span className="text-xs text-gray-300">95%</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar Footer */}
        <div className="p-4">
          <button
            onClick={handleLogout}
            className={`w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white font-medium shadow-lg shadow-red-500/20 transition-all duration-300 flex items-center ${sidebarCollapsed ? 'justify-center' : 'justify-center gap-3'} hover:scale-[1.02] active:scale-[0.98]`}
          >
            <FaSignOutAlt className={sidebarCollapsed ? '' : 'mr-2'} />
            {!sidebarCollapsed && <span>Log Out</span>}
          </button>
          
          {!sidebarCollapsed && (
            <div className="text-center mt-4 text-xs text-gray-500">
              Healthcare Admin v1.2.0
            </div>
          )}
        </div>
      </aside>

      {/* Main Content */}
      <main className={`flex-1 ${sidebarCollapsed ? 'ml-24' : 'ml-80'} transition-all duration-300 ease-in-out`}>
        {/* Header */}
        <header className="bg-white shadow-sm p-4 flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-600 rounded-lg shadow-sm">
              {activeSection === "dashboard" && <FaChartLine />}
              {activeSection === "users" && <FaUsers />}
              {activeSection === "Advice" && <FaStethoscope />}
              {activeSection === "history" && <FaHistory />}
              {activeSection === "Feedback" && <FaComments />}
            </div>
            <h1 className="text-xl font-bold text-gray-800">
              {activeSection === "dashboard" && "Dashboard Overview"}
              {activeSection === "users" && "User Management"}
              {activeSection === "Advice" && "Health Advice"}
              {activeSection === "history" && "Patient History"}
              {activeSection === "Feedback" && "Patient Feedback"}
            </h1>
          </div>

          <div className="flex items-center space-x-4">
            <button className="relative p-2 rounded-full hover:bg-gray-100 transition-colors group">
              <FaBell className="text-gray-500 group-hover:text-gray-700" />
              {notificationCount > 0 && (
                <span className="absolute top-0 right-0 h-5 w-5 bg-red-500 text-white text-xs flex items-center justify-center rounded-full border-2 border-white">
                  {notificationCount}
                </span>
              )}
            </button>
            <div className="h-9 w-9 rounded-full overflow-hidden ring-2 ring-blue-500/20 hover:ring-blue-500/50 transition-all duration-300">
              <img src="https://i.ibb.co/4pDNDk1/avatar.png" alt="Profile" className="w-full h-full object-cover" />
            </div>
          </div>
        </header>

        {/* Page Content - Centered with Fade Animation */}
        <div className="p-6 flex justify-center">
          <div className={`w-full max-w-7xl transition-opacity duration-300 ease-in-out ${fadeIn ? 'opacity-100' : 'opacity-0'}`}>
            {activeSection === "dashboard" && <DashboardSection />}
            {activeSection === "admin-register" && <RegisterAdmin />}
            {activeSection === "users" && <UsersList users={users} handleDelete={handleDelete} />}
            {activeSection === "Advice" && <Advice />}
            {activeSection === "history" && <History />}
            {activeSection === "Feedback" && <Feedback />}
          </div>
        </div>
      </main>
    </div>
  )
}

export default Dashboard
