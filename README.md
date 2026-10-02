# ChitramTV UK — Premium Live Indian TV & 4K Streaming

High-performance, multi-page Next.js 14 streaming portal engineered for British Indian households. Delivers 350+ live Indian television channels, live cricket in 4K UHD 60fps, and automatic 7-day catch-up TV tailored for the UK timezone.

Engineered and built with enterprise-grade infrastructure by [mercianwealth](https://mercianwealth.com).

---

## 🚀 Key Architectural Highlights

### 1. Multi-Page Architecture
The portal features a streamlined high-converting homepage teaser backed by 6 dedicated deep-dive subpages:
- **`/` (Homepage)**: High-impact summary hub with smart TV live cricket simulator, moving channel carousel teaser, compact pricing preview, and clear navigation pathways to full sections.
- **`/channels`**: Complete 350+ channel directory with live search, multi-language dialect tabs (Hindi, Punjabi, Tamil, Telugu, Malayalam, English), genre filters, quality toggles (4K UHD vs 1080p HD), and 7-day EPG catch-up guide.
- **`/plans`**: Transparent pricing matrix featuring the 6 verified SKUs matching the European live catalogue: 1 Month Service, 6 Months Subscription, 12+2 Months Service (Flagship Pass), ChitramTV Renewal (12+2 Free Months with dedicated existing customer account lookup), ChitramTV Black Edition C1 Box Only (Android 14 framework), and ChitramTV Box + 1 Year Service Bundle. Includes side-by-side feature comparison table, mobile-first category filter tabs, 1-Year Hardware Replacement Warranty, and 14-Day Return Window.
- **`/setup-guide`**: Step-by-step 3-minute installation instructions with an interactive device switcher (Amazon Fire TV Stick, Android & Google TV, Samsung Tizen, LG webOS, Apple TV, PC/Mac) and UK ISP compatibility matrix (BT Smart Hub, Virgin Media Hub 3/4/5, Sky Broadband Shield, Vodafone, TalkTalk, EE).
- **`/why-us`**: The British Indian diaspora story, detailing how ChitramTV bridges the 5.5-hour India-to-UK time gap, London Docklands low-latency edge CDN relays, UK geographic coverage hubs, and security audits by mercianwealth.com.
- **`/faq`**: Comprehensive 24/7 help center with real-time search, category filters (Setup, Billing, Catch-Up, Broadband), custom accordion, and direct escalation to WhatsApp & phone.
- **`/contact`**: UK customer support desk with direct WhatsApp 24/7 desk, UK phone helpline (020 7946 0912), live operating hours, interactive ticket form, and dispatch tracking.

---

### 2. SEO, AEO & GEO Optimization
- **SEO (Search Engine Optimization)**:
  - Route-specific dynamic metadata titles and descriptions localized for the UK.
  - Native `sitemap.ts` and `robots.ts` dynamically generated via Next.js 14 App Router.
  - Fast Core Web Vitals (LCP < 1.2s, CLS = 0) with full static prerendering (`12/12` pages).
- **AEO (Answer Engine Optimization)**:
  - Structured JSON-LD schemas embedded across every route for citation by AI engines (ChatGPT, Google Gemini AI Overviews, Perplexity):
    - `BroadcastService` Schema on `/channels`
    - `Product` & `Offer` Schema on `/plans`
    - `HowTo` Schema on `/setup-guide`
    - `Organization` Schema on `/why-us` and `/`
    - `FAQPage` Schema on `/faq`
    - `LocalBusiness` Schema on `/contact`
- **GEO (Generative Engine Optimization & UK Diaspora Targeting)**:
  - Targeted geographic coverage of major British Indian diaspora hubs: Greater London (Southall, Wembley, Harrow, Hounslow, Ilford), West Midlands (Birmingham, Wolverhampton, Coventry), East Midlands (Leicester), North West (Manchester), Yorkshire (Bradford, Leeds), and Home Counties (Slough, Luton).
  - Explicit UK ISP router configuration tips (BT Web Protect, Virgin Media Web Safe, Sky Broadband Shield).

---

### 3. Mobile-First Optimization & Visual Polish
- **Touch-Friendly Targets**: All buttons, navigation links, and category pills strictly adhere to minimum 44px touch targets.
- **Input Zoom Prevention**: Form fields use `text-base sm:text-sm` to eliminate unwanted iOS Safari auto-zoom on mobile focus.
- **Persistent Fixed Header Dock**: Pinned across all scroll depths with responsive mobile & split-screen hamburger drawer (accessible on all screens `< 1024px`).
- **Intelligent Conversion Dock (`StickyFooterBar`)**:
  - Highlights the **"Best Value: £6.43/mo (12+2 Free Months)"** pass.
  - **Auto-Hide at Footer**: Automatically hides via `IntersectionObserver` when reaching the site footer, completely exposing the footer links and the `mercianwealth.com` credibility credit.
- **Moving Channel Carousel**: Dual-row infinite marquee carousel with smooth pause-on-hover and `.scrollbar-none` horizontal swiping.
- **Dark Zinc & Cinema Crimson Palette**: Strict 8px rem grid without gimmicky vibecoded pills or random colors.

---

### 4. Verified Catalogue Architecture & Hardware Rebrand
- **6 Verified SKUs (in GBP £)**:
  1. `1 Month Service` (£14.99) — Flexible zero-commitment pass.
  2. `6 Months Subscription` (£59.99) — Multi-month family pass (£10.00/mo).
  3. `12+2 Months Service (Android TV & Firestick)` (£89.99) — Flagship 14-month annual membership (£6.43/mo).
  4. `ChitramTV Renewal (12+2 Free Months)` (£89.99) — Dedicated returning subscriber flow. Prompts for existing Account ID, Username, or Box MAC Address to extend existing lines with zero setup disruption.
  5. `ChitramTV Black Edition C1 Box Only` (£59.99) — Standalone official set-top box.
  6. `ChitramTV Box + 1 Year Service Bundle` (£109.99) — Turnkey pack with C1 Box + 1-year subscription pass.
- **Hardware Rebrand (`ChitramTV Black Edition C1 Box`)**:
  - Replaced legacy references across UI copy, metadata, and order forms.
  - Powered by Android 14 framework (up to 2x faster).
  - Premium Bluetooth remote control, HDR10+ visuals, and pre-installed YouTube, Netflix, Prime Video, and Chrome with Google Play Store access.
- **Warranty & Return Terms**:
  - 1-Year Hardware Replacement Warranty on all C1 TV boxes.
  - 14-Day Return Window for faulty hardware assessment.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 14.2](https://nextjs.org/) (App Router, Static Generation)
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
│   │   ├── channels/page.tsx      # 350+ Channel Directory & EPG (BroadcastService schema)
│   │   ├── contact/page.tsx       # UK Support Desk & Form (LocalBusiness schema)
│   │   ├── faq/page.tsx           # Full Help Center & Accordion (FAQPage schema)
│   │   ├── plans/page.tsx         # Plans Matrix & Comparison (Product schema)
│   │   ├── robots.ts              # Native App Router robots.txt
│   │   ├── setup-guide/page.tsx   # Device & ISP Router Guide (HowTo schema)
│   │   ├── sitemap.ts             # Native App Router sitemap.xml
│   │   ├── why-us/page.tsx        # Diaspora Story & Infrastructure (Organization schema)
│   │   ├── globals.css            # Dark theme HSL tokens, dark scrollbars, marquee animations
│   │   ├── layout.tsx             # Root HTML layout & fonts
│   │   └── page.tsx               # Homepage summary hub
│   ├── components/
│   │   ├── checkout/
│   │   │   └── PayPalModal.tsx    # Hosted PayPal subscription checkout
│   │   ├── layout/
│   │   │   ├── Footer.tsx         # Site footer with subpage links & Mercian Wealth credit
│   │   │   ├── Navbar.tsx         # Persistent navigation with active route indicators
│   │   │   ├── SiteShell.tsx      # Shared layout shell with context-driven PayPal triggers
│   │   │   ├── StickyFooterBar.tsx# Bottom conversion dock (auto-hides at footer)
│   │   │   └── TopBanner.tsx      # UK trust & contact strip
│   │   ├── sections/              # Homepage teaser sections (Hero, Carousel, Plans, FAQ)
│   │   ├── seo/
│   │   │   └── JsonLd.tsx         # Reusable JSON-LD schema renderer
│   │   └── ui/                    # shadcn/ui components (card, button, badge, accordion)
│   └── data/
│       ├── channels.ts            # 350+ channel metadata, categories, quality specs
│       ├── faqs.ts                # UK streaming FAQs
│       └── plans.ts               # GBP pricing plans & feature matrices
├── tailwind.config.js             # Rem grid system, marquee keyframes, dark tokens
└── README.md
```

---

## 🏃 Getting Started

### Installation & Run

```bash
# Clone the repository
git clone https://github.com/echelonsystemsgd-deep/uk-streaming-client.git
cd uk-streaming-client

# Install dependencies
npm install

# Start development server
npm run dev

# Run production build
npm run build
npm run start
```

---

## 🔒 Security & Credibility

- Engineered and audited by [mercianwealth](https://mercianwealth.com).
- 256-Bit TLS SSL encryption on all routes and order pipelines.
- 100% PayPal Buyer Protection enabled across all GBP passes.
