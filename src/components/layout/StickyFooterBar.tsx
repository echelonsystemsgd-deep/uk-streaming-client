"use client";

import React, { useState, useEffect } from "react";
import { MessageSquare, ChevronRight } from "lucide-react";
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

    // Observe when the actual page footer enters or exits the viewport
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
      className={`fixed bottom-0 left-0 right-0 z-40 bg-zinc-950/95 backdrop-blur-md border-t border-border pt-2.5 pb-3 sm:pb-2.5 px-4 sm:px-6 shadow-2xl transition-all duration-300 ease-in-out ${
        shouldShow
          ? "translate-y-0 opacity-100 pointer-events-auto"
          : "translate-y-full opacity-0 pointer-events-none"
      }`}
    >
      <div className="container mx-auto max-w-7xl flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Deal Tag / Value Proposition */}
        <div className="flex items-center gap-3 text-xs text-zinc-300">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-red-500 animate-pulse" />
            <span className="font-bold text-white tracking-wide">
              ChitramTV
            </span>
          </div>
          <span className="text-zinc-600 hidden sm:inline">•</span>
          <span className="hidden md:inline text-zinc-400">
            350+ Channels in 4K • 7-Day Catch-up TV
          </span>
          <span className="rounded bg-zinc-800 border border-zinc-700 px-2 py-0.5 text-[11px] font-bold text-zinc-200">
            Best Value: €7.78/mo (14 Months)
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
          <a
            href="https://wa.me/31620897414"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-1.5 rounded-md border border-zinc-700 bg-zinc-900 hover:bg-zinc-800 text-zinc-200 font-semibold text-xs px-3.5 py-2 h-10 transition-colors shrink-0"
            title="Chat with Support on WhatsApp"
          >
            <MessageSquare className="h-3.5 w-3.5 text-emerald-400" />
            <span className="hidden xs:inline">WhatsApp</span>
          </a>

          <Button
            variant="default"
            size="sm"
            onClick={onSubscribeClick}
            className="font-bold text-xs h-10 px-5 flex-1 sm:flex-initial flex items-center justify-center gap-1.5"
          >
            <span>Order via PayPal</span>
            <ChevronRight className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>
    </aside>
  );
}
