"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useSiteShell } from "@/components/layout/SiteShell";
import { JsonLd } from "@/components/seo/JsonLd";
import { PRICING_PLANS, PricingPlan, HARDWARE_NAME } from "@/data/plans";
import {
  Check,
  ShieldCheck,
  Zap,
  ChevronRight,
  Tv,
  RefreshCw,
  Package,
  RotateCcw,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";

type FilterCategory = "all" | "subscription" | "renewal" | "hardware";

export default function PlansPage() {
  const { openPlan } = useSiteShell();
  const [activeCategory, setActiveCategory] = useState<FilterCategory>("all");

  const filteredPlans = PRICING_PLANS.filter((plan) => {
    if (activeCategory === "all") return true;
    if (activeCategory === "subscription") return plan.category === "subscription";
    if (activeCategory === "renewal") return plan.category === "renewal";
    if (activeCategory === "hardware") return plan.category === "hardware" || plan.category === "bundle";
    return true;
  });

  const jsonLdData = [
    {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": "ChitramTV 12+2 Months Service Pass",
      "image": "https://chitramtv.eu/Logo.png",
      "description": "14 full months of 500+ live Indian TV channels, 4K cricket, and 14-day catch-up TV for Android TV & Firestick.",
      "brand": { "@type": "Brand", "name": "ChitramTV" },
      "offers": {
        "@type": "Offer",
        "price": "89.99",
        "priceCurrency": "GBP",
        "availability": "https://schema.org/InStock",
        "priceValidUntil": "2027-12-31",
        "url": "https://chitramtv.eu/plans",
        "seller": { "@type": "Organization", "name": "ChitramTV" }
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": "ChitramTV Renewal (12+2 Free Months)",
      "image": "https://chitramtv.eu/assets/client/logo.svg",
      "description": "14 months service extension for existing ChitramTV subscribers with zero interruption to active equipment.",
      "brand": { "@type": "Brand", "name": "ChitramTV" },
      "offers": {
        "@type": "Offer",
        "price": "89.99",
        "priceCurrency": "GBP",
        "availability": "https://schema.org/InStock",
        "url": "https://chitramtv.eu/plans",
        "seller": { "@type": "Organization", "name": "ChitramTV" }
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": "ChitramTV Box + 1 Year Service Bundle",
      "description": "ChitramTV Black Edition C1 Box powered by Android 14 + 12 months full Indian TV streaming subscription.",
      "brand": { "@type": "Brand", "name": "ChitramTV" },
      "offers": {
        "@type": "Offer",
        "price": "109.99",
        "priceCurrency": "GBP",
        "availability": "https://schema.org/InStock",
        "url": "https://chitramtv.eu/plans",
        "seller": { "@type": "Organization", "name": "ChitramTV" }
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": "ChitramTV Black Edition C1 Box Only",
      "description": "Official standalone ChitramTV Black Edition C1 Box with Android 14 framework, Bluetooth remote, and HDR10+.",
      "brand": { "@type": "Brand", "name": "ChitramTV" },
      "offers": {
        "@type": "Offer",
        "price": "59.99",
        "priceCurrency": "GBP",
        "availability": "https://schema.org/InStock",
        "url": "https://chitramtv.eu/plans",
        "seller": { "@type": "Organization", "name": "ChitramTV" }
      }
    }
  ];

  return (
    <>
      <JsonLd data={jsonLdData} />

      {/* Breadcrumb Strip */}
      <div className="border-b border-gray-200 bg-gray-50 py-2.5 px-4 text-xs text-gray-500">
        <div className="container mx-auto max-w-7xl flex items-center gap-2">
          <Link href="/" className="hover:text-gray-900 transition-colors">Home</Link>
          <span>/</span>
          <span className="text-gray-900 font-semibold">Subscription Plans &amp; Hardware</span>
        </div>
      </div>

      {/* Hero Header */}
      <section className="relative overflow-hidden pt-8 pb-12 sm:pt-14 sm:pb-16 bg-[#f4f6f8] border-b border-gray-200">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-red-200 bg-red-50 px-3.5 py-1 text-xs font-semibold text-[#dd0e1c] mb-4">
            <ShieldCheck className="h-3.5 w-3.5" />
            <span>100% PAYPAL BUYER PROTECTION ON ALL PASSES</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#2c3640] tracking-tight leading-tight">
            Transparent Pricing in <span className="text-[#dd0e1c]">British Pounds (£)</span>
          </h1>
          <p className="mt-4 text-sm sm:text-base text-gray-600 leading-relaxed">
            Verified rates directly from the official ChitramTV catalogue. No contracts, instant WhatsApp &amp; Email credential dispatch, and official {HARDWARE_NAME} units.
          </p>
        </div>
      </section>

      {/* Category Tabs for Clean Mobile & Desktop Navigation */}
      <section className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-8 pb-2">
        <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-4 mb-6 scrollbar-none">
          <button
            type="button"
            onClick={() => setActiveCategory("all")}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap min-h-[44px] transition-all select-none ${
              activeCategory === "all"
                ? "bg-[#dd0e1c] text-white shadow-sm"
                : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 shadow-sm"
            }`}
          >
            All Products (6)
          </button>
          <button
            type="button"
            onClick={() => setActiveCategory("subscription")}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap min-h-[44px] transition-all select-none ${
              activeCategory === "subscription"
                ? "bg-[#dd0e1c] text-white shadow-sm"
                : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 shadow-sm"
            }`}
          >
            Streaming Passes (3)
          </button>
          <button
            type="button"
            onClick={() => setActiveCategory("renewal")}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap min-h-[44px] transition-all select-none ${
              activeCategory === "renewal"
                ? "bg-[#dd0e1c] text-white shadow-sm"
                : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 shadow-sm"
            }`}
          >
            Account Renewal (1)
          </button>
          <button
            type="button"
            onClick={() => setActiveCategory("hardware")}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap min-h-[44px] transition-all select-none ${
              activeCategory === "hardware"
                ? "bg-[#dd0e1c] text-white shadow-sm"
                : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 shadow-sm"
            }`}
          >
            C1 TV Box &amp; Bundles (2)
          </button>
        </div>

        {/* Main Pricing Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPlans.map((plan) => {
            const isBestValue = plan.isPopular;
            const isBox = plan.isBoxBundle;
            const isHardware = plan.isHardwareOnly;
            const isRenewal = plan.isRenewal;
            const currency = plan.currencySymbol || "£";

            return (
              <div
                key={plan.id}
                className={`relative rounded-2xl flex flex-col justify-between transition-all duration-300 p-6 sm:p-7 bg-white shadow-sm ${
                  isBestValue
                    ? "border-2 border-[#dd0e1c] shadow-md scale-[1.01] z-10"
                    : isRenewal
                    ? "border-2 border-emerald-600 shadow-md"
                    : isBox
                    ? "border-2 border-amber-500 shadow-md"
                    : "border border-gray-200 hover:border-gray-300 hover:shadow-md"
                }`}
              >
                {/* Popular / Hardware Tag */}
                {plan.badge && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-10">
                    <span
                      className={`text-[11px] font-extrabold uppercase tracking-wider py-1 px-3.5 rounded-full shadow-md whitespace-nowrap ${
                        isBestValue
                          ? "bg-[#dd0e1c] text-white"
                          : isRenewal
                          ? "bg-emerald-600 text-white"
                          : isBox
                          ? "bg-amber-500 text-gray-900 font-black"
                          : "bg-gray-800 text-white"
                      }`}
                    >
                      {plan.badge}
                    </span>
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-lg font-bold text-[#2c3640] tracking-tight">
                      {plan.name}
                    </h3>
                    {isBox || isHardware ? (
                      <Package className="h-5 w-5 text-amber-500 shrink-0" />
                    ) : isRenewal ? (
                      <RefreshCw className="h-5 w-5 text-emerald-600 shrink-0" />
                    ) : (
                      <Tv className="h-5 w-5 text-[#dd0e1c] shrink-0" />
                    )}
                  </div>
                  <p className="text-xs text-gray-600 mt-1 min-h-[32px] leading-relaxed">
                    {plan.description}
                  </p>

                  {/* Price Block */}
                  <div className="pt-4 pb-4 border-b border-gray-100">
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl sm:text-4xl font-black text-gray-900">
                        {currency}{plan.price.toFixed(2)}
                      </span>
                      <span className="text-xs text-gray-500 font-medium">
                        /{plan.period}
                      </span>
                    </div>
                    <div className="text-xs text-gray-600 mt-1.5 flex items-center justify-between">
                      <span>Rate: <strong className="text-gray-900">{plan.effectiveMonthly}</strong></span>
                      {plan.savings && (
                        <span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                          {plan.savings}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Feature Bullets */}
                  <div className="py-5 space-y-2.5">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-gray-500 block">
                      {isRenewal ? "Renewal Guarantee:" : "Included with this option:"}
                    </span>
                    <ul className="space-y-2 text-xs">
                      {plan.features.map((f, i) => (
                        <li key={i} className="flex items-start gap-2 text-gray-700">
                          <Check className={`h-4 w-4 shrink-0 mt-0.5 ${isRenewal ? "text-emerald-600" : isBox || isHardware ? "text-amber-500" : "text-[#dd0e1c]"}`} />
                          <span className="leading-tight">{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Card CTA Trigger */}
                <div className="pt-4 border-t border-gray-100">
                  <Button
                    onClick={() => openPlan(plan)}
                    variant={isBestValue ? "default" : "outline"}
                    size="lg"
                    className={`w-full font-bold justify-center h-12 text-sm min-h-[48px] ${
                      isBestValue
                        ? "bg-[#dd0e1c] hover:bg-[#b00b16] text-white shadow-sm"
                        : isRenewal
                        ? "border-emerald-600 bg-emerald-50 hover:bg-emerald-100 text-emerald-800"
                        : isBox
                        ? "border-amber-500 bg-amber-50 hover:bg-amber-100 text-amber-900"
                        : "bg-white border-gray-300 hover:bg-gray-50 text-gray-800 shadow-sm"
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
              </div>
            );
          })}
        </div>
      </section>

      {/* Side-by-Side Comparison Matrix */}
      <section className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <div className="inline-flex items-center gap-2 rounded-full border border-red-200 bg-red-50 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[#dd0e1c]">
            SPECIFICATION BREAKDOWN
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-[#2c3640]">
            Compare All Streaming &amp; Hardware Options
          </h2>
          <p className="text-xs sm:text-sm text-gray-600">
            Swipe horizontally on mobile to view all product columns and technical specs.
          </p>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs min-w-[680px]">
              <thead className="bg-gray-50 border-b border-gray-200 text-gray-700">
                <tr>
                  <th className="p-4 sm:p-5 font-bold uppercase tracking-wider text-[11px] sticky left-0 bg-gray-100 z-10 text-gray-900">Feature</th>
                  <th className="p-4 sm:p-5 font-bold text-center">1 Month (£14.99)</th>
                  <th className="p-4 sm:p-5 font-bold text-center">6 Months (£59.99)</th>
                  <th className="p-4 sm:p-5 font-bold text-center text-[#dd0e1c] bg-red-50/50">14 Months (£89.99)</th>
                  <th className="p-4 sm:p-5 font-bold text-center text-emerald-700 bg-emerald-50/50">14M Renewal (£89.99)</th>
                  <th className="p-4 sm:p-5 font-bold text-center text-amber-700 bg-amber-50/50">C1 Box + 1Yr (£109.99)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-gray-700">
                <tr>
                  <td className="p-4 sm:p-5 font-medium text-gray-900 sticky left-0 bg-white z-10">Live Indian Channels</td>
                  <td className="p-4 sm:p-5 text-center">500+ Channels</td>
                  <td className="p-4 sm:p-5 text-center">500+ Channels</td>
                  <td className="p-4 sm:p-5 text-center bg-red-50/30 font-semibold text-gray-900">500+ Channels</td>
                  <td className="p-4 sm:p-5 text-center bg-emerald-50/30 font-semibold text-emerald-800">500+ Channels</td>
                  <td className="p-4 sm:p-5 text-center font-semibold text-gray-900">500+ Channels</td>
                </tr>
                <tr>
                  <td className="p-4 sm:p-5 font-medium text-gray-900 sticky left-0 bg-white z-10">Catch-Up TV Duration</td>
                  <td className="p-4 sm:p-5 text-center">14 Days</td>
                  <td className="p-4 sm:p-5 text-center">14 Days</td>
                  <td className="p-4 sm:p-5 text-center bg-red-50/30 font-semibold text-gray-900">14 Days</td>
                  <td className="p-4 sm:p-5 text-center bg-emerald-50/30 font-semibold text-emerald-800">14 Days</td>
                  <td className="p-4 sm:p-5 text-center font-semibold text-gray-900">14 Days</td>
                </tr>
                <tr>
                  <td className="p-4 sm:p-5 font-medium text-gray-900 sticky left-0 bg-white z-10">Simultaneous Devices</td>
                  <td className="p-4 sm:p-5 text-center">2 Screens</td>
                  <td className="p-4 sm:p-5 text-center">3 Screens</td>
                  <td className="p-4 sm:p-5 text-center bg-red-50/30 font-bold text-[#dd0e1c]">4 Screens</td>
                  <td className="p-4 sm:p-5 text-center bg-emerald-50/30 font-bold text-emerald-700">4 Screens</td>
                  <td className="p-4 sm:p-5 text-center font-bold text-amber-700">4 Screens</td>
                </tr>
                <tr>
                  <td className="p-4 sm:p-5 font-medium text-gray-900 sticky left-0 bg-white z-10">4K 60fps Live Cricket</td>
                  <td className="p-4 sm:p-5 text-center">Full HD 1080p</td>
                  <td className="p-4 sm:p-5 text-center">Yes (4K Ultra HD)</td>
                  <td className="p-4 sm:p-5 text-center bg-red-50/30 font-bold text-gray-900">Yes (4K Ultra HD)</td>
                  <td className="p-4 sm:p-5 text-center bg-emerald-50/30 font-bold text-gray-900">Yes (4K Ultra HD)</td>
                  <td className="p-4 sm:p-5 text-center font-bold text-gray-900">Yes (4K Ultra HD)</td>
                </tr>
                <tr>
                  <td className="p-4 sm:p-5 font-medium text-gray-900 sticky left-0 bg-white z-10">Dedicated Set-Top Box</td>
                  <td className="p-4 sm:p-5 text-center text-gray-400">—</td>
                  <td className="p-4 sm:p-5 text-center text-gray-400">—</td>
                  <td className="p-4 sm:p-5 text-center bg-red-50/30 text-gray-400">—</td>
                  <td className="p-4 sm:p-5 text-center bg-emerald-50/30 text-emerald-700">Keeps Current Box</td>
                  <td className="p-4 sm:p-5 text-center text-amber-700 font-bold">Black Edition C1 (Android 14)</td>
                </tr>
                <tr>
                  <td className="p-4 sm:p-5 font-medium text-gray-900 sticky left-0 bg-white z-10">Bluetooth Remote Included</td>
                  <td className="p-4 sm:p-5 text-center text-gray-400">—</td>
                  <td className="p-4 sm:p-5 text-center text-gray-400">—</td>
                  <td className="p-4 sm:p-5 text-center bg-red-50/30 text-gray-400">—</td>
                  <td className="p-4 sm:p-5 text-center bg-emerald-50/30 text-gray-600">Existing Remote</td>
                  <td className="p-4 sm:p-5 text-center text-amber-700 font-bold">Premium BT Remote Included</td>
                </tr>
                <tr>
                  <td className="p-4 sm:p-5 font-medium text-gray-900 sticky left-0 bg-white z-10">Support Desk</td>
                  <td className="p-4 sm:p-5 text-center">WhatsApp Desk</td>
                  <td className="p-4 sm:p-5 text-center">Priority WhatsApp</td>
                  <td className="p-4 sm:p-5 text-center bg-red-50/30 font-bold text-[#dd0e1c]">VIP Fast-Track</td>
                  <td className="p-4 sm:p-5 text-center bg-emerald-50/30 font-bold text-emerald-700">Priority WhatsApp</td>
                  <td className="p-4 sm:p-5 text-center font-bold text-amber-700">Priority WhatsApp &amp; Courier</td>
                </tr>
                <tr>
                  <td className="p-4 sm:p-5 font-medium text-gray-900 sticky left-0 bg-white z-10">Warranty &amp; Guarantee</td>
                  <td className="p-4 sm:p-5 text-center">7 Days Money-Back</td>
                  <td className="p-4 sm:p-5 text-center">7 Days Money-Back</td>
                  <td className="p-4 sm:p-5 text-center bg-red-50/30 font-bold text-gray-900">7 Days Full Refund</td>
                  <td className="p-4 sm:p-5 text-center bg-emerald-50/30 font-bold text-gray-900">7 Days Satisfaction</td>
                  <td className="p-4 sm:p-5 text-center font-bold text-amber-700">1-Yr Warranty + 14-Day Return</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Trust & Guarantee Strip with Explicit Hardware Warranty & Returns */}
      <section className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-14 sm:pb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="rounded-xl border border-gray-200 bg-white p-6 space-y-2.5 shadow-sm">
            <div className="h-9 w-9 rounded-lg bg-red-50 flex items-center justify-center text-[#dd0e1c]">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <h3 className="text-base font-bold text-[#2c3640]">100% PayPal Buyer Protection</h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              Every checkout is executed securely through PayPal in British Pounds (£). You are backed by PayPal&apos;s full dispute resolution and customer protection guarantee.
            </p>
          </div>
          <div className="rounded-xl border border-gray-200 bg-white p-6 space-y-2.5 shadow-sm">
            <div className="h-9 w-9 rounded-lg bg-amber-50 flex items-center justify-center text-amber-600">
              <Zap className="h-5 w-5" />
            </div>
            <h3 className="text-base font-bold text-[#2c3640]">1-Year Hardware Replacement Warranty</h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              All official {HARDWARE_NAME} units carry a full 1-year replacement warranty against hardware defects from the date of purchase.
            </p>
          </div>
          <div className="rounded-xl border border-gray-200 bg-white p-6 space-y-2.5 shadow-sm">
            <div className="h-9 w-9 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600">
              <RotateCcw className="h-5 w-5" />
            </div>
            <h3 className="text-base font-bold text-[#2c3640]">14-Day Faulty Hardware Return Window</h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              Customers have 14 days to return faulty TV boxes with all original accessories (Bluetooth remote, HDMI lead, power unit) and serial numbers intact.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
