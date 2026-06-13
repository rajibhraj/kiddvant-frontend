"use client";

import { ShoppingCart } from "lucide-react";

export default function FloatingCartTab() {
  return (
    <div className="fixed right-0 top-1/2 -translate-y-1/2 z-40 flex flex-col font-sans select-none">
      
      {/* Tab Button container */}
      <button 
        className="bg-gradient-to-br from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white pl-4 pr-3.5 py-4 rounded-l-2xl border-y border-l border-pink-400/40 shadow-[0_10px_25px_-5px_rgba(244,63,94,0.4)] flex flex-col items-center justify-center gap-2 cursor-pointer transition-all duration-300 hover:-translate-x-1.5 active:scale-95 group"
        onClick={() => {
          // If there's an action in the parent, we can call it.
          alert("Opening cart drawer showing 3 items!");
        }}
      >
        
        {/* Shopping Cart Icon (Bounces on hover) */}
        <div className="relative p-1 rounded-full bg-white/10 group-hover:animate-bounce-slow">
          <ShoppingCart size={18} className="stroke-[2.5]" />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[9px] font-black w-4.5 h-4.5 rounded-full flex items-center justify-center border border-pink-500">
            3
          </span>
        </div>

        {/* Vertical Text */}
        <div className="flex flex-col items-center gap-0.5 mt-1">
          <span className="text-[11px] font-black tracking-widest uppercase">
            3 Item
          </span>
          <span className="text-[10px] font-black text-pink-100 font-sans tracking-wide">
            $128.97
          </span>
        </div>

      </button>

      {/* Bounce Styling */}
      <style>{`
        @keyframes miniBounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }
        .group-hover\\:animate-bounce-slow {
          animation: miniBounce 1s ease-in-out infinite;
        }
      `}</style>

    </div>
  );
}
