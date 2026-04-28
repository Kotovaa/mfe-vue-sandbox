<script setup lang="ts">
import { PfBadge } from '@platform/ui-kit';
import type { Invoice } from '@platform/shared-types';
import { fmtAmount, fmtDate } from '../lib/format';
import { statusVariant } from '../composables/useBilling';

defineProps<{ invoices: Invoice[] }>();
defineEmits<{ select: [invoice: Invoice] }>();
</script>

<template>
  <table class="invoices">
    <thead>
      <tr>
        <th>Invoice</th>
        <th>Период</th>
        <th>Issued</th>
        <th class="ta-r">Amount</th>
        <th>Status</th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="inv in invoices"
        :key="inv.id"
        class="row"
        @click="$emit('select', inv)"
      >
        <td><code>{{ inv.id }}</code></td>
        <td class="muted">
          <template v-if="inv.periodFrom">
            {{ fmtDate(inv.periodFrom) }} — {{ fmtDate(inv.periodTo!) }}
          </template>
          <template v-else>—</template>
        </td>
        <td>{{ fmtDate(inv.issuedAt) }}</td>
        <td class="ta-r">{{ fmtAmount(inv.amountUsd) }}</td>
        <td><PfBadge :variant="statusVariant(inv.status)">{{ inv.status }}</PfBadge></td>
      </tr>
    </tbody>
  </table>
</template>

<style scoped>
.invoices {
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
}
.invoices th {
  text-align: left;
  font-weight: 600;
  font-size: 12px;
  color: var(--pf-color-muted);
  text-transform: uppercase;
  letter-spacing: 0.04em;
  padding: 8px 10px;
  border-bottom: 1px solid var(--pf-color-border);
}
.invoices td {
  padding: 10px;
  border-bottom: 1px solid var(--pf-color-border);
}
.invoices tr.row { cursor: pointer; }
.invoices tr.row:hover { background: var(--pf-color-surface-muted); }
.invoices code { font-size: 13px; }

.muted { color: var(--pf-color-muted); }
.ta-r { text-align: right; }

@media (max-width: 700px) {
  .invoices th:nth-child(2),
  .invoices td:nth-child(2) { display: none; }
}
</style>
