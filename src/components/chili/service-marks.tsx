import { cn } from '@/lib/utils';

/**
 * Service marks — the three per-service glyphs, for the navigation dropdown.
 *
 * DEVIATION FROM SPEC (owner-approved): §1.3 and §4 §03 both say the services
 * module uses no icons, only mono numerals. The owner asked for marks in the
 * dropdown, where there are no numerals to carry the distinction.
 *
 * What keeps this inside the spirit of the constraint: these are not library
 * icons. §1.2 fixes the reticle as the site's one structural symbol, so each
 * mark is a *variation on the crosshair* rather than a new pictogram — same 1px
 * stroke, same targeting idea, inflected three ways:
 *
 *   Recruitment      one of many — a field of candidates, one locked on
 *   Executive search the top of a range — the crosshair on the highest mark
 *   HR consulting    a structure framed — corner brackets around an axis
 *
 * Drawn on a 16-unit grid at 1px stroke with `currentColor`, so they inherit the
 * dropdown's hover states exactly as the text does. Total site icon count stays
 * inside the §1.3 budget of 8: ArrowRight plus these three.
 */

const box = 'size-4 shrink-0';

function Frame({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth={1}
      strokeLinecap="square"
      aria-hidden="true"
      className={cn(box, className)}
    >
      {children}
    </svg>
  );
}

/** 01 Recruitment — a field of candidates with one locked on. */
export function RecruitmentMark({ className }: { className?: string }) {
  return (
    <Frame className={className}>
      {/* The field: four unselected candidates, held back at half weight. */}
      <g opacity={0.45}>
        <path d="M2.5 3.5h1M12.5 3.5h1M2.5 12.5h1M12.5 12.5h1" />
      </g>
      {/* The lock: crosshair centred on the one that matters. */}
      <path d="M8 1.5v3M8 11.5v3M1.5 8h3M11.5 8h3" />
      <circle cx="8" cy="8" r="2.5" />
    </Frame>
  );
}

/** 02 Executive search — the crosshair on the top of a range. */
export function ExecutiveSearchMark({ className }: { className?: string }) {
  return (
    <Frame className={className}>
      {/* Ascending marks; the tallest is the mandate. */}
      <g opacity={0.45}>
        <path d="M2.5 13.5v-3M6 13.5v-5.5" />
      </g>
      <path d="M9.5 13.5v-8" />
      {/* Lock-on at the summit. */}
      <path d="M13 2.5v2.5M13 8v2.5M10.5 6.5h1.5M14 6.5h1.5" />
      <circle cx="13" cy="6.5" r="1.5" />
    </Frame>
  );
}

/** 03 HR consulting — a structure framed by corner brackets. */
export function HrConsultingMark({ className }: { className?: string }) {
  return (
    <Frame className={className}>
      {/* Corner brackets: the scope of an engagement, not a closed box. */}
      <path d="M2 5.5V2h3.5M14 5.5V2h-3.5M2 10.5V14h3.5M14 10.5V14h-3.5" />
      {/* The axis being measured, with one node on it. */}
      <g opacity={0.45}>
        <path d="M8 4.5v7" />
      </g>
      <path d="M5.5 8h5" />
    </Frame>
  );
}
