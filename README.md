# Knowledge Hub (ज्ञान केंद्र) 📚⚡

> **The modern Wikipedia for college students, developers, and curious readers.**
> 100% static, lightning-fast, privacy-first, and completely ad-free.

[![Astro](https://img.shields.io/badge/Astro-5.0-FF5D01?logo=astro&logoColor=white)](https://astro.build/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3.4-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![License: CC BY-SA 4.0](https://img.shields.io/badge/License-CC_BY--SA_4.0-lightgrey.svg)](https://creativecommons.org/licenses/by-sa/4.0/)
[![Deploy to GitHub Pages](https://github.com/givemehat/knowledge-hub/actions/workflows/deploy.yml/badge.svg)](https://github.com/givemehat/knowledge-hub/actions/workflows/deploy.yml)

🌐 **Live Website:** [https://givemehat.github.io/knowledge-hub/](https://givemehat.github.io/knowledge-hub/)

---

## 🎯 Mission & Philosophy

- **30-Second Discovery:** Find verified knowledge without wading through 3-hour video clickbait or dry academic paywalls.
- **Hinglish Technical Precision:** Technical concepts explained in clear, approachable Hinglish with English industry terminology preserved.
- **Zero Backend / Zero Database:** Pure static HTML generation for sub-second global delivery via GitHub Pages / Cloudflare Pages.
- **100% Privacy:** No ads, no cookies, no tracking scripts, no paywalls.

---

## 🛠️ Tech Stack

- **Framework:** [Astro 5.0](https://astro.build/) (Static Site Generation, Islands Architecture)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) + Custom Design Tokens (Light/Dark mode)
- **Search:** Client-side fuzzy search engine with `Ctrl/Cmd + K` Command Palette
- **Roadmaps:** Interactive node timeline with `localStorage` checklist progress tracking & print export
- **CI/CD:** Automated GitHub Actions build and deployment pipeline

---

## 🗺️ Information Architecture

```
/                         -> Home (Bento Grid, Hero Search, Trending Topics)
/topics/                  -> Topics Library (Filtered by Category & Difficulty)
/topics/[slug]/           -> Deep Topic Guide (TL;DR, Theory, Roadmap, Code, FAQs, Sources)
/roadmaps/                -> Career & Tech Roadmaps
/roadmaps/dsa-placement/  -> 24-Week Interactive DSA & Placement Roadmap
/roadmaps/ai-ml-engineer/ -> 26-Week Modern AI/ML & LLM Engineer Roadmap
/resources/               -> Curated Free Videos, Docs, Books & Tools
/updates/                 -> Platform Changelog
/about/                   -> Project Manifesto & Editorial Standards
/sources-policy/          -> Sourcing, Fact-Checking & Confidence Badges
/contribute/              -> Open-Source Contribution Guide
```

---

## 🧠 Cognitive & Ergonomic UX Principles

1. **Hick's Law:** Progressive disclosure in category cards and accordion FAQs minimizes decision fatigue.
2. **Fitts's Law:** Mobile bottom navigation bar and 44x44px+ tap targets optimized for thumb reachability.
3. **Miller's Law (Chunking):** Long theory broken down into 5-7 bite-sized blocks with intuitive real-world analogies.
4. **Zeigarnik Effect:** Live SVG progress rings and percentage counters in roadmaps motivate completion.
5. **Doherty Threshold:** Zero-latency client search palette responds under 50ms.

---

## 💻 Local Development

```bash
# 1. Clone repository
git clone https://github.com/givemehat/knowledge-hub.git
cd knowledge-hub

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev

# 4. Build for production (outputs to ./dist)
npm run build

# 5. Preview production build locally
npm run preview
```

---

## 📄 License

Content licensed under [Creative Commons Attribution-ShareAlike 4.0 International (CC BY-SA 4.0)](https://creativecommons.org/licenses/by-sa/4.0/).
Code licensed under the [MIT License](LICENSE).
