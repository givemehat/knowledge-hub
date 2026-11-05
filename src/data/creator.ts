/**
 * Creator Profile & Branding Configuration
 * 
 * Edit this file to customize your name, bio, social links, and projects.
 * All sections across the site (Header, Footer, About, Contact, Author Card)
 * dynamically read from this single source of truth.
 */

export interface ProjectItem {
  title: string;
  description: string;
  tags: string[];
  github?: string;
  demo?: string;
  status: 'active' | 'completed' | 'wip';
}

export interface SkillCategory {
  category: string;
  skills: { name: string; level?: string }[];
}

export interface CreatorConfig {
  name: string;
  hindiName?: string;
  handle: string;
  tagline: string;
  role: string;
  bioParagraphs: string[];
  location: string;
  avatarUrl?: string; // Optional custom photo URL; defaults to SVG initials avatar
  availableForWork: boolean;
  availabilityStatus: string;
  links: {
    github: string;
    linkedin?: string;
    twitter?: string;
    email: string;
    repo: string;
    calLink?: string; // e.g., 'https://cal.com/your-name'
  };
  contactFormEndpoint?: string; // Web3Forms or Formspree public form endpoint
  skills: SkillCategory[];
  featuredProjects: ProjectItem[];
  currentFocus: {
    learning: string[];
    building: string[];
  };
}

export const CREATOR: CreatorConfig = {
  name: 'Rajnish Singh',
  hindiName: 'रजनीश सिंह',
  handle: 'givemehat',
  role: 'Full-Stack Developer & Systems Builder',
  tagline: 'Building high-velocity, distraction-free open-source tools for Bharat.',
  location: 'India',
  availableForWork: true,
  availabilityStatus: 'Open to Software Engineering Roles, Internships & Open-Source Collaborations',
  
  bioParagraphs: [
    'Main ek builder aur developer hoon jise fast, clean aur zero-fluff software banana pasand hai. Internet par technical knowledge bohot fragmented hai—ya toh 3 ghante ke redundant video tutorials milte hain, ya fir abstract research papers jo practical engineering se disconnected hote hain.',
    'Isliye maine Bodh (knowledge-hub) ko zero-backend, 100% static architecture par banaya: taaki koi bhi college student ya engineer bina kisi ad, popup ya login ke 30 second me accurate roadmap aur runnable code paa sake.',
    'Mera focus systems programming, modern web frameworks (Astro, React, Tailwind), automated developer tools, aur data-driven studies par rehta hai.'
  ],

  links: {
    github: 'https://github.com/givemehat',
    linkedin: 'https://linkedin.com/in/givemehat', // Replace with your real LinkedIn handle
    twitter: 'https://x.com/givemehat', // Replace with your real X/Twitter handle
    email: 'rajnisihsingh@gmail.com',
    repo: 'https://github.com/givemehat/knowledge-hub',
    calLink: '' // Optional: Add your Cal.com link here (e.g. 'https://cal.com/rajnish')
  },

  // Web3Forms free static form endpoint key (replace with your free access key from web3forms.com)
  contactFormEndpoint: 'https://api.web3forms.com/submit',

  skills: [
    {
      category: 'Frontend & Architecture',
      skills: [
        { name: 'Astro (Static Islands)' },
        { name: 'TypeScript & JavaScript' },
        { name: 'Tailwind CSS (Tokens & Design Systems)' },
        { name: 'React & Modern DOM' },
        { name: 'Responsive & Accessible Web (WAI-ARIA)' }
      ]
    },
    {
      category: 'Backend, Systems & Data',
      skills: [
        { name: 'Python 3 (NLP, Pandas, PyTorch)' },
        { name: 'Node.js & CLI Scripting' },
        { name: 'REST APIs & Static Pipelines' },
        { name: 'Git & Advanced GitHub Actions CI/CD' },
        { name: 'Playwright Automated Testing' }
      ]
    },
    {
      category: 'Engineering Principles',
      skills: [
        { name: 'Hick\'s & Fitts\'s Cognitive UX' },
        { name: 'Zero-Distraction / Ad-Free Design' },
        { name: 'Data Transparency & Methodology' },
        { name: 'First-Principles Technical Writing' }
      ]
    }
  ],

  featuredProjects: [
    {
      title: 'Bodh (Knowledge Hub)',
      description: 'The modern Wikipedia for college students and developers. 100% static, verified roadmaps, dual-view interactive milestones, media sentiment study, and zero trackers.',
      tags: ['Astro', 'Tailwind', 'TypeScript', 'Playwright', 'GitHub Pages'],
      github: 'https://github.com/givemehat/knowledge-hub',
      demo: 'https://givemehat.github.io/knowledge-hub/',
      status: 'active'
    },
    {
      title: 'Media Sentiment Research Pipeline',
      description: 'Longitudinal empirical NLP study analyzing 3.84 million Indian news headlines (2001–2023) using VADER, IndicBERT, and bootstrap confidence intervals.',
      tags: ['Python', 'NLP', 'Kaggle', 'IndicBERT', 'VADER'],
      github: 'https://github.com/givemehat/knowledge-hub/blob/main/scripts/analyze_media_sentiment.py',
      demo: 'https://givemehat.github.io/knowledge-hub/research/media-sentiment-study/',
      status: 'completed'
    }
  ],

  currentFocus: {
    learning: [
      'Distributed Systems & Consensus Protocols',
      'Quantum Algorithm Implementations in Qiskit',
      'High-throughput WebAssembly & Low-latency Web Engines'
    ],
    building: [
      'Interactive visual algorithm simulators for Indian students',
      'Zero-dependency open-source developer productivity tools'
    ]
  }
};
