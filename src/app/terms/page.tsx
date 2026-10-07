"use client";

import React from "react";
import Link from "next/link";
import { JsonLd } from "@/components/seo/JsonLd";
import { FileText, Shield, Tv, CheckCircle2, Lock, Clock, Truck } from "lucide-react";
import { COMPANY_NAME, HELPLINE_PHONE } from "@/data/plans";

export default function TermsPage() {
  const jsonLdData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "ChitramTV UK Terms and Conditions - Shiva Technology Ltd",
    "description": "Terms of service, hardware warranty, and subscription agreement for ChitramTV UK clients operated by Shiva Technology Ltd.",
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
      <div className="bg-[#2c3640] py-2 px-4 text-xs text-gray-300 border-b border-gray-700">
        <div className="container mx-auto max-w-7xl flex items-center gap-2">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <span className="text-gray-500">/</span>
          <span className="text-white font-medium">Terms and Condition</span>
        </div>
      </div>

      <section className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        <div className="border-b-2 border-[#dd0e1c] pb-4">
          <span className="text-xs font-bold text-gray-500 uppercase tracking-wider block">
            Legal &amp; Service Agreement • {COMPANY_NAME}
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#2c3640] tracking-tight mt-1">
            Terms and Condition
          </h1>
          <p className="text-xs text-gray-500 mt-2">
            Last Updated: 2026 • Governed under the laws of England &amp; Wales
          </p>
        </div>

        <div className="space-y-6 text-xs sm:text-sm text-gray-700 leading-relaxed bg-white p-6 sm:p-8 rounded-lg border border-gray-200 shadow-sm">
          <div className="space-y-2">
            <h2 className="text-base font-bold text-gray-900">1. Operating Business Entity</h2>
            <p>
              The business <strong>ChitramTV UK</strong> is operated by <strong>Shiva Technology Ltd</strong>, the authorized distributor in the United Kingdom. All payments, invoicing, and courier dispatches are handled under this business framework. Direct customer helpline: <strong>{HELPLINE_PHONE}</strong>.
            </p>
          </div>

          <div className="space-y-2 border-t pt-4">
            <h2 className="text-base font-bold text-gray-900">2. Service Overview &amp; Permitted Use</h2>
            <p>
              ChitramTV UK provides a digital television and on-demand streaming service delivering 500+ live Indian TV channels and 10,000+ movies. Passes are intended strictly for personal household entertainment. Commercial public broadcast without express written licensing is prohibited.
            </p>
          </div>

          <div className="space-y-2 border-t pt-4">
            <h2 className="text-base font-bold text-gray-900">3. Multi-Room Device Limits</h2>
            <p>
              Each pass specifies an authorized simultaneous screen allowance:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-gray-600">
              <li><strong>1 Month Pass:</strong> Up to 2 simultaneous screens.</li>
              <li><strong>6 Months Pass:</strong> Up to 3 simultaneous screens.</li>
              <li><strong>12+2 Free Months Pass:</strong> Up to 4 simultaneous screens.</li>
              <li><strong>C1 Box + 1 Year Bundle:</strong> Up to 4 simultaneous screens.</li>
            </ul>
          </div>

          <div className="space-y-2 border-t pt-4">
            <h2 className="text-base font-bold text-gray-900">4. Transparent Billing in British Pounds (£ GBP)</h2>
            <p>
              All catalogue prices are displayed and charged in <strong>British Pounds (£ GBP)</strong>. Checkout is securely executed via official <strong>PayPal Orders v2</strong> with full Buyer Protection, Debit/Credit Card support, and PayPal Pay in 3. There are zero hidden rolling contract lock-ins.
            </p>
          </div>

          <div className="space-y-2 border-t pt-4">
            <h2 className="text-base font-bold text-gray-900">5. 14 Days Catch-Up TV &amp; Content Availability</h2>
            <p>
              Catch-up TV recordings are hosted on our dedicated UK edge relays for up to <strong>336 hours (14 full days)</strong> after live transmission. Subscribers can pause, rewind, and fast-forward through missed serials, cricket matches, and news debates with zero commercials.
            </p>
          </div>

          <div className="space-y-2 border-t pt-4">
            <h2 className="text-base font-bold text-gray-900">6. Hardware Warranty &amp; 14-Day Return Window</h2>
            <p>
              All standalone <strong>ChitramTV Black Edition C1 Boxes</strong> and Box Bundles dispatched across the UK by Shiva Technology Ltd include:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-gray-600">
              <li><strong>1-Year Hardware Replacement Warranty:</strong> Free replacement if the TV box experiences hardware failure.</li>
              <li><strong>14-Day Return Window:</strong> Faulty hardware assessment and replacement within 14 calendar days of receipt.</li>
              <li><strong>Tracked UK Courier:</strong> Dispatched with tracking details provided to your email and phone.</li>
            </ul>
          </div>

          <div className="space-y-2 border-t pt-4">
            <h2 className="text-base font-bold text-gray-900">7. Customer Assistance Desk</h2>
            <p>
              For any billing questions, activation troubleshooting, or hardware returns, contact our UK desk directly via phone at <strong>{HELPLINE_PHONE}</strong> or 24/7 on WhatsApp at <strong>07979637777</strong>.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
