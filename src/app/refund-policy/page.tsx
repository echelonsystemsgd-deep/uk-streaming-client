"use client";

import React from "react";
import Link from "next/link";
import { JsonLd } from "@/components/seo/JsonLd";
import { ShieldCheck, CheckCircle2, MessageSquare, Phone, Lock } from "lucide-react";

export default function RefundPolicyPage() {
  const jsonLdData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "ChitramTV 7-Day Refund Policy",
    "description": "Unconditional 7-Day Money-Back Guarantee for ChitramTV subscription passes and hardware.",
    "publisher": {
      "@type": "Organization",
      "name": "ChitramTV UK",
      "url": "https://chitramtv.eu"
    }
  };

  return (
    <>
      <JsonLd data={jsonLdData} />

      {/* Breadcrumb Strip */}
      <div className="border-b border-border/60 bg-zinc-950/60 py-2.5 px-4 text-xs text-zinc-400">
        <div className="container mx-auto max-w-7xl flex items-center gap-2">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <span>/</span>
          <span className="text-white font-medium">Refund Policy &amp; Guarantee</span>
        </div>
      </div>

      <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-10">
        
        {/* Header */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background-elevated px-3 py-1 text-xs font-semibold text-primary">
            <ShieldCheck className="h-3.5 w-3.5" />
            <span>100% BUYER CONFIDENCE</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            ChitramTV 7-Day Refund Policy
          </h1>
          <p className="text-xs text-zinc-400">
            Last Updated: January 2026
          </p>
        </div>

        {/* Content Blocks */}
        <div className="space-y-8 text-xs sm:text-sm text-zinc-300 leading-relaxed">
          
          <div className="rounded-xl border border-zinc-800 bg-card p-6 space-y-3">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-primary" />
              <span>1. Our 7-Day Money-Back Guarantee</span>
            </h2>
            <p>
              At ChitramTV, we want every customer to enjoy buffer-free Indian entertainment with total confidence. All subscription passes purchased through our service come with an unconditional <strong className="text-white">7-Day Money-Back Guarantee</strong>.
            </p>
            <p>
              If our service does not meet your expectations, if you experience persistent buffering that our technical team cannot resolve, or if you decide ChitramTV is not suitable for your household, you are entitled to a full refund within 7 calendar days of your payment date.
            </p>
          </div>

          <div className="rounded-xl border border-zinc-800 bg-card p-6 space-y-3">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-primary" />
              <span>2. How to Request a Refund</span>
            </h2>
            <p>
              Requesting a refund is simple and fast. You do not need to fill out complex forms or wait on hold:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-zinc-400">
              <li>
                <strong className="text-zinc-200">WhatsApp Desk:</strong> Message our WhatsApp help desk at <a href="https://wa.me/447979637777" className="text-primary hover:underline font-semibold">07979637777</a> with your registered email and PayPal Transaction ID.
              </li>
              <li>
                <strong className="text-zinc-200">Email Request:</strong> Send an email to <a href="mailto:support@chitramtv.eu" className="text-primary hover:underline font-semibold">support@chitramtv.eu</a> with the subject line &ldquo;Refund Request - [Your Order ID]&rdquo;.
              </li>
              <li>
                <strong className="text-zinc-200">Phone:</strong> Call our customer helpline on <a href="tel:07979637777" className="text-primary hover:underline font-semibold">07979637777</a>.
              </li>
            </ul>
          </div>

          <div className="rounded-xl border border-zinc-800 bg-card p-6 space-y-3">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Lock className="h-5 w-5 text-primary" />
              <span>3. Processing Times &amp; Method</span>
            </h2>
            <p>
              All refunds are processed directly back to your original payment method via <strong className="text-white">PayPal in British Pounds (£ GBP)</strong>.
            </p>
            <p>
              Once approved by our support team, PayPal refunds are issued within 2 to 4 hours. Depending on whether you paid with PayPal Balance, debit card, or linked bank account, funds typically reflect in your account within 1 to 3 working days.
            </p>
          </div>

          <div className="rounded-xl border border-zinc-800 bg-card p-6 space-y-3">
            <h2 className="text-base font-bold text-white">4. Hardware Set-Top Box Returns &amp; 1-Year Warranty (ChitramTV Black Edition C1 Box)</h2>
            <p>
              For customers who purchased the <strong className="text-white">ChitramTV Black Edition C1 Box</strong> (standalone or bundled with 1-year service), our terms match the official European hardware standards:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-zinc-400">
              <li>
                <strong className="text-white">1-Year Hardware Replacement Warranty:</strong> All ChitramTV Black Edition C1 media players carry a full 1-year manufacturer replacement warranty from the date of purchase covering manufacturing faults, firmware integrity, and internal hardware components.
              </li>
              <li>
                <strong className="text-white">14-Day Faulty Return Window:</strong> Customers have up to 14 days from delivery to return a device in the event of hardware fault or malfunction.
              </li>
              <li>
                <strong className="text-white">Return Conditions:</strong> Returned units must be sent complete with all original accessories included (ChitramTV Bluetooth remote control, HDMI lead, power supply unit). The unit and packaging must remain in intact condition with barcode and serial number labels clearly preserved.
              </li>
              <li>
                <strong className="text-white">Return Logistics:</strong> Return postage costs for faulty device assessment to our European logistics depot are the responsibility of the customer.
              </li>
            </ul>
          </div>

          <div className="rounded-xl border border-zinc-800 bg-card p-6 space-y-3">
            <h2 className="text-base font-bold text-white">5. Fair Usage &amp; Exclusions</h2>
            <p>
              Refunds will not be granted if:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-zinc-400">
              <li>The refund request is initiated after the 7-day guarantee window has lapsed.</li>
              <li>The account has been flagged for commercial resale or unauthorized credential sharing beyond permitted screen limits.</li>
            </ul>
          </div>
        </div>

        {/* Contact Strip */}
        <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6 sm:p-8 text-center space-y-3">
          <h3 className="text-base font-bold text-white">Questions About Your Billing or Refund?</h3>
          <p className="text-xs text-zinc-400 max-w-md mx-auto">
            Our ChitramTV billing team is available 24 hours to assist with any payment queries.
          </p>
          <div className="pt-2 flex justify-center gap-3">
            <a
              href="https://wa.me/447979637777"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs h-10 px-5 rounded-lg transition-colors"
            >
              <MessageSquare className="h-4 w-4" />
              <span>WhatsApp Billing Help (07979637777)</span>
            </a>
          </div>
        </div>

      </div>
    </>
  );
}
