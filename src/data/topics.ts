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
    slug: 'rag',
    title: 'Retrieval-Augmented Generation (RAG)',
    titleHindi: 'रिट्रीवल-ऑगमेंटेड जेनरेशन (RAG)',
    category: 'ai-ml',
    categoryLabel: 'AI & Machine Learning',
    level: 'intermediate',
    tags: ['GenAI', 'LLM', 'Vector DB', 'Embeddings', 'LangChain'],
    readingMinutes: 8,
    lastVerified: '2026-11-04',
    confidence: 'high',
    summary: 'RAG external knowledge base se data retrieve karke LLM ko contextual context provide karta hai taaki hallucinations khatam hon aur private/live data par accurate answers milein.',
    tldr: [
      'RAG ka matlab hai: LLM ko query dene se pehle relevant documents dhundh kar prompt context me attach karna.',
      'Fine-tuning model ke weights badalti hai; RAG model ko "open-book exam" ki tarah reference data deta hai.',
      'Core pipeline: Ingestion -> Chunking -> Embedding -> Vector Search (Cosine/Dot Product) -> LLM Synthesis.',
      'Cost-effective hai aur enterprise private data par 100% privacy maintain karta hai.'
    ],
    whyItMatters: 'LLMs ka knowledge cutoff hota hai aur wo facts fabricate (hallucinate) kar sakte hain. RAG ke bina kisi company ka internal documentation chatbot ya live stock/legal assistant banana lagbhag namumkin hai.',
    coreConcepts: [
      {
        heading: 'Open Book Analogy',
        content: 'Fine-tuning ek student ki tarah hai jo exam ke liye saari books ratt kar gaya hai. RAG ek "Open-Book Exam" hai jahan student ke saamne library kholi jaati hai aur question se related exact pages nikaal kar padhne diye jaate hain.',
        analogy: 'RAG = Search Engine (Vector Search) + Intelligent Summarizer (LLM).'
      },
      {
        heading: 'The 4-Stage Architecture',
        content: '1. Chunking: Lambe documents ko 500-1000 tokens ke chunks me todna with 10% overlap.\n2. Embedding: Text chunks ko dense mathematical vectors me convert karna (e.g. text-embedding-3-small).\n3. Vector Storage: Chunks ko FAISS, ChromaDB, ya Pinecone me index karna.\n4. Retrieval & Augmentation: User query ke top-k nearest chunks nikaal kar prompt me inject karna.',
        codeSnippet: {
          language: 'python',
          code: `# Minimal Vector Search Flow with Sentence-Transformers
from sentence_transformers import SentenceTransformer
import numpy as np

model = SentenceTransformer('all-MiniLM-L6-v2')
docs = [
    "Antigravity is an AI pair programming agent by DeepMind.",
    "RAG fetches relevant vectors and passes them to prompt context."
]
doc_embeddings = model.encode(docs)
query = "What does RAG do?"
query_embedding = model.encode([query])

similarities = np.dot(doc_embeddings, query_embedding.T)
best_match_idx = np.argmax(similarities)
print(f"Retrieved Context: {docs[best_match_idx]}")`
        }
      }
    ],
    roadmapSteps: [
      'Step 1: Python fundamentals aur embeddings concepts seekhein (Cosine similarity).',
      'Step 2: Local Vector Database jaise ChromaDB ya FAISS use karke 10 PDFs index karein.',
      'Step 3: Chunking strategies (RecursiveCharacterTextSplitter) aur token limits samjhein.',
      'Step 4: Re-ranking models (Cohere Rerank) aur Hybrid Search (BM25 + Dense) implement karein.',
      'Step 5: Production evaluation ke liye Ragas ya TruLens framework setup karein.'
    ],
    handsOn: [
      {
        title: 'Build a College Syllabus Q&A Bot',
        task: 'Apne university semester ke 3 subjects ke PDF syllabus download karein, ChromaDB me chunk karein aur open-source LLM (Ollama/Llama-3) se question pucho.',
        deliverable: 'GitHub repo with working CLI script that cites exact page numbers.'
      }
    ],
    mistakesAndMyths: [
      {
        myth: 'RAG ke badle Fine-Tuning karne se model hamesha naya data yaad rakhega.',
        reality: 'Fine-tuning style aur formatting sikhane ke liye behtar hai, factual accuracy aur live updates ke liye RAG hamesha superior aur sasta hai.'
      },
      {
        myth: 'Chunks jitne bade honge, model utna achha samjhega.',
        reality: 'Bade chunks me irrelevant noise badh jaati hai jisse "Lost in the Middle" problem hoti hai. 512–1024 tokens with 100 token overlap sweet spot hai.'
      }
    ],
    resources: [
      {
        type: 'video',
        title: 'RAG from Scratch Course',
        url: 'https://www.youtube.com/playlist?list=PLfaIDF989fnIQmsfHekIe-2jGqPsp_p1F',
        author: 'LangChain Official',
        language: 'en',
        duration: '1h 30m',
        free: true,
        whyWatch: 'Lance Martin (LangChain core team) dwara zero se production RAG tak stepwise explanation.'
      },
      {
        type: 'doc',
        title: 'Pinecone Vector Database Learning Center',
        url: 'https://www.pinecone.io/learn/',
        author: 'Pinecone',
        language: 'en',
        free: true,
        whyWatch: 'Vector index (HNSW), similarity metrics aur dense retrieval ka gold standard reference.'
      }
    ],
    faqs: [
      {
        question: 'RAG me chunk size kaise choose karein?',
        answer: 'Domain par depend karta hai. Paragraph-level questions ke liye 400-600 tokens behtar hain. Code ke liye function-level AST parsing chunking use karni chahiye.'
      },
      {
        question: 'Kya RAG offline chal sakta hai?',
        answer: 'Haan! Ollama + Llama 3/Mistral aur local ChromaDB use karke 100% offline aur free RAG system run kiya ja sakta hai.'
      }
    ],
    relatedSlugs: ['llms-explained', 'prompt-engineering', 'ai-chatbot-rag-project'],
    sources: [
      {
        title: 'Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks (Lewis et al.)',
        url: 'https://arxiv.org/abs/2005.11401',
        publisher: 'NeurIPS 2020 (Meta AI Research)',
        accessed: '2026-11-04'
      }
    ]
  },
  {
    slug: 'prompt-engineering',
    title: 'Prompt Engineering & In-Context Learning',
    titleHindi: 'प्रॉम्प्ट इंजीनियरिंग और संदर्भ सीखना',
    category: 'ai-ml',
    categoryLabel: 'AI & Machine Learning',
    level: 'beginner',
    tags: ['Prompts', 'Few-Shot', 'Chain-of-Thought', 'LLM', 'System Prompts'],
    readingMinutes: 6,
    lastVerified: '2026-11-04',
    confidence: 'high',
    summary: 'LLMs se structured, high-accuracy aur deterministic outputs lene ke liye systematic techniques jaise Few-shot, Chain-of-Thought (CoT) aur ReAct framing ka upyog.',
    tldr: [
      'Prompting sirf "chatting" nahi balki LLM ke token probability distribution ko steer karna hai.',
      'Role + Context + Clear Constraint + Output Schema (JSON/Markdown) = 90% success rate.',
      'Chain-of-Thought ("Think step-by-step") complex reasoning aur math me errors ko 60% tak kam karta hai.',
      'System prompt application security ka primary layer hai against prompt injection attacks.'
    ],
    whyItMatters: 'Achhe prompts aur ghatiya prompts ke beech 300% accuracy ka farq hota hai. Production software me LLM integration tabhi scale karti hai jab prompts deterministic aur predictable hon.',
    coreConcepts: [
      {
        heading: 'The 4 Core Prompt Archetypes',
        content: '1. Zero-Shot: Bina kisi example ke direct instruction dena.\n2. Few-Shot: Prompt ke andar 2-3 input-output examples include karna (In-Context Learning).\n3. Chain-of-Thought (CoT): Model ko final answer se pehle internal reasoning dikhane ko kehna.\n4. ReAct (Reason + Act): Model ko tools (Calculator, Web Search, DB) use karne ke liye step-by-step format dena.',
        codeSnippet: {
          language: 'markdown',
          code: `### Production Structured Prompt Template
You are an expert Data Structures & Algorithms instructor.

Context: A 2nd-year computer science student is struggling with recursion.
Constraint: Explain without using academic jargon. Max 3 short paragraphs.
Output Format:
1. One relatable real-world analogy.
2. The 3 golden rules of base cases.
3. A 5-line clean Python snippet.`
        }
      }
    ],
    roadmapSteps: [
      'Step 1: Role framing aur Delimiters (triple backticks, XML tags) ka use master karein.',
      'Step 2: Few-shot exemplar selection samjhein.',
      'Step 3: Structured output generation (Pydantic / JSON Mode).',
      'Step 4: Prompt Injection defense techniques (delimiting untrusted user inputs).',
      'Step 5: Automated prompt optimization tools jaise DSPy explore karein.'
    ],
    handsOn: [
      {
        title: 'Zero to Structured Extractor',
        task: 'Kisi lambe Indian court order ya college circular se Date, Authority, aur Deadlines extract karne wala structured JSON prompt banayein.',
        deliverable: 'A prompt that validates 100% against a Pydantic schema.'
      }
    ],
    mistakesAndMyths: [
      {
        myth: 'Prompt me "Please" aur "Thank you" likhne se output better hota hai.',
        reality: 'Politeness tokens waste karti hai. Crisp constraints, clear examples, aur negative constraints ("Do NOT include...") zyada effective hain.'
      }
    ],
    resources: [
      {
        type: 'doc',
        title: 'OpenAI Prompt Engineering Guide',
        url: 'https://platform.openai.com/docs/guides/prompt-engineering',
        author: 'OpenAI',
        language: 'en',
        free: true,
        whyWatch: 'Official 6 best practices strategies for maximum reasoning and output control.'
      }
    ],
    faqs: [
      {
        question: 'System prompt aur User prompt me kya farq hai?',
        answer: 'System prompt model ka core persona, rules aur safety guidelines set karta hai jise user easily override nahi kar sakta.'
      }
    ],
    relatedSlugs: ['rag', 'llms-explained'],
    sources: [
      {
        title: 'Chain-of-Thought Prompting Elicits Reasoning in Large Language Models (Wei et al.)',
        url: 'https://arxiv.org/abs/2201.11903',
        publisher: 'Google Research, NeurIPS 2022',
        accessed: '2026-11-04'
      }
    ]
  },
  {
    slug: 'llms-explained',
    title: 'Large Language Models (LLMs) & Transformers',
    titleHindi: 'लार्ज लैंग्वेज मॉडल्स और ट्रांसफॉर्मर आर्किटेक्चर',
    category: 'ai-ml',
    categoryLabel: 'AI & Machine Learning',
    level: 'intermediate',
    tags: ['Attention', 'Transformers', 'Self-Attention', 'GPT', 'PyTorch'],
    readingMinutes: 10,
    lastVerified: '2026-11-04',
    confidence: 'high',
    summary: 'Self-Attention mechanism aur Transformer architecture ki deep-dive samjh: kaise modern LLMs sequence-to-sequence tokens predict karke human-level text generate karte hain.',
    tldr: [
      'LLMs next-token prediction engine hain, jo trillion parameters par trained hain.',
      '"Attention Is All You Need" (2017) paper ne recurrent networks (RNNs) ko replace karke parallel training enable ki.',
      'Query (Q), Key (K), Value (V) matrices se model har word ka sentence ke baaki words se context calculate karta hai.',
      'Training 3 phases me hoti hai: Pre-training (Raw corpus) -> SFT (Instruction Tuning) -> RLHF (Alignment).'
    ],
    whyItMatters: 'ChatGPT se lekar Claude aur Gemini tak saare modern AI systems Transformer architecture par chalte hain. Iske core concepts samajhna har software engineer ke liye must hai.',
    coreConcepts: [
      {
        heading: 'Self-Attention Explained Simply',
        content: 'Jab aap padhte hain: "The animal didn\'t cross the street because it was too tired", aapko pata hai "it" = "animal". Lekin agar aage likha ho "it was too wide", toh "it" = "street". Transformers yahi relation Q, K, V dot product ke zariye calculate karte hain.',
        codeSnippet: {
          language: 'python',
          code: `# Scaled Dot-Product Attention in PyTorch
import torch
import torch.nn.functional as F

def scaled_dot_product_attention(Q, K, V):
    d_k = Q.size(-1)
    scores = torch.matmul(Q, K.transpose(-2, -1)) / (d_k ** 0.5)
    weights = F.softmax(scores, dim=-1)
    return torch.matmul(weights, V)`
        }
      }
    ],
    roadmapSteps: [
      'Step 1: Word2Vec aur Tokenization (Byte-Pair Encoding - BPE) seekhein.',
      'Step 2: Self-Attention aur Multi-Head Attention equations implement karein.',
      'Step 3: Positional Encodings (RoPE) ka importance samjhein.',
      'Step 4: Andrej Karpathy ka "Build nanoGPT from Scratch" code karein.'
    ],
    handsOn: [
      {
        title: 'Inspect Tokenizer in Python',
        task: 'HuggingFace `tiktoken` ya `transformers` library use karke dekhein ki Hindi words kaise tokens me split hote hain aur English words kaise split hote hain.',
        deliverable: 'A small script showing token IDs, bytes, and vocabulary compression differences.'
      }
    ],
    mistakesAndMyths: [
      {
        myth: 'LLMs ke paas apni thinking capability aur feelings hain.',
        reality: 'LLMs complex statistical pattern matchers hain. Wo input context ke probability distribution ke hisaab se most likely next token predict karte hain.'
      }
    ],
    resources: [
      {
        type: 'video',
        title: 'Let\'s build GPT: from scratch, in code, spelled out',
        url: 'https://www.youtube.com/watch?v=kCc8FmEb1nY',
        author: 'Andrej Karpathy',
        language: 'en',
        duration: '1h 56m',
        free: true,
        whyWatch: 'Former Tesla AI / OpenAI co-founder dwara PyTorch me zero se GPT architecture banane ka masterclass.'
      }
    ],
    faqs: [
      {
        question: 'Parameters (e.g. 7B, 70B) ka kya matlab hota hai?',
        answer: 'Parameters wo weights aur biases hain jo training ke dauran adjust hote hain. 70B model me 70 billion mathematical weights hote hain.'
      }
    ],
    relatedSlugs: ['rag', 'prompt-engineering'],
    sources: [
      {
        title: 'Attention Is All You Need (Vaswani et al.)',
        url: 'https://arxiv.org/abs/1706.03762',
        publisher: 'Google Brain / Google Research, NeurIPS 2017',
        accessed: '2026-11-04'
      }
    ]
  },
  {
    slug: 'qubits-superposition',
    title: 'Quantum Computing: Qubits & Superposition',
    titleHindi: 'क्वांटम कंप्यूटिंग: क्यूबिट्स और सुपरपोजिशन',
    category: 'quantum',
    categoryLabel: 'Quantum Computing',
    level: 'intermediate',
    tags: ['Quantum', 'Qiskit', 'Qubits', 'Superposition', 'Bloch Sphere'],
    readingMinutes: 7,
    lastVerified: '2026-11-04',
    confidence: 'high',
    summary: 'Classical bits (0 ya 1) ke muqable quantum bits (qubits) simultaneously states me exist kar sakte hain, jisse exponential computational state space create hota hai.',
    tldr: [
      'Classical bit ya toh 0 hota hai ya 1. Qubit |0⟩ aur |1⟩ ke linear combination (superposition) me reh sakta hai.',
      'State formula: |ψ⟩ = α|0⟩ + β|1⟩ jahan |α|² + |β|² = 1.',
      'Hadamard gate (H-gate) classical state |0⟩ ko 50-50 equal superposition me daalta hai.',
      'Measurement karte hi quantum state collapse hokar classical 0 ya 1 ban jaati hai.'
    ],
    whyItMatters: 'Quantum computers classical computers ko replace nahi karenge, balki cryptography, drug discovery, battery chemical simulation aur portfolio optimization jaise exponential problems ko polynomial time me solve karenge.',
    coreConcepts: [
      {
        heading: 'The Coin Toss Analogy',
        content: 'Jab coin table par rakha ho, wo ya toh Heads (0) hai ya Tails (1). Lekin jab coin table par ghoom (spin kar) raha hota hai, wo simultaneously dono states ki probability hold karta hai. Yahi Superposition hai! Jab aap haath rakh kar rokte hain (Measurement), wo ek state me collapse ho jaata hai.'
      },
      {
        heading: 'Writing Quantum Circuits with Qiskit',
        content: 'Python me IBM Qiskit library use karke 1 minute me quantum superposition circuit likha ja sakta hai.',
        codeSnippet: {
          language: 'python',
          code: `from qiskit import QuantumCircuit
from qiskit.primitives import StatevectorSampler

# 1-Qubit Quantum Circuit
qc = QuantumCircuit(1, 1)
qc.h(0)         # Apply Hadamard Gate -> Superposition
qc.measure(0, 0) # Measure into classical bit

sampler = StatevectorSampler()
job = sampler.run([(qc)])
result = job.result()[0]
print("Measurement counts (approx 50% 0, 50% 1):", result.data.c.get_counts())`
        }
      }
    ],
    roadmapSteps: [
      'Step 1: Linear algebra basics revise karein (Vectors, Matrices, Complex numbers, Inner product).',
      'Step 2: Dirac notation (|0⟩, |1⟩ bra-ket notation) aur Bloch Sphere samjhein.',
      'Step 3: Single-qubit gates (X, Y, Z, H) aur Multi-qubit gates (CNOT, Toffoli).',
      'Step 4: Quantum Entanglement (Bell States) banayein aur verify karein.',
      'Step 5: IBM Quantum Platform par real quantum hardware par job submit karein.'
    ],
    handsOn: [
      {
        title: 'Run a Quantum Coin Flip on IBM Cloud',
        task: 'IBM Quantum platform (quantum.ibm.com) par free account banayein, API token lein aur Qiskit se ek 5-qubit real quantum computer par job submit karein.',
        deliverable: 'Quantum execution job ID and probability distribution histogram.'
      }
    ],
    mistakesAndMyths: [
      {
        myth: 'Quantum computers har task me classical computer se infinitely fast hote hain.',
        reality: 'Quantum speedup sirf specific mathematical structures (jaise Fourier transform, period finding, amplitude amplification) par hi milta hai. Browsing aur gaming classical CPU par hi fast rahegi.'
      }
    ],
    resources: [
      {
        type: 'doc',
        title: 'Qiskit v1.0 Official Documentation & Tutorials',
        url: 'https://docs.quantum.ibm.com/',
        author: 'IBM Quantum',
        language: 'en',
        free: true,
        whyWatch: 'Standard API reference and interactive learning textbook for quantum developers.'
      }
    ],
    faqs: [
      {
        question: 'N qubits kitne classical states represent karte hain?',
        answer: '2^N states simultaneously! Matlab 50 qubits lagbhag 1,000,000,000,000,000 states ko simultaneously calculate kar sakte hain.'
      }
    ],
    relatedSlugs: ['shor-grover', 'qrng-quantum-project'],
    sources: [
      {
        title: 'Quantum Computation and Quantum Information (Nielsen & Chuang)',
        url: 'https://www.cambridge.org/highereducation/books/quantum-computation-and-quantum-information/01E10196D0A682A6AEFAEA52D5D3D62A',
        publisher: 'Cambridge University Press (The Bible of Quantum Computing)',
        accessed: '2026-11-04'
      }
    ]
  },
  {
    slug: 'shor-grover',
    title: "Quantum Algorithms: Shor's & Grover's",
    titleHindi: 'क्वांटम एल्गोरिदम: शोर और ग्रोवर',
    category: 'quantum',
    categoryLabel: 'Quantum Computing',
    level: 'advanced',
    tags: ['Shor', 'Grover', 'Cryptography', 'RSA', 'Quantum Search'],
    readingMinutes: 9,
    lastVerified: '2026-11-04',
    confidence: 'high',
    summary: 'Shor ka algorithm RSA encryption ko polynomial time me tod sakta hai, aur Grover ka algorithm unstructured database search me quadratic speedup provide karta hai.',
    tldr: [
      "Shor's Algorithm prime factorization ko O((log N)³) me solve karta hai—jisse RSA aur ECC cryptography break ho sakti hai.",
      "Grover's Algorithm N items ke database me search time ko O(N) se ghata kar O(√N) kar deta hai.",
      'Quantum Phase Estimation (QPE) aur Amplitude Amplification in dono algorithms ke mathematical core hain.',
      'Post-Quantum Cryptography (PQC) standards (NIST approved) ab globally deploy kiye ja rahe hain.'
    ],
    whyItMatters: 'Internet ki saari modern security (HTTPS, banking, blockchains) prime number factoring ki difficulty par tike hain. Quantum algorithms ke aane se entire world Post-Quantum Cryptography ki taraf transition kar raha hai.',
    coreConcepts: [
      {
        heading: "Shor's Algorithm: Factoring as Period Finding",
        content: 'Peter Shor (1994) ne discover kiya ki kisi number N ke prime factors dhundhne ki problem asal me ek modular function f(x) = a^x mod N ka "Period (r)" dhundhne jaisi hai. Classical computer ko period dhundhne me hazaron saal lagte hain, lekin Quantum Fourier Transform (QFT) se ye minutes me ho jaata hai.'
      },
      {
        heading: "Grover's Algorithm: Amplitude Amplification",
        content: 'Grover ka algorithm target state ki probability amplitude ko har step par reflect aur amplify karta hai, jab tak ki measurement karne par sahi answer 99%+ probability ke sath na nikal aaye.'
      }
    ],
    roadmapSteps: [
      'Step 1: Modular arithmetic aur Euler Totient function samjhein.',
      'Step 2: Quantum Fourier Transform (QFT) circuit implement karein.',
      'Step 3: Grover Oracle aur Diffuser operator design karein.',
      'Step 4: NIST PQC algorithms (ML-KEM / Kyber, ML-DSA / Dilithium) ka architecture padhein.'
    ],
    handsOn: [
      {
        title: "Factor 15 using Shor's in Qiskit",
        task: 'Qiskit ke built-in modular exponentiation circuits se 15 = 3 x 5 ka quantum factorization circuit run karein.',
        deliverable: 'Quantum circuit diagram and period estimation output.'
      }
    ],
    mistakesAndMyths: [
      {
        myth: 'Quantum computers kal hi hamare bank accounts hack kar lenge.',
        reality: 'RSA-2048 todne ke liye ~4,000 fault-tolerant logical qubits chahiye (jo millions of physical qubits ke barabar hain). Abhi hardware Noisy Intermediate-Scale (NISQ) stage me hai, full PQC risk 2030-2035 ke aaspas expected hai.'
      }
    ],
    resources: [
      {
        type: 'video',
        title: "Shor's Algorithm Explained Intuitively",
        url: 'https://www.youtube.com/watch?v=lvTqbM5Dq4Q',
        author: 'MinutePhysics',
        language: 'en',
        duration: '11m',
        free: true,
        whyWatch: 'Best animated intuitive explanation of quantum period finding without overwhelming math.'
      }
    ],
    faqs: [
      {
        question: 'Kya AES encryption bhi insecure ho jayega?',
        answer: "Nahi! Grover's algorithm AES key size ko aadha karta hai (quadratic speedup). AES-256 Grover ke baad bhi AES-128 jitna secure rahega, jo ki computationally unbreakable hai."
      }
    ],
    relatedSlugs: ['qubits-superposition', 'qrng-quantum-project'],
    sources: [
      {
        title: 'Polynomial-Time Algorithms for Prime Factorization and Discrete Logarithms on a Quantum Computer (Peter W. Shor)',
        url: 'https://arxiv.org/abs/quant-ph/9508027',
        publisher: 'SIAM Journal on Computing, 1997',
        accessed: '2026-11-04'
      }
    ]
  },
  {
    slug: 'dsa-placement-mastery',
    title: 'DSA & Placement Strategy for Indian College Students',
    titleHindi: 'कॉलेज प्लेसमेंट के लिए डीएसए और इंटरव्यू रणनीति',
    category: 'career',
    categoryLabel: 'Career & Placement',
    level: 'beginner',
    tags: ['Placement', 'DSA', 'LeetCode', 'Interview', 'Internship'],
    readingMinutes: 8,
    lastVerified: '2026-11-04',
    confidence: 'high',
    summary: 'Tier-1/2/3 college students ke liye complete placement roadmap: Zero se 250 quality LeetCode problems, mock interviews, aur core CS fundamentals balance karne ka proven framework.',
    tldr: [
      'Blindly 1000 problems solve mat karo; 250 curated pattern-based problems (Striver SDE Sheet ya NeetCode 150) kafi hain.',
      'Topic priority order: Array/Hashing -> Two Pointers -> Sliding Window -> Trees/Graphs -> Dynamic Programming.',
      'Online Assessment (OA) clear karne ke liye speed zaroori hai; Face-to-face round me communication aur edge cases matter karte hain.',
      'Core CS (OS, DBMS, CN, OOP) ko aakhri 1 mahine me interview questions se prepare karein.'
    ],
    whyItMatters: 'India me software engineering placement rounds me 80% filtering DSA Online Assessment se hoti hai. Structured preparation karne se 6 mahine me tier-3 college student bhi product companies crack kar sakta hai.',
    coreConcepts: [
      {
        heading: 'Pattern-Based Learning vs Random Grinding',
        content: 'Har naya question naye dhang se sochne ke badle 14 standard patterns seekhein: Sliding Window, Two Pointers, Fast & Slow Pointers, Merge Intervals, Top K Elements, Binary Search on Answer, Tree DFS/BFS, Graph Topological Sort, 0/1 Knapsack DP.'
      },
      {
        heading: 'The 30-Minute Problem Solving Rule',
        content: 'Kisi question par 30 minute se zyada bina direction ke mat phasyein. 30 minute baad editorial aur visual hints dekhein, phir 24 ghante baad bina dekhe code karein.'
      }
    ],
    roadmapSteps: [
      'Month 1: Ek programming language (C++ STL ya Java Collections) par mastery + Time/Space complexity analysis.',
      'Month 2: Arrays, Strings, Two Pointers, Sliding Window, Hashing, Recursion.',
      'Month 3: Linked Lists, Stacks, Queues, Binary Trees, Binary Search Trees.',
      'Month 4: Graphs (BFS, DFS, Dijkstra, Disjoint Set Union) aur Priority Queues.',
      'Month 5: Dynamic Programming (1D, 2D, Subsequences, Grid DP) + Bit Manipulation.',
      'Month 6: Mock interviews (Pramp), Core CS revision (OS concurrency, SQL queries, Indexing).'
    ],
    handsOn: [
      {
        title: 'Daily Pattern Log',
        task: 'Har solved question ke sath usme laga pattern (e.g. "Monotonic Stack" ya "Sliding Window") aur uski O(N) complexity ek GitHub repo me note karein.',
        deliverable: 'Your personal LeetCode pattern cheat sheet.'
      }
    ],
    mistakesAndMyths: [
      {
        myth: 'Placement ke liye Python use nahi karni chahiye.',
        reality: 'Google, Amazon, Microsoft, Uber saari companies Python allow karti hain. Important ye hai ki language ke standard library internals (e.g. dict amortized O(1)) aapko aate hon.'
      }
    ],
    resources: [
      {
        type: 'course',
        title: 'Striver A2Z DSA Course & Sheet',
        url: 'https://takeuforward.org/strivers-a2z-dsa-course/strivers-a2z-dsa-course-sheet-2/',
        author: 'Raj Vikramaditya (Striver)',
        language: 'hi',
        free: true,
        whyWatch: 'India ka sabse popular, free aur structured DSA placement curriculum with video solutions.'
      }
    ],
    faqs: [
      {
        question: 'Placement season se kitne mahine pehle DSA shuru karna chahiye?',
        answer: 'Kam se kam 6 mahine consistent daily 2-3 ghante study chahiye taaki patterns recall me natural lagein.'
      }
    ],
    relatedSlugs: ['offcampus-internship-playbook', 'resume-ats-guide'],
    sources: [
      {
        title: 'Cracking the Coding Interview (Gayle Laakmann McDowell)',
        url: 'https://www.crackingthecodinginterview.com/',
        publisher: 'CareerCup Publishing',
        accessed: '2026-11-04'
      }
    ]
  },
  {
    slug: 'offcampus-internship-playbook',
    title: 'Off-Campus Tech Internship & Referral Playbook',
    titleHindi: 'ऑफ-कैंपस टेक इंटर्नशिप और रेफरल प्लेबुक',
    category: 'career',
    categoryLabel: 'Career & Placement',
    level: 'beginner',
    tags: ['Internship', 'Referral', 'LinkedIn', 'Cold Email', 'Resume'],
    readingMinutes: 7,
    lastVerified: '2026-11-04',
    confidence: 'high',
    summary: 'College campus ke bharose baithe bina top startups aur tech giants me off-campus opportunities nikaalne, LinkedIn par genuine referrals lene aur cold outreach karne ki step-by-step strategy.',
    tldr: [
      'Company career portal par bina referral ke apply karna black hole me application bhejne jaisa hai.',
      'LinkedIn par HRs ke badle 1-2 saal senior Software Engineers ko polite context ke sath message karein.',
      'Cold message me direct "Please give referral" mat likho; Job ID + 3 bullet points showing relevant skills + Resume link do.',
      'AngelList (Wellfound), Instahyre, aur Y Combinator jobs board par off-campus hiring response rate LinkedIn se 5x zyada hai.'
    ],
    whyItMatters: 'Tier-2 aur Tier-3 colleges me top tech companies on-campus nahi aati hain. Off-campus game samajhkar students 15–50 LPA tak ke offers crack karte hain.',
    coreConcepts: [
      {
        heading: 'The 3-Sentence High-Conversion Referral Template',
        content: 'Engineers busy hote hain. Unhe lambe essays mat bhejiye. Yahan exact battle-tested template hai:',
        codeSnippet: {
          language: 'markdown',
          code: `Hi [Name], hope you are doing well!

I noticed an open Software Engineer Intern position at [Company] (Job ID: #12345). 
I'm a final-year CS student with production experience in FastAPI, Docker, and Vector DBs, and recently built [Link to Live Project / Demo].

Given my background aligns well with the team's tech stack, would you be comfortable sharing a referral? 
My 1-page ATS resume is attached here: [Google Drive View Link]

Thanks for your time and guidance!`
        }
      }
    ],
    roadmapSteps: [
      'Step 1: 1-Page clean ATS resume ready karein (Overleaf / Jake\'s Resume template).',
      'Step 2: 2 production-grade deployed projects ready rakhein with live demo links.',
      'Step 3: Wellfound, LinkedIn Jobs, aur Company career pages par daily 5 openings track karein.',
      'Step 4: Target companies ke engineers ko personalize messages bhejein (daily 5-10 messages).',
      'Step 5: Follow-up after 5 days if no response (politely).'
    ],
    handsOn: [
      {
        title: 'Send 5 Tailored Connection Requests',
        task: 'Apni dream startup ya company ke engineers ko personalized 300-character LinkedIn note bhejein jisme unki kisi tech post ya engineering blog ka genuine mention ho.',
        deliverable: '5 sent customized outreach messages.'
      }
    ],
    mistakesAndMyths: [
      {
        myth: 'Referral milte hi direct interview call pakka hota hai.',
        reality: 'Referral sirf aapke resume ko ATS bot se nikaal kar recruiter ke desk par top par rakhwata hai. Shortlist hona resume ki quality par depend karta hai.'
      }
    ],
    resources: [
      {
        type: 'tool',
        title: 'Wellfound (Formerly AngelList Talent)',
        url: 'https://wellfound.com/jobs',
        author: 'Wellfound',
        language: 'en',
        free: true,
        whyWatch: 'Startup founders aur hiring managers se direct chat aur early-stage software internships ke liye best platform.'
      }
    ],
    faqs: [
      {
        question: 'Resume Drive link public kaise karein?',
        answer: 'Google Drive file settings me "Anyone with the link can view" set karein, aur URL shortener mat lagayein taaki spam filters block na karein.'
      }
    ],
    relatedSlugs: ['dsa-placement-mastery', 'resume-ats-guide'],
    sources: [
      {
        title: 'The Tech Interview Handbook (Yangshun Tay)',
        url: 'https://www.techinterviewhandbook.org/',
        publisher: 'Open Source Community',
        accessed: '2026-11-04'
      }
    ]
  },
  {
    slug: 'resume-ats-guide',
    title: 'High-Impact ATS Resume Building for Software Engineers',
    titleHindi: 'सॉफ्टवेयर इंजीनियरों के लिए एटीएस फ्रेंडली रिज्यूमे गाइड',
    category: 'career',
    categoryLabel: 'Career & Placement',
    level: 'beginner',
    tags: ['Resume', 'ATS', 'Placement', 'Overleaf', 'LaTeX'],
    readingMinutes: 6,
    lastVerified: '2026-11-04',
    confidence: 'high',
    summary: 'Applicant Tracking Systems (ATS) ko bypass karne aur human recruiters ko 6 second me impress karne ke liye single-column, XYZ-formula formatted tech resume design.',
    tldr: [
      'Multi-column, graphics, tables, icons aur photo wale resumes ATS software me 0 score par reject ho jaate hain.',
      'Single-column LaTeX resume (Jake\'s Resume template on Overleaf) industry standard hai.',
      'Har project bullet point me Google ka XYZ Formula use karein: "Accomplished [X] as measured by [Y], by doing [Z]".',
      'Always 1 single page for college students and professionals with < 5 years of experience.'
    ],
    whyItMatters: 'Recruiters har resume ko average 6 second dekhte hain. Agar formatting confusing ho ya impact numbers na hon, toh achhe coder bhi interview shortlisting se bahar ho jaate hain.',
    coreConcepts: [
      {
        heading: 'The Google XYZ Resume Formula',
        content: 'Bad Bullet: "Built a weather app in React."\nGood Bullet: "Developed a responsive Weather Dashboard using React and OpenWeather API, reducing load times by 40% with client-side caching."',
        codeSnippet: {
          language: 'markdown',
          code: `[Action Verb] + [What you built / optimized] + [Quantified Impact Metric] + [Tech Stack Used]
Example:
Architected a RAG pipeline utilizing LangChain and ChromaDB for 5,000+ internal research papers, cutting document retrieval time from 15 minutes to under 800ms.`
        }
      }
    ],
    roadmapSteps: [
      'Step 1: Overleaf par "Jake\'s Resume" template clone karein.',
      'Step 2: Sections order: Education -> Technical Skills -> Experience -> Projects -> Achievements.',
      'Step 3: Har project me Live Demo link aur GitHub repo link zaroor add karein.',
      'Step 4: PDF export karke free ATS scanner (jaise Jobscan ya Resume Worded) par test karein.'
    ],
    handsOn: [
      {
        title: 'Rewrite Your Top 3 Project Bullets',
        task: 'Apne 3 puraane project descriptions ko XYZ formula ke format me metrics (latency, accuracy, lines of code, users) ke sath rewrite karein.',
        deliverable: '3 refined high-impact bullet points.'
      }
    ],
    mistakesAndMyths: [
      {
        myth: 'Resume me rating bars (e.g. Python: 4/5 stars) lagane chahiye.',
        reality: 'Rating bars bilkul mat lagayein. Ye subjective lagte hain aur ATS parsers inko garbage characters read karte hain.'
      }
    ],
    resources: [
      {
        type: 'tool',
        title: "Jake's Resume Overleaf Template",
        url: 'https://www.overleaf.com/latex/templates/jakes-resume/syzfjbzwjncs',
        author: 'Jake Gutierrez',
        language: 'en',
        free: true,
        whyWatch: 'The most widely used and cleanest single-page LaTeX ATS resume template in tech.'
      }
    ],
    faqs: [
      {
        question: 'Kya 2 page ka resume bana sakte hain?',
        answer: 'Fresher aur college students ke liye strictly 1 page hona chahiye. 2 pages sirf tab justifiable hain jab 5+ saal ka extensive work experience ho.'
      }
    ],
    relatedSlugs: ['offcampus-internship-playbook', 'dsa-placement-mastery'],
    sources: [
      {
        title: 'Google Careers: How to Create a Great Resume',
        url: 'https://www.youtube.com/watch?v=BYUy1GvjH08',
        publisher: 'Google Tech Dev Guide',
        accessed: '2026-11-04'
      }
    ]
  },
  {
    slug: 'git-github-fundamentals',
    title: 'Git & GitHub Essentials for Professional Workflows',
    titleHindi: 'गिट और गिटहब: प्रोफेशनल डेवलपर वर्कफ़्लो',
    category: 'tech-fundamentals',
    categoryLabel: 'Tech Fundamentals',
    level: 'beginner',
    tags: ['Git', 'GitHub', 'CLI', 'Version Control', 'Open Source'],
    readingMinutes: 7,
    lastVerified: '2026-11-04',
    confidence: 'high',
    summary: 'Branching strategies, merge conflict resolution, pull request lifecycles, aur GitHub CLI (`gh`) ka upyog karke team collaboration aur open-source workflow mastery.',
    tldr: [
      'Git distributed version control system hai; GitHub cloud hosting aur collaboration platform hai.',
      'Core daily commands: `git add`, `git commit -m`, `git push`, `git pull --rebase`, `git checkout -b`.',
      'Directly `main` branch par commit karna production anti-pattern hai; hamesha feature branch aur PR flow use karein.',
      'Merge conflicts tab aate hain jab do branches same line of code ko alag tarike se modify karti hain.'
    ],
    whyItMatters: 'Kisi bhi software company me pehle din se aapka sara code Git ke zariye branch, PR aur review hokar deploy hota hai. Git me proficient hona standard requirement hai.',
    coreConcepts: [
      {
        heading: 'Git 3-State Model: Working Tree, Index, Commit',
        content: '1. Working Directory: Files jahan aap edit karte hain.\n2. Staging Area (Index): Files jo agle commit ka hissa banne ke liye chuni gayi hain (`git add`).\n3. Git Repository (.git folder): Permanent cryptographic snapshot history (`git commit`).',
        codeSnippet: {
          language: 'bash',
          code: `# Clean Feature Branch & PR Workflow
git checkout -b feat/add-search-feature
# (make edits)
git add src/search.py
git commit -m "feat(search): implement inverted index search"
git push -u origin feat/add-search-feature
gh pr create --title "feat: Inverted index search" --body "Closes #12"`
        }
      }
    ],
    roadmapSteps: [
      'Step 1: SSH Key setup karein GitHub ke sath (Password authentication deprecated hai).',
      'Step 2: Commit message conventions (Conventional Commits: feat, fix, chore, docs).',
      'Step 3: Merge conflicts ko VS Code editor me resolve karna seekhein.',
      'Step 4: Interactive Rebase (`git rebase -i`) se messy commit history clean karna seekhein.'
    ],
    handsOn: [
      {
        title: 'Contribute to an Open-Source Repo',
        task: 'Kisi popular open source repo ko fork karein, typo ya documentation fix karein, clean branch banakar PR submit karein.',
        deliverable: 'Your first live Pull Request link on GitHub.'
      }
    ],
    mistakesAndMyths: [
      {
        myth: '`git push --force` use karne me koi burai nahi hai.',
        reality: 'Team project me shared branches par force-push karne se dusre developers ka committed work overwrite aur delete ho sakta hai. Hamesha safe alternative `git push --force-with-lease` use karein.'
      }
    ],
    resources: [
      {
        type: 'doc',
        title: 'Pro Git Book (Free Full Online Version)',
        url: 'https://git-scm.com/book/en/v2',
        author: 'Scott Chacon & Ben Straub',
        language: 'en',
        free: true,
        whyWatch: 'Official comprehensive reference book covering everything from plumbing to porcelain commands.'
      }
    ],
    faqs: [
      {
        question: 'Git Merge aur Git Rebase me kya farq hai?',
        answer: 'Merge branches ke history ko combine karta hai ek naya merge-commit banakar. Rebase current branch ke commits ko target branch ke tip par linear re-apply karta hai taaki clean straight history bane.'
      }
    ],
    relatedSlugs: ['docker-containers', 'offcampus-internship-playbook'],
    sources: [
      {
        title: 'Git Documentation & Reference Manual',
        url: 'https://git-scm.com/doc',
        publisher: 'Git Core Team',
        accessed: '2026-11-04'
      }
    ]
  },
  {
    slug: 'docker-containers',
    title: 'Docker & Containerization for Developers',
    titleHindi: 'डॉकर और कंटेनराइजेशन: शून्य से प्रोडक्शन',
    category: 'tech-fundamentals',
    categoryLabel: 'Tech Fundamentals',
    level: 'intermediate',
    tags: ['Docker', 'DevOps', 'Containers', 'Linux', 'Microservices'],
    readingMinutes: 8,
    lastVerified: '2026-11-04',
    confidence: 'high',
    summary: '"It works on my machine" problem ka universal solution: lightweight Linux containers me applications aur unke dependencies ko package, run aur scale karna.',
    tldr: [
      'Container lightweight, isolated process environment hai jo host OS kernel share karta hai.',
      'Virtual Machine (VM) poora OS emulate karta hai (GBs me size, slow boot); Docker container MBs me hota hai aur milliseconds me start hota hai.',
      'Dockerfile blueprint hai -> `docker build` se Image banti hai -> `docker run` se Container chalta hai.',
      'Docker Compose multiple containers (e.g. Node.js backend + PostgreSQL DB + Redis cache) ko single YAML file se coordinate karta hai.'
    ],
    whyItMatters: 'Modern cloud deployment (AWS ECS, Kubernetes, GCP Cloud Run) container images par hi chalti hai. Agar aapka project Dockerized nahi hai, toh use enterprise production me deploy karna mushkil hai.',
    coreConcepts: [
      {
        heading: 'Writing an Optimized Production Dockerfile',
        content: 'Multi-stage build use karne se final image size 1GB se ghat kar 50MB ho jaati hai.',
        codeSnippet: {
          language: 'dockerfile',
          code: `# Multi-stage Dockerfile for FastAPI / Python
FROM python:3.11-slim AS builder
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

FROM python:3.11-slim
WORKDIR /app
COPY --from=builder /usr/local/lib/python3.11/site-packages /usr/local/lib/python3.11/site-packages
COPY src/ ./src
USER 1000
EXPOSE 8000
CMD ["python", "src/main.py"]`
        }
      }
    ],
    roadmapSteps: [
      'Step 1: Docker Desktop ya Colima install karein.',
      'Step 2: Basic commands: `docker ps`, `docker run -p 8080:80`, `docker stop`, `docker rm`.',
      'Step 3: Dockerfile likhna: `FROM`, `WORKDIR`, `COPY`, `RUN`, `CMD`.',
      'Step 4: `docker-compose.yml` se database + backend attach karna.',
      'Step 5: Docker image ko Docker Hub ya GitHub Container Registry (GHCR) par push karna.'
    ],
    handsOn: [
      {
        title: 'Containerize Any Local Web App',
        task: 'Apne kisi bhi portfolio ya hackathon web project ke liye Dockerfile aur docker-compose.yml likhein aur verify karein ki `docker compose up` se bina local setup ke app chal jaye.',
        deliverable: 'A tested Dockerfile committed to your project.'
      }
    ],
    mistakesAndMyths: [
      {
        myth: 'Container ke andar save kiya gaya data hamesha safe rehta hai.',
        reality: 'Containers ephemeral (temporary) hote hain. Container delete hote hi internal data delete ho jaata hai. Persistent data ke liye Docker Volumes (`-v my_data:/var/lib/postgresql/data`) zaroori hain.'
      }
    ],
    resources: [
      {
        type: 'video',
        title: 'Docker in 100 Seconds + Full Beginner Tutorial',
        url: 'https://www.youtube.com/watch?v=gAkwW2tuIqE',
        author: 'Fireship',
        language: 'en',
        duration: '12m',
        free: true,
        whyWatch: 'Fastest visual breakdown of images, containers, and layers.'
      }
    ],
    faqs: [
      {
        question: 'CMD aur ENTRYPOINT me kya difference hai?',
        answer: 'ENTRYPOINT wo primary command hai jo hamesha execute hoti hai. CMD default arguments provide karta hai jise container run karte waqt override kiya ja sakta hai.'
      }
    ],
    relatedSlugs: ['git-github-fundamentals', 'ai-chatbot-rag-project'],
    sources: [
      {
        title: 'Docker Documentation & Best Practices',
        url: 'https://docs.docker.com/',
        publisher: 'Docker Inc.',
        accessed: '2026-11-04'
      }
    ]
  },
  {
    slug: 'indian-constitution-basics',
    title: 'Indian Constitution: Preamble, Rights & Governance',
    titleHindi: 'भारतीय संविधान: प्रस्तावना, मौलिक अधिकार और शासन व्यवस्था',
    category: 'gov-policy',
    categoryLabel: 'Politics & Government',
    level: 'beginner',
    tags: ['Civics', 'Constitution', 'Fundamental Rights', 'Democracy', 'India'],
    readingMinutes: 8,
    lastVerified: '2026-11-04',
    confidence: 'high',
    summary: 'Duniya ke sabse bade likhit samvidhan ki buniyadi sanrachna: Preamble ke aadarsh, 6 Maulik Adhikar, aur Legislative-Executive-Judiciary ke beech Power Balance.',
    tldr: [
      '26 January 1950 ko lagu hua; Dr. B.R. Ambedkar drafting committee ke chairman the.',
      'Preamble Bharat ko Sovereign, Socialist, Secular, Democratic Republic ghoshit karta hai.',
      'Part III me Articles 12-35 ke andar 6 Fundamental Rights diye gaye hain.',
      'Basic Structure Doctrine (Kesavananda Bharati, 1973) ke tehat Parliament samvidhan ke mool dharche ko khatam nahi kar sakti.'
    ],
    whyItMatters: 'Ek jagruk nagrik aur tech professional ke taur par privacy rights (Article 21), freedom of speech (Article 19), aur state policy samajhna loktantra me sakriya rehne ke liye zaroori hai.',
    coreConcepts: [
      {
        heading: 'The 6 Fundamental Rights (Part III)',
        content: '1. Right to Equality (Arts. 14-18)\n2. Right to Freedom (Arts. 19-22: Speech, Assembly, Movement, Life & Personal Liberty)\n3. Right against Exploitation (Arts. 23-24)\n4. Right to Freedom of Religion (Arts. 25-28)\n5. Cultural and Educational Rights (Arts. 29-30)\n6. Right to Constitutional Remedies (Art. 32: Writs like Habeas Corpus, Mandamus - termed "Heart and Soul" of the Constitution).'
      },
      {
        heading: 'The 3 Pillars of Indian Democracy',
        content: 'Legislature (Sansad - Kanoon banati hai), Executive (Sarkar/Bureaucracy - Kanoon lagu karti hai), aur Judiciary (Supreme Court/High Courts - Kanoon ki samvidhanikta check karti hai). Separation of Powers in teeno ko balanced rakhta hai.'
      }
    ],
    roadmapSteps: [
      'Step 1: Preamble ke key terms (Justice, Liberty, Equality, Fraternity) padhein.',
      'Step 2: Article 19 (Speech) aur Article 21 (Right to Privacy - Puttaswamy judgment) samjhein.',
      'Step 3: Lok Sabha vs Rajya Sabha structure aur law passing process samjhein.',
      'Step 4: RTI Act (2005) aur Digital Personal Data Protection Act (DPDP) padhein.'
    ],
    handsOn: [
      {
        title: 'Draft an RTI Application',
        task: 'rtionline.gov.in portal par jaakar dekhein ki kisi public scheme ya university expenditure par authentic information kaise maangi jaati hai.',
        deliverable: 'A sample 5-point public RTI query format.'
      }
    ],
    mistakesAndMyths: [
      {
        myth: 'Fundamental Rights absolute hain aur unpar koi pabandi nahi lag sakti.',
        reality: 'Rights par "Reasonable Restrictions" (national security, public order, decency) lagayi ja sakti hain under Article 19(2).'
      }
    ],
    resources: [
      {
        type: 'doc',
        title: 'Constitution of India (Official Ministry of Law & Justice)',
        url: 'https://legislative.gov.in/constitution-of-india/',
        author: 'Govt of India',
        language: 'hi',
        free: true,
        whyWatch: 'Official updated text of Articles and Schedules in English and Hindi.'
      }
    ],
    faqs: [
      {
        question: 'Kya Right to Privacy ek Fundamental Right hai?',
        answer: 'Haan! 2017 ke historic K.S. Puttaswamy judgment me 9 judges ki bench ne unanimous faisla diya ki Privacy Article 21 (Right to Life) ka integral hissa hai.'
      }
    ],
    relatedSlugs: ['digital-india-upi-dbt'],
    sources: [
      {
        title: 'The Constitution of India (Official Gazetted Text)',
        url: 'https://legislative.gov.in/constitution-of-india/',
        publisher: 'Ministry of Law and Justice, Government of India',
        accessed: '2026-11-04'
      }
    ]
  },
  {
    slug: 'digital-india-upi-dbt',
    title: 'India Digital Public Infrastructure: UPI & Direct Benefit Transfer',
    titleHindi: 'डिजिटल इंडिया: यूपीआई, आधार और डायरेक्ट बेनिफिट ट्रांसफर',
    category: 'gov-policy',
    categoryLabel: 'Politics & Government',
    level: 'beginner',
    tags: ['UPI', 'Fintech', 'Digital India', 'Public Infrastructure', 'DBT'],
    readingMinutes: 7,
    lastVerified: '2026-11-04',
    confidence: 'high',
    summary: 'India Stack (Aadhaar, UPI, Account Aggregator) ka engineering aur economic model: kaise open APIs aur government-backed rails ne duniya ka sabse bada real-time digital payment ecosystem khada kiya.',
    tldr: [
      'India Stack 3 layers par tika hai: Identity (Aadhaar), Payments (UPI), aur Data (Account Aggregator).',
      'UPI (Unified Payments Interface) NPCI dwara run kiya jata hai aur har mahine 15+ billion transactions process karta hai.',
      'Direct Benefit Transfer (DBT) ne middlemen ko hata kar subsidies sidhe beneficiary ke bank account me pahunchayi.',
      'Private monopolies (Visa/Mastercard duopoly) ke badle open interoperable network create kiya gaya.'
    ],
    whyItMatters: 'IMF aur World Bank ne India ke DPI (Digital Public Infrastructure) ko global benchmark maana hai. Global tech leaders is model ko France, Singapore, aur UAE me implement kar rahe hain.',
    coreConcepts: [
      {
        heading: 'Why UPI Succeeded: The 2-Tier Architecture',
        content: 'US me har app (Venmo, CashApp) ek "walled garden" hai. UPI me NPCI ne ek interoperable switch banaya: PhonePe ka user Google Pay ya Paytm user ko instant send kar sakta hai via Virtual Payment Address (VPA / UPI ID) using IMPS protocols.'
      }
    ],
    roadmapSteps: [
      'Step 1: NPCI and IMPS architecture samjhein.',
      'Step 2: Virtual Payment Address (VPA) resolution aur 2-factor authentication flow padhein.',
      'Step 3: ONDC (Open Network for Digital Commerce) aur Account Aggregator framework explore karein.'
    ],
    handsOn: [
      {
        title: 'Integrate UPI QR or Intent in a Python/Web Project',
        task: 'Ek simple web page banayein jo `upi://pay?pa=...&pn=...&am=100` URI generate kare jisse mobile me click karte hi UPI app khul jaye.',
        deliverable: 'A working UPI intent link generator.'
      }
    ],
    mistakesAndMyths: [
      {
        myth: 'UPI ka paisa PhonePe ya Google Pay ke wallets me rehta hai.',
        reality: 'UPI transactions bank-to-bank direct hote hain. Third-party apps sirf user interface provide karte hain.'
      }
    ],
    resources: [
      {
        type: 'doc',
        title: 'National Payments Corporation of India (NPCI) Product Architecture',
        url: 'https://www.npci.org.in/what-we-do/upi/product-overview',
        author: 'NPCI',
        language: 'en',
        free: true,
        whyWatch: 'Official architectural specifications of UPI specifications.'
      }
    ],
    faqs: [
      {
        question: 'UPI par charges kyu nahi lagte?',
        answer: 'P2P (person to person) transactions completely free hain. P2M (merchant) transactions par Zero MDR policy ke tehat consumer cost zero rakhi gayi hai taaki cash se digital adoption tezi se ho.'
      }
    ],
    relatedSlugs: ['indian-constitution-basics', 'ai-chatbot-rag-project'],
    sources: [
      {
        title: 'World Bank G20 Policy Note on Digital Public Infrastructure',
        url: 'https://www.worldbank.org/en/news/press-release/2023/09/14/g20-india-digital-public-infrastructure',
        publisher: 'World Bank Group, 2023',
        accessed: '2026-11-04'
      }
    ]
  },
  {
    slug: 'ai-chatbot-rag-project',
    title: 'Full-Stack Project: Autonomous RAG Knowledge Assistant',
    titleHindi: 'प्रोजेक्ट: ऑटोनॉमस RAG नॉलेज असिस्टेंट',
    category: 'projects',
    categoryLabel: 'Projects Hub',
    level: 'intermediate',
    tags: ['FastAPI', 'React', 'ChromaDB', 'Python', 'Portfolio Project'],
    readingMinutes: 9,
    lastVerified: '2026-11-04',
    confidence: 'high',
    summary: 'A complete end-to-end full-stack portfolio project: FastAPI backend, ChromaDB vector store, local open-source LLM, and modern React/Tailwind chat UI with citation rendering.',
    tldr: [
      'Problem: Users ko 50-page company reports ya books se answers dhundhne me ghanto lagte hain.',
      'Solution: Ek production web application jo PDF upload leti hai, vectors banati hai, aur exact page reference ke sath answer deti hai.',
      'Stack: Backend: FastAPI + LangChain + ChromaDB. Frontend: React + Tailwind CSS.',
      'Resume value: High! Demonstrates real AI engineering beyond simple API wrapper calls.'
    ],
    whyItMatters: 'Sirf "Todo App" ya "Calculator" banane se placements me interviewers impress nahi hote. Production RAG app unhe dikhata hai ki aap modern AI software stack sambhal sakte hain.',
    coreConcepts: [
      {
        heading: 'Architecture Breakdown',
        content: 'Client (React) -> POST /upload (FastAPI saves & chunks PDF) -> Embeddings (SentenceTransformers) -> Vector Store (ChromaDB) -> POST /query (Cosine Top-k search) -> LLM Prompt -> Streaming Response with Citations.'
      }
    ],
    roadmapSteps: [
      'Phase 1: FastAPI endpoint banayein jo PDF parse karke chunks return kare.',
      'Phase 2: ChromaDB me persistence aur embeddings store karein.',
      'Phase 3: Query endpoint banayein jo relevant context extract kare.',
      'Phase 4: React me streaming markdown response render karein with citations drawer.',
      'Phase 5: Dockerfile likhein aur Render/HuggingFace Spaces par deploy karein.'
    ],
    handsOn: [
      {
        title: 'Deploy to Free Cloud',
        task: 'Is project ko Dockerize karke HuggingFace Spaces ya Render.com par free tier me live deploy karein.',
        deliverable: 'Live working URL you can put at the top of your resume.'
      }
    ],
    mistakesAndMyths: [
      {
        myth: 'AI projects me proprietary OpenAI API key use karna zaroori hai.',
        reality: 'Open-source models (Ollama, Mistral-7B, HuggingFace Inference API) use karke zero-cost AI projects banaye ja sakte hain.'
      }
    ],
    resources: [
      {
        type: 'tool',
        title: 'ChromaDB Open-Source AI Vector Database',
        url: 'https://www.trychroma.com/',
        author: 'Chroma Team',
        language: 'en',
        free: true,
        whyWatch: 'Lightweight local database perfect for embedding storage.'
      }
    ],
    faqs: [
      {
        question: 'Resume me is project ko kaise likhein?',
        answer: 'Built full-stack RAG assistant parsing 500+ page technical documents; indexed vectors in ChromaDB with cosine similarity, reducing information discovery time by 75%.'
      }
    ],
    relatedSlugs: ['rag', 'prompt-engineering', 'docker-containers'],
    sources: [
      {
        title: 'Building Production RAG Systems (LangChain Engineering Blog)',
        url: 'https://blog.langchain.dev/',
        publisher: 'LangChain AI',
        accessed: '2026-11-04'
      }
    ]
  },
  {
    slug: 'qrng-quantum-project',
    title: 'Hands-on Project: Quantum Random Number Generator in Python',
    titleHindi: 'प्रोजेक्ट: पायथन में क्वांटम रैंडम नंबर जनरेटर',
    category: 'projects',
    categoryLabel: 'Projects Hub',
    level: 'beginner',
    tags: ['Quantum', 'Python', 'Qiskit', 'Security', 'Beginner Project'],
    readingMinutes: 6,
    lastVerified: '2026-11-04',
    confidence: 'high',
    summary: 'Classical pseudo-random generators ke badle quantum physics ke true physical randomness (Hadamard gate superposition) ka use karke high-entropy cryptographic keys generate karna.',
    tldr: [
      'Classical computers me `random.random()` pseudo-random hota hai (mathematical algorithm based, predictable if seed is known).',
      'Quantum measurement inherently non-deterministic hoti hai (Born rule: P = |ψ|²).',
      'Qiskit me 5 lines me true random bit generator circuit ban jaata hai.',
      'Cryptography aur gaming ke liye uncrackable true entropy provide karta hai.'
    ],
    whyItMatters: 'Agar aap resume me "Quantum Computing" likhte hain, toh interviewer ka pehla sawal hota hai: "Koi hands-on code ya circuit banaya hai?". Ye project zero se banaya ja sakta hai aur solid proof of concept hai.',
    coreConcepts: [
      {
        heading: 'Complete Runnable Code',
        content: 'Ye script run karte hi true quantum randomness generate karti hai:',
        codeSnippet: {
          language: 'python',
          code: `from qiskit import QuantumCircuit
from qiskit.primitives import StatevectorSampler

def generate_quantum_bits(num_bits=8):
    qc = QuantumCircuit(num_bits, num_bits)
    for i in range(num_bits):
        qc.h(i)  # Put all qubits into equal superposition
    qc.measure(range(num_bits), range(num_bits))
    
    sampler = StatevectorSampler()
    result = sampler.run([(qc)]).result()[0]
    bitstring = list(result.data.c.get_counts().keys())[0]
    return bitstring, int(bitstring, 2)

bits, decimal_val = generate_quantum_bits(8)
print(f"Generated 8-bit Quantum Random Number: {decimal_val} (Binary: {bits})")`
        }
      }
    ],
    roadmapSteps: [
      'Step 1: `pip install qiskit` install karein.',
      'Step 2: Single qubit Hadamard circuit verify karein.',
      'Step 3: Multi-bit byte generator function likhein.',
      'Step 4: Chi-square test run karke classical PRNG vs Quantum RNG ki uniformity compare karein.'
    ],
    handsOn: [
      {
        title: 'Build a Quantum Password Generator CLI',
        task: 'Ek CLI tool banayein jo quantum random bits ko alphanumeric characters me map karke 16-character true random passwords banaye.',
        deliverable: 'A clean command-line python tool on GitHub.'
      }
    ],
    mistakesAndMyths: [
      {
        myth: 'Is project ke liye real multi-million dollar quantum computer khareedna padega.',
        reality: 'IBM Quantum platform free tier me real quantum chips par cloud se execution allow karta hai, aur local Qiskit simulator se offline bhi chalaya ja sakta hai.'
      }
    ],
    resources: [
      {
        type: 'doc',
        title: 'Qiskit Getting Started Guide',
        url: 'https://docs.quantum.ibm.com/start',
        author: 'IBM Quantum',
        language: 'en',
        free: true,
        whyWatch: 'Zero-setup guide for writing quantum circuits in Python.'
      }
    ],
    faqs: [
      {
        question: 'Pseudo-random aur True Quantum Random me security ka kya difference hai?',
        answer: 'Pseudo-random generator agar seed leak ho jaye toh saari future keys predict ho sakti hain. Quantum measurement nature ke fundamental law par chalti hai jise koi hacker predict nahi kar sakta.'
      }
    ],
    relatedSlugs: ['qubits-superposition', 'shor-grover'],
    sources: [
      {
        title: 'Quantum Random Number Generation on Cloud-Based Quantum Computers',
        url: 'https://arxiv.org/abs/2004.14441',
        publisher: 'IEEE Transactions on Quantum Engineering',
        accessed: '2026-11-04'
      }
    ]
  }
];

export const CATEGORIES = [
  { id: 'ai-ml', name: 'AI & Machine Learning', icon: '🤖', description: 'LLMs, RAG, Prompt Engineering, Agents & Transformers' },
  { id: 'quantum', name: 'Quantum Computing', icon: '⚛️', description: 'Qubits, Superposition, Shor, Grover & Qiskit' },
  { id: 'career', name: 'Career & Placement', icon: '💼', description: 'DSA, Off-campus strategies, Resumes & Interview Playbooks' },
  { id: 'projects', name: 'Projects Hub', icon: '🛠️', description: 'Step-by-step production-grade portfolio projects' },
  { id: 'tech-fundamentals', name: 'Tech Fundamentals', icon: '⚡', description: 'Git, GitHub, Docker, Linux, APIs & Core Systems' },
  { id: 'gov-policy', name: 'Politics & Governance', icon: '🏛️', description: 'Constitution, Digital India, UPI, DBT & Public Policy' }
];
