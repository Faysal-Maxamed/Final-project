import React, { useEffect, useState } from "react";
import axios from "axios";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { PieChartIcon } from 'lucide-react';

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

  // Custom tooltip component for better styling
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 border border-gray-200 shadow-xl rounded-lg">
          <p className="font-medium text-gray-800 mb-1">{payload[0].name}</p>
          <p className="text-sm font-medium" style={{ color: payload[0].color }}>
            Count: {payload[0].value}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <div className="p-2 rounded-lg bg-indigo-100 text-indigo-600 mr-3">
            <PieChartIcon className="w-5 h-5" />
          </div>
          <h2 className="text-xl font-bold text-gray-800">Readmission Statistics</h2>
        </div>
        <div className="px-3 py-1 rounded-full bg-purple-50 text-purple-700 text-xs font-medium">Patient Data</div>
      </div>
      <div className="h-64 flex items-center justify-center">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <defs>
              <linearGradient id="readmitGradient1" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#EF4444" />
                <stop offset="100%" stopColor="#DC2626" />
              </linearGradient>
              <linearGradient id="readmitGradient2" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#10B981" />
                <stop offset="100%" stopColor="#059669" />
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
              labelLine={false}
              animationDuration={1000}
              animationBegin={200}
            >
              <Cell fill="url(#readmitGradient1)" stroke="#fff" strokeWidth={2} />
              <Cell fill="url(#readmitGradient2)" stroke="#fff" strokeWidth={2} />
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="flex justify-center mt-4 space-x-8">
        {data.map((entry, index) => (
          <div key={`legend-${index}`} className="flex items-center">
            <div
              className="w-3 h-3 rounded-full mr-2"
              style={{ background: index === 0 ? "#EF4444" : "#10B981" }}
            ></div>
            <span className="text-sm text-gray-600">{`${entry.name}: ${entry.value}`}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReadmissionChart;
