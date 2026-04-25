<script setup lang="ts">
defineProps<{ values: number[] }>();
</script>

<template>
  <div class="chart" aria-label="release trend">
    <span v-for="(h, i) in values" :key="i" :style="{ height: h + '%' }" />
  </div>
</template>

<style scoped>
.chart {
  display: flex;
  height: 200px;
  align-items: end;
  gap: 8px;
}
.chart span {
  flex: 1;
  border-radius: 4px 4px 0 0;
  background: var(--pf-color-primary);
  opacity: 0.85;
}
</style>
