export interface PricingPlan {
  id: string;
  name: string;
  badge?: string;
  price: number; // in GBP £
  originalPrice?: number;
  period: string;
  effectiveMonthly: string;
  description: string;
  features: string[];
  isPopular?: boolean;
  isBoxBundle?: boolean;
  savings?: string;
  devices: number;
  paypalPlanId?: string;
}

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: "plan-1m",
    name: "1 Month Pass",
    price: 14.99,
    period: "per month",
    effectiveMonthly: "£14.99",
    description: "Ideal flexible trial to experience our buffer-free UK streaming network.",
    devices: 2,
    features: [
      "350+ Live Indian TV Channels",
      "10,000+ Bollywood & Regional Movies",
      "Full HD 1080p Resolution",
      "7-Day Catch-up TV (No missed shows)",
      "2 Simultaneous Devices",
      "Compatible with Firestick, Android TV & Phone",
      "Instant Activation in under 2 minutes",
    ],
  },
  {
    id: "plan-6m",
    name: "6 Months Pass",
    badge: "SAVE 33%",
    price: 59.99,
    originalPrice: 89.94,
    period: "for 6 months",
    effectiveMonthly: "£10.00",
    savings: "Save £29.95 vs monthly",
    description: "Popular choice for families wanting steady Indian entertainment all season.",
    devices: 3,
    features: [
      "All 350+ Channels + On-Demand Vault",
      "4K Ultra HD & 60fps Live Cricket",
      "7-Day Catch-up & 48-Hour Rewind",
      "3 Simultaneous Devices",
      "Amazon Firestick, Apple TV, Smart TV & Mobile",
      "Priority UK WhatsApp Customer Support",
      "Zero Buffer UK Dedicated Edge Delivery",
    ],
  },
  {
    id: "plan-12m",
    name: "12 Months + 2 Free",
    badge: "MOST POPULAR — SAVE 52%",
    price: 99.99,
    originalPrice: 209.86,
    period: "for 14 months",
    effectiveMonthly: "£7.14",
    savings: "Includes 2 Free Bonus Months",
    isPopular: true,
    description: "Our best value annual membership. Unbeatable Indian TV experience at under £1.70/week.",
    devices: 4,
    features: [
      "14 Full Months of Service (12 + 2 Free)",
      "Complete 350+ Multilingual Channel Lineup",
      "Full 4K Ultra HD + HDR10 + Dolby Audio",
      "7-Day Catch-up TV across all major channels",
      "4 Simultaneous Devices for the whole home",
      "VIP Fast-Track UK Support (WhatsApp & Phone)",
      "Free Cloud Recording & Electronic Program Guide",
      "100% Satisfaction 7-Day Money-Back Guarantee",
    ],
  },
  {
    id: "plan-box",
    name: "4K Box + 12M Bundle",
    badge: "PLUG & PLAY HARDWARE",
    price: 139.99,
    originalPrice: 249.99,
    period: "one-off package",
    effectiveMonthly: "Includes 14M Service",
    isBoxBundle: true,
    description: "Pre-configured dedicated 4K Android TV set-top box delivered to your UK address + 14 months service.",
    devices: 4,
    features: [
      "High-Performance 4K Quad-Core IPTV Box",
      "Pre-installed ChitramTV App (Zero setup required)",
      "Ergonomic Backlit Bluetooth Remote Control",
      "High-Speed HDMI Cable & UK Power Adapter Included",
      "Includes 14 Months Full Subscription (12 + 2 Free)",
      "Free UK Royal Mail Tracked 24 Delivery",
      "1-Year Hardware Replacement Warranty",
    ],
  },
];
