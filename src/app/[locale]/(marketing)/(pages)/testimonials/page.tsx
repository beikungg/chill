import { ChiliPageHeader } from '@/components/chili/page-header';
import { Band } from '@/components/chili/section';
import { TESTIMONIALS, localized } from '@/config/chili-content';
import { constructMetadata } from '@/lib/metadata';
import { getUrlWithLocale } from '@/lib/urls/urls';
import type { Metadata } from 'next';
import type { Locale } from 'next-intl';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata | undefined> {
  const { locale } = await params;
  const t = await getTranslations({
    locale,
    namespace: 'ChiliCareer.pages.testimonials',
  });
  const m = await getTranslations({ locale, namespace: 'Metadata' });

  return constructMetadata({
    title: `${t('eyebrow')} | ${m('title')}`,
    description: t('subtitle'),
    canonicalUrl: getUrlWithLocale('/testimonials', locale),
  });
}

/**
 * Testimonials — docs/design-spec.md §5.2.
 *
 * Two-column quote grid on paper. Attribution is anonymised by default because
 * naming a client requires their consent under the GDPR; the subtitle says so
 * plainly rather than leaving the reader to wonder why no logos appear.
 */
export default async function TestimonialsPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({
    locale,
    namespace: 'ChiliCareer.pages.testimonials',
  });

  return (
    <>
      <ChiliPageHeader
        eyebrow={t('eyebrow')}
        title={t('title')}
        subtitle={t('subtitle')}
      />

      <Band tone="light">
        {TESTIMONIALS.length === 0 ? (
          <p className="text-lg text-muted-foreground">{t('empty')}</p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {TESTIMONIALS.map((item, index) => (
              <figure
                key={`${item.company.en ?? index}`}
                className="flex flex-col rounded-sm border border-border bg-card p-7 md:p-8"
              >
                <span
                  aria-hidden="true"
                  className="font-mono text-4xl leading-none text-primary"
                >
                  &ldquo;
                </span>

                <blockquote className="mt-3 flex-1 font-display text-xl font-medium leading-[1.4] tracking-[-0.01em] md:text-[22px]">
                  {localized(item.quote, locale)}
                </blockquote>

                <figcaption className="mt-6 flex flex-col gap-0.5 border-t border-border pt-5">
                  <span className="text-[15px] font-semibold">
                    {item.name ?? localized(item.role, locale)}
                  </span>
                  <span className="font-mono text-[13px] text-muted-foreground">
                    {item.name
                      ? `${localized(item.role, locale)} · ${localized(item.company, locale)}`
                      : localized(item.company, locale)}
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        )}
      </Band>
    </>
  );
}
