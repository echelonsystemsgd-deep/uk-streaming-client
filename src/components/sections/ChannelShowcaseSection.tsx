"use client";

import React, { useState, useRef } from "react";
import { Search, X, Clock, Play, Pause, ChevronLeft, ChevronRight, Tv, Radio } from "lucide-react";
import { CHANNEL_CATEGORIES, FEATURED_CHANNELS, Channel } from "@/data/channels";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function ChannelShowcaseSection() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isPaused, setIsPaused] = useState(false);

  const carouselRef1 = useRef<HTMLDivElement>(null);
  const carouselRef2 = useRef<HTMLDivElement>(null);

  // Filter channels based on category and search
  const filteredChannels = FEATURED_CHANNELS.filter((ch) => {
    const matchesCategory =
      selectedCategory === "all" || ch.category === selectedCategory;
    const matchesSearch =
      ch.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ch.language.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ch.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Split channels into two rows for multi-directional streaming marquee
  const row1Channels = filteredChannels.filter((_, idx) => idx % 2 === 0);
  const row2Channels = filteredChannels.filter((_, idx) => idx % 2 === 1);

  // Fallback if one row is empty
  const displayRow1 = row1Channels.length > 0 ? row1Channels : filteredChannels;
  const displayRow2 = row2Channels.length > 0 ? row2Channels : filteredChannels;

  // Duplicate arrays for infinite seamless looping
  const infiniteRow1 = [...displayRow1, ...displayRow1, ...displayRow1, ...displayRow1];
  const infiniteRow2 = [...displayRow2, ...displayRow2, ...displayRow2, ...displayRow2];

  const handleScrollManual = (direction: "left" | "right") => {
    const distance = direction === "left" ? -400 : 400;
    if (carouselRef1.current) {
      carouselRef1.current.scrollBy({ left: distance, behavior: "smooth" });
    }
    if (carouselRef2.current) {
      carouselRef2.current.scrollBy({ left: -distance, behavior: "smooth" });
    }
  };

  const renderChannelCard = (channel: Channel, uniqueKey: string) => (
    <div
      key={uniqueKey}
      className="w-[280px] sm:w-[320px] shrink-0 select-none group"
    >
      <div className="h-full rounded-xl border border-zinc-800 bg-card p-5 transition-all duration-300 hover:border-zinc-700 hover:bg-background-elevated shadow-card flex flex-col justify-between">
        <div>
          {/* Header Row */}
          <div className="flex items-start justify-between gap-2 mb-2.5">
            <div className="flex items-center gap-2">
              <div className="h-7 w-7 rounded-md bg-zinc-800 border border-zinc-700 flex items-center justify-center text-zinc-300 shrink-0">
                <Tv className="h-3.5 w-3.5 text-primary" />
              </div>
              <div>
                <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block">
                  {channel.language}
                </span>
                <h4 className="text-sm font-bold text-white leading-tight truncate max-w-[170px]">
                  {channel.name}
                </h4>
              </div>
            </div>
            <span className="shrink-0 text-[10px] font-bold px-2 py-0.5 rounded bg-zinc-900 border border-zinc-700 text-zinc-300">
              {channel.quality}
            </span>
          </div>

          {/* Description */}
          <p className="text-xs text-zinc-400 leading-relaxed line-clamp-2 mb-4">
            {channel.description}
          </p>
        </div>

        {/* Footer Info Tags */}
        <div className="pt-3 border-t border-zinc-800 flex items-center justify-between text-[11px]">
          <span className="flex items-center gap-1.5 font-medium text-zinc-300">
            <Clock className="h-3 w-3 text-zinc-400" />
            7-Day Catch-up
          </span>
          <span className="font-semibold text-zinc-400 bg-zinc-900 border border-zinc-800 px-2 py-0.5 rounded text-[10px]">
            {channel.tag}
          </span>
        </div>
      </div>
    </div>
  );

  return (
    <section id="channels" className="py-16 sm:py-20 bg-background-elevated/40 border-b border-border/60 overflow-hidden relative">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-8 sm:mb-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl space-y-2">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1 text-xs font-semibold text-primary">
              <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
              <span>350+ LIVE &amp; CATCH-UP CHANNELS</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              Explore Premium Indian Channels
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              Continuous live broadcasting across Hindi, Punjabi, Tamil, Telugu, and sports. Hover over any channel to pause the carousel.
            </p>
          </div>

          {/* Carousel Manual Nav & Play/Pause Controls */}
          <div className="flex items-center gap-2.5 shrink-0">
            <button
              onClick={() => setIsPaused(!isPaused)}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-border bg-card text-xs font-medium text-zinc-300 hover:text-white hover:bg-background-subtle transition-colors min-h-[40px]"
              title={isPaused ? "Resume auto-scroll" : "Pause auto-scroll"}
            >
              {isPaused ? <Play className="h-3.5 w-3.5 text-primary" /> : <Pause className="h-3.5 w-3.5 text-zinc-400" />}
              <span>{isPaused ? "Resume" : "Pause"}</span>
            </button>
            <button
              onClick={() => handleScrollManual("left")}
              className="p-2.5 rounded-lg border border-border bg-card text-zinc-300 hover:text-white hover:bg-background-subtle transition-colors min-h-[40px] min-w-[40px] flex items-center justify-center"
              aria-label="Scroll left"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={() => handleScrollManual("right")}
              className="p-2.5 rounded-lg border border-border bg-card text-zinc-300 hover:text-white hover:bg-background-subtle transition-colors min-h-[40px] min-w-[40px] flex items-center justify-center"
              aria-label="Scroll right"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Search Bar & Category Filter Strip */}
        <div className="mt-8 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          {/* Search Box */}
          <div className="relative w-full md:max-w-xs">
            <Search className="absolute left-3.5 top-3.5 h-4 w-4 text-muted-foreground pointer-events-none" />
            <input
              type="text"
              placeholder="Search Star, Zee, Cricket..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg border border-border bg-background pl-10 pr-10 py-2.5 text-sm text-white placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary min-h-[44px]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-2 top-2 p-1.5 text-muted-foreground hover:text-white rounded-md min-h-[30px] min-w-[30px] flex items-center justify-center"
                aria-label="Clear search"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* Category Pills Strip without ugly scrollbars */}
          <div className="overflow-x-auto scrollbar-none pb-1 -mx-4 px-4 md:mx-0 md:px-0">
            <div className="flex items-center gap-2">
              {CHANNEL_CATEGORIES.map((cat) => {
                const isSelected = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`rounded-lg px-3.5 py-2 text-xs font-semibold whitespace-nowrap min-h-[40px] flex items-center shrink-0 transition-colors select-none ${
                      isSelected
                        ? "bg-primary text-white"
                        : "bg-card border border-border/80 text-muted-foreground hover:bg-background-subtle hover:text-white"
                    }`}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

      </div>

      {/* Moving Carousel Tracks Container */}
      <div 
        className="relative w-full"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Cinematic Edge Fade Gradients */}
        <div 
          aria-hidden="true" 
          className="pointer-events-none absolute left-0 top-0 bottom-0 w-12 sm:w-28 bg-gradient-to-r from-background via-background/60 to-transparent z-10" 
        />
        <div 
          aria-hidden="true" 
          className="pointer-events-none absolute right-0 top-0 bottom-0 w-12 sm:w-28 bg-gradient-to-l from-background via-background/60 to-transparent z-10" 
        />

        {filteredChannels.length > 0 ? (
          <div className="space-y-4">
            {/* Carousel Row 1: Gliding Left */}
            <div
              ref={carouselRef1}
              className="flex overflow-x-hidden select-none"
            >
              <div
                className={`flex gap-4 sm:gap-6 ${
                  isPaused ? "" : "animate-marquee"
                }`}
                style={{
                  willChange: "transform",
                }}
              >
                {infiniteRow1.map((ch, idx) =>
                  renderChannelCard(ch, `row1-${ch.id}-${idx}`)
                )}
              </div>
            </div>

            {/* Carousel Row 2: Gliding Right (Opposite Direction) */}
            <div
              ref={carouselRef2}
              className="flex overflow-x-hidden select-none"
            >
              <div
                className={`flex gap-4 sm:gap-6 ${
                  isPaused ? "" : "animate-marquee-reverse"
                }`}
                style={{
                  willChange: "transform",
                }}
              >
                {infiniteRow2.map((ch, idx) =>
                  renderChannelCard(ch, `row2-${ch.id}-${idx}`)
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="container mx-auto max-w-md py-12 text-center text-muted-foreground bg-card rounded-xl border border-border p-8">
            <p className="text-base font-semibold text-white">No channels found for &ldquo;{searchQuery}&rdquo;</p>
            <p className="text-xs text-zinc-400 mt-1">Try searching for &ldquo;Star&rdquo;, &ldquo;Zee&rdquo;, &ldquo;Sports&rdquo; or reset filter.</p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("all");
              }}
              className="mt-4 inline-flex items-center justify-center rounded-md bg-background border border-border px-4 py-2 text-xs font-semibold text-white hover:bg-background-subtle min-h-[40px]"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>

      {/* Footer Info Line */}
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-8 text-center">
        <p className="text-xs text-muted-foreground">
          Showing <strong>{filteredChannels.length} featured streams</strong> of 350+ live channels included in every UK subscription pass.
        </p>
      </div>
    </section>
  );
}
