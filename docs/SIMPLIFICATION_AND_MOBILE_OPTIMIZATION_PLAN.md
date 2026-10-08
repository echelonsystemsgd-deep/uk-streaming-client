# ChitramTV UK - Simplification, Unpacked Landing Page & Mobile Optimization Plan

**Document Version:** 1.1.0  
**Target Platform:** Next.js 14 (App Router) • React 18 • Tailwind CSS  
**Operating Entity:** Shiva Technology Ltd (ChitramTV UK Official Reseller)  
**Digital Architecture & Engineering Credit:** Mercian Wealth (`mercianwealth.com`)  

---

## 1. Executive Summary & Philosophy

Based on the client's direct feedback and customer psychology for the UK Indian diaspora:
* **"Keep it Simple, Not High-Fi":** The target demographic includes working British Indian families and elderly parents. They value fast loading, clear pricing in GBP, instant WhatsApp support, and straightforward instructions for their TV or Firestick.
* **"Landing Page as a Curated Summary":** The landing page must not feel packed, cluttered, or exhausting to scroll through. Instead, each section acts as an executive summary of the deep content available on dedicated subpages (`/channels`, `/why-us`, `/setup-guide`, `/download`, `/faq`, `/contact`).
* **Mobile-First Ergonomics:** 100% of gestures must be vertical scroll-friendly (no horizontal gesture interceptors like drag sliders). Minimum 44px–48px touch targets, 16px form inputs to prevent iOS Safari auto-zoom, zero layout shifts, and clean contrast.
* **Direct WhatsApp Conversions:** Every inquiry and contact action is formatted into a decision-ready WhatsApp message directed to the 24/7 UK help desk (`07979637777`).

---

## 2. Landing Page Scope of Changes

### 2.1 Value Proposition Section (`ValuePropositionSection.tsx`)
* **REMOVED:** Card 3 – Interactive 4K UHD & 60fps Live Cricket Comparison Slider (`720p` vs `4K 60fps` drag lens, technical bitrate comparisons, touch/mouse drag handlers).
  * *Reason:* Causes vertical scroll lock on mobile thumb scrolling, introduces unnecessary technical complexity, and clutters the homepage.
* **STREAMLINED:** Converted remaining value propositions into a clean, balanced, high-trust summary:
  * **14-Day Cloud DVR Time Machine:** Summarizing the 5.5-hour time difference solution.
  * **Multi-Room Household Viewing:** Summarizing up to 4 simultaneous devices.
  * **100% PayPal Buyer Protection & Trust:** Summarizing transparent GBP pricing, 7-day money-back guarantee, and Shiva Technology Ltd UK trust pillars.

### 2.2 Channel Showcase Section (`ChannelShowcaseSection.tsx`)
* **REMOVED:** Two-row infinite moving marquee carousel, pause toggle, and duplicate search bar.
* **ADDED:** Clean, static 4-channel highlight preview featuring the UK Indian community's most recognized flagship channels (Star Plus HD, Sony Entertainment TV, PTC Punjabi HD, Star Sports 1 HD) + prominent button: `[ View All 500+ Channels & Full TV Guide → ]` linking directly to `/channels`.

### 2.3 Pricing Section (`PricingSection.tsx`)
* Preserved the 6 core Journal 3 e-commerce products (1 Month, 6 Months, 12+2 Free Months, Renewal, Box Bundle, Box Only).
* Compact, clear summary with GBP pricing and direct checkout.

---

## 3. Contact Form & CTA WhatsApp Synchronization

All contact forms and CTAs across the entire portal are directly connected to WhatsApp (`+44 7979 637777`):
* **Landing Page Contact Form (`ContactSection.tsx`):** On submit, compiles the user's Full Name, Email, Device, and Message into a formatted WhatsApp ticket, triggers immediate redirection to WhatsApp, and renders an on-screen confirmation with fallback buttons.
* **Support Desk Page (`/contact`):** On submit, formats Full Name, Email, Phone, Device, Subject, and Message, and automatically redirects to WhatsApp.
* **App Downloads (`/download`):** Direct pre-filled WhatsApp links for signed APK dispatch.
* **Checkout Post-Order (`/checkout/success`):** WhatsApp button pre-fills the PayPal Order ID for instantaneous dispatch tracking.

---

## 4. Modal Scroll Locking & Background Isolation

