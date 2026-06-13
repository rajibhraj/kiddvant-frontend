"use client";

import React, { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { useCartSidebar } from "@/context/CartSidebarContext";
import ProductModal from "@/components/ProductModal";
import { Product as LibProduct } from "@/lib/products";
import { fetchProducts } from "@/lib/api";

// ═══════════════════════════════════════════════════════════════════
//  TYPES (exact shape from user's data)
// ═══════════════════════════════════════════════════════════════════

export interface Product {
  id: number;
  product_name: string;
  brand?: string | null;
  material?: string;
  age_range?: string;
  origin?: string;
  price_bdt: number;
  product_image: string;
  features?: Record<string, string>;
  dimensions?: string;
  mechanism?: string;
  types?: string[];
  type?: string;
  size_range?: string;
  size?: string;
  function?: string;
  color_variant?: string;
  color?: string;
}

export interface TabItem {
  id: string;
  label: string;
}

// ═══════════════════════════════════════════════════════════════════
//  ICONS
// ═══════════════════════════════════════════════════════════════════

const HeartIcon = ({ filled }: { filled: boolean }) => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill={filled ? "#ec4899" : "none"}
    stroke={filled ? "#ec4899" : "#9ca3af"}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="transition-colors duration-200"
  >
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);

const StarIcon = ({ filled }: { filled: boolean }) => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill={filled ? "#fbbf24" : "none"} stroke={filled ? "#fbbf24" : "#d1d5db"} strokeWidth="1.5">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);

// ═══════════════════════════════════════════════════════════════════
//  USER'S EXACT DATA — 10 PRODUCTS ONLY
// ═══════════════════════════════════════════════════════════════════

export const ALL_PRODUCTS: Product[] = [
  {
    id: 1,
    product_name: "Fishing Toys for Infants and Children, Magnetic Suction, Montessori Educational",
    brand: "Child Jupiter",
    material: "Wooden",
    age_range: "3-6 years old",
    origin: "Hunan province",
    price_bdt: 550,
    product_image: "/Product/p1.jpg",
    features: { contents: "20 magnetic fish + 2 fishing rods", packaging: "Storage bucket" }
  },
  {
    id: 2,
    product_name: "Children's Inertia Car Toy Suit - Mini Drop-Resistant",
    brand: null,
    material: "Plastic",
    age_range: "4-6 years",
    origin: "Hunan province",
    price_bdt: 150,
    product_image: "/Product/p2.jpg",
    dimensions: "5.9*7.7*6.9cm",
    mechanism: "Inertia"
  },
  {
    id: 3,
    product_name: "Children's Mini Inertial Engineering Truck Suit",
    types: ["Excavator", "Cement truck", "Fire truck", "Sanitation truck"],
    material: "Plastic",
    age_range: "2-4 years",
    origin: "Hunan province",
    price_bdt: 100,
    product_image: "/Product/p3.webp",
    dimensions: "13*4.7*6cm"
  },
  {
    id: 4,
    product_name: "Cartoon Fall-Resistant Inertia Ice Cream Car",
    material: "Plastic",
    age_range: "3-5 years",
    origin: "Hunan province",
    price_bdt: 180,
    product_image: "/Product/p4.webp",
    dimensions: "12.5*5*6CM"
  },
  {
    id: 5,
    product_name: "Minions Plush Toy (Bob, Stuart, Kevin)",
    material: "PP Cotton",
    age_range: "7-14 years old",
    type: "Stuffed doll",
    price_bdt: 600,
    product_image: "/Product/p5.webp",
    size_range: "30cm - 65cm"
  },
  {
    id: 6,
    product_name: "Minions Early Education Story Machine",
    function: "Rechargeable, Early education/preschool stories",
    material: "PP Cotton",
    age_range: "7-14 years old",
    color_variant: "Full English 224 + Cat Blue",
    price_bdt: 550,
    product_image: "/Product/p6.webp",
    size_range: "30cm - 65cm"
  },
  {
    id: 7,
    product_name: "Tiktok Hot Pig Power Air Balloon Car",
    function: "Aerodynamic sliding/flying",
    material: "Plastic",
    age_range: "4-6 years old",
    price_bdt: 750,
    product_image: "/Product/p7.webp",
    size: "30cm - 65cm"
  },
  {
    id: 8,
    product_name: "Cartoon Sanrio Plush Handbag & Coin Purse (Cinnamoroll/Kuromi)",
    function: "Plush peripheral / Crossbody bag",
    material: "Polyester fiber",
    age_range: "4-6 years old",
    price_bdt: 250,
    product_image: "/Product/p8.webp",
    size: "30cm - 65cm"
  },
  {
    id: 9,
    product_name: "Small Airplane Press-and-Go Inertia Scooter",
    function: "Inertia movement",
    material: "Plastic",
    age_range: "4-6 years old",
    color: "Blue",
    price_bdt: 120,
    product_image: "/Product/p9.webp",
    size: "15cm"
  },
  {
    id: 10,
    product_name: "Children's Water Painting/Coloring Book - Dinosaur Theme",
    type: "Educational Watercolor Toy",
    material: "Paper/Plastic",
    age_range: "4-6 years old",
    price_bdt: 240,
    product_image: "/Product/p10.jpg",
    size: "15cm"
  }
];

