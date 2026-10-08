"use client";

import React from "react";
import Link from "next/link";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  Clock,
  Film,
  RotateCcw,
  Sliders,
  Shield,
  Radio,
  Tv,
  Smartphone,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

export default function FeaturesPage() {
  const jsonLdData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "ChitramTV UK Features & 14 Days Catch-Up TV",
    "description": "Explore ChitramTV UK features: 14 Days Catch-Up TV, 10,000+ Movies on demand, Timeshift, Parental Control, Internet Radio & Multi-Room 4 Devices.",
    "publisher": {
      "@type": "Organization",
      "name": "Shiva Technology Ltd",
      "telephone": "07979637777"
    }
  };

  const featureCards = [
    {
      icon: Clock,
      title: "14 Days CatchUp TV",
      description: "14 Days after live broadcasting, you can still watch your missed favourite TV shows, cricket matches & serials with our high-speed automatic Cloud DVR CatchUp function.",
      highlight: "14 Days DVR",
      color: "text-[#dd0e1c] bg-red-50",
    },
    {
      icon: Film,
      title: "Movies on Demand",
      description: "A constantly updated and free collection of over 10,000 exciting movies sorted by genre and language. New blockbusters updated weekly from classic evergreens to recent theatrical releases.",
      highlight: "10,000+ Titles",
      color: "text-[#fdc22d] bg-amber-50",
    },
    {
      icon: RotateCcw,
      title: "Timeshift Control",
      description: "Timeshift allows you as a UK subscriber living across the 5.5-hour time difference to customize and watch TV shows at your convenience whenever you sit down in the evening.",
      highlight: "Time Gap Solved",
      color: "text-blue-600 bg-blue-50",
    },
    {
      icon: Sliders,
      title: "Customizable User Interface",
      description: "Intuitive EPG (Electronic Program Guide) with dial-in favorites, category sorting, language filters, and 1-click audio track selection (English, Hindi, regional dialects).",
      highlight: "Easy Remote Nav",
      color: "text-purple-600 bg-purple-50",
    },
    {
      icon: Shield,
      title: "Parental Control",
      description: "Comprehensive PIN code protection allows you to lock mature channels and VOD genres, ensuring a 100% safe, family-friendly Indian television environment for children.",
      highlight: "Family Protected",
      color: "text-emerald-600 bg-emerald-50",
    },
    {
      icon: Radio,
      title: "Internet Radio",
      description: "Over 100+ live Indian FM radio stations and spiritual broadcasts streaming 24/7 in pristine digital audio quality directly from major Indian metros and devotional shrines.",
      highlight: "100+ Live Radio",
      color: "text-indigo-600 bg-indigo-50",
    },
  ];

  return (
    <>
      <JsonLd data={jsonLdData} />

      {/* Breadcrumb Strip */}
      <div className="border-b border-gray-200 bg-gray-50 py-2.5 px-4 text-xs text-gray-500">
        <div className="container mx-auto max-w-7xl flex items-center gap-2">
          <Link href="/" className="hover:text-gray-900 transition-colors">Home</Link>
          <span>/</span>
          <span className="text-gray-900 font-semibold">Features</span>
        </div>
      </div>

      <div className="container mx-auto max-w-5xl px-4 sm:px-6 py-12 space-y-10">
        {/* Page Header */}
        <div className="border-b-2 border-[#dd0e1c] pb-4">
          <span className="text-xs font-bold text-gray-500 uppercase tracking-wider block">
            Cutting-Edge Indian Television Framework
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#2c3640] tracking-tight mt-1">
            Features &amp; 14 Days Catch-Up TV
          </h1>
          <p className="text-sm text-gray-600 mt-2">
            Watch Indian TV Channels on Your TV, Computer, Tablet &amp; Mobile. One subscription is enough to watch Chitram TV across all your devices.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featureCards.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 rounded-lg ${item.color} flex items-center justify-center`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-bold bg-gray-100 text-gray-700 px-2 py-0.5 rounded">
                      {item.highlight}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* What We Offer Checklist Box (Matching chitramtv.eu bottom module) */}
        <div className="bg-white rounded-lg p-8 border border-gray-200 shadow-sm space-y-6">
          <h2 className="text-xl font-bold text-gray-900 border-b pb-3">
            WHAT WE OFFER
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs font-semibold text-gray-800">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#50ad55]" />
              <span>Customizable User Interface</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#50ad55]" />
              <span>14 Days Recording</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#50ad55]" />
              <span>Movies on Demand</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#50ad55]" />
              <span>Time Shift Control</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#50ad55]" />
              <span>Parental Control</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#50ad55]" />
              <span>Internet Radio</span>
            </div>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t">
            <p className="text-xs text-gray-500">
              Questions about device compatibility? Call our UK helpline at <strong>07979637777</strong>.
            </p>
            <Link
              href="/buy-now"
              className="bg-[#dd0e1c] hover:bg-[#b00b16] text-white px-6 py-2.5 rounded font-bold uppercase text-xs inline-flex items-center gap-2 transition-colors shadow"
            >
              <span>Get Started</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
