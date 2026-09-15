'use client';

import { cn } from '@/lib/utils';
import Image from 'next/image';

/**
 * Chili Career wordmark.
 *
 * Two assets rather than one: the mark is pure black ink, which vanishes on the
 * ink ground, so the dark-theme variant is the light-ink cut. Both are
 * transparent PNGs derived from the brand files in docs/ (see docs/design-spec.md
 * §9 item 4 — vector SVG is still outstanding from the client, and these
 * raster cuts are the interim).
 *
 * Rendering both and toggling with CSS avoids the hydration flash you get from
 * reading the theme in JS: the correct one is painted on first frame.
 */
export function Logo({ className }: { className?: string }) {
  const dimensions = { width: 523, height: 192 };

  return (
    <span className={cn('relative block h-8 w-[87px] shrink-0', className)}>
      <Image
        src="/brand/logo-wordmark-ink.png"
        alt="Chili Career"
        {...dimensions}
        priority
        className="h-full w-full object-contain object-left dark:hidden"
      />
      <Image
        src="/brand/logo-wordmark-light.png"
        alt=""
        aria-hidden="true"
        {...dimensions}
        priority
        className="hidden h-full w-full object-contain object-left dark:block"
      />
    </span>
  );
}
