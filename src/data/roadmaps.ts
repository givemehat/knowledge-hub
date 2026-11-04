export interface RoadmapNode {
  id: string;
  title: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  estimatedHours: number;
  description: string;
  keyTopics: string[];
  recommendedResources: { title: string; url: string; free: boolean }[];
  category: string;
  checkpointTask: string;
}

export interface Roadmap {
  slug: string;
  title: string;
  titleHindi?: string;
  subtitle: string;
  estimatedWeeks: number;
  difficulty: 'Beginner to Advanced' | 'Intermediate to Pro';
  nodes: RoadmapNode[];
}

export const ROADMAPS: Roadmap[] = [
  {
    slug: 'dsa-placement',
    title: 'DSA & Placement Mastery Roadmap',
    titleHindi: 'डीएसए और कॉलेज प्लेसमेंट संपूर्ण रोडमैप',
    subtitle: 'From zero coding to cracking top tech company online assessments and technical interviews in 24 weeks.',
    estimatedWeeks: 24,
    difficulty: 'Beginner to Advanced',
    nodes: [
      {
        id: 'phase-1-fundamentals',
        title: 'Phase 1: Language Mastery & Time Complexity',
        level: 'beginner',
        estimatedHours: 35,
        description: 'Master one language deeply (C++ STL or Java Collections or Python) and build an intuitive grasp of Big-O asymptotic notation.',
        keyTopics: ['Space & Time Complexity (O(1), O(N), O(log N), O(N²))', 'Vectors / ArrayLists internals', 'HashMaps & HashSets amortized complexity', 'Recursion & Call Stack visualization'],
        recommendedResources: [
          { title: "Striver's Time & Space Complexity Masterclass", url: 'https://takeuforward.org', free: true },
          { title: 'NeetCode Big-O Notation Visualized', url: 'https://neetcode.io', free: true }
        ],
        category: 'Foundations',
        checkpointTask: 'Solve 15 beginner problems on arrays and hashing on LeetCode without looking at hints.'
      },
      {
        id: 'phase-2-linear-ds',
        title: 'Phase 2: Core Linear DS & Two-Pointer Patterns',
        level: 'beginner',
        estimatedHours: 45,
        description: 'Master sliding window, two-pointer techniques, monotonic stacks, and linked list cycle detection.',
        keyTopics: ['Two Pointers (Dutch National Flag, 3Sum)', 'Sliding Window (Variable & Fixed size)', 'Monotonic Stack (Next Greater Element)', 'Fast & Slow Pointers (Floyd Cycle Detection)'],
        recommendedResources: [
          { title: 'LeetCode 75 Curated Study Plan', url: 'https://leetcode.com/studyplan/leetcode-75/', free: true }
        ],
        category: 'Core Data Structures',
        checkpointTask: 'Solve "Trapping Rain Water" and "Longest Substring Without Repeating Characters".'
      },
      {
        id: 'phase-3-trees-graphs',
        title: 'Phase 3: Hierarchical Structures (Trees & BSTs)',
        level: 'intermediate',
        estimatedHours: 50,
        description: 'Understand recursive tree traversals, level-order BFS, Lowest Common Ancestor, and Binary Search Tree properties.',
        keyTopics: ['Tree Traversals (Inorder, Preorder, Postorder, Level Order)', 'Binary Search Tree validation and deletion', 'Diameter and Maximum Path Sum of Tree', 'Lowest Common Ancestor (LCA)'],
        recommendedResources: [
          { title: 'NeetCode 150 Trees Section', url: 'https://neetcode.io/practice', free: true }
        ],
        category: 'Trees & Graphs',
        checkpointTask: 'Implement Serialize and Deserialize Binary Tree without recursive stack overflow.'
      },
      {
        id: 'phase-4-graphs-advanced',
        title: 'Phase 4: Graphs & Shortest Path Algorithms',
        level: 'intermediate',
        estimatedHours: 55,
        description: 'Graph representations, cycle detection, Topological Sorting (Kahn Algorithm), Dijkstra, and Disjoint Set Union (DSU).',
        keyTopics: ['Breadth-First Search (BFS) & Depth-First Search (DFS)', 'Topological Sort (Kahn Algorithm)', 'Dijkstra Shortest Path with Min-Heap', 'Disjoint Set Union (Union by Rank + Path Compression)'],
        recommendedResources: [
          { title: 'WilliamFiset Graph Theory Playlist', url: 'https://www.youtube.com/@WilliamFiset-videos', free: true }
        ],
        category: 'Trees & Graphs',
        checkpointTask: 'Solve "Course Schedule II" and "Cheapest Flights Within K Stops".'
      },
      {
        id: 'phase-5-dp',
        title: 'Phase 5: Dynamic Programming & Greedy',
        level: 'advanced',
        estimatedHours: 60,
        description: 'Overlapping subproblems, state definition, memoization vs tabulation, knapsack patterns, and multidimensional DP.',
        keyTopics: ['1D DP (Climbing Stairs, House Robber)', '0/1 Knapsack & Unbounded Knapsack', 'Longest Common Subsequence (LCS) & LIS', 'Grid DP (Unique Paths, Minimum Path Sum)'],
        recommendedResources: [
          { title: 'Errichto Dynamic Programming Beginners Guide', url: 'https://youtube.com/errichto', free: true }
        ],
        category: 'Advanced Algorithms',
        checkpointTask: 'Solve "Edit Distance" and "Longest Increasing Subsequence in O(N log N)".'
      },
      {
        id: 'phase-6-interviews',
        title: 'Phase 6: Core CS, System Design & Mock Interviews',
        level: 'intermediate',
        estimatedHours: 40,
        description: 'Revise Operating Systems, DBMS indexing and concurrency, Networking basics, and conduct peer mock interviews.',
        keyTopics: ['OS (Deadlocks, Virtual Memory, Process vs Threads)', 'DBMS (B+ Trees, SQL Joins, ACID transactions)', 'Low-Level Design (OOP Solid Principles)', 'Pramp Peer Mock Interviews'],
        recommendedResources: [
          { title: 'Pramp Free Peer Mock Interviews', url: 'https://www.pramp.com', free: true }
        ],
        category: 'Interview Polish',
        checkpointTask: 'Complete 3 full peer mock interviews and score above 80% on feedback.'
      }
    ]
  },
  {
    slug: 'ai-ml-engineer',
    title: 'Modern AI/ML & LLM Engineer Roadmap',
    titleHindi: 'आधुनिक AI/ML और LLM इंजीनियर रोडमैप',
    subtitle: 'From linear algebra and classical ML to building production RAG pipelines, fine-tuning LLMs, and MLOps deployment.',
    estimatedWeeks: 26,
    difficulty: 'Intermediate to Pro',
    nodes: [
      {
        id: 'ml-phase-1-math',
        title: 'Phase 1: Python, Linear Algebra & Calculus',
        level: 'beginner',
        estimatedHours: 40,
        description: 'Build mathematical foundations: vector spaces, matrix multiplication, eigenvalues, gradient descent partial derivatives, and probability.',
        keyTopics: ['NumPy vectorization and broadcasting', 'Matrix Transformations & SVD', 'Gradient Descent & Cost Functions', 'Pandas data cleaning & exploratory analysis'],
        recommendedResources: [
          { title: '3Blue1Brown: Essence of Linear Algebra', url: 'https://www.3blue1brown.com/topics/linear-algebra', free: true },
          { title: 'StatQuest: Machine Learning Fundamentals', url: 'https://statquest.org', free: true }
        ],
        category: 'Foundations',
        checkpointTask: 'Code Gradient Descent from scratch in pure Python and NumPy without scikit-learn.'
      },
      {
        id: 'ml-phase-2-classical',
        title: 'Phase 2: Classical Machine Learning & Feature Engineering',
        level: 'beginner',
        estimatedHours: 45,
        description: 'Supervised and unsupervised models, cross-validation, regularization (L1/L2), and evaluation metrics (Precision, Recall, ROC-AUC).',
        keyTopics: ['Linear & Logistic Regression', 'Decision Trees, Random Forests, XGBoost', 'K-Means Clustering & PCA dimensionality reduction', 'Cross-Validation & Hyperparameter Tuning'],
        recommendedResources: [
          { title: 'Scikit-Learn Official User Guide', url: 'https://scikit-learn.org/stable/user_guide.html', free: true }
        ],
        category: 'Classical ML',
        checkpointTask: 'Build a Kaggle tabular competition baseline model with XGBoost reaching top 25% score.'
      },
      {
        id: 'ml-phase-3-deep-learning',
        title: 'Phase 3: Deep Learning Foundations & PyTorch',
        level: 'intermediate',
        estimatedHours: 55,
        description: 'Feedforward neural networks, backpropagation math, activation functions, loss landscapes, and PyTorch autograd engine.',
        keyTopics: ['PyTorch Tensors, Datasets, and DataLoaders', 'CNNs for Computer Vision', 'RNNs & LSTMs sequence processing', 'Overfitting remedies (Dropout, BatchNorm, LayerNorm)'],
        recommendedResources: [
          { title: 'Fast.ai Practical Deep Learning for Coders', url: 'https://course.fast.ai', free: true }
        ],
        category: 'Deep Learning',
        checkpointTask: 'Train a custom image classification model on PyTorch and export weights via TorchScript.'
      },
      {
        id: 'ml-phase-4-transformers',
        title: 'Phase 4: Transformers Architecture & NLP',
        level: 'intermediate',
        estimatedHours: 60,
        description: 'Understand the Self-Attention mechanism, Positional Embeddings, BERT encoders, GPT decoders, and Byte-Pair Tokenization.',
        keyTopics: ['Scaled Dot-Product Attention & Multi-Head Attention', 'HuggingFace Transformers ecosystem', 'HuggingFace Datasets & Tokenizers', 'Pre-training vs Instruction Tuning'],
        recommendedResources: [
          { title: 'HuggingFace NLP Course', url: 'https://huggingface.co/learn/nlp-course', free: true }
        ],
        category: 'Generative AI',
        checkpointTask: 'Replicate Andrej Karpathy nanoGPT character-level model on local GPU.'
      },
      {
        id: 'ml-phase-5-rag-agents',
        title: 'Phase 5: Production RAG, Embeddings & Agents',
        level: 'advanced',
        estimatedHours: 50,
        description: 'Build production-grade retrieval systems with dense vector search, hybrid retrieval, and tool-calling AI agents.',
        keyTopics: ['ChromaDB / Qdrant / Pinecone vector indexes', 'Semantic Chunking & Re-ranking models', 'ReAct Agent framing & Tool Calling', 'RAG evaluation frameworks (Ragas, TruLens)'],
        recommendedResources: [
          { title: 'LangChain and LlamaIndex Official Docs', url: 'https://docs.langchain.com', free: true }
        ],
        category: 'Applied GenAI',
        checkpointTask: 'Deploy an end-to-end RAG assistant with citation drawer and evaluation score > 0.85.'
      },
      {
        id: 'ml-phase-6-mlops',
        title: 'Phase 6: MLOps, Quantization & Serving',
        level: 'advanced',
        estimatedHours: 40,
        description: 'Model quantization (GGUF, AWQ), high-throughput serving (vLLM, Ollama), Docker containerization, and monitoring.',
        keyTopics: ['vLLM inference acceleration (PagedAttention)', 'Quantization (4-bit, 8-bit GGUF)', 'FastAPI asynchronous model serving', 'Dockerization and Cloud deployment (RunPod, Modal, GCP)'],
        recommendedResources: [
          { title: 'vLLM Fast LLM Serving Documentation', url: 'https://docs.vllm.ai', free: true }
        ],
        category: 'Production & MLOps',
        checkpointTask: 'Containerize and host a quantized model with vLLM behind a FastAPI rate-limited proxy.'
      }
    ]
  }
];
