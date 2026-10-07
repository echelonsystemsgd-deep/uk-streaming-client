"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ShoppingBag,
  Zap,
  Eye,
  Check,
  ShieldCheck,
  Tv,
  Star,
  RefreshCw,
  X,
  ArrowRight,
} from "lucide-react";
import { PRICING_PLANS, PricingPlan } from "@/data/plans";
import { useCart } from "@/context/CartContext";

interface PricingSectionProps {
  onSelectPlan: (plan: PricingPlan) => void;
}

export function PricingSection({ onSelectPlan }: PricingSectionProps) {
  const { addToCart } = useCart();
  const [quickviewPlan, setQuickviewPlan] = useState<PricingPlan | null>(null);
  const [selectedDevice, setSelectedDevice] = useState("Amazon Fire TV Stick");
  const [accountIdentifier, setAccountIdentifier] = useState("");
  const [addedToast, setAddedToast] = useState<string | null>(null);

  const handleAddToCart = (plan: PricingPlan, e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(plan, {
      deviceType: selectedDevice,
      accountIdentifier: plan.isRenewal ? accountIdentifier : undefined,
    });
    setAddedToast(plan.name);
    setTimeout(() => setAddedToast(null), 3000);
  };

  return (
    <section id="plans" className="py-12 sm:py-16 bg-[#f4f6f8] border-b border-gray-200">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6">
        {/* Title Bar in Journal 3 Style */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between border-b-2 border-[#dd0e1c] pb-3 mb-8 gap-2">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-gray-500">
              Online Store • Official UK Catalogue
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#2c3640] tracking-tight">
              Flexible Tariff Plans &amp; Hardware
            </h2>
          </div>
          <p className="text-xs text-gray-600 sm:text-right max-w-md">
            All prices in British Pounds (£ GBP). 14 Days Catch-Up TV included. Instant digital dispatch &amp; UK courier delivery.
          </p>
        </div>

        {/* Added to Cart Notification Toast */}
        {addedToast && (
          <div className="fixed top-20 right-4 z-50 bg-[#2c3640] text-white px-5 py-3 rounded shadow-xl border-l-4 border-[#50ad55] flex items-center gap-3 animate-in slide-in-from-top-2">
            <Check className="w-5 h-5 text-[#50ad55]" />
            <div className="text-xs">
              <span className="font-bold">{addedToast}</span> was added to your shopping cart!
            </div>
          </div>
        )}

        {/* 6-Product Grid (Journal 3 Classic E-Commerce Cards) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {PRICING_PLANS.map((plan) => (
            <div
              key={plan.id}
              className="bg-white rounded border border-gray-200 hover:border-gray-300 shadow-sm hover:shadow-md transition-all flex flex-col overflow-hidden group"
            >
              {/* Product Card Top: Badges & Image */}
              <div className="relative aspect-square w-full bg-gray-50 p-6 flex items-center justify-center border-b border-gray-100">
                {/* Badge */}
                {plan.badge && (
                  <div className="absolute top-3 left-3 z-10 bg-[#dd0e1c] text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded shadow-sm">
                    {plan.badge}
                  </div>
                )}
                {plan.originalPrice && (
                  <div className="absolute top-3 right-3 z-10 bg-[#fdc22d] text-gray-900 text-[10px] font-extrabold uppercase px-2 py-0.5 rounded shadow-sm">
                    Sale
                  </div>
                )}

                <div className="relative w-44 h-44 transition-transform duration-300 group-hover:scale-105">
                  <Image
                    src={plan.image}
                    alt={plan.name}
                    fill
                    className="object-contain"
                  />
                </div>

                {/* Quickview Floating Button */}
                <button
                  onClick={() => setQuickviewPlan(plan)}
                  className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-[#2c3640]/90 hover:bg-[#2c3640] text-white text-xs font-semibold px-4 py-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow flex items-center gap-1.5 backdrop-blur-sm"
                >
                  <Eye className="w-3.5 h-3.5 text-[#fdc22d]" />
                  <span>Quickview</span>
                </button>
              </div>

              {/* Product Card Body: Info & Price */}
              <div className="p-5 flex-1 flex flex-col">
                <div className="flex items-center gap-1 mb-2 text-[#fdc22d]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                  <span className="text-[11px] text-gray-400 font-semibold ml-1">
                    (4.9)
                  </span>
                </div>

                <h3 className="text-sm font-bold text-gray-900 hover:text-[#dd0e1c] transition-colors line-clamp-2 leading-snug">
                  {plan.name}
                </h3>

                <p className="text-xs text-gray-500 mt-1 line-clamp-2 leading-relaxed">
                  {plan.description}
                </p>

                {/* Price Display */}
                <div className="mt-4 pt-3 border-t border-gray-100 flex items-baseline gap-2">
                  <span className="text-xl sm:text-2xl font-black text-[#dd0e1c]">
                    £{plan.price.toFixed(2)}
                  </span>
                  {plan.originalPrice && (
                    <span className="text-xs font-medium text-gray-400 line-through">
                      £{plan.originalPrice.toFixed(2)}
                    </span>
                  )}
                  <span className="text-[11px] text-gray-500 font-medium ml-auto">
                    {plan.period}
                  </span>
                </div>

                {/* Key Bullet Highlights */}
                <div className="mt-3 space-y-1 text-[11px] text-gray-600">
                  <div className="flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-[#50ad55] shrink-0" />
                    <span>14 Days Catch-Up TV DVR</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-[#50ad55] shrink-0" />
                    <span>Up to {plan.devices} simultaneous devices</span>
                  </div>
                </div>

                {/* Action Buttons (Journal 3 Two-Action Setup) */}
                <div className="mt-5 pt-3 border-t border-gray-100 grid grid-cols-2 gap-2">
                  <button
                    onClick={(e) => handleAddToCart(plan, e)}
                    className="w-full bg-[#2c3640] hover:bg-[#3a4754] text-white text-xs font-bold uppercase py-2.5 px-3 rounded flex items-center justify-center gap-1.5 transition-colors shadow-sm"
                  >
                    <ShoppingBag className="w-3.5 h-3.5 text-[#fdc22d]" />
                    <span>Add to Cart</span>
                  </button>

                  <button
                    onClick={() => onSelectPlan(plan)}
                    className="w-full bg-[#dd0e1c] hover:bg-[#b00b16] text-white text-xs font-bold uppercase py-2.5 px-3 rounded flex items-center justify-center gap-1.5 transition-colors shadow-sm"
                  >
                    <Zap className="w-3.5 h-3.5" />
                    <span>Buy Now</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quickview Modal */}
      {quickviewPlan && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full overflow-hidden border border-gray-300 animate-in fade-in zoom-in-95">
            {/* Modal Header */}
            <div className="bg-[#2c3640] text-white p-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xs bg-[#dd0e1c] px-2 py-0.5 rounded font-bold uppercase">
                  Product Details
                </span>
                <span className="text-xs text-gray-300">ChitramTV UK</span>
              </div>
              <button
                onClick={() => setQuickviewPlan(null)}
                className="text-gray-300 hover:text-white p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
              <div className="relative aspect-square w-full bg-gray-50 border rounded p-4 flex items-center justify-center">
                <Image
                  src={quickviewPlan.image}
                  alt={quickviewPlan.name}
                  fill
                  className="object-contain"
                />
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-bold text-gray-900 leading-snug">
                  {quickviewPlan.name}
                </h3>

                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-black text-[#dd0e1c]">
                    £{quickviewPlan.price.toFixed(2)}
                  </span>
                  {quickviewPlan.originalPrice && (
                    <span className="text-sm font-medium text-gray-400 line-through">
                      £{quickviewPlan.originalPrice.toFixed(2)}
                    </span>
                  )}
                  <span className="text-xs text-gray-500 font-semibold">
                    ({quickviewPlan.period})
                  </span>
                </div>

                <p className="text-xs text-gray-600 leading-relaxed">
                  {quickviewPlan.description}
                </p>

                {/* Renewal Field if applicable */}
                {quickviewPlan.isRenewal && (
                  <div className="bg-amber-50 border border-amber-200 p-2.5 rounded text-xs space-y-1">
                    <label className="font-bold text-gray-800 block">
                      Account ID or Box MAC Address:
                    </label>
                    <input
                      type="text"
                      value={accountIdentifier}
                      onChange={(e) => setAccountIdentifier(e.target.value)}
                      placeholder="e.g. CTV-88912 or 00:1A:79:..."
                      className="w-full px-2 py-1.5 text-xs bg-white border border-gray-300 rounded"
                    />
                  </div>
                )}

                {/* Feature Bullet Points */}
                <div className="space-y-1.5 text-xs text-gray-700 max-h-40 overflow-y-auto pr-1">
                  {quickviewPlan.features.slice(0, 5).map((f, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-[#50ad55] shrink-0 mt-0.5" />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="pt-2 grid grid-cols-2 gap-2">
                  <button
                    onClick={(e) => {
                      handleAddToCart(quickviewPlan, e);
                      setQuickviewPlan(null);
                    }}
                    className="w-full bg-[#2c3640] hover:bg-[#3a4754] text-white text-xs font-bold uppercase py-2.5 rounded flex items-center justify-center gap-1.5 shadow"
                  >
                    <ShoppingBag className="w-3.5 h-3.5 text-[#fdc22d]" />
                    <span>Add to Cart</span>
                  </button>

                  <button
                    onClick={() => {
                      const p = quickviewPlan;
                      setQuickviewPlan(null);
                      onSelectPlan(p);
                    }}
                    className="w-full bg-[#dd0e1c] hover:bg-[#b00b16] text-white text-xs font-bold uppercase py-2.5 rounded flex items-center justify-center gap-1.5 shadow"
                  >
                    <Zap className="w-3.5 h-3.5" />
                    <span>Buy Now</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
