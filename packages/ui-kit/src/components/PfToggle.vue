<script setup lang="ts">
defineProps<{
  modelValue: boolean;
  label?: string;
  hint?: string;
  disabled?: boolean;
}>();

defineEmits<{
  'update:modelValue': [value: boolean];
}>();
</script>

<template>
  <label class="pf-toggle" :class="{ 'pf-toggle--disabled': disabled }">
    <input
      type="checkbox"
      :checked="modelValue"
      :disabled="disabled"
      @change="$emit('update:modelValue', ($event.target as HTMLInputElement).checked)"
    />
    <span class="pf-toggle__track" aria-hidden="true">
      <span class="pf-toggle__thumb" />
    </span>
    <span v-if="label || $slots.default" class="pf-toggle__text">
      <slot>{{ label }}</slot>
      <small v-if="hint">{{ hint }}</small>
    </span>
  </label>
</template>
