"use client"

import { useState } from "react"
import axios from "axios"
import { User, Mail, Lock, Eye, EyeOff } from "lucide-react"

const RegisterAdmin = ({ closePopup, darkMode }) => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [message, setMessage] = useState("")
  const [showPassword, setShowPassword] = useState(false)

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  // Direct approach to close the modal
  const handleCancel = (e) => {
    e.preventDefault() // Prevent any default behavior
    e.stopPropagation() // Stop event propagation
    console.log("Cancel button clicked") // Add logging

    // Try multiple approaches to close the modal
    if (closePopup) {
      console.log("Calling closePopup function")
      closePopup()
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post("http://localhost:5000/api/auth/register-admin", {
        name,
        email,
        password,
      })
      setMessage(response.data.message)
      setName("")
      setEmail("")
      setPassword("")

      // Show success message briefly before closing popup
      setTimeout(() => {
        if (closePopup) {
          closePopup()
        }
      }, 1500) // Close after 1.5 seconds to allow user to see success message
    } catch (err) {
      setMessage("Error registering admin.")
    }
  }

  // For debugging
  console.log("closePopup is:", typeof closePopup)

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className={`${darkMode ? 'bg-gray-900' : 'bg-white'} p-6 rounded-xl shadow-xl w-96 relative`}>
        {/* Close Button */}
        <button type="button" onClick={handleCancel} className={`absolute top-2 right-2 ${darkMode ? 'text-gray-300' : 'text-gray-500'} text-xl`}>
          &times;
        </button>
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-teal-500">
            Register New Admin
          </h2>
          <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} mt-1 text-sm`}>Create a new administrator account</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className={`h-5 w-5 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
              </div>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={`w-full pl-10 pr-3 py-3 border ${darkMode ? 'border-gray-700 bg-gray-800 text-gray-100' : 'border-gray-300 bg-white text-gray-900'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                placeholder="Enter full name"
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className={`h-5 w-5 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full pl-10 pr-3 py-3 border ${darkMode ? 'border-gray-700 bg-gray-800 text-gray-100' : 'border-gray-300 bg-white text-gray-900'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                placeholder="Enter email address"
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className={`h-5 w-5 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full pl-10 pr-10 py-3 border ${darkMode ? 'border-gray-700 bg-gray-800 text-gray-100' : 'border-gray-300 bg-white text-gray-900'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                {showPassword ? (
                  <EyeOff className={`h-5 w-5 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                ) : (
                  <Eye className={`h-5 w-5 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                )}
              </button>
            </div>
          </div>
          <div className="flex gap-4 pt-2">
            <button
              type="button"
              onClick={handleCancel}
              className={`px-6 py-2.5 border ${darkMode ? 'border-gray-700 text-gray-200 hover:bg-gray-800' : 'border-gray-300 text-gray-700 hover:bg-gray-100'} rounded-lg transition-colors`}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 bg-gradient-to-r from-blue-600 to-teal-500 text-white py-3 px-4 rounded-lg hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300 transform hover:-translate-y-1 font-medium"
            >
              Register
            </button>
          </div>
          {message && (
            <div className={`text-center mt-2 text-sm ${darkMode ? 'text-gray-300 bg-gray-800' : 'text-gray-600 bg-gray-100'} p-2 rounded-md`}>{message}</div>
          )}
        </form>
      </div>
    </div>
  )
}

export default RegisterAdmin
import React from "react"