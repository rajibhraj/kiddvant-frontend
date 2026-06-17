"use client";

import React, { useState, useEffect } from "react";
import {
  DollarSign,
  ShoppingBag,
  Users,
  MessageSquare,
  TrendingUp,
  TrendingDown,
  RefreshCw,
  Eye,
  Calendar,
  AlertCircle,
  Clock,
  ArrowUpRight,
  TrendingUp as TrendIcon,
  Activity,
  Mail
} from "lucide-react";
import { fetchOrders, fetchContacts, fetchSubscribers } from "@/lib/api";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://192.168.50.130:5000/api";

// ─── Interfaces ───────────────────────────────────────────────────────────────

interface Order {
  _id: string;
  orderId: string;
  customerInfo: { fullName: string; phone: string; email?: string };
  total: number;
  status: "Pending" | "Packed" | "Shipped" | "Received" | "Cancelled";
  createdAt: string;
}

interface Product {
  _id: string;
  name: string;
  price: number;
  stock: number;
  isActive: boolean;
}

interface ContactMessage {
  _id: string;
  name: string;
  email: string;
  message: string;
  status: string;
  createdAt: string;
}

interface Subscriber {
  _id: string;
  email: string;
  createdAt: string;
}

export default function DashboardPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [contacts, setContacts] = useState<ContactMessage[]>([]);
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Interactive state for chart hover
  const [hoveredDataIndex, setHoveredDataIndex] = useState<number | null>(null);

  const loadDashboardData = async () => {
    setLoading(true);
    setError(null);
    const token = localStorage.getItem("adminToken") || "";

    try {
      // 1. Fetch Orders
      let fetchedOrders: Order[] = [];
      try {
        const res = await fetchOrders();
        if (res && res.success && Array.isArray(res.data)) {
          fetchedOrders = res.data;
        }
      } catch (err) {
        console.warn("Failed to fetch orders, using empty array:", err);
      }

      // 2. Fetch Products
      let fetchedProducts: Product[] = [];
      try {
        const res = await fetch(`${API_BASE}/products`);
        const json = await res.json();
        if (res.ok && Array.isArray(json.data)) {
          fetchedProducts = json.data;
        }
      } catch (err) {
        console.warn("Failed to fetch products, using empty array:", err);
      }

      // 3. Fetch Contacts (requires token)
      let fetchedContacts: ContactMessage[] = [];
      if (token) {
        try {
          const res = await fetchContacts(token);
          if (res && res.success && Array.isArray(res.data)) {
            fetchedContacts = res.data;
          }
        } catch (err) {
          console.warn("Failed to fetch contacts, using empty array:", err);
        }
      }

      // 4. Fetch Subscribers (requires token)
      let fetchedSubscribers: Subscriber[] = [];
      if (token) {
        try {
          const res = await fetchSubscribers(token);
          if (res && res.success && Array.isArray(res.data)) {
            fetchedSubscribers = res.data;
          }
        } catch (err) {
          console.warn("Failed to fetch subscribers, using empty array:", err);
        }
      }

      setOrders(fetchedOrders);
      setProducts(fetchedProducts);
      setContacts(fetchedContacts);
      setSubscribers(fetchedSubscribers);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to load dashboard statistics.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboardData();
  }, []);

  // ─── Metrics Calculation ─────────────────────────────────────────────────────

  // Total Sales (exclude cancelled)
  const totalSales = orders
    .filter((o) => o.status !== "Cancelled")
    .reduce((sum, o) => sum + (o.total || 0), 0);

  // Active products
  const activeProductsCount = products.filter((p) => p.isActive).length;

  // Unread messages
  const unreadMessagesCount = contacts.filter((c) => c.status === "unread").length;

  // Total connections count
  const connectionsCount = contacts.length + subscribers.length;

  // ─── Status Distribution Calculation ─────────────────────────────────────────
  const statusCounts = {
    Pending: orders.filter((o) => o.status === "Pending").length,
    Packed: orders.filter((o) => o.status === "Packed").length,
    Shipped: orders.filter((o) => o.status === "Shipped").length,
    Received: orders.filter((o) => o.status === "Received").length,
    Cancelled: orders.filter((o) => o.status === "Cancelled").length,
  };

  const totalOrdersCount = orders.length;

  // ─── Last 7 Days Sales Trend Calculation ─────────────────────────────────────
  const getSalesTrendForLast7Days = () => {
    const days = [];
    const sales = [];
    const orderCounts = [];
    const rawDates = [];

    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dateString = d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
      const keyDate = d.toDateString();

      // Sum orders on this day
      const dayOrders = orders.filter((o) => {
        const orderDate = new Date(o.createdAt).toDateString();
        return orderDate === keyDate && o.status !== "Cancelled";
      });

      const daySales = dayOrders.reduce((sum, o) => sum + (o.total || 0), 0);

      days.push(dateString);
      sales.push(daySales);
      orderCounts.push(dayOrders.length);
      rawDates.push(d);
    }

    return { days, sales, orderCounts, rawDates };
  };

  const trendData = getSalesTrendForLast7Days();
  const maxTrendSales = Math.max(...trendData.sales, 100);

  // Generate SVG points for Line/Area chart (Width: 600, Height: 180)
  const chartWidth = 600;
  const chartHeight = 160;
  const paddingX = 40;
  const paddingY = 20;

  const getSvgPoints = () => {
    const points = trendData.sales.map((val, idx) => {
      const x = paddingX + (idx * (chartWidth - paddingX * 2)) / 6;
      // Inverse Y since SVG coordinates start at top
      const usableHeight = chartHeight - paddingY * 2;
      const y = chartHeight - paddingY - (val / maxTrendSales) * usableHeight;
      return { x, y, value: val, label: trendData.days[idx], orderCount: trendData.orderCounts[idx] };
    });

    const pathD = points.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");
    const areaD = `${pathD} L ${points[6].x} ${chartHeight - paddingY} L ${points[0].x} ${chartHeight - paddingY} Z`;

    return { points, pathD, areaD };
  };

  const svgData = getSvgPoints();

  // Status Badge Class
  const getStatusClass = (status: string) => {
    switch (status) {
      case "Pending":
        return "bg-amber-50 text-amber-700 border-amber-200/50";
      case "Packed":
        return "bg-indigo-50 text-indigo-700 border-indigo-200/50";
      case "Shipped":
        return "bg-blue-50 text-blue-700 border-blue-200/50";
      case "Received":
        return "bg-emerald-50 text-emerald-700 border-emerald-200/50";
      case "Cancelled":
        return "bg-red-50 text-red-700 border-red-200/50";
      default:
        return "bg-slate-50 text-slate-700 border-slate-200/50";
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-32 bg-white rounded-2xl border border-slate-100 shadow-sm">
        <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-sm text-slate-500 font-medium">Crunching dashboard numbers...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white p-8 text-center rounded-2xl shadow-sm border border-slate-100 space-y-4">
        <p className="text-red-500 font-medium flex items-center justify-center gap-2">
          <AlertCircle size={20} /> Error loading dashboard: {error}
        </p>
        <button
          onClick={loadDashboardData}
          className="px-5 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-bold hover:bg-indigo-700 transition-colors shadow-sm cursor-pointer"
        >
          Retry Load
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* ── Top Level Stats Cards ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Sales Card */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between hover:shadow-md transition-shadow">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Total Sales</p>
            <h3 className="text-2xl font-bold text-slate-800 mt-1.5">৳{totalSales.toLocaleString()}</h3>
            <span className="text-[11px] text-slate-500 flex items-center gap-1 mt-1 font-medium">
              <TrendIcon size={12} className="text-emerald-500" /> Active earnings
            </span>
          </div>
          <div className="p-4 rounded-xl text-green-600 bg-green-50/50 border border-green-100">
            <DollarSign size={24} />
          </div>
        </div>

        {/* Products Card */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between hover:shadow-md transition-shadow">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Live Products</p>
            <h3 className="text-2xl font-bold text-slate-800 mt-1.5">{activeProductsCount}</h3>
            <span className="text-[11px] text-slate-500 flex items-center gap-1 mt-1 font-medium">
              <Activity size={12} className="text-indigo-500" /> Out of {products.length} total
            </span>
          </div>
          <div className="p-4 rounded-xl text-blue-600 bg-blue-50/50 border border-blue-100">
            <ShoppingBag size={24} />
          </div>
        </div>

        {/* Orders Card */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between hover:shadow-md transition-shadow">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Total Orders</p>
            <h3 className="text-2xl font-bold text-slate-800 mt-1.5">{totalOrdersCount}</h3>
            <span className="text-[11px] text-slate-500 flex items-center gap-1 mt-1 font-medium">
              <Clock size={12} className="text-amber-500" /> {statusCounts.Pending} pending verification
            </span>
          </div>
          <div className="p-4 rounded-xl text-purple-600 bg-purple-50/50 border border-purple-100">
            <Users size={24} />
          </div>
        </div>

        {/* Contacts & Subscribers Card */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between hover:shadow-md transition-shadow">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Inquiries & Subscribers</p>
            <h3 className="text-2xl font-bold text-slate-800 mt-1.5">{connectionsCount}</h3>
            <span className="text-[11px] text-slate-500 flex items-center gap-1 mt-1 font-medium">
              <MessageSquare size={12} className="text-indigo-500" /> {unreadMessagesCount} unread messages
            </span>
          </div>
          <div className="p-4 rounded-xl text-amber-600 bg-amber-50/50 border border-amber-100">
            <Mail size={24} />
          </div>
        </div>
      </div>

      {/* ── Charts & Visualizations Row ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sales Area Chart */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h3 className="font-bold text-slate-800 text-sm uppercase tracking-wide">Sales Trend (Last 7 Days)</h3>
              <p className="text-xs text-slate-400 mt-0.5">Calculated based on non-cancelled order value</p>
            </div>
            <button
              onClick={loadDashboardData}
              className="text-xs text-indigo-600 hover:text-indigo-800 font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <RefreshCw size={12} /> Sync Data
            </button>
          </div>

          {/* SVG Line / Area Graph */}
          <div className="relative">
            {/* Legend Tooltip */}
            <div className="absolute right-0 top-0 text-[10px] bg-slate-50 border border-slate-200 rounded-lg p-2 flex gap-4 text-slate-600">
              <div className="flex items-center gap-1">
                <div className="w-2.5 h-2.5 rounded-full bg-indigo-600" />
                <span>Sales (৳)</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2.5 h-2.5 rounded-full bg-indigo-300" />
                <span>Orders</span>
              </div>
            </div>

            <svg
              viewBox={`0 0 ${chartWidth} ${chartHeight}`}
              className="w-full h-auto overflow-visible"
              aria-label="Daily sales line graph"
            >
              <defs>
                {/* Area Gradient */}
                <linearGradient id="salesGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="rgb(99, 102, 241)" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="rgb(99, 102, 241)" stopOpacity="0.01" />
                </linearGradient>
              </defs>

              {/* Grid Lines */}
              {[0, 0.25, 0.5, 0.75, 1].map((pct, i) => {
                const y = paddingY + pct * (chartHeight - paddingY * 2);
                return (
                  <g key={i} className="opacity-40">
                    <line
                      x1={paddingX}
                      y1={y}
                      x2={chartWidth - paddingX}
                      y2={y}
                      stroke="#E2E8F0"
                      strokeWidth="1"
                      strokeDasharray="4 4"
                    />
                    <text
                      x={paddingX - 8}
                      y={y + 4}
                      textAnchor="end"
                      fill="#94A3B8"
                      className="text-[9px] font-semibold"
                    >
                      {Math.round(maxTrendSales - pct * maxTrendSales).toLocaleString()}
                    </text>
                  </g>
                );
              })}

              {/* Area Under Curve */}
              <path d={svgData.areaD} fill="url(#salesGrad)" />

              {/* Line Curve */}
              <path
                d={svgData.pathD}
                fill="none"
                stroke="rgb(99, 102, 241)"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Data points */}
              {svgData.points.map((p, idx) => {
                const isHovered = hoveredDataIndex === idx;
                return (
                  <g key={idx}>
                    <circle
                      cx={p.x}
                      cy={p.y}
                      r={isHovered ? 6 : 4}
                      fill={isHovered ? "rgb(79, 70, 229)" : "#FFFFFF"}
                      stroke="rgb(99, 102, 241)"
                      strokeWidth={isHovered ? 3 : 2.5}
                      className="cursor-pointer transition-all duration-150"
                      onMouseEnter={() => setHoveredDataIndex(idx)}
                      onMouseLeave={() => setHoveredDataIndex(null)}
                    />
                    {/* Date labels */}
                    <text
                      x={p.x}
                      y={chartHeight - 4}
                      textAnchor="middle"
                      fill="#94A3B8"
                      className="text-[9px] font-bold"
                    >
                      {p.label}
                    </text>
                  </g>
                );
              })}
            </svg>

            {/* Interactive Tooltip Card */}
            {hoveredDataIndex !== null && (
              <div
                className="absolute bg-slate-900 text-white rounded-xl shadow-xl p-3 border border-slate-800 text-xs w-44 z-10 pointer-events-none"
                style={{
                  left: `${(hoveredDataIndex / 6) * 80 + 10}%`,
                  bottom: "35%",
                  transform: "translateX(-50%)",
                }}
              >
                <p className="font-bold text-slate-400">{trendData.days[hoveredDataIndex]}</p>
                <div className="flex flex-col gap-1 mt-1.5 border-t border-slate-800 pt-1.5">
                  <p className="flex justify-between">
                    <span>Sales:</span>
                    <strong className="text-indigo-400">৳{trendData.sales[hoveredDataIndex].toLocaleString()}</strong>
                  </p>
                  <p className="flex justify-between text-[10px] text-slate-400">
                    <span>Orders:</span>
                    <strong>{trendData.orderCounts[hoveredDataIndex]} orders</strong>
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Order Status Distribution */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 col-span-1 flex flex-col justify-between space-y-4">
          <div>
            <h3 className="font-bold text-slate-800 text-sm uppercase tracking-wide">Orders Breakdown</h3>
            <p className="text-xs text-slate-400 mt-0.5">Distribution by operational stage</p>
          </div>

          <div className="space-y-4 flex-1 flex flex-col justify-center">
            {/* Dynamic Status Progress Bars */}
            {Object.entries(statusCounts).map(([status, count]) => {
              const percentage = totalOrdersCount > 0 ? (count / totalOrdersCount) * 100 : 0;
              const barColors: Record<string, string> = {
                Pending: "bg-amber-400",
                Packed: "bg-indigo-500",
                Shipped: "bg-blue-500",
                Received: "bg-emerald-500",
                Cancelled: "bg-red-500",
              };
              const textColors: Record<string, string> = {
                Pending: "text-amber-600",
                Packed: "text-indigo-600",
                Shipped: "text-blue-600",
                Received: "text-emerald-600",
                Cancelled: "text-red-600",
              };

              return (
                <div key={status} className="space-y-1">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-slate-600">{status}</span>
                    <span className={textColors[status]}>
                      {count} ({Math.round(percentage)}%)
                    </span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${barColors[status]}`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="text-[10px] text-slate-400 leading-relaxed pt-2 border-t border-slate-100 flex items-center justify-between">
            <span>Total orders tracked: {totalOrdersCount}</span>
            <span className="font-semibold text-slate-600">Live operational database</span>
          </div>
        </div>
      </div>

      {/* ── Recent Action Feeds Row ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Orders Log (Col Span 2) */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <h3 className="font-bold text-slate-800 text-sm uppercase tracking-wide">Recent Orders</h3>
            <span className="text-xs text-indigo-600 font-semibold">Latest 5 sales</span>
          </div>

          {orders.length === 0 ? (
            <div className="text-center py-8 text-slate-400 text-xs">No orders recorded in database.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="text-slate-400 font-bold uppercase border-b border-slate-100 pb-2">
                    <th className="pb-3">Order ID</th>
                    <th className="pb-3">Customer</th>
                    <th className="pb-3">Total</th>
                    <th className="pb-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50 text-slate-600">
                  {orders.slice(0, 5).map((order) => (
                    <tr key={order._id} className="hover:bg-slate-50/50">
                      <td className="py-3 font-semibold text-indigo-600">{order.orderId}</td>
                      <td className="py-3 font-medium text-slate-800">{order.customerInfo.fullName}</td>
                      <td className="py-3 font-bold text-slate-900">৳{order.total.toLocaleString()}</td>
                      <td className="py-3">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${getStatusClass(order.status)}`}>
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Recent Customer Inquiries (Col Span 1) */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 col-span-1 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <h3 className="font-bold text-slate-800 text-sm uppercase tracking-wide">Recent Inquiries</h3>
            <span className="text-xs text-indigo-600 font-semibold">Latest 3 messages</span>
          </div>

          {contacts.length === 0 ? (
            <div className="text-center py-12 text-slate-400 text-xs">No inquiries logged.</div>
          ) : (
            <ul className="space-y-4">
              {contacts.slice(0, 3).map((contact) => (
                <li key={contact._id} className="bg-slate-50/60 p-3 rounded-xl border border-slate-100 text-xs space-y-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-bold text-slate-800">{contact.name}</p>
                      <p className="text-[10px] text-slate-400 mt-0.5">{contact.email}</p>
                    </div>
                    {contact.status === "unread" && (
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 animate-ping" />
                    )}
                  </div>
                  <p className="text-slate-500 line-clamp-2 italic leading-relaxed">
                    "{contact.message}"
                  </p>
                  <p className="text-[10px] text-slate-400 text-right">
                    {new Date(contact.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}