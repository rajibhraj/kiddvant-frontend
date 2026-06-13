"use client";

import { useEffect, useRef } from "react";

const AGE_GROUPS = [
  {
    label: "0–12 months",
    color: "#F4A0B0",
    bgColor: "bg-[#F4A0B0]",
    illustration: (
      // Newborn swaddled baby
      <svg
        viewBox="0 0 120 140"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        {/* Head */}
        <ellipse
          cx="60"
          cy="38"
          rx="22"
          ry="22"
          stroke="#F4A0B0"
          strokeWidth="2.5"
          fill="none"
        />
        {/* Face */}
        <circle cx="53" cy="36" r="2.5" fill="#F4A0B0" />
        <circle cx="67" cy="36" r="2.5" fill="#F4A0B0" />
        <path
          d="M54 45 Q60 50 66 45"
          stroke="#F4A0B0"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
        />
        {/* Swaddle body */}
        <ellipse
          cx="60"
          cy="95"
          rx="28"
          ry="35"
          stroke="#F4A0B0"
          strokeWidth="2.5"
          fill="none"
        />
        {/* Swaddle wrap lines */}
        <path
          d="M38 78 Q60 68 82 78"
          stroke="#F4A0B0"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M36 90 Q60 80 84 90"
          stroke="#F4A0B0"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
        />
        {/* Little hand peeking */}
        <path
          d="M82 85 Q90 80 88 90"
          stroke="#F4A0B0"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    label: "1–2 years",
    color: "#F5C842",
    bgColor: "bg-[#F5C842]",
    illustration: (
      // Sitting baby with toy
      <svg
        viewBox="0 0 120 140"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        {/* Head */}
        <circle
          cx="60"
          cy="35"
          r="23"
          stroke="#F5C842"
          strokeWidth="2.5"
          fill="none"
        />
        {/* Ears */}
        <path
          d="M37 33 Q30 38 37 43"
          stroke="#F5C842"
          strokeWidth="2"
          fill="none"
        />
        <path
          d="M83 33 Q90 38 83 43"
          stroke="#F5C842"
          strokeWidth="2"
          fill="none"
        />
        {/* Eyes */}
        <circle cx="52" cy="33" r="2.5" fill="#F5C842" />
        <circle cx="68" cy="33" r="2.5" fill="#F5C842" />
        {/* Smile */}
        <path
          d="M53 44 Q60 50 67 44"
          stroke="#F5C842"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
        />
        {/* Chubby body sitting */}
        <path
          d="M42 60 Q38 95 40 115 Q60 120 80 115 Q82 95 78 60 Q60 55 42 60Z"
          stroke="#F5C842"
          strokeWidth="2.5"
          fill="none"
        />
        {/* Legs spread */}
        <path
          d="M42 108 Q30 118 28 130"
          stroke="#F5C842"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M78 108 Q90 118 92 130"
          stroke="#F5C842"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
        />
        {/* Arms holding toy */}
        <path
          d="M42 68 Q30 78 32 88"
          stroke="#F5C842"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M78 68 Q90 78 88 88"
          stroke="#F5C842"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
        />
        {/* Toy block */}
        <rect
          x="46"
          y="118"
          width="28"
          height="18"
          rx="3"
          stroke="#F5C842"
          strokeWidth="2"
          fill="none"
        />
        <path
          d="M46 118 L60 110 L74 118"
          stroke="#F5C842"
          strokeWidth="2"
          fill="none"
        />
      </svg>
    ),
  },
  {
    label: "2–3 years",
    color: "#5BC4E8",
    bgColor: "bg-[#5BC4E8]",
    illustration: (
      // Toddler standing / walking with block
      <svg
        viewBox="0 0 120 140"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        {/* Head */}
        <circle
          cx="60"
          cy="28"
          r="20"
          stroke="#5BC4E8"
          strokeWidth="2.5"
          fill="none"
        />
        {/* Eyes */}
        <circle cx="53" cy="26" r="2.5" fill="#5BC4E8" />
        <circle cx="67" cy="26" r="2.5" fill="#5BC4E8" />
        {/* Smile */}
        <path
          d="M54 35 Q60 41 66 35"
          stroke="#5BC4E8"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
        />
        {/* Neck */}
        <path
          d="M55 48 L55 56 M65 48 L65 56"
          stroke="#5BC4E8"
          strokeWidth="2"
          fill="none"
        />
        {/* Body */}
        <path
          d="M40 58 Q38 88 40 105 Q60 110 80 105 Q82 88 80 58 Q60 53 40 58Z"
          stroke="#5BC4E8"
          strokeWidth="2.5"
          fill="none"
        />
        {/* Legs */}
        <path
          d="M50 105 L48 130"
          stroke="#5BC4E8"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M70 105 L72 130"
          stroke="#5BC4E8"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
        />
        {/* Feet */}
        <path
          d="M44 130 L52 130"
          stroke="#5BC4E8"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M68 130 L76 130"
          stroke="#5BC4E8"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
        />
        {/* Arm reaching down with block */}
        <path
          d="M40 65 Q22 80 26 95"
          stroke="#5BC4E8"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
        />
        {/* Block */}
        <rect
          x="18"
          y="95"
          width="16"
          height="16"
          rx="2"
          stroke="#5BC4E8"
          strokeWidth="2"
          fill="none"
        />
        {/* Other arm */}
        <path
          d="M80 65 Q92 75 88 85"
          stroke="#5BC4E8"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
        />
      </svg>
    ),
  },
  {
    label: "3–5 years",
    color: "#3DBFA8",
    bgColor: "bg-[#3DBFA8]",
    illustration: (
      // Child standing confidently
      <svg
        viewBox="0 0 120 140"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        {/* Hair */}
        <path
          d="M38 28 Q40 10 60 8 Q80 10 82 28 Q78 16 60 15 Q42 16 38 28Z"
          stroke="#3DBFA8"
          strokeWidth="2"
          fill="none"
        />
        {/* Head */}
        <circle
          cx="60"
          cy="30"
          r="22"
          stroke="#3DBFA8"
          strokeWidth="2.5"
          fill="none"
        />
        {/* Eyes */}
        <circle cx="52" cy="28" r="2.5" fill="#3DBFA8" />
        <circle cx="68" cy="28" r="2.5" fill="#3DBFA8" />
        {/* Smile */}
        <path
          d="M53 38 Q60 44 67 38"
          stroke="#3DBFA8"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
        />
        {/* Neck */}
        <path
          d="M55 52 L55 60 M65 52 L65 60"
          stroke="#3DBFA8"
          strokeWidth="2"
          fill="none"
        />
        {/* Body / shirt */}
        <path
          d="M40 62 L38 100 Q60 106 82 100 L80 62 Q60 57 40 62Z"
          stroke="#3DBFA8"
          strokeWidth="2.5"
          fill="none"
        />
        {/* Legs */}
        <path
          d="M48 100 L46 132"
          stroke="#3DBFA8"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M72 100 L74 132"
          stroke="#3DBFA8"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
        />
        {/* Shoes */}
        <path
          d="M40 132 L52 132"
          stroke="#3DBFA8"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M68 132 L80 132"
          stroke="#3DBFA8"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
        />
        {/* Arms natural */}
        <path
          d="M40 68 Q28 82 30 95"
          stroke="#3DBFA8"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M80 68 Q92 82 90 95"
          stroke="#3DBFA8"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
        />
      </svg>
    ),
  },
  {
    label: "6–8 years",
    color: "#6BBF4E",
    bgColor: "bg-[#6BBF4E]",
    illustration: (
      // Energetic child jumping with arms up
      <svg
        viewBox="0 0 120 140"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        {/* Hair spiky/fun */}
        <path
          d="M40 22 Q45 8 60 6 Q75 8 80 22 Q75 10 60 10 Q45 10 40 22Z"
          stroke="#6BBF4E"
          strokeWidth="2"
          fill="none"
        />
        <path
          d="M40 20 L36 10"
          stroke="#6BBF4E"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M80 20 L84 10"
          stroke="#6BBF4E"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
        />
        {/* Head */}
        <circle
          cx="60"
          cy="26"
          r="20"
          stroke="#6BBF4E"
          strokeWidth="2.5"
          fill="none"
        />
        {/* Eyes wide/excited */}
        <circle cx="52" cy="24" r="3" fill="#6BBF4E" />
        <circle cx="68" cy="24" r="3" fill="#6BBF4E" />
        {/* Big smile */}
        <path
          d="M51 34 Q60 42 69 34"
          stroke="#6BBF4E"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
        />
        {/* Neck */}
        <path
          d="M57 46 L57 54 M63 46 L63 54"
          stroke="#6BBF4E"
          strokeWidth="2"
          fill="none"
        />
        {/* Body */}
        <path
          d="M42 56 L40 92 Q60 98 80 92 L78 56 Q60 51 42 56Z"
          stroke="#6BBF4E"
          strokeWidth="2.5"
          fill="none"
        />
        {/* Legs – spread/jumping */}
        <path
          d="M50 92 L38 128"
          stroke="#6BBF4E"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M70 92 L82 128"
          stroke="#6BBF4E"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
        />
        {/* Feet angled */}
        <path
          d="M32 128 L44 124"
          stroke="#6BBF4E"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M76 124 L88 128"
          stroke="#6BBF4E"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
        />
        {/* Arms raised up joyfully */}
        <path
          d="M42 62 Q22 48 18 32"
          stroke="#6BBF4E"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M78 62 Q98 48 102 32"
          stroke="#6BBF4E"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
        />
        {/* Hands */}
        <circle
          cx="18"
          cy="30"
          r="5"
          stroke="#6BBF4E"
          strokeWidth="2"
          fill="none"
        />
        <circle
          cx="102"
          cy="30"
          r="5"
          stroke="#6BBF4E"
          strokeWidth="2"
          fill="none"
        />
      </svg>
    ),
  },
];

export default function FunForAllAges() {
  const waveRef = useRef<SVGAnimateElement>(null);

  return (
    <section className="relative w-full overflow-hidden min-h-[520px] flex flex-col items-center justify-center py-12 px-4">
      {/* Animated background wave */}
      <div className="absolute rotate-180 inset-0 pointer-events-none" aria-hidden="true">
        <svg
          className="absolute top-0 left-0 w-full h-full"
          viewBox="0 0 1440 350"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="waveGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#e8e8ed" />
              <stop offset="50%" stopColor="#f5f5f7" />
              <stop offset="100%" stopColor="#e8e8ed" />
            </linearGradient>
          </defs>

          {/* Wave 1 – slow, large */}
          <path fill="url(#waveGrad)" fillOpacity="0.7">
            <animate
              attributeName="d"
              dur="8s"
              repeatCount="indefinite"
              values="
                M0,80 C200,160 400,0 600,80 C800,160 1000,40 1200,80 C1350,110 1420,60 1440,80 L1440,0 L0,0 Z;
                M0,60 C180,140 420,20 620,70 C820,130 1020,20 1220,70 C1370,100 1430,50 1440,60 L1440,0 L0,0 Z;
                M0,80 C200,160 400,0 600,80 C800,160 1000,40 1200,80 C1350,110 1420,60 1440,80 L1440,0 L0,0 Z
              "
            />
          </path>

          {/* Wave 2 – medium speed */}
          <path fill="#dcdce2" fillOpacity="0.45">
            <animate
              attributeName="d"
              dur="6s"
              repeatCount="indefinite"
              values="
                M0,100 C300,180 600,40 900,100 C1100,140 1300,70 1440,100 L1440,0 L0,0 Z;
                M0,80 C280,160 580,20 880,80 C1080,120 1300,50 1440,80 L1440,0 L0,0 Z;
                M0,100 C300,180 600,40 900,100 C1100,140 1300,70 1440,100 L1440,0 L0,0 Z
              "
            />
          </path>

          {/* Wave 3 – fast, subtle */}
          <path fill="#c8c8ce" fillOpacity="0.25">
            <animate
              attributeName="d"
              dur="4s"
              repeatCount="indefinite"
              values="
                M0,60 C360,120 720,10 1080,60 C1260,90 1380,40 1440,60 L1440,0 L0,0 Z;
                M0,40 C340,100 700,5 1060,40 C1240,65 1380,25 1440,40 L1440,0 L0,0 Z;
                M0,60 C360,120 720,10 1080,60 C1260,90 1380,40 1440,60 L1440,0 L0,0 Z
              "
            />
          </path>
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center gap-6 w-full max-w-5xl">
        {/* Title */}
        <div className="text-center">
          <h2 className="text-4xl md:text-5xl font-black tracking-widest uppercase text-[#1e2a4a] font-sans">
            FUN FOR{" "}
            <span
              className="italic font-normal tracking-normal lowercase"
              style={{
                fontFamily: "'Pacifico', 'Dancing Script', cursive",
                fontSize: "1.15em",
              }}
            >
              All
            </span>{" "}
            AGES
          </h2>
          <p className="mt-2 text-sm md:text-base text-gray-500 font-medium tracking-wide">
            Toys for kids of every age, stage, and ability!
          </p>
        </div>

        {/* Age group cards */}
        <div className="flex flex-row flex-wrap justify-center gap-6 md:gap-8 mt-4 w-full">
          {AGE_GROUPS.map((group, i) => (
            <div
              key={group.label}
              className="flex flex-col items-center gap-3 group cursor-pointer"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              {/* Illustration */}
              <div
                className="w-20 h-24 md:w-24 md:h-28 transition-transform duration-300 group-hover:-translate-y-2 group-hover:scale-110"
                style={{ color: group.color }}
              >
                {group.illustration}
              </div>

              {/* Label pill */}
              <span
                className="px-5 py-2 rounded-full text-white text-sm md:text-base font-semibold shadow-md transition-transform duration-300 group-hover:scale-105 whitespace-nowrap"
                style={{ backgroundColor: group.color }}
              >
                {group.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Google font preload hint */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Pacifico&display=swap');
      `}</style>
    </section>
  );
}
