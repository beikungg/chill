import { ChiliPageHeader } from '@/components/chili/page-header';
import { Band } from '@/components/chili/section';
import { EVENTS, formatEventDate, localized } from '@/config/chili-content';
import { constructMetadata } from '@/lib/metadata';
import { getUrlWithLocale } from '@/lib/urls/urls';
import type { Metadata } from 'next';
import type { Locale } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import Image from 'next/image';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata | undefined> {
  const { locale } = await params;
  const t = await getTranslations({
    locale,
    namespace: 'ChiliCareer.pages.events',
  });
  const m = await getTranslations({ locale, namespace: 'Metadata' });

  return constructMetadata({
    title: `${t('eyebrow')} | ${m('title')}`,
    description: t('subtitle'),
    canonicalUrl: getUrlWithLocale('/events', locale),
  });
}

/**
 * Events — docs/design-spec.md §5.2.
 *
 * Grouped by year, newest first, with the year set as an oversized mono numeral.
 * Grouping by year is information rather than decoration: for a firm whose
 * events accumulate, the year is how a reader locates something.
 */
export default async function EventsPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({
    locale,
    namespace: 'ChiliCareer.pages.events',
  });

  const byYear = new Map<string, typeof EVENTS>();
  for (const event of [...EVENTS].sort((a, b) =>
    b.date.localeCompare(a.date)
  )) {
    const year = event.date.slice(0, 4);
    byYear.set(year, [...(byYear.get(year) ?? []), event]);
  }

  return (
    <>
      <ChiliPageHeader
        eyebrow={t('eyebrow')}
        title={t('title')}
        subtitle={t('subtitle')}
      />

      <Band tone="light">
        {byYear.size === 0 ? (
          <p className="text-lg text-muted-foreground">{t('empty')}</p>
        ) : (
          <div className="flex flex-col gap-16 md:gap-20">
            {[...byYear.entries()].map(([year, events]) => (
              <section key={year}>
                <h2 className="border-b border-border pb-4 font-mono text-3xl font-medium tabular-nums tracking-[0.02em] text-muted-foreground md:text-4xl">
                  {year}
                </h2>

                <div className="mt-8 grid gap-6 md:grid-cols-3">
                  {events.map((event) => (
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

                      <div className="flex flex-col gap-1.75 p-5 pb-6">
                        <div className="flex gap-3.5 font-mono text-[13px] tabular-nums">
                          <span className="font-medium text-primary">
                            {formatEventDate(event.date)}
                          </span>
                          <span className="text-muted-foreground">
                            {event.city}
                          </span>
                        </div>

                        <h3 className="font-display text-xl font-semibold tracking-[-0.01em]">
                          {localized(event.title, locale)}
                        </h3>

                        <span className="font-mono text-[13px] uppercase tracking-[0.06em] text-muted-foreground">
                          {localized(event.type, locale)}
                        </span>
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            ))}
          </div>
        )}
      </Band>
    </>
  );
}
