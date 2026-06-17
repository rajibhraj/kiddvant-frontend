"use client";

import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import { CartProvider } from "@/context/CartContext";
import { CartSidebarProvider } from "@/context/CartSidebarContext";
import CartSidebarWrapper from "@/components/CartSidebarWrapper";
import UpdateHeader from "@/components/update/Header";
import { usePathname } from "next/navigation";
 
export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  // List of paths that should keep the "Patrick Hand" font
  const patrickHandPaths = ["/", "/new-arrival", "/about", "/products", "/contact"];
  const isPatrickHand = patrickHandPaths.includes(pathname);

  return (
    <CartProvider>
      <CartSidebarProvider>
        <div className={isPatrickHand ? "font-patrick" : ""}>
          {/* <Navbar/> */}
          <div className="sticky top-0 z-50">
            <UpdateHeader />
          </div>
          <main className="flex-1">{children}</main>
          <Footer/>
          <CartSidebarWrapper />
        </div>
      </CartSidebarProvider>
    </CartProvider>
  );
}
