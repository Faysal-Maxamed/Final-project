"use client"

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [role, setRole] = useState("patient")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
  
    try {
      // Make the API request
      const response = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
        role,
      });
  
      // Check if response contains token and role
      if (!response.data || !response.data.token || !response.data.role) {
        throw new Error("Invalid response from server");
      }
  
      // Store token and role in localStorage
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("role", response.data.role);
  
      // Set authorization header for future requests
      axios.defaults.headers.common["Authorization"] = `Bearer ${response.data.token}`;
  
      // Show success message
      alert("Login successful!");
  
      // Redirect based on role
      if (response.data.role === "admin") {
        navigate("/dashboard");
      } else if (response.data.role === "patient") {
        navigate("/");
      } else {
        // Default fallback (optional)
        navigate("/not-authorized");
      }
  
    } catch (err) {
      console.error("Login error:", err);
  
      if (err.response) {
        // The server responded with an error
        setError(err.response.data.error || "Authentication failed");
      } else if (err.request) {
        // The request was made but no response was received
        setError("No response from server. Please check if the server is running.");
      } else {
        // Something else caused the error
        setError(err.message || "An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>

        {error && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">{error}</div>}

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          >
            <option value="patient">Patient</option>
            <option value="admin">Admin</option>
          </select>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:bg-blue-300"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="mt-4 text-center text-sm">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-500">
            Register here
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Login
import React from "react"