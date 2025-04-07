import React, { useState, useEffect } from "react";
import { 
  FaTachometerAlt, 
  FaUserShield, 
  FaUsers, 
  FaStethoscope, 
  FaHistory, 
  FaCog, 
  FaSignOutAlt 
} from "react-icons/fa";
import axios from "axios";
import DashboardSection from "../components/DashboardSection";
import RegisterAdmin from "../components/RegisterAdmin";
import UsersList from "../components/UsersList";
import ViewPatients from "../components/ViewPatients";
import History from "./History";

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [activeSection, setActiveSection] = useState("dashboard");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/auth/users");
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await axios.delete(`http://localhost:5000/api/auth/delete-user/${id}`);
        setUsers(users.filter((user) => user._id !== id));
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <div className="flex bg-gray-100">
      {/* Fixed Sidebar */}
      <aside className="w-64 bg-white p-6 border-r fixed top-0 left-0 h-full">
        <div className="flex flex-col items-center">
          <img
            src="https://i.ibb.co/4pDNDk1/avatar.png"
            alt="Profile"
            className="w-20 h-20 rounded-full"
          />
          <h2 className="text-lg font-bold mt-2">Ken Kalil</h2>
          <p className="text-gray-500 text-sm">kenk@gmail.com</p>
        </div>

        <nav className="mt-6 space-y-4">
          <div
            onClick={() => setActiveSection("dashboard")}
            className="flex items-center gap-2 text-teal-600 font-medium cursor-pointer"
          >
            <FaTachometerAlt size={18} /> Dashboard
          </div>
          <div
            onClick={() => setActiveSection("admin-register")}
            className="flex items-center gap-2 cursor-pointer"
          >
            <FaUserShield size={18} /> Add Admin
          </div>
          <div
            onClick={() => setActiveSection("users")}
            className="flex items-center gap-2 cursor-pointer"
          >
            <FaUsers size={18} /> Users
          </div>
          <div
            onClick={() => setActiveSection("view-patients")}
            className="flex items-center gap-2 cursor-pointer"
          >
            <FaStethoscope size={18} /> Reports
          </div>
          <div
            onClick={() => setActiveSection("history")}
            className="flex items-center gap-2 cursor-pointer"
          >
            <FaHistory size={18} /> History
          </div>
          <div
            onClick={() => setActiveSection("settings")}
            className="flex items-center gap-2 cursor-pointer"
          >
            <FaCog size={18} /> Settings
          </div>
        </nav>

        <button
          onClick={handleLogout}
          className="mt-8 bg-blue-500 hover:bg-blue-600 text-white w-full py-2 rounded shadow"
        >
          <FaSignOutAlt /> Log Out
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 ml-64 overflow-auto h-screen">
        {activeSection === "dashboard" && <DashboardSection />}
        {activeSection === "admin-register" && <RegisterAdmin />}
        {activeSection === "users" && <UsersList users={users} handleDelete={handleDelete} />}
        {activeSection === "view-patients" && <ViewPatients />}
        {activeSection === "history" && <History />}
      </main>
    </div>
  );
};

export default Dashboard;
