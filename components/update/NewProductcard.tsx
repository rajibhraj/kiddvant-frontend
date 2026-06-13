"use client";

import { Product } from "@/lib/Index ";
import { motion } from "framer-motion";
import { ShoppingCart, Star, Heart } from "lucide-react"; 
import { useState } from "react";

interface ProductCardProps {
  product: Product;
  index: number;
}

export default function ProductCard({ product, index }: ProductCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);

  const handleAddToCart = () => {
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 1800);
  };

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      whileHover={{ y: -8 }}
      className="group relative bg-white rounded-3xl overflow-hidden shadow-lg shadow-gray-100 hover:shadow-2xl hover:shadow-pink-100 transition-all duration-300 border border-gray-50"
    >
      {/* Gradient background on hover */}
      <div className={`absolute inset-0 bg-gradient-to-br ${product.color} opacity-0 group-hover:opacity-40 transition-opacity duration-300 pointer-events-none`} />

      {/* Image area */}
      <div className={`relative h-52 bg-gradient-to-br ${product.color} overflow-hidden`}>
        <motion.img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          loading="lazy"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {product.badge && (
            <span
              className={`text-xs font-black px-3 py-1 rounded-full shadow-md ${
                product.badge === "HOT"
                  ? "bg-red-500 text-white"
                  : "bg-gradient-to-r from-[#FFD182] to-[#FFB400] text-gray-800"
              }`}
            >
              {product.badge === "HOT" ? "🔥 HOT" : "✨ NEW"}
            </span>
          )}
          {discount && (
            <span className="text-xs font-black px-3 py-1 rounded-full bg-green-500 text-white shadow-md">
              -{discount}%
            </span>
          )}
        </div>

        {/* Wishlist */}
        <motion.button
          whileTap={{ scale: 0.85 }}
          onClick={() => setIsWishlisted(!isWishlisted)}
          className="absolute top-3 right-3 w-9 h-9 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-all"
          aria-label="Add to wishlist"
        >
          <Heart
            className={`w-4 h-4 transition-colors ${
              isWishlisted ? "fill-red-500 text-red-500" : "text-gray-400"
            }`}
          />
        </motion.button>
      </div>

      {/* Content */}
      <div className="relative p-4">
        <p className="text-xs font-semibold text-[#FE80C1] uppercase tracking-wider mb-1">
          {product.category}
        </p>
        <h3
          className="font-extrabold text-gray-800 text-base leading-tight mb-2 line-clamp-2"
          style={{ fontFamily: "'Nunito', sans-serif" }}
        >
          {product.name}
        </h3>

        {/* Stars */}
        <div className="flex items-center gap-1 mb-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`w-3.5 h-3.5 ${
                i < product.rating
                  ? "fill-[#FFB400] text-[#FFB400]"
                  : "fill-gray-200 text-gray-200"
              }`}
            />
          ))}
          <span className="text-xs text-gray-500 ml-1">({product.reviewCount})</span>
        </div>

        {/* Price & Cart */}
        <div className="flex items-center justify-between">
          <div>
            <span
              className="text-xl font-black text-gray-800"
              style={{ fontFamily: "'Nunito', sans-serif" }}
            >
              ${product.price.toFixed(2)}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-gray-400 line-through ml-2">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>

          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={handleAddToCart}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl font-bold text-sm transition-all shadow-md ${
              addedToCart
                ? "bg-green-500 text-white shadow-green-200"
                : "bg-gradient-to-r from-[#FE80C1] to-[#FF4DA6] text-white shadow-pink-200 hover:shadow-pink-300"
            }`}
            style={{ fontFamily: "'Nunito', sans-serif" }}
            aria-label={`Add ${product.name} to cart`}
          >
            {addedToCart ? (
              <>✓ Added!</>
            ) : (
              <>
                <ShoppingCart className="w-3.5 h-3.5" />
                Add
              </>
            )}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}