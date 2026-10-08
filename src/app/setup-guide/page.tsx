"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useSiteShell } from "@/components/layout/SiteShell";
import { JsonLd } from "@/components/seo/JsonLd";
import { Tv, Smartphone, Monitor, CheckCircle2, ChevronRight, MessageSquare, Phone, Download, Wifi, ShieldAlert, Laptop } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SpeedTestWidget } from "@/components/tools/SpeedTestWidget";

const DEVICES = [
  { id: "firestick", name: "Amazon Firestick", icon: Tv },
  { id: "android", name: "Android & Google TV", icon: Monitor },
  { id: "samsung-lg", name: "Samsung & LG Smart TV", icon: Tv },
  { id: "apple", name: "Apple TV & iOS", icon: Smartphone },
  { id: "pc", name: "Windows PC & Mac", icon: Laptop },
];

const ISPS = [
  { name: "BT Broadband", hub: "BT Smart Hub 2", status: "100% Compatible", tip: "Disable BT Web Protect if live streams are blocked." },
  { name: "Virgin Media", hub: "Hub 3 / 4 / 5", status: "100% Compatible", tip: "Turn off Virgin Media Web Safe in your online account." },
  { name: "Sky Broadband", hub: "Sky Hub / WiFi Max", status: "100% Compatible", tip: "Set Sky Broadband Shield to 18 or turn off." },
  { name: "Vodafone UK", hub: "Vodafone Wi-Fi Hub", status: "100% Compatible", tip: "Direct connection with zero throttling." },
  { name: "TalkTalk", hub: "TalkTalk Wi-Fi Hub", status: "100% Compatible", tip: "Turn off TalkTalk HomeSafe content filters." },
  { name: "EE Broadband", hub: "EE Smart Hub", status: "100% Compatible", tip: "Fully verified for 4K 60fps cricket." },
];

