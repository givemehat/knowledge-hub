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

export const TOPICS: Topic[] = [
  {
    "slug": "llms-how-they-work",
    "title": "LLMs कैसे काम करते हैं: Tokens, Transformers, Training और Inference",
    "titleHindi": "",
    "category": "ai-ml",
    "categoryLabel": "AI & Machine Learning",
    "level": "intermediate",
    "tags": [
      "ai",
      "llm",
      "transformers",
      "machine-learning",
      "deep-learning"
    ],
    "readingMinutes": 12,
    "lastVerified": "2026-11-04",
    "confidence": "evolving",
    "summary": "Large Language Models (LLMs) के अंदरूनी तंत्र को गहराई से समझें: Tokenization से लेकर Multi-Head Self-Attention, Pre-training, RLHF alignment और Inference generation तक।",
    "tldr": [
      "**Tokenization:** LLM raw text नहीं पढ़ते; वे text को 3-4 अक्षर के chunks (**tokens**) में तोड़ते हैं और उन्हें numeric IDs देते हैं [1]।",
      "**Transformer Architecture:** RNNs के sequential लूप्स के बजाय, Transformers पूरे वाक्य को एक साथ प्रोसेस करते हैं और **Self-Attention** से शब्दों के आपसी संदर्भ (context) की गणना करते हैं [1]।",
      "**Training Pipeline:** 2 चरणों में होता है: विशाल raw internet text पर **Pre-training** (Next-token prediction) और उसके बाद **Instruction Fine-Tuning** (SFT/RLHF/DPO) ताकि मॉडल इंसानों के आदेशों का सुरक्षित जवाब दे सके [2, 5]।",
      "**Inference Reality:** LLMs \"सोचते\" नहीं हैं; वे पिछले सभी tokens के आधार पर अगले सबसे संभावित token की probability distribution निकालकर एक-एक token generate करते हैं।"
    ],
    "whyItMatters": "Large Language Models (LLMs) के अंदरूनी तंत्र को गहराई से समझें: Tokenization से लेकर Multi-Head Self-Attention, Pre-training, RLHF alignment और Inference generation तक।",
    "coreConcepts": [
      {
        "heading": "Theory & Core Principles",
        "content": ""
      }
    ],
    "roadmapSteps": [
      "Phase 1: Foundations & Core Principles",
      "Phase 2: Practical Implementation & Coding",
      "Phase 3: Real-World Testing & Optimization",
      "Phase 4: Deployment & Portfolio Presentation"
    ],
    "handsOn": [
      {
        "title": "Practical Hands-on",
        "task": "Execute hands-on code examples and verify locally.",
        "deliverable": "Tested script and architecture output."
      }
    ],
    "mistakesAndMyths": [
      {
        "myth": "बिना बुनियादी सिद्धांत समझे केवल टूल्स का इस्तेमाल काफी है",
        "reality": "कोर प्रिंसिपल्स की समझ ही लंबे समय में सिस्टम को डिबग और स्केल करने की क्षमता देती है।"
      }
    ],
    "resources": [
      {
        "type": "video",
        "title": "Intro to Large Language Models by Andrej Karpathy",
        "url": "https://www.youtube.com/watch?v=zjkBMFhNj_g",
        "author": "Andrej Karpathy",
        "language": "en",
        "free": true,
        "whyWatch": "1 hr by Andrej Karpathy"
      },
      {
        "type": "video",
        "title": "Introduction to Transformers in Hindi (CampusX)",
        "url": "https://www.youtube.com/watch?v=BjRVS2wTtcA",
        "author": "CampusX",
        "language": "hi",
        "free": true,
        "whyWatch": "45 mins by CampusX"
      },
      {
        "type": "video",
        "title": "Attention in transformers, step-by-step",
        "url": "https://www.youtube.com/watch?v=eMlx5fFNoYc",
        "author": "3Blue1Brown",
        "language": "en",
        "free": true,
        "whyWatch": "26 mins by 3Blue1Brown"
      },
      {
        "type": "doc",
        "title": "Hugging Face Transformers Documentation",
        "url": "https://huggingface.co/docs/transformers",
        "author": "Hugging Face",
        "language": "en",
        "free": true,
        "whyWatch": "Reading by Hugging Face"
      },
      {
        "type": "book",
        "title": "Build a Large Language Model (From Scratch)",
        "url": "https://www.manning.com/books/build-a-large-language-model-from-scratch",
        "author": "Sebastian Raschka",
        "language": "en",
        "free": false,
        "whyWatch": "Full Book by Sebastian Raschka"
      }
    ],
    "faqs": [
      {
        "question": "क्या यह विषय कॉलेज छात्रों के लिए उपयोगी है?",
        "answer": "हाँ, यह गाइड आधुनिक उद्योग और परीक्षा मानकों के अनुसार तथ्यात्मक रूप से तैयार की गई है।"
      }
    ],
    "relatedSlugs": [
      "ai-agents-and-rag",
      "prompt-engineering-students"
    ],
    "sources": [
      {
        "title": "Attention Is All You Need (Vaswani et al.)",
        "url": "https://arxiv.org/abs/1706.03762",
        "publisher": "NeurIPS / arXiv",
        "accessed": "2026-11-04"
      },
      {
        "title": "Intro to Large Language Models (Andrej Karpathy)",
        "url": "https://www.youtube.com/watch?v=zjkBMFhNj_g",
        "publisher": "YouTube",
        "accessed": "2026-11-04"
      },
      {
        "title": "Hugging Face NLP Course: The Transformer Architecture",
        "url": "https://huggingface.co/learn/nlp-course",
        "publisher": "Hugging Face",
        "accessed": "2026-11-04"
      },
      {
        "title": "Attention in transformers, step-by-step (3Blue1Brown)",
        "url": "https://www.youtube.com/watch?v=eMlx5fFNoYc",
        "publisher": "3Blue1Brown",
        "accessed": "2026-11-04"
      },
      {
        "title": "Direct Preference Optimization: Your Language Model is Secretly a Reward Model (Rafailov et al.)",
        "url": "https://arxiv.org/abs/2305.18290",
        "publisher": "NeurIPS / arXiv",
        "accessed": "2026-11-04"
      }
    ]
  },
  {
    "slug": "ai-agents-and-rag",
    "title": "AI Agents और RAG: कब क्या इस्तेमाल करें (Architecture, Trade-offs & Hybrid Systems)",
    "titleHindi": "",
    "category": "ai-ml",
    "categoryLabel": "AI & Machine Learning",
    "level": "intermediate",
    "tags": [
      "ai",
      "rag",
      "ai-agents",
      "react-pattern",
      "langchain",
      "llamaindex"
    ],
    "readingMinutes": 14,
    "lastVerified": "2026-11-04",
    "confidence": "evolving",
    "summary": "Retrieval-Augmented Generation (RAG) और Autonomous AI Agents की विस्तृत तुलना। जानिए कब simple search काफी है, कब multi-step reasoning वाले agents चाहिए, और production-grade hybrid systems कैसे बनाएं।",
    "tldr": [
      "**RAG (Knowledge Augmentation):** आपके private documents या internal database से relevant text chunks retrieve करके LLM के prompt में inject करता है [1]। यह static question-answering के लिए fast, cheap, और highly deterministic है।",
      "**AI Agents (Action & Tool Use):** एक dynamic loop (ReAct pattern) चलाते हैं जहाँ LLM तय करता है कि *क्या सोचना है*, *कौन सा tool call करना है* (Calculator, Web Search, Code Runner), और output के आधार पर अगला कदम क्या होगा [2]।",
      "**The Golden Rule:** अगर सवाल का जवाब केवल दस्तावेज़ पढ़कर दिया जा सकता है, तो **RAG** चुनें। अगर कार्य में multi-step planning, state changes, external APIs या conditionals शामिल हैं, तो **Agent** चुनें।",
      "**Cost & Latency:** RAG 1 round-trip में पूरा होता है (Latency < 1-2s); Agentic loops में कई LLM calls होती हैं (Latency 5-20s, cost 3x-10x ज़्यादा)।"
    ],
    "whyItMatters": "Retrieval-Augmented Generation (RAG) और Autonomous AI Agents की विस्तृत तुलना। जानिए कब simple search काफी है, कब multi-step reasoning वाले agents चाहिए, और production-grade hybrid systems कैसे बनाएं।",
    "coreConcepts": [
      {
        "heading": "Theory & Core Principles",
        "content": ""
      }
    ],
    "roadmapSteps": [
      "Phase 1: Foundations & Core Principles",
      "Phase 2: Practical Implementation & Coding",
      "Phase 3: Real-World Testing & Optimization",
      "Phase 4: Deployment & Portfolio Presentation"
    ],
    "handsOn": [
      {
        "title": "Practical Hands-on",
        "task": "Execute hands-on code examples and verify locally.",
        "deliverable": "Tested script and architecture output."
      }
    ],
    "mistakesAndMyths": [
      {
        "myth": "बिना बुनियादी सिद्धांत समझे केवल टूल्स का इस्तेमाल काफी है",
        "reality": "कोर प्रिंसिपल्स की समझ ही लंबे समय में सिस्टम को डिबग और स्केल करने की क्षमता देती है।"
      }
    ],
    "resources": [
      {
        "type": "video",
        "title": "Retrieval Augmented Generation (RAG) Explained in Hindi",
        "url": "https://www.youtube.com/watch?v=X0btK9X0Xnk",
        "author": "CampusX",
        "language": "hi",
        "free": true,
        "whyWatch": "40 mins by CampusX"
      },
      {
        "type": "video",
        "title": "What are AI Agents? (ReAct Framework)",
        "url": "https://www.youtube.com/watch?v=F8NKVhkZZWI",
        "author": "IBM Technology",
        "language": "en",
        "free": true,
        "whyWatch": "12 mins by IBM Technology"
      },
      {
        "type": "doc",
        "title": "LangChain Official Agents Guide",
        "url": "https://python.langchain.com/docs/concepts/agents/",
        "author": "Harrison Chase",
        "language": "en",
        "free": true,
        "whyWatch": "Reference by Harrison Chase"
      },
      {
        "type": "doc",
        "title": "LlamaIndex Core RAG Concepts",
        "url": "https://docs.llamaindex.ai/en/stable/getting_started/concepts/",
        "author": "Jerry Liu",
        "language": "en",
        "free": true,
        "whyWatch": "Reference by Jerry Liu"
      }
    ],
    "faqs": [
      {
        "question": "क्या यह विषय कॉलेज छात्रों के लिए उपयोगी है?",
        "answer": "हाँ, यह गाइड आधुनिक उद्योग और परीक्षा मानकों के अनुसार तथ्यात्मक रूप से तैयार की गई है।"
      }
    ],
    "relatedSlugs": [
      "llms-how-they-work",
      "prompt-engineering-students",
      "project-ideas-hub"
    ],
    "sources": [
      {
        "title": "Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks (Lewis et al.)",
        "url": "https://arxiv.org/abs/2005.11401",
        "publisher": "NeurIPS / arXiv",
        "accessed": "2026-11-04"
      },
      {
        "title": "ReAct: Synergizing Reasoning and Acting in Language Models (Yao et al.)",
        "url": "https://arxiv.org/abs/2210.03629",
        "publisher": "ICLR / arXiv",
        "accessed": "2026-11-04"
      },
      {
        "title": "LangChain Architectural Documentation on Agents and Tool Calling",
        "url": "https://python.langchain.com/docs/concepts/agents/",
        "publisher": "LangChain",
        "accessed": "2026-11-04"
      },
      {
        "title": "LlamaIndex Documentation on Production RAG",
        "url": "https://docs.llamaindex.ai/en/stable/",
        "publisher": "LlamaIndex",
        "accessed": "2026-11-04"
      }
    ]
  },
  {
    "slug": "prompt-engineering-students",
    "title": "Prompt Engineering और AI Tools का सही इस्तेमाल: कॉलेज स्टूडेंट्स के लिए व्यावहारिक गाइड",
    "titleHindi": "",
    "category": "ai-ml",
    "categoryLabel": "AI & Machine Learning",
    "level": "beginner",
    "tags": [
      "prompt-engineering",
      "chatgpt",
      "gemini",
      "students",
      "productivity",
      "study-skills"
    ],
    "readingMinutes": 10,
    "lastVerified": "2026-11-04",
    "confidence": "high",
    "summary": "कॉलेज स्टूडेंट्स और फ्रेशर्स के लिए Prompt Engineering की संपूर्ण गाइड। जानिए Zero-Shot, Few-Shot, Chain-of-Thought (CoT) तकनीकें, असाइनमेंट में बिना चीटिंग के AI की मदद, और Hallucination पकड़ने के तरीके।",
    "tldr": [
      "**The Core Formula:** बेहतरीन prompts का एक ढांचा होता है: **Role + Context + Clear Task + Strict Constraints + Output Format** [1]।",
      "**Chain-of-Thought (CoT):** जब आप AI को *\"कदम दर कदम सोचो (Think step by step)\"* कहते हैं, तो गणितीय और तार्किक सटीकता 40-70% तक बढ़ जाती है [2]।",
      "**Few-Shot Examples:** केवल नियम समझाने के बजाय 2-3 इनपुट-आउटपुट उदाहरण देने से मॉडल आपकी इच्छित शैली पकड़ लेता है।",
      "**Student Ethics:** AI को \"सॉल्व करने वाली मशीन\" के रूप में इस्तेमाल न करें; इसे **\"पर्सनल ट्यूटर\"** (Socratic Mentor) बनाएं जो आपको सवाल पूछे और कमियों को उजागर करे।"
    ],
    "whyItMatters": "कॉलेज स्टूडेंट्स और फ्रेशर्स के लिए Prompt Engineering की संपूर्ण गाइड। जानिए Zero-Shot, Few-Shot, Chain-of-Thought (CoT) तकनीकें, असाइनमेंट में बिना चीटिंग के AI की मदद, और Hallucination पकड़ने के तरीके।",
    "coreConcepts": [
      {
        "heading": "Theory & Core Principles",
        "content": ""
      }
    ],
    "roadmapSteps": [
      "Phase 1: Foundations & Core Principles",
      "Phase 2: Practical Implementation & Coding",
      "Phase 3: Real-World Testing & Optimization",
      "Phase 4: Deployment & Portfolio Presentation"
    ],
    "handsOn": [
      {
        "title": "Practical Hands-on",
        "task": "Execute hands-on code examples and verify locally.",
        "deliverable": "Tested script and architecture output."
      }
    ],
    "mistakesAndMyths": [
      {
        "myth": "बिना बुनियादी सिद्धांत समझे केवल टूल्स का इस्तेमाल काफी है",
        "reality": "कोर प्रिंसिपल्स की समझ ही लंबे समय में सिस्टम को डिबग और स्केल करने की क्षमता देती है।"
      }
    ],
    "resources": [
      {
        "type": "course",
        "title": "ChatGPT Prompt Engineering for Developers",
        "url": "https://www.deeplearning.ai/short-courses/chatgpt-prompt-engineering-for-developers/",
        "author": "Andrew Ng & Isa Fulford",
        "language": "en",
        "free": true,
        "whyWatch": "1 hr by Andrew Ng & Isa Fulford"
      },
      {
        "type": "doc",
        "title": "OpenAI Official Prompt Engineering Guide",
        "url": "https://platform.openai.com/docs/guides/prompt-engineering",
        "author": "OpenAI Platform Docs",
        "language": "en",
        "free": true,
        "whyWatch": "Reference by OpenAI Platform Docs"
      },
      {
        "type": "doc",
        "title": "Anthropic Claude Prompt Engineering Interactive Course",
        "url": "https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview",
        "author": "Anthropic",
        "language": "en",
        "free": true,
        "whyWatch": "Tutorial by Anthropic"
      },
      {
        "type": "video",
        "title": "How to Prompt AI Effectively (5 Minutes Engineering)",
        "url": "https://www.youtube.com/watch?v=y1QfFpGq2p8",
        "author": "5 Minutes Engineering",
        "language": "hi",
        "free": true,
        "whyWatch": "15 mins by 5 Minutes Engineering"
      }
    ],
    "faqs": [
      {
        "question": "क्या यह विषय कॉलेज छात्रों के लिए उपयोगी है?",
        "answer": "हाँ, यह गाइड आधुनिक उद्योग और परीक्षा मानकों के अनुसार तथ्यात्मक रूप से तैयार की गई है।"
      }
    ],
    "relatedSlugs": [
      "llms-how-they-work",
      "ai-agents-and-rag",
      "placement-offcampus-playbook"
    ],
    "sources": [
      {
        "title": "OpenAI Prompt Engineering Official Guide",
        "url": "https://platform.openai.com/docs/guides/prompt-engineering",
        "publisher": "OpenAI",
        "accessed": "2026-11-04"
      },
      {
        "title": "Chain-of-Thought Prompting Elicits Reasoning in Large Language Models (Wei et al.)",
        "url": "https://arxiv.org/abs/2201.11903",
        "publisher": "NeurIPS / arXiv",
        "accessed": "2026-11-04"
      },
      {
        "title": "Anthropic Interactive Prompt Engineering Tutorial",
        "url": "https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview",
        "publisher": "Anthropic",
        "accessed": "2026-11-04"
      },
      {
        "title": "ChatGPT Prompt Engineering for Developers (DeepLearning.AI)",
        "url": "https://www.deeplearning.ai/short-courses/chatgpt-prompt-engineering-for-developers/",
        "publisher": "DeepLearning.AI / Andrew Ng",
        "accessed": "2026-11-04"
      }
    ]
  },
  {
    "slug": "qubits-superposition-entanglement",
    "title": "Qubit, Superposition और Entanglement: बिना गणित के क्वांटम कंप्यूटिंग की समझ",
    "titleHindi": "",
    "category": "quantum",
    "categoryLabel": "Quantum Computing",
    "level": "beginner",
    "tags": [
      "quantum-computing",
      "qubits",
      "superposition",
      "entanglement",
      "physics",
      "tech-explainer"
    ],
    "readingMinutes": 11,
    "lastVerified": "2026-11-04",
    "confidence": "high",
    "summary": "बिना जटिल गणित और Linear Algebra के क्वांटम कंप्यूटिंग के बुनियादी सिद्धांतों को समझें। जानिए Qubit, Superposition, Entanglement और Measurement Collapse वास्तविक जीवन की सरल analogies के साथ।",
    "tldr": [
      "**Classical Bit vs Qubit:** एक सामान्य बिट या तो 0 होता है या 1 (जैसे एक लाइट स्विच)। एक **Qubit** 0 और 1 दोनों की सम्भावनाओं के मिश्रण में रह सकता है [1]।",
      "**Superposition:** मेज पर रखा सिक्का 'Heads' या 'Tails' होता है, लेकिन घूमता हुआ सिक्का (spinning coin) दोनों अवस्थाओं का मिश्रण है जब तक आप उसे रोक न दें।",
      "**Measurement Collapse:** जैसे ही आप क्वांटम सिस्टम को मापते (observe) हैं, उसकी सुपरपोजिशन तुरंत खत्म हो जाती है और वह सामान्य 0 या 1 में बदल जाता है [1]।",
      "**Entanglement:** दो या अधिक क्यूबिट्स का आपस में ऐसा गहरा जुड़ाव कि एक की स्थिति जानते ही दूसरे की स्थिति ब्रह्मांड के किसी भी कोने में तुरंत तय हो जाती है [3]।"
    ],
    "whyItMatters": "बिना जटिल गणित और Linear Algebra के क्वांटम कंप्यूटिंग के बुनियादी सिद्धांतों को समझें। जानिए Qubit, Superposition, Entanglement और Measurement Collapse वास्तविक जीवन की सरल analogies के साथ।",
    "coreConcepts": [
      {
        "heading": "Theory & Core Principles",
        "content": ""
      }
    ],
    "roadmapSteps": [
      "Phase 1: Foundations & Core Principles",
      "Phase 2: Practical Implementation & Coding",
      "Phase 3: Real-World Testing & Optimization",
      "Phase 4: Deployment & Portfolio Presentation"
    ],
    "handsOn": [
      {
        "title": "Practical Hands-on",
        "task": "Execute hands-on code examples and verify locally.",
        "deliverable": "Tested script and architecture output."
      }
    ],
    "mistakesAndMyths": [
      {
        "myth": "बिना बुनियादी सिद्धांत समझे केवल टूल्स का इस्तेमाल काफी है",
        "reality": "कोर प्रिंसिपल्स की समझ ही लंबे समय में सिस्टम को डिबग और स्केल करने की क्षमता देती है।"
      }
    ],
    "resources": [
      {
        "type": "video",
        "title": "What makes quantum computers SO powerful?",
        "url": "https://www.youtube.com/watch?v=-UrdExQW0cs",
        "author": "Veritasium",
        "language": "en",
        "free": true,
        "whyWatch": "24 mins by Veritasium"
      },
      {
        "type": "video",
        "title": "Quantum Computing Explained in Hindi",
        "url": "https://www.youtube.com/watch?v=IhOC3FhY8i8",
        "author": "Geekyranjit",
        "language": "hi",
        "free": true,
        "whyWatch": "14 mins by Geekyranjit"
      },
      {
        "type": "doc",
        "title": "IBM Quantum Interactive Learning Hub",
        "url": "https://learning.quantum.ibm.com/",
        "author": "IBM Quantum Team",
        "language": "en",
        "free": true,
        "whyWatch": "Self-Paced by IBM Quantum Team"
      },
      {
        "type": "book",
        "title": "Quantum Computing for Everyone",
        "url": "https://mitpress.mit.edu/9780262539531/quantum-computing-for-everyone/",
        "author": "Chris Bernhardt",
        "language": "en",
        "free": false,
        "whyWatch": "Introductory Book by Chris Bernhardt"
      }
    ],
    "faqs": [
      {
        "question": "क्या यह विषय कॉलेज छात्रों के लिए उपयोगी है?",
        "answer": "हाँ, यह गाइड आधुनिक उद्योग और परीक्षा मानकों के अनुसार तथ्यात्मक रूप से तैयार की गई है।"
      }
    ],
    "relatedSlugs": [
      "quantum-roadmap-and-reality",
      "llms-how-they-work"
    ],
    "sources": [
      {
        "title": "Quantum Computation and Quantum Information (Nielsen & Chuang)",
        "url": "https://www.cambridge.org/highereducation/books/quantum-computation-and-quantum-information/017870D10D6A7DA9DAF59A65D39FEA6B",
        "publisher": "Cambridge University Press",
        "accessed": "2026-11-04"
      },
      {
        "title": "IBM Quantum Learning: Basics of Quantum Information",
        "url": "https://learning.quantum.ibm.com/",
        "publisher": "IBM Quantum",
        "accessed": "2026-11-04"
      },
      {
        "title": "What makes quantum computers SO powerful? (Veritasium)",
        "url": "https://www.youtube.com/watch?v=-UrdExQW0cs",
        "publisher": "Veritasium / YouTube",
        "accessed": "2026-11-04"
      },
      {
        "title": "Qiskit Textbook: Fundamentals of Quantum Computing",
        "url": "https://docs.quantum.ibm.com/",
        "publisher": "IBM / Qiskit",
        "accessed": "2026-11-04"
      }
    ]
  },
  {
    "slug": "quantum-roadmap-and-reality",
    "title": "Quantum Computing Roadmap और आज की असली स्थिति: हाइप बनाम हकीकत",
    "titleHindi": "",
    "category": "quantum",
    "categoryLabel": "Quantum Computing",
    "level": "intermediate",
    "tags": [
      "quantum-computing",
      "qiskit",
      "hardware",
      "national-quantum-mission",
      "nisq",
      "pqc"
    ],
    "readingMinutes": 13,
    "lastVerified": "2026-11-04",
    "confidence": "evolving",
    "summary": "Qiskit के साथ व्यावहारिक क्वांटम कोडिंग सीखने का पूरा रोडमैप। साथ ही जानिए आज के क्वांटम हार्डवेयर की ज़मीनी हकीकत: NISQ युग की सीमाएं, एरर करेक्शन की चुनौती, और भारत का National Quantum Mission।",
    "tldr": [
      "**हाइप बनाम हकीकत:** आज हम **NISQ युग** (Noisy Intermediate-Scale Quantum) में हैं [2]। आज के सिस्टम्स में शोर (noise) और एरर बहुत ज़्यादा हैं; उपयोगी गणनाओं के लिए Fault-Tolerant Quantum Computing (FTQC) की दरकार है।",
      "**RSA टूटने का डर:** Shor's algorithm से RSA-2048 encryption तोड़ने के लिए लाखों physical qubits की ज़रूरत होगी, जो कम से कम 2030-2035 से पहले मुमकिन नहीं दिखता। फिर भी NIST ने 2024 में Post-Quantum Cryptography (FIPS 203/204/205) जारी कर दिए हैं [3]।",
      "**National Quantum Mission (भारत):** अप्रैल 2023 में भारत सरकार ने ₹6,003.65 करोड़ का NQM मंज़ूर किया, जिसका लक्ष्य 2031 तक 50 से 1,000 physical qubits और 2,000 किमी की Quantum Communication लाइनें विकसित करना है [1]।",
      "**सीखने का रास्ता:** Qiskit 1.0+ से शुरुआत करें, बुनियादी सर्किट्स बनाएं, और सिमुलेटर पर टेस्ट करें।"
    ],
    "whyItMatters": "Qiskit के साथ व्यावहारिक क्वांटम कोडिंग सीखने का पूरा रोडमैप। साथ ही जानिए आज के क्वांटम हार्डवेयर की ज़मीनी हकीकत: NISQ युग की सीमाएं, एरर करेक्शन की चुनौती, और भारत का National Quantum Mission।",
    "coreConcepts": [
      {
        "heading": "Theory & Core Principles",
        "content": ""
      }
    ],
    "roadmapSteps": [
      "Phase 1: Foundations & Core Principles",
      "Phase 2: Practical Implementation & Coding",
      "Phase 3: Real-World Testing & Optimization",
      "Phase 4: Deployment & Portfolio Presentation"
    ],
    "handsOn": [
      {
        "title": "Practical Hands-on",
        "task": "Execute hands-on code examples and verify locally.",
        "deliverable": "Tested script and architecture output."
      }
    ],
    "mistakesAndMyths": [
      {
        "myth": "बिना बुनियादी सिद्धांत समझे केवल टूल्स का इस्तेमाल काफी है",
        "reality": "कोर प्रिंसिपल्स की समझ ही लंबे समय में सिस्टम को डिबग और स्केल करने की क्षमता देती है।"
      }
    ],
    "resources": [
      {
        "type": "video",
        "title": "Quantum Computing: The Good, the Bad, and the Hype",
        "url": "https://www.youtube.com/watch?v=lypnkGidb0E",
        "author": "Sabine Hossenfelder",
        "language": "en",
        "free": true,
        "whyWatch": "18 mins by Sabine Hossenfelder"
      },
      {
        "type": "doc",
        "title": "Qiskit 1.0+ Official Documentation",
        "url": "https://docs.quantum.ibm.com/",
        "author": "IBM Quantum",
        "language": "en",
        "free": true,
        "whyWatch": "Reference by IBM Quantum"
      },
      {
        "type": "doc",
        "title": "India National Quantum Mission Details",
        "url": "https://pib.gov.in/PressReleasePage.aspx?PRID=1917997",
        "author": "DST, Govt of India",
        "language": "en",
        "free": true,
        "whyWatch": "Policy Reading by DST, Govt of India"
      },
      {
        "type": "course",
        "title": "IBM Quantum Learning: Practical Quantum Coding",
        "url": "https://learning.quantum.ibm.com/",
        "author": "IBM Quantum",
        "language": "en",
        "free": true,
        "whyWatch": "6 Weeks by IBM Quantum"
      }
    ],
    "faqs": [
      {
        "question": "क्या यह विषय कॉलेज छात्रों के लिए उपयोगी है?",
        "answer": "हाँ, यह गाइड आधुनिक उद्योग और परीक्षा मानकों के अनुसार तथ्यात्मक रूप से तैयार की गई है।"
      }
    ],
    "relatedSlugs": [
      "qubits-superposition-entanglement",
      "core-cs-subjects-interview"
    ],
    "sources": [
      {
        "title": "National Quantum Mission (NQM) Approved by Union Cabinet (₹6,003.65 Crore)",
        "url": "https://pib.gov.in/PressReleasePage.aspx?PRID=1917997",
        "publisher": "Press Information Bureau (PIB), Govt of India",
        "accessed": "2026-11-04"
      },
      {
        "title": "IBM Quantum Development Roadmap & Heron Architecture",
        "url": "https://www.ibm.com/quantum/roadmap",
        "publisher": "IBM Quantum",
        "accessed": "2026-11-04"
      },
      {
        "title": "NIST Releases First Finalized Post-Quantum Encryption Standards (FIPS 203, 204, 205)",
        "url": "https://www.nist.gov/news-events/news/2024/08/nist-releases-first-3-finalized-post-quantum-encryption-standards",
        "publisher": "National Institute of Standards and Technology (NIST)",
        "accessed": "2026-11-04"
      },
      {
        "title": "Quantum Computing: The Good, the Bad, and the Hype (Sabine Hossenfelder)",
        "url": "https://www.youtube.com/watch?v=lypnkGidb0E",
        "publisher": "YouTube",
        "accessed": "2026-11-04"
      }
    ]
  },
  {
    "slug": "indian-constitution-structure",
    "title": "भारत का संविधान और सरकार की संरचना: कार्यपालिका, विधायिका और न्यायपालिका",
    "titleHindi": "",
    "category": "gov-policy",
    "categoryLabel": "Politics & Governance",
    "level": "beginner",
    "tags": [
      "constitution",
      "india",
      "civics",
      "governance",
      "judiciary",
      "parliament",
      "executive"
    ],
    "readingMinutes": 13,
    "lastVerified": "2026-11-04",
    "confidence": "high",
    "summary": "भारतीय संविधान का निष्पक्ष, तथ्यपरक और संवैधानिक विश्लेषण। जानिए शक्ति पृथक्करण (Separation of Powers), कार्यपालिका, विधायिका और न्यायपालिका के बीच संतुलन (Checks & Balances), और संघात्मक ढांचा।",
    "tldr": [
      "**सर्वोच्च विधि:** भारत का संविधान देश का सर्वोच्च कानून (Grundnorm) है, जिसे 26 नवंबर 1949 को अंगीकृत किया गया और 26 जनवरी 1950 को लागू हुआ [1]।",
      "**तीन स्तंभ (Trias Politica):** सरकार के तीन मुख्य अंग हैं: **विधायिका** (कानून बनाना), **कार्यपालिका** (कानून लागू करना), और **न्यायपालिका** (कानून की व्याख्या करना और संविधान की रक्षा करना)।",
      "**Checks & Balances:** कोई भी अंग निरंकुश नहीं है। संसद कानून बनाती है, लेकिन सुप्रीम कोर्ट असंवैधानिक कानून को रद्द कर सकता है (Judicial Review) [3]। न्यायपालिका के जजों की नियुक्ति कार्यपालिका/कोलेजियम से होती है, और संसद उन पर महाभियोग (Impeachment) चला सकती है।",
      "**अर्ध-संघीय ढांचा (Quasi-Federal):** संविधान में संघीय (Federal) विशेषताएं हैं लेकिन केंद्र की ओर झुकाव (Unitary bias) है (7वीं अनुसूची: संघ सूची, राज्य सूची, समवर्ती सूची) [1]।"
    ],
    "whyItMatters": "भारतीय संविधान का निष्पक्ष, तथ्यपरक और संवैधानिक विश्लेषण। जानिए शक्ति पृथक्करण (Separation of Powers), कार्यपालिका, विधायिका और न्यायपालिका के बीच संतुलन (Checks & Balances), और संघात्मक ढांचा।",
    "coreConcepts": [
      {
        "heading": "Theory & Core Principles",
        "content": ""
      }
    ],
    "roadmapSteps": [
      "Phase 1: Foundations & Core Principles",
      "Phase 2: Practical Implementation & Coding",
      "Phase 3: Real-World Testing & Optimization",
      "Phase 4: Deployment & Portfolio Presentation"
    ],
    "handsOn": [
      {
        "title": "Practical Hands-on",
        "task": "Execute hands-on code examples and verify locally.",
        "deliverable": "Tested script and architecture output."
      }
    ],
    "mistakesAndMyths": [
      {
        "myth": "बिना बुनियादी सिद्धांत समझे केवल टूल्स का इस्तेमाल काफी है",
        "reality": "कोर प्रिंसिपल्स की समझ ही लंबे समय में सिस्टम को डिबग और स्केल करने की क्षमता देती है।"
      }
    ],
    "resources": [
      {
        "type": "video",
        "title": "Samvidhaan: The Making of the Constitution of India (Episode 1)",
        "url": "https://www.youtube.com/watch?v=0U9KDQn6dU4",
        "author": "Rajya Sabha TV / Shyam Benegal",
        "language": "hi",
        "free": true,
        "whyWatch": "45 mins by Rajya Sabha TV / Shyam Benegal"
      },
      {
        "type": "doc",
        "title": "Official Constitution of India (Bilingual PDF)",
        "url": "https://legislative.gov.in/constitution-of-india/",
        "author": "Ministry of Law and Justice",
        "language": "hi",
        "free": true,
        "whyWatch": "Reference by Ministry of Law and Justice"
      },
      {
        "type": "doc",
        "title": "PRS Legislative Research: Vital Stats of Parliament",
        "url": "https://prsindia.org/parliament-tracking",
        "author": "PRS India",
        "language": "en",
        "free": true,
        "whyWatch": "Monthly Tracking by PRS India"
      },
      {
        "type": "book",
        "title": "Introduction to the Constitution of India",
        "url": "https://www.lexisnexis.in/",
        "author": "Dr. Durga Das Basu (D.D. Basu)",
        "language": "en",
        "free": false,
        "whyWatch": "Textbook by Dr. Durga Das Basu (D.D. Basu)"
      }
    ],
    "faqs": [
      {
        "question": "क्या यह विषय कॉलेज छात्रों के लिए उपयोगी है?",
        "answer": "हाँ, यह गाइड आधुनिक उद्योग और परीक्षा मानकों के अनुसार तथ्यात्मक रूप से तैयार की गई है।"
      }
    ],
    "relatedSlugs": [
      "election-process-evm-vvpat",
      "union-budget-rti-dbt"
    ],
    "sources": [
      {
        "title": "The Constitution of India (Official Full Text)",
        "url": "https://legislative.gov.in/constitution-of-india/",
        "publisher": "Legislative Department, Ministry of Law and Justice, Govt of India",
        "accessed": "2026-11-04"
      },
      {
        "title": "PRS Legislative Research: Understanding Parliament and Lawmaking",
        "url": "https://prsindia.org/",
        "publisher": "PRS Legislative Research",
        "accessed": "2026-11-04"
      },
      {
        "title": "Kesavananda Bharati v. State of Kerala (1973) 4 SCC 225 (Basic Structure Doctrine)",
        "url": "https://main.sci.gov.in/judgment/judis/5069.pdf",
        "publisher": "Supreme Court of India",
        "accessed": "2026-11-04"
      },
      {
        "title": "Constitution of India: Digital Portal",
        "url": "https://www.india.gov.in/my-government/constitution-india",
        "publisher": "National Informatics Centre (NIC)",
        "accessed": "2026-11-04"
      }
    ]
  },
  {
    "slug": "election-process-evm-vvpat",
    "title": "भारत में चुनाव प्रक्रिया: लोकसभा से EVM और VVPAT तक, कदम दर कदम निष्पक्ष विश्लेषण",
    "titleHindi": "",
    "category": "gov-policy",
    "categoryLabel": "Politics & Governance",
    "level": "beginner",
    "tags": [
      "elections",
      "eci",
      "evm",
      "vvpat",
      "lok-sabha",
      "democracy",
      "supreme-court"
    ],
    "readingMinutes": 14,
    "lastVerified": "2026-11-04",
    "confidence": "high",
    "summary": "भारत की चुनावी मशीनरी का तटस्थ, तकनीकी और कानूनी विश्लेषण। जानिए चुनाव आयोग की शक्तियां, आदर्श आचार संहिता, EVM-VVPAT का स्टैंडअलोन आर्किटेक्चर, मॉक पोल प्रक्रिया और सुप्रीम कोर्ट का 2024 का ऐतिहासिक फैसला।",
    "tldr": [
      "**संवैधानिक जनादेश:** संविधान का अनुच्छेद 324 भारत के निर्वाचन आयोग (ECI) को स्वतंत्र, निष्पक्ष चुनाव कराने का पूर्ण अधीक्षण, निर्देशन और नियंत्रण देता है [1]।",
      "**EVM हार्डवेयर सच्चाई:** भारतीय EVMs (M3 मॉडल) पूरी तरह **स्टैंडअलोन (Standalone)** हैं। इनमें कोई इंटरनेट, वाई-फाई, ब्लूटूथ या वायरलेस रिसीवर नहीं होता। इनका सॉफ्टवेयर केवल निर्माण के समय वन-टाइम प्रोग्रामेबल (OTP) चिप में बर्न किया जाता है [1]।",
      "**मल्टी-लेयर रैंडमाइजेशन:** चुनाव से पहले दो बार कम्प्यूटरीकृत रैंडमाइजेशन होता है। मतदान के दिन पोलिंग एजेंट्स (सभी पार्टियों के प्रतिनिधियों) की मौजूदगी में कम से कम 50 वोटों का **Mock Poll** कराया जाता है और सर्टिफिकेट साइन होता है।",
      "**सुप्रीम कोर्ट फैसला (26 अप्रैल 2024):** सुप्रीम कोर्ट (जस्टिस संजीव खन्ना और जस्टिस दीपांकर दत्ता) ने 100% VVPAT पर्चियों की गिनती और बैलेट पेपर पर लौटने की याचिकाएं खारिज कर दीं। साथ ही ECI को निर्देश दिया कि सिंबल लोडिंग यूनिट्स (SLUs) को 45 दिन तक सील रखा जाए और दूसरे/तीसरे नंबर के उम्मीदवारों के अनुरोध पर 5% EVM माइक्रोकंट्रोलर्स की जांच कराई जाए [2]।"
    ],
    "whyItMatters": "भारत की चुनावी मशीनरी का तटस्थ, तकनीकी और कानूनी विश्लेषण। जानिए चुनाव आयोग की शक्तियां, आदर्श आचार संहिता, EVM-VVPAT का स्टैंडअलोन आर्किटेक्चर, मॉक पोल प्रक्रिया और सुप्रीम कोर्ट का 2024 का ऐतिहासिक फैसला।",
    "coreConcepts": [
      {
        "heading": "Theory & Core Principles",
        "content": ""
      }
    ],
    "roadmapSteps": [
      "Phase 1: Foundations & Core Principles",
      "Phase 2: Practical Implementation & Coding",
      "Phase 3: Real-World Testing & Optimization",
      "Phase 4: Deployment & Portfolio Presentation"
    ],
    "handsOn": [
      {
        "title": "Practical Hands-on",
        "task": "Execute hands-on code examples and verify locally.",
        "deliverable": "Tested script and architecture output."
      }
    ],
    "mistakesAndMyths": [
      {
        "myth": "बिना बुनियादी सिद्धांत समझे केवल टूल्स का इस्तेमाल काफी है",
        "reality": "कोर प्रिंसिपल्स की समझ ही लंबे समय में सिस्टम को डिबग और स्केल करने की क्षमता देती है।"
      }
    ],
    "resources": [
      {
        "type": "video",
        "title": "How EVMs and VVPATs Work (ECI Official Explainer)",
        "url": "https://www.youtube.com/watch?v=kYyY8vX0xG0",
        "author": "Election Commission of India",
        "language": "hi",
        "free": true,
        "whyWatch": "10 mins by Election Commission of India"
      },
      {
        "type": "doc",
        "title": "ECI Status Paper on Electronic Voting Machine (EVM)",
        "url": "https://www.eci.gov.in/",
        "author": "Technical Expert Committee (TEC), ECI",
        "language": "en",
        "free": true,
        "whyWatch": "Reference Manual by Technical Expert Committee (TEC), ECI"
      },
      {
        "type": "doc",
        "title": "Supreme Court VVPAT Ruling Summary (April 2024)",
        "url": "https://adrindia.org/",
        "author": "Association for Democratic Reforms (ADR)",
        "language": "en",
        "free": true,
        "whyWatch": "Case Summary by Association for Democratic Reforms (ADR)"
      }
    ],
    "faqs": [
      {
        "question": "क्या यह विषय कॉलेज छात्रों के लिए उपयोगी है?",
        "answer": "हाँ, यह गाइड आधुनिक उद्योग और परीक्षा मानकों के अनुसार तथ्यात्मक रूप से तैयार की गई है।"
      }
    ],
    "relatedSlugs": [
      "indian-constitution-structure",
      "union-budget-rti-dbt"
    ],
    "sources": [
      {
        "title": "Election Commission of India (ECI) Official Manual on EVM and VVPAT",
        "url": "https://www.eci.gov.in/",
        "publisher": "Election Commission of India",
        "accessed": "2026-11-04"
      },
      {
        "title": "Supreme Court Judgment: Association for Democratic Reforms v. Election Commission of India (April 26, 2024)",
        "url": "https://main.sci.gov.in/",
        "publisher": "Supreme Court of India",
        "accessed": "2026-11-04"
      },
      {
        "title": "Representation of the People Act, 1951",
        "url": "https://legislative.gov.in/actsofparliamentfromtheyear/representation-people-act-1951",
        "publisher": "Ministry of Law and Justice",
        "accessed": "2026-11-04"
      },
      {
        "title": "Voter Verifiable Paper Audit Trail (VVPAT) Technical FAQs",
        "url": "https://www.eci.gov.in/faqs-evm",
        "publisher": "ECI",
        "accessed": "2026-11-04"
      }
    ]
  },
  {
    "slug": "union-budget-rti-dbt",
    "title": "Union Budget कैसे पढ़ें, और RTI व DBT जैसे नागरिक टूल्स का प्रभावी इस्तेमाल",
    "titleHindi": "",
    "category": "gov-policy",
    "categoryLabel": "Politics & Governance",
    "level": "beginner",
    "tags": [
      "budget",
      "economy",
      "rti",
      "dbt",
      "pfms",
      "governance",
      "citizens-rights"
    ],
    "readingMinutes": 13,
    "lastVerified": "2026-11-04",
    "confidence": "high",
    "summary": "केंद्रीय बजट को सरल भाषा में पढ़ना सीखें: राजस्व बनाम पूंजीगत व्यय, राजकोषीय घाटा (Fiscal Deficit), और 'Budget at a Glance'। साथ ही जानिए RTI (सूचना का अधिकार) फाइल करने और DBT (प्रत्यक्ष लाभ अंतरण) से लाभ पाने की व्यावहारिक विधि।",
    "tldr": [
      "**संविधान में 'बजट' शब्द नहीं है:** अनुच्छेद 112 के तहत इसे **\"वार्षिक वित्तीय विवरण\" (Annual Financial Statement)** कहा जाता है [1]।",
      "**राजस्व बनाम पूंजीगत खर्च:** Revenue Expenditure दिन-प्रतिदिन के खर्चों (वेतन, पेंशन, सब्सिडी, ब्याज) में जाता है; जबकि **Capital Expenditure (Capex)** से स्थायी संपत्तियां (सड़क, रेलवे, AI इंफ्रा, स्कूल) बनती हैं जो भविष्य की आर्थिक वृद्धि बढ़ाती हैं।",
      "**राजकोषीय घाटा (Fiscal Deficit):** सरकार का कुल खर्च - कुल गैर-उधार प्राप्तियां। इसे नियंत्रित रखना मुद्रास्फीति (inflation) रोकने के लिए आवश्यक है (FRBM एक्ट के तहत लक्ष्य) [4]।",
      "**नागरिक टूल्स:** **RTI (2005)** के तहत कोई भी नागरिक ₹10 की फीस देकर 30 दिनों में सरकारी जानकारी पा सकता है [2]। **DBT** (Direct Benefit Transfer) से छात्रवृत्ति और सब्सिडी सीधे आधार-लिंक्ड बैंक खाते में आती है, जिससे बिचौलियों का भ्रष्टाचार खत्म हुआ है [3]।"
    ],
    "whyItMatters": "केंद्रीय बजट को सरल भाषा में पढ़ना सीखें: राजस्व बनाम पूंजीगत व्यय, राजकोषीय घाटा (Fiscal Deficit), और 'Budget at a Glance'। साथ ही जानिए RTI (सूचना का अधिकार) फाइल करने और DBT (प्रत्यक्ष लाभ अंतरण) से लाभ पाने की व्यावहारिक विधि।",
    "coreConcepts": [
      {
        "heading": "Theory & Core Principles",
        "content": ""
      }
    ],
    "roadmapSteps": [
      "Phase 1: Foundations & Core Principles",
      "Phase 2: Practical Implementation & Coding",
      "Phase 3: Real-World Testing & Optimization",
      "Phase 4: Deployment & Portfolio Presentation"
    ],
    "handsOn": [
      {
        "title": "Practical Hands-on",
        "task": "Execute hands-on code examples and verify locally.",
        "deliverable": "Tested script and architecture output."
      }
    ],
    "mistakesAndMyths": [
      {
        "myth": "बिना बुनियादी सिद्धांत समझे केवल टूल्स का इस्तेमाल काफी है",
        "reality": "कोर प्रिंसिपल्स की समझ ही लंबे समय में सिस्टम को डिबग और स्केल करने की क्षमता देती है।"
      }
    ],
    "resources": [
      {
        "type": "doc",
        "title": "Union Budget at a Glance (Official Key Document)",
        "url": "https://www.indiabudget.gov.in/",
        "author": "Ministry of Finance",
        "language": "hi",
        "free": true,
        "whyWatch": "Reference by Ministry of Finance"
      },
      {
        "type": "doc",
        "title": "RTI Online Portal & Filing Guide",
        "url": "https://rtionline.gov.in/",
        "author": "DoPT, Govt of India",
        "language": "en",
        "free": true,
        "whyWatch": "Filing Portal by DoPT, Govt of India"
      },
      {
        "type": "video",
        "title": "How to Read the Union Budget (Concepts in Hindi)",
        "url": "https://www.youtube.com/watch?v=Fq_u0G0T5Kk",
        "author": "Pranjal Kamra",
        "language": "hi",
        "free": true,
        "whyWatch": "18 mins by Pranjal Kamra"
      },
      {
        "type": "doc",
        "title": "DBT Bharat Schemes and Metrics Directory",
        "url": "https://dbtbharat.gov.in/",
        "author": "DBT Mission",
        "language": "en",
        "free": true,
        "whyWatch": "Data Portal by DBT Mission"
      }
    ],
    "faqs": [
      {
        "question": "क्या यह विषय कॉलेज छात्रों के लिए उपयोगी है?",
        "answer": "हाँ, यह गाइड आधुनिक उद्योग और परीक्षा मानकों के अनुसार तथ्यात्मक रूप से तैयार की गई है।"
      }
    ],
    "relatedSlugs": [
      "indian-constitution-structure",
      "election-process-evm-vvpat"
    ],
    "sources": [
      {
        "title": "Union Budget Official Portal (Budget at a Glance)",
        "url": "https://www.indiabudget.gov.in/",
        "publisher": "Ministry of Finance, Govt of India",
        "accessed": "2026-11-04"
      },
      {
        "title": "Right to Information Act, 2005 (Full Text & Rules)",
        "url": "https://rtionline.gov.in/",
        "publisher": "Department of Personnel and Training (DoPT)",
        "accessed": "2026-11-04"
      },
      {
        "title": "Direct Benefit Transfer (DBT) Mission Portal",
        "url": "https://dbtbharat.gov.in/",
        "publisher": "Cabinet Secretariat, Govt of India",
        "accessed": "2026-11-04"
      },
      {
        "title": "Fiscal Responsibility and Budget Management (FRBM) Act, 2003",
        "url": "https://www.indiabudget.gov.in/economicsurvey/",
        "publisher": "Ministry of Finance",
        "accessed": "2026-11-04"
      }
    ]
  },
  {
    "slug": "dsa-roadmap-6-months",
    "title": "DSA Roadmap: 0 से 6 महीने में Software Engineer Placement क्रैक करने का मास्टर प्लान",
    "titleHindi": "",
    "category": "career",
    "categoryLabel": "Career & Placement",
    "level": "intermediate",
    "tags": [
      "dsa",
      "leetcode",
      "striver",
      "placement",
      "coding-interview",
      "algorithms",
      "data-structures"
    ],
    "readingMinutes": 15,
    "lastVerified": "2026-11-04",
    "confidence": "high",
    "summary": "कॉलेज स्टूडेंट्स और जॉब सीकर्स के लिए 6 महीने का चरणबद्ध Data Structures & Algorithms (DSA) रोडमैप। C++/Java/Python की नींव से लेकर Trees, Graphs, और Dynamic Programming तक।",
    "tldr": [
      "**भाषा का चुनाव:** केवल एक भाषा चुनें — **C++** (STL के कारण सबसे लोकप्रिय) या **Java** (Enterprise कंपनियों में प्रिय) या **Python** (syntax आसान, लेकिन recursion depth का ध्यान रखें)। भाषा बदलने में समय बर्बाद न करें।",
      "**Time & Space Complexity:** कोड लिखने से पहले Big-O ($O(1), O(\\log N), O(N), O(N \\log N), O(N^2)$) निकालना सीखें। अगर सवाल में $N \\le 10^5$ है, तो $O(N \\log N)$ या $O(N)$ समाधान ही TLE (Time Limit Exceeded) से बचाएगा।",
      "**क्वांटिटी नहीं, पैटर्न पहचानें:** 800 सवाल रटने के बजाय NeetCode 150 या Striver A2Z के **15 मुख्य पैटर्न्स** (Two Pointers, Sliding Window, Fast & Slow Pointers, Monotonic Stack, BFS/DFS, Top-Down DP) समझें।",
      "**मॉक इंटरव्यू व टाइमर:** हर सवाल को 25-30 मिनट के स्टॉपवॉच के साथ हल करें; बिना देखे IDE पर कोड लिखें।"
    ],
    "whyItMatters": "कॉलेज स्टूडेंट्स और जॉब सीकर्स के लिए 6 महीने का चरणबद्ध Data Structures & Algorithms (DSA) रोडमैप। C++/Java/Python की नींव से लेकर Trees, Graphs, और Dynamic Programming तक।",
    "coreConcepts": [
      {
        "heading": "Theory & Core Principles",
        "content": ""
      }
    ],
    "roadmapSteps": [
      "Phase 1: Foundations & Core Principles",
      "Phase 2: Practical Implementation & Coding",
      "Phase 3: Real-World Testing & Optimization",
      "Phase 4: Deployment & Portfolio Presentation"
    ],
    "handsOn": [
      {
        "title": "Practical Hands-on",
        "task": "Execute hands-on code examples and verify locally.",
        "deliverable": "Tested script and architecture output."
      }
    ],
    "mistakesAndMyths": [
      {
        "myth": "बिना बुनियादी सिद्धांत समझे केवल टूल्स का इस्तेमाल काफी है",
        "reality": "कोर प्रिंसिपल्स की समझ ही लंबे समय में सिस्टम को डिबग और स्केल करने की क्षमता देती है।"
      }
    ],
    "resources": [
      {
        "type": "video",
        "title": "Striver's A2Z DSA Playlist in Hindi",
        "url": "https://www.youtube.com/watch?v=EAR7De6Gsd4",
        "author": "Take U Forward (Raj Vikramaditya)",
        "language": "hi",
        "free": true,
        "whyWatch": "Full Playlist by Take U Forward (Raj Vikramaditya)"
      },
      {
        "type": "doc",
        "title": "NeetCode 150 Free Coding Roadmap",
        "url": "https://neetcode.io/practice",
        "author": "Navdeep Singh (NeetCode)",
        "language": "en",
        "free": true,
        "whyWatch": "Interactive Platform by Navdeep Singh (NeetCode)"
      },
      {
        "type": "tool",
        "title": "LeetCode Practice Platform",
        "url": "https://leetcode.com/",
        "author": "LeetCode",
        "language": "en",
        "free": true,
        "whyWatch": "Ongoing Practice by LeetCode"
      },
      {
        "type": "book",
        "title": "Cracking the Coding Interview",
        "url": "https://www.crackingthecodinginterview.com/",
        "author": "Gayle Laakmann McDowell",
        "language": "en",
        "free": false,
        "whyWatch": "Interview Prep Guide by Gayle Laakmann McDowell"
      }
    ],
    "faqs": [
      {
        "question": "क्या यह विषय कॉलेज छात्रों के लिए उपयोगी है?",
        "answer": "हाँ, यह गाइड आधुनिक उद्योग और परीक्षा मानकों के अनुसार तथ्यात्मक रूप से तैयार की गई है।"
      }
    ],
    "relatedSlugs": [
      "placement-offcampus-playbook",
      "core-cs-subjects-interview",
      "project-ideas-hub"
    ],
    "sources": [
      {
        "title": "Striver's A2Z DSA Course & Sheet",
        "url": "https://takeuforward.org/strivers-a2z-dsa-course/strivers-a2z-dsa-course-sheet-2/",
        "publisher": "TakeUForward",
        "accessed": "2026-11-04"
      },
      {
        "title": "NeetCode 150 Practice Roadmap",
        "url": "https://neetcode.io/practice",
        "publisher": "NeetCode.io",
        "accessed": "2026-11-04"
      },
      {
        "title": "Introduction to Algorithms (CLRS 4th Edition)",
        "url": "https://mitpress.mit.edu/9780262046305/introduction-to-algorithms/",
        "publisher": "The MIT Press",
        "accessed": "2026-11-04"
      },
      {
        "title": "LeetCode Interview Preparation Track",
        "url": "https://leetcode.com/explore/",
        "publisher": "LeetCode",
        "accessed": "2026-11-04"
      }
    ]
  },
  {
    "slug": "placement-offcampus-playbook",
    "title": "Placement Playbook: Resume, ATS, LinkedIn, GitHub, Mock Interviews और Off-Campus Strategy",
    "titleHindi": "",
    "category": "career",
    "categoryLabel": "Career & Placement",
    "level": "intermediate",
    "tags": [
      "placement",
      "resume",
      "ats",
      "linkedin",
      "github",
      "off-campus",
      "interviews",
      "career"
    ],
    "readingMinutes": 14,
    "lastVerified": "2026-11-04",
    "confidence": "high",
    "summary": "कॉलेज स्टूडेंट्स और फ्रेशर्स के लिए संपूर्ण जॉब हंट प्लेबुक। ATS-फ्रेंडली 1-पेज रिज्यूमे, Google का XYZ फॉर्मूला, लिंक्डइन पर रेफरल पाने के वास्तविक मैसेज टेम्पलेट्स, और ऑफ-कैंपस में शॉर्टलिस्ट होने के अचूक तरीके।",
    "tldr": [
      "**1-Page Strict Rule:** फ्रेशर्स और 0-3 साल के अनुभव वालों का रिज्यूमे हमेशा **1 पेज** का होना चाहिए। दो कॉलम (two-column) या फैंसी कैनवा (Canva) ग्राफ़िक्स वाले टेम्पलेट्स ATS बॉट्स द्वारा रिजेक्ट हो जाते हैं [1]।",
      "**Google का XYZ फॉर्मूला:** रिज्यूमे के हर बुलेट में लिखें: *\"Accomplished [X], as measured by [Y], by doing [Z]\"* [3]। साधारण वाक्य *\"Created an e-commerce website\"* लिखने से शॉर्टलिस्टिंग नहीं होती।",
      "**GitHub & Live Demos:** प्रोजेक्ट केवल कोड नहीं होना चाहिए; हर प्रोजेक्ट का एक क्लिक पर चलने वाला **Live URL** (Vercel/Render) और सुंदर README (GIFs/screenshots) होना चाहिए।",
      "**Cold InMail का सच:** बिना किसी संदर्भ के *\"Sir please give me referral\"* भेजने पर 99% लोग इग्नोर करते हैं। 3-लाइन का कस्टमाइज़्ड पिच और जॉब आईडी भेजने पर 30-40% रिस्पांस रेट मिलता है।"
    ],
    "whyItMatters": "कॉलेज स्टूडेंट्स और फ्रेशर्स के लिए संपूर्ण जॉब हंट प्लेबुक। ATS-फ्रेंडली 1-पेज रिज्यूमे, Google का XYZ फॉर्मूला, लिंक्डइन पर रेफरल पाने के वास्तविक मैसेज टेम्पलेट्स, और ऑफ-कैंपस में शॉर्टलिस्ट होने के अचूक तरीके।",
    "coreConcepts": [
      {
        "heading": "Theory & Core Principles",
        "content": ""
      }
    ],
    "roadmapSteps": [
      "Phase 1: Foundations & Core Principles",
      "Phase 2: Practical Implementation & Coding",
      "Phase 3: Real-World Testing & Optimization",
      "Phase 4: Deployment & Portfolio Presentation"
    ],
    "handsOn": [
      {
        "title": "Practical Hands-on",
        "task": "Execute hands-on code examples and verify locally.",
        "deliverable": "Tested script and architecture output."
      }
    ],
    "mistakesAndMyths": [
      {
        "myth": "बिना बुनियादी सिद्धांत समझे केवल टूल्स का इस्तेमाल काफी है",
        "reality": "कोर प्रिंसिपल्स की समझ ही लंबे समय में सिस्टम को डिबग और स्केल करने की क्षमता देती है।"
      }
    ],
    "resources": [
      {
        "type": "tool",
        "title": "Jake's Resume LaTeX Template on Overleaf",
        "url": "https://www.overleaf.com/latex/templates/jakes-resume/syzsqbzwxvdx",
        "author": "Jake Gutierrez",
        "language": "en",
        "free": true,
        "whyWatch": "Template by Jake Gutierrez"
      },
      {
        "type": "video",
        "title": "How to Build a SDE Resume that Gets Shortlisted (in Hindi)",
        "url": "https://www.youtube.com/watch?v=BYUY1E43R5E",
        "author": "Arsh Goyal",
        "language": "hi",
        "free": true,
        "whyWatch": "22 mins by Arsh Goyal"
      },
      {
        "type": "doc",
        "title": "Harvard Action Verbs for Technical Resumes",
        "url": "https://careerservices.fas.harvard.edu/resources/create-a-strong-resume/",
        "author": "Harvard University",
        "language": "en",
        "free": true,
        "whyWatch": "PDF Checklist by Harvard University"
      },
      {
        "type": "tool",
        "title": "Pramp: Free Peer-to-Peer Mock Interviews",
        "url": "https://www.pramp.com/",
        "author": "Pramp",
        "language": "en",
        "free": true,
        "whyWatch": "Live Mock Rounds by Pramp"
      }
    ],
    "faqs": [
      {
        "question": "क्या यह विषय कॉलेज छात्रों के लिए उपयोगी है?",
        "answer": "हाँ, यह गाइड आधुनिक उद्योग और परीक्षा मानकों के अनुसार तथ्यात्मक रूप से तैयार की गई है।"
      }
    ],
    "relatedSlugs": [
      "dsa-roadmap-6-months",
      "core-cs-subjects-interview",
      "project-ideas-hub"
    ],
    "sources": [
      {
        "title": "Harvard University Career Services Resume Guide",
        "url": "https://careerservices.fas.harvard.edu/resources/create-a-strong-resume/",
        "publisher": "Harvard FAS Mignone Center for Career Success",
        "accessed": "2026-11-04"
      },
      {
        "title": "Jake's Resume (Single-Column LaTeX Template)",
        "url": "https://www.overleaf.com/latex/templates/jakes-resume/syzsqbzwxvdx",
        "publisher": "Overleaf / LaTeX Community",
        "accessed": "2026-11-04"
      },
      {
        "title": "Google Careers: How to Create a Great Technical Resume (XYZ Formula)",
        "url": "https://www.google.com/about/careers/applications/how-we-hire/",
        "publisher": "Google Careers",
        "accessed": "2026-11-04"
      },
      {
        "title": "Wellfound (Formerly AngelList Talent) Engineering Job Search Guidelines",
        "url": "https://wellfound.com/",
        "publisher": "Wellfound",
        "accessed": "2026-11-04"
      }
    ]
  },
  {
    "slug": "core-cs-subjects-interview",
    "title": "Core CS Subjects Mastery: OS, DBMS, Computer Networks और OOP इंटरव्यू के लिए क्या और कितना पढ़ें",
    "titleHindi": "",
    "category": "career",
    "categoryLabel": "Career & Placement",
    "level": "intermediate",
    "tags": [
      "operating-systems",
      "dbms",
      "computer-networks",
      "oop",
      "solid-principles",
      "core-cs",
      "interviews"
    ],
    "readingMinutes": 16,
    "lastVerified": "2026-11-04",
    "confidence": "high",
    "summary": "सॉफ्टवेयर इंजीनियरिंग इंटरव्यू के लिए Core CS का संक्षिप्त, केंद्रित और 80/20 गाइड। ऑपरेटिंग सिस्टम्स, डेटाबेस, नेटवर्किंग और ऑब्जेक्ट-ओरिएंटेड प्रोग्रामिंग के सबसे महत्वपूर्ण सवाल और अवधारणाएं।",
    "tldr": [
      "**The 80/20 Rule:** पूरी 800-पेज की किताब पढ़ने की ज़रूरत नहीं है। 80% इंटरव्यू सवाल केवल 20% मुख्य विषयों (Virtual Memory, Deadlocks, ACID, Indexing, TCP 3-Way Handshake, DNS flow, SOLID) से पूछे जाते हैं [1, 2, 3]।",
      "**OS:** Process vs Thread, Mutex vs Semaphore, 4 Coffman conditions for Deadlock, Virtual Memory (Paging, Page Fault, TLB) [1]।",
      "**DBMS:** ACID properties, Normalization (1NF to BCNF), B+ Tree Indexing (Range queries में hash index से बेहतर क्यों है), Transaction Isolation levels [2]।",
      "**CN:** OSI 7 Layers vs TCP/IP 4 Layers, TCP 3-Way Handshake, DNS resolution step-by-step, HTTP/1.1 vs HTTP/2 vs HTTP/3 [3]।",
      "**OOP:** 4 Pillars (Encapsulation, Abstraction, Inheritance, Polymorphism) + 5 **SOLID** principles कोड उदाहरण के साथ।"
    ],
    "whyItMatters": "सॉफ्टवेयर इंजीनियरिंग इंटरव्यू के लिए Core CS का संक्षिप्त, केंद्रित और 80/20 गाइड। ऑपरेटिंग सिस्टम्स, डेटाबेस, नेटवर्किंग और ऑब्जेक्ट-ओरिएंटेड प्रोग्रामिंग के सबसे महत्वपूर्ण सवाल और अवधारणाएं।",
    "coreConcepts": [
      {
        "heading": "Theory & Core Principles",
        "content": ""
      }
    ],
    "roadmapSteps": [
      "Phase 1: Foundations & Core Principles",
      "Phase 2: Practical Implementation & Coding",
      "Phase 3: Real-World Testing & Optimization",
      "Phase 4: Deployment & Portfolio Presentation"
    ],
    "handsOn": [
      {
        "title": "Practical Hands-on",
        "task": "Execute hands-on code examples and verify locally.",
        "deliverable": "Tested script and architecture output."
      }
    ],
    "mistakesAndMyths": [
      {
        "myth": "बिना बुनियादी सिद्धांत समझे केवल टूल्स का इस्तेमाल काफी है",
        "reality": "कोर प्रिंसिपल्स की समझ ही लंबे समय में सिस्टम को डिबग और स्केल करने की क्षमता देती है।"
      }
    ],
    "resources": [
      {
        "type": "video",
        "title": "Operating Systems Full Playlist in Hindi (Gate Smashers)",
        "url": "https://www.youtube.com/playlist?list=PLxCzCOWd7aiGz9donHRrE9I3Mwn6XdP8p",
        "author": "Varun Singla (Gate Smashers)",
        "language": "hi",
        "free": true,
        "whyWatch": "Full Playlist by Varun Singla (Gate Smashers)"
      },
      {
        "type": "video",
        "title": "DBMS Full Playlist in Hindi (Gate Smashers)",
        "url": "https://www.youtube.com/playlist?list=PLxCzCOWd7aiFAN6I8CuViBuCdJgiOkT2Y",
        "author": "Varun Singla",
        "language": "hi",
        "free": true,
        "whyWatch": "Full Playlist by Varun Singla"
      },
      {
        "type": "video",
        "title": "Computer Networks Full Playlist in Hindi (Gate Smashers)",
        "url": "https://www.youtube.com/playlist?list=PLxCzCOWd7aiGFBD2-2joCpWOLUrDLvVV_",
        "author": "Varun Singla",
        "language": "hi",
        "free": true,
        "whyWatch": "Full Playlist by Varun Singla"
      },
      {
        "type": "doc",
        "title": "GeeksforGeeks Last Minute Core CS Interview Revision",
        "url": "https://www.geeksforgeeks.org/",
        "author": "GeeksforGeeks",
        "language": "en",
        "free": true,
        "whyWatch": "Reference by GeeksforGeeks"
      }
    ],
    "faqs": [
      {
        "question": "क्या यह विषय कॉलेज छात्रों के लिए उपयोगी है?",
        "answer": "हाँ, यह गाइड आधुनिक उद्योग और परीक्षा मानकों के अनुसार तथ्यात्मक रूप से तैयार की गई है।"
      }
    ],
    "relatedSlugs": [
      "dsa-roadmap-6-months",
      "placement-offcampus-playbook",
      "project-ideas-hub"
    ],
    "sources": [
      {
        "title": "Operating System Concepts (Silberschatz, Galvin, Gagne - 10th Edition)",
        "url": "https://www.os-book.com/",
        "publisher": "Wiley",
        "accessed": "2026-11-04"
      },
      {
        "title": "Database Management Systems (Ramakrishnan & Gehrke - 3rd Edition)",
        "url": "https://pages.cs.wisc.edu/~dbbook/",
        "publisher": "McGraw-Hill",
        "accessed": "2026-11-04"
      },
      {
        "title": "Computer Networking: A Top-Down Approach (Kurose & Ross - 8th Edition)",
        "url": "https://gaia.cs.umass.edu/kurose_ross/online_lectures.htm",
        "publisher": "Pearson",
        "accessed": "2026-11-04"
      },
      {
        "title": "Gate Smashers Computer Science Playlists (Varun Singla)",
        "url": "https://www.youtube.com/@GateSmashers",
        "publisher": "YouTube",
        "accessed": "2026-11-04"
      }
    ]
  },
  {
    "slug": "project-ideas-hub",
    "title": "Project Ideas Hub: Beginner, Intermediate और Advanced प्रोजेक्ट्स और उन्हें Resume में दिखाने की कला",
    "titleHindi": "",
    "category": "projects",
    "categoryLabel": "Projects Hub",
    "level": "beginner",
    "tags": [
      "projects",
      "resume",
      "fullstack",
      "ai-ml",
      "devops",
      "system-design",
      "portfolio"
    ],
    "readingMinutes": 16,
    "lastVerified": "2026-11-04",
    "confidence": "high",
    "summary": "कॉलेज छात्रों और सॉफ्टवेयर इंजीनियरों के लिए वास्तविक, प्रोडक्शन-ग्रेड प्रोजेक्ट आइडियाज। वेब देव, AI/ML और सिस्टम्स डोमेन में बिगिनर से एडवांस स्तर के प्रोजेक्ट्स, आर्किटेक्चर ब्लूप्रिंट्स और रिज्यूमे बुलेट टेम्पलेट्स।",
    "tldr": [
      "**\"To-Do App\" और \"Weather App\" अब बंद करें:** रिक्रूटर्स हर दिन सैकड़ों एक जैसे क्लोन प्रोजेक्ट्स देखते हैं। अगर आपका प्रोजेक्ट YouTube के किसी 2 घंटे के ट्यूटोरियल की हूबहू कॉपी है, तो वह आपके रिज्यूमे को नुकसान पहुँचाता है।",
      "**तीनों स्तरों का संतुलन:** आपके रिज्यूमे में कम से कम 2 से 3 ठोस प्रोजेक्ट्स होने चाहिए: एक गहरा **Full-Stack / Systems** प्रोजेक्ट और एक **AI/ML या Cloud-Native** प्रोजेक्ट।",
      "**हर प्रोजेक्ट में क्या होना चाहिए:** (1) वास्तविक प्रॉब्लम स्टेटमेंट, (2) आर्किटेक्चर डायग्राम, (3) लाइव डेप्लॉयड लिंक, (4) सांख्यिकीय मैट्रिक्स (Latency, Concurrency, Users) [2]।",
      "**Google XYZ फॉर्मूला:** प्रोजेक्ट्स को रिज्यूमे में *\"Accomplished [X] as measured by [Y], by doing [Z]\"* रूप में लिखें।"
    ],
    "whyItMatters": "कॉलेज छात्रों और सॉफ्टवेयर इंजीनियरों के लिए वास्तविक, प्रोडक्शन-ग्रेड प्रोजेक्ट आइडियाज। वेब देव, AI/ML और सिस्टम्स डोमेन में बिगिनर से एडवांस स्तर के प्रोजेक्ट्स, आर्किटेक्चर ब्लूप्रिंट्स और रिज्यूमे बुलेट टेम्पलेट्स।",
    "coreConcepts": [
      {
        "heading": "Theory & Core Principles",
        "content": ""
      }
    ],
    "roadmapSteps": [
      "Phase 1: Foundations & Core Principles",
      "Phase 2: Practical Implementation & Coding",
      "Phase 3: Real-World Testing & Optimization",
      "Phase 4: Deployment & Portfolio Presentation"
    ],
    "handsOn": [
      {
        "title": "Practical Hands-on",
        "task": "Execute hands-on code examples and verify locally.",
        "deliverable": "Tested script and architecture output."
      }
    ],
    "mistakesAndMyths": [
      {
        "myth": "बिना बुनियादी सिद्धांत समझे केवल टूल्स का इस्तेमाल काफी है",
        "reality": "कोर प्रिंसिपल्स की समझ ही लंबे समय में सिस्टम को डिबग और स्केल करने की क्षमता देती है।"
      }
    ],
    "resources": [
      {
        "type": "doc",
        "title": "System Design Primer by Donne Martin",
        "url": "https://github.com/donnemartin/system-design-primer",
        "author": "Donne Martin",
        "language": "en",
        "free": true,
        "whyWatch": "Open Source Guide by Donne Martin"
      },
      {
        "type": "video",
        "title": "Top 5 Unique Projects to Stand Out in Tech Placements (in Hindi)",
        "url": "https://www.youtube.com/watch?v=Xh0YpA7H5vI",
        "author": "Apna College",
        "language": "hi",
        "free": true,
        "whyWatch": "18 mins by Apna College"
      },
      {
        "type": "doc",
        "title": "Build Your Own Redis / Docker / Git from Scratch",
        "url": "https://github.com/codecrafters-io/build-your-own-x",
        "author": "Daniel Stefanovic",
        "language": "en",
        "free": true,
        "whyWatch": "Tutorial Collection by Daniel Stefanovic"
      }
    ],
    "faqs": [
      {
        "question": "क्या यह विषय कॉलेज छात्रों के लिए उपयोगी है?",
        "answer": "हाँ, यह गाइड आधुनिक उद्योग और परीक्षा मानकों के अनुसार तथ्यात्मक रूप से तैयार की गई है।"
      }
    ],
    "relatedSlugs": [
      "placement-offcampus-playbook",
      "ai-agents-and-rag",
      "dsa-roadmap-6-months"
    ],
    "sources": [
      {
        "title": "The System Design Primer (Donne Martin)",
        "url": "https://github.com/donnemartin/system-design-primer",
        "publisher": "GitHub",
        "accessed": "2026-11-04"
      },
      {
        "title": "Google Careers: Resume Writing Guide & Impact Statements",
        "url": "https://www.google.com/about/careers/applications/how-we-hire/",
        "publisher": "Google Careers",
        "accessed": "2026-11-04"
      },
      {
        "title": "Build Your Own X: Rebuild Tech from Scratch",
        "url": "https://github.com/codecrafters-io/build-your-own-x",
        "publisher": "CodeCrafters",
        "accessed": "2026-11-04"
      },
      {
        "title": "FreeCodeCamp Open Source Curriculum & Real-world Projects",
        "url": "https://www.freecodecamp.org/",
        "publisher": "freeCodeCamp",
        "accessed": "2026-11-04"
      }
    ]
  },
  {
    "slug": "llms-explained",
    "title": "LLMs कैसे काम करते हैं: Tokens, Transformers, Training और Inference",
    "titleHindi": "",
    "category": "ai-ml",
    "categoryLabel": "AI & Machine Learning",
    "level": "intermediate",
    "tags": [
      "ai",
      "llm",
      "transformers",
      "machine-learning",
      "deep-learning"
    ],
    "readingMinutes": 12,
    "lastVerified": "2026-11-04",
    "confidence": "evolving",
    "summary": "Large Language Models (LLMs) के अंदरूनी तंत्र को गहराई से समझें: Tokenization से लेकर Multi-Head Self-Attention, Pre-training, RLHF alignment और Inference generation तक।",
    "tldr": [
      "**Tokenization:** LLM raw text नहीं पढ़ते; वे text को 3-4 अक्षर के chunks (**tokens**) में तोड़ते हैं और उन्हें numeric IDs देते हैं [1]।",
      "**Transformer Architecture:** RNNs के sequential लूप्स के बजाय, Transformers पूरे वाक्य को एक साथ प्रोसेस करते हैं और **Self-Attention** से शब्दों के आपसी संदर्भ (context) की गणना करते हैं [1]।",
      "**Training Pipeline:** 2 चरणों में होता है: विशाल raw internet text पर **Pre-training** (Next-token prediction) और उसके बाद **Instruction Fine-Tuning** (SFT/RLHF/DPO) ताकि मॉडल इंसानों के आदेशों का सुरक्षित जवाब दे सके [2, 5]।",
      "**Inference Reality:** LLMs \"सोचते\" नहीं हैं; वे पिछले सभी tokens के आधार पर अगले सबसे संभावित token की probability distribution निकालकर एक-एक token generate करते हैं।"
    ],
    "whyItMatters": "Large Language Models (LLMs) के अंदरूनी तंत्र को गहराई से समझें: Tokenization से लेकर Multi-Head Self-Attention, Pre-training, RLHF alignment और Inference generation तक।",
    "coreConcepts": [
      {
        "heading": "Theory & Core Principles",
        "content": ""
      }
    ],
    "roadmapSteps": [
      "Phase 1: Foundations & Core Principles",
      "Phase 2: Practical Implementation & Coding",
      "Phase 3: Real-World Testing & Optimization",
      "Phase 4: Deployment & Portfolio Presentation"
    ],
    "handsOn": [
      {
        "title": "Practical Hands-on",
        "task": "Execute hands-on code examples and verify locally.",
        "deliverable": "Tested script and architecture output."
      }
    ],
    "mistakesAndMyths": [
      {
        "myth": "बिना बुनियादी सिद्धांत समझे केवल टूल्स का इस्तेमाल काफी है",
        "reality": "कोर प्रिंसिपल्स की समझ ही लंबे समय में सिस्टम को डिबग और स्केल करने की क्षमता देती है।"
      }
    ],
    "resources": [
      {
        "type": "video",
        "title": "Intro to Large Language Models by Andrej Karpathy",
        "url": "https://www.youtube.com/watch?v=zjkBMFhNj_g",
        "author": "Andrej Karpathy",
        "language": "en",
        "free": true,
        "whyWatch": "1 hr by Andrej Karpathy"
      },
      {
        "type": "video",
        "title": "Introduction to Transformers in Hindi (CampusX)",
        "url": "https://www.youtube.com/watch?v=BjRVS2wTtcA",
        "author": "CampusX",
        "language": "hi",
        "free": true,
        "whyWatch": "45 mins by CampusX"
      },
      {
        "type": "video",
        "title": "Attention in transformers, step-by-step",
        "url": "https://www.youtube.com/watch?v=eMlx5fFNoYc",
        "author": "3Blue1Brown",
        "language": "en",
        "free": true,
        "whyWatch": "26 mins by 3Blue1Brown"
      },
      {
        "type": "doc",
        "title": "Hugging Face Transformers Documentation",
        "url": "https://huggingface.co/docs/transformers",
        "author": "Hugging Face",
        "language": "en",
        "free": true,
        "whyWatch": "Reading by Hugging Face"
      },
      {
        "type": "book",
        "title": "Build a Large Language Model (From Scratch)",
        "url": "https://www.manning.com/books/build-a-large-language-model-from-scratch",
        "author": "Sebastian Raschka",
        "language": "en",
        "free": false,
        "whyWatch": "Full Book by Sebastian Raschka"
      }
    ],
    "faqs": [
      {
        "question": "क्या यह विषय कॉलेज छात्रों के लिए उपयोगी है?",
        "answer": "हाँ, यह गाइड आधुनिक उद्योग और परीक्षा मानकों के अनुसार तथ्यात्मक रूप से तैयार की गई है।"
      }
    ],
    "relatedSlugs": [
      "ai-agents-and-rag",
      "prompt-engineering-students"
    ],
    "sources": [
      {
        "title": "Attention Is All You Need (Vaswani et al.)",
        "url": "https://arxiv.org/abs/1706.03762",
        "publisher": "NeurIPS / arXiv",
        "accessed": "2026-11-04"
      },
      {
        "title": "Intro to Large Language Models (Andrej Karpathy)",
        "url": "https://www.youtube.com/watch?v=zjkBMFhNj_g",
        "publisher": "YouTube",
        "accessed": "2026-11-04"
      },
      {
        "title": "Hugging Face NLP Course: The Transformer Architecture",
        "url": "https://huggingface.co/learn/nlp-course",
        "publisher": "Hugging Face",
        "accessed": "2026-11-04"
      },
      {
        "title": "Attention in transformers, step-by-step (3Blue1Brown)",
        "url": "https://www.youtube.com/watch?v=eMlx5fFNoYc",
        "publisher": "3Blue1Brown",
        "accessed": "2026-11-04"
      },
      {
        "title": "Direct Preference Optimization: Your Language Model is Secretly a Reward Model (Rafailov et al.)",
        "url": "https://arxiv.org/abs/2305.18290",
        "publisher": "NeurIPS / arXiv",
        "accessed": "2026-11-04"
      }
    ]
  },
  {
    "slug": "rag",
    "title": "AI Agents और RAG: कब क्या इस्तेमाल करें (Architecture, Trade-offs & Hybrid Systems)",
    "titleHindi": "",
    "category": "ai-ml",
    "categoryLabel": "AI & Machine Learning",
    "level": "intermediate",
    "tags": [
      "ai",
      "rag",
      "ai-agents",
      "react-pattern",
      "langchain",
      "llamaindex"
    ],
    "readingMinutes": 14,
    "lastVerified": "2026-11-04",
    "confidence": "evolving",
    "summary": "Retrieval-Augmented Generation (RAG) और Autonomous AI Agents की विस्तृत तुलना। जानिए कब simple search काफी है, कब multi-step reasoning वाले agents चाहिए, और production-grade hybrid systems कैसे बनाएं।",
    "tldr": [
      "**RAG (Knowledge Augmentation):** आपके private documents या internal database से relevant text chunks retrieve करके LLM के prompt में inject करता है [1]। यह static question-answering के लिए fast, cheap, और highly deterministic है।",
      "**AI Agents (Action & Tool Use):** एक dynamic loop (ReAct pattern) चलाते हैं जहाँ LLM तय करता है कि *क्या सोचना है*, *कौन सा tool call करना है* (Calculator, Web Search, Code Runner), और output के आधार पर अगला कदम क्या होगा [2]।",
      "**The Golden Rule:** अगर सवाल का जवाब केवल दस्तावेज़ पढ़कर दिया जा सकता है, तो **RAG** चुनें। अगर कार्य में multi-step planning, state changes, external APIs या conditionals शामिल हैं, तो **Agent** चुनें।",
      "**Cost & Latency:** RAG 1 round-trip में पूरा होता है (Latency < 1-2s); Agentic loops में कई LLM calls होती हैं (Latency 5-20s, cost 3x-10x ज़्यादा)।"
    ],
    "whyItMatters": "Retrieval-Augmented Generation (RAG) और Autonomous AI Agents की विस्तृत तुलना। जानिए कब simple search काफी है, कब multi-step reasoning वाले agents चाहिए, और production-grade hybrid systems कैसे बनाएं।",
    "coreConcepts": [
      {
        "heading": "Theory & Core Principles",
        "content": ""
      }
    ],
    "roadmapSteps": [
      "Phase 1: Foundations & Core Principles",
      "Phase 2: Practical Implementation & Coding",
      "Phase 3: Real-World Testing & Optimization",
      "Phase 4: Deployment & Portfolio Presentation"
    ],
    "handsOn": [
      {
        "title": "Practical Hands-on",
        "task": "Execute hands-on code examples and verify locally.",
        "deliverable": "Tested script and architecture output."
      }
    ],
    "mistakesAndMyths": [
      {
        "myth": "बिना बुनियादी सिद्धांत समझे केवल टूल्स का इस्तेमाल काफी है",
        "reality": "कोर प्रिंसिपल्स की समझ ही लंबे समय में सिस्टम को डिबग और स्केल करने की क्षमता देती है।"
      }
    ],
    "resources": [
      {
        "type": "video",
        "title": "Retrieval Augmented Generation (RAG) Explained in Hindi",
        "url": "https://www.youtube.com/watch?v=X0btK9X0Xnk",
        "author": "CampusX",
        "language": "hi",
        "free": true,
        "whyWatch": "40 mins by CampusX"
      },
      {
        "type": "video",
        "title": "What are AI Agents? (ReAct Framework)",
        "url": "https://www.youtube.com/watch?v=F8NKVhkZZWI",
        "author": "IBM Technology",
        "language": "en",
        "free": true,
        "whyWatch": "12 mins by IBM Technology"
      },
      {
        "type": "doc",
        "title": "LangChain Official Agents Guide",
        "url": "https://python.langchain.com/docs/concepts/agents/",
        "author": "Harrison Chase",
        "language": "en",
        "free": true,
        "whyWatch": "Reference by Harrison Chase"
      },
      {
        "type": "doc",
        "title": "LlamaIndex Core RAG Concepts",
        "url": "https://docs.llamaindex.ai/en/stable/getting_started/concepts/",
        "author": "Jerry Liu",
        "language": "en",
        "free": true,
        "whyWatch": "Reference by Jerry Liu"
      }
    ],
    "faqs": [
      {
        "question": "क्या यह विषय कॉलेज छात्रों के लिए उपयोगी है?",
        "answer": "हाँ, यह गाइड आधुनिक उद्योग और परीक्षा मानकों के अनुसार तथ्यात्मक रूप से तैयार की गई है।"
      }
    ],
    "relatedSlugs": [
      "llms-how-they-work",
      "prompt-engineering-students",
      "project-ideas-hub"
    ],
    "sources": [
      {
        "title": "Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks (Lewis et al.)",
        "url": "https://arxiv.org/abs/2005.11401",
        "publisher": "NeurIPS / arXiv",
        "accessed": "2026-11-04"
      },
      {
        "title": "ReAct: Synergizing Reasoning and Acting in Language Models (Yao et al.)",
        "url": "https://arxiv.org/abs/2210.03629",
        "publisher": "ICLR / arXiv",
        "accessed": "2026-11-04"
      },
      {
        "title": "LangChain Architectural Documentation on Agents and Tool Calling",
        "url": "https://python.langchain.com/docs/concepts/agents/",
        "publisher": "LangChain",
        "accessed": "2026-11-04"
      },
      {
        "title": "LlamaIndex Documentation on Production RAG",
        "url": "https://docs.llamaindex.ai/en/stable/",
        "publisher": "LlamaIndex",
        "accessed": "2026-11-04"
      }
    ]
  },
  {
    "slug": "prompt-engineering",
    "title": "Prompt Engineering और AI Tools का सही इस्तेमाल: कॉलेज स्टूडेंट्स के लिए व्यावहारिक गाइड",
    "titleHindi": "",
    "category": "ai-ml",
    "categoryLabel": "AI & Machine Learning",
    "level": "beginner",
    "tags": [
      "prompt-engineering",
      "chatgpt",
      "gemini",
      "students",
      "productivity",
      "study-skills"
    ],
    "readingMinutes": 10,
    "lastVerified": "2026-11-04",
    "confidence": "high",
    "summary": "कॉलेज स्टूडेंट्स और फ्रेशर्स के लिए Prompt Engineering की संपूर्ण गाइड। जानिए Zero-Shot, Few-Shot, Chain-of-Thought (CoT) तकनीकें, असाइनमेंट में बिना चीटिंग के AI की मदद, और Hallucination पकड़ने के तरीके।",
    "tldr": [
      "**The Core Formula:** बेहतरीन prompts का एक ढांचा होता है: **Role + Context + Clear Task + Strict Constraints + Output Format** [1]।",
      "**Chain-of-Thought (CoT):** जब आप AI को *\"कदम दर कदम सोचो (Think step by step)\"* कहते हैं, तो गणितीय और तार्किक सटीकता 40-70% तक बढ़ जाती है [2]।",
      "**Few-Shot Examples:** केवल नियम समझाने के बजाय 2-3 इनपुट-आउटपुट उदाहरण देने से मॉडल आपकी इच्छित शैली पकड़ लेता है।",
      "**Student Ethics:** AI को \"सॉल्व करने वाली मशीन\" के रूप में इस्तेमाल न करें; इसे **\"पर्सनल ट्यूटर\"** (Socratic Mentor) बनाएं जो आपको सवाल पूछे और कमियों को उजागर करे।"
    ],
    "whyItMatters": "कॉलेज स्टूडेंट्स और फ्रेशर्स के लिए Prompt Engineering की संपूर्ण गाइड। जानिए Zero-Shot, Few-Shot, Chain-of-Thought (CoT) तकनीकें, असाइनमेंट में बिना चीटिंग के AI की मदद, और Hallucination पकड़ने के तरीके।",
    "coreConcepts": [
      {
        "heading": "Theory & Core Principles",
        "content": ""
      }
    ],
    "roadmapSteps": [
      "Phase 1: Foundations & Core Principles",
      "Phase 2: Practical Implementation & Coding",
      "Phase 3: Real-World Testing & Optimization",
      "Phase 4: Deployment & Portfolio Presentation"
    ],
    "handsOn": [
      {
        "title": "Practical Hands-on",
        "task": "Execute hands-on code examples and verify locally.",
        "deliverable": "Tested script and architecture output."
      }
    ],
    "mistakesAndMyths": [
      {
        "myth": "बिना बुनियादी सिद्धांत समझे केवल टूल्स का इस्तेमाल काफी है",
        "reality": "कोर प्रिंसिपल्स की समझ ही लंबे समय में सिस्टम को डिबग और स्केल करने की क्षमता देती है।"
      }
    ],
    "resources": [
      {
        "type": "course",
        "title": "ChatGPT Prompt Engineering for Developers",
        "url": "https://www.deeplearning.ai/short-courses/chatgpt-prompt-engineering-for-developers/",
        "author": "Andrew Ng & Isa Fulford",
        "language": "en",
        "free": true,
        "whyWatch": "1 hr by Andrew Ng & Isa Fulford"
      },
      {
        "type": "doc",
        "title": "OpenAI Official Prompt Engineering Guide",
        "url": "https://platform.openai.com/docs/guides/prompt-engineering",
        "author": "OpenAI Platform Docs",
        "language": "en",
        "free": true,
        "whyWatch": "Reference by OpenAI Platform Docs"
      },
      {
        "type": "doc",
        "title": "Anthropic Claude Prompt Engineering Interactive Course",
        "url": "https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview",
        "author": "Anthropic",
        "language": "en",
        "free": true,
        "whyWatch": "Tutorial by Anthropic"
      },
      {
        "type": "video",
        "title": "How to Prompt AI Effectively (5 Minutes Engineering)",
        "url": "https://www.youtube.com/watch?v=y1QfFpGq2p8",
        "author": "5 Minutes Engineering",
        "language": "hi",
        "free": true,
        "whyWatch": "15 mins by 5 Minutes Engineering"
      }
    ],
    "faqs": [
      {
        "question": "क्या यह विषय कॉलेज छात्रों के लिए उपयोगी है?",
        "answer": "हाँ, यह गाइड आधुनिक उद्योग और परीक्षा मानकों के अनुसार तथ्यात्मक रूप से तैयार की गई है।"
      }
    ],
    "relatedSlugs": [
      "llms-how-they-work",
      "ai-agents-and-rag",
      "placement-offcampus-playbook"
    ],
    "sources": [
      {
        "title": "OpenAI Prompt Engineering Official Guide",
        "url": "https://platform.openai.com/docs/guides/prompt-engineering",
        "publisher": "OpenAI",
        "accessed": "2026-11-04"
      },
      {
        "title": "Chain-of-Thought Prompting Elicits Reasoning in Large Language Models (Wei et al.)",
        "url": "https://arxiv.org/abs/2201.11903",
        "publisher": "NeurIPS / arXiv",
        "accessed": "2026-11-04"
      },
      {
        "title": "Anthropic Interactive Prompt Engineering Tutorial",
        "url": "https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview",
        "publisher": "Anthropic",
        "accessed": "2026-11-04"
      },
      {
        "title": "ChatGPT Prompt Engineering for Developers (DeepLearning.AI)",
        "url": "https://www.deeplearning.ai/short-courses/chatgpt-prompt-engineering-for-developers/",
        "publisher": "DeepLearning.AI / Andrew Ng",
        "accessed": "2026-11-04"
      }
    ]
  },
  {
    "slug": "qubits-superposition",
    "title": "Qubit, Superposition और Entanglement: बिना गणित के क्वांटम कंप्यूटिंग की समझ",
    "titleHindi": "",
    "category": "quantum",
    "categoryLabel": "Quantum Computing",
    "level": "beginner",
    "tags": [
      "quantum-computing",
      "qubits",
      "superposition",
      "entanglement",
      "physics",
      "tech-explainer"
    ],
    "readingMinutes": 11,
    "lastVerified": "2026-11-04",
    "confidence": "high",
    "summary": "बिना जटिल गणित और Linear Algebra के क्वांटम कंप्यूटिंग के बुनियादी सिद्धांतों को समझें। जानिए Qubit, Superposition, Entanglement और Measurement Collapse वास्तविक जीवन की सरल analogies के साथ।",
    "tldr": [
      "**Classical Bit vs Qubit:** एक सामान्य बिट या तो 0 होता है या 1 (जैसे एक लाइट स्विच)। एक **Qubit** 0 और 1 दोनों की सम्भावनाओं के मिश्रण में रह सकता है [1]।",
      "**Superposition:** मेज पर रखा सिक्का 'Heads' या 'Tails' होता है, लेकिन घूमता हुआ सिक्का (spinning coin) दोनों अवस्थाओं का मिश्रण है जब तक आप उसे रोक न दें।",
      "**Measurement Collapse:** जैसे ही आप क्वांटम सिस्टम को मापते (observe) हैं, उसकी सुपरपोजिशन तुरंत खत्म हो जाती है और वह सामान्य 0 या 1 में बदल जाता है [1]।",
      "**Entanglement:** दो या अधिक क्यूबिट्स का आपस में ऐसा गहरा जुड़ाव कि एक की स्थिति जानते ही दूसरे की स्थिति ब्रह्मांड के किसी भी कोने में तुरंत तय हो जाती है [3]।"
    ],
    "whyItMatters": "बिना जटिल गणित और Linear Algebra के क्वांटम कंप्यूटिंग के बुनियादी सिद्धांतों को समझें। जानिए Qubit, Superposition, Entanglement और Measurement Collapse वास्तविक जीवन की सरल analogies के साथ।",
    "coreConcepts": [
      {
        "heading": "Theory & Core Principles",
        "content": ""
      }
    ],
    "roadmapSteps": [
      "Phase 1: Foundations & Core Principles",
      "Phase 2: Practical Implementation & Coding",
      "Phase 3: Real-World Testing & Optimization",
      "Phase 4: Deployment & Portfolio Presentation"
    ],
    "handsOn": [
      {
        "title": "Practical Hands-on",
        "task": "Execute hands-on code examples and verify locally.",
        "deliverable": "Tested script and architecture output."
      }
    ],
    "mistakesAndMyths": [
      {
        "myth": "बिना बुनियादी सिद्धांत समझे केवल टूल्स का इस्तेमाल काफी है",
        "reality": "कोर प्रिंसिपल्स की समझ ही लंबे समय में सिस्टम को डिबग और स्केल करने की क्षमता देती है।"
      }
    ],
    "resources": [
      {
        "type": "video",
        "title": "What makes quantum computers SO powerful?",
        "url": "https://www.youtube.com/watch?v=-UrdExQW0cs",
        "author": "Veritasium",
        "language": "en",
        "free": true,
        "whyWatch": "24 mins by Veritasium"
      },
      {
        "type": "video",
        "title": "Quantum Computing Explained in Hindi",
        "url": "https://www.youtube.com/watch?v=IhOC3FhY8i8",
        "author": "Geekyranjit",
        "language": "hi",
        "free": true,
        "whyWatch": "14 mins by Geekyranjit"
      },
      {
        "type": "doc",
        "title": "IBM Quantum Interactive Learning Hub",
        "url": "https://learning.quantum.ibm.com/",
        "author": "IBM Quantum Team",
        "language": "en",
        "free": true,
        "whyWatch": "Self-Paced by IBM Quantum Team"
      },
      {
        "type": "book",
        "title": "Quantum Computing for Everyone",
        "url": "https://mitpress.mit.edu/9780262539531/quantum-computing-for-everyone/",
        "author": "Chris Bernhardt",
        "language": "en",
        "free": false,
        "whyWatch": "Introductory Book by Chris Bernhardt"
      }
    ],
    "faqs": [
      {
        "question": "क्या यह विषय कॉलेज छात्रों के लिए उपयोगी है?",
        "answer": "हाँ, यह गाइड आधुनिक उद्योग और परीक्षा मानकों के अनुसार तथ्यात्मक रूप से तैयार की गई है।"
      }
    ],
    "relatedSlugs": [
      "quantum-roadmap-and-reality",
      "llms-how-they-work"
    ],
    "sources": [
      {
        "title": "Quantum Computation and Quantum Information (Nielsen & Chuang)",
        "url": "https://www.cambridge.org/highereducation/books/quantum-computation-and-quantum-information/017870D10D6A7DA9DAF59A65D39FEA6B",
        "publisher": "Cambridge University Press",
        "accessed": "2026-11-04"
      },
      {
        "title": "IBM Quantum Learning: Basics of Quantum Information",
        "url": "https://learning.quantum.ibm.com/",
        "publisher": "IBM Quantum",
        "accessed": "2026-11-04"
      },
      {
        "title": "What makes quantum computers SO powerful? (Veritasium)",
        "url": "https://www.youtube.com/watch?v=-UrdExQW0cs",
        "publisher": "Veritasium / YouTube",
        "accessed": "2026-11-04"
      },
      {
        "title": "Qiskit Textbook: Fundamentals of Quantum Computing",
        "url": "https://docs.quantum.ibm.com/",
        "publisher": "IBM / Qiskit",
        "accessed": "2026-11-04"
      }
    ]
  },
  {
    "slug": "indian-constitution-basics",
    "title": "भारत का संविधान और सरकार की संरचना: कार्यपालिका, विधायिका और न्यायपालिका",
    "titleHindi": "",
    "category": "gov-policy",
    "categoryLabel": "Politics & Governance",
    "level": "beginner",
    "tags": [
      "constitution",
      "india",
      "civics",
      "governance",
      "judiciary",
      "parliament",
      "executive"
    ],
    "readingMinutes": 13,
    "lastVerified": "2026-11-04",
    "confidence": "high",
    "summary": "भारतीय संविधान का निष्पक्ष, तथ्यपरक और संवैधानिक विश्लेषण। जानिए शक्ति पृथक्करण (Separation of Powers), कार्यपालिका, विधायिका और न्यायपालिका के बीच संतुलन (Checks & Balances), और संघात्मक ढांचा।",
    "tldr": [
      "**सर्वोच्च विधि:** भारत का संविधान देश का सर्वोच्च कानून (Grundnorm) है, जिसे 26 नवंबर 1949 को अंगीकृत किया गया और 26 जनवरी 1950 को लागू हुआ [1]।",
      "**तीन स्तंभ (Trias Politica):** सरकार के तीन मुख्य अंग हैं: **विधायिका** (कानून बनाना), **कार्यपालिका** (कानून लागू करना), और **न्यायपालिका** (कानून की व्याख्या करना और संविधान की रक्षा करना)।",
      "**Checks & Balances:** कोई भी अंग निरंकुश नहीं है। संसद कानून बनाती है, लेकिन सुप्रीम कोर्ट असंवैधानिक कानून को रद्द कर सकता है (Judicial Review) [3]। न्यायपालिका के जजों की नियुक्ति कार्यपालिका/कोलेजियम से होती है, और संसद उन पर महाभियोग (Impeachment) चला सकती है।",
      "**अर्ध-संघीय ढांचा (Quasi-Federal):** संविधान में संघीय (Federal) विशेषताएं हैं लेकिन केंद्र की ओर झुकाव (Unitary bias) है (7वीं अनुसूची: संघ सूची, राज्य सूची, समवर्ती सूची) [1]।"
    ],
    "whyItMatters": "भारतीय संविधान का निष्पक्ष, तथ्यपरक और संवैधानिक विश्लेषण। जानिए शक्ति पृथक्करण (Separation of Powers), कार्यपालिका, विधायिका और न्यायपालिका के बीच संतुलन (Checks & Balances), और संघात्मक ढांचा।",
    "coreConcepts": [
      {
        "heading": "Theory & Core Principles",
        "content": ""
      }
    ],
    "roadmapSteps": [
      "Phase 1: Foundations & Core Principles",
      "Phase 2: Practical Implementation & Coding",
      "Phase 3: Real-World Testing & Optimization",
      "Phase 4: Deployment & Portfolio Presentation"
    ],
    "handsOn": [
      {
        "title": "Practical Hands-on",
        "task": "Execute hands-on code examples and verify locally.",
        "deliverable": "Tested script and architecture output."
      }
    ],
    "mistakesAndMyths": [
      {
        "myth": "बिना बुनियादी सिद्धांत समझे केवल टूल्स का इस्तेमाल काफी है",
        "reality": "कोर प्रिंसिपल्स की समझ ही लंबे समय में सिस्टम को डिबग और स्केल करने की क्षमता देती है।"
      }
    ],
    "resources": [
      {
        "type": "video",
        "title": "Samvidhaan: The Making of the Constitution of India (Episode 1)",
        "url": "https://www.youtube.com/watch?v=0U9KDQn6dU4",
        "author": "Rajya Sabha TV / Shyam Benegal",
        "language": "hi",
        "free": true,
        "whyWatch": "45 mins by Rajya Sabha TV / Shyam Benegal"
      },
      {
        "type": "doc",
        "title": "Official Constitution of India (Bilingual PDF)",
        "url": "https://legislative.gov.in/constitution-of-india/",
        "author": "Ministry of Law and Justice",
        "language": "hi",
        "free": true,
        "whyWatch": "Reference by Ministry of Law and Justice"
      },
      {
        "type": "doc",
        "title": "PRS Legislative Research: Vital Stats of Parliament",
        "url": "https://prsindia.org/parliament-tracking",
        "author": "PRS India",
        "language": "en",
        "free": true,
        "whyWatch": "Monthly Tracking by PRS India"
      },
      {
        "type": "book",
        "title": "Introduction to the Constitution of India",
        "url": "https://www.lexisnexis.in/",
        "author": "Dr. Durga Das Basu (D.D. Basu)",
        "language": "en",
        "free": false,
        "whyWatch": "Textbook by Dr. Durga Das Basu (D.D. Basu)"
      }
    ],
    "faqs": [
      {
        "question": "क्या यह विषय कॉलेज छात्रों के लिए उपयोगी है?",
        "answer": "हाँ, यह गाइड आधुनिक उद्योग और परीक्षा मानकों के अनुसार तथ्यात्मक रूप से तैयार की गई है।"
      }
    ],
    "relatedSlugs": [
      "election-process-evm-vvpat",
      "union-budget-rti-dbt"
    ],
    "sources": [
      {
        "title": "The Constitution of India (Official Full Text)",
        "url": "https://legislative.gov.in/constitution-of-india/",
        "publisher": "Legislative Department, Ministry of Law and Justice, Govt of India",
        "accessed": "2026-11-04"
      },
      {
        "title": "PRS Legislative Research: Understanding Parliament and Lawmaking",
        "url": "https://prsindia.org/",
        "publisher": "PRS Legislative Research",
        "accessed": "2026-11-04"
      },
      {
        "title": "Kesavananda Bharati v. State of Kerala (1973) 4 SCC 225 (Basic Structure Doctrine)",
        "url": "https://main.sci.gov.in/judgment/judis/5069.pdf",
        "publisher": "Supreme Court of India",
        "accessed": "2026-11-04"
      },
      {
        "title": "Constitution of India: Digital Portal",
        "url": "https://www.india.gov.in/my-government/constitution-india",
        "publisher": "National Informatics Centre (NIC)",
        "accessed": "2026-11-04"
      }
    ]
  },
  {
    "slug": "dsa-placement-mastery",
    "title": "DSA Roadmap: 0 से 6 महीने में Software Engineer Placement क्रैक करने का मास्टर प्लान",
    "titleHindi": "",
    "category": "career",
    "categoryLabel": "Career & Placement",
    "level": "intermediate",
    "tags": [
      "dsa",
      "leetcode",
      "striver",
      "placement",
      "coding-interview",
      "algorithms",
      "data-structures"
    ],
    "readingMinutes": 15,
    "lastVerified": "2026-11-04",
    "confidence": "high",
    "summary": "कॉलेज स्टूडेंट्स और जॉब सीकर्स के लिए 6 महीने का चरणबद्ध Data Structures & Algorithms (DSA) रोडमैप। C++/Java/Python की नींव से लेकर Trees, Graphs, और Dynamic Programming तक।",
    "tldr": [
      "**भाषा का चुनाव:** केवल एक भाषा चुनें — **C++** (STL के कारण सबसे लोकप्रिय) या **Java** (Enterprise कंपनियों में प्रिय) या **Python** (syntax आसान, लेकिन recursion depth का ध्यान रखें)। भाषा बदलने में समय बर्बाद न करें।",
      "**Time & Space Complexity:** कोड लिखने से पहले Big-O ($O(1), O(\\log N), O(N), O(N \\log N), O(N^2)$) निकालना सीखें। अगर सवाल में $N \\le 10^5$ है, तो $O(N \\log N)$ या $O(N)$ समाधान ही TLE (Time Limit Exceeded) से बचाएगा।",
      "**क्वांटिटी नहीं, पैटर्न पहचानें:** 800 सवाल रटने के बजाय NeetCode 150 या Striver A2Z के **15 मुख्य पैटर्न्स** (Two Pointers, Sliding Window, Fast & Slow Pointers, Monotonic Stack, BFS/DFS, Top-Down DP) समझें।",
      "**मॉक इंटरव्यू व टाइमर:** हर सवाल को 25-30 मिनट के स्टॉपवॉच के साथ हल करें; बिना देखे IDE पर कोड लिखें।"
    ],
    "whyItMatters": "कॉलेज स्टूडेंट्स और जॉब सीकर्स के लिए 6 महीने का चरणबद्ध Data Structures & Algorithms (DSA) रोडमैप। C++/Java/Python की नींव से लेकर Trees, Graphs, और Dynamic Programming तक।",
    "coreConcepts": [
      {
        "heading": "Theory & Core Principles",
        "content": ""
      }
    ],
    "roadmapSteps": [
      "Phase 1: Foundations & Core Principles",
      "Phase 2: Practical Implementation & Coding",
      "Phase 3: Real-World Testing & Optimization",
      "Phase 4: Deployment & Portfolio Presentation"
    ],
    "handsOn": [
      {
        "title": "Practical Hands-on",
        "task": "Execute hands-on code examples and verify locally.",
        "deliverable": "Tested script and architecture output."
      }
    ],
    "mistakesAndMyths": [
      {
        "myth": "बिना बुनियादी सिद्धांत समझे केवल टूल्स का इस्तेमाल काफी है",
        "reality": "कोर प्रिंसिपल्स की समझ ही लंबे समय में सिस्टम को डिबग और स्केल करने की क्षमता देती है।"
      }
    ],
    "resources": [
      {
        "type": "video",
        "title": "Striver's A2Z DSA Playlist in Hindi",
        "url": "https://www.youtube.com/watch?v=EAR7De6Gsd4",
        "author": "Take U Forward (Raj Vikramaditya)",
        "language": "hi",
        "free": true,
        "whyWatch": "Full Playlist by Take U Forward (Raj Vikramaditya)"
      },
      {
        "type": "doc",
        "title": "NeetCode 150 Free Coding Roadmap",
        "url": "https://neetcode.io/practice",
        "author": "Navdeep Singh (NeetCode)",
        "language": "en",
        "free": true,
        "whyWatch": "Interactive Platform by Navdeep Singh (NeetCode)"
      },
      {
        "type": "tool",
        "title": "LeetCode Practice Platform",
        "url": "https://leetcode.com/",
        "author": "LeetCode",
        "language": "en",
        "free": true,
        "whyWatch": "Ongoing Practice by LeetCode"
      },
      {
        "type": "book",
        "title": "Cracking the Coding Interview",
        "url": "https://www.crackingthecodinginterview.com/",
        "author": "Gayle Laakmann McDowell",
        "language": "en",
        "free": false,
        "whyWatch": "Interview Prep Guide by Gayle Laakmann McDowell"
      }
    ],
    "faqs": [
      {
        "question": "क्या यह विषय कॉलेज छात्रों के लिए उपयोगी है?",
        "answer": "हाँ, यह गाइड आधुनिक उद्योग और परीक्षा मानकों के अनुसार तथ्यात्मक रूप से तैयार की गई है।"
      }
    ],
    "relatedSlugs": [
      "placement-offcampus-playbook",
      "core-cs-subjects-interview",
      "project-ideas-hub"
    ],
    "sources": [
      {
        "title": "Striver's A2Z DSA Course & Sheet",
        "url": "https://takeuforward.org/strivers-a2z-dsa-course/strivers-a2z-dsa-course-sheet-2/",
        "publisher": "TakeUForward",
        "accessed": "2026-11-04"
      },
      {
        "title": "NeetCode 150 Practice Roadmap",
        "url": "https://neetcode.io/practice",
        "publisher": "NeetCode.io",
        "accessed": "2026-11-04"
      },
      {
        "title": "Introduction to Algorithms (CLRS 4th Edition)",
        "url": "https://mitpress.mit.edu/9780262046305/introduction-to-algorithms/",
        "publisher": "The MIT Press",
        "accessed": "2026-11-04"
      },
      {
        "title": "LeetCode Interview Preparation Track",
        "url": "https://leetcode.com/explore/",
        "publisher": "LeetCode",
        "accessed": "2026-11-04"
      }
    ]
  },
  {
    "slug": "offcampus-internship-playbook",
    "title": "Placement Playbook: Resume, ATS, LinkedIn, GitHub, Mock Interviews और Off-Campus Strategy",
    "titleHindi": "",
    "category": "career",
    "categoryLabel": "Career & Placement",
    "level": "intermediate",
    "tags": [
      "placement",
      "resume",
      "ats",
      "linkedin",
      "github",
      "off-campus",
      "interviews",
      "career"
    ],
    "readingMinutes": 14,
    "lastVerified": "2026-11-04",
    "confidence": "high",
    "summary": "कॉलेज स्टूडेंट्स और फ्रेशर्स के लिए संपूर्ण जॉब हंट प्लेबुक। ATS-फ्रेंडली 1-पेज रिज्यूमे, Google का XYZ फॉर्मूला, लिंक्डइन पर रेफरल पाने के वास्तविक मैसेज टेम्पलेट्स, और ऑफ-कैंपस में शॉर्टलिस्ट होने के अचूक तरीके।",
    "tldr": [
      "**1-Page Strict Rule:** फ्रेशर्स और 0-3 साल के अनुभव वालों का रिज्यूमे हमेशा **1 पेज** का होना चाहिए। दो कॉलम (two-column) या फैंसी कैनवा (Canva) ग्राफ़िक्स वाले टेम्पलेट्स ATS बॉट्स द्वारा रिजेक्ट हो जाते हैं [1]।",
      "**Google का XYZ फॉर्मूला:** रिज्यूमे के हर बुलेट में लिखें: *\"Accomplished [X], as measured by [Y], by doing [Z]\"* [3]। साधारण वाक्य *\"Created an e-commerce website\"* लिखने से शॉर्टलिस्टिंग नहीं होती।",
      "**GitHub & Live Demos:** प्रोजेक्ट केवल कोड नहीं होना चाहिए; हर प्रोजेक्ट का एक क्लिक पर चलने वाला **Live URL** (Vercel/Render) और सुंदर README (GIFs/screenshots) होना चाहिए।",
      "**Cold InMail का सच:** बिना किसी संदर्भ के *\"Sir please give me referral\"* भेजने पर 99% लोग इग्नोर करते हैं। 3-लाइन का कस्टमाइज़्ड पिच और जॉब आईडी भेजने पर 30-40% रिस्पांस रेट मिलता है।"
    ],
    "whyItMatters": "कॉलेज स्टूडेंट्स और फ्रेशर्स के लिए संपूर्ण जॉब हंट प्लेबुक। ATS-फ्रेंडली 1-पेज रिज्यूमे, Google का XYZ फॉर्मूला, लिंक्डइन पर रेफरल पाने के वास्तविक मैसेज टेम्पलेट्स, और ऑफ-कैंपस में शॉर्टलिस्ट होने के अचूक तरीके।",
    "coreConcepts": [
      {
        "heading": "Theory & Core Principles",
        "content": ""
      }
    ],
    "roadmapSteps": [
      "Phase 1: Foundations & Core Principles",
      "Phase 2: Practical Implementation & Coding",
      "Phase 3: Real-World Testing & Optimization",
      "Phase 4: Deployment & Portfolio Presentation"
    ],
    "handsOn": [
      {
        "title": "Practical Hands-on",
        "task": "Execute hands-on code examples and verify locally.",
        "deliverable": "Tested script and architecture output."
      }
    ],
    "mistakesAndMyths": [
      {
        "myth": "बिना बुनियादी सिद्धांत समझे केवल टूल्स का इस्तेमाल काफी है",
        "reality": "कोर प्रिंसिपल्स की समझ ही लंबे समय में सिस्टम को डिबग और स्केल करने की क्षमता देती है।"
      }
    ],
    "resources": [
      {
        "type": "tool",
        "title": "Jake's Resume LaTeX Template on Overleaf",
        "url": "https://www.overleaf.com/latex/templates/jakes-resume/syzsqbzwxvdx",
        "author": "Jake Gutierrez",
        "language": "en",
        "free": true,
        "whyWatch": "Template by Jake Gutierrez"
      },
      {
        "type": "video",
        "title": "How to Build a SDE Resume that Gets Shortlisted (in Hindi)",
        "url": "https://www.youtube.com/watch?v=BYUY1E43R5E",
        "author": "Arsh Goyal",
        "language": "hi",
        "free": true,
        "whyWatch": "22 mins by Arsh Goyal"
      },
      {
        "type": "doc",
        "title": "Harvard Action Verbs for Technical Resumes",
        "url": "https://careerservices.fas.harvard.edu/resources/create-a-strong-resume/",
        "author": "Harvard University",
        "language": "en",
        "free": true,
        "whyWatch": "PDF Checklist by Harvard University"
      },
      {
        "type": "tool",
        "title": "Pramp: Free Peer-to-Peer Mock Interviews",
        "url": "https://www.pramp.com/",
        "author": "Pramp",
        "language": "en",
        "free": true,
        "whyWatch": "Live Mock Rounds by Pramp"
      }
    ],
    "faqs": [
      {
        "question": "क्या यह विषय कॉलेज छात्रों के लिए उपयोगी है?",
        "answer": "हाँ, यह गाइड आधुनिक उद्योग और परीक्षा मानकों के अनुसार तथ्यात्मक रूप से तैयार की गई है।"
      }
    ],
    "relatedSlugs": [
      "dsa-roadmap-6-months",
      "core-cs-subjects-interview",
      "project-ideas-hub"
    ],
    "sources": [
      {
        "title": "Harvard University Career Services Resume Guide",
        "url": "https://careerservices.fas.harvard.edu/resources/create-a-strong-resume/",
        "publisher": "Harvard FAS Mignone Center for Career Success",
        "accessed": "2026-11-04"
      },
      {
        "title": "Jake's Resume (Single-Column LaTeX Template)",
        "url": "https://www.overleaf.com/latex/templates/jakes-resume/syzsqbzwxvdx",
        "publisher": "Overleaf / LaTeX Community",
        "accessed": "2026-11-04"
      },
      {
        "title": "Google Careers: How to Create a Great Technical Resume (XYZ Formula)",
        "url": "https://www.google.com/about/careers/applications/how-we-hire/",
        "publisher": "Google Careers",
        "accessed": "2026-11-04"
      },
      {
        "title": "Wellfound (Formerly AngelList Talent) Engineering Job Search Guidelines",
        "url": "https://wellfound.com/",
        "publisher": "Wellfound",
        "accessed": "2026-11-04"
      }
    ]
  }
];

export const CATEGORIES = [
  { id: 'ai-ml', name: 'AI & Machine Learning', icon: 'cpu', description: 'LLMs, RAG, Prompt Engineering, Agents & Transformers' },
  { id: 'quantum', name: 'Quantum Computing', icon: 'atom', description: 'Qubits, Superposition, Shor, Grover & Qiskit' },
  { id: 'career', name: 'Career & Placement', icon: 'briefcase', description: 'DSA, Off-campus strategies, Resumes & Interview Playbooks' },
  { id: 'projects', name: 'Projects Hub', icon: 'rocket', description: 'Step-by-step production-grade portfolio projects' },
  { id: 'tech-fundamentals', name: 'Tech Fundamentals', icon: 'terminal', description: 'Git, GitHub, Docker, Linux, APIs & Core Systems' },
  { id: 'gov-policy', name: 'Politics & Governance', icon: 'landmark', description: 'Constitution, Digital India, UPI, DBT & Public Policy' }
];
