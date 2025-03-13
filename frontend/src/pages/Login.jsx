import { useState } from "react";
import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaUser, FaLock } from "react-icons/fa";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });

      if (res.data.token) {
        alert("Login Successful!");
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("role", res.data.role);

        // Redirect based on user role
        if (res.data.role === "patient") {
          navigate("/", { replace: true }); // Home page for patient
        } else if (res.data.role === "admin") {
          navigate("/dashboard", { replace: true }); // Admin dashboard page
        }
      } else {
        alert("Login failed. Please check your credentials.");
      }
    } catch (err) {
      console.error(err);
      alert("Invalid Credentials. Please try again.");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-teal-50">
      <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-xl border border-teal-300">
        <h2 className="text-3xl font-extrabold text-center text-teal-600 mb-8">
          Welcome Back!
        </h2>
        <form onSubmit={handleLogin} className="space-y-6">
          {/* Email Input */}
          <div className="relative">
            <FaUser className="absolute left-4 top-3 text-teal-600" />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-4 pl-12 border border-teal-300 bg-transparent rounded-md text-teal-800 placeholder-teal-400 focus:ring-2 focus:ring-teal-500"
            />
          </div>

          {/* Password Input */}
          <div className="relative">
            <FaLock className="absolute left-4 top-3 text-teal-600" />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-4 pl-12 border border-teal-300 bg-transparent rounded-md text-teal-800 placeholder-teal-400 focus:ring-2 focus:ring-teal-500"
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full p-4 text-lg font-semibold text-white bg-teal-600 rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-200"
          >
            Login
          </button>
        </form>

        <div className="text-center mt-4">
          <button
            onClick={() => navigate("/register", { replace: true })}
            className="text-teal-600 hover:text-teal-700 text-sm"
          >
            Don't have an account? Register heresdd
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