// ═══════════════════════════════════════════════════════════════════
//  TABS — derived by grouping the 10 products into 5 categories
// ═══════════════════════════════════════════════════════════════════

export const TABS: TabItem[] = [
  { id: "all", label: "All Products" },
  { id: "cars", label: "Cars & Vehicles" },
  { id: "plush", label: "Plush & Dolls" },
  { id: "educational", label: "Educational" },
  { id: "accessories", label: "Accessories" },
];

// Helper: assign each product to tabs based on its properties
function getProductTabs(product: Product): string[] {
  const tabs = ["all"];

  const name = product.product_name.toLowerCase();
  const type = (product.type || "").toLowerCase();
  const func = (product.function || "").toLowerCase();
  const material = (product.material || "").toLowerCase();

  // Cars & Vehicles
  if (
    name.includes("car") ||
    name.includes("truck") ||
    name.includes("scooter") ||
    name.includes("air balloon") ||
    product.mechanism === "Inertia" ||
    product.types?.some((t) => t.toLowerCase().includes("truck"))
  ) {
    tabs.push("cars");
  }

  // Plush & Dolls
  if (
    name.includes("plush") ||
    name.includes("minions") ||
    name.includes("sanrio") ||
    name.includes("doll") ||
    type.includes("stuffed") ||
    type.includes("doll") ||
    material === "pp cotton" ||
    material === "polyester fiber"
  ) {
    tabs.push("plush");
  }

  // Educational
  if (
    name.includes("educational") ||
    name.includes("montessori") ||
    name.includes("story machine") ||
    name.includes("painting") ||
    name.includes("coloring") ||
    name.includes("book") ||
    func.includes("education") ||
    func.includes("early education") ||
    type.includes("educational")
  ) {
    tabs.push("educational");
  }

  // Accessories (handbags, purses, etc.)
  if (
    name.includes("handbag") ||
    name.includes("purse") ||
    name.includes("bag") ||
    func.includes("bag") ||
    func.includes("crossbody")
  ) {
    tabs.push("accessories");
  }

  return tabs;
}

// Build the filtered product map from the 10 products
export const TAB_PRODUCTS = () => {
  const map: Record<string, Product[]> = {};
  TABS.forEach((tab) => {
    map[tab.id] = ALL_PRODUCTS.filter((p) => getProductTabs(p).includes(tab.id));
  });
  return map;
};

// ═══════════════════════════════════════════════════════════════════
//  MOCK HELPERS (deterministic, based on product id)
// ═══════════════════════════════════════════════════════════════════

