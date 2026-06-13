"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";

// ═══════════════════════════════════════════════════════════════════
//  TYPES
// ═══════════════════════════════════════════════════════════════════

export interface TestimonialData {
  id: number;
  reviewerName: string;
  reviewDate: string;
  rating: number;
  reviewText: string;
  avatarUrl: string;
  productName: string;
  productPrice: number;
  productImage?: string;
}

export interface MarqueeItem {
  id: number;
  text: string;
}

// ═══════════════════════════════════════════════════════════════════
//  MOCK DATA
// ═══════════════════════════════════════════════════════════════════

export const TESTIMONIALS: TestimonialData[] = [
  {
    id: 1,
    reviewerName: "Kenneth R. Myers",
    reviewDate: "Oct 12, 2025",
    rating: 4.7,
    reviewText: "Absolutely wonderful purchase! My daughter plays with this doll every single day. The rotating feature and music are delightful. Quality exceeded my expectations for the price.",
    avatarUrl: "/avatars/kenneth.jpg",
    productName: "Creation Rotating and Musical Doll with 3D",
    productPrice: 1200,
    productImage: "/products/doll1.jpg",
  },
  {
    id: 2,
    reviewerName: "Sarah J. Thompson",
    reviewDate: "Nov 03, 2025",
    rating: 5.0,
    reviewText: "Best educational toy I've bought this year. The magnetic fishing set keeps my twins engaged for hours. Montessori approach really shows in the thoughtful design.",
    avatarUrl: "/avatars/sarah.jpg",
    productName: "Magnetic Suction Fishing Toys - Montessori",
    productPrice: 550,
    productImage: "/products/fishing.jpg",
  },
  {
    id: 3,
    reviewerName: "Mohammad Ali Rahman",
    reviewDate: "Sep 28, 2025",
    rating: 4.5,
    reviewText: "The inertia car set is incredibly durable. My son has dropped it countless times and it still works perfectly. Great value for money, highly recommend!",
    avatarUrl: "/avatars/mohammad.jpg",
    productName: "Children's Inertia Car Toy Suit - Mini",
    productPrice: 150,
    productImage: "/products/car1.jpg",
  },
  {
    id: 4,
    reviewerName: "Emily Chen",
    reviewDate: "Dec 01, 2025",
    rating: 4.8,
    reviewText: "The Minions plush collection is adorable! Soft, well-stitched, and exactly as described. Bought all three characters and my kids sleep with them every night.",
    avatarUrl: "/avatars/emily.jpg",
    productName: "Minions Plush Toy (Bob, Stuart, Kevin)",
    productPrice: 600,
    productImage: "/products/minions.jpg",
  },
  {
    id: 5,
    reviewerName: "David O'Brien",
    reviewDate: "Oct 20, 2025",
    rating: 4.2,
    reviewText: "Fun little balloon car! The aerodynamic sliding mechanism is clever and entertaining. My nephew loves watching it zoom across the room. Simple but effective toy.",
    avatarUrl: "/avatars/david.jpg",
    productName: "Tiktok Hot Pig Power Air Balloon Car",
    productPrice: 750,
    productImage: "/products/balloon.jpg",
  },
  {
    id: 6,
    reviewerName: "Ayesha Khan",
    reviewDate: "Nov 15, 2025",
    rating: 4.9,
    reviewText: "The Sanrio plush handbag is the cutest thing ever! My daughter takes it everywhere. The coin purse is a nice bonus. Excellent stitching and vibrant colors.",
    avatarUrl: "/avatars/ayesha.jpg",
    productName: "Cartoon Sanrio Plush Handbag & Coin Purse",
    productPrice: 250,
    productImage: "/products/sanrio.jpg",
  },
];

export const MARQUEE_ITEMS: MarqueeItem[] = [
  { id: 1, text: "Puzzles" },
  { id: 2, text: "Cubes" },
  { id: 3, text: "Toy Car" },
  { id: 4, text: "Girls Doll" },
  { id: 5, text: "Balloons" },
  { id: 6, text: "Color Plate" },
  { id: 7, text: "Plush Toys" },
  { id: 8, text: "Educational" },
  { id: 9, text: "Wooden Blocks" },
  { id: 10, text: "Story Machine" },
  { id: 11, text: "Art & Craft" },
  { id: 12, text: "Musical Toys" },
];

// ═══════════════════════════════════════════════════════════════════
//  ICONS
// ═══════════════════════════════════════════════════════════════════

