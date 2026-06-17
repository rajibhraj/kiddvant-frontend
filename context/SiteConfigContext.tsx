"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { fetchSiteConfig } from "@/lib/api";
import Image from "next/image";

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
          {/* <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" /> */}
        <Image src="/loading.gif" alt="Logo" className="mx-auto" width={150} height={150} />
          {/* <h3 className="text-lg font-semibold text-slate-800">Initializing Application...</h3> */}
          <p className="text-sm text-slate-500">Checking system configuration</p>
        </div>
      </div>
    );
  }

  // If status is not "running" and user is NOT a superSuperAdmin and route is not /login, render the Global Blocking UI
  const isBlocked = config && config.status !== "running" && userRole !== "superSuperAdmin" && pathname !== "/login";

  if (isBlocked && config) {
    const getMaskedStatus = (status: string) => {
      if (status === "site_off") return "THREAT LEVEL: EXTREME // SYSTEM DESTRUCTION PROTECTION ACTIVE";
      if (status === "development") return "RESTRICTED SECURITY ZONE // ACTIVE DEEP WORKPORT";
      return "SECURITY COMPROMISED // UNAUTHORIZED SECTOR INTERCEPT";
    };

    return (
      <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 font-mono select-none overflow-hidden animate-red-flash danger-layout">
        {/* CSS Keyframes for Danger/ CRT Glitch Effects */}
        <style dangerouslySetInnerHTML={{__html: `
          @keyframes glitchText {
            0% { text-shadow: 3px 0 0 #ef4444, -3px 0 0 #22c55e; }
            20% { text-shadow: -3px 0 0 #ef4444, 3px 0 0 #22c55e; }
            40% { text-shadow: 3px -3px 0 #ef4444, -3px 3px 0 #22c55e; }
            60% { text-shadow: -3px 3px 0 #ef4444, 3px -3px 0 #22c55e; }
            80% { text-shadow: 2px 0 0 #ef4444, -2px 0 0 #22c55e; }
            100% { text-shadow: 3px 0 0 #ef4444, -3px 0 0 #22c55e; }
          }
          @keyframes redPulser {
            0%, 100% { background-color: #030000; }
            50% { background-color: #1a0202; }
          }
          @keyframes lineSweeper {
            0% { transform: translateY(-100%); }
            100% { transform: translateY(100vh); }
          }
          .animate-glitch {
            animation: glitchText 0.8s infinite linear alternate-reverse;
          }
          .animate-red-flash {
            animation: redPulser 2s infinite ease-in-out;
          }
          .scanline-move {
            animation: lineSweeper 6s infinite linear;
          }
        `}} />

        {/* CRT Scanline and Vignette Effect Overlays */}
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.92)_100%)] z-10" />
        <div className="absolute top-0 left-0 w-full h-1 bg-red-500/20 scanline-move z-20 pointer-events-none" />
        <div className="absolute inset-0 pointer-events-none opacity-[0.05] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.3)_50%),linear-gradient(90deg,rgba(255,0,0,0.08),rgba(0,255,0,0.03),rgba(0,0,255,0.08))] bg-[size:100%_4px,3px_100%] z-20" />
        
        {/* Glitchy Warning Containment Container */}
        <div className="max-w-2xl w-full bg-black border-2 border-red-500 shadow-[0_0_65px_rgba(239,68,68,0.4)] rounded-lg p-6 md:p-8 relative z-30 overflow-hidden before:absolute before:top-0 before:left-0 before:w-full before:h-2 before:bg-gradient-to-r before:from-red-600 before:via-red-500 before:to-red-600">
          
          {/* Alarming Stripe Banner */}
          <div className="bg-red-950/60 border border-red-500 text-red-500 px-4 py-3 text-center text-xs font-black tracking-widest uppercase rounded-lg border-dashed animate-pulse flex items-center justify-center gap-2 mb-6">
            <span>⚠️ CRITICAL THREAT: UNAUTHORIZED CONNECTION BLOCKED ⚠️</span>
          </div>

          {/* Header warning info */}
          <div className="flex items-center justify-between border-b border-red-950 pb-4 mb-6 text-xs font-bold text-red-500">
            <div className="flex items-center gap-3">
              <span className="w-3.5 h-3.5 bg-red-600 rounded-full animate-ping shrink-0" />
              <span className="tracking-widest uppercase animate-pulse">
                [ {getMaskedStatus(config.status)} ]
              </span>
            </div>
            <span className="text-[10px] text-red-800/80 tracking-widest hidden sm:inline">CODE: 0x8F91A-ERR</span>
          </div>

          {/* Intrusion details */}
          <div className="space-y-6">
            <div className="space-y-1">
              <div className="text-red-700 text-[10px] font-black uppercase tracking-widest">THREAT_IDENTIFIED</div>
              <h1 className="text-2xl md:text-3xl font-black text-white tracking-wider uppercase select-text animate-glitch">
                {config.alertTitle || "SECURITY PROTOCOL SHUTDOWN"}
              </h1>
            </div>

            <div className="space-y-1">
              <div className="text-red-700 text-[10px] font-black uppercase tracking-widest">IMPACT_ALERT</div>
              <p className="text-red-400 text-sm md:text-base leading-relaxed select-text font-sans font-bold">
                {config.alertMessage || "The core system pipeline has encountered an active threat intervention. All user interfaces are forcefully locked."}
              </p>
            </div>

            {/* Diagnostic Log Output */}
            <div className="bg-zinc-950 rounded border border-red-900/40 p-4 font-mono text-[11px] text-zinc-500 space-y-3 relative overflow-hidden shadow-inner">
              <div className="flex justify-between items-center text-red-950 border-b border-red-950/20 pb-1.5 mb-2 text-[10px] font-bold">
                <span>SYSTEM_LOG_INTERRUPT</span>
                <span>CLOCK: {new Date().toISOString().replace('T', ' ').substring(0, 19)}</span>
              </div>
              <div className="space-y-1.5 max-h-[140px] overflow-y-auto pr-2">
                <div><span className="text-red-600 font-bold">[SYS_HALT]</span> Kernel stack terminated: segmentation fault at 0x00F89A</div>
                <div><span className="text-red-600 font-bold">[SYS_HALT]</span> Core filesystem state switched to READ-ONLY LOCK</div>
                <div><span className="text-red-500 font-bold">[WARN]</span> System integrity compromised - sector check failed</div>
                
                {/* Real operator's warning details */}
                <div className="pl-4 my-2.5 py-2.5 px-3 bg-red-950/35 border-l-2 border-red-600 rounded text-red-300 italic text-xs whitespace-pre-wrap select-text font-sans leading-relaxed shadow-sm">
                  <h4 className="text-[9px] font-black text-red-800 uppercase tracking-widest mb-1.5 font-mono not-italic">DIAGNOSTIC_OPERATOR_REPORT</h4>
                  {config.maintenanceDescription || "No manual diagnosis notes were logged by the root administrator."}
                </div>
                
                <div><span className="text-zinc-600">[INFO]</span> All active visitor routing channels closed</div>
                <div><span className="text-red-600 font-bold">[SYS_HALT]</span> Awaiting root security handshake credential...</div>
              </div>
            </div>
          </div>

          {/* CTA - Intimidating Command Style Button */}
          {config.ctaText && (
            <div className="mt-8 flex items-center justify-end">
              <button
                onClick={() => window.location.reload()}
                className="px-5 py-2.5 bg-red-950/40 hover:bg-red-900/30 active:bg-red-950 border-2 border-red-600 hover:border-red-500 text-red-500 hover:text-red-400 text-xs font-black rounded-lg uppercase tracking-widest transition-all cursor-pointer shadow-[0_0_20px_rgba(220,38,38,0.1)] hover:shadow-[0_0_25px_rgba(220,38,38,0.25)] active:scale-95"
              >
                &gt;&gt; {config.ctaText} &lt;&lt;
              </button>
            </div>
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
