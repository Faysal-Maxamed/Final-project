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

import dayjs from "dayjs"


import { FaArrowUp, FaArrowDown, FaUserCircle, FaUser, FaCommentDots, FaLightbulb, FaChartPie, FaUserInjured, FaExclamationTriangle, FaCheckCircle } from "react-icons/fa";

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

const Dashboard = ({ darkMode }) => {
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
  const [recentHistory, setRecentHistory] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        // Fetch patient history
        const historyResponse = await fetch("http://localhost:5000/api/patient/history")
        const historyData = await historyResponse.json()
        setPatientHistory(historyData)
        setRecentHistory(historyData.slice(-5).reverse()) // Last 5 entries, newest first

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

  // Calculate last 30 days date range
  const endDate = new Date();
  const startDate = new Date();
  startDate.setDate(endDate.getDate() - 30);
  const dateRangeLabel = `${dayjs(startDate).format('MMM D')} - ${dayjs(endDate).format('MMM D, YYYY')}`;

  // Filter patientHistory for last 30 days
  const recentHistory30 = patientHistory.filter(item => {
    if (!item.date) return false;
    const d = new Date(item.date);
    return d >= startDate && d <= endDate;
  });

  // Filtered data for charts
  const genderData30 = getGenderData(recentHistory30);
  const readmissionData30 = getReadmissionData(recentHistory30);
  const ageGroupData30 = getAgeGroupData(recentHistory30).map(a => ({ ...a, value: recentHistory30.length ? Math.round((a.value / recentHistory30.length) * 100) : 0 }));

  if (!mounted) return null

  const RADIAN = Math.PI / 180;
  const renderDonutLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
    if (!percent || percent <= 0) return null;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.6;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    return (
      <text
        x={x}
        y={y}
        fill={darkMode ? '#e5e7eb' : '#111827'}
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline="central"
        style={{ fontSize: 12, fontWeight: 700 }}
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div className={`w-full max-w-7xl mx-auto ${darkMode ? 'text-white' : 'text-gray-900'}`}> 
      {/* Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-8">
        {[
          {
            color: 'bg-blue-50',
            icon: <FaUser className="text-blue-500 text-2xl" />, 
            stat: userCount,
            label: 'Users',
          },
          {
            color: 'bg-green-50',
            icon: <FaCommentDots className="text-green-500 text-2xl" />, 
            stat: feedbackCount,
            label: 'Feedback',
          },
          {
            color: 'bg-yellow-50',
            icon: <FaLightbulb className="text-yellow-500 text-2xl" />, 
            stat: adviceCount,
            label: 'Advice',
          },
          {
            color: 'bg-purple-50',
            icon: <FaUserInjured className="text-purple-500 text-2xl" />, 
            stat: patientHistory.length,
            label: 'Patients History',
          },
        ].map((card, idx) => (
          <div key={card.label} className={`flex items-center gap-4 p-6 rounded-2xl shadow bg-white dark:bg-gray-800 ${darkMode ? '' : card.color}`}>
            <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-white shadow-md">{card.icon}</div>
            <div>
              <div className="text-2xl font-bold">{card.stat}</div>
              <div className="text-gray-500 dark:text-gray-300 text-sm font-medium">{card.label}</div>
            </div>
          </div>
        ))}
      </div>
      {/* Gender, Age, and Readmission Charts Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        {/* Gender Donut Chart */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-6 flex flex-col items-center">
          <div className="font-bold text-lg text-gray-700 dark:text-gray-200 mb-1">Gender</div>
          <div className="text-xs text-gray-400 dark:text-gray-300 mb-4">{dateRangeLabel}</div>
          <ResponsiveContainer width={260} height={240}>
            <PieChart margin={{ top: 0, right: 12, left: 12, bottom: 24 }}>
              <Pie
                data={genderData30}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={70}
                outerRadius={100}
                startAngle={90}
                endAngle={-270}
                paddingAngle={2}
                isAnimationActive={true}
                label={renderDonutLabel}
                labelLine={false}
              >
                {genderData30.map((entry, idx) => (
                  <Cell key={entry.name} fill={idx === 0 ? '#3B82F6' : '#10B981'} />
                ))}
              </Pie>
              <Legend verticalAlign="bottom" align="center" iconType="circle" wrapperStyle={{ color: darkMode ? '#e5e7eb' : '#374151', fontSize: 12 }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        {/* Age Bar Chart */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-6 flex flex-col items-center">
          <div className="font-bold text-lg text-gray-700 dark:text-gray-200 mb-1">Age</div>
          <div className="text-xs text-gray-400 dark:text-gray-300 mb-4">{dateRangeLabel}</div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={ageGroupData30} margin={{ top: 10, right: 30, left: 10, bottom: 10 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={darkMode ? "#374151" : "#f3f4f6"} />
              <XAxis
                dataKey="name"
                tick={{ fill: darkMode ? '#d1d5db' : '#888', fontSize: 14, fontWeight: 600 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tickFormatter={v => `${v}%`}
                tick={{ fill: darkMode ? '#9ca3af' : '#bbb', fontSize: 13, fontWeight: 500 }}
                axisLine={false}
                tickLine={false}
                allowDecimals={false}
                domain={[0, 100]}
              />
              <Tooltip formatter={v => `${v}%`} />
              <Bar dataKey="value" radius={[12, 12, 0, 0]} fill="#6366F1" maxBarSize={48}>
                {ageGroupData30.map((entry, idx) => (
                  <Cell key={entry.name} fill={entry.fill} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        {/* Readmission Donut Chart */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-6 flex flex-col items-center">
          <div className="font-bold text-lg text-gray-700 dark:text-gray-200 mb-1">Readmission</div>
          <div className="text-xs text-gray-400 dark:text-gray-300 mb-4">{dateRangeLabel}</div>
          <ResponsiveContainer width={260} height={240}>
            <PieChart margin={{ top: 0, right: 12, left: 12, bottom: 24 }}>
              <Pie
                data={readmissionData30}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={70}
                outerRadius={100}
                startAngle={90}
                endAngle={-270}
                paddingAngle={2}
                isAnimationActive={true}
                label={renderDonutLabel}
                labelLine={false}
              >
                {readmissionData30.map((entry, idx) => (
                  <Cell key={entry.name} fill={idx === 0 ? '#6366F1' : '#F59E0B'} />
                ))}
              </Pie>
              <Legend verticalAlign="bottom" align="center" iconType="circle" wrapperStyle={{ color: darkMode ? '#e5e7eb' : '#374151', fontSize: 12 }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
      {/* Diagnosis Bar Chart Section */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-6 flex flex-col items-start mb-8">
        <div className="flex items-center justify-between w-full mb-6">
          <div>
            <div className="font-bold text-lg text-gray-700 dark:text-gray-200 mb-1">Diagnosis Report</div>
            <div className="text-3xl font-extrabold text-gray-900 dark:text-white">{diagnosisData.reduce((sum, d) => sum + d.value, 0)} <span className="text-base font-medium text-gray-400 dark:text-gray-300">cases</span></div>
          </div>
          <div className="flex gap-2">
            {timeFilters.map(f => (
              <button
                key={f.value}
                className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all duration-200 border-2 focus:outline-none ${diagnosisFilter === f.value ? 'bg-blue-600 text-white border-blue-600 shadow' : (darkMode ? 'bg-gray-700 text-gray-200 border-gray-600 hover:bg-gray-600' : 'bg-gray-100 text-gray-600 border-gray-200 hover:bg-blue-50 hover:text-blue-600')}`}
                onClick={() => setDiagnosisFilter(f.value)}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={diagnosisData} margin={{ top: 10, right: 30, left: 10, bottom: 10 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={darkMode ? "#374151" : "#f3f4f6"} />
            <XAxis
              dataKey="name"
              tick={{ fill: darkMode ? '#d1d5db' : '#888', fontSize: 14, fontWeight: 600 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: darkMode ? '#9ca3af' : '#bbb', fontSize: 13, fontWeight: 500 }}
              axisLine={false}
              tickLine={false}
              allowDecimals={false}
            />
            <Tooltip content={<DiagnosisTooltip />} cursor={{ fill: '#6366F1', fillOpacity: 0.08 }} />
            <Bar dataKey="value" radius={[12, 12, 0, 0]} fill="#6366F1" maxBarSize={48}>
              {diagnosisData.map((entry, idx) => (
                <Cell key={entry.name} fill={entry.fill} />
              ))}
            </Bar>
            {/* Optional: Median/target line */}
            {/* <ReferenceLine y={targetValue} stroke="#F59E0B" strokeDasharray="3 3" label="Median" /> */}
          </BarChart>
        </ResponsiveContainer>
      </div>
      {/* Recent Patient History Table */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-6">
        <div className="font-semibold text-lg mb-4 text-gray-900 dark:text-gray-100">Recent Patient History</div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-left border-collapse">
            <thead>
              <tr className="text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-700">
                <th className="p-3 border-b border-gray-200 dark:border-gray-600">Date</th>
                <th className="p-3 border-b border-gray-200 dark:border-gray-600">Patient Info</th>
                <th className="p-3 border-b border-gray-200 dark:border-gray-600">Diagnosis</th>
                <th className="p-3 border-b border-gray-200 dark:border-gray-600">Hospital Stay</th>
                <th className="p-3 border-b border-gray-200 dark:border-gray-600">Risk Status</th>
                <th className="p-3 border-b border-gray-200 dark:border-gray-600">Probability</th>
              </tr>
            </thead>
            <tbody>
              {recentHistory.length > 0 ? recentHistory.map((item, idx) => (
                <tr key={idx} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition duration-200">
                  <td className="p-3 border-b border-gray-200 dark:border-gray-700">{item.date ? new Date(item.date).toLocaleDateString() : '-'}</td>
                  <td className="p-3 border-b border-gray-200 dark:border-gray-700">{item.age} years, {item.gender}</td>
                  <td className="p-3 border-b border-gray-200 dark:border-gray-700">{item.primary_diagnosis || '-'}</td>
                  <td className="p-3 border-b border-gray-200 dark:border-gray-700">
                    <div className="text-sm text-gray-900 dark:text-gray-100">{item.procedures ? `${item.procedures} procedures` : '-'}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-300">{item.days_in_hospital ? `${item.days_in_hospital} days` : ''}</div>
                  </td>
                  <td className="p-3 border-b border-gray-200 dark:border-gray-700">
                    <span className={`inline-flex items-center gap-2 px-2 py-1 rounded-full text-xs font-medium ${item.readmission === "Yes" ? (darkMode ? 'bg-red-900 text-red-300' : 'bg-red-100 text-red-800') : (darkMode ? 'bg-green-900 text-green-300' : 'bg-green-100 text-green-800')}`}>
                      {item.readmission === "Yes" ? <FaExclamationTriangle /> : <FaCheckCircle />}
                      {item.readmission === "Yes" ? "High Risk" : "Low Risk"}
                    </span>
                  </td>
                  <td className="p-3 border-b border-gray-200 dark:border-gray-700">
                    <div className={`text-sm font-medium ${item.readmission === "Yes" ? "text-red-500" : "text-green-500"}`}>{item.probability || '-'}</div>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="6" className="text-center py-6 text-gray-500 dark:text-gray-300">No recent history found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
