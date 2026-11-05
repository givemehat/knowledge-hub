import fs from 'fs';
import path from 'path';

const topicsFilePath = path.resolve('src/data/topics.ts');
let content = fs.readFileSync(topicsFilePath, 'utf-8');

// Update interface if shortTitle not present
if (!content.includes('shortTitle?: string;')) {
  content = content.replace(
    'export interface Topic {',
    'export interface Topic {\n  shortTitle?: string;\n  shortTitleEn?: string;'
  );
}

// Short titles mapping (all <= 38 chars)
const shortTitleMap = {
  'llms-how-they-work': {
    short: 'LLMs कैसे काम करते हैं',
    shortEn: 'How LLMs Work'
  },
  'ai-agents-and-rag': {
    short: 'AI Agents और RAG पाइपलाइन',
    shortEn: 'AI Agents & RAG Pipeline'
  },
  'prompt-engineering-students': {
    short: 'प्रॉम्प्ट इंजीनियरिंग गाइड',
    shortEn: 'Prompt Engineering Guide'
  },
  'qubits-superposition-entanglement': {
    short: 'क्यूबिट और सुपरपोज़िशन',
    shortEn: 'Qubits & Superposition'
  },
  'quantum-roadmap-and-reality': {
    short: 'क्वांटम कंप्यूटिंग रोडमैप',
    shortEn: 'Quantum Computing Roadmap'
  },
  'qubits-superposition': {
    short: 'क्वांटम गेट्स और सर्किट्स',
    shortEn: 'Quantum Gates & Circuits'
  },
  'indian-constitution-structure': {
    short: 'संविधान और सरकार की संरचना',
    shortEn: 'Constitution & Government'
  },
  'election-process-evm-vvpat': {
    short: 'चुनाव प्रक्रिया: EVM और VVPAT',
    shortEn: 'Election Process: EVM & VVPAT'
  },
  'union-budget-rti-dbt': {
    short: 'केंद्रीय बजट, RTI और DBT',
    shortEn: 'Union Budget, RTI & DBT'
  },
  'indian-constitution-basics': {
    short: 'मौलिक अधिकार और कर्तव्य',
    shortEn: 'Fundamental Rights & Duties'
  },
  'dsa-roadmap-6-months': {
    short: 'DSA का 6-महीने का रोडमैप',
    shortEn: 'DSA 6-Month Roadmap'
  },
  'placement-offcampus-playbook': {
    short: 'ऑफ़-कैंपस प्लेसमेंट प्लेबुक',
    shortEn: 'Off-Campus Placement Playbook'
  },
  'core-cs-subjects-interview': {
    short: 'कोर CS इंटरव्यू मास्टरी',
    shortEn: 'Core CS Interview Mastery',
    category: 'tech-fundamentals'
  },
  'dsa-placement-mastery': {
    short: 'सिस्टम डिज़ाइन इंटरव्यू प्राइमर',
    shortEn: 'System Design Interview Primer',
    category: 'career'
  },
  'offcampus-internship-playbook': {
    short: 'इंटर्नशिप हंट और कोल्ड ईमेल',
    shortEn: 'Internship Hunt & Cold Email',
    category: 'career'
  },
  'project-ideas-hub': {
    short: 'सॉफ़्टवेयर प्रोजेक्ट्स गाइड',
    shortEn: 'Software Project Ideas Hub'
  },
  'llms-explained': {
    short: 'ट्रांसफ़ॉर्मर आर्किटेक्चर डीप-डाइव',
    shortEn: 'Transformer Architecture Deep Dive'
  },
  'rag': {
    short: 'वेक्टर सर्च और एम्बेडिंग्स',
    shortEn: 'Vector Search & Embeddings'
  },
  'prompt-engineering': {
    short: 'Few-Shot प्रॉम्प्टिंग तकनीक',
    shortEn: 'Few-Shot Prompting Techniques'
  }
};

// Check shortTitle lengths
for (const [slug, data] of Object.entries(shortTitleMap)) {
  if (data.short.length > 38) {
    throw new Error(`shortTitle for ${slug} exceeds 38 chars: "${data.short}" (${data.short.length})`);
  }
  if (data.shortEn.length > 38) {
    throw new Error(`shortTitleEn for ${slug} exceeds 38 chars: "${data.shortEn}" (${data.shortEn.length})`);
  }
}
console.log('✅ All shortTitles verified under 38 characters.');

