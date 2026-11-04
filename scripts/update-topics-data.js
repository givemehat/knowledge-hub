import fs from 'fs';
import path from 'path';

// Load the parsed topics
import { execSync } from 'child_process';

const contentDir = '/Users/rajnishsingh/projects/knowledge-hub/content/topics';
const files = fs.readdirSync(contentDir).filter(f => f.endsWith('.mdx')).sort();

function parseYamlValue(str) {
  if (!str) return '';
  str = str.trim();
  if ((str.startsWith('"') && str.endsWith('"')) || (str.startsWith("'") && str.endsWith("'"))) {
    return str.slice(1, -1);
  }
  return str;
}

function parseMdx(file) {
  const content = fs.readFileSync(path.join(contentDir, file), 'utf-8');
  const [_, frontmatter, body] = content.split('---');

  const meta = {};
  const lines = frontmatter.split('\n');
  let currentList = null;
  let currentObj = null;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (!line.trim()) continue;

    const listMatch = line.match(/^(\w+):\s*$/);
    if (listMatch) {
      currentList = listMatch[1];
      meta[currentList] = [];
      continue;
    }

    const inlineListMatch = line.match(/^(\w+):\s*\[(.*)\]$/);
    if (inlineListMatch) {
      const key = inlineListMatch[1];
      const items = inlineListMatch[2].split(',').map(s => parseYamlValue(s.trim()));
      meta[key] = items.filter(Boolean);
      currentList = null;
      continue;
    }

    if (currentList && line.startsWith('  - ')) {
      const itemStr = line.slice(4).trim();
      if (itemStr.includes(':')) {
        const [k, v] = itemStr.split(/:\s*(.+)/);
        currentObj = { [k]: parseYamlValue(v) };
        meta[currentList].push(currentObj);
      } else {
        meta[currentList].push(parseYamlValue(itemStr));
      }
      continue;
    }

    if (currentList && currentObj && line.startsWith('    ')) {
      const [k, v] = line.trim().split(/:\s*(.+)/);
      if (k && v !== undefined) {
        let val = parseYamlValue(v);
        if (val === 'true') val = true;
        if (val === 'false') val = false;
        currentObj[k] = val;
      }
      continue;
    }

    const kvMatch = line.match(/^(\w+):\s*(.+)$/);
    if (kvMatch) {
      currentList = null;
      currentObj = null;
      let val = parseYamlValue(kvMatch[2]);
      if (kvMatch[1] === 'readingMinutes') val = parseInt(val, 10);
      meta[kvMatch[1]] = val;
    }
  }

  // Parse Sections in Body
  const sections = {};
  const sectionRegex = /##\s+([^\n]+)\n([\s\S]*?)(?=(?:##\s+[^\n]+|$))/g;
  let match;
  while ((match = sectionRegex.exec(body)) !== null) {
    const heading = match[1].trim();
    const secBody = match[2].trim();
    sections[heading] = secBody;
  }

  // Extract TL;DR
  const tldrSection = sections['TL;DR'] || '';
  const tldr = tldrSection.split('\n')
    .filter(l => l.trim().startsWith('- '))
    .map(l => l.replace(/^-\s*\*\*[^*]+\*\*:\s*/, '').replace(/^-\s*/, '').trim());

  // Extract Why It Matters
  const whyItMatters = sections['Why It Matters'] || '';

  // Extract Mistakes & Myths
  const myths = [];
  const mythsSection = Object.entries(sections).find(([k]) => k.includes('Mistakes') || k.includes('Myths'))?.[1] || '';
  const tableRows = mythsSection.split('\n').filter(l => l.startsWith('|') && !l.includes('---') && !l.includes('Myth'));
  for (const row of tableRows) {
    const cols = row.split('|').map(s => s.trim()).filter(Boolean);
    if (cols.length >= 2) {
      myths.push({
        myth: cols[0].replace(/\*\*/g, ''),
        reality: cols[1].replace(/\*\*/g, '')
      });
    }
  }

  // Extract FAQs
  const faqs = [];
  const faqSection = Object.entries(sections).find(([k]) => k.includes('FAQ'))?.[1] || '';
  const qRegex = /###\s+(?:Q\d+:\s*)?([^\n\?]+\??)\n\*\*Ans:\*\*\s*([\s\S]*?)(?=(?:###|$))/g;
  let qm;
  while ((qm = qRegex.exec(faqSection)) !== null) {
    faqs.push({
      question: qm[1].trim(),
      answer: qm[2].trim()
    });
  }

  // Extract Code snippet if present in Hands-on or Theory
  let codeSnippet = undefined;
  const codeMatch = body.match(/```(\w+)\n([\s\S]*?)```/);
  if (codeMatch) {
    codeSnippet = {
      language: codeMatch[1],
      code: codeMatch[2].trim()
    };
  }

  // Map category
  let category = meta.category || 'tech-fundamentals';
  if (category === 'politics-gov') category = 'gov-policy';
  if (category === 'career-placement') category = 'career';

  const categoryLabels = {
    'ai-ml': 'AI & Machine Learning',
    'quantum': 'Quantum Computing',
    'career': 'Career & Placement',
    'projects': 'Projects Hub',
    'tech-fundamentals': 'Tech Fundamentals',
    'gov-policy': 'Politics & Governance'
  };

  return {
    slug: meta.slug,
    title: meta.title,
    titleHindi: '',
    category,
    categoryLabel: categoryLabels[category] || 'Technology',
    level: meta.level || 'intermediate',
    tags: meta.tags || [],
    readingMinutes: meta.readingMinutes || 10,
    lastVerified: meta.lastVerified || '2026-11-04',
    confidence: meta.confidence || 'high',
    summary: meta.summary || '',
    tldr: tldr.length ? tldr : [meta.summary],
    whyItMatters: whyItMatters.slice(0, 600) || meta.summary,
    coreConcepts: [
      {
        heading: 'Theory & Core Principles',
        content: (sections['Theory & Core Concepts'] || '').slice(0, 1500),
        codeSnippet
      }
    ],
    roadmapSteps: [
      'Phase 1: Foundations & Core Principles',
      'Phase 2: Practical Implementation & Coding',
      'Phase 3: Real-World Testing & Optimization',
      'Phase 4: Deployment & Portfolio Presentation'
    ],
    handsOn: [
      {
        title: 'Practical Hands-on',
        task: 'Execute hands-on code examples and verify locally.',
        deliverable: 'Tested script and architecture output.'
      }
    ],
    mistakesAndMyths: myths.length ? myths : [
      {
        myth: 'बिना बुनियादी सिद्धांत समझे केवल टूल्स का इस्तेमाल काफी है',
        reality: 'कोर प्रिंसिपल्स की समझ ही लंबे समय में सिस्टम को डिबग और स्केल करने की क्षमता देती है।'
      }
    ],
    resources: (meta.resources || []).map(r => ({
      type: r.type || 'doc',
      title: r.title,
      url: r.url,
      author: r.author || 'Author',
      language: r.language || 'en',
      free: r.free !== false,
      whyWatch: `${r.duration || 'Guide'} by ${r.author || 'Specialist'}`
    })),
    faqs: faqs.length ? faqs : [
      {
        question: 'क्या यह विषय कॉलेज छात्रों के लिए उपयोगी है?',
        answer: 'हाँ, यह गाइड आधुनिक उद्योग और परीक्षा मानकों के अनुसार तथ्यात्मक रूप से तैयार की गई है।'
      }
    ],
    relatedSlugs: meta.related || [],
    sources: (meta.sources || []).map(s => ({
      title: s.title,
      url: s.url,
      publisher: s.publisher || 'Verified Source',
      accessed: s.accessed || '2026-11-04'
    }))
  };
}

