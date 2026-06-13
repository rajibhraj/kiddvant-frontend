"use client";

import React from "react";
import { Eye, Edit } from "lucide-react";

interface Order {
  id: string;
  customer: string;
  date: string;
  total: number;
  status: "Delivered" | "Pending" | "Shipped";
}

export default function OrdersPage() {
  const orders: Order[] = [
    { id: "ORD-9843", customer: "Rahat Khan", date: "May 20, 2026", total: 340, status: "Delivered" },
    { id: "ORD-9844", customer: "Anika Tasnim", date: "May 19, 2026", total: 125, status: "Pending" },
    { id: "ORD-9845", customer: "Tamim Iqbal", date: "May 18, 2026", total: 890, status: "Shipped" },
  ];

  const statusStyles = {
    Delivered: "bg-green-100 text-green-800",
    Pending: "bg-amber-100 text-amber-800",
    Shipped: "bg-blue-100 text-blue-800",
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
      <div className="overflow-x-auto rounded-lg">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 text-slate-600 text-sm font-semibold border-b border-slate-100">
              <th className="p-4">Order ID</th>
              <th className="p-4">Customer</th>
              <th className="p-4">Date</th>
              <th className="p-4">Total</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="text-slate-700 text-sm divide-y divide-slate-50">
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-slate-50/50 transition-colors">
                <td className="p-4 font-medium text-indigo-600">{order.id}</td>
                <td className="p-4 font-medium text-slate-900">{order.customer}</td>
                <td className="p-4 text-slate-500">{order.date}</td>
                <td className="p-4">${order.total}</td>
                <td className="p-4">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${statusStyles[order.status]}`}>
                    {order.status}
                  </span>
                </td>
                <td className="p-4 text-right space-x-2">
                  <button className="text-slate-600 hover:text-slate-900 inline-flex p-1 rounded-md hover:bg-slate-100">
                    <Eye size={16} />
                  </button>
                  <button className="text-indigo-600 hover:text-indigo-900 inline-flex p-1 rounded-md hover:bg-slate-100">
                    <Edit size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}