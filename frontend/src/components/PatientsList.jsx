import React, { useEffect, useState } from "react";
import axios from "axios";

const PatientsList = () => {
  const [patients, setPatients] = useState([]);
  const [search, setSearch] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/auth/users");
        setPatients(res.data.filter(u => u.role === "patient"));
      } catch (err) {
        setPatients([]);
      }
    };
    fetchPatients();
  }, []);

  const filtered = patients.filter(
    u =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
  );

  // Pagination logic
  const totalRows = filtered.length;
  const totalPages = Math.ceil(totalRows / rowsPerPage);
  const paginated = filtered.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  const handleRowsPerPageChange = (e) => {
    setRowsPerPage(Number(e.target.value));
    setPage(1);
  };

  return (
    <div className="py-8 px-4">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-4">
        <h2 className="text-2xl font-bold text-blue-700">Patients</h2>
        <div className="flex gap-2 items-center">
          <input
            type="text"
            placeholder="Search patients..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
          />
          <label className="ml-2 text-sm text-gray-600">Show
            <select
              value={rowsPerPage}
              onChange={handleRowsPerPageChange}
              className="mx-2 p-1 border border-gray-300 rounded"
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
            </select>
            entries
          </label>
        </div>
      </div>
      <div className="overflow-x-auto bg-white rounded-xl shadow-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Avatar</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {paginated.map(user => (
              <tr key={user._id} className="hover:bg-gray-50 transition">
                <td className="px-6 py-4 whitespace-nowrap">
                  <img src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=4f8cff&color=fff&size=64&rounded=true`} className="w-10 h-10 rounded-full" alt={user.name} />
                </td>
                <td className="px-6 py-4 whitespace-nowrap font-semibold">{user.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">Patient</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <button className="bg-indigo-500 text-white px-3 py-1 rounded-lg mr-2">Edit</button>
                  <button className="bg-red-500 text-white px-3 py-1 rounded-lg">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {paginated.length === 0 && (
          <div className="text-center text-gray-400 py-8">No patients found.</div>
        )}
      </div>
      {/* Pagination controls */}
      <div className="flex justify-end items-center mt-4 gap-2">
        <button
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
          className="px-3 py-1 rounded bg-gray-200 text-gray-600 disabled:opacity-50"
        >
          Prev
        </button>
        <span className="text-sm text-gray-700">Page {page} of {totalPages}</span>
        <button
          onClick={() => setPage(page + 1)}
          disabled={page === totalPages}
          className="px-3 py-1 rounded bg-gray-200 text-gray-600 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PatientsList; 