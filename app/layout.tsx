import type { Metadata } from "next";
import { Geist, Geist_Mono, Patrick_Hand } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import { CartProvider } from "@/context/CartContext";
import { CartSidebarProvider } from "@/context/CartSidebarContext";
import CartSidebarWrapper from "@/components/CartSidebarWrapper";
import UpdateHeader from "@/components/update/Header";
import { SiteConfigProvider } from "@/context/SiteConfigContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const patrickHandRegular = Patrick_Hand({
  variable: "--patrick-hand-regular",
  subsets: ["latin"],
  weight: "400"
});

export const metadata: Metadata = {
  title: "KiddVant",
  description: "KiddVant",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${patrickHandRegular.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <SiteConfigProvider>
          <main className="flex-1">{children}</main> 
        </SiteConfigProvider>
      </body>
    </html>
  );
}
