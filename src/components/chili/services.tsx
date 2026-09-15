import { Band, Eyebrow, SectionTitle } from '@/components/chili/section';
import { LocaleLink } from '@/i18n/navigation';
import { Routes } from '@/routes';
import { ArrowRightIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';

const SERVICES = [
  { key: 'recruitment', href: Routes.ServiceRecruitment },
  { key: 'executiveSearch', href: Routes.ServiceExecutiveSearch },
  { key: 'hrConsulting', href: Routes.ServiceHrConsulting },
] as const;

/**
 * 03 Services — docs/design-spec.md §4.
 *
 * No icons. The brief rules out icon clutter, so the three services are
 * separated by mono numerals and typographic hierarchy alone. The numbers are
 * labels rather than a sequence here (you don't buy 01 before 03) — the real
 * ordered list lives on the Services page, where the delivery process is
 * genuinely stepwise.
 *
 * Hover moves the border and the numeral to the accent; no lift, no scale, no
 * shadow. Cards are hairline-bordered because shadows would read as SaaS.
 */
export function ChiliServices() {
  const t = useTranslations('ChiliCareer');

  return (
    <Band tone="light" id="services" flush>
      <Eyebrow>{t('services.eyebrow')}</Eyebrow>
      <SectionTitle>{t('services.title')}</SectionTitle>

      <div className="mt-11 grid gap-6 md:grid-cols-3">
        {SERVICES.map(({ key, href }) => (
          <article
            key={key}
            className="group flex flex-col gap-3.5 rounded-sm border border-border bg-card p-7 pb-7 transition-colors hover:border-primary md:p-8"
          >
            <span className="font-mono text-[13px] font-medium tracking-[0.08em] text-muted-foreground transition-colors group-hover:text-primary">
              {t(`services.items.${key}.number`)}
            </span>

            <h3 className="font-display text-xl font-semibold tracking-[-0.01em] md:min-h-15 md:text-2xl">
              {t(`services.items.${key}.title`)}
            </h3>

            <p className="flex-1 text-[15px] leading-relaxed text-muted-foreground">
              {t(`services.items.${key}.body`)}
            </p>

            <LocaleLink
              href={href}
              className="group/link mt-1.5 inline-flex w-fit items-center gap-1.5 font-display text-[15px] font-semibold underline-offset-4 hover:underline hover:decoration-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
            >
              {t('cta.learnMore')}
              <ArrowRightIcon
                className="size-3.5 transition-transform group-hover/link:translate-x-0.5"
                aria-hidden="true"
              />
            </LocaleLink>
          </article>
        ))}
      </div>
    </Band>
  );
}
