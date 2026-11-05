# Peach (पीच) — Modern Static Knowledge Engine

> **Learn tech and the world, with verified sources.**  
> 100% static, sub-second fast, privacy-first, verified primary citations, and completely ad-free.

[![Astro](https://img.shields.io/badge/Astro-5.0-FF5D01?logo=astro&logoColor=white)](https://astro.build/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3.4-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![License: CC BY-SA 4.0](https://img.shields.io/badge/License-CC_BY--SA_4.0-lightgrey.svg)](https://creativecommons.org/licenses/by-sa/4.0/)
[![Deploy to GitHub Pages](https://github.com/givemehat/knowledge-hub/actions/workflows/deploy.yml/badge.svg)](https://github.com/givemehat/knowledge-hub/actions/workflows/deploy.yml)

🌐 **Live Website:** [https://givemehat.github.io/knowledge-hub/](https://givemehat.github.io/knowledge-hub/)  
🎨 **Design System Showcase:** [https://givemehat.github.io/knowledge-hub/design-system/](https://givemehat.github.io/knowledge-hub/design-system/)  
🔬 **Icon Benchmark Lab:** [https://givemehat.github.io/knowledge-hub/dev/icon-compare/](https://givemehat.github.io/knowledge-hub/dev/icon-compare/)

---

## 👤 Creator & Builder

- **Built by:** **Rajnish Singh** ([@givemehat](https://github.com/givemehat))
- **Creator Profile:** [`/about`](https://givemehat.github.io/knowledge-hub/about/)
- **Contact & Collaborate:** [`/contact`](https://givemehat.github.io/knowledge-hub/contact/)
- **Status:** Open to Full-Time Software Engineering Roles, Internships & Collaborations.

---

## ⚙️ Creator Details Kaise Bharein / Customize Karein

Aap apni saari personal details, social links, bio aur projects ko **ek single file** se customize kar sakte hain:

👉 **[`src/data/creator.ts`](src/data/creator.ts)**

```typescript
export const CREATOR = {
  name: 'Aapka Naam',
  role: 'Software Engineer / Student',
  tagline: 'Building impactful open-source tools...',
  location: 'City, India',
  availableForWork: true,
  links: {
    github: 'https://github.com/YOUR_USERNAME',
    linkedin: 'https://linkedin.com/in/YOUR_PROFILE',
    twitter: 'https://x.com/YOUR_HANDLE',
    email: 'your-email@example.com',
    calLink: 'https://cal.com/your-username' // Optional
  },
  contactFormEndpoint: 'https://api.web3forms.com/submit', // Free access key from web3forms.com
  skills: [ ... ],
  featuredProjects: [ ... ]
};
```
Is file ko update karte hi **Header, Footer, About page, Contact form, Topic author card, Soft CTA, aur vCard** automatically update ho jaate hain!

---

## 🎯 Mission & Philosophy

- **30-Second Discovery:** Find verified knowledge without wading through 3-hour video clickbait or dry academic paywalls.
- **Hinglish Technical Precision:** Technical concepts explained in clear, approachable Hinglish with English industry terminology preserved.
- **Zero Backend / Zero Database:** Pure static HTML generation for sub-second global delivery via GitHub Pages CDN.
- **100% Privacy:** No ads, no cookies, no tracking scripts, no paywalls.
- **Epistemological Rigor:** Empirical data analysis and hypothetical simulations never mix; all claims cite primary sources.

---

## 🛠️ Architecture & Core Assets

- **Framework:** [Astro 5.0](https://astro.build/) (Static Site Generation, Islands Architecture)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) + Custom Design Tokens (Surya Saffron, Peacock Teal, Electric Violet, Haldi Gold, Kumkum Red)
- **Icon Family:** Exclusively [Lucide Icons](https://lucide.dev/) (ISC License, 25.5k+ stars) for 100% uniform UI vector iconography
- **Brand & Tech Logos:** [Simple Icons](https://simpleicons.org/) (CC0 1.0 Universal)
- **Search:** Client-side fuzzy search engine with `Ctrl/Cmd + K` Command Palette
- **Roadmaps:** Dual View (Path Timeline + Kanban Board View) with `localStorage` checklist tracking
- **CI/CD:** Automated GitHub Actions build and deployment pipeline

---

## 🗺️ Information Architecture

```
/                         -> Home (Bento Grid, Hero Search, Trending Guides)
/topics/                  -> Topics Library (Filtered by Category & Difficulty)
/topics/[slug]/           -> Topic Guide (TL;DR, Theory, Code, Resources, Author Card)
/roadmaps/                -> Career & Tech Roadmaps
/roadmaps/dsa-placement/  -> 24-Week Interactive DSA & Placement Roadmap (Dual View)
/roadmaps/ai-ml-engineer/ -> 26-Week Modern AI/ML & LLM Engineer Roadmap (Dual View)
/resources/               -> Curated Free Videos, Docs, Books & Tools (Tabbed filter)
/research/                -> Empirical Research & Longitudinal Sentiment Study (3.84M headlines)
/scenarios/               -> Strategic Futures Studies & Hypothetical Scenarios
/about/                   -> Creator Story, Skills, Projects, and Peach Manifesto
/contact/                 -> Contact Form, Social Links, QR Code & vCard (.vcf)
/design-system/           -> Storybook-Style Interactive Design System Showcase
/dev/icon-compare/        -> Side-by-Side Icon Benchmark Lab (Lucide vs Tabler vs Phosphor)
/sources-policy/          -> Sourcing, Fact-Checking & Confidence Badges
/humans.txt               -> Human Authorship Credits
```

---

## 📚 Key Strategic Documents

- 🏷️ **[`BRAND.md`](BRAND.md)**: 20+ Candidate Names, Trademark Checks, Top 5 Shortlist, and Logo Specifications.
- 🎨 **[`ASSET_RESEARCH.md`](ASSET_RESEARCH.md)**: 6 Icon Sets Evaluated, Decision Rationale for Lucide & Simple Icons.
- 📜 **[`CREDITS.md`](CREDITS.md)**: Complete open-source licenses, typography, and Kaggle dataset citations.
- 🔍 **[`DESIGN_AUDIT.md`](DESIGN_AUDIT.md)**: Baseline UI/UX Audit & Resolution Catalog.

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

- Content licensed under [Creative Commons Attribution-ShareAlike 4.0 International (CC BY-SA 4.0)](https://creativecommons.org/licenses/by-sa/4.0/).
- Code licensed under the [MIT License](LICENSE).
