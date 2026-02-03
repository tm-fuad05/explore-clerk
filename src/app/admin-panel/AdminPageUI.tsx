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
  AlertCircle,
  CheckCircle,
  Clock,
} from "lucide-react";
import UserList from "./tabs/UserList";
import { User } from "@clerk/nextjs/server";

export default function AdminPageUI({ users }: { users: User[] }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [selectedItems, setSelectedItems] = useState<number[]>([]);

  // ... (Data objects like users, products, orders stay the same)

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

  const toggleSelection = (id: number) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  };

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

  const getStatusIcon = (status: string) => {
    const icons: { [key: string]: typeof CheckCircle } = {
      active: CheckCircle,
      completed: CheckCircle,
      processing: Clock,
      pending: AlertCircle,
      inactive: AlertCircle,
    };
    const Icon = icons[status] || AlertCircle;
    return <Icon className="w-3 h-3" />;
  };

  return (
    <div className="flex h-screen bg-slate-950 text-slate-200 selection:bg-purple-500/30">
      {/* Sidebar */}
      <aside
        className={`${sidebarOpen ? "w-64" : "w-20"} bg-slate-900 border-r border-slate-800 transition-all duration-300 flex flex-col`}
      >
        <div className="p-6 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <Shield className="w-5 h-5 text-white" />
            </div>
            {sidebarOpen && (
              <a
                href="/"
                className="font-bold text-xl tracking-tight text-white"
              >
                Nexus<span className="text-indigo-500">UI</span>
              </a>
            )}
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-2 mt-4">
          {menuItems.map((item) => (
            <button
              key={item.tab}
              onClick={() => setActiveTab(item.tab)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                activeTab === item.tab
                  ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/20"
                  : "text-slate-400 hover:bg-slate-800 hover:text-slate-100"
              }`}
            >
              <item.icon
                className={`w-5 h-5 ${activeTab === item.tab ? "text-white" : "group-hover:text-indigo-400 transition-colors"}`}
              />
              {sidebarOpen && <span className="font-medium">{item.name}</span>}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-800">
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:bg-slate-800 hover:text-white transition-all">
            <Settings className="w-5 h-5" />
            {sidebarOpen && <span className="font-medium">Settings</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden relative">
        {/* Background Glows */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-600/5 blur-[120px] rounded-full pointer-events-none"></div>

        {/* Header */}
        <header className="bg-slate-950/50 backdrop-blur-md border-b border-slate-800 px-8 py-4 z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 hover:bg-slate-800 rounded-lg transition-colors text-slate-400"
              >
                <Menu className="w-5 h-5" />
              </button>
              <div className="relative hidden lg:block">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500" />
                <input
                  type="text"
                  placeholder="Global search..."
                  className="pl-10 pr-4 py-2 bg-slate-900/50 border border-slate-800 rounded-xl w-80 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all text-sm"
                />
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button className="p-2.5 bg-slate-900 border border-slate-800 hover:bg-slate-800 rounded-xl relative transition-all group">
                <Bell className="w-5 h-5 text-slate-400 group-hover:text-white" />
                <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-indigo-500 rounded-full border-2 border-slate-900"></span>
              </button>

              <div className="flex items-center gap-3 pl-4 border-l border-slate-800">
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-bold text-white leading-none mb-1">
                    Admin User
                  </p>
                  <p className="text-xs text-slate-500 font-medium">
                    Super Admin
                  </p>
                </div>
                <div className="w-10 h-10 bg-gradient-to-tr from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center text-white font-bold ring-2 ring-indigo-500/20 shadow-xl shadow-indigo-500/10">
                  A
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-auto p-8 z-0">
          {activeTab === "dashboard" && (
            <div className="space-y-8 animate-in fade-in duration-500">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-black text-white tracking-tight">
                    Dashboard Overview
                  </h1>
                  <p className="text-slate-500 mt-1">
                    Metrics and performance analysis.
                  </p>
                </div>
                <div className="flex gap-3">
                  <button className="px-4 py-2 bg-slate-900 border border-slate-800 rounded-xl hover:bg-slate-800 text-slate-300 flex items-center gap-2 transition-all font-medium text-sm">
                    <Filter className="w-4 h-4" /> Filter
                  </button>
                  <button className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl shadow-lg shadow-indigo-600/20 flex items-center gap-2 transition-all font-bold text-sm">
                    <Plus className="w-4 h-4" /> Create New
                  </button>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, i) => (
                  <div
                    key={i}
                    className="bg-slate-900/40 backdrop-blur-sm rounded-2xl p-6 border border-slate-800/60 hover:border-indigo-500/30 transition-all group"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div
                        className={`p-3 bg-gradient-to-br ${stat.color} rounded-xl shadow-lg group-hover:scale-110 transition-transform`}
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
                    <p className="text-3xl font-black text-white">
                      {stat.value}
                    </p>
                  </div>
                ))}
              </div>

              {/* Table Preview Sections */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
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
                            <p className="font-bold text-slate-100">
                              {order.id}
                            </p>
                            <p className="text-xs text-slate-500 font-medium">
                              {order.customer}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-white mb-1">
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
                          <div className="w-10 h-10 bg-gradient-to-br from-slate-700 to-slate-800 rounded-lg border border-slate-700"></div>
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
          {/* Users */}
          {activeTab === "users" && <UserList users={users} />}
        </main>
      </div>
    </div>
  );
}
