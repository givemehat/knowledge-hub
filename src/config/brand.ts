/**
 * Brand Configuration — Single Source of Truth
 * 
 * Changing the brand name, transliteration, taglines, or colors
 * in this file automatically updates all components, metadata,
 * OpenGraph tags, JSON-LD schemas, footers, headers, and SEO across the site.
 */

export interface BrandConfig {
  name: string;
  nameHi: string;
  descriptor: {
    en: string;
    hi: string;
  };
  tagline: {
    en: string;
    hi: string;
  };
  domain: string;
  siteUrl: string;
  github: {
    owner: string;
    repo: string;
    url: string;
  };
  themeColor: string;
  accentColor: string;
  version: string;
}

export const BRAND: BrandConfig = {
  name: 'Peach',
  nameHi: 'पीच',
  descriptor: {
    en: 'Learn tech and the world, with verified sources',
    hi: 'जाँचे-परखे स्रोतों के साथ तकनीक और दुनिया को समझें'
  },
  tagline: {
    en: 'Roadmaps, theory and verified links, in one place.',
    hi: 'सटीक रोडमैप, सिद्धांत और जाँचे-परखे स्रोत, एक ही जगह।'
  },
  domain: 'givemehat.github.io/knowledge-hub',
  siteUrl: 'https://givemehat.github.io/knowledge-hub',
  github: {
    owner: 'givemehat',
    repo: 'knowledge-hub',
    url: 'https://github.com/givemehat/knowledge-hub'
  },
  themeColor: '#FF9E7A',
  accentColor: '#E05D38',
  version: '1.2.0'
};
