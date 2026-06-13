"use client";

import { newArrivalProducts } from "@/lib/Toys";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";  
import ProductCard from "./NewProductcard";

export default function NewProductsgrid() {
  return (
    <section className="relative bg-white py-24 px-6">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-[#FFD182]/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-[#FE80C1]/10 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-[#FFF0F8] border border-[#FE80C1]/30 rounded-full px-5 py-2 mb-5">
            <Sparkles className="w-4 h-4 text-[#FE80C1]" />
            <span className="text-sm font-bold text-[#FE80C1] uppercase tracking-wide">
              Featured New Toys
            </span>
          </div>
          <h2
            className="text-4xl md:text-6xl font-black text-gray-800 leading-tight mb-4"
            style={{ fontFamily: "'Nunito', sans-serif" }}
          >
            Magical Toys,{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #FFB400 0%, #FE80C1 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Just Arrived! 🎊
            </span>
          </h2>
          <p className="text-gray-500 text-lg max-w-xl mx-auto" style={{ fontFamily: "'Nunito', sans-serif" }}>
            Hand-picked, joy-guaranteed toys that kids go absolutely wild for.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {newArrivalProducts.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-center mt-14"
        >
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(255,209,130,0.5)" }}
            whileTap={{ scale: 0.97 }}
            className="bg-gradient-to-r from-[#FFD182] via-[#FFB74D] to-[#FE80C1] text-white font-black text-lg px-12 py-4 rounded-2xl shadow-xl transition-all"
            style={{ fontFamily: "'Nunito', sans-serif" }}
          >
            🎁 View All New Arrivals
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}