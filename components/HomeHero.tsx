"use client";

import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

type Slide = {
  id: number;
  title: string;
  description: string;
  buttonText: string;
  image: string;
  side: string;
};

const slides: Slide[] = [
  {
    id: 1,
    title: "THANK YOU, EDUCATORS!",
    description:
      "We're celebrating the educators who make a difference! Verify your educator status to enjoy 25% off during Teacher Appreciation Week and year-round 15% off savings.",
    buttonText: "Verify & Shop",
    image:
      "/image/image 2.jpg",
    side: "left"
  },
  {
    id: 2,
    title: "20% OFF  SCREEN-FREE  WEEK SAVINGS",
    description: "Celebrate Screen-Free Week by stocking up on fun hands-on toys that build real-life skills! Use code PLAYMAY2026 at checkout.",
    buttonText: "Shop Now",
    image:"/image/image 1.jpg",
    side: "right"
  },
  {
    id: 3,
    title: "SCREEN-FREE PURPOSEFUL PLAY",
    description: "Enjoy 20% off sitewide on toys that inspire purposeful play as kids unplug and tap into their own imagination! Use code PLAYMAY2026 at checkout.",
    buttonText: "Shop Now",
    image:
      "/image/image-3.jpg",
       side: "left"
  },
];

export default function HomeHero() {
  const [current, setCurrent] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  }, []);

  const prevSlide = useCallback(() => {
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  }, []);

  // Auto slide (fixed)
  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  return (
    <div className="relative w-full h-[800px] overflow-hidden pb-10">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-700 ${
            index === current ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          {/* Background Image */}
         {slide.image && <Image
            src={slide.image}
            alt="slide"
            fill
            className="object-cover"
          />}

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/20  to-transparent" />

          {/* Content */} <div className="relative z-20 h-full flex items-center px-10 md:px-40 max-w-4xl">
            <div>
              <h1 className="text-3xl md:text-6xl font-bold text-blue-700 mb-4">
                {slide.title}
              </h1>
              <p className="text-gray-700 mb-6">{slide.description}</p>
              <button className="bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition">
                {slide.buttonText}
              </button>
            </div>
          </div>  
          
        </div>
      ))}

      {/* Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-[4%] top-1/2 -translate-y-1/2 z-30 bg-white/80 hover:bg-white p-2 rounded-full shadow"
      >
        <ChevronLeft />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-[4%] top-1/2 -translate-y-1/2 z-30 bg-white/80 hover:bg-white p-2 rounded-full shadow"
      >
        <ChevronRight />
      </button>

      {/* Dots */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2 z-30">
        {slides.map((_, index) => (
          <div
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-3 h-3 rounded-full cursor-pointer transition ${
              current === index ? "bg-blue-600 scale-110" : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
}