const getCategoryLabel = (product: Product): string => {
  if (product.type) return product.type;
  if (product.types?.length) return product.types[0];
  if (product.mechanism) return product.mechanism;
  if (product.function) return product.function.split(",")[0].trim();
  if (product.material === "Wooden") return "Wooden Toy";
  if (product.material === "Plastic") return "Plastic Toy";
  if (product.material === "PP Cotton") return "Plush";
  if (product.material === "Polyester fiber") return "Plush";
  if (product.material === "Paper/Plastic") return "Art & Craft";
  return "Toy";
};

const getRating = (id: number): number => {
  return 4.2 + ((id * 37) % 9) / 10;
};

const getReviewCount = (id: number): number => {
  return 12 + (id * 73) % 200;
};

const getDiscount = (id: number): number | null => {
  if (id === 2 || id === 3) return 6;
  return null;
};

const getDiscountedPrice = (price: number, discount: number | null): number => {
  if (!discount) return price;
  return Math.round(price * (1 - discount / 100));
};

// ═══════════════════════════════════════════════════════════════════
//  SUB-COMPONENTS
// ═══════════════════════════════════════════════════════════════════

function ProductCard({ product }: { product: Product }) {
  const [liked, setLiked] = useState(false);
  const [added, setAdded] = useState(false);
  const { addToCart } = useCart();
  const { openCart } = useCartSidebar();

  const category = getCategoryLabel(product);
  const discount = getDiscount(product.id);
  const salePrice = getDiscountedPrice(product.price_bdt, discount);
  const rating = getRating(product.id);
  const reviewCount = getReviewCount(product.id);

  const fullStars = Math.floor(rating);
  const hasHalf = rating % 1 >= 0.5;

  const handleAddToCart = () => {
    // CollectionTabs uses its own Product type which matches lib/products shape
    addToCart(product as unknown as LibProduct);
    openCart();
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <div className="group relative bg-white rounded-xl border border-gray-100 p-3 transition-all duration-300 hover:shadow-lg hover:border-pink-200 hover:-translate-y-1 flex flex-col">
      {/* Discount Badge */}
      {discount && (
        <span className="absolute top-3 left-3 z-10 bg-emerald-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-md shadow-sm">
          {discount}% Off
        </span>
      )}

      {/* Wishlist Heart */}
      <button
        onClick={() => setLiked(!liked)}
        className="absolute top-3 right-3 z-10 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full shadow-sm flex items-center justify-center hover:bg-pink-50 transition-colors"
        aria-label="Toggle wishlist"
      >
        <HeartIcon filled={liked} />
      </button>

      {/* Image */}
      <div className="relative w-full aspect-square mb-3 rounded-lg bg-gray-50 overflow-hidden flex items-center justify-center">
       {product.product_image && <Image
          src={product.product_image}
          alt={product.product_name}
          width={220}
          height={220}
          className="object-contain w-full h-full p-2 transition-transform duration-500 group-hover:scale-105"
        />} 
      </div>

      {/* Category */}
      <span className="text-[11px] text-sky-400 font-medium uppercase tracking-wide">
        {category}
      </span>

      {/* Title */}
      <h3 className="text-sm font-semibold text-gray-800 mt-1 mb-1 leading-snug line-clamp-2 min-h-[2.4rem] flex-1">
        {product.product_name}
      </h3>

      {/* Rating */}
      <div className="flex items-center gap-1 mb-2">
        <div className="flex">
          {Array.from({ length: 5 }).map((_, i) => (
            <StarIcon key={i} filled={i < fullStars || (i === fullStars && hasHalf)} />
          ))}
        </div>
        <span className="text-[10px] text-gray-400">({reviewCount})</span>
      </div>

      {/* Price */}
      <div className="flex items-center gap-2 mb-3">
        {discount ? (
          <>
            <span className="text-xs text-gray-400 line-through">৳{product.price_bdt}</span>
            <span className="text-base font-bold text-pink-600">৳{salePrice}</span>
          </>
        ) : (
          <span className="text-base font-bold text-pink-600">৳{product.price_bdt}</span>
        )}
      </div>

      {/* Add to Cart */}
      <button
        onClick={handleAddToCart}
        className={`w-full py-2 rounded-full text-sm font-semibold transition-all duration-300 flex items-center justify-center gap-1.5 ${
          added
            ? "bg-green-500 text-white"
            : "bg-pink-500 hover:bg-pink-600 text-white shadow-sm hover:shadow-pink-200 hover:shadow-md"
        }`}
      >
        {added ? (
          "✓ Added!"
        ) : (
          <>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
            </svg>
            Add to Cart
          </>
        )}
      </button>
    </div>
  );
}