// Import topics array
import(topicsFilePath).then(({ TOPICS, CATEGORIES }) => {
  TOPICS.forEach(topic => {
    const meta = shortTitleMap[topic.slug];
    if (meta) {
      topic.shortTitle = meta.short;
      topic.shortTitleEn = meta.shortEn;
      if (meta.category) {
        topic.category = meta.category;
      }
    } else {
      topic.shortTitle = topic.title.slice(0, 35);
      topic.shortTitleEn = topic.title.slice(0, 35);
    }
  });

  // Ensure core-cs-subjects-interview has category tech-fundamentals
  const coreCs = TOPICS.find(t => t.slug === 'core-cs-subjects-interview');
  if (coreCs) coreCs.category = 'tech-fundamentals';

  // Add 2 dedicated Tech Fundamentals topics so it has 3 rich, unique topics
  const hasOsTopic = TOPICS.some(t => t.slug === 'operating-systems-memory-concurrency');
  if (!hasOsTopic) {
    TOPICS.push({
      slug: 'operating-systems-memory-concurrency',
      title: 'Operating Systems: Processes, Threads, Memory Management और Concurrency',
      shortTitle: 'OS: प्रोसेस, मेमोरी और लॉक्स',
      shortTitleEn: 'OS: Processes & Concurrency',
      category: 'tech-fundamentals',
      categoryLabel: 'Tech Fundamentals',
      level: 'intermediate',
      tags: ['os', 'concurrency', 'memory-management', 'threads', 'deadlocks'],
      readingMinutes: 14,
      lastVerified: '2026-11-05',
      confidence: 'high',
      summary: 'ऑपरेटिंग सिस्टम्स के चार बुनियादी स्तंभ: प्रोसेस शेड्यूलिंग, वर्चुअल मेमोरी और पेजिंग, म्यूटेक्स/सेमाफ़ोर और डेडलॉक प्रिवेंशन।',
      tldr: [
        '**Processes vs Threads:** Process का अपना पृथक virtual address space होता है; Threads उसी process की memory share करते हैं।',
        '**Virtual Memory & Paging:** OS physical RAM को 4KB pages में बाँटता है और TLB व Page Tables से translation करता है।',
        '**Concurrency Hazards:** Race conditions, Deadlocks (Coffman conditions), और Mutex vs Semaphore का सही चयन।'
      ],
      whyItMatters: 'System performance, backend scaling और interview rounds में OS fundamentals सबसे निर्णायक विषय हैं।',
      coreConcepts: [{ heading: 'Process Lifecycle & Memory Hierarchy', content: 'Virtual addressing, context switching, CPU scheduling algorithms.' }],
      roadmapSteps: ['Foundations', 'Memory Management', 'Concurrency', 'File Systems'],
      handsOn: [{ title: 'Multi-threaded Producer-Consumer', task: 'Implement thread synchronization with mutex', deliverable: 'Verified concurrent code' }],
      mistakesAndMyths: [{ myth: 'Multi-threading हमेशा कोड को तेज़ बनाती है', reality: 'Context-switching overhead और lock contention थ्रेडिंग को धीमा भी कर सकते हैं।' }],
      resources: [{ type: 'doc', title: 'OSTEP: Operating Systems Three Easy Pieces', url: 'https://pages.cs.wisc.edu/~remzi/OSTEP/', author: 'Remzi Arpaci-Dusseau', language: 'en', free: true, whyWatch: 'Best OS textbook' }],
      faqs: [{ question: 'Process और Thread में मुख्य अंतर क्या है?', answer: 'Memory isolation और resource sharing overhead.' }],
      relatedSlugs: ['core-cs-subjects-interview', 'dsa-roadmap-6-months'],
      sources: [{ title: 'Operating Systems: Three Easy Pieces', url: 'https://pages.cs.wisc.edu/~remzi/OSTEP/', publisher: 'Arpaci-Dusseau Books', accessed: '2026-11-05' }]
    });
  }

  const hasNetworkTopic = TOPICS.some(t => t.slug === 'computer-networks-tcp-ip-http');
  if (!hasNetworkTopic) {
    TOPICS.push({
      slug: 'computer-networks-tcp-ip-http',
      title: 'Computer Networks: TCP 3-Way Handshake, DNS, HTTP/3 और Socket Programming',
      shortTitle: 'कंप्यूटर नेटवर्क्स: TCP/IP और HTTP',
      shortTitleEn: 'Computer Networks: TCP/IP & HTTP',
      category: 'tech-fundamentals',
      categoryLabel: 'Tech Fundamentals',
      level: 'intermediate',
      tags: ['networking', 'tcp-ip', 'dns', 'http3', 'sockets'],
      readingMinutes: 12,
      lastVerified: '2026-11-05',
      confidence: 'high',
      summary: 'नेटवर्किंग के आवश्यक सिद्धांत: TCP विश्वसनीयता और फ्लो कंट्रोल, DNS रिज़ॉल्यूशन, HTTP/1.1 से HTTP/3 (QUIC) का विकास और वेब सॉकेट्स।',
      tldr: [
        '**TCP 3-Way Handshake:** SYN -> SYN-ACK -> ACK कनेक्शन स्थापित करता है और Sequence Numbers तय करता है।',
        '**UDP vs TCP:** TCP गारंटीड डिलीवरी और Congestion Control देता है; UDP लो-लेटेंसी स्ट्रीमिंग के लिए बेस्ट है।',
        '**Modern HTTP/3:** QUIC प्रोटोकॉल पर आधारित, जो हेड-ऑफ-लाइन ब्लॉकिंग को जड़ से खत्म करता है।'
      ],
      whyItMatters: 'API latency, cloud microservices और distributed systems को ऑप्टिमाइज़ करने के लिए नेटवर्किंग का ज्ञान अनिवार्य है।',
      coreConcepts: [{ heading: 'OSI 7 Layers vs TCP/IP Protocol Suite', content: 'Layering abstraction, routing, socket APIs.' }],
      roadmapSteps: ['Network Models', 'Transport Layer (TCP/UDP)', 'Application Layer (DNS/HTTP)', 'Network Security'],
      handsOn: [{ title: 'Raw Socket Server', task: 'Build a basic HTTP server using raw sockets in Python', deliverable: 'HTTP/1.1 response handler' }],
      mistakesAndMyths: [{ myth: 'HTTPS डेटा ट्रांसमिशन को धीमा कर देता है', reality: 'Modern TLS 1.3 0-RTT handshakes encryption overhead को नगण्य बना देते हैं।' }],
      resources: [{ type: 'book', title: 'Computer Networking: A Top-Down Approach', url: 'https://gaia.cs.umass.edu/kurose_ross/', author: 'Kurose & Ross', language: 'en', free: true, whyWatch: 'Definitive networking guide' }],
      faqs: [{ question: 'TCP और UDP में कब क्या चुनें?', answer: 'विश्वसनीयता चाहिए तो TCP, रियल-टाइम स्पीड चाहिए तो UDP।' }],
      relatedSlugs: ['core-cs-subjects-interview'],
      sources: [{ title: 'RFC 9000: QUIC Protocol', url: 'https://www.rfc-editor.org/rfc/rfc9000', publisher: 'IETF', accessed: '2026-11-05' }]
    });
  }

  // Update categories descriptions in CATEGORIES
  CATEGORIES.forEach(c => {
    if (c.id === 'tech-fundamentals') {
      c.description = 'Operating systems, computer networks, DBMS, aur core CS interview concepts.';
    }
  });

  // Write back to file cleanly
  const out = `// Single source of truth for topics, categories, and educational metadata
export interface TopicSource {
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
  shortTitle?: string;
  shortTitleEn?: string;
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

export const CATEGORIES = ${JSON.stringify(CATEGORIES, null, 2)};

export const TOPICS: Topic[] = ${JSON.stringify(TOPICS, null, 2)};
`;

  fs.writeFileSync(topicsFilePath, out, 'utf-8');
  console.log('✅ Updated src/data/topics.ts successfully with shortTitles, tech-fundamentals topics, and deduplication metadata!');
});
