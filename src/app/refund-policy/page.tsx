"use client";

import React from "react";
import Link from "next/link";
import { JsonLd } from "@/components/seo/JsonLd";
import { ShieldCheck, CheckCircle2, MessageSquare, Phone, Lock } from "lucide-react";
import { COMPANY_NAME, HELPLINE_PHONE } from "@/data/plans";

export default function RefundPolicyPage() {
  const jsonLdData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "ChitramTV UK 7-Day Refund Policy - Shiva Technology Ltd",
    "description": "Unconditional 7-Day Money-Back Guarantee for ChitramTV UK subscription passes and hardware operated by Shiva Technology Ltd.",
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
          <span className="text-gray-900 font-semibold">Refund Policy &amp; Guarantee</span>
        </div>
      </div>

      <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        {/* Header */}
        <div className="border-b-2 border-[#dd0e1c] pb-4">
          <span className="text-xs font-bold text-gray-500 uppercase tracking-wider block">
            100% Buyer Confidence &bull; {COMPANY_NAME}
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#2c3640] tracking-tight mt-1">
            ChitramTV UK 7-Day Refund Policy
          </h1>
          <p className="text-xs text-gray-500 mt-2">
            Last Updated: 2026 &bull; Unconditional Money-Back Guarantee
          </p>
        </div>

        {/* Content Blocks */}
        <div className="space-y-6 text-xs sm:text-sm text-gray-700 leading-relaxed bg-white p-6 sm:p-8 rounded-lg border border-gray-200 shadow-sm">
          <div className="space-y-3">
            <h2 className="text-base font-bold text-gray-900 flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-emerald-600" />
              <span>1. Our 7-Day Money-Back Guarantee</span>
            </h2>
            <p>
              At ChitramTV UK, we want every British Indian household to stream buffer-free television with absolute confidence. All subscription passes purchased through our service include an unconditional <strong>7-Day Full Money-Back Guarantee</strong>.
            </p>
            <p>
              If our service does not meet your expectations, if you experience streaming difficulties that our 24/7 technical desk cannot resolve, or if you decide ChitramTV is not suitable for your household, you are entitled to a full refund within 7 calendar days of your payment date.
            </p>
          </div>

          <div className="space-y-3 border-t pt-4">
            <h2 className="text-base font-bold text-gray-900 flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-emerald-600" />
              <span>2. How to Request a Refund</span>
            </h2>
            <p>
              Requesting a refund is simple and fast. You do not need to fill out complex forms or wait on hold:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-gray-600">
              <li>
                <strong className="text-gray-900">WhatsApp Desk:</strong> Message our WhatsApp help desk at <a href="https://wa.me/447979637777" className="text-[#dd0e1c] hover:underline font-semibold">{HELPLINE_PHONE}</a> with your registered email and PayPal Transaction ID.
              </li>
              <li>
                <strong className="text-gray-900">Email Request:</strong> Send an email to <a href="mailto:support@chitramtv.uk" className="text-[#dd0e1c] hover:underline font-semibold">support@chitramtv.uk</a> with the subject line &ldquo;Refund Request - [Your Order ID]&rdquo;.
              </li>
              <li>
                <strong className="text-gray-900">Direct Telephone:</strong> Call our UK helpline on <a href={`tel:${HELPLINE_PHONE}`} className="text-[#dd0e1c] hover:underline font-semibold">{HELPLINE_PHONE}</a>.
              </li>
            </ul>
          </div>

          <div className="space-y-3 border-t pt-4">
            <h2 className="text-base font-bold text-gray-900 flex items-center gap-2">
              <Lock className="h-5 w-5 text-[#dd0e1c]" />
              <span>3. Processing Times &amp; Method</span>
            </h2>
            <p>
              All refunds are processed directly back to your original payment method via <strong>PayPal in British Pounds (&pound; GBP)</strong>.
            </p>
            <p>
              Once approved by our support team, PayPal refunds are issued immediately with zero deduction fees. Funds typically reflect in your PayPal balance or linked bank account within 1 to 3 business days.
            </p>
          </div>

          <div className="space-y-3 border-t pt-4">
            <h2 className="text-base font-bold text-gray-900 flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-emerald-600" />
              <span>4. Hardware Returns (ChitramTV Black Edition C1 Box)</span>
            </h2>
            <p>
              If you ordered a physical TV box, you may return the hardware within 14 days of delivery. The item must be returned in its original packaging with all included accessories (remote, power plug, HDMI cable) to our UK operating address handled by <strong>{COMPANY_NAME}</strong>.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
