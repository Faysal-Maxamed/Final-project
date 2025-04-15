"use client"
import { useState, useEffect } from "react"
import ReadmissionChart from "./ReadmissionChart";

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
} from "recharts"
import { TrendingUp,  PieChartIcon, BarChartIcon } from "lucide-react"

// Modern color palette with gradients
const COLORS = ["#6366F1", "#F59E0B", "#10B981", "#8B5CF6"]
const diseaseColors = ["#EF4444", "#10B981", "#3B82F6", "#F59E0B", "#8B5CF6"]

const progressData = [
  { name: "Mon", value: 4, avg: 3 },
  { name: "Tue", value: 6, avg: 4 },
  { name: "Wed", value: 5, avg: 5 },
  { name: "Thu", value: 7, avg: 6 },
  { name: "Fri", value: 6, avg: 5 },
  { name: "Sat", value: 8, avg: 7 },
  { name: "Sun", value: 5, avg: 4 },
]

const weeklyGoalData = [
  { name: "Achieved", value: 95 },
  { name: "Remaining", value: 5 },
]



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

const Dashboard = () => {
  const [mounted, setMounted] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)
  const [patientHistory, setPatientHistory] = useState([])
  const [diseaseData, setDiseaseData] = useState([])
  const [genderData, setGenderData] = useState([])
  const [totalUsers, setTotalUsers] = useState(0)
  const [totalRatings, setTotalRatings] = useState(0)
  const [adviceCount, setAdviceCount] = useState(0)



  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch patient history
        const historyResponse = await fetch("http://localhost:5000/api/patient/history")
        const historyData = await historyResponse.json()
        setPatientHistory(historyData)
  
        // Fetch users count
        const usersResponse = await fetch("http://localhost:5000/api/auth/users")
        const usersData = await usersResponse.json()
        setTotalUsers(usersData.length || 0)
  
        // Fetch feedback/ratings
        const feedbackResponse = await fetch("http://localhost:5000/api/feedback")
        const feedbackData = await feedbackResponse.json()
        setTotalRatings(feedbackData.length || 0)
  
        // ✅ Fetch advice count
        const adviceResponse = await fetch("http://localhost:5000/api/advice/all")
        const adviceData = await adviceResponse.json()
        setAdviceCount(adviceData.length || 0)
  
        // Process data for charts
        processDiseaseData(historyData)
        processGenderData(historyData)
      } catch (error) {
        console.error("Error fetching data:", error)
      }
    }
  
    fetchData()
    setMounted(true)
  
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % 5) // Assuming 5 diseases max
    }, 3000)
  
    return () => clearInterval(interval)
  }, [])
  
  // Process disease data for the chart
  const processDiseaseData = (data) => {
    const diagnosisCounts = {}

    // Count occurrences of each diagnosis
    data.forEach((patient) => {
      const diagnosis = patient.primary_diagnosis
      if (diagnosis) {
        diagnosisCounts[diagnosis] = (diagnosisCounts[diagnosis] || 0) + 1
      }
    })

    // Convert to array and sort by count (descending)
    const sortedDiagnoses = Object.entries(diagnosisCounts)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 5) // Get top 5

    // Add colors
    const formattedData = sortedDiagnoses.map((item, index) => ({
      ...item,
      fill: diseaseColors[index % diseaseColors.length],
    }))

    setDiseaseData(formattedData.length > 0 ? formattedData : [{ name: "No Data", value: 0, fill: "#EF4444" }])
  }

  // Process gender data for the chart
  const processGenderData = (data) => {
    const genderCounts = { Male: 0, Female: 0 }

    // Count occurrences of each gender
    data.forEach((patient) => {
      if (patient.gender === "Male" || patient.gender === "Female") {
        genderCounts[patient.gender]++
      }
    })

    // Calculate percentages
    const total = genderCounts.Male + genderCounts.Female
    const malePercentage = total > 0 ? Math.round((genderCounts.Male / total) * 100) : 0
    const femalePercentage = total > 0 ? Math.round((genderCounts.Female / total) * 100) : 0

    setGenderData([
      { name: "Female", value: femalePercentage },
      { name: "Male", value: malePercentage },
    ])
  }

  if (!mounted) return null

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8">
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {[
            {
              title: "Total Users",
              value: totalUsers.toString(),
              change: "+12.5%",
              color: "from-blue-500 to-indigo-600",
            },
            {
              title: "Patient Rate",
              value: totalRatings > 0 ? `${totalRatings}` : "0",
              change: "-2.3%",
              color: "from-green-500 to-emerald-600",
            },
            {
              title: "Total Advice ",
              value: adviceCount > 0 ? `${adviceCount}` : "0",
              change: "+5%",
              color: "from-amber-500 to-orange-600",
            }
            
            
          ].map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-6 border border-gray-100 overflow-hidden relative group"
            >
              <div
                className={`absolute inset-0 bg-gradient-to-r ${stat.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
              ></div>
              <h3 className="text-gray-500 text-sm font-medium mb-1">{stat.title}</h3>
              <div className="flex items-end justify-between">
                <div className="text-2xl font-bold text-gray-800">{stat.value}</div>
                <div
                  className={`text-sm font-medium ${stat.change.startsWith("+") ? "text-green-600" : "text-red-600"
                    } flex items-center`}
                >
                  {stat.change}
                  <svg
                    className={`w-4 h-4 ml-1 ${stat.change.startsWith("+") ? "rotate-0" : "rotate-180"}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Main Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Disease Admissions Chart */}
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <div className="p-2 rounded-lg bg-indigo-100 text-indigo-600 mr-3">
                  <BarChartIcon className="w-5 h-5" />
                </div>
                <h2 className="text-xl font-bold text-gray-800">Top 5 Most Common Diagnoses</h2>
              </div>
              <div className="text-sm text-gray-500">Last 30 days</div>
            </div>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={diseaseData} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#f0f0f0" />
                  <XAxis type="number" tick={{ fill: "#6B7280", fontSize: 12 }} axisLine={{ stroke: "#E5E7EB" }} />
                  <YAxis
                    dataKey="name"
                    type="category"
                    tick={{ fill: "#6B7280", fontSize: 12 }}
                    axisLine={{ stroke: "#E5E7EB" }}
                    width={100}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar
                    dataKey="value"
                    radius={[0, 4, 4, 0]}
                    animationDuration={1500}
                    animationBegin={300}
                    background={{ fill: "#f3f4f6" }}
                    label={{ position: "right", fill: "#6B7280", fontSize: 12 }}
                  >
                    {diseaseData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={entry.fill}
                        fillOpacity={index === activeIndex ? 1 : 0.7}
                        stroke={index === activeIndex ? "#fff" : "none"}
                        strokeWidth={index === activeIndex ? 1 : 0}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Progress Tracking Chart */}
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <div className="p-2 rounded-lg bg-indigo-100 text-indigo-600 mr-3">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <h2 className="text-xl font-bold text-gray-800">Progress Tracking</h2>
              </div>
              <div className="flex items-center text-green-500 text-sm font-medium">
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M12 7a1 1 0 10-2 0v3H7a1 1 0 100 2h3v3a1 1 0 102 0v-3h3a1 1 0 100-2h-3V7z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>12% from last week</span>
              </div>
            </div>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={progressData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366F1" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#6366F1" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorAvg" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                  <XAxis dataKey="name" tick={{ fill: "#6B7280", fontSize: 12 }} axisLine={{ stroke: "#E5E7EB" }} />
                  <YAxis tick={{ fill: "#6B7280", fontSize: 12 }} axisLine={{ stroke: "#E5E7EB" }} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend
                    verticalAlign="top"
                    height={36}
                    formatter={(value) => (
                      <span className="text-gray-700">{value === "value" ? "Current" : "Average"}</span>
                    )}
                  />
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke="#6366F1"
                    strokeWidth={3}
                    fillOpacity={1}
                    fill="url(#colorValue)"
                    activeDot={{ r: 8, strokeWidth: 0, fill: "#6366F1" }}
                  />
                  <Area
                    type="monotone"
                    dataKey="avg"
                    stroke="#8B5CF6"
                    strokeWidth={3}
                    fillOpacity={1}
                    fill="url(#colorAvg)"
                    activeDot={{ r: 8, strokeWidth: 0, fill: "#8B5CF6" }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Secondary Charts Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Gender Distribution Chart */}
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100">
            <div className="flex items-center mb-6">
              <div className="p-2 rounded-lg bg-indigo-100 text-indigo-600 mr-3">
                <PieChartIcon className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-bold text-gray-800">Gender Distribution</h2>
            </div>
            <div className="h-64 flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <defs>
                    <linearGradient id="genderGradient1" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#6366F1" />
                      <stop offset="100%" stopColor="#4F46E5" />
                    </linearGradient>
                    <linearGradient id="genderGradient2" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#F59E0B" />
                      <stop offset="100%" stopColor="#D97706" />
                    </linearGradient>
                  </defs>
                  <Pie
                    data={genderData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    innerRadius={60}
                    paddingAngle={5}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    labelLine={false}
                    animationDuration={1000}
                    animationBegin={200}
                  >
                    <Cell fill="url(#genderGradient1)" stroke="#fff" strokeWidth={2} />
                    <Cell fill="url(#genderGradient2)" stroke="#fff" strokeWidth={2} />
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center mt-4 space-x-8">
              {genderData.map((entry, index) => (
                <div key={`legend-${index}`} className="flex items-center">
                  <div
                    className="w-3 h-3 rounded-full mr-2"
                    style={{ background: index === 0 ? "#6366F1" : "#F59E0B" }}
                  ></div>
                  <span className="text-sm text-gray-600">{`${entry.name}: ${entry.value}%`}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Activity Ring */}
          <ReadmissionChart />

        </div>
      </main>
    </div>
  )
}

export default Dashboard
