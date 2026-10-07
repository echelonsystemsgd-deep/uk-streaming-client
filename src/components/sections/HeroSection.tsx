"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Zap, Clock, Tv, Smartphone, ArrowRight, ShieldCheck } from "lucide-react";

const HERO_SLIDES = [
  {
    id: 1,
    image: "/Slide1-1280x550w.jpg",
    title: "Watch Your Favourite Indian TV Channels",
    subtitle: "On TV with Chitram 4K Set-Top Box with extended media player functionality",
    ctaText: "BUY NOW",
    ctaLink: "/buy-now",
  },
  {
    id: 2,
    image: "/HDNEWBOXZout-1280x550w.jpg",
    title: "ChitramTV Black Edition C1 Box",
    subtitle: "Powered by Android 14 framework with Bluetooth remote & Google Play Store",
    ctaText: "EXPLORE HARDWARE",
    ctaLink: "/buy-now",
  },
  {
    id: 3,
    image: "/TVdotslideripl-1280x550w.jpg",
    title: "14 Days Catch-Up TV & Live Cricket",
    subtitle: "Over 500+ Live Channels with 14-day cloud recording tailored for the UK",
    ctaText: "VIEW PLANS",
    ctaLink: "/buy-now",
  },
];

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? HERO_SLIDES.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  return (
    <section className="relative w-full bg-white">
      {/* Journal 3 Hero Carousel */}
      <div className="relative w-full aspect-[2.33/1] max-h-[520px] min-h-[260px] bg-gray-900 overflow-hidden group">
        {HERO_SLIDES.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
            }`}
          >
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              priority={index === 0}
              className="object-cover object-center"
            />
            {/* Subtle Gradient Overlay for Text Legibility */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent flex items-center">
              <div className="container mx-auto max-w-7xl px-6 sm:px-12 text-white max-w-2xl">
                <div className="inline-block bg-[#dd0e1c] text-white text-[10px] sm:text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded mb-2 sm:mb-3">
                  ChitramTV UK • Shiva Technology Ltd
                </div>
                <h1 className="text-xl sm:text-3xl md:text-5xl font-extrabold tracking-tight leading-tight text-white drop-shadow">
                  {slide.title}
                </h1>
                <p className="mt-2 text-xs sm:text-sm md:text-base text-gray-200 line-clamp-2 drop-shadow">
                  {slide.subtitle}
                </p>
                <div className="mt-4 sm:mt-6 flex items-center gap-3">
                  <Link
                    href={slide.ctaLink}
                    className="bg-[#dd0e1c] hover:bg-[#b00b16] text-white text-xs sm:text-sm font-bold uppercase tracking-wider px-5 sm:px-7 py-2.5 sm:py-3 rounded shadow-lg transition-transform hover:scale-105 inline-flex items-center gap-2"
                  >
                    <span>{slide.ctaText}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link
                    href="/channels"
                    className="bg-black/40 hover:bg-black/60 border border-white/40 text-white text-xs sm:text-sm font-bold uppercase tracking-wider px-4 sm:px-6 py-2.5 sm:py-3 rounded backdrop-blur-sm transition-colors"
                  >
                    500+ Channels
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Carousel Arrow Controls */}
        <button
          onClick={prevSlide}
          className="absolute left-3 top-1/2 -translate-y-1/2 z-20 bg-black/40 hover:bg-black/70 text-white p-2 sm:p-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
          aria-label="Previous Slide"
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-3 top-1/2 -translate-y-1/2 z-20 bg-black/40 hover:bg-black/70 text-white p-2 sm:p-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
          aria-label="Next Slide"
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        {/* Carousel Indicators */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {HERO_SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={`h-2 rounded-full transition-all ${
                i === currentSlide ? "w-6 bg-[#dd0e1c]" : "w-2 bg-white/60 hover:bg-white"
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>

      {/* 4-Item Feature Highlights Strip (Exact Module from chitramtv.eu) */}
      <div className="bg-[#f0f2f5] border-y border-gray-200 py-6">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Box 1 */}
            <div className="bg-white p-4 rounded shadow-sm border border-gray-200/80 flex items-center gap-3.5">
              <div className="w-12 h-12 rounded bg-red-50 text-[#dd0e1c] flex items-center justify-center shrink-0">
                <Zap className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-gray-900 leading-snug">
                  Ultra-Speed Connection
                </h3>
                <p className="text-xs text-gray-500 mt-0.5">
                  High-speed buffer-free streaming from 1.5 Mbit/s
                </p>
              </div>
            </div>

            {/* Box 2 */}
            <div className="bg-white p-4 rounded shadow-sm border border-gray-200/80 flex items-center gap-3.5">
              <div className="w-12 h-12 rounded bg-amber-50 text-[#fdc22d] flex items-center justify-center shrink-0">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-gray-900 leading-snug">
                  14 Days Catch-Up TV
                </h3>
                <p className="text-xs text-gray-500 mt-0.5">
                  Rewind &amp; watch missed shows up to 14 days
                </p>
              </div>
            </div>

            {/* Box 3 */}
            <div className="bg-white p-4 rounded shadow-sm border border-gray-200/80 flex items-center gap-3.5">
              <div className="w-12 h-12 rounded bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                <Tv className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-gray-900 leading-snug">
                  500+ Live TV Channels
                </h3>
                <p className="text-xs text-gray-500 mt-0.5">
                  Hindi, Punjabi, South Indian &amp; 10,000+ Movies
                </p>
              </div>
            </div>

            {/* Box 4 */}
            <div className="bg-white p-4 rounded shadow-sm border border-gray-200/80 flex items-center gap-3.5">
              <div className="w-12 h-12 rounded bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                <Smartphone className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-gray-900 leading-snug">
                  Multi-Room 4 Devices
                </h3>
                <p className="text-xs text-gray-500 mt-0.5">
                  Smart TV, Firestick, Apple TV &amp; Mobile
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
