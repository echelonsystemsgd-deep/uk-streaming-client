"use client";

import React from "react";
import Link from "next/link";
import { JsonLd } from "@/components/seo/JsonLd";
import { Download, Tv, Smartphone, Monitor, CheckCircle2, ArrowRight, ShieldCheck, HelpCircle } from "lucide-react";

export default function DownloadPage() {
  const jsonLdData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "ChitramTV UK App Downloads - Android TV, Firestick & Mobile",
    "description": "Download ChitramTV UK APK for Android Smart TV, Amazon Firestick, Android Phone, Tablet and Windows PC / Mac LDPlayer.",
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
          <span className="text-gray-900 font-semibold">App Downloads &amp; Players</span>
        </div>
      </div>

      <div className="container mx-auto max-w-5xl px-4 sm:px-6 py-12 space-y-10">
        {/* Page Title */}
        <div className="border-b-2 border-[#dd0e1c] pb-4">
          <span className="text-xs font-bold text-gray-500 uppercase tracking-wider block">
            Official Apps &amp; Player Downloads
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#2c3640] tracking-tight mt-1">
            Download ChitramTV UK Apps
          </h1>
          <p className="text-sm text-gray-600 mt-2">
            Watch on your Android Smart TV, Amazon Firestick, Mobile Phone, Tablet, Windows PC or Mac.
          </p>
        </div>

        {/* 3 Core Download Columns matching chitramtv.eu Download page */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* 1. Android Smart TV */}
          <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-lg bg-red-50 text-[#dd0e1c] flex items-center justify-center">
                <Tv className="w-6 h-6" />
              </div>
              <h2 className="text-lg font-bold text-gray-900">
                Android Smart TV
              </h2>
              <p className="text-xs text-gray-600 leading-relaxed">
                Watch on Sony Bravia, Philips, TCL, Panasonic, Mi TV, and all Google TV &amp; Android TV boxes in Full HD &amp; 4K UHD.
              </p>
              <div className="text-[11px] text-gray-500">
                • Requires Android 5.0 or later
              </div>
            </div>

            <div className="pt-6">
              <a
                href="https://wa.me/447979637777?text=Hi%2C%20please%20send%20me%20the%20latest%20ChitramTV%20Smart%20TV%20APK%20download%20link"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-[#dd0e1c] hover:bg-[#b00b16] text-white py-2.5 px-4 rounded font-bold uppercase text-xs flex items-center justify-center gap-2 transition-colors shadow min-h-[44px]"
              >
                <Download className="w-4 h-4" />
                <span>Get TV APK on WhatsApp</span>
              </a>
            </div>
          </div>

          {/* 2. Android Phone & Tablet */}
          <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                <Smartphone className="w-6 h-6" />
              </div>
              <h2 className="text-lg font-bold text-gray-900">
                Android Mobile &amp; Tablet
              </h2>
              <p className="text-xs text-gray-600 leading-relaxed">
                Watch on your Android smartphone and tablet on the go. Stream live channels and on-demand movies anywhere in the UK.
              </p>
              <div className="text-[11px] text-gray-500">
                • Requires Android 4.4 or later
              </div>
            </div>

            <div className="pt-6">
              <a
                href="https://wa.me/447979637777?text=Hi%2C%20please%20send%20me%20the%20latest%20ChitramTV%20Mobile%20APK%20download%20link"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-[#2c3640] hover:bg-[#3a4754] text-white py-2.5 px-4 rounded font-bold uppercase text-xs flex items-center justify-center gap-2 transition-colors shadow min-h-[44px]"
              >
                <Download className="w-4 h-4" />
                <span>Get Mobile APK on WhatsApp</span>
              </a>
            </div>
          </div>

          {/* 3. PC / Mac Laptop */}
          <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <Monitor className="w-6 h-6" />
              </div>
              <h2 className="text-lg font-bold text-gray-900">
                Windows PC &amp; MacBook
              </h2>
              <p className="text-xs text-gray-600 leading-relaxed">
                Install LD Player or BlueStacks emulator on your PC or Mac, and run the ChitramTV Android APK for full desktop viewing.
              </p>
              <div className="text-[11px] text-gray-500">
                • Windows 10/11 &amp; macOS supported
              </div>
            </div>

            <div className="pt-6">
              <a
                href="https://www.ldplayer.net/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-emerald-600 hover:bg-emerald-500 text-white py-2.5 px-4 rounded font-bold uppercase text-xs flex items-center justify-center gap-2 transition-colors shadow"
              >
                <Download className="w-4 h-4" />
                <span>Download LD Player</span>
              </a>
            </div>
          </div>
        </div>

        {/* Amazon Firestick 5-Step Instructions (Exact Guide from chitramtv.eu) */}
        <div className="bg-white rounded-lg p-8 border border-gray-200 shadow-sm space-y-6">
          <div className="flex items-center gap-2 border-b pb-3">
            <Tv className="w-5 h-5 text-[#dd0e1c]" />
            <h2 className="text-xl font-bold text-gray-900">
              Firestick, Fire TV Stick 4K &amp; Firestick Lite Installation Guide
            </h2>
          </div>

          <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
            Follow these 5 easy steps to install ChitramTV onto your Amazon Fire TV device in under 3 minutes:
          </p>

          <ol className="space-y-3 text-xs sm:text-sm text-gray-700">
            <li className="flex items-start gap-3 bg-gray-50 p-3 rounded border border-gray-200">
              <span className="w-6 h-6 rounded-full bg-[#dd0e1c] text-white flex items-center justify-center text-xs font-bold shrink-0">
                1
              </span>
              <div>
                <strong>Enable &ldquo;Apps from Unknown Sources&rdquo; on Firestick:</strong>
                <p className="text-xs text-gray-500 mt-0.5">
                  Go to <em>Settings &gt; My Fire TV / Device &gt; Developer Options &gt; Install Unknown Apps</em> (or <em>Apps from Unknown Sources</em>) and turn it <strong>ON</strong>.
                </p>
              </div>
            </li>

            <li className="flex items-start gap-3 bg-gray-50 p-3 rounded border border-gray-200">
              <span className="w-6 h-6 rounded-full bg-[#dd0e1c] text-white flex items-center justify-center text-xs font-bold shrink-0">
                2
              </span>
              <div>
                <strong>Install the Downloader App:</strong>
                <p className="text-xs text-gray-500 mt-0.5">
                  From the Firestick Home Screen, go to <em>Find / Search</em> and type <strong>Downloader</strong>. Install the official orange Downloader app from the Amazon App Store.
                </p>
              </div>
            </li>

            <li className="flex items-start gap-3 bg-gray-50 p-3 rounded border border-gray-200">
              <span className="w-6 h-6 rounded-full bg-[#dd0e1c] text-white flex items-center justify-center text-xs font-bold shrink-0">
                3
              </span>
              <div>
                <strong>Enter ChitramTV Download URL / Code:</strong>
                <p className="text-xs text-gray-500 mt-0.5">
                  Launch the Downloader App, allow permissions, and enter the download link provided in your activation message.
                </p>
              </div>
            </li>

            <li className="flex items-start gap-3 bg-gray-50 p-3 rounded border border-gray-200">
              <span className="w-6 h-6 rounded-full bg-[#dd0e1c] text-white flex items-center justify-center text-xs font-bold shrink-0">
                4
              </span>
              <div>
                <strong>Install the Application:</strong>
                <p className="text-xs text-gray-500 mt-0.5">
                  Once downloaded, click <strong>Install</strong>, then click <strong>Done</strong>.
                </p>
              </div>
            </li>

            <li className="flex items-start gap-3 bg-gray-50 p-3 rounded border border-gray-200">
              <span className="w-6 h-6 rounded-full bg-[#dd0e1c] text-white flex items-center justify-center text-xs font-bold shrink-0">
                5
              </span>
              <div>
                <strong>Open CTV App &amp; Log In:</strong>
                <p className="text-xs text-gray-500 mt-0.5">
                  Open the ChitramTV app, enter your <strong>Account ID and Password</strong>, and start enjoying 500+ live channels with 14 Days Catch-Up TV!
                </p>
              </div>
            </li>
          </ol>

          {/* Need help strip */}
          <div className="bg-amber-50 border border-amber-200 p-4 rounded text-xs text-amber-900 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-[#fdc22d] shrink-0" />
              <span>Need help setting up your Firestick? Call or message our UK tech desk directly at <strong>07979637777</strong>.</span>
            </div>
            <a
              href="https://wa.me/447979637777"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded font-bold uppercase text-xs shrink-0"
            >
              WhatsApp Support
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
