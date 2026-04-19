<script setup lang="ts">
defineProps<{
  label: string;
  value: string | number;
  delta?: number;
  unit?: string;
}>();
</script>

<template>
  <div class="pf-stat">
    <span class="pf-stat__label">{{ label }}</span>
    <strong class="pf-stat__value">
      {{ value }}<small v-if="unit">{{ unit }}</small>
    </strong>
    <small
      v-if="delta !== undefined"
      class="pf-stat__delta"
      :class="{
        'pf-stat__delta--up': delta > 0,
        'pf-stat__delta--down': delta < 0,
      }"
    >
      {{ delta > 0 ? '+' : '' }}{{ delta }}%
    </small>
  </div>
</template>
