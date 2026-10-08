"use client";

import React from "react";
import Link from "next/link";
import { Clock, Tv, ChevronRight, Sparkles } from "lucide-react";
import { FEATURED_CHANNELS } from "@/data/channels";

// Select 4 iconic flagship channels representing Entertainment, Punjabi devotional, and Cricket
const SAMPLE_CHANNELS = [
  {
    name: "Star Plus HD",
    language: "Hindi",
    category: "Entertainment",
    quality: "1080p HD",
    tag: "Primetime Serials",
    description: "Home of UK's favorite Indian daily soaps including Anupamaa, Yeh Rishta Kya Kehlata Hai & Ghum Hai Kisikey Pyaar Meiin with 14-day catch-up.",
    shows: "Anupamaa • Yeh Rishta",
  },
  {
    name: "Sony Entertainment TV",
    language: "Hindi",
    category: "Entertainment",
    quality: "1080p HD",
    tag: "Reality & Drama",
    description: "Top-rated family entertainment featuring Indian Idol, CID, Kaun Banega Crorepati, and weekend special programming.",
    shows: "Indian Idol • CID • KBC",
  },
  {
    name: "PTC Punjabi HD",
    language: "Punjabi",
    category: "Spiritual & News",
    quality: "1080p HD",
    tag: "Daily Gurbani",
    description: "Live morning and evening Gurbani broadcast direct from Sri Harmandir Sahib (Amritsar), plus regional Punjab news and music.",
    shows: "Live Golden Temple Gurbani",
  },
  {
    name: "Star Sports 1 HD",
    language: "English / Hindi",
    category: "Sports",
    quality: "1080p HD",
    tag: "Live Cricket",
    description: "Complete live coverage of ICC Cricket World Cups, IPL 2026, and India International Test & ODI series with 7-day replay.",
    shows: "IPL 2026 • ICC Tournaments",
  },
];

export function ChannelShowcaseSection() {
  return (
    <section
      id="channels"
      className="py-14 sm:py-20 bg-white border-b border-gray-200 overflow-hidden relative"
    >
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-red-200 bg-red-50 px-3.5 py-1 text-xs font-semibold text-[#dd0e1c]">
            <Sparkles className="h-3.5 w-3.5" />
            <span>500+ LIVE &amp; CATCH-UP CHANNELS</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#2c3640] tracking-tight">
            Explore Premium Indian Channels
          </h2>
          <p className="text-xs sm:text-base text-gray-600 leading-relaxed">
            Continuous live broadcasting across Hindi, Punjabi, Tamil, Telugu, and sports. Every channel includes our automatic 14-day cloud rewind.
          </p>
        </div>

        {/* 4 Static Flagship Channel Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {SAMPLE_CHANNELS.map((ch, idx) => (
            <div
              key={idx}
              className="rounded-xl border border-gray-200 bg-white p-5 flex flex-col justify-between hover:border-gray-300 hover:shadow-md transition-all shadow-sm group"
            >
              <div>
                {/* Header Row */}
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="h-8 w-8 rounded-lg bg-red-50 border border-red-200 flex items-center justify-center text-[#dd0e1c] shrink-0 group-hover:bg-[#dd0e1c] group-hover:text-white transition-colors">
                      <Tv className="h-4 w-4" />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block">
                        {ch.language}
                      </span>
                      <h3 className="text-sm sm:text-base font-bold text-gray-900 leading-tight">
                        {ch.name}
                      </h3>
                    </div>
                  </div>
                  <span className="shrink-0 text-[10px] font-bold px-2 py-0.5 rounded bg-gray-100 border border-gray-200 text-gray-700">
                    {ch.quality}
                  </span>
                </div>

                {/* Description */}
                <p className="text-xs text-gray-600 leading-relaxed mb-4">
                  {ch.description}
                </p>

                {/* Highlight Badge */}
                <div className="bg-gray-50 border border-gray-100 rounded-lg p-2 text-[11px] text-gray-700 mb-2">
                  <span className="font-semibold text-gray-900">Featured: </span>
                  <span>{ch.shows}</span>
                </div>
              </div>

              {/* Card Footer */}
              <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-[11px] text-gray-500">
                <span className="flex items-center gap-1.5 font-medium text-gray-700">
                  <Clock className="h-3.5 w-3.5 text-gray-400" />
                  14-Day DVR
                </span>
                <span className="font-semibold text-gray-700 bg-gray-100 border border-gray-200 px-2 py-0.5 rounded text-[10px]">
                  {ch.tag}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Button to Full Channel Catalogue */}
        <div className="mt-8 sm:mt-10 text-center">
          <Link
            href="/channels"
            className="inline-flex items-center justify-center gap-2 bg-[#dd0e1c] hover:bg-[#b00b16] text-white px-8 py-3.5 rounded-lg font-bold uppercase text-xs sm:text-sm tracking-wider shadow transition-colors min-h-[48px]"
          >
            <span>View All 500+ Channels &amp; Full TV Guide</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
          <p className="text-xs text-gray-500 mt-2">
            Includes Hindi, Punjabi, Gujarati, Tamil, Telugu, Malayalam, Bengali &amp; Sports
          </p>
        </div>
      </div>
    </section>
  );
}
