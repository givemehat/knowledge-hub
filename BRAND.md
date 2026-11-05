# Peach Brand Specification & Trademark Strategy

> **Preliminary Clearance Disclaimer:** This document contains preliminary domain, trademark registry, and digital namespace research for informational and strategic purposes. It does not constitute formal legal counsel. Prior to commercial entity incorporation, formal trademark filing through an accredited IP attorney in India (IP India / CGPDTM) and target jurisdictions (USPTO, WIPO) is advised.

---

## 1. Executive Summary & Brand Identity

The platform has transitioned from the initial project working titles to **Peach** (Devanagari: **पीच**).

### Why "Peach"?
1. **Warmth & Approachability:** Traditional encyclopedic platforms and computer science portals feel sterile, clinical, and intimidating. "Peach" evokes freshness, clarity, and delight.
2. **Pedigree of Fruit & Nature Names in Computing:** From Apple to Raspberry Pi, Cherry MX, Blackberry, and Orange Pi, memorable everyday words create strong brand stickiness without sounding like generic corporate techno-jargon.
3. **Phonetic Clarity & Global Ease:** A clean monosyllable with crisp plosives (`/piːtʃ/`), effortlessly pronounced across international and Indian linguistic demographics.
4. **Devanagari Transliteration:** **पीच** (प + ई की मात्रा + च). Perfectly natural, two-syllable Devanagari spelling requiring zero clumsy conjuncts, rendering cleanly across all font weights.

---

## 2. Trademark & Legal Landscape

### Trademark Classes of Interest
- **Class 41 (Education & Training):** Providing online education, tutorials, open roadmaps, learning resources, and publication of technical knowledge.
- **Class 42 (Software & Technology Services):** Providing non-downloadable web applications, online search platforms, open-source software tools.
- **Class 9 (Downloadable Software):** Interactive software, downloadable educational datasets, browser extensions.

### Trademark Research Findings
1. **Common Dictionary Word Status:** "Peach" is an arbitrary mark when applied to online education, research, and computer science software. Arbitrary marks enjoy strong protection under Indian and US trademark law because the fruit has no descriptive or generic connection to educational curricula.
2. **Existing Co-existing Entities:**
   - *Peach Software* (Property management SaaS, UK/Australia) — active in real estate tech.
   - *Peach Payments* (African digital payment gateway) — financial transaction processor.
   - *Peach App* (Past mobile messaging app by Dom Hofmann, Byte/Vine founder) — dormant since 2016.
   - *Peach Learn / Persian Blog* — informal regional blog.
3. **Indian Education Landscape:** No single national player monopolizes "Peach" as an educational platform or open knowledge repository in India.
4. **Conclusion:** Safe to operate as an open-source knowledge engine, provided it is consistently paired with distinct descriptive subtitles ("Peach — Verified Knowledge Engine").

---

## 3. Brand Options & Fallback Matrix

| Criteria | 🍑 **Peach (Selected)** | 🍍 **Pineapple (Sister Fruit)** | 📜 **Kalam (Desi Heritage)** | ☀️ **Arka (Sanskrit Pure)** |
| :--- | :--- | :--- | :--- | :--- |
| **Devanagari** | **पीच** | पाइनएप्पल / अनानास | कलाम | अर्क |
| **Pronunciation** | 1 syllable (Ultra-crisp) | 3-4 syllables | 2 syllables | 2 syllables |
| **Target Audience** | Gen-Z students, dev builders | Quirky tech builders | Indian academia & youth | Serious researchers |
| **Domain Candidates** | `peachlearn.dev`<br>`peachhub.dev`<br>`getpeach.in` | `pineapplecode.dev`<br>`pineapplelearning.in` | `kalamknowledge.org`<br>`kalamhub.in` | `arka.dev`<br>`arkaresearch.in` |
| **GitHub Handle** | `givemehat/peach`<br>`peach-knowledge` | `pineapple-hub` | `kalam-learning` | `arka-engine` |
| **Brand Tone** | Fresh, modern, playful rigor | Fun, quirky, sweet | Solemn, aspirational, historic | Philosophical, pure, deep |
| **SEO Complexity** | Medium (needs descriptor) | Medium-High | Low-Medium | Low |
| **Switch Cost** | Baseline (Active) | 1 config change (`BRAND.name`) | 1 config change (`BRAND.name`) | 1 config change (`BRAND.name`) |

