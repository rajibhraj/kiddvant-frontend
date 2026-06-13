"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  Music2, 
  ArrowRight,
  Accessibility
} from "lucide-react";

// Social media icons as SVG components since lucide-react doesn't have them
const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <rect x="2" y="2" width="20" height="20" rx="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const TwitterIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);

const YoutubeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2.12 2.12 0 0 1 1.7-1.7 25.12 25.12 0 0 1 13.6 0 2.12 2.12 0 0 1 1.7 1.7 24.12 24.12 0 0 1 0 10 2.12 2.12 0 0 1-1.7 1.7 25.12 25.12 0 0 1-13.6 0 2.12 2.12 0 0 1-1.7-1.7z" />
    <path d="m10 15 5-3-5-3z" />
  </svg>
);

const PinterestIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <circle cx="12" cy="12" r="10" />
    <path d="M8 12c0-2.2 1.8-4 4-4s4 1.8 4 4c0 2.2-1.8 4-4 4" />
    <path d="M12 16l-2 6" />
  </svg>
);

const footerLinks = {
  shopWays: {
    title: "MORE WAYS TO SHOP",
    links: [
      { label: "Educator Discount", href: "#" },
      { label: "Medical Discount", href: "#" },
      { label: "Military Discount", href: "#" },
      { label: "Nurse Discount", href: "#" },
      { label: "Rewards", href: "#" },
      { label: "Gift Cards", href: "#" },
      { label: "Melissa & Doug Store", href: "#" },
    ],
  },
  help: {
    title: "NEED HELP?",
    links: [
      { label: "Contact Us", href: "/contact" },
      { label: "FAQ", href: "#" },
      { label: "Order Status", href: "#" },
      { label: "Shipping & Returns", href: "#" },
      { label: "Replacement Parts", href: "#" },
      { label: "Product Compliance", href: "#" },
      { label: "Product Registration", href: "#" },
    ],
  },
  about: {
    title: "ABOUT US",
    links: [
      { label: "Our Story", href: "/about" },
      { label: "Sustainability", href: "#" },
      { label: "Blog", href: "#" },
      { label: "Skills at Play", href: "#" },
      { label: "Giving Back", href: "#" },
      { label: "Careers", href: "#" },
    ],
  },
  partner: {
    title: "PARTNER WITH US",
    links: [
      { label: "Wholesale", href: "#" },
      { label: "Become a Retailer", href: "#" },
      { label: "Become an Affiliate", href: "#" },
      { label: "Product Ideas", href: "#" },
    ],
  },
};

const socialLinks = [
  { icon: InstagramIcon, href: "#", label: "Instagram" },
  { icon: FacebookIcon, href: "#", label: "Facebook" },
  { icon: Music2, href: "#", label: "TikTok" },
  { icon: PinterestIcon, href: "#", label: "Pinterest" },
  { icon: TwitterIcon, href: "#", label: "Twitter" },
  { icon: YoutubeIcon, href: "#", label: "YouTube" },
];

import { usePathname } from "next/navigation";

