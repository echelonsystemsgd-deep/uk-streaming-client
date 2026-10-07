"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { useSiteShell } from "@/components/layout/SiteShell";
import { JsonLd } from "@/components/seo/JsonLd";
import { CHANNEL_CATEGORIES, FEATURED_CHANNELS, Channel } from "@/data/channels";
import { Search, X, Clock, Tv, ChevronRight, CheckCircle2, Sparkles, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";

const LANGUAGES = [
  { id: "all", label: "All Languages" },
  { id: "Hindi", label: "Hindi" },
  { id: "Punjabi", label: "Punjabi" },
  { id: "Tamil", label: "Tamil" },
  { id: "Telugu", label: "Telugu" },
  { id: "Malayalam", label: "Malayalam" },
  { id: "English", label: "English" },
];

export default function ChannelsPage() {
  const { quickSubscribe } = useSiteShell();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedLanguage, setSelectedLanguage] = useState("all");
  const [selectedQuality, setSelectedQuality] = useState<"all" | "4K UHD" | "1080p HD">("all");

  const filteredChannels = useMemo(() => {
    return FEATURED_CHANNELS.filter((ch) => {
      const matchCat = selectedCategory === "all" || ch.category === selectedCategory;
      const matchLang = selectedLanguage === "all" || ch.language.includes(selectedLanguage);
      const matchQual = selectedQuality === "all" || ch.quality === selectedQuality;
      const matchSearch =
        searchQuery.trim() === "" ||
        ch.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ch.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ch.language.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ch.tag.toLowerCase().includes(searchQuery.toLowerCase());

      return matchCat && matchLang && matchQual && matchSearch;
    });
  }, [searchQuery, selectedCategory, selectedLanguage, selectedQuality]);

  const jsonLdData = {
    "@context": "https://schema.org",
    "@type": "BroadcastService",
    "name": "ChitramTV UK 500+ Channels",
    "broadcastDisplayName": "ChitramTV UK",
    "broadcastTimezone": "Europe/London",
    "inLanguage": ["hi", "pa", "ta", "te", "ml", "en"],
    "description": "Stream 500+ live Indian TV channels, live cricket in 4K UHD, and automatic 14-day catch-up across the UK.",
    "provider": {
      "@type": "Organization",
      "name": "ChitramTV UK",
      "url": "https://chitramtv.eu"
    }
  };

  return (
    <>
      <JsonLd data={jsonLdData} />

      {/* Breadcrumb Strip */}
      <div className="border-b border-border/60 bg-zinc-950/60 py-2.5 px-4 text-xs text-zinc-400">
        <div className="container mx-auto max-w-7xl flex items-center gap-2">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <span>/</span>
          <span className="text-white font-medium">Channels &amp; EPG Guide</span>
        </div>
      </div>

      {/* Hero Header */}
      <section className="relative overflow-hidden pt-8 pb-12 sm:pt-12 sm:pb-16 bg-gradient-to-b from-zinc-900/40 to-background border-b border-border/60">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background-elevated px-3.5 py-1 text-xs font-semibold text-primary mb-4">
            <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
            <span>COMPLETE 2026 UK BROADCAST LINEUP</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Explore <span className="text-primary">500+ Live Channels</span> with 14-Day Catch-Up
          </h1>
          <p className="mt-4 text-sm sm:text-base text-zinc-400 leading-relaxed">
            Never miss Indian primetime shows due to the 5.5-hour UK time gap. Stream Hindi daily serials, Punjabi Gurbani, South Indian cinema, and 4K cricket with automatic 14-day recording.
          </p>
        </div>
      </section>

      {/* Time-Shift Catch-up Explainer Banner */}
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 -mt-6">
        <div className="rounded-xl border border-zinc-800 bg-card p-4 sm:p-5 shadow-card flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0">
              <Clock className="h-5 w-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-white flex items-center gap-2">
                <span>The 5.5-Hour UK Time Shift Solved</span>
                <span className="text-[10px] bg-primary/20 text-red-400 px-2 py-0.5 rounded font-semibold uppercase">No DVR Needed</span>
              </div>
              <p className="text-xs text-zinc-400 mt-0.5 leading-relaxed">
                When shows air in India at 8:00 PM, it is only 2:30 PM in London. ChitramTV records every second so you can watch in your evening.
              </p>
            </div>
          </div>
          <Button
            variant="default"
            size="sm"
            onClick={quickSubscribe}
            className="w-full md:w-auto shrink-0 font-bold text-xs h-10 px-5"
          >
            <span>Start Watching Now</span>
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </div>

      {/* Interactive Filter Suite */}
      <section className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-6">
        {/* Search & Quality Controls */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          <div className="relative w-full md:max-w-md">
            <Search className="absolute left-3.5 top-3.5 h-4 w-4 text-muted-foreground pointer-events-none" />
            <input
              type="text"
              placeholder="Search Star Plus, Zee, Cricket, PTC, Sun TV..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg border border-border bg-background pl-10 pr-10 py-2.5 text-base sm:text-sm text-white placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary min-h-[46px]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-2 top-2 p-1.5 text-muted-foreground hover:text-white rounded-md min-h-[32px] min-w-[32px] flex items-center justify-center"
                aria-label="Clear search"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* Quality Toggles */}
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pb-1">
            <span className="text-xs font-semibold text-zinc-400 shrink-0 mr-1 flex items-center gap-1">
              <Filter className="h-3.5 w-3.5 text-zinc-500" /> Quality:
            </span>
            {(["all", "4K UHD", "1080p HD"] as const).map((q) => (
              <button
                key={q}
                onClick={() => setSelectedQuality(q)}
                className={`text-xs px-3 py-1.5 rounded-md font-medium min-h-[36px] transition-colors select-none shrink-0 ${
                  selectedQuality === q
                    ? "bg-zinc-800 text-white border border-zinc-600"
                    : "text-zinc-400 bg-background-elevated hover:text-white border border-border"
                }`}
              >
                {q === "all" ? "All Formats" : q}
              </button>
            ))}
          </div>
        </div>

        {/* Language Tabs */}
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400 block mb-2">
            Language Dialect
          </span>
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pb-2 -mx-4 px-4 sm:mx-0 sm:px-0">
            {LANGUAGES.map((lang) => {
              const isSelected = selectedLanguage === lang.id;
              return (
                <button
                  key={lang.id}
                  onClick={() => setSelectedLanguage(lang.id)}
                  className={`rounded-lg px-4 py-2 text-xs font-semibold whitespace-nowrap min-h-[42px] flex items-center shrink-0 transition-colors select-none ${
                    isSelected
                      ? "bg-primary text-white"
                      : "bg-card border border-border/80 text-muted-foreground hover:bg-background-subtle hover:text-white"
                  }`}
                >
                  {lang.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Category Tabs */}
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400 block mb-2">
            Genre &amp; Content Type
          </span>
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pb-2 -mx-4 px-4 sm:mx-0 sm:px-0">
            {CHANNEL_CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`rounded-lg px-4 py-2 text-xs font-semibold whitespace-nowrap min-h-[42px] flex items-center shrink-0 transition-colors select-none ${
                    isSelected
                      ? "bg-zinc-800 border border-zinc-600 text-white"
                      : "bg-card border border-border/80 text-muted-foreground hover:bg-background-subtle hover:text-white"
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Results Counter */}
        <div className="flex items-center justify-between text-xs text-zinc-400 pt-2 border-t border-border/60">
          <div>
            Showing <strong className="text-white">{filteredChannels.length}</strong> channels
            {searchQuery && <span> matching &ldquo;{searchQuery}&rdquo;</span>}
          </div>
          {(selectedCategory !== "all" || selectedLanguage !== "all" || selectedQuality !== "all" || searchQuery) && (
            <button
              onClick={() => {
                setSelectedCategory("all");
                setSelectedLanguage("all");
                setSelectedQuality("all");
                setSearchQuery("");
              }}
              className="text-primary hover:underline font-semibold"
            >
              Reset all filters
            </button>
          )}
        </div>

        {/* Channel Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 pt-2">
          {filteredChannels.length > 0 ? (
            filteredChannels.map((channel) => (
              <div
                key={channel.id}
                className="rounded-xl border border-zinc-800 bg-card p-5 flex flex-col justify-between hover:border-zinc-700 transition-colors shadow-card"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded-lg bg-zinc-800 border border-zinc-700 flex items-center justify-center text-zinc-300 shrink-0">
                        <Tv className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block">
                          {channel.language}
                        </span>
                        <h3 className="text-base font-bold text-white mt-0.5 leading-snug">
                          {channel.name}
                        </h3>
                      </div>
                    </div>
                    <span className="shrink-0 text-[10px] font-bold px-2 py-0.5 rounded bg-zinc-900 border border-zinc-700 text-zinc-300">
                      {channel.quality}
                    </span>
                  </div>

                  <p className="text-xs text-zinc-400 leading-relaxed line-clamp-3 mb-4 mt-2">
                    {channel.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-zinc-800 flex items-center justify-between text-[11px] text-zinc-400">
                  <span className="flex items-center gap-1.5 font-medium text-zinc-300">
                    <Clock className="h-3.5 w-3.5 text-zinc-400" />
                    14-Day Catch-up TV
                  </span>
                  <span className="font-semibold text-zinc-400 bg-zinc-900 border border-zinc-800 px-2 py-0.5 rounded text-[10px]">
                    {channel.tag}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full py-16 text-center text-muted-foreground bg-card rounded-xl border border-border p-8 max-w-lg mx-auto">
              <p className="text-base font-semibold text-white">No channels found</p>
              <p className="text-xs text-zinc-400 mt-1">Try resetting the language or category filters.</p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setSelectedCategory("all");
                  setSelectedLanguage("all");
                  setSelectedQuality("all");
                  setSearchQuery("");
                }}
                className="mt-4 font-semibold text-xs"
              >
                Reset Filters
              </Button>
            </div>
          )}
        </div>

        {/* Bottom CTA Card */}
        <div className="rounded-2xl border border-border bg-gradient-to-r from-zinc-900 via-background-elevated to-zinc-900 p-6 sm:p-10 text-center space-y-4 max-w-3xl mx-auto mt-12">
          <h2 className="text-xl sm:text-2xl font-bold text-white">
            Get Instant Access to All 500+ Channels
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 max-w-xl mx-auto">
            Activation takes under 2 minutes. Receive your credentials via WhatsApp &amp; Email immediately following secure PayPal checkout.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Button
              variant="default"
              size="lg"
              onClick={quickSubscribe}
              className="w-full sm:w-auto font-bold h-12 px-6"
            >
              Subscribe via PayPal (£6.43/mo)
            </Button>
            <Link href="/buy-now">
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto font-medium h-12 px-6"
              >
                Compare All Pricing Passes
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
