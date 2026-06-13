import type { Metadata } from "next";
import { Geist, Geist_Mono, Patrick_Hand } from "next/font/google"; 
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import { CartProvider } from "@/context/CartContext";
import { CartSidebarProvider } from "@/context/CartSidebarContext";
import CartSidebarWrapper from "@/components/CartSidebarWrapper";
import UpdateHeader from "@/components/update/Header";
 
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={` h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <CartProvider>
          <CartSidebarProvider>
            {/* <Navbar/> */}
            <div className="sticky top-0 z-50">

            <UpdateHeader />
            </div>
            <main className="flex-1">{children}</main>
            <Footer/>
            <CartSidebarWrapper />
          </CartSidebarProvider>
        </CartProvider>
      </body>
    </html>
  );
}
