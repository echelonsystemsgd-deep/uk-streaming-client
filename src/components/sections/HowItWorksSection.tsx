import React from "react";
import Link from "next/link";
import { CreditCard, Key, Tv, ArrowRight, CheckCircle2 } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export function HowItWorksSection() {
  const steps = [
    {
      step: "01",
      icon: CreditCard,
      title: "Choose Your Plan or Hardware",
      description:
        "Select your subscription duration or Dune HD set-top box. Complete payment securely via PayPal buyer protection in Euros (€).",
    },
    {
      step: "02",
      icon: Key,
      title: "Receive Instant Credentials",
      description:
        "Within 60 to 120 seconds of checkout, your personal activation credentials, setup instructions, and portal URL are automatically emailed and messaged to your WhatsApp.",
    },
    {
      step: "03",
      icon: Tv,
      title: "Install App & Start Streaming",
      description:
        "Download our lightweight player onto your Amazon Firestick, Android TV, Apple TV, or mobile device. Enter your details and immediately enjoy 350+ live Indian channels in 4K.",
    },
  ];

  return (
    <section id="how-it-works" className="py-20 bg-background border-b border-border/60">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-primary">
            SIMPLE 2-MINUTE SETUP
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            How to Get Started in 3 Easy Steps
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            No technicians, no satellite dishes, and no lengthy contracts. Get your entire UK household set up today.
          </p>
        </div>

        {/* 3 Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 relative">
          {steps.map((item, idx) => {
            const Icon = item.icon;
            return (
              <Card
                key={idx}
                className="relative flex flex-col justify-between p-6 bg-card border-border"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-3xl font-black text-primary/30 font-mono">
                      {item.step}
                    </span>
                    <div className="h-10 w-10 rounded-lg bg-zinc-800 border border-zinc-700/60 flex items-center justify-center text-zinc-200">
                      <Icon className="h-5 w-5" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-zinc-400 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Link to dedicated Setup Guide page */}
        <div className="mt-12 text-center">
          <Link
            href="/setup-guide"
            className="inline-flex items-center gap-2 text-xs font-semibold text-zinc-200 hover:text-white bg-zinc-900 border border-zinc-700 hover:border-zinc-600 px-5 py-2.5 rounded-lg transition-colors min-h-[44px]"
          >
            <span>Read Step-by-Step Guides for Firestick, Smart TVs &amp; Virgin/BT Routers</span>
            <ArrowRight className="h-4 w-4 text-primary" />
          </Link>
        </div>

      </div>
    </section>
  );
}
