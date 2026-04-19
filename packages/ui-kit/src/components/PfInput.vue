<script setup lang="ts">
defineProps<{
  label: string;
  modelValue: string;
  name?: string;
}>();

defineEmits<{
  'update:modelValue': [value: string];
}>();
</script>

<template>
  <label class="pf-input">
    <span>{{ label }}</span>
    <input
      :name="name"
      :value="modelValue"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    />
  </label>
</template>
