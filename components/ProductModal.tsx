"use client";

import React from "react";
import Image from "next/image";
import { X, ShoppingCart } from "lucide-react";
import { Product } from "@/lib/products";
import { useCart } from "@/context/CartContext";
import { useCartSidebar } from "@/context/CartSidebarContext";
import { getSafeImageUrl } from "@/lib/utils";

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
}

export default function ProductModal({ product, onClose }: ProductModalProps) {
  const { addToCart } = useCart();
  const { openCart } = useCartSidebar();

  if (!product) return null;

  const handleAddToCart = () => {
    addToCart(product);
    onClose();
    openCart();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition z-10"
        >
          <X size={24} />
        </button>

        <div className="grid md:grid-cols-2 gap-6 p-6">
          {/* Product Image */}
          <div className="relative aspect-square bg-gray-50 rounded-xl overflow-hidden">
          {product.product_image &&   <Image
              src={getSafeImageUrl(product.product_image)}
              alt={product.product_name}
              fill
              className="object-contain p-4"
            />}
          </div>

          {/* Product Details */}
          <div className="flex flex-col">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              {product.product_name}
            </h2>

            {/* Brand */}
            {product.brand && (
              <p className="text-sm text-gray-600 mb-2">
                <span className="font-semibold">Brand:</span> {product.brand}
              </p>
            )}

            {/* Price */}
            <div className="text-3xl font-bold text-blue-900 mb-4">
                ৳{product.price_bdt}
            </div>

            {/* Key Details */}
            <div className="space-y-2 mb-6">
              <p className="text-sm text-gray-600">
                <span className="font-semibold">Material:</span> {product.material}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-semibold">Age Range:</span> {product.age_range}
              </p>
              {product.origin && (
                <p className="text-sm text-gray-600">
                  <span className="font-semibold">Origin:</span> {product.origin}
                </p>
              )}
              {product.dimensions && (
                <p className="text-sm text-gray-600">
                  <span className="font-semibold">Dimensions:</span> {product.dimensions}
                </p>
              )}
              {product.mechanism && (
                <p className="text-sm text-gray-600">
                  <span className="font-semibold">Mechanism:</span> {product.mechanism}
                </p>
              )}
              {product.size && (
                <p className="text-sm text-gray-600">
                  <span className="font-semibold">Size:</span> {product.size}
                </p>
              )}
              {product.size_range && (
                <p className="text-sm text-gray-600">
                  <span className="font-semibold">Size Range:</span> {product.size_range}
                </p>
              )}
              {product.color && (
                <p className="text-sm text-gray-600">
                  <span className="font-semibold">Color:</span> {product.color}
                </p>
              )}
              {product.color_variant && (
                <p className="text-sm text-gray-600">
                  <span className="font-semibold">Color Variant:</span> {product.color_variant}
                </p>
              )}
            </div>

            {/* Features */}
            {product.features && (
              <div className="mb-6">
                <h3 className="font-semibold text-gray-800 mb-2">Features:</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  {product.features.contents && (
                    <li>• {product.features.contents}</li>
                  )}
                  {product.features.packaging && (
                    <li>• {product.features.packaging}</li>
                  )}
                </ul>
              </div>
            )}

            {/* Types */}
            {product.types && product.types.length > 0 && (
              <div className="mb-6">
                <h3 className="font-semibold text-gray-800 mb-2">Types:</h3>
                <div className="flex flex-wrap gap-2">
                  {product.types.map((type, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                    >
                      {type}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Function */}
            {product.function && (
              <div className="mb-6">
                <h3 className="font-semibold text-gray-800 mb-2">Function:</h3>
                <p className="text-sm text-gray-600">{product.function}</p>
              </div>
            )}

            {/* Type */}
            {product.type && (
              <div className="mb-6">
                <h3 className="font-semibold text-gray-800 mb-2">Type:</h3>
                <p className="text-sm text-gray-600">{product.type}</p>
              </div>
            )}

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              className="mt-auto bg-blue-600 text-white py-3 px-6 rounded-full font-semibold hover:bg-blue-700 transition flex items-center justify-center gap-2"
            >
              <ShoppingCart size={20} />
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
