export interface ScenarioAssumption {
  id: number;
  statement: string;
  realWorldBasis: string;
  source: string;
  sourceUrl: string;
}

export interface BranchingOutcome {
  tier: 'Best-Case' | 'Base-Case' | 'Worst-Case';
  title: string;
  qualitativeLikelihood: 'Higher likelihood' | 'Moderate likelihood' | 'Low probability, high impact';
  summary: string;
  implications: string[];
}

export interface Scenario {
  slug: string;
  title: string;
  titleHindi: string;
  domain: 'geopolitics' | 'tech-ai' | 'economy';
  domainLabel: string;
  badge: 'HYPOTHETICAL SCENARIO';
  status: 'Futures-Study / Red-Teaming';
  readingMinutes: number;
  lastUpdated: string;
  abstract: string;
  abstractEn?: string;
  keyFindings: string[];
  premise: string;
  assumptions: ScenarioAssumption[];
  causalChainMermaid: string;
  evidenceBase: {
    precedent: string;
    year: string;
    analogyDescription: string;
    sourceCitation: string;
  }[];
  branchingOutcomes: BranchingOutcome[];
  earlyWarningIndicators: string[];
  counterArguments: {
    argument: string;
    rebuttalBasis: string;
  }[];
  limitations: string[];
  references: {
    title: string;
    publisher: string;
    url: string;
  }[];
}

