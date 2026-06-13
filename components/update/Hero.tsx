"use client";

import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";

export default function UpdateHero() {
  return (
    <section className="relative w-full min-h-[640px] md:min-h-[750px] lg:min-h-[850px] overflow-hidden flex items-center py-12 lg:py-24 bg-white select-none">

      {/* Background Yellow Wavy/Cloud Shape (Inline High-Quality Responsive SVG Backdrop) */}
      <div className="absolute inset-0 z-0 pointer-events-none w-full h-full flex items-center justify-center">
        <svg
          viewBox="0 0 1440 850"
          className="absolute top-0 left-0 w-full h-full object-cover text-[#FFEAA7]/40 fill-current opacity-95 transition-all duration-300"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Cloud/Wave Backdrop with smooth linear gradient */}
          <defs>
            <linearGradient id="waveBgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFCF79" />
              <stop offset="60%" stopColor="#ffe0a8ff" />
              <stop offset="100%" stopColor="#fff2c8ff" stopOpacity="0.85" />
            </linearGradient>
          </defs>
          <path
            fill="url(#waveBgGrad)"
            d="M 0,0 
               L 1440,0 
               L 1440,650 
               Q 1300,750 1150,700 
               Q 1000,650 850,720 
               Q 700,790 550,710 
               Q 400,630 250,700 
               Q 100,770 0,650 Z"
          />
        </svg>
      </div>

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">

          {/* LEFT COLUMN: Circular Girl Portrait & Playful Floating Vector Graphics */}
          <div className="col-span-1 lg:col-span-6 flex justify-center relative">

            {/* Visual Wrapper for positioning decorations */}
            <div className="relative w-72 h-72 sm:w-[400px] sm:h-[400px] md:w-[450px] md:h-[450px] flex items-center justify-center">

              {/* Decorative background sunburst/halo */}
              <div className="absolute inset-0 bg-gradient-to-tr from-pink-200/40 via-yellow-100/60 to-purple-200/30 rounded-full blur-2xl -z-10 scale-95" />

              {/* Main Image: Circular-cropped smiling girl with a thick white border */}
              <div className="w-full h-full rounded-full border-[10px] sm:border-[16px] border-white shadow-2xl overflow-hidden relative transition-all duration-500 hover:scale-[1.02] hover:shadow-pink-100">
                <Image
                  src="/image/girl_with_teddy.png"
                  alt="Smiling girl holding a teddy bear and gift box"
                  fill
                  priority
                  className="object-cover scale-[1.05] object-center transition-transform duration-500 hover:scale-[1.1]"
                />
              </div>

              {/* ----------------- FLOATING DECORATIONS ----------------- */}

              {/* Floating Star 1 (Pink) */}
              <div className="absolute top-4 left-4 sm:top-8 sm:left-8 animate-float-slow text-pink-400 drop-shadow-md">
                <Star size={36} className="fill-current rotate-12 stroke-pink-500 stroke-2" />
              </div>

              {/* Floating Star 2 (Yellow) */}
              <div className="absolute bottom-16 -left-4 sm:bottom-24 sm:-left-8 animate-float-medium text-yellow-400 drop-shadow-md">
                <Star size={24} className="fill-current -rotate-12 stroke-yellow-500 stroke-2" />
              </div>

              {/* Floating Star 3 (Purple) */}
              <div className="absolute top-1/2 -right-8 animate-float-fast text-purple-400 drop-shadow-md">
                <Star size={20} className="fill-current rotate-45 stroke-purple-500 stroke-2" />
              </div>

              {/* Floating Toy Car (Tilting animation) */}
              <div className="absolute -bottom-6 left-8 sm:bottom-0 sm:left-12 animate-float-car">
                <svg viewBox="0 0 100 60" className="w-16 h-11 select-none pointer-events-none drop-shadow-lg">
                  <path d="M 10 35 L 15 20 Q 25 10 40 10 L 65 10 Q 75 10 80 20 L 90 35 Q 95 38 95 42 L 95 48 C 95 50 90 50 85 50 L 75 50 C 75 42 65 42 65 50 L 35 50 C 35 42 25 42 25 50 L 15 50 C 10 50 5 50 5 45 C 5 38 7 35 10 35 Z" fill="#3ABEF9" />
                  <path d="M 22 22 L 35 22 L 35 15 L 26 15 Q 22 15 22 22 Z" fill="#FFFFFF" opacity="0.6" />
                  <path d="M 40 22 L 55 22 L 55 15 L 40 15 Z" fill="#FFFFFF" opacity="0.6" />
                  <path d="M 60 22 L 72 22 L 68 15 L 60 15 Z" fill="#FFFFFF" opacity="0.6" />
                  <circle cx="30" cy="50" r="10" fill="#333333" />
                  <circle cx="30" cy="50" r="4" fill="#FFFFFF" />
                  <circle cx="70" cy="50" r="10" fill="#333333" />
                  <circle cx="70" cy="50" r="4" fill="#FFFFFF" />
                </svg>
              </div>

              {/* Floating Butterfly (Flapping wings animation) */}
              <div className="absolute top-2 -right-2 sm:top-6 sm:right-6 animate-float-butterfly">
                <svg viewBox="0 0 60 60" className="w-14 h-14 select-none pointer-events-none drop-shadow-lg">
                  {/* Left wings */}
                  <path d="M 30 30 Q 10 10 15 5 Q 30 5 30 30 Z" fill="#FF4E88" />
                  <path d="M 30 30 Q 5 40 10 45 Q 25 45 30 30 Z" fill="#FF8E9F" />
                  {/* Right wings */}
                  <path d="M 30 30 Q 50 10 45 5 Q 30 5 30 30 Z" fill="#FF4E88" />
                  <path d="M 30 30 Q 55 40 50 45 Q 35 45 30 30 Z" fill="#FF8E9F" />
                  {/* Body */}
                  <rect x="28" y="10" width="4" height="35" rx="2" fill="#555555" />
                  <circle cx="30" cy="8" r="3" fill="#555555" />
                </svg>
              </div>

              {/* Floating Bee (Buzzing hover animation) */}
              <div className="absolute -bottom-8 right-6 sm:-bottom-4 sm:right-16 animate-float-bee">
                <svg viewBox="0 0 60 50" className="w-13 h-11 select-none pointer-events-none drop-shadow-lg">
                  {/* Wings */}
                  <ellipse cx="25" cy="15" rx="8" ry="12" fill="#E0F7FA" opacity="0.75" transform="rotate(-30 25 15)" />
                  <ellipse cx="35" cy="15" rx="8" ry="12" fill="#E0F7FA" opacity="0.75" transform="rotate(30 35 15)" />
                  {/* Body */}
                  <ellipse cx="30" cy="30" rx="20" ry="15" fill="#FFDE4D" />
                  {/* Stripes */}
                  <path d="M 22 16 Q 25 30 22 44 L 28 44 Q 31 30 28 16 Z" fill="#333333" />
                  <path d="M 32 16 Q 35 30 32 44 L 38 44 Q 41 30 38 16 Z" fill="#333333" />
                  {/* Eye */}
                  <circle cx="42" cy="26" r="2.5" fill="#333333" />
                  {/* Smile */}
                  <path d="M 43 32 Q 46 34 48 31" stroke="#333333" strokeWidth="1.5" strokeLinecap="round" fill="none" />
                </svg>
              </div>

            </div>
          </div>

          {/* RIGHT COLUMN: Headlines, Subtitles & Custom Action Button */}
          <div className="col-span-1 lg:col-span-6 text-center lg:text-left flex flex-col items-center lg:items-start relative z-10 px-4">

            {/* Playful Tag */}
            <span className="inline-block px-4 py-1.5 bg-pink-100 text-pink-600 rounded-full text-xs font-black tracking-widest uppercase mb-4 shadow-sm animate-pulse">
              Welcome to kiddvant
            </span>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl xl:text-6xl font-black text-blue-900 leading-[1.1] mb-6 tracking-tight filter drop-shadow-xs max-w-lg">
              The Best Kids <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-pink-600">Toy Store</span> in the City
            </h1>

            {/* Pricing Section */}
            <div className="flex items-center gap-3 mb-8 bg-white/70 backdrop-blur-xs px-5 py-2.5 rounded-2xl border border-yellow-200/50 shadow-sm">
              <span className="text-gray-500 font-sans text-sm font-semibold tracking-wide">
                Special Pricing:
              </span>
              <span className="text-2xl font-black text-pink-600 font-sans tracking-tight">
                From <span className="text-3xl font-black text-red-500 underline decoration-pink-300 underline-offset-4">৳50</span>
              </span>
            </div>

            {/* Action Button: Rounded white with pink border and fill transitions */}
            <div className="flex flex-col sm:flex-row gap-4 items-center">
              <Link
                href="/products"
                className="group relative px-10 py-4 bg-white border-2 border-pink-500 text-pink-500 hover:text-white font-sans font-bold text-base tracking-wider rounded-full shadow-lg transition-all duration-300 hover:scale-105 active:scale-95 overflow-hidden flex items-center justify-center"
              >
                {/* Background Fill Transition */}
                <span className="absolute inset-0 w-0 h-full bg-pink-500 transition-all duration-300 group-hover:w-full -z-10" />
                View Shop
              </Link> 
            </div>

          </div>

        </div>
      </div>

      {/* Floating Sparkles & Animations CSS */}
      <style>{`
        @keyframes floatSlow {
          0%, 100% { transform: translateY(0px) rotate(12deg); }
          50% { transform: translateY(-12px) rotate(18deg); }
        }
        @keyframes floatMedium {
          0%, 100% { transform: translateY(0px) rotate(-12deg); }
          50% { transform: translateY(-15px) rotate(-8deg); }
        }
        @keyframes floatFast {
          0%, 100% { transform: translateY(0px) rotate(45deg); }
          50% { transform: translateY(-8px) rotate(35deg); }
        }
        @keyframes floatCar {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-8px) rotate(-3deg); }
        }
        @keyframes floatButterfly {
          0%, 100% { transform: translate(0, 0) scaleX(1); }
          25% { transform: translate(-3px, -8px) scaleX(0.7); }
          50% { transform: translate(0, -14px) scaleX(1); }
          75% { transform: translate(3px, -8px) scaleX(0.7); }
        }
        @keyframes floatBee {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(5px, -10px) rotate(2deg); }
        }

        .animate-float-slow {
          animation: floatSlow 6s ease-in-out infinite;
        }
        .animate-float-medium {
          animation: floatMedium 5s ease-in-out infinite;
        }
        .animate-float-fast {
          animation: floatFast 4s ease-in-out infinite;
        }
        .animate-float-car {
          animation: floatCar 6.5s ease-in-out infinite;
        }
        .animate-float-butterfly {
          animation: floatButterfly 4.5s ease-in-out infinite;
        }
        .animate-float-bee {
          animation: floatBee 3.5s ease-in-out infinite;
        }
      `}</style>

    </section>
  );
}
