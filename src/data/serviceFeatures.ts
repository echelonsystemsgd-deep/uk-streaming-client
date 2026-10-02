export interface ServiceStat {
  id: string;
  metric: string;
  label: string;
  sublabel: string;
  iconName: "Tv" | "Clock" | "Zap" | "ShieldCheck" | "Film" | "Smartphone";
  highlight?: boolean;
}

export const SERVICE_STATS: ServiceStat[] = [
  {
    id: "channels",
    metric: "350+",
    label: "Live Channels",
    sublabel: "Hindi, Punjabi, South & Regional",
    iconName: "Tv",
  },
  {
    id: "catchup",
    metric: "7 Days",
    label: "Catch-up TV",
    sublabel: "Automatic Cloud DVR Rewind",
    iconName: "Clock",
  },
  {
    id: "cricket",
    metric: "4K UHD",
    label: "60fps Live Cricket",
    sublabel: "Star & Sony Sports Buffer-Free",
    iconName: "Zap",
  },
  {
    id: "guarantee",
    metric: "100%",
    label: "PayPal Protected",
    sublabel: "7-Day Full Refund Guarantee",
    iconName: "ShieldCheck",
    highlight: true,
  },
];

export interface ChannelCategoryPreview {
  id: string;
  name: string;
  channels: string[];
  popularShow: string;
  sampleCount: string;
}

export const CHANNEL_PREVIEWS: ChannelCategoryPreview[] = [
  {
    id: "hindi",
    name: "Hindi Entertainment",
    channels: ["Star Plus HD", "Zee TV HD", "Sony TV HD", "Colors HD", "Star Bharat"],
    popularShow: "Anupamaa • Kundali Bhagya • The Kapil Sharma Show",
    sampleCount: "85+ Channels",
  },
  {
    id: "sports",
    name: "Live Cricket & Sports",
    channels: ["Star Sports 1 4K", "Star Sports Select HD", "Sony Sports Ten 1-5", "Willow HD"],
    popularShow: "ICC World Cup • IPL • India vs England Live 60fps",
    sampleCount: "25+ Channels",
  },
  {
    id: "punjabi",
    name: "Punjabi & Spiritual",
    channels: ["PTC Punjabi", "Zee Punjabi", "MH One", "Chardikla Time TV", "Live Gurbani"],
    popularShow: "Golden Temple Amritsar Live 24/7 • Punjabi Cinema",
    sampleCount: "35+ Channels",
  },
  {
    id: "south",
    name: "Tamil, Telugu, Malayalam",
    channels: ["Sun TV HD", "Star Maa HD", "Asianet HD", "Zee Telugu", "KTV"],
    popularShow: "Karthika Deepam • Super Singer • Blockbuster Premieres",
    sampleCount: "110+ Channels",
  },
  {
    id: "news",
    name: "Live Indian News",
    channels: ["Aaj Tak HD", "NDTV India", "ABP News", "India Today", "Republic Bharat"],
    popularShow: "Prime Time Debates • Live Delhi & Mumbai Newsroom",
    sampleCount: "45+ Channels",
  },
];

export interface TimeShiftStep {
  step: number;
  ukTime: string;
  istTime: string;
  tag: string;
  headline: string;
  description: string;
  statusText: string;
  statusType: "work" | "transit" | "prime" | "night";
}

