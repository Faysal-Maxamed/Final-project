import React from "react";
import { PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, BarChart, Bar } from "recharts";
import { UserCircle2, LayoutDashboard, Dumbbell, BookOpen, DollarSign, Settings, LogOut } from "lucide-react";

const COLORS = ["#0088FE", "#FF8042", "#00C49F", "#FFBB28"];
const diseaseColors = ["#FF6B6B", "#6BCB77", "#4D96FF", "#FFD93D", "#C77DFF"];

const genderData = [
  { name: "Female", value: 60 },
  { name: "Male", value: 40 }
];


const weeklyGoalData = [{ name: "Achieved", value: 95 }, { name: "Remaining", value: 5 }];

const progressData = [
  { name: "M", value: 4 },
  { name: "T", value: 6 },
  { name: "W", value: 5 },
  { name: "T", value: 7 },
  { name: "F", value: 6 },
  { name: "S", value: 8 },
  { name: "S", value: 5 },
];
const diseaseData = [
  { name: "Diabetes", value: 150 },
  { name: "Heart Disease", value: 200 },
  { name: "Hypertension", value: 180 },
  { name: "Kidney Disease", value: 120 },
  { name: "CORD", value: 100 }
];

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex">


      {/* Main Content */}
      <main className="flex-1 p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-cyan-600">PERSONAL PROGRESS</h1>
          <button className="bg-purple-500 text-white px-4 py-2 rounded">CONTACT SUPPORT</button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Gender Distribution Chart */}
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-center font-semibold mb-2">Gender Distribution</h2>
            <PieChart width={250} height={250}>
              <Pie
                data={genderData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
              >
                {genderData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </div>

          {/* Disease Admissions Bar Chart */}
          <div className="bg-white p-6 rounded shadow col-span-1 md:col-span-2">
            <h2 className="text-center font-semibold mb-2">Top 5 Most Readmitted Diseases</h2>
            <BarChart width={550} height={250} data={diseaseData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value">
                {diseaseData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={diseaseColors[index % diseaseColors.length]} />
                ))}
              </Bar>
            </BarChart>
          </div>
        </div>


        {/* Progress Tracking */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6 ">
          <div className="bg-white p-6 rounded shadow">
            <h2 className="font-semibold mb-2">Progress Tracking</h2>
            <div className="text-3xl font-bold">8.9</div>
            <p className="text-gray-500 mb-4">BiWeekly Progress</p>
            <BarChart width={400} height={200} data={progressData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#8884d8" />
            </BarChart>
          </div>

          {/* Dummy Ring Chart (reuse Weekly Goal Chart) */}
          <div className="bg-white p-6 rounded shadow flex flex-col items-center justify-center">
            <h2 className="font-semibold mb-4">Activity Ring</h2>
            <PieChart width={250} height={250}>
              <Pie
                data={weeklyGoalData}
                dataKey="value"
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
              >
                {weeklyGoalData.map((_, index) => (
                  <Cell key={`cell-ring-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;