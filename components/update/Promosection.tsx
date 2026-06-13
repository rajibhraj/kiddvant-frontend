"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Zap, Gift, ArrowRight } from "lucide-react";

function CountdownUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="relative">
        <motion.div
          key={value}
          initial={{ rotateX: -90, opacity: 0 }}
          animate={{ rotateX: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="w-16 h-16 md:w-20 md:h-20 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/30 shadow-lg"
        >
          <span className="text-2xl md:text-3xl font-black text-white" style={{ fontFamily: "'Nunito', sans-serif" }}>
            {String(value).padStart(2, "0")}
          </span>
        </motion.div>
      </div>
      <span className="text-white/70 text-xs font-bold uppercase tracking-wider mt-2">
        {label}
      </span>
    </div>
  );
}

const floatingPromoItems = [
  { emoji: "🎁", x: "5%", y: "20%", delay: 0 },
  { emoji: "⭐", x: "92%", y: "15%", delay: 0.3 },
  { emoji: "🎪", x: "3%", y: "75%", delay: 0.6 },
  { emoji: "🌟", x: "88%", y: "70%", delay: 0.9 },
  { emoji: "🎈", x: "45%", y: "5%", delay: 0.4 },
  { emoji: "🎀", x: "55%", y: "90%", delay: 0.7 },
];

export default function PromoSection() {
  const [time, setTime] = useState({ hours: 11, minutes: 47, seconds: 23 });

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prev) => {
        let { hours, minutes, seconds } = prev;
        seconds--;
        if (seconds < 0) { seconds = 59; minutes--; }
        if (minutes < 0) { minutes = 59; hours--; }
        if (hours < 0) { hours = 23; minutes = 59; seconds = 59; }
        return { hours, minutes, seconds };
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative py-24 px-6 overflow-hidden">
      {/* Rich gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#6C63FF] via-[#FF4DA6] to-[#FFB400]" />
      <div className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: "radial-gradient(circle at 30% 40%, rgba(255,255,255,0.3) 0%, transparent 50%), radial-gradient(circle at 70% 60%, rgba(255,255,255,0.2) 0%, transparent 40%)",
        }}
      />
      {/* Polka dots */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: "radial-gradient(circle, white 1.5px, transparent 1.5px)",
          backgroundSize: "30px 30px",
        }}
      />

      {/* Floating emojis */}
      {floatingPromoItems.map((item, i) => (
        <motion.div
          key={i}
          className="absolute text-3xl select-none pointer-events-none drop-shadow-lg"
          style={{ left: item.x, top: item.y }}
          animate={{ y: [-15, 15, -15], rotate: [-5, 5, -5] }}
          transition={{ duration: 4 + i * 0.5, repeat: Infinity, ease: "easeInOut", delay: item.delay }}
        >
          {item.emoji}
        </motion.div>
      ))}

      <div className="relative z-10 max-w-5xl mx-auto text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md border border-white/30 rounded-full px-5 py-2.5 mb-6 shadow-lg"
        >
          <Zap className="w-4 h-4 text-yellow-300 fill-yellow-300" />
          <span className="text-sm font-black text-white uppercase tracking-widest">
            Flash Deal — Limited Time Only!
          </span>
          <Zap className="w-4 h-4 text-yellow-300 fill-yellow-300" />
        </motion.div>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="font-black text-white text-5xl md:text-8xl leading-none mb-4"
          style={{ fontFamily: "'Nunito', sans-serif" }}
        >
          Buy 2{" "}
          <span className="text-[#FFD182]">Get 1</span>{" "}
          FREE! 🎉
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-white/80 text-xl md:text-2xl mb-10 font-semibold"
          style={{ fontFamily: "'Nunito', sans-serif" }}
        >
          On ALL plush toys, puzzles & building sets! Don&apos;t miss out on the magic. 🪄
        </motion.p>

        {/* Countdown */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="flex items-center justify-center gap-4 mb-12"
        >
          <CountdownUnit value={time.hours} label="Hours" />
          <span className="text-white/60 text-3xl font-black pb-5">:</span>
          <CountdownUnit value={time.minutes} label="Minutes" />
          <span className="text-white/60 text-3xl font-black pb-5">:</span>
          <CountdownUnit value={time.seconds} label="Seconds" />
        </motion.div>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.7 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <motion.button
            whileHover={{ scale: 1.06, boxShadow: "0 25px 50px rgba(0,0,0,0.3)" }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center justify-center gap-3 bg-white text-[#FF4DA6] font-black text-xl px-10 py-5 rounded-2xl shadow-2xl transition-all"
            style={{ fontFamily: "'Nunito', sans-serif" }}
          >
            <Gift className="w-6 h-6" />
            Claim Your Free Toy!
            <ArrowRight className="w-5 h-5" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center justify-center gap-2 bg-white/15 backdrop-blur-sm text-white font-bold text-lg px-8 py-5 rounded-2xl border border-white/30 transition-all hover:bg-white/25"
            style={{ fontFamily: "'Nunito', sans-serif" }}
          >
            🛍️ Browse All Deals
          </motion.button>
        </motion.div>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.9 }}
          className="flex flex-wrap items-center justify-center gap-6 mt-12"
        >
          {["🔒 Secure Checkout", "🚚 Free Shipping $35+", "↩️ Easy Returns", "✅ Safe for Kids"].map((badge) => (
            <span key={badge} className="text-white/70 text-sm font-semibold">
              {badge}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}