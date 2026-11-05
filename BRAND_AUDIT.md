# Peach Brand Audit & Visual Evolution (Round 8)

> **Audit Context:** Evolution from working title "Bodh" to **Peach (पीच)** as mandated by Prompt 10.
> **Design Philosophy:** Single source of truth architecture (`src/config/brand.ts`), original geometric fruit vector identity, warm coral-peach palette with WCAG AA/AAA contrast, and complete eradication of legacy brand strings and `V2.0` badges.

---

## 1. Rule #0: Before vs After Visual Comparison Log

All baseline and post-rename screenshots were captured via headless Playwright across 3 responsive breakpoints (360px mobile, 768px tablet, 1440px desktop) in both light and dark color schemes, across Hindi and English locales (36 before + 36 after = 72 screenshots total).

| Surface / Area | Baseline ("Before" State) | Modernized ("After" State with Peach) | Resolution / Verification |
| :--- | :--- | :--- | :--- |
| **Header Logo Lockup** | Hardcoded text "Bodh" with disconnected Devanagari badge and static `V2.0` pill tag. Icon was an unbranded generic tile. | Original vector Peach mark (peach body + leaf/bookmark + knowledge node) paired with baseline-aligned `Peach` and `पीच`. `V2.0` badge eliminated completely. | Screenshot confirmed in `home_desktop_light_hi.png` and `home_mobile_light_en.png`. Height strictly 36px, zero baseline drift. |
| **Hero Section & Gradient Mesh** | Cold purple/indigo radial gradient backdrop; dual-script titles occasionally mixed Roman-Hindi fragments. | Warm Peach mesh gradient (`from-peach-500/10 via-brand-500/10 to-indigo-500/10`). Pure, unpolluted Hindi H1 (`hero-text-hi`) or English H1 (`hero-text-en`). | Dynamic switching tested with zero flash of unstyled content or layout shifts. |
| **Domain Cards & Badges** | Domain headers occasionally carried legacy namespace strings ("Bodh Labs"). | Domain cards dynamically render `{BRAND.name} Labs`, styled with peach-tinted category accents and duotone iconography. | Verified across all 6 domain cards. |
| **Creator Strip & Soft CTA** | CTA used `bodh_soft_cta_dismissed` sessionStorage key and mixed Hinglish copy ("Kuch naya seekha?"). | Modernized to `peach_soft_cta_dismissed` with clean copy: "Found this helpful? Researched and built by Rajnish Singh." | Storage key verified; clean typography without colloquial slang. |
| **Footer Lockup & Legal** | Hardcoded copyright "Bodh Knowledge Engine". | Fully dynamic `{BRAND.name} ({BRAND.nameHi})` with verified knowledge engine descriptor and clean navigation tree. | Tested across all 46 static pages in `dist/`. |
| **Document `<title>`** | Irregular suffix formatting (`... | Bodh`, `... - Knowledge Hub`). | Strict unified pattern: `<Page Title> | Peach` across all routes. | Automated Playwright title crawler verified 100% compliance. |
| **Web App Manifest & Metadata** | Manifest and JSON-LD referenced legacy project names. | `manifest.webmanifest`, `humans.txt`, OpenGraph `og:site_name`, Twitter `twitter:title`, and Schema.org JSON-LD unified under `Peach`. | HTTP 200 checks verified on all brand asset routes. |

---

## 2. Three Rounds of Iterative Critique & Fixes

