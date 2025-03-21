import React, { useState } from "react";
import axios from "axios";

const RegisterAdmin = () => {
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
    <div className="max-w-md mx-auto p-8 bg-white rounded-xl shadow-xl">
      <h1 className="text-3xl font-bold text-teal-600 mb-6 text-center">Register New Admin</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input className="w-full p-2 border" type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
        <input className="w-full p-2 border" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input className="w-full p-2 border" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit" className="w-full p-2 bg-teal-600 text-white">Register</button>
        {message && <p className="text-center mt-2">{message}</p>}
      </form>
    </div>
  );
};

export default RegisterAdmin;
