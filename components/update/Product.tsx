"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Product } from "@/lib/products";
import { getSafeImageUrl } from "@/lib/utils";

// Re-export so other files can import Product from here if needed
export type { Product };

interface ProductCardProps {
  product: Product;
  index: number;
  isHovered: boolean;
  onHover: (index: number | null) => void;
  onAddToCart?: (product: Product) => void;
  onViewDetails?: (product: Product) => void;
}

// ─── Mock Data Helpers ───────────────────────────────────────────────
// Since the original data doesn't have categories, ratings, or discounts,
// we generate deterministic mock values based on product id.

const CATEGORIES = [
  "Doll", "Toy", "Music", "Bath", "Plush", "Car", "Educational", "Art"
];

const getCategory = (id: number): string => CATEGORIES[id % CATEGORIES.length];

const getDiscount = (id: number): number | null => {
  // Cards 2 and 3 (indices 1 and 2) get discounts
  if (id === 2 || id === 3) return 6;
  return null;
};

const getDiscountedPrice = (price: number, discount: number | null): number => {
  if (!discount) return price;
  return Math.round(price * (1 - discount / 100));
};

const getRating = (id: number): number => {
  // Deterministic ratings between 4.2 and 5.0
  return 4.2 + ((id * 37) % 9) / 10;
};

const getReviewCount = (id: number): number => {
  return 12 + (id * 73) % 200;
};

// ─── Icons ───────────────────────────────────────────────────────────
const StarIcon = ({ filled, half }: { filled: boolean; half?: boolean }) => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill={filled ? "#fbbf24" : "none"}
    stroke={filled ? "#fbbf24" : "#d1d5db"}
    strokeWidth="1.5"
    className="inline-block"
  >
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    {half && (
      <defs>
        <clipPath id="half">
          <rect x="0" y="0" width="12" height="24" />
        </clipPath>
      </defs>
    )}
  </svg>
);

const StarRating = ({ rating, reviewCount }: { rating: number; reviewCount: number }) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= Math.floor(rating)) {
      stars.push(<StarIcon key={i} filled />);
    } else if (i === Math.ceil(rating) && rating % 1 !== 0) {
      stars.push(<StarIcon key={i} filled half />);
    } else {
      stars.push(<StarIcon key={i} filled={false} />);
    }
  }
  return (
    <div className="flex items-center gap-1">
      <div className="flex">{stars}</div>
      <span className="text-xs text-gray-400">({reviewCount})</span>
    </div>
  );
};

const EyeIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const HeartIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);

// ─── Sketchy Arrow Button ────────────────────────────────────────────
const SketchArrow = ({ direction, onClick }: { direction: "left" | "right"; onClick: () => void }) => {
  const path = direction === "left"
    ? "M20 5 L5 50 L20 95"
    : "M5 5 L20 50 L5 95";

  return (
    <button
      onClick={onClick}
      className="absolute top-1/2 -translate-y-1/2 z-20 w-12 h-24 flex items-center justify-center group transition-transform hover:scale-105 active:scale-95"
      style={{ [direction]: "-20px" }}
      aria-label={direction === "left" ? "Previous" : "Next"}
    >
      <svg width="28" height="100" viewBox="0 0 25 100" fill="none" className="opacity-70 group-hover:opacity-100 transition-opacity">
        <path
          d={path}
          stroke="#4a4a4a"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ filter: "url(#sketch)" }}
        />
        <defs>
          <filter id="sketch">
            <feTurbulence type="fractalNoise" baseFrequency="0.02" numOctaves="3" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="2" />
          </filter>
        </defs>
      </svg>
    </button>
  );
};

