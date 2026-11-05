import enDict from './en.json';
import hiDict from './hi.json';

export type Locale = 'en' | 'hi';
export const DEFAULT_LOCALE: Locale = 'hi';
export const LOCALES: Locale[] = ['hi', 'en'];

const dictionaries = {
  en: enDict,
  hi: hiDict
};

/**
 * UI String Translation Helper
 * Reads nested keys from en.json / hi.json with param interpolation.
 * Example: t('en', 'domains.topTopicsLabel') -> "Top topics:"
 */
export function t(locale: Locale, key: string, params?: Record<string, string | number>): string {
  const dict = dictionaries[locale] || dictionaries[DEFAULT_LOCALE];
  const parts = key.split('.');
  
  let val: any = dict;
  for (const part of parts) {
    if (val && typeof val === 'object' && part in val) {
      val = val[part];
    } else {
      val = undefined;
      break;
    }
  }

  // Fallback to opposite dictionary if key missing in requested locale
  if (typeof val !== 'string') {
    const fallbackDict = locale === 'en' ? dictionaries.hi : dictionaries.en;
    let fbVal: any = fallbackDict;
    for (const part of parts) {
      if (fbVal && typeof fbVal === 'object' && part in fbVal) {
        fbVal = fbVal[part];
      } else {
        fbVal = undefined;
        break;
      }
    }
    val = typeof fbVal === 'string' ? fbVal : key;
  }

  if (params && typeof val === 'string') {
    for (const [k, v] of Object.entries(params)) {
      val = val.replace(new RegExp(`\\{${k}\\}`, 'g'), String(v));
    }
  }

  return val;
}

export interface LocalizedResult {
  text: string;
  isFallback: boolean;
  originalLang?: Locale;
}

/**
 * Localized Content Field Helper
 * Returns field[locale]. If missing, falls back to the other locale with isFallback: true.
 * Never silently print the wrong language without signaling fallback state.
 */
export function localized(
  field: string | { en?: string; hi?: string } | undefined | null,
  locale: Locale
): LocalizedResult {
  if (!field) {
    return { text: '', isFallback: false };
  }

  // Handle object structure { en: "...", hi: "..." }
  if (typeof field === 'object') {
    const requested = field[locale];
    if (requested && requested.trim().length > 0) {
      return { text: requested.trim(), isFallback: false };
    }

    const fallbackLocale: Locale = locale === 'en' ? 'hi' : 'en';
    const fallbackText = field[fallbackLocale];
    if (fallbackText && fallbackText.trim().length > 0) {
      return { text: fallbackText.trim(), isFallback: true, originalLang: fallbackLocale };
    }

    return { text: '', isFallback: false };
  }

  // Handle legacy raw string: detect script
  if (typeof field === 'string') {
    const isDevanagari = /[\u0900-\u097F]/.test(field);
    const fieldLang: Locale = isDevanagari ? 'hi' : 'en';
    const isFallback = fieldLang !== locale;
    return {
      text: field.trim(),
      isFallback,
      originalLang: fieldLang
    };
  }

  return { text: '', isFallback: false };
}

/**
 * Reading Time Formatter
 * Returns "{minutes} min" in English, "{minutes} मिनट" in Hindi.
 * Always ensures a space between number and unit.
 */
export function formatReadingTime(minutes: number, locale: Locale): string {
  const safeMinutes = Math.max(1, Math.round(minutes));
  if (locale === 'en') {
    return `${safeMinutes} min`;
  }
  return `${safeMinutes} मिनट`;
}

/**
 * Guide Count Formatter with Intl.PluralRules
 * Returns "1 guide" / "{count} guides" in English, "{count} गाइड" in Hindi.
 * Always ensures a space between number and unit.
 */
export function formatGuidesCount(count: number, locale: Locale): string {
  if (locale === 'en') {
    const pr = new Intl.PluralRules('en');
    const rule = pr.select(count);
    return rule === 'one' ? `${count} guide` : `${count} guides`;
  }
  return `${count} गाइड`;
}

/**
 * Date Formatter with Intl.DateTimeFormat
 */
export function formatDate(dateStr: string, locale: Locale): string {
  try {
    const d = new Date(dateStr);
    return new Intl.DateTimeFormat(locale === 'hi' ? 'hi-IN' : 'en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(d);
  } catch {
    return dateStr;
  }
}

/**
 * Number Formatter with Intl.NumberFormat
 */
export function formatNumber(num: number, locale: Locale): string {
  return new Intl.NumberFormat(locale === 'hi' ? 'hi-IN' : 'en-US').format(num);
}
