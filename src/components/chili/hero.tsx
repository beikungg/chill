import { HERO_FRAMES, PhotoBackdrop } from '@/components/chili/photo-backdrop';
import { Reticle } from '@/components/chili/reticle';
import { Button } from '@/components/ui/button';
import { LocaleLink } from '@/i18n/navigation';
import { Routes } from '@/routes';
import { ArrowRightIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';

/**
 * 01 Hero — docs/design-spec.md §4.
 *
 * The ink ground is now a photographic one — see photo-backdrop.tsx for the
 * treatment, the spec deviation it represents, and the measured contrast that
 * keeps the type above the AA floors in §2.1.
 *
 * Height is 82vh, not 100vh, so the next band peeks above the fold and the page
 * signals that it continues.
 */
export function ChiliHero() {
  const t = useTranslations('ChiliCareer');

  return (
    <header className="dark relative flex min-h-[82vh] items-center overflow-hidden bg-background px-6 py-24 text-foreground md:px-12 lg:px-20">
      <PhotoBackdrop frames={HERO_FRAMES} />

      {/* Hatch texture, masked so it fades out toward the headline. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 w-2/5 opacity-100"
        style={{
          backgroundImage:
            'repeating-linear-gradient(135deg, rgba(255,255,255,0.04) 0 1px, transparent 1px 4px)',
          maskImage: 'linear-gradient(to left, black, transparent)',
          WebkitMaskImage: 'linear-gradient(to left, black, transparent)',
        }}
      />

      <div className="relative mx-auto w-full max-w-320">
        <p className="flex animate-rise items-center gap-2.5 font-mono text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
          <Reticle className="animate-lock-reticle" />
          {t('hero.eyebrow')}
        </p>

        <h1 className="mt-7 font-display text-[40px] font-semibold leading-[1.06] tracking-[-0.02em] md:text-[76px] md:leading-[1.02] md:tracking-[-0.03em]">
          {t('hero.title')}
        </h1>

        {/* The lock-on rule. */}
        <div className="my-6 h-px w-70 origin-left animate-lock-rule bg-primary md:my-7.5" />

        <p className="font-display text-[28px] font-medium leading-[1.15] tracking-[-0.02em] text-muted-foreground md:text-[44px] md:leading-[1.1]">
          {t('hero.subtitleLine1')}
          <br />
          {t('hero.subtitleLine2')}
        </p>

        {/* text-2xl at every width, not text-xl on mobile: at 20px/600 the chili
            accent is short of WCAG large text (>=18.66px bold) and its 4.24:1 on
            the photograph would be judged against the 4.5:1 floor. 24px clears
            large text at any weight. */}
        <p className="mt-7 font-display text-2xl font-semibold tracking-[-0.01em] md:mt-8">
          {withClaimAccent(t('brand.claim'), t('brand.claimHighlight'))}
        </p>

        <Button asChild size="lg" className="mt-10 rounded-sm md:mt-11">
          <LocaleLink href={Routes.Contact}>
            {t('cta.primary')}
            <ArrowRightIcon className="size-4" aria-hidden="true" />
          </LocaleLink>
        </Button>
      </div>
    </header>
  );
}

/**
 * Accents one word of the brand claim. Kept local to the hero because this is
 * the only place the claim carries emphasis — the footer repeats it plain.
 */
function withClaimAccent(claim: string, highlight: string) {
  const at = claim.indexOf(highlight);
  if (at === -1) return claim;

  return (
    <>
      {claim.slice(0, at)}
      <span className="text-primary">{highlight}</span>
      {claim.slice(at + highlight.length)}
    </>
  );
}
