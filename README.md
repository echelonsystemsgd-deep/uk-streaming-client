# ChitramTV UK — Premium Live Indian TV & Catch-Up Streaming

High-performance, mobile-optimized Next.js 14 streaming portal engineered for British Indian households. Delivers 500+ live Indian television channels, live cricket tournaments, and automatic 14-day catch-up TV tailored for the UK timezone.

Operated by **Shiva Technology Ltd** (trading as ChitramTV UK). Official support helpline: **07979637777** • Email: **support@chitramtv.uk**.

---

## 🚀 Key Architectural Highlights

### 1. Simplified, Unpacked Landing Page & Deep Subpage Architecture
The portal adheres to a clean, non-packed landing page design philosophy where every section serves as an executive summary of comprehensive subpages:
- **`/` (Homepage)**: Fast, non-cluttered summary hub with official Journal 3 hero slides, a balanced 3-card value proposition (14-Day DVR, 4-Screen Multi-Room, and PayPal trust), a 6-product e-commerce tariff grid, a static 4-channel highlight preview with 1-click routing to the full catalogue, 3-step setup summary, UK diaspora proof, FAQ, and support desk.
- **`/channels`**: Complete 500+ channel directory with live search, multi-language dialect tabs (Hindi, Punjabi, Tamil, Telugu, Malayalam, English), quality filters (4K UHD vs 1080p HD), and 14-day EPG catch-up guide.
- **`/buy-now`**: Direct e-commerce catalogue featuring the 6 verified SKUs with "Add to Cart" and "Buy Now" workflows, returning subscriber renewal lookup (retaining account numbers & box MAC addresses), and real-time shopping cart drawer.
- **`/plans`**: Transparent pricing matrix with side-by-side feature comparison table, mobile-first category filter tabs, 1-Year Hardware Replacement Warranty, and 14-Day Return Window.
- **`/setup-guide`**: Step-by-step 3-minute installation instructions with an interactive device switcher (Amazon Fire TV Stick, Android & Google TV, Samsung Tizen, LG webOS, Apple TV, PC/Mac), UK ISP router tips (BT Web Protect, Virgin Media Web Safe, Sky Broadband Shield), and optional broadband speed diagnostic.
- **`/why-us`**: The British Indian diaspora story, detailing how ChitramTV solves the 5.5-hour India-to-UK time difference for NHS workers and working families, London low-latency edge CDN relays, and UK geographic coverage hubs.
- **`/features`**: Detailed breakdown of 14 Days Catch-Up TV, 10,000+ Movies on Demand, Timeshift Control, Parental PIN Protection, and Internet Radio.
- **`/download`**: Official APK downloads for Android Smart TV, Android Mobile, Firestick Downloader codes, and PC/Mac emulators with direct WhatsApp dispatch.
- **`/faq`**: Comprehensive help center with real-time search, category filters (Setup, Billing, Catch-Up, Broadband), custom accordion, and direct WhatsApp escalation.
- **`/contact`**: UK customer support desk with direct WhatsApp (<5 min response), UK phone helpline (07979637777), operating schedule, and interactive ticket submission.
- **`/privacy`, `/terms`, `/refund-policy`**: Complete legal documentation under the laws of England & Wales covering Shiva Technology Ltd, PayPal Buyer Protection, and 7-Day Money-Back Guarantee.

---

### 2. "Keep It Simple, Not High-Fi" Conversion Philosophy
Following client requirements and diaspora demographics:
- **No Complex Drag Sliders**: Removed interactive split-screen comparison sliders that previously caused vertical scroll conflicts on mobile screens.
- **No Infinite Auto-Carousels**: Replaced auto-moving marquee carousels with a clean, static 4-channel preview (Star Plus, Sony TV, PTC Punjabi, Star Sports) and a prominent button redirecting visitors to the full `/channels` catalogue.
- **Light Theme Executive Palette**: Standardized across the entire site using high-contrast deep slate headings (`#2c3640`), brand red accents (`#dd0e1c`), and clean white card containers (`bg-white border-gray-200 shadow-sm`), eliminating all white-on-white text bugs.

---

### 3. Mobile-First Optimization & Ergonomics
- **Solid Sticky Header**: Clean ~56px–60px sticky header with 100% solid white opacity (`bg-white border-b border-gray-200 shadow-sm`), guaranteeing zero background element bleed-through and instant access to cart and navigation across all devices.
- **Universal Modal Scroll Locking**: Interacting with any drawer or modal (`CartDrawer`, Quickview, `PayPalModal`, mobile menu) locks background page scrolling (`useScrollLock`) with `overscroll-behavior: contain` and `touch-action: none`.
- **Touch-Friendly Targets**: All buttons, navigation links, and category pills strictly adhere to minimum 44px–48px touch targets.
- **Input Zoom Prevention**: Form fields use `text-base sm:text-sm` (16px font size) to eliminate iOS Safari auto-zoom on focus.
- **Zero Scroll Interception**: All page components allow uninterrupted vertical thumb scrolling.
- **Direct WhatsApp Escalation**: Download links and contact forms provide 1-tap WhatsApp deep links (`https://wa.me/447979637777`) with pre-filled inquiries, replacing intrusive browser `alert()` popups.

---

### 4. Verified Catalogue Architecture (in GBP £)
1. **1 Month Service** (£14.99) — Flexible zero-commitment pass (up to 2 devices).
2. **6 Months Subscription** (£59.99) — Multi-month family pass (£10.00/mo, up to 3 devices).
3. **12+2 Months Service (Android TV & Firestick)** (£89.99) — Flagship 14-month annual membership (£6.43/mo, up to 4 devices).
4. **ChitramTV Renewal (12+2 Free Months)** (£89.99) — Dedicated returning subscriber flow. Prompts for existing Account ID or Box MAC Address to extend existing lines with zero setup disruption.
5. **ChitramTV Black Edition C1 Box Only** (£59.99) — Standalone official Android 14 set-top box.
6. **ChitramTV Box + 1 Year Service Bundle** (£109.99) — Turnkey pack with C1 Box + 1-year subscription pass.

---

### 5. SEO, AEO & Structured Data (JSON-LD)
Structured JSON-LD schemas embedded across every route for citation by search engines and AI answer engines (ChatGPT, Google Gemini AI Overviews, Perplexity):
- `BroadcastService` Schema on `/channels`
- `Product` & `Offer` Schema on `/plans` and `/buy-now`
- `HowTo` Schema on `/setup-guide`
- `Organization` Schema on `/why-us` and `/`
- `FAQPage` Schema on `/faq`
- `LocalBusiness` Schema on `/contact`

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 14.2](https://nextjs.org/) (App Router, Static Generation)
- **Language**: TypeScript 5
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Component Primitives**: [shadcn/ui](https://ui.shadcn.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Payment Processing**: [@paypal/react-paypal-js](https://github.com/paypal/react-paypal-js) (PayPal Orders v2 with Pay in 3 & Buyer Protection)

---

## 🏃 Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Run TypeScript compilation check
npx tsc --noEmit

# Build production bundle
npm run build
```

---

## 📄 Operating Entity & Digital Architecture
- **Operating Entity**: **Shiva Technology Ltd** (Trading as ChitramTV UK)  
  Helpline: `07979637777` • Support Email: `support@chitramtv.uk`  
  Official Reseller of Chitram TV in the United Kingdom
- **Digital Architecture & Engineering**: [Mercian Wealth Automation](https://mercianwealth.com)  
  High-redundancy streaming distribution, zero-log privacy architecture, and bespoke UI engineering.
