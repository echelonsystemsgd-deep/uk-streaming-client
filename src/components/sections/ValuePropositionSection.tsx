import React from "react";
import { Clock, Zap, Tv, Smartphone, Server, Headphones, Film, ShieldCheck } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export function ValuePropositionSection() {
  const valueProps = [
    {
      icon: Clock,
      title: "7-Day Automatic Catch-up TV",
      description:
        "India is 4.5 to 5.5 hours ahead of GMT. With automatic 7-day catch-up, watch primetime dramas, serials, and news whenever you get home in the UK without missing an episode.",
    },
    {
      icon: Zap,
      title: "4K Ultra HD & 60fps Live Cricket",
      description:
        "Catch every boundary, wicket, and review in crisp 4K at 60fps. Star Sports, Sony Sports, and cricket broadcasts stream smoothly with zero stutter on UK broadband.",
    },
    {
      icon: Tv,
      title: "350+ Multilingual Channels",
      description:
        "Comprehensive live coverage across Hindi, Punjabi, Tamil, Telugu, Malayalam, Bengali, Marathi, and Gujarati, plus spiritual feeds including Live Golden Temple Gurbani.",
    },
    {
      icon: Smartphone,
      title: "Watch Anywhere On Any UK Device",
      description:
        "Instant compatibility with Amazon Firestick, Apple TV, Google TV, Samsung Smart TV, LG webOS, iPhone, Android, and laptops with multi-screen household access.",
    },
    {
      icon: Server,
      title: "UK Dedicated Streaming Network",
      description:
        "High-throughput UK streaming clusters optimized directly for BT, Virgin Media, Sky, and Vodafone connections to ensure buffer-free playback during peak evening hours.",
    },
    {
      icon: Headphones,
      title: "Direct UK WhatsApp & Phone Support",
      description:
        "Friendly British customer care team ready on WhatsApp and phone. Receive instant automated activation credentials in under 2 minutes with step-by-step setup guidance.",
    },
  ];

  return (
    <section id="features" className="py-16 sm:py-20 bg-background-elevated/40 border-b border-border">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-3 sm:space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-primary">
            ENGINEERED FOR THE UK INDIAN COMMUNITY
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Why UK Households Choose ChitramTV
          </h2>
          <p className="text-base sm:text-lg text-zinc-400 leading-relaxed">
            Designed specifically for viewers in London, Leicester, Birmingham, Manchester, and across the UK who want dependable, high-definition Indian television.
          </p>
        </div>

        {/* 6-Column Grid strictly adhering to 8px grid and shadcn Card tokens */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {valueProps.map((prop, idx) => {
            const Icon = prop.icon;
            return (
              <Card key={idx} className="relative p-6 flex flex-col justify-between bg-card border-border">
                <div>
                  <div className="flex items-center gap-3.5 mb-3">
                    <div className="h-10 w-10 rounded-lg bg-zinc-800 border border-zinc-700/60 flex items-center justify-center shrink-0 text-zinc-200">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="text-lg font-bold text-white">
                      {prop.title}
                    </h3>
                  </div>
                  <p className="text-sm text-zinc-400 leading-relaxed">
                    {prop.description}
                  </p>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Reliability Guarantee Strip */}
        <div className="mt-12 rounded-xl border border-border bg-card p-6 shadow-card flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-zinc-200 shrink-0">
              <ShieldCheck className="h-6 w-6 text-zinc-200" />
            </div>
            <div>
              <div className="text-base font-bold text-white">
                Unconditional 7-Day Money-Back Guarantee
              </div>
              <div className="text-xs text-zinc-400 mt-0.5">
                Test our streams risk-free on your home Wi-Fi. If you aren&apos;t completely satisfied, get a prompt full refund via PayPal.
              </div>
            </div>
          </div>
          <span className="shrink-0 text-xs font-bold uppercase tracking-wider text-zinc-300 border border-zinc-700 rounded-md px-3.5 py-1.5 bg-zinc-800/80">
            100% Risk Free
          </span>
        </div>

      </div>
    </section>
  );
}
