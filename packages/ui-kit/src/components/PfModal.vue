<script setup lang="ts">
defineProps<{
  open: boolean;
  title: string;
}>();

defineEmits<{
  close: [];
}>();
</script>

<template>
  <Teleport to="body">
    <div v-if="open" class="pf-modal-backdrop" @click.self="$emit('close')">
      <section class="pf-modal" role="dialog" aria-modal="true" :aria-label="title">
        <header class="pf-card__header">
          <strong>{{ title }}</strong>
        </header>
        <div class="pf-card__body">
          <slot />
        </div>
      </section>
    </div>
  </Teleport>
</template>
