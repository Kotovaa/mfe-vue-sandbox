<script setup lang="ts">
import { PfBadge } from '@platform/ui-kit';
import type { Deploy } from '@platform/shared-types';
import { fmtDuration, fmtTime } from '../lib/format';

defineProps<{ deploys: Deploy[] }>();

const variant = (s: Deploy['status']) =>
  s === 'success' ? 'success' : s === 'failed' ? 'danger' : 'warning';
</script>

<template>
  <ul class="deploys">
    <li v-for="d in deploys" :key="d.id">
      <PfBadge :variant="variant(d.status)" subtle>{{ d.status }}</PfBadge>
      <code>{{ d.commit }}</code>
      <span class="msg">{{ d.message }}</span>
      <span class="muted small">{{ d.app }} · {{ d.author }}</span>
      <span class="muted small ta-r">
        {{ fmtTime(d.finishedAt) }} · {{ fmtDuration(d.durationSec) }}
      </span>
    </li>
  </ul>
</template>

<style scoped>
.deploys {
  margin: 0;
  padding: 0;
  list-style: none;
  display: grid;
  gap: 4px;
}
.deploys li {
  display: grid;
  grid-template-columns: 80px 80px 1fr auto auto;
  gap: 12px;
  align-items: center;
  padding: 8px 6px;
  border-radius: 6px;
  font-size: 14px;
}
.deploys li:hover { background: var(--pf-color-surface-muted); }
.deploys code { font-size: 12px; color: var(--pf-color-muted); }

.muted { color: var(--pf-color-muted); }
.small { font-size: 12px; }
.ta-r { text-align: right; }

@media (max-width: 820px) {
  .deploys li {
    grid-template-columns: 80px 1fr;
    grid-auto-flow: row;
  }
}
</style>
