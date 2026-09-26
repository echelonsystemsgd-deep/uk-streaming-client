import React from "react";
import Link from "next/link";
import { Play, ShieldCheck, Lock, Tv, Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-background border-t border-border/80 text-muted-foreground text-xs select-none">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-border/60">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-lg bg-primary flex items-center justify-center text-white font-bold">
                <Play className="h-4 w-4 fill-current ml-0.5" />
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-extrabold tracking-tight text-white">
                  DesiStream
                </span>
                <span className="rounded bg-accent px-1.5 py-0.5 text-[10px] font-extrabold text-accent-foreground">
                  UK
                </span>
              </div>
            </Link>
            <p className="text-xs text-muted-foreground leading-relaxed max-w-sm">
              The premier streaming television provider for the British Indian community. Over 350+ live Hindi, Punjabi, Tamil, Telugu, and Malayalam channels with 7-day catch-up and 4K live sports.
            </p>
            <div className="flex items-center gap-4 text-xs text-slate-300">
              <span className="flex items-center gap-1 text-emerald-400">
                <ShieldCheck className="h-4 w-4" /> PayPal Verified Merchant
              </span>
              <span className="flex items-center gap-1 text-sky-400">
                <Lock className="h-4 w-4" /> 256-Bit Encryption
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-white">
              Navigation
            </div>
            <ul className="space-y-1">
              <li>
                <a href="#channels" className="block py-1.5 hover:text-white transition-colors">
                  Channels (350+)
                </a>
              </li>
              <li>
                <a href="#features" className="block py-1.5 hover:text-white transition-colors">
                  Why DesiStream
                </a>
              </li>
              <li>
                <a href="#plans" className="block py-1.5 hover:text-white transition-colors">
                  Subscription Plans
                </a>
              </li>
              <li>
                <a href="#how-it-works" className="block py-1.5 hover:text-white transition-colors">
                  3-Step Setup Guide
                </a>
              </li>
              <li>
                <a href="#faq" className="block py-1.5 hover:text-white transition-colors">
                  FAQ & Catch-up
                </a>
              </li>
            </ul>
          </div>

          {/* Supported Devices */}
          <div className="space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-white">
              Devices
            </div>
            <ul className="space-y-1.5 text-muted-foreground">
              <li>Amazon Fire TV Stick 4K</li>
              <li>Android TV & Google TV</li>
              <li>Apple TV 4K & iPad</li>
              <li>Samsung Smart TV (Tizen)</li>
              <li>LG Smart TV (webOS)</li>
              <li>Windows PC & Mac</li>
            </ul>
          </div>

          {/* Contact & Legal */}
          <div className="space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-white">
              UK Office & Help
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Customer Support Desk:<br />
              <strong className="text-white">020 7946 0912</strong><br />
              London, United Kingdom
            </p>
            <p className="text-xs text-muted-foreground">
              WhatsApp Support: 24/7<br />
              Phone Lines: 8am – 11pm GMT
            </p>
          </div>

        </div>

        {/* Bottom Strip */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-center sm:text-left">
          <p>
            © {new Date().getFullYear()} DesiStream UK. All Rights Reserved. Not affiliated with third-party broadcasters.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
            <span className="hover:text-white cursor-pointer py-1">Terms & Conditions</span>
            <span className="hover:text-white cursor-pointer py-1">Privacy Policy</span>
            <span className="hover:text-white cursor-pointer py-1">Refund Policy (7 Days)</span>
            <span className="hover:text-white cursor-pointer py-1">Cookie Preferences</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
