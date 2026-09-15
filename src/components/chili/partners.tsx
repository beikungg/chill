import { Band, Eyebrow, SectionTitle } from '@/components/chili/section';
import { PARTNERS } from '@/config/chili-content';
import { cn } from '@/lib/utils';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

/**
 * 05 Partners — docs/design-spec.md §4.
 *
 * Logos are desaturated at rest and colour on hover. That is not a flourish:
 * a wall of multi-brand logos in their own palettes fights the restrained
 * identity, and greyscale unifies whatever mix of source files arrives.
 *
 * No cards, no borders — separation is by generous gap alone. With fewer than
 * five entries the grid centres on a single row instead of leaving holes.
 */
export function ChiliPartners({
  /** Hide the heading when a page header already states the same thing. */
  showHeading = true,
}: {
  showHeading?: boolean;
} = {}) {
  const t = useTranslations('ChiliCareer.partners');

  if (PARTNERS.length === 0) {
    return null;
  }

  const sparse = PARTNERS.length < 5;

  return (
    <Band tone="light" id="partners">
      {showHeading && (
        <>
          <Eyebrow>{t('eyebrow')}</Eyebrow>
          <SectionTitle>{t('title')}</SectionTitle>
        </>
      )}

      <ul
        className={cn(
          'grid list-none items-center gap-x-8 gap-y-10 md:gap-x-14',
          showHeading && 'mt-12',
          sparse
            ? 'grid-cols-2 justify-items-center md:flex md:flex-wrap md:justify-center'
            : 'grid-cols-2 md:grid-cols-3 lg:grid-cols-5'
        )}
      >
        {PARTNERS.map((partner) => {
          const mark = partner.logo ? (
            <Image
              src={partner.logo}
              alt={partner.name}
              width={160}
              height={32}
              className="h-8 w-auto object-contain"
            />
          ) : (
            // Honest placeholder until logo files and usage rights arrive.
            <span className="text-center font-display text-[15px] font-bold uppercase tracking-[0.02em]">
              {partner.name}
            </span>
          );

          return (
            <li
              key={partner.name}
              className="flex h-8 items-center justify-center text-muted-foreground opacity-55 grayscale transition-[opacity,filter] duration-200 hover:opacity-100 hover:grayscale-0"
            >
              {partner.url ? (
                <a
                  href={partner.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
                >
                  {mark}
                </a>
              ) : (
                mark
              )}
            </li>
          );
        })}
      </ul>
    </Band>
  );
}
