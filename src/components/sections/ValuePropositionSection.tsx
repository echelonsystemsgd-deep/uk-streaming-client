"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import {
  Clock,
  Zap,
  Tv,
  Smartphone,
  Server,
  Headphones,
  ShieldCheck,
  ChevronRight,
  Sparkles,
  Play,
  RotateCcw,
  SlidersHorizontal,
  Wifi,
  Layers,
  Lock,
  CheckCircle2,
  Monitor,
  Tablet,
  Radio,
  Flame,
  Check,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import {
  SERVICE_STATS,
  CHANNEL_PREVIEWS,
  TIME_SHIFT_STEPS,
  DEFAULT_HOUSEHOLD_DEVICES,
  TRUST_PILLARS,
} from "@/data/serviceFeatures";

export function ValuePropositionSection() {
  // --- CARD 1: CHANNEL TUMBLER STATE ---
  const [activeCategoryIdx, setActiveCategoryIdx] = useState(0);
  const [channelCount, setChannelCount] = useState(300);
  const counterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Mechanical rolling number effect to 500+
    let start = 420;
    const target = 500;
    const interval = setInterval(() => {
      start += 2;
      if (start >= target) {
        setChannelCount(target);
        clearInterval(interval);
      } else {
        setChannelCount(start);
      }
    }, 25);
    return () => clearInterval(interval);
  }, []);

  // --- CARD 2: 5.5-HOUR TIME-SHIFT SCRUBBER STATE ---
  const [activeTimeStep, setActiveTimeStep] = useState(2); // default to 8:00 PM UK prime
  const [isRewinding, setIsRewinding] = useState(false);

  const handleRewindSimulation = () => {
    setIsRewinding(true);
    triggerHaptic();
    setActiveTimeStep(0);
    setTimeout(() => {
      setActiveTimeStep(2);
      setIsRewinding(false);
    }, 1200);
  };

  // --- CARD 3: 4K UHD CRICKET CLARITY SLIDER STATE ---
  const [sliderPos, setSliderPos] = useState(50); // percentage 0 to 100
  const [isDraggingSlider, setIsDraggingSlider] = useState(false);
  const sliderContainerRef = useRef<HTMLDivElement>(null);

  const handleSliderMove = useCallback(
    (clientX: number) => {
      if (!sliderContainerRef.current) return;
      const rect = sliderContainerRef.current.getBoundingClientRect();
      const rawPos = ((clientX - rect.left) / rect.width) * 100;
      const bounded = Math.max(5, Math.min(95, rawPos));
      setSliderPos(bounded);
    },
    []
  );

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches.length > 0) {
      handleSliderMove(e.touches[0].clientX);
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isDraggingSlider) {
      handleSliderMove(e.clientX);
    }
  };

  // --- CARD 4: MULTI-ROOM HOUSEHOLD CONCURRENCY STATE ---
  const [devices, setDevices] = useState(DEFAULT_HOUSEHOLD_DEVICES);

  const toggleDevice = (id: string) => {
    triggerHaptic();
    setDevices((prev) =>
      prev.map((d) => (d.id === id ? { ...d, active: !d.active } : d))
    );
  };

  const activeDeviceCount = devices.filter((d) => d.active).length;

  // --- CARD 5: TRUST PILLARS STATE ---
  const [activeTrustIdx, setActiveTrustIdx] = useState(0);

  // Helper for subtle haptic click
  const triggerHaptic = () => {
    if (typeof window !== "undefined" && "vibrate" in navigator) {
      try {
        navigator.vibrate(10);
      } catch {
        // Ignore fallback
      }
    }
  };

  return (
    <section
      id="features"
      className="py-16 sm:py-24 bg-background-elevated/40 border-b border-border/80 overflow-hidden relative"
    >
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-3 sm:space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1 text-xs font-semibold text-primary">
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            <span>ENGINEERED FOR THE UK INDIAN COMMUNITY</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Why UK Households Choose ChitramTV
          </h2>
          <p className="text-sm sm:text-base text-zinc-400 leading-relaxed max-w-2xl mx-auto">
            Test, scrub, and explore how our UK dedicated low-latency network and 14-day automatic catch-up solve the 5.5-hour diaspora time lag.
          </p>
        </div>

        {/* ========================================================================= */}
        {/* INTERACTIVE BENTO DECK GRID                                              */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          
          {/* --------------------------------------------------------------------- */}
          {/* CARD 1: 500+ CHANNELS INTERACTIVE TUMBLER (7 COLS)                   */}
          {/* --------------------------------------------------------------------- */}
          <div className="lg:col-span-7 rounded-2xl border border-zinc-800 bg-card p-5 sm:p-7 flex flex-col justify-between shadow-card relative overflow-hidden group">
            {/* Subtle corner badge */}
            <div className="flex items-center justify-between gap-2 mb-4">
              <div className="flex items-center gap-2.5">
                <div className="h-9 w-9 rounded-lg bg-zinc-800/90 border border-zinc-700/80 flex items-center justify-center text-primary shrink-0">
                  <Tv className="h-4 w-4" />
                </div>
                <div>
                  <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider block">
                    Multilingual Broadcasts
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2">
                    <span ref={counterRef} className="tabular-nums text-white">
                      {channelCount}+
                    </span>
                    <span>Live Channels</span>
                  </h3>
                </div>
              </div>

              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-[11px] font-semibold text-red-400">
                <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" />
                Live UK Feed
              </span>
            </div>

            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed mb-5">
              Instant access to India&apos;s leading national networks and regional feeds, plus 24/7 uninterrupted spiritual channels direct from Amritsar.
            </p>

            {/* Interactive Category Selector Pills (Scrollable on small mobile) */}
            <div className="mb-5 overflow-x-auto scrollbar-none -mx-2 px-2 pb-1">
              <div className="flex items-center gap-2">
                {CHANNEL_PREVIEWS.map((cat, idx) => {
                  const isActive = activeCategoryIdx === idx;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => {
                        triggerHaptic();
                        setActiveCategoryIdx(idx);
                      }}
                      className={`px-3 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 min-h-[40px] select-none ${
                        isActive
                          ? "bg-primary text-white shadow-sm"
                          : "bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700 active:scale-95"
                      }`}
                    >
                      <span>{cat.name}</span>
                      <span
                        className={`text-[10px] px-1.5 py-0.2 rounded font-normal ${
                          isActive ? "bg-white/20 text-white" : "bg-zinc-800 text-zinc-400"
                        }`}
                      >
                        {cat.sampleCount}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Active Category Display Preview Frame */}
            <div className="rounded-xl border border-zinc-800/90 bg-zinc-950/70 p-4 sm:p-5 relative">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 mb-3 border-b border-zinc-800">
                <div className="text-xs font-bold text-zinc-300 flex items-center gap-2">
                  <Flame className="h-3.5 w-3.5 text-primary" />
                  <span>Popular UK Broadcasts in {CHANNEL_PREVIEWS[activeCategoryIdx].name}:</span>
                </div>
                <span className="text-[11px] text-zinc-400 font-medium">
                  {CHANNEL_PREVIEWS[activeCategoryIdx].popularShow}
                </span>
              </div>

              {/* Channel Badges Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {CHANNEL_PREVIEWS[activeCategoryIdx].channels.map((ch, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 rounded-lg border border-zinc-800 bg-zinc-900/90 hover:border-zinc-700 flex items-center justify-between gap-2 transition-colors"
                  >
                    <span className="text-xs font-semibold text-white truncate">
                      {ch}
                    </span>
                    <span className="shrink-0 text-[10px] font-bold px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-300">
                      14D
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-3.5 pt-3 border-t border-zinc-800/80 flex items-center justify-between text-[11px] text-zinc-400">
                <span>Tap any category above to explore language feeds</span>
                <Link
                  href="/channels"
                  className="font-semibold text-primary hover:underline flex items-center gap-1"
                >
                  Full 500+ List <ChevronRight className="h-3 w-3" />
                </Link>
              </div>
            </div>
          </div>

          {/* --------------------------------------------------------------------- */}
          {/* CARD 2: 14-DAY CATCH-UP & 5.5-HOUR TIME-SHIFT SCRUBBER (5 COLS)       */}
          {/* --------------------------------------------------------------------- */}
          <div className="lg:col-span-5 rounded-2xl border border-zinc-800 bg-card p-5 sm:p-7 flex flex-col justify-between shadow-card relative overflow-hidden">
            <div>
              <div className="flex items-center justify-between gap-2 mb-4">
                <div className="flex items-center gap-2.5">
                  <div className="h-9 w-9 rounded-lg bg-zinc-800/90 border border-zinc-700/80 flex items-center justify-center text-primary shrink-0">
                    <Clock className="h-4 w-4" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider block">
                      The 5.5-Hour Time Shift Solved
                    </span>
                    <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                      14-Day Automatic Catch-up
                    </h3>
                  </div>
                </div>

                <button
                  onClick={handleRewindSimulation}
                  disabled={isRewinding}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-xs font-semibold text-zinc-200 transition-colors select-none active:scale-95"
                  title="Simulate 1-Click Rewind"
                >
                  <RotateCcw
                    className={`h-3.5 w-3.5 text-primary ${
                      isRewinding ? "animate-spin" : ""
                    }`}
                  />
                  <span>Rewind Test</span>
                </button>
              </div>

              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed mb-4">
                India is 5.5 hours ahead of the UK. When primetime airs in Delhi or Mumbai, it is 2:30 PM in London. Our automatic cloud DVR captures every single second.
              </p>

              {/* Time Scrubber Interactive Stage Pills */}
              <div className="grid grid-cols-4 gap-1.5 mb-4">
                {TIME_SHIFT_STEPS.map((step) => {
                  const isActive = activeTimeStep === step.step;
                  return (
                    <button
                      key={step.step}
                      onClick={() => {
                        triggerHaptic();
                        setActiveTimeStep(step.step);
                      }}
                      className={`p-2 rounded-lg text-center transition-all select-none min-h-[48px] flex flex-col justify-center ${
                        isActive
                          ? "bg-primary text-white border border-primary shadow-sm"
                          : "bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700"
                      }`}
                    >
                      <span className="text-[10px] font-bold block truncate">
                        {step.ukTime.split(" ")[0]} {step.ukTime.split(" ")[1]}
                      </span>
                      <span
                        className={`text-[9px] block truncate ${
                          isActive ? "text-white/80" : "text-zinc-500"
                        }`}
                      >
                        {step.tag.split(" ")[0]}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Dynamic Time Step Display Card */}
              <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-4 space-y-3">
                <div className="flex items-center justify-between text-xs pb-2 border-b border-zinc-800">
                  <div className="flex items-center gap-1.5 font-bold text-white">
                    <span className="h-2 w-2 rounded-full bg-emerald-400" />
                    <span>{TIME_SHIFT_STEPS[activeTimeStep].ukTime}</span>
                  </div>
                  <span className="text-zinc-400 font-semibold text-[11px]">
                    = {TIME_SHIFT_STEPS[activeTimeStep].istTime}
                  </span>
                </div>

                <div className="text-xs font-bold text-white leading-snug">
                  {TIME_SHIFT_STEPS[activeTimeStep].headline}
                </div>
                <div className="text-[11px] text-zinc-400 leading-relaxed">
                  {TIME_SHIFT_STEPS[activeTimeStep].description}
                </div>

                <div className="pt-2 border-t border-zinc-800/80 flex items-center justify-between text-[11px]">
                  <span className="text-zinc-400 font-medium">Status:</span>
                  <span className="text-emerald-400 font-semibold text-[11px] truncate max-w-[200px]">
                    {TIME_SHIFT_STEPS[activeTimeStep].statusText}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-zinc-800 flex items-center justify-between text-[11px] text-zinc-400">
              <span>Automatic DVR across all 500+ channels</span>
              <span className="font-semibold text-zinc-200">168-Hour Cloud Buffer</span>
            </div>
          </div>

          {/* --------------------------------------------------------------------- */}
          {/* CARD 3: 4K UHD & 60FPS LIVE CRICKET CLARITY SLIDER (6 COLS)          */}
          {/* --------------------------------------------------------------------- */}
          <div className="lg:col-span-6 rounded-2xl border border-zinc-800 bg-card p-5 sm:p-7 flex flex-col justify-between shadow-card relative overflow-hidden">
            <div>
              <div className="flex items-center justify-between gap-2 mb-4">
                <div className="flex items-center gap-2.5">
                  <div className="h-9 w-9 rounded-lg bg-zinc-800/90 border border-zinc-700/80 flex items-center justify-center text-primary shrink-0">
                    <Zap className="h-4 w-4" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider block">
                      High Bitrate Broadcasts
                    </span>
                    <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                      4K UHD &amp; 60fps Live Cricket
                    </h3>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 bg-zinc-900 border border-zinc-800 p-1 rounded-lg">
                  <button
                    onClick={() => {
                      triggerHaptic();
                      setSliderPos(15);
                    }}
                    className={`px-2 py-1 rounded text-[10px] font-bold transition-colors ${
                      sliderPos < 35
                        ? "bg-zinc-800 text-white"
                        : "text-zinc-400 hover:text-white"
                    }`}
                  >
                    720p
                  </button>
                  <button
                    onClick={() => {
                      triggerHaptic();
                      setSliderPos(85);
                    }}
                    className={`px-2 py-1 rounded text-[10px] font-bold transition-colors ${
                      sliderPos > 65
                        ? "bg-primary text-white"
                        : "text-zinc-400 hover:text-white"
                    }`}
                  >
                    4K 60fps
                  </button>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed mb-4">
                Experience stadium-grade smoothness on Star Sports &amp; Sony Sports. Drag the interactive lens to compare standard reseller compression vs. ChitramTV 60fps clarity.
              </p>

              {/* Interactive Split-Screen Lens Container */}
              <div
                ref={sliderContainerRef}
                onMouseDown={() => setIsDraggingSlider(true)}
                onMouseUp={() => setIsDraggingSlider(false)}
                onMouseLeave={() => setIsDraggingSlider(false)}
                onMouseMove={handleMouseMove}
                onTouchMove={handleTouchMove}
                className="relative rounded-xl overflow-hidden aspect-[16/9] border border-zinc-800 bg-zinc-950 select-none cursor-ew-resize touch-none shadow-inner"
              >
                {/* Layer 1: Simulated 720p / Grainy Background */}
                <div className="absolute inset-0 bg-gradient-to-tr from-zinc-900 via-zinc-850 to-zinc-900 flex flex-col justify-between p-4 filter blur-[1px]">
                  <div className="flex items-center justify-between text-xs text-zinc-500">
                    <span className="font-mono">720p @ 25fps (Standard Reseller)</span>
                    <span className="bg-zinc-800/80 px-2 py-0.5 rounded text-[10px]">Stutter / Blur</span>
                  </div>
                  <div className="text-center my-auto">
                    <div className="text-zinc-500 font-extrabold text-lg sm:text-xl tracking-wider uppercase opacity-60">
                      Live Cricket Feed • Standard
                    </div>
                    <div className="text-[11px] text-zinc-600 mt-1 font-mono">
                      Heavy ball blur • 3.2 Mbps Bitrate
                    </div>
                  </div>
                  <div className="text-[10px] text-zinc-600 font-mono">
                    Buffer Risk: Moderate on Peak UK Evenings
                  </div>
                </div>

                {/* Layer 2: 4K UHD 60fps Crystal Clear (Clipped by slider position) */}
                <div
                  className="absolute inset-0 bg-gradient-to-tr from-zinc-950 via-zinc-900 to-black flex flex-col justify-between p-4"
                  style={{
                    clipPath: `inset(0 0 0 ${sliderPos}%)`,
                  }}
                >
                  <div className="flex items-center justify-between text-xs text-white">
                    <div className="flex items-center gap-1.5">
                      <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
                      <span className="font-bold text-white tracking-wide">4K UHD @ 60fps</span>
                      <span className="text-[10px] bg-red-600 text-white font-black px-1.5 py-0.2 rounded ml-1">
                        PRO
                      </span>
                    </div>
                    <span className="bg-zinc-800 border border-zinc-700 px-2 py-0.5 rounded text-[10px] text-zinc-200 font-medium">
                      Zero Ball Ghosting
                    </span>
                  </div>

                  <div className="text-center my-auto">
                    <div className="text-white font-black text-xl sm:text-2xl tracking-tight">
                      India vs England 4K Live
                    </div>
                    <div className="text-xs text-red-400 font-bold mt-1">
                      Crisp Pitch Turf &amp; 60fps Ball Seam
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-[10px] text-zinc-300 font-mono">
                    <span>Bitrate: 22.4 Mbps HEVC</span>
                    <span className="text-emerald-400 font-semibold">BT &amp; Virgin Optimized</span>
                  </div>
                </div>

                {/* Vertical Draggable Handle Line */}
                <div
                  className="absolute top-0 bottom-0 w-0.5 bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)] pointer-events-none"
                  style={{ left: `${sliderPos}%` }}
                >
                  <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 h-8 w-8 rounded-full bg-primary border-2 border-white flex items-center justify-center text-white shadow-lg pointer-events-auto">
                    <SlidersHorizontal className="h-3.5 w-3.5" />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-zinc-800 flex items-center justify-between text-[11px] text-zinc-400">
              <span>Drag slider or tap 720p/4K above to compare</span>
              <span className="text-zinc-200 font-semibold">Native 60fps Refresh</span>
            </div>
          </div>

          {/* --------------------------------------------------------------------- */}
          {/* CARD 4: 4-ROOM MULTI-SCREEN HOUSEHOLD SIMULATOR (6 COLS)              */}
          {/* --------------------------------------------------------------------- */}
          <div className="lg:col-span-6 rounded-2xl border border-zinc-800 bg-card p-5 sm:p-7 flex flex-col justify-between shadow-card relative overflow-hidden">
            <div>
              <div className="flex items-center justify-between gap-2 mb-4">
                <div className="flex items-center gap-2.5">
                  <div className="h-9 w-9 rounded-lg bg-zinc-800/90 border border-zinc-700/80 flex items-center justify-center text-primary shrink-0">
                    <Smartphone className="h-4 w-4" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider block">
                      Multi-Room Streaming
                    </span>
                    <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                      4 Simultaneous Screens
                    </h3>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-xs font-bold text-white block">
                    {activeDeviceCount} of 4 Active
                  </span>
                  <span className="text-[10px] text-emerald-400 font-semibold">
                    100% Buffer-Free
                  </span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed mb-4">
                Every member of your UK household can watch their favorite show simultaneously without kicking each other off or causing buffer lag. Tap to toggle screens:
              </p>

              {/* 4 Interactive Household Device Tiles */}
              <div className="grid grid-cols-2 gap-2.5 mb-4">
                {devices.map((device) => {
                  const DeviceIcon =
                    device.deviceType === "tv"
                      ? Tv
                      : device.deviceType === "firestick"
                      ? Monitor
                      : device.deviceType === "tablet"
                      ? Tablet
                      : Smartphone;

                  return (
                    <button
                      key={device.id}
                      onClick={() => toggleDevice(device.id)}
                      className={`p-3 rounded-xl border text-left transition-all select-none min-h-[72px] flex flex-col justify-between ${
                        device.active
                          ? "bg-zinc-900 border-primary/60 shadow-sm"
                          : "bg-zinc-950/60 border-zinc-800 opacity-60 hover:opacity-100 hover:border-zinc-700"
                      }`}
                    >
                      <div className="flex items-center justify-between gap-1 mb-1">
                        <div className="flex items-center gap-1.5">
                          <DeviceIcon
                            className={`h-3.5 w-3.5 ${
                              device.active ? "text-primary" : "text-zinc-500"
                            }`}
                          />
                          <span className="text-xs font-bold text-white truncate max-w-[100px] sm:max-w-[120px]">
                            {device.room}
                          </span>
                        </div>
                        <span
                          className={`h-2 w-2 rounded-full ${
                            device.active ? "bg-emerald-400 animate-pulse" : "bg-zinc-600"
                          }`}
                        />
                      </div>

                      <div>
                        <div className="text-[10px] font-medium text-zinc-300 truncate">
                          {device.currentFeed}
                        </div>
                        <div className="text-[9px] text-zinc-500 font-mono mt-0.5">
                          {device.active ? device.quality : "Paused"}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Bandwidth / CDN Allocation Indicator */}
              <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-3.5 flex items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2.5">
                  <Wifi className="h-4 w-4 text-emerald-400 shrink-0" />
                  <div>
                    <div className="font-bold text-white">UK Dedicated Edge Delivery</div>
                    <div className="text-[11px] text-zinc-400">
                      Direct London peering with BT, Virgin Media &amp; Sky UK
                    </div>
                  </div>
                </div>
                <span className="shrink-0 text-[10px] font-bold uppercase tracking-wider text-emerald-400 border border-emerald-500/30 rounded px-2 py-0.5 bg-emerald-500/10">
                  Ultra Fast
                </span>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-zinc-800 flex items-center justify-between text-[11px] text-zinc-400">
              <span>Tap any room tile above to simulate concurrency</span>
              <span className="text-zinc-200 font-semibold">Firestick &amp; Smart TV Ready</span>
            </div>
          </div>

          {/* --------------------------------------------------------------------- */}
          {/* CARD 5: 100% PAYPAL PROTECTION & TRUST VERIFICATION (FULL WIDTH)       */}
          {/* --------------------------------------------------------------------- */}
          <div className="lg:col-span-12 rounded-2xl border border-zinc-800 bg-card p-6 sm:p-8 shadow-card relative overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              
              <div className="lg:col-span-4 space-y-2">
                <div className="inline-flex items-center gap-2 rounded-full border border-zinc-700 bg-zinc-900 px-3 py-1 text-xs font-semibold text-zinc-300">
                  <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
                  <span>100% VERIFIED UK COMMERCE</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                  PayPal Protected &amp; 7-Day Money-Back
                </h3>
                <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                  Never risk your payment on dodgy reseller forms. Every transaction is covered by PayPal Buyer Protection and a no-questions-asked refund policy.
                </p>
              </div>

              {/* 4 Interactive Trust Tabs */}
              <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-3">
                {TRUST_PILLARS.map((pillar, idx) => {
                  const isSelected = activeTrustIdx === idx;
                  return (
                    <div
                      key={idx}
                      onClick={() => {
                        triggerHaptic();
                        setActiveTrustIdx(idx);
                      }}
                      className={`p-4 rounded-xl border transition-all cursor-pointer select-none ${
                        isSelected
                          ? "bg-zinc-900 border-primary/60 shadow-sm"
                          : "bg-zinc-950/60 border-zinc-800 hover:border-zinc-700"
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2 mb-1.5">
                        <div className="flex items-center gap-2">
                          <CheckCircle2
                            className={`h-4 w-4 ${
                              isSelected ? "text-primary" : "text-emerald-400"
                            }`}
                          />
                          <h4 className="text-sm font-bold text-white">
                            {pillar.title}
                          </h4>
                        </div>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-zinc-800 text-zinc-300">
                          {pillar.badge}
                        </span>
                      </div>
                      <p className="text-xs text-zinc-400 leading-relaxed">
                        {pillar.description}
                      </p>
                    </div>
                  );
                })}
              </div>

            </div>
          </div>

        </div>

        {/* Link to dedicated Why Us & Plans Page */}
        <div className="mt-10 sm:mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 text-center">
          <Link
            href="/why-us"
            className="inline-flex items-center gap-2 text-xs font-semibold text-zinc-300 hover:text-white bg-zinc-900 border border-zinc-800 hover:border-zinc-700 px-5 py-3 rounded-lg transition-colors min-h-[44px]"
          >
            <span>Read Our Full UK Low-Latency Network &amp; Diaspora Story</span>
            <ChevronRight className="h-4 w-4 text-primary" />
          </Link>
          <Link
            href="/plans"
            className="inline-flex items-center gap-2 text-xs font-bold text-white bg-primary hover:bg-primary-hover px-6 py-3 rounded-lg transition-colors min-h-[44px]"
          >
            <span>View Subscription Passes from £6.43/mo</span>
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>

      </div>
    </section>
  );
}
