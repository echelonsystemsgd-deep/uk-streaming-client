"use client";

import React from "react";
import Link from "next/link";
import { Check, ShieldCheck, Lock, Tv, Package, ChevronRight, MessageSquare } from "lucide-react";
import { PRICING_PLANS, PricingPlan } from "@/data/plans";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface PricingSectionProps {
  onSelectPlan: (plan: PricingPlan) => void;
}

export function PricingSection({ onSelectPlan }: PricingSectionProps) {
  return (
    <section id="plans" className="py-16 sm:py-20 bg-background border-b border-border relative">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-3 sm:space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-primary">
            CHITRAMTV UK • OFFICIAL SUBSCRIPTION PASSES
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Choose Your Streaming Pass or Hardware
          </h2>
          <p className="text-base sm:text-lg text-zinc-400 leading-relaxed">
            Instant digital credential dispatch via WhatsApp &amp; Email. Complete subscription passes, official Dune HD set-top boxes, and European delivery.
          </p>
        </div>

        {/* Dynamic Multi-Category Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {PRICING_PLANS.map((plan) => {
            const isPopular = plan.isPopular;
            const isBox = plan.isBoxBundle;
            const isHardware = plan.isHardwareOnly;
            const isPending = plan.isPendingCatalogue;
            const currency = plan.currencySymbol || "€";

            return (
              <Card
                key={plan.id}
                className={`relative flex flex-col justify-between transition-all duration-200 bg-card ${
                  isPopular
                    ? "border-primary ring-1 ring-primary/40 lg:-translate-y-1 shadow-xl"
                    : isPending
                    ? "border-emerald-500/40 bg-zinc-950/80"
                    : "border-border hover:border-zinc-700"
                }`}
              >
                {/* Popular / Box Badges */}
                {plan.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                    <span
                      className={`text-[10px] font-bold tracking-wider uppercase px-3 py-1 rounded-full whitespace-nowrap border ${
                        isPopular
                          ? "bg-primary border-primary text-white"
                          : isPending
                          ? "bg-emerald-500/20 border-emerald-500/40 text-emerald-400"
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
                      <Package className="h-5 w-5 text-zinc-400 shrink-0" />
                    ) : isPending ? (
                      <MessageSquare className="h-5 w-5 text-emerald-400 shrink-0" />
                    ) : (
                      <Tv className="h-5 w-5 text-primary shrink-0" />
                    )}
                  </div>
                  <p className="text-xs text-zinc-400 min-h-[36px] leading-relaxed mt-1">
                    {plan.description}
                  </p>

                  {/* Price Display */}
                  <div className="py-4 my-2 border-y border-border">
                    {isPending ? (
                      <div className="flex flex-col">
                        <span className="text-2xl font-extrabold text-emerald-400 tracking-tight">
                          6 More Items
                        </span>
                        <span className="text-xs text-zinc-400 mt-1">
                          Direct in WhatsApp Catalogue
                        </span>
                      </div>
                    ) : (
                      <>
                        <div className="flex items-baseline gap-1">
                          <span className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                            {currency}{plan.price.toFixed(2)}
                          </span>
                          <span className="text-xs text-zinc-400">
                            /{plan.period}
                          </span>
                        </div>

                        {/* Effective monthly price calculation */}
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
                      </>
                    )}
                  </div>

                  {/* Features Checklist */}
                  <div className="space-y-2.5 pt-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 block">
                      {isPending ? "Catalogue Overview:" : "Item Highlights:"}
                    </span>
                    <ul className="space-y-2 text-xs">
                      {plan.features.map((feature, fIdx) => (
                        <li key={fIdx} className="flex items-start gap-2 text-zinc-300">
                          <Check className={`h-4 w-4 shrink-0 mt-0.5 ${isPending ? "text-emerald-400" : "text-primary"}`} />
                          <span className="leading-tight">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Card Footer with CTA (48px / h-12 height) */}
                <div className="p-6 pt-4">
                  {isPending ? (
                    <a
                      href={plan.whatsappUrl || "https://wa.me/31620897414"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm h-12 px-4 transition-colors select-none"
                    >
                      <MessageSquare className="h-4 w-4" />
                      <span>Inquire via WhatsApp</span>
                    </a>
                  ) : (
                    <Button
                      variant={isPopular ? "default" : "outline"}
                      size="lg"
                      className="w-full font-bold justify-center h-12 text-sm"
                      onClick={() => onSelectPlan(plan)}
                    >
                      <span>
                        {isHardware ? "Order Hardware with PayPal" : "Order with PayPal"}
                      </span>
                    </Button>
                  )}
                </div>
              </Card>
            );
          })}
        </div>

        {/* PayPal Security & Guarantees under plans */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-xs text-zinc-400">
          <span className="flex items-center gap-1.5">
            <Lock className="h-4 w-4 text-zinc-400" />
            256-bit TLS Encrypted Transaction
          </span>
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="h-4 w-4 text-zinc-400" />
            Full PayPal Buyer Protection
          </span>
          <span className="flex items-center gap-1.5">
            <Tv className="h-4 w-4 text-zinc-400" />
            Instant Digital Dispatch (&lt;2 Minutes)
          </span>
        </div>

        {/* Link to dedicated /plans page */}
        <div className="mt-8 text-center">
          <Link
            href="/plans"
            className="inline-flex items-center gap-2 text-xs font-semibold text-zinc-200 hover:text-white bg-zinc-900 border border-zinc-700 hover:border-zinc-600 px-5 py-2.5 rounded-lg transition-colors min-h-[44px]"
          >
            <span>Compare All Plans &amp; Dune HD Hardware Specs</span>
            <ChevronRight className="h-4 w-4 text-primary" />
          </Link>
        </div>

      </div>
    </section>
  );
}