function TabButton({
  tab,
  isActive,
  onClick,
}: {
  tab: TabItem;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`
        w-full text-left px-5 py-3.5 rounded-lg text-sm font-medium
        transition-all duration-300 ease-out
        flex items-center gap-3 whitespace-nowrap
        ${
          isActive
            ? "bg-pink-500 text-white shadow-md shadow-pink-200 translate-x-1"
            : "text-gray-600 hover:bg-pink-50 hover:text-pink-600 hover:translate-x-0.5"
        }
      `}
    >
      <span
        className={`
          w-2 h-2 rounded-full transition-colors duration-300 flex-shrink-0
          ${isActive ? "bg-white" : "bg-gray-300"}
        `}
      />
      {tab.label}
    </button>
  );
}

// ═══════════════════════════════════════════════════════════════════
//  MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════════

interface CollectionTabsProps {
  defaultTab?: string;
}

export default function CollectionTabs({ defaultTab = "all" }: CollectionTabsProps) {
  const [activeTab, setActiveTab] = useState(defaultTab);
  const [productsList, setProductsList] = useState<Product[]>(ALL_PRODUCTS);

  useEffect(() => {
    let active = true;
    fetchProducts(ALL_PRODUCTS as unknown as LibProduct[]).then((data) => {
      if (active) {
        setProductsList(data as unknown as Product[]);
      }
    });
    return () => {
      active = false;
    };
  }, []);

  const tabProducts = useMemo(() => {
    const map: Record<string, Product[]> = {};
    TABS.forEach((tab) => {
      map[tab.id] = productsList.filter((p) => getProductTabs(p).includes(tab.id));
    });
    return map;
  }, [productsList]);

  const activeProducts = tabProducts[activeTab] || [];

  return (
    <section className="w-full py-10 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* ── Header ── */}
        <div className="flex justify-end mb-6">
          <h2 className="text-2xl sm:text-3xl font-bold">
            <span className="text-gray-800">Select from </span>
            <span className="text-pink-500">Collection</span>
          </h2>
        </div>

        {/* ── Main Container ── */}
        <div className="border-2 border-dashed border-pink-200 rounded-2xl p-4 sm:p-6 lg:p-8 bg-gradient-to-br from-pink-50/50 via-white to-purple-50/30">
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
            {/* ── Left: Tab Navigation ── */}
            <nav className="w-full lg:w-56 flex-shrink-0">
              <div className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0 scrollbar-hide">
                {TABS.map((tab) => (
                  <TabButton
                    key={tab.id}
                    tab={tab}
                    isActive={activeTab === tab.id}
                    onClick={() => setActiveTab(tab.id)}
                  />
                ))}
              </div>
            </nav>

            {/* ── Right: Product Grid ── */}
            <div className="flex-1 min-w-0">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-5">
                {activeProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>

              {activeProducts.length === 0 && (
                <div className="flex flex-col items-center justify-center py-16 text-gray-400">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="mb-3 opacity-50">
                    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                    <line x1="3" y1="6" x2="21" y2="6" />
                    <path d="M16 10a4 4 0 0 1-8 0" />
                  </svg>
                  <p className="text-sm">No products found in this collection.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}




// "use client";

// import React, { useState, useMemo } from "react";
// import Image from "next/image";

// // ═══════════════════════════════════════════════════════════════════
// //  TYPES (exact shape from user's data)
// // ═══════════════════════════════════════════════════════════════════

// export interface Product {
//   id: number;
//   product_name: string;
//   brand?: string | null;
//   material?: string;
//   age_range?: string;
//   origin?: string;
//   price_bdt: number;
//   product_image: string;
//   features?: Record<string, string>;
//   dimensions?: string;
//   mechanism?: string;
//   types?: string[];
//   type?: string;
//   size_range?: string;
//   size?: string;
//   function?: string;
//   color_variant?: string;
//   color?: string;
// }

// export interface TabItem {
//   id: string;
//   label: string;
// }

// // ═══════════════════════════════════════════════════════════════════
// //  ICONS
// // ═══════════════════════════════════════════════════════════════════

// const HeartIcon = ({ filled }: { filled: boolean }) => (
//   <svg
//     width="18"
//     height="18"
//     viewBox="0 0 24 24"
//     fill={filled ? "#ec4899" : "none"}
//     stroke={filled ? "#ec4899" : "#9ca3af"}
//     strokeWidth="2"
//     strokeLinecap="round"
//     strokeLinejoin="round"
//     className="transition-colors duration-200"
//   >
//     <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
//   </svg>
// );

// const StarIcon = ({ filled }: { filled: boolean }) => (
//   <svg width="12" height="12" viewBox="0 0 24 24" fill={filled ? "#fbbf24" : "none"} stroke={filled ? "#fbbf24" : "#d1d5db"} strokeWidth="1.5">
//     <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
//   </svg>
// );

// // ═══════════════════════════════════════════════════════════════════
// //  USER'S EXACT DATA — 10 PRODUCTS ONLY
// // ═══════════════════════════════════════════════════════════════════

// export const ALL_PRODUCTS: Product[] = [
//   {
//     id: 1,
//     product_name: "Fishing Toys for Infants and Children, Magnetic Suction, Montessori Educational",
//     brand: "Child Jupiter",
//     material: "Wooden",
//     age_range: "3-6 years old",
//     origin: "Hunan province",
//     price_bdt: 550,
//     product_image: "/Product/p1.jpg",
//     features: { contents: "20 magnetic fish + 2 fishing rods", packaging: "Storage bucket" }
//   },
//   {
//     id: 2,
//     product_name: "Children's Inertia Car Toy Suit - Mini Drop-Resistant",
//     brand: null,
//     material: "Plastic",
//     age_range: "4-6 years",
//     origin: "Hunan province",
//     price_bdt: 150,
//     product_image: "/Product/p2.jpg",
//     dimensions: "5.9*7.7*6.9cm",
//     mechanism: "Inertia"
//   },
//   {
//     id: 3,
//     product_name: "Children's Mini Inertial Engineering Truck Suit",
//     types: ["Excavator", "Cement truck", "Fire truck", "Sanitation truck"],
//     material: "Plastic",
//     age_range: "2-4 years",
//     origin: "Hunan province",
//     price_bdt: 100,
//     product_image: "/Product/p3.webp",
//     dimensions: "13*4.7*6cm"
//   },
//   {
//     id: 4,
//     product_name: "Cartoon Fall-Resistant Inertia Ice Cream Car",
//     material: "Plastic",
//     age_range: "3-5 years",
//     origin: "Hunan province",
//     price_bdt: 180,
//     product_image: "/Product/p4.webp",
//     dimensions: "12.5*5*6CM"
//   },
//   {
//     id: 5,
//     product_name: "Minions Plush Toy (Bob, Stuart, Kevin)",
//     material: "PP Cotton",
//     age_range: "7-14 years old",
//     type: "Stuffed doll",
//     price_bdt: 600,
//     product_image: "/Product/p5.webp",
//     size_range: "30cm - 65cm"
//   },
//   {
//     id: 6,
//     product_name: "Minions Early Education Story Machine",
//     function: "Rechargeable, Early education/preschool stories",
//     material: "PP Cotton",
//     age_range: "7-14 years old",
//     color_variant: "Full English 224 + Cat Blue",
//     price_bdt: 550,
//     product_image: "/Product/p6.webp",
//     size_range: "30cm - 65cm"
//   },
//   {
//     id: 7,
//     product_name: "Tiktok Hot Pig Power Air Balloon Car",
//     function: "Aerodynamic sliding/flying",
//     material: "Plastic",
//     age_range: "4-6 years old",
//     price_bdt: 750,
//     product_image: "/Product/p7.webp",
//     size: "30cm - 65cm"
//   },
//   {
//     id: 8,
//     product_name: "Cartoon Sanrio Plush Handbag & Coin Purse (Cinnamoroll/Kuromi)",
//     function: "Plush peripheral / Crossbody bag",
//     material: "Polyester fiber",
//     age_range: "4-6 years old",
//     price_bdt: 250,
//     product_image: "/Product/p8.webp",
//     size: "30cm - 65cm"
//   },
//   {
//     id: 9,
//     product_name: "Small Airplane Press-and-Go Inertia Scooter",
//     function: "Inertia movement",
//     material: "Plastic",
//     age_range: "4-6 years old",
//     color: "Blue",
//     price_bdt: 120,
//     product_image: "/Product/p9.webp",
//     size: "15cm"
//   },
//   {
//     id: 10,
//     product_name: "Children's Water Painting/Coloring Book - Dinosaur Theme",
//     type: "Educational Watercolor Toy",
//     material: "Paper/Plastic",
//     age_range: "4-6 years old",
//     price_bdt: 240,
//     product_image: "/Product/p10.jpg",
//     size: "15cm"
//   }
// ];

// // ═══════════════════════════════════════════════════════════════════
// //  TABS — derived by grouping the 10 products into 5 categories
// // ═══════════════════════════════════════════════════════════════════

// export const TABS: TabItem[] = [
//   { id: "all", label: "All Products" },
//   { id: "cars", label: "Cars & Vehicles" },
//   { id: "plush", label: "Plush & Dolls" },
//   { id: "educational", label: "Educational" },
//   { id: "accessories", label: "Accessories" },
// ];

// // Helper: assign each product to tabs based on its properties
// function getProductTabs(product: Product): string[] {
//   const tabs = ["all"];

//   const name = product.product_name.toLowerCase();
//   const type = (product.type || "").toLowerCase();
//   const func = (product.function || "").toLowerCase();
//   const material = (product.material || "").toLowerCase();

//   // Cars & Vehicles
//   if (
//     name.includes("car") ||
//     name.includes("truck") ||
//     name.includes("scooter") ||
//     name.includes("air balloon") ||
//     product.mechanism === "Inertia" ||
//     product.types?.some((t) => t.toLowerCase().includes("truck"))
//   ) {
//     tabs.push("cars");
//   }

//   // Plush & Dolls
//   if (
//     name.includes("plush") ||
//     name.includes("minions") ||
//     name.includes("sanrio") ||
//     name.includes("doll") ||
//     type.includes("stuffed") ||
//     type.includes("doll") ||
//     material === "pp cotton" ||
//     material === "polyester fiber"
//   ) {
//     tabs.push("plush");
//   }

//   // Educational
//   if (
//     name.includes("educational") ||
//     name.includes("montessori") ||
//     name.includes("story machine") ||
//     name.includes("painting") ||
//     name.includes("coloring") ||
//     name.includes("book") ||
//     func.includes("education") ||
//     func.includes("early education") ||
//     type.includes("educational")
//   ) {
//     tabs.push("educational");
//   }

//   // Accessories (handbags, purses, etc.)
//   if (
//     name.includes("handbag") ||
//     name.includes("purse") ||
//     name.includes("bag") ||
//     func.includes("bag") ||
//     func.includes("crossbody")
//   ) {
//     tabs.push("accessories");
//   }

//   return tabs;
// }

// // Build the filtered product map from the 10 products
// export const TAB_PRODUCTS = () => {
//   const map: Record<string, Product[]> = {};
//   TABS.forEach((tab) => {
//     map[tab.id] = ALL_PRODUCTS.filter((p) => getProductTabs(p).includes(tab.id));
//   });
//   return map;
// };

// // ═══════════════════════════════════════════════════════════════════
// //  MOCK HELPERS (deterministic, based on product id)
// // ═══════════════════════════════════════════════════════════════════

// const getCategoryLabel = (product: Product): string => {
//   if (product.type) return product.type;
//   if (product.types?.length) return product.types[0];
//   if (product.mechanism) return product.mechanism;
//   if (product.function) return product.function.split(",")[0].trim();
//   if (product.material === "Wooden") return "Wooden Toy";
//   if (product.material === "Plastic") return "Plastic Toy";
//   if (product.material === "PP Cotton") return "Plush";
//   if (product.material === "Polyester fiber") return "Plush";
//   if (product.material === "Paper/Plastic") return "Art & Craft";
//   return "Toy";
// };

// const getRating = (id: number): number => {
//   return 4.2 + ((id * 37) % 9) / 10;
// };

// const getReviewCount = (id: number): number => {
//   return 12 + (id * 73) % 200;
// };

// const getDiscount = (id: number): number | null => {
//   if (id === 2 || id === 3) return 6;
//   return null;
// };

// const getDiscountedPrice = (price: number, discount: number | null): number => {
//   if (!discount) return price;
//   return Math.round(price * (1 - discount / 100));
// };

// // ═══════════════════════════════════════════════════════════════════
// //  SUB-COMPONENTS
// // ═══════════════════════════════════════════════════════════════════

// function ProductCard({ product }: { product: Product }) {
//   const [liked, setLiked] = useState(false);

//   const category = getCategoryLabel(product);
//   const discount = getDiscount(product.id);
//   const salePrice = getDiscountedPrice(product.price_bdt, discount);
//   const rating = getRating(product.id);
//   const reviewCount = getReviewCount(product.id);

//   const fullStars = Math.floor(rating);
//   const hasHalf = rating % 1 >= 0.5;

//   return (
//     <div className="group relative bg-white rounded-xl border border-gray-100 p-3 transition-all duration-300 hover:shadow-lg hover:border-pink-200 hover:-translate-y-1">
//       {/* Discount Badge */}
//       {discount && (
//         <span className="absolute top-3 left-3 z-10 bg-emerald-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-md shadow-sm">
//           {discount}% Off
//         </span>
//       )}

//       {/* Wishlist Heart */}
//       <button
//         onClick={() => setLiked(!liked)}
//         className="absolute top-3 right-3 z-10 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full shadow-sm flex items-center justify-center hover:bg-pink-50 transition-colors"
//         aria-label="Toggle wishlist"
//       >
//         <HeartIcon filled={liked} />
//       </button>

//       {/* Image */}
//       <div className="relative w-full aspect-square mb-3 rounded-lg bg-gray-50 overflow-hidden flex items-center justify-center">
//         <Image
//           src={product.product_image}
//           alt={product.product_name}
//           width={220}
//           height={220}
//           className="object-contain w-full h-full p-2 transition-transform duration-500 group-hover:scale-105"
//         />
//       </div>

//       {/* Category */}
//       <span className="text-[11px] text-sky-400 font-medium uppercase tracking-wide">
//         {category}
//       </span>

//       {/* Title */}
//       <h3 className="text-sm font-semibold text-gray-800 mt-1 mb-1 leading-snug line-clamp-2 min-h-[2.4rem]">
//         {product.product_name}
//       </h3>

//       {/* Rating */}
//       <div className="flex items-center gap-1 mb-2">
//         <div className="flex">
//           {Array.from({ length: 5 }).map((_, i) => (
//             <StarIcon key={i} filled={i < fullStars || (i === fullStars && hasHalf)} />
//           ))}
//         </div>
//         <span className="text-[10px] text-gray-400">({reviewCount})</span>
//       </div>

//       {/* Price */}
//       <div className="flex items-center gap-2">
//         {discount ? (
//           <>
//             <span className="text-xs text-gray-400 line-through">৳{product.price_bdt}</span>
//             <span className="text-base font-bold text-pink-600">৳{salePrice}</span>
//           </>
//         ) : (
//           <span className="text-base font-bold text-pink-600">৳{product.price_bdt}</span>
//         )}
//       </div>
//     </div>
//   );
// }

// function TabButton({
//   tab,
//   isActive,
//   onClick,
// }: {
//   tab: TabItem;
//   isActive: boolean;
//   onClick: () => void;
// }) {
//   return (
//     <button
//       onClick={onClick}
//       className={`
//         w-full text-left px-5 py-3.5 rounded-lg text-sm font-medium
//         transition-all duration-300 ease-out
//         flex items-center gap-3 whitespace-nowrap
//         ${
//           isActive
//             ? "bg-pink-500 text-white shadow-md shadow-pink-200 translate-x-1"
//             : "text-gray-600 hover:bg-pink-50 hover:text-pink-600 hover:translate-x-0.5"
//         }
//       `}
//     >
//       <span
//         className={`
//           w-2 h-2 rounded-full transition-colors duration-300 flex-shrink-0
//           ${isActive ? "bg-white" : "bg-gray-300"}
//         `}
//       />
//       {tab.label}
//     </button>
//   );
// }

// // ═══════════════════════════════════════════════════════════════════
// //  MAIN COMPONENT
// // ═══════════════════════════════════════════════════════════════════

// interface CollectionTabsProps {
//   defaultTab?: string;
// }

// export default function CollectionTabs({ defaultTab = "all" }: CollectionTabsProps) {
//   const [activeTab, setActiveTab] = useState(defaultTab);

//   const tabProducts = useMemo(() => {
//     const map: Record<string, Product[]> = {};
//     TABS.forEach((tab) => {
//       map[tab.id] = ALL_PRODUCTS.filter((p) => getProductTabs(p).includes(tab.id));
//     });
//     return map;
//   }, []);

//   const activeProducts = tabProducts[activeTab] || [];

//   return (
//     <section className="w-full py-10 px-4 sm:px-6 lg:px-8 bg-white">
//       <div className="max-w-7xl mx-auto">
//         {/* ── Header ── */}
//         <div className="flex justify-end mb-6">
//           <h2 className="text-2xl sm:text-3xl font-bold">
//             <span className="text-gray-800">Select from </span>
//             <span className="text-pink-500">Collection</span>
//           </h2>
//         </div>

//         {/* ── Main Container ── */}
//         <div className="border-2 border-dashed border-pink-200 rounded-2xl p-4 sm:p-6 lg:p-8 bg-gradient-to-br from-pink-50/50 via-white to-purple-50/30">
//           <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
//             {/* ── Left: Tab Navigation ── */}
//             <nav className="w-full lg:w-56 flex-shrink-0">
//               <div className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0 scrollbar-hide">
//                 {TABS.map((tab) => (
//                   <TabButton
//                     key={tab.id}
//                     tab={tab}
//                     isActive={activeTab === tab.id}
//                     onClick={() => setActiveTab(tab.id)}
//                   />
//                 ))}
//               </div>
//             </nav>

//             {/* ── Right: Product Grid ── */}
//             <div className="flex-1 min-w-0">
//               <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-5">
//                 {activeProducts.map((product) => (
//                   <ProductCard key={product.id} product={product} />
//                 ))}
//               </div>

//               {activeProducts.length === 0 && (
//                 <div className="flex flex-col items-center justify-center py-16 text-gray-400">
//                   <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="mb-3 opacity-50">
//                     <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
//                     <line x1="3" y1="6" x2="21" y2="6" />
//                     <path d="M16 10a4 4 0 0 1-8 0" />
//                   </svg>
//                   <p className="text-sm">No products found in this collection.</p>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }