import React from "react";
import { Phone, ShieldCheck, Clock, MessageSquare } from "lucide-react";

export function TopBanner() {
  return (
    <div className="border-b border-border/80 bg-background-elevated/90 text-xs py-1.5 px-3 sm:py-2 sm:px-4 select-none">
      <div className="container mx-auto max-w-7xl flex items-center justify-between gap-2">
        {/* Left: Trust & Money back */}
        <div className="flex items-center gap-2 sm:gap-4 text-muted-foreground text-[11px] sm:text-xs">
          <span className="flex items-center gap-1.5 text-zinc-200 font-medium">
            <ShieldCheck className="h-3.5 w-3.5 text-primary shrink-0" />
            <span>7-Day Guarantee</span>
          </span>
          <span className="text-zinc-700 hidden sm:inline">|</span>
          <span className="hidden sm:flex items-center gap-1.5 text-zinc-300">
            <Clock className="h-3.5 w-3.5 text-zinc-400 shrink-0" />
            <span>7-Day Catch-up TV (UK Timezone)</span>
          </span>
        </div>

        {/* Right: UK Support & WhatsApp */}
        <div className="flex items-center gap-3 sm:gap-4 text-[11px] sm:text-xs">
          <a
            href="tel:+442079460912"
            className="hidden xs:flex items-center gap-1.5 text-zinc-400 hover:text-white transition-colors"
          >
            <Phone className="h-3 w-3 shrink-0" />
            <span>020 7946 0912</span>
          </a>
          <span className="text-zinc-700 hidden xs:inline">|</span>
          <a
            href="https://wa.me/442079460912"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-zinc-200 font-medium hover:text-white transition-colors"
          >
            <MessageSquare className="h-3 w-3 text-emerald-400 shrink-0" />
            <span>WhatsApp UK Help</span>
          </a>
        </div>
      </div>
    </div>
  );
}
