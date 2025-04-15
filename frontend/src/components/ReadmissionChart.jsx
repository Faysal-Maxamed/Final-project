import React, { useEffect, useState } from "react";
import axios from "axios";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { PieChartIcon } from 'lucide-react';
const COLORS = ["#FF6363", "#28C76F"];

const ReadmissionChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/patient/history");
        const history = res.data;

        const readmitted = history.filter(item => item.readmission === "Yes").length;
        const notReadmitted = history.filter(item => item.readmission !== "Yes").length;

        setData([
          { name: "Readmitted", value: readmitted },
          { name: "Not Readmitted", value: notReadmitted },
        ]);
      } catch (error) {
        console.error("Failed to fetch history:", error);
      }
    };

    fetchHistory();
  }, []);

  return (
    <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 ">
    <div className="flex items-center mb-6">
      <div className="p-2 rounded-lg bg-indigo-100 text-indigo-600 mr-3">
        <PieChartIcon className="w-5 h-5" />
      </div>
      <h2 className="text-xl font-bold text-gray-800">Readmission Statistics</h2>
    </div>
    <div className="h-64 flex items-center justify-center">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <defs>
            <linearGradient id="readmitGradient1" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#6366F1" />
              <stop offset="100%" stopColor="#4F46E5" />
            </linearGradient>
            <linearGradient id="readmitGradient2" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#F59E0B" />
              <stop offset="100%" stopColor="#D97706" />
            </linearGradient>
          </defs>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={80}
            innerRadius={60}
            paddingAngle={5}
            dataKey="value"
            nameKey="name"
            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
            width={70}
            labelLine={false}
            animationDuration={1000}
            animationBegin={200}
          >
            <Cell fill="url(#readmitGradient1)" stroke="#fff" strokeWidth={2} />
            <Cell fill="url(#readmitGradient2)" stroke="#fff" strokeWidth={2} />
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
    <div className="flex justify-center mt-4 space-x-8">
      {data.map((entry, index) => (
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
  );
};

export default ReadmissionChart;