const legalLinks = [
  { label: "Terms", href: "#" },
  { label: "Privacy Notice", href: "#" },
  { label: "Accessibility Statement", href: "#" },
  { label: "CA Supply Chain Act", href: "#" },
  { label: "Do Not Sell or Share My Personal Information", href: "#" },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [agreed, setAgreed] = useState(false);
  const pathname = usePathname();

  if (pathname === "/update" || pathname.startsWith("/update/")) {
    return null;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && agreed) {
      alert("Thank you for subscribing!");
      setEmail("");
      setAgreed(false);
    }
  };

  return (
    <footer className="w-full">
      {/* Main Footer */}
      <div className="bg-gradient-to-r from-[#FB64B6] to-[#FCF2F7]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row">
            {/* Left Section - Links */}
            <div className="flex-1 py-12 px-6 md:px-12">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {/* More Ways to Shop */}
                <div>
                  <h3 className="text-[#1e3a5f] font-bold text-sm tracking-wider mb-4">
                    {footerLinks.shopWays.title}
                  </h3>
                  <ul className="space-y-2">
                    {footerLinks.shopWays.links.map((link) => (
                      <li key={link.label}>
                        <Link
                          href={link.href}
                          className="text-[#1e3a5f] text-sm hover:text-white transition"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Need Help */}
                <div>
                  <h3 className="text-[#1e3a5f] font-bold text-sm tracking-wider mb-4">
                    {footerLinks.help.title}
                  </h3>
                  <ul className="space-y-2">
                    {footerLinks.help.links.map((link) => (
                      <li key={link.label}>
                        <Link
                          href={link.href}
                          className="text-[#1e3a5f] text-sm hover:text-white transition"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* About Us */}
                <div>
                  <h3 className="text-[#1e3a5f] font-bold text-sm tracking-wider mb-4">
                    {footerLinks.about.title}
                  </h3>
                  <ul className="space-y-2">
                    {footerLinks.about.links.map((link) => (
                      <li key={link.label}>
                        <Link
                          href={link.href}
                          className="text-[#1e3a5f] text-sm hover:text-white transition"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Partner With Us */}
                <div>
                  <h3 className="text-[#1e3a5f] font-bold text-sm tracking-wider mb-4">
                    {footerLinks.partner.title}
                  </h3>
                  <ul className="space-y-2">
                    {footerLinks.partner.links.map((link) => (
                      <li key={link.label}>
                        <Link
                          href={link.href}
                          className="text-[#1e3a5f] text-sm hover:text-white transition"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Right Section - Newsletter */}
            <div className="lg:w-[400px] bg-[#F6339A] py-12 px-6 md:px-10">
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 border-2 border-white/40 rounded-lg flex items-center justify-center">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    className="w-8 h-8 text-white/80"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <rect x="2" y="5" width="20" height="14" rx="2" />
                    <path d="M2 5l10 7 10-7" />
                  </svg>
                </div>
              </div>

              <h3 className="text-white text-center font-bold text-lg tracking-wider mb-1">
                SIGN UP & SAVE
              </h3>
              <p className="text-white text-center text-sm mb-6">
                ON YOUR FIRST ORDER
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email address"
                    className="w-full px-4 py-3 rounded-full bg-white text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50 pr-12"
                    required
                  />
                  <button
                    type="submit"
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-gray-600 hover:text-blue-600 transition"
                  >
                    <ArrowRight size={18} />
                  </button>
                </div>

                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="agree"
                    checked={agreed}
                    onChange={(e) => setAgreed(e.target.checked)}
                    className="mt-1 w-4 h-4 rounded border-white/50 bg-transparent text-blue-600 focus:ring-white"
                  />
                  <label htmlFor="agree" className="text-white/80 text-xs leading-relaxed">
                    By providing your email address, you agree to our{" "}
                    <Link href="#" className="underline hover:text-white">
                      Terms of Use
                    </Link>
                    ,{" "}
                    <Link href="#" className="underline hover:text-white">
                      Privacy Notice
                    </Link>
                    , and{" "}
                    <Link href="#" className="underline hover:text-white">
                      Arbitration Agreement
                    </Link>
                  </label>
                </div>
              </form>

              {/* Social Links */}
              <div className="flex items-center justify-center gap-4 mt-8">
                {socialLinks.map((social) => (
                  <Link
                    key={social.label}
                    href={social.href}
                    className="text-white/80 hover:text-white transition"
                    aria-label={social.label}
                  >
                    <social.icon size={20} />
                  </Link>
                ))}
                <button
                  className="text-white/80 hover:text-white transition"
                  aria-label="Accessibility"
                >
                  <Accessibility size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-[#8BC4F0] border-t border-[#6BB3E8]">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-[#1e3a5f] text-xs">
              &copy;2026 Melissa & Doug
            </p>
            <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
              {legalLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-[#1e3a5f] text-xs hover:text-white transition"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
