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
    <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28 border-b border-border/60">
      {/* Background Ambient Lighting (Dark Cinematic convention) */}
      <div 
        aria-hidden="true" 
        className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[1000px] h-[550px] bg-gradient-to-b from-primary/15 via-accent/5 to-transparent blur-[140px] opacity-70" 
      />

      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Value Headline & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Functional Info Pill (No decorative filler) */}
            <div className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-background-elevated px-3.5 py-1 text-xs font-semibold text-muted-foreground">
              <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Dedicated UK Edge Delivery • Buffer-Free 4K</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.15] sm:leading-[1.1]">
              Over <span className="text-primary">350+ Live</span> Indian TV Channels & Movies in the UK
            </h1>

            <p className="text-base sm:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Stream Hindi, Punjabi, Tamil, Telugu, Malayalam & live cricket in crystal-clear 4K Ultra HD. Featuring automatic <strong className="text-foreground">7-day catch-up</strong> so you never miss Indian primetime shows due to the UK time difference.
            </p>

            {/* Metric Call-outs with Icons (Adhering to icon rule for fast scanning) */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 pt-2 pb-2">
              <div className="rounded-lg border border-border/70 bg-card p-3 shadow-card text-left">
                <Tv className="h-4 w-4 text-primary mb-1.5" />
                <div className="text-xl font-bold text-white">350+</div>
                <div className="text-xs text-muted-foreground">Live Channels</div>
              </div>
              <div className="rounded-lg border border-border/70 bg-card p-3 shadow-card text-left">
                <Clock className="h-4 w-4 text-accent mb-1.5" />
                <div className="text-xl font-bold text-white">7 Days</div>
                <div className="text-xs text-muted-foreground">Catch-up TV</div>
              </div>
              <div className="rounded-lg border border-border/70 bg-card p-3 shadow-card text-left">
                <Zap className="h-4 w-4 text-sky-400 mb-1.5" />
                <div className="text-xl font-bold text-white">4K UHD</div>
                <div className="text-xs text-muted-foreground">60fps Cricket</div>
              </div>
              <div className="rounded-lg border border-border/70 bg-card p-3 shadow-card text-left">
                <ShieldCheck className="h-4 w-4 text-emerald-400 mb-1.5" />
                <div className="text-xl font-bold text-white">99.9%</div>
                <div className="text-xs text-muted-foreground">UK Server Uptime</div>
              </div>
            </div>

            {/* Conversion CTA Group (No shadows on buttons!) */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-3.5 pt-2">
              <Button
                variant="default"
                size="xl"
                onClick={onExplorePlans}
                className="w-full sm:w-auto font-bold flex items-center justify-center gap-2 min-h-[48px]"
              >
                <span>View Subscription Plans</span>
                <ChevronRight className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="xl"
                onClick={onBrowseChannels}
                className="w-full sm:w-auto font-medium min-h-[48px]"
              >
                Browse Channel Lineup
              </Button>
            </div>

            {/* Device Compatibility Bar */}
            <div className="pt-4 border-t border-border/40">
              <span className="text-xs font-semibold text-muted-foreground block mb-2.5">
                COMPATIBLE WITH ALL YOUR UK SCREENS:
              </span>
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-6 text-xs text-slate-300">
                <span className="flex items-center gap-1.5">
                  <Tv className="h-3.5 w-3.5 text-accent" /> Amazon Firestick
                </span>
                <span className="flex items-center gap-1.5">
                  <Monitor className="h-3.5 w-3.5 text-sky-400" /> Android & Google TV
                </span>
                <span className="flex items-center gap-1.5">
                  <Tv className="h-3.5 w-3.5 text-primary" /> Apple TV 4K
                </span>
                <span className="flex items-center gap-1.5">
                  <Tv className="h-3.5 w-3.5 text-slate-400" /> Samsung & LG TV
                </span>
                <span className="flex items-center gap-1.5">
                  <Smartphone className="h-3.5 w-3.5 text-emerald-400" /> iOS & Android Mobile
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: High-End Streaming Platform UI Mockup (Card with exclusive shadow) */}
          <div className="lg:col-span-5">
            <div className="relative rounded-xl border border-border/80 bg-card p-4 shadow-card overflow-hidden">
              {/* Screen Top Bar */}
              <div className="flex items-center justify-between pb-3 border-b border-border/60 text-xs">
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-red-500/80" />
                  <span className="h-3 w-3 rounded-full bg-yellow-500/80" />
                  <span className="h-3 w-3 rounded-full bg-green-500/80" />
                  <span className="ml-2 font-mono text-[11px] text-muted-foreground">DesiStream Player 4K</span>
                </div>
                <span className="rounded bg-primary/20 px-2 py-0.5 text-[10px] font-bold text-primary flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary animate-ping" />
                  LIVE UK FEED
                </span>
              </div>

              {/* Main TV Frame Screen */}
              <div className="relative mt-3 rounded-lg overflow-hidden bg-background-elevated border border-border/50 aspect-video flex flex-col justify-between p-4">
                {/* Visual Backdrop Simulation */}
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background-elevated/70 to-transparent z-0" />
                <div 
                  className="absolute inset-0 opacity-30 mix-blend-screen bg-cover bg-center"
                  style={{
                    backgroundImage: `radial-gradient(circle at 70% 30%, rgba(229, 9, 20, 0.4) 0%, rgba(11, 16, 26, 0.95) 75%)`
                  }}
                />

                {/* Live Channel Indicator */}
                <div className="relative z-10 flex items-center justify-between">
                  <div className="flex items-center gap-2 rounded bg-black/60 backdrop-blur-sm px-2.5 py-1 border border-white/10">
                    <span className="text-xs font-bold text-white">Star Sports 1 HD</span>
                    <span className="text-[10px] font-bold bg-accent text-accent-foreground px-1.5 rounded">4K 60FPS</span>
                  </div>
                  <span className="text-[11px] font-mono text-emerald-400 bg-black/60 backdrop-blur-sm px-2 py-0.5 rounded border border-white/10">
                    Ping: 12ms (London)
                  </span>
                </div>

                {/* Match / Show Overlay */}
                <div className="relative z-10 mt-auto">
                  <div className="text-xs font-semibold text-accent uppercase tracking-wider">
                    Live Broadcast • ICC / Bilateral Cricket
                  </div>
                  <div className="text-lg font-extrabold text-white mt-0.5">
                    India vs England — Test Series 2026
                  </div>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1">
                    <span>Session 2 Live</span>
                    <span>•</span>
                    <span>English & Hindi Commentary</span>
                    <span>•</span>
                    <span className="text-emerald-400 font-medium">Zero Buffer</span>
                  </div>
                </div>

                {/* Player Playhead & Catch-up Scrubber */}
                <div className="relative z-10 mt-3 pt-2 border-t border-white/10 flex items-center gap-3">
                  <div className="h-6 w-6 rounded-full bg-primary flex items-center justify-center text-white shrink-0">
                    <Play className="h-3 w-3 fill-current ml-0.5" />
                  </div>
                  <div className="h-1.5 flex-1 rounded-full bg-white/20 relative overflow-hidden">
                    <div className="h-full w-4/5 bg-primary rounded-full" />
                  </div>
                  <span className="text-[10px] font-mono text-muted-foreground">LIVE</span>
                </div>
              </div>

              {/* Channel Strip Thumbnail Carousel */}
              <div className="mt-3 grid grid-cols-4 gap-2 text-center text-xs">
                <div className="rounded border border-border/80 bg-background-elevated p-2 hover:border-primary/50 transition-colors">
                  <div className="font-bold text-white text-xs">Star Plus</div>
                  <div className="text-[10px] text-muted-foreground">Anupamaa</div>
                </div>
                <div className="rounded border border-border/80 bg-background-elevated p-2 hover:border-primary/50 transition-colors">
                  <div className="font-bold text-white text-xs">Zee TV</div>
                  <div className="text-[10px] text-muted-foreground">Kundali</div>
                </div>
                <div className="rounded border border-border/80 bg-background-elevated p-2 hover:border-primary/50 transition-colors">
                  <div className="font-bold text-white text-xs">Sony SET</div>
                  <div className="text-[10px] text-muted-foreground">Kapil Sharma</div>
                </div>
                <div className="rounded border border-border/80 bg-background-elevated p-2 hover:border-primary/50 transition-colors">
                  <div className="font-bold text-white text-xs">PTC Punjabi</div>
                  <div className="text-[10px] text-muted-foreground">Gurbani Live</div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
