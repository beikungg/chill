import {
  Archivo,
  IBM_Plex_Mono,
  Noto_Sans_SC,
  Source_Sans_3,
} from 'next/font/google';

/**
 * Chili Career GmbH — brand typefaces
 *
 * See docs/design-spec.md §2.2 for the rationale behind each choice.
 *
 * Fonts are downloaded at build time and self-hosted with the rest of the
 * static assets, so there is no runtime request to Google.
 * https://nextjs.org/docs/app/building-your-application/optimizing/fonts
 *
 * NOTICE: `latin-ext` is required on the Latin faces — German umlauts and ß
 * live outside the base `latin` subset.
 */

/**
 * Display / headings — Archivo
 *
 * A grotesque with tight apertures and cleanly cut terminals: it reads as
 * engineered rather than humanist, which is what "We don't search. We target."
 * needs. Deliberately not Inter or Space Grotesk.
 *
 * https://fonts.google.com/specimen/Archivo
 */
export const fontDisplay = Archivo({
  subsets: ['latin', 'latin-ext'],
  display: 'swap',
  variable: '--font-display',
  weight: ['400', '500', '600', '700'],
});

/**
 * Body — Source Sans 3
 *
 * Wider skeleton than Archivo, so long German paragraphs with compound nouns
 * stay readable at 17px.
 *
 * https://fonts.google.com/specimen/Source+Sans+3
 */
export const fontBody = Source_Sans_3({
  subsets: ['latin', 'latin-ext'],
  display: 'swap',
  variable: '--font-body',
  weight: ['400', '600'],
});

/**
 * Data / labels — IBM Plex Mono
 *
 * Coordinates, dates, section numbers, eyebrow labels. Reinforces the
 * "precise targeting" semantics rather than decorating with icons.
 *
 * https://fonts.google.com/specimen/IBM+Plex+Mono
 */
export const fontMono = IBM_Plex_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-mono',
  weight: ['400', '500'],
});

/**
 * Chinese — Noto Sans SC
 *
 * Takes over only under `:lang(zh)`; its greyscale sits close to Archivo's.
 *
 * `preload: false` is deliberate: the simplified-Chinese subset is split into
 * many unicode-range files, and preloading them all would block rendering for
 * EN/DE visitors who never need a single glyph.
 *
 * https://fonts.google.com/noto/specimen/Noto+Sans+SC
 */
export const fontCJK = Noto_Sans_SC({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-cjk',
  weight: ['400', '500', '700'],
  preload: false,
});
