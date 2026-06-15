"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { loginAdmin } from "@/lib/api";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Redirect if already logged in
  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (token) {
      router.push("/dashboard");
    }
  }, [router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const result = await loginAdmin(email, password);
      if (result.success && result.token) {
        localStorage.setItem("adminToken", result.token);
        localStorage.setItem("adminUser", JSON.stringify(result.admin));
        router.push("/dashboard");
      } else {
        throw new Error(result.message || "Login failed");
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-slate-50">
      <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-lg border border-slate-100 space-y-6">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-slate-900">Welcome Back</h2>
          <p className="text-sm text-slate-500 mt-2">Sign in to your admin account</p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 text-xs rounded-lg p-3 border border-red-200 text-center font-medium">
            ⚠️ {error}
          </div>
        )}

        <form className="space-y-4" onSubmit={handleLogin}>
          <div>
            <label className="text-sm font-medium text-slate-700 block mb-1">Email Address</label>
            <input
              type="email"
              required
              // value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email"
              className="w-full px-3 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm bg-white"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-slate-700 block mb-1">Password</label>
            <input
              type="password"
              required
              // value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="password"
              className="w-full px-3 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm bg-white"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2.5 rounded-lg transition-colors text-sm shadow-md hover:shadow-lg disabled:opacity-75 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Signing In...
              </>
            ) : (
              "Sign In"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}