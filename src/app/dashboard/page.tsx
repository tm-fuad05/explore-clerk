"use client";
import React, { useState } from "react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  TrendingUp,
  Users,
  DollarSign,
  ShoppingCart,
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  Menu,
  Bell,
  Search,
  User,
} from "lucide-react";

const DarkDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Data remains same as your original snippet
  const salesData = [
    { month: "Jan", value: 4200 },
    { month: "Feb", value: 3800 },
    { month: "Mar", value: 5100 },
    { month: "Apr", value: 4600 },
    { month: "May", value: 6200 },
    { month: "Jun", value: 5800 },
  ];

  const categoryData = [
    { name: "Electronics", value: 400 },
    { name: "Clothing", value: 300 },
    { name: "Food", value: 200 },
    { name: "Books", value: 100 },
  ];

  const COLORS = ["#a78bfa", "#f472b6", "#60a5fa", "#34d399"];

  return (
    // Main Container: Slate-950 for deep background
    <div className="flex h-screen bg-[#020617] text-slate-200 selection:bg-violet-500/30">
      {/* Sidebar: Glassmorphism effect */}
      <div
        className={`${sidebarOpen ? "w-64" : "w-20"} bg-slate-900/50 backdrop-blur-xl border-r border-slate-800 transition-all duration-300 flex flex-col`}
      >
        <div className="p-6 border-b border-slate-800">
          <a
            href="/"
            className={`font-bold text-2xl bg-gradient-to-r from-violet-400 to-pink-400 bg-clip-text text-transparent ${!sidebarOpen && "hidden"}`}
          >
            Analytics
          </a>
          {!sidebarOpen && (
            <div className="w-8 h-8 bg-gradient-to-r from-violet-500 to-pink-500 rounded-lg shadow-lg shadow-violet-500/20" />
          )}
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {["Overview", "Analytics", "Reports", "Settings"].map((item, i) => (
            <button
              key={i}
              className="w-full flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-slate-800 transition-all text-slate-400 hover:text-white group"
            >
              <div className="w-2 h-2 rounded-full bg-violet-500 opacity-0 group-hover:opacity-100 transition-opacity" />
              {sidebarOpen && <span className="font-medium">{item}</span>}
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-slate-900/40 backdrop-blur-md border-b border-slate-800 px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
              >
                <Menu className="w-6 h-6 text-slate-400" />
              </button>
              <div className="relative">
                <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type="text"
                  placeholder="Search anything..."
                  className="pl-10 pr-4 py-2 bg-slate-800/50 border border-slate-700 rounded-xl w-80 focus:outline-none focus:ring-2 focus:ring-violet-500/50 transition-all text-sm"
                />
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button className="p-2 hover:bg-slate-800 rounded-lg relative transition-all">
                <Bell className="w-6 h-6 text-slate-400" />
                <span className="absolute top-2 right-2 w-2 h-2 bg-pink-500 rounded-full border-2 border-slate-900"></span>
              </button>
              <div className="w-10 h-10 ring-2 ring-slate-800 bg-gradient-to-tr from-violet-600 to-pink-600 rounded-full flex items-center justify-center cursor-pointer hover:scale-105 transition-transform">
                <User className="w-5 h-5 text-white" />
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 overflow-auto p-8 custom-scrollbar">
          <div className="max-w-7xl mx-auto space-y-8">
            {/* Stats Grid - Using darker surfaces with subtle borders */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  title: "Revenue",
                  val: "$45,231",
                  change: "+20%",
                  icon: DollarSign,
                  color: "text-violet-400",
                  bg: "bg-violet-500/10",
                },
                {
                  title: "Users",
                  val: "2,345",
                  change: "+15%",
                  icon: Users,
                  color: "text-pink-400",
                  bg: "bg-pink-500/10",
                },
                {
                  title: "Orders",
                  val: "1,234",
                  change: "-5%",
                  icon: ShoppingCart,
                  color: "text-blue-400",
                  bg: "bg-blue-500/10",
                },
                {
                  title: "Conversion",
                  val: "3.24%",
                  change: "+8%",
                  icon: Activity,
                  color: "text-emerald-400",
                  bg: "bg-emerald-500/10",
                },
              ].map((stat, i) => (
                <div
                  key={i}
                  className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-slate-700 transition-all group"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className={`p-3 rounded-xl ${stat.bg}`}>
                      <stat.icon className={`w-6 h-6 ${stat.color}`} />
                    </div>
                    <span
                      className={`text-xs font-bold px-2 py-1 rounded-full ${stat.change.startsWith("+") ? "bg-emerald-500/10 text-emerald-400" : "bg-rose-500/10 text-rose-400"}`}
                    >
                      {stat.change}
                    </span>
                  </div>
                  <h3 className="text-slate-500 text-sm font-medium">
                    {stat.title}
                  </h3>
                  <p className="text-2xl font-bold text-white mt-1 group-hover:text-violet-400 transition-colors">
                    {stat.val}
                  </p>
                </div>
              ))}
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
                <h3 className="text-lg font-bold text-white mb-6">
                  Revenue Growth
                </h3>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={salesData}>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="#1e293b"
                      vertical={false}
                    />
                    <XAxis
                      dataKey="month"
                      stroke="#64748b"
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                    />
                    <YAxis
                      stroke="#64748b"
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#0f172a",
                        border: "1px solid #334155",
                        borderRadius: "12px",
                      }}
                      itemStyle={{ color: "#a78bfa" }}
                    />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="#8b5cf6"
                      strokeWidth={3}
                      dot={{ fill: "#8b5cf6", strokeWidth: 2, r: 4 }}
                      activeDot={{ r: 6, strokeWidth: 0 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
                <h3 className="text-lg font-bold text-white mb-6">
                  Sales Analytics
                </h3>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={salesData}>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="#1e293b"
                      vertical={false}
                    />
                    <XAxis
                      dataKey="month"
                      stroke="#64748b"
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                    />
                    <YAxis
                      stroke="#64748b"
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#0f172a",
                        border: "1px solid #334155",
                        borderRadius: "12px",
                      }}
                    />
                    <Bar
                      dataKey="value"
                      fill="url(#darkGradient)"
                      radius={[6, 6, 0, 0]}
                    />
                    <defs>
                      <linearGradient
                        id="darkGradient"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop offset="0%" stopColor="#c084fc" />
                        <stop offset="100%" stopColor="#8b5cf6" />
                      </linearGradient>
                    </defs>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DarkDashboard;
