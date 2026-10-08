"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useSiteShell } from "@/components/layout/SiteShell";
import { PricingSection } from "@/components/sections/PricingSection";
import { JsonLd } from "@/components/seo/JsonLd";
import { ShieldCheck, Truck, Clock, RefreshCw, Phone, MessageSquare } from "lucide-react";
import { PRICING_PLANS } from "@/data/plans";

export default function BuyNowPage() {
  const { openPlan } = useSiteShell();

  const jsonLdData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "ChitramTV UK - Buy Now (Official Passes & TV Boxes)",
    "description": "Buy ChitramTV UK passes, renewals, and Android 14 C1 4K TV boxes in GBP with PayPal Buyer Protection and 14 Days Catch-Up TV.",
    "publisher": {
      "@type": "Organization",
      "name": "Shiva Technology Ltd",
      "telephone": "07979637777"
    }
  };

  return (
    <>
      <JsonLd data={jsonLdData} />

      {/* Breadcrumb Strip */}
      <div className="border-b border-gray-200 bg-gray-50 py-2.5 px-4 text-xs text-gray-500">
        <div className="container mx-auto max-w-7xl flex items-center gap-2">
          <Link href="/" className="hover:text-gray-900 transition-colors">Home</Link>
          <span>/</span>
          <span className="text-gray-900 font-semibold">Buy Now (Catalogue)</span>
        </div>
      </div>

      {/* Trust & Dispatch Strip */}
      <div className="bg-white border-b border-gray-200 py-4">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs text-gray-700">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-[#dd0e1c] shrink-0" />
            <span><strong>Instant Activation</strong> within 2 mins</span>
          </div>
          <div className="flex items-center gap-2">
            <Truck className="w-4 h-4 text-[#2c3640] shrink-0" />
            <span><strong>Fast UK Tracked</strong> Courier Delivery</span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#50ad55] shrink-0" />
            <span><strong>100% PayPal</strong> Buyer Protection</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4 text-[#fdc22d] shrink-0" />
            <span>UK Helpline: <strong>07979637777</strong></span>
          </div>
        </div>
      </div>

      {/* Main Product Grid */}
      <PricingSection onSelectPlan={openPlan} />

      {/* Existing Customer Renewal Helper */}
      <div className="container mx-auto max-w-5xl px-4 sm:px-6 py-10">
        <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-700 bg-amber-50 px-2.5 py-1 rounded border border-amber-200">
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Returning ChitramTV Subscriber?</span>
            </div>
            <h3 className="text-lg font-bold text-gray-900">
              ChitramTV Renewal (12 + 2 Free Months) — £89.99
            </h3>
            <p className="text-xs text-gray-600 max-w-xl">
              Keep your existing Account Number, Box MAC address, and favorite channel lists without changing equipment or losing service. Instant line extension.
            </p>
          </div>

          <button
            onClick={() => {
              const renewalPlan = PRICING_PLANS.find((p) => p.isRenewal) || PRICING_PLANS[3];
              openPlan(renewalPlan);
            }}
            className="bg-[#dd0e1c] hover:bg-[#b00b16] text-white px-6 py-3 rounded font-bold uppercase text-xs shrink-0 shadow transition-colors"
          >
            Renew Existing Line
          </button>
        </div>
      </div>
    </>
  );
}
