import { describe, expect, it, vi } from 'vitest';
import { Auth, EventBus, FeatureFlags, createPlatformRuntime } from './index';

describe('EventBus', () => {
  it('доставляет payload подписчикам', () => {
    const bus = new EventBus();
    const spy = vi.fn();
    bus.on('navigation:requested', spy);
    bus.emit('navigation:requested', { path: '/billing' });
    expect(spy).toHaveBeenCalledWith({ path: '/billing' });
  });

  it('возвращает функцию отписки', () => {
    const bus = new EventBus();
    const spy = vi.fn();
    const off = bus.on('navigation:requested', spy);
    off();
    bus.emit('navigation:requested', { path: '/x' });
    expect(spy).not.toHaveBeenCalled();
  });

  it('не падает, если на событие никто не подписан', () => {
    const bus = new EventBus();
    expect(() => bus.emit('navigation:requested', { path: '/x' })).not.toThrow();
  });
});

describe('FeatureFlags', () => {
  it('false по умолчанию для незнакомого ключа', () => {
    expect(new FeatureFlags().isEnabled('nope')).toBe(false);
  });

  it('читает enabled из переданного списка', () => {
    const flags = new FeatureFlags([
      { key: 'a', enabled: true },
      { key: 'b', enabled: false },
    ]);
    expect(flags.isEnabled('a')).toBe(true);
    expect(flags.isEnabled('b')).toBe(false);
  });
});

describe('Auth', () => {
  it('эмитит session:changed при setSession', () => {
    const bus = new EventBus();
    const auth = new Auth(bus, { info() {}, warn() {}, error() {} });
    const spy = vi.fn();
    bus.on('session:changed', spy);

    auth.setSession({
      accessToken: 't',
      refreshToken: 'r',
      expiresAt: 0,
      user: { id: '1', email: 'x@y', displayName: 'x', role: 'member', tenantId: 't' },
    });

    expect(spy).toHaveBeenCalledOnce();
    expect(auth.getAccessToken()).toBe('t');
  });
});

describe('createPlatformRuntime', () => {
  it('собирает рантайм с переданным baseUrl и сессией', () => {
    const rt = createPlatformRuntime({
      apiBaseUrl: '/api',
      initialSession: {
        accessToken: 'tok',
        refreshToken: 'r',
        expiresAt: 0,
        user: { id: '1', email: 'x@y', displayName: 'x', role: 'admin', tenantId: 't' },
      },
    });

    expect(rt.api.baseUrl).toBe('/api');
    expect(rt.api.getAuthToken()).toBe('tok');
    expect(rt.auth.getSession()?.user.id).toBe('1');
  });
});
