"use client";

import React from "react";
import { Play, Tv, ShieldCheck, Zap, Clock, Smartphone, Monitor, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeroSectionProps {
  onExplorePlans: () => void;
  onBrowseChannels: () => void;
}

export function HeroSection({ onExplorePlans, onBrowseChannels }: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:pt-12 lg:pb-20">
      {/* Subtle, restrained cinematic glow */}
      <div 
        aria-hidden="true" 
        className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/10 blur-[120px] opacity-50" 
      />

      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Value Proposition & Clear CTAs */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Clean Trust Badge (Replaced vibecoded edge/buffer pill) */}
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background-elevated px-4 py-1.5 text-xs font-medium text-zinc-300">
              <span className="flex h-2 w-2 rounded-full bg-primary" />
              <span>UK #1 Dedicated Indian Television &amp; Catch-Up Service</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.15] sm:leading-[1.1]">
              Watch <span className="text-primary">350+ Live</span> Indian Channels &amp; Cricket in the UK
            </h1>

            <p className="text-base sm:text-lg text-zinc-400 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Never miss Indian primetime shows due to the UK time difference. Stream Hindi, Punjabi, Tamil, Telugu, and live cricket in crystal-clear 4K with automatic <strong className="text-white font-semibold">7-day catch-up</strong> on your Amazon Firestick or Smart TV.
            </p>

            {/* Metric Call-outs (Unified monochrome icons, strict 8px grid spacing, no rainbow clown palette) */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 pt-2 pb-2">
              <div className="rounded-lg border border-border bg-card p-4 text-left">
                <Tv className="h-4 w-4 text-zinc-400 mb-2" />
                <div className="text-2xl font-bold text-white tracking-tight">350+</div>
                <div className="text-xs text-muted-foreground mt-0.5">Live Channels</div>
              </div>
              <div className="rounded-lg border border-border bg-card p-4 text-left">
                <Clock className="h-4 w-4 text-zinc-400 mb-2" />
                <div className="text-2xl font-bold text-white tracking-tight">7 Days</div>
                <div className="text-xs text-muted-foreground mt-0.5">Catch-up TV</div>
              </div>
              <div className="rounded-lg border border-border bg-card p-4 text-left">
                <Zap className="h-4 w-4 text-zinc-400 mb-2" />
                <div className="text-2xl font-bold text-white tracking-tight">4K UHD</div>
                <div className="text-xs text-muted-foreground mt-0.5">60fps Live Cricket</div>
              </div>
              <div className="rounded-lg border border-border bg-card p-4 text-left">
                <ShieldCheck className="h-4 w-4 text-zinc-400 mb-2" />
                <div className="text-2xl font-bold text-white tracking-tight">100%</div>
                <div className="text-xs text-muted-foreground mt-0.5">PayPal Protected</div>
              </div>
            </div>

            {/* Action Buttons: 48px height, 8px grid aligned, no button shadows */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <Button
                variant="default"
                size="lg"
                onClick={onExplorePlans}
                className="w-full sm:w-auto font-bold flex items-center justify-center gap-2 h-12 px-6"
              >
                <span>View Subscription Plans</span>
                <ChevronRight className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={onBrowseChannels}
                className="w-full sm:w-auto font-medium h-12 px-6"
              >
                Browse Channel Lineup
              </Button>
            </div>

            {/* Device Compatibility Bar with Unified Neutral Icons */}
            <div className="pt-6 border-t border-border">
              <span className="text-xs font-semibold text-zinc-400 block mb-3 uppercase tracking-wider">
                Compatible with all your UK home screens:
              </span>
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-6 text-xs text-zinc-300">
                <span className="flex items-center gap-1.5">
                  <Tv className="h-4 w-4 text-zinc-400" /> Amazon Firestick
                </span>
                <span className="flex items-center gap-1.5">
                  <Monitor className="h-4 w-4 text-zinc-400" /> Android &amp; Google TV
                </span>
                <span className="flex items-center gap-1.5">
                  <Tv className="h-4 w-4 text-zinc-400" /> Apple TV 4K
                </span>
                <span className="flex items-center gap-1.5">
                  <Tv className="h-4 w-4 text-zinc-400" /> Samsung &amp; LG TV
                </span>
                <span className="flex items-center gap-1.5">
                  <Smartphone className="h-4 w-4 text-zinc-400" /> iOS &amp; Android
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Premium Smart TV Streaming Showcase (No cockpit pills, no fake macOS dots) */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl border border-border bg-card p-4 shadow-card">
              
              {/* Smart TV Bezel Frame */}
              <div className="relative rounded-xl overflow-hidden bg-zinc-950 border border-border aspect-[16/10] flex flex-col justify-between p-5">
                {/* Background Broadcast Image Simulation */}
                <div 
                  className="absolute inset-0 bg-cover bg-center opacity-60"
                  style={{
                    backgroundImage: `radial-gradient(ellipse at 80% 20%, rgba(229, 9, 20, 0.35) 0%, rgba(10, 10, 12, 0.95) 75%)`
                  }}
                />
                
                {/* Top Streaming Bar */}
                <div className="relative z-10 flex items-center justify-between">
                  <div className="flex items-center gap-2 rounded bg-black/70 backdrop-blur-md px-3 py-1.5 border border-zinc-800">
                    <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
                    <span className="text-xs font-bold text-white tracking-wide">Star Sports 1 HD</span>
                    <span className="text-[10px] font-semibold bg-zinc-800 text-zinc-300 px-1.5 py-0.5 rounded ml-1">4K</span>
                  </div>
                  <span className="text-xs font-medium text-zinc-300 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded border border-zinc-800">
                    Live UK Broadcast
                  </span>
                </div>

                {/* Match Information Overlay */}
                <div className="relative z-10 mt-auto">
                  <div className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                    ICC World Test Championship
                  </div>
                  <div className="text-xl sm:text-2xl font-black text-white mt-1">
                    India vs England
                  </div>
                  <div className="flex items-center gap-3 text-xs text-zinc-300 mt-1">
                    <span>Day 3 • Session 2</span>
                    <span>•</span>
                    <span>English &amp; Hindi Audio</span>
                  </div>

                  {/* Scrubber Bar */}
                  <div className="mt-4 pt-3 border-t border-zinc-800 flex items-center gap-3">
                    <div className="h-7 w-7 rounded-full bg-primary flex items-center justify-center text-white shrink-0 shadow-sm">
                      <Play className="h-3.5 w-3.5 fill-current ml-0.5" />
                    </div>
                    <div className="h-1.5 flex-1 rounded-full bg-white/20 relative overflow-hidden">
                      <div className="h-full w-4/5 bg-primary rounded-full" />
                    </div>
                    <span className="text-xs font-bold text-red-500 tracking-wider">LIVE</span>
                  </div>
                </div>
              </div>

              {/* Channel Strip: Quick Switcher */}
              <div className="mt-4">
                <div className="text-xs font-semibold text-zinc-400 mb-2.5 px-1 flex items-center justify-between">
                  <span>POPULAR CHANNELS WITH 7-DAY CATCH-UP</span>
                  <span className="text-[11px] text-zinc-500">350+ Total</span>
                </div>
                <div className="grid grid-cols-4 gap-2 text-center text-xs">
                  <div className="rounded-lg border border-primary/60 bg-background-elevated p-2 text-left">
                    <div className="font-bold text-white text-xs truncate">Star Plus</div>
                    <div className="text-[10px] text-zinc-400 truncate">Anupamaa</div>
                  </div>
                  <div className="rounded-lg border border-border bg-background-elevated p-2 text-left hover:border-zinc-700 transition-colors">
                    <div className="font-bold text-white text-xs truncate">Zee TV</div>
                    <div className="text-[10px] text-zinc-400 truncate">Kundali Bhagya</div>
                  </div>
                  <div className="rounded-lg border border-border bg-background-elevated p-2 text-left hover:border-zinc-700 transition-colors">
                    <div className="font-bold text-white text-xs truncate">Sony TV</div>
                    <div className="text-[10px] text-zinc-400 truncate">Kapil Sharma</div>
                  </div>
                  <div className="rounded-lg border border-border bg-background-elevated p-2 text-left hover:border-zinc-700 transition-colors">
                    <div className="font-bold text-white text-xs truncate">PTC Punjabi</div>
                    <div className="text-[10px] text-zinc-400 truncate">Gurbani Live</div>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
