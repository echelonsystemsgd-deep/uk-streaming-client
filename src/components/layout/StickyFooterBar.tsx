"use client";

import React, { useState, useEffect } from "react";
import { MessageSquare, ChevronRight, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

interface StickyFooterBarProps {
  onSubscribeClick: () => void;
}

export function StickyFooterBar({ onSubscribeClick }: StickyFooterBarProps) {
  const [isScrolledPastHero, setIsScrolledPastHero] = useState(false);
  const [isFooterVisible, setIsFooterVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolledPastHero(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    const footerEl = document.getElementById("site-footer");
    let observer: IntersectionObserver | null = null;

    if (footerEl) {
      observer = new IntersectionObserver(
        (entries) => {
          const entry = entries[0];
          setIsFooterVisible(entry.isIntersecting);
        },
        {
          root: null,
          threshold: 0.05,
        }
      );
      observer.observe(footerEl);
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (observer) observer.disconnect();
    };
  }, []);

  const shouldShow = isScrolledPastHero && !isFooterVisible;

  return (
    <aside
      aria-label="Quick subscription and support bar"
      style={{ paddingBottom: "max(12px, env(safe-area-inset-bottom))" }}
      className={`fixed bottom-0 left-0 right-0 z-40 bg-[#2c3640]/95 backdrop-blur-md border-t border-gray-700 pt-2.5 px-4 sm:px-6 shadow-2xl transition-all duration-300 ease-in-out ${
        shouldShow
          ? "translate-y-0 opacity-100 pointer-events-auto"
          : "translate-y-full opacity-0 pointer-events-none"
      }`}
    >
      <div className="container mx-auto max-w-7xl flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Deal Tag / Value Proposition */}
        <div className="flex items-center gap-3 text-xs text-gray-200">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-[#dd0e1c] animate-pulse" />
            <span className="font-bold text-white tracking-wide">
              ChitramTV UK
            </span>
          </div>
          <span className="text-gray-500 hidden sm:inline">•</span>
          <span className="hidden md:inline text-gray-300">
            500+ Channels in 4K • 14-Day Catch-up TV
          </span>
          <span className="rounded bg-black/40 border border-gray-600 px-2 py-0.5 text-[11px] font-bold text-[#fdc22d]">
            Best Value: £6.43/mo (12+2 Free Months)
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
          <a
            href="tel:07979637777"
            className="hidden xs:inline-flex items-center justify-center gap-1.5 rounded border border-gray-600 bg-gray-800 hover:bg-gray-700 text-white font-semibold text-xs px-3 py-2 h-9 transition-colors shrink-0"
            title="Call Support 07979637777"
          >
            <Phone className="h-3.5 w-3.5 text-[#fdc22d]" />
            <span>07979637777</span>
          </a>

          <a
            href="https://wa.me/447979637777"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-1.5 rounded border border-emerald-600/40 bg-emerald-950/60 hover:bg-emerald-900/80 text-emerald-300 font-semibold text-xs px-3.5 py-2 h-9 transition-colors shrink-0"
            title="Chat with UK Support on WhatsApp"
          >
            <MessageSquare className="h-3.5 w-3.5 text-emerald-400" />
            <span className="hidden xs:inline">WhatsApp</span>
          </a>

          <Button
            variant="default"
            size="sm"
            onClick={onSubscribeClick}
            className="bg-[#dd0e1c] hover:bg-[#b00b16] text-white font-bold text-xs h-9 px-5 flex-1 sm:flex-initial flex items-center justify-center gap-1.5 shadow"
          >
            <span>Order via PayPal</span>
            <ChevronRight className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>
    </aside>
  );
}
