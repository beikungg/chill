import { CustomPage } from '@/components/page/custom-page';
import { constructMetadata } from '@/lib/metadata';
import { getPage } from '@/lib/page/get-page';
import { getUrlWithLocale } from '@/lib/urls/urls';
import type { NextPageProps } from '@/types/next-page-props';
import type { Metadata } from 'next';
import type { Locale } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';

/**
 * Datenschutzerklärung — mandatory under the GDPR.
 *
 * Content lives in content/pages/datenschutz{,.de,.zh}.mdx, following the
 * 10-section structure of the client-supplied reference
 * (mariafischerundteam.de/datenschutz) plus sections for the contact form,
 * candidate data and hosting. The German version is authoritative.
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata | undefined> {
  const { locale } = await params;
  const page = await getPage('datenschutz', locale);

  if (!page) {
    console.warn(
      `generateMetadata, page not found for datenschutz, locale: ${locale}`
    );
    return {};
  }

  const t = await getTranslations({ locale, namespace: 'Metadata' });

  return constructMetadata({
    title: page.title + ' | ' + t('title'),
    description: page.description,
    canonicalUrl: getUrlWithLocale('/datenschutz', locale),
  });
}

export default async function DatenschutzPage(props: NextPageProps) {
  const params = await props.params;
  if (!params) {
    notFound();
  }

  const locale = params.locale as string;
  const page = await getPage('datenschutz', locale);

  if (!page) {
    notFound();
  }

  return (
    <CustomPage
      title={page.title}
      description={page.description}
      date={page.date}
      content={page.body}
    />
  );
}
