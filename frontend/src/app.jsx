import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/about";
import Contact from "./pages/contact";
import PredictorForm from "./pages/Predict";
import History from "./pages/History";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard"; // Import Dashboard

// Function to check if user is authenticated
const isAuthenticated = () => {
  return localStorage.getItem("token") !== null;
};

// Protected Route Component
const ProtectedRoute = ({ element }) => {
  return isAuthenticated() ? element : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* Protecting these routes */}
        <Route path="/" element={<ProtectedRoute element={<Home />} />} />
        <Route path="/about" element={<ProtectedRoute element={<About />} />} />
        <Route path="/PredictorForm" element={<ProtectedRoute element={<PredictorForm />} />} />
        <Route path="/history" element={<ProtectedRoute element={<History />} />} />
        <Route path="/contact" element={<ProtectedRoute element={<Contact />} />} />
        <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard />} />} /> {/* Added Dashboard */}
      </Routes>
    </Router>
  );
}

export default App;
