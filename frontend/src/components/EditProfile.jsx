import React, { useState, useEffect } from "react";

function EditProfilePopup({ onClose }) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setrole] = useState("");
  const [isEditing, setIsEditing] = useState(false); // State to control edit mode

  useEffect(() => {
    // Get user data from localStorage when the component mounts
    const storedName = localStorage.getItem("userName");
    const storedEmail = localStorage.getItem("userEmail");
    const storedRole = localStorage.getItem("role"); // Assuming you have role in localStorage

    if (storedName) setFullName(storedName);
    if (storedEmail) setEmail(storedEmail);
    if (storedRole) setrole(storedRole);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate password confirmation
    if (password && password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    // Validate password length if provided
    if (password && password.length < 6) {
      alert("Password must be at least 6 characters long!");
      return;
    }

    try {
      const userId = localStorage.getItem("userId");
      const token = localStorage.getItem("token");

      const updateData = {
        fullName,
        email,
        role
      };

      // Only include password if it's being changed
      if (password) {
        updateData.password = password;
      }

      const response = await fetch(`http://localhost:5000/api/auth/update-profile/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(updateData)
      });

             if (response.ok) {
         const updatedUser = await response.json();
         
         // Update localStorage with new data
         localStorage.setItem("userName", updatedUser.name || fullName);
         localStorage.setItem("userEmail", updatedUser.email || email);
         localStorage.setItem("role", updatedUser.role || role);
         
         alert("Profile updated successfully!");
         setIsEditing(false);
         setPassword("");
         setConfirmPassword("");
       } else {
        const errorData = await response.json();
        alert(errorData.message || "Failed to update profile");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Error updating profile. Please try again.");
    }
  };

  const handleUpdate = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setPassword("");
    setConfirmPassword("");
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
        <button
          className="absolute top-0 right-0 p-2"
          onClick={onClose}
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
        <h3 className="text-lg font-semibold mb-4">Profile Information</h3>
        
                 {!isEditing ? (
           // Display mode - show as text
           <div className="space-y-4">
             <div>
               <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
               <div className="p-3 bg-gray-50 rounded border text-gray-900">
                 {fullName || "Not provided"}
               </div>
             </div>
             <div>
               <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
               <div className="p-3 bg-gray-50 rounded border text-gray-900">
                 {email || "Not provided"}
               </div>
             </div>
             <div>
               <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
               <div className="p-3 bg-gray-50 rounded border text-gray-900">
                 {role || "Not provided"}
               </div>
             </div>
             <div className="flex justify-end pt-4">
               <button
                 type="button"
                 onClick={handleUpdate}
                 className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
               >
                 Update Profile
               </button>
             </div>
           </div>
        ) : (
                     // Edit mode - show input fields
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
             <div className="mb-4">
               <label className="block text-sm font-medium text-gray-700">New Password (optional)</label>
               <input
                 type="password"
                 value={password}
                 onChange={(e) => setPassword(e.target.value)}
                 className="mt-1 p-2 w-full border border-gray-300 rounded"
                 placeholder="Enter new password"
               />
             </div>
                           <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Confirm New Password {password && <span className="text-red-500">*</span>}
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="mt-1 p-2 w-full border border-gray-300 rounded"
                  placeholder="Confirm new password"
                  required={!!password}
                />
              </div>
             <div className="flex justify-end gap-2">
               <button
                 type="button"
                 onClick={handleCancel}
                 className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-50 transition-colors"
               >
                 Cancel
               </button>
               <button
                 type="submit"
                 className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
               >
                 Save Changes
               </button>
             </div>
           </form>
        )}
      </div>
    </div>
  );
}

export default EditProfilePopup;
