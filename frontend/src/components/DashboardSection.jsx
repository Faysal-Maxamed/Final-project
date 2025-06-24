"use client";

import React, { useState, useEffect } from "react";
import {
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  BarChart,
  Bar,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import { FaSun, FaMoon } from "react-icons/fa";

const COLORS = ["#6366F1", "#F59E0B", "#10B981", "#8B5CF6"];
const diseaseColors = ["#EF4444", "#10B981", "#3B82F6", "#F59E0B", "#8B5CF6"];
const statsLabels = ["Users", "Patient Feedback", "Total Patient Advice"];
const timeFilters = ["Today", "Last Week", "Last 30 Days"];

const DiagnosisTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-4 border border-gray-100">
        <div className="font-semibold text-gray-800 mb-1">{label}</div>
        <div className="text-blue-600 font-bold text-lg">{payload[0].value}</div>
        <div className="text-xs text-gray-400">cases</div>
      </div>
    );
  }
  return null;
};

const Dashboard = () => {
  const [mounted, setMounted] = useState(false);
  const [patientHistory, setPatientHistory] = useState([]);
  const [userCount, setUserCount] = useState(0);
  const [feedbackCount, setFeedbackCount] = useState(0);
  const [adviceCount, setAdviceCount] = useState(0);
  const [diagnosisData, setDiagnosisData] = useState([]);
  const [diagnosisFilter, setDiagnosisFilter] = useState("today");
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responses = await Promise.all([
          fetch("http://localhost:5000/api/patient/history"),
          fetch("http://localhost:5000/api/auth/users"),
          fetch("http://localhost:5000/api/feedback"),
          fetch("http://localhost:5000/api/advice/all"),
        ]);
        const [historyData, users, feedback, advice] = await Promise.all(
          responses.map(res => res.json())
        );

        setPatientHistory(historyData);
        setUserCount(users.length);
        setFeedbackCount(feedback.length);
        setAdviceCount(advice.length);
      } catch (error) {
        console.error(error);
      } finally {
        setMounted(true);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const { start, end } = getDateRange(diagnosisFilter);
    const filteredHistory = patientHistory.filter(({ date }) => 
      new Date(date) >= start && new Date(date) <= end
    );

    const counts = {};
    filteredHistory.forEach(({ primary_diagnosis }) => {
      if (primary_diagnosis) {
        counts[primary_diagnosis] = (counts[primary_diagnosis] || 0) + 1;
      }
    });

    const chartData = Object.entries(counts).map(([name, value], i) => ({
      name,
      value,
      fill: diseaseColors[i % diseaseColors.length],
    })).sort((a, b) => b.value - a.value).slice(0, 5);

    setDiagnosisData(chartData.length ? chartData : [{ name: "No Data", value: 0, fill: "#EF4444" }]);
  }, [patientHistory, diagnosisFilter]);

  if (!mounted) return <LoadingSpinner />;

  return (
    <div className={`container mx-auto p-6 ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <button onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? <FaSun className="text-yellow-500" /> : <FaMoon className="text-gray-800" />}
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {[userCount, feedbackCount, adviceCount].map((count, i) => (
          <StatCard key={i} label={statsLabels[i]} count={count} />
        ))}
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {[getGenderData(patientHistory), getReadmissionData(patientHistory), getAgeGroupData(patientHistory)].map((data, i) => (
          <ChartCard key={i} data={data} title={["Gender", "Readmission", "Age Group"][i]} />
        ))}
      </div>

      <DiagnosisPerformance
        diagnosisData={diagnosisData}
        diagnosisFilter={diagnosisFilter}
        setDiagnosisFilter={setDiagnosisFilter}
      />

      <RecentPatients patientHistory={patientHistory} />
    </div>
  );
};

const LoadingSpinner = () => (
  <div className="flex justify-center items-center h-screen">
    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-600"></div>
  </div>
);

const StatCard = ({ label, count }) => (
  <div className="bg-gradient-to-br from-indigo-900 to-purple-900 text-white rounded-2xl shadow-lg p-6 space-y-2 transition-transform transform hover:scale-105">
    <div className="text-sm uppercase tracking-wider text-indigo-300 font-semibold">{label}</div>
    <div className="text-3xl font-bold">{count}</div>
  </div>
);

const ChartCard = ({ data, title }) => (
  <div className="bg-white rounded-2xl shadow p-4">
    <h3 className="text-center font-bold text-gray-700 mb-2">{title}</h3>
    <ResponsiveContainer width="100%" height={180}>
      {title === "Age Group" ? (
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Bar dataKey="value">
            {data.map((entry, idx) => <Cell key={idx} fill={entry.fill} />)}
          </Bar>
        </BarChart>
      ) : (
        <PieChart>
          <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={60} label>
            {data.map((entry, idx) => <Cell key={idx} fill={entry.fill} />)}
          </Pie>
          <Tooltip />
        </PieChart>
      )}
    </ResponsiveContainer>
  </div>
);

const DiagnosisPerformance = ({ diagnosisData, diagnosisFilter, setDiagnosisFilter }) => (
  <div className="bg-white rounded-2xl shadow p-6">
    <div className="flex justify-between items-center mb-4">
      <h3 className="font-bold text-lg text-gray-700">Diagnosis Performance</h3>
      <div className="space-x-2">
        {timeFilters.map(filter => (
          <button
            key={filter}
            className={`px-3 py-1 rounded-full text-sm font-semibold ${diagnosisFilter === filter.toLowerCase() ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600 hover:bg-blue-100'}`}
            onClick={() => setDiagnosisFilter(filter.toLowerCase())}
          >
            {filter}
          </button>
        ))}
      </div>
    </div>
    <div className="h-72">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={diagnosisData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis allowDecimals={false} />
          <Tooltip content={<DiagnosisTooltip />} />
          <Line type="monotone" dataKey="value" stroke="#6366F1" strokeWidth={3} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  </div>
);

