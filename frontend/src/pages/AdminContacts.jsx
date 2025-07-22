import React, { useState, useEffect } from "react";

const AdminContacts = ({ darkMode }) => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        setLoading(true);
        const res = await fetch("http://localhost:5000/api/contact");
        const data = await res.json();
        setContacts(data);
      } catch (err) {
        setContacts([]);
      } finally {
        setLoading(false);
      }
    };
    fetchContacts();
  }, []);

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">

      {loading ? (
        <div className="text-center py-8 text-blue-500 font-semibold">Loading contacts...</div>
      ) : contacts.length === 0 ? (
        <div className="text-center py-8 text-gray-400">No contacts found.</div>
      ) : (
        <div className="space-y-4">
          {contacts.map((c, idx) => (
            <div
              key={c._id || idx}
              className={`rounded-xl p-5 shadow border transition-all ${
                darkMode ? "bg-gray-800 text-white border-gray-700" : "bg-gray-50 text-gray-800 border-gray-200"
              }`}
            >
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-semibold text-lg">{c.email}</h4>
                <span className="text-sm text-gray-400">
                  {c.createdAt ? new Date(c.createdAt).toLocaleString() : "-"}
                </span>
              </div>
              <p className="text-base">{c.message}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminContacts;
