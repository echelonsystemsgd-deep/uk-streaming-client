"use client";

import React, { useState } from "react";
import { Search, X, Clock, Film, Radio, Sparkles, Filter } from "lucide-react";
import { CHANNEL_CATEGORIES, FEATURED_CHANNELS, Channel } from "@/data/channels";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function ChannelShowcaseSection() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredChannels = FEATURED_CHANNELS.filter((ch) => {
    const matchesCategory =
      selectedCategory === "all" || ch.category === selectedCategory;
    const matchesSearch =
      ch.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ch.language.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ch.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="channels" className="py-16 sm:py-20 bg-background-elevated/40 border-b border-border/60">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12 space-y-3 sm:space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-primary">
            LIVE & ON-DEMAND CONTENT
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Explore 350+ Premium Indian Channels
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            From daily serials and live IPL cricket to Punjabi Gurbani and South Indian blockbusters, enjoy seamless streaming across all major regional dialects.
          </p>
        </div>

        {/* Search Bar & Stats - Mobile-first one-handed layout */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-6">
          <div className="relative w-full sm:max-w-md">
            <Search className="absolute left-3.5 top-3.5 h-4 w-4 text-muted-foreground pointer-events-none" />
            <input
              type="text"
              placeholder="Search channels or shows (e.g. Zee, Star, Cricket)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg border border-border bg-background pl-10 pr-10 py-3 text-sm text-white placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary min-h-[46px]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-2 top-2 p-1.5 text-muted-foreground hover:text-white rounded-md min-h-[32px] min-w-[32px] flex items-center justify-center"
                aria-label="Clear search input"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          <div className="text-xs text-muted-foreground text-center sm:text-right">
            Showing <strong className="text-white">{filteredChannels.length}</strong> channels
            {searchQuery && <span> for &ldquo;{searchQuery}&rdquo;</span>}
          </div>
        </div>

        {/* Category Tabs: Mobile One-Handed Horizontal Scrollable Strip with 44px Touch Targets */}
        <div className="relative mb-8 -mx-4 px-4 sm:mx-0 sm:px-0">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none touch-pan-x">
            {CHANNEL_CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`rounded-lg px-4 py-2.5 text-xs font-semibold whitespace-nowrap min-h-[44px] flex items-center shrink-0 transition-colors select-none ${
                    isSelected
                      ? "bg-primary text-white"
                      : "bg-background-elevated border border-border/80 text-muted-foreground hover:bg-background-subtle hover:text-white"
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Channel Grid: Responsive from 1 column on mobile to 4 on desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {filteredChannels.length > 0 ? (
            filteredChannels.map((channel) => (
              <Card
                key={channel.id}
                className="flex flex-col justify-between p-5 bg-card border-border hover:border-zinc-700 transition-colors"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div>
                      <span className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider block">
                        {channel.language}
                      </span>
                      <h4 className="text-base font-bold text-white mt-0.5">
                        {channel.name}
                      </h4>
                    </div>
                    <span className="shrink-0 text-[10px] font-semibold px-2 py-0.5 rounded bg-zinc-800 border border-zinc-700 text-zinc-300">
                      {channel.quality}
                    </span>
                  </div>

                  <p className="text-xs text-zinc-400 leading-relaxed line-clamp-3 mb-4">
                    {channel.description}
                  </p>
                </div>

                {/* Card Footer Info Tags */}
                <div className="pt-3 border-t border-border flex items-center justify-between text-[11px] text-zinc-400">
                  <span className="flex items-center gap-1.5 font-medium text-zinc-300">
                    <Clock className="h-3 w-3 text-zinc-400" />
                    7-Day Catch-up
                  </span>
                  <span className="font-medium text-zinc-400">
                    {channel.tag}
                  </span>
                </div>
              </Card>
            ))
          ) : (
            <div className="col-span-full py-12 text-center text-muted-foreground bg-card rounded-lg border border-border p-6">
              <p className="text-base font-semibold text-white">No channels found matching &ldquo;{searchQuery}&rdquo;</p>
              <p className="text-xs mt-1">Try searching for &ldquo;Star&rdquo;, &ldquo;Zee&rdquo;, &ldquo;PTC&rdquo;, or reset the category filter.</p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("all");
                }}
                className="mt-4 inline-flex items-center justify-center rounded-md bg-background-subtle border border-border px-4 py-2 text-xs font-semibold text-white hover:bg-background-elevated min-h-[44px]"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>

        {/* Footer Note about full 350+ line-up */}
        <div className="mt-10 sm:mt-12 text-center text-xs text-muted-foreground">
          Looking for a specific regional channel or international sports feed? Over 350+ live channels and 10,000+ VOD movies are included with every subscription.
        </div>

      </div>
    </section>
  );
}
