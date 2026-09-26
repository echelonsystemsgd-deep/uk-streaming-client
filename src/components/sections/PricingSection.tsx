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
    <section id="plans" className="py-20 bg-background border-b border-border/60 relative">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-primary">
            TRANSPARENT UK PRICING • NO HIDDEN FEES
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Select Your Subscription Plan
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            Instant automated digital delivery via email and WhatsApp. Pay safely with PayPal buyer protection in British Pounds (£ GBP).
          </p>
        </div>

        {/* 4 Plans Grid adhering strictly to 8px grid and Card-only shadows */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 items-stretch">
          {PRICING_PLANS.map((plan) => {
            const isPopular = plan.isPopular;
            const isBox = plan.isBoxBundle;

            return (
              <Card
                key={plan.id}
                className={`relative flex flex-col justify-between transition-all duration-300 ${
                  isPopular
                    ? "border-accent ring-1 ring-accent/60 bg-gradient-to-b from-card via-card to-background-elevated scale-100 lg:-translate-y-2"
                    : isBox
                    ? "border-sky-500/40 bg-card"
                    : "border-border/80 bg-card"
                }`}
              >
                {/* Popular / Box Badges */}
                {plan.badge && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-10">
                    <span
                      className={`text-[11px] font-black tracking-wide uppercase px-3 py-1 rounded-full whitespace-nowrap ${
                        isPopular
                          ? "bg-accent text-accent-foreground"
                          : "bg-sky-500 text-white"
                      }`}
                    >
                      {plan.badge}
                    </span>
                  </div>
                )}

                <div>
                  <CardHeader className="pt-6 pb-4">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-xl font-bold text-white">
                        {plan.name}
                      </CardTitle>
                      {isBox && <Package className="h-5 w-5 text-sky-400" />}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1 min-h-[32px]">
                      {plan.description}
                    </p>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    {/* Price Display */}
                    <div className="pb-4 border-b border-border/60">
                      <div className="flex items-baseline gap-1">
                        <span className="text-4xl font-extrabold text-white tracking-tight">
                          £{plan.price.toFixed(2)}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {plan.period}
                        </span>
                      </div>

                      {/* Effective monthly price calculation */}
                      <div className="flex items-center gap-2 mt-1.5">
                        <span className="text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                          {plan.effectiveMonthly}
                        </span>
                        {plan.savings && (
                          <span className="text-[11px] text-muted-foreground">
                            {plan.savings}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Features Checklist with Icons */}
                    <div className="space-y-2.5 pt-1">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground block">
                        Included in this plan:
                      </span>
                      <ul className="space-y-2 text-xs">
                        {plan.features.map((feature, fIdx) => (
                          <li key={fIdx} className="flex items-start gap-2 text-slate-300">
                            <Check className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </div>

                {/* Card Footer with CTA (No shadows on buttons!) */}
                <CardFooter className="pt-4 pb-6">
                  <Button
                    variant={isPopular ? "secondary" : "default"}
                    size="lg"
                    className="w-full font-bold justify-center min-h-[48px] text-sm"
                    onClick={() => onSelectPlan(plan)}
                  >
                    <span>Subscribe via PayPal</span>
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>

        {/* PayPal Security Note under plans */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <Lock className="h-4 w-4 text-sky-400" />
            256-bit TLS Encrypted Transaction
          </span>
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="h-4 w-4 text-emerald-400" />
            Full PayPal Buyer Protection
          </span>
          <span className="flex items-center gap-1.5">
            <Tv className="h-4 w-4 text-accent" />
            Instant Credential Dispatch (&lt;2 Minutes)
          </span>
        </div>

      </div>
    </section>
  );
}
