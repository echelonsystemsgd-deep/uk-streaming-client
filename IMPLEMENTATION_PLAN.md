# ChitramTV (Linus Media) — Technical Implementation & Refactor Plan

This document details the architectural refactor, mobile webview compatibility fixes, design system normalization, and WhatsApp Business catalogue data integration executed on the ChitramTV Next.js prototype.

---

## 1. Core Architecture & Bug Fixes

### 1.1 Mobile Drawer / Hamburger Menu Fix (`Navbar.tsx`)
- **Problem**: `<header>` contained `backdrop-blur-md`, which creates a CSS containing block trapping all `position: fixed` descendants. The drawer was squished into the 100px header bar. Additionally, `tailwindcss-animate` was missing from the configuration.
- **Solution**:
  - Implemented `createPortal(drawerMarkup, document.body)` with an SSR-safe `mounted` check.
  - Replaced unparsed animation utility classes with standard Tailwind CSS transitions (`transition-all duration-300`, `translate-x-0` vs `translate-x-full`).
  - Elevated z-index to `z-[70]` to stay above all overlays and sticky bars.

### 1.2 Viewport & Background Scroll Lock Hook (`useScrollLock.ts`)
- **Problem**: Setting `document.body.style.overflow = "hidden"` is completely bypassed by iOS Safari and WhatsApp/Instagram in-app webviews (`WKWebView`) during touch events.
- **Solution**:
  - Created a robust custom hook `src/hooks/useScrollLock.ts`.
  - Employs the `position: fixed; width: 100%; top: -${scrollY}px;` technique on `document.body` while locking `document.documentElement.style.overflow`.
  - Accurately tracks and restores `window.scrollY` on modal/drawer dismissal to prevent scroll jumping.
  - Added `overscroll-behavior: contain` on modal and drawer dialog containers to kill scroll chaining.

### 1.3 Shell Unification (`SiteShell.tsx` & `page.tsx`)
- **Problem**: `src/app/page.tsx` manually duplicated `<header>`, `<Footer>`, `<StickyFooterBar>`, and `<PayPalModal>`, causing state desynchronization from subpages using `<SiteShell>`.
- **Solution**:
  - Refactored `src/app/page.tsx` to cleanly wrap with `<SiteShell>`.
  - Unified modal state, active plan state, and quick subscribe triggers inside `SiteShellContext`.
  - Upgraded CTA buttons in `HeroSection.tsx` from raw `window.location.href` to Next.js client-side navigation.

---

## 2. Real Business Data & Catalogue Integration (Linus Media)

### 2.1 Contact & Identity Standardization
- **Operating Entity**: Linus Media (Netherlands)
- **Brand Name**: ChitramTV (Chitram)
- **Phone / WhatsApp**: `+31 6 20897414` (Direct WhatsApp link: `https://wa.me/31620897414`)
- **Support Email**: `info@linusmedia.nl`
- **Official Domain**: `https://chitramtv.eu` (and `https://www.linusmedia.nl`)
- **Support Hours**: Open 24 Hours / 24/7 WhatsApp Desk

### 2.2 Product Data Model (`src/data/plans.ts`)
- **Discriminated Union Architecture**:
  - `SubscriptionProduct`: 1 Month (€15.00), 6 Months (€69.00), 14 Months (€109.00), 12+2 Firestick/Android TV Pass (€109.00).
  - `BundleProduct`: ChitramTV Dune HD Classic Box + 1 Year Service (€129.00).
  - `HardwareProduct`: Dune HD Classic Box Only (€69.00).
  - `PendingCatalogueProduct`: Seamless interim slot for the 6 pending WhatsApp catalogue items linking directly to `wa.me/31620897414`.
- **Currency**: Standardized to EUR (`€`) matching the official WhatsApp Business catalogue, with dynamic currency formatting.

---

## 3. Webview & Mobile Safari Hardening

- **Dynamic Viewport Height**: Updated modal containers to use `max-h-[90dvh]` to account for WhatsApp's dynamic navigation chrome.
- **Form Zoom Prevention**: Ensured all form inputs declare `text-base` (16px) on mobile breakpoints to prevent iOS auto-zooming.
- **Touch Target Compliance**: Enforced minimum 44x44px touch targets on all interactive triggers.

---

## 4. Verification & Quality Assurance

- **TypeScript Compilation**: `npx tsc --noEmit` verified with 0 errors.
- **Next.js Production Build**: `npm run build` completed successfully with 0 errors across all routes.
- **Link Integrity**: All WhatsApp, phone, email, and internal routes validated.
