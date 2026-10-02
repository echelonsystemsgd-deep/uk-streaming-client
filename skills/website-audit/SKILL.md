---
name: website-audit
description: Use when conducting an exhaustive, full-conscience website audit across Performance & Core Web Vitals (LCP, INP, CLS, TTFB), Accessibility (WCAG 2.2 AA), Technical SEO & Schema.org JSON-LD, Security Defense Headers & Privacy, Mobile Viewport Ergonomics, and Conversion Rate Optimization (CRO).
---

# Full-Conscience Website Audit Protocol

A masterclass framework and runbook for conducting rigorous, multi-dimensional website audits. When operating with **full conscience**, the agent does not merely run a superficial tool or quote generic numbers; it investigates the website holistically as a commercial engine, an accessibility environment, an engineering codebase, and a secure consumer portal.

---

## When using this skill:

1. **Establish Ground Truth & Context**:
   - Determine target environment (Production, Staging, or Local `localhost:3000`).
   - Identify the site's primary conversion objective (e.g. streaming subscription sales, lead generation, e-commerce checkout, SaaS trial).
   - Identify the primary user demographic and device distribution (e.g. UK British Indian mobile users on WhatsApp in-app browsers vs desktop enterprise users).
2. **Execute Automated & Structural Probes**:
   - Run the automated auditor suite:
     - Comprehensive Scan: `node scripts/audit_site.mjs <url>`
     - Security Headers: `node scripts/check_security_headers.mjs <url>`
     - Schema.org Structured Data: `node scripts/check_seo_schema.mjs <url>`
     - WCAG 2.2 Semantics: `node scripts/check_accessibility.mjs <url>`
   - Capture TTFB, document weight, heading structure, image attributes, and defensive headers.
3. **Perform Deep Multi-Pillar Forensic Analysis**:
   - **Pillar 1: Performance & Core Web Vitals**: [performance-and-cwv.md](./references/performance-and-cwv.md)
     - Audit LCP (hero image preloading, `fetchpriority="high"`, AVIF/WebP, render-blocking CSS).
     - Audit INP (long tasks > 50ms, hydration latency, debouncing on inputs).
     - Audit CLS (missing width/height attributes, dynamic ad shifts, font layout shifts).
     - Audit caching headers (`Cache-Control: immutable` on static assets, Brotli compression).
   - **Pillar 2: Accessibility & Inclusivity**: [accessibility-wcag-22.md](./references/accessibility-wcag-22.md)
     - Verify WCAG 2.2 Level AA compliance.
     - Inspect color contrast ratios (4.5:1 body copy, 3:1 UI components).
     - Audit keyboard navigation (visible `:focus-visible` rings, no keyboard traps, skip-link).
     - Validate form input `<label>` associations, ARIA attributes, and image `alt` tags.
   - **Pillar 3: Technical SEO & Schema.org**: [technical-seo-and-schema.md](./references/technical-seo-and-schema.md)
     - Inspect self-referential canonical tags, robots.txt, and sitemap indexability.
     - Review Title tag (50–60 chars) and Meta description (120–155 chars with CTA).
     - Verify Open Graph (1200x630) and Twitter Card tags for social preview rendering.
     - Validate JSON-LD structured data (Product, Offer, FAQPage, Organization, LocalBusiness).
   - **Pillar 4: Security & Privacy Compliance**: [security-and-headers.md](./references/security-and-headers.md)
     - Inspect 6 core defensive headers: HSTS, CSP, X-Content-Type-Options, X-Frame-Options, Referrer-Policy, Permissions-Policy.
     - Audit cookie security flags (`Secure`, `HttpOnly`, `SameSite=Lax`).
     - Check for mixed content warnings and secure form submissions.
   - **Pillar 5: Mobile & Touch Ergonomics**: [mobile-and-ux-ergonomics.md](./references/mobile-and-ux-ergonomics.md)
     - Verify responsive viewport tag without user scalability restrictions.
     - Audit form input font size: enforce `font-size: 16px` on mobile to prevent iOS Safari auto-zoom.
     - Enforce minimum 48x48px touch targets for thumb-zone usability.
     - Diagnose and eliminate horizontal overflow ("side-scrolling") bugs.
     - Check dynamic viewport height (`dvh`) and safe area insets on mobile sticky footers.
   - **Pillar 6: Conversion Rate Optimization (CRO)**: [conversion-and-cro.md](./references/conversion-and-cro.md)
     - Apply the 5-second value proposition test above the fold.
     - Inspect trust architecture: payment guarantees, risk reversals, Trustpilot/review badges.
     - Audit form field count and checkout friction steps.
