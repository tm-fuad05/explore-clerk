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
} from "recharts";

import {
  TrendingUp,
  Users,
  DollarSign,
  ShoppingCart,
  Activity,
  Menu,
  Bell,
  Search,
  X, // মোবাইল ক্লোজ বাটন
} from "lucide-react";
import { SignedIn, UserButton } from "@clerk/nextjs";

const DarkDashboard = () => {
  // মোবাইলে ডিফল্ট ভাবে সাইডবার বন্ধ থাকবে
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const salesData = [
    { month: "Jan", value: 4200 },
    { month: "Feb", value: 3800 },
    { month: "Mar", value: 5100 },
    { month: "Apr", value: 4600 },
    { month: "May", value: 6200 },
    { month: "Jun", value: 5800 },
  ];

  return (
    <div className="flex h-screen bg-[#020617] text-slate-200 selection:bg-violet-500/30 overflow-hidden">
      {/* Mobile Overlay: সাইডবার ওপেন থাকলে ব্যাকগ্রাউন্ড ক্লিক করলে বন্ধ হবে */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 lg:relative lg:translate-x-0 transform transition-all duration-300 ease-in-out
          ${sidebarOpen ? "translate-x-0 w-64" : "-translate-x-full lg:w-20 lg:translate-x-0"} 
          bg-slate-900/50 backdrop-blur-xl border-r border-slate-800 flex flex-col`}
      >
        <div className="p-6 border-b border-slate-800 flex items-center justify-between">
          <a
            href="/"
            className={`font-bold text-2xl bg-linear-to-r from-violet-400 to-pink-400 bg-clip-text text-transparent 
            ${!sidebarOpen && "lg:hidden"}`}
          >
            ZodGuard
          </a>

          {!sidebarOpen && (
            <div className="hidden lg:block w-8 h-8 bg-linear-to-r from-violet-500 to-pink-500 rounded-lg shadow-lg shadow-violet-500/20" />
          )}

          {/* Mobile Close Button */}
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-slate-400"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {["Overview", "Analytics", "Reports", "Settings"].map((item, i) => (
            <button
              key={i}
              className="w-full flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-slate-800 transition-all text-slate-400 hover:text-white group"
            >
              <div className="w-2 h-2 rounded-full bg-violet-500 opacity-0 group-hover:opacity-100 transition-opacity" />
              {(sidebarOpen ||
                (typeof window !== "undefined" &&
                  window.innerWidth < 1024)) && (
                <span className="font-medium whitespace-nowrap">{item}</span>
              )}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-slate-900/40 backdrop-blur-md border-b border-slate-800 px-4 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
              >
                <Menu className="w-6 h-6 text-slate-400" />
              </button>

              <div className="relative hidden md:block">
                <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type="text"
                  placeholder="Search anything..."
                  className="pl-10 pr-4 py-2 bg-slate-800/50 border border-slate-700 rounded-xl w-64 lg:w-80 focus:outline-none focus:ring-2 focus:ring-violet-500/50 transition-all text-sm"
                />
              </div>
            </div>

            <div className="flex items-center gap-2 lg:gap-4">
              <button className="p-2 hover:bg-slate-800 rounded-lg relative transition-all">
                <Bell className="w-6 h-6 text-slate-400" />
                <span className="absolute top-2 right-2 w-2 h-2 bg-pink-500 rounded-full border-2 border-slate-900"></span>
              </button>

              <SignedIn>
                <UserButton
                  appearance={{
                    elements: {
                      userButtonAvatarBox:
                        "w-9 h-9 lg:w-10 lg:h-10 ring-2 ring-purple-500/30",
                    },
                  }}
                  afterSignOutUrl="/"
                />
              </SignedIn>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 overflow-auto p-4 lg:p-8 custom-scrollbar">
          <div className="max-w-7xl mx-auto space-y-6 lg:space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
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
                  className="bg-slate-900 border border-slate-800 rounded-2xl p-5 lg:p-6 hover:border-slate-700 transition-all group"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className={`p-3 rounded-xl ${stat.bg}`}>
                      <stat.icon
                        className={`w-5 h-5 lg:w-6 lg:h-6 ${stat.color}`}
                      />
                    </div>
                    <span
                      className={`text-[10px] lg:text-xs font-bold px-2 py-1 rounded-full ${stat.change.startsWith("+") ? "bg-emerald-500/10 text-emerald-400" : "bg-rose-500/10 text-rose-400"}`}
                    >
                      {stat.change}
                    </span>
                  </div>
                  <h3 className="text-slate-500 text-xs lg:text-sm font-medium">
                    {stat.title}
                  </h3>
                  <p className="text-xl lg:text-2xl font-bold text-white mt-1 group-hover:text-violet-400 transition-colors">
                    {stat.val}
                  </p>
                </div>
              ))}
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 lg:p-6 overflow-hidden">
                <h3 className="text-base lg:text-lg font-bold text-white mb-6">
                  Revenue Growth
                </h3>
                <div className="h-[250px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
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
                        hide={window.innerWidth < 640}
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
                        dot={{ fill: "#8b5cf6", r: 4 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 lg:p-6 overflow-hidden">
                <h3 className="text-base lg:text-lg font-bold text-white mb-6">
                  Sales Analytics
                </h3>
                <div className="h-[250px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
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
                        hide={window.innerWidth < 640}
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
                        fill="#8b5cf6"
                        radius={[6, 6, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DarkDashboard;
