<script setup lang="ts">
import { PfButton, PfCard } from '@platform/ui-kit';
import type { PaymentMethod } from '@platform/shared-types';

defineProps<{ method: PaymentMethod }>();
</script>

<template>
  <PfCard title="Способ оплаты">
    <div class="payment">
      <div class="card-icon" :class="`brand-${method.brand}`">
        {{ method.brand.toUpperCase() }}
      </div>
      <div class="payment__main">
        <strong>•••• •••• •••• {{ method.last4 }}</strong>
        <span class="muted">{{ method.holder }} · до {{ method.expires }}</span>
      </div>
      <PfButton variant="ghost" size="sm">Изменить</PfButton>
    </div>
  </PfCard>
</template>

<style scoped>
.payment {
  display: flex;
  align-items: center;
  gap: 16px;
}
.payment__main { display: flex; flex-direction: column; }
.payment__main strong { font-family: monospace; font-size: 15px; }
.payment__main .muted { font-size: 12px; }

.card-icon {
  width: 56px;
  height: 36px;
  border-radius: 6px;
  display: grid;
  place-items: center;
  font-size: 11px;
  font-weight: 800;
  color: #fff;
  letter-spacing: 0.5px;
}
.brand-mastercard { background: linear-gradient(135deg, #eb001b, #f79e1b); }
.brand-visa { background: linear-gradient(135deg, #1a1f71, #4a55a2); }
.brand-mir { background: linear-gradient(135deg, #006848, #0fa372); }

.payment :deep(.pf-button) { margin-left: auto; }
.muted { color: var(--pf-color-muted); }
</style>
