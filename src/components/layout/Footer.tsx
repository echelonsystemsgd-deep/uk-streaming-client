import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Phone, MessageSquare, ShieldCheck, Lock, CheckCircle2, CreditCard } from "lucide-react";

export function Footer() {
  return (
    <footer id="site-footer" className="bg-[#2c3640] text-gray-300 text-xs border-t border-gray-700">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-10 border-b border-gray-700">
          {/* Brand & Company Details */}
          <div className="space-y-4 lg:col-span-1">
            <Link href="/" className="inline-block">
              <div className="relative h-12 w-48 bg-white/10 p-2 rounded">
                <Image
                  src="/Logo.png"
                  alt="ChitramTV UK"
                  fill
                  className="object-contain"
                />
              </div>
            </Link>
            <p className="text-gray-400 text-xs leading-relaxed">
              Watch your favourite Indian TV Channels on TV with Chitram 4K Set top box with extended media player functionality and 14 Days Catch-Up TV.
            </p>
            <div className="text-xs text-gray-300 bg-gray-800/80 p-3 rounded border border-gray-700 space-y-1">
              <div className="font-bold text-white">Shiva Technology Ltd</div>
              <div className="text-gray-400">Trading as ChitramTV UK</div>
              <div className="text-emerald-400 font-semibold flex items-center gap-1 mt-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Authorized UK Reseller
              </div>
            </div>
          </div>

          {/* Information Links (Exact links from chitramtv.eu) */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white border-b border-gray-700 pb-2">
              Information
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-gray-400 hover:text-[#fdc22d] transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-400 hover:text-[#fdc22d] transition-colors">
                  Terms and Condition
                </Link>
              </li>
              <li>
                <Link href="/download" className="text-gray-400 hover:text-[#fdc22d] transition-colors">
                  Download (TV &amp; Mobile Apps)
                </Link>
              </li>
              <li>
                <Link href="/setup-guide" className="text-gray-400 hover:text-[#fdc22d] transition-colors">
                  Setup Guide
                </Link>
              </li>
              <li>
                <Link href="/features" className="text-gray-400 hover:text-[#fdc22d] transition-colors">
                  Features &amp; 14-Day DVR
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-400 hover:text-[#fdc22d] transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/refund-policy" className="text-gray-400 hover:text-[#fdc22d] transition-colors">
                  Refund Policy &amp; Returns
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-[#fdc22d] transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Catalogue & Hardware */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white border-b border-gray-700 pb-2">
              Tariff Plans &amp; Boxes
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="/buy-now" className="text-gray-400 hover:text-[#fdc22d] transition-colors">
                  Buy Now — Full Catalogue
                </Link>
              </li>
              <li>
                <Link href="/channels" className="text-gray-400 hover:text-[#fdc22d] transition-colors">
                  500+ Indian Live TV Channels
                </Link>
              </li>
              <li>
                <Link href="/buy-now" className="text-gray-400 hover:text-[#fdc22d] transition-colors">
                  ChitramTV Renewal (12+2 Free Months)
                </Link>
              </li>
              <li>
                <Link href="/buy-now" className="text-gray-400 hover:text-[#fdc22d] transition-colors">
                  ChitramTV Black Edition C1 Box
                </Link>
              </li>
              <li>
                <Link href="/buy-now" className="text-gray-400 hover:text-[#fdc22d] transition-colors">
                  Box + 1 Year Service Bundle
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-400 hover:text-[#fdc22d] transition-colors">
                  Frequently Asked Questions
                </Link>
              </li>
            </ul>
          </div>

          {/* UK Customer Support */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white border-b border-gray-700 pb-2">
              UK Customer Desk
            </h4>
            <div className="space-y-2.5 text-gray-300">
              <a
                href="tel:07979637777"
                className="flex items-center gap-2 text-white hover:text-[#fdc22d] transition-colors font-semibold"
              >
                <Phone className="w-4 h-4 text-[#fdc22d] shrink-0" />
                <span>Helpline: 07979637777</span>
              </a>
              <a
                href="https://wa.me/447979637777"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-emerald-400 hover:text-emerald-300 transition-colors"
              >
                <MessageSquare className="w-4 h-4 shrink-0" />
                <span>24/7 WhatsApp Support</span>
              </a>
              <p className="text-gray-400 pt-1">
                Hours: Mon – Sun, 9:00 AM – 10:00 PM UK
              </p>
              <div className="pt-2 flex items-center gap-3 text-xs text-gray-400">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" /> PayPal Protected
                </span>
                <span className="flex items-center gap-1">
                  <Lock className="w-4 h-4 text-blue-400" /> 256-Bit SSL
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Payment Badges */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-gray-400">
          <p>
            Chitram TV © All Rights Reserved — The business ChitramTV UK is a part of{" "}
            <strong className="text-white">Shiva Technology Ltd</strong>.
          </p>
          <div className="flex items-center gap-2 text-xs font-semibold text-gray-400 bg-gray-800 px-3 py-1.5 rounded border border-gray-700">
            <span>Accepted Payments:</span>
            <span className="text-blue-400 font-bold">PayPal</span>
            <span>•</span>
            <span className="text-white">Visa</span>
            <span>•</span>
            <span className="text-white">Mastercard</span>
            <span>•</span>
            <span className="text-amber-400">Pay in 3</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
