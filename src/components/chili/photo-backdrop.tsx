'use client';

import { cn } from '@/lib/utils';
import Image from 'next/image';
import { useEffect, useState } from 'react';

/**
 * PhotoBackdrop — the ink-scrimmed photographic ground used by the hero and the
 * services page header.
 *
 * DEVIATION FROM SPEC (owner-approved): design-spec §4 §01 specifies an
 * image-free ink ground, and §1.3 rules out meeting/interview photography. The
 * owner chose photography anyway. What keeps it from reading as the competitor
 * template the brief was reacting to:
 *
 *   - Near-monochrome (grayscale 85% / contrast 1.1 / brightness 0.6), so the
 *     frames carry light and form rather than a stock library's warm palette.
 *   - A left-anchored ink scrim the type sits inside; the photograph only
 *     resolves in the right third, where nothing competes with it.
 *   - Full frames, never cropped tighter than the source: a crop that slices
 *     through someone's head is worse than no photograph at all.
 *
 * The brightness/scrim values are measured, not eyeballed. §2.1 fixes the AA
 * floors for this ground and a photograph raises background luminance enough to
 * break them: at brightness 1.0 under a 92% scrim, silver #8E9299 measures
 * 2.37:1 and chili #E8404F 1.86:1 — both fail. Compositing the actual pixels of
 * all three frames against candidate scrims gives brightness 0.6 + a 96/93%
 * wash as the lightest treatment that clears AA everywhere type sits:
 *
 *   desktop   dk-text 13.49-13.82:1   silver 4.84-4.96:1   chili 3.80-3.89:1
 *   mobile    dk-text 15.04:1         silver 5.40:1        chili 4.24:1
 *
 * silver carries body copy and needs 4.5:1. chili appears only on the 24px/600
 * brand claim — WCAG large text, so its floor is 3:1. Re-measure with
 * `scripts/check-backdrop-contrast.py` if the photographs, the treatment, or
 * those type sizes change.
 */

export type BackdropFrame = {
  src: string;
  blurDataURL: string;
  /** object-position on desktop; picked per frame from a brightness scan. */
  position: string;
};

export function PhotoBackdrop({
  frames,
  interval = 7000,
  className,
}: {
  frames: BackdropFrame[];
  /** Hold per frame in ms. Ignored when only one frame is supplied. */
  interval?: number;
  className?: string;
}) {
  const active = useRotation(frames.length, interval);

  return (
    <div
      aria-hidden="true"
      className={cn(
        'pointer-events-none absolute inset-0 overflow-hidden',
        className
      )}
    >
      {frames.map((frame, i) => (
        <div
          key={frame.src}
          /* Opacity is the only animated property, and the drift runs on
             transform — both compositor-only, so the crossfade costs no layout. */
          className={cn(
            'absolute inset-0 transition-opacity duration-[2000ms] ease-in-out motion-reduce:transition-none',
            i === active ? 'opacity-100' : 'opacity-0'
          )}
        >
          <Image
            src={frame.src}
            alt=""
            fill
            /* Only the first frame blocks paint; the rest are ahead of their turn. */
            priority={i === 0}
            loading={i === 0 ? undefined : 'lazy'}
            sizes="100vw"
            placeholder="blur"
            blurDataURL={frame.blurDataURL}
            className={cn(
              'select-none object-cover brightness-[0.6] contrast-[1.1] grayscale-[0.85]',
              'object-[68%_75%]',
              i === active && 'animate-backdrop-drift',
              frame.position
            )}
          />
        </div>
      ))}

      {/* Scrim, mobile: the copy runs full width here, so the wash has to be
          near-uniform rather than directional. */}
      <div
        className="absolute inset-0 md:hidden"
        style={{
          background:
            'linear-gradient(to bottom, rgba(12,13,15,0.90) 0%, rgba(12,13,15,0.93) 55%, rgba(12,13,15,0.88) 100%)',
        }}
      />

      {/* Scrim, desktop: left-to-right ink wash for type contrast, a top wash so
          the navbar hairline stays legible, and a bottom fade into the next band. */}
      <div
        className="absolute inset-0 hidden md:block"
        style={{
          background: [
            'linear-gradient(to right, rgba(12,13,15,0.96) 0%, rgba(12,13,15,0.93) 45%, rgba(12,13,15,0.62) 72%, rgba(12,13,15,0.20) 100%)',
            'linear-gradient(to bottom, rgba(12,13,15,0.72) 0%, transparent 22%)',
            'linear-gradient(to top, rgba(12,13,15,0.9) 0%, transparent 30%)',
          ].join(', '),
        }}
      />

      {/* Grain, to break up gradient banding across a wide dark surface. */}
      <div
        className="absolute inset-0 opacity-[0.14] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3'/%3E%3C/filter%3E%3Crect width='140' height='140' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />
    </div>
  );
}

