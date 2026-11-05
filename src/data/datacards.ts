export interface DataCard {
  id: string;
  datasetName: string;
  creator: string;
  sourceUrl: string;
  license: string;
  timeRange: string;
  sampleCount: string;
  size: string;
  columns: { name: string; type: string; description: string }[];
  description: string;
  intendedUse: string;
  limitationsAndBiases: string[];
  cleaningSteps: string[];
}

export const DATA_CARDS: DataCard[] = [
  {
    id: 'india-news-headlines',
    datasetName: 'India News Headlines Dataset',
    creator: 'Rohit Kulkarni (therohk)',
    sourceUrl: 'https://www.kaggle.com/datasets/therohk/india-headlines-news-dataset',
    license: 'CC0: Public Domain',
    timeRange: '2001-01-01 to 2023-06-30 (22+ Years)',
    sampleCount: '3.8+ Million News Headlines',
    size: '~240 MB (Uncompressed CSV)',
    columns: [
      { name: 'publish_date', type: 'Integer (yyyyMMdd)', description: 'समाचार प्रकाशन की तिथि (उदा. 20010101)' },
      { name: 'headline_category', type: 'String', description: 'समाचार श्रेणी या शहर टैग (उदा. business.india, city.delhi)' },
      { name: 'headline_text', type: 'String', description: 'समाचार का मूल शीर्षक (Headlines text in English)' }
    ],
    description: 'भारत के प्रमुख अंग्रेजी दैनिक The Times of India के दो दशकों से अधिक के ऐतिहासिक समाचार शीर्षकों का व्यापक संग्रह। इसमें राष्ट्रीय, अंतरराष्ट्रीय, व्यापारिक और स्थानीय समाचार शामिल हैं।',
    intendedUse: 'दीर्घकालिक मीडिया सेंटीमेंट, टोन में ऐतिहासिक बदलाव, और राष्ट्रीय घटनाओं के दौरान भाषा के उपयोग का सांख्यिकीय और टाइम-सीरीज़ विश्लेषण।',
    limitationsAndBiases: [
      'एक ही मुख्यधारा अंग्रेजी दैनिक पर केंद्रित होने के कारण शहरी, कॉर्पोरेट और मध्यवर्गीय प्राथमिकताओं का संभावित पूर्वाग्रह (Selection Bias)।',
      'शीर्षक की लंबाई 10-15 शब्दों तक सीमित होने के कारण लेख के विस्तृत संदर्भ (Nuance) का अभाव।',
      '2001 से 2005 के शुरुआती वर्षों में डिजिटल आर्काइविंग की असमानता के कारण मासिक वॉल्यूम में भिन्नता।'
    ],
    cleaningSteps: [
      'डुप्लीकेट पंक्तियों और शून्य टेक्स्ट वाले शीर्षकों का निष्कासन (Deduplication)।',
      'तारीख स्ट्रिंग को ISO 8601 YYYY-MM-DD प्रारूप में पार्स करना।',
      'HTML एंटिटीज़ (&amp;, &quot;) और विशेष वर्णों का सामान्यीकरण।',
      'शहर-विशिष्ट टैग्स को 5 मुख्य श्रेणियों (Business, Politics, National, World, Tech/Sports) में समूहीकृत करना।'
    ]
  },
  {
    id: 'bbc-hindi-news',
    datasetName: 'BBC News Hindi Articles - Detailed',
    creator: 'Aadi Srivastava (DisisBig)',
    sourceUrl: 'https://www.kaggle.com/datasets/disisbig/hindi-news-data',
    license: 'CC BY 4.0 (Creative Commons Attribution 4.0 International)',
    timeRange: '2016 to 2021',
    sampleCount: '4,335 Full-Length Articles & Headlines',
    size: '~12 MB',
    columns: [
      { name: 'heading', type: 'String (Devanagari)', description: 'हिंदी समाचार शीर्षक' },
      { name: 'article', type: 'String (Devanagari)', description: 'पूर्ण लेख का मूल पाठ (Full body text)' },
      { name: 'category', type: 'String', description: 'श्रेणी (उदा. india, international, entertainment, sport, science)' }
    ],
    description: 'बीबीसी हिंदी पोर्टल से संकलित उच्च-गुणवत्ता वाले संपादकीय और समाचार आलेखों का स्वच्छ डेटासेट। यह मानक देवनागरी लिपि में हिंदी भाषा के टोन और भावना का अध्ययन करने के लिए आदर्श है।',
    intendedUse: 'हिंदी एनएलपी (NLP), क्रॉस-लिंगुअल सेंटीमेंट विश्लेषण (IndicBERT / MuRIL), और अंग्रेजी बनाम हिंदी मीडिया की तुलनात्मक प्रस्तुति।',
    limitationsAndBiases: [
      'बीबीसी की वैश्विक संपादकीय शैली होने के कारण यह भारतीय स्थानीय भाषाई दैनिकों (जैसे दैनिक जागरण या अमर उजाला) की तुलना में अधिक संयमित भाषा का उपयोग करता है।',
      'आलेखों की संख्या (4,335) लाखों में नहीं है, इसलिए इसे बड़े सांख्यिकीय मॉडल्स के लिए एक प्रतिनिधि गुणात्मक और सत्यापन नमूने के रूप में उपयोग किया जाता है।'
    ],
    cleaningSteps: [
      'देवनागरी यूनिकोड सामान्यीकरण (Unicode NFC Normalization)।',
      'विराम चिह्नों, खड़ी पाई (|) और हाइपरलिंक्स की सफाई।',
      'स्टॉपवर्ड्स और संख्यात्मक पंक्तियों का भाषाई फ़िल्टरिंग।'
    ]
  },
  {
    id: 'news-category-dataset',
    creator: 'Rishabh Misra',
    datasetName: 'News Category Dataset (HuffPost)',
    sourceUrl: 'https://www.kaggle.com/datasets/rmisra/news-category-dataset',
    license: 'CC BY 4.0',
    timeRange: '2012 to 2022',
    sampleCount: '210,000+ Headlines & Summaries',
    size: '~60 MB (JSON Lines)',
    columns: [
      { name: 'category', type: 'String', description: 'समाचार की श्रेणी (कुल 42 श्रेणियां, जैसे POLITICS, WELLNESS, TECH)' },
      { name: 'headline', type: 'String', description: 'समाचार शीर्षक' },
      { name: 'authors', type: 'String', description: 'लेखक का नाम' },
      { name: 'link', type: 'String', description: 'मूल लेख का यूआरएल' },
      { name: 'short_description', type: 'String', description: 'संक्षिप्त विवरण या सार' },
      { name: 'date', type: 'String (YYYY-MM-DD)', description: 'प्रकाशन तिथि' }
    ],
    description: '2012 से 2022 के बीच प्रकाशित हफ़पोस्ट (HuffPost) के 210 हज़ार से अधिक समाचारों का वैश्विक संदर्भ डेटासेट। यह अंतरराष्ट्रीय मीडिया में सनसनीखेज शीर्षकों और भावनात्मक शब्दों के तुलनात्मक आधार के रूप में कार्य करता है।',
    intendedUse: 'श्रेणी-वार भावना (category-wise sentiment variance) और पश्चिमी बनाम एशियाई मीडिया टोन की तुलना।',
    limitationsAndBiases: [
      'अमेरिकी और पश्चिमी दृष्टिकोण का प्रभुत्व।',
      'डिजिटल-फर्स्ट मीडिया होने के कारण क्लिकबेट और एंगेजमेंट-आधारित शीर्षकों का उच्च अनुपात।'
    ],
    cleaningSteps: [
      'खाली विवरण और अनुपलब्ध लिंक वाले रिकॉर्ड्स को हटाना।',
      'श्रेणियों को 8 समेकित मुख्य डोमेन में री-मैप करना।'
    ]
  }
];
