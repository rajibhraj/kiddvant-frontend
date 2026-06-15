"use client";

import React, { useState, useEffect } from "react";
import { Eye, Search, X, User, Phone, MapPin, CreditCard, Calendar, RefreshCw, FileText } from "lucide-react";
import { fetchOrders, updateOrderStatus } from "@/lib/api";

interface OrderItem {
  product?: string;
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

interface Order {
  _id: string;
  orderId: string;
  customerInfo: {
    fullName: string;
    phone: string;
    email?: string;
  };
  shippingAddress: {
    address: string;
    city: string;
    postalCode?: string;
  };
  items: OrderItem[];
  paymentMethod: "cod" | "bkash";
  paymentStatus: "Pending" | "Paid" | "Failed";
  shippingCost: number;
  subtotal: number;
  total: number;
  status: "Pending" | "Packed" | "Shipped" | "Received" | "Cancelled";
  notes?: string;
  createdAt: string;
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  
  // Search & Filter state
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const loadOrders = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await fetchOrders();
      if (result.success && Array.isArray(result.data)) {
        setOrders(result.data);
      } else {
        throw new Error("Invalid API response format");
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const handleStatusChange = async (orderId: string, newStatus: string) => {
    setUpdatingId(orderId);
    try {
      const result = await updateOrderStatus(orderId, newStatus);
      if (result.success && result.data) {
        // Update local state
        setOrders((prev) =>
          prev.map((ord) => (ord.orderId === orderId ? { ...ord, status: result.data.status } : ord))
        );
        // If this order is open in details modal, update details view too
        if (selectedOrder && selectedOrder.orderId === orderId) {
          setSelectedOrder((prev) => prev ? { ...prev, status: result.data.status } : null);
        }
      }
    } catch (err: any) {
      alert(err.message || "Failed to update status");
    } finally {
      setUpdatingId(null);
    }
  };

  const handlePaymentStatusChange = async (orderId: string, newPaymentStatus: string) => {
    setUpdatingId(orderId);
    try {
      // Find current order to get its status
      const ord = orders.find(o => o.orderId === orderId);
      if (!ord) return;
      const result = await updateOrderStatus(orderId, ord.status, newPaymentStatus);
      if (result.success && result.data) {
        setOrders((prev) =>
          prev.map((o) => (o.orderId === orderId ? { ...o, paymentStatus: result.data.paymentStatus } : o))
        );
        if (selectedOrder && selectedOrder.orderId === orderId) {
          setSelectedOrder((prev) => prev ? { ...prev, paymentStatus: result.data.paymentStatus } : null);
        }
      }
    } catch (err: any) {
      alert(err.message || "Failed to update payment status");
    } finally {
      setUpdatingId(null);
    }
  };

  // Status badge style helper
  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "Pending":
        return "bg-amber-50 text-amber-700 border border-amber-200/60";
      case "Packed":
        return "bg-indigo-50 text-indigo-700 border border-indigo-200/60";
      case "Shipped":
        return "bg-blue-50 text-blue-700 border border-blue-200/60";
      case "Received":
        return "bg-emerald-50 text-emerald-700 border border-emerald-200/60";
      case "Cancelled":
        return "bg-red-50 text-red-700 border border-red-200/60";
      default:
        return "bg-slate-50 text-slate-700 border border-slate-200/60";
    }
  };

  // Filter orders based on filters
  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerInfo.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerInfo.phone.includes(searchTerm);
      
