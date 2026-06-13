"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";

const categories = [
  {
    id: 1,
    name: "Educational Toys",
    image: "https://www.melissaanddoug.com/cdn/shop/files/30123_Rainbow_Stacker_2880x1200.jpg",
    itemCount: 124,
    color: "#3B82F6",
  },
  {
    id: 2,
    name: "Pretend Play",
    image: "https://www.melissaanddoug.com/cdn/shop/files/30607_Cool_Scoops_Ice_Creamery_052423-8643_2880x1200_1.jpg",
    itemCount: 89,
    color: "#F59E0B",
  },
  {
    id: 3,
    name: "Puzzles & Games",
    image: "https://www.melissaanddoug.com/cdn/shop/files/MD_CommunityProgram_Banners_A_ALT_02_Educator_Mobile_1.jpg",
    itemCount: 156,
    color: "#10B981",
  },
  {
    id: 4,
    name: "Arts & Crafts",
    image: "https://www.melissaanddoug.com/cdn/shop/files/30608_Deluxe_Grill_Pizza_Oven_051223-7071_2880x1200_2.jpg",
    itemCount: 72,
    color: "#EC4899",
  },
  {
    id: 5,
    name: "Outdoor Play",
    image: "https://www.melissaanddoug.com/cdn/shop/files/30607_Cool_Scoops_Ice_Creamery_052423-8643_2880x1200_1.jpg",
    itemCount: 45,
    color: "#8B5CF6",
  },
  {
    id: 6,
    name: "Baby & Toddler",
    image: "https://www.melissaanddoug.com/cdn/shop/files/30123_Rainbow_Stacker_2880x1200.jpg",
    itemCount: 98,
    color: "#14B8A6",
  },
];

export default function ShopByCategory() {
  return (
    <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-blue-900">
            Shop by Category
          </h2>
          <p className="text-gray-600 mt-2">Find the perfect toys for every interest</p>
        </div>
        <button className="hidden md:flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-700 transition">
          View All Categories
          <ArrowRight size={20} />
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {categories.map((category) => (
          <div
            key={category.id}
            className="group cursor-pointer"
          >
            <div 
              className="relative rounded-2xl overflow-hidden aspect-square mb-3 transition-transform duration-300 group-hover:scale-105"
              style={{ backgroundColor: `${category.color}15` }}
            >
            {category.image && <Image
                src={category.image}
                alt={category.name}
                fill
                className="object-contain p-4 transition-transform duration-300 group-hover:scale-110"
              />}  
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
                style={{ backgroundColor: `${category.color}20` }}
              >
                <span 
                  className="text-white font-semibold px-4 py-2 rounded-full text-sm"
                  style={{ backgroundColor: category.color }}
                >
                  Shop Now
                </span>
              </div>
            </div>
            <h3 className="font-semibold text-gray-800 text-center group-hover:text-blue-600 transition">
              {category.name}
            </h3>
            <p className="text-sm text-gray-500 text-center">{category.itemCount} items</p>
          </div>
        ))}
      </div>

      <button className="md:hidden w-full mt-6 flex items-center justify-center gap-2 text-blue-600 font-semibold py-3 border border-blue-600 rounded-full hover:bg-blue-50 transition">
        View All Categories
        <ArrowRight size={20} />
      </button>
    </section>
  );
}
