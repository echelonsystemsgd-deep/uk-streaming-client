export type ProductCategory = "subscription" | "hardware" | "bundle" | "pending";

export interface PricingPlan {
  id: string;
  name: string;
  badge?: string;
  price: number; // in EUR €
  currencySymbol: string;
  originalPrice?: number;
  period: string;
  effectiveMonthly: string;
  description: string;
  features: string[];
  isPopular?: boolean;
  isBoxBundle?: boolean;
  isHardwareOnly?: boolean;
  isPendingCatalogue?: boolean;
  savings?: string;
  devices: number;
  category: ProductCategory;
  whatsappUrl?: string;
}

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: "plan-1m",
    name: "1 Month Service",
    price: 15.00,
    currencySymbol: "€",
    period: "per month",
    effectiveMonthly: "€15.00",
    description: "Flexible trial to experience 350+ live channels and 7-day catch-up with zero commitment.",
    devices: 2,
    category: "subscription",
    features: [
      "350+ Live Indian TV Channels",
      "Automatic 7-Day Catch-up TV",
      "Full HD 1080p Resolution",
      "2 Simultaneous Devices",
      "Firestick, Android TV, Smart TV & Mobile",
      "Instant Activation in under 2 minutes",
    ],
  },
  {
    id: "plan-6m",
    name: "6 Months Service",
    badge: "POPULAR PASS",
    price: 69.00,
    currencySymbol: "€",
    originalPrice: 90.00,
    period: "for 6 months",
    effectiveMonthly: "€11.50",
    savings: "Save €21 vs monthly",
    description: "Ideal multi-month pass for families wanting steady entertainment across Europe and the UK.",
    devices: 3,
    category: "subscription",
    features: [
      "All 350+ Channels + On-Demand Vault",
      "4K Ultra HD & 60fps Live Cricket",
      "7-Day Catch-up TV & Rewind",
      "3 Simultaneous Devices",
      "Amazon Firestick, Apple TV, Smart TV & Mobile",
      "Direct WhatsApp Customer Support Desk",
      "High-Speed European Edge Delivery",
    ],
  },
  {
    id: "plan-14m",
    name: "14 Months Service",
    badge: "BEST VALUE — 14 MONTHS",
    price: 109.00,
    currencySymbol: "€",
    originalPrice: 210.00,
    period: "for 14 months",
    effectiveMonthly: "€7.78",
    savings: "Includes 2 Free Bonus Months",
    isPopular: true,
    description: "Our flagship 14-month annual membership. Unbeatable Indian TV experience at under €1.80/week.",
    devices: 4,
    category: "subscription",
    features: [
      "14 Full Months of Service (12 + 2 Bonus)",
      "Complete 350+ Multilingual Channel Lineup",
      "Full 4K Ultra HD + HDR10 Streams",
      "7-Day Catch-up across all major channels",
      "4 Simultaneous Devices for the whole home",
      "Priority WhatsApp Customer Service",
      "Free Cloud Recording & Electronic Program Guide",
      "7-Day Money-Back Guarantee",
    ],
  },
  {
    id: "plan-firestick-14m",
    name: "Firestick & Android TV (12+2 Pass)",
    badge: "SMART TV & FIRESTICK",
    price: 109.00,
    currencySymbol: "€",
    originalPrice: 210.00,
    period: "for 14 months",
    effectiveMonthly: "€7.78",
    savings: "Optimized for Android & Fire TV",
    description: "Specialized 14-month digital pass tailored for Amazon Fire TV Stick and Android TV OS devices.",
    devices: 4,
    category: "subscription",
    features: [
      "14 Full Months (12+2 Free Months Included)",
      "One-Click Setup via Downloader App",
      "Optimized for Firestick 4K / Max & Google TV",
      "350+ Live Channels with 7-Day Catch-up",
      "4 Simultaneous Screens",
      "Fast Credential Dispatch via WhatsApp & Email",
    ],
  },
  {
    id: "plan-dune-bundle",
    name: "Dune HD Classic Box + 1 Year Service",
    badge: "HARDWARE + SERVICE BUNDLE",
    price: 129.00,
    currencySymbol: "€",
    originalPrice: 198.00,
    period: "complete bundle",
    effectiveMonthly: "Includes 12M Pass",
    isBoxBundle: true,
    description: "Pre-configured Dune HD Classic set-top box bundled with 12 months full ChitramTV subscription.",
    devices: 4,
    category: "bundle",
    features: [
      "Dune HD Classic High-Performance IPTV Box",
      "Pre-loaded ChitramTV Software (Zero configuration)",
      "Dedicated Ergonomic Remote Control Included",
      "Includes 12 Months Full Subscription",
      "HDMI Cable & European/UK Power Supply Included",
      "1-Year Hardware Replacement Warranty",
    ],
  },
  {
    id: "plan-dune-box-only",
    name: "Dune HD Classic Box Only",
    badge: "HARDWARE ONLY",
    price: 69.00,
    currencySymbol: "€",
    period: "one-off hardware",
    effectiveMonthly: "Hardware only",
    isHardwareOnly: true,
    description: "Official standalone Dune HD Classic set-top box. Ideal if you already hold an active subscription.",
    devices: 1,
    category: "hardware",
    features: [
      "Official Dune HD Classic IPTV Media Receiver",
      "ChitramTV Firmware Ready",
      "Remote Control, HDMI & Power Adapter Included",
      "Hardware Only (No Subscription Pass Included)",
      "Fast Tracked Courier Dispatch",
      "1-Year Manufacturer Warranty",
    ],
  },
  {
    id: "plan-pending-catalogue",
    name: "Explore 6 More WhatsApp Catalogue Items",
    badge: "CATALOGUE SLOTS",
    price: 0,
    currencySymbol: "€",
    period: "ask via WhatsApp",
    effectiveMonthly: "Custom options",
    isPendingCatalogue: true,
    whatsappUrl: "https://wa.me/31620897414?text=Hi%20ChitramTV%2C%20I%20would%20like%20to%20inquire%20about%20your%20additional%20catalogue%20plans%20and%20hardware%20options.",
    description: "We have 6 additional specialised hardware accessories and custom passes in our official WhatsApp catalogue.",
    devices: 0,
    category: "pending",
    features: [
      "Replacement Remote Controls & Power Units",
      "Multi-Room Additional Screen Add-ons",
      "Specialised International Broadcast Feeds",
      "Custom Multi-Year Enterprise Packages",
      "Direct 1-on-1 Consultation with Linus Media",
    ],
  },
];
