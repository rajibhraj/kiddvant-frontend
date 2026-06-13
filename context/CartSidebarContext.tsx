"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface CartSidebarContextType {
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
}

const CartSidebarContext = createContext<CartSidebarContextType | undefined>(undefined);

export function CartSidebarProvider({ children }: { children: ReactNode }) {
  const [isCartOpen, setIsCartOpen] = useState(false);

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  return (
    <CartSidebarContext.Provider value={{ isCartOpen, openCart, closeCart }}>
      {children}
    </CartSidebarContext.Provider>
  );
}

export function useCartSidebar() {
  const context = useContext(CartSidebarContext);
  if (context === undefined) {
    throw new Error('useCartSidebar must be used within a CartSidebarProvider');
  }
  return context;
}
