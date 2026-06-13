"use client";

import { useCartSidebar } from "@/context/CartSidebarContext";
import CartSidebar from "@/components/CartSidebar";

export default function CartSidebarWrapper() {
  const { isCartOpen, closeCart } = useCartSidebar();
  
  return <CartSidebar isOpen={isCartOpen} onClose={closeCart} />;
}
