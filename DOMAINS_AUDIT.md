# 🔍 Bodh (बोध) Domains Section & Typography Audit (DOMAINS_AUDIT.md)

> **Document Status:** Complete & Verified  
> **Target Release:** Prompt 8 Overhaul  
> **Scope:** Domain Cards Grid, Semantic Icon Architecture, Bilingual i18n (Hindi/English), and Devanagari Typography Engine  

---

## 1. Executive Summary & Audit Overview

In Prompt 8, the "Chune hue domains" section of Bodh was audited against Apple HIG, Google Material Design 3, and authentic Indian typography standards. The previous implementation suffered from severe semantic mismatches, duplicate topic rows, empty ghost cards, mid-word title truncations (`…`), chaotic three-script mixing (Roman-Hindi + Devanagari + English), and negative letter-spacing that damaged Devanagari conjuncts.

All of these issues have been completely engineered and verified through automated Playwright test suites (15/15 in `tests/domains.spec.cjs`, 17/17 in `tests/i18n.spec.cjs`, 15/15 in `tests/homepage.spec.cjs`, 0 violations in `scripts/check-hinglish.cjs`) and multi-device screenshot captures across `(hi/en) × (light/dark) × (360/768/1440px)`.

---

## 2. Bug-by-Bug Audit & Resolution Matrix

| # | Bug Observed in Screenshot | Root Cause | Engineering Solution | Verification Status |
| :--- | :--- | :--- | :--- | :--- |
| **01** | **Semantic Mismatch: AI = Microphone** | Hardcoded generic audio icon in `BentoGrid.astro`. AI is cognitive reasoning, not speech recording. | Replaced with custom **Synaptic Neural Brain** duotone vector (`IconTile.astro`) with neuron nodes, axonic connections, and soft 10% indigo surface tint. | ✅ Verified (Test 3a PASS) |
| **02** | **Semantic Mismatch: Projects = Star** | Star is a browser bookmark or favourite symbol, completely inappropriate for software projects. | Replaced with **Rocket Ship Launch & Propulsion** vector (`IconTile.astro`), symbolizing shipping production code. | ✅ Verified (Test 3b PASS) |
| **03** | **Semantic Mismatch: Politics = House** | Residential house icon looked like a website "Home" button rather than governance/constitution. | Replaced with **Constitutional Landmark & Pillars of Law** vector (`IconTile.astro`), symbolizing parliament and democracy. | ✅ Verified (Test 3c PASS) |
| **04** | **Color Repetition & Weak Weight** | Tech Fundamentals and Projects both used generic orange tiles with 36px thin line icons in 100px cards. | Established a dedicated 6-color palette token system (`--cat-ai`, `--cat-quantum`, `--cat-career`, `--cat-projects`, `--cat-fundamentals`, `--cat-gov`) with 28px duotone vectors in 56px rounded-2xl tiles with 1px border. | ✅ Verified (Visual Inspection & Spec) |
| **05** | **Duplicate Topic in Quantum Card** | `qubits-superposition-entanglement` and legacy `qubits-superposition` both had identical titles: *"Qubits, Superposition और Entanglement"*. | Retitled `qubits-superposition` to *"क्वांटम गेट्स और सर्किट्स"* (`Quantum Gates & Circuits`), ensuring all 3 topic rows are 100% unique. | ✅ Verified (Test 5 PASS) |
| **06** | **Tech Fundamentals 0 Guides** | `core-cs-subjects-interview` was misclassified under category `career` instead of `tech-fundamentals`. | Corrected category to `tech-fundamentals` and authored 2 rich foundational topics (`Operating Systems` and `Computer Networks`), bringing total to 3 verified guides. | ✅ Verified (Test 4 PASS) |
| **07** | **Singular/Plural Grammar Bug** | Card header hardcoded `${count} Guides`, displaying *"1 Guides"* for Projects. | Implemented grammatical pluralization logic in `DomainCard.astro`: `"1 गाइड"` / `"${n} गाइड"` in Hindi, and `"1 guide"` / `"${n} guides"` in English. | ✅ Verified (Test 7a, 7b, 4e, 4f PASS) |
| **08** | **Mid-Word Title Truncation (`…`)** | Long titles (70+ characters) overflowed cards, getting cut off mid-word (e.g. *"LLMs कैसे काम करते हैं: Token…"*). | Added calibrated `shortTitle` (<= 38 chars) for every topic (e.g. *"LLMs कैसे काम करते हैं"*), eliminating truncation ellipsis completely. | ✅ Verified (Test 6a, 6b PASS: 0 violations) |
| **09** | **Unequal Heights & Broken Alignment** | AI/ML card spanned 2 columns on tablet; cards lacked `auto-rows-fr` and `h-full`, creating ragged card heights. | Structured CSS grid with `grid-cols-1 md:grid-cols-2 lg:grid-cols-3 auto-rows-fr` and `h-full` on cards. All cards in each row have identical height (0px delta). | ✅ Verified (Test 2b, 2c PASS: 0px delta) |
| **10** | **Chaotic Script Mixing (Hinglish)** | Mixed Roman-Hindi slang (*"Chune Hue Domains"*, *"Kya seekhna hai aaj?"*, *"Domain explore karo"*) with Devanagari and English. | Established strict i18n architecture with `src/i18n/hi.json` (pure Devanagari) and `src/i18n/en.json` (pure English), enforced via automated linter `check-hinglish.cjs`. | ✅ Verified (check-hinglish PASS: 0 errors) |
| **11** | **Devanagari Typography Distortion** | Negative letter-spacing (`-0.02em`) collided Devanagari matras; missing Purna-viram (`।`). | Enforced the **5 Non-Negotiable Devanagari Rules**: `letter-spacing: 0 !important`, `text-transform: none !important`, `line-height: 1.75` for body, `1.35` for headings, authentic Purna-Viram (`।`), and tabular figures. | ✅ Verified (Test 3a, 3b PASS) |

