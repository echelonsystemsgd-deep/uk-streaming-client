"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
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
      <div className="h-full rounded-xl border border-gray-200 bg-white p-5 transition-all duration-300 hover:border-gray-300 hover:shadow-md shadow-sm flex flex-col justify-between">
        <div>
          {/* Header Row */}
          <div className="flex items-start justify-between gap-2 mb-2.5">
            <div className="flex items-center gap-2">
              <div className="h-7 w-7 rounded-md bg-red-50 border border-red-200 flex items-center justify-center text-[#dd0e1c] shrink-0">
                <Tv className="h-3.5 w-3.5" />
              </div>
              <div>
                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block">
                  {channel.language}
                </span>
                <h4 className="text-sm font-bold text-gray-900 leading-tight truncate max-w-[170px]">
                  {channel.name}
                </h4>
              </div>
            </div>
            <span className="shrink-0 text-[10px] font-bold px-2 py-0.5 rounded bg-gray-100 border border-gray-200 text-gray-700">
              {channel.quality}
            </span>
          </div>

          {/* Description */}
          <p className="text-xs text-gray-600 leading-relaxed line-clamp-2 mb-4">
            {channel.description}
          </p>
        </div>

        {/* Footer Info Tags */}
        <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-[11px]">
          <span className="flex items-center gap-1.5 font-medium text-gray-700">
            <Clock className="h-3 w-3 text-gray-400" />
            14-Day Catch-up
          </span>
          <span className="font-semibold text-gray-600 bg-gray-100 border border-gray-200 px-2 py-0.5 rounded text-[10px]">
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
            <div className="inline-flex items-center gap-2 rounded-full border border-red-200 bg-red-50 px-3 py-1 text-xs font-semibold text-[#dd0e1c]">
              <span className="h-2 w-2 rounded-full bg-[#dd0e1c] animate-pulse" />
              <span>500+ LIVE &amp; CATCH-UP CHANNELS</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#2c3640] tracking-tight">
              Explore Premium Indian Channels
            </h2>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              Continuous live broadcasting across Hindi, Punjabi, Tamil, Telugu, and sports. Hover over any channel to pause the carousel.
            </p>
          </div>

          {/* Carousel Manual Nav & Play/Pause Controls */}
          <div className="flex items-center gap-2.5 shrink-0">
            <button
              onClick={() => setIsPaused(!isPaused)}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-gray-200 bg-white text-xs font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 shadow-sm transition-colors min-h-[40px]"
              title={isPaused ? "Resume auto-scroll" : "Pause auto-scroll"}
            >
              {isPaused ? <Play className="h-3.5 w-3.5 text-[#dd0e1c]" /> : <Pause className="h-3.5 w-3.5 text-gray-400" />}
              <span>{isPaused ? "Resume" : "Pause"}</span>
            </button>
            <button
              onClick={() => handleScrollManual("left")}
              className="p-2.5 rounded-lg border border-gray-200 bg-white text-gray-700 hover:text-gray-900 hover:bg-gray-50 shadow-sm transition-colors min-h-[40px] min-w-[40px] flex items-center justify-center"
              aria-label="Scroll left"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={() => handleScrollManual("right")}
              className="p-2.5 rounded-lg border border-gray-200 bg-white text-gray-700 hover:text-gray-900 hover:bg-gray-50 shadow-sm transition-colors min-h-[40px] min-w-[40px] flex items-center justify-center"
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
            <Search className="absolute left-3.5 top-3.5 h-4 w-4 text-gray-400 pointer-events-none" />
            <input
              type="text"
              aria-label="Search live Indian TV channels, cricket, and movies"
              placeholder="Search Star, Zee, Cricket..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg border border-gray-300 bg-white pl-10 pr-10 py-2.5 text-base sm:text-sm text-gray-900 placeholder:text-gray-400 focus:border-[#dd0e1c] focus:outline-none focus:ring-1 focus:ring-[#dd0e1c] min-h-[48px] shadow-sm"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-2 top-2 p-1.5 text-gray-400 hover:text-gray-700 rounded-md min-h-[30px] min-w-[30px] flex items-center justify-center"
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
                        ? "bg-[#dd0e1c] text-white shadow-sm"
                        : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 hover:text-gray-900 shadow-sm"
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
        {/* Edge Fade Gradients */}
        <div 
          aria-hidden="true" 
          className="pointer-events-none absolute left-0 top-0 bottom-0 w-12 sm:w-28 bg-gradient-to-r from-[#f4f6f8] via-[#f4f6f8]/60 to-transparent z-10" 
        />
        <div 
          aria-hidden="true" 
          className="pointer-events-none absolute right-0 top-0 bottom-0 w-12 sm:w-28 bg-gradient-to-l from-[#f4f6f8] via-[#f4f6f8]/60 to-transparent z-10" 
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
          <div className="container mx-auto max-w-md py-12 text-center text-gray-600 bg-white rounded-xl border border-gray-200 p-8 shadow-sm">
            <p className="text-base font-semibold text-gray-900">No channels found for &ldquo;{searchQuery}&rdquo;</p>
            <p className="text-xs text-gray-500 mt-1">Try searching for &ldquo;Star&rdquo;, &ldquo;Zee&rdquo;, &ldquo;Sports&rdquo; or reset filter.</p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("all");
              }}
              className="mt-4 inline-flex items-center justify-center rounded-md bg-white border border-gray-300 px-4 py-2 text-xs font-semibold text-gray-800 hover:bg-gray-50 min-h-[40px] shadow-sm"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>

      {/* Footer Info Line & CTA */}
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-8 text-center space-y-4">
        <p className="text-xs text-gray-600">
          Showing <strong>{filteredChannels.length} featured streams</strong> of 500+ live channels included in every UK subscription pass.
        </p>
        <div>
          <Link
            href="/channels"
            className="inline-flex items-center gap-2 text-xs font-semibold text-gray-700 hover:text-gray-900 bg-white border border-gray-300 hover:border-gray-400 px-5 py-2.5 rounded-lg shadow-sm transition-colors min-h-[44px]"
          >
            <span>Explore All 500+ Channels &amp; 14-Day Catch-Up Guide</span>
            <ChevronRight className="h-4 w-4 text-[#dd0e1c]" />
          </Link>
        </div>
      </div>
    </section>
  );
}
