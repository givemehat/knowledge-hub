# 🧬 Bodh Design System: The Card DNA (CARD_DNA.md)

> **Document Status:** Authoritative Design Specification (Prompt 9)  
> **Reference Component:** Resource Card (`src/components/ui/ResourceCard.astro`)  
> **Goal:** Unified Visual Language across Domain Cards, Topic Pages, Roadmap Nodes, Updates, and About  

---

## 1. Design Philosophy & Architectural Vision

The Bodh platform derives its aesthetic authority from **quiet confidence, optical precision, and zero visual noise**. Rather than relying on generic AI-template rainbow gradients, heavy drop shadows, or floating cards, Bodh establishes depth through **hairline structural borders, disciplined 8pt spacing, and authentic inset surfaces**.

The **Resource Card** is our foundational archetype. It is calm, trustworthy, and instantly scannable. By extracting its structural DNA into reusable tokens and atomic components, every card on Bodh—from domain navigation to roadmap milestones and interview exercises—now feels like part of a single, coherent operating system.

---

## 2. The 5 Core Principles of Card DNA

### 1. Surface & Depth (Zero Heavy Shadows)
- **Background:** Pure white (`bg-white` / `#FFFFFF`) in light mode; deep slate/obsidian (`dark:bg-darkcard` / `#1A1722`) in dark mode.
- **Canvas Contrast:** Sits on warm off-white canvas (`#FAF8F5` in light, `#121016` in dark).
- **Border:** 1px hairline border (`border border-slate-200/90 dark:border-white/10`).
- **Corner Radius:** Generous `24px` (`rounded-2xl` / `rounded-3xl`).
- **Shadow:** Micro-elevation only (`shadow-apple-sm` or `shadow-2xs`). Depth is created by border contrast and inset layering, never aggressive drop shadows.

### 2. Strict Visual Anatomy (Top to Bottom)
Every card on Bodh follows a predictable vertical sequence:

```
┌────────────────────────────────────────────────────────┐
│  [ CHIP: TYPE ]              [ CHIP: LANG ] [ CHIP: FREE ] │ ← 1. Chip Header Row
│                                                        │
│  [ MEDIA / THUMBNAIL / ICON TILE ] (Optional)          │ ← 2. Media / Visual Slot
│                                                        │
│  Semibold Card Title (18–20px, max 2 lines)             │ ← 3. Primary Title
│  Muted description or metadata                          │
│                                                        │
│  ┌──────────────────────────────────────────────────┐  │
│  │ 💡 Inset Label (Indigo text + 14px icon)          │  │ ← 4. Signature InsetPanel
│  │    Short, high-clarity explanatory takeaway       │  │    (Soft tinted surface)
│  └──────────────────────────────────────────────────┘  │
│                                                        │
│  ────────────────────────────────────────────────────  │ ← 5. Hairline Divider
│  Author / Timestamp / Status       [ Action Pill → ]   │ ← 6. Pinned Footer Row
└────────────────────────────────────────────────────────┘
```

1. **Top Chip Row:** 
   - Left: Neutral type chip (`bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300`, uppercase tracking).
   - Right: Small tinted status chips (Language in peacock/teal tint, Price/Free in indigo tint, Phase in saffron tint).
2. **Media Slot (Optional):**
   - 16:9 YouTube video thumbnail with duration badge and play icon overlay for video resources.
   - 56px soft-tinted `IconTile` for domain categories, exercises, or tools.
3. **Title:** Semibold/bold (`font-bold text-base sm:text-lg text-slate-900 dark:text-white leading-snug`), max 2 lines with tight optical leading.
4. **Signature InsetPanel:** A softly tinted rounded container (`bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-white/5 rounded-xl p-3.5`). Contains an indigo label with a 14px vector icon (e.g., "Why We Recommend", "TL;DR", "Top Topics", "Deliverable", "Myth vs Reality") and factual, concise explanation.
5. **Hairline Divider:** Clean 1px separator (`border-t border-slate-100 dark:border-slate-800/80`).
6. **Pinned Footer:** Muted metadata/byline on the left (`text-xs text-slate-500`), exactly **one high-contrast ink-coloured pill button** on the right (`bg-slate-900 text-white dark:bg-white dark:text-slate-900 rounded-full font-bold px-3.5 py-1.5`).

