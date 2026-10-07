"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { JsonLd } from "@/components/seo/JsonLd";
import { CheckCircle2, Tv, Clock, Film, Phone, MessageSquare, ShieldCheck, ArrowRight } from "lucide-react";

export default function AboutPage() {
  const jsonLdData = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "name": "About ChitramTV UK - Shiva Technology Ltd",
    "description": "ChitramTV UK is operated by Shiva Technology Ltd, authorized reseller of Chitram TV delivering 500+ live channels, 10,000+ movies, and 14 days catch-up TV.",
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
          <span className="text-white font-medium">About Us</span>
        </div>
      </div>

      <div className="container mx-auto max-w-5xl px-4 sm:px-6 py-12 space-y-10">
        {/* Page Title */}
        <div className="border-b-2 border-[#dd0e1c] pb-4">
          <span className="text-xs font-bold text-gray-500 uppercase tracking-wider block">
            Official UK Reseller • Shiva Technology Ltd
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#2c3640] tracking-tight mt-1">
            About ChitramTV UK
          </h1>
        </div>

        {/* Main Content Card matching chitramtv.eu About Us */}
        <div className="bg-white rounded-lg p-6 sm:p-10 border border-gray-200 shadow-sm space-y-6 text-sm text-gray-700 leading-relaxed">
          <div className="inline-block bg-emerald-50 text-emerald-700 px-3 py-1 rounded text-xs font-bold border border-emerald-200">
            ✓ Authorized UK Online Distributor
          </div>

          <h2 className="text-2xl font-bold text-gray-900">
            Welcome to ChitramTV UK
          </h2>

          <p>
            Chitram TV is Europe and the UK’s leading Indian media and entertainment platform, providing unlimited live Indian TV channels and on-demand movies. Across the region, we connect over 150 thousand households to our unlimited Indian TV services through high-performance Chitram TV streaming devices and digital passes.
          </p>

          <p>
            The business <strong>ChitramTV UK</strong> is operated by <strong>Shiva Technology Ltd</strong>, proud to be its authorized reseller in the United Kingdom. We offer more than <strong>500 live Indian TV channels</strong> in genres of Hindi, Punjabi, Marathi, Gujarati, Tamil, Kannada, Malayalam, Telugu, Bengali, Sri Lankan, Sports, Kids, News, and Spiritual categories, alongside a curated library of over <strong>10,000 movies</strong>.
          </p>

          <p>
            The secret to our success is simple: with only one flexible subscription pass, our customers can watch all live Indian TV channels without satellite dishes or complex cable installations.
          </p>

          {/* Key Differentiators Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-8">
            <div className="p-4 bg-gray-50 rounded border border-gray-200 flex items-start gap-3">
              <Clock className="w-6 h-6 text-[#dd0e1c] shrink-0 mt-0.5" />
              <div>
                <h3 className="font-bold text-gray-900 text-sm">14 Days Recording &amp; Catch-Up</h3>
                <p className="text-xs text-gray-600 mt-1">
                  14 days after live broadcasting, you can still watch your missed favourite TV shows and serials with our automatic cloud rewind.
                </p>
              </div>
            </div>

            <div className="p-4 bg-gray-50 rounded border border-gray-200 flex items-start gap-3">
              <Tv className="w-6 h-6 text-[#2c3640] shrink-0 mt-0.5" />
              <div>
                <h3 className="font-bold text-gray-900 text-sm">Multi-Room Viewing</h3>
                <p className="text-xs text-gray-600 mt-1">
                  Stream on up to four devices simultaneously across your living room TV, bedroom Firestick, tablet, and mobile.
                </p>
              </div>
            </div>

            <div className="p-4 bg-gray-50 rounded border border-gray-200 flex items-start gap-3">
              <Film className="w-6 h-6 text-[#fdc22d] shrink-0 mt-0.5" />
              <div>
                <h3 className="font-bold text-gray-900 text-sm">10,000+ Movies on Demand</h3>
                <p className="text-xs text-gray-600 mt-1">
                  Constantly updated blockbuster collection sorted by language and genre, from evergreen classics to the newest releases.
                </p>
              </div>
            </div>

            <div className="p-4 bg-gray-50 rounded border border-gray-200 flex items-start gap-3">
              <ShieldCheck className="w-6 h-6 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <h3 className="font-bold text-gray-900 text-sm">Official C1 4K TV Box</h3>
                <p className="text-xs text-gray-600 mt-1">
                  Powered by Android 14 framework delivering 4K picture quality, HDR10+ visuals, and high-definition sound with UK plug adapter.
                </p>
              </div>
            </div>
          </div>

          <h3 className="text-lg font-bold text-gray-900 pt-2">
            24/7 UK Customer Assistance
          </h3>

          <p>
            We are pleased to inform all our valuable customers that you can reach our UK desk directly for any inquiries, setup assistance, or account renewals. We are available 24 x 7 via phone and WhatsApp:
          </p>

          <div className="p-5 bg-gray-900 text-white rounded-lg flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1 text-center sm:text-left">
              <div className="text-xs text-gray-400">UK Direct Telephone Helpline</div>
              <div className="text-xl font-bold text-[#fdc22d]">07979637777</div>
              <div className="text-xs text-gray-300">Operated by Shiva Technology Ltd</div>
            </div>

            <div className="flex gap-2">
              <a
                href="tel:07979637777"
                className="bg-[#dd0e1c] hover:bg-[#b00b16] text-white px-5 py-2.5 rounded text-xs font-bold uppercase transition-colors"
              >
                Call Support
              </a>
              <a
                href="https://wa.me/447979637777"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-emerald-600 hover:bg-emerald-500 text-white px-5 py-2.5 rounded text-xs font-bold uppercase transition-colors"
              >
                WhatsApp Desk
              </a>
            </div>
          </div>

          <div className="pt-4 text-center">
            <Link
              href="/buy-now"
              className="inline-flex items-center gap-2 bg-[#dd0e1c] hover:bg-[#b00b16] text-white px-8 py-3 rounded font-bold uppercase text-xs shadow-md transition-all hover:scale-105"
            >
              <span>Explore Tariff Plans &amp; Hardware</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
