<script setup lang="ts">
withDefaults(
  defineProps<{
    size?: number;
    label?: string;
  }>(),
  { size: 18 },
);
</script>

<template>
  <span class="pf-spinner-wrap" role="status" :aria-label="label ?? 'loading'">
    <span class="pf-spinner" :style="{ width: `${size}px`, height: `${size}px` }" />
    <span v-if="label">{{ label }}</span>
  </span>
</template>
