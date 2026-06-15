"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { fetchSiteConfig } from "@/lib/api";

interface SiteConfig {
  active: boolean;
  status: string;
  alertTitle: string;
  alertMessage: string;
  maintenanceDescription: string;
  ctaText?: string;
  [key: string]: any;
}

interface SiteConfigContextType {
  config: SiteConfig | null;
  loading: boolean;
  refreshConfig: () => Promise<void>;
}

const SiteConfigContext = createContext<SiteConfigContextType | undefined>(undefined);

export function SiteConfigProvider({ children }: { children: React.ReactNode }) {
  const [config, setConfig] = useState<SiteConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState<string | null>(null);
  const pathname = usePathname();

  const loadConfig = async () => {
    try {
      const res = await fetchSiteConfig();
      if (res && res.success && res.data) {
        setConfig(res.data);
      }
    } catch (error) {
      console.error("Failed to load site config:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadConfig();

    // Check user role from localStorage
    const checkRole = () => {
      const userStr = localStorage.getItem("adminUser");
      if (userStr) {
        try {
          const user = JSON.parse(userStr);
          setUserRole(user?.role || null);
        } catch (e) {
          setUserRole(null);
        }
      } else {
        setUserRole(null);
      }
    };

    checkRole();

    // Listen to storage events to dynamically detect login/logout or role changes
    window.addEventListener("storage", checkRole);
    return () => {
      window.removeEventListener("storage", checkRole);
    };
  }, []);

  const refreshConfig = async () => {
    setLoading(true);
    await loadConfig();
  };

  // Re-check storage periodically in case localStorage was mutated directly in-page without storage event firing
  useEffect(() => {
    const handleInterval = () => {
      const userStr = localStorage.getItem("adminUser");
      if (userStr) {
        try {
          const user = JSON.parse(userStr);
          if (user?.role !== userRole) {
            setUserRole(user?.role || null);
          }
        } catch (e) {
          if (userRole !== null) setUserRole(null);
        }
      } else {
        if (userRole !== null) setUserRole(null);
      }
    };

    const interval = setInterval(handleInterval, 1000);
    return () => clearInterval(interval);
  }, [userRole]);

  if (loading) {
    return (
      <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-50 font-sans">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-slate-800">Initializing Application...</h3>
          <p className="text-sm text-slate-500">Checking system configuration</p>
        </div>
      </div>
    );
  }

  // If status is not "running" and user is NOT a superSuperAdmin and route is not /login, render the Global Blocking UI
  const isBlocked = config && config.status !== "running" && userRole !== "superSuperAdmin" && pathname !== "/login";

  if (isBlocked && config) {
    return (
      <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-slate-900 text-white p-6 font-sans">
        <div className="max-w-xl w-full bg-slate-800 rounded-2xl shadow-2xl border border-slate-700 p-8 text-center">
          {/* Status Badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-6 bg-red-500/10 text-red-400 border border-red-500/20">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            Status: {config.status}
          </div>

          <h1 className="text-3xl font-extrabold text-white tracking-tight mb-4">
            {config.alertTitle || "System Maintenance"}
          </h1>
          
          <p className="text-lg text-slate-300 mb-6 font-medium leading-relaxed">
            {config.alertMessage || "We are currently updating our website. Please check back later."}
          </p>

          <div className="bg-slate-900/50 rounded-xl p-5 border border-slate-700/50 text-left text-slate-400 text-sm mb-8 whitespace-pre-wrap leading-relaxed">
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 font-mono">Details</h4>
            {config.maintenanceDescription || "The site is temporarily offline for scheduled upgrades."}
          </div>

          {config.ctaText && (
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white text-sm font-semibold rounded-xl transition-all shadow-lg shadow-indigo-600/20 hover:shadow-indigo-600/30"
            >
              {config.ctaText}
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <SiteConfigContext.Provider value={{ config, loading, refreshConfig }}>
      {children}
    </SiteConfigContext.Provider>
  );
}

export function useSiteConfig() {
  const context = useContext(SiteConfigContext);
  if (context === undefined) {
    throw new Error("useSiteConfig must be used within a SiteConfigProvider");
  }
  return context;
}
