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
}

export const CURATED_RESOURCES: ResourceItem[] = [
  {
    id: 'res-karpathy-gpt',
    category: 'ai',
    type: 'video',
    title: 'Let\'s build GPT: from scratch, in code, spelled out',
    url: 'https://www.youtube.com/watch?v=kCc8FmEb1nY',
    author: 'Andrej Karpathy',
    language: 'en',
    free: true,
    whyWatch: 'Gold standard video for understanding transformers, self-attention, and PyTorch training from first principles.'
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
    whyWatch: 'India ka sabse comprehensive free DSA placement roadmap with Hinglish video explanations for 400+ problems.'
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
    whyWatch: 'Free cloud quantum execution, hands-on circuit composer, and university-grade quantum textbook.'
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
    whyWatch: 'Cleanest 1-page single column LaTeX resume template used by engineers at FAANG and top startups.'
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
    whyWatch: 'Visual, high-clarity explanation of containers, images, volumes, and docker-compose.'
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
    whyWatch: 'Primary, authoritative, unadulterated source of Indian constitutional articles, amendments, and schedules.'
  }
];
