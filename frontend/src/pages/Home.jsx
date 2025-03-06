import React from "react";
import { useNavigate } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";

const Home = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("role");
    navigate("/login", { replace: true });
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-teal-50 p-8">
      <h1 className="text-4xl font-extrabold text-teal-600 mb-4">
        Welcome to the Home Page!
      </h1>
      <p className="text-lg text-teal-800 mb-6">
        You are logged in as <span className="font-semibold">Patient</span>.
      </p>

      <button
        onClick={handleLogout}
        className="flex items-center gap-2 px-6 py-3 text-white bg-teal-600 rounded-md hover:bg-teal-700 transition"
      >
        <FaSignOutAlt /> Logout
      </button>
    </div>
  );
};

export default Home;
