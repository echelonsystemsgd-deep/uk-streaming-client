"use client";

import React, { useState } from "react";
import { Check, ShieldCheck, Sparkles, HelpCircle, Lock, Tv, Package } from "lucide-react";
import { PRICING_PLANS, PricingPlan } from "@/data/plans";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
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
            TRANSPARENT UK SUBSCRIPTIONS • NO CONTRACTS
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Choose Your Streaming Plan
          </h2>
          <p className="text-base sm:text-lg text-zinc-400 leading-relaxed">
            Instant digital dispatch via email &amp; WhatsApp within 2 minutes. Secure checkout in British Pounds (£ GBP) backed by PayPal Buyer Protection.
          </p>
        </div>

        {/* 4 Plans Grid strictly adhering to 8px grid and shadcn Card tokens */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 items-stretch">
          {PRICING_PLANS.map((plan) => {
            const isPopular = plan.isPopular;
            const isBox = plan.isBoxBundle;

            return (
              <Card
                key={plan.id}
                className={`relative flex flex-col justify-between transition-all duration-200 bg-card ${
                  isPopular
                    ? "border-primary ring-1 ring-primary/40 lg:-translate-y-2 shadow-xl"
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
                          : "bg-zinc-900 border-zinc-700 text-zinc-200"
                      }`}
                    >
                      {plan.badge}
                    </span>
                  </div>
                )}

                <div className="p-6 pb-2">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-xl font-bold text-white">
                      {plan.name}
                    </h3>
                    {isBox && <Package className="h-5 w-5 text-zinc-400" />}
                  </div>
                  <p className="text-xs text-zinc-400 min-h-[32px] leading-relaxed">
                    {plan.description}
                  </p>

                  {/* Price Display */}
                  <div className="py-4 my-2 border-y border-border">
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                        £{plan.price.toFixed(2)}
                      </span>
                      <span className="text-xs text-zinc-400">
                        {plan.period}
                      </span>
                    </div>

                    {/* Effective monthly price calculation */}
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-xs font-semibold text-zinc-200 bg-zinc-800 border border-zinc-700/80 px-2 py-0.5 rounded">
                        {plan.effectiveMonthly}
                      </span>
                      {plan.savings && (
                        <span className="text-xs text-zinc-400">
                          {plan.savings}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Features Checklist */}
                  <div className="space-y-2.5 pt-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 block">
                      Plan Highlights:
                    </span>
                    <ul className="space-y-2 text-xs">
                      {plan.features.map((feature, fIdx) => (
                        <li key={fIdx} className="flex items-start gap-2 text-zinc-300">
                          <Check className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                          <span className="leading-tight">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Card Footer with CTA (48px / h-12 height) */}
                <div className="p-6 pt-4">
                  <Button
                    variant={isPopular ? "default" : "outline"}
                    size="lg"
                    className="w-full font-bold justify-center h-12 text-sm"
                    onClick={() => onSelectPlan(plan)}
                  >
                    <span>Subscribe via PayPal</span>
                  </Button>
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

      </div>
    </section>
  );
}
