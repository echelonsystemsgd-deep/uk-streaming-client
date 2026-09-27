"use client";

import React from "react";
import { SiteShell, useSiteShell } from "@/components/layout/SiteShell";
import { HeroSection } from "@/components/sections/HeroSection";
import { ValuePropositionSection } from "@/components/sections/ValuePropositionSection";
import { PricingSection } from "@/components/sections/PricingSection";
import { ChannelShowcaseSection } from "@/components/sections/ChannelShowcaseSection";
import { HowItWorksSection } from "@/components/sections/HowItWorksSection";
import { FaqSection } from "@/components/sections/FaqSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { CtaBannerSection } from "@/components/sections/CtaBannerSection";
import { ContactSection } from "@/components/sections/ContactSection";

function HomeContent() {
  const { openPlan, quickSubscribe } = useSiteShell();

  return (
    <>
      <HeroSection />
      <ValuePropositionSection />

      {/* Compact Pricing Teaser */}
      <PricingSection onSelectPlan={openPlan} />

      {/* Compact Channel Carousel */}
      <ChannelShowcaseSection />

      {/* 3-Step Setup Teaser */}
      <HowItWorksSection />

      {/* UK Customer Testimonials & Reviews */}
      <TestimonialsSection />

      {/* CTA Banner */}
      <CtaBannerSection onSubscribeClick={quickSubscribe} />

      {/* FAQ Teaser */}
      <FaqSection />

      {/* Contact Teaser */}
      <ContactSection />
    </>
  );
}

export default function HomePage() {
  return (
    <SiteShell>
      <HomeContent />
    </SiteShell>
  );
}
