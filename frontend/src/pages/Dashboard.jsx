import React, { useState, useEffect } from "react";
import { FaUser, FaSignOutAlt, FaTachometerAlt, FaUserShield, FaUsers, FaStethoscope } from "react-icons/fa"; // Importing icons
import axios from "axios"; // Importing axios
import { FaTrash } from "react-icons/fa";
const Dashboard = () => {

  const [users, setUsers] = useState([]);
  const [activeSection, setActiveSection] = useState("users");
  const adminId = localStorage.getItem("adminId"); // Assuming adminId is stored in localStorage

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
        const adminId = "YOUR_ADMIN_ID"; // Replace with the actual admin ID, possibly from logged-in user's context
        await axios.delete(`http://localhost:5000/api/auth/delete-user/${id}`, {
          data: { adminId } // Sending adminId in the request body
        });
        setUsers(users.filter((user) => user._id !== id)); // Remove the user from the state after deletion
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    }
  };


  const toggleRole = (id) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user._id === id
          ? { ...user, role: user.role === "admin" ? "patient" : "admin" }
          : user
      )
    );
  };

  // State for registration form
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Sending POST request to backend
      const response = await axios.post("http://localhost:5000/api/auth/register-admin", {
        name,
        email,
        password,
      });

      // On success
      setSuccessMessage(response.data.message);
      setError("");
      setName("");
      setEmail("");
      setPassword("");
    } catch (err) {
      // On error
      setError(err.response ? err.response.data.error : "Something went wrong");
      setSuccessMessage("");
    }
  };

  const renderContent = () => {
    switch (activeSection) {
      case "dashboard":
        return (
          <div className="w-full p-8 bg-white rounded-xl shadow-xl border border-teal-300">
            <h1 className="text-3xl font-extrabold text-teal-600 mb-6 text-center">
              Admin Dashboard
            </h1>
            <div className="text-center">
              <p className="text-lg text-teal-800 mb-6">
                Welcome to the Admin Dashboard. Here you can manage users, view reports, and perform administrative tasks.
              </p>
              <button className="w-full max-w-sm p-4 text-lg font-semibold text-white bg-teal-600 rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-200">
                View Reports
              </button>
            </div>
          </div>
        );
      case "admin-register":
        return (
          <div className="w-full max-w-md mx-auto p-8 bg-white rounded-xl shadow-xl border border-teal-300">
            <h1 className="text-3xl font-extrabold text-teal-600 mb-6 text-center">
              Register New Admin
            </h1>
            <p className="text-lg text-teal-800 mb-6 text-center">
              Please fill in the form to create a new admin account.
            </p>

            {/* Registration Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-semibold text-teal-700">Name</label>
                <input
                  id="name"
                  type="text"
                  placeholder="Enter your full name"
                  className="w-full p-4 mt-2 rounded-md border border-teal-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-semibold text-teal-700">Email</label>
                <input
                  id="email"
                  type="email"
                  placeholder="Enter your email address"
                  className="w-full p-4 mt-2 rounded-md border border-teal-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="mb-6">
                <label htmlFor="password" className="block text-sm font-semibold text-teal-700">Password</label>
                <input
                  id="password"
                  type="password"
                  placeholder="Create a strong password"
                  className="w-full p-4 mt-2 rounded-md border border-teal-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              {/* Error and Success Messages */}
              {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
              {successMessage && <p className="text-green-500 text-sm mt-2">{successMessage}</p>}

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full p-4 text-lg font-semibold text-white bg-teal-600 rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-200"
              >
                Register Admin
              </button>
            </form>
          </div>

        );
      // Other cases (users, view-patients) remain the same
      case "users":
        return (
          <div className="p-6 min-h-screen ">
            <h1 className="text-3xl font-bold text-teal-700">Dashboard</h1>

            {/* Users Table */}
            <div className="mt-6 bg-white p-6 rounded-lg shadow-lg border border-gray-300">
              <h2 className="text-2xl font-semibold text-gray-700 mb-4">Users List</h2>
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-teal-700 text-white text-lg">
                    <th className="border border-gray-300 p-4">#</th>
                    <th className="border border-gray-300 p-4">Name</th>
                    <th className="border border-gray-300 p-4">Email</th>
                    <th className="border border-gray-300 p-4">Role</th>
                    <th className="border border-gray-300 p-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.length > 0 ? (
                    users.map((user, index) => (
                      <tr
                        key={user._id}
                        className={`text-center border border-gray-300 hover:bg-gray-100 ${user.role === "admin" ? "bg-yellow-100 font-bold" : ""
                          }`}
                      >
                        <td className="border border-gray-300 p-4">{index + 1}</td>
                        <td className="border border-gray-300 p-4">{user.name}</td>
                        <td className="border border-gray-300 p-4">{user.email}</td>
                        <td className="border border-gray-300 p-4">
                          <button
                            onClick={() => toggleRole(user._id)}
                            className={`px-3 py-1 text-white rounded-full ${user.role === "admin" ? "bg-yellow-600" : "bg-blue-600"
                              }`}
                          >
                            {user.role === "admin" ? "Admin" : "Patient"}
                          </button>
                        </td>
                        <td className="border border-gray-300 p-4">
                          <button
                            onClick={() => handleDelete(user._id)} // Pass the user ID to the delete function
                            className="flex items-center gap-2 px-4 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                          >
                            <FaTrash /> Delete
                          </button>
                        </td>

                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="p-4 text-center text-gray-500">
                        No users found
                      </td>
                    </tr>
                  )}
                </tbody>

              </table>
            </div>
          </div>
        );
      case "view-patients":
        return (
          <div className="w-full p-8 bg-white rounded-xl shadow-xl border border-teal-300">
            <h1 className="text-3xl font-extrabold text-teal-600 mb-6 text-center">
              View Patients
            </h1>
            <div className="text-center">
              <p className="text-lg text-teal-800 mb-6">
                Here you can view all registered patients.
              </p>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex min-h-screen bg-teal-50">
      {/* Sidebar */}
      <div className="w-64 bg-teal-600 text-white p-4">
        <div className="flex justify-center mb-6">
          <FaUser className="text-4xl text-white" />
        </div>
        <h2 className="text-2xl font-extrabold text-white mb-6 text-center">Admin Panel</h2>
        <ul className="space-y-4">
          <li>
            <button
              onClick={() => setActiveSection("dashboard")}
              className="w-full text-lg text-left p-2 hover:bg-teal-700 rounded-md flex items-center"
            >
              <FaTachometerAlt className="mr-2" /> Dashboard
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveSection("admin-register")}
              className="w-full text-lg text-left p-2 hover:bg-teal-700 rounded-md flex items-center"
            >
              <FaUserShield className="mr-2" /> Admin Register
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveSection("users")}
              className="w-full text-lg text-left p-2 hover:bg-teal-700 rounded-md flex items-center"
            >
              <FaUsers className="mr-2" /> Users
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveSection("view-patients")}
              className="w-full text-lg text-left p-2 hover:bg-teal-700 rounded-md flex items-center"
            >
              <FaStethoscope className="mr-2" /> View Patients
            </button>
          </li>
        </ul>
        <div className="mt-6">
          <button
            onClick={() => console.log("User Profile")}
            className="w-full text-lg text-left p-2 hover:bg-teal-700 rounded-md flex items-center"
          >
            <FaUser className="mr-2" /> User Profile
          </button>
          <button
            onClick={() => console.log("Logout")}
            className="w-full text-lg text-left p-2 hover:bg-teal-700 rounded-md flex items-center mt-4"
          >
            <FaSignOutAlt className="mr-2" /> Logout
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-6">
        {renderContent()}
      </div>
    </div>
  );
};

export default Dashboard;