---

## 3. Bilingual i18n Architecture

The Bodh platform now operates under a strict two-locale system with zero intermediate slang:

### Pure Devanagari Hindi (`DEFAULT_LOCALE = 'hi'`):
- Eyebrow: **चुने हुए विषय**
- Heading: **आज क्या सीखना है?**
- Subtext: **टेक की बुनियाद से लेकर एडवांस्ड AI और संविधान तक, हर विषय पर जाँचे-परखे गाइड और रोडमैप।**
- View All Button: **सभी 21 विषय देखें →**
- Card Action: **विषय देखें**
- Empty State: **जल्द आ रहा है** (इस विषय पर शोध और लेखन जारी है)

### Pure English (`locale = 'en'`):
- Eyebrow: **Explore domains**
- Heading: **What do you want to learn today?**
- Subtext: **From computer science fundamentals to advanced AI and governance, verified guides and roadmaps for every domain.**
- View All Button: **View all 21 topics →**
- Card Action: **Explore domain**
- Empty State: **Coming Soon** (Research and development in progress for this domain)

---

## 4. Playwright Automated Verification Evidence

### Suite 1: Domain Cards Grid & Icons (`tests/domains.spec.cjs`)
```
=== Starting Bodh Domains Section & Icon Overhaul Test Suite ===
[Setup] Starting local preview server on port 4323...
✅ PASS: Test 1: 6 domain cards rendered in domains section (Found: 6)
✅ PASS: Test 2a: All 6 cards have valid bounding boxes 
✅ PASS: Test 2b: Row 1 cards have equal heights (<= 3px delta) (Heights: 439, 439, 439px, Delta: 0px)
✅ PASS: Test 2c: Row 2 cards have equal heights (<= 3px delta) (Heights: 439, 439, 439px, Delta: 0px)
✅ PASS: Test 3a: AI & ML uses Neural Brain duotone icon, NOT microphone 
✅ PASS: Test 3b: Projects Hub uses Rocket ship launch icon, NOT star 
✅ PASS: Test 3c: Governance uses Constitutional Landmark & Pillars icon, NOT house 
✅ PASS: Test 3d: Tech Fundamentals uses Layered Isometric System Architecture 
✅ PASS: Test 4: Tech Fundamentals is fully populated with 3 guides (Found: "3 गाइड")
✅ PASS: Test 5: Quantum Computing has 3 completely distinct topics (Zero duplication) (Titles: ["क्यूबिट और सुपरपोज़िशन\n11मि","क्वांटम कंप्यूटिंग रोडमैप\n13मि","क्वांटम गेट्स और सर्किट्स\n11मि"])
✅ PASS: Test 6a: Zero topic titles exceed 38 characters (Violations: 0)
✅ PASS: Test 6b: Zero topic titles end with mid-word truncation ellipsis "…" (Violations: 0)
✅ PASS: Test 7a: Correct Hindi singular plural: "1 गाइड" for single guide (Found: "1 गाइड")
✅ PASS: Test 7b: Correct Hindi plural: "6 गाइड" for multiple guides (Found: "6 गाइड")
✅ PASS: Test 8: Zero console errors on homepage during render 

=== Test Summary: 15 Passed, 0 Failed ===
```