// ─── Kite Decoration ─────────────────────────────────────────────────
const KiteDecoration = () => (
  <div className="absolute -left-4 top-8 z-10 hidden lg:block pointer-events-none">
    <svg width="80" height="120" viewBox="0 0 80 120" fill="none" className="opacity-80">
      {/* Kite body */}
      <path d="M40 10 L70 50 L40 90 L10 50 Z" fill="#f472b6" stroke="#db2777" strokeWidth="2" />
      <path d="M40 10 L40 90" stroke="#db2777" strokeWidth="1.5" />
      <path d="M10 50 L70 50" stroke="#db2777" strokeWidth="1.5" />
      {/* Kite tail */}
      <path d="M40 90 Q30 100 35 110 Q40 120 38 130" stroke="#f472b6" strokeWidth="2" fill="none" strokeDasharray="4 3" />
      {/* Bow on tail */}
      <path d="M32 105 L42 105 M37 100 L37 110" stroke="#f472b6" strokeWidth="2" />
      {/* String */}
      <path d="M40 10 Q60 -10 80 -5" stroke="#94a3b8" strokeWidth="1" fill="none" strokeDasharray="3 2" />
    </svg>
  </div>
);

// ─── Shopping Cart Tab ─────────────────────────────────────────────
const CartTab = ({ itemCount }: { itemCount: number }) => (
  <div className="fixed right-0 top-1/2 -translate-y-1/2 z-50">
    <div className="bg-pink-500 text-white rounded-l-2xl py-3 px-2 shadow-lg flex flex-col items-center gap-1 cursor-pointer hover:bg-pink-600 transition-colors">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="9" cy="21" r="1" />
        <circle cx="20" cy="21" r="1" />
        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
      </svg>
      <span className="text-xs font-bold">{itemCount} Item</span>
      <span className="text-[10px] opacity-80">Cart</span>
    </div>
  </div>
);