### Round 1: Architecture & Single Source of Truth Eradication
- **Problem:** Hardcoded names were scattered across 25+ Astro templates, TypeScript data files (`updates.ts`, `creator.ts`, `topics.ts`), and meta tags.
- **Root Cause:** Incremental development without a centralized brand configuration module.
- **Fix:**
  - Created [`src/config/brand.ts`](file:///Users/rajnishsingh/projects/knowledge-hub/src/config/brand.ts) exporting `BRAND` interface (`name: 'Peach'`, `nameHi: 'पीच'`, `tagline`, `descriptor`, `domain`, `github`, `themeColor`, `accentColor`).
  - Systematically refactored all Astro pages, layouts, and components to import `BRAND`.
  - Updated `updates.ts` with release `v1.3.0` detailing the brand evolution while maintaining factual release history without hardcoded legacy strings.

### Round 2: Typographic Calibration & Hinglish Remediation
- **Problem 1:** During automated test runs, `tests/i18n.spec.cjs` flagged that `#domains-heading` had a negative computed `letter-spacing: -0.75px` (`tracking-tight`). In Devanagari script ("आज क्या सीखना है?"), negative letter-spacing causes diacritic matras and conjuncts to collide.
- **Fix 1:** Replaced `tracking-tight` with `tracking-normal [letter-spacing:0]` in `src/components/home/BentoGrid.astro`.
- **Problem 2:** Creator soft CTA widget contained leftover storage key `bodh_soft_cta_dismissed` and Roman-Hindi copy ("Kuch naya seekha? Yeh guide ne build ki hai.").
- **Fix 2:** Renamed storage key to `peach_soft_cta_dismissed` and cleaned copy to pure English / Devanagari.
- **Problem 3:** Header lacked explicit test IDs for brand inspection.
- **Fix 3:** Added `id="header-logo"`, `id="header-brand-name"`, and `id="header-brand-hi"` with baseline flex alignment.

### Round 3: Color Contrast & Asset Verification
- **Problem:** Peach and orange scales often fail WCAG AA contrast against white surfaces (e.g. standard `#FF7A59` has only ~3.2:1 contrast against `#FFFFFF`).
- **Fix:** Engineered an 11-step mathematical palette (`--peach-50` through `--peach-950`):
  - On White (`#FFFFFF`): Light backgrounds use `--peach-50` or `--peach-100`; readable text exclusively uses `--peach-800` (`#A83115`, **6.74:1**) or `--peach-900` (`#87220B`, **7.88:1**).
  - On Dark Slate (`#121016`): Accent text uses `--peach-400` (`#FF9E7A`, **9.38:1**) or `--peach-500` (`#FF7A59`, **7.29:1**).
  - Generated original vector and bitmap asset suite: `favicon.svg`, `favicon.ico`, `apple-touch-icon.png`, `brand/icon-192.png`, `brand/icon-512.png`, `brand/logo.svg`, `brand/peach-mark.svg`, `brand/og-image.png`.

---

## 3. Automated Test Evidence & Verification Matrix

All 4 test suites pass with **100% green status** across 69 assertions:

```
=== Brand Verification Suite (tests/brand.spec.cjs) ===
✅ PASS: Test 1a: Found 46 HTML files generated in dist/
✅ PASS: Test 1b: Zero occurrences of legacy brands across all 46 HTML files
✅ PASS: Test 2: All 9 pages follow the '... | Peach' pattern
✅ PASS: Test 3a: og:site_name is strictly "Peach"
✅ PASS: Test 3b: og:title contains "Peach"
✅ PASS: Test 3c: Schema.org WebSite name is "Peach"
✅ PASS: Test 3d: Schema.org alternateName contains Devanagari "पीच"
✅ PASS: Test 4a: Header logo element (#header-logo) is rendered
✅ PASS: Test 4b: Brand name in header is "Peach"
✅ PASS: Test 4c: Devanagari script badge in header is "पीच"
✅ PASS: Test 4d: Header logo contains original SVG peach icon
✅ PASS: Test 5a: All 9 brand asset endpoints return HTTP 200
✅ PASS: Test 5b: Web App Manifest contains correct brand name
✅ PASS: Test 6a: peach-800 (#A83115) has >= 4.5:1 contrast on white (6.74:1)
✅ PASS: Test 6b: peach-400 (#FF9E7A) has >= 4.5:1 contrast on dark surface (9.38:1)
✅ PASS: Test 6c: peach-900 (#87220B) on peach-100 badge tint has >= 4.5:1 contrast (7.88:1)
✅ PASS: Test 7a: Zero console errors during all brand navigations
✅ PASS: Test 7b: Zero failed HTTP requests during asset crawls
Subtotal: 18 Passed, 0 Failed

=== Domains & Icon Suite (tests/domains.spec.cjs) ===
Subtotal: 15 Passed, 0 Failed

=== i18n & Typography Suite (tests/i18n.spec.cjs) ===
Subtotal: 17 Passed, 0 Failed

=== Card System & Design DNA Suite (tests/card-system.spec.cjs) ===
Subtotal: 19 Passed, 0 Failed

Total Assertions: 69 Passed, 0 Failed (100% Pass Rate)
```

---

## 4. Screenshot Evidence Artifacts

The following high-resolution screenshots are stored in the project workspace for visual inspection:
- Baseline (Before): `homepage_screenshots/round8_brand_before/` (36 files)
- Final (After): `homepage_screenshots/round8_brand_after/` (36 files)
  - `home_desktop_light_hi.png` & `home_desktop_dark_hi.png`
  - `home_desktop_light_en.png` & `home_desktop_dark_en.png`
  - `home_tablet_light_hi.png` & `home_tablet_dark_hi.png`
  - `home_mobile_light_hi.png` & `home_mobile_dark_hi.png`
  - `about_desktop_light_hi.png` & `about_desktop_dark_hi.png`
  - `design_system_desktop_light_hi.png` & `design_system_desktop_dark_hi.png`
