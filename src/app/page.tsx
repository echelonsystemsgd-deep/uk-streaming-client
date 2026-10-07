"use client";

import React from "react";
import { useSiteShell } from "@/components/layout/SiteShell";
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
    "url": "https://chitramtv.uk",
    "description": "Stream 500+ live Indian TV channels, live cricket in 4K UHD, and 10,000+ movies on Smart TV, Firestick, Mobile & PC across the UK with 14 Days Catch-Up TV.",
    "publisher": {
      "@type": "Organization",
      "name": "Shiva Technology Ltd",
      "url": "https://chitramtv.uk",
      "logo": "/Logo.png"
    }
  },
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "ChitramTV UK (Shiva Technology Ltd)",
    "url": "https://chitramtv.uk",
    "logo": "/Logo.png",
    "description": "Dedicated UK Indian television streaming provider with 500+ live channels and 14-day catch-up TV.",
    "telephone": "07979637777",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "07979637777",
      "contactType": "customer service",
      "availableLanguage": ["English", "Hindi", "Punjabi"]
    }
  }
];

export default function HomePage() {
  const { openPlan, quickSubscribe } = useSiteShell();

  return (
    <>
      <JsonLd data={homeJsonLd} />
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