export default function SetupGuidePage() {
  const { quickSubscribe } = useSiteShell();
  const [activeDevice, setActiveDevice] = useState("firestick");

  const jsonLdData = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How to Set Up ChitramTV UK on Amazon Firestick and Smart TV",
    "description": "Step-by-step setup guide for streaming 500+ live Indian TV channels on Amazon Firestick in the UK with 14 Days Catch-Up TV.",
    "step": [
      {
        "@type": "HowToStep",
        "name": "1. Subscribe via PayPal",
        "text": "Select your plan and complete PayPal checkout in GBP. Receive credentials via WhatsApp & Email within 2 minutes."
      },
      {
        "@type": "HowToStep",
        "name": "2. Install Downloader on Firestick",
        "text": "Open the Amazon Appstore, search for 'Downloader', install the app and enter the ChitramTV quick download code."
      },
      {
        "@type": "HowToStep",
        "name": "3. Login and Stream",
        "text": "Launch ChitramTV, enter your username and password, and start watching 500+ live Indian channels with 14-day catch-up."
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
          <span className="text-gray-900 font-semibold">Device Setup &amp; Installation Guide</span>
        </div>
      </div>

      {/* Hero Header */}
      <section className="relative overflow-hidden pt-8 pb-12 sm:pt-14 sm:pb-16 bg-[#f4f6f8] border-b border-gray-200">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-red-200 bg-red-50 px-3.5 py-1 text-xs font-semibold text-[#dd0e1c] mb-4">
            <Download className="h-3.5 w-3.5" />
            <span>3-MINUTE PLUG &amp; PLAY INSTALLATION</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#2c3640] tracking-tight leading-tight">
            How to Set Up <span className="text-[#dd0e1c]">ChitramTV UK</span>
          </h1>
          <p className="mt-4 text-sm sm:text-base text-gray-600 leading-relaxed">
            Follow our simple instructions below for Amazon Firestick, Smart TVs, Android, and Apple TV. No technical skills required.
          </p>
        </div>
      </section>

      {/* Quick 3-Step Universal Process */}
      <section className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 -mt-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="rounded-xl border border-gray-200 bg-white p-6 relative shadow-sm">
            <span className="text-3xl font-black text-[#dd0e1c]/20 absolute top-4 right-4">01</span>
            <div className="text-xs font-bold uppercase tracking-wider text-[#dd0e1c] mb-2">Step 1</div>
            <h3 className="text-base font-bold text-[#2c3640]">Subscribe via PayPal</h3>
            <p className="text-xs text-gray-600 mt-1 leading-relaxed">
              Choose your pass (1M, 6M, 12+2 Free). Checkout securely in GBP through PayPal Buyer Protection.
            </p>
          </div>
          <div className="rounded-xl border border-gray-200 bg-white p-6 relative shadow-sm">
            <span className="text-3xl font-black text-[#dd0e1c]/20 absolute top-4 right-4">02</span>
            <div className="text-xs font-bold uppercase tracking-wider text-[#dd0e1c] mb-2">Step 2</div>
            <h3 className="text-base font-bold text-[#2c3640]">Receive Credentials</h3>
            <p className="text-xs text-gray-600 mt-1 leading-relaxed">
              Automated dispatch sends your login code and M3U playlist to your WhatsApp &amp; Email within 2 minutes.
            </p>
          </div>
          <div className="rounded-xl border border-gray-200 bg-white p-6 relative shadow-sm">
            <span className="text-3xl font-black text-[#dd0e1c]/20 absolute top-4 right-4">03</span>
            <div className="text-xs font-bold uppercase tracking-wider text-[#dd0e1c] mb-2">Step 3</div>
            <h3 className="text-base font-bold text-[#2c3640]">Install App &amp; Stream</h3>
            <p className="text-xs text-gray-600 mt-1 leading-relaxed">
              Enter your login on your Firestick or Smart TV app. Start enjoying 500+ live channels with 14-day catch-up.
            </p>
          </div>
        </div>
      </section>

      {/* Interactive Device Selector & Instructions */}
      <section className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#2c3640] tracking-tight">
            Choose Your Streaming Device
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 mt-2">
            Select your hardware below for device-specific instructions.
          </p>
        </div>

        {/* Device Pills Strip */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto scrollbar-none pb-4 mb-8">
          {DEVICES.map((d) => {
            const isSelected = activeDevice === d.id;
            const Icon = d.icon;
            return (
              <button
                key={d.id}
                onClick={() => setActiveDevice(d.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap min-h-[44px] transition-all select-none shrink-0 ${
                  isSelected
                    ? "bg-[#dd0e1c] text-white shadow-sm"
                    : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 shadow-sm"
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{d.name}</span>
              </button>
            );
          })}
        </div>

        {/* Device Step Content Container */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-10 shadow-sm max-w-4xl mx-auto">
          {activeDevice === "firestick" && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
                <Tv className="h-6 w-6 text-[#dd0e1c]" />
                <div>
                  <h3 className="text-lg font-bold text-[#2c3640]">Amazon Fire TV Stick Setup Guide</h3>
                  <p className="text-xs text-gray-500">Compatible with Firestick 4K, 4K Max, Lite, and Fire TV Cube</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex gap-4 items-start">
                  <div className="h-7 w-7 rounded-full bg-[#dd0e1c] text-white font-bold text-xs flex items-center justify-center shrink-0">1</div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-900">Install the Downloader App</h4>
                    <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                      From your Firestick home screen, click <strong className="text-gray-900">Find</strong> &gt; <strong className="text-gray-900">Search</strong>, type &ldquo;Downloader&rdquo;, and install the official orange Downloader application from the Amazon Appstore.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="h-7 w-7 rounded-full bg-[#dd0e1c] text-white font-bold text-xs flex items-center justify-center shrink-0">2</div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-900">Enable Unknown Sources Permission</h4>
                    <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                      Go to <strong className="text-gray-900">Settings</strong> &gt; <strong className="text-gray-900">My Fire TV</strong> &gt; <strong className="text-gray-900">Developer Options</strong> &gt; <strong className="text-gray-900">Install Unknown Apps</strong> &gt; toggle <strong className="text-gray-900">Downloader to ON</strong>.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="h-7 w-7 rounded-full bg-[#dd0e1c] text-white font-bold text-xs flex items-center justify-center shrink-0">3</div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-900">Enter ChitramTV UK Downloader Code</h4>
                    <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                      Open Downloader, enter the 6-digit quick code provided in your activation message, and press <strong className="text-gray-900">Go</strong>. The ChitramTV app will download and install automatically in under 30 seconds.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="h-7 w-7 rounded-full bg-[#dd0e1c] text-white font-bold text-xs flex items-center justify-center shrink-0">4</div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-900">Login with Your Credentials</h4>
                    <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                      Launch ChitramTV, enter your username and password, and instantly start watching 500+ live channels and 14-day catch-up.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeDevice === "android" && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
                <Monitor className="h-6 w-6 text-[#dd0e1c]" />
                <div>
                  <h3 className="text-lg font-bold text-[#2c3640]">Android &amp; Google TV Setup</h3>
                  <p className="text-xs text-gray-500">Sony, Philips, TCL, Panasonic Smart TVs and Google TV streamers</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex gap-4 items-start">
                  <div className="h-7 w-7 rounded-full bg-[#dd0e1c] text-white font-bold text-xs flex items-center justify-center shrink-0">1</div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-900">Open Google Play Store on Your TV</h4>
                    <p className="text-xs text-gray-600 mt-1 leading-relaxed">Search for &ldquo;ChitramTV&rdquo; or download the Downloader app from the Play Store.</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <div className="h-7 w-7 rounded-full bg-[#dd0e1c] text-white font-bold text-xs flex items-center justify-center shrink-0">2</div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-900">Install ChitramTV Dedicated TV App</h4>
                    <p className="text-xs text-gray-600 mt-1 leading-relaxed">Click Install. The app is fully optimized for your TV remote with full 4K 60fps hardware acceleration.</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <div className="h-7 w-7 rounded-full bg-[#dd0e1c] text-white font-bold text-xs flex items-center justify-center shrink-0">3</div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-900">Input Account Details &amp; Enjoy</h4>
                    <p className="text-xs text-gray-600 mt-1 leading-relaxed">Login with your credentials received via WhatsApp to access the full 500+ channel guide with 14-day catch-up.</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeDevice === "samsung-lg" && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
                <Tv className="h-6 w-6 text-[#dd0e1c]" />
                <div>
                  <h3 className="text-lg font-bold text-[#2c3640]">Samsung Tizen &amp; LG webOS Setup</h3>
                  <p className="text-xs text-gray-500">Direct streaming via Smart TV portal app</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex gap-4 items-start">
                  <div className="h-7 w-7 rounded-full bg-[#dd0e1c] text-white font-bold text-xs flex items-center justify-center shrink-0">1</div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-900">Launch Smart TV App Store</h4>
                    <p className="text-xs text-gray-600 mt-1 leading-relaxed">Open Samsung Apps or LG Content Store on your television.</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <div className="h-7 w-7 rounded-full bg-[#dd0e1c] text-white font-bold text-xs flex items-center justify-center shrink-0">2</div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-900">Install Supported Smart TV Player</h4>
                    <p className="text-xs text-gray-600 mt-1 leading-relaxed">Install the ChitramTV Smart TV player app or configure your device MAC address with our support desk.</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <div className="h-7 w-7 rounded-full bg-[#dd0e1c] text-white font-bold text-xs flex items-center justify-center shrink-0">3</div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-900">Instant Remote Activation</h4>
                    <p className="text-xs text-gray-600 mt-1 leading-relaxed">Our UK WhatsApp desk can activate your Smart TV MAC address directly in under 60 seconds.</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeDevice === "apple" && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
                <Smartphone className="h-6 w-6 text-[#dd0e1c]" />
                <div>
                  <h3 className="text-lg font-bold text-[#2c3640]">Apple TV 4K, iPhone &amp; iPad Setup</h3>
                  <p className="text-xs text-gray-500">iOS 14+ and tvOS supported with AirPlay</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex gap-4 items-start">
                  <div className="h-7 w-7 rounded-full bg-[#dd0e1c] text-white font-bold text-xs flex items-center justify-center shrink-0">1</div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-900">Download from the Apple App Store</h4>
                    <p className="text-xs text-gray-600 mt-1 leading-relaxed">Install our recommended iOS / tvOS streaming client from the App Store.</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <div className="h-7 w-7 rounded-full bg-[#dd0e1c] text-white font-bold text-xs flex items-center justify-center shrink-0">2</div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-900">Load Your ChitramTV M3U Playlist</h4>
                    <p className="text-xs text-gray-600 mt-1 leading-relaxed">Paste your personal activation link provided via WhatsApp.</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <div className="h-7 w-7 rounded-full bg-[#dd0e1c] text-white font-bold text-xs flex items-center justify-center shrink-0">3</div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-900">Enjoy Seamless 4K HDR Streaming</h4>
                    <p className="text-xs text-gray-600 mt-1 leading-relaxed">Stream with full Dolby audio and AirPlay support across your Apple ecosystem.</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeDevice === "pc" && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
                <Laptop className="h-6 w-6 text-[#dd0e1c]" />
                <div>
                  <h3 className="text-lg font-bold text-[#2c3640]">Windows PC &amp; Mac Setup</h3>
                  <p className="text-xs text-gray-500">Watch directly in Google Chrome, Microsoft Edge, or Safari</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex gap-4 items-start">
                  <div className="h-7 w-7 rounded-full bg-[#dd0e1c] text-white font-bold text-xs flex items-center justify-center shrink-0">1</div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-900">Open the ChitramTV Web Player</h4>
                    <p className="text-xs text-gray-600 mt-1 leading-relaxed">Navigate to our secure web streaming portal on your desktop browser.</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <div className="h-7 w-7 rounded-full bg-[#dd0e1c] text-white font-bold text-xs flex items-center justify-center shrink-0">2</div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-900">Login with Your Credentials</h4>
                    <p className="text-xs text-gray-600 mt-1 leading-relaxed">Enter your username and password to launch the full electronic program guide.</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Optional Diagnostic Speed Test (Non-Intrusive) */}
      <section className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-10">
        <details className="group rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
          <summary className="p-4 sm:p-5 flex items-center justify-between cursor-pointer select-none hover:bg-gray-50 transition-colors">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-lg bg-red-50 border border-red-200 flex items-center justify-center text-[#dd0e1c] shrink-0">
                <Wifi className="h-4 w-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-[#2c3640]">
                  Experiencing Stream Issues? Test Your UK Broadband Speed
                </h3>
                <p className="text-xs text-gray-500">
                  Click to run our live network diagnostic for London relay latency and buffer risk.
                </p>
              </div>
            </div>
            <span className="text-xs font-semibold text-[#dd0e1c] group-open:hidden">Show Test +</span>
            <span className="text-xs font-semibold text-gray-500 hidden group-open:inline">Hide Test −</span>
          </summary>
          <div className="p-4 sm:p-6 border-t border-gray-100 bg-gray-50/50">
            <SpeedTestWidget />
          </div>
        </details>
      </section>

      {/* UK ISP Compatibility Matrix */}
      <section className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-14 sm:pb-20">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#2c3640] tracking-tight">
            UK Broadband &amp; Router Compatibility
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 mt-2">
            ChitramTV is verified across all major British internet service providers with zero VPN requirement.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {ISPS.map((isp) => (
            <div key={isp.name} className="rounded-xl border border-gray-200 bg-white p-5 space-y-2.5 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-[#2c3640]">{isp.name}</span>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">
                  {isp.status}
                </span>
              </div>
              <div className="text-xs text-gray-500 font-mono">Verified: {isp.hub}</div>
              <p className="text-xs text-gray-600 leading-relaxed border-t border-gray-100 pt-2">
                <strong className="text-gray-900">UK Tip:</strong> {isp.tip}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Speed & Help CTA Bar */}
      <section className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-14 sm:pb-20">
        <div className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-xl font-bold text-[#2c3640]">Need Setup Help Right Now?</h3>
            <p className="text-xs sm:text-sm text-gray-600 max-w-lg">
              Our UK engineers are available 24/7 on WhatsApp to walk you through Firestick or Smart TV setup step-by-step.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
            <a
              href="https://wa.me/447979637777"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs h-12 px-6 rounded-lg transition-colors w-full sm:w-auto shadow-sm"
            >
              <MessageSquare className="h-4 w-4" />
              <span>WhatsApp Live Help Desk (07979637777)</span>
            </a>
            <Button
              variant="default"
              size="lg"
              onClick={quickSubscribe}
              className="font-bold text-xs h-12 px-6 w-full sm:w-auto bg-[#dd0e1c] hover:bg-[#b00b16] text-white shadow-sm"
            >
              Get Your Credentials (£6.43/mo)
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
