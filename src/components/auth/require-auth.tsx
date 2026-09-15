'use client';

import { LoginWrapper } from '@/components/auth/login-wrapper';
import Container from '@/components/layout/container';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useLocalePathname } from '@/i18n/navigation';
import { authClient } from '@/lib/auth-client';
import { Loader2, LogIn } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

interface RequireAuthProps {
  children: React.ReactNode;
  /**
   * Translation namespace holding the gate copy
   * (loading / title / description / noAccountHint).
   * Add your own namespace to this union as you add gated pages.
   */
  translationKey?: 'Common.requireAuth';
}

/**
 * 登录保护组件
 * 使用与定价页面相同的模态框登录机制
 * 支持国际化
 */
export function RequireAuth({
  children,
  translationKey = 'Common.requireAuth',
}: RequireAuthProps) {
  const t = useTranslations(translationKey);
  const tCommon = useTranslations('Common');
  const { data: session, isPending } = authClient.useSession();
  const [isChecking, setIsChecking] = useState(true);
  const currentPath = useLocalePathname();

  useEffect(() => {
    if (!isPending) {
      setIsChecking(false);
    }
  }, [isPending]);

  // 正在检查登录状态
  if (isChecking || isPending) {
    return (
      <div className="min-h-screen bg-background">
        <Container className="py-12">
          <div className="flex flex-col items-center justify-center h-64 gap-4">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="text-muted-foreground">{t('loading')}</p>
          </div>
        </Container>
      </div>
    );
  }

  // 未登录，显示登录提示（使用与定价页面相同的模态框机制）
  if (!session?.user) {
    return (
      <div className="min-h-screen bg-background">
        <Container className="py-12">
          <div className="max-w-md mx-auto">
            <Card>
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <LogIn className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-2xl">{t('title')}</CardTitle>
                <CardDescription className="text-base">
                  {t('description')}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {/* 使用 LoginWrapper 模态框，与定价页面保持一致 */}
                <LoginWrapper mode="modal" asChild callbackUrl={currentPath}>
                  <Button className="w-full" size="lg">
                    <LogIn className="mr-2 h-4 w-4" />
                    {tCommon('login')}
                  </Button>
                </LoginWrapper>

                <p className="text-xs text-center text-muted-foreground">
                  {t('noAccountHint')}
                </p>
              </CardContent>
            </Card>
          </div>
        </Container>
      </div>
    );
  }

  // 已登录，显示页面内容
  return <>{children}</>;
}
