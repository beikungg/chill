import { Band, Eyebrow, SectionTitle } from '@/components/chili/section';
import { EVENTS, formatEventDate, localized } from '@/config/chili-content';
import { LocaleLink } from '@/i18n/navigation';
import { Routes } from '@/routes';
import { ArrowRightIcon } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import Image from 'next/image';

/**
 * 06 Events — docs/design-spec.md §4.
 *
 * Image + name + date + city, as the brief specifies. Photography is greyscale
 * at rest for two reasons: it levels the colour cast across pictures from many
 * sources, and it steers well clear of the glossy stock-photo look the brief
 * rules out. Colour on hover rewards interest without shouting.
 *
 * Shows the three newest entries; /events carries the full list by year.
 */
export function ChiliEvents() {
  const t = useTranslations('ChiliCareer');
  const locale = useLocale();

  if (EVENTS.length === 0) {
    return null;
  }

  const featured = EVENTS.slice(0, 3);

  return (
    <Band tone="light" id="events" flush>
      <Eyebrow>{t('events.eyebrow')}</Eyebrow>
      <SectionTitle>{t('events.title')}</SectionTitle>

      <div className="mt-11 grid gap-6 md:grid-cols-3">
        {featured.map((event) => (
          <article
            key={`${event.date}-${event.city}`}
            className="group flex flex-col overflow-hidden rounded-sm border border-border bg-card"
          >
            <div className="relative aspect-3/2 bg-secondary grayscale transition-[filter] duration-250 group-hover:grayscale-0">
              {event.image && (
                <Image
                  src={event.image}
                  alt={localized(event.title, locale)}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              )}
            </div>

            <div className="flex flex-col gap-1.75 p-5 pb-6 md:px-5.5">
              <div className="flex gap-3.5 font-mono text-[13px] tabular-nums">
                <span className="font-medium text-primary">
                  {formatEventDate(event.date)}
                </span>
                <span className="text-muted-foreground">{event.city}</span>
              </div>

              <h3 className="font-display text-xl font-semibold tracking-[-0.01em]">
                {event.title && localized(event.title, locale)}
              </h3>

              <span className="font-mono text-[13px] uppercase tracking-[0.06em] text-muted-foreground">
                {localized(event.type, locale)}
              </span>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-8 flex justify-end">
        <LocaleLink
          href={Routes.Events}
          className="group inline-flex items-center gap-1.5 font-display text-[15px] font-semibold underline-offset-4 hover:underline hover:decoration-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
        >
          {t('cta.allEvents')}
          <ArrowRightIcon
            className="size-3.5 transition-transform group-hover:translate-x-0.5"
            aria-hidden="true"
          />
        </LocaleLink>
      </div>
    </Band>
  );
}
