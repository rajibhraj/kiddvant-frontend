import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import { CartProvider } from "@/context/CartContext";
import { CartSidebarProvider } from "@/context/CartSidebarContext";
import CartSidebarWrapper from "@/components/CartSidebarWrapper";
import UpdateHeader from "@/components/update/Header";
 
export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
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
  );
}
