# LOCALE_BUG.md — Root Cause Analysis & Fix Specification

> **Incident Summary:** When selecting "EN" (English) on the Peach homepage, domain cards leaked Devanagari Hindi text (`प्रमुख विषय`, Hindi topic titles `LLMs कैसे काम करते हैं`, `क्यूबिट और सुपरपोज़िशन`), used glued abbreviations (`12मि` instead of `12 min`), and displayed duplicate guide counts (`7 guides` in header pill and glued `7गाइड` in card footer).

---

## 1. Rule #0 Reproduction Evidence

Playwright automated reproduction script (`scripts/reproduce-locale-bug.cjs`) captured baseline screenshots before modification:
- Baseline Screenshot: `homepage_screenshots/round11_locale_bug/01_homepage_initial_hi.png`
- Leaked State Screenshot: `homepage_screenshots/round11_locale_bug/02_homepage_en_selected_leak.png`
- Card Element Detail: `homepage_screenshots/round11_locale_bug/03_domain_card_leak_detail.png`

| UI Element | Leaked State (Observed Before Fix) | Expected Specification (EN Selected) | Expected Specification (हिं Selected) | Status |
| :--- | :--- | :--- | :--- | :--- |
| **Inset Panel Header** | `प्रमुख विषय` (Devanagari) | `Top topics` | `प्रमुख विषय` | **FIXED** |
| **Topic Row 1 Title** | `LLMs कैसे काम करते हैं` | `How LLMs Work` | `LLMs कैसे काम करते हैं` | **FIXED** |
| **Topic Row 2 Title** | `AI एजेंट्स और RAG पाइपलाइन` | `AI Agents and RAG Pipelines` | `AI Agents और RAG पाइपलाइन` | **FIXED** |
| **Topic Row 3 Title** | `प्रॉम्प्ट इंजीनियरिंग गाइड` | `Prompt Engineering Guide` | `प्रॉम्प्ट इंजीनियरिंग गाइड` | **FIXED** |
| **Reading Time Unit** | `12मि` (Glued abbreviation) | `12 min` (Space + English unit) | `12 मिनट` (Space + Hindi word) | **FIXED** |
| **Footer Meta Count** | `7गाइड` (Glued duplicate) | **Removed** (Only header pill shows count) | **Removed** (Only header pill shows count) | **FIXED** |

---

## 2. Root Cause Analysis (5 Potential Failure Modes Audited)

### Root Cause 1: Component Ignored Route Locale (Primary Cause)
The site previously used a single un-prefixed static route `/knowledge-hub/` with a client-side `peach:lang-change` CustomEvent. At build time, Astro statically rendered all HTML using the default server locale (`hi`). Because Astro is a static site generator, subcomponents (`DomainCard.astro`, `InsetPanel.astro`, topic row loops) were permanently baked with Hindi strings. Client-side JavaScript only patched the section header (`#domains-heading`), leaving all card contents in Hindi.

### Root Cause 2: Content Lookup Not Locale-Aware (Secondary Cause)
In `src/data/topics.ts`, topics did not enforce a structured bilingual schema. In `DomainCard.astro`:
```astro
const displayTitle = isHindi ? (topic.shortTitle || topic.title) : (topic.shortTitleEn || topic.shortTitle || topic.title);
```
When `topic.shortTitleEn` was evaluated without checking script or fallback flags, any topic missing an English short title fell back to Hindi `topic.shortTitle`, silently leaking Hindi text onto English pages.

### Root Cause 3: Hardcoded Formatting & Missing Space (Tertiary Cause)
In `DomainCard.astro`:
```astro
<span>{topic.readingMinutes}{isHindi ? 'मि' : 'm'}</span>
```
This hardcoded `{readingMinutes}मि` with zero space between number and unit. Furthermore:
```astro
<span>{topics.length} {isHindi ? 'गाइड' : 'guides'}</span>
```
duplicated the count already displayed in the top-right category pill.

### Root Cause 4: Cached Build Output / Stale JSON
Search index and topic listings were partially indexed with default Hindi titles and summaries, serializing Hindi strings into client-side `<script is:inline define:vars={{ searchData }}>` blocks on English pages.

### Root Cause 5: Client-Side State Toggle Instead of Route Navigation
The language switcher in `Header.astro` used `localStorage` and client state dispatch rather than active URL navigation. It did not change the URL from `/knowledge-hub/` to `/knowledge-hub/en/`, causing server-rendered HTML to remain in the default locale on initial load and refresh.

---

## 3. Systematic Architecture Fix