### Suite 2: i18n & Typography Engine (`tests/i18n.spec.cjs`)
```
=== Starting Bodh i18n & Typography Automated Test Suite ===
[Setup] Starting local preview server on port 4324...
✅ PASS: Test 1: Default document lang is "hi" (Devanagari Hindi) (Found: "hi")
✅ PASS: Test 2a: Domain eyebrow is pure Hindi ("चुने हुए विषय") (Found: "चुने हुए विषय")
✅ PASS: Test 2b: Domain heading is pure Hindi ("आज क्या सीखना है?") (Found: "आज क्या सीखना है?")
✅ PASS: Test 2c: Domain subtext is pure Hindi with Purna-viram (।)
✅ PASS: Test 2d: Domain CTA is pure Hindi ("विषय देखें") (Found: "विषय देखें")
✅ PASS: Test 2e: Zero Roman-Hindi slang in domains section text (Violations: )
✅ PASS: Test 3a: Devanagari heading enforces letter-spacing: 0 (No negative letter-spacing) (Found: "normal")
✅ PASS: Test 3b: Devanagari heading enforces text-transform: none (No uppercase breakage) (Found: "none")
✅ PASS: Test 4a: Switching to EN updates html[lang] to "en" (Found: "en")
✅ PASS: Test 4b: Domain eyebrow updates to "Explore domains" (Found: "Explore domains")
✅ PASS: Test 4c: Domain heading updates to "What do you want to learn today?" (Found: "What do you want to learn today?")
✅ PASS: Test 4d: Domain CTA updates to "Explore domain" (Found: "Explore domain")
✅ PASS: Test 4e: English singular count pill renders "1 guide" (Found: "1 guide")
✅ PASS: Test 4f: English plural count pill renders "6 guides" (Found: "6 guides")
✅ PASS: Test 5a: Switching back to हिं updates html[lang] to "hi" (Found: "hi")
✅ PASS: Test 5b: Domain eyebrow returns to "चुने हुए विषय" (Found: "चुने हुए विषय")
✅ PASS: Test 5c: Hindi count pill returns to "1 गाइड" (Found: "1 गाइड")

=== i18n Test Summary: 17 Passed, 0 Failed ===
```

### Suite 3: Roman-Hindi Slang Linter (`scripts/check-hinglish.cjs`)
```
--- Checking i18n dictionaries for forbidden Roman-Hindi slang ---
✅ PASS: hi.json contains zero Roman-Hindi slang.
✅ PASS: en.json contains zero Roman-Hindi slang.
✅ All i18n strings strictly adhere to clean Hindi (Devanagari) or clean English.
```

---

## 5. Visual Artifacts & Dev Preview Pages

- **Domain Section Screenshots (`homepage_screenshots/round5_domains/`)**:
  - `domains_hi_light_desktop_1440.png`, `domains_hi_light_tablet_768.png`, `domains_hi_light_mobile_360.png`
  - `domains_hi_dark_desktop_1440.png`, `domains_hi_dark_tablet_768.png`, `domains_hi_dark_mobile_360.png`
  - `domains_en_light_desktop_1440.png`, `domains_en_light_tablet_768.png`, `domains_en_light_mobile_360.png`
  - `domains_en_dark_desktop_1440.png`, `domains_en_dark_tablet_768.png`, `domains_en_dark_mobile_360.png`
- **Interactive Dev Pages**:
  - `/dev/type-specimen/`: Interactive benchmark of the 5 Non-Negotiable Devanagari Rules, glyph matrices, and bilingual pairings.
  - `/dev/icon-compare/`: Side-by-side benchmark of the 6 systematic duotone domain tiles and 12 core UI actions.