// ─── Product Card ────────────────────────────────────────────────────
const ProductCard = ({ product, index, isHovered, onHover, onAddToCart, onViewDetails }: ProductCardProps) => {
  const category = getCategory(product.id);
  const discount = getDiscount(product.id);
  const discountedPrice = getDiscountedPrice(product.price_bdt, discount);
  const rating = getRating(product.id);
  const reviewCount = getReviewCount(product.id);

  return (
    <div
      className="relative flex-shrink-0 w-full sm:w-1/2 md:w-1/3 lg:w-1/5 px-2"
      onMouseEnter={() => onHover(index)}
      onMouseLeave={() => onHover(null)}
    >
      <div className="bg-white rounded-xl border border-gray-100 p-4 h-full flex flex-col items-center text-center transition-all duration-300 hover:shadow-lg hover:border-pink-200 relative group/card">

        {/* Discount Badge */}
        {discount && (
          <div className="absolute top-3 left-3 bg-emerald-500 text-white text-[10px] font-bold px-2 py-1 rounded-md shadow-sm z-10">
            {discount}% Off
          </div>
        )}

        {/* Product Image Container */}
        <div className="relative w-full aspect-square mb-3 flex items-center justify-center">
        {product.product_image && <Image
            src={getSafeImageUrl(product.product_image)}
            alt={product.product_name}
            width={200}
            height={200}
            className="object-contain w-full h-full"
          />}  

          {/* Hover Action Icons */}
          <div className={`absolute right-1 top-1/2 -translate-y-1/2 flex flex-col gap-2 transition-all duration-300 ${isHovered ? "opacity-100 translate-x-0" : "opacity-0 translate-x-2"}`}>
            <button
              onClick={() => onViewDetails?.(product)}
              className="w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center text-gray-600 hover:text-pink-500 hover:bg-pink-50 transition-colors"
              aria-label="Quick view"
            >
              <EyeIcon />
            </button>
            <button className="w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center text-gray-600 hover:text-pink-500 hover:bg-pink-50 transition-colors">
              <HeartIcon />
            </button>
          </div>
        </div>

        {/* Category */}
        <span className="text-[11px] text-sky-400 uppercase tracking-wider font-medium mb-1">
          {category}
        </span>

        {/* Rating */}
        <div className="mb-2">
          <StarRating rating={rating} reviewCount={reviewCount} />
        </div>

        {/* Title */}
        <h3 className="text-sm font-semibold text-gray-800 leading-snug mb-2 line-clamp-2 min-h-[2.5rem]">
          {product.product_name}
        </h3>

        {/* Pricing */}
        <div className="flex items-center gap-2 mb-3">
          {discount ? (
            <>
              <span className="text-sm text-gray-400 line-through">৳{product.price_bdt}</span>
              <span className="text-base font-bold text-pink-600">৳{discountedPrice}</span>
            </>
          ) : (
            <span className="text-base font-bold text-pink-600">৳{product.price_bdt}</span>
          )}
        </div>

        {/* Add to Cart Button */}
        <button 
          onClick={() => onAddToCart?.(product)}
          className={`mt-auto w-full py-2 px-4 rounded-full border-2 border-dashed border-pink-400 text-pink-500 text-sm font-medium transition-all duration-300 hover:bg-pink-500 hover:text-white hover:border-pink-500 ${
            isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 pointer-events-none lg:opacity-0"
          }`}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

// ─── Main Component ──────────────────────────────────────────────────
interface PopularPicksProps {
  products: Product[];
  onAddToCart?: (product: Product) => void;
  onViewDetails?: (product: Product) => void;
  cartItemCount?: number;
}

export default function PopularPicks({ products, onAddToCart, onViewDetails }: PopularPicksProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [itemsPerView, setItemsPerView] = useState(5);
  const sliderRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef(0);

  // Responsive items per view
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) setItemsPerView(1);
      else if (window.innerWidth < 768) setItemsPerView(2);
      else if (window.innerWidth < 1024) setItemsPerView(3);
      else setItemsPerView(5);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const maxIndex = Math.max(0, products.length - itemsPerView);

  const goNext = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, maxIndex));
  };

  const goPrev = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

  // Touch swipe support
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) goNext();
      else goPrev();
    }
  };

  return (
    <section className="relative w-full py-12 overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-pink-50 via-white to-purple-50 pointer-events-none" />

      {/* Decorative Kite */}
      <KiteDecoration />

      {/* Shopping Cart Tab */}
      {/* <CartTab itemCount=""/> */}

      <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold">
            <span className="text-gray-900">Today&apos;s </span>
            <span className="text-pink-500">popular picks</span>
          </h2>
        </div>

        {/* Carousel Container */}
        <div className="relative px-8 sm:px-12">
          {/* Navigation Arrows */}
          <SketchArrow direction="left" onClick={goPrev} />
          <SketchArrow direction="right" onClick={goNext} />

          {/* Slider Track */}
          <div
            ref={sliderRef}
            className="overflow-hidden"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <div
              className="flex transition-transform duration-500 ease-out will-change-transform"
              style={{ transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)` }}
            >
              {products.map((product, index) => (
                <ProductCard
                  key={product._id || `${product.id}-${index}`}
                  product={product}
                  index={index}
                  isHovered={hoveredIndex === index}
                  onHover={setHoveredIndex}
                  onAddToCart={onAddToCart}
                  onViewDetails={onViewDetails}
                />
              ))}
            </div>
          </div>

          {/* Pagination Dots */}
          <div className="flex justify-center gap-2 mt-6">
            {Array.from({ length: maxIndex + 1 }).map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  i === currentIndex
                    ? "bg-pink-500 w-6"
                    : "bg-gray-300 hover:bg-pink-300"
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}




// "use client";

// import React, { useState, useRef, useEffect } from "react";
// import Image from "next/image";

// // ─── Types ─────────────────────────────────────────────────────────
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

// interface ProductCardProps {
//   product: Product;
//   index: number;
//   isHovered: boolean;
//   onHover: (index: number | null) => void;
// }

// // ─── Mock Data Helpers ───────────────────────────────────────────────
// // Since the original data doesn't have categories, ratings, or discounts,
// // we generate deterministic mock values based on product id.

// const CATEGORIES = [
//   "Doll", "Toy", "Music", "Bath", "Plush", "Car", "Educational", "Art"
// ];

// const getCategory = (id: number): string => CATEGORIES[id % CATEGORIES.length];

// const getDiscount = (id: number): number | null => {
//   // Cards 2 and 3 (indices 1 and 2) get discounts
//   if (id === 2 || id === 3) return 6;
//   return null;
// };

// const getDiscountedPrice = (price: number, discount: number | null): number => {
//   if (!discount) return price;
//   return Math.round(price * (1 - discount / 100));
// };

// const getRating = (id: number): number => {
//   // Deterministic ratings between 4.2 and 5.0
//   return 4.2 + ((id * 37) % 9) / 10;
// };

// const getReviewCount = (id: number): number => {
//   return 12 + (id * 73) % 200;
// };

// // ─── Icons ───────────────────────────────────────────────────────────
// const StarIcon = ({ filled, half }: { filled: boolean; half?: boolean }) => (
//   <svg
//     width="14"
//     height="14"
//     viewBox="0 0 24 24"
//     fill={filled ? "#fbbf24" : "none"}
//     stroke={filled ? "#fbbf24" : "#d1d5db"}
//     strokeWidth="1.5"
//     className="inline-block"
//   >
//     <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
//     {half && (
//       <defs>
//         <clipPath id="half">
//           <rect x="0" y="0" width="12" height="24" />
//         </clipPath>
//       </defs>
//     )}
//   </svg>
// );

// const StarRating = ({ rating, reviewCount }: { rating: number; reviewCount: number }) => {
//   const stars = [];
//   for (let i = 1; i <= 5; i++) {
//     if (i <= Math.floor(rating)) {
//       stars.push(<StarIcon key={i} filled />);
//     } else if (i === Math.ceil(rating) && rating % 1 !== 0) {
//       stars.push(<StarIcon key={i} filled half />);
//     } else {
//       stars.push(<StarIcon key={i} filled={false} />);
//     }
//   }
//   return (
//     <div className="flex items-center gap-1">
//       <div className="flex">{stars}</div>
//       <span className="text-xs text-gray-400">({reviewCount})</span>
//     </div>
//   );
// };

// const EyeIcon = () => (
//   <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//     <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
//     <circle cx="12" cy="12" r="3" />
//   </svg>
// );

// const HeartIcon = () => (
//   <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//     <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
//   </svg>
// );

// // ─── Sketchy Arrow Button ────────────────────────────────────────────
// const SketchArrow = ({ direction, onClick }: { direction: "left" | "right"; onClick: () => void }) => {
//   const path = direction === "left"
//     ? "M20 5 L5 50 L20 95"
//     : "M5 5 L20 50 L5 95";

//   return (
//     <button
//       onClick={onClick}
//       className="absolute top-1/2 -translate-y-1/2 z-20 w-12 h-24 flex items-center justify-center group transition-transform hover:scale-105 active:scale-95"
//       style={{ [direction]: "-20px" }}
//       aria-label={direction === "left" ? "Previous" : "Next"}
//     >
//       <svg width="28" height="100" viewBox="0 0 25 100" fill="none" className="opacity-70 group-hover:opacity-100 transition-opacity">
//         <path
//           d={path}
//           stroke="#4a4a4a"
//           strokeWidth="2.5"
//           strokeLinecap="round"
//           strokeLinejoin="round"
//           style={{ filter: "url(#sketch)" }}
//         />
//         <defs>
//           <filter id="sketch">
//             <feTurbulence type="fractalNoise" baseFrequency="0.02" numOctaves="3" result="noise" />
//             <feDisplacementMap in="SourceGraphic" in2="noise" scale="2" />
//           </filter>
//         </defs>
//       </svg>
//     </button>
//   );
// };

// // ─── Kite Decoration ─────────────────────────────────────────────────
// const KiteDecoration = () => (
//   <div className="absolute -left-4 top-8 z-10 hidden lg:block pointer-events-none">
//     <svg width="80" height="120" viewBox="0 0 80 120" fill="none" className="opacity-80">
//       {/* Kite body */}
//       <path d="M40 10 L70 50 L40 90 L10 50 Z" fill="#f472b6" stroke="#db2777" strokeWidth="2" />
//       <path d="M40 10 L40 90" stroke="#db2777" strokeWidth="1.5" />
//       <path d="M10 50 L70 50" stroke="#db2777" strokeWidth="1.5" />
//       {/* Kite tail */}
//       <path d="M40 90 Q30 100 35 110 Q40 120 38 130" stroke="#f472b6" strokeWidth="2" fill="none" strokeDasharray="4 3" />
//       {/* Bow on tail */}
//       <path d="M32 105 L42 105 M37 100 L37 110" stroke="#f472b6" strokeWidth="2" />
//       {/* String */}
//       <path d="M40 10 Q60 -10 80 -5" stroke="#94a3b8" strokeWidth="1" fill="none" strokeDasharray="3 2" />
//     </svg>
//   </div>
// );

// // ─── Shopping Cart Tab ─────────────────────────────────────────────
// const CartTab = ({ itemCount }: { itemCount: number }) => (
//   <div className="fixed right-0 top-1/2 -translate-y-1/2 z-50">
//     <div className="bg-pink-500 text-white rounded-l-2xl py-3 px-2 shadow-lg flex flex-col items-center gap-1 cursor-pointer hover:bg-pink-600 transition-colors">
//       <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//         <circle cx="9" cy="21" r="1" />
//         <circle cx="20" cy="21" r="1" />
//         <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
//       </svg>
//       <span className="text-xs font-bold">{itemCount} Item</span>
//       <span className="text-[10px] opacity-80">Cart</span>
//     </div>
//   </div>
// );

// // ─── Product Card ────────────────────────────────────────────────────
// const ProductCard = ({ product, index, isHovered, onHover }: ProductCardProps) => {
//   const category = getCategory(product.id);
//   const discount = getDiscount(product.id);
//   const discountedPrice = getDiscountedPrice(product.price_bdt, discount);
//   const rating = getRating(product.id);
//   const reviewCount = getReviewCount(product.id);

//   return (
//     <div
//       className="relative flex-shrink-0 w-full sm:w-1/2 md:w-1/3 lg:w-1/5 px-2"
//       onMouseEnter={() => onHover(index)}
//       onMouseLeave={() => onHover(null)}
//     >
//       <div className="bg-white rounded-xl border border-gray-100 p-4 h-full flex flex-col items-center text-center transition-all duration-300 hover:shadow-lg hover:border-pink-200 relative group/card">

//         {/* Discount Badge */}
//         {discount && (
//           <div className="absolute top-3 left-3 bg-emerald-500 text-white text-[10px] font-bold px-2 py-1 rounded-md shadow-sm z-10">
//             {discount}% Off
//           </div>
//         )}

//         {/* Product Image Container */}
//         <div className="relative w-full aspect-square mb-3 flex items-center justify-center">
//           <Image
//             src={product.product_image}
//             alt={product.product_name}
//             width={200}
//             height={200}
//             className="object-contain w-full h-full"
//           />

//           {/* Hover Action Icons */}
//           <div className={`absolute right-1 top-1/2 -translate-y-1/2 flex flex-col gap-2 transition-all duration-300 ${isHovered ? "opacity-100 translate-x-0" : "opacity-0 translate-x-2"}`}>
//             <button className="w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center text-gray-600 hover:text-pink-500 hover:bg-pink-50 transition-colors">
//               <EyeIcon />
//             </button>
//             <button className="w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center text-gray-600 hover:text-pink-500 hover:bg-pink-50 transition-colors">
//               <HeartIcon />
//             </button>
//           </div>
//         </div>

//         {/* Category */}
//         <span className="text-[11px] text-sky-400 uppercase tracking-wider font-medium mb-1">
//           {category}
//         </span>

//         {/* Rating */}
//         <div className="mb-2">
//           <StarRating rating={rating} reviewCount={reviewCount} />
//         </div>

//         {/* Title */}
//         <h3 className="text-sm font-semibold text-gray-800 leading-snug mb-2 line-clamp-2 min-h-[2.5rem]">
//           {product.product_name}
//         </h3>

//         {/* Pricing */}
//         <div className="flex items-center gap-2 mb-3">
//           {discount ? (
//             <>
//               <span className="text-sm text-gray-400 line-through">৳{product.price_bdt}</span>
//               <span className="text-base font-bold text-pink-600">৳{discountedPrice}</span>
//             </>
//           ) : (
//             <span className="text-base font-bold text-pink-600">৳{product.price_bdt}</span>
//           )}
//         </div>

//         {/* Add to Cart Button */}
//         <button 
//           className={`mt-auto w-full py-2 px-4 rounded-full border-2 border-dashed border-pink-400 text-pink-500 text-sm font-medium transition-all duration-300 hover:bg-pink-500 hover:text-white hover:border-pink-500 ${
//             isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 pointer-events-none lg:opacity-0"
//           }`}
//         >
//           Add to Cart
//         </button>
//       </div>
//     </div>
//   );
// };

// // ─── Main Component ──────────────────────────────────────────────────
// interface PopularPicksProps {
//   products: Product[];
//   onAddToCart?: (product: Product) => void;
//   cartItemCount?: number;
// }

// export default function PopularPicks({ products, onAddToCart }: PopularPicksProps) {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
//   const [itemsPerView, setItemsPerView] = useState(5);
//   const sliderRef = useRef<HTMLDivElement>(null);
//   const touchStartX = useRef(0);

//   // Responsive items per view
//   useEffect(() => {
//     const handleResize = () => {
//       if (window.innerWidth < 640) setItemsPerView(1);
//       else if (window.innerWidth < 768) setItemsPerView(2);
//       else if (window.innerWidth < 1024) setItemsPerView(3);
//       else setItemsPerView(5);
//     };
//     handleResize();
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   const maxIndex = Math.max(0, products.length - itemsPerView);

//   const goNext = () => {
//     setCurrentIndex((prev) => Math.min(prev + 1, maxIndex));
//   };

//   const goPrev = () => {
//     setCurrentIndex((prev) => Math.max(prev - 1, 0));
//   };

//   // Touch swipe support
//   const handleTouchStart = (e: React.TouchEvent) => {
//     touchStartX.current = e.touches[0].clientX;
//   };

//   const handleTouchEnd = (e: React.TouchEvent) => {
//     const diff = touchStartX.current - e.changedTouches[0].clientX;
//     if (Math.abs(diff) > 50) {
//       if (diff > 0) goNext();
//       else goPrev();
//     }
//   };

//   return (
//     <section className="relative w-full py-12 overflow-hidden">
//       {/* Background Gradient */}
//       <div className="absolute inset-0 bg-gradient-to-r from-pink-50 via-white to-purple-50 pointer-events-none" />

//       {/* Decorative Kite */}
//       <KiteDecoration />

//       {/* Shopping Cart Tab */}
//       {/* <CartTab itemCount=""/> */}

//       <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Section Title */}
//         <div className="text-center mb-10">
//           <h2 className="text-2xl sm:text-3xl font-bold">
//             <span className="text-gray-900">Today&apos;s </span>
//             <span className="text-pink-500">popular picks</span>
//           </h2>
//         </div>

//         {/* Carousel Container */}
//         <div className="relative px-8 sm:px-12">
//           {/* Navigation Arrows */}
//           <SketchArrow direction="left" onClick={goPrev} />
//           <SketchArrow direction="right" onClick={goNext} />

//           {/* Slider Track */}
//           <div
//             ref={sliderRef}
//             className="overflow-hidden"
//             onTouchStart={handleTouchStart}
//             onTouchEnd={handleTouchEnd}
//           >
//             <div
//               className="flex transition-transform duration-500 ease-out will-change-transform"
//               style={{ transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)` }}
//             >
//               {products.map((product, index) => (
//                 <ProductCard
//                   key={product.id}
//                   product={product}
//                   index={index}
//                   isHovered={hoveredIndex === index}
//                   onHover={setHoveredIndex}
//                 />
//               ))}
//             </div>
//           </div>

//           {/* Pagination Dots */}
//           <div className="flex justify-center gap-2 mt-6">
//             {Array.from({ length: maxIndex + 1 }).map((_, i) => (
//               <button
//                 key={i}
//                 onClick={() => setCurrentIndex(i)}
//                 className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
//                   i === currentIndex
//                     ? "bg-pink-500 w-6"
//                     : "bg-gray-300 hover:bg-pink-300"
//                 }`}
//                 aria-label={`Go to slide ${i + 1}`}
//               />
//             ))}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }