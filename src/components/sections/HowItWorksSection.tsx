import React from "react";
import { CreditCard, Key, Tv, ArrowRight, CheckCircle2 } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export function HowItWorksSection() {
  const steps = [
    {
      step: "01",
      icon: CreditCard,
      title: "Choose Your Plan",
      description:
        "Select your preferred subscription duration (1 month, 6 months, or 12 months + 2 free). Complete payment securely via PayPal buyer protection in GBP (£).",
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((item, idx) => {
            const Icon = item.icon;
            return (
              <Card
                key={idx}
                className="relative flex flex-col justify-between p-2 bg-card border-border/70"
              >
                <div>
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-3xl font-black text-primary/40 font-mono">
                        {item.step}
                      </span>
                      <div className="h-10 w-10 rounded-lg bg-background-subtle border border-border flex items-center justify-center text-accent">
                        <Icon className="h-5 w-5" />
                      </div>
                    </div>
                    <CardTitle className="text-xl font-bold text-white">
                      {item.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm text-muted-foreground leading-relaxed">
                    {item.description}
                  </CardContent>
                </div>
              </Card>
            );
          })}
        </div>

      </div>
    </section>
  );
}
