import React, { useState, useEffect } from "react";
import { 
  FaUser, 
  FaSignOutAlt, 
  FaTachometerAlt, 
  FaUserShield, 
  FaUsers, 
  FaStethoscope, 
  FaCog 
} from "react-icons/fa";
import axios from "axios";
import DashboardSection from "../components/DashboardSection";
import RegisterAdmin from "../components/RegisterAdmin";
import UsersList from "../components/UsersList";
import ViewPatients from "../components/ViewPatients";

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
    <div className="flex">
      {/* Sidebar */}
      <aside className="w-64 bg-blue-700 text-white p-6 flex flex-col justify-between h-screen fixed">
        <div className="flex flex-col items-center mb-6">
          <div className="w-20 h-20 bg-gray-300 rounded-full mb-2"></div>
          <h3 className="text-lg font-semibold">Pheyzal Mohamed</h3>
          <p className="text-sm text-gray-300">pheyzalMohal12@gmail.com</p>
        </div>

        <ul className="space-y-4">
          <li 
            onClick={() => setActiveSection("dashboard")} 
            className="cursor-pointer flex items-center gap-2 p-2 hover:bg-blue-600 rounded-md"
          >
            <FaTachometerAlt /> Dashboard
          </li>
          <li 
            onClick={() => setActiveSection("admin-register")} 
            className="cursor-pointer flex items-center gap-2 p-2 hover:bg-blue-600 rounded-md"
          >
            <FaUserShield /> Add Admin
          </li>
          <li 
            onClick={() => setActiveSection("users")} 
            className="cursor-pointer flex items-center gap-2 p-2 hover:bg-blue-600 rounded-md"
          >
            <FaUsers /> Users
          </li>
          <li 
            onClick={() => setActiveSection("view-patients")} 
            className="cursor-pointer flex items-center gap-2 p-2 hover:bg-blue-600 rounded-md"
          >
            <FaStethoscope /> Reports
          </li>
          <li 
            onClick={() => setActiveSection("settings")} 
            className="cursor-pointer flex items-center gap-2 p-2 hover:bg-blue-600 rounded-md"
          >
            <FaCog /> Settings
          </li>
        </ul>

        {/* Logout Button */}
        <button 
          onClick={handleLogout} 
          className="flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded-md w-full text-white"
        >
          <FaSignOutAlt /> Lock Out
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 ml-64">
        <h1 className="text-3xl font-bold text-blue-700 mb-12">Welcome Pheyzal!</h1>
        {activeSection === "dashboard" && <DashboardSection />}
        {activeSection === "admin-register" && <RegisterAdmin />}
        {activeSection === "users" && <UsersList users={users} handleDelete={handleDelete} />}
        {activeSection === "view-patients" && <ViewPatients />}
      </main>
    </div>
  );
};

export default Dashboard;
