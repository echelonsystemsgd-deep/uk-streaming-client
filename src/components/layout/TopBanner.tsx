import React from "react";
import { Phone, ShieldCheck, Clock, MessageSquare } from "lucide-react";

export function TopBanner() {
  return (
    <div className="border-b border-border bg-background-elevated/70 text-xs py-2 px-4 select-none">
      <div className="container mx-auto max-w-7xl flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-4">
        {/* Left: Trust & Money back */}
        <div className="flex items-center justify-center gap-4 text-muted-foreground text-xs">
          <span className="flex items-center gap-1.5 text-zinc-200 font-medium">
            <ShieldCheck className="h-3.5 w-3.5 text-zinc-400 shrink-0" />
            7-Day Money-Back Guarantee
          </span>
          <span className="text-zinc-700">|</span>
          <span className="flex items-center gap-1.5 text-zinc-300">
            <Clock className="h-3.5 w-3.5 text-zinc-400 shrink-0" />
            7-Day Catch-up TV (UK Timezone)
          </span>
        </div>

        {/* Right: UK Support & WhatsApp */}
        <div className="flex items-center justify-center gap-4 text-xs">
          <a
            href="tel:+442079460912"
            className="flex items-center gap-1.5 text-zinc-400 hover:text-white transition-colors"
          >
            <Phone className="h-3 w-3 shrink-0" />
            <span>020 7946 0912</span>
          </a>
          <span className="text-zinc-700">|</span>
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
