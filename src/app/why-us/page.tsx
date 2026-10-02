"use client";

import React from "react";
import Link from "next/link";
import { useSiteShell } from "@/components/layout/SiteShell";
import { JsonLd } from "@/components/seo/JsonLd";
import { ShieldCheck, Clock, Zap, Tv, Heart, Globe, Award, MapPin, ChevronRight, Lock, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";

const DIASPORA_CITIES = [
  { city: "Greater London", areas: "Southall, Wembley, Harrow, Hounslow, Ilford, East Ham", desc: "Low-latency streaming from our London Docklands data relay." },
  { city: "West Midlands", areas: "Birmingham (Handsworth, Smethwick), Wolverhampton, Coventry", desc: "Optimized for high-concurrency Sunday cricket broadcasts." },
  { city: "East Midlands", areas: "Leicester (Belgrave, Golden Mile), Nottingham, Derby", desc: "Top demand for Gujarati & Hindi daily primetime catch-up." },
  { city: "North West", areas: "Manchester, Bolton, Preston, Blackburn, Oldham", desc: "Direct peering with Virgin Media & BT broadband backbones." },
  { city: "Yorkshire", areas: "Bradford, Leeds, Sheffield, Huddersfield", desc: "Popular for live Punjabi entertainment & news feeds." },
  { city: "Home Counties", areas: "Slough, Luton, Reading, Gravesend, Milton Keynes", desc: "Fast automated WhatsApp dispatch for busy commuter households." },
];

export default function WhyUsPage() {
  const { quickSubscribe } = useSiteShell();

  const jsonLdData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "ChitramTV UK",
    "url": "https://chitramtv.eu",
    "logo": "https://chitramtv.eu/assets/client/logo.svg",
    "description": "Dedicated UK Indian television streaming provider with 350+ live channels and 7-day catch-up TV.",
    "telephone": "+31620897414",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+31620897414",
      "contactType": "customer service",
      "availableLanguage": ["English", "Hindi", "Punjabi"]
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
          <span className="text-white font-medium">Why ChitramTV UK</span>
        </div>
      </div>

      {/* Hero Header */}
      <section className="relative overflow-hidden pt-8 pb-12 sm:pt-14 sm:pb-16 bg-gradient-to-b from-zinc-900/40 to-background border-b border-border/60">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background-elevated px-3.5 py-1 text-xs font-semibold text-primary mb-4">
            <Award className="h-3.5 w-3.5" />
            <span>UK #1 DEDICATED INDIAN STREAMING SERVICE</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Built Specifically for <span className="text-primary">British Indian Families</span>
          </h1>
          <p className="mt-4 text-sm sm:text-base text-zinc-400 leading-relaxed">
            Generic international streaming apps fail in the UK because they ignore the 5.5-hour time difference and suffer from buffer throttling. Here is why ChitramTV is the trusted choice for thousands of UK homes.
          </p>
        </div>
      </section>

      {/* The 5.5-Hour Time Difference Story */}
      <section className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
        <div className="rounded-2xl border border-zinc-800 bg-card p-6 sm:p-10 shadow-card">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <span className="text-xs font-bold uppercase tracking-widest text-primary">
                THE DIASPORA CHALLENGE SOLVED
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Why Live Indian TV Fails in the UK Without 7-Day Catch-Up
              </h2>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                India is 5.5 hours ahead of GMT (and 4.5 hours ahead during British Summer Time). When Indian primetime dramas, news debates, and evening soaps air at 8:00 PM IST in Mumbai or Delhi, it is only <strong>2:30 PM in London or Birmingham</strong> while you are working or the kids are at school.
              </p>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                By the time you sit down at 8:00 PM in the UK, live channels are broadcasting late-night infomercials and reruns. With ChitramTV UK&apos;s <strong>automatic 7-day cloud DVR</strong>, every single channel is recorded continuously. You can rewind, pause, and watch primetime on your own British schedule.
              </p>
            </div>

            <div className="lg:col-span-5 rounded-xl border border-zinc-800 bg-zinc-950 p-6 space-y-4">
              <div className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                UK vs. India Time Comparison
              </div>
              <div className="space-y-3">
                <div className="p-3 rounded-lg bg-zinc-900 border border-zinc-800">
                  <div className="text-xs text-zinc-400">8:00 PM IST (India Primetime)</div>
                  <div className="text-sm font-bold text-red-400">2:30 PM UK Time — Working / School</div>
                </div>
                <div className="p-3 rounded-lg bg-zinc-900 border border-primary/40 bg-primary/5">
                  <div className="text-xs text-primary font-semibold">ChitramTV 7-Day Catch-up</div>
                  <div className="text-sm font-bold text-white">Watch at 8:30 PM UK with Zero Commercials</div>
                </div>
              </div>
              <div className="pt-2 text-xs text-zinc-400 flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                <span>Pause, fast-forward, and rewind with your TV remote</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6 Value Pillars Grid */}
      <section className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-14 sm:pb-20">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            The 6 ChitramTV UK Standards
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 mt-2">
            Engineered with strict zero-compromise criteria for high-resolution streaming across all UK screens.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="rounded-xl border border-zinc-800 bg-card p-6 space-y-3">
            <div className="h-10 w-10 rounded-lg bg-zinc-800 flex items-center justify-center text-primary">
              <Zap className="h-5 w-5" />
            </div>
            <h3 className="text-base font-bold text-white">London Low-Latency Edge Relays</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Streams are served directly from London Docklands CDN infrastructure, guaranteeing fast channel switching and zero buffering even during peak IPL cricket.
            </p>
          </div>

          <div className="rounded-xl border border-zinc-800 bg-card p-6 space-y-3">
            <div className="h-10 w-10 rounded-lg bg-zinc-800 flex items-center justify-center text-primary">
              <Clock className="h-5 w-5" />
            </div>
            <h3 className="text-base font-bold text-white">Automatic 7-Day Cloud DVR</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Every drama, serial, news broadcast, and sports match is saved for a full 168 hours. No external hard drives or expensive TV box recorders required.
            </p>
          </div>

          <div className="rounded-xl border border-zinc-800 bg-card p-6 space-y-3">
            <div className="h-10 w-10 rounded-lg bg-zinc-800 flex items-center justify-center text-primary">
              <Tv className="h-5 w-5" />
            </div>
            <h3 className="text-base font-bold text-white">350+ Live Channels</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Comprehensive coverage across Hindi, Punjabi, Tamil, Telugu, Malayalam, Bengali, Gujarati, and English international sports broadcasts.
            </p>
          </div>

          <div className="rounded-xl border border-zinc-800 bg-card p-6 space-y-3">
            <div className="h-10 w-10 rounded-lg bg-zinc-800 flex items-center justify-center text-primary">
              <Award className="h-5 w-5" />
            </div>
            <h3 className="text-base font-bold text-white">4K UHD 60fps Live Cricket</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Experience the Ashes, ICC World Cups, IPL 2026, and India bilateral tours in pristine 60 frames-per-second Ultra HD on Star Sports 1 4K and Sky Cricket.
            </p>
          </div>

          <div className="rounded-xl border border-zinc-800 bg-card p-6 space-y-3">
            <div className="h-10 w-10 rounded-lg bg-zinc-800 flex items-center justify-center text-primary">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <h3 className="text-base font-bold text-white">100% PayPal Buyer Protection</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              All transactions are processed through PayPal in Euros (€ EUR). No credit card details stored on our servers. 7-day full refund policy.
            </p>
          </div>

          <div className="rounded-xl border border-zinc-800 bg-card p-6 space-y-3">
            <div className="h-10 w-10 rounded-lg bg-zinc-800 flex items-center justify-center text-primary">
              <Heart className="h-5 w-5" />
            </div>
            <h3 className="text-base font-bold text-white">24/7 WhatsApp Help Desk</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Our ChitramTV UK support team speaks English, Hindi, and Punjabi. Direct WhatsApp support for Firestick setup, ChitramTV Black Edition C1 box advice, and renewal assistance.
            </p>
          </div>
        </div>
      </section>

      {/* UK Diaspora Hubs Coverage */}
      <section className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-14 sm:pb-20">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Serving British Indian Communities Across the UK
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 mt-2">
            Thousands of UK households in high-density cultural hubs trust ChitramTV for daily news, Gurbani, and primetime.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {DIASPORA_CITIES.map((c) => (
            <div key={c.city} className="rounded-xl border border-zinc-800 bg-card p-5 space-y-2">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary" />
                <h3 className="text-sm font-bold text-white">{c.city}</h3>
              </div>
              <div className="text-xs text-zinc-300 font-medium">{c.areas}</div>
              <p className="text-xs text-zinc-400 leading-relaxed pt-1 border-t border-zinc-800">
                {c.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Verified UK Diaspora Testimonials */}
      <TestimonialsSection />

      {/* Engineering Credibility by Mercian Wealth */}
      <section className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-14 sm:pb-20">
        <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6 sm:p-10 text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-zinc-700 bg-zinc-900 px-3 py-1 text-xs font-semibold text-zinc-300">
            <Lock className="h-3.5 w-3.5 text-zinc-400" />
            <span>ENTERPRISE-GRADE UK INFRASTRUCTURE</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-white">
            Engineered &amp; Maintained by <a href="https://mercianwealth.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">mercianwealth</a>
          </h3>
          <p className="text-xs sm:text-sm text-zinc-400 max-w-xl mx-auto leading-relaxed">
            Our streaming distribution backbone and payment infrastructure are engineered with high-redundancy failovers, zero-log data privacy, and 256-bit TLS encryption by <a href="https://mercianwealth.com" target="_blank" rel="noopener noreferrer" className="text-white hover:underline font-semibold">mercianwealth</a>.
          </p>
          <div className="pt-2">
            <Button
              variant="default"
              size="lg"
              onClick={quickSubscribe}
              className="font-bold text-xs h-12 px-6"
            >
              Get Started via PayPal (£6.43/mo)
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
