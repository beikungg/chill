import { cn } from '@/lib/utils';

/**
 * Reticle — the one recurring structural mark on the site.
 *
 * A crosshair, not an icon: it carries the brand claim ("We don't search. We
 * target.") into the layout itself. The brief rules out icon clutter, so this
 * is deliberately the *only* repeated glyph, and it appears in exactly three
 * places (docs/design-spec.md §1.2):
 *   1. before every section eyebrow
 *   2. beside the wordmark
 *   3. the hero lock-on animation
 *
 * Drawn as two 1px lines rather than an SVG path so it stays pixel-crisp at
 * small sizes and inherits the accent colour through `bg-primary`.
 */
export function Reticle({
  className,
  size = 9,
}: {
  className?: string;
  size?: number;
}) {
  const mid = size / 2;

  return (
    <span
      aria-hidden="true"
      className={cn('relative inline-block shrink-0', className)}
      style={{ width: size, height: size }}
    >
      <span
        className="absolute bg-primary"
        style={{ left: mid, top: 0, width: 1, height: size }}
      />
      <span
        className="absolute bg-primary"
        style={{ top: mid, left: 0, height: 1, width: size }}
      />
    </span>
  );
}
