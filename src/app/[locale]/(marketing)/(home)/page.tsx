import { ChiliContactCta } from '@/components/chili/contact-cta';
import { ChiliEvents } from '@/components/chili/events';
import { ChiliHero } from '@/components/chili/hero';
import { ChiliPartners } from '@/components/chili/partners';
import { ChiliPositioning } from '@/components/chili/positioning';
import { Reveal } from '@/components/chili/reveal';
import { ChiliServices } from '@/components/chili/services';
import { ChiliTestimonials } from '@/components/chili/testimonials';
import { constructMetadata } from '@/lib/metadata';
import { getUrlWithLocale } from '@/lib/urls/urls';
import type { Metadata } from 'next';
import type { Locale } from 'next-intl';
import { getTranslations } from 'next-intl/server';

/**
 * https://next-intl.dev/docs/environments/actions-metadata-route-handlers#metadata-api
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata | undefined> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Metadata' });

  return constructMetadata({
    title: t('title'),
    description: t('description'),
    canonicalUrl: getUrlWithLocale('', locale),
  });
}

/**
 * Chili Career homepage — the seven sections of docs/design-spec.md §4,
 * in the order the brief numbers them (01–07).
 *
 * The dark/light band rhythm is deliberate and load-bearing: ink opens and
 * closes the page, and the two dark interior bands (testimonials, contact) are
 * where the argument is made rather than described.
 *
 * Every band below the hero enters through <Reveal> — 16px of lift and a fade,
 * once. The hero itself is not wrapped: it is above the fold, and animating it
 * on load would collide with the lock-on sequence that §2.4 reserves as the
 * page's one orchestrated moment.
 */
export default async function HomePage() {
  return (
    <>
      <ChiliHero />
      <Reveal>
        <ChiliPositioning />
      </Reveal>
      <Reveal>
        <ChiliServices />
      </Reveal>
      <Reveal>
        <ChiliTestimonials />
      </Reveal>
      <Reveal>
        <ChiliPartners />
      </Reveal>
      <Reveal>
        <ChiliEvents />
      </Reveal>
      <Reveal>
        <ChiliContactCta />
      </Reveal>
    </>
  );
}
