'use client';

import { AuthCard } from '@/components/auth/auth-card';
import { Button } from '@/components/ui/button';
import { Routes } from '@/routes';
import { RefreshCcwIcon, TriangleAlertIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';

export const ErrorCard = () => {
  const t = useTranslations('AuthPage.error');
  const searchParams = useSearchParams();
  const error = searchParams.get('error');
  const provider = searchParams.get('provider');

  // 检查是否是状态不匹配错误
  const isStateError = error === 'please_restart_the_process';
  const isSocialLoginError = error === 'social_login_failed';

  const handleRetry = () => {
    // 清除认证相关的 cookie 和 localStorage
    document.cookie.split(';').forEach((c) => {
      document.cookie = c
        .replace(/^ +/, '')
        .replace(/=.*/, '=;expires=' + new Date().toUTCString() + ';path=/');
    });

    // 重定向到登录页面
    window.location.href = Routes.Login;
  };

  return (
    <AuthCard
      headerLabel={t('title')}
      bottomButtonHref={`${Routes.Login}`}
      bottomButtonLabel={t('backToLogin')}
      className="border-none"
    >
      <div className="w-full flex flex-col justify-center items-center py-4 gap-4">
        <div className="flex items-center gap-2">
          <TriangleAlertIcon className="text-destructive size-4" />
          <p className="font-medium text-destructive">
            {isStateError
              ? '认证状态已过期，请重新登录'
              : isSocialLoginError && provider
                ? `${provider.toUpperCase()} 登录失败`
                : t('tryAgain')}
          </p>
        </div>

        {(isStateError || isSocialLoginError) && (
          <div className="text-center space-y-3">
            <p className="text-sm text-muted-foreground">
              {isStateError ? '这通常发生在以下情况：' : '登录失败的可能原因：'}
            </p>
            <ul className="text-xs text-muted-foreground space-y-1">
              {isStateError ? (
                <>
                  <li>• 在移动设备上切换到桌面网站模式</li>
                  <li>• 认证过程中使用了浏览器返回按钮</li>
                  <li>• 认证状态令牌已过期</li>
                </>
              ) : (
                <>
                  <li>• 网络连接不稳定</li>
                  <li>• {provider?.toUpperCase()} 服务临时不可用</li>
                  <li>• 浏览器阻止了弹出窗口</li>
                </>
              )}
            </ul>

            <Button
              onClick={handleRetry}
              variant="outline"
              size="sm"
              className="mt-4"
            >
              <RefreshCcwIcon className="size-3 mr-2" />
              {isStateError ? '清除缓存并重试' : '重新尝试登录'}
            </Button>
          </div>
        )}
      </div>
    </AuthCard>
  );
};
