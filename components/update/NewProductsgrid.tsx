"use client";

import React, { useState, useEffect } from "react";
import { newArrivalProducts as fallbackProducts } from "@/lib/Toys";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";  
import ProductCard from "./NewProductcard";
import { Product } from "@/lib/Index ";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

const colorGradients = [
  "from-pink-200 to-rose-100",
  "from-blue-200 to-cyan-100",
  "from-yellow-200 to-amber-100",
  "from-orange-200 to-red-100",
  "from-purple-200 to-pink-100",
  "from-green-200 to-emerald-100",
  "from-lime-200 to-yellow-100",
  "from-indigo-200 to-violet-100",
];

export default function NewProductsgrid() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    setLoading(true);

    fetch(`${API_BASE}/products`)
      .then((res) => res.json())
      .then((data) => {
        if (!active) return;
        
        const rawProducts = data && data.success && Array.isArray(data.data) ? data.data : (Array.isArray(data) ? data : []);
        
        // Filter: only isNewArrival true and isActive true
        const newArrivalsOnly = rawProducts.filter((p: any) => p.isNewArrival && p.isActive);
        
        if (newArrivalsOnly.length > 0) {
          const mapped = newArrivalsOnly.map((p: any, idx: number) => {
            const numericId = parseInt(p._id.substring(18, 24), 16) || idx + 1;
            
            return {
              id: numericId,
              name: p.name,
              price: p.discountPrice || p.price,
              originalPrice: p.discountPrice ? p.price : undefined,
              rating: p.ratings?.average || 5,
              reviewCount: p.ratings?.count || 48 + (idx * 7) % 50,
              image: p.thumbnail || p.images?.[0] || "",
              badge: p.isFeatured ? "HOT" : "NEW",
              category: p.category || "Toys",
              isNew: true,
              color: colorGradients[idx % colorGradients.length],
            };
          });
          setProducts(mapped);
        } else {
          // If no matches, fall back to mock data
          setProducts(fallbackProducts);
        }
      })
      .catch((err) => {
        console.warn("Failed to fetch products from backend, using fallback:", err);
        if (active) {
          setProducts(fallbackProducts);
        }
      })
      .finally(() => {
        if (active) {
          setLoading(false);
        }
      });

    return () => {
      active = false;
    };
  }, []);

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
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="animate-pulse bg-slate-100 rounded-3xl h-80 w-full" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        )}

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