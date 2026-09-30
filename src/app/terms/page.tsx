"use client";

import React from "react";
import Link from "next/link";
import { SiteShell } from "@/components/layout/SiteShell";
import { JsonLd } from "@/components/seo/JsonLd";
import { FileText, Shield, Tv, CheckCircle2, Lock } from "lucide-react";

export default function TermsPage() {
  const jsonLdData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "ChitramTV UK Terms of Service",
    "description": "Terms of service and subscription agreement for ChitramTV UK streaming clients.",
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
          <span className="text-white font-medium">Terms of Service</span>
        </div>
      </div>

      <section className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-8">
        <div className="text-center space-y-3 pb-8 border-b border-border">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background-elevated px-3.5 py-1 text-xs font-semibold text-primary">
            <FileText className="h-3.5 w-3.5" />
            <span>LEGAL &amp; SERVICE AGREEMENT</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Terms of Service
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400">
            Last Updated: January 2026 • Valid for all UK household subscriptions
          </p>
        </div>

        <div className="space-y-6 text-xs sm:text-sm text-zinc-300 leading-relaxed">
          <div className="rounded-xl border border-zinc-800 bg-card p-6 space-y-3">
            <h2 className="text-base font-bold text-white">1. Service Overview &amp; Permitted Use</h2>
            <p>
              ChitramTV UK provides a digital television and on-demand streaming service tailored for the British Indian community. All passes (1 Month, 6 Months, 12+2 Free Months, and 4K Box Bundles) are intended strictly for private, non-commercial, personal household use. Commercial public broadcast in restaurants, bars, community halls, or hotels is prohibited without express enterprise licensing.
            </p>
          </div>

          <div className="rounded-xl border border-zinc-800 bg-card p-6 space-y-3">
            <h2 className="text-base font-bold text-white">2. Device Limits &amp; Simultaneous Connections</h2>
            <p>
              Each subscription plan specifies an authorized simultaneous device limit:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-zinc-400">
              <li><strong className="text-zinc-200">1 Month Pass:</strong> Maximum 2 simultaneous screens.</li>
              <li><strong className="text-zinc-200">6 Months Pass:</strong> Maximum 3 simultaneous screens.</li>
              <li><strong className="text-zinc-200">12+2 Free Months Pass:</strong> Maximum 4 simultaneous screens.</li>
              <li><strong className="text-zinc-200">4K Box + 12M Bundle:</strong> Maximum 4 simultaneous screens (including the provided 4K Android Box).</li>
            </ul>
            <p className="text-zinc-400 text-xs">
              Simultaneous streams from distinct external public IP addresses that exceed your tier allowance will be flagged automatically to prevent account compromise.
            </p>
          </div>

          <div className="rounded-xl border border-zinc-800 bg-card p-6 space-y-3">
            <h2 className="text-base font-bold text-white">3. Payments, Billing &amp; No Automatic Traps</h2>
            <p>
              All fees are displayed and charged in Euros (€ EUR). We do not lock customers into hidden rolling contracts or unapproved bank direct debits. You retain full control through PayPal, with zero surprise renewals.
            </p>
          </div>

          <div className="rounded-xl border border-zinc-800 bg-card p-6 space-y-3">
            <h2 className="text-base font-bold text-white">4. 7-Day Catch-up TV &amp; Content Availability</h2>
            <p>
              Catch-up TV recordings are hosted on our UK edge relays for up to 168 hours (7 days) after live transmission. We maintain 99.9% network availability across all 350+ channels. Occasional channel line-up adjustments may occur due to satellite feed maintenance or international broadcaster schedule changes.
            </p>
          </div>

          <div className="rounded-xl border border-zinc-800 bg-card p-6 space-y-3">
            <h2 className="text-base font-bold text-white">5. Infrastructure Governance</h2>
            <p>
              Payment encryption, server load balancing, and network infrastructure are audited and engineered by <a href="https://mercianwealth.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-semibold">mercianwealth</a> in compliance with UK computing and electronic communications standards.
            </p>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