const RecentPatients = ({ patientHistory }) => (
  <div className="bg-white rounded-2xl shadow p-6">
    <h3 className="font-bold text-lg text-gray-700 mb-4">Recent Patients</h3>
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-left">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-2 px-4">Name</th>
            <th className="py-2 px-4">Age</th>
            <th className="py-2 px-4">Gender</th>
            <th className="py-2 px-4">Diagnosis</th>
            <th className="py-2 px-4">Date</th>
          </tr>
        </thead>
        <tbody>
          {patientHistory.slice(0, 5).map((p, i) => (
            <tr key={i} className="border-b hover:bg-gray-100">
              <td className="py-2 px-4 font-medium">{p.name || "-"}</td>
              <td className="py-2 px-4">{p.age}</td>
              <td className="py-2 px-4">{p.gender}</td>
              <td className="py-2 px-4">{p.primary_diagnosis}</td>
              <td className="py-2 px-4">{p.date ? new Date(p.date).toLocaleDateString() : "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

const getDateRange = (filter) => {
  const now = new Date();
  switch (filter) {
    case "today":
      return { start: new Date(now.getFullYear(), now.getMonth(), now.getDate()), end: now };
    case "week":
      const weekStart = new Date(now);
      weekStart.setDate(now.getDate() - 7);
      return { start: weekStart, end: now };
    case "month":
      const monthStart = new Date(now);
      monthStart.setDate(now.getDate() - 30);
      return { start: monthStart, end: now };
    default:
      return { start: new Date(0), end: now };
  }
};

const getGenderData = (history) => {
  let male = 0, female = 0;
  history.forEach(p => {
    if (p.gender === "Male") male++;
    else if (p.gender === "Female") female++;
  });
  return [
    { name: "Male", value: male, fill: COLORS[0] },
    { name: "Female", value: female, fill: COLORS[1] },
  ];
};

const getReadmissionData = (history) => {
  let yes = 0, no = 0;
  history.forEach(p => {
    if (p.readmission === "Yes") yes++;
    else if (p.readmission === "No") no++;
  });
  return [
    { name: "Readmission", value: yes, fill: COLORS[1] },
    { name: "No Readmission", value: no, fill: COLORS[0] },
  ];
};

const getAgeGroupData = (history) => {
  const groups = [0, 0, 0, 0];
  history.forEach(p => {
    const age = Number(p.age);
    if (age <= 18) groups[0]++;
    else if (age <= 35) groups[1]++;
    else if (age <= 60) groups[2]++;
    else groups[3]++;
  });
  return [
    { name: "0-18", value: groups[0], fill: COLORS[0] },
    { name: "19-35", value: groups[1], fill: COLORS[1] },
    { name: "36-60", value: groups[2], fill: COLORS[2] },
    { name: "60+", value: groups[3], fill: COLORS[3] },
  ];
};

export default Dashboard;