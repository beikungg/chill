'use client';

import { cn } from '@/lib/utils';
import { type ReactNode, useEffect, useRef, useState } from 'react';

/**
 * Reveal — the scroll transition for homepage bands.
 *
 * §2.4 caps motion at "one orchestrated moment, everything else under 250ms",
 * and the hero lock-on already spends that moment. So this is deliberately the
 * least a reveal can be and still register: 16px of lift and a fade, once, on
 * first entry. No parallax, no scale, no stagger between bands — at 120px
 * section spacing a staggered page turns into a queue of things arriving.
 *
 * Implementation notes:
 *   - IntersectionObserver, not scroll offset, so nothing runs on the scroll
 *     thread and the browser can drop the work when the tab is backgrounded.
 *   - Unobserves after firing. These never animate out; a band that re-fades
 *     every time it re-enters reads as a page that cannot sit still.
 *   - Renders visible when JS has not run and under reduced motion, so content
 *     is never gated behind an effect that might not fire.
 */
/**
 * Releases every pending reveal when scripting is off. Rendered once per page by
 * <RevealNoscript/> in the marketing layout; a stylesheet rule cannot do this
 * job alone because it has no way to detect the absence of JavaScript.
 */
export function RevealNoscript() {
  return (
    <noscript>
      <style
        // biome-ignore lint/security/noDangerouslySetInnerHtml: static literal, no interpolation, no user input
        dangerouslySetInnerHTML={{
          __html: "[data-reveal='pending']{opacity:1 !important}",
        }}
      />
    </noscript>
  );
}

export function Reveal({
  children,
  className,
  /** Nudge the trigger point; negative bottom margin fires it slightly late. */
  rootMargin = '0px 0px -12% 0px',
  delay,
}: {
  children: ReactNode;
  className?: string;
  rootMargin?: string;
  /** ms. Use sparingly — only for elements that share a band. */
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setShown(true);
      return;
    }

    // Already in view on load (above the fold): show without waiting for a
    // scroll that may never come.
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setShown(true);
        observer.disconnect();
      },
      { rootMargin, threshold: 0.05 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [rootMargin]);

  return (
    <div
      ref={ref}
      /* data-reveal carries the pre-reveal state instead of an inline opacity,
         so the noscript rule in globals.css can override it. Inline styles
         cannot be overridden by a stylesheet, which would leave the whole page
         invisible with JS disabled. */
      data-reveal={shown ? 'shown' : 'pending'}
      className={cn(
        'group/reveal',
        /* The wrapper fades as one; the parts inside stagger off this same data
           attribute — see Eyebrow and SectionTitle in section.tsx. */
        'data-[reveal=pending]:opacity-0',
        shown && 'animate-reveal-band',
        className
      )}
      style={shown && delay ? { animationDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}
