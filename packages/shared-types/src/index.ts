export type UserRole = 'admin' | 'manager' | 'member';

export interface SessionUser {
  id: string;
  email: string;
  displayName: string;
  role: UserRole;
  tenantId: string;
}

export interface Session {
  accessToken: string;
  refreshToken: string;
  expiresAt: number;
  user: SessionUser;
}

export interface FeatureFlag {
  key: string;
  enabled: boolean;
  description?: string;
}

export interface DashboardMetric {
  label: string;
  value: string;
  delta: number;
}

export interface Profile {
  displayName: string;
  title: string;
  department: string;
  timezone: string;
}

export interface Invoice {
  id: string;
  issuedAt: string;
  amountUsd: number;
  status: 'paid' | 'open' | 'overdue';
  periodFrom?: string;
  periodTo?: string;
  lines?: InvoiceLine[];
}

export interface InvoiceLine {
  description: string;
  quantity: number;
  amountUsd: number;
}

export interface PaymentMethod {
  brand: 'visa' | 'mastercard' | 'mir';
  last4: string;
  expires: string; // MM/YY
  holder: string;
}

export interface Deploy {
  id: string;
  app: 'shell' | 'dashboard' | 'profile' | 'billing';
  commit: string;
  message: string;
  author: string;
  status: 'success' | 'failed' | 'running';
  finishedAt: string;
  durationSec: number;
}

export interface LoginEntry {
  id: string;
  at: string;
  ip: string;
  device: string;
  city: string;
  current?: boolean;
}

export interface Incident {
  id: string;
  title: string;
  severity: 'p1' | 'p2' | 'p3';
  startedAt: string;
}

export interface ApiErrorShape {
  code: string;
  message: string;
  correlationId: string;
}

export interface RuntimeRemote {
  name: string;
  routePath: string;
  module: string;
  /** URL до remoteEntry.js */
  url: string;
}

export interface RemoteManifest {
  version: string;
  remotes: RuntimeRemote[];
}
