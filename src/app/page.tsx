"use client";

import React, { useState } from "react";
import { TopBanner } from "@/components/layout/TopBanner";
import { Navbar } from "@/components/layout/Navbar";
import { StickyFooterBar } from "@/components/layout/StickyFooterBar";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { ValuePropositionSection } from "@/components/sections/ValuePropositionSection";
import { PricingSection } from "@/components/sections/PricingSection";
import { ChannelShowcaseSection } from "@/components/sections/ChannelShowcaseSection";
import { HowItWorksSection } from "@/components/sections/HowItWorksSection";
import { FaqSection } from "@/components/sections/FaqSection";
import { CtaBannerSection } from "@/components/sections/CtaBannerSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { PayPalModal } from "@/components/checkout/PayPalModal";
import { PRICING_PLANS, PricingPlan } from "@/data/plans";

export default function HomePage() {
  const [selectedPlan, setSelectedPlan] = useState<PricingPlan | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenPlan = (plan: PricingPlan) => {
    setSelectedPlan(plan);
    setIsModalOpen(true);
  };

  const handleQuickSubscribe = () => {
    // Default to the most popular 12 Months + 2 Free plan
    const popularPlan = PRICING_PLANS.find((p) => p.isPopular) || PRICING_PLANS[2];
    setSelectedPlan(popularPlan);
    setIsModalOpen(true);
  };

  const handleBrowseChannels = () => {
    const el = document.getElementById("channels");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleExplorePlans = () => {
    const el = document.getElementById("plans");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      {/* Persistent Fixed Top Header (Pinned across all scroll depths) */}
      <header className="fixed top-0 left-0 right-0 z-50 w-full bg-zinc-950/95 backdrop-blur-md border-b border-border/80 shadow-md">
        <TopBanner />
        <Navbar onSubscribeClick={handleQuickSubscribe} />
      </header>

      {/* Header spacer to guarantee zero hero clipping */}
      <div className="h-[100px] sm:h-[114px]" aria-hidden="true" />

      {/* Main Page Flow Matching Reference Competitor Structure */}
      <main className="flex-1 pb-16 sm:pb-20">
        {/* 1. Hero Section */}
        <HeroSection
          onExplorePlans={handleExplorePlans}
          onBrowseChannels={handleBrowseChannels}
        />

        {/* 2. Value Proposition (6 Core UK Diaspora Pillars) */}
        <ValuePropositionSection />

        {/* 3. Plans & Pricing (4 GBP Subscription Passes) */}
        <PricingSection onSelectPlan={handleOpenPlan} />

        {/* 4. Channels & Content Showcase (350+ Multilingual Streams) */}
        <ChannelShowcaseSection />

        {/* 5. 3-Step Setup Guide (Firestick / Smart TV) */}
        <HowItWorksSection />

        {/* 6. Subscribe Call to Action Banner */}
        <CtaBannerSection onSubscribeClick={handleQuickSubscribe} />

        {/* 7. Frequently Asked Questions (Accordion) */}
        <FaqSection />

        {/* 8. UK Support & Contact Desk */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating Sticky Conversion and Support Footer Bar */}
      <StickyFooterBar onSubscribeClick={handleQuickSubscribe} />

      {/* PayPal Hosted Checkout Modal */}
      <PayPalModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        plan={selectedPlan}
      />
    </div>
  );
}
