<script setup lang="ts">
import { PfStat } from '@platform/ui-kit';
import type { DashboardMetric } from '@platform/shared-types';

defineProps<{ metrics: DashboardMetric[] }>();
</script>

<template>
  <div class="grid">
    <PfStat
      v-for="m in metrics"
      :key="m.label"
      :label="m.label"
      :value="m.value"
      :delta="m.delta"
    />
  </div>
</template>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
}
@media (max-width: 820px) {
  .grid { grid-template-columns: 1fr 1fr; }
}
</style>
