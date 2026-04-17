import { PlatformError, type PlatformRuntime } from '@platform/shared-core';
import type {
  DashboardMetric,
  Deploy,
  Incident,
  Invoice,
  LoginEntry,
  PaymentMethod,
  Profile,
} from '@platform/shared-types';
import {
  dashboardMetrics,
  deploys,
  incidents,
  invoices,
  logins,
  paymentMethod,
  profile,
} from './mock-data';

export type RequestInterceptor = (
  request: RequestInit & { url: string },
) => Promise<RequestInit & { url: string }>;
export type ResponseInterceptor = (response: Response) => Promise<Response>;

export interface ApiClientOptions {
  runtime: PlatformRuntime;
  requestInterceptors?: RequestInterceptor[];
  responseInterceptors?: ResponseInterceptor[];
}

export class ApiClient {
  constructor(private readonly options: ApiClientOptions) {}

  async getDashboardMetrics(): Promise<DashboardMetric[]> {
    return this.mockRequest('/dashboard/metrics', dashboardMetrics);
  }

  async getProfile(): Promise<Profile> {
    return this.mockRequest('/profile/me', profile);
  }

  async updateProfile(nextProfile: Profile): Promise<Profile> {
    this.options.runtime.events.emit('profile:saved', { displayName: nextProfile.displayName });
    return this.mockRequest('/profile/me', nextProfile, { method: 'PUT' });
  }

  async getInvoices(): Promise<Invoice[]> {
    return this.mockRequest('/billing/invoices', invoices);
  }

  async getDeploys(): Promise<Deploy[]> {
    return this.mockRequest('/dashboard/deploys', deploys);
  }

  async getIncidents(): Promise<Incident[]> {
    return this.mockRequest('/dashboard/incidents', incidents);
  }

  async getLoginHistory(): Promise<LoginEntry[]> {
    return this.mockRequest('/profile/logins', logins);
  }

  async getPaymentMethod(): Promise<PaymentMethod> {
    return this.mockRequest('/billing/payment-method', paymentMethod);
  }

  private async mockRequest<T>(path: string, payload: T, init: RequestInit = {}): Promise<T> {
    const token = this.options.runtime.auth.getAccessToken();
    if (!token) {
      throw this.handleError(new PlatformError('Missing access token', 'API_UNAUTHENTICATED'));
    }

    const request = await this.applyRequestInterceptors({
      ...init,
      url: `${this.options.runtime.api.baseUrl}${path}`,
      headers: {
        authorization: `Bearer ${token}`,
        'content-type': 'application/json',
        ...init.headers,
      },
    });

    this.options.runtime.logger.info('API request', {
      method: request.method ?? 'GET',
      url: request.url,
    });

    await new Promise((resolve) => setTimeout(resolve, 120));
    return structuredClone(payload);
  }

  private async applyRequestInterceptors(request: RequestInit & { url: string }) {
    let next = request;
    for (const interceptor of this.options.requestInterceptors ?? []) {
      next = await interceptor(next);
    }
    return next;
  }

  private handleError(error: unknown): PlatformError {
    return this.options.runtime.errors.capture(error, { layer: 'api-sdk' });
  }
}

export function createApiClient(runtime: PlatformRuntime): ApiClient {
  return new ApiClient({
    runtime,
    requestInterceptors: [
      async (request) => ({
        ...request,
        headers: {
          ...request.headers,
          'x-correlation-id': crypto.randomUUID(),
        },
      }),
    ],
  });
}