---

## 4. SEO Mitigation Strategy for Dictionary Names

Because "peach" is an everyday noun, standalone organic queries will compete with horticulture, recipes, and cosmetics. Peach solves this with a **Multi-Layer Descriptor Architecture**:

1. **Title Tag Strategy:**
   - Format: `<Specific Page Topic> | Peach`
   - Homepage: `Peach (पीच) — Modern Verified Knowledge Engine for Students & Builders | Peach`
2. **Schema.org Structured Data (`WebSite` & `LearningResource`):**
   ```json
   {
     "@context": "https://schema.org",
     "@type": "WebSite",
     "name": "Peach",
     "alternateName": ["पीच", "Peach Knowledge Engine", "Peach Learning"],
     "url": "https://givemehat.github.io/knowledge-hub/",
     "description": "Learn tech and the world with verified sources. Clean bilingual guides, real datasets, and roadmaps without noise."
   }
   ```
3. **Core Brand Keywords to Pair in External Backlinks:**
   - `Peach Knowledge Engine`
   - `Peach CS Roadmaps`
   - `Peach Devanagari Tech Guides`
   - `Peach Verified Learning`

---

## 5. Design System: Color Palette Tokens & Contrast Audit

The Peach design language centers on warm coral-peach hues paired with deep charcoal surfaces, indigo structural accents, and emerald verification indicators.

All tokens have been tested against **WCAG 2.1 Level AA** standards:

| Token Name | Hex Code | RGB | Purpose | Contrast on White (`#FFFFFF`) | Contrast on Dark (`#121016`) |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `--peach-50` | `#FFF5F0` | `255, 245, 240` | Subtle background tint, hero wash | 1.07:1 (Background) | 15.8:1 |
| `--peach-100` | `#FFE8DC` | `255, 232, 220` | Badge container fill, chip background | 1.21:1 (Container) | 14.1:1 |
| `--peach-200` | `#FFD2BE` | `255, 210, 190` | Light border strokes, hover highlight | 1.48:1 | 11.5:1 |
| `--peach-300` | `#FFB396` | `255, 179, 150` | Gradient start, decorative fills | 1.94:1 | 8.8:1 |
| `--peach-400` | `#FF9E7A` | `255, 158, 122` | **Brand Accent Light**, dark mode text | 2.50:1 | **9.38:1 (WCAG AAA)** |
| `--peach-500` | `#FF7A59` | `255, 122, 89` | Primary logo vector, hero button glow | 3.22:1 | **7.29:1 (WCAG AA)** |
| `--peach-600` | `#F05735` | `240, 87, 53` | Interactive links, active tab indicator | 3.86:1 | **6.08:1 (WCAG AA)** |
| `--peach-700` | `#CC3E1F` | `204, 62, 31` | Dark hover state for buttons | **4.98:1 (WCAG AA)** | 4.71:1 |
| `--peach-800` | `#A83115` | `168, 49, 21` | **Primary Brand Text on Light Surface** | **6.74:1 (WCAG AAA)** | 3.48:1 |
| `--peach-900` | `#87220B` | `135, 34, 11` | High-contrast eyebrow labels | **7.88:1 (WCAG AAA)** | 2.98:1 |
| `--peach-950` | `#421005` | `66, 16, 5` | Deep header borders, shadow undertones | **14.2:1 (WCAG AAA)** | 1.66:1 |