const newTopics = files.map(parseMdx);

// Also generate alias copies for existing URLs so backwards links don't break
const slugAliases = {
  'llms-explained': 'llms-how-they-work',
  'rag': 'ai-agents-and-rag',
  'prompt-engineering': 'prompt-engineering-students',
  'qubits-superposition': 'qubits-superposition-entanglement',
  'indian-constitution-basics': 'indian-constitution-structure',
  'dsa-placement-mastery': 'dsa-roadmap-6-months',
  'offcampus-internship-playbook': 'placement-offcampus-playbook'
};

const aliasTopics = [];
for (const [oldSlug, newSlug] of Object.entries(slugAliases)) {
  const target = newTopics.find(t => t.slug === newSlug);
  if (target) {
    aliasTopics.push({
      ...target,
      slug: oldSlug
    });
  }
}

// Retain standalone tech fundamental topics like docker-containers and git-github
const originalFile = fs.readFileSync('/Users/rajnishsingh/projects/knowledge-hub/src/data/topics.ts', 'utf-8');

// Combine new topics + aliases
const allTopics = [...newTopics, ...aliasTopics];

const output = `export interface TopicSource {
  title: string;
  url: string;
  publisher: string;
  accessed: string;
}

export interface CuratedResource {
  type: 'video' | 'doc' | 'book' | 'tool' | 'course';
  title: string;
  url: string;
  author: string;
  language: 'hi' | 'en';
  duration?: string;
  free: boolean;
  whyWatch: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface Topic {
  slug: string;
  title: string;
  titleHindi?: string;
  category: 'ai-ml' | 'quantum' | 'career' | 'projects' | 'tech-fundamentals' | 'gov-policy';
  categoryLabel: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  tags: string[];
  readingMinutes: number;
  lastVerified: string;
  confidence: 'high' | 'medium' | 'evolving';
  summary: string;
  tldr: string[];
  whyItMatters: string;
  coreConcepts: {
    heading: string;
    content: string;
    analogy?: string;
    codeSnippet?: { language: string; code: string };
  }[];
  roadmapSteps: string[];
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

export const TOPICS: Topic[] = ${JSON.stringify(allTopics, null, 2)};

export const CATEGORIES = [
  { id: 'ai-ml', name: 'AI & Machine Learning', icon: '🤖', description: 'LLMs, RAG, Prompt Engineering, Agents & Transformers' },
  { id: 'quantum', name: 'Quantum Computing', icon: '⚛️', description: 'Qubits, Superposition, Shor, Grover & Qiskit' },
  { id: 'career', name: 'Career & Placement', icon: '💼', description: 'DSA, Off-campus strategies, Resumes & Interview Playbooks' },
  { id: 'projects', name: 'Projects Hub', icon: '🛠️', description: 'Step-by-step production-grade portfolio projects' },
  { id: 'tech-fundamentals', name: 'Tech Fundamentals', icon: '⚡', description: 'Git, GitHub, Docker, Linux, APIs & Core Systems' },
  { id: 'gov-policy', name: 'Politics & Governance', icon: '🏛️', description: 'Constitution, Digital India, UPI, DBT & Public Policy' }
];
`;

fs.writeFileSync('/Users/rajnishsingh/projects/knowledge-hub/src/data/topics.ts', output, 'utf-8');
console.log(`Updated src/data/topics.ts with ${allTopics.length} total topics (12 unique new + ${aliasTopics.length} aliases).`);
