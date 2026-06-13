"use client";

import { useState } from "react";
import Image from "next/image";
import { Gift, Truck, ShieldCheck, RotateCcw, Mail, Send, Sparkles } from "lucide-react";

const benefits = [
  {
    icon: Truck,
    title: "Free Shipping",
    description: "On orders over $50",
  },
  {
    icon: ShieldCheck,
    title: "Secure Payment",
    description: "100% secure checkout",
  },
  {
    icon: RotateCcw,
    title: "Easy Returns",
    description: "30-day return policy",
  },
  {
    icon: Gift,
    title: "Gift Wrapping",
    description: "Free on all orders",
  },
];

export default function NewsletterPromo() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubmitted(true);
      setEmail("");
      setTimeout(() => setIsSubmitted(false), 3000);
    }
  };

  return (
    <section className="py-16">
      {/* Benefits Bar */}
      <div className="px-4 md:px-8 max-w-7xl mx-auto mb-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="flex items-center gap-3 p-4 rounded-xl bg-gray-50 hover:bg-blue-50 transition"
            >
              <div className="p-3 bg-blue-100 rounded-full text-blue-600">
                <benefit.icon size={24} />
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 text-sm md:text-base">
                  {benefit.title}
                </h4>
                <p className="text-xs md:text-sm text-gray-500">{benefit.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Promo Banner */}
      {/* <div className="px-4 md:px-8 max-w-7xl mx-auto mb-16">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-yellow-300 rounded-full blur-3xl transform translate-x-1/3 translate-y-1/3" />
          </div>
          
          <div className="relative py-12 md:py-16 px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-medium mb-4">
                <Sparkles size={16} />
                Limited Time Offer
              </div>
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-3">
                Summer Sale is Here!
              </h3>
              <p className="text-white/90 text-lg mb-6 max-w-md">
                Get up to <span className="font-bold text-yellow-300 text-2xl">50% OFF</span> on selected toys. 
                Perfect time to stock up for the holidays!
              </p>
              <button className="px-8 py-3 bg-white text-purple-600 font-bold rounded-full hover:bg-yellow-300 hover:text-purple-700 transition shadow-lg">
                Shop the Sale
              </button>
            </div>
            
            <div className="relative w-48 h-48 md:w-64 md:h-64">
              <div className="absolute inset-0 bg-white/10 rounded-full animate-pulse" />
              <Image
                src="https://www.melissaanddoug.com/cdn/shop/files/30607_Cool_Scoops_Ice_Creamery_052423-8643_2880x1200_1.jpg"
                alt="Summer Sale"
                fill
                className="object-contain drop-shadow-2xl"
              />
            </div>
          </div>
        </div>
      </div> */}

      {/* Newsletter */}
      <div className="px-4 md:px-8 max-w-3xl mx-auto">
        <div className="bg-blue-900 rounded-3xl p-8 md:p-12 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-800 rounded-full mb-6">
            <Mail size={32} className="text-blue-300" />
          </div>
          
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
            Join Our Toy Club
          </h3>
          <p className="text-blue-200 mb-8 max-w-md mx-auto">
            Subscribe to get exclusive offers, early access to new arrivals, and parenting tips delivered to your inbox.
          </p>

          {isSubmitted ? (
            <div className="bg-green-500/20 border border-green-500/50 rounded-2xl p-6">
              <p className="text-green-400 font-semibold text-lg">
                Welcome to the club! Check your inbox for a surprise!
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 px-6 py-4 rounded-full bg-blue-800 border border-blue-700 text-white placeholder-blue-400 focus:outline-none focus:border-blue-500 transition"
                required
              />
              <button
                type="submit"
                className="px-8 py-4 bg-yellow-400 text-blue-900 font-bold rounded-full hover:bg-yellow-300 transition flex items-center justify-center gap-2"
              >
                Subscribe
                <Send size={18} />
              </button>
            </form>
          )}

          <p className="text-blue-400 text-sm mt-4">
            No spam, unsubscribe anytime. Join 50,000+ happy parents!
          </p>
        </div>
      </div>
    </section>
  );
}
