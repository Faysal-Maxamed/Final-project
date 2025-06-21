import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import { Eye, EyeOff, Lock, Mail, User } from "lucide-react"


import React from "react"
const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [role, setRole] = useState("patient")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      // Make the API request
      const response = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
        role,
      })

      // Check if response contains token and role
      if (!response.data || !response.data.token || !response.data.role) {
        throw new Error("Invalid response from server")
      }

      // Store token and role in localStorage
      localStorage.setItem("token", response.data.token)
      localStorage.setItem("role", response.data.role)

      // Store user email in localStorage
      localStorage.setItem("userEmail", email)

      // If the response includes user data, store it
      if (response.data.name) {
        localStorage.setItem("userName", response.data.name)
      } else {
        // If name is not in the response, try to get user data
        try {
          // Set authorization header for the request
          axios.defaults.headers.common["Authorization"] = `Bearer ${response.data.token}`

          // Get user data
          const userResponse = await axios.get("http://localhost:5000/api/auth/me")
          if (userResponse.data && userResponse.data.name) {
            localStorage.setItem("userName", userResponse.data.name)
          } else {
            // If we can't get the name, use email as fallback
            const username = email.split("@")[0]
            localStorage.setItem("userName", username)
          }
        } catch (userError) {
          console.error("Error fetching user data:", userError)
          // Use email as fallback for name
          const username = email.split("@")[0]
          localStorage.setItem("userName", username)
        }
      }

      // Set authorization header for future requests
      axios.defaults.headers.common["Authorization"] = `Bearer ${response.data.token}`

      // Show success message
      alert("Login successful!")

      // Redirect based on role
      if (response.data.role === "admin") {
        navigate("/dashboard")
      } else if (response.data.role === "patient") {
        navigate("/")
      } else {
        // Default fallback (optional)
        navigate("/not-authorized")
      }
    } catch (err) {
      console.error("Login error:", err)

      if (err.response) {
        // The server responded with an error
        setError(err.response.data.error || "Authentication failed")
      } else if (err.request) {
        // The request was made but no response was received
        setError("No response from server. Please check if the server is running.")
      } else {
        // Something else caused the error
        setError(err.message || "An unexpected error occurred")
      }
    } finally {
      setLoading(false)
    }
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50">
      <div className="bg-white p-8 shadow-md  w-full max-w-md border border-gray-100">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-teal-500">
            Welcome Back
          </h2>
          <p className="text-gray-600 mt-2">Sign in to your account</p>
        </div>

        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded-md">
            <p className="font-medium">Error</p>
            <p className="text-sm">{error}</p>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="email"
                type="email"
                placeholder="Enter Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5 text-gray-400" />
                ) : (
                  <Eye className="h-5 w-5 text-gray-400" />
                )}
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="role" className="block text-sm font-medium text-gray-700">
              Role
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-gray-400" />
              </div>
              <select
                id="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
              >
                <option value="patient">Patient</option>
                <option value="admin">Admin</option>
              </select>
            </div>
          </div>
          <Link
            to="/forgetpassword"
            className="flex justify-end text-sm font-medium text-blue-600 hover:text-teal-500 transition-colors"
          >
            Forgot password?
          </Link>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-teal-500 text-white py-3 px-4 rounded-lg hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300 transform hover:-translate-y-1 font-medium disabled:opacity-70 disabled:cursor-not-allowed"
            disabled={loading}
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Signing in...
              </span>
            ) : (
              "Sign in"
            )}
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-gray-600">
            Don't have an account?{" "}
            <Link to="/register" className="font-medium text-blue-600 hover:text-teal-500 transition-colors">
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login
