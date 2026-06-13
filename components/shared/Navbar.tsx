"use client";

import Link from "next/link";
import { Search, User, ShoppingCart, HelpCircle } from "lucide-react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { useCartSidebar } from "@/context/CartSidebarContext";

const navItems = [
  { name: "Home Page", href: "/" },
  { name: "About Us", href: "/about" },
  { name: "Product Page", href: "/products" },
  // { name: "Shope", href: "/shop" },
  { name: "New Arrival", href: "/new-arrival" },
  { name: "Parents items", href: "/parents-items" },
  { name: "Partner with Us", href: "/partner" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const { getCartCount } = useCart();
  const { openCart } = useCartSidebar();
  const pathname = usePathname();

  if (pathname === "/update" || pathname.startsWith("/update/")) {
    return null;
  }

  return (
    <header className="w-full border-b bg-white sticky top-0 z-50">
      {/* Top Bar */}
      <div className="flex items-center justify-between px-6 md:px-16 py-4">
        
        {/* Search */}
        {/* <div className="hidden md:flex items-center border rounded-full px-4 py-2 w-[200px]">
          <Search size={18} className="text-gray-500 mr-2" />
          <input
            type="text"
            placeholder="Search"
            className="outline-none w-full text-sm"
          />
        </div> */}

        {/* Logo */}
        <div className="flex justify-center">
          <Image
          //  src="../../public/kidd-vant-logo.png"
            src="/kidd-vant-logo.png" // put your logo in public folder
            alt="logo"
            width={100}
            height={40}
          />
        </div>
        {/* Navbar */}
      <nav className="hidden md:flex justify-center gap-10 py-3 text-sm lg:text-xl font-semibold text-gray-700">
        {navItems.map((item, index) => (
          <Link
            key={index}
            href={item.href}
            className="hover:text-blue-600 transition"
          >
            {item.name}
          </Link>
        ))}
      </nav>

        {/* Icons */}
        <div className="flex items-center gap-4">
          <HelpCircle className="cursor-pointer text-gray-600" />
          <User className="cursor-pointer text-gray-600" />
          <div className="relative cursor-pointer" onClick={openCart}>
            <ShoppingCart className="text-gray-600" />
            {getCartCount() > 0 && (
              <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {getCartCount()}
              </span>
            )}
          </div>
        </div>
      </div>

      
    </header>
  );
}