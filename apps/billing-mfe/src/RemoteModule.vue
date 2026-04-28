<script setup lang="ts">
import { PfBadge, PfCard, PfSelect } from '@platform/ui-kit';
import InvoiceModal from './components/InvoiceModal.vue';
import InvoicesTable from './components/InvoicesTable.vue';
import PaymentMethodCard from './components/PaymentMethodCard.vue';
import { useBilling } from './composables/useBilling';
import { fmtAmount } from './lib/format';

const { payment, filter, selected, visible, total, overdueCount } = useBilling();

const filterOptions = [
  { value: 'all', label: 'Все статусы' },
  { value: 'paid', label: 'Только paid' },
  { value: 'open', label: 'Только open' },
  { value: 'overdue', label: 'Только overdue' },
];
</script>

<template>
  <section class="billing">
    <header>
      <h1>Billing</h1>
      <PfBadge v-if="overdueCount" variant="danger">{{ overdueCount }} overdue</PfBadge>
    </header>

    <PaymentMethodCard v-if="payment" :method="payment" />

    <PfCard>
      <div class="toolbar">
        <PfSelect v-model="filter" :options="filterOptions" />
        <span class="total">{{ visible.length }} счетов · {{ fmtAmount(total) }}</span>
      </div>
      <InvoicesTable :invoices="visible" @select="selected = $event" />
    </PfCard>

    <InvoiceModal :invoice="selected" @close="selected = null" />
  </section>
</template>

<style scoped>
.billing {
  display: grid;
  gap: 16px;
  padding: 24px;
}
header {
  display: flex;
  align-items: center;
  gap: 12px;
}
header h1 { margin: 0; font-size: 26px; }

.toolbar {
  display: flex;
  align-items: end;
  gap: 12px;
  margin-bottom: 12px;
}
.total {
  margin-left: auto;
  color: var(--pf-color-muted);
  font-size: 13px;
}
</style>
