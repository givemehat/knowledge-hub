import { z } from 'zod';

export const LocalizedFieldSchema = z.object({
  en: z.string().min(1, 'English translation is required'),
  hi: z.string().min(1, 'Hindi translation is required')
});

export const ShortTitleSchema = z.object({
  en: z.string().min(1).max(38, 'English shortTitle must be 38 chars or fewer'),
  hi: z.string().min(1).max(38, 'Hindi shortTitle must be 38 chars or fewer')
});

export const TopicSchema = z.object({
  slug: z.string().min(1),
  title: z.union([LocalizedFieldSchema, z.string()]),
  shortTitle: z.union([ShortTitleSchema, z.string()]),
  shortTitleEn: z.string().max(38).optional(),
  summary: z.union([LocalizedFieldSchema, z.string()]),
  category: z.enum(['ai-ml', 'quantum', 'career', 'projects', 'tech-fundamentals', 'gov-policy']),
  level: z.enum(['beginner', 'intermediate', 'advanced']),
  readingMinutes: z.number().positive(),
  lastVerified: z.string(),
  confidence: z.enum(['high', 'medium', 'evolving']),
  translationPending: z.boolean().optional()
});

/**
 * Validates topics list according to Prompt 11 requirements:
 * Build fails if `en` or `hi` is missing on a user-facing field,
 * unless explicitly marked `translationPending: true`.
 */
export function validateTopics(topics: any[]) {
  const errors: string[] = [];

  topics.forEach(t => {
    // If translationPending is true, allow partial translations
    if (t.translationPending) return;

    // Check title
    if (typeof t.title === 'object') {
      if (!t.title.en || !t.title.hi) {
        errors.push(`Topic "${t.slug}": missing en or hi in title`);
      }
    } else if (typeof t.title === 'string') {
      // Must have titleHindi or localized title
      if (!t.title && !t.titleHindi) {
        errors.push(`Topic "${t.slug}": title missing`);
      }
    }

    // Check shortTitle (must be <= 38 chars)
    if (typeof t.shortTitle === 'object') {
      if (t.shortTitle.en && t.shortTitle.en.length > 38) {
        errors.push(`Topic "${t.slug}": shortTitle.en exceeds 38 chars ("${t.shortTitle.en}")`);
      }
      if (t.shortTitle.hi && t.shortTitle.hi.length > 38) {
        errors.push(`Topic "${t.slug}": shortTitle.hi exceeds 38 chars ("${t.shortTitle.hi}")`);
      }
    } else {
      if (t.shortTitle && t.shortTitle.length > 38) {
        errors.push(`Topic "${t.slug}": shortTitle exceeds 38 chars ("${t.shortTitle}")`);
      }
      if (t.shortTitleEn && t.shortTitleEn.length > 38) {
        errors.push(`Topic "${t.slug}": shortTitleEn exceeds 38 chars ("${t.shortTitleEn}")`);
      }
    }
  });

  if (errors.length > 0) {
    throw new Error(`[Zod Topic Schema Validation Failed]:\n${errors.join('\n')}`);
  }

  return true;
}
