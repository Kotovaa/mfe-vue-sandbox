import type {
  DashboardMetric,
  Deploy,
  Incident,
  Invoice,
  LoginEntry,
  PaymentMethod,
  Profile,
} from '@platform/shared-types';

// числа специально не круглые — иначе графики выглядят слишком «дашбордно»
export const dashboardMetrics: DashboardMetric[] = [
  { label: 'Active sessions', value: '17 902', delta: 11.7 },
  { label: 'p95 latency', value: '173ms', delta: -6.2 },
  { label: 'Crash-free', value: '99.81%', delta: 0.4 },
  { label: 'Build time', value: '1m 48s', delta: -3.1 },
];

export const deploys: Deploy[] = [
  {
    id: 'd-2891',
    app: 'shell',
    commit: 'a3f29c1',
    message: 'fix: persist theme between reloads',
    author: 'sasha',
    status: 'success',
    finishedAt: '2026-05-06T13:42:00+03:00',
    durationSec: 92,
  },
  {
    id: 'd-2890',
    app: 'billing',
    commit: '8de1170',
    message: 'feat(billing): per-status filters',
    author: 'sasha',
    status: 'success',
    finishedAt: '2026-05-06T11:08:00+03:00',
    durationSec: 121,
  },
  {
    id: 'd-2889',
    app: 'dashboard',
    commit: '4cc02e1',
    message: 'chore: bump vite to 6.0.7',
    author: 'kira',
    status: 'failed',
    finishedAt: '2026-05-05T18:54:00+03:00',
    durationSec: 47,
  },
  {
    id: 'd-2888',
    app: 'profile',
    commit: 'b71fe05',
    message: 'wip: avatar upload',
    author: 'sasha',
    status: 'running',
    finishedAt: '2026-05-05T16:12:00+03:00',
    durationSec: 0,
  },
];

export const incidents: Incident[] = [
  {
    id: 'INC-204',
    title: 'Slow API responses on /billing/invoices',
    severity: 'p2',
    startedAt: '2026-05-06T09:15:00+03:00',
  },
];

export const profile: Profile = {
  displayName: 'Саша Котов',
  title: 'frontend',
  department: 'platform',
  timezone: 'Europe/Moscow',
};

export const logins: LoginEntry[] = [
  {
    id: 'l-1',
    at: '2026-05-06T15:02:00+03:00',
    ip: '188.244.10.7',
    device: 'Chrome 134 · macOS',
    city: 'Москва',
    current: true,
  },
  {
    id: 'l-2',
    at: '2026-05-05T23:41:00+03:00',
    ip: '188.244.10.7',
    device: 'Safari · iOS 18',
    city: 'Москва',
  },
  {
    id: 'l-3',
    at: '2026-05-04T08:27:00+04:00',
    ip: '46.39.244.12',
    device: 'Chrome 133 · Windows',
    city: 'Казань',
  },
  {
    id: 'l-4',
    at: '2026-04-29T12:11:00+03:00',
    ip: '188.244.10.7',
    device: 'Chrome 133 · macOS',
    city: 'Москва',
  },
];

export const invoices: Invoice[] = [
  {
    id: 'INV-2026-014',
    issuedAt: '2026-04-03',
    amountUsd: 4287,
    status: 'paid',
    periodFrom: '2026-03-01',
    periodTo: '2026-03-31',
    lines: [
      { description: 'Platform subscription · Team', quantity: 1, amountUsd: 3500 },
      { description: 'Extra seats × 4', quantity: 4, amountUsd: 480 },
      { description: 'Storage overages', quantity: 1, amountUsd: 307 },
    ],
  },
  {
    id: 'INV-2026-013',
    issuedAt: '2026-03-04',
    amountUsd: 4150,
    status: 'paid',
    periodFrom: '2026-02-01',
    periodTo: '2026-02-28',
    lines: [
      { description: 'Platform subscription · Team', quantity: 1, amountUsd: 3500 },
      { description: 'Extra seats × 4', quantity: 4, amountUsd: 480 },
      { description: 'Storage overages', quantity: 1, amountUsd: 170 },
    ],
  },
  {
    id: 'INV-2026-012',
    issuedAt: '2026-02-02',
    amountUsd: 3890,
    status: 'open',
    periodFrom: '2026-01-01',
    periodTo: '2026-01-31',
    lines: [
      { description: 'Platform subscription · Team', quantity: 1, amountUsd: 3500 },
      { description: 'Extra seats × 3', quantity: 3, amountUsd: 360 },
      { description: 'Storage overages', quantity: 1, amountUsd: 30 },
    ],
  },
  {
    id: 'INV-2026-011',
    issuedAt: '2026-01-09',
    amountUsd: 4150,
    status: 'overdue',
    periodFrom: '2025-12-01',
    periodTo: '2025-12-31',
  },
];

export const paymentMethod: PaymentMethod = {
  brand: 'mastercard',
  last4: '4413',
  expires: '08/27',
  holder: 'A. KOTOV',
};