4. **Classify by Severity & Business Impact**:
   - Categorize all findings using the [audit-methodology.md](./references/audit-methodology.md) matrix:
     - 🔴 **P0 (Critical)**: Immediate blockers, security breaches, broken checkout flows, severe CLS.
     - 🟠 **P1 (Major)**: Core Web Vitals failures, mobile layout bugs, missing key schema.
     - 🟡 **P2 (Moderate)**: Asset compression opportunities, sub-optimal contrast, missing OG tags.
     - 🟢 **P3 (Minor)**: Code polish, heading hierarchy nuances, minor cache tuning.
5. **Formulate Production-Ready Deliverables**:
   - Provide exact, drop-in code snippets for every single issue.
   - Generate client-ready audit report using [audit_report_template.md](./assets/audit_report_template.md).
   - Formulate a 30-day prioritized remediation roadmap.

---

## Directory & Resource Map

```text
website-audit/
├── SKILL.md                          # Master runbook & full-conscience protocol (this file)
├── references/                       # Comprehensive technical manuals & scoring rubrics
│   ├── audit-methodology.md          # 8-pillar audit framework, severity matrix, ROI translation
│   ├── performance-and-cwv.md        # LCP, INP, CLS, TTFB, resource budgets, caching
│   ├── accessibility-wcag-22.md      # WCAG 2.2 AA standards, contrast, keyboard nav, screen readers
│   ├── technical-seo-and-schema.md   # Indexability, metadata, Open Graph, Schema.org JSON-LD
│   ├── security-and-headers.md       # HSTS, CSP, X-Frame-Options, cookie flags, GDPR/ePrivacy
│   ├── mobile-and-ux-ergonomics.md   # Viewport, touch targets, iOS zoom, dvh, thumb zone
│   └── conversion-and-cro.md         # 5-second test, trust anchors, checkout friction, CTAs
├── scripts/                          # Executable automated inspection tools
│   ├── audit_site.mjs                # Complete automated auditor (Node.js native)
│   ├── check_security_headers.mjs    # SSL/TLS & HTTP defense headers inspector
│   ├── check_seo_schema.mjs          # Schema.org JSON-LD structured data parser
│   └── check_accessibility.mjs       # WCAG 2.2 semantic HTML & contrast checker
├── assets/                           # Reusable deliverables & checklists
│   ├── audit_report_template.md      # Formal client audit report presentation template
│   ├── audit_checklist.json          # Exhaustive 100-point audit item data structure
│   ├── executive_summary_deck.md     # Stakeholder briefing slide deck format
└── agents/
    └── openai.yaml                   # Codex / Agent UI metadata & capabilities
```

---

## The 4 Principles of Full-Conscience Auditing

### 1. Evidence Over Assumption
Never report an issue without citing its exact metric, line number, DOM element, or HTTP header. Every claim must be reproducible.

### 2. Actionable Code Diffs
Every reported defect must include the exact before-and-after code diff required to fix it, tailored to the project's framework (e.g. Next.js, React, Tailwind CSS, Nginx, or Apache).

### 3. Commercial ROI Translation
Bridge the gap between engineering and business. Explain how an LCP reduction translates into lower ad bounce rates, or how 48px touch targets directly increase mobile checkout conversions.

### 4. Verification Protocol
Always specify the exact testing command or browser tool (e.g. `npm run build`, Chrome Lighthouse, axe DevTools, Rich Results Test) that confirms the issue is resolved.

---

## Quick Start CLI Inspection

To audit any local or live website immediately:

```bash
# 1. Run full comprehensive audit
node skills/website-audit/scripts/audit_site.mjs http://localhost:3000

# 2. Inspect security defense headers
node skills/website-audit/scripts/check_security_headers.mjs http://localhost:3000

# 3. Validate Schema.org structured data
node skills/website-audit/scripts/check_seo_schema.mjs http://localhost:3000

# 4. Check WCAG 2.2 accessibility semantics
node skills/website-audit/scripts/check_accessibility.mjs http://localhost:3000
```
