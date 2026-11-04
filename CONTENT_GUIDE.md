# Knowledge Hub — Content Guide & Editorial Standards

Welcome to the Knowledge Hub content authoring guide. This document outlines our editorial philosophy, writing guidelines, and exact schema for contributing new knowledge articles.

---

## 1. Editorial Principles

1. **Scan in 30s, Understand in 3m:** Always write a punchy, 3-5 bullet point TL;DR.
2. **Hinglish by Default:** Use natural Indian conversational phrasing while keeping all technical terminology in English (e.g., *“RAG model ko external vector context provide karta hai”*).
3. **Primary Sources Only:** Never assert statistics or benchmarks without citing original research papers, official documentation, or gazetted laws.
4. **No Fluff / No Clickbait:** Write with maximum density. Avoid 3-paragraph conversational intros.

---

## 2. Topic Schema (TypeScript Interface)

Add your topic to `src/data/topics.ts`:

```typescript
export interface Topic {
  slug: string;                 // URL path (e.g. 'rag', 'docker-containers')
  title: string;                // Primary English Title
  titleHindi?: string;          // Devanagari Hindi Subtitle
  category: 'ai-ml' | 'quantum' | 'career' | 'projects' | 'tech-fundamentals' | 'gov-policy';
  categoryLabel: string;        // Human-readable category
  level: 'beginner' | 'intermediate' | 'advanced';
  tags: string[];               // 3-5 searchable keywords
  readingMinutes: number;       // Estimated read time
  lastVerified: string;         // YYYY-MM-DD
  confidence: 'high' | 'medium' | 'evolving';
  summary: string;              // 1-2 sentence meta description
  tldr: string[];               // Exactly 3-5 summary bullets
  whyItMatters: string;         // 2-3 sentences explaining real-world utility
  coreConcepts: {
    heading: string;
    content: string;
    analogy?: string;           // Optional real-world analogy
    codeSnippet?: { language: string; code: string };
  }[];
  roadmapSteps: string[];       // 4-6 sequential learning steps
  handsOn: {
    title: string;
    task: string;
    deliverable: string;
  }[];
  mistakesAndMyths: {
    myth: string;
    reality: string;
  }[];
  resources: CuratedResource[];
  faqs: FAQItem[];
  relatedSlugs: string[];
  sources: TopicSource[];
}
```

---

## 3. Cognitive UX Principles Checklist

- **Hick's Law:** Keep lists and choices concise (5-7 chunks maximum).
- **Fitts's Law:** Ensure tap targets are at least 44x44px on mobile views.
- **Miller's Law:** Break complex theory into bite-sized concepts.
