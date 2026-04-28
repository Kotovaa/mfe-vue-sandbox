<script setup lang="ts">
import { PfBadge, PfButton, PfModal } from '@platform/ui-kit';
import type { Invoice } from '@platform/shared-types';
import { fmtAmount, fmtDate } from '../lib/format';
import { lineTotal, statusVariant } from '../composables/useBilling';

defineProps<{ invoice: Invoice | null }>();
defineEmits<{ close: [] }>();
</script>

<template>
  <PfModal :open="!!invoice" :title="invoice?.id ?? ''" @close="$emit('close')">
    <div v-if="invoice" class="details">
      <div class="meta">
        <div>
          <span class="muted small">Период</span>
          <div>
            <template v-if="invoice.periodFrom">
              {{ fmtDate(invoice.periodFrom) }} — {{ fmtDate(invoice.periodTo!) }}
            </template>
            <template v-else>—</template>
          </div>
        </div>
        <div>
          <span class="muted small">Issued</span>
          <div>{{ fmtDate(invoice.issuedAt) }}</div>
        </div>
        <div>
          <span class="muted small">Status</span>
          <div>
            <PfBadge :variant="statusVariant(invoice.status)">{{ invoice.status }}</PfBadge>
          </div>
        </div>
      </div>

      <table v-if="invoice.lines?.length" class="lines">
        <thead>
          <tr>
            <th>Описание</th>
            <th class="ta-r">Кол-во</th>
            <th class="ta-r">Сумма</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(l, i) in invoice.lines" :key="i">
            <td>{{ l.description }}</td>
            <td class="ta-r muted">×{{ l.quantity }}</td>
            <td class="ta-r">{{ fmtAmount(l.amountUsd) }}</td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td colspan="2" class="ta-r"><strong>Итого</strong></td>
            <td class="ta-r"><strong>{{ fmtAmount(lineTotal(invoice)) }}</strong></td>
          </tr>
        </tfoot>
      </table>
      <p v-else class="muted">Детализация по этому счёту недоступна.</p>

      <div class="actions">
        <PfButton variant="ghost" @click="$emit('close')">Закрыть</PfButton>
        <PfButton>Скачать PDF</PfButton>
      </div>
    </div>
  </PfModal>
</template>

<style scoped>
.details { display: grid; gap: 16px; min-width: 420px; }
.meta {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  font-size: 14px;
}
.meta .small {
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.lines { width: 100%; border-collapse: collapse; font-size: 14px; }
.lines th, .lines td { padding: 8px 10px; border-bottom: 1px solid var(--pf-color-border); }
.lines tfoot td { border-bottom: none; padding-top: 12px; }

.actions {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  border-top: 1px solid var(--pf-color-border);
  padding-top: 12px;
}

.muted { color: var(--pf-color-muted); }
.ta-r { text-align: right; }
.small { font-size: 12px; }

@media (max-width: 700px) {
  .meta { grid-template-columns: 1fr 1fr; }
}
</style>
