<script setup lang="ts">
import { PfBadge } from '@platform/ui-kit';
import type { Incident } from '@platform/shared-types';
import { fmtTime } from '../lib/format';

defineProps<{ incident: Incident }>();

const sevVariant = (s: Incident['severity']) =>
  s === 'p1' ? 'danger' : s === 'p2' ? 'warning' : 'success';
</script>

<template>
  <div class="incident">
    <PfBadge :variant="sevVariant(incident.severity)">{{ incident.severity }}</PfBadge>
    <strong>{{ incident.title }}</strong>
    <span class="muted">с {{ fmtTime(incident.startedAt) }}</span>
    <a href="#" @click.prevent>подробнее →</a>
  </div>
</template>

<style scoped>
.incident {
  display: flex;
  gap: 12px;
  align-items: center;
  border: 1px solid #e8b96b;
  background: #fef6e6;
  border-radius: 8px;
  padding: 10px 14px;
  font-size: 14px;
}
[data-theme='dark'] .incident {
  background: #2c2418;
  border-color: #6a4f23;
}
.incident a {
  margin-left: auto;
  color: var(--pf-color-primary);
  text-decoration: none;
}
.incident strong { font-weight: 600; }
.muted { color: var(--pf-color-muted); }
</style>
