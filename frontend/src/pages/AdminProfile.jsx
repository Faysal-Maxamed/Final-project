import React, { useEffect, useMemo, useState } from "react";

const AdminProfile = ({ darkMode = false, onClose }) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("success");

  const isAdmin = useMemo(() => (localStorage.getItem("role") === "admin"), []);

  useEffect(() => {
    setFullName(localStorage.getItem("userName") || "");
    setEmail(localStorage.getItem("userEmail") || "");
    setRole(localStorage.getItem("role") || "");
  }, []);

  const avatarUrl = fullName
    ? `https://ui-avatars.com/api/?name=${encodeURIComponent(fullName)}&background=4f8cff&color=fff&size=128&rounded=true&bold=true&length=2`
    : `https://ui-avatars.com/api/?name=User&background=4f8cff&color=fff&size=128&rounded=true&bold=true&length=2`;

  const showMsg = (msg, type = "success") => {
    setMessage(msg);
    setMessageType(type);
    setTimeout(() => setMessage(""), 2500);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password && password !== confirmPassword) {
      showMsg("Passwords do not match", "error");
      return;
    }
    if (password && password.length < 6) {
      showMsg("Password must be at least 6 characters", "error");
      return;
    }

    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");
    if (!userId || !token) {
      showMsg("Not authenticated", "error");
      return;
    }

    const updateData = { fullName, email };
    if (password) updateData.password = password;
    if (isAdmin && role) updateData.role = role;

    try {
      setIsSubmitting(true);
      const res = await fetch(`http://localhost:5000/api/auth/update-profile/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(updateData),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || err.msg || "Update failed");
      }
      const updated = await res.json();

      localStorage.setItem("userName", updated.name || fullName);
      localStorage.setItem("userEmail", updated.email || email);
      if (updated.role) localStorage.setItem("role", updated.role);

      showMsg("Profile updated successfully", "success");
      setPassword("");
      setConfirmPassword("");
      setFullName(updated.name || fullName);
      setEmail(updated.email || email);
      setRole(updated.role || role);
    } catch (err) {
      showMsg(err.message, "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`max-w-2xl mx-auto ${darkMode ? "text-gray-100" : "text-gray-900"}`}>
      {message && (
        <div className={`mb-4 px-4 py-2 rounded ${messageType === "success" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
          {message}
        </div>
      )}

      <div className={`rounded-2xl shadow p-6 mb-6 ${darkMode ? "bg-gray-800" : "bg-white"}`}>
        <div className="flex items-center gap-4">
          <img src={avatarUrl} alt="Avatar" className="w-20 h-20 rounded-full border-2 border-blue-400" />
          <div>
            <div className="text-2xl font-bold">{fullName || "User"}</div>
            <div className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-500"}`}>{email || "email@example.com"}</div>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className={`rounded-2xl shadow p-6 ${darkMode ? "bg-gray-800" : "bg-white"}`}>
        <h2 className="text-lg font-semibold mb-4">Edit Profile</h2>
        <div className="grid grid-cols-1 gap-5">
          <div>
            <label className="block text-sm font-medium mb-1">Full Name</label>
            <input
              type="text"
              className={`w-full p-2 rounded border ${darkMode ? "bg-gray-900 border-gray-700 text-gray-100" : "bg-white border-gray-300"}`}
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Your full name"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              className={`w-full p-2 rounded border ${darkMode ? "bg-gray-900 border-gray-700 text-gray-100" : "bg-white border-gray-300"}`}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Role</label>
            <select
              disabled={!isAdmin}
              className={`w-full p-2 rounded border ${darkMode ? "bg-gray-900 border-gray-700 text-gray-100" : "bg-white border-gray-300"} ${!isAdmin ? "opacity-60 cursor-not-allowed" : ""}`}
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="patient">patient</option>
              <option value="admin">admin</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">New Password (optional)</label>
            <input
              type="password"
              className={`w-full p-2 rounded border ${darkMode ? "bg-gray-900 border-gray-700 text-gray-100" : "bg-white border-gray-300"}`}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Confirm Password</label>
            <input
              type="password"
              className={`w-full p-2 rounded border ${darkMode ? "bg-gray-900 border-gray-700 text-gray-100" : "bg-white border-gray-300"}`}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
            />
          </div>
        </div>
        <div className="mt-6 flex gap-3 justify-end">
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className={`px-4 py-2 rounded border ${darkMode ? "border-gray-700 text-gray-200" : "border-gray-300 text-gray-700"}`}
            >
              Cancel
            </button>
          )}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`px-4 py-2 rounded text-white ${isSubmitting ? "bg-blue-300" : "bg-blue-600 hover:bg-blue-700"}`}
          >
            {isSubmitting ? "Updating..." : "Update Profile"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminProfile;


