import React, { useState, useEffect } from "react";

const AdminContacts = ({ darkMode }) => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [success, setSuccess] = useState("");
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

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccess("Thank you for contacting us! We'll get back to you soon.");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div className={`max-w-3xl mx-auto mt-10 p-8 rounded-2xl shadow-lg ${darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"}`}>
      <h2 className="text-3xl font-bold mb-4 text-center">Contact Admin</h2>
      {/* Contacts Table */}
      <div className="mb-10">
        <h3 className="text-xl font-semibold mb-4">All Contacts</h3>
        {loading ? (
          <div className="text-center py-8 text-blue-500 font-semibold">Loading contacts...</div>
        ) : contacts.length === 0 ? (
          <div className="text-center py-8 text-gray-400">No contacts found.</div>
        ) : (
          <div className="overflow-x-auto rounded-xl shadow border border-gray-200 dark:border-gray-700">
            <table className="min-w-full text-left border-collapse">
              <thead>
                <tr className={`${darkMode ? "bg-gray-800 text-white" : "bg-gray-100 text-gray-700"}`}>
                  <th className="p-3 border-b">Name</th>
                  <th className="p-3 border-b">Email</th>
                  <th className="p-3 border-b">Message</th>
                  <th className="p-3 border-b">Date</th>
                </tr>
              </thead>
              <tbody>
                {contacts.map((c, idx) => (
                  <tr key={c._id || idx} className={`${darkMode ? "hover:bg-gray-800" : "hover:bg-gray-50"} transition duration-200`}>
                    <td className="p-3 border-b font-medium">{c.name}</td>
                    <td className="p-3 border-b">{c.email}</td>
                    <td className="p-3 border-b max-w-xs truncate" title={c.message}>{c.message}</td>
                    <td className="p-3 border-b">{c.createdAt ? new Date(c.createdAt).toLocaleString() : '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      {/* Contact Form */}
      <p className="mb-8 text-center text-gray-500 dark:text-gray-400">Have a question or feedback? Fill out the form below and we'll respond as soon as possible.</p>
      {success && (
        <div className="mb-6 p-3 rounded-lg bg-green-500 text-white text-center font-semibold shadow">{success}</div>
      )}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block mb-1 font-medium">Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-blue-500 transition-all ${darkMode ? "bg-gray-800 border-gray-700 text-white" : "bg-white border-gray-300 text-gray-900"}`}
            placeholder="Your Name"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-blue-500 transition-all ${darkMode ? "bg-gray-800 border-gray-700 text-white" : "bg-white border-gray-300 text-gray-900"}`}
            placeholder="you@email.com"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Message</label>
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            required
            rows={5}
            className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-blue-500 transition-all ${darkMode ? "bg-gray-800 border-gray-700 text-white" : "bg-white border-gray-300 text-gray-900"}`}
            placeholder="Type your message..."
          ></textarea>
        </div>
        <button
          type="submit"
          className="w-full py-3 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-500 text-white font-bold shadow hover:from-blue-700 hover:to-indigo-600 transition-all text-lg"
        >
          Send Message
        </button>
      </form>
    </div>
  );
};

export default AdminContacts; 