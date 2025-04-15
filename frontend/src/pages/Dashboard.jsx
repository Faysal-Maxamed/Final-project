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
      <aside className="w-64 bg-white p-6 border-r fixed top-0 left-0 h-full flex flex-col justify-between">
        <div>
          <div className="flex flex-col items-center">
            <img src="https://i.ibb.co/4pDNDk1/avatar.png" alt="Profile" className="w-20 h-20 rounded-full" />
            <h2 className="text-lg font-bold mt-2">{userName || "Admin User"}</h2>
            <p className="text-gray-500 text-sm">{userEmail || "admin@example.com"}</p>
          </div>

          <nav className="mt-6 space-y-4">
            <div
              onClick={() => setActiveSection("dashboard")}
              className="flex items-center gap-1 text-blue-600 font-medium cursor-pointer transition-all duration-300 ease-in-out hover:bg-gradient-to-r hover:from-blue-600 hover:to-teal-500 hover:text-white hover:scale-105 p-1 rounded-full"
            >
              <FaTachometerAlt size={18} /> Dashboard
            </div>
            <div
              onClick={() => setActiveSection("users")}
              className="flex items-center gap-2 cursor-pointer transition-all duration-300 ease-in-out hover:bg-gradient-to-r hover:from-blue-600 hover:to-teal-500 hover:text-white hover:scale-105 p-1 rounded-full"
            >
              <FaUsers size={18} /> Users
            </div>
            <div
              onClick={() => setActiveSection("Advice")}
              className="flex items-center gap-2 cursor-pointer transition-all duration-300 ease-in-out hover:bg-gradient-to-r hover:from-blue-600 hover:to-teal-500 hover:text-white hover:scale-105 p-1 rounded-full"
            >
              <FaStethoscope size={18} /> Advice
            </div>
            <div
              onClick={() => setActiveSection("history")}
              className="flex items-center gap-2 cursor-pointer transition-all duration-300 ease-in-out hover:bg-gradient-to-r hover:from-blue-600 hover:to-teal-500 hover:text-white hover:scale-105 p-1 rounded-full"
            >
              <FaHistory size={18} /> History
            </div>
            <div
              onClick={() => setActiveSection("Feedback")}
              className="flex items-center gap-2 cursor-pointer transition-all duration-300 ease-in-out hover:bg-gradient-to-r hover:from-blue-600 hover:to-teal-500 hover:text-white hover:scale-105 p-1 rounded-full"
            >
              <FaComments size={18} />Patient Feedback
            </div>
            <div
              onClick={() => setActiveSection("settings")}
              className="flex items-center gap-2 cursor-pointer transition-all duration-300 ease-in-out hover:bg-gradient-to-r hover:from-blue-600 hover:to-teal-500 hover:text-white hover:scale-105 p-1 rounded-full"
            >
              <FaCog size={18} /> Settings
            </div>
          </nav>
        </div>

        {/* Enhanced Log Out Button at the bottom */}
        <button
          onClick={handleLogout}
          className="mt-8 bg-gradient-to-r from-blue-600 to-teal-500 hover:shadow-lg text-white w-full py-3 rounded-lg shadow-md hover:shadow-lg transition-all ease-in-out duration-300"
        >
          <FaSignOutAlt className="inline-block mr-2" /> Log Out
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 ml-64 overflow-auto h-screen">
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
