import { AlertCircle } from 'lucide-react';

interface FormErrorProps {
  message?: string;
}

export const FormError = ({ message }: FormErrorProps) => {
  if (!message) return null;

  // 🔥 将技术错误码转换为友好提示
  const getFriendlyMessage = (msg: string): string => {
    // 检测403错误
    if (msg.includes('403') || msg.toLowerCase().includes('forbidden')) {
      return '抱歉，您没有权限访问此功能。请先登录或联系管理员。';
    }

    // 检测401错误
    if (msg.includes('401') || msg.toLowerCase().includes('unauthorized')) {
      return '您的登录已过期，请重新登录。';
    }

    // 检测404错误
    if (msg.includes('404') || msg.toLowerCase().includes('not found')) {
      return '抱歉，未找到相关资源。';
    }

    // 检测500错误
    if (msg.includes('500') || msg.toLowerCase().includes('internal server')) {
      return '服务器暂时出现问题，请稍后重试。';
    }

    // 其他错误保持原样
    return msg;
  };

  const friendlyMessage = getFriendlyMessage(message);

  return (
    <div className="bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive">
      <AlertCircle className="h-4 w-4 shrink-0" />
      <p>{friendlyMessage}</p>
    </div>
  );
};
