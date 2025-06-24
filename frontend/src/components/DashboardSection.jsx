"use client"
import { useState, useEffect } from "react"
import ReadmissionChart from "./ReadmissionChart";
import PredictionSection from "./PredictionSection";

import React from "react"
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
  Legend,
  AreaChart,
  Area,
  RadialBarChart,
  RadialBar,
  LineChart,
  Line,
} from "recharts"



import { FaArrowUp, FaArrowDown, FaUserCircle } from "react-icons/fa";

// Modern color palette with gradients
const COLORS = ["#6366F1", "#F59E0B", "#10B981", "#8B5CF6"]
const diseaseColors = ["#EF4444", "#10B981", "#3B82F6", "#F59E0B", "#8B5CF6"]


// Custom tooltip component for better styling
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-4 border border-gray-200 shadow-xl rounded-lg">
        <p className="font-medium text-gray-800 mb-1">{`${label || payload[0].name}`}</p>
        {payload.map((entry, index) => (
          <p key={`item-${index}`} className="text-sm" style={{ color: entry.color }}>
            <span className="font-medium">{`${entry.name}: ${entry.value}`}</span>
          </p>
        ))}
      </div>
    )
  }
  return null
}

// Custom modern tooltip for the diagnosis line chart
const DiagnosisTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white rounded-xl shadow-lg px-4 py-2 border border-gray-100">
        <div className="font-semibold text-gray-800 mb-1">{label}</div>
        <div className="text-blue-600 font-bold text-lg">{payload[0].value}</div>
        <div className="text-xs text-gray-400">cases</div>
      </div>
    );
  }
  return null;
};

// Mock data
const stats = [
  { label: "Users",  },
  { label: "Pattient Feedback",  },
  { label: "Total patient Advice", },
]





const timeFilters = [
  { label: "Today", value: "today" },
  { label: "Last Week", value: "week" },
  { label: "Last 30 Days", value: "month" },
]

const genderColors = ["#6366F1", "#F59E0B"];
const readmissionColors = ["#10B981", "#EF4444"];
const ageGroupColors = ["#6366F1", "#F59E0B", "#10B981", "#EF4444"];

function getDateRange(filter) {
  const now = new Date();
  if (filter === "today") {
    const start = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    return { start, end: now };
  } else if (filter === "week") {
    const start = new Date(now);
    start.setDate(now.getDate() - 7);
    return { start, end: now };
  } else if (filter === "month") {
    const start = new Date(now);
    start.setDate(now.getDate() - 30);
    return { start, end: now };
  }
  return { start: new Date(0), end: now };
}

function getGenderData(history) {
  let male = 0, female = 0;
  history.forEach(p => {
    if (p.gender === "Male") male++;
    else if (p.gender === "Female") female++;
  });
  return [
    { name: "Male", value: male, fill: genderColors[0] },
    { name: "Female", value: female, fill: genderColors[1] },
  ];
}

function getReadmissionData(history) {
  let yes = 0, no = 0;
  history.forEach(p => {
    if (p.readmission === "Yes") yes++;
    else if (p.readmission === "No") no++;
  });
  return [
    { name: "Readmission", value: yes, fill: readmissionColors[1] },
    { name: "No Readmission", value: no, fill: readmissionColors[0] },
  ];
}

function getAgeGroupData(history) {
  const groups = [0, 0, 0, 0];
  history.forEach(p => {
    const age = Number(p.age);
    if (age <= 18) groups[0]++;
    else if (age <= 35) groups[1]++;
    else if (age <= 60) groups[2]++;
    else groups[3]++;
  });
  return [
    { name: "0-18", value: groups[0], fill: ageGroupColors[0] },
    { name: "19-35", value: groups[1], fill: ageGroupColors[1] },
    { name: "36-60", value: groups[2], fill: ageGroupColors[2] },
    { name: "60+", value: groups[3], fill: ageGroupColors[3] },
  ];
}

