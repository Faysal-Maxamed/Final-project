import { useState } from "react";
import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaUser, FaLock, FaEnvelope } from "react-icons/fa";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/auth/register", {
        name,
        email,
        password,
      });
      alert("Registration Successful!");
      navigate("/login", { replace: true }); // Redirect to the login page after successful registration
    } catch (err) {
      alert("Error Registering. Please try again.");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-teal-50">
      <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-xl border border-teal-300">
        <h2 className="text-3xl font-extrabold text-center text-teal-600 mb-8">
          Create an Account
        </h2>
        <form onSubmit={handleRegister} className="space-y-6">
          {/* Name Input */}
          <div className="relative">
            <FaUser className="absolute left-4 top-3 text-teal-600" />
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full p-4 pl-12 border border-teal-300 bg-transparent rounded-md text-teal-800 placeholder-teal-400 focus:ring-2 focus:ring-teal-500"
            />
          </div>

          {/* Email Input */}
          <div className="relative">
            <FaEnvelope className="absolute left-4 top-3 text-teal-600" />
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

          {/* Register Button */}
          <button
            type="submit"
            className="w-full p-4 text-lg font-semibold text-white bg-teal-600 rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-200"
          >
            Register
          </button>
        </form>

        <div className="text-center mt-4">
          <p className="text-sm">
            Already have an account?{" "}
            <a
              href="/login"
              className="text-teal-600 hover:text-teal-700"
            >
              Login here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