1. **Astro Route-Based i18n Architecture:**
   - Configured `astro.config.mjs` with `i18n: { defaultLocale: 'hi', locales: ['hi', 'en'], routing: { prefixDefaultLocale: true, redirectToDefaultLocale: false } }`.
   - Created `src/pages/[locale]/index.astro` generating static routes for `/knowledge-hub/hi/` and `/knowledge-hub/en/`.
   - `src/pages/index.astro` provides clean fallback redirecting to `/knowledge-hub/hi/` (or saved preference).

2. **Two Canonical Helpers (`src/i18n/index.ts`):**
   - `t(locale, key, params?)`: Dictionary lookups from `en.json` and `hi.json` with fallback and variable interpolation.
   - `localized(field, locale)`: Structured bilingual accessor with `{ text, isFallback, originalLang }`.
   - `formatReadingTime(minutes, locale)`: Returns `{minutes} min` (EN) and `{minutes} मिनट` (HI) with strict spacing and zero abbreviations.
   - `formatGuidesCount(count, locale)`: Uses `Intl.PluralRules` returning `1 guide` / `{count} guides` (EN) and `{count} गाइड` (HI).

3. **Strict Zod Content Schema (`src/data/schema.ts`):**
   - User-facing fields (`title`, `shortTitle` <= 38 chars, `summary`) validated via Zod.
   - Build fails if translations are missing, unless entry is explicitly flagged `translationPending: true`.

4. **Seed English Titles Implemented (All <= 38 Characters):**
   - **AI & Machine Learning:** `"How LLMs Work"` (13 chars), `"AI Agents and RAG Pipelines"` (27 chars), `"Prompt Engineering Guide"` (24 chars)
   - **Quantum Computing:** `"Qubits and Superposition"` (24 chars), `"Quantum Computing Roadmap"` (25 chars), `"Quantum Gates and Circuits"` (26 chars)
   - **Career & Placement:** `"6-Month DSA Roadmap"` (19 chars), `"Off-Campus Placement Playbook"` (29 chars), `"System Design Interview Primer"` (30 chars)
   - **Projects Hub:** `"Software Projects Guide"` (23 chars)
   - **Tech Fundamentals:** `"Core CS Interview Mastery"` (25 chars), `"OS: Processes, Memory and Locks"` (31 chars), `"Computer Networks: TCP/IP and HTTP"` (34 chars)
   - **Politics & Governance:** `"Constitution & Govt Structure"` (29 chars), `"Election Process: EVM and VVPAT"` (31 chars), `"Union Budget, RTI and DBT"` (25 chars)

5. **Deduplication:**
   - Removed footer guide count from `DomainCard.astro`. Card footer now displays only the primary CTA button.

6. **Segmented Control Route Navigation:**
   - Language toggle buttons in `Header.astro` now actively navigate between equivalent routes (`/en/...` ↔ `/hi/...`), preserving path and scroll target.
   - Preference saved in `localStorage.setItem('peach_preferred_lang', lang)` as a hint for return visits.

7. **Full UI Chrome Audit & Whitelist:**
   - Header wordmark `<span id="header-brand-hi" lang="hi">` whitelisted for dual-script brand representation.
   - Search modal, breadcrumbs, command palette, skip-links, and footer localized to active route locale.

---

## 4. Verification & Automated Test Suite Results

All automated test suites pass with **0 failures**:

```
=== Starting Peach Locale & Language Leak Verification Suite ===
--- Running Test 7: Zod Content Schema Validation ---
✅ PASS: Test 7a: validateTopics passes on fully localized topic
✅ PASS: Test 7b: validateTopics fails when translation is missing
✅ PASS: Test 7c: validateTopics allows missing translation if translationPending: true
✅ PASS: Test 7d: validateTopics fails when shortTitle exceeds 38 characters

--- Running Test 1: Zero Devanagari on English Routes ---
✅ PASS: Test 1a: Found generated HTML files under /en/ (Found: 1)
✅ PASS: Test 1b: Zero unwhitelisted Devanagari characters across all /en/ pages (0 violations)

--- Running Test 2: UI Chrome Language Purity on /hi/ ---
✅ PASS: Test 2a: dist/hi/index.html exists
✅ PASS: Test 2b: Zero unwhitelisted Latin words in Hindi navigation bar (Pure Hindi navigation)

--- Running Test 4: Hydration Test (JavaScript Disabled) ---
✅ PASS: Test 4a: Server HTML has lang="en" before JavaScript execution
✅ PASS: Test 4b: InsetPanel shows "Top topics" in server HTML without JS
✅ PASS: Test 4c: InsetPanel does NOT show Hindi "प्रमुख विषय" without JS
✅ PASS: Test 4d: Reading time shows "12 min" with space without JS
✅ PASS: Test 4e: Server HTML does not contain glued "मि" abbreviation

--- Running Test 5 & 6: Plural Rules, Reading Time & Single Count ---
✅ PASS: Test 6a: Exactly 6 domain cards rendered on /en/
✅ PASS: Test 6b (Card 1): Footer does not duplicate guide count (Found: "Explore domain")
✅ PASS: Test 6b (Card 2): Footer does not duplicate guide count (Found: "Explore domain")
✅ PASS: Test 6b (Card 3): Footer does not duplicate guide count (Found: "Explore domain")
✅ PASS: Test 6b (Card 4): Footer does not duplicate guide count (Found: "Explore domain")
✅ PASS: Test 6b (Card 5): Footer does not duplicate guide count (Found: "Explore domain")
✅ PASS: Test 6b (Card 6): Footer does not duplicate guide count (Found: "Explore domain")
✅ PASS: Test 5a: Plural count in English outputs "7 guides" with space (Found: "7 guides")
✅ PASS: Test 5b: Singular count in English outputs "1 guide" with space (Found: "1 guide")
✅ PASS: Test 5c: Hindi plural count outputs "7 गाइड" with space (Found: "7 गाइड")
✅ PASS: Test 5d: Hindi singular count outputs "1 गाइड" with space (Found: "1 गाइड")
✅ PASS: Test 5e: Hindi reading time outputs "12 मिनट" with space (Found: "12 मिनट")
✅ PASS: Test 5f: Hindi reading time does NOT use glued "मि"

--- Running Test 3: Segmented Toggle Navigation ---
✅ PASS: Test 3a: Initial page is on /en/ route
✅ PASS: Test 3b: Initial html[lang] is "en"
✅ PASS: Test 3c: Clicking हिं navigates to /hi/ route (URL: .../knowledge-hub/hi/)
✅ PASS: Test 3d: Navigating to /hi/ updates html[lang] to "hi"
✅ PASS: Test 3e: Hindi page shows "प्रमुख विषय" in card inset panel
✅ PASS: Test 3f: Hindi page does NOT show "Top topics"
✅ PASS: Test 3g: Clicking EN navigates to /en/ route (URL: .../knowledge-hub/en/)
✅ PASS: Test 3h: Navigating to /en/ updates html[lang] to "en"
✅ PASS: Test 3i: English page shows "Top topics" in card inset panel
✅ PASS: Test 3j: English page does NOT show "प्रमुख विषय"

--- Running Test 8: Responsive Before/After Screenshot Captures ---
✅ PASS: Test 8: Generated responsive screenshots for 360, 768, 1440 (light & dark, EN & HI)

=== Locale Test Suite Summary: 37 Passed, 0 Failed ===
```

Overall Test Status across whole project:
- `tests/domains.spec.cjs`: 15 Passed, 0 Failed
- `tests/i18n.spec.cjs`: 17 Passed, 0 Failed
- `tests/card-system.spec.cjs`: 19 Passed, 0 Failed
- `scripts/check-hinglish.cjs`: 0 Hinglish violations
- `tests/brand.spec.cjs`: 18 Passed, 0 Failed
- `tests/prompt-studio.spec.cjs`: 14 Passed, 0 Failed
- `tests/locale.spec.cjs`: 37 Passed, 0 Failed

---

## 5. Responsive Baseline Screenshots Saved

Generated by Playwright in `homepage_screenshots/round11_locale_bug/`:
- `en_360_mobile_light.png`
- `en_360_mobile_dark.png`
- `en_768_tablet_light.png`
- `en_768_tablet_dark.png`
- `en_1440_desktop_light.png`
- `en_1440_desktop_dark.png`
- `hi_360_mobile_light.png`
- `hi_360_mobile_dark.png`
- `hi_768_tablet_light.png`
- `hi_768_tablet_dark.png`
- `hi_1440_desktop_light.png`
- `hi_1440_desktop_dark.png`
- `nav_after_click_hi.png`
- `nav_after_click_en.png`

---

## 6. Final List of Untranslated Strings & Whitelisted Technical Terms

### Homepage Chrome Untranslated Strings:
- **Zero remaining untranslated strings.** All homepage UI chrome is 100% translated into both English and Hindi dictionaries (`en.json`, `hi.json`).

### Whitelisted Technical Terms (Allowed on Hindi pages):
- `LLM`, `LLMs`, `RAG`, `API`, `GitHub`, `DSA`, `OS`, `CS`, `TCP/IP`, `HTTP`, `HTTP/3`, `EVM`, `VVPAT`, `RTI`, `DBT`, `AI`, `ML`, `AI/ML`, `Qiskit`, `Peach`, `Python`, `Docker`, `SQL`, `DBMS`, `OOP`, `Kaggle`, `VADER`, `MuRIL`, `NQM`, `NIST`, `PQC`, `FIPS`, `RSA`, `FTQC`, `NISQ`, `CC BY-SA 4.0`, `ESC`, `19+`, `3.8M`, `3.84M`.
