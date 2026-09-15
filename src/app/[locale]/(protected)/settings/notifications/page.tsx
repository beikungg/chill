import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Bell } from 'lucide-react';
import { useTranslations } from 'next-intl';

/**
 * 通知设置页面
 *
 * 当前暂无需要配置的通知设置
 */
export default function NotificationPage() {
  const t = useTranslations('Dashboard.settings.notification');

  return (
    <div className="grid gap-8">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Bell className="h-5 w-5 text-muted-foreground" />
            <CardTitle>{t('notificationSettings')}</CardTitle>
          </div>
          <CardDescription>{t('managePreferences')}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <Bell className="h-12 w-12 text-muted-foreground mb-4 opacity-50" />
            <p className="text-muted-foreground mb-2">{t('noSettings')}</p>
            <p className="text-sm text-muted-foreground">{t('autoEmail')}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
