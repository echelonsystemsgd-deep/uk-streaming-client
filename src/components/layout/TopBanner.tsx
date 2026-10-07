import React from "react";
import Link from "next/link";
import { Phone, MessageSquare, Clock, Heart, User, CheckCircle } from "lucide-react";

export function TopBanner() {
  return (
    <div className="bg-[#2c3640] text-gray-300 text-xs py-1.5 px-4 border-b border-gray-700/60 select-none">
      <div className="container mx-auto max-w-7xl flex items-center justify-between gap-4">
        {/* Left: Call Now Helpline & Catch-up note */}
        <div className="flex items-center gap-4 text-xs font-medium">
          <a
            href="tel:07979637777"
            className="flex items-center gap-1.5 text-white hover:text-[#fdc22d] transition-colors"
          >
            <Phone className="h-3.5 w-3.5 text-[#fdc22d] shrink-0" />
            <span>Call now: <strong className="text-white">07979637777</strong></span>
          </a>
          <span className="text-gray-500 hidden sm:inline">|</span>
          <span className="hidden md:flex items-center gap-1.5 text-gray-300">
            <Clock className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
            <span>14 Days Catch-Up TV Included</span>
          </span>
          <span className="text-gray-500 hidden md:inline">|</span>
          <span className="hidden lg:flex items-center gap-1.5 text-gray-300">
            <CheckCircle className="h-3.5 w-3.5 text-blue-400 shrink-0" />
            <span>Part of Shiva Technology Ltd</span>
          </span>
        </div>

        {/* Right: Currency / Language / Wishlist / Account */}
        <div className="flex items-center gap-3 sm:gap-4 text-xs">
          <div className="hidden xs:flex items-center gap-1 text-gray-300 font-semibold">
            <span>Currency:</span>
            <span className="text-[#fdc22d] font-bold">£ GBP</span>
          </div>

          <span className="text-gray-600 hidden xs:inline">|</span>

          <a
            href="https://wa.me/447979637777"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 transition-colors font-medium"
          >
            <MessageSquare className="h-3 w-3 shrink-0" />
            <span>24/7 WhatsApp</span>
          </a>

          <span className="text-gray-600 hidden sm:inline">|</span>

          <Link
            href="/contact"
            className="hidden sm:flex items-center gap-1 text-gray-300 hover:text-white transition-colors"
          >
            <User className="h-3 w-3 shrink-0" />
            <span>Support Desk</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
