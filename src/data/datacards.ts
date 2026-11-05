export interface DataCardColumn {
  name: string;
  type: string;
  description: string;
  descriptionEn?: string;
}

export interface DataCard {
  id: string;
  datasetName: string;
  datasetNameHi?: string;
  creator: string;
  sourceUrl: string;
  license: string;
  timeRange: string;
  timeRangeHi?: string;
  sampleCount: string;
  sampleCountHi?: string;
  size: string;
  columns: DataCardColumn[];
  description: string;
  descriptionEn?: string;
  intendedUse: string;
  intendedUseEn?: string;
  limitationsAndBiases: string[];
  limitationsAndBiasesEn?: string[];
  cleaningSteps: string[];
  cleaningStepsEn?: string[];
}

export const DATA_CARDS: DataCard[] = [
  {
    id: 'india-news-headlines',
    datasetName: 'India News Headlines Dataset',
    datasetNameHi: 'इंडिया न्यूज़ हेडलाइन्स डेटासेट',
    creator: 'Rohit Kulkarni (therohk)',
    sourceUrl: 'https://www.kaggle.com/datasets/therohk/india-headlines-news-dataset',
    license: 'CC0: Public Domain',
    timeRange: '2001-01-01 to 2023-06-30 (22+ Years)',
    timeRangeHi: '2001-01-01 से 2023-06-30 (22+ वर्ष)',
    sampleCount: '3.8+ Million News Headlines',
    sampleCountHi: '38 लाख से अधिक समाचार शीर्षक',
    size: '~240 MB (Uncompressed CSV)',
    columns: [
      {
        name: 'publish_date',
        type: 'Integer (yyyyMMdd)',
        description: 'समाचार प्रकाशन की तिथि (उदा. 20010101)',
        descriptionEn: 'News publication date (e.g. 20010101)'
      },
      {
        name: 'headline_category',
        type: 'String',
        description: 'समाचार श्रेणी या शहर टैग (उदा. business.india, city.delhi)',
        descriptionEn: 'News category or city tag (e.g. business.india, city.delhi)'
      },
      {
        name: 'headline_text',
        type: 'String',
        description: 'समाचार का मूल शीर्षक (Headlines text in English)',
        descriptionEn: 'Original headline text in English'
      }
    ],
    description: 'भारत के प्रमुख अंग्रेजी दैनिक The Times of India के दो दशकों से अधिक के ऐतिहासिक समाचार शीर्षकों का व्यापक संग्रह। इसमें राष्ट्रीय, अंतरराष्ट्रीय, व्यापारिक और स्थानीय समाचार शामिल हैं।',
    descriptionEn: 'Comprehensive longitudinal archive of over two decades of news headlines from India’s leading English daily, The Times of India, spanning national, international, business, and metropolitan reporting.',
    intendedUse: 'दीर्घकालिक मीडिया सेंटीमेंट, टोन में ऐतिहासिक बदलाव, और राष्ट्रीय घटनाओं के दौरान भाषा के उपयोग का सांख्यिकीय और टाइम-सीरीज़ विश्लेषण।',
    intendedUseEn: 'Statistical and time-series evaluation of longitudinal media sentiment, historical shifts in journalistic tone, and framing dynamics during pivotal national crises.',
    limitationsAndBiases: [
      'एक ही मुख्यधारा अंग्रेजी दैनिक पर केंद्रित होने के कारण शहरी, कॉर्पोरेट और मध्यवर्गीय प्राथमिकताओं का संभावित पूर्वाग्रह (Selection Bias)।',
      'शीर्षक की लंबाई 10-15 शब्दों तक सीमित होने के कारण लेख के विस्तृत संदर्भ (Nuance) का अभाव।',
      '2001 से 2005 के शुरुआती वर्षों में डिजिटल आर्काइविंग की असमानता के कारण मासिक वॉल्यूम में भिन्नता।'
    ],
    limitationsAndBiasesEn: [
      'Selection bias toward urban, corporate, and middle-class perspectives given its focus on a single mainstream English-language daily.',
      'Headlines are restricted to 10–15 words, omitting the full contextual nuance of comprehensive investigative reporting.',
      'Variations in early digital archiving between 2001 and 2005 causing moderate discrepancies in monthly data density.'
    ],
    cleaningSteps: [
      'डुप्लीकेट पंक्तियों और शून्य टेक्स्ट वाले शीर्षकों का निष्कासन (Deduplication)।',
      'तारीख स्ट्रिंग को ISO 8601 YYYY-MM-DD प्रारूप में पार्स करना।',
      'HTML एंटिटीज़ (&amp;, &quot;) और विशेष वर्णों का सामान्यीकरण।',
      'शहर-विशिष्ट टैग्स को 5 मुख्य श्रेणियों (Business, Politics, National, World, Tech/Sports) में समूहीकृत करना।'
    ],
    cleaningStepsEn: [
      'Algorithmic deduplication of verbatim duplicate rows and zero-length headline records.',
      'Parsing integer date representations into ISO 8601 standard YYYY-MM-DD formats.',
      'Normalization of HTML character entities (&amp;, &quot;) and corrupted unicode strings.',
      'Harmonization of municipal and regional tags into 5 unified high-level categories (Business, Politics, National, World, Tech/Sports).'
    ]
  },
  {
    id: 'bbc-hindi-news',
    datasetName: 'BBC News Hindi Articles - Detailed',
    datasetNameHi: 'बीबीसी न्यूज़ हिंदी आर्टिकल्स - विस्तृत',
    creator: 'Aadi Srivastava (DisisBig)',
    sourceUrl: 'https://www.kaggle.com/datasets/disisbig/hindi-news-data',
    license: 'CC BY 4.0 (Creative Commons Attribution 4.0 International)',
    timeRange: '2016 to 2021',
    timeRangeHi: '2016 से 2021',
    sampleCount: '4,335 Full-Length Articles & Headlines',
    sampleCountHi: '4,335 पूर्ण लेख और शीर्षक',
    size: '~12 MB',
    columns: [
      {
        name: 'heading',
        type: 'String (Devanagari)',
        description: 'हिंदी समाचार शीर्षक',
        descriptionEn: 'Hindi news headline in standard Devanagari script'
      },
      {
        name: 'article',
        type: 'String (Devanagari)',
        description: 'पूर्ण लेख का मूल पाठ (Full body text)',
        descriptionEn: 'Full article body text in standard Devanagari'
      },
      {
        name: 'category',
        type: 'String',
        description: 'श्रेणी (उदा. india, international, entertainment, sport, science)',
        descriptionEn: 'Editorial category (e.g. india, international, entertainment, sport, science)'
      }
    ],
    description: 'बीबीसी हिंदी पोर्टल से संकलित उच्च-गुणवत्ता वाले संपादकीय और समाचार आलेखों का स्वच्छ डेटासेट। यह मानक देवनागरी लिपि में हिंदी भाषा के टोन और भावना का अध्ययन करने के लिए आदर्श है।',
    descriptionEn: 'Curated corpus of high-integrity editorial articles collected from the BBC Hindi service, providing a benchmark for studying Devanagari sentiment and linguistic framing.',
    intendedUse: 'हिंदी एनएलपी (NLP), क्रॉस-लिंगुअल सेंटीमेंट विश्लेषण (IndicBERT / MuRIL), और अंग्रेजी बनाम हिंदी मीडिया की तुलनात्मक प्रस्तुति।',
    intendedUseEn: 'Indic Natural Language Processing, cross-lingual sentiment benchmarking via IndicBERT and MuRIL, and comparative evaluation of English vs. Hindi media framing.',
    limitationsAndBiases: [
      'बीबीसी की वैश्विक संपादकीय शैली होने के कारण यह भारतीय स्थानीय भाषाई दैनिकों की तुलना में अधिक संयमित भाषा का उपयोग करता है।',
      'आलेखों की संख्या (4,335) लाखों में नहीं है, इसलिए इसे बड़े सांख्यिकीय मॉडल्स के लिए एक प्रतिनिधि गुणात्मक और सत्यापन नमूने के रूप में उपयोग किया जाता है।'
    ],
    limitationsAndBiasesEn: [
      'Reflects BBC’s sober international editorial guidelines, exhibiting less sensationalism than regional vernacular broadsheets.',
      'Sample size (4,335) serves as a qualitative and validation baseline rather than a high-volume parametric training corpus.'
    ],
    cleaningSteps: [
      'देवनागरी यूनिकोड सामान्यीकरण (Unicode NFC Normalization)।',
      'विराम चिह्नों, खड़ी पाई (|) और हाइपरलिंक्स की सफाई।',
      'स्टॉपवर्ड्स और संख्यात्मक पंक्तियों का भाषाई फ़िल्टरिंग।'
    ],
    cleaningStepsEn: [
      'Unicode NFC normalization across all Devanagari codepoints and conjuncts.',
      'Algorithmic stripping of punctuation, viram symbols, and inline web hyperlinks.',
      'Indic language stopword filtering and deduplication of repeated wire agency summaries.'
    ]
  },
  {
    id: 'news-category-dataset',
    creator: 'Rishabh Misra',
    datasetName: 'News Category Dataset (HuffPost)',
    datasetNameHi: 'न्यूज़ कैटेगरी डेटासेट (हफ़पोस्ट)',
    sourceUrl: 'https://www.kaggle.com/datasets/rmisra/news-category-dataset',
    license: 'CC BY 4.0',
    timeRange: '2012 to 2022',
    timeRangeHi: '2012 से 2022',
    sampleCount: '210,000+ Headlines & Summaries',
    sampleCountHi: '2,10,000+ शीर्षक और सार',
    size: '~60 MB (JSON Lines)',
    columns: [
      {
        name: 'category',
        type: 'String',
        description: 'समाचार की श्रेणी (कुल 42 श्रेणियां, जैसे POLITICS, WELLNESS, TECH)',
        descriptionEn: 'Editorial topic category (42 categories including POLITICS, WELLNESS, TECH)'
      },
      {
        name: 'headline',
        type: 'String',
        description: 'समाचार शीर्षक',
        descriptionEn: 'Headline title text'
      },
      {
        name: 'authors',
        type: 'String',
        description: 'लेखक का नाम',
        descriptionEn: 'Byline contributing authors'
      },
      {
        name: 'link',
        type: 'String',
        description: 'मूल लेख का यूआरएल',
        descriptionEn: 'Canonical original article URL'
      },
      {
        name: 'short_description',
        type: 'String',
        description: 'संक्षिप्त विवरण या सार',
        descriptionEn: 'Editorial summary or dek description'
      },
      {
        name: 'date',
        type: 'String (YYYY-MM-DD)',
        description: 'प्रकाशन तिथि',
        descriptionEn: 'Publication date in YYYY-MM-DD format'
      }
    ],
    description: '2012 से 2022 के बीच प्रकाशित हफ़पोस्ट (HuffPost) के 210 हज़ार से अधिक समाचारों का वैश्विक संदर्भ डेटासेट। यह अंतरराष्ट्रीय मीडिया में सनसनीखेज शीर्षकों और भावनात्मक शब्दों के तुलनात्मक आधार के रूप में कार्य करता है।',
    descriptionEn: 'Benchmark international reference dataset containing 210,000+ news articles published by HuffPost between 2012 and 2022, enabling cross-cultural comparisons of clickbait intensity and emotional valence.',
    intendedUse: 'श्रेणी-वार भावना (category-wise sentiment variance) और पश्चिमी बनाम एशियाई मीडिया टोन की तुलना।',
    intendedUseEn: 'Benchmarking category-wise sentiment variance and cross-cultural tone differences between Western digital-first journalism and Indian reporting.',
    limitationsAndBiases: [
      'अमेरिकी और पश्चिमी दृष्टिकोण का प्रभुत्व।',
      'डिजिटल-फर्स्ट मीडिया होने के कारण क्लिकबेट और एंगेजमेंट-आधारित शीर्षकों का उच्च अनुपात।'
    ],
    limitationsAndBiasesEn: [
      'Predominantly reflective of North American and Western geopolitical perspectives.',
      'Elevated ratio of engagement-driven clickbait headlines typical of digital-first publishing models.'
    ],
    cleaningSteps: [
      'खाली विवरण और अनुपलब्ध लिंक वाले रिकॉर्ड्स को हटाना।',
      'श्रेणियों को 8 समेकित मुख्य डोमेन में री-मैप करना।'
    ],
    cleaningStepsEn: [
      'Pruning of null short-description entries and dead web links.',
      'Consolidation of 42 granular categories into 8 standardized high-level domains.'
    ]
  }
];
