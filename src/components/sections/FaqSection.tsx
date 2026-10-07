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
          <span className="text-xs font-bold uppercase tracking-widest text-primary flex items-center justify-center gap-1.5">
            <HelpCircle className="h-4 w-4" />
            FREQUENTLY ASKED QUESTIONS
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Got Questions? We’ve Got Answers
          </h2>
          <p className="text-base text-zinc-400 leading-relaxed">
            Everything you need to know about our UK streaming subscriptions, devices, 14-day catch-up, and PayPal checkout.
          </p>
        </div>

        {/* Interactive Accordion */}
        <Accordion items={FAQ_ITEMS} />

        {/* Link to dedicated /faq page */}
        <div className="mt-8 text-center">
          <Link
            href="/faq"
            className="inline-flex items-center gap-2 text-xs font-semibold text-zinc-200 hover:text-white bg-zinc-900 border border-zinc-700 hover:border-zinc-600 px-5 py-2.5 rounded-lg transition-colors min-h-[44px]"
          >
            <span>Search All Questions in Our Dedicated Help Center</span>
            <ChevronRight className="h-4 w-4 text-primary" />
          </Link>
        </div>

        {/* Support Callout below FAQ */}
        <div className="mt-10 rounded-xl border border-border bg-card p-6 text-center">
          <h4 className="text-base font-bold text-white mb-1.5">
            Still have a question before subscribing?
          </h4>
          <p className="text-xs text-zinc-400 mb-4 max-w-md mx-auto">
            Our UK support specialists are on standby via WhatsApp to test your broadband speed or guide you through setup.
          </p>
          <a
            href="https://wa.me/447979637777"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-md bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-white font-semibold text-xs px-5 py-2.5 h-10 transition-colors"
          >
            <MessageSquare className="h-4 w-4 text-emerald-400" />
            <span>Chat on WhatsApp (07979637777)</span>
          </a>
        </div>

      </div>
    </section>
  );
}
