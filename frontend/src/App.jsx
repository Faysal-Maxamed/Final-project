import React, { useEffect, useState } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Predict from "./pages/Predict";
import History from "./pages/History";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Navbar from "./components/Navbar";
import About from "./pages/About";
import Contact from "./pages/Contact";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState("patient");
  const location = useLocation();

  useEffect(() => {
    // Check auth state whenever the component mounts
    const checkAuth = () => {
      const authStatus = localStorage.getItem("isAuthenticated") === "true";
      const role = localStorage.getItem("role") || "patient";
      setIsAuthenticated(authStatus);
      setUserRole(role);
    };

    checkAuth();
    window.addEventListener("storage", checkAuth); // Listen for changes in localStorage

    return () => window.removeEventListener("storage", checkAuth);
  }, []);

  return (
    <div className="App">
      {/* Hide Navbar on Login/Register or Dashboard */}
      {location.pathname !== "/login" && location.pathname !== "/register" && location.pathname !== "/dashboard" && (
        <Navbar isAuthenticated={isAuthenticated} />
      )}

      <Routes>
        <Route path="/" element={isAuthenticated ? <Home /> : <Navigate to="/login" />} />
        <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} setUserRole={setUserRole} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/about" element={isAuthenticated ? <About /> : <Navigate to="/login" />} />
        <Route path="/predict" element={isAuthenticated ? <Predict /> : <Navigate to="/login" />} />
        <Route path="/history" element={isAuthenticated ? <History /> : <Navigate to="/login" />} />
        <Route path="/contact" element={isAuthenticated ? <Contact /> : <Navigate to="/login" />} />
        <Route path="/dashboard" element={isAuthenticated && userRole === "admin" ? <Dashboard /> : <Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default App;
