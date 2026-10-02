"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { useSiteShell } from "@/components/layout/SiteShell";
import { JsonLd } from "@/components/seo/JsonLd";
import { Search, X, ChevronDown, ChevronUp, HelpCircle, MessageSquare, Phone, ShieldCheck, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ExtendedFaqItem {
  id: string;
  category: "all" | "setup" | "billing" | "catchup" | "tech";
  categoryLabel: string;
  question: string;
  answer: string;
}

const EXTENDED_FAQS: ExtendedFaqItem[] = [
  {
    id: "faq-1",
    category: "catchup",
    categoryLabel: "Catch-up TV",
    question: "How does 7-Day Catch-up TV work for the UK time difference?",
    answer: "Because India is 5.5 hours ahead of GMT (and 4.5 hours ahead during British Summer Time), Indian primetime dramas, serials, and news debates air around 2:30 PM UK time when you are working. With ChitramTV UK's automatic 7-day cloud recording, every single channel is recorded on our secure UK edge servers. You can pause, rewind, and watch your favourite dramas (Anupamaa, Kundali Bhagya, Yeh Rishta) or cricket matches whenever you sit down in the evening with zero commercials."
  },
  {
    id: "faq-2",
    category: "setup",
    categoryLabel: "Setup & Devices",
    question: "Which devices and Smart TVs are supported in the UK?",
    answer: "ChitramTV UK works natively across Amazon Fire TV Stick (all models including 4K, 4K Max, Lite, and Fire Cube), Android TVs (Sony, Philips, TCL, Panasonic), Google TV, Samsung Smart TVs (Tizen OS), LG Smart TVs (webOS), Apple TV 4K, iOS (iPhone/iPad), Android smartphones, Windows PC, and Mac laptops. No satellite dish or complex aerial installation is required."
  },
  {
    id: "faq-3",
    category: "billing",
    categoryLabel: "Payments & PayPal",
    question: "How does PayPal payment and Buyer Protection work?",
    answer: "All subscription passes and hardware orders are billed securely in Euros (€ EUR) through PayPal. You can pay using your PayPal balance, linked bank account, or any major credit/debit card (Visa, Mastercard, Amex). Every transaction is covered by PayPal's 100% Buyer Protection guarantee, meaning your funds are secure and you are never locked into automatic rolling contracts."
  },
  {
    id: "faq-4",
    category: "setup",
    categoryLabel: "Setup & Devices",
    question: "How quickly do I receive my streaming credentials after paying?",
    answer: "Credential dispatch is fully automated and runs 24 hours a day, 7 days a week. Within 60 to 120 seconds of your PayPal payment being approved, your unique username, password, Downloader quick-code, and personal M3U playlist URL are dispatched directly to your WhatsApp number and email address."
  },
  {
    id: "faq-5",
    category: "tech",
    categoryLabel: "Broadband & Technical",
    question: "Do I need a VPN or special broadband in the UK?",
    answer: "No VPN is required. Our dedicated UK CDN servers route streams directly through major British ISPs including Virgin Media, BT, Sky, Vodafone, TalkTalk, and EE. A standard broadband connection of 15 Mbps is plenty for crystal-clear 1080p Full HD, while 30 Mbps is recommended for 4K Ultra HD and 60fps live sports."
  },
  {
    id: "faq-6",
    category: "tech",
    categoryLabel: "Broadband & Technical",
    question: "Does ChitramTV work with BT Web Protect or Virgin Media Websafe?",
    answer: "Yes, ChitramTV is 100% compatible. On rare occasions, default parental child-locks on BT Smart Hub or Virgin Media Web Safe may temporarily block third-party streaming ports. Our UK support desk on WhatsApp will guide you through turning off the parental filter in your online account settings in under 60 seconds."
  },
  {
    id: "faq-7",
    category: "setup",
    categoryLabel: "Setup & Devices",
    question: "Can I watch on multiple TVs or mobile devices simultaneously?",
    answer: "Yes! Our 1-month plan supports 2 simultaneous streams, the 6-month plan supports 3 devices, and our 12-month (+2 months free) pass supports 4 simultaneous connections—meaning parents can watch Star Plus in the living room while children watch cricket or regional cinema on another screen."
  },
  {
    id: "faq-8",
    category: "billing",
    categoryLabel: "Payments & PayPal",
    question: "Is there a money-back guarantee?",
    answer: "Yes. We offer an unconditional 7-Day Money-Back Guarantee. If you experience streaming difficulties or buffering that our 24/7 UK support desk cannot resolve, we will issue a full refund back to your original PayPal payment method with zero deductions."
  },
  {
    id: "faq-9",
    category: "catchup",
    categoryLabel: "Catch-up TV",
    question: "Can I use catch-up for live cricket matches?",
    answer: "Yes. Major cricket fixtures—including the ICC World Cups, IPL 2026, and India test series—can be rewound and replayed in full 4K UHD 60fps for up to 7 days after the live broadcast ends. You never have to wake up at 4:00 AM for early morning test match sessions in India or Australia."
  },
  {
    id: "faq-10",
    category: "billing",
    categoryLabel: "Payments & PayPal",
    question: "What is included with the 4K Box Bundle?",
    answer: "The 4K Box Bundle includes a dedicated high-performance quad-core Android TV set-top box delivered to your UK postal address via Royal Mail Tracked 24. The box comes pre-configured with the ChitramTV app, a backlit remote control, UK power adapter, HDMI cable, a 1-year hardware warranty, and 14 full months of service (12 + 2 Free)."
  }
];

const CATEGORIES = [
  { id: "all", label: "All Questions (10)" },
  { id: "setup", label: "Setup & Devices" },
  { id: "billing", label: "Payments & PayPal" },
  { id: "catchup", label: "Catch-Up TV" },
  { id: "tech", label: "Broadband & Speed" },
];

export default function FaqPage() {
  const { quickSubscribe } = useSiteShell();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({
    "faq-1": true,
    "faq-2": true,
  });

  const toggleItem = (id: string) => {
    setOpenItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredFaqs = useMemo(() => {
    return EXTENDED_FAQS.filter((f) => {
      const matchCat = selectedCategory === "all" || f.category === selectedCategory;
      const matchSearch =
        searchQuery.trim() === "" ||
        f.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        f.answer.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [selectedCategory, searchQuery]);

  const jsonLdData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": EXTENDED_FAQS.map((f) => ({
      "@type": "Question",
      "name": f.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": f.answer
      }
    }))
  };

  return (
    <>
      <JsonLd data={jsonLdData} />

      {/* Breadcrumb Strip */}
      <div className="border-b border-border/60 bg-zinc-950/60 py-2.5 px-4 text-xs text-zinc-400">
        <div className="container mx-auto max-w-7xl flex items-center gap-2">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <span>/</span>
          <span className="text-white font-medium">Help Center &amp; FAQ</span>
        </div>
      </div>

      {/* Hero Header */}
      <section className="relative overflow-hidden pt-8 pb-12 sm:pt-14 sm:pb-16 bg-gradient-to-b from-zinc-900/40 to-background border-b border-border/60">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background-elevated px-3.5 py-1 text-xs font-semibold text-primary mb-4">
            <HelpCircle className="h-3.5 w-3.5" />
            <span>24/7 UK HELP CENTER &amp; ANSWERS</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Frequently Asked <span className="text-primary">Questions</span>
          </h1>
          <p className="mt-4 text-sm sm:text-base text-zinc-400 leading-relaxed">
            Everything you need to know about ChitramTV UK: 7-day catch-up, PayPal security, Amazon Firestick installation, and UK broadband compatibility.
          </p>
        </div>
      </section>

      {/* Search and Filter Suite */}
      <section className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-6">
        {/* Search Bar */}
        <div className="relative w-full">
          <Search className="absolute left-3.5 top-3.5 h-4 w-4 text-muted-foreground pointer-events-none" />
          <input
            type="text"
            placeholder="Search questions (e.g. PayPal, Firestick, Catch-up, Virgin Media)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-lg border border-border bg-background pl-10 pr-10 py-3 text-base sm:text-sm text-white placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary min-h-[46px]"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-2 top-2 p-1.5 text-muted-foreground hover:text-white rounded-md min-h-[32px] min-w-[32px] flex items-center justify-center"
              aria-label="Clear search"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Category Pills Strip */}
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pb-2 -mx-4 px-4 sm:mx-0 sm:px-0">
          {CATEGORIES.map((c) => {
            const isSelected = selectedCategory === c.id;
            return (
              <button
                key={c.id}
                onClick={() => setSelectedCategory(c.id)}
                className={`rounded-lg px-4 py-2.5 text-xs font-semibold whitespace-nowrap min-h-[42px] flex items-center shrink-0 transition-colors select-none ${
                  isSelected
                    ? "bg-primary text-white"
                    : "bg-card border border-border/80 text-muted-foreground hover:bg-background-subtle hover:text-white"
                }`}
              >
                {c.label}
              </button>
            );
          })}
        </div>

        {/* Accordion FAQ List */}
        <div className="space-y-3 pt-2">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq) => {
              const isOpen = !!openItems[faq.id];
              return (
                <div
                  key={faq.id}
                  className="rounded-xl border border-zinc-800 bg-card overflow-hidden transition-colors hover:border-zinc-700 shadow-card"
                >
                  <button
                    onClick={() => toggleItem(faq.id)}
                    className="w-full p-4 sm:p-5 text-left flex items-start justify-between gap-4 select-none min-h-[48px]"
                    aria-expanded={isOpen}
                  >
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-primary">
                        {faq.categoryLabel}
                      </span>
                      <h3 className="text-sm sm:text-base font-bold text-white leading-snug">
                        {faq.question}
                      </h3>
                    </div>
                    <div className="h-7 w-7 rounded-md bg-zinc-800 flex items-center justify-center text-zinc-400 shrink-0 mt-0.5">
                      {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-4 pb-5 sm:px-5 sm:pb-6 pt-1 text-xs sm:text-sm text-zinc-400 leading-relaxed border-t border-zinc-800/60 animate-in fade-in duration-200">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <div className="py-12 text-center text-muted-foreground bg-card rounded-xl border border-border p-8">
              <p className="text-base font-semibold text-white">No questions matched &ldquo;{searchQuery}&rdquo;</p>
              <p className="text-xs text-zinc-400 mt-1">Try another search keyword or reset the category filter.</p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setSelectedCategory("all");
                  setSearchQuery("");
                }}
                className="mt-4 font-semibold text-xs"
              >
                Reset Filter
              </Button>
            </div>
          )}
        </div>

        {/* Escalation Contact Desk Banner */}
        <div className="rounded-2xl border border-zinc-800 bg-gradient-to-r from-zinc-900 via-background-elevated to-zinc-900 p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 mt-12">
          <div className="space-y-1.5 text-center md:text-left">
            <h3 className="text-lg font-bold text-white">Still have questions?</h3>
            <p className="text-xs text-zinc-400 max-w-md">
              Our support team is online 24/7 on WhatsApp and telephone. We respond in under 5 minutes.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
            <a
              href="https://wa.me/31620897414"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs h-11 px-5 rounded-lg transition-colors w-full sm:w-auto"
            >
              <MessageSquare className="h-4 w-4" />
              <span>WhatsApp Live Help</span>
            </a>
            <a
              href="tel:+31620897414"
              className="inline-flex items-center justify-center gap-2 bg-card border border-zinc-700 hover:text-white text-zinc-300 font-bold text-xs h-11 px-5 rounded-lg transition-colors w-full sm:w-auto"
            >
              <Phone className="h-4 w-4 text-primary" />
              <span>+31 6 20897414</span>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
