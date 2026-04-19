<script setup lang="ts">
defineProps<{
  title?: string;
}>();
</script>

<template>
  <section class="pf-card">
    <header v-if="title || $slots.header" class="pf-card__header">
      <slot name="header">
        <strong>{{ title }}</strong>
      </slot>
    </header>
    <div class="pf-card__body">
      <slot />
    </div>
  </section>
</template>
