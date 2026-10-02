export type ProductCategory = "subscription" | "renewal" | "hardware" | "bundle";

export const HARDWARE_NAME = "ChitramTV Black Edition C1 Box";

export interface CurrencyConfig {
  code: "EUR" | "GBP";
  symbol: "€" | "£";
}

// Single Source of Truth for Catalogue Currency (Confirmed: Localized GBP £)
export const CATALOG_CURRENCY: CurrencyConfig = {
  code: "GBP",
  symbol: "£",
};

export interface PricingPlan {
  id: string;
  sku: string;
  name: string;
  badge?: string;
  price: number;
  currencySymbol: string;
  originalPrice?: number;
  period: string;
  effectiveMonthly: string;
  description: string;
  features: string[];
  isPopular?: boolean;
  isBoxBundle?: boolean;
  isHardwareOnly?: boolean;
  isRenewal?: boolean;
  savings?: string;
  devices: number;
  category: ProductCategory;
}

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: "plan-1m",
    sku: "CTV-SUB-1M",
    name: "1 Month Service",
    price: 14.99,
    currencySymbol: CATALOG_CURRENCY.symbol,
    period: "per month",
    effectiveMonthly: "£14.99",
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
    sku: "CTV-SUB-6M",
    name: "6 Months Subscription",
    badge: "POPULAR PASS",
    price: 59.99,
    currencySymbol: CATALOG_CURRENCY.symbol,
    originalPrice: 74.99,
    period: "for 6 months",
    effectiveMonthly: "£10.00",
    savings: "Save £15 vs monthly",
    description: "Ideal multi-month pass for families wanting steady Indian entertainment across the UK.",
    devices: 3,
    category: "subscription",
    features: [
      "All 350+ Channels + On-Demand Vault",
      "4K Ultra HD & 60fps Live Cricket",
      "7-Day Catch-up TV & Rewind",
      "3 Simultaneous Devices",
      "Amazon Firestick, Apple TV, Smart TV & Mobile",
      "Direct WhatsApp Customer Support Desk",
      "London Low-Latency Edge Delivery",
    ],
  },
  {
    id: "plan-14m",
    sku: "CTV-SUB-14M",
    name: "12+2 Months Service (Android TV & Firestick)",
    badge: "BEST VALUE — 14 MONTHS",
    price: 89.99,
    currencySymbol: CATALOG_CURRENCY.symbol,
    originalPrice: 109.99,
    period: "for 14 months",
    effectiveMonthly: "£6.43",
    savings: "Includes 2 Free Bonus Months",
    isPopular: true,
    description: "Our flagship 14-month annual membership. Unbeatable Indian TV experience at under £1.50/week.",
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
    id: "plan-renewal-14m",
    sku: "CTV-REN-14M",
    name: "ChitramTV Renewal (12+2 Free Months)",
    badge: "EXISTING SUBSCRIBERS",
    price: 89.99,
    currencySymbol: CATALOG_CURRENCY.symbol,
    originalPrice: 109.99,
    period: "for 14 months extension",
    effectiveMonthly: "£6.43",
    savings: "Save £20 + 2 Free Months",
    isRenewal: true,
    category: "renewal",
    description: "Extend your existing subscription without changing equipment or losing saved channels and settings.",
    devices: 4,
    features: [
      "14 Full Months Service Extension (12 + 2 Free)",
      "Keep Existing Account Number & Setup",
      "Zero Interruption to Live Channels & Catch-up",
      "Fast Activation via Account ID or MAC Address",
      "Works on ChitramTV Box, Firestick & Android TV",
      "Priority WhatsApp Support for Active Members",
    ],
  },
  {
    id: "plan-c1-box-only",
    sku: "CTV-HW-C1",
    name: "ChitramTV Box Only",
    badge: "HARDWARE ONLY",
    price: 59.99,
    currencySymbol: CATALOG_CURRENCY.symbol,
    originalPrice: 79.99,
    period: "one-off hardware",
    effectiveMonthly: "Hardware only",
    savings: "Save £20 (25% Off)",
    isHardwareOnly: true,
    category: "hardware",
    description: "Official standalone ChitramTV Black Edition C1 Box powered by Android 14. Ideal if you already have an active subscription.",
    devices: 1,
    features: [
      "ChitramTV Black Edition C1 Box",
      "Latest Android 14 Framework (Up to 2x Faster)",
      "Premium ChitramTV Bluetooth Remote Included",
      "HDR10+ Ultra-Realistic Visuals",
      "Pre-installed Apps: Netflix, Prime Video, YouTube, Chrome",
      "Google Play Store Integration",
      "HDMI Cable & UK Power Adapter Included",
      "1-Year Hardware Replacement Warranty",
      "14-Day Faulty Return Window",
    ],
  },
  {
    id: "plan-c1-bundle",
    sku: "CTV-BND-C1-1YR",
    name: "ChitramTV Box + 1 Year Service Bundle",
    badge: "BOX + 1 YEAR BUNDLE",
    price: 109.99,
    currencySymbol: CATALOG_CURRENCY.symbol,
    originalPrice: 139.99,
    period: "complete bundle",
    effectiveMonthly: "Includes 12M Pass",
    savings: "Save £30 (21% Off)",
    isBoxBundle: true,
    category: "bundle",
    description: "Complete all-in-one entertainment package: ChitramTV Black Edition C1 Box bundled with a full 1-year subscription pass.",
    devices: 4,
    features: [
      "ChitramTV Black Edition C1 Box Included",
      "12 Full Months Subscription Pass Included",
      "Android 14 Framework with Bluetooth Remote",
      "HDR10+ Ultra HD Streaming & 7-Day Catch-up",
      "Pre-installed Netflix, YouTube, Prime & Chrome",
      "Zero Configuration: Plug & Play HDMI Connection",
      "Tracked Courier Delivery across the UK",
      "1-Year Hardware Replacement Warranty",
      "14-Day Faulty Return Window",
    ],
  },
];
