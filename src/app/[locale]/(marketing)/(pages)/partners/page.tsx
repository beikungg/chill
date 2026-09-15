import { ChiliPageHeader } from '@/components/chili/page-header';
import { ChiliPartners } from '@/components/chili/partners';
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
    namespace: 'ChiliCareer.pages.partners',
  });
  const m = await getTranslations({ locale, namespace: 'Metadata' });

  return constructMetadata({
    title: `${t('eyebrow')} | ${m('title')}`,
    description: t('subtitle'),
    canonicalUrl: getUrlWithLocale('/partners', locale),
  });
}

/**
 * Partners — docs/design-spec.md §5.2.
 *
 * Reuses the homepage logo wall rather than duplicating it. The spec calls for
 * category grouping (clients / associations / partner firms), which needs a
 * `category` field on the data; until the client supplies logo files and usage
 * rights (spec §9 item 6) a single wall is the honest presentation and the
 * grouping is a one-line change to src/config/chili-content.ts.
 */
export default async function PartnersPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({
    locale,
    namespace: 'ChiliCareer.pages.partners',
  });

  return (
    <>
      <ChiliPageHeader
        eyebrow={t('eyebrow')}
        title={t('title')}
        subtitle={t('subtitle')}
      />
      <ChiliPartners showHeading={false} />
    </>
  );
}
