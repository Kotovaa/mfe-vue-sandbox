<script setup lang="ts">
import { PfButton } from '@platform/ui-kit';

defineProps<{ name: string; error?: unknown }>();
defineEmits<{ retry: [] }>();
</script>

<template>
  <div class="failed">
    <h2>Не удалось загрузить «{{ name }}»</h2>
    <p>Скорее всего ремоут не отвечает или у него поехали shared-зависимости.</p>
    <pre v-if="error">{{ String(error) }}</pre>
    <PfButton @click="$emit('retry')">Попробовать снова</PfButton>
  </div>
</template>

<style scoped>
.failed {
  display: grid;
  gap: 12px;
  padding: 32px;
  max-width: 560px;
}
h2 { margin: 0; font-size: 20px; }
p { margin: 0; color: var(--pf-color-muted); }
pre {
  margin: 0;
  padding: 10px 12px;
  border-radius: 6px;
  background: var(--pf-color-surface-muted);
  font-size: 12px;
  white-space: pre-wrap;
  color: var(--pf-color-muted);
}
</style>