const StarIcon = ({ filled, size = 14 }: { filled: boolean; size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={filled ? "#fbbf24" : "none"} stroke={filled ? "#fbbf24" : "#d1d5db"} strokeWidth="1.5">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);

const StarRating = ({ rating }: { rating: number }) => {
  const fullStars = Math.floor(rating);
  const hasHalf = rating % 1 >= 0.5;
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <StarIcon key={i} filled={i < fullStars || (i === fullStars && hasHalf)} size={14} />
      ))}
      <span className="text-xs text-gray-500 ml-1 font-medium">({rating})</span>
    </div>
  );
};

const DiamondIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="#ec4899" className="flex-shrink-0 mx-4">
    <path d="M12 2L2 12l10 10 10-10L12 2z" />
  </svg>
);

// ═══════════════════════════════════════════════════════════════════
//  BALLOON DECORATION
// ═══════════════════════════════════════════════════════════════════

const BalloonDecoration = () => (
  <div className="absolute -left-2 top-1/2 -translate-y-1/2 z-10 hidden xl:block pointer-events-none">
    <svg width="100" height="180" viewBox="0 0 100 180" fill="none" className="opacity-90">
      {/* Balloon body */}
      <ellipse cx="50" cy="45" rx="35" ry="42" fill="#f472b6" stroke="#db2777" strokeWidth="2" />
      {/* Balloon highlight */}
      <ellipse cx="38" cy="30" rx="10" ry="14" fill="white" opacity="0.3" />
      {/* Balloon knot */}
      <polygon points="50,87 44,95 56,95" fill="#f472b6" stroke="#db2777" strokeWidth="1.5" />
      {/* String */}
      <path d="M50 95 Q45 120 52 145 Q48 160 50 180" stroke="#f472b6" strokeWidth="2" fill="none" strokeDasharray="3 2" />
      {/* Small stars around balloon */}
      <path d="M15 25 L17 30 L22 30 L18 33 L20 38 L15 35 L10 38 L12 33 L8 30 L13 30 Z" fill="#fbbf24" opacity="0.8" />
      <path d="M80 20 L82 25 L87 25 L83 28 L85 33 L80 30 L75 33 L77 28 L73 25 L78 25 Z" fill="#fbbf24" opacity="0.8" />
      <circle cx="85" cy="60" r="4" fill="#a78bfa" opacity="0.7" />
      <circle cx="12" cy="70" r="3" fill="#67e8f9" opacity="0.7" />
    </svg>
  </div>
);

// ═══════════════════════════════════════════════════════════════════
//  TESTIMONIAL CARD
// ═══════════════════════════════════════════════════════════════════

