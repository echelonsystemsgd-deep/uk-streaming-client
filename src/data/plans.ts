export type ProductCategory = "subscription" | "renewal" | "hardware" | "bundle";

export const HARDWARE_NAME = "ChitramTV Black Edition C1 Box";
export const COMPANY_NAME = "Shiva Technology Ltd";
export const BRAND_NAME = "ChitramTV UK";
export const HELPLINE_PHONE = "07979637777";
export const WHATSAPP_PHONE = "07979637777";

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
  image: string;
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
    id: "plan-14m",
    sku: "CTV-SUB-14M",
    name: "Watch on Your Android TV & Firestick 12 + 2 Months Service",
    image: "/products/14months.webp",
    badge: "BEST VALUE — 14 MONTHS",
    price: 89.99,
    currencySymbol: CATALOG_CURRENCY.symbol,
    originalPrice: 109.99,
    period: "for 14 months",
    effectiveMonthly: "£6.43",
    savings: "Includes 2 Free Months",
    isPopular: true,
    description: "Our flagship 14-month annual membership. Over 500 live Indian TV channels with 14-day catch-up and 4 simultaneous streams.",
    devices: 4,
    category: "subscription",
    features: [
      "14 Full Months of Service (12 + 2 Free)",
      "500+ Multilingual Indian TV Channels",
      "Full 4K Ultra HD & 60fps Sports Streaming",
      "Automatic 14-Day Catch-up TV & Recording",
      "4 Simultaneous Devices for the whole home",
      "Watch on Firestick, Android TV, Smart TV & Mobile",
      "Priority WhatsApp Customer Service: 07979637777",
      "Instant Activation in under 2 minutes",
    ],
  },
  {
    id: "plan-1m",
    sku: "CTV-SUB-1M",
    name: "ChitramTV 1 Month Service",
    image: "/products/1month.webp",
    price: 14.99,
    currencySymbol: CATALOG_CURRENCY.symbol,
    period: "per month",
    effectiveMonthly: "£14.99",
    description: "Flexible zero-commitment monthly trial pass with 500+ live channels, 10,000+ movies, and 14-day catch-up.",
    devices: 2,
    category: "subscription",
    features: [
      "500+ Live Indian TV Channels",
      "Automatic 14-Day Catch-up TV",
      "Full HD 1080p Resolution",
      "2 Simultaneous Devices",
      "Firestick, Android TV, Smart TV & Mobile",
      "Instant Activation in under 2 minutes",
      "No Contract & Zero Cancellation Fees",
    ],
  },
  {
    id: "plan-c1-bundle",
    sku: "CTV-BND-C1-1YR",
    name: "Chitramtv Box + 1 Year Service",
    image: "/products/box-bundle.png",
    badge: "BOX + 1 YEAR BUNDLE",
    price: 109.99,
    currencySymbol: CATALOG_CURRENCY.symbol,
    originalPrice: 139.99,
    period: "complete bundle",
    effectiveMonthly: "Includes 12M Pass",
    savings: "Save £30 (21% Off)",
    isBoxBundle: true,
    category: "bundle",
    description: "Complete turnkey entertainment pack: Official ChitramTV Android 14 C1 4K Box bundled with a full 1-year subscription pass.",
    devices: 4,
    features: [
      "Official ChitramTV Black Edition C1 Box Included",
      "12 Full Months Subscription Pass Included",
      "Android 14 Framework with Bluetooth Remote",
      "HDR10+ 4K Ultra HD & 14-Day Catch-up TV",
      "Pre-installed Netflix, YouTube, Prime & Chrome",
      "Zero Configuration: Plug & Play HDMI Connection",
      "Tracked UK Courier Delivery via Shiva Technology Ltd",
      "1-Year Hardware Replacement Warranty",
      "14-Day Return Window",
    ],
  },
  {
    id: "plan-renewal-14m",
    sku: "CTV-REN-14M",
    name: "Chitramtv Renewal 12 + 2 Free Months",
    image: "/products/renewal.webp",
    badge: "EXISTING SUBSCRIBERS",
    price: 89.99,
    currencySymbol: CATALOG_CURRENCY.symbol,
    originalPrice: 109.99,
    period: "for 14 months extension",
    effectiveMonthly: "£6.43",
    savings: "Save £20 + 2 Free Months",
    isRenewal: true,
    category: "renewal",
    description: "Extend your existing ChitramTV subscription with zero service disruption. Keep your account number and saved channel favorites.",
    devices: 4,
    features: [
      "14 Full Months Service Extension (12 + 2 Free)",
      "Keep Existing Account Number & Setup",
      "Zero Interruption to Live Channels & 14-Day Catch-up",
      "Fast Activation via Account ID or MAC Address",
      "Works on ChitramTV Box, Firestick & Android TV",
      "Priority UK Support Helpline: 07979637777",
    ],
  },
  {
    id: "plan-6m",
    sku: "CTV-SUB-6M",
    name: "ChitramTV 6 Months Subscription",
    image: "/products/6months.webp",
    badge: "POPULAR PASS",
    price: 59.99,
    currencySymbol: CATALOG_CURRENCY.symbol,
    originalPrice: 74.99,
    period: "for 6 months",
    effectiveMonthly: "£10.00",
    savings: "Save £15 vs monthly",
    description: "Ideal multi-month pass for families wanting steady Indian entertainment across the UK with 14-day catch-up.",
    devices: 3,
    category: "subscription",
    features: [
      "All 500+ Channels + 10,000+ On-Demand Movies",
      "4K Ultra HD & 60fps Live Cricket",
      "14-Day Catch-up TV & Rewind",
      "3 Simultaneous Devices",
      "Amazon Firestick, Apple TV, Smart TV & Mobile",
      "Direct UK Support Desk: 07979637777",
      "London Low-Latency Edge Relay Delivery",
    ],
  },
  {
    id: "plan-c1-box-only",
    sku: "CTV-HW-C1",
    name: "Chitramtv Box Only",
    image: "/products/box-only.png",
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
      "Official ChitramTV Black Edition C1 Box",
      "Latest Android 14 Framework (Up to 2x Faster)",
      "Premium ChitramTV Bluetooth Remote Included",
      "HDR10+ Ultra-Realistic 4K Visuals",
      "Pre-installed Apps: Netflix, Prime Video, YouTube, Chrome",
      "Google Play Store Integration",
      "HDMI Cable & 3-Pin UK Power Adapter Included",
      "1-Year Hardware Replacement Warranty",
      "14-Day Faulty Return Window",
    ],
  },
];
