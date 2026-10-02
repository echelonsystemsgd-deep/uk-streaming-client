"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Check, ShieldCheck, Lock, Tv, Package, ChevronRight, RefreshCw, Sparkles } from "lucide-react";
import { PRICING_PLANS, PricingPlan, HARDWARE_NAME } from "@/data/plans";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface PricingSectionProps {
  onSelectPlan: (plan: PricingPlan) => void;
}

type FilterCategory = "all" | "subscription" | "renewal" | "hardware";

export function PricingSection({ onSelectPlan }: PricingSectionProps) {
  const [activeCategory, setActiveCategory] = useState<FilterCategory>("all");

  const filteredPlans = PRICING_PLANS.filter((plan) => {
    if (activeCategory === "all") return true;
    if (activeCategory === "subscription") return plan.category === "subscription";
    if (activeCategory === "renewal") return plan.category === "renewal";
    if (activeCategory === "hardware") return plan.category === "hardware" || plan.category === "bundle";
    return true;
  });

  return (
    <section id="plans" className="py-16 sm:py-20 bg-background border-b border-border relative">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12 space-y-3 sm:space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-primary">
            CHITRAMTV UK • OFFICIAL SUBSCRIPTION PASSES &amp; HARDWARE
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Choose Your Streaming Pass, Renewal, or TV Box
          </h2>
          <p className="text-base sm:text-lg text-zinc-400 leading-relaxed">
            Instant digital credential dispatch via WhatsApp &amp; Email. Complete subscription passes, official {HARDWARE_NAME} units, and UK delivery.
          </p>
        </div>

        {/* Mobile-Friendly Category Switcher */}
        <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          <button
            type="button"
            onClick={() => setActiveCategory("all")}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap min-h-[44px] transition-all select-none ${
              activeCategory === "all"
                ? "bg-primary text-white shadow-md shadow-primary/20"
                : "bg-card border border-border text-zinc-400 hover:text-white hover:bg-background-subtle"
            }`}
          >
            All Products (6)
          </button>
          <button
            type="button"
            onClick={() => setActiveCategory("subscription")}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap min-h-[44px] transition-all select-none ${
              activeCategory === "subscription"
                ? "bg-primary text-white shadow-md shadow-primary/20"
                : "bg-card border border-border text-zinc-400 hover:text-white hover:bg-background-subtle"
            }`}
          >
            Streaming Passes (3)
          </button>
          <button
            type="button"
            onClick={() => setActiveCategory("renewal")}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap min-h-[44px] transition-all select-none ${
              activeCategory === "renewal"
                ? "bg-primary text-white shadow-md shadow-primary/20"
                : "bg-card border border-border text-zinc-400 hover:text-white hover:bg-background-subtle"
            }`}
          >
            Account Renewal (1)
          </button>
          <button
            type="button"
            onClick={() => setActiveCategory("hardware")}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap min-h-[44px] transition-all select-none ${
              activeCategory === "hardware"
                ? "bg-primary text-white shadow-md shadow-primary/20"
                : "bg-card border border-border text-zinc-400 hover:text-white hover:bg-background-subtle"
            }`}
          >
            C1 TV Box &amp; Bundles (2)
          </button>
        </div>

        {/* Dynamic Multi-Category Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {filteredPlans.map((plan) => {
            const isPopular = plan.isPopular;
            const isBox = plan.isBoxBundle;
            const isHardware = plan.isHardwareOnly;
            const isRenewal = plan.isRenewal;
            const currency = plan.currencySymbol || "€";

            return (
              <Card
                key={plan.id}
                className={`relative flex flex-col justify-between transition-all duration-200 bg-card ${
                  isPopular
                    ? "border-primary ring-1 ring-primary/40 lg:-translate-y-1 shadow-xl"
                    : isRenewal
                    ? "border-emerald-500/40 bg-zinc-950/90 shadow-lg"
                    : isBox
                    ? "border-amber-500/50 shadow-lg"
                    : "border-border hover:border-zinc-700 hover:shadow-card-hover"
                }`}
              >
                {/* Popular / Box Badges */}
                {plan.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                    <span
                      className={`text-[10px] font-bold tracking-wider uppercase px-3 py-1 rounded-full whitespace-nowrap border ${
                        isPopular
                          ? "bg-primary border-primary text-white"
                          : isRenewal
                          ? "bg-emerald-600 border-emerald-500 text-white"
                          : isBox
                          ? "bg-amber-500 border-amber-400 text-zinc-950"
                          : "bg-zinc-900 border-zinc-700 text-zinc-200"
                      }`}
                    >
                      {plan.badge}
                    </span>
                  </div>
                )}

                <div className="p-6 pb-2">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-lg font-bold text-white leading-snug">
                      {plan.name}
                    </h3>
                    {isBox || isHardware ? (
                      <Package className="h-5 w-5 text-amber-400 shrink-0" />
                    ) : isRenewal ? (
                      <RefreshCw className="h-5 w-5 text-emerald-400 shrink-0" />
                    ) : (
                      <Tv className="h-5 w-5 text-primary shrink-0" />
                    )}
                  </div>
                  <p className="text-xs text-zinc-400 min-h-[36px] leading-relaxed mt-1">
                    {plan.description}
                  </p>

                  {/* Price Display */}
                  <div className="py-4 my-2 border-y border-border">
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                        {currency}{plan.price.toFixed(2)}
                      </span>
                      <span className="text-xs text-zinc-400">
                        /{plan.period}
                      </span>
                    </div>

                    {/* Effective monthly price calculation & Savings */}
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-xs font-semibold text-zinc-200 bg-zinc-800 border border-zinc-700/80 px-2 py-0.5 rounded">
                        {plan.effectiveMonthly}
                      </span>
                      {plan.savings && (
                        <span className="text-xs text-emerald-400 font-medium">
                          {plan.savings}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Features List */}
                  <div className="space-y-2.5 pt-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 block">
                      {isRenewal ? "Renewal Benefits:" : "Item Highlights:"}
                    </span>
                    <ul className="space-y-2 text-xs">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-zinc-300">
                          <Check className={`h-4 w-4 shrink-0 mt-0.5 ${isRenewal ? "text-emerald-400" : isBox || isHardware ? "text-amber-400" : "text-primary"}`} />
                          <span className="leading-tight">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Card CTA Button (min 44px height for mobile touch target) */}
                <div className="p-6 pt-4">
                  <Button
                    onClick={() => onSelectPlan(plan)}
                    variant={isPopular ? "default" : "outline"}
                    size="lg"
                    className={`w-full font-bold justify-center h-12 text-sm min-h-[48px] ${
                      isPopular
                        ? "shadow-md shadow-primary/20"
                        : isRenewal
                        ? "border-emerald-500/50 hover:bg-emerald-500/10 text-emerald-300 hover:text-white"
                        : isBox
                        ? "border-amber-500/50 hover:bg-amber-500/10 text-amber-300 hover:text-white"
                        : ""
                    }`}
                  >
                    <span>
                      {isRenewal
                        ? "Renew Existing Subscription"
                        : isBox
                        ? "Order C1 Box + 1Yr Bundle"
                        : isHardware
                        ? "Order Standalone C1 Box"
                        : "Order with PayPal"}
                    </span>
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Hardware Warranty & Returns Banner */}
        <div className="mt-12 rounded-xl border border-zinc-800 bg-zinc-900/60 p-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-primary shrink-0">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <div>
              <div className="text-base font-bold text-white">
                1-Year Hardware Replacement Warranty &amp; 14-Day Return Window
              </div>
              <div className="text-xs text-zinc-400 mt-0.5">
                All {HARDWARE_NAME} units are covered by a full 1-year replacement guarantee against faults, backed by our 14-day return policy and PayPal Buyer Protection.
              </div>
            </div>
          </div>
          <Link
            href="/refund-policy"
            className="shrink-0 text-xs font-bold uppercase tracking-wider text-zinc-300 hover:text-white border border-zinc-700 hover:border-zinc-500 rounded-md px-4 py-2.5 bg-zinc-800/80 transition-colors min-h-[44px] flex items-center"
          >
            Read Returns Policy
          </Link>
        </div>

        {/* Comparison Page Pathway */}
        <div className="mt-8 text-center">
          <Link
            href="/plans"
            className="inline-flex items-center gap-2 text-xs font-bold text-zinc-300 hover:text-white bg-zinc-900 border border-zinc-800 hover:border-zinc-700 px-5 py-3 rounded-lg transition-colors min-h-[44px]"
          >
            <span>Compare All 6 Plans &amp; Black Edition C1 Hardware Specs</span>
            <ChevronRight className="h-4 w-4 text-primary" />
          </Link>
        </div>

      </div>
    </section>
  );
}
