'use client';

import { Routes } from '@/routes';
import type { NestedMenuItem } from '@/types';
import { useTranslations } from 'next-intl';

/**
 * Footer config — Chili Career GmbH
 *
 * Three columns (docs/design-spec.md §3.3).
 *
 * NOTICE: the Legal column is not optional decoration. Under German law a
 * commercial website must carry an Impressum (§ 5 DDG) and a Datenschutz-
 * erklärung (DSGVO), both reachable from every page. A missing Impressum is
 * grounds for a competitor Abmahnung with recoverable costs.
 *
 * @returns The footer config with translated titles
 */
export function getFooterLinks(): NestedMenuItem[] {
  const t = useTranslations('Marketing.footer');

  return [
    {
      title: t('services.title'),
      items: [
        {
          title: t('services.items.recruitment'),
          href: Routes.ServiceRecruitment,
          external: false,
        },
        {
          title: t('services.items.executiveSearch'),
          href: Routes.ServiceExecutiveSearch,
          external: false,
        },
        {
          title: t('services.items.hrConsulting'),
          href: Routes.ServiceHrConsulting,
          external: false,
        },
      ],
    },
    {
      title: t('company.title'),
      items: [
        {
          title: t('company.items.events'),
          href: Routes.Events,
          external: false,
        },
        {
          title: t('company.items.contact'),
          href: Routes.Contact,
          external: false,
        },
      ],
    },
    {
      title: t('legal.title'),
      items: [
        {
          title: t('legal.items.imprint'),
          href: Routes.Imprint,
          external: false,
        },
        {
          title: t('legal.items.privacy'),
          href: Routes.Privacy,
          external: false,
        },
      ],
    },
  ];
}
