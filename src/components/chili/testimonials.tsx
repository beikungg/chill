import { Band, Eyebrow } from '@/components/chili/section';
import { TESTIMONIALS, localized } from '@/config/chili-content';
import { useLocale, useTranslations } from 'next-intl';

/**
 * 04 Testimonials — docs/design-spec.md §4.
 *
 * Built so a single quote is a complete design rather than a gap waiting to be
 * filled: one oversized quotation set on the ink ground, attribution below in
 * mono. The brief says testimonials arrive progressively, and the section
 * returns null when none exist — better no section than an empty shelf.
 *
 * Attribution degrades gracefully: many clients will not consent to being
 * named (which GDPR requires), so role plus anonymised company is the default
 * and `name` is optional.
 */
export function ChiliTestimonials() {
  const t = useTranslations('ChiliCareer.testimonials');
  const locale = useLocale();

  if (TESTIMONIALS.length === 0) {
    return null;
  }

  const [first] = TESTIMONIALS;

  return (
    <Band tone="dark" id="testimonials">
      <Eyebrow>{t('eyebrow')}</Eyebrow>

      <figure className="mt-9 max-w-225">
        <span
          aria-hidden="true"
          className="block font-mono text-5xl leading-none text-primary"
        >
          &ldquo;
        </span>

        <blockquote className="mt-2 max-w-[34ch] font-display text-[22px] font-medium leading-[1.35] tracking-[-0.015em] md:text-[28px]">
          {localized(first.quote, locale)}
        </blockquote>

        <figcaption className="mt-6 flex flex-col gap-0.5">
          <span className="text-[15px] font-semibold">
            {first.name ?? localized(first.role, locale)}
          </span>
          <span className="font-mono text-[13px] text-muted-foreground">
            {first.name
              ? `${localized(first.role, locale)} · ${localized(first.company, locale)}`
              : localized(first.company, locale)}
          </span>
        </figcaption>
      </figure>

      {/* Square indicators, not dots — consistent with the 2px radius system. */}
      {TESTIMONIALS.length > 1 && (
        <div className="mt-10 flex gap-1.5" aria-hidden="true">
          {TESTIMONIALS.map((item, index) => (
            <span
              key={item.company.en ?? index}
              className={
                index === 0 ? 'h-0.75 w-4 bg-primary' : 'size-0.75 bg-border'
              }
            />
          ))}
        </div>
      )}
    </Band>
  );
}
