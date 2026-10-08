"use client";

import React, { createContext, useContext, useState } from "react";
import { TopBanner } from "@/components/layout/TopBanner";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { StickyFooterBar } from "@/components/layout/StickyFooterBar";
import { PayPalModal } from "@/components/checkout/PayPalModal";
import { PRICING_PLANS, PricingPlan } from "@/data/plans";
import { CartProvider } from "@/context/CartContext";
import { CartDrawer } from "@/components/cart/CartDrawer";

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
    const popularPlan = PRICING_PLANS.find((p) => p.isPopular) || PRICING_PLANS[0];
    setSelectedPlan(popularPlan);
    setIsModalOpen(true);
  };

  const openPlan = (plan: PricingPlan) => {
    setSelectedPlan(plan);
    setIsModalOpen(true);
  };

  return (
    <CartProvider>
      <SiteShellContext.Provider value={{ openPlan, quickSubscribe }}>
        <div className="min-h-screen flex flex-col bg-[#f4f6f8] text-gray-900">
          {/* Header */}
          <TopBanner />
          <Navbar onSubscribeClick={quickSubscribe} />

          {/* Page Content */}
          <main className="flex-1 pb-16">{children}</main>

          <Footer />

          <StickyFooterBar onSubscribeClick={quickSubscribe} />

          <CartDrawer />

          <PayPalModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            plan={selectedPlan}
          />
        </div>
      </SiteShellContext.Provider>
    </CartProvider>
  );
}
