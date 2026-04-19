<script setup lang="ts">
import { computed } from 'vue';

const props = withDefaults(
  defineProps<{
    name: string;
    src?: string;
    size?: number;
  }>(),
  { size: 40 },
);

const initials = computed(() => {
  const parts = props.name.trim().split(/\s+/).filter(Boolean);
  return ((parts[0]?.[0] ?? '?') + (parts[1]?.[0] ?? '')).toUpperCase();
});

// детерминированный цвет от имени, чтобы аватары без картинки не были одинаковыми
const hue = computed(() => {
  let h = 0;
  for (const c of props.name) h = (h * 31 + c.charCodeAt(0)) >>> 0;
  return h % 360;
});

const style = computed(() => ({
  width: `${props.size}px`,
  height: `${props.size}px`,
  fontSize: `${Math.round(props.size * 0.36)}px`,
  background: props.src
    ? undefined
    : `linear-gradient(135deg, hsl(${hue.value}, 65%, 55%), hsl(${(hue.value + 40) % 360}, 60%, 45%))`,
}));
</script>

<template>
  <div class="pf-avatar" :style="style" :title="name">
    <img v-if="src" :src="src" :alt="name" />
    <span v-else>{{ initials }}</span>
  </div>
</template>
