"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Clock,
  Tv,
  Smartphone,
  ShieldCheck,
  ChevronRight,
  Sparkles,
  Wifi,
  CheckCircle2,
  Check,
  RotateCcw,
} from "lucide-react";
import {
  TIME_SHIFT_STEPS,
  DEFAULT_HOUSEHOLD_DEVICES,
  TRUST_PILLARS,
} from "@/data/serviceFeatures";

export function ValuePropositionSection() {
  // 5.5-Hour Time-Shift Scrubber
  const [activeTimeStep, setActiveTimeStep] = useState(2); // default to 8:00 PM UK prime
  const [isRewinding, setIsRewinding] = useState(false);

  const handleRewindSimulation = () => {
    setIsRewinding(true);
    triggerHaptic();
    setActiveTimeStep(0);
    setTimeout(() => {
      setActiveTimeStep(2);
      setIsRewinding(false);
    }, 1000);
  };

  // Multi-Room Devices
  const [devices, setDevices] = useState(DEFAULT_HOUSEHOLD_DEVICES);

  const toggleDevice = (id: string) => {
    triggerHaptic();
    setDevices((prev) =>
      prev.map((d) => (d.id === id ? { ...d, active: !d.active } : d))
    );
  };

  const activeDeviceCount = devices.filter((d) => d.active).length;

  // Trust Pillar Index
  const [activeTrustIdx, setActiveTrustIdx] = useState(0);

  const triggerHaptic = () => {
    if (typeof window !== "undefined" && "vibrate" in navigator) {
      try {
        navigator.vibrate(10);
      } catch {
        // Fallback
      }
    }
  };

  return (
    <section
      id="features"
      className="py-14 sm:py-20 bg-[#f4f6f8] border-b border-gray-200 overflow-hidden relative"
    >
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-red-200 bg-red-50 px-4 py-1 text-xs font-bold text-[#dd0e1c]">
            <Sparkles className="h-3.5 w-3.5 text-[#dd0e1c]" />
            <span>ENGINEERED FOR THE UK INDIAN COMMUNITY</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#2c3640] tracking-tight">
            Why UK Households Choose ChitramTV
          </h2>
          <p className="text-xs sm:text-base text-gray-600 leading-relaxed">
            International IPTV apps fail in the UK because they ignore the 5.5-hour time gap and suffer from buffer throttling. Here is how ChitramTV solves streaming for British homes.
          </p>
        </div>

        {/* 2-Column Summary Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-8">
          {/* CARD 1: 14-DAY CATCH-UP & 5.5-HOUR TIME-SHIFT */}
          <div className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-8 flex flex-col justify-between shadow-sm">
            <div>
              <div className="flex items-center justify-between gap-2 mb-4">
                <div className="flex items-center gap-2.5">
                  <div className="h-10 w-10 rounded-lg bg-red-50 border border-red-200 flex items-center justify-center text-[#dd0e1c] shrink-0">
                    <Clock className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block">
                      The 5.5-Hour Time Gap Solved
                    </span>
                    <h3 className="text-xl sm:text-2xl font-black text-[#2c3640] tracking-tight">
                      14-Day Automatic Catch-Up
                    </h3>
                  </div>
                </div>

                <button
                  onClick={handleRewindSimulation}
                  disabled={isRewinding}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 border border-gray-200 text-xs font-semibold text-gray-700 transition-colors select-none active:scale-95"
                  title="Simulate 1-Click Rewind"
                >
                  <RotateCcw
                    className={`h-3.5 w-3.5 text-[#dd0e1c] ${
                      isRewinding ? "animate-spin" : ""
                    }`}
                  />
                  <span>Rewind Test</span>
                </button>
              </div>

              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-5">
                India is 5.5 hours ahead of GMT. When Indian primetime dramas air at 8:00 PM in Mumbai, it is only <strong>2:30 PM in London</strong> while you are at work. Our automatic cloud DVR records every channel 24/7 so you can watch whenever you sit down in the evening.
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
                          ? "bg-[#dd0e1c] text-white border border-[#dd0e1c] shadow-sm"
                          : "bg-gray-50 border border-gray-200 text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                      }`}
                    >
                      <span className="text-[10px] font-bold block truncate">
                        {step.ukTime.split(" ")[0]} {step.ukTime.split(" ")[1]}
                      </span>
                      <span
                        className={`text-[9px] block truncate ${
                          isActive ? "text-white/80" : "text-gray-500"
                        }`}
                      >
                        {step.tag.split(" ")[0]}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Dynamic Time Step Display */}
              <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 space-y-2">
                <div className="flex items-center justify-between text-xs pb-2 border-b border-gray-200">
                  <div className="flex items-center gap-1.5 font-bold text-gray-900">
                    <span className="h-2 w-2 rounded-full bg-emerald-500" />
                    <span>{TIME_SHIFT_STEPS[activeTimeStep].ukTime}</span>
                  </div>
                  <span className="text-gray-500 font-semibold text-[11px]">
                    = {TIME_SHIFT_STEPS[activeTimeStep].istTime}
                  </span>
                </div>

                <div className="text-xs font-bold text-gray-900 leading-snug">
                  {TIME_SHIFT_STEPS[activeTimeStep].headline}
                </div>
                <div className="text-[11px] text-gray-600 leading-relaxed">
                  {TIME_SHIFT_STEPS[activeTimeStep].description}
                </div>
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-gray-100 flex items-center justify-between text-[11px] text-gray-500">
              <span>Automatic DVR across all channels</span>
              <span className="font-semibold text-gray-800">14-Day Cloud Memory</span>
            </div>
          </div>

          {/* CARD 2: MULTI-ROOM STREAMING */}
          <div className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-8 flex flex-col justify-between shadow-sm">
            <div>
              <div className="flex items-center justify-between gap-2 mb-4">
                <div className="flex items-center gap-2.5">
                  <div className="h-10 w-10 rounded-lg bg-red-50 border border-red-200 flex items-center justify-center text-[#dd0e1c] shrink-0">
                    <Smartphone className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block">
                      Multi-Room Entertainment
                    </span>
                    <h3 className="text-xl sm:text-2xl font-black text-[#2c3640] tracking-tight">
                      Up to 4 Simultaneous Devices
                    </h3>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-xs font-bold text-gray-900 block">
                    {activeDeviceCount} of 4 Active
                  </span>
                  <span className="text-[10px] text-emerald-600 font-semibold">
                    100% Buffer-Free
                  </span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-5">
                Every member of your UK household can watch their favorite show simultaneously without kicking each other off. Tap to toggle screens:
              </p>

              {/* 4 Household Device Tiles */}
              <div className="grid grid-cols-2 gap-2.5 mb-4">
                {devices.map((device) => (
                  <button
                    key={device.id}
                    onClick={() => toggleDevice(device.id)}
                    className={`p-3 rounded-xl border text-left transition-all select-none min-h-[72px] flex flex-col justify-between ${
                      device.active
                        ? "bg-red-50/50 border-[#dd0e1c]/40 shadow-sm"
                        : "bg-gray-50 border-gray-200 opacity-70 hover:opacity-100 hover:border-gray-300"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-1 mb-1">
                      <div className="flex items-center gap-1.5">
                        <Tv
                          className={`h-3.5 w-3.5 ${
                            device.active ? "text-[#dd0e1c]" : "text-gray-500"
                          }`}
                        />
                        <span className="text-xs font-bold text-gray-900 truncate max-w-[100px] sm:max-w-[120px]">
                          {device.room}
                        </span>
                      </div>
                      <span
                        className={`h-2 w-2 rounded-full ${
                          device.active ? "bg-emerald-500 animate-pulse" : "bg-gray-400"
                        }`}
                      />
                    </div>

                    <div>
                      <div className="text-[10px] font-medium text-gray-700 truncate">
                        {device.currentFeed}
                      </div>
                      <div className="text-[9px] text-gray-500 font-mono mt-0.5">
                        {device.active ? device.quality : "Paused"}
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              {/* Bandwidth / CDN Allocation Indicator */}
              <div className="rounded-xl border border-gray-200 bg-gray-50 p-3.5 flex items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2.5">
                  <Wifi className="h-4 w-4 text-emerald-600 shrink-0" />
                  <div>
                    <div className="font-bold text-gray-900">UK Dedicated Edge Delivery</div>
                    <div className="text-[11px] text-gray-600">
                      Direct London peering with BT, Virgin Media &amp; Sky UK
                    </div>
                  </div>
                </div>
                <span className="shrink-0 text-[10px] font-bold uppercase tracking-wider text-emerald-700 border border-emerald-600/30 rounded px-2 py-0.5 bg-emerald-50">
                  Ultra Fast
                </span>
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-gray-100 flex items-center justify-between text-[11px] text-gray-500">
              <span>Smart TV, Firestick, Mobile &amp; Tablet</span>
              <span className="font-semibold text-gray-800">No Extra Multi-Room Fee</span>
            </div>
          </div>
        </div>

        {/* CARD 3: 100% PAYPAL PROTECTION & TRUST VERIFICATION (FULL WIDTH) */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-8 shadow-sm relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-4 space-y-2">
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
                <span>100% VERIFIED UK COMMERCE</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-[#2c3640] tracking-tight">
                PayPal Protected &amp; 7-Day Money-Back
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                Never risk your card on dodgy forms. Every transaction is covered by PayPal Buyer Protection, billed in GBP with zero rolling contract traps.
              </p>
            </div>

            {/* 4 Trust Tabs */}
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
                        ? "bg-red-50/30 border-[#dd0e1c]/40 shadow-sm"
                        : "bg-gray-50 border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <div className="flex items-center gap-2">
                        <CheckCircle2
                          className={`h-4 w-4 ${
                            isSelected ? "text-[#dd0e1c]" : "text-emerald-600"
                          }`}
                        />
                        <h4 className="text-sm font-bold text-gray-900">
                          {pillar.title}
                        </h4>
                      </div>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-gray-200 text-gray-700">
                        {pillar.badge}
                      </span>
                    </div>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Links to Subpages */}
        <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 text-center">
          <Link
            href="/why-us"
            className="inline-flex items-center gap-2 text-xs font-semibold text-gray-700 hover:text-gray-900 bg-white border border-gray-300 hover:border-gray-400 px-5 py-3 rounded-lg shadow-sm transition-colors min-h-[44px]"
          >
            <span>Read Our Full UK Diaspora Story</span>
            <ChevronRight className="h-4 w-4 text-[#dd0e1c]" />
          </Link>
          <Link
            href="/buy-now"
            className="inline-flex items-center gap-2 text-xs font-bold text-white bg-[#dd0e1c] hover:bg-[#b00b16] px-6 py-3 rounded-lg shadow-sm transition-colors min-h-[44px]"
          >
            <span>View Subscription Passes from £6.43/mo</span>
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
