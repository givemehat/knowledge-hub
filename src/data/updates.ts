export interface UpdateEntry {
  date: string;
  version: string;
  title: string;
  type: 'major' | 'feature' | 'fix' | 'content';
  changes: string[];
}

export const UPDATES: UpdateEntry[] = [
  {
    date: '2026-11-04',
    version: 'v1.0.0',
    title: 'Initial Production Release of Knowledge Hub',
    type: 'major',
    changes: [
      'Launched 13 comprehensive seed topics across AI/ML, Quantum, Career, Tech Fundamentals, Politics & Projects Hub.',
      'Released 2 interactive roadmaps with localStorage progress persistence (DSA & Placement, AI/ML Engineer).',
      'Implemented instant offline-first Command Palette search (Cmd+K).',
      'Configured full Dark/Light theme toggle and Hinglish/English language toggle.',
      'Achieved zero-backend 100% static architecture optimized for GitHub Pages.'
    ]
  }
];
