"use client"

import { useState } from "react"
import { FaTrash } from "react-icons/fa"
import RegisterAdmin from "./RegisterAdmin" // Import the RegisterAdmin component

const UsersList = ({ users, handleDelete }) => {
  const [activeTab, setActiveTab] = useState("patient")
  const [showModal, setShowModal] = useState(false) // State to control modal visibility

  const filteredUsers = users.filter((user) => user.role === activeTab)
  const totalPatients = users.filter((user) => user.role === "patient").length
  const totalAdmins = users.filter((user) => user.role === "admin").length

  // This function will be passed to RegisterAdmin to close the modal
  const handleCloseModal = () => {
    console.log("Closing modal") // Add logging
    setShowModal(false)
  }

  return (
    <div className="">
      {/* Add Button + Summary */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex space-x-4">
          <button
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              activeTab === "patient"
                ? "bg-gradient-to-r from-blue-600 to-teal-500 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => setActiveTab("patient")}
          >
            Patients
          </button>
          <button
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              activeTab === "admin"
                ? "bg-gradient-to-r from-blue-600 to-teal-500 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => setActiveTab("admin")}
          >
            Admins
          </button>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setShowModal(true)} // Open the modal when clicked
            className="bg-gradient-to-r from-blue-600 to-teal-500 hover:shadow-lg text-white text-sm px-5 py-2 rounded-md transition-all duration-300"
          >
            Add New
          </button>
          <div className="text-sm text-gray-600">
            <p>
              Total Patients: <span className="font-semibold">{totalPatients}</span>
            </p>
            <p>
              Total Admins: <span className="font-semibold">{totalAdmins}</span>
            </p>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="text-gray-700 bg-gray-100">
              <th className="p-3 border-b">No</th>
              <th className="p-3 border-b">Name</th>
              <th className="p-3 border-b">Email</th>
              <th className="p-3 border-b text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user, index) => (
                <tr key={user._id} className="hover:bg-gray-50 transition duration-200">
                  <td className="p-3 border-b">{index + 1}</td>
                  <td className="p-3 border-b font-medium text-gray-800">{user.name}</td>
                  <td className="p-3 border-b text-gray-600">{user.email}</td>
                  <td className="p-3 border-b text-right">
                    <button
                      onClick={() => handleDelete(user._id)}
                      className="flex items-center gap-2 ml-auto bg-gradient-to-r from-blue-600 to-teal-500 hover:shadow-lg text-white px-4 py-1.5 text-sm rounded-md transition-all duration-200"
                    >
                      <FaTrash />
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center py-6 text-gray-500">
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal for RegisterAdmin Component */}
      {showModal && <RegisterAdmin closePopup={handleCloseModal} />}
    </div>
  )
}

export default UsersList
import React from "react"