import { Reticle } from '@/components/chili/reticle';
import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';

/**
 * Band — a full-bleed section with the alternating dark/light rhythm from
 * docs/design-spec.md §4. Vertical padding is 120px desktop / 80px mobile,
 * which is what keeps the page from reading as crowded.
 *
 * `tone="dark"` paints the ink ground and flips the token set by scoping
 * `.dark` to the section, so children keep using semantic tokens
 * (text-foreground, text-muted-foreground) and never hard-code a colour that
 * only works on one ground.
 */
export function Band({
  children,
  tone = 'light',
  className,
  id,
  flush = false,
}: {
  children: ReactNode;
  tone?: 'light' | 'dark';
  className?: string;
  id?: string;
  /** Drop the top padding when this band continues the previous one. */
  flush?: boolean;
}) {
  return (
    <section
      id={id}
      className={cn(
        'w-full px-6 md:px-12 lg:px-20',
        flush ? 'pb-20 md:pb-30' : 'py-20 md:py-30',
        tone === 'dark' && 'dark bg-background text-foreground',
        className
      )}
    >
      <div className="mx-auto w-full max-w-320">{children}</div>
    </section>
  );
}

/**
 * Eyebrow — mono, uppercase, wide tracking, preceded by the reticle.
 */
export function Eyebrow({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p
      className={cn(
        'relative flex items-center gap-2.5 font-mono text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground',
        /* Inside a <Reveal>, the eyebrow leads: it unmasks left-to-right while
           the heading is still arriving. Outside one these selectors never
           match, so the component is unchanged on static pages. */
        'group-data-[reveal=shown]/reveal:animate-reveal-lead',
        className
      )}
    >
      <Reticle />
      {children}

      {/* A hairline drawn out below the eyebrow once it lands. Absolutely
          positioned and reveal-only: it is a transition artefact rather than a
          divider, and must not shift the vertical rhythm on pages that never
          reveal (every subpage). */}
      <span
        aria-hidden="true"
        className="absolute -bottom-2.5 left-0 hidden h-px w-14 origin-left bg-border [animation-delay:180ms] group-data-[reveal=shown]/reveal:block group-data-[reveal=shown]/reveal:animate-reveal-rule"
      />
    </p>
  );
}

/**
 * Highlight — the single accent word in a headline.
 *
 * Red is capped at roughly 5% of any viewport (design-spec §2.1); at most one
 * word per heading gets it. Saturating the accent turns boutique into discount.
 */
export function Highlight({ children }: { children: ReactNode }) {
  return <span className="text-primary">{children}</span>;
}

/**
 * SectionTitle — the h2 scale, with balanced wrapping and display face.
 */
export function SectionTitle({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <h2
      className={cn(
        'mt-7 font-display text-[30px] font-semibold leading-[1.15] tracking-[-0.02em] md:text-[44px] md:leading-[1.1]',
        /* Follows the eyebrow by 110ms — enough to read as a sequence, short
           enough that it never feels like waiting. */
        'group-data-[reveal=shown]/reveal:animate-reveal group-data-[reveal=shown]/reveal:[animation-delay:110ms]',
        className
      )}
    >
      {children}
    </h2>
  );
}

/**
 * Splits a translated string on a substring so one word can be accented
 * without duplicating the sentence across three locales.
 *
 * Falls back to the plain string when the highlight is absent — which is the
 * expected case for Chinese, where the accented word may be written
 * differently from the English source.
 */
export function withHighlight(text: string, highlight?: string) {
  if (!highlight) return text;
  const at = text.indexOf(highlight);
  if (at === -1) return text;

  return (
    <>
      {text.slice(0, at)}
      <Highlight>{highlight}</Highlight>
      {text.slice(at + highlight.length)}
    </>
  );
}
