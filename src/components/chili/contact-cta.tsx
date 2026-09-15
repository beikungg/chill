import {
  Band,
  Eyebrow,
  SectionTitle,
  withHighlight,
} from '@/components/chili/section';
import { Button } from '@/components/ui/button';
import { LocaleLink } from '@/i18n/navigation';
import { Routes } from '@/routes';
import { ArrowRightIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';

/**
 * 07 Contact — docs/design-spec.md §4.
 *
 * Closes the page on the ink ground it opened on. Two ways to make contact, no
 * more: the form for people who want structure, a plain address for people who
 * would rather write an email. The reply promise is concrete ("two business
 * days") because a vague invitation is not an invitation.
 */
export function ChiliContactCta() {
  const t = useTranslations('ChiliCareer');

  return (
    <Band tone="dark" id="contact">
      <Eyebrow>{t('contact.eyebrow')}</Eyebrow>
      <SectionTitle>
        {withHighlight(t('contact.title'), t('contact.titleHighlight'))}
      </SectionTitle>

      <p className="mt-4.5 max-w-[68ch] text-xl leading-[1.4] text-muted-foreground md:text-2xl">
        {t('contact.body')}
      </p>

      <div className="mb-11 mt-8.5 flex flex-wrap items-center gap-8">
        <Button asChild size="lg" className="rounded-sm">
          <LocaleLink href={Routes.Contact}>
            {t('cta.primary')}
            <ArrowRightIcon className="size-4" aria-hidden="true" />
          </LocaleLink>
        </Button>

        <span className="font-mono text-[13px] text-muted-foreground">
          {t('contact.or')}
        </span>

        <a
          href={`mailto:${t('contact.email')}`}
          className="font-mono text-[15px] underline-offset-4 hover:underline hover:decoration-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
        >
          {t('contact.email')}
        </a>
      </div>

      <p className="font-mono text-[13px] leading-loose text-muted-foreground">
        {t('brand.legalName')} · {t('brand.city')}, {t('brand.country')}
        <br />
        <span className="tabular-nums">{t('brand.coordinates')}</span>
      </p>
    </Band>
  );
}