### 3. Colour Discipline
- **Neutral Canvas:** 90% of card visual area is monochrome (slate, white, obsidian).
- **Electric Indigo Accent:** `text-brand-600 dark:text-brand-400` is the exclusive accent for inset labels, hover transitions, and active links.
- **Restrained Tints:** Subtle 10% opacity tints for semantic status (Peacock teal for verified/language, Emerald for beginner/complete, Saffron for warnings/phases).
- **Ink Button:** One primary action button per card. Ink-filled (slate-900 in light mode, white in dark mode). **Zero rainbow gradients**.

### 4. Layout Discipline (8pt Spatial System)
- **Equal-Height Rows:** Grid rows enforce `auto-rows-fr` and cards enforce `h-full flex flex-col justify-between`.
- **Pinned Bottoms:** Footers use `mt-auto` to guarantee bottom alignment across uneven text lengths.
- **Consistent Internal Padding:** Exactly `24px` (`p-6`) on desktop and `20px` (`p-5`) on mobile.
- **Touch Target Integrity:** All action buttons satisfy `>= 44px` interactive touch targets.

### 5. Dual-Script Typography Engine
- Single harmonious font pairing: **Noto Sans Devanagari** + **Plus Jakarta Sans / Inter**.
- Hindi typography rules strictly preserved:
  - `letter-spacing: 0 !important;` (Zero collided matras).
  - `text-transform: none !important;` (Devanagari has no uppercase; chips retain natural case).
  - Body line-height `1.75`; Heading line-height `1.35`.
  - Authentic Purna-Viram (`।`) on all Hindi sentences.
  - Tabular numerals (`tabular-nums`) for reading times, durations, and dates.

---

## 3. Shared Component Token Mapping

| Component | File Path | Key Roles & Variants |
|---|---|---|
| **`Card`** | `src/components/ui/Card.astro` | Base surface, 24px radius, hairline border, micro-hover, stretched-link, `data-component="card"`. |
| **`Chip`** | `src/components/ui/Chip.astro` | Status and category badges. Variants: `neutral`, `language`, `free`, `status`, `level`, `phase`. Sizes: `sm`, `md`. |
| **`InsetPanel`** | `src/components/ui/InsetPanel.astro` | Signature indented takeaway box. Variants: `recommend`, `tldr`, `note`, `warning`, `myth`, `factcheck`, `source`, `deliverable`, `top-topics`. |
| **`CardFooter`** | `src/components/ui/CardFooter.astro` | Hairline divider, left metadata slot, right action pill slot. |
| **`Button`** | `src/components/ui/Button.astro` | Primary ink pill, tonal, outline, ghost, icon-only. 44px min touch target. |
| **`IconTile`** | `src/components/domains/IconTile.astro` | 56px soft-tinted surface (10–14% opacity) + 28px duotone vector. |
| **`MetaRow`** | `src/components/ui/MetaRow.astro` | Key-value pairs with vector icons, eliminating glued text strings. |

---

## 4. Anti-Patterns (What We NEVER Do)

- ❌ **No Rainbow Gradient Cards:** No multi-color gradient fills across card backgrounds.
- ❌ **No Multiple Primary Buttons:** At most ONE dark ink pill button per card. Secondary actions must be ghost or text links.
- ❌ **No Glued Labels & Values:** Never concatenate labels without explicit DOM keys (e.g., `Difficultyintermediate` is forbidden).
- ❌ **No Mid-Word Truncations:** Use calibrated `shortTitle`s rather than cutting words off mid-character with `…`.
- ❌ **No Unsourced Superlatives:** Never use "best", "gold standard", or "most comprehensive" without an adjacent factual citation.
- ❌ **No Fake/Broken Links:** Every resource URL must be tested and confirmed 200 OK.
