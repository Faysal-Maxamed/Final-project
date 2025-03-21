import React from "react";
import { FaTrash } from "react-icons/fa";

const UsersList = ({ users, handleDelete }) => {
  return (
    <div className="p-6 min-h-screen">
      <h1 className="text-3xl font-bold text-teal-700">Manage / User Lists</h1>
      <div className="mt-6 bg-white p-6 rounded-lg shadow-lg border border-gray-300">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-teal-700 text-white">
              <th className="border p-4">No</th>
              <th className="border p-4">Name</th>
              <th className="border p-4">Email</th>
              <th className="border p-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user, index) => (
                <tr key={user._id} className="border">
                  <td className="border p-4">{index + 1}</td>
                  <td className="border p-4">{user.name}</td>
                  <td className="border p-4">{user.email}</td>
                  <td className="border p-4">
                    <button onClick={() => handleDelete(user._id)} className="bg-red-600 text-white px-4 py-1 rounded">
                      <FaTrash /> Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center p-4">No users found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersList;
