"use client";

import React, { useState } from "react";
import Link from "next/link";
import { SiteShell } from "@/components/layout/SiteShell";
import { JsonLd } from "@/components/seo/JsonLd";
import { Phone, MessageSquare, Mail, Clock, MapPin, Send, CheckCircle2, ShieldCheck, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

const UK_COVERAGE_CITIES = [
  "London", "Birmingham", "Leicester", "Manchester", "Bradford",
  "Leeds", "Slough", "Luton", "Wolverhampton", "Coventry",
  "Glasgow", "Edinburgh", "Cardiff", "Reading", "Hounslow", "Southall", "Wembley", "Ilford"
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    device: "Amazon Firestick 4K",
    subject: "New Subscription Inquiry",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const jsonLdData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "ChitramTV UK Customer Support Desk",
    "image": "https://chitramtv.eu/assets/client/logo.svg",
    "telephone": "+442079460912",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "London",
      "addressCountry": "GB"
    },
    "openingHours": "Mo-Su 08:00-23:00",
    "url": "https://chitramtv.eu/contact",
    "contactPoint": [
      {
        "@type": "ContactPoint",
        "telephone": "+442079460912",
        "contactType": "customer service",
        "availableLanguage": ["English", "Hindi", "Punjabi"],
        "hoursAvailable": {
          "@type": "OpeningHoursSpecification",
          "opens": "08:00",
          "closes": "23:00"
        }
      },
      {
        "@type": "ContactPoint",
        "url": "https://wa.me/442079460912",
        "contactType": "technical support",
        "availableLanguage": ["English", "Hindi", "Punjabi"]
      }
    ]
  };

  return (
    <SiteShell>
      <JsonLd data={jsonLdData} />

      {/* Breadcrumb Strip */}
      <div className="border-b border-border/60 bg-zinc-950/60 py-2.5 px-4 text-xs text-zinc-400">
        <div className="container mx-auto max-w-7xl flex items-center gap-2">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <span>/</span>
          <span className="text-white font-medium">UK Support &amp; Contact Desk</span>
        </div>
      </div>

      {/* Hero Header */}
      <section className="relative overflow-hidden pt-8 pb-12 sm:pt-14 sm:pb-16 bg-gradient-to-b from-zinc-900/40 to-background border-b border-border/60">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background-elevated px-3.5 py-1 text-xs font-semibold text-primary mb-4">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>SUPPORT DESK ONLINE • LONDON TIMEZONE (GMT)</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            We Are Here <span className="text-primary">7 Days a Week</span>
          </h1>
          <p className="mt-4 text-sm sm:text-base text-zinc-400 leading-relaxed">
            Need Firestick setup assistance, channel inquiries, or activation status? Connect directly with our UK streaming advisors on WhatsApp or telephone.
          </p>
        </div>
      </section>

      {/* 3 Contact Method Cards */}
      <section className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 -mt-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* WhatsApp Card */}
          <div className="rounded-xl border border-zinc-800 bg-card p-6 flex flex-col justify-between shadow-card">
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="h-10 w-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                  <MessageSquare className="h-5 w-5" />
                </div>
                <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded">
                  Fastest Response (&lt;5 min)
                </span>
              </div>
              <h3 className="text-base font-bold text-white">Direct WhatsApp Help Desk</h3>
              <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                Connect directly with a dedicated UK technician. Perfect for quick Firestick codes, MAC address activations, and renewed playlists.
              </p>
            </div>
            <div className="pt-4 border-t border-zinc-800 mt-4">
              <a
                href="https://wa.me/442079460912"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs h-11 px-4 rounded-lg transition-colors select-none"
              >
                <MessageSquare className="h-4 w-4" />
                <span>Start WhatsApp Chat</span>
              </a>
            </div>
          </div>

          {/* Phone Card */}
          <div className="rounded-xl border border-zinc-800 bg-card p-6 flex flex-col justify-between shadow-card">
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="h-10 w-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                  <Phone className="h-5 w-5" />
                </div>
                <span className="text-[10px] font-bold text-zinc-400 bg-zinc-800 border border-zinc-700 px-2 py-0.5 rounded">
                  8:00 AM – 11:00 PM GMT
                </span>
              </div>
              <h3 className="text-base font-bold text-white">UK Telephone Helpline</h3>
              <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                Speak directly with an advisor in London. We speak English, Hindi, and Punjabi to assist elderly parents and family setups.
              </p>
            </div>
            <div className="pt-4 border-t border-zinc-800 mt-4">
              <a
                href="tel:+442079460912"
                className="w-full inline-flex items-center justify-center gap-2 bg-card border border-zinc-700 hover:text-white text-zinc-200 font-bold text-xs h-11 px-4 rounded-lg transition-colors select-none"
              >
                <Phone className="h-4 w-4 text-primary" />
                <span>Call 020 7946 0912</span>
              </a>
            </div>
          </div>

          {/* Dispatch Notice Card */}
          <div className="rounded-xl border border-zinc-800 bg-card p-6 flex flex-col justify-between shadow-card">
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="h-10 w-10 rounded-lg bg-zinc-800 flex items-center justify-center text-primary">
                  <Zap className="h-5 w-5" />
                </div>
                <span className="text-[10px] font-bold text-zinc-400 bg-zinc-800 border border-zinc-700 px-2 py-0.5 rounded">
                  Automated 24/7
                </span>
              </div>
              <h3 className="text-base font-bold text-white">Instant Credential Dispatch</h3>
              <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                Just subscribed? Your username, password, Downloader code, and M3U playlist are dispatched automatically in 60 to 120 seconds.
              </p>
            </div>
            <div className="pt-4 border-t border-zinc-800 mt-4 text-xs text-zinc-400 flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
              <span>Delivered to both WhatsApp &amp; Email</span>
            </div>
          </div>
        </div>
      </section>

      {/* Inquiry Form & Office Details */}
      <section className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Form (7 cols) */}
          <div className="lg:col-span-7 rounded-2xl border border-zinc-800 bg-card p-6 sm:p-10 shadow-card">
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight mb-2">
              Send a Message to Our UK Desk
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 mb-6">
              Fill out the form below. For urgent setup assistance during live matches, WhatsApp is recommended.
            </p>

            {isSubmitted ? (
              <div className="p-6 rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-center space-y-3">
                <CheckCircle2 className="h-10 w-10 text-emerald-400 mx-auto" />
                <h3 className="text-lg font-bold text-white">Thank You, {formData.name || "Customer"}!</h3>
                <p className="text-xs sm:text-sm text-zinc-300">
                  Your inquiry has been received by our London support desk. We will respond to your WhatsApp/email within 15 minutes.
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsSubmitted(false)}
                  className="mt-2 text-xs"
                >
                  Send another inquiry
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 mb-1.5">Your Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Raj Patel"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-base sm:text-sm text-white placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary min-h-[46px]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 mb-1.5">Email Address</label>
                    <input
                      type="email"
                      required
                      placeholder="name@example.co.uk"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-base sm:text-sm text-white placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary min-h-[46px]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 mb-1.5">WhatsApp / Mobile Number (Optional)</label>
                    <input
                      type="tel"
                      placeholder="e.g. 07123 456789"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-base sm:text-sm text-white placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary min-h-[46px]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 mb-1.5">Primary Streaming Device</label>
                    <select
                      value={formData.device}
                      onChange={(e) => setFormData({ ...formData, device: e.target.value })}
                      className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-base sm:text-sm text-white focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary min-h-[46px]"
                    >
                      <option>Amazon Firestick 4K</option>
                      <option>Amazon Firestick Lite / HD</option>
                      <option>Android TV / Google TV</option>
                      <option>Samsung Smart TV (Tizen)</option>
                      <option>LG Smart TV (webOS)</option>
                      <option>Apple TV 4K</option>
                      <option>Phone / Tablet (iOS/Android)</option>
                      <option>Windows PC / Mac</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1.5">How Can We Help You?</label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Ask about channel availability, Virgin Media / BT setup, or subscription activation..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full rounded-lg border border-border bg-background p-4 text-base sm:text-sm text-white placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  variant="default"
                  size="lg"
                  className="w-full font-bold h-12 flex items-center justify-center gap-2"
                >
                  <Send className="h-4 w-4" />
                  <span>Submit Message to UK Desk</span>
                </Button>
              </form>
            )}
          </div>

          {/* Right Details & Operating Hours (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-2xl border border-zinc-800 bg-card p-6 sm:p-8 space-y-4 shadow-card">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Clock className="h-4 w-4 text-primary" />
                <span>UK Support Operating Hours</span>
              </h3>
              <div className="space-y-2 text-xs divide-y divide-zinc-800 text-zinc-300">
                <div className="pt-2 flex items-center justify-between">
                  <span>Monday – Friday</span>
                  <span className="font-semibold text-white">8:00 AM – 11:00 PM GMT</span>
                </div>
                <div className="pt-2 flex items-center justify-between">
                  <span>Saturday &amp; Sunday</span>
                  <span className="font-semibold text-white">8:00 AM – 11:00 PM GMT</span>
                </div>
                <div className="pt-2 flex items-center justify-between">
                  <span>UK Bank Holidays</span>
                  <span className="font-semibold text-white">Active Desk Coverage</span>
                </div>
                <div className="pt-2 flex items-center justify-between text-emerald-400">
                  <span>Automated Credential Dispatch</span>
                  <span className="font-bold">24/7 Instant (60–120s)</span>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-zinc-800 bg-card p-6 sm:p-8 space-y-3 shadow-card">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary" />
                <span>UK Head Office</span>
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                ChitramTV UK Customer Operations<br />
                London, United Kingdom<br />
                Telephone: <strong className="text-white">020 7946 0912</strong>
              </p>
              <p className="text-[11px] text-zinc-500 pt-2 border-t border-zinc-800">
                Payment security infrastructure engineered and maintained by <a href="https://mercianwealth.com" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-white underline">mercianwealth.com</a>.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* UK Towns & Diaspora Hubs Coverage Strip */}
      <section className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-14 sm:pb-20">
        <div className="text-center max-w-2xl mx-auto mb-6">
          <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400">
            Regional UK Diaspora Coverage
          </h3>
          <p className="text-xs text-zinc-500 mt-1">
            Optimized local routing for British Indian communities nationwide:
          </p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-2">
          {UK_COVERAGE_CITIES.map((city) => (
            <span
              key={city}
              className="text-xs px-3 py-1.5 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 font-medium"
            >
              {city}
            </span>
          ))}
        </div>
      </section>
    </SiteShell>
  );
}