/**
 * Advances the active frame, and stops entirely when the visitor asked for
 * reduced motion or the tab is hidden.
 *
 * The global `prefers-reduced-motion` reset in globals.css zeroes transition
 * duration, which would turn each rotation into a hard cut — worse than a still
 * image. So the rotation is skipped here rather than merely un-animated.
 */
function useRotation(count: number, interval: number) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (count < 2) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (reduced.matches) return;

    let timer: ReturnType<typeof setInterval> | undefined;

    const start = () => {
      timer ??= setInterval(() => setActive((i) => (i + 1) % count), interval);
    };
    const stop = () => {
      if (timer) clearInterval(timer);
      timer = undefined;
    };

    const sync = () => (document.hidden ? stop() : start());

    sync();
    document.addEventListener('visibilitychange', sync);
    reduced.addEventListener('change', sync);

    return () => {
      stop();
      document.removeEventListener('visibilitychange', sync);
      reduced.removeEventListener('change', sync);
    };
  }, [count, interval]);

  return active;
}

/**
 * The three licensed frames, in rotation order. Positions are chosen per frame
 * from a brightness scan rather than shared, because the dark region sits in a
 * different place in each one and the type always has to land on it.
 */
export const HERO_FRAMES: BackdropFrame[] = [
  // Group at the desk: darkest quadrant is lower-left (41-103/255).
  {
    src: '/images/hero/hero-desk.jpg',
    position: 'md:object-[left_bottom]',
    blurDataURL:
      'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAALABADASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwCVNTaS2jMe5DGVHJ7HqKlufNuJtqYWNxnIGT+VZWnzyJ91hycHgHNXbuRhYSyhiJCPvd6h7FKx/9k=',
  },
  // Meeting frame: bright on the left, so pull the crop rightward.
  {
    src: '/images/hero/hero-meeting.jpg',
    position: 'md:object-[30%_70%]',
    blurDataURL:
      'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAALABADASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwC/Je/ZkSTGQQBnGe/NU9VnEsDyLIIyDmP1JrTt4I3tUDICGHI9a5PVnY3Trn5VOAMdBUxTZTaWx//Z',
  },
  // Walking frame: the dark band sits just left of centre.
  {
    src: '/images/hero/hero-walking.jpg',
    position: 'md:object-[38%_center]',
    blurDataURL:
      'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAALABADASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwCaGWRr2USHO8k5Pb0FQMCl/Eud27JJ9fwpbVi2uXQYkgKcDt2qCRidUjyeinFZN2ZpHY//2Q==',
  },
];

/**
 * The services header uses the same three frames in a different order, so the
 * page does not open on the image the homepage just showed. The meeting frame
 * leads here: it is the one that reads as advisory work rather than a team at a
 * desk, which is what the three mandates below it are.
 */
export const SERVICES_FRAMES: BackdropFrame[] = [
  HERO_FRAMES[1],
  HERO_FRAMES[2],
  HERO_FRAMES[0],
];
