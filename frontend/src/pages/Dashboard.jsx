"use client"

import { useState, useEffect } from "react"
import { FaTachometerAlt, FaUsers, FaStethoscope, FaHistory, FaCog, FaSignOutAlt ,FaComments} from "react-icons/fa"
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

  // Component for nav items
function NavItem({ icon, label, active, onClick }) {
  return (
    <button
      className={`w-full flex items-center gap-2 py-2 px-3 rounded-lg transition-all duration-300 ease-in-out hover:bg-gradient-to-r hover:from-blue-600 hover:to-cyan-500 hover:text-white hover:scale-105 ${
        active ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white" : "text-slate-400 hover:text-slate-100"
      }`}
      onClick={onClick}
    >
      {icon}
      {label}
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
    <div className="flex bg-gray-100">
     {/* Fixed Sidebar */}
     <aside className="w-64  backdrop-blur-sm border-r border-slate-700/50 p-6 fixed top-0 left-0 h-full flex flex-col justify-between z-10">
        <div>
          <div className="flex flex-col items-center">
            <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-cyan-500/50 shadow-lg shadow-cyan-500/20">
              <img src="https://i.ibb.co/4pDNDk1/avatar.png" alt="Profile" className="w-full h-full object-cover" />
            </div>
            <h2 className="text-lg font-bold mt-2 text-cyan-400">{userName || "Admin User"}</h2>
            <p className="text-slate-400 text-sm">{userEmail || "admin@example.com"}</p>
          </div>

          {/* <div className="mt-8 pt-4 border-t border-slate-700/50">
            <div className="text-xs text-slate-500 mb-2 font-mono">SYSTEM STATUS</div>
            <div className="space-y-3">
              <StatusItem label="Core Systems" value={systemStatus} color="cyan" />
              <StatusItem label="Users" value={userCount > 0 ? 100 : 0} color="green" />
              <StatusItem label="Network" value={92} color="blue" />
            </div>
          </div> */}

          <nav className="mt-6 space-y-2">
            <NavItem
              icon={<FaTachometerAlt size={18} />}
              label="Dashboard"
              active={activeSection === "dashboard"}
              onClick={() => setActiveSection("dashboard")}
            />
            <NavItem
              icon={<FaUsers size={18} />}
              label="Users"
              active={activeSection === "users"}
              onClick={() => setActiveSection("users")}
            />
            <NavItem
              icon={<FaStethoscope size={18} />}
              label="Advice"
              active={activeSection === "Advice"}
              onClick={() => setActiveSection("Advice")}
            />
            <NavItem
              icon={<FaHistory size={18} />}
              label="History"
              active={activeSection === "history"}
              onClick={() => setActiveSection("history")}
            />
            <NavItem
              icon={<FaComments size={18} />}
              label="Patient Feedback"
              active={activeSection === "Feedback"}
              onClick={() => setActiveSection("Feedback")}
            />
          </nav>
        </div>

        {/* Enhanced Log Out Button at the bottom */}
        <button
          onClick={handleLogout}
          className="mt-8 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white w-full py-3 rounded-lg shadow-md hover:shadow-lg transition-all ease-in-out duration-300 flex items-center justify-center"
        >
          <FaSignOutAlt className="mr-2" /> Log Out
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 ml-64 overflow-auto h-screen">
         {/* Header */}
         <header
          className={`flex items-center justify-between py-4 mb-6 ${ "border-b border-slate-200/50"
          }`}
        >
          <div className="flex items-center space-x-2">
            <FaTachometerAlt className={`h-6 w-6 ${"text-blue-600"}`} />
            <span
              className={`text-xl font-bold ${
                   "bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent"
              }`}
            >
              HPR ADMIN DASHBOARD
            </span>
          </div>

          <div className="flex items-center space-x-3">
            <button
              className={`relative bg-transparent border-none p-2 rounded-full transition-colors ${
               "text-slate-500 hover:text-slate-800 hover:bg-slate-200/50"
              }`}
            >
              <span
                className={`absolute -top-1 -right-1 h-2 w-2 rounded-full animate-pulse ${
                "bg-blue-500"
                }`}
              ></span>
            </button>
          </div>
        </header>
        {activeSection === "dashboard" && <DashboardSection />}
        {activeSection === "admin-register" && <RegisterAdmin />}
        {activeSection === "users" && <UsersList users={users} handleDelete={handleDelete} />}
        {activeSection === "Advice" && <Advice />}
        {activeSection === "history" && <History />}
        {activeSection === "Feedback" && <Feedback />}
      </main>
    </div>
  )
}

export default Dashboard
