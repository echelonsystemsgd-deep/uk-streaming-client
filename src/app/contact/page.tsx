"use client";

import React, { useState } from "react";
import Link from "next/link";
import { JsonLd } from "@/components/seo/JsonLd";
import { Phone, MessageSquare, Mail, Clock, MapPin, Send, CheckCircle2, ShieldCheck, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

const COVERAGE_REGIONS = [
  "United Kingdom", "Netherlands", "Germany", "France", "Belgium",
  "Spain", "Italy", "Austria", "Switzerland", "Sweden", "Norway", "Denmark", "Ireland"
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    device: "ChitramTV Black Edition C1 Box",
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
    "name": "ChitramTV UK Customer Support Desk - Shiva Technology Ltd",
    "image": "/Logo.png",
    "telephone": "07979637777",
    "email": "support@chitramtv.uk",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "GB"
    },
    "openingHours": "Mo-Su 00:00-24:00",
    "url": "https://chitramtv.uk/contact",
    "contactPoint": [
      {
        "@type": "ContactPoint",
        "telephone": "07979637777",
        "contactType": "customer service",
        "availableLanguage": ["English", "Hindi", "Punjabi"]
      },
      {
        "@type": "ContactPoint",
        "url": "https://wa.me/447979637777",
        "contactType": "technical support",
        "availableLanguage": ["English", "Hindi", "Punjabi"]
      }
    ]
  };

  return (
    <>
      <JsonLd data={jsonLdData} />

      {/* Breadcrumb Strip */}
      <div className="border-b border-gray-200 bg-gray-50 py-2.5 px-4 text-xs text-gray-500">
        <div className="container mx-auto max-w-7xl flex items-center gap-2">
          <Link href="/" className="hover:text-gray-900 transition-colors">Home</Link>
          <span>/</span>
          <span className="text-gray-900 font-semibold">Support &amp; Contact Desk</span>
        </div>
      </div>

      {/* Hero Header */}
      <section className="relative overflow-hidden pt-8 pb-12 sm:pt-14 sm:pb-16 bg-[#f4f6f8] border-b border-gray-200">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-red-200 bg-red-50 px-3.5 py-1 text-xs font-semibold text-[#dd0e1c] mb-4">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>SUPPORT DESK ONLINE • OPEN 24 HOURS</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#2c3640] tracking-tight leading-tight">
            We Are Here <span className="text-[#dd0e1c]">24 Hours a Day</span>
          </h1>
          <p className="mt-4 text-sm sm:text-base text-gray-600 leading-relaxed">
            Need ChitramTV Black Edition C1 Box setup assistance, Firestick quick codes, renewal verification, channel inquiries, or activation status? Connect directly with ChitramTV on WhatsApp or telephone.
          </p>
        </div>
      </section>

      {/* 3 Contact Method Cards */}
      <section className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 -mt-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* WhatsApp Card */}
          <div className="rounded-xl border border-gray-200 bg-white p-6 flex flex-col justify-between shadow-sm">
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="h-10 w-10 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600">
                  <MessageSquare className="h-5 w-5" />
                </div>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">
                  Fastest Response (&lt;5 min)
                </span>
              </div>
              <h3 className="text-base font-bold text-[#2c3640]">Direct WhatsApp Help Desk</h3>
              <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                Connect directly with a dedicated technician. Ideal for quick Downloader codes, MAC address activations, and renewed playlists.
              </p>
            </div>
            <div className="pt-4 border-t border-gray-100 mt-4">
              <a
                href="https://wa.me/447979637777"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs h-11 px-4 rounded-lg transition-colors select-none shadow-sm"
              >
                <MessageSquare className="h-4 w-4" />
                <span>Start WhatsApp Chat (07979637777)</span>
              </a>
            </div>
          </div>

          {/* Phone Card */}
          <div className="rounded-xl border border-gray-200 bg-white p-6 flex flex-col justify-between shadow-sm">
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="h-10 w-10 rounded-lg bg-red-50 border border-red-200 flex items-center justify-center text-[#dd0e1c]">
                  <Phone className="h-5 w-5" />
                </div>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">
                  Available 24/7
                </span>
              </div>
              <h3 className="text-base font-bold text-[#2c3640]">UK Telephone Helpline</h3>
              <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                Speak directly with an advisor at Shiva Technology Ltd. We speak English, Hindi, and Punjabi to assist parents and family streaming setups.
              </p>
            </div>
            <div className="pt-4 border-t border-gray-100 mt-4">
              <a
                href="tel:07979637777"
                className="w-full inline-flex items-center justify-center gap-2 bg-white border border-gray-300 hover:bg-gray-50 text-gray-800 font-bold text-xs h-11 px-4 rounded-lg transition-colors select-none shadow-sm"
              >
                <Phone className="h-4 w-4 text-[#dd0e1c]" />
                <span>Call Helpline: 07979637777</span>
              </a>
            </div>
          </div>

          {/* Email / Dispatch Card */}
          <div className="rounded-xl border border-gray-200 bg-white p-6 flex flex-col justify-between shadow-sm">
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="h-10 w-10 rounded-lg bg-gray-100 border border-gray-200 flex items-center justify-center text-gray-700">
                  <Mail className="h-5 w-5" />
                </div>
                <span className="text-[10px] font-bold text-gray-700 bg-gray-100 border border-gray-200 px-2 py-0.5 rounded">
                  Official Email
                </span>
              </div>
              <h3 className="text-base font-bold text-[#2c3640]">Email &amp; Invoicing</h3>
              <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                Contact ChitramTV for billing questions, invoice copies, and hardware shipping details.
              </p>
            </div>
            <div className="pt-4 border-t border-gray-100 mt-4">
              <a
                href="mailto:support@chitramtv.eu"
                className="w-full inline-flex items-center justify-center gap-2 bg-white border border-gray-300 hover:bg-gray-50 text-gray-800 font-bold text-xs h-11 px-4 rounded-lg transition-colors select-none shadow-sm"
              >
                <Mail className="h-4 w-4 text-[#dd0e1c]" />
                <span>support@chitramtv.eu</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Inquiry Form & Operating Details */}
      <section className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Form (7 cols) */}
          <div className="lg:col-span-7 rounded-2xl border border-gray-200 bg-white p-6 sm:p-10 shadow-sm">
            <h2 className="text-xl sm:text-2xl font-bold text-[#2c3640] tracking-tight mb-2">
              Send a Message to ChitramTV
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 mb-6">
              Fill out the form below. For immediate setup during live sports matches, WhatsApp is recommended.
            </p>

            {isSubmitted ? (
              <div className="p-6 rounded-xl border border-emerald-200 bg-emerald-50 text-center space-y-3">
                <CheckCircle2 className="h-10 w-10 text-emerald-600 mx-auto" />
                <h3 className="text-lg font-bold text-[#2c3640]">Thank You, {formData.name || "Customer"}!</h3>
                <p className="text-xs sm:text-sm text-gray-600">
                  Your inquiry has been received by our desk. We will respond to your WhatsApp/email within 15 minutes.
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsSubmitted(false)}
                  className="mt-2 text-xs bg-white border-gray-300 text-gray-800 hover:bg-gray-50"
                >
                  Send another inquiry
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">Your Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Raj Patel"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-base sm:text-sm text-gray-900 placeholder:text-gray-400 focus:border-[#dd0e1c] focus:outline-none focus:ring-1 focus:ring-[#dd0e1c] min-h-[46px] shadow-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">Email Address</label>
                    <input
                      type="email"
                      required
                      placeholder="name@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-base sm:text-sm text-gray-900 placeholder:text-gray-400 focus:border-[#dd0e1c] focus:outline-none focus:ring-1 focus:ring-[#dd0e1c] min-h-[46px] shadow-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">WhatsApp / Phone Number</label>
                    <input
                      type="tel"
                      placeholder="e.g. 07979637777 or +44 7979 637777"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-base sm:text-sm text-gray-900 placeholder:text-gray-400 focus:border-[#dd0e1c] focus:outline-none focus:ring-1 focus:ring-[#dd0e1c] min-h-[46px] shadow-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">Streaming Device</label>
                    <select
                      value={formData.device}
                      onChange={(e) => setFormData({ ...formData, device: e.target.value })}
                      className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-base sm:text-sm text-gray-900 focus:border-[#dd0e1c] focus:outline-none focus:ring-1 focus:ring-[#dd0e1c] min-h-[46px] shadow-sm"
                    >
                      <option>ChitramTV Black Edition C1 Box</option>
                      <option>Amazon Firestick 4K</option>
                      <option>Android TV / Google TV</option>
                      <option>Samsung Smart TV (Tizen)</option>
                      <option>LG Smart TV (webOS)</option>
                      <option>Apple TV 4K</option>
                      <option>Phone / Tablet (iOS/Android)</option>
                      <option>PC / Mac Web Player</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">How Can We Help You?</label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Ask about subscription passes, account renewal, Black Edition C1 box delivery, or setup codes..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full rounded-lg border border-gray-300 bg-white p-4 text-base sm:text-sm text-gray-900 placeholder:text-gray-400 focus:border-[#dd0e1c] focus:outline-none focus:ring-1 focus:ring-[#dd0e1c] resize-none shadow-sm"
                  />
                </div>

                <Button
                  type="submit"
                  variant="default"
                  size="lg"
                  className="w-full font-bold h-12 flex items-center justify-center gap-2 bg-[#dd0e1c] hover:bg-[#b00b16] text-white shadow-sm"
                >
                  <Send className="h-4 w-4" />
                  <span>Submit Message to Desk</span>
                </Button>
              </form>
            )}
          </div>

          {/* Right Details & Operating Hours (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-8 space-y-4 shadow-sm">
              <h3 className="text-base font-bold text-[#2c3640] flex items-center gap-2">
                <Clock className="h-4 w-4 text-[#dd0e1c]" />
                <span>Operating Schedule</span>
              </h3>
              <div className="space-y-2 text-xs divide-y divide-gray-100 text-gray-700">
                <div className="pt-2 flex items-center justify-between">
                  <span>Customer Support Desk</span>
                  <span className="font-semibold text-emerald-700">Open 24 Hours</span>
                </div>
                <div className="pt-2 flex items-center justify-between">
                  <span>WhatsApp Live Response</span>
                  <span className="font-semibold text-gray-900">&lt;5 Minutes</span>
                </div>
                <div className="pt-2 flex items-center justify-between">
                  <span>Weekend &amp; Holiday Coverage</span>
                  <span className="font-semibold text-gray-900">Fully Active</span>
                </div>
                <div className="pt-2 flex items-center justify-between text-emerald-700">
                  <span>Automated Credential Dispatch</span>
                  <span className="font-bold">24/7 Instant (60–120s)</span>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-8 space-y-3 shadow-sm">
              <h3 className="text-base font-bold text-[#2c3640] flex items-center gap-2">
                <MapPin className="h-4 w-4 text-[#dd0e1c]" />
                <span>Business Operations</span>
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Operating Entity: <strong className="text-gray-900">Shiva Technology Ltd (t/a ChitramTV UK)</strong><br />
                Telephone: <strong className="text-gray-900">07979637777</strong><br />
                Email: <strong className="text-gray-900">support@chitramtv.eu</strong>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* European & UK Regional Strip */}
      <section className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-14 sm:pb-20">
        <div className="text-center max-w-2xl mx-auto mb-6">
          <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500">
            European &amp; UK Broadcast Coverage
          </h3>
          <p className="text-xs text-gray-500 mt-1">
            Optimized high-speed streaming delivery for Indian diaspora households across Europe:
          </p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-2">
          {COVERAGE_REGIONS.map((region) => (
            <span
              key={region}
              className="text-xs px-3.5 py-1.5 rounded-full bg-white border border-gray-200 text-gray-700 font-medium shadow-sm"
            >
              {region}
            </span>
          ))}
        </div>
      </section>
    </>
  );
}
