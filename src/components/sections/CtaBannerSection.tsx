import React from "react";
import { Play, ShieldCheck, Zap, ArrowRight, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CtaBannerSectionProps {
  onSubscribeClick: () => void;
}

export function CtaBannerSection({ onSubscribeClick }: CtaBannerSectionProps) {
  return (
    <section className="py-16 sm:py-20 bg-background relative overflow-hidden border-b border-border">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-2xl border border-border bg-card p-8 sm:p-12 lg:p-16 shadow-xl overflow-hidden text-center lg:text-left">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-8 space-y-4">
              <span className="text-xs font-bold uppercase tracking-widest text-primary">
                OVER 15,000+ UK SUBSCRIBERS
              </span>
              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
                Ready for Buffer-Free Indian Television in the UK?
              </h2>
              <p className="text-sm sm:text-base text-zinc-400 max-w-2xl leading-relaxed">
                Get started today in less than 2 minutes. 500+ live channels, 14-day catch-up, and 4K live cricket delivered smoothly on your home broadband.
              </p>

              {/* Badges */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-6 pt-2 text-xs text-zinc-300">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="h-4 w-4 text-zinc-400 shrink-0" />
                  7-Day Full Money-Back Guarantee
                </span>
                <span className="flex items-center gap-1.5">
                  <Zap className="h-4 w-4 text-zinc-400 shrink-0" />
                  Instant Activation via Email &amp; WhatsApp
                </span>
              </div>
            </div>

            {/* Right Buttons */}
            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-center lg:items-end w-full">
              <Button
                variant="default"
                size="lg"
                onClick={onSubscribeClick}
                className="w-full sm:w-auto font-bold flex items-center justify-center gap-2 h-12 px-8"
              >
                <span>Subscribe via PayPal</span>
                <ArrowRight className="h-4 w-4" />
              </Button>
              <a
                href="https://wa.me/447979637777"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-md border border-zinc-700 bg-zinc-800 hover:bg-zinc-700 text-white font-semibold text-xs px-6 py-3 h-12 w-full sm:w-auto transition-colors"
              >
                <MessageSquare className="h-4 w-4 text-emerald-400" />
                <span>Talk to WhatsApp Support</span>
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
