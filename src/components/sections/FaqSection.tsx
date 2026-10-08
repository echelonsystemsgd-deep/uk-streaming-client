"use client";

import React from "react";
import Link from "next/link";
import { FAQ_ITEMS } from "@/data/faqs";
import { Accordion } from "@/components/ui/accordion";
import { HelpCircle, MessageSquare, ChevronRight } from "lucide-react";

export function FaqSection() {
  return (
    <section id="faq" className="py-16 sm:py-20 bg-background-elevated/40 border-b border-border">
      <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-14 space-y-3 sm:space-y-4">
          <div className="inline-flex items-center justify-center gap-1.5 rounded-full border border-red-200 bg-red-50 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[#dd0e1c]">
            <HelpCircle className="h-4 w-4" />
            <span>FREQUENTLY ASKED QUESTIONS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#2c3640] tracking-tight">
            Got Questions? We’ve Got Answers
          </h2>
          <p className="text-base text-gray-600 leading-relaxed">
            Everything you need to know about our UK streaming subscriptions, devices, 14-day catch-up, and PayPal checkout.
          </p>
        </div>

        {/* Interactive Accordion */}
        <Accordion items={FAQ_ITEMS} />

        {/* Link to dedicated /faq page */}
        <div className="mt-8 text-center">
          <Link
            href="/faq"
            className="inline-flex items-center gap-2 text-xs font-semibold text-gray-700 hover:text-gray-900 bg-white border border-gray-300 hover:border-gray-400 px-5 py-3 rounded-lg shadow-sm transition-colors min-h-[44px]"
          >
            <span>Search All Questions in Our Dedicated Help Center</span>
            <ChevronRight className="h-4 w-4 text-[#dd0e1c]" />
          </Link>
        </div>

        {/* Support Callout below FAQ */}
        <div className="mt-10 rounded-xl border border-gray-200 bg-white p-6 sm:p-8 text-center shadow-sm">
          <h4 className="text-lg font-bold text-[#2c3640] mb-1.5">
            Still have a question before subscribing?
          </h4>
          <p className="text-xs sm:text-sm text-gray-600 mb-4 max-w-md mx-auto">
            Our UK support specialists are on standby via WhatsApp to test your broadband speed or guide you through setup.
          </p>
          <a
            href="https://wa.me/447979637777"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg bg-gray-50 hover:bg-gray-100 border border-gray-300 text-gray-800 font-semibold text-xs px-5 py-3 h-11 transition-colors shadow-sm"
          >
            <MessageSquare className="h-4 w-4 text-emerald-600" />
            <span>Chat on WhatsApp (07979637777)</span>
          </a>
        </div>

      </div>
    </section>
  );
}