const Dashboard = () => {
  const [mounted, setMounted] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)
  const [patientHistory, setPatientHistory] = useState([])
  const [adviceCount, setAdviceCount] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [userCount, setUserCount] = useState(0)
  const [feedbackCount, setFeedbackCount] = useState(0)
  const [diagnosisData, setDiagnosisData] = useState([]);
  const [diagnosisHistory, setDiagnosisHistory] = useState([]);
  const [diagnosisFilter, setDiagnosisFilter] = useState("today");

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        // Fetch patient history
        const historyResponse = await fetch("http://localhost:5000/api/patient/history")
        const historyData = await historyResponse.json()
        setPatientHistory(historyData)

        // Fetch user count for the first card
        fetch("http://localhost:5000/api/auth/users")
          .then(res => res.json())
          .then(data => setUserCount(Array.isArray(data) ? data.length : 0))
          .catch(() => setUserCount(0))
        // Fetch feedback count for the second card
        fetch("http://localhost:5000/api/feedback")
          .then(res => res.json())
          .then(data => setFeedbackCount(Array.isArray(data) ? data.length : 0))
          .catch(() => setFeedbackCount(0))
        // Fetch advice count for the third card
        fetch("http://localhost:5000/api/advice/all")
          .then(res => res.json())
          .then(data => setAdviceCount(Array.isArray(data) ? data.length : 0))
          .catch(() => setAdviceCount(0))

        // Fetch patient history for diagnosis chart
        fetch("http://localhost:5000/api/patient/history")
          .then(res => res.json())
          .then(data => setDiagnosisHistory(Array.isArray(data) ? data : []))
          .catch(() => setDiagnosisHistory([]));
      } catch (error) {
        console.error("Error fetching data:", error)
      } finally {
        setIsLoading(false)
      }
    }
  
    fetchData()
    setMounted(true)
  
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % 5) // Assuming 5 diseases max
    }, 3000)
  
    return () => clearInterval(interval)
  }, [])
  
  useEffect(() => {
    // Filter and count diagnoses for the selected period
    const { start, end } = getDateRange(diagnosisFilter);
    const filtered = diagnosisHistory.filter(item => {
      const d = new Date(item.date);
      return d >= start && d <= end;
    });
    const counts = {};
    filtered.forEach(item => {
      if (item.primary_diagnosis) {
        counts[item.primary_diagnosis] = (counts[item.primary_diagnosis] || 0) + 1;
      }
    });
    const chartData = Object.entries(counts)
      .map(([name, value], idx) => ({ name, value, fill: diseaseColors[idx % diseaseColors.length] }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 5);
    setDiagnosisData(chartData.length > 0 ? chartData : [{ name: "No Data", value: 0, fill: "#EF4444" }]);
  }, [diagnosisHistory, diagnosisFilter]);

  const genderData = getGenderData(patientHistory);
  const readmissionData = getReadmissionData(patientHistory);
  const ageGroupData = getAgeGroupData(patientHistory);

  if (!mounted) return null

  return (
    <div className="w-full max-w-7xl mx-auto">
   
       {/* Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, idx) => (
          <div key={stat.label} className="flex flex-col items-center justify-center text-center bg-gradient-to-br from-black via-blue-900 via-purple-800 to-gray-900 text-white rounded-2xl shadow p-6">
            <div className="text-xs mb-1">{stat.label}</div>
            <div className="flex items-baseline justify-center">
              <span className="text-2xl font-bold mr-2">{idx === 0 ? userCount : idx === 1 ? feedbackCount : idx === 2 ? adviceCount : stat.value}</span>
              <span className={`text-xs font-semibold flex items-center gap-1 ${stat.changeType === 'up' ? 'text-green-200' : 'text-red-200'}`}>{stat.changeType === 'up' ? <FaArrowUp /> : <FaArrowDown />}{stat.change}</span>
            </div>
            <div className="text-xs mb-2">{stat.subLabel}</div>
            {/* Mini bar chart for last card */}
            {stat.bars && (
              <div className="mt-2 flex items-end h-6 space-x-1 justify-center">
                {stat.bars.map((h, i) => (
                  <div key={i} className={`w-1.5 rounded bg-blue-200 ${i === 4 ? 'bg-blue-300' : ''}`} style={{ height: `${h * 2}px` }}></div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      {/* Modern 3-Card Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        {/* Gender Distribution Card */}
        <div className="bg-gradient-to-br from-black via-blue-900 via-purple-800 to-gray-900 text-white rounded-2xl shadow-xl p-6 flex flex-col items-center justify-center text-center">
          <div className="font-semibold mb-2">Gender Distribution</div>
          <div className="h-40 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height={140}>
              <PieChart>
                <Pie
                  data={genderData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={60}
                  paddingAngle={2}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  labelLine={false}
                >
                  {genderData.map((entry, idx) => (
                    <Cell key={entry.name} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        {/* Readmission Status Card */}
        <div className="bg-gradient-to-br from-black via-blue-900 via-purple-800 to-gray-900 text-white rounded-2xl shadow-xl p-6 flex flex-col items-center justify-center text-center">
          <div className="font-semibold mb-2">Readmission Status</div>
          <div className="h-40 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height={140}>
              <PieChart>
                <Pie
                  data={readmissionData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={60}
                  paddingAngle={2}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  labelLine={false}
                >
                  {readmissionData.map((entry, idx) => (
                    <Cell key={entry.name} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        {/* Age Group Distribution Card */}
        <div className="bg-gradient-to-br from-black via-blue-900 via-purple-800 to-gray-900 text-white rounded-2xl shadow-xl p-6 flex flex-col items-center justify-center text-center">
          <div className="font-semibold mb-2">Age Group Distribution</div>
          <div className="h-40 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height={140}>
              <BarChart data={ageGroupData} margin={{ top: 10, right: 10, left: 10, bottom: 10 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                <XAxis dataKey="name" tick={{ fill: "#fff", fontSize: 13, fontWeight: 600 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "#fff", fontSize: 12 }} axisLine={false} tickLine={false} allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                  {ageGroupData.map((entry, idx) => (
                    <Cell key={entry.name} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      {/* Diagnosis Chart Section t */}
      <div className="bg-gradient-to-br from-black via-blue-900 via-purple-800 to-gray-900 text-white rounded-2xl shadow-xl p-6 mb-8 flex flex-col items-center justify-center text-center">
        <div className="flex items-center justify-between mb-4 w-full">
          <div className="font-semibold">Diagnosis Performance</div>
          <div className="flex gap-2">
            {timeFilters.map(f => (
              <button
                key={f.value}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-200 ${diagnosisFilter === f.value ? 'bg-white text-blue-600' : 'bg-blue-400 text-white hover:bg-white hover:text-blue-600'}`}
                onClick={() => setDiagnosisFilter(f.value)}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
        <div className="h-72 w-full flex items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={diagnosisData} margin={{ top: 10, right: 30, left: 10, bottom: 10 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#fff" />
              <XAxis
                dataKey="name"
                tick={{ fill: "#fff", fontSize: 14, fontWeight: 600 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fill: "#fff", fontSize: 13, fontWeight: 500 }}
                axisLine={false}
                tickLine={false}
                allowDecimals={false}
              />
              <Tooltip content={<DiagnosisTooltip />} cursor={{ stroke: '#fff', strokeWidth: 0.2, fill: '#fff', fillOpacity: 0.1 }} />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#fff"
                strokeWidth={4}
                dot={{ r: 6, fill: '#fff', stroke: '#fff', strokeWidth: 2 }}
                activeDot={{ r: 8, fill: '#F59E0B', stroke: '#fff', strokeWidth: 2 }}
                animationDuration={1200}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
     
      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Guide Performance Line Chart & Guide List */}
        <div className="lg:col-span-2 flex flex-col gap-8">
          {/* Guide List Table */}
          <div className="bg-gradient-to-br from-black via-blue-900 via-purple-800 to-gray-900 text-white rounded-2xl shadow p-6 flex flex-col items-center justify-center text-center">
            <div className="font-semibold mb-4">Recent Patients</div>
            <table className="w-full text-sm">
              <thead>
                <tr className="text-white text-xs">
                  <th className="text-left py-2">Name</th>
                  <th className="text-left py-2">Age</th>
                  <th className="text-left py-2">Gender</th>
                  <th className="text-left py-2">Diagnosis</th>
                  <th className="text-left py-2">Date</th>
                </tr>
              </thead>
              <tbody>
                {patientHistory.slice(0, 3).map((p, idx) => (
                  <tr key={idx} className="border-t border-blue-200">
                    <td className="py-2 font-semibold text-white">{p.name || "-"}</td>
                    <td className="py-2">{p.age}</td>
                    <td className="py-2">{p.gender}</td>
                    <td className="py-2">{p.primary_diagnosis}</td>
                    <td className="py-2 text-blue-100">{p.date ? new Date(p.date).toLocaleDateString() : "-"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        {/* Right Side: Donut Chart Card & Team */}
        <div className="flex flex-col gap-8">
          {/* Donut Chart Card */}


        </div>
      </div>
    </div>
  )
}

export default Dashboard
