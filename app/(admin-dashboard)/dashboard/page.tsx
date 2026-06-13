import React from "react";
import { DollarSign, ShoppingBag, Users, TrendingUp } from "lucide-react";

export default function DashboardPage() {
  const stats = [
    { title: "Total Sales", value: "$24,500", icon: DollarSign, color: "text-green-600 bg-green-100" },
    { title: "Total Products", value: "342", icon: ShoppingBag, color: "text-blue-600 bg-blue-100" },
    { title: "Total Orders", value: "1,240", icon: Users, color: "text-purple-600 bg-purple-100" },
    { title: "Growth", value: "+12.5%", icon: TrendingUp, color: "text-amber-600 bg-amber-100" },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500 font-medium">{stat.title}</p>
                <h3 className="text-2xl font-bold text-slate-800 mt-1">{stat.value}</h3>
              </div>
              <div className={`p-3 rounded-lg ${stat.color}`}>
                <Icon size={24} />
              </div>
            </div>
          );
        })}
      </div>
      
      {/* একটা ডামি চার্ট বা অ্যাক্টিভিটি এরিয়া */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 h-64 flex items-center justify-center text-slate-400">
        Recent Activity and Sales Graph Will Go Here
      </div>
    </div>
  );
}