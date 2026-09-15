import {
  Band,
  Eyebrow,
  SectionTitle,
  withHighlight,
} from '@/components/chili/section';
import { useTranslations } from 'next-intl';

/**
 * 02 Positioning — docs/design-spec.md §4.
 *
 * The brief asks for "China × Europe" without overt Chinese motifs. So the ×
 * is the single hairline rule between the two columns — nothing more. No map,
 * no flags, no calligraphy. On mobile the columns stack and the rule becomes
 * the border between them, which keeps the same idea at any width.
 *
 * Each column carries its counterpart language as a subtitle, so the two
 * markets are set literally side by side in type.
 */
export function ChiliPositioning() {
  const t = useTranslations('ChiliCareer.positioning');

  const columns = ['left', 'right'] as const;

  return (
    <Band tone="light">
      <Eyebrow>{t('eyebrow')}</Eyebrow>
      <SectionTitle>
        {withHighlight(t('title'), t('titleHighlight'))}
      </SectionTitle>

      <div className="mt-11 grid divide-y divide-border border-y border-border md:grid-cols-2 md:divide-x md:divide-y-0">
        {columns.map((side) => (
          <div
            key={side}
            className="px-0 py-8 md:px-10 md:py-8 md:first:pl-0 md:last:pr-0"
          >
            <h3 className="font-display text-xl font-semibold tracking-[-0.01em] md:text-2xl">
              {t(`${side}.title`)}
            </h3>
            <p className="mt-1 text-lg font-medium text-muted-foreground md:text-xl">
              {t(`${side}.subtitle`)}
            </p>
            <p className="mt-3.5 max-w-[68ch] text-[15px] leading-relaxed text-muted-foreground">
              {t(`${side}.body`)}
            </p>
          </div>
        ))}
      </div>

      <p className="mt-10 max-w-[68ch] text-[17px] leading-relaxed">
        {t('summary')}
      </p>
    </Band>
  );
}
