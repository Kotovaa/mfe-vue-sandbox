import { createApiClient } from '@platform/api-sdk';
import { createPlatformRuntime, type PlatformRuntime } from '@platform/shared-core';

export interface ShellRuntime extends PlatformRuntime {
  apiClient: ReturnType<typeof createApiClient>;
}

export function bootstrapRuntime(): ShellRuntime {
  const runtime = createPlatformRuntime({
    apiBaseUrl: '/mock-api',
    flags: [
      { key: 'dashboard.release-health', enabled: true },
      { key: 'billing.invoice-events', enabled: true },
    ],
    initialSession: {
      accessToken: 'dev-token',
      refreshToken: 'dev-refresh',
      expiresAt: Date.now() + 30 * 60 * 1000,
      user: {
        id: 'u-1',
        email: 'sasha@local',
        displayName: 'Саша',
        role: 'admin',
        tenantId: 'local',
      },
    },
  });

  return {
    ...runtime,
    apiClient: createApiClient(runtime),
  };
}

export const runtimeKey = Symbol('platform-runtime');
