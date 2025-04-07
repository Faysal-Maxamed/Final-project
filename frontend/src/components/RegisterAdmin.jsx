import React, { useState } from "react";
import axios from "axios";

const RegisterAdmin = ({ closePopup }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/auth/register-admin", {
        name,
        email,
        password,
      });
      setMessage(response.data.message);
      setName("");
      setEmail("");
      setPassword("");
    } catch (err) {
      setMessage("Error registering admin.");
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
      <div className="relative bg-white p-8 rounded-xl shadow-lg w-96">
        {/* Close Button */}
        <button
          onClick={closePopup}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          ×
        </button>
        <h1 className="text-3xl font-bold text-teal-600 mb-6 text-center">
          Register New Admin
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            className="w-full p-2 border border-gray-300 rounded-md"
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            className="w-full p-2 border border-gray-300 rounded-md"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="w-full p-2 border border-gray-300 rounded-md"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className="w-full p-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition"
          >
            Register
          </button>
          {message && <p className="text-center mt-2 text-sm text-gray-600">{message}</p>}
        </form>
      </div>
    </div>
  );
};

export default RegisterAdmin;
