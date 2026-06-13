"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, ShoppingCart } from "lucide-react";
import { products } from "@/lib/products";
import { useCart } from "@/context/CartContext";
import { useCartSidebar } from "@/context/CartSidebarContext";
import ProductModal from "@/components/ProductModal";
import { Product } from "@/lib/products";

export default function ProductSlider() {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const { addToCart } = useCart();
  const { openCart } = useCartSidebar();

  const scroll = (dir: "left" | "right") => {
    if (!sliderRef.current) return;
    const scrollAmount = 320;
    sliderRef.current.scrollBy({
      left: dir === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  const handleAddToCart = (product: Product) => {
    addToCart(product);
    openCart();
  };

  const handleViewDetails = (product: Product) => {
    setSelectedProduct(product);
  };

  return (
    <div className="relative py-10 max-w-[1330px] mx-auto">
      {/* Title */}
      <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-6">
        EDUCATIONAL TOYS
      </h2>

      {/* Slider */}
      <div className="relative">
        {/* Left Button */}
        <button
          onClick={() => scroll("left")}
          className="absolute -left-16 top-1/2 -translate-y-1/2 z-10 bg-blue-600 text-white p-2 rounded-full"
        >
          <ChevronLeft />
        </button>

        {/* Product List */}
        <div
          ref={sliderRef}
          className="flex gap-6 overflow-x-auto scroll-smooth scrollbar-hide"
        >
          {products.map((product) => (
            <div
              key={product.id}
              className="min-w-[280px] bg-white rounded-2xl border flex flex-col justify-between"
            >
                    

              {/* Image */}
              <div className="relative h-48 mb-4">
             {product.product_image && <Image
                  src={product.product_image}
                  alt={product.product_name}
                  fill
                  className="object-contain w-full object-cover rounded-t-2xl"
                />}   
              </div>

<div className="p-4">
              {/* Name */}
              <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2">
                {product.product_name}
              </h3>

              {/* Material & Age Range */}
              <div className="text-sm text-gray-600 mb-2">
                <p>{product.material} • {product.age_range}</p>
              </div>

              {/* Price */}
              <div className="mb-4">
                <span className="text-lg font-bold text-blue-900">
                  ৳{product.price_bdt}
                </span>
              </div>

              {/* Buttons */}
              <div className="flex gap-2">
                <button 
                  onClick={() => handleViewDetails(product)}
                  className="flex-1 border border-blue-600 text-blue-600 py-2 rounded-full hover:bg-blue-50 transition"
                >
                  More info
                </button>
                <button 
                  onClick={() => handleAddToCart(product)}
                  className="flex-1 bg-blue-600 text-white py-2 rounded-full hover:bg-blue-700 transition flex items-center justify-center gap-1"
                >
                  <ShoppingCart size={16} />
                  Add
                </button>
              </div>
            </div>
</div>
          ))}
        </div>

        {/* Right Button */}
        <button
          onClick={() => scroll("right")}
          className="absolute -right-16 top-1/2 -translate-y-1/2 z-10 bg-blue-600 text-white p-2 rounded-full"
        >
          <ChevronRight />
        </button>
      </div>

      {/* Product Modal */}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  );
}