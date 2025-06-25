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
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8">
        {[
          {
            color: 'border-orange-400',
            stat: userCount,
            label: 'Users',
            icon: (
              <svg className="w-6 h-6 text-orange-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5.121 17.804A9 9 0 1112 21a9 9 0 01-6.879-3.196z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
            ),
            bottom: 'bg-orange-100 text-orange-600',
            percent: '% change',
          },
          {
            color: 'border-green-400',
            stat: feedbackCount,
            label: 'Patient Feedback',
            icon: (
              <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" /></svg>
            ),
            bottom: 'bg-green-100 text-green-600',
            percent: '% change',
          },
          {
            color: 'border-blue-400',
            stat: adviceCount,
            label: 'Total patient Advice',
            icon: (
              <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
            ),
            bottom: 'bg-blue-100 text-blue-600',
            percent: '% change',
          },
        ].map((card) => (
          <div key={card.label} className={`relative flex flex-col justify-between bg-white rounded-xl shadow border-l-8 ${card.color} p-5 min-h-[120px]`}>
            <div className="flex items-center justify-between">
              <div>
                <div className={`text-2xl font-bold ${card.bottom.split(' ')[1]}`}>{card.stat}</div>
                <div className="text-gray-500 text-xs mt-1">{card.label}</div>
              </div>
              <div className="ml-2">{card.icon}</div>
            </div>
            <div className={`absolute left-0 bottom-0 w-full h-7 rounded-b-xl flex items-center px-4 text-xs font-semibold ${card.bottom}`}>{card.percent}</div>
          </div>
        ))}
      </div>
       {/* Diagnosis Chart Section t */}
       <div className="bg-white text-black rounded-sm shadow-xl p-6 mb-8 flex flex-col items-center justify-center text-center">
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
            <BarChart data={diagnosisData} margin={{ top: 10, right: 30, left: 10, bottom: 10 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
              <XAxis
                dataKey="name"
                tick={{ fill: "#000", fontSize: 14, fontWeight: 600 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fill: "#888", fontSize: 13, fontWeight: 500 }}
                axisLine={false}
                tickLine={false}
                allowDecimals={false}
              />
              <Tooltip content={<DiagnosisTooltip />} cursor={{ fill: '#fff', fillOpacity: 0.1 }} />
              <Bar dataKey="value" radius={[8, 8, 0, 0]} label={{ position: 'top', fill: '#111', fontWeight: 700, fontSize: 14 }}>
                {diagnosisData.map((entry, idx) => (
                  <Cell key={entry.name} fill={entry.fill} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
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
     
    </div>
  )
}

export default Dashboard
