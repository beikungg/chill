import {
  type BackdropFrame,
  PhotoBackdrop,
} from '@/components/chili/photo-backdrop';
import { Reticle } from '@/components/chili/reticle';
import type { ReactNode } from 'react';

/**
 * Shared subpage header — ink ground, eyebrow, h1, one line of subtitle.
 * docs/design-spec.md §5.
 *
 * Fixed height rather than viewport-relative: subpages are read, not landed on,
 * so the header states what the page is and gets out of the way.
 *
 * `frames` opts a page into the photographic ground. It is opt-in per page, not
 * the default: /impressum and /datenschutz are legal notices, and photography
 * behind a statutory disclosure reads as marketing dressing on a legal
 * obligation. Taller too when photographic — a 280px band cropped out of a
 * 3:2 frame keeps almost nothing of the composition.
 */
export function ChiliPageHeader({
  eyebrow,
  title,
  subtitle,
  frames,
}: {
  eyebrow: string;
  title: ReactNode;
  subtitle?: string;
  frames?: BackdropFrame[];
}) {
  return (
    <header
      className={`dark relative flex items-center overflow-hidden bg-background px-6 py-20 text-foreground md:px-12 lg:px-20 ${
        frames ? 'min-h-96 md:min-h-[26rem]' : 'min-h-70'
      }`}
    >
      {frames && <PhotoBackdrop frames={frames} />}

      <div className="relative mx-auto w-full max-w-320">
        <p className="flex items-center gap-2.5 font-mono text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
          <Reticle />
          {eyebrow}
        </p>

        <h1 className="mt-6 font-display text-[34px] font-semibold leading-[1.08] tracking-[-0.02em] md:text-[56px] md:tracking-[-0.03em]">
          {title}
        </h1>

        {subtitle && (
          <p className="mt-4 max-w-[68ch] text-lg leading-relaxed text-muted-foreground md:text-xl">
            {subtitle}
          </p>
        )}
      </div>
    </header>
  );
}
