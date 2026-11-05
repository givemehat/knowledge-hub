export interface ResourceItem {
  id: string;
  category: 'ai' | 'dsa' | 'quantum' | 'systems' | 'policy';
  type: 'video' | 'book' | 'doc' | 'tool' | 'course';
  title: string;
  url: string;
  author: string;
  language: 'hi' | 'en';
  free: boolean;
  whyWatch: string;
  whyWatchHi?: string;
  videoId?: string;
  duration?: string;
  lastVerified: string;
}

export const CURATED_RESOURCES: ResourceItem[] = [
  {
    id: 'res-karpathy-gpt',
    category: 'ai',
    type: 'video',
    title: "Let's build GPT: from scratch, in code, spelled out",
    url: 'https://www.youtube.com/watch?v=kCc8FmEb1nY',
    author: 'Andrej Karpathy',
    language: 'en',
    free: true,
    videoId: 'kCc8FmEb1nY',
    duration: '1h 56m',
    lastVerified: '2026-11-05',
    whyWatch: 'Builds a working GPT in PyTorch from scratch; widely referenced for understanding transformer self-attention and backpropagation.',
    whyWatchHi: 'PyTorch में शुरुआत से कार्यशील GPT मॉडल का निर्माण; ट्रांसफ़ॉर्मर सेल्फ़-अटेंशन को बुनियादी सिद्धांतों से समझने के लिए अत्यधिक उपयोगी।'
  },
  {
    id: 'res-striver-dsa',
    category: 'dsa',
    type: 'course',
    title: 'Striver A2Z DSA Placement Sheet & Course',
    url: 'https://takeuforward.org/strivers-a2z-dsa-course/strivers-a2z-dsa-course-sheet-2/',
    author: 'takeUforward (Raj Vikramaditya)',
    language: 'hi',
    free: true,
    duration: '400+ Problems',
    lastVerified: '2026-11-05',
    whyWatch: 'Covers 400+ problems, as listed on the sheet (verified 2026-11-05), with topic-wise video explanations from arrays to dynamic programming.',
    whyWatchHi: 'शीट पर सूचीबद्ध 400+ प्रश्नों का व्यवस्थित संकलन (जाँचा गया: 2026-11-05), जिसमें बेसिक एरे से लेकर डायनामिक प्रोग्रामिंग तक चरणबद्ध वीडियो समाधान शामिल हैं।'
  },
  {
    id: 'res-qiskit-textbook',
    category: 'quantum',
    type: 'doc',
    title: 'Qiskit Official Learning Platform & Circuit Composer',
    url: 'https://docs.quantum.ibm.com/',
    author: 'IBM Quantum',
    language: 'en',
    free: true,
    lastVerified: '2026-11-05',
    whyWatch: 'Official interactive documentation for Qiskit SDK, quantum circuit simulators, and execution on real IBM quantum hardware.',
    whyWatchHi: 'Qiskit SDK के लिए आधिकारिक इंटरएक्टिव दस्तावेज़, क्वांटम सर्किट सिमुलेटर और वास्तविक IBM क्वांटम हार्डवेयर पर निष्पादन मार्गदर्शिका।'
  },
  {
    id: 'res-overleaf-resume',
    category: 'dsa',
    type: 'tool',
    title: "Jake's Resume Template on Overleaf (ATS Compliant)",
    url: 'https://www.overleaf.com/latex/templates/jakes-resume/syzfjbzwjncs',
    author: 'Jake Gutierrez',
    language: 'en',
    free: true,
    lastVerified: '2026-11-05',
    whyWatch: 'One-page, single-column LaTeX resume template engineered for ATS parser compatibility and clean typographic hierarchy.',
    whyWatchHi: 'एक-पृष्ठीय, एकल-कॉलम LaTeX रिज़्यूमे टेम्पलेट जिसे ATS पार्सर अनुकूलता और स्पष्ट टाइपोग्राफिक पदानुक्रम के लिए डिज़ाइन किया गया है।'
  },
  {
    id: 'res-docker-handbook',
    category: 'systems',
    type: 'video',
    title: 'Docker Tutorial for Beginners (Full Free Course)',
    url: 'https://www.youtube.com/watch?v=3c-iBn73dDE',
    author: 'TechWorld with Nana',
    language: 'en',
    free: true,
    videoId: '3c-iBn73dDE',
    duration: '2h 45m',
    lastVerified: '2026-11-05',
    whyWatch: 'Step-by-step walkthrough covering container architecture, Dockerfiles, volume persistence, and multi-container Docker Compose.',
    whyWatchHi: 'कंटेनर आर्किटेक्चर, डॉकरफ़ाइल, वॉल्यूम परसिस्टेंस और मल्टी-कंटेनर डॉकर कंपोज़ पर व्यावहारिक चरण-दर-चरण ट्यूटोरियल।'
  },
  {
    id: 'res-constitution-portal',
    category: 'policy',
    type: 'doc',
    title: 'Official Constitution of India Gazette & Articles',
    url: 'https://legislative.gov.in/constitution-of-india/',
    author: 'Ministry of Law and Justice, Govt of India',
    language: 'hi',
    free: true,
    lastVerified: '2026-11-05',
    whyWatch: 'Primary, authoritative digital source of Indian constitutional articles, amendments, schedules, and official bilingual texts.',
    whyWatchHi: 'भारतीय संविधान के अनुच्छेदों, संशोधनों, अनुसूचियों और आधिकारिक द्विभाषी पाठों का प्राथमिक एवं प्रामाणिक सरकारी स्रोत।'
  }
];