export const TIME_SHIFT_STEPS: TimeShiftStep[] = [
  {
    step: 0,
    ukTime: "2:30 PM UK",
    istTime: "8:00 PM IST",
    tag: "India Primetime Broadcasts",
    headline: "India Airs Primetime While You Are at Work in the UK",
    description: "Serials, cricket tosses, and debates air live in Mumbai. Because of the 5.5h UK time lag, you're at the office or the kids are at school.",
    statusText: "Cloud DVR Recording Automatically in Background",
    statusType: "work",
  },
  {
    step: 1,
    ukTime: "6:30 PM UK",
    istTime: "Midnight IST",
    tag: "UK Evening Commute",
    headline: "Indian Live Feeds Switch to Late-Night Infomercials",
    description: "Without catch-up, tuning into Indian TV now means watching infomercials or teleshopping while missing today's major episodes.",
    statusText: "All 350+ Channels Cached to Cloud Servers",
    statusType: "transit",
  },
  {
    step: 2,
    ukTime: "8:00 PM UK",
    istTime: "1:30 AM IST",
    tag: "ChitramTV Catch-Up Magic",
    headline: "Sit Down on the Sofa & Rewind 5.5 Hours Instantly",
    description: "One tap on your remote loads 8:00 PM IST primetime from earlier today in Full HD/4K with zero commercials and crystal audio.",
    statusText: "Instant 1-Click Playback on Firestick & Smart TV",
    statusType: "prime",
  },
  {
    step: 3,
    ukTime: "Weekend / Any Time",
    istTime: "7 Days Back",
    tag: "Full 7-Day Cloud DVR",
    headline: "Missed Last Sunday's Match? Rewind Any Time",
    description: "Every channel is saved continuously for a full 168 hours (7 days). Never rush dinner or miss a milestone cricket century again.",
    statusText: "100% Comprehensive 7-Day History Across All Feeds",
    statusType: "night",
  },
];

export interface HouseholdDevice {
  id: string;
  name: string;
  room: string;
  deviceType: "tv" | "firestick" | "tablet" | "phone";
  currentFeed: string;
  quality: string;
  active: boolean;
}

export const DEFAULT_HOUSEHOLD_DEVICES: HouseholdDevice[] = [
  {
    id: "living-room",
    name: "Living Room 65\" TV",
    room: "Living Room",
    deviceType: "tv",
    currentFeed: "Star Plus HD (Anupamaa)",
    quality: "4K UHD 60fps",
    active: true,
  },
  {
    id: "bedroom",
    name: "Amazon Firestick 4K",
    room: "Master Bedroom",
    deviceType: "firestick",
    currentFeed: "Live Cricket: Star Sports 1",
    quality: "4K UHD 60fps",
    active: true,
  },
  {
    id: "kitchen-tablet",
    name: "iPad Pro / Android Tablet",
    room: "Kitchen / Dining",
    deviceType: "tablet",
    currentFeed: "10,000+ VOD Movie Vault",
    quality: "1080p FHD",
    active: true,
  },
  {
    id: "mobile-phone",
    name: "iPhone / Samsung Galaxy",
    room: "On the Go / Commute",
    deviceType: "phone",
    currentFeed: "PTC Punjabi / Gurbani Live",
    quality: "1080p FHD",
    active: false,
  },
];

export interface TrustPillar {
  title: string;
  highlight: string;
  description: string;
  badge: string;
}

export const TRUST_PILLARS: TrustPillar[] = [
  {
    title: "100% Official PayPal Checkout",
    highlight: "Full Buyer Protection",
    description: "Every pass is processed securely via PayPal Orders v2 with PSD2 Strong Customer Authentication and full dispute protection.",
    badge: "PayPal Verified",
  },
  {
    title: "7-Day Unconditional Money-Back",
    highlight: "Zero Risk Guarantee",
    description: "Test our low-latency UK servers on your home Wi-Fi. If you're not completely delighted, request a prompt full refund.",
    badge: "Risk-Free Trial",
  },
  {
    title: "Dedicated UK CDN Infrastructure",
    highlight: "BT, Sky & Virgin Optimized",
    description: "Direct peering with UK broadband backbones eliminates evening buffer throttling during high-concurrency Sunday cricket.",
    badge: "London Edge Peering",
  },
  {
    title: "Instant 2-Minute Activation",
    highlight: "Automated WhatsApp Delivery",
    description: "Your login credentials and Firestick setup guide are dispatched automatically to your WhatsApp and Email in under 120 seconds.",
    badge: "< 2 Min SLA",
  },
];
