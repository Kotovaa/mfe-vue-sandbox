import type { FeatureFlag, Session } from '@platform/shared-types';

export type PlatformEventMap = {
  'session:changed': Session | null;
  'navigation:requested': { path: string };
  'billing:invoice-selected': { invoiceId: string };
  'profile:saved': { displayName: string };
  'error:captured': PlatformError;
};

type EventName = keyof PlatformEventMap;
type Handler<E extends EventName> = (payload: PlatformEventMap[E]) => void;

export class EventBus {
  private readonly handlers = new Map<EventName, Set<Handler<EventName>>>();

  on<E extends EventName>(event: E, handler: Handler<E>): () => void {
    let set = this.handlers.get(event);
    if (!set) {
      set = new Set();
      this.handlers.set(event, set);
    }
    set.add(handler as Handler<EventName>);
    return () => set!.delete(handler as Handler<EventName>);
  }

  emit<E extends EventName>(event: E, payload: PlatformEventMap[E]): void {
    this.handlers.get(event)?.forEach((h) => h(payload));
  }
}

export interface Logger {
  info(message: string, context?: Record<string, unknown>): void;
  warn(message: string, context?: Record<string, unknown>): void;
  error(message: string, context?: Record<string, unknown>): void;
}

export function createConsoleLogger(scope = 'platform'): Logger {
  const fmt = (msg: string) => `[${scope}] ${msg}`;
  return {
    info: (m, ctx = {}) => console.info(fmt(m), ctx),
    warn: (m, ctx = {}) => console.warn(fmt(m), ctx),
    error: (m, ctx = {}) => console.error(fmt(m), ctx),
  };
}

export class Auth {
  private session: Session | null = null;

  constructor(
    private readonly bus: EventBus,
    private readonly logger: Logger,
  ) {}

  getSession(): Session | null {
    return this.session;
  }

  getAccessToken(): string | null {
    return this.session?.accessToken ?? null;
  }

  setSession(session: Session | null): void {
    this.session = session;
    this.logger.info('session updated', { userId: session?.user.id ?? null });
    this.bus.emit('session:changed', session);
  }

  // FIXME: refresh пока не реализован — shell подсовывает сессию руками
}

export class FeatureFlags {
  private readonly map: Map<string, FeatureFlag>;

  constructor(flags: FeatureFlag[] = []) {
    this.map = new Map(flags.map((f) => [f.key, f]));
  }

  isEnabled(key: string): boolean {
    return this.map.get(key)?.enabled ?? false;
  }

  all(): FeatureFlag[] {
    return [...this.map.values()];
  }
}

export class PlatformError extends Error {
  readonly code: string;
  readonly correlationId: string;

  constructor(message: string, code: string, cause?: unknown) {
    super(message);
    this.code = code;
    this.correlationId = crypto.randomUUID();
    if (cause !== undefined) this.cause = cause;
  }
}

export class ErrorBoundary {
  constructor(
    private readonly bus: EventBus,
    private readonly logger: Logger,
  ) {}

  capture(error: unknown, context: Record<string, unknown> = {}): PlatformError {
    const err =
      error instanceof PlatformError
        ? error
        : new PlatformError('Unexpected platform error', 'PLATFORM_UNEXPECTED', error);
    this.logger.error(err.message, { ...context, correlationId: err.correlationId });
    this.bus.emit('error:captured', err);
    return err;
  }
}

export interface ApiManager {
  baseUrl: string;
  getAuthToken(): string | null;
}

export interface PlatformRuntime {
  auth: Auth;
  events: EventBus;
  logger: Logger;
  flags: FeatureFlags;
  errors: ErrorBoundary;
  api: ApiManager;
}

/**
 * Поднимает рантайм для standalone-запуска MFE — с фейковой сессией,
 * чтобы можно было разрабатывать домен без shell-а.
 * В прод-сборке shell всегда подсовывает свой рантайм через provide().
 */
export function createStandaloneRuntime(domain: string): PlatformRuntime {
  return createPlatformRuntime({
    apiBaseUrl: '/mock-api',
    initialSession: {
      accessToken: `standalone-${domain}`,
      refreshToken: 'standalone-refresh',
      expiresAt: Date.now() + 60_000,
      user: {
        id: `${domain}-dev`,
        email: `${domain}@local`,
        displayName: `${domain} (standalone)`,
        role: 'member',
        tenantId: 'local',
      },
    },
  });
}

export function createPlatformRuntime(config: {
  apiBaseUrl: string;
  initialSession?: Session;
  flags?: FeatureFlag[];
}): PlatformRuntime {
  const events = new EventBus();
  const logger = createConsoleLogger();
  const auth = new Auth(events, logger);
  const flags = new FeatureFlags(config.flags);
  const errors = new ErrorBoundary(events, logger);

  if (config.initialSession) auth.setSession(config.initialSession);

  return {
    auth,
    events,
    logger,
    flags,
    errors,
    api: {
      baseUrl: config.apiBaseUrl,
      getAuthToken: () => auth.getAccessToken(),
    },
  };
}
