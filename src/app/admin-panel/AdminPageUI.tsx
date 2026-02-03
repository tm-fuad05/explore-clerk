"use client";
import { useState } from "react";
import {
  Users,
  Settings,
  LayoutDashboard,
  FileText,
  ShoppingBag,
  TrendingUp,
  Bell,
  Search,
  Menu,
  Plus,
  Filter,
  Shield,
  Package,
  DollarSign,
  Clock,
  X, // বন্ধ করার জন্য নতুন আইকন
} from "lucide-react";
import UserList from "./tabs/UserList";
import { User } from "@clerk/nextjs/server";
import { UserButton } from "@clerk/nextjs";
import { SignedIn } from "@clerk/clerk-react";

export default function AdminPageUI({ users }: { users: User[] }) {
  const [sidebarOpen, setSidebarOpen] = useState(false); // ডিফল্ট মোবাইল ফ্রেন্ডলি রাখার জন্য false
  const [activeTab, setActiveTab] = useState("dashboard");

  // ... (Data objects remain same)
  const products = [
    {
      id: 1,
      name: "Premium Headphones",
      category: "Electronics",
      price: "$299",
      stock: 45,
      sales: 234,
    },
    {
      id: 2,
      name: "Wireless Mouse",
      category: "Electronics",
      price: "$49",
      stock: 120,
      sales: 567,
    },
  ];

  const orders = [
    {
      id: "#ORD-001",
      customer: "Alice Cooper",
      amount: "$459",
      status: "completed",
      date: "2024-01-20",
    },
    {
      id: "#ORD-002",
      customer: "Bob Wilson",
      amount: "$129",
      status: "processing",
      date: "2024-01-21",
    },
  ];

  const stats = [
    {
      title: "Total Users",
      value: "12,482",
      change: "+12%",
      icon: Users,
      color: "from-blue-500 to-indigo-600",
      trend: "up",
    },
    {
      title: "Revenue",
      value: "$48,392",
      change: "+23%",
      icon: DollarSign,
      color: "from-purple-500 to-pink-600",
      trend: "up",
    },
    {
      title: "Active Orders",
      value: "1,284",
      change: "-5%",
      icon: ShoppingBag,
      color: "from-orange-500 to-red-600",
      trend: "down",
    },
    {
      title: "Products",
      value: "847",
      change: "+8%",
      icon: Package,
      color: "from-emerald-500 to-teal-600",
      trend: "up",
    },
  ];

  const menuItems = [
    { name: "Dashboard", icon: LayoutDashboard, tab: "dashboard" },
    { name: "Users", icon: Users, tab: "users" },
    { name: "Products", icon: Package, tab: "products" },
    { name: "Orders", icon: ShoppingBag, tab: "orders" },
    { name: "Analytics", icon: TrendingUp, tab: "analytics" },
    { name: "Reports", icon: FileText, tab: "reports" },
  ];

  const getStatusColor = (status: string) => {
    const colors = {
      active: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",
      inactive: "bg-rose-500/10 text-rose-400 border border-rose-500/20",
      pending: "bg-amber-500/10 text-amber-400 border border-amber-500/20",
      completed: "bg-blue-500/10 text-blue-400 border border-blue-500/20",
      processing:
        "bg-purple-500/10 text-purple-400 border border-purple-500/20",
    };
    return (
      colors[status as keyof typeof colors] || "bg-slate-500/10 text-slate-400"
    );
  };

  return (
    <div className="flex h-screen bg-slate-950 text-slate-200 selection:bg-purple-500/30 overflow-hidden">
      {/* Mobile Overlay */}
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
          bg-slate-900 border-r border-slate-800 flex flex-col`}
      >
        <div className="p-6 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-linear-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <Shield className="w-5 h-5 text-white" />
            </div>
            {(sidebarOpen ||
              (typeof window !== "undefined" && window.innerWidth < 1024)) && (
              <a
                href="/"
                className="font-bold text-xl tracking-tight text-white"
              >
                Zod<span className="text-indigo-500">Guard</span>
              </a>
            )}
          </div>
          {/* Mobile Close Button */}
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-1 text-slate-400"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-2 mt-4">
          {menuItems.map((item) => (
            <button
              key={item.tab}
              onClick={() => {
                setActiveTab(item.tab);
                if (window.innerWidth < 1024) setSidebarOpen(false); // মোবাইল ট্যাব সিলেক্ট করলে অটো ক্লোজ
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                activeTab === item.tab
                  ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/20"
                  : "text-slate-400 hover:bg-slate-800 hover:text-slate-100"
              }`}
            >
              <item.icon
                className={`w-5 h-5 ${activeTab === item.tab ? "text-white" : "group-hover:text-indigo-400"}`}
              />
              {(sidebarOpen ||
                (typeof window !== "undefined" &&
                  window.innerWidth < 1024)) && (
                <span className="font-medium">{item.name}</span>
              )}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-800">
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:bg-slate-800 hover:text-white transition-all">
            <Settings className="w-5 h-5" />
            {(sidebarOpen ||
              (typeof window !== "undefined" && window.innerWidth < 1024)) && (
              <span className="font-medium">Settings</span>
            )}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden relative">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-600/5 blur-[120px] rounded-full pointer-events-none"></div>

        {/* Header */}
        <header className="bg-slate-950/50 backdrop-blur-md border-b border-slate-800 px-4 lg:px-8 py-4 z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 lg:gap-6">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 hover:bg-slate-800 rounded-lg transition-colors text-slate-400"
              >
                <Menu className="w-5 h-5" />
              </button>
              <div className="relative hidden md:block">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500" />
                <input
                  type="text"
                  placeholder="Global search..."
                  className="pl-10 pr-4 py-2 bg-slate-900/50 border border-slate-800 rounded-xl w-40 lg:w-80 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 text-sm"
                />
              </div>
            </div>

            <div className="flex items-center gap-2 lg:gap-4">
              <button className="p-2.5 bg-slate-900 border border-slate-800 hover:bg-slate-800 rounded-xl relative group">
                <Bell className="w-5 h-5 text-slate-400 group-hover:text-white" />
                <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-indigo-500 rounded-full border-2 border-slate-900"></span>
              </button>

              <div className="flex items-center gap-3 pl-2 lg:pl-4 border-l border-slate-800">
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-bold text-white leading-none mb-1">
                    Admin User
                  </p>
                  <p className="text-xs text-slate-500 font-medium">
                    Super Admin
                  </p>
                </div>
                <SignedIn>
                  <UserButton
                    appearance={{
                      elements: {
                        userButtonAvatarBox:
                          "w-10 h-10 ring-2 ring-purple-500/30",
                      },
                    }}
                    afterSignOutUrl="/"
                  />
                </SignedIn>
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-auto p-4 lg:p-8 z-0">
          {activeTab === "dashboard" && (
            <div className="space-y-6 lg:space-y-8 animate-in fade-in duration-500">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl lg:text-3xl font-black text-white tracking-tight">
                    Dashboard Overview
                  </h1>
                  <p className="text-slate-500 mt-1 text-sm">
                    Metrics and performance analysis.
                  </p>
                </div>
                <div className="flex gap-3">
                  <button className="flex-1 sm:flex-none px-4 py-2 bg-slate-900 border border-slate-800 rounded-xl hover:bg-slate-800 text-slate-300 flex items-center justify-center gap-2 font-medium text-sm">
                    <Filter className="w-4 h-4" /> Filter
                  </button>
                  <button className="flex-1 sm:flex-none px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl shadow-lg shadow-indigo-600/20 flex items-center justify-center gap-2 font-bold text-sm">
                    <Plus className="w-4 h-4" /> Create New
                  </button>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
                {stats.map((stat, i) => (
                  <div
                    key={i}
                    className="bg-slate-900/40 backdrop-blur-sm rounded-2xl p-6 border border-slate-800/60 group"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div
                        className={`p-3 bg-linear-to-br ${stat.color} rounded-xl shadow-lg group-hover:scale-110 transition-transform`}
                      >
                        <stat.icon className="w-6 h-6 text-white" />
                      </div>
                      <span
                        className={`text-xs font-bold px-2 py-1 rounded-lg ${stat.trend === "up" ? "bg-emerald-500/10 text-emerald-400" : "bg-rose-500/10 text-rose-400"}`}
                      >
                        {stat.change}
                      </span>
                    </div>
                    <p className="text-slate-500 text-sm font-medium mb-1 uppercase tracking-wider">
                      {stat.title}
                    </p>
                    <p className="text-2xl lg:text-3xl font-black text-white">
                      {stat.value}
                    </p>
                  </div>
                ))}
              </div>

              {/* Table Preview Sections */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
                {/* Orders Card */}
                <div className="bg-slate-900/40 backdrop-blur-sm rounded-2xl border border-slate-800/60 overflow-hidden">
                  <div className="p-6 border-b border-slate-800 flex justify-between items-center">
                    <h3 className="font-bold text-lg text-white">
                      Recent Orders
                    </h3>
                    <button className="text-xs text-indigo-400 font-bold hover:text-indigo-300">
                      View All
                    </button>
                  </div>
                  <div className="p-4 space-y-3">
                    {orders.map((order) => (
                      <div
                        key={order.id}
                        className="flex items-center justify-between p-4 bg-slate-800/30 rounded-xl border border-transparent hover:border-slate-700 transition-all"
                      >
                        <div className="flex gap-4 items-center">
                          <div className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center text-indigo-400">
                            <Clock className="w-5 h-5" />
                          </div>
                          <div>
                            <p className="font-bold text-slate-100 text-sm">
                              {order.id}
                            </p>
                            <p className="text-xs text-slate-500 font-medium">
                              {order.customer}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-white mb-1 text-sm">
                            {order.amount}
                          </p>
                          <span
                            className={`inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-tighter px-2 py-0.5 rounded-md ${getStatusColor(order.status)}`}
                          >
                            {order.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Products Card */}
                <div className="bg-slate-900/40 backdrop-blur-sm rounded-2xl border border-slate-800/60 overflow-hidden">
                  <div className="p-6 border-b border-slate-800 flex justify-between items-center">
                    <h3 className="font-bold text-lg text-white">
                      Top Performance
                    </h3>
                    <button className="text-xs text-indigo-400 font-bold hover:text-indigo-300">
                      Analytics
                    </button>
                  </div>
                  <div className="p-4 space-y-3">
                    {products.map((product) => (
                      <div
                        key={product.id}
                        className="flex items-center justify-between p-4 bg-slate-800/30 rounded-xl border border-transparent hover:border-slate-700 transition-all"
                      >
                        <div className="flex gap-4 items-center">
                          <div className="w-10 h-10 bg-linear-to-br from-slate-700 to-slate-800 rounded-lg border border-slate-700"></div>
                          <div>
                            <p className="font-bold text-slate-100 text-sm">
                              {product.name}
                            </p>
                            <p className="text-xs text-slate-500 font-medium">
                              {product.category}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-bold text-indigo-400">
                            {product.sales} Sales
                          </p>
                          <p className="text-[10px] text-slate-500 font-bold uppercase">
                            {product.stock} left
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
          {activeTab === "users" && <UserList users={users} />}
        </main>
      </div>
    </div>
  );
}
