"use client";

import { motion } from "framer-motion";
import { Sparkles, ArrowRight, ShoppingBag } from "lucide-react";

const floatingToys = [
  { emoji: "🧸", x: "8%", y: "15%", delay: 0, size: "text-4xl" },
  { emoji: "🚀", x: "88%", y: "12%", delay: 0.4, size: "text-3xl" },
  { emoji: "🧩", x: "5%", y: "72%", delay: 0.8, size: "text-3xl" },
  { emoji: "🚗", x: "90%", y: "65%", delay: 0.2, size: "text-4xl" },
  { emoji: "⭐", x: "50%", y: "8%", delay: 0.6, size: "text-2xl" },
  { emoji: "🎠", x: "75%", y: "80%", delay: 1.0, size: "text-3xl" },
  { emoji: "🎪", x: "18%", y: "88%", delay: 0.3, size: "text-2xl" },
  { emoji: "🌈", x: "60%", y: "85%", delay: 0.7, size: "text-3xl" },
];

const floatVariant = {
  initial: { y: 0 },
  animate: {
    y: [-12, 12, -12],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut" as const,
    },
  },
};

export default function NewArrivalHerosection() {
  return (
    <section className="relative min-h-[90vh] overflow-hidden bg-gradient-to-br from-[#FFF8EC] via-[#FFF0F8] to-[#EEF4FF] flex items-center">
      {/* Decorative blobs */}
      <div className="absolute top-0 left-0 w-96 h-96 rounded-full bg-[#FFD182]/30 blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-[#FE80C1]/25 blur-3xl translate-x-1/3 translate-y-1/3" />
      <div className="absolute top-1/2 left-1/2 w-80 h-80 rounded-full bg-[#A8EDEA]/20 blur-3xl -translate-x-1/2 -translate-y-1/2" />

      {/* Floating toy emojis */}
      {floatingToys.map((toy, i) => (
        <motion.div
          key={i}
          className={`absolute select-none pointer-events-none ${toy.size} drop-shadow-lg`}
          style={{ left: toy.x, top: toy.y }}
          variants={floatVariant}
          initial="initial"
          animate="animate"
          transition={{ delay: toy.delay }}
        >
          {toy.emoji}
        </motion.div>
      ))}

      {/* Polka dots pattern */}
      <div className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: "radial-gradient(circle, #FE80C1 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-24 grid lg:grid-cols-2 gap-16 items-center">
        {/* Left content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center lg:text-left"
        >
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-[#FFD182]/60 rounded-full px-5 py-2.5 mb-6 shadow-lg"
          >
            <Sparkles className="w-4 h-4 text-[#FFB400]" />
            <span className="text-sm font-semibold text-[#FF7A00] tracking-wide uppercase">
              ✨ Fresh Drop — Just Landed!
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="font-black leading-tight mb-6"
            style={{ fontFamily: "'Nunito', 'Fredoka One', sans-serif" }}
          >
            <span className="text-5xl md:text-7xl block text-gray-800">
              New
            </span>
            <span
              className="text-6xl md:text-8xl block"
              style={{
                background: "linear-gradient(135deg, #FFB400 0%, #FE80C1 50%, #9B59B6 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Arrivals! 🎉
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-xl md:text-2xl text-gray-600 mb-10 leading-relaxed"
            style={{ fontFamily: "'Nunito', sans-serif" }}
          >
            Discover magical new toys kids will love! 🌟
            <br className="hidden md:block" />
            <span className="text-[#FE80C1] font-bold">Joy in every box</span>, wonder in every play.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
          >
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(254,128,193,0.4)" }}
              whileTap={{ scale: 0.97 }}
              className="group flex items-center justify-center gap-3 bg-gradient-to-r from-[#FE80C1] to-[#FF4DA6] text-white font-bold text-lg px-8 py-4 rounded-2xl shadow-xl shadow-pink-200 transition-all"
              style={{ fontFamily: "'Nunito', sans-serif" }}
            >
              <ShoppingBag className="w-5 h-5" />
              Shop Now
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(255,209,130,0.5)" }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center justify-center gap-2 bg-gradient-to-r from-[#FFD182] to-[#FFB74D] text-gray-800 font-bold text-lg px-8 py-4 rounded-2xl shadow-xl shadow-yellow-200 transition-all"
              style={{ fontFamily: "'Nunito', sans-serif" }}
            >
              🎠 Explore Toys
            </motion.button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="flex gap-8 mt-12 justify-center lg:justify-start"
          >
            {[
              { num: "500+", label: "New Toys" },
              { num: "50K+", label: "Happy Kids" },
              { num: "4.9★", label: "Rating" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl font-black text-gray-800" style={{ fontFamily: "'Nunito', sans-serif" }}>
                  {stat.num}
                </div>
                <div className="text-sm text-gray-500 font-semibold">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Right: Hero image collage */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative hidden lg:flex justify-center items-center"
        >
          {/* Main large image */}
          <motion.div
            animate={{ y: [-8, 8, -8] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="relative z-10 w-72 h-72 rounded-[2.5rem] overflow-hidden shadow-2xl shadow-pink-200 border-4 border-white"
          >
            <img
              src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=600&fit=crop&q=90"
              alt="Fluffy teddy bear toy"
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* Top-right small */}
          <motion.div
            animate={{ y: [8, -8, 8] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            className="absolute top-0 right-0 w-40 h-40 rounded-3xl overflow-hidden shadow-xl shadow-blue-200 border-4 border-white z-20"
          >
            <img
              src="https://images.unsplash.com/photo-1563396983906-b3795482a59a?w=300&h=300&fit=crop&q=80"
              alt="Robot toy"
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* Bottom-left small */}
          <motion.div
            animate={{ y: [-10, 6, -10] }}
            transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute bottom-0 left-0 w-44 h-44 rounded-3xl overflow-hidden shadow-xl shadow-yellow-200 border-4 border-white z-20"
          >
            <img
              src="https://images.unsplash.com/photo-1594787318286-3d835c1d207f?w=300&h=300&fit=crop&q=80"
              alt="Toy car"
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* Bottom-right small */}
          <motion.div
            animate={{ y: [5, -10, 5] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
            className="absolute bottom-4 right-0 w-36 h-36 rounded-3xl overflow-hidden shadow-xl shadow-purple-200 border-4 border-white z-20"
          >
            <img
              src="https://images.unsplash.com/photo-1561948955-570b270e7c36?w=300&h=300&fit=crop&q=80"
              alt="Baby doll"
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* Decorative ring */}
          <div className="absolute inset-0 w-80 h-80 m-auto rounded-full border-2 border-dashed border-[#FFD182]/50 animate-spin-slow" style={{ animationDuration: "20s" }} />
        </motion.div>
      </div>

      {/* Wave divider */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 60L48 50C96 40 192 20 288 15C384 10 480 20 576 28C672 36 768 42 864 40C960 38 1056 28 1152 22C1248 16 1344 14 1392 13L1440 12V60H0Z" fill="white" />
        </svg>
      </div>
    </section>
  );
}