function TestimonialCard({ data }: { data: TestimonialData }) {
  return (
    <div className="flex-shrink-0 w-[320px] sm:w-[360px] md:w-[400px] px-3">
      <div className="bg-white rounded-2xl border-2 border-dashed border-pink-200 p-5 h-full flex flex-col transition-all duration-300 hover:shadow-xl hover:border-pink-300 hover:-translate-y-1">

        {/* Header: Name + Date */}
        <div className="mb-2">
          <h4 className="text-sm font-bold text-gray-900">{data.reviewerName}</h4>
          <span className="text-[11px] text-gray-400">{data.reviewDate}</span>
        </div>

        {/* Rating */}
        <div className="mb-3">
          <StarRating rating={data.rating} />
        </div>

        {/* Review Text */}
        <p className="text-sm text-gray-600 leading-relaxed italic mb-4 flex-1">
          &ldquo;{data.reviewText}&rdquo;
        </p>

        {/* Divider */}
        <div className="border-t border-dashed border-pink-200 my-3" />

        {/* Footer: Avatar + Product */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-300 to-purple-300 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 overflow-hidden">
            {data.reviewerName.split(" ").map(n => n[0]).join("")}
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs text-gray-500 truncate">{data.productName}</p>
            <p className="text-sm font-bold text-pink-600">৳{data.productPrice}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
//  INFINITE CAROUSEL (Testimonials)
// ═══════════════════════════════════════════════════════════════════

function InfiniteCarousel({ items }: { items: TestimonialData[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const animationRef = useRef<number>(0);
  const positionRef = useRef(0);

  // Duplicate items for seamless infinite scroll
  const duplicatedItems = [...items, ...items, ...items];

  const animate = useCallback(() => {
    if (!trackRef.current || isPaused) {
      animationRef.current = requestAnimationFrame(animate);
      return;
    }

    positionRef.current -= 0.8; // scroll speed
    const track = trackRef.current;
    const cardWidth = 400; // approximate max card width
    const totalWidth = items.length * cardWidth;

    if (Math.abs(positionRef.current) >= totalWidth) {
      positionRef.current = 0;
    }

    track.style.transform = `translateX(${positionRef.current}px)`;
    animationRef.current = requestAnimationFrame(animate);
  }, [isPaused, items.length]);

  useEffect(() => {
    animationRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationRef.current);
  }, [animate]);

  return (
    <div
      className="relative overflow-hidden py-4"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-pink-50/80 to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-pink-50/80 to-transparent z-10 pointer-events-none" />

      <div
        ref={trackRef}
        className="flex will-change-transform"
        style={{ transform: "translateX(0px)" }}
      >
        {duplicatedItems.map((item, index) => (
          <TestimonialCard key={`${item.id}-${index}`} data={item} />
        ))}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
//  WAVY MARQUEE BANNER
// ═══════════════════════════════════════════════════════════════════

function WavyMarquee({ items }: { items: MarqueeItem[] }) {
  const duplicated = [...items, ...items, ...items, ...items];

  return (
    <div className="relative w-full overflow-hidden py-8">
      {/* Wavy container using clip-path */}
      <div
        className="relative bg-pink-500 py-5"
        style={{
          clipPath: "polygon(0% 15%, 3% 10%, 6% 15%, 9% 8%, 12% 15%, 15% 10%, 18% 15%, 21% 8%, 24% 15%, 27% 10%, 30% 15%, 33% 8%, 36% 15%, 39% 10%, 42% 15%, 45% 8%, 48% 15%, 51% 10%, 54% 15%, 57% 8%, 60% 15%, 63% 10%, 66% 15%, 69% 8%, 72% 15%, 75% 10%, 78% 15%, 81% 8%, 84% 15%, 87% 10%, 90% 15%, 93% 8%, 96% 15%, 100% 10%, 100% 85%, 97% 90%, 94% 85%, 91% 92%, 88% 85%, 85% 90%, 82% 85%, 79% 92%, 76% 85%, 73% 90%, 70% 85%, 67% 92%, 64% 85%, 61% 90%, 58% 85%, 55% 92%, 52% 85%, 49% 90%, 46% 85%, 43% 92%, 40% 85%, 37% 90%, 34% 85%, 31% 92%, 28% 85%, 25% 90%, 22% 85%, 19% 92%, 16% 85%, 13% 90%, 10% 85%, 7% 92%, 4% 85%, 1% 90%, 0% 85%)",
        }}
      >
        {/* Inner wavy track */}
        <div className="flex animate-marquee whitespace-nowrap">
          {duplicated.map((item, index) => (
            <React.Fragment key={`${item.id}-${index}`}>
              <span className="text-white font-bold text-sm sm:text-base md:text-lg tracking-wide uppercase mx-1">
                {item.text}
              </span>
              <DiamondIcon />
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
//  MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════════

interface TestimonialsSectionProps {
  testimonials?: TestimonialData[];
  marqueeItems?: MarqueeItem[];
}

export default function TestimonialsSection({
  testimonials = TESTIMONIALS,
  marqueeItems = MARQUEE_ITEMS,
}: TestimonialsSectionProps) {
  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-b from-pink-50 via-white to-pink-50/30">
      {/* ═══════════════════════════════════════════════ */}
      {/*  BACKGROUND "Testimonials" TEXT               */}
      {/* ═══════════════════════════════════════════════ */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <h2
          className="text-[8rem] sm:text-[12rem] md:text-[16rem] lg:text-[20rem] font-black tracking-tighter select-none"
          style={{
            WebkitTextStroke: "2px rgba(236, 72, 153, 0.08)",
            color: "transparent",
          }}
        >
          Testimonials
        </h2>
      </div>

      {/* Balloon Decoration */}
      <BalloonDecoration />

      {/* ═══════════════════════════════════════════════ */}
      {/*  TESTIMONIAL CAROUSEL SECTION                  */}
      {/* ═══════════════════════════════════════════════ */}
      <div className="relative z-10 pt-16 pb-8">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Title */}
          <div className="text-center mb-10">
            <span className="text-xs text-pink-500 font-semibold uppercase tracking-widest mb-2 block">
              What Parents Say
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
              Happy <span className="text-pink-500">Customers</span>
            </h2>
          </div>

          {/* Infinite Scrolling Carousel */}
          <InfiniteCarousel items={testimonials} />
        </div>
      </div>

      {/* ═══════════════════════════════════════════════ */}
      {/*  WAVY MARQUEE BANNER                          */}
      {/* ═══════════════════════════════════════════════ */}
      <div className="relative z-10 pb-8 rotate-[-8deg] h-60">
        <WavyMarquee items={marqueeItems} />
      </div>
    </section>
  );
}