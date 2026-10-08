# ChitramTV UK - Simplification, Unpacked Landing Page & Mobile Optimization Plan

**Document Version:** 1.0.0  
**Target Platform:** Next.js 14 (App Router) • React 18 • Tailwind CSS  
**Operating Entity:** Shiva Technology Ltd (ChitramTV UK Official Reseller)  

---

## 1. Executive Summary & Philosophy

Based on the client's direct feedback and customer psychology for the UK Indian diaspora:
* **"Keep it Simple, Not High-Fi":** The target demographic includes working British Indian families and elderly parents. They are not interested in complex interactive comparison sliders or moving carousels. They value fast loading, clear pricing in GBP, instant WhatsApp support, and straightforward instructions for their TV or Firestick.
* **"Landing Page as a Curated Summary":** The landing page must not feel packed, cluttered, or exhausting to scroll through. Instead, each section acts as an executive summary of the deep content available on dedicated subpages (`/channels`, `/why-us`, `/setup-guide`, `/download`, `/faq`, `/contact`).
* **Mobile-First Ergonomics:** 100% of gestures must be vertical scroll-friendly (no horizontal gesture interceptors like drag sliders). Minimum 44px–48px touch targets, 16px form inputs to prevent iOS Safari auto-zoom, zero layout shifts, and clean contrast.

---

## 2. Landing Page Scope of Changes

### 2.1 Value Proposition Section (`ValuePropositionSection.tsx`)
* **REMOVED:** Card 3 – Interactive 4K UHD & 60fps Live Cricket Comparison Slider (`720p` vs `4K 60fps` drag lens, technical bitrate comparisons, touch/mouse drag handlers).
  * *Reason:* Causes vertical scroll lock on mobile thumb scrolling, introduces unnecessary technical complexity, and clutters the homepage.
* **STREAMLINED:** Converted remaining value propositions into a clean, balanced, high-trust summary:
  * **14-Day Cloud DVR Time Machine:** Summarizing the 5.5-hour time difference solution.
  * **Multi-Room Household Viewing:** Summarizing up to 4 simultaneous devices.
  * **500+ Unrestricted Channels & 10,000+ Movies:** Summarizing regional languages.
  * **Zero Satellite / Zero Technician Setup:** Summarizing the 2-minute digital setup.
  * Links cleanly to `/why-us` and `/features` for visitors seeking deeper reading.

### 2.2 Channel Showcase Section (`ChannelShowcaseSection.tsx`)
* **REMOVED:** 
  * Two-row infinite moving marquee carousel.
  * Auto-scrolling JavaScript animation loops.
  * Play/Pause toggle button.
  * Inline search input on the landing page.
* **ADDED:** 
  * Clean, static 4-channel highlight preview featuring the UK Indian community's most recognized flagship channels:
    1. **Star Plus HD** (Hindi • Entertainment • Anupamaa & Primetime Serials)
    2. **Sony Entertainment Television HD** (Hindi • Shows & Indian Idol)
    3. **PTC Punjabi HD** (Punjabi • Daily Live Gurbani from Sri Harmandir Sahib)
    4. **Star Sports 1 HD** (Live Cricket • IPL, World Cup & Test Series)
  * Prominent conversion button:
    * `[ View All 500+ Channels & Full TV Guide → ]` linking directly to `/channels`.

### 2.3 Pricing Section (`PricingSection.tsx`)
* Preserved the 6 core Journal 3 e-commerce products (1 Month, 6 Months, 12+2 Free Months, Renewal, Box Bundle, Box Only).
* Compact, clear summary with GBP pricing and direct checkout.

### 2.4 FAQ & Setup Sections
* Kept to high-value 4-5 question summaries with a button leading to `/faq` and `/setup-guide`.

---

## 3. Subpage Audit & Unification Plan

| Route | Issues Identified | Resolution |
| :--- | :--- | :--- |
| **`/download`** | 1. Buttons trigger browser `alert()` popups.<br>2. Dark `#2c3640` breadcrumb strip. | 1. Replace `alert()` with direct WhatsApp link prefilled with download request (`https://wa.me/447979637777?text=...`) and direct APK download handlers.<br>2. Convert breadcrumbs to `bg-gray-50 border-b border-gray-200`. |
| **`/setup-guide`** | `SpeedTestWidget` is high-fi clutter on mobile. | Keep device guides simple and numbered. Move SpeedTestWidget to an optional diagnostic accordion at the bottom. |
| **`/about`** | Dark `#2c3640` breadcrumb strip. | Standardize to light breadcrumbs `bg-gray-50 border-b border-gray-200 text-gray-500`. |
| **`/features`** | Dark `#2c3640` breadcrumb strip. | Standardize to light breadcrumbs `bg-gray-50 border-b border-gray-200 text-gray-500`. |
| **`/buy-now`** | Dark `#2c3640` breadcrumb strip. | Standardize to light breadcrumbs `bg-gray-50 border-b border-gray-200 text-gray-500`. |
| **`/terms`** | Dark `#2c3640` breadcrumb strip. | Standardize to light breadcrumbs `bg-gray-50 border-b border-gray-200 text-gray-500`. |
| **`/privacy`** | Dark `#2c3640` breadcrumb strip. | Standardize to light breadcrumbs `bg-gray-50 border-b border-gray-200 text-gray-500`. |
| **`/refund-policy`** | Dark `#2c3640` breadcrumb strip. | Standardize to light breadcrumbs `bg-gray-50 border-b border-gray-200 text-gray-500`. |
| **`/contact`** | Support email inconsistency (`support@chitramtv.eu` vs `support@chitramtv.uk`). | Standardize on `support@chitramtv.uk` across all pages, footers, and schema metadata. |

---

## 4. Mobile Ergonomics & Standards Checklist

- [x] Zero horizontal drag/slider touch conflicts on mobile viewports.
- [x] All buttons & links meet minimum 44px–48px touch bounding box.
- [x] Form inputs set to `text-base sm:text-sm` (16px) to eliminate iOS Safari zoom-in on focus.
- [x] Light theme design tokens applied universally: `#2c3640` titles, `#dd0e1c` brand red accents, `bg-white` cards with `border-gray-200`.
- [x] Clean static rendering with zero unwanted moving elements on initial scroll.

---

## 5. Verification & Deployment Steps

1. Implement all changes across components and pages.
2. Run `npx tsc --noEmit` to verify type safety.
3. Run `npm run build` to confirm all 31 routes generate with 0 errors.
4. Update `README.md` to reflect the updated architecture.
5. Push changes to git repository.
