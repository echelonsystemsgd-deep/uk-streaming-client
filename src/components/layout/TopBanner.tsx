import React from "react";
import { Phone, ShieldCheck, Clock, MessageSquare } from "lucide-react";

export function TopBanner() {
  return (
    <div className="border-b border-border/80 bg-background-elevated text-xs py-2 px-3 sm:px-4 select-none">
      <div className="container mx-auto max-w-7xl flex flex-col sm:flex-row items-center justify-between gap-1.5 sm:gap-4">
        {/* Left: Trust & Money back */}
        <div className="flex items-center justify-center gap-3 sm:gap-4 text-muted-foreground text-[11px] sm:text-xs">
          <span className="flex items-center gap-1.5 text-foreground font-medium">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
            7-Day Money-Back Guarantee
          </span>
          <span className="text-border">|</span>
          <span className="flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5 text-accent shrink-0" />
            7-Day Catch-up TV
          </span>
        </div>

        {/* Right: UK Support & WhatsApp */}
        <div className="flex items-center justify-center gap-3 sm:gap-4 text-[11px] sm:text-xs">
          <a
            href="tel:+442079460912"
            className="flex items-center gap-1 text-muted-foreground hover:text-white transition-colors py-1"
          >
            <Phone className="h-3 w-3 text-primary shrink-0" />
            <span>020 7946 0912</span>
          </a>
          <span className="text-border">|</span>
          <a
            href="https://wa.me/442079460912"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-emerald-400 font-semibold hover:text-emerald-300 transition-colors py-1"
          >
            <MessageSquare className="h-3 w-3 shrink-0" />
            <span>WhatsApp UK</span>
          </a>
        </div>
      </div>
    </div>
  );
}
