"use client";

import { useState } from "react";
import Image from "next/image";
import { Heart, ShoppingCart, Eye } from "lucide-react";
import { products } from "@/lib/products";
import { useCart } from "@/context/CartContext";
import { useCartSidebar } from "@/context/CartSidebarContext";
import ProductModal from "@/components/ProductModal";
import { Product } from "@/lib/products";

export default function BestSellers() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const { addToCart } = useCart();
  const { openCart } = useCartSidebar();

  const handleAddToCart = (product: Product) => {
    addToCart(product);
    openCart();
  };

  const handleViewDetails = (product: Product) => {
    setSelectedProduct(product);
  };

  return (
    <section className="py-16 px-4 md:px-8 bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1 bg-orange-100 text-orange-600 rounded-full text-sm font-semibold mb-4">
            Most Popular
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-3">
            Best Sellers
          </h2>
          <p className="text-gray-600 max-w-xl mx-auto">
            Loved by parents and kids alike, these top-rated toys are flying off the shelves
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.slice(0, 4).map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden group"
            >
              <div className="relative aspect-square bg-gray-50">
              {product.product_image &&  <Image
                  src={product.product_image}
                  alt={product.product_name}
                  fill
                  className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                />}
                
                {/* Badges */}
                <div className="absolute top-3 left-3 flex flex-col gap-2">
                  <span className="px-3 py-1 bg-blue-500 text-white text-xs font-bold rounded-full">
                    Popular
                  </span>
                </div>

                {/* Wishlist */}
                <button className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:bg-red-50 hover:text-red-500 transition group/heart">
                  <Heart size={18} className="group-hover/heart:fill-current" />
                </button>

                {/* Quick Actions */}
                <div className="absolute bottom-3 left-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button 
                    onClick={() => handleViewDetails(product)}
                    className="flex-1 bg-white text-gray-700 py-2 rounded-full shadow-md hover:bg-gray-50 flex items-center justify-center gap-1 text-sm font-medium transition"
                  >
                    <Eye size={16} />
                    Quick View
                  </button>
                </div>
              </div>

              <div className="p-4">
                {/* Name */}
                <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2 group-hover:text-blue-600 transition">
                  {product.product_name}
                </h3>

                {/* Material & Age Range */}
                <p className="text-xs text-gray-500 mb-3">
                  {product.material} • {product.age_range}
                </p>

                {/* Price */}
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xl font-bold text-blue-900">৳{product.price_bdt}</span>
                </div>

                {/* Add to Cart */}
                <button 
                  onClick={() => handleAddToCart(product)}
                  className="w-full bg-blue-600 text-white py-3 rounded-full font-semibold hover:bg-blue-700 transition flex items-center justify-center gap-2 group/btn"
                >
                  <ShoppingCart size={18} />
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* <div className="text-center mt-10">
          <button className="px-8 py-3 border-2 border-blue-600 text-blue-600 font-semibold rounded-full hover:bg-blue-600 hover:text-white transition">
            View All Best Sellers
          </button>
        </div> */}

        {/* Product Modal */}
        {selectedProduct && (
          <ProductModal
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
          />
        )}
      </div>
    </section>
  );
}
