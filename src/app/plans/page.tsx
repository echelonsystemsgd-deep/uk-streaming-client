"use client";

import React from "react";
import Link from "next/link";
import { SiteShell, useSiteShell } from "@/components/layout/SiteShell";
import { JsonLd } from "@/components/seo/JsonLd";
import { PRICING_PLANS, PricingPlan } from "@/data/plans";
import { Check, ShieldCheck, Zap, ChevronRight, Tv, RefreshCcw, Package, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PlansPage() {
  const { openPlan } = useSiteShell();

  const jsonLdData = [
    {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": "ChitramTV 14 Months Service Pass",
      "image": "https://chitramtv.eu/assets/client/logo.svg",
      "description": "14 full months of 350+ live Indian TV channels, 4K cricket, and 7-day catch-up TV.",
      "brand": { "@type": "Brand", "name": "ChitramTV" },
      "offers": {
        "@type": "Offer",
        "price": "109.00",
        "priceCurrency": "EUR",
        "availability": "https://schema.org/InStock",
        "priceValidUntil": "2027-12-31",
        "url": "https://chitramtv.eu/plans",
        "seller": { "@type": "Organization", "name": "ChitramTV" }
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": "ChitramTV Dune HD Classic Box + 1 Year Bundle",
      "description": "Dune HD Classic set-top box delivered to your address + 12 months full subscription.",
      "brand": { "@type": "Brand", "name": "ChitramTV" },
      "offers": {
        "@type": "Offer",
        "price": "129.00",
        "priceCurrency": "EUR",
        "availability": "https://schema.org/InStock",
        "url": "https://chitramtv.eu/plans",
        "seller": { "@type": "Organization", "name": "ChitramTV" }
      }
    }
  ];

  return (
    <SiteShell>
      <JsonLd data={jsonLdData} />

      {/* Breadcrumb Strip */}
      <div className="border-b border-border/60 bg-zinc-950/60 py-2.5 px-4 text-xs text-zinc-400">
        <div className="container mx-auto max-w-7xl flex items-center gap-2">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <span>/</span>
          <span className="text-white font-medium">Subscription Plans &amp; Hardware</span>
        </div>
      </div>

      {/* Hero Header */}
      <section className="relative overflow-hidden pt-8 pb-12 sm:pt-14 sm:pb-16 bg-gradient-to-b from-zinc-900/40 to-background border-b border-border/60">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background-elevated px-3.5 py-1 text-xs font-semibold text-primary mb-4">
            <ShieldCheck className="h-3.5 w-3.5" />
            <span>100% PAYPAL BUYER PROTECTION ON ALL PASSES</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Transparent Pricing in <span className="text-primary">Euros (€)</span>
          </h1>
          <p className="mt-4 text-sm sm:text-base text-zinc-400 leading-relaxed">
            Verified rates directly from the official ChitramTV catalogue. No contracts, instant WhatsApp &amp; Email credential dispatch, and official Dune HD hardware.
          </p>
        </div>
      </section>

      {/* Main Pricing Grid */}
      <section className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 -mt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PRICING_PLANS.map((plan) => {
            const isBestValue = plan.isPopular;
            const isBox = plan.isBoxBundle;
            const isHardware = plan.isHardwareOnly;
            const isPending = plan.isPendingCatalogue;
            const currency = plan.currencySymbol || "€";

            return (
              <div
                key={plan.id}
                className={`relative rounded-2xl flex flex-col justify-between transition-all duration-300 p-6 sm:p-7 ${
                  isBestValue
                    ? "bg-card border-2 border-primary shadow-2xl scale-[1.01] z-10"
                    : isPending
                    ? "bg-card border-2 border-emerald-500/40 shadow-xl"
                    : isBox
                    ? "bg-card border-2 border-amber-500/60 shadow-xl"
                    : "bg-card border border-zinc-800 hover:border-zinc-700 shadow-card"
                }`}
              >
                {/* Popular / Hardware Tag */}
                {plan.badge && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-10">
                    <span
                      className={`text-[11px] font-extrabold uppercase tracking-wider py-1 px-3.5 rounded-full shadow-md whitespace-nowrap ${
                        isBestValue
                          ? "bg-primary text-white"
                          : isPending
                          ? "bg-emerald-600 text-white"
                          : isBox
                          ? "bg-amber-500 text-zinc-950"
                          : "bg-zinc-800 text-zinc-200 border border-zinc-700"
                      }`}
                    >
                      {plan.badge}
                    </span>
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-lg font-bold text-white tracking-tight">
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
                  <p className="text-xs text-zinc-400 mt-1 min-h-[32px] leading-relaxed">
                    {plan.description}
                  </p>

                  {/* Price Block */}
                  <div className="pt-4 pb-4 border-b border-zinc-800">
                    {isPending ? (
                      <div>
                        <div className="text-2xl font-extrabold text-emerald-400">
                          6 More Items Available
                        </div>
                        <div className="text-xs text-zinc-400 mt-1">
                          Inquire directly with ChitramTV Support
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="flex items-baseline gap-1">
                          <span className="text-3xl sm:text-4xl font-black text-white">
                            {currency}{plan.price.toFixed(2)}
                          </span>
                          <span className="text-xs text-zinc-400 font-medium">
                            /{plan.period}
                          </span>
                        </div>
                        <div className="text-xs text-zinc-400 mt-1.5 flex items-center justify-between">
                          <span>Rate: <strong className="text-white">{plan.effectiveMonthly}</strong></span>
                          {plan.savings && (
                            <span className="text-emerald-400 font-semibold text-[11px]">
                              {plan.savings}
                            </span>
                          )}
                        </div>
                      </>
                    )}
                  </div>

                  {/* Device Limit Badge */}
                  {!isPending && (
                    <div className="py-3 flex items-center gap-2 text-xs text-zinc-300">
                      <Tv className="h-4 w-4 text-primary shrink-0" />
                      <span>
                        {isHardware
                          ? "Official media receiver with Chitram firmware"
                          : `Watch on ${plan.devices} devices simultaneously`}
                      </span>
                    </div>
                  )}

                  {/* Features List */}
                  <ul className="space-y-2.5 pt-2 pb-6 text-xs text-zinc-300">
                    {plan.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Check className={`h-4 w-4 shrink-0 mt-0.5 ${isPending ? "text-emerald-400" : "text-primary"}`} />
                        <span className="leading-snug">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Conversion Button */}
                <div className="pt-4 border-t border-zinc-800">
                  {isPending ? (
                    <a
                      href={plan.whatsappUrl || "https://wa.me/31620897414"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold h-12 rounded-lg text-sm transition-colors select-none"
                    >
                      <MessageSquare className="h-4 w-4" />
                      <span>Chat on WhatsApp (+31 6 20897414)</span>
                    </a>
                  ) : (
                    <Button
                      variant={isBestValue ? "default" : "outline"}
                      size="lg"
                      onClick={() => openPlan(plan)}
                      className="w-full font-bold h-12 flex items-center justify-center gap-2 text-sm"
                    >
                      <span>
                        {isHardware ? "Order Box via PayPal" : "Subscribe via PayPal"}
                      </span>
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  )}
                  <p className="text-[10px] text-center text-zinc-500 mt-2">
                    Instant activation via WhatsApp &amp; Email
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Feature Comparison Matrix Table */}
      <section className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Detailed Feature Comparison
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 mt-2">
            Every pass includes full access to our 350+ live channels and 7-day catch-up archive.
          </p>
        </div>

        <div className="rounded-xl border border-zinc-800 bg-card overflow-hidden shadow-card">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-zinc-900/80 border-b border-zinc-800 text-zinc-300">
                <tr>
                  <th className="p-4 sm:p-5 font-bold uppercase tracking-wider text-[11px]">Feature</th>
                  <th className="p-4 sm:p-5 font-bold text-center">1 Month (€15.00)</th>
                  <th className="p-4 sm:p-5 font-bold text-center">6 Months (€69.00)</th>
                  <th className="p-4 sm:p-5 font-bold text-center text-primary bg-primary/5">14 Months (€109.00)</th>
                  <th className="p-4 sm:p-5 font-bold text-center text-amber-400">Dune Box + 1Yr (€129.00)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800 text-zinc-300">
                <tr>
                  <td className="p-4 sm:p-5 font-medium text-white">Live Indian Channels</td>
                  <td className="p-4 sm:p-5 text-center">350+ Channels</td>
                  <td className="p-4 sm:p-5 text-center">350+ Channels</td>
                  <td className="p-4 sm:p-5 text-center bg-primary/5 font-semibold text-white">350+ Channels</td>
                  <td className="p-4 sm:p-5 text-center font-semibold text-white">350+ Channels</td>
                </tr>
                <tr>
                  <td className="p-4 sm:p-5 font-medium text-white">Catch-Up TV Duration</td>
                  <td className="p-4 sm:p-5 text-center">7 Days</td>
                  <td className="p-4 sm:p-5 text-center">7 Days</td>
                  <td className="p-4 sm:p-5 text-center bg-primary/5 font-semibold text-white">7 Days</td>
                  <td className="p-4 sm:p-5 text-center font-semibold text-white">7 Days</td>
                </tr>
                <tr>
                  <td className="p-4 sm:p-5 font-medium text-white">Simultaneous Devices</td>
                  <td className="p-4 sm:p-5 text-center">2 Screens</td>
                  <td className="p-4 sm:p-5 text-center">3 Screens</td>
                  <td className="p-4 sm:p-5 text-center bg-primary/5 font-bold text-primary">4 Screens</td>
                  <td className="p-4 sm:p-5 text-center font-bold text-amber-400">4 Screens</td>
                </tr>
                <tr>
                  <td className="p-4 sm:p-5 font-medium text-white">4K 60fps Live Cricket</td>
                  <td className="p-4 sm:p-5 text-center">Full HD 1080p</td>
                  <td className="p-4 sm:p-5 text-center">Yes (4K Ultra HD)</td>
                  <td className="p-4 sm:p-5 text-center bg-primary/5 font-bold text-white">Yes (4K Ultra HD)</td>
                  <td className="p-4 sm:p-5 text-center font-bold text-white">Yes (4K Ultra HD)</td>
                </tr>
                <tr>
                  <td className="p-4 sm:p-5 font-medium text-white">Dedicated Set-Top Box</td>
                  <td className="p-4 sm:p-5 text-center text-zinc-500">—</td>
                  <td className="p-4 sm:p-5 text-center text-zinc-500">—</td>
                  <td className="p-4 sm:p-5 text-center bg-primary/5 text-zinc-500">—</td>
                  <td className="p-4 sm:p-5 text-center text-amber-400 font-bold">Dune HD Classic Receiver</td>
                </tr>
                <tr>
                  <td className="p-4 sm:p-5 font-medium text-white">Support Desk</td>
                  <td className="p-4 sm:p-5 text-center">WhatsApp Desk</td>
                  <td className="p-4 sm:p-5 text-center">Priority WhatsApp</td>
                  <td className="p-4 sm:p-5 text-center bg-primary/5 font-bold text-primary">VIP Fast-Track</td>
                  <td className="p-4 sm:p-5 text-center font-bold text-amber-400">Priority WhatsApp &amp; Phone</td>
                </tr>
                <tr>
                  <td className="p-4 sm:p-5 font-medium text-white">Money-Back Guarantee</td>
                  <td className="p-4 sm:p-5 text-center">7 Days</td>
                  <td className="p-4 sm:p-5 text-center">7 Days</td>
                  <td className="p-4 sm:p-5 text-center bg-primary/5 font-bold text-white">7 Days Full Refund</td>
                  <td className="p-4 sm:p-5 text-center font-bold text-white">1-Year Hardware Warranty</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Trust & Guarantee Strip */}
      <section className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-14 sm:pb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="rounded-xl border border-zinc-800 bg-card p-6 space-y-2.5">
            <div className="h-9 w-9 rounded-lg bg-zinc-800 flex items-center justify-center text-primary">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <h3 className="text-base font-bold text-white">100% PayPal Buyer Protection</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Every checkout is executed securely through PayPal in Euros (€). You are backed by PayPal&apos;s dispute resolution guarantee.
            </p>
          </div>
          <div className="rounded-xl border border-zinc-800 bg-card p-6 space-y-2.5">
            <div className="h-9 w-9 rounded-lg bg-zinc-800 flex items-center justify-center text-primary">
              <RefreshCcw className="h-5 w-5" />
            </div>
            <h3 className="text-base font-bold text-white">7-Day Money-Back Guarantee</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              If your stream experiences persistent buffering that our desk cannot solve, we will refund your fee without hassle.
            </p>
          </div>
          <div className="rounded-xl border border-zinc-800 bg-card p-6 space-y-2.5">
            <div className="h-9 w-9 rounded-lg bg-zinc-800 flex items-center justify-center text-primary">
              <Zap className="h-5 w-5" />
            </div>
            <h3 className="text-base font-bold text-white">Instant Automated Dispatch</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Credentials, playlist links, and step-by-step setup instructions are delivered to WhatsApp &amp; Email within 60 to 120 seconds.
            </p>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
