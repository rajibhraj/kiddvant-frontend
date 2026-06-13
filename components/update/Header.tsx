"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Search,
  User,
  ShoppingCart,
  Heart,
  Menu,
  Headphones,
  ChevronDown,
  X
} from "lucide-react";
import Image from "next/image";

export default function UpdateHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(false);

  const navLinks = [
    // { name: "Home", href: "/update", hasDropdown: true },
    { name: "Home", href: "/", hasDropdown: false },
    { name: "New Arrivals", href: "/new-arrival", hasDropdown: false },
    { name: "About us", href: "/about", hasDropdown: false },
    { name: "Shop", href: "/products", hasDropdown: false },
    // { name: "Pages", href: "#", hasDropdown: false },
    // { name: "Blog", href: "#", hasDropdown: false },
    { name: "Contact", href: "/contact", hasDropdown: false },
  ];

  return (
    <header className="w-full bg-white relative z-50 transition-all duration-300">
      {/* Upper/Main Navbar Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between gap-4">

        {/* Left Side: Brand Logo & Hotline */}
        <div className="flex items-center gap-6 lg:gap-8">
          {/* Logo "kiddvant" */}
          <Link href="/" className="group">
            <div className="flex justify-center">
              <Image
                //  src="../../public/kidd-vant-logo.png"
                src="/kidd-vant-logo.png" // put your logo in public folder
                alt="logo"
                width={70}
                height={30}
              />
            </div>
          </Link>

          {/* Hotline info (Hidden on mobile/tablet) */}
          <div className="hidden xl:flex items-center gap-3 bg-pink-50/50 border border-pink-100/60 px-3.5 py-1.5 rounded-2xl shadow-sm">
            <div className="bg-pink-500 p-1.5 rounded-full text-white">
              <Headphones size={15} />
            </div>
            <div className="text-left font-sans text-xs">
              <p className="text-pink-600 font-bold tracking-wide">+8801600957282</p>
              <p className="text-gray-400 text-[10px] font-medium">Call out Hotline 24/7</p>
            </div>
          </div>
        </div>

        {/* Center: Navigation Links (Desktop) */}
        <nav className="hidden lg:flex items-center gap-8 font-sans">
          {navLinks.map((link) => (
            <div key={link.name} className="relative group">
              {link.hasDropdown ? (
                <button
                  onClick={() => setActiveDropdown(!activeDropdown)}
                  className="flex items-center gap-1 text-gray-700 hover:text-pink-500 font-bold text-sm tracking-wide transition duration-300 focus:outline-none"
                >
                  {link.name}
                  <ChevronDown
                    size={14}
                    className={`transition-transform duration-300 text-pink-400 ${activeDropdown ? "rotate-180" : "group-hover:translate-y-0.5"}`}
                  />
                </button>
              ) : (
                <Link
                  href={link.href}
                  className="relative text-gray-700 hover:text-pink-500 font-bold text-sm tracking-wide transition duration-300 py-1"
                >
                  {link.name}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-pink-500 transition-all duration-300 group-hover:w-full" />
                </Link>
              )}

              {/* Dropdown Menu Mockup */}
              {link.hasDropdown && activeDropdown && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-gray-100 rounded-2xl shadow-xl py-2 z-50 animate-fade-in font-sans">
                  <Link href="/update" className="block px-4 py-2 text-xs text-gray-700 hover:bg-pink-50 hover:text-pink-600 font-bold">
                    Home Version 1
                  </Link>
                  <Link href="/" className="block px-4 py-2 text-xs text-gray-700 hover:bg-pink-50 hover:text-pink-600 font-bold">
                    Original Home
                  </Link>
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Right Side: Search bar, hamburger and action icons */}
        <div className="flex items-center gap-3 sm:gap-4 font-sans">

          {/* Search Products (Pill shaped) - Hidden on ultra-small screens */}
          <div className="hidden sm:flex items-center bg-gray-50 hover:bg-gray-100 border border-gray-100 rounded-full pl-5 pr-1.5 py-1 w-48 lg:w-60 transition duration-300 group focus-within:ring-2 focus-within:ring-pink-400/30 focus-within:bg-white focus-within:border-pink-300">
            <input
              type="text"
              placeholder="Search Products"
              className="outline-none bg-transparent w-full text-xs text-gray-700 placeholder-gray-400 font-medium"
            />
            <button className="bg-pink-500 hover:bg-pink-600 active:scale-95 text-white p-2 rounded-full shadow-md transition duration-300">
              <Search size={14} className="stroke-[3]" />
            </button>
          </div>

          {/* Action Icons */}
          <div className="flex items-center gap-2.5 sm:gap-3.5 text-gray-600">
            {/* Search Icon Trigger for mobile */}
            <button className="sm:hidden p-1.5 hover:bg-pink-50 hover:text-pink-500 rounded-full transition duration-300">
              <Search size={20} />
            </button>

            {/* Hamburger (Mobile/Tablet drawer toggle) */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-1.5 hover:bg-pink-50 hover:text-pink-500 rounded-full transition duration-300"
              aria-label="Toggle Menu"
            >
              <Menu size={20} />
            </button>

            {/* Heart/Wishlist Icon */}
            <button className="relative p-1.5 hover:bg-pink-50 hover:text-pink-500 rounded-full transition duration-300">
              <Heart size={20} />
            </button>

            {/* Cart Icon with red badge */}
            <button className="relative p-1.5 hover:bg-pink-50 hover:text-pink-500 rounded-full transition duration-300">
              <ShoppingCart size={20} />
              <span className="absolute -top-0.5 -right-0.5 bg-red-500 text-white text-[9px] font-black w-4.5 h-4.5 rounded-full flex items-center justify-center border border-white animate-pulse">
                3
              </span>
            </button>

            {/* User Profile Icon */}
            <button className="p-1.5 hover:bg-pink-50 hover:text-pink-500 rounded-full transition duration-300">
              <User size={20} />
            </button>
          </div>

        </div>

      </div>

      {/* Mobile Drawer Navigation (Side sheet) */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Drawer Body */}
          <div className="relative ml-auto w-full max-w-[280px] bg-white h-full shadow-2xl flex flex-col p-6 font-sans justify-between animate-slide-in">
            <div>
              <div className="flex items-center justify-between mb-8">
                <span className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-yellow-500">
                  kiddvant
                </span>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1.5 text-gray-500 hover:bg-pink-50 hover:text-pink-500 rounded-full transition duration-300"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Mobile Search */}
              <div className="flex items-center bg-gray-50 rounded-full pl-4 pr-1 py-1 mb-6 border border-gray-100">
                <input
                  type="text"
                  placeholder="Search Products"
                  className="outline-none bg-transparent w-full text-xs text-gray-700 placeholder-gray-400 font-medium"
                />
                <button className="bg-pink-500 text-white p-2 rounded-full transition duration-300">
                  <Search size={12} className="stroke-[3]" />
                </button>
              </div>

              {/* Mobile Links */}
              <nav className="flex flex-col gap-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-gray-700 hover:text-pink-500 font-bold text-sm tracking-wide py-1.5 flex items-center justify-between border-b border-gray-50"
                  >
                    {link.name}
                    {link.hasDropdown && <ChevronDown size={14} className="text-gray-400" />}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Mobile Footer (Hotline inside Drawer) */}
            <div className="bg-pink-50/70 border border-pink-100/50 p-4 rounded-2xl flex items-center gap-3">
              <div className="bg-pink-500 p-2 rounded-full text-white">
                <Headphones size={16} />
              </div>
              <div>
                <p className="text-pink-600 font-bold text-sm">91 2345 678</p>
                <p className="text-gray-400 text-[10px] font-medium">Hotline 24/7 support</p>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* Dynamic Styling pre-loads */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        .animate-bounce-slow {
          animation: float 4s ease-in-out infinite;
        }
        @keyframes slideIn {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
        .animate-slide-in {
          animation: slideIn 0.3s ease-out forwards;
        }
      `}</style>

    </header>
  );
}
