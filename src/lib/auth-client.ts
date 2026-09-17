import { adminClient, inferAdditionalFields } from 'better-auth/client/plugins';
import { createAuthClient } from 'better-auth/react';
import type { auth } from './auth';
import { getBaseUrl } from './urls/urls';

/**
 * https://www.better-auth.com/docs/installation#create-client-instance
 */
/**
 * Resolves the origin the auth routes are served from.
 *
 * In the browser this is the current origin, which is always correct and needs
 * no configuration. `getBaseUrl()` is only consulted on the server, because it
 * reads `VERCEL_URL` and `PORT` — variables without the `NEXT_PUBLIC_` prefix,
 * which are stripped from client bundles at build time. That left `baseURL`
 * empty in this module (it ships to the client), so Better Auth had no origin to
 * resolve `/get-session` against and threw `Invalid URL` during SSR.
 */
function resolveBaseUrl(): string {
  if (typeof window !== 'undefined') {
    return window.location.origin;
  }
  return getBaseUrl();
}

export const authClient = createAuthClient({
  baseURL: resolveBaseUrl(),
  plugins: [
    // https://www.better-auth.com/docs/plugins/admin#add-the-client-plugin
    adminClient(),
    // https://www.better-auth.com/docs/concepts/typescript#inferring-additional-fields-on-client
    inferAdditionalFields<typeof auth>(),
  ],
});
