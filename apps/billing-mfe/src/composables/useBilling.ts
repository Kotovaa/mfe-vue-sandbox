import { computed, onMounted, ref } from 'vue';
import { createApiClient, type ApiClient } from '@platform/api-sdk';
import { createStandaloneRuntime } from '@platform/shared-core';
import type { Invoice, PaymentMethod } from '@platform/shared-types';

export type StatusFilter = 'all' | Invoice['status'];

export function useBilling(
  api: ApiClient = createApiClient(createStandaloneRuntime('billing')),
) {
  const invoices = ref<Invoice[]>([]);
  const payment = ref<PaymentMethod | null>(null);
  const filter = ref<StatusFilter>('all');
  const selected = ref<Invoice | null>(null);

  onMounted(async () => {
    const [inv, pm] = await Promise.all([api.getInvoices(), api.getPaymentMethod()]);
    invoices.value = inv;
    payment.value = pm;
  });

  const visible = computed(() =>
    filter.value === 'all'
      ? invoices.value
      : invoices.value.filter((i) => i.status === filter.value),
  );

  const total = computed(() =>
    visible.value.reduce((acc, i) => acc + i.amountUsd, 0),
  );

  const overdueCount = computed(
    () => invoices.value.filter((i) => i.status === 'overdue').length,
  );

  return { invoices, payment, filter, selected, visible, total, overdueCount };
}

export const statusVariant = (s: Invoice['status']) =>
  s === 'paid' ? 'success' : s === 'open' ? 'info' : 'danger';

export const lineTotal = (inv: Invoice) =>
  (inv.lines ?? []).reduce((acc, l) => acc + l.amountUsd, 0);
