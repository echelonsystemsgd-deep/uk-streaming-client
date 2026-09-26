import React from "react";
import { Clock, Zap, Tv, Smartphone, Server, Headphones, Film, ShieldCheck } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export function ValuePropositionSection() {
  const valueProps = [
    {
      icon: Clock,
      iconColor: "text-accent",
      title: "7-Day Automatic Catch-up TV",
      description:
        "India is 4.5 to 5.5 hours ahead of GMT. With our 7-day cloud recording, you can watch Indian primetime serials and news when you get home from work in the UK without missing a single episode.",
    },
    {
      icon: Zap,
      iconColor: "text-primary",
      title: "4K Ultra HD & 60fps Live Cricket",
      description:
        "Experience every boundary and wicket in pristine 4K resolution at smooth 60 frames per second. Star Sports, Sony Sports Ten, and Sky Sports Cricket stream with zero lag or stutter.",
    },
    {
      icon: Tv,
      iconColor: "text-sky-400",
      title: "350+ Multilingual Channels",
      description:
        "Comprehensive coverage across Hindi, Punjabi, Tamil, Telugu, Malayalam, Bengali, Marathi, Gujarati, and Urdu. From daily soaps to regional cinema and devotional Gurbani/Aastha.",
    },
    {
      icon: Smartphone,
      iconColor: "text-emerald-400",
      title: "Watch Anywhere On Any UK Device",
      description:
        "Install with one click on Amazon Firestick, Google TV, Apple TV, Samsung Tizen, LG webOS, or on your iPhone, Android, iPad, and laptop with multi-room simultaneous streaming.",
    },
    {
      icon: Server,
      iconColor: "text-purple-400",
      title: "UK Edge CDN — Zero Buffering",
      description:
        "Our high-capacity streaming servers are located in London and Manchester, directly interconnected with Virgin Media, BT, Sky, and Vodafone networks for ultra-low latency.",
    },
    {
      icon: Headphones,
      iconColor: "text-amber-400",
      title: "24/7 Dedicated UK Customer Care",
      description:
        "Direct support via WhatsApp chat and UK phone helpline. Get instant activation credentials within 120 seconds of checkout and friendly setup assistance anytime you need.",
    },
  ];

  return (
    <section id="features" className="py-20 bg-background-elevated/40 border-b border-border/60">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-primary">
            ENGINEERED FOR THE UK INDIAN DIASPORA
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Why UK Families Switch to DesiStream
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            Designed specifically for households in London, Leicester, Birmingham, Manchester, and across the UK who demand reliable, crystal-clear Indian television.
          </p>
        </div>

        {/* 6-Column Grid adhering to 8px grid and Card-only shadows */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {valueProps.map((prop, idx) => {
            const Icon = prop.icon;
            return (
              <Card key={idx} className="relative p-2 flex flex-col justify-between">
                <div>
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-lg bg-background-subtle border border-border flex items-center justify-center shrink-0">
                        <Icon className={`h-5 w-5 ${prop.iconColor}`} />
                      </div>
                      <CardTitle className="text-lg font-bold text-white">
                        {prop.title}
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="text-sm text-muted-foreground leading-relaxed">
                    {prop.description}
                  </CardContent>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Reliability Guarantee Strip */}
        <div className="mt-12 rounded-xl border border-border bg-card p-6 shadow-card flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <div>
              <div className="text-base font-bold text-white">
                Unconditional 7-Day Money-Back Guarantee
              </div>
              <div className="text-xs text-muted-foreground mt-0.5">
                Test our streams risk-free on your home Wi-Fi. If you aren't completely delighted, receive a prompt full refund via PayPal.
              </div>
            </div>
          </div>
          <span className="shrink-0 text-xs font-bold uppercase tracking-wider text-emerald-400 border border-emerald-500/30 rounded px-3 py-1.5 bg-emerald-500/5">
            100% Risk Free
          </span>
        </div>

      </div>
    </section>
  );
}