export const SCENARIOS: Scenario[] = [
  {
    slug: 'strait-of-hormuz-chokepoint-closure',
    title: 'Strait of Hormuz 30-Day Closure: Global Energy Disruption & Asian Macroeconomic Contagion',
    titleHindi: 'होर्मुज जलडमरूमध्य की 30-दिवसीय संभावित नाकाबंदी: ऊर्जा संकट और आर्थिक प्रभाव',
    domain: 'geopolitics',
    domainLabel: 'Geopolitics & Energy Security',
    badge: 'HYPOTHETICAL SCENARIO',
    status: 'Futures-Study / Red-Teaming',
    readingMinutes: 14,
    lastUpdated: '2026-11-04',
    abstract: 'यह शोध पत्र एक काल्पनिक 30-दिवसीय होर्मुज जलडमरूमध्य (Strait of Hormuz) चोकपॉइंट नाकाबंदी का विस्तृत रणनीतिक सिमुलेशन प्रस्तुत करता है। इसमें ऊर्जा प्रवाह, रिफाइनरी इन्वेंट्री, एशियाई अर्थव्यवस्थाओं (विशेषकर भारत और चीन) पर वित्तीय प्रभाव, और नौसैनिक एस्कॉर्ट की गतिशीलता का वस्तुनिष्ठ विश्लेषण किया गया है।',
    abstractEn: 'This research paper presents a rigorous strategic wargame simulating a hypothetical 30-day blockade of the Strait of Hormuz chokepoint. It systematically models petroleum transit disruption, Asian refinery inventory depletion (focusing on India and China), macroeconomic balance-of-payments contagion, and naval escort dynamics.',
    keyFindings: [
      'दैनिक ~20-21 मिलियन बैरल कच्चा तेल (~20% वैश्विक खपत) बाधित होगा, जिसमें से बाईपास पाइपलाइनों द्वारा केवल ~6.5 मिलियन bpd ही पुनर्निर्देशित किया जा सकता है।',
      'ब्रेंट क्रूड में 60-90% की अल्पकालिक उछाल ($130-$160/बैरल) की संभावना, जिससे आयात-निर्भर अर्थव्यवस्थाओं के चालू खाता घाटे (CAD) और मुद्रा पर तात्कालिक दबाव बनेगा।',
      'अंतरराष्ट्रीय नौसैनिक कॉन्वॉय और माइन-स्वीपिंग ऑपरेशन्स 10-15 दिनों में शुरू होने से बेस-केस परिदृश्य में नाकाबंदी का पूर्ण प्रभाव 30 दिनों से पहले ही सीमित होना शुरू हो सकता है।'
    ],
    premise: 'मान लें कि फारस की खाड़ी में अप्रत्याशित भू-राजनीतिक तनाव के चलते एक क्षेत्रीय नौसैनिक शक्ति द्वारा 21-नॉटिकल-मील चौड़े होर्मुज जलडमरूमध्य में नौसैनिक माइंस (Sea Mines), एंटी-शिप मिसाइल बैटरियों और ड्रोन बोट्स की तैनाती के ज़रिये 30 दिनों के लिए सभी वाणिज्यिक टैंकरों की आवाजाही को रोक दिया जाता है।',
    assumptions: [
      {
        id: 1,
        statement: 'होर्मुज से प्रतिदिन लगभग 20-21 मिलियन बैरल पेट्रोलियम उत्पाद और विश्व का 20% द्रवीभूत प्राकृतिक गैस (LNG - विशेषकर कतर से) गुज़रता है।',
        realWorldBasis: 'यूएस एनर्जी इंफॉर्मेशन एडमिनिस्ट्रेशन (EIA) का वर्ल्ड ऑयल ट्रांजिट चोकपॉइंट्स डेटा।',
        source: 'U.S. Energy Information Administration (EIA)',
        sourceUrl: 'https://www.eia.gov/international/analysis/special-topics/World_Oil_Transit_Chokepoints'
      },
      {
        id: 2,
        statement: 'फारस की खाड़ी से बाहर निकलने वाली मौजूदा बाईपास पाइपलाइनों (सऊदी ईस्ट-वेस्ट पेट्रोलाइन 5M bpd और यूएई हबशान-फुजैराह 1.5M bpd) की अधिकतम अतिरिक्त क्षमता केवल ~6.5M bpd है।',
        realWorldBasis: 'अंतरराष्ट्रीय ऊर्जा एजेंसी (IEA) इंफ्रास्ट्रक्चर मैपिंग रिपोर्ट।',
        source: 'International Energy Agency (IEA)',
        sourceUrl: 'https://www.iea.org/'
      },
      {
        id: 3,
        statement: 'लंदन की संयुक्त युद्ध समिति (Lloyds Joint War Committee) द्वारा जलडमरूमध्य को तुरंत "High-Risk Listed Area" घोषित करने से वाणिज्यिक जहाजों का युद्ध जोखिम बीमा (War Risk Premium) 500-800% बढ़ जाएगा, जिससे जहाज मालिक यात्राएं स्थगित कर देंगे।',
        realWorldBasis: '2019 और 2024 में लाल सागर और ओमान की खाड़ी में लागू किए गए वास्तविक समुद्री बीमा नियम।',
        source: 'Lloyds Market Association',
        sourceUrl: 'https://www.lmalloyds.com/'
      },
      {
        id: 4,
        statement: 'भारत की रणनीतिक पेट्रोलियम रिज़र्व (SPR) क्षमता (विशाखापत्तनम, मंगलुरु, पादुर) लगभग 9.5 दिनों की शुद्ध खपत पूरी कर सकती है, जबकि रिफाइनरी और डिपो इन्वेंट्री में अतिरिक्त 64 दिनों का स्टॉक उपलब्ध रहता है।',
        realWorldBasis: 'भारतीय सामरिक पेट्रोलियम रिजर्व लिमिटेड (ISPRL) और पेट्रोलियम एवं प्राकृतिक गैस मंत्रालय की वार्षिक रिपोर्ट।',
        source: 'ISPRL / MoPNG Govt of India',
        sourceUrl: 'https://www.isprl.in/'
      }
    ],
    causalChainMermaid: `flowchart TD
    A["Trigger: होर्मुज जलडमरूमध्य में नौसैनिक माइनिंग व ड्रोन खतरे की घोषणा"] --> B["Lloyd's War Risk Insurance में 600%+ की वृद्धि"]
    B --> C["वाणिज्यिक सुपरटैंकर्स (VLCC) का लंगर डालना व आवागमन पूर्ण ठप"]
    C --> D["वैश्विक बाज़ार में 14M bpd कच्चे तेल और 20% LNG की तात्कालिक कमी"]
    D --> E["Brent Crude में तीव्र उछाल ($130 - $160/बैरल)"]
    E --> F["एशियाई आयातकों (भारत, चीन, जापान) के चालू खाता घाटे व मुद्रा में गिरावट"]
    E --> G["पेट्रोलियम सब्सिडी भार व केंद्रीय बैंकों द्वारा आपातकालीन ब्याज दर स्थिरता"]
    F & G --> H["अंतरराष्ट्रीय नौसैनिक गठबंधन (Mine Countermeasures CTF) द्वारा सुरक्षित कॉन्वॉय बहाली"]`,
    evidenceBase: [
      {
        precedent: 'The Tanker War (1984–1988)',
        year: '1984–1988',
        analogyDescription: 'ईरान-इराक युद्ध के दौरान 400 से अधिक व्यापारिक जहाजों पर हमले हुए, जिसके बाद अमेरिका ने "ऑपरेशन अर्नेस्ट विल" के तहत कुवैती टैंकरों को अमेरिकी झंडे तले सुरक्षित कॉन्वॉय सुरक्षा दी थी।',
        sourceCitation: 'U.S. Naval History and Heritage Command (Operation Earnest Will Archive)'
      },
      {
        precedent: 'लाल सागर और बाब-अल-मंदेब संकट (2023–2024)',
        year: '2023–2024',
        analogyDescription: 'यमन के हूती हमलों के बाद प्रमुख कंटेनर लाइनों (Maersk, MSC) ने केप ऑफ गुड होप के रास्ते 10-14 दिनों के अतिरिक्त चक्कर लगाने का निर्णय लिया, जिससे वैश्विक भाड़े में 250% की वृद्धि हुई।',
        sourceCitation: 'UNCTAD Review of Maritime Transport 2024'
      }
    ],
    branchingOutcomes: [
      {
        tier: 'Best-Case',
        title: 'सीमित राजनयिक व नौसैनिक डि-एस्केलेशन (दिन 1 से 12)',
        qualitativeLikelihood: 'Higher likelihood',
        summary: 'बहुपक्षीय राजनयिक दबाव, कतर और तटवर्ती राष्ट्रों की मध्यस्थता और प्रमुख शक्तियों (UNSC) के हस्तक्षेप से 10-12 दिनों में सुरक्षित गलियारे (De-mined safe corridors) स्थापित हो जाते हैं। तेल की कीमतें $110 पर स्थिर होकर सामान्य होने लगती हैं।',
        implications: ['आपातकालीन रणनीतिक भंडार (SPR) से तेल रिलीज', 'रिफाइनरियों द्वारा अफ्रीकी व लैटिन अमेरिकी तेल का त्वरित आयात']
      },
      {
        tier: 'Base-Case',
        title: 'सक्रिय कॉन्वॉय एस्कॉर्ट व 30-दिवसीय आंशिक गतिरोध (दिन 13 से 30)',
        qualitativeLikelihood: 'Moderate likelihood',
        summary: 'व्यापारिक जहाज स्वतंत्र रूप से नहीं चल पाते; बहुराष्ट्रीय नौसैनिक टास्क फोर्स (CTF-151 शैली) माइंस हटाने के बाद प्रतिदिन सीमित टैंकरों को कॉन्वॉय में पार कराती है। क्रूड $130-$145 के बीच बना रहता है, जिससे वैश्विक मुद्रास्फीति में 1.2% की वृद्धि होती है।',
        implications: ['गैस आधारित बिजली उत्पादन में कटौती', 'उर्वरक सब्सिडी में सरकारी व्यय वृद्धि', 'घरेलू ईंधन कीमतों पर आंशिक प्रभाव']
      },
      {
        tier: 'Worst-Case',
        title: 'व्यापक क्षेत्रीय संघर्ष और बुनियादी ढांचा क्षति (दिन 30+)',
        qualitativeLikelihood: 'Low probability, high impact',
        summary: 'नाकाबंदी से आगे बढ़कर तटीय तेल शोधन कारखानों और डीसैलिनैशन प्लांट्स पर हमले होते हैं। तेल $175 पार कर जाता है, जिससे वैश्विक मंदी (Stagflation) शुरू होती है।',
        implications: ['कच्चे तेल की वैश्विक राशनिंग', 'विदेशी मुद्रा भंडार पर तीव्र दबाव', 'सख्त मौद्रिक नीति और औद्योगिक उत्पादन में संकुचन']
      }
    ],
    earlyWarningIndicators: [
      'फारस की खाड़ी में नौसैनिक जहाजों के AIS (ऑटोमैटिक आइडेंटिफिकेशन सिस्टम) ट्रांसपोंडर्स का बड़े पैमाने पर बंद होना।',
      'लंदन और सिंगापुर के मरीन इंश्योरेंस ब्रोकर्स द्वारा युद्ध जोखिम प्रीमियम पर 48 घंटे का नोटिस जारी करना।',
      'तटीय क्षेत्रों में जीपीएस/जीएनएसएस सिग्नल स्पूफिंग और जैमिंग में असामान्य 500% की वृद्धि।',
      'ओपेक+ देशों द्वारा अतिरिक्त उत्पादन क्षमता पर आपातकालीन वर्चुअल बैठकें बुलाना।'
    ],
    counterArguments: [
      {
        argument: 'खाड़ी देश अपनी अर्थव्यवस्थाओं के लिए तेल निर्यात पर 70-80% निर्भर हैं; स्वयं नाकाबंदी बनाए रखना उनके अपने वित्तीय अस्तित्व को समाप्त कर देगा।',
        rebuttalBasis: 'आर्थिक तर्क सही है, लेकिन इतिहास दिखाता है कि सुरक्षा संकटों में अस्तित्वपरक प्रतिरोध (deterrence leverage) अक्सर अल्पकालिक आर्थिक नफे-नुकसान पर हावी हो जाता है।'
      },
      {
        argument: 'आधुनिक नौसैनिक माइन-स्वीपिंग हेलीकॉप्टर और यूयूवी (Unmanned Underwater Vehicles) 72 घंटे में सुरक्षित चैनल खोल सकते हैं।',
        rebuttalBasis: 'उथले पानी में आधुनिक बॉटम-माइंस और तटीय मोबाइल मिसाइल बैटरियों की मौजूदगी में माइन-स्वीपिंग जहाजों को पहले व्यापक वायु सुरक्षा की आवश्यकता होती है, जिसमें समय लगता है।'
      }
    ],
    limitations: [
      'खाड़ी देशों के अप्रकाशित द्विपक्षीय बैकचैनल समझौतों की जानकारी सार्वजनिक स्रोतों में उपलब्ध नहीं है।',
      'चीन और भारत द्वारा रूसी समुद्री तेल (Urals) के रूटिंग की वास्तविक प्रतिस्थापन गतिशीलता को सटीक रूप से मापना संभव नहीं है।',
      'घरेलू मांग में संकुचन और ईंधन संरक्षण उपायों की नागरिक लोचशीलता (elasticity) का मॉडल अनुमानित है।'
    ],
    references: [
      {
        title: 'World Oil Transit Chokepoints: Strait of Hormuz Analysis',
        publisher: 'U.S. Energy Information Administration (EIA)',
        url: 'https://www.eia.gov/international/analysis/special-topics/World_Oil_Transit_Chokepoints'
      },
      {
        title: 'Global Energy Crisis & Strategic Reserves Framework',
        publisher: 'International Energy Agency (IEA)',
        url: 'https://www.iea.org/'
      },
      {
        title: 'Joint War Committee Listed Areas and Shipping Protocols',
        publisher: 'Lloyd\'s Market Association',
        url: 'https://www.lmalloyds.com/'
      },
      {
        title: 'Indian Strategic Petroleum Reserves: Capacity and Energy Security',
        publisher: 'Ministry of Petroleum & Natural Gas, Govt of India',
        url: 'https://www.isprl.in/'
      }
    ]
  },
  {
    slug: 'election-deepfake-cascade',
    title: 'Coordinated AI Deepfakes in a General Election: Information Ecosystem Stress-Testing',
    titleHindi: 'आम चुनाव के दौरान समन्वित AI डीपफेक्स का हमला: सूचना तंत्र का स्ट्रेस-टेस्ट',
    domain: 'tech-ai',
    domainLabel: 'AI, Cybersecurity & Electoral Integrity',
    badge: 'HYPOTHETICAL SCENARIO',
    status: 'Futures-Study / Red-Teaming',
    readingMinutes: 13,
    lastUpdated: '2026-11-04',
    abstract: 'यह परिदृश्य विश्लेषण मतदान से ठीक 36 घंटे पहले एंड-टू-एंड एन्क्रिप्टेड मैसेजिंग नेटवर्क्स पर अत्यधिक यथार्थवादी मल्टीमॉडल AI डीपफेक्स (सिंथेटिक ऑडियो/वीडियो) के समन्वित प्रसार के प्रभावों का तकनीकी और प्रशासनिक सिमुलेशन प्रस्तुत करता है।',
    abstractEn: 'This scenario analysis models the systemic impacts of coordinated, hyper-realistic multimodal AI deepfakes deployed across end-to-end encrypted messaging channels 36 hours before voting commences in a national election.',
    keyFindings: [
      'डार्क सोशल (Dark Social - WhatsApp/Telegram) पर सामग्री का प्रसार पारंपरिक फैक्ट-चेकिंग सत्यापन चक्र से 10 से 15 गुना तेज़ होता है।',
      'धारा 126 (Representation of the People Act 1951) के 48-घंटे के "साइलेंस पीरियड" में मुख्यधारा मीडिया के औपचारिक अभियानों पर रोक होने से सूचना का एक तात्कालिक शून्य (Information Vacuum) उत्पन्न होता है।',
      'पारदर्शी डिजिटल वॉटरमार्किंग (C2PA / Cryptographic Signatures) और त्वरित कानूनी-प्रशासनिक खंडन तंत्र ही इसके नकारात्मक प्रभाव को 60-70% तक सीमित कर सकते हैं।'
    ],
    premise: 'मान लें कि एक राष्ट्रीय आम चुनाव के अंतिम चरण के मतदान से 36 घंटे पहले, विभिन्न राजनीतिक दलों के वरिष्ठ नेताओं की क्लोन की गई आवाज़ में फर्जी घोषणाओं ("उम्मीदवार का नाम वापस लेना" या "गुप्त चुनावी समझौता") के 10-15 सेकंड के ऑडियो क्लिप्स लाखों डार्क सोशल ग्रुप्स में एक साथ फैला दिए जाते हैं।',
    assumptions: [
      {
        id: 1,
        statement: 'ओपन-सोर्स जीरो-शॉट वॉइस क्लोनिंग मॉडल्स (उदा. Bark, XTTS, F5-TTS) केवल 3 सेकंड के क्लीन ऑडियो सैंपल से 95%+ समान आवाज़ उत्पन्न कर सकते हैं।',
        realWorldBasis: 'DARPA SemaFor प्रोग्राम और स्टैनफोर्ड इंटरनेट ऑब्जर्वेटरी की सिंथेटिक मीडिया रिसर्च।',
        source: 'DARPA / Stanford Internet Observatory',
        sourceUrl: 'https://www.darpa.mil/program/semantic-forensics'
      },
      {
        id: 2,
        statement: 'एंड-टू-एंड एन्क्रिप्टेड प्लेटफॉर्म्स (WhatsApp, Telegram) पर मेटाडेटा और फॉरवर्डिंग की अपारदर्शिता के कारण प्लेटफॉर्म एल्गोरिदम सामग्री को स्वतः डिलीट या ब्लॉक नहीं कर सकते।',
        realWorldBasis: 'सूचना प्रौद्योगिकी (मध्यवर्ती दिशानिर्देश और डिजिटल मीडिया आचार संहिता) नियम 2021 और व्हाट्सएप सुरक्षा श्वेतपत्र।',
        source: 'Ministry of Electronics and Information Technology (MeitY)',
        sourceUrl: 'https://www.meity.gov.in/'
      },
      {
        id: 3,
        statement: 'आरपी एक्ट 1951 की धारा 126 मतदान समाप्त होने से 48 घंटे पहले सभी टीवी, रेडियो और सार्वजनिक सभाओं में चुनावी प्रचार पर रोक लगाती है, जिससे त्वरित जनसंचार का माध्यम सीमित हो जाता है।',
        realWorldBasis: 'भारत निर्वाचन आयोग (ECI) आदर्श आचार संहिता और चुनाव संचालन नियम।',
        source: 'Election Commission of India (ECI)',
        sourceUrl: 'https://www.eci.gov.in/'
      }
    ],
    causalChainMermaid: `flowchart TD
    A["Trigger: मतदान से 36 घंटे पूर्व क्लोन ऑडियो क्लिप्स का डार्क सोशल पर ड्रॉप"] --> B["एन्क्रिप्टेड मैसेजिंग ग्रुप्स में एक्सपोनेंशियल फॉरवर्डिंग (Viral Cascade)"]
    B --> C["48-घंटे साइलेंस पीरियड के कारण औपचारिक टीवी प्रचार पर कानूनी सीमा"]
    C --> D["मतदाताओं में स्थानीय भ्रम: क्या सचमुच उम्मीदवार ने नाम वापस ले लिया?"]
    D --> E["फैक्ट-चेकिंग लैब्स द्वारा C2PA व स्पेक्ट्रोग्राम ऑडियो एनालिसिस (विलंब: 4-8 घंटे)"]
    E --> F["ECI व राज्य चुनाव तंत्र द्वारा आपातकालीन प्रेस कॉन्फ्रेंस व सोशल मीडिया एडवाइजरी"]
    F --> G["ईवीएम पोलिंग बूथों पर स्थानीय पार्टी पोलिंग एजेंट्स द्वारा प्रत्यक्ष आमने-सामने स्पष्टीकरण"]
    G --> H["मतदान प्रतिशत पर नगण्य प्रभाव, परंतु चुनाव पश्चात कानूनी व डिजिटल ऑडिट की मांग"]`,
    evidenceBase: [
      {
        precedent: 'स्लोवाकिया संसदीय चुनाव सिंथेटिक ऑडियो (2023)',
        year: '2023',
        analogyDescription: 'मतदान से 48 घंटे पूर्व साइलेंस पीरियड के दौरान एक प्रमुख राजनीतिक नेता की आवाज में चुनाव में धांधली की बात करता फर्जी ऑडियो वायरल हुआ, जिसे फैक्ट-चेकर्स त्वरित खंडित नहीं कर सके।',
        sourceCitation: 'Wired & European Digital Media Observatory (EDMO) Case Report'
      },
      {
        precedent: 'न्यू हैम्पशायर यूएस प्राइमरी रोबोकॉल (2024)',
        year: '2024',
        analogyDescription: 'राष्ट्रपति की क्लोन आवाज में हजारों मतदाताओं को फोन कर मतदान न करने की फर्जी सलाह दी गई, जिस पर एफसीसी (FCC) ने जांच कर भारी जुर्माना लगाया।',
        sourceCitation: 'U.S. Federal Communications Commission (FCC) Enforcement Bureau'
      }
    ],
    branchingOutcomes: [
      {
        tier: 'Best-Case',
        title: 'त्वरित डिजिटल खंडन और बूथ-स्तरीय लचीलापन (घंटे 1 से 12)',
        qualitativeLikelihood: 'Higher likelihood',
        summary: 'चुनाव आयोग और संबंधित दल के सोशल मीडिया हैंडल्स 3 घंटे के भीतर औपचारिक वीडियो बयान जारी करते हैं। बूथ स्तर के पार्टी कार्यकर्ता मतदाताओं को व्यक्तिगत रूप से आश्वस्त करते हैं। मतदान पर कोई सांख्यिकीय प्रभाव नहीं पड़ता।',
        implications: ['C2PA डिजिटल प्रमाणन को भविष्य के लिए अनिवार्य बनाना', 'नागरिकों में फॉरवर्ड्स पर संदेह का बढ़ना']
      },
      {
        tier: 'Base-Case',
        title: 'सीमित मतदान केंद्रों पर भ्रम और मतदान प्रतिशत में मामूली विचलन',
        qualitativeLikelihood: 'Moderate likelihood',
        summary: 'कम कनेक्टिविटी वाले या दूरदराज के कुछ मतदान केंद्रों पर 2-4% मतदाता भ्रमित होकर घर पर रह जाते हैं या वोटिंग में देरी होती है। परिणाम घोषित होने के बाद पराजित उम्मीदवार कोर्ट में याचिका दायर करते हैं।',
        implications: ['चुनाव सुधार समितियों द्वारा साइलेंस पीरियड नियमों की पुनः समीक्षा', 'सिंथेटिक मीडिया के विरुद्ध सख्त दंडात्मक कानून']
      },
      {
        tier: 'Worst-Case',
        title: 'हिंसक झड़पें और चुनावी परिणामों की वैधता पर व्यापक संकट',
        qualitativeLikelihood: 'Low probability, high impact',
        summary: 'फर्जी ऑडियो के साथ-साथ फर्जी दंगे या बूथ कैप्चरिंग के सिंथेटिक वीडियो फैलाए जाते हैं, जिससे कानून-व्यवस्था की स्थिति उत्पन्न होती है और ECI को कई मतदान केंद्रों पर पुनर्मतदान (Repoll) का आदेश देना पड़ता है।',
        implications: ['इंटरनेट शटडाउन की मांग', 'चुनावी प्रक्रिया के प्रति संस्थागत अविश्वास में वृद्धि']
      }
    ],
    earlyWarningIndicators: [
      'टेलीग्राम और व्हाट्सएप पर नए बॉट अकाउंट्स द्वारा बल्क इनवाइट्स की गतिविधि में 1000% का उछाल।',
      'क्लाउड बेस्ड वॉयस सिंथेसिस एपीआई (ElevenLabs आदि) पर विशिष्ट राजनीतिक व्यक्तित्वों के नाम से असामान्य इनपुट प्रॉम्प्ट्स का बढ़ना।',
      'डार्क वेब फोरम्स पर क्षेत्रीय भारतीय भाषाओं में ट्रेंडिंग "लुकअलाइक्स" और सिंथेटिक स्पीच मॉडल्स की बिक्री।'
    ],
    counterArguments: [
      {
        argument: 'भारतीय मतदाता अत्यंत चतुर हैं और केवल व्हाट्सऐप ऑडियो सुनकर अपनी मतदान प्राथमिकता नहीं बदलते।',
        rebuttalBasis: 'अधिकांश मतदाता नहीं बदलते, लेकिन नजदीकी मुकाबले (जहाँ जीत का अंतर 1,000-5,000 वोटों का होता है) में 1% भ्रम भी चुनावी परिणाम को पलट सकता है।'
      },
      {
        argument: 'ईवीएम और वीवीपैट का भौतिक मतदान तंत्र डिजिटल प्रोपेगैंडा से पूरी तरह अलग और सुरक्षित है।',
        rebuttalBasis: 'यह सत्य है कि वोटिंग मशीन सुरक्षित है; लेकिन हमला मशीन पर नहीं, बल्कि मतदाता के मस्तिष्क (Cognitive Layer) पर होता है।'
      }
    ],
    limitations: [
      'एंड-टू-एंड एन्क्रिप्शन के कारण वास्तविक समय में फॉरवर्डिंग वेलोसिटी का सटीक डेटा किसी भी स्वतंत्र शोधकर्ता के पास नहीं होता।',
      'विभिन्न जनसांख्यिकीय समूहों (आयु, शिक्षा, ग्रामीण बनाम शहरी) पर डीपफेक की प्रभावशीलता के बहुत कम नियंत्रित अनुभवजन्य (empirical) अध्ययन मौजूद हैं।'
    ],
    references: [
      {
        title: 'Synthesizing the News: Deepfakes in Democratic Elections',
        publisher: 'Stanford Internet Observatory',
        url: 'https://cyber.fsi.stanford.edu/io'
      },
      {
        title: 'Compendium of Instructions on Model Code of Conduct',
        publisher: 'Election Commission of India (ECI)',
        url: 'https://www.eci.gov.in/'
      },
      {
        title: 'Semantic Forensics (SemaFor) Program Metrics',
        publisher: 'DARPA',
        url: 'https://www.darpa.mil/program/semantic-forensics'
      }
    ]
  },
  {
    slug: 'financial-cloud-outage',
    title: 'Cascading Cloud Outage in Core Payment Rails: Interbank Liquidity Freeze & Recovery Dynamics',
    titleHindi: 'कोर बैंकिंग व क्लाउड स्विच में कैस्केडिंग आउटेज: अंतर-बैंक तरलता संकट का सिमुलेशन',
    domain: 'economy',
    domainLabel: 'Economy & Critical Financial Infrastructure',
    badge: 'HYPOTHETICAL SCENARIO',
    status: 'Futures-Study / Red-Teaming',
    readingMinutes: 13,
    lastUpdated: '2026-11-04',
    abstract: 'यह शोध पत्र एक प्रमुख पब्लिक क्लाउड प्रदाता के कई अवेलेबिलिटी जोन्स (AZs) में 18 घंटे के निरंतर आउटेज के कारण डिजिटल भुगतान स्विच (UPI, IMPS, कार्ड नेटवर्क्स) और अंतर-बैंक सेटलमेंट में उत्पन्न होने वाले तरलता संकट का रणनीतिक मॉडल प्रस्तुत करता है।',
    abstractEn: 'This empirical research wargames an 18-hour continuous multi-availability-zone outage across major public cloud providers, stress-testing digital payment switches (UPI, IMPS, card rails) and interbank liquidity settlement systems.',
    keyFindings: [
      'डिजिटल भुगतान स्विच का 60%+ हिस्सा प्रमुख हाइपरस्केल क्लाउड इन्फ्रास्ट्रक्चर और मर्चेंट गेटवे एपीआई पर निर्भर है।',
      'आउटेज के पहले 6 घंटों में विफल लेनदेन (Failed Transactions) 45-65% तक पहुंच जाते हैं, जिससे पॉइंट-ऑफ-सेल (POS) और आवश्यक वस्तु खरीद में तात्कालिक रुकावट आती है।',
      'केंद्रीय बैंक (RBI) के रियल-टाइम ग्रॉस सेटलमेंट (RTGS) के ऑन-प्रिमाइसेस डिजास्टर रिकवरी (DR) साइट्स पर स्विच होने से सिस्टमिक सॉल्वेंसी सुरक्षित रहती है, यद्यपि रिटेल यूजर एक्सपीरियंस 18-24 घंटे बाधित रहता है।'
    ],
    premise: 'मान लें कि एक वैश्विक पब्लिक क्लाउड के एशिया-पैसिफिक क्षेत्र में कोर BGP रूटिंग टेबल में बग और बैकअप पावर फेलियर के एक साथ होने से 2 प्रमुख अवेलेबिलिटी जोन्स 18 घंटे के लिए पूरी तरह ऑफलाइन हो जाते हैं, जहाँ 40 से अधिक फिनटेक पेमेंट गेटवे और बैंक स्विच होस्टेड हैं।',
    assumptions: [
      {
        id: 1,
        statement: 'भारत में यूपीआई (UPI) और त्वरित भुगतान रेल प्रतिदिन 400 मिलियन से अधिक लेनदेन प्रोसेस करते हैं।',
        realWorldBasis: 'नेशनल पेमेंट्स कॉरपोरेशन ऑफ इंडिया (NPCI) मासिक परिचालन सांख्यिकी।',
        source: 'National Payments Corporation of India (NPCI)',
        sourceUrl: 'https://www.npci.org.in/'
      },
      {
        id: 2,
        statement: 'अधिकांश फिनटेक और पेमेंट एग्रीगेटर आर्किटेक्चर मल्टी-क्लाउड एक्टिव-एक्टिव के बजाय एक्टिव-पैसिव मोड में चलते हैं क्योंकि डेटाबेस कंसिस्टेंसी और लेटेंसी लागत अधिक होती है।',
        realWorldBasis: 'बैंक फॉर इंटरनेशनल सेटलमेंट्स (BIS) फाइनेंशियल स्टेबिलिटी बोर्ड क्लाउड कॉन्संट्रेशन रिपोर्ट।',
        source: 'Bank for International Settlements (BIS)',
        sourceUrl: 'https://www.bis.org/'
      },
      {
        id: 3,
        statement: 'भारतीय रिजर्व बैंक (RBI) के दिशानिर्देशों के तहत सभी अनुसूचित वाणिज्यिक बैंकों के पास प्राथमिक डेटा सेंटर (PDC) और ऑन-प्रिमाइसेस डिजास्टर रिकवरी (DR) साइट्स 2 घंटे के RTO (Recovery Time Objective) के साथ होना अनिवार्य है।',
        realWorldBasis: 'आरबीआई मास्टर डायरेक्शन ऑन डिजिटल पेमेंट सिक्योरिटी कंट्रोल्स और साइबर सिक्योरिटी फ्रेमवर्क।',
        source: 'Reserve Bank of India (RBI)',
        sourceUrl: 'https://www.rbi.org.in/'
      }
    ],
    causalChainMermaid: `flowchart TD
    A["Trigger: क्लाउड रीजन में BGP रूटिंग टेबल करप्शन + AZ पावर ट्रिप"] --> B["40+ फिनटेक पेमेंट गेटवेज और बैंक API स्विच का कनेक्शन टूटना"]
    B --> C["रिटेल UPI/कार्ड पेमेंट्स में 55% विफलता दर (Transaction Timeouts)"]
    C --> D["किराना स्टोर्स व फ्यूल स्टेशनों पर मर्चेंट पेमेंट रिजेक्शन व कतारें"]
    D --> E["उपभोक्ताओं द्वारा एटीएम (ATMs) से नकद निकासी में 300% की तात्कालिक वृद्धि"]
    E --> F["इंटरबैंक सेटलमेंट फाइलों (Clearing Batches) का पेंडिंग में जाना"]
    F --> G["RBI द्वारा लिक्विडिटी एडजस्टमेंट फैसिलिटी (LAF) के तहत स्टैंडिंग लिक्विडिटी विंडो खोलना"]
    G --> H["PDC से सेकेंडरी ऑन-प्रिम DR साइट पर रूटिंग माइग्रेशन -> 18 घंटे में सामान्यीकरण"]`,
    evidenceBase: [
      {
        precedent: 'CrowdStrike Falcon ग्लोबल विंडोज आउटेज (19 जुलाई 2024)',
        year: '2024',
        analogyDescription: 'एक त्रुटिपूर्ण कॉन्फिगरेशन अपडेट ने दुनिया भर में 8.5 मिलियन विंडोज मशीनों को BSOD में डाल दिया, जिससे वैश्विक एयरलाइंस, अस्पताल और बैंकिंग सेवाएं 12-36 घंटे तक पंगु रहीं।',
        sourceCitation: 'CrowdStrike Post-Incident Review & Microsoft Security Analysis (July 2024)'
      },
      {
        precedent: 'AWS us-east-1 किनेसिस आउटेज (नवंबर 2020)',
        year: '2020',
        analogyDescription: 'सर्वर क्षमता जोड़ने के दौरान आंतरिक माइक्रो-ऑपरेटिंग सिस्टम थ्रेड्स की सीमा पार होने से हजारों वैश्विक वेब सर्विसेज और वित्तीय डैशबोर्ड्स 15 घंटे बंद रहे।',
        sourceCitation: 'Amazon Web Services Post-Event Summary'
      }
    ],
    branchingOutcomes: [
      {
        tier: 'Best-Case',
        title: 'स्वचालित फेलओवर और स्थानीय नकदी बफर (घंटे 1 से 6)',
        qualitativeLikelihood: 'Higher likelihood',
        summary: 'बैंकों के ऑन-प्रिम DR सेंटर्स 90 मिनट के भीतर एक्टिव हो जाते हैं। व्यापारी ऑफलाइन QR कोड या कैश पर स्विच कर लेते हैं। कुल आर्थिक नुकसान सीमित रहता है।',
        implications: ['फिनटेक कंपनियों द्वारा मल्टी-रीजन आर्किटेक्चर में निवेश वृद्धि', 'रिजर्व बैंक द्वारा नियमित लाइव फायर-ड्रिल अनिवार्य करना']
      },
      {
        tier: 'Base-Case',
        title: '18 घंटे का रिटेल व्यवधान और एटीएम नकदी संकट',
        qualitativeLikelihood: 'Moderate likelihood',
        summary: 'कार्ड और यूपीआई गेटवे 18 घंटे तक बीच-बीच में अटकते रहते हैं। मेट्रो शहरों के 40% एटीएम कैश-आउट हो जाते हैं। केंद्रीय बैंक को अंतर-बैंक सेटलमेंट चक्र को अगले दिन तक बढ़ाना पड़ता है।',
        implications: ['डिजिटल भुगतान पर अल्पकालिक जनविश्वास में कमी', 'थर्ड-पार्टी क्लाउड वेंडर्स पर सख्त डेटा लोकलाइजेशन व ऑडिट नियम']
      },
      {
        tier: 'Worst-Case',
        title: 'डेटाबेस असंगति और लेजर मिलान संकट (48+ घंटे)',
        qualitativeLikelihood: 'Low probability, high impact',
        summary: 'आउटेज के दौरान बीच में लटके (in-flight) लाखों लेन-देन के कारण डेटाबेस में डुप्लीकेट डेबिट और मिसिंग क्रेडिट्स की भारी समस्या उत्पन्न होती है। मैन्युअल रीकंसीलिएशन में 4-5 दिन लगते हैं।',
        implications: ['व्यापक उपभोक्ता शिकायतें', 'फिनटेक कंपनियों के खिलाफ उपभोक्ता संरक्षण मुकदमे']
      }
    ],
    earlyWarningIndicators: [
      'ग्लोबल इंटरनेट रूटिंग मॉनिटर्स (BGPmon, RIPE NCC) पर टियर-1 टेलीकॉम कैरियर्स के रूट विड्रॉल में असामान्य उछाल।',
      'पेमेंट गेटवे एपीआई लेटेंसी का 250ms से बढ़कर अचानक 4,500ms पार कर जाना।',
      'सोशल मीडिया पर विभिन्न बैंकों के उपयोगकर्ताओं द्वारा "UPI Server Down" ट्वीट्स की संख्या में 2,000% का उछाल।'
    ],
    counterArguments: [
      {
        argument: 'NPCI और भारत के बड़े बैंक (SBI, HDFC, ICICI) अपने कोर लेजर्स क्लाउड में नहीं बल्कि अपने स्वयं के निजी ऑन-प्रिमाइसेस डेटा सेंटर्स में होस्ट करते हैं।',
        rebuttalBasis: 'कोर लेजर ऑन-प्रिम हो सकता है, लेकिन अंतिम उपयोगकर्ता से लेकर बैंक तक पहुंचने वाले 5 में से 3 मध्यवर्ती एपीआई (OTP SMS गेटवे, मर्चेंट SDKs, फ्रॉड डिटेक्शन मॉडल्स) क्लाउड पर ही चलते हैं, जिससे चेन टूट जाती है।'
      },
      {
        argument: 'सर्कुलेशन में पर्याप्त करेंसी नोट्स (Cash in Circulation ~35 लाख करोड़) मौजूद हैं जो किसी भी डिजिटल रुकावट को संभाल सकते हैं।',
        rebuttalBasis: 'नकदी उपलब्ध है, परंतु शहरी भारत में 70% दैनिक लेनदेन पूरी तरह कैशलेस हो चुके हैं; एटीएम लॉजिस्टिक्स और कैश वैन को देश भर में रीफिल करने में 24-48 घंटे लगते हैं।'
      }
    ],
    limitations: [
      'क्लाउड प्रदाताओं के वाणिज्यिक गोपनीयता समझौतों (NDAs) के कारण विभिन्न फिनटेक संस्थाओं के सटीक फेलओवर आर्किटेक्चर सार्वजनिक रूप से ज्ञात नहीं हैं।',
      'गंभीर पेमेंट आउटेज के दौरान उपभोक्ता व्यवहार में पैनिक विड्रॉल की वास्तविक गतिशीलता को मॉडलिंग करना जटिल है।'
    ],
    references: [
      {
        title: 'Cloud concentration and interconnectedness in financial services',
        publisher: 'Financial Stability Board (FSB) / BIS',
        url: 'https://www.fsb.org/'
      },
      {
        title: 'RBI Master Direction on Digital Payment Security Controls',
        publisher: 'Reserve Bank of India (RBI)',
        url: 'https://www.rbi.org.in/'
      },
      {
        title: 'Operational Resilience & Systemic Risk in Retail Payment Systems',
        publisher: 'NPCI Whitepaper Series',
        url: 'https://www.npci.org.in/'
      }
    ]
  }
];
