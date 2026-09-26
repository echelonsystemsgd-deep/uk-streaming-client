"use client";

import React from "react";
import Link from "next/link";
import { SiteShell } from "@/components/layout/SiteShell";
import { JsonLd } from "@/components/seo/JsonLd";
import { ShieldCheck, Lock, EyeOff, Server, CheckCircle2 } from "lucide-react";

export default function PrivacyPage() {
  const jsonLdData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "ChitramTV UK Privacy Policy",
    "description": "UK GDPR-compliant privacy statement for ChitramTV UK streaming platform.",
    "publisher": {
      "@type": "Organization",
      "name": "ChitramTV UK",
      "url": "https://chitramtv.eu"
    }
  };

  return (
    <SiteShell>
      <JsonLd data={jsonLdData} />

      {/* Breadcrumb Strip */}
      <div className="border-b border-border/60 bg-zinc-950/60 py-2.5 px-4 text-xs text-zinc-400">
        <div className="container mx-auto max-w-7xl flex items-center gap-2">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <span>/</span>
          <span className="text-white font-medium">Privacy Policy</span>
        </div>
      </div>

      <section className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-8">
        <div className="text-center space-y-3 pb-8 border-b border-border">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background-elevated px-3.5 py-1 text-xs font-semibold text-primary">
            <Lock className="h-3.5 w-3.5" />
            <span>UK GDPR DATA PRIVACY STANDARDS</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            ChitramTV UK Privacy Policy
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400">
            Last Updated: January 2026 • We respect and protect customer confidentiality
          </p>
        </div>

        <div className="space-y-6 text-xs sm:text-sm text-zinc-300 leading-relaxed">
          <div className="rounded-xl border border-zinc-800 bg-card p-6 space-y-3">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <EyeOff className="h-5 w-5 text-primary" />
              <span>1. Zero-Log Streaming Privacy</span>
            </h2>
            <p>
              We believe what you watch in the privacy of your home is your business. ChitramTV UK maintains a strict <strong className="text-white">Zero-Log Policy</strong> regarding your viewing history. We do not track, catalog, monetize, or sell the individual channels, shows, or cricket matches you watch.
            </p>
          </div>

          <div className="rounded-xl border border-zinc-800 bg-card p-6 space-y-3">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Lock className="h-5 w-5 text-primary" />
              <span>2. Financial &amp; Payment Data Security</span>
            </h2>
            <p>
              All payments are processed off-site via <strong className="text-white">PayPal Hosted Smart Checkout</strong>. ChitramTV UK servers never receive, store, or process your credit card numbers, CVVs, or bank login details. Your financial credentials remain completely protected within PayPal&apos;s encrypted vault.
            </p>
          </div>

          <div className="rounded-xl border border-zinc-800 bg-card p-6 space-y-3">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Server className="h-5 w-5 text-primary" />
              <span>3. Information We Collect for Activation</span>
            </h2>
            <p>
              To dispatch your credentials and provide technical assistance, we store only essential operational data:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-zinc-400">
              <li><strong className="text-zinc-200">Email Address:</strong> Used solely to transmit your account credentials, invoice, and renewal notices.</li>
              <li><strong className="text-zinc-200">WhatsApp / Phone Number (Optional):</strong> Used to deliver instant activation credentials and provide real-time tech support.</li>
              <li><strong className="text-zinc-200">Device MAC Address (Optional):</strong> Required only for customers choosing direct Smart TV portal activation.</li>
            </ul>
          </div>

          <div className="rounded-xl border border-zinc-800 bg-card p-6 space-y-3">
            <h2 className="text-base font-bold text-white">4. No Third-Party Marketing or Spam</h2>
            <p>
              We never sell, rent, or trade your contact information to external marketers, insurance companies, or lead brokers. You will only ever receive communications directly pertaining to your ChitramTV subscription.
            </p>
          </div>

          <div className="rounded-xl border border-zinc-800 bg-card p-6 space-y-3">
            <h2 className="text-base font-bold text-white">5. Security Infrastructure Governance</h2>
            <p>
              Our data security architecture, firewall safeguards, and encrypted database pipelines are monitored and maintained by <a href="https://mercianwealth.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-semibold">mercianwealth.com</a>.
            </p>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