To ensure users cannot scroll or move the website in the background when interacting with any modal or drawer:
1. **Universal Hook Integration (`useScrollLock`):**
   * `CartDrawer.tsx`: Locks background when `isCartDrawerOpen` is true.
   * `PricingSection.tsx`: Locks background when `quickviewPlan` is open.
   * `PayPalModal.tsx`: Locks background when checkout modal is active.
   * `Navbar.tsx`: Locks background when mobile hamburger drawer is active.
2. **Gesture Isolation:**
   * Backdrops apply `overscroll-behavior: contain` and `touch-action: none`.
   * Inner dialog containers retain independent, smooth scrolling (`overflow-y-auto overscroll-contain`) without scroll leakage.

---

## 5. Sticky Navigation Header Architecture

* **Root Cause Fix:** Previously, `<Navbar>` was wrapped inside a short non-sticky `<div className="w-full">` in `SiteShell.tsx`, which caused the navbar to stop sticking as soon as that container scrolled off-screen.
* **Resolution:** Elevated the sticky dock to `sticky top-0 z-40 w-full bg-white shadow-md`. `TopBanner` scrolls away naturally on initial scroll, allowing the clean, compact 56px–60px Navbar (Logo, Cart Badge, Hamburger / Desktop links) to remain permanently accessible across all pages and mobile viewports.

---

## 6. Mercian Wealth Credibility Credit

* **Footer Bottom Bar (`Footer.tsx`):** Restored the official engineering and design credibility credit in the bottom copyright row directly below the Shiva Technology Ltd entity declaration:
  * Designed & Engineered by `mercianwealth.com` with high-contrast amber accent (`#fdc22d`).

---

## 7. Subpage Audit & Unification Plan

| Route | Issues Identified | Resolution |
| :--- | :--- | :--- |
| **`/download`** | 1. Buttons trigger browser `alert()` popups.<br>2. Dark `#2c3640` breadcrumb strip. | 1. Replace `alert()` with direct WhatsApp link prefilled with download request (`https://wa.me/447979637777?text=...`).<br>2. Convert breadcrumbs to `bg-gray-50 border-b border-gray-200`. |
| **`/setup-guide`** | `SpeedTestWidget` is high-fi clutter on mobile. | Move SpeedTestWidget to an optional troubleshooting accordion at the bottom. |
| **`/about`** | Dark `#2c3640` breadcrumb strip. | Standardize to light breadcrumbs `bg-gray-50 border-b border-gray-200 text-gray-500`. |
| **`/features`** | Dark `#2c3640` breadcrumb strip. | Standardize to light breadcrumbs `bg-gray-50 border-b border-gray-200 text-gray-500`. |
| **`/buy-now`** | Dark `#2c3640` breadcrumb strip. | Standardize to light breadcrumbs `bg-gray-50 border-b border-gray-200 text-gray-500`. |
| **`/terms`** | Dark `#2c3640` breadcrumb strip. | Standardize to light breadcrumbs `bg-gray-50 border-b border-gray-200 text-gray-500`. |
| **`/privacy`** | Residual dark classes and dark breadcrumb strip. | Standardize to light breadcrumbs and executive `#2c3640` typography. |
| **`/refund-policy`** | Residual dark classes and dark breadcrumb strip. | Standardize to light breadcrumbs and executive `#2c3640` typography. |
| **`/contact`** | Support email inconsistency (`support@chitramtv.eu` vs `support@chitramtv.uk`). | Standardize on `support@chitramtv.uk` across all pages, footers, and schema metadata. |

---

## 8. Mobile Ergonomics & Standards Checklist

- [x] Zero horizontal drag/slider touch conflicts on mobile viewports.
- [x] All buttons & links meet minimum 44px–48px touch bounding box.
- [x] Form inputs set to `text-base sm:text-sm` (16px) to eliminate iOS Safari zoom-in on focus.
- [x] Background scroll locked when any modal or drawer is open.
- [x] Sticky header provides compact ~56px mobile footprint with immediate cart and menu access.
- [x] Light theme design tokens applied universally: `#2c3640` titles, `#dd0e1c` brand red accents, `bg-white` cards with `border-gray-200`.

---

## 9. Verification & Deployment Steps

1. Implement all changes across components and pages.
2. Run `npx tsc --noEmit` to verify type safety.
3. Run `npm run build` to confirm all 31 routes generate with 0 errors.
4. Update `README.md` to reflect the updated architecture.
5. Push changes to git repository.
