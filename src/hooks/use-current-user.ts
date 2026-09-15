import { authClient } from '@/lib/auth-client';

export const useCurrentUser = () => {
  const { data: session, error } = authClient.useSession();

  // Note: error might be an empty object {} when user is not logged in
  // This is normal behavior, not an actual error
  // Uncomment below if you need to debug actual session errors:
  // if (error && typeof error === 'object' && Object.keys(error).length > 0) {
  //   console.error('useCurrentUser, error:', error);
  // }

  return session?.user ?? null;
};
