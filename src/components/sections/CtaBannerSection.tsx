import React from "react";
import { Play, ShieldCheck, Zap, ArrowRight, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CtaBannerSectionProps {
  onSubscribeClick: () => void;
}

export function CtaBannerSection({ onSubscribeClick }: CtaBannerSectionProps) {
  return (
    <section className="py-16 bg-background relative overflow-hidden border-b border-border/60">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-2xl border border-primary/40 bg-gradient-to-r from-card via-background-elevated to-card p-6 sm:p-12 lg:p-16 shadow-card overflow-hidden text-center lg:text-left">
          
          {/* Subtle Ambient Red Glow */}
          <div 
            aria-hidden="true" 
            className="pointer-events-none absolute -right-20 -bottom-20 w-96 h-96 bg-primary/20 blur-[100px]" 
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-8 space-y-4">
              <span className="text-xs font-bold uppercase tracking-widest text-accent">
                JOIN OVER 15,000+ UK HOUSEHOLDS
              </span>
              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
                Ready to Experience Seamless Indian Television in the UK?
              </h2>
              <p className="text-sm sm:text-lg text-muted-foreground max-w-2xl">
                Get started today in less than 2 minutes. 350+ live channels, 7-day catch-up, and 4K live cricket delivered with zero buffering.
              </p>

              {/* Badges */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-2 text-xs text-slate-300">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="h-4 w-4 text-emerald-400 shrink-0" />
                  7-Day Full Money-Back Guarantee
                </span>
                <span className="flex items-center gap-1.5">
                  <Zap className="h-4 w-4 text-accent shrink-0" />
                  Instant Activation via Email & WhatsApp
                </span>
              </div>
            </div>

            {/* Right Buttons */}
            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-center lg:items-end w-full">
              <Button
                variant="default"
                size="xl"
                onClick={onSubscribeClick}
                className="w-full sm:w-auto font-bold flex items-center justify-center gap-2 min-h-[48px]"
              >
                <span>Subscribe With PayPal</span>
                <ArrowRight className="h-4 w-4" />
              </Button>
              <a
                href="https://wa.me/442079460912"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-md border border-border bg-background-subtle hover:bg-background-elevated text-white font-semibold text-sm px-6 py-3 min-h-[48px] w-full sm:w-auto transition-colors"
              >
                <MessageSquare className="h-4 w-4 text-emerald-400" />
                <span>Talk to UK Support</span>
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
