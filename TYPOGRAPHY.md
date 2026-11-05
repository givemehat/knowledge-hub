# 🔤 Bodh Typography System & Bilingual Rules (TYPOGRAPHY.md)

> **Standard:** Bodh Dual-Script Typography Guidelines (Prompt 8)  
> **Typefaces:** Plus Jakarta Sans & Inter (Latin) + Noto Sans Devanagari (Devanagari) + JetBrains Mono (Code)  
> **Status:** Production Verified  

---

## 1. Core Principles: Devanagari vs Latin

Devanagari is a syllabic Brahmic script with a continuous hanging top headline (*shirorekha*), ascenders (*matras*), and conjuncts (*samyuktakshar*). Applying Latin typographic conventions (like negative letter-spacing or uppercase transformation) directly to Devanagari breaks the visual rhythm and causes legibility failure.

### 5 Non-Negotiable Rules for Devanagari Typography:
1. **Zero Negative Letter-Spacing**: Devanagari characters and shirorekha must touch naturally. `letter-spacing` must ALWAYS be `0` or `normal`. Negative tracking (`-0.02em` or `-0.05em`) causes matras to collide and squish.
2. **Zero ALL CAPS / Text-Transform**: Devanagari has no concept of capital letters. Applying `uppercase` or `text-transform: uppercase` is strictly forbidden.
3. **Line-Height Adjustment (+25%)**: Devanagari matras (e.g. *ee-kar*, *oo-kar*, *chhoti-ee*) extend both above and below the baseline. Body line-height must be strictly `>= 1.65` (recommended `1.75`), and headings `>= 1.3`.
4. **Font-Size Optical Compensation (+1px)**: Due to higher visual density, Hindi body copy is rendered at `17px` when English is at `16px`, providing an identical x-height and optical balance.
5. **Authentic Punctuation**:
   - Sentences end with the Purna-Viram (`।`), not English full stops (`.`).
   - Dashes use spaced en-dashes (` – `), not unspaced em-dashes (`—`).

---

## 2. CSS Architecture Rules

```css
/* Universal Latin Typography */
:lang(en) h1, :lang(en) h2 {
  letter-spacing: -0.02em;
  line-height: 1.1;
  text-wrap: balance;
}

:lang(en) p {
  letter-spacing: 0;
  line-height: 1.65;
  text-wrap: pretty;
}

/* Devanagari Precision Rules */
:lang(hi) {
  letter-spacing: 0 !important;
  word-spacing: 0;
  text-transform: none !important;
  line-height: 1.75;
}

:lang(hi) h1,
:lang(hi) h2,
:lang(hi) h3,
:lang(hi) h4 {
  letter-spacing: 0 !important;
  line-height: 1.3;
  font-weight: 700;
  text-transform: none !important;
  text-wrap: balance;
}

:lang(hi) p {
  letter-spacing: 0 !important;
  line-height: 1.75;
  text-wrap: pretty;
}

/* Tabular Numerals for Metrics & Timestamps */
.tabular-nums {
  font-variant-numeric: tabular-nums;
}
```

---

## 3. Mixed-Script Harmonic Setting (Technical Terms in Hindi)

Technical English terms (e.g., `LLM`, `RAG`, `API`, `Git`, `Python`) embedded within Devanagari sentences are set using our unified font stack:
```css
font-family: 'Plus Jakarta Sans', 'Inter', 'Noto Sans Devanagari', system-ui, sans-serif;
```
Both fonts share a calibrated x-height so that technical words sit level on the baseline without upward or downward visual jitter.
