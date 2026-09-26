"use client";

import React, { createContext, useContext, useState } from "react";
import { TopBanner } from "@/components/layout/TopBanner";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { StickyFooterBar } from "@/components/layout/StickyFooterBar";
import { PayPalModal } from "@/components/checkout/PayPalModal";
import { PRICING_PLANS, PricingPlan } from "@/data/plans";

interface SiteShellContextType {
  openPlan: (plan: PricingPlan) => void;
  quickSubscribe: () => void;
}

const SiteShellContext = createContext<SiteShellContextType>({
  openPlan: () => {},
  quickSubscribe: () => {},
});

export const useSiteShell = () => useContext(SiteShellContext);

interface SiteShellProps {
  children: React.ReactNode;
}

export function SiteShell({ children }: SiteShellProps) {
  const [selectedPlan, setSelectedPlan] = useState<PricingPlan | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const quickSubscribe = () => {
    const popularPlan = PRICING_PLANS.find((p) => p.isPopular) || PRICING_PLANS[2];
    setSelectedPlan(popularPlan);
    setIsModalOpen(true);
  };

  const openPlan = (plan: PricingPlan) => {
    setSelectedPlan(plan);
    setIsModalOpen(true);
  };

  return (
    <SiteShellContext.Provider value={{ openPlan, quickSubscribe }}>
      <div className="min-h-screen flex flex-col bg-background text-foreground">
        {/* Persistent Fixed Top Header — pinned across all pages */}
        <header className="fixed top-0 left-0 right-0 z-50 w-full bg-zinc-950/95 backdrop-blur-md border-b border-border/80 shadow-md">
          <TopBanner />
          <Navbar onSubscribeClick={quickSubscribe} />
        </header>

        {/* Spacer matching header height */}
        <div className="h-[100px] sm:h-[114px]" aria-hidden="true" />

        {/* Page Content */}
        <main className="flex-1 pb-20 sm:pb-24">{children}</main>

        <Footer />

        <StickyFooterBar onSubscribeClick={quickSubscribe} />

        <PayPalModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          plan={selectedPlan}
        />
      </div>
    </SiteShellContext.Provider>
  );
}
