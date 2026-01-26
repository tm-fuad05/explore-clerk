"use client";
import React, { useState } from "react";
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
  X,
  ChevronDown,
  MoreVertical,
  Plus,
  Filter,
  Download,
  Upload,
  Edit,
  Trash2,
  Eye,
  Shield,
  Package,
  DollarSign,
  Activity,
  AlertCircle,
  CheckCircle,
  Clock,
} from "lucide-react";

const AdminPanel = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("users");
  const [selectedItems, setSelectedItems] = useState<number[]>([]);

  const users = [
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      role: "Admin",
      status: "active",
      joinDate: "2024-01-15",
      avatar: "JD",
    },
    {
      id: 2,
      name: "Sarah Smith",
      email: "sarah@example.com",
      role: "Editor",
      status: "active",
      joinDate: "2024-02-20",
      avatar: "SS",
    },
    {
      id: 3,
      name: "Mike Johnson",
      email: "mike@example.com",
      role: "User",
      status: "inactive",
      joinDate: "2024-03-10",
      avatar: "MJ",
    },
    {
      id: 4,
      name: "Emily Brown",
      email: "emily@example.com",
      role: "Editor",
      status: "active",
      joinDate: "2024-01-25",
      avatar: "EB",
    },
    {
      id: 5,
      name: "David Lee",
      email: "david@example.com",
      role: "User",
      status: "pending",
      joinDate: "2024-04-05",
      avatar: "DL",
    },
  ];

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
    {
      id: 3,
      name: "Laptop Stand",
      category: "Accessories",
      price: "$79",
      stock: 8,
      sales: 123,
    },
    {
      id: 4,
      name: "USB-C Cable",
      category: "Accessories",
      price: "$19",
      stock: 250,
      sales: 890,
    },
    {
      id: 5,
      name: "Mechanical Keyboard",
      category: "Electronics",
      price: "$159",
      stock: 32,
      sales: 345,
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
    {
      id: "#ORD-003",
      customer: "Carol White",
      amount: "$299",
      status: "pending",
      date: "2024-01-21",
    },
    {
      id: "#ORD-004",
      customer: "Dan Brown",
      amount: "$89",
      status: "completed",
      date: "2024-01-19",
    },
  ];

  const stats = [
    {
      title: "Total Users",
      value: "12,482",
      change: "+12%",
      icon: Users,
      color: "from-blue-500 to-blue-600",
      trend: "up",
    },
    {
      title: "Revenue",
      value: "$48,392",
      change: "+23%",
      icon: DollarSign,
      color: "from-emerald-500 to-emerald-600",
      trend: "up",
    },
    {
      title: "Active Orders",
      value: "1,284",
      change: "-5%",
      icon: ShoppingBag,
      color: "from-orange-500 to-orange-600",
      trend: "down",
    },
    {
      title: "Products",
      value: "847",
      change: "+8%",
      icon: Package,
      color: "from-purple-500 to-purple-600",
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
    { name: "Settings", icon: Settings, tab: "settings" },
  ];

  const toggleSelection = (id: number) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  };

  const getStatusColor = (status: string) => {
    const colors = {
      active: "bg-emerald-100 text-emerald-700",
      inactive: "bg-slate-100 text-slate-700",
      pending: "bg-amber-100 text-amber-700",
      completed: "bg-blue-100 text-blue-700",
      processing: "bg-purple-100 text-purple-700",
    };
    return (
      colors[status as keyof typeof colors] || "bg-slate-100 text-slate-700"
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
    <div className="flex h-screen bg-slate-50">
      {/* Sidebar */}
      <aside
        className={`${sidebarOpen ? "w-64" : "w-20"} bg-slate-900 text-white transition-all duration-300 flex flex-col`}
      >
        <div className="p-6 border-b border-slate-800 flex items-center justify-between">
          {sidebarOpen && (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5" />
              </div>
              <span className="font-bold text-lg">Admin Panel</span>
            </div>
          )}
          {!sidebarOpen && (
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mx-auto">
              <Shield className="w-5 h-5" />
            </div>
          )}
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {menuItems.map((item) => (
            <button
              key={item.tab}
              onClick={() => setActiveTab(item.tab)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                activeTab === item.tab
                  ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg"
                  : "text-slate-400 hover:bg-slate-800 hover:text-white"
              }`}
            >
              <item.icon className="w-5 h-5" />
              {sidebarOpen && <span className="font-medium">{item.name}</span>}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-800">
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-slate-400 hover:bg-slate-800 hover:text-white transition-all">
            <Settings className="w-5 h-5" />
            {sidebarOpen && <span className="font-medium">Settings</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b border-slate-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <Menu className="w-5 h-5 text-slate-600" />
              </button>
              <div className="relative">
                <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search anything..."
                  className="pl-10 pr-4 py-2 bg-slate-100 rounded-lg w-96 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button className="p-2 hover:bg-slate-100 rounded-lg relative">
                <Bell className="w-5 h-5 text-slate-600" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <div className="flex items-center gap-3 pl-3 border-l border-slate-200">
                <div className="text-right">
                  <p className="text-sm font-semibold text-slate-800">
                    Admin User
                  </p>
                  <p className="text-xs text-slate-500">admin@panel.com</p>
                </div>
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                  A
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-auto p-6">
          {activeTab === "dashboard" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-slate-800">
                  Dashboard Overview
                </h1>
                <div className="flex gap-2">
                  <button className="px-4 py-2 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 flex items-center gap-2">
                    <Filter className="w-4 h-4" />
                    Filter
                  </button>
                  <button className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:shadow-lg transition-shadow flex items-center gap-2">
                    <Download className="w-4 h-4" />
                    Export
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat, i) => (
                  <div
                    key={i}
                    className="bg-white rounded-xl p-6 border border-slate-200 hover:shadow-lg transition-shadow"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div
                        className={`p-3 bg-gradient-to-br ${stat.color} rounded-lg`}
                      >
                        <stat.icon className="w-6 h-6 text-white" />
                      </div>
                      <span
                        className={`text-sm font-semibold ${stat.trend === "up" ? "text-emerald-600" : "text-red-600"}`}
                      >
                        {stat.change}
                      </span>
                    </div>
                    <p className="text-slate-500 text-sm mb-1">{stat.title}</p>
                    <p className="text-2xl font-bold text-slate-800">
                      {stat.value}
                    </p>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl p-6 border border-slate-200">
                  <h3 className="font-bold text-lg mb-4">Recent Orders</h3>
                  <div className="space-y-3">
                    {orders.slice(0, 4).map((order) => (
                      <div
                        key={order.id}
                        className="flex items-center justify-between p-3 bg-slate-50 rounded-lg"
                      >
                        <div>
                          <p className="font-semibold text-slate-800">
                            {order.id}
                          </p>
                          <p className="text-sm text-slate-500">
                            {order.customer}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-slate-800">
                            {order.amount}
                          </p>
                          <span
                            className={`inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full ${getStatusColor(order.status)}`}
                          >
                            {getStatusIcon(order.status)}
                            {order.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-xl p-6 border border-slate-200">
                  <h3 className="font-bold text-lg mb-4">Top Products</h3>
                  <div className="space-y-3">
                    {products.slice(0, 4).map((product) => (
                      <div
                        key={product.id}
                        className="flex items-center justify-between p-3 bg-slate-50 rounded-lg"
                      >
                        <div>
                          <p className="font-semibold text-slate-800">
                            {product.name}
                          </p>
                          <p className="text-sm text-slate-500">
                            {product.category}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-slate-800">
                            {product.sales} sales
                          </p>
                          <p className="text-sm text-slate-500">
                            {product.stock} in stock
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "users" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-slate-800">
                  User Management
                </h1>
                <button className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:shadow-lg transition-shadow flex items-center gap-2">
                  <Plus className="w-4 h-4" />
                  Add User
                </button>
              </div>

              {selectedItems.length > 0 && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-center justify-between">
                  <span className="text-blue-800 font-medium">
                    {selectedItems.length} users selected
                  </span>
                  <div className="flex gap-2">
                    <button className="px-3 py-1.5 bg-white border border-blue-200 rounded-lg text-sm hover:bg-blue-50">
                      Bulk Edit
                    </button>
                    <button className="px-3 py-1.5 bg-red-500 text-white rounded-lg text-sm hover:bg-red-600">
                      Delete Selected
                    </button>
                  </div>
                </div>
              )}

              <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                <table className="w-full">
                  <thead className="bg-slate-50 border-b border-slate-200">
                    <tr>
                      <th className="text-left p-4 font-semibold text-slate-700">
                        <input type="checkbox" className="rounded" />
                      </th>
                      <th className="text-left p-4 font-semibold text-slate-700">
                        User
                      </th>
                      <th className="text-left p-4 font-semibold text-slate-700">
                        Role
                      </th>
                      <th className="text-left p-4 font-semibold text-slate-700">
                        Status
                      </th>
                      <th className="text-left p-4 font-semibold text-slate-700">
                        Join Date
                      </th>
                      <th className="text-left p-4 font-semibold text-slate-700">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr
                        key={user.id}
                        className="border-b border-slate-100 hover:bg-slate-50"
                      >
                        <td className="p-4">
                          <input
                            type="checkbox"
                            checked={selectedItems.includes(user.id)}
                            onChange={() => toggleSelection(user.id)}
                            className="rounded"
                          />
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                              {user.avatar}
                            </div>
                            <div>
                              <p className="font-semibold text-slate-800">
                                {user.name}
                              </p>
                              <p className="text-sm text-slate-500">
                                {user.email}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="p-4">
                          <span className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm">
                            {user.role}
                          </span>
                        </td>
                        <td className="p-4">
                          <span
                            className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm ${getStatusColor(user.status)}`}
                          >
                            {getStatusIcon(user.status)}
                            {user.status}
                          </span>
                        </td>
                        <td className="p-4 text-slate-600">{user.joinDate}</td>
                        <td className="p-4">
                          <div className="flex gap-2">
                            <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                              <Eye className="w-4 h-4 text-slate-600" />
                            </button>
                            <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                              <Edit className="w-4 h-4 text-slate-600" />
                            </button>
                            <button className="p-2 hover:bg-red-50 rounded-lg transition-colors">
                              <Trash2 className="w-4 h-4 text-red-500" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === "products" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-slate-800">
                  Product Management
                </h1>
                <div className="flex gap-2">
                  <button className="px-4 py-2 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 flex items-center gap-2">
                    <Upload className="w-4 h-4" />
                    Import
                  </button>
                  <button className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:shadow-lg transition-shadow flex items-center gap-2">
                    <Plus className="w-4 h-4" />
                    Add Product
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                <table className="w-full">
                  <thead className="bg-slate-50 border-b border-slate-200">
                    <tr>
                      <th className="text-left p-4 font-semibold text-slate-700">
                        Product
                      </th>
                      <th className="text-left p-4 font-semibold text-slate-700">
                        Category
                      </th>
                      <th className="text-left p-4 font-semibold text-slate-700">
                        Price
                      </th>
                      <th className="text-left p-4 font-semibold text-slate-700">
                        Stock
                      </th>
                      <th className="text-left p-4 font-semibold text-slate-700">
                        Sales
                      </th>
                      <th className="text-left p-4 font-semibold text-slate-700">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product) => (
                      <tr
                        key={product.id}
                        className="border-b border-slate-100 hover:bg-slate-50"
                      >
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg"></div>
                            <span className="font-semibold text-slate-800">
                              {product.name}
                            </span>
                          </div>
                        </td>
                        <td className="p-4 text-slate-600">
                          {product.category}
                        </td>
                        <td className="p-4 font-semibold text-slate-800">
                          {product.price}
                        </td>
                        <td className="p-4">
                          <span
                            className={`px-3 py-1 rounded-full text-sm ${
                              product.stock < 20
                                ? "bg-red-100 text-red-700"
                                : "bg-emerald-100 text-emerald-700"
                            }`}
                          >
                            {product.stock} units
                          </span>
                        </td>
                        <td className="p-4 text-slate-600">{product.sales}</td>
                        <td className="p-4">
                          <div className="flex gap-2">
                            <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                              <Edit className="w-4 h-4 text-slate-600" />
                            </button>
                            <button className="p-2 hover:bg-red-50 rounded-lg transition-colors">
                              <Trash2 className="w-4 h-4 text-red-500" />
                            </button>
                            <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                              <MoreVertical className="w-4 h-4 text-slate-600" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminPanel;