    const matchesStatus = statusFilter === "All" || order.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* ── Filter Bar ── */}
      <div className="flex flex-col sm:flex-row gap-4 bg-white p-4 rounded-xl shadow-sm border border-slate-100 items-center justify-between">
        <div className="relative w-full sm:max-w-xs">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-slate-400">
            <Search size={18} />
          </span>
          <input
            type="text"
            placeholder="Search by ID, customer name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-400 bg-slate-50/50 hover:bg-white focus:bg-white transition-all"
          />
        </div>

        <div className="flex w-full sm:w-auto items-center gap-3 justify-end">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-100 bg-white cursor-pointer hover:border-slate-300 transition-colors"
          >
            <option value="All">All Statuses</option>
            <option value="Pending">Pending</option>
            <option value="Packed">Packed</option>
            <option value="Shipped">Shipped</option>
            <option value="Received">Received</option>
            <option value="Cancelled">Cancelled</option>
          </select>

          <button
            onClick={loadOrders}
            disabled={loading}
            className="p-2.5 rounded-lg border border-slate-200 text-slate-600 hover:text-slate-900 bg-white hover:bg-slate-50 disabled:opacity-50 transition-colors flex items-center justify-center"
            title="Refresh list"
          >
            <RefreshCw size={18} className={loading ? "animate-spin" : ""} />
          </button>
        </div>
      </div>

      {/* ── Orders Grid / Table ── */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 bg-white rounded-xl shadow-sm border border-slate-100">
          <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mb-4" />
          <p className="text-sm text-slate-500 font-medium">Loading orders from database...</p>
        </div>
      ) : error ? (
        <div className="bg-white p-8 text-center rounded-xl shadow-sm border border-slate-100 space-y-3">
          <p className="text-red-500 font-medium">⚠️ Error: {error}</p>
          <button
            onClick={loadOrders}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm hover:bg-indigo-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      ) : filteredOrders.length === 0 ? (
        <div className="bg-white py-16 text-center rounded-xl shadow-sm border border-slate-100">
          <p className="text-slate-400 text-sm font-medium">No orders found matching the filter criteria.</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 text-slate-500 text-xs font-bold uppercase tracking-wider border-b border-slate-100">
                  <th className="p-4">Order ID</th>
                  <th className="p-4">Customer Info</th>
                  <th className="p-4">Date</th>
                  <th className="p-4">Total</th>
                  <th className="p-4">Payment</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="text-slate-700 text-sm divide-y divide-slate-100">
                {filteredOrders.map((order) => (
                  <tr key={order._id} className="hover:bg-slate-50/40 transition-colors">
                    {/* Order ID */}
                    <td className="p-4 font-semibold text-indigo-600">
                      <button
                        onClick={() => setSelectedOrder(order)}
                        className="hover:underline text-left cursor-pointer focus:outline-none"
                      >
                        {order.orderId}
                      </button>
                    </td>

                    {/* Customer Info */}
                    <td className="p-4">
                      <p className="font-semibold text-slate-900 leading-none">{order.customerInfo.fullName}</p>
                      <p className="text-xs text-slate-500 mt-1">{order.customerInfo.phone}</p>
                    </td>

                    {/* Date */}
                    <td className="p-4 text-slate-500">
                      {new Date(order.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </td>

                    {/* Total */}
                    <td className="p-4 font-bold text-slate-900">৳{order.total.toLocaleString()}</td>

                    {/* Payment */}
                    <td className="p-4">
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs px-2 py-0.5 bg-slate-100 rounded text-slate-600 font-bold uppercase">
                          {order.paymentMethod === "bkash" ? "bKash" : "COD"}
                        </span>
                        <select
                          value={order.paymentStatus}
                          onChange={(e) => handlePaymentStatusChange(order.orderId, e.target.value)}
                          disabled={updatingId === order.orderId}
                          className={`text-[11px] font-semibold rounded px-1.5 py-0.5 cursor-pointer outline-none border transition-colors ${
                            order.paymentStatus === "Paid"
                              ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                              : order.paymentStatus === "Failed"
                              ? "bg-red-50 text-red-700 border-red-200"
                              : "bg-amber-50 text-amber-700 border-amber-200"
                          }`}
                        >
                          <option value="Pending">Pending</option>
                          <option value="Paid">Paid</option>
                          <option value="Failed">Failed</option>
                        </select>
                      </div>
                    </td>

                    {/* Order Status */}
                    <td className="p-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${getStatusBadgeClass(order.status)}`}>
                        {order.status}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="p-4 text-center">
                      <div className="flex items-center justify-center gap-3">
                        <button
                          onClick={() => setSelectedOrder(order)}
                          className="text-slate-500 hover:text-slate-800 p-1.5 rounded-md hover:bg-slate-100 transition-colors"
                          title="View Details"
                        >
                          <Eye size={18} />
                        </button>
                        
                        <select
                          value={order.status}
                          disabled={updatingId === order.orderId}
                          onChange={(e) => handleStatusChange(order.orderId, e.target.value)}
                          className="text-xs bg-slate-50 border border-slate-200 rounded-lg px-2 py-1.5 focus:outline-none focus:ring-1 focus:ring-indigo-300 cursor-pointer"
                        >
                          <option value="Pending">Pending</option>
                          <option value="Packed">Packed</option>
                          <option value="Shipped">Shipped</option>
                          <option value="Received">Received</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ── Order Details Modal ── */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-[2px] flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-3xl rounded-2xl shadow-2xl overflow-hidden border border-slate-100 flex flex-col max-h-[90vh]">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/50">
              <div>
                <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <FileText size={18} className="text-indigo-600" />
                  Order Details: {selectedOrder.orderId}
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Placed on {new Date(selectedOrder.createdAt).toLocaleString()}
                </p>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:bg-red-50 hover:text-red-500 transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {/* Customer, Shipping, and Payment Details Row */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Customer Info */}
                <div className="bg-slate-50 rounded-xl p-4 space-y-3 border border-slate-100">
                  <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
                    <User size={14} className="text-slate-500" /> Customer
                  </h3>
                  <div className="text-sm">
                    <p className="font-semibold text-slate-800">{selectedOrder.customerInfo.fullName}</p>
                    <p className="text-xs text-slate-500 mt-1 flex items-center gap-1.5">
                      <Phone size={12} /> {selectedOrder.customerInfo.phone}
                    </p>
                    {selectedOrder.customerInfo.email && (
                      <p className="text-xs text-slate-500 mt-1 truncate">
                        ✉️ {selectedOrder.customerInfo.email}
                      </p>
                    )}
                  </div>
                </div>

                {/* Shipping Address */}
                <div className="bg-slate-50 rounded-xl p-4 space-y-3 border border-slate-100">
                  <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
                    <MapPin size={14} className="text-slate-500" /> Shipping
                  </h3>
                  <div className="text-sm">
                    <p className="text-slate-800 line-clamp-2 leading-relaxed">{selectedOrder.shippingAddress.address}</p>
                    <p className="font-semibold text-slate-900 mt-1">{selectedOrder.shippingAddress.city}</p>
                    {selectedOrder.shippingAddress.postalCode && (
                      <p className="text-xs text-slate-500 mt-0.5">Zip: {selectedOrder.shippingAddress.postalCode}</p>
                    )}
                  </div>
                </div>

                {/* Payment & Status */}
                <div className="bg-slate-50 rounded-xl p-4 space-y-3 border border-slate-100">
                  <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
                    <CreditCard size={14} className="text-slate-500" /> Payment & Status
                  </h3>
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-500">Method</span>
                      <span className="font-bold uppercase text-slate-800">
                        {selectedOrder.paymentMethod === "bkash" ? "bKash" : "Cash on Delivery"}
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-500">Payment Status</span>
                      <select
                        value={selectedOrder.paymentStatus}
                        onChange={(e) => handlePaymentStatusChange(selectedOrder.orderId, e.target.value)}
                        disabled={updatingId === selectedOrder.orderId}
                        className={`font-semibold rounded px-1.5 py-0.5 cursor-pointer outline-none border text-[11px] ${
                          selectedOrder.paymentStatus === "Paid"
                            ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                            : selectedOrder.paymentStatus === "Failed"
                            ? "bg-red-50 text-red-700 border-red-200"
                            : "bg-amber-50 text-amber-700 border-amber-200"
                        }`}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Paid">Paid</option>
                        <option value="Failed">Failed</option>
                      </select>
                    </div>

                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-500">Order Status</span>
                      <select
                        value={selectedOrder.status}
                        onChange={(e) => handleStatusChange(selectedOrder.orderId, e.target.value)}
                        disabled={updatingId === selectedOrder.orderId}
                        className="font-bold text-indigo-700 bg-white border border-indigo-200 rounded px-2 py-0.5 text-[11px] cursor-pointer"
                      >
                        <option value="Pending">Pending</option>
                        <option value="Packed">Packed</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Received">Received</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* Order Notes */}
              {selectedOrder.notes && (
                <div className="bg-amber-50/50 rounded-xl p-4 border border-amber-100">
                  <h4 className="text-xs font-bold text-amber-800 uppercase tracking-wide mb-1">Order Notes:</h4>
                  <p className="text-sm text-amber-900 font-medium">{selectedOrder.notes}</p>
                </div>
              )}

              {/* Products Table */}
              <div className="border border-slate-100 rounded-xl overflow-hidden">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 text-slate-500 text-xs font-bold uppercase tracking-wider border-b border-slate-100">
                      <th className="p-3">Product Name</th>
                      <th className="p-3 text-center">SKU/ID</th>
                      <th className="p-3 text-right">Price</th>
                      <th className="p-3 text-center">Qty</th>
                      <th className="p-3 text-right">Total</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm text-slate-700 divide-y divide-slate-100">
                    {selectedOrder.items.map((item, i) => (
                      <tr key={i}>
                        <td className="p-3 font-semibold text-slate-800">
                          <p className="line-clamp-1 max-w-[280px]">{item.name}</p>
                        </td>
                        <td className="p-3 text-center text-xs font-mono text-slate-500">{item.productId}</td>
                        <td className="p-3 text-right font-medium text-slate-600">৳{item.price.toLocaleString()}</td>
                        <td className="p-3 text-center font-bold text-slate-800">{item.quantity}</td>
                        <td className="p-3 text-right font-bold text-slate-900">৳{(item.price * item.quantity).toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Totals Summary */}
              <div className="flex justify-end">
                <div className="w-64 space-y-2.5 text-sm">
                  <div className="flex justify-between text-slate-500">
                    <span>Subtotal</span>
                    <span className="font-semibold text-slate-800">৳{selectedOrder.subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-slate-500">
                    <span>Shipping Cost</span>
                    <span className="font-semibold text-slate-800">
                      {selectedOrder.shippingCost === 0 ? "Free!" : `৳${selectedOrder.shippingCost.toLocaleString()}`}
                    </span>
                  </div>
                  <div className="flex justify-between font-bold text-slate-900 border-t border-slate-100 pt-2.5 text-base">
                    <span>Total Amount</span>
                    <span className="text-indigo-600">৳{selectedOrder.total.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex justify-end gap-3 px-6 py-4 border-t border-slate-100 bg-slate-50/50">
              <button
                onClick={() => setSelectedOrder(null)}
                className="px-5 py-2 rounded-lg bg-slate-800 hover:bg-slate-900 text-white font-medium text-sm transition-colors shadow-sm"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}