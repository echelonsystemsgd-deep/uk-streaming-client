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
import { JsonLd } from "@/components/seo/JsonLd";

const homeJsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "ChitramTV UK",
    "url": "https://chitramtv.eu",
    "description": "Stream 350+ live Indian TV channels, live cricket in 4K UHD, and 10,000+ movies on Smart TV, Firestick, Mobile & PC across the UK.",
    "publisher": {
      "@type": "Organization",
      "name": "ChitramTV UK",
      "url": "https://chitramtv.eu",
      "logo": "https://chitramtv.eu/assets/client/logo.svg"
    }
  },
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "ChitramTV UK",
    "url": "https://chitramtv.eu",
    "logo": "https://chitramtv.eu/assets/client/logo.svg",
    "description": "Dedicated UK Indian television streaming provider with 350+ live channels and 7-day catch-up TV.",
    "telephone": "+31620897414",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+31620897414",
      "contactType": "customer service",
      "availableLanguage": ["English", "Hindi", "Punjabi"]
    }
  }
];

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
      <JsonLd data={homeJsonLd} />
      <HomeContent />
    </SiteShell>
  );
}
