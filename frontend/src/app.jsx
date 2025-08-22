import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import Home from "./pages/Home"
import About from "./pages/about"
import Contact from "./pages/contact"
import PredictorForm from "./components/PredictionSection"
// import History from "./pages/History";
import Login from "./pages/Login"
import ForgotPassword from "./pages/forgetpassword"
import Register from "./pages/Register"
import Dashboard from "./pages/Dashboard"

// Function to check if user is authenticated
const isAuthenticated = () => {
  return localStorage.getItem("token") !== null
}


const getUserRole = () => {
  return localStorage.getItem("role")
}

// Protected Route Component
const ProtectedRoute = ({ element }) => {
  // Check if user is authenticated
  if (!isAuthenticated()) {
    return <Navigate to="/login" />
  }

  // Get user role
  const userRole = getUserRole()

  // Check if trying to access Home but is Admin
  if (window.location.pathname === "/" && userRole === "admin") {
    return <Navigate to="/dashboard" />
  }

  // Check if trying to access Dashboard but is Patient
  if (window.location.pathname === "/dashboard" && userRole === "patient") {
    return <Navigate to="/" />
  }


  return element
}

function App() {
  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgetpassword" element={<ForgotPassword />} />

        {/* Protected routes */}
        <Route path="/" element={<ProtectedRoute element={<Home />} />} />
        <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard />} />} />
        <Route path="/historyid" element={<ProtectedRoute element={<PatientHistory />} />} />
        <Route path="/about" element={<ProtectedRoute element={<About />} />} />
        <Route path="/PredictorForm" element={<ProtectedRoute element={<PredictorForm />} />} />
        <Route path="/contact" element={<ProtectedRoute element={<Contact />} />} />

        {/* Fallback route - redirect based on role */}
        <Route
          path="*"
          element={
            isAuthenticated() ? (
              getUserRole() === "admin" ? (
                <Navigate to="/dashboard" />
              ) : (
                <Navigate to="/" />
              )
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>
    </Router>
  )
}

export default App
import React from "react"
import PatientHistory from "./components/UserHistory"

