<script setup lang="ts">
defineProps<{
  tabs: Array<{ id: string; label: string }>;
  modelValue: string;
}>();

defineEmits<{
  'update:modelValue': [id: string];
}>();
</script>

<template>
  <div class="pf-tabs" role="tablist">
    <button
      v-for="tab in tabs"
      :key="tab.id"
      class="pf-tab"
      role="tab"
      :aria-selected="tab.id === modelValue"
      @click="$emit('update:modelValue', tab.id)"
    >
      {{ tab.label }}
    </button>
  </div>
</template>
