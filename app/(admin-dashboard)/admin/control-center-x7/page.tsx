"use client";

import React, { useState, useEffect } from "react";
import { fetchSiteConfig, updateSiteConfig } from "@/lib/api";
import { useSiteConfig } from "@/context/SiteConfigContext";
import { ShieldAlert, Server, ToggleLeft, ToggleRight, Save, RotateCcw } from "lucide-react";

export default function SiteControlPage() {
  const { refreshConfig } = useSiteConfig();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Form states
  const [active, setActive] = useState(true);
  const [status, setStatus] = useState("running");
  const [alertTitle, setAlertTitle] = useState("System Maintenance");
  const [alertMessage, setAlertMessage] = useState("We are currently updating our website. Please check back later.");
  const [maintenanceDescription, setMaintenanceDescription] = useState("The site is temporarily offline for scheduled upgrades.");
  const [ctaText, setCtaText] = useState("Retry");

  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await fetchSiteConfig();
        if (res && res.success && res.data) {
          const config = res.data;
          setActive(config.active ?? true);
          setStatus(config.status || "running");
          setAlertTitle(config.alertTitle || "");
          setAlertMessage(config.alertMessage || "");
          setMaintenanceDescription(config.maintenanceDescription || "");
          setCtaText(config.ctaText || "");
        }
      } catch (err: any) {
        setError(err.message || "Failed to load site configuration.");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSuccess(null);

    const token = localStorage.getItem("adminToken");
    if (!token) {
      setError("No admin token found. Please log in again.");
      setSaving(false);
      return;
    }

    try {
      const updatedData = {
        active,
        status,
        alertTitle,
        alertMessage,
        maintenanceDescription,
        ctaText,
      };
      
      const res = await updateSiteConfig(updatedData, token);
      if (res && res.success) {
        setSuccess("Site configuration updated successfully!");
        // Refresh the global context state immediately
        await refreshConfig();
      } else {
        throw new Error(res.message || "Failed to save configuration.");
      }
    } catch (err: any) {
      setError(err.message || "An error occurred while saving the configuration.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 font-sans text-slate-800">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-3">
            <ShieldAlert className="text-indigo-600 w-8 h-8" />
            Global Site Control
          </h1>
          <p className="text-slate-500 mt-1">
            Manage the application's runtime operational state and maintenance messages.
          </p>
        </div>
      </div>

      {/* Notifications */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl flex items-start gap-3">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500 mt-1.5 shrink-0 animate-pulse" />
          <div>{error}</div>
        </div>
      )}
      {success && (
        <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-xl flex items-start gap-3">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
          <div>{success}</div>
        </div>
      )}

      {/* Main Settings Form */}
      <form onSubmit={handleSave} className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
        {/* Top Control Panel */}
        <div className="p-8 border-b border-slate-100 bg-slate-50/50">
          <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
            <Server className="w-5 h-5 text-indigo-500" />
            Operational State
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Active Toggle Switch */}
            <div className="flex items-center justify-between p-5 bg-white rounded-xl border border-slate-200/80 shadow-sm hover:border-slate-300 transition-colors">
              <div>
                <span className="block text-sm font-bold text-slate-900">Active Mode</span>
                <span className="block text-xs text-slate-500 mt-0.5">Toggle overall control switch.</span>
              </div>
              <button
                type="button"
                onClick={() => setActive(!active)}
                className="focus:outline-none transition-transform active:scale-95"
              >
                {active ? (
                  <ToggleRight className="w-14 h-10 text-indigo-600 cursor-pointer" />
                ) : (
                  <ToggleLeft className="w-14 h-10 text-slate-400 cursor-pointer" />
                )}
              </button>
            </div>

            {/* Status Dropdown */}
            <div className="flex flex-col justify-center p-5 bg-white rounded-xl border border-slate-200/80 shadow-sm hover:border-slate-300 transition-colors">
              <label htmlFor="status" className="block text-sm font-bold text-slate-900 mb-1.5">
                Runtime Status
              </label>
              <select
                id="status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 font-medium text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all cursor-pointer"
              >
                <option value="running">running (Live & Accessible)</option>
                <option value="development">development (Restricted Mode)</option>
                <option value="site_off">site_off (Maintenance Blocker)</option>
              </select>
            </div>
          </div>

          {/* Alert Warning */}
          {status !== "running" && (
            <div className="mt-6 p-4 bg-amber-50 border border-amber-200 text-amber-800 rounded-xl text-sm flex items-start gap-2.5">
              <span className="text-base leading-none">⚠️</span>
              <div>
                <strong className="font-semibold text-amber-900">Warning:</strong> Setting status to{" "}
                <code className="px-1.5 py-0.5 bg-amber-100/80 rounded font-mono text-amber-900">{status}</code>{" "}
                will immediately block all normal routes, public pages, and administrative panels for all users (except{" "}
                <code className="font-semibold text-slate-900">superSuperAdmin</code>).
              </div>
            </div>
          )}
        </div>

        {/* Global Blocker Custom UI Fields */}
        <div className="p-8 space-y-6">
          <h3 className="text-lg font-bold text-slate-900 mb-2">Blocker UI Settings</h3>

          {/* Alert Title */}
          <div>
            <label htmlFor="alertTitle" className="block text-sm font-bold text-slate-700 mb-1.5">
              Alert Title
            </label>
            <input
              id="alertTitle"
              type="text"
              value={alertTitle}
              onChange={(e) => setAlertTitle(e.target.value)}
              placeholder="e.g. System Maintenance"
              className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-slate-800 font-medium text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all placeholder:text-slate-400"
            />
          </div>

          {/* Alert Message */}
          <div>
            <label htmlFor="alertMessage" className="block text-sm font-bold text-slate-700 mb-1.5">
              Alert Message
            </label>
            <textarea
              id="alertMessage"
              value={alertMessage}
              onChange={(e) => setAlertMessage(e.target.value)}
              placeholder="e.g. We are currently updating our website. Please check back later."
              rows={3}
              className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-slate-800 font-medium text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all placeholder:text-slate-400 resize-none"
            />
          </div>

          {/* Maintenance Description */}
          <div>
            <label htmlFor="maintenanceDescription" className="block text-sm font-bold text-slate-700 mb-1.5">
              Maintenance Description
            </label>
            <textarea
              id="maintenanceDescription"
              value={maintenanceDescription}
              onChange={(e) => setMaintenanceDescription(e.target.value)}
              placeholder="e.g. The site is temporarily offline for scheduled upgrades."
              rows={4}
              className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-slate-800 font-medium text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all placeholder:text-slate-400 leading-relaxed"
            />
          </div>

          {/* CTA/Button Text */}
          <div>
            <label htmlFor="ctaText" className="block text-sm font-bold text-slate-700 mb-1.5">
              Optional CTA / Button Text
            </label>
            <input
              id="ctaText"
              type="text"
              value={ctaText}
              onChange={(e) => setCtaText(e.target.value)}
              placeholder="e.g. Retry or Refresh"
              className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-slate-800 font-medium text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all placeholder:text-slate-400"
            />
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-8 py-5 bg-slate-50 border-t border-slate-100 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="px-5 py-2.5 border border-slate-200 text-slate-600 bg-white hover:bg-slate-50 active:bg-slate-100 text-sm font-bold rounded-xl transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            Reset
          </button>
          
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 disabled:bg-indigo-400 text-white text-sm font-bold rounded-xl transition-all flex items-center gap-2 shadow-lg shadow-indigo-600/10 hover:shadow-indigo-600/20 cursor-pointer"
          >
            {saving ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            Save Configuration
          </button>
        </div>
      </form>
    </div>
  );
}