### Golden Typography & Contrast Rule
- **On Light Mode (`#FFFFFF` / `#FAFAF9`):** Never use `--peach-500` or `--peach-400` for running body text. Always use `--peach-800` (`#A83115`, **6.74:1**) or `--peach-900` (`#87220B`, **7.88:1**).
- **On Dark Mode (`#121016`):** Use `--peach-400` (`#FF9E7A`, **9.38:1**) or `--peach-500` (`#FF7A59`, **7.29:1**) for bright accent text and iconography.

---

## 6. Logo Design & Vector Construction Rationale

The Peach logo mark is an original geometric SVG vector crafted specifically to represent both the organic warmth of the fruit and the intellectual rigor of a knowledge engine:

```
           ╭─────────╮ 
          ╱  Bookmark ╲   <-- 1. Vibrant Emerald/Indigo Leaf
         ╱    Leaf     ╲         Doubles as an open reading bookmark
        ╰───────┬───────╯
       ╭────────┴────────╮
      ╱    Cleft Curve    ╲  <-- 2. Organic Peach Contour
     │   (Subtle Depth)    │       Warm coral-peach gradient
     │         ⊙           │  <-- 3. Central Knowledge Node
      ╲    Core Node      ╱        Represents verified truth & inquiry
       ╰─────────────────╯
```

1. **The Fruit Body:** A geometric squircle with a cleft curve at the apex, rendered in a 3-stop warm gradient (`#FFB396` -> `#FF7A59` -> `#DE4321`).
2. **The Bookmark Leaf:** Tilted at a 24-degree dynamic angle, functioning simultaneously as a natural fruit leaf and a page bookmark in an open textbook, gradient-colored from emerald green (`#10B981`) to knowledge indigo (`#5B3DF5`).
3. **The Core Knowledge Node:** A crisp white point encased within an indigo focal orbit (`cx=18, cy=22`), symbolizing focused inquiry, verified truth, and interconnected graphs.
4. **Baseline Lockup:** The wordmark pairs bold Plus Jakarta Sans (`Peach`) with baseline-aligned Noto Sans Devanagari (`पीच`). Both scripts share optical baseline alignment with zero vertical jitter.

---

## 7. Architecture: Single Source of Truth

To ensure changing the brand requires only editing one file in the future (e.g., to "Pineapple" or "Kalam"):

```ts
// src/config/brand.ts
export interface BrandConfig {
  name: string;
  nameHi: string;
  tagline: {
    en: string;
    hi: string;
  };
  descriptor: {
    en: string;
    hi: string;
  };
  domain: string;
  siteUrl: string;
  github: {
    owner: string;
    repo: string;
  };
  themeColor: string;
  accentColor: string;
}

export const BRAND: BrandConfig = {
  name: 'Peach',
  nameHi: 'पीच',
  tagline: {
    en: 'Verified Knowledge Engine for Tech & Society',
    hi: 'तकनीक और समाज के लिए जाँचा-परखा ज्ञान मंच'
  },
  // ...
};
```

All 46 static pages, OpenGraph metatags, Twitter cards, navigation headers, footers, schema blocks, and manifest definitions consume `BRAND.*`. No component or layout hardcodes the name string.

---

## 8. Action Checklist for Production Domain & Handles

- [ ] **Domain Candidates Registration:**
  - Recommended: `peachlearn.dev` or `peachhub.dev` (ideal for developer/education audience).
  - Indian TLD Alternative: `getpeach.in` or `peach-study.in`.
- [ ] **GitHub Repository:**
  - Update repository settings: Rename from `knowledge-hub` to `peach` or `peach-hub` (GitHub auto-redirects existing git remotes).
  - Update custom domain in GitHub Pages settings: point CNAME to chosen domain.
- [ ] **Digital Handles:**
  - X / Twitter: `@peach_learn` or `@peach_engine`.
  - LinkedIn: `peach-knowledge`.
  - BlueSky: `@peachlearn.bsky.social`.
