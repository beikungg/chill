'use client';

import {
  ExecutiveSearchMark,
  HrConsultingMark,
  RecruitmentMark,
} from '@/components/chili/service-marks';
import { Routes } from '@/routes';
import type { NestedMenuItem } from '@/types';
import { useTranslations } from 'next-intl';

/**
 * Navbar config — Chili Career GmbH
 *
 * Six items, fixed by the brief (docs/design-spec.md §3.1). This is a ceiling,
 * not a starting point: the reference boutique firm (mariafischerundteam.de)
 * ships four, while Hays ships 86 across a mega-menu. For a boutique search
 * firm, restraint reads as expensive.
 *
 * NOTICE: the top level stays text-only — icon clutter is what the brief rules
 * out. The three Services entries carry reticle variations (service-marks.tsx),
 * added at the owner's request: in the dropdown there are no mono numerals to
 * separate the mandates, so the marks do that job. They are crosshair
 * inflections rather than library pictograms, which keeps §1.2's "one structural
 * symbol" intact.
 *
 * @returns The navbar config with translated titles and descriptions
 */
export function getNavbarLinks(): NestedMenuItem[] {
  const t = useTranslations('Marketing.navbar');

  return [
    {
      title: t('home.title'),
      href: Routes.Root,
      external: false,
    },
    {
      title: t('services.title'),
      href: Routes.Services,
      external: false,
      items: [
        {
          title: t('services.items.recruitment.title'),
          description: t('services.items.recruitment.description'),
          href: Routes.ServiceRecruitment,
          external: false,
          icon: <RecruitmentMark />,
        },
        {
          title: t('services.items.executiveSearch.title'),
          description: t('services.items.executiveSearch.description'),
          href: Routes.ServiceExecutiveSearch,
          external: false,
          icon: <ExecutiveSearchMark />,
        },
        {
          title: t('services.items.hrConsulting.title'),
          description: t('services.items.hrConsulting.description'),
          href: Routes.ServiceHrConsulting,
          external: false,
          icon: <HrConsultingMark />,
        },
      ],
    },
    {
      title: t('testimonials.title'),
      href: Routes.Testimonials,
      external: false,
    },
    {
      title: t('partners.title'),
      href: Routes.Partners,
      external: false,
    },
    {
      title: t('events.title'),
      href: Routes.Events,
      external: false,
    },
    {
      title: t('contact.title'),
      href: Routes.Contact,
      external: false,
    },
  ];
}
