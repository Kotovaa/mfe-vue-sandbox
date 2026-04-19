<script setup lang="ts">
withDefaults(
  defineProps<{
    variant?: 'neutral' | 'success' | 'warning' | 'danger' | 'info';
    subtle?: boolean;
  }>(),
  { variant: 'neutral', subtle: false },
);
</script>

<template>
  <span class="pf-badge" :class="[`pf-badge--${variant}`, { 'pf-badge--subtle': subtle }]">
    <slot />
  </span>
</template>
