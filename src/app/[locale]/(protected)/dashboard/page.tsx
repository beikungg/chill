'use client';

import { ChartAreaInteractive } from '@/components/dashboard/chart-area-interactive';
import { DashboardHeader } from '@/components/dashboard/dashboard-header';
import { SectionCards } from '@/components/dashboard/section-cards';
import { useTranslations } from 'next-intl';

/**
 * Dashboard home page.
 *
 * Ships with placeholder cards and a demo chart so the shell renders
 * out of the box — swap `SectionCards` / `ChartAreaInteractive` for your
 * own product metrics.
 */
export default function DashboardPage() {
  const t = useTranslations('Dashboard.dashboard');

  const breadcrumbs = [
    {
      label: t('title'),
      isCurrentPage: true,
    },
  ];

  return (
    <>
      <DashboardHeader breadcrumbs={breadcrumbs} />

      <div className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
            <div className="px-4 lg:px-6">
              <h1 className="text-2xl font-bold tracking-tight">
                {t('welcome')}
              </h1>
              <p className="text-muted-foreground mt-1">{t('subtitle')}</p>
            </div>

            <SectionCards />

            <div className="px-4 lg:px-6">
              <ChartAreaInteractive />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
