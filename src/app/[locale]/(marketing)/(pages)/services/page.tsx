import { ChiliPageHeader } from '@/components/chili/page-header';
import { SERVICES_FRAMES } from '@/components/chili/photo-backdrop';
import { Band, Eyebrow } from '@/components/chili/section';
import { constructMetadata } from '@/lib/metadata';
import { getUrlWithLocale } from '@/lib/urls/urls';
import type { Metadata } from 'next';
import type { Locale } from 'next-intl';
import { getTranslations } from 'next-intl/server';

const SERVICES = [
  { key: 'recruitment', number: '01', anchor: 'recruitment' },
  { key: 'executiveSearch', number: '02', anchor: 'executive-search' },
  { key: 'hrConsulting', number: '03', anchor: 'hr-consulting' },
] as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata | undefined> {
  const { locale } = await params;
  const t = await getTranslations({
    locale,
    namespace: 'ChiliCareer.pages.services',
  });
  const m = await getTranslations({ locale, namespace: 'Metadata' });

  return constructMetadata({
    title: `${t('eyebrow')} | ${m('title')}`,
    description: t('subtitle'),
    canonicalUrl: getUrlWithLocale('/services', locale),
  });
}

/**
 * Services — docs/design-spec.md §5.1.
 *
 * One band per mandate, alternating ink and paper so each has its own ground.
 * Two columns inside: unordered scenarios on the left (a set, so bullets), and
 * the delivery process on the right as a numbered list — here the numbers carry
 * real information, because the steps genuinely happen in that order. That is
 * the distinction the homepage cards deliberately avoid claiming.
 */
export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({
    locale,
    namespace: 'ChiliCareer.pages.services',
  });
  const svc = await getTranslations({
    locale,
    namespace: 'ChiliCareer.services',
  });

  return (
    <>
      <ChiliPageHeader
        eyebrow={t('eyebrow')}
        title={t('title')}
        subtitle={t('subtitle')}
        frames={SERVICES_FRAMES}
      />

      {SERVICES.map((service, index) => (
        <Band
          key={service.key}
          id={service.anchor}
          tone={index % 2 === 0 ? 'light' : 'dark'}
          className="scroll-mt-20"
        >
          <Eyebrow>
            {service.number} / {svc(`items.${service.key}.title`)}
          </Eyebrow>

          <h2 className="mt-7 font-display text-[30px] font-semibold leading-[1.15] tracking-[-0.02em] md:text-[44px] md:leading-[1.1]">
            {svc(`items.${service.key}.title`)}
          </h2>

          <p className="mt-4 max-w-[68ch] text-xl leading-[1.4] text-muted-foreground md:text-2xl">
            {t(`${service.key}.statement`)}
          </p>

          <div className="mt-11 grid gap-10 border-t border-border pt-9 md:grid-cols-2 md:gap-16">
            {/* A set of situations — unordered, so bullets. */}
            <div>
              <h3 className="font-mono text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
                {t('scenariosLabel')}
              </h3>
              <ul className="mt-5 flex list-none flex-col gap-3.5">
                {t.raw(`${service.key}.scenarios`).map((item: string) => (
                  <li
                    key={item}
                    className="flex gap-3 text-[15px] leading-relaxed"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-2.5 size-1 shrink-0 bg-primary"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* A real sequence — so it is numbered, and the numbers mean something. */}
            <div>
              <h3 className="font-mono text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
                {t('processLabel')}
              </h3>
              <ol className="mt-5 flex list-none flex-col gap-3.5">
                {t
                  .raw(`${service.key}.process`)
                  .map((step: string, stepIndex: number) => (
                    <li
                      key={step}
                      className="flex gap-3.5 text-[15px] leading-relaxed"
                    >
                      <span className="mt-0.5 font-mono text-[13px] tabular-nums text-muted-foreground">
                        {String(stepIndex + 1).padStart(2, '0')}
                      </span>
                      {step}
                    </li>
                  ))}
              </ol>
            </div>
          </div>
        </Band>
      ))}
    </>
  );
}
