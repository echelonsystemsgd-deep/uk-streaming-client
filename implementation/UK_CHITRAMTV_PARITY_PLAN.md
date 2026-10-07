# UK ChitramTV Parity Implementation Plan
**Entity**: Shiva Technology Ltd (trading as ChitramTV UK)  
**Target Parity**: https://www.chitramtv.eu/  
**Helpline**: 07979637777  
**Core Features**: 14 Days Catch-Up TV, 500+ Live Channels, Multi-Room 4 Devices, 4K UHD Streaming

---

## 1. System Overview & Visual Theming
- **Journal 3 Design Language**:
  - Top Bar: Call now: `07979637777` | Currency: `£ GBP` | Language: `English` | Login / Register / Wishlist / Compare
  - Main Header: Official ChitramTV Logo (`/Logo.png`), Product Search Bar with category filter, Interactive Shopping Cart (`Cart: X item(s) - £Y.YY`)
  - Primary Navigation:
    1. BUY NOW (`/buy-now` & `/plans`)
    2. About Us (`/about`)
    3. Terms and Condition (`/terms`)
    4. Download (`/download`)
    5. Setup Guide (`/setup-guide`)
    6. Features (`/features`)
    7. Contact Us (`/contact`)
    8. Channels (`/channels`)
  - Palette: Crisp white & light gray (`#f0f2f5`) canvas, slate dark headers (`#2c3640`), action crimson (`#dd0e1c` / `#b00b16`), gold accents (`#fdc22d`).

---

## 2. Product Catalogue Matrix (6 SKUs)
| SKU | Product Title | GBP Price | Old Price | Category | Image | Fulfilment Type |
|---|---|---|---|---|---|---|
| `CTV-SUB-14M` | Watch on Your Android TV & Firestick 12 + 2 Months Service | £89.99 | £109.99 | Subscription | `/products/14months.webp` | Digital 14-Month Pass |
| `CTV-SUB-1M` | ChitramTV 1 Month Service | £14.99 | - | Subscription | `/products/1month.webp` | Digital 30-Day Pass |
| `CTV-BND-C1-1YR` | Chitramtv Box + 1 Year Service | £109.99 | £139.99 | Bundle | `/products/box-bundle.png` | Physical Hardware + 12M Pass |
| `CTV-REN-14M` | Chitramtv Renewal 12 + 2 Free Months | £89.99 | £109.99 | Renewal | `/products/renewal.webp` | Subscription Extension (Account ID / MAC) |
| `CTV-SUB-6M` | ChitramTV 6 Months Subscription | £59.99 | £74.99 | Subscription | `/products/6months.webp` | Digital 6-Month Pass |
| `CTV-HW-C1` | Chitramtv Box Only | £59.99 | £79.99 | Hardware | `/products/box-only.png` | Standalone C1 4K Box (Android 14) |

---

## 3. Frontend Architecture & Pages
1. **Homepage (`/`)**:
   - Hero Slider: `Slide1-1280x550w.jpg`, `HDNEWBOXZout-1280x550w.jpg`, `TVdotslideripl-1280x550w.jpg`
   - 4 Value Highlights: Ultra-speed, 14 Days Catch-Up TV, 500+ Live Channels, Multi-Room 4 Devices
   - 6-Product Catalogue Grid: Image, Price, Strike-through, Quickview, Add to Cart, Buy Now
   - Secondary Promos & TV Apps Download Teaser
   - FAQ & Contact snippet
2. **Subpages**:
   - `/buy-now`: Complete catalogue with category tabs and filters
   - `/about`: Authorized UK Reseller, part of Shiva Technology Ltd, 500+ channels, 14-day catch-up
   - `/terms`: Legal terms, Shiva Technology Ltd, 1-year warranty, 14-day returns
   - `/download`: Android Smart TV APK, Mobile APK, Firestick Downloader guide, PC/Mac LDPlayer
   - `/setup-guide`: 3-step connection guide (HDMI, Power, Ethernet/Wi-Fi, App login)
   - `/features`: 14 Days Catch-Up TV, Movies on Demand, Timeshift, Parental Control, Internet Radio
   - `/contact`: Phone 07979637777, WhatsApp, contact form
   - `/channels`: Full 500+ channel list
   - `/cart` & `/checkout`: Multi-step / one-page checkout with cart items, UK address collection, renewal MAC capture

---

## 4. Backend & PayPal Checkout
- **Cart Context (`CartContext.tsx`)**: Global shopping cart state with local storage persistence, item count, totals, and drawer.
- **Instant Buy Modal (`PayPalModal.tsx`)**: Direct 1-click PayPal checkout for individual products.
- **API Routes**:
  - `POST /api/paypal/create-order`: Order initialization with item breakdown in GBP
  - `POST /api/paypal/capture-order`: Order authorization & payment capture
  - `GET /api/paypal/config`: PayPal credentials check & sandbox detection
  - `POST /api/contact`: Support and ticket submission endpoint

---

## 5. Verification & Testing
- Next.js TypeScript build verification (`npm run build`)
- Visual consistency check across all routes
- Zero missing assets, broken links, or syntax errors
