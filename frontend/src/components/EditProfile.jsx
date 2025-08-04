import React, { useState, useEffect } from "react";

function EditProfilePopup() {
  const [showModal, setShowModal] = useState(true);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setrole] = useState("");
  const [userId, setUserId] = useState(""); // Add state to store userId

  useEffect(() => {
    // Get user data from localStorage when the component mounts
    const storedName = localStorage.getItem("userName");
    const storedEmail = localStorage.getItem("userEmail");
    const storedRole = localStorage.getItem("role"); // Assuming you have role in localStorage
    const storedUserId = localStorage.getItem("userId"); // Get userId from localStorage

    if (storedName) setFullName(storedName);
    if (storedEmail) setEmail(storedEmail);
    if (storedRole) setrole(storedRole);
    if (storedUserId) setUserId(storedUserId); // Set userId
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    // You can add your logic to update the user's profile here
    alert("Profile updated!");
    setShowModal(false); // Close the modal after submitting
  };

  return (
    <>
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
            <button
              className="absolute top-0 right-0 p-2"
              onClick={() => setShowModal(false)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-6 h-6 text-gray-500"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <h3 className="text-lg font-semibold mb-4">Edit Profile</h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Full Name</label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="mt-1 p-2 w-full border border-gray-300 rounded"
                  placeholder="Enter your full name"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 p-2 w-full border border-gray-300 rounded"
                  placeholder="Enter your email"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Role</label>
                <input
                  type="text"
                  value={role}
                  onChange={(e) => setrole(e.target.value)}
                  className="mt-1 p-2 w-full border border-gray-300 rounded"
                  placeholder="Enter your role"
                />
              </div>
              {/* Display the userId */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">User ID</label>
                <input
                  type="text"
                  value={userId}
                  readOnly // Make it read-only as user ID should not be edited
                  className="mt-1 p-2 w-full border border-gray-300 rounded bg-gray-100 text-gray-500"
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
                >
                  Update Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default EditProfilePopup;
