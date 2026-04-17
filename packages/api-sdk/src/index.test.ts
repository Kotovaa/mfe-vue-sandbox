import { describe, expect, it, vi } from 'vitest';
import { createPlatformRuntime, PlatformError } from '@platform/shared-core';
import { createApiClient, ApiClient } from './index';

function makeRuntime(withSession = true) {
  return createPlatformRuntime({
    apiBaseUrl: '/api',
    initialSession: withSession
      ? {
          accessToken: 'tok',
          refreshToken: 'r',
          expiresAt: Date.now() + 1000,
          user: { id: '1', email: 'x@y', displayName: 'x', role: 'admin', tenantId: 't' },
        }
      : undefined,
  });
}

describe('ApiClient', () => {
  it('возвращает мок-метрики', async () => {
    const metrics = await createApiClient(makeRuntime()).getDashboardMetrics();
    expect(metrics.length).toBeGreaterThan(0);
    expect(metrics[0]).toHaveProperty('label');
    expect(metrics[0]).toHaveProperty('delta');
  });

  it('кидает PLATFORM_UNEXPECTED, обёрнутую вокруг отсутствия токена', async () => {
    const rt = makeRuntime(false);
    const captureSpy = vi.spyOn(rt.errors, 'capture');
    await expect(createApiClient(rt).getProfile()).rejects.toBeInstanceOf(PlatformError);
    expect(captureSpy).toHaveBeenCalled();
  });

  it('updateProfile эмитит profile:saved', async () => {
    const rt = makeRuntime();
    const spy = vi.fn();
    rt.events.on('profile:saved', spy);

    await new ApiClient({ runtime: rt }).updateProfile({
      displayName: 'New',
      title: '',
      department: '',
      timezone: '',
    });

    expect(spy).toHaveBeenCalledWith({ displayName: 'New' });
  });
});
