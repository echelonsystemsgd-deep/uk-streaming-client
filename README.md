# ChitramTV UK — Premium Live Indian TV & 4K Streaming

High-performance, conversion-optimized Next.js 14 client platform engineered for British Indian households. Delivers 350+ live Indian television channels, live cricket in 4K UHD 60fps, and automatic 7-day catch-up TV tailored for the UK timezone.

Engineered and built with enterprise-grade infrastructure by [mercianwealth.com](https://mercianwealth.com).

---

## 🚀 Key Features

- **ChitramTV Rebranding & Visual Polish**:
  - Full diaspora brand alignment matching [chitramtv.eu](https://chitramtv.eu/) specifications.
  - Eliminated legacy "vibecoded" artifacts (no fake cockpit pills, no arbitrary macOS dots).
  - Cohesive dark zinc (`#09090b`) and signature cinema crimson (`#E50914`) palette.
  - Strict 8px rem-based grid and spacing system built upon shadcn/ui.

- **Persistent Fixed Header Dock**:
  - Top trust bar (7-day money-back guarantee, UK catch-up notice, direct UK telephone & WhatsApp support).
  - Full navigation menu, client portal link, and "Subscribe Now" CTA pinned to the top of the viewport across all scroll depths.

- **Moving Channel Showcase Carousel**:
  - Dual-row infinite moving marquee carousel showcasing featured channels (Star Plus, Zee TV, Sony SET, Sky Sports Cricket, Star Sports 1 4K, PTC Punjabi, Sun TV, etc.).
  - Interactive pause-on-hover functionality with manual Left/Right controls and category filtering (Entertainment, Movies, Sports, Punjabi, South Indian, News).
  - Cleaned horizontal scrollbars (`scrollbar-none`) with cinematic edge gradient fading.

- **Intelligent Bottom Conversion Dock (`StickyFooterBar`)**:
  - Fixed conversion bar highlighting the **"Best Value: £7.14/mo (12+2 Free Months)"** subscription pass.
  - Quick WhatsApp chat trigger and direct PayPal subscription CTA.
  - **Auto-Hide at Footer**: Automatically slides out of view when the user reaches the footer (preventing overlap with footer links and Mercian Wealth credibility credits) and smoothly slides back in when scrolling up.

- **Hosted PayPal Checkout & Instant Dispatch**:
  - Modal checkout integrating official PayPal smart buttons with live GBP currency conversion.
  - Direct 24/7 automated credential dispatch via email and WhatsApp.

---

## 🛠️ Tech Stack & Architecture

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router, Static Generation)
- **Language**: TypeScript 5
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) with custom 8px rem grid tokens
- **Component Primitives**: [shadcn/ui](https://ui.shadcn.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Payment Processing**: [@paypal/react-paypal-js](https://github.com/paypal/react-paypal-js)

---

## 📁 Project Directory Structure

```text
uk-streaming-client/
├── Public/
│   └── assets/client/
│       ├── logo.svg               # ChitramTV UK vector SVG brandmark
│       └── favicon.svg            # Favicon vector
├── src/
│   ├── app/
│   │   ├── globals.css            # Dark theme HSL tokens, dark scrollbars, animations
│   │   ├── layout.tsx             # Root layout, metadata & typography
│   │   └── page.tsx               # Main landing page with fixed header & smart dock
│   ├── components/
│   │   ├── checkout/
│   │   │   └── PayPalModal.tsx    # Hosted PayPal subscription checkout
│   │   ├── layout/
│   │   │   ├── Footer.tsx         # Comprehensive site footer & Mercian Wealth credit
│   │   │   ├── Navbar.tsx         # Desktop and mobile navigation bar
│   │   │   ├── StickyFooterBar.tsx# Intelligent footer dock (auto-hides at footer)
│   │   │   └── TopBanner.tsx      # UK trust & contact strip
│   │   ├── sections/
│   │   │   ├── ChannelShowcaseSection.tsx # Moving dual-direction channel carousel
│   │   │   ├── ContactSection.tsx         # UK telephone helpline & ticket desk
│   │   │   ├── CtaBannerSection.tsx       # Bottom high-conversion callout
│   │   │   ├── FaqSection.tsx             # Accordion FAQ for UK setup & legalities
│   │   │   ├── HeroSection.tsx            # Smart TV cricket live broadcast frame
│   │   │   ├── HowItWorksSection.tsx      # 3-step Firestick / Smart TV setup guide
│   │   │   ├── PricingSection.tsx         # 4 GBP subscription passes (1, 6, 14 mo, box)
│   │   │   └── ValuePropositionSection.tsx# 6 diaspora core value drivers
│   │   └── ui/                    # Reusable shadcn/ui components (card, button, badge)
│   └── data/
│       ├── channels.ts            # 350+ channel metadata, categories, quality specs
│       ├── faqs.ts                # UK streaming FAQs & answers
│       └── plans.ts               # GBP pricing plans & feature matrices
├── tailwind.config.js             # Rem grid system, marquee keyframes, dark tokens
└── README.md
```

---

## 🏃 Getting Started

### Prerequisites

- Node.js 18.17+ or Node.js 20+
- npm or pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/echelonsystemsgd-deep/uk-streaming-client.git
cd uk-streaming-client

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
npm run build
npm run start
```

---

## 🔒 Security & Credibility

- Built and maintained with secure streaming infrastructure by [mercianwealth.com](https://mercianwealth.com).
- Full HTTPS SSL encryption across all order and webhook pathways.
- 100% PayPal Buyer Protection enabled on all GBP subscription plans.
