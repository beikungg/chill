import { ChiliContactForm } from '@/components/chili/contact-form';
import { ChiliPageHeader } from '@/components/chili/page-header';
import { Band, Eyebrow } from '@/components/chili/section';
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
    namespace: 'ChiliCareer.pages.contact',
  });
  const m = await getTranslations({ locale, namespace: 'Metadata' });

  return constructMetadata({
    title: `${t('eyebrow')} | ${m('title')}`,
    description: t('subtitle'),
    canonicalUrl: getUrlWithLocale('/contact', locale),
  });
}

/**
 * Contact — docs/design-spec.md §5.3.
 *
 * The enquiry form is the page, so it gets the left column and the room. The
 * right column keeps the direct route open: someone who would rather send an
 * email should not have to fill in a form to find the address.
 */
export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({
    locale,
    namespace: 'ChiliCareer.pages.contact',
  });
  const c = await getTranslations({ locale, namespace: 'ChiliCareer' });

  return (
    <>
      <ChiliPageHeader
        eyebrow={t('eyebrow')}
        title={t('title')}
        subtitle={t('subtitle')}
      />

      <Band tone="light">
        <div className="grid gap-14 md:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] md:gap-20">
          <div>
            <Eyebrow>{t('formLabel')}</Eyebrow>
            <div className="mt-8">
              <ChiliContactForm />
            </div>
          </div>

          <div className="flex flex-col gap-10 border-t border-border pt-9 md:border-l md:border-t-0 md:pl-16 md:pt-0">
            <div>
              <h2 className="font-mono text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
                {t('directLabel')}
              </h2>
              <a
                href={`mailto:${c('contact.email')}`}
                className="mt-4 inline-block font-mono text-[15px] underline-offset-4 hover:underline hover:decoration-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
              >
                {c('contact.email')}
              </a>
            </div>

            <div>
              <h2 className="font-mono text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
                {t('officeLabel')}
              </h2>
              <p className="mt-4 font-mono text-[13px] leading-loose text-muted-foreground">
                {c('brand.legalName')}
                <br />
                {c('brand.city')}, {c('brand.country')}
                <br />
                <span className="tabular-nums">{c('brand.coordinates')}</span>
              </p>
            </div>
          </div>
        </div>
      </Band>
    </>
  );
}
