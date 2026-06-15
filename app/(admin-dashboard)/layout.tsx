"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, ShoppingBag, ClipboardList, LogOut, Settings } from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);
  const [adminName, setAdminName] = useState("Admin");
  const [adminRole, setAdminRole] = useState<string | null>(null);
  
  // লগইন পেজে সাইডবার ও হেডার হাইড করার জন্য
  const isLoginPage = pathname === "/login";

  useEffect(() => {
    // Skip auth guard on login page
    if (isLoginPage) {
      setAuthorized(true);
      return;
    }

    const token = localStorage.getItem("adminToken");
    if (!token) {
      router.push("/login");
    } else {
      const userStr = localStorage.getItem("adminUser");
      let role = null;
      if (userStr) {
        try {
          const user = JSON.parse(userStr);
          if (user && user.name) {
            setAdminName(user.name);
          }
          if (user && user.role) {
            role = user.role;
            setAdminRole(user.role);
          }
        } catch (e) {
          console.error("Failed to parse user details:", e);
        }
      }

      // Role authorization check for control settings page
      if (pathname === "/admin/control-center-x7" && role !== "superSuperAdmin") {
        router.push("/dashboard");
      } else {
        setAuthorized(true);
      }
    }
  }, [pathname, isLoginPage, router]);

  const handleLogout = (e: React.MouseEvent) => {
    e.preventDefault();
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminUser");
    router.push("/login");
  };

  if (!authorized) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-gray-50">
        <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (isLoginPage) {
    return <div className="admin-layout bg-gray-50 min-h-screen">{children}</div>;
  }

  const menuItems = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Products", href: "/products-management", icon: ShoppingBag },
    { name: "Orders", href: "/orders-management", icon: ClipboardList },
  ];

  if (adminRole === "superSuperAdmin") {
    menuItems.push({
      name: "Site Control",
      href: "/admin/control-center-x7",
      icon: Settings,
    });
  }

  return (
    <div className="admin-layout flex h-screen bg-gray-100 antialiased">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col justify-between hidden md:flex">
        <div className="p-5">
          <h2 className="text-2xl font-bold tracking-wider text-indigo-400">ADMIN PANEL</h2>
          <nav className="mt-8 space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive ? "bg-indigo-600 text-white" : "text-slate-400 hover:bg-slate-800 hover:text-white"
                  }`}
                >
                  <Icon size={20} />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>
        <div className="p-5 border-t border-slate-800">
          <button
            onClick={handleLogout}
            className="flex w-full items-center space-x-3 text-slate-400 hover:text-red-400 py-2 text-left cursor-pointer focus:outline-none transition-colors"
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <header className="h-16 bg-white shadow-sm flex items-center justify-between px-6">
          <h1 className="text-xl font-semibold text-slate-800">
            {menuItems.find((m) => m.href === pathname)?.name || "Dashboard"}
          </h1>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-slate-600 font-medium">Welcome, {adminName}</span>
            <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold uppercase">
              {adminName.charAt(0)}
            </div>
          </div>
        </header>

        {/* Dynamic Content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}