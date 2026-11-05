export interface UpdateEntry {
  date: string;
  version: string;
  title: string;
  type: 'major' | 'feature' | 'fix' | 'content';
  typeLabel?: string;
  summary: string;
  changes: string[];
}

export const UPDATES: UpdateEntry[] = [
  {
    date: '2026-11-05',
    version: 'v1.2.0',
    title: 'Site-wide Design Unification (Card DNA Architecture)',
    type: 'feature',
    typeLabel: 'Design System',
    summary: 'Extracted the signature Resource Card DNA into shared atomic components (Card, Chip, InsetPanel, CardFooter, Button, MetaRow).',
    changes: [
      'Standardized card surfaces: 24px radius, hairline borders, zero heavy drop shadows, and 8pt spatial grid.',
      'Implemented signature InsetPanel containers for TL;DR summaries, key takeaways, deliverables, and citations.',
      'Upgraded Resource Cards with verified 16:9 YouTube video thumbnails, duration badges, and checked links.',
      'Removed unsourced superlatives across all educational recommendations; verified claims with factual dates.',
      'Unified Domain Cards, Topic Pages, Roadmap Nodes, Updates, and About pages into a cohesive single product.'
    ]
  },
  {
    date: '2026-11-05',
    version: 'v1.1.0',
    title: 'Domain Icons, i18n & Devanagari Typography Overhaul',
    type: 'feature',
    typeLabel: 'Typography & Icons',
    summary: 'Eliminated confusing metaphors, added 28px duotone icons in 56px soft-tinted surfaces, and enforced 5 Devanagari rules.',
    changes: [
      'Replaced microphone icon with Neural Brain for AI/ML, star with Rocket Ship for Projects, and house with Constitutional Landmark for Politics.',
      'Enforced 5 Non-Negotiable Devanagari Rules: letter-spacing 0, text-transform none, line-height 1.75, Purna-Viram (।), and tabular numerals.',
      'Eliminated Roman-Hindi slang from UI dictionaries with automated AST linter (check-hinglish.cjs).',
      'Populated Tech Fundamentals with 3 rich topics (Operating Systems, Computer Networks, Core CS).',
      'Configured responsive 3-column bento grid with identical card heights (0px delta).'
    ]
  },
  {
    date: '2026-11-04',
    version: 'v1.0.0',
    title: 'Initial Production Release of Bodh (Knowledge Hub)',
    type: 'major',
    typeLabel: 'Initial Release',
    summary: 'Launched open-source verified knowledge platform for students and fresher developers with 100% static architecture.',
    changes: [
      'Launched comprehensive seed topics across AI/ML, Quantum, Career, Tech Fundamentals, Politics & Projects Hub.',
      'Released 2 interactive roadmaps with localStorage progress persistence (DSA & Placement, AI/ML Engineer).',
      'Implemented instant offline-first Command Palette search (Cmd+K).',
      'Configured full Dark/Light theme toggle and segmented language toggle.',
      'Achieved zero-backend 100% static architecture deployed to GitHub Pages.'
    ]
  }
];
