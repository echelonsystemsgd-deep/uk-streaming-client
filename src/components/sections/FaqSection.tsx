"use client";

import React from "react";
import { FAQ_ITEMS } from "@/data/faqs";
import { Accordion } from "@/components/ui/accordion";
import { HelpCircle, MessageSquare } from "lucide-react";

export function FaqSection() {
  return (
    <section id="faq" className="py-20 bg-background-elevated/40 border-b border-border/60">
      <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-primary flex items-center justify-center gap-1.5">
            <HelpCircle className="h-3.5 w-3.5" />
            FREQUENTLY ASKED QUESTIONS
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Got Questions? We’ve Got Answers
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            Everything you need to know about our UK streaming subscriptions, devices, 7-day catch-up, and PayPal checkout.
          </p>
        </div>

        {/* Interactive Accordion */}
        <Accordion items={FAQ_ITEMS} />

        {/* Support Callout below FAQ */}
        <div className="mt-12 rounded-lg border border-border bg-card p-6 text-center shadow-card">
          <h4 className="text-base font-bold text-white mb-1">
            Still have a question before subscribing?
          </h4>
          <p className="text-xs text-muted-foreground mb-4">
            Our UK support specialists are on standby via WhatsApp to test your broadband speed or guide you through setup.
          </p>
          <a
            href="https://wa.me/442079460912"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-md bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs px-5 py-2.5 transition-colors"
          >
            <MessageSquare className="h-4 w-4" />
            <span>Chat With UK Support on WhatsApp</span>
          </a>
        </div>

      </div>
    </section>
  );
}
