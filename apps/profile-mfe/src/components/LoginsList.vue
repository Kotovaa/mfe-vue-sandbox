<script setup lang="ts">
import { PfBadge } from '@platform/ui-kit';
import type { LoginEntry } from '@platform/shared-types';
import { fmtTime } from '../lib/format';

defineProps<{ logins: LoginEntry[] }>();
</script>

<template>
  <ul class="logins">
    <li v-for="l in logins" :key="l.id">
      <div class="logins__main">
        <strong>{{ l.device }}</strong>
        <PfBadge v-if="l.current" variant="success">сейчас</PfBadge>
      </div>
      <div class="logins__meta">{{ l.city }} · {{ l.ip }} · {{ fmtTime(l.at) }}</div>
    </li>
  </ul>
</template>

<style scoped>
.logins {
  margin: 0;
  padding: 0;
  list-style: none;
  display: grid;
  gap: 10px;
}
.logins li {
  padding-bottom: 10px;
  border-bottom: 1px solid var(--pf-color-border);
}
.logins li:last-child { border-bottom: 0; padding-bottom: 0; }

.logins__main {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
}
.logins__meta {
  color: var(--pf-color-muted);
  font-size: 12px;
  margin-top: 2px;
}
</style>
