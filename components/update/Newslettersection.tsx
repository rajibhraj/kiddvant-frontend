"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Mail, Send, Sparkles, Bell } from "lucide-react";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubscribed(true);
    }, 1200);
  };

  const perks = [
    { icon: "🎁", text: "Exclusive toy drops" },
    { icon: "💰", text: "Member-only discounts" },
    { icon: "🚀", text: "Early access to new arrivals" },
    { icon: "🎉", text: "Birthday surprise offers" },
  ];

  return (
    <section className="relative py-24 px-6 bg-gradient-to-br from-[#FFF8EC] via-[#FFF0F8] to-[#F0F4FF] overflow-hidden">
      {/* Decoration */}
      <div className="absolute top-0 left-0 w-72 h-72 rounded-full bg-[#FFD182]/20 blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-[#FE80C1]/20 blur-3xl translate-x-1/3 translate-y-1/3 pointer-events-none" />

      {/* Floating elements */}
      {["✉️", "🎈", "⭐", "🎀", "🌟"].map((emoji, i) => (
        <motion.div
          key={i}
          className="absolute text-2xl select-none pointer-events-none"
          style={{
            left: `${10 + i * 20}%`,
            top: i % 2 === 0 ? "10%" : "85%",
          }}
          animate={{ y: [-10, 10, -10], rotate: [-8, 8, -8] }}
          transition={{ duration: 3 + i * 0.5, repeat: Infinity, ease: "easeInOut", delay: i * 0.3 }}
        >
          {emoji}
        </motion.div>
      ))}

      <div className="relative z-10 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-[2.5rem] p-8 md:p-14 shadow-2xl shadow-pink-100 border border-pink-50 text-center"
        >
          {/* Icon */}
          <motion.div
            animate={{ rotate: [-10, 10, -10], y: [-4, 4, -4] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-[#FFD182] to-[#FE80C1] rounded-3xl shadow-lg mb-6 text-3xl"
          >
            🔔
          </motion.div>

          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-[#FFF0F8] border border-[#FE80C1]/30 rounded-full px-5 py-2 mb-5">
            <Bell className="w-4 h-4 text-[#FE80C1]" />
            <span className="text-sm font-bold text-[#FE80C1] uppercase tracking-wide">
              Stay in the Loop
            </span>
          </div>

          <h2
            className="text-4xl md:text-6xl font-black text-gray-800 leading-tight mb-4"
            style={{ fontFamily: "'Nunito', sans-serif" }}
          >
            Get the{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #FFB400 0%, #FE80C1 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Newest Toys
            </span>{" "}
            First! 🚀
          </h2>

          <p
            className="text-gray-500 text-lg md:text-xl mb-10 leading-relaxed max-w-xl mx-auto"
            style={{ fontFamily: "'Nunito', sans-serif" }}
          >
            Join{" "}
            <span className="font-black text-[#FF8C00]">50,000+ happy parents</span> who never miss a magical toy drop!
          </p>

          {/* Perks */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
            {perks.map((perk, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * i }}
                className="bg-gradient-to-br from-[#FFF8EC] to-[#FFF0F8] rounded-2xl p-4 border border-[#FFD182]/20"
              >
                <div className="text-2xl mb-1">{perk.icon}</div>
                <p className="text-xs font-bold text-gray-600">{perk.text}</p>
              </motion.div>
            ))}
          </div>

          {/* Form or Success */}
          {!subscribed ? (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto">
              <div className="relative flex-1">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address..."
                  className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-gray-100 focus:border-[#FE80C1] focus:outline-none text-gray-700 font-semibold text-base bg-gray-50 transition-all"
                  style={{ fontFamily: "'Nunito', sans-serif" }}
                  required
                  aria-label="Email address"
                />
              </div>
              <motion.button
                type="submit"
                whileHover={{ scale: 1.04, boxShadow: "0 15px 30px rgba(254,128,193,0.4)" }}
                whileTap={{ scale: 0.97 }}
                disabled={loading}
                className="flex items-center justify-center gap-2 bg-gradient-to-r from-[#FE80C1] to-[#FF4DA6] text-white font-black text-base px-8 py-4 rounded-2xl shadow-lg transition-all disabled:opacity-70 whitespace-nowrap"
                style={{ fontFamily: "'Nunito', sans-serif" }}
              >
                {loading ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 0.7, repeat: Infinity, ease: "linear" }}
                    className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                  />
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    Subscribe Free!
                    <Send className="w-4 h-4" />
                  </>
                )}
              </motion.button>
            </form>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
              className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-2xl px-8 py-6 max-w-xl mx-auto"
            >
              <div className="text-4xl mb-2">🎉</div>
              <p
                className="font-black text-green-700 text-xl mb-1"
                style={{ fontFamily: "'Nunito', sans-serif" }}
              >
                You&apos;re in the toy club!
              </p>
              <p className="text-green-600 text-sm font-semibold">
                Check your inbox for a special welcome surprise! 🎁
              </p>
            </motion.div>
          )}

          {/* Privacy note */}
          <p className="text-xs text-gray-400 mt-5 font-semibold">
            🔒 No spam, ever. Unsubscribe anytime. We respect your privacy!
          </p>
        </motion.div>
      </div>
    </section>
  );
}