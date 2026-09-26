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
    const popularPlan = PRICING_PLANS.find((p) => p.isPopular) || PRICING_PLANS[2];
    setSelectedPlan(popularPlan);
    setIsModalOpen(true);
  };

  const handleBrowseChannels = () => {
    window.location.href = "/channels";
  };

  const handleExplorePlans = () => {
    window.location.href = "/plans";
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      {/* Persistent Fixed Top Header */}
      <header className="fixed top-0 left-0 right-0 z-50 w-full bg-zinc-950/95 backdrop-blur-md border-b border-border/80 shadow-md">
        <TopBanner />
        <Navbar onSubscribeClick={handleQuickSubscribe} />
      </header>

      {/* Header spacer */}
      <div className="h-[100px] sm:h-[114px]" aria-hidden="true" />

      <main className="flex-1 pb-20 sm:pb-24">
        <HeroSection
          onExplorePlans={handleExplorePlans}
          onBrowseChannels={handleBrowseChannels}
        />
        <ValuePropositionSection />

        {/* Compact Pricing Teaser */}
        <PricingSection onSelectPlan={handleOpenPlan} />

        {/* Compact Channel Carousel */}
        <ChannelShowcaseSection />

        {/* 3-Step Setup Teaser */}
        <HowItWorksSection />

        {/* CTA Banner */}
        <CtaBannerSection onSubscribeClick={handleQuickSubscribe} />

        {/* FAQ Teaser */}
        <FaqSection />

        {/* Contact Teaser */}
        <ContactSection />
      </main>

      <Footer />
      <StickyFooterBar onSubscribeClick={handleQuickSubscribe} />

      <PayPalModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        plan={selectedPlan}
      />
    </div>
  );
}
