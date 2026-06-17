"use client";

import React, { useState, useEffect } from "react";
import {
  Mail,
  Search,
  Trash2,
  CheckCircle2,
  Calendar,
  User,
  Phone,
  Check,
  RefreshCw,
  X,
  Eye,
  Inbox,
  MessageSquare,
  AlertCircle
} from "lucide-react";
import {
  fetchContacts,
  fetchSubscribers,
  updateContactStatus,
  deleteContact,
  deleteSubscriber
} from "@/lib/api";

interface ContactMessage {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  topic: "order" | "product" | "partnership" | "other";
  message: string;
  status: "unread" | "read" | "replied" | "archived";
  createdAt: string;
}

interface Subscriber {
  _id: string;
  email: string;
  status: "active" | "unsubscribed";
  createdAt: string;
}

export default function ContactsManagementPage() {
  const [activeTab, setActiveTab] = useState<"messages" | "subscribers">("messages");
  const [contacts, setContacts] = useState<ContactMessage[]>([]);
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);
  
  // Search & Filter
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [topicFilter, setTopicFilter] = useState("All");

  const getAuthToken = () => {
    return localStorage.getItem("adminToken") || "";
  };

  const loadData = async () => {
    setLoading(true);
    setError(null);
    const token = getAuthToken();
    if (!token) {
      setError("Admin authentication token not found. Please log in again.");
      setLoading(false);
      return;
    }

    try {
      if (activeTab === "messages") {
        const res = await fetchContacts(token);
        if (res && res.success && Array.isArray(res.data)) {
          setContacts(res.data);
        } else {
          throw new Error("Invalid API response format");
        }
      } else {
        const res = await fetchSubscribers(token);
        if (res && res.success && Array.isArray(res.data)) {
          setSubscribers(res.data);
        } else {
          throw new Error("Invalid API response format");
        }
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to load data from server");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [activeTab]);

  const handleStatusUpdate = async (id: string, newStatus: string) => {
    const token = getAuthToken();
    try {
      const res = await updateContactStatus(id, newStatus, token);
      if (res && res.success && res.data) {
        setContacts((prev) =>
          prev.map((msg) => (msg._id === id ? { ...msg, status: res.data.status } : msg))
        );
        if (selectedMessage && selectedMessage._id === id) {
          setSelectedMessage((prev) => (prev ? { ...prev, status: res.data.status } : null));
        }
      }
    } catch (err: any) {
      alert(err.message || "Failed to update status");
    }
  };

  const handleContactDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this contact message?")) return;
    const token = getAuthToken();
    try {
      const res = await deleteContact(id, token);
      if (res && res.success) {
        setContacts((prev) => prev.filter((msg) => msg._id !== id));
        if (selectedMessage && selectedMessage._id === id) {
          setSelectedMessage(null);
        }
      }
    } catch (err: any) {
      alert(err.message || "Failed to delete message");
    }
  };

  const handleSubscriberDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to remove this subscriber?")) return;
    const token = getAuthToken();
    try {
      const res = await deleteSubscriber(id, token);
      if (res && res.success) {
        setSubscribers((prev) => prev.filter((sub) => sub._id !== id));
      }
    } catch (err: any) {
      alert(err.message || "Failed to delete subscriber");
    }
  };

  const getTopicLabel = (topic: string) => {
    switch (topic) {
      case "order":
        return "Order or shipping";
      case "product":
        return "Product question";
      case "partnership":
        return "Partnership/Wholesale";
      default:
        return "Something else";
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "unread":
        return "bg-blue-50 text-blue-700 border border-blue-200/60";
      case "read":
        return "bg-slate-50 text-slate-700 border border-slate-200/60";
      case "replied":
        return "bg-emerald-50 text-emerald-700 border border-emerald-200/60";
      case "archived":
        return "bg-amber-50 text-amber-700 border border-amber-200/60";
      default:
        return "bg-slate-50 text-slate-700 border border-slate-200/60";
    }
  };

  const filteredContacts = contacts.filter((msg) => {
    const matchesSearch =
      msg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      msg.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      msg.message.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === "All" || msg.status === statusFilter;
    const matchesTopic = topicFilter === "All" || msg.topic === topicFilter;

    return matchesSearch && matchesStatus && matchesTopic;
  });

  const filteredSubscribers = subscribers.filter((sub) => {
    return sub.email.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className="space-y-6">
      {/* ── Tabs Navigation ── */}
      <div className="flex border-b border-slate-200 gap-6">
        <button
          onClick={() => {
            setActiveTab("messages");
            setSearchTerm("");
          }}
          className={`pb-4 text-sm font-bold transition-all relative flex items-center gap-2 cursor-pointer ${
            activeTab === "messages"
              ? "text-indigo-600 font-extrabold"
              : "text-slate-500 hover:text-slate-800"
          }`}
        >
          <MessageSquare size={18} />
          Contact Messages
          {activeTab === "messages" && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600 rounded-full" />
          )}
        </button>
        <button
          onClick={() => {
            setActiveTab("subscribers");
            setSearchTerm("");
          }}
          className={`pb-4 text-sm font-bold transition-all relative flex items-center gap-2 cursor-pointer ${
            activeTab === "subscribers"
              ? "text-indigo-600 font-extrabold"
              : "text-slate-500 hover:text-slate-800"
          }`}
        >
          <Mail size={18} />
          Newsletter Subscribers
          {activeTab === "subscribers" && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600 rounded-full" />
          )}
        </button>
      </div>

      {/* ── Search & Filter Controls ── */}
      <div className="flex flex-col md:flex-row gap-4 bg-white p-4 rounded-xl shadow-sm border border-slate-100 items-center justify-between">
        <div className="relative w-full md:max-w-xs">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-slate-400">
            <Search size={18} />
          </span>
          <input
            type="text"
            placeholder={
              activeTab === "messages"
                ? "Search messages, names, emails..."
                : "Search subscriber email..."
            }
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-400 bg-slate-50/50 hover:bg-white focus:bg-white transition-all"
          />
        </div>

        <div className="flex flex-wrap w-full md:w-auto items-center gap-3 justify-end">
          {activeTab === "messages" && (
            <>
              {/* Status Filter */}
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-100 bg-white cursor-pointer hover:border-slate-300 transition-colors"
              >
                <option value="All">All Statuses</option>
                <option value="unread">Unread</option>
                <option value="read">Read</option>
                <option value="replied">Replied</option>
                <option value="archived">Archived</option>
              </select>

              {/* Topic Filter */}
              <select
                value={topicFilter}
                onChange={(e) => setTopicFilter(e.target.value)}
                className="px-3 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-100 bg-white cursor-pointer hover:border-slate-300 transition-colors"
              >
                <option value="All">All Topics</option>
                <option value="order">Order/Shipping</option>
                <option value="product">Product Question</option>
                <option value="partnership">Partnership</option>
                <option value="other">Other</option>
              </select>
            </>
          )}

          <button
            onClick={loadData}
            disabled={loading}
            className="p-2.5 rounded-lg border border-slate-200 text-slate-600 hover:text-slate-900 bg-white hover:bg-slate-50 disabled:opacity-50 transition-colors flex items-center justify-center cursor-pointer"
            title="Refresh"
          >
            <RefreshCw size={18} className={loading ? "animate-spin" : ""} />
          </button>
        </div>
      </div>

      {/* ── Content View ── */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 bg-white rounded-xl shadow-sm border border-slate-100">
          <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mb-4" />
          <p className="text-sm text-slate-500 font-medium">Loading entries...</p>
        </div>
      ) : error ? (
        <div className="bg-white p-8 text-center rounded-xl shadow-sm border border-slate-100 space-y-3">
          <p className="text-red-500 font-medium flex items-center justify-center gap-2">
            <AlertCircle size={20} /> Error: {error}
          </p>
          <button
            onClick={loadData}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm hover:bg-indigo-700 transition-colors cursor-pointer"
          >
            Try Again
          </button>
        </div>
      ) : activeTab === "messages" ? (
        // CONTACT MESSAGES TABLE
        filteredContacts.length === 0 ? (
          <div className="bg-white py-16 text-center rounded-xl shadow-sm border border-slate-100 text-slate-400">
            <Inbox size={48} className="mx-auto text-slate-300 mb-3" />
            <p className="text-sm font-medium">No contact messages found.</p>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 text-slate-500 text-xs font-bold uppercase tracking-wider border-b border-slate-100">
                    <th className="p-4">Name & Email</th>
                    <th className="p-4">Topic</th>
                    <th className="p-4">Message Snippet</th>
                    <th className="p-4">Date</th>
                    <th className="p-4">Status</th>
                    <th className="p-4 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="text-slate-700 text-sm divide-y divide-slate-100">
                  {filteredContacts.map((msg) => (
                    <tr
                      key={msg._id}
                      className={`hover:bg-slate-50/40 transition-colors ${
                        msg.status === "unread" ? "bg-indigo-50/20 font-semibold" : ""
                      }`}
                    >
                      <td className="p-4">
                        <p className="text-slate-900 leading-none">{msg.name}</p>
                        <p className="text-xs text-slate-500 mt-1">{msg.email}</p>
                        {msg.phone && <p className="text-[11px] text-slate-400 mt-0.5">{msg.phone}</p>}
                      </td>
                      <td className="p-4">
                        <span className="text-xs px-2.5 py-0.5 bg-slate-100 rounded-md font-semibold text-slate-600 border border-slate-200">
                          {getTopicLabel(msg.topic)}
                        </span>
                      </td>
                      <td className="p-4 max-w-[260px] truncate text-slate-500">
                        {msg.message}
                      </td>
                      <td className="p-4 text-slate-500 text-xs">
                        {new Date(msg.createdAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit"
                        })}
                      </td>
                      <td className="p-4">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${getStatusBadge(msg.status)}`}>
                          {msg.status}
                        </span>
                      </td>
                      <td className="p-4 text-center">
                        <div className="flex items-center justify-center gap-2.5">
                          <button
                            onClick={() => {
                              setSelectedMessage(msg);
                              if (msg.status === "unread") {
                                handleStatusUpdate(msg._id, "read");
                              }
                            }}
                            className="text-slate-500 hover:text-slate-800 p-1.5 rounded-md hover:bg-slate-100 transition-colors cursor-pointer"
                            title="Read message"
                          >
                            <Eye size={18} />
                          </button>
                          
                          <select
                            value={msg.status}
                            onChange={(e) => handleStatusUpdate(msg._id, e.target.value)}
                            className="text-xs bg-slate-50 border border-slate-200 rounded-lg px-2 py-1.5 focus:outline-none cursor-pointer"
                          >
                            <option value="unread">Unread</option>
                            <option value="read">Read</option>
                            <option value="replied">Replied</option>
                            <option value="archived">Archived</option>
                          </select>

                          <button
                            onClick={() => handleContactDelete(msg._id)}
                            className="text-slate-400 hover:text-red-600 p-1.5 rounded-md hover:bg-red-50 transition-colors cursor-pointer"
                            title="Delete entry"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )
      ) : (
        // NEWSLETTER SUBSCRIBERS TABLE
        filteredSubscribers.length === 0 ? (
          <div className="bg-white py-16 text-center rounded-xl shadow-sm border border-slate-100 text-slate-400">
            <Mail size={48} className="mx-auto text-slate-300 mb-3" />
            <p className="text-sm font-medium">No newsletter subscribers found.</p>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden max-w-2xl mx-auto">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 text-slate-500 text-xs font-bold uppercase tracking-wider border-b border-slate-100">
                    <th className="p-4">Email</th>
                    <th className="p-4">Subscribed Date</th>
                    <th className="p-4 text-center">Status</th>
                    <th className="p-4 text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="text-slate-700 text-sm divide-y divide-slate-100">
                  {filteredSubscribers.map((sub) => (
                    <tr key={sub._id} className="hover:bg-slate-50/40 transition-colors">
                      <td className="p-4 font-medium text-slate-900">
                        {sub.email}
                      </td>
                      <td className="p-4 text-slate-500 text-xs">
                        {new Date(sub.createdAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit"
                        })}
                      </td>
                      <td className="p-4 text-center">
                        <span className="px-2 py-0.5 bg-emerald-50 border border-emerald-200/60 rounded text-emerald-700 text-xs font-bold uppercase">
                          {sub.status || "active"}
                        </span>
                      </td>
                      <td className="p-4 text-center">
                        <button
                          onClick={() => handleSubscriberDelete(sub._id)}
                          className="text-slate-400 hover:text-red-600 p-1.5 rounded-md hover:bg-red-50 transition-colors cursor-pointer"
                          title="Remove subscriber"
                        >
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )
      )}

      {/* ── Contact Details Modal ── */}
      {selectedMessage && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-[2px] flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-xl rounded-2xl shadow-2xl overflow-hidden border border-slate-100 flex flex-col max-h-[90vh] animate-in fade-in zoom-in-95 duration-150">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/50">
              <div>
                <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <Mail size={18} className="text-indigo-600" />
                  Message from {selectedMessage.name}
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Topic: {getTopicLabel(selectedMessage.topic)}
                </p>
              </div>
              <button
                onClick={() => setSelectedMessage(null)}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:bg-red-50 hover:text-red-500 transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {/* Body */}
            <div className="p-6 space-y-5 flex-1 overflow-y-auto">
              <div className="bg-slate-50 rounded-xl p-4 border border-slate-100 space-y-3">
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
                  <User size={14} /> Contact Details
                </h3>
                <div className="text-sm space-y-1.5">
                  <p className="text-slate-800"><span className="text-slate-500">Name:</span> {selectedMessage.name}</p>
                  <p className="text-slate-800"><span className="text-slate-500">Email:</span> {selectedMessage.email}</p>
                  {selectedMessage.phone && (
                    <p className="text-slate-800"><span className="text-slate-500">Phone:</span> {selectedMessage.phone}</p>
                  )}
                  <p className="text-slate-800">
                    <span className="text-slate-500">Date Received:</span>{" "}
                    {new Date(selectedMessage.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Message Content
                </h3>
                <div className="bg-slate-50 rounded-xl p-4 border border-slate-100 text-sm text-slate-700 whitespace-pre-wrap leading-relaxed">
                  {selectedMessage.message}
                </div>
              </div>

              {/* Status Controls */}
              <div className="flex items-center justify-between border-t border-slate-100 pt-4">
                <div className="flex items-center gap-2 text-xs">
                  <span className="text-slate-500">Current Status:</span>
                  <span className={`px-2.5 py-0.5 rounded-full font-bold ${getStatusBadge(selectedMessage.status)}`}>
                    {selectedMessage.status}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <label htmlFor="modal-status-select" className="text-xs text-slate-500">Change:</label>
                  <select
                    id="modal-status-select"
                    value={selectedMessage.status}
                    onChange={(e) => handleStatusUpdate(selectedMessage._id, e.target.value)}
                    className="text-xs bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 focus:outline-none cursor-pointer"
                  >
                    <option value="unread">Unread</option>
                    <option value="read">Read</option>
                    <option value="replied">Replied</option>
                    <option value="archived">Archived</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex justify-between items-center px-6 py-4 border-t border-slate-100 bg-slate-50/50">
              <button
                onClick={() => handleContactDelete(selectedMessage._id)}
                className="px-4 py-2 border border-red-200 bg-red-50/50 text-red-600 hover:bg-red-50 text-xs font-bold rounded-lg transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <Trash2 size={14} /> Delete
              </button>
              
              <button
                onClick={() => setSelectedMessage(null)}
                className="px-5 py-2 bg-slate-800 hover:bg-slate-900 text-white font-medium text-xs rounded-lg transition-colors cursor-pointer shadow-sm"
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
