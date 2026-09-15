/**
 * Editable content for the Chili Career homepage sections that grow over time:
 * testimonials, partners and events.
 *
 * The brief says these are filled in progressively, so they live here as plain
 * data rather than in translation files or a CMS. Adding an entry is a one-line
 * change and requires no component edits.
 *
 * EMPTY IS VALID. Every consuming section hides itself when its array is empty
 * (docs/design-spec.md §4) — a boutique firm does not display an empty shelf
 * with "no reviews yet".
 */

export type Testimonial = {
  /** Per-locale quote text, keyed by locale. Falls back to `en`. */
  quote: Record<string, string>;
  /** Attribution. Leave `name` empty to show role and company only — several
   *  clients will not consent to being named, which GDPR requires. */
  name?: string;
  role: Record<string, string>;
  company: Record<string, string>;
};

export type Partner = {
  name: string;
  /** Optional logo in /public. When absent the name is set as a wordmark, which
   *  is the honest placeholder until logo usage rights are granted. */
  logo?: string;
  url?: string;
};

export type EventItem = {
  /** ISO date — rendered as YYYY.MM.DD in mono. */
  date: string;
  city: string;
  title: Record<string, string>;
  type: Record<string, string>;
  image?: string;
  url?: string;
};

/**
 * Placeholder from the design spec. Replace with real, consented quotes.
 */
export const TESTIMONIALS: Testimonial[] = [
  {
    quote: {
      en: 'They presented four candidates. We hired two. That is a hit rate no other partner has come close to in this market.',
      de: 'Sie haben vier Kandidaten vorgestellt. Zwei haben wir eingestellt. Diese Trefferquote hat in diesem Markt kein anderer Partner erreicht.',
      zh: '他们推荐了四位候选人，我们录用了两位。这个命中率在这个市场上没有其他合作方能达到。',
    },
    role: {
      en: 'Managing Director',
      de: 'Geschäftsführer',
      zh: '总经理',
    },
    company: {
      en: 'Automotive supplier · North Rhine-Westphalia',
      de: 'Automobilzulieferer · Nordrhein-Westfalen',
      zh: '汽车零部件供应商 · 北莱茵-威斯特法伦州',
    },
  },
];

/**
 * Associations and partner organisations. Names only until logo files and
 * usage rights arrive from the client (docs/design-spec.md §9, item 6).
 */
export const PARTNERS: Partner[] = [
  { name: 'AHK Greater China' },
  { name: 'BDU' },
  { name: 'IHK Düsseldorf' },
  { name: 'China Competence NRW' },
  { name: 'Eurochambres' },
];

/**
 * Newest first. The homepage shows the first three; /events shows all,
 * grouped by year.
 */
export const EVENTS: EventItem[] = [
  {
    date: '2026-03-18',
    city: 'Düsseldorf',
    title: {
      en: 'China–NRW Business Forum',
      de: 'China–NRW Wirtschaftsforum',
      zh: '中国–北威州经济论坛',
    },
    type: { en: 'Forum', de: 'Forum', zh: '论坛' },
  },
  {
    date: '2026-02-05',
    city: 'Frankfurt',
    title: {
      en: 'European Talent Roadshow',
      de: 'European Talent Roadshow',
      zh: '欧洲人才路演',
    },
    type: { en: 'Roadshow', de: 'Roadshow', zh: '路演' },
  },
  {
    date: '2025-11-22',
    city: 'Shanghai',
    title: {
      en: 'Hiring in Germany: Legal & Cultural Briefing',
      de: 'Einstellen in Deutschland: Recht & Kultur',
      zh: '在德国招聘：法律与文化简报',
    },
    type: { en: 'Seminar', de: 'Seminar', zh: '讲座' },
  },
];

/**
 * Reads a locale-keyed field, falling back to English when a translation is
 * still missing. Copy is filled in progressively, so a missing locale must
 * degrade rather than render blank.
 */
export function localized(
  field: Record<string, string>,
  locale: string
): string {
  return field[locale] ?? field.en ?? Object.values(field)[0] ?? '';
}

/** Formats an ISO date as YYYY.MM.DD — mono, tabular, locale-independent. */
export function formatEventDate(iso: string): string {
  return iso.replaceAll('-', '.');
}
