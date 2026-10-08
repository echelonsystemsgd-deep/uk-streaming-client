"use client";

import React from "react";
import Link from "next/link";
import { JsonLd } from "@/components/seo/JsonLd";
import { Lock, EyeOff, Server, ShieldCheck } from "lucide-react";
import { COMPANY_NAME, HELPLINE_PHONE } from "@/data/plans";

export default function PrivacyPage() {
  const jsonLdData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "ChitramTV UK Privacy Policy - Shiva Technology Ltd",
    "description": "UK GDPR compliance and privacy policy for ChitramTV UK operated by Shiva Technology Ltd.",
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
          <span className="text-gray-900 font-semibold">Privacy Policy</span>
        </div>
      </div>

      <section className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        <div className="border-b-2 border-[#dd0e1c] pb-4">
          <span className="text-xs font-bold text-gray-500 uppercase tracking-wider block">
            UK GDPR Standards • {COMPANY_NAME}
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#2c3640] tracking-tight mt-1">
            ChitramTV UK Privacy Policy
          </h1>
          <p className="text-xs text-gray-500 mt-2">
            Last Updated: 2026 • We respect and protect customer confidentiality
          </p>
        </div>

        <div className="space-y-6 text-xs sm:text-sm text-gray-700 leading-relaxed bg-white p-6 sm:p-8 rounded-lg border border-gray-200 shadow-sm">
          <div className="space-y-3">
            <h2 className="text-base font-bold text-gray-900 flex items-center gap-2">
              <EyeOff className="h-5 w-5 text-[#dd0e1c]" />
              <span>1. Zero-Log Streaming Privacy</span>
            </h2>
            <p>
              We believe what you watch in the privacy of your home is your business. ChitramTV UK maintains a strict <strong>Zero-Log Policy</strong> regarding your viewing history. We do not track, catalog, monetize, or sell the individual channels, shows, or cricket matches you watch.
            </p>
          </div>

          <div className="space-y-3 border-t pt-4">
            <h2 className="text-base font-bold text-gray-900 flex items-center gap-2">
              <Lock className="h-5 w-5 text-[#dd0e1c]" />
              <span>2. Financial &amp; Payment Data Security</span>
            </h2>
            <p>
              All payments are processed off-site via <strong>PayPal Hosted Orders v2</strong>. ChitramTV UK servers never receive, store, or process your credit card numbers, CVVs, or bank login details. Your financial credentials remain completely protected within PayPal&apos;s encrypted vault with 100% Buyer Protection.
            </p>
          </div>

          <div className="space-y-3 border-t pt-4">
            <h2 className="text-base font-bold text-gray-900 flex items-center gap-2">
              <Server className="h-5 w-5 text-[#dd0e1c]" />
              <span>3. Information We Collect for Activation</span>
            </h2>
            <p>
              To dispatch your credentials and provide technical assistance, we store only essential operational data:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-gray-600">
              <li><strong>Email Address:</strong> Used solely to transmit your account credentials, invoice, and renewal notices.</li>
              <li><strong>WhatsApp / Phone Number:</strong> Used to deliver instant activation credentials and provide real-time UK tech support.</li>
              <li><strong>Delivery Address:</strong> Required only for customers ordering the physical ChitramTV Black Edition C1 Box for tracked courier dispatch.</li>
            </ul>
          </div>

          <div className="space-y-3 border-t pt-4">
            <h2 className="text-base font-bold text-gray-900">4. No Third-Party Marketing or Spam</h2>
            <p>
              We never sell, rent, or trade your contact information to external marketers or third parties. You will only ever receive communications directly pertaining to your ChitramTV UK subscription or service updates. Direct customer desk helpline: <strong>{HELPLINE_PHONE}</strong>.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
