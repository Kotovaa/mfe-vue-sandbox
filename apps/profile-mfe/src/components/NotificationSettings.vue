<script setup lang="ts">
import { PfToggle } from '@platform/ui-kit';
import { ref } from 'vue';

// локальное состояние, потому что бэка под это пока нет
const email = ref(true);
const digest = ref(false);
</script>

<template>
  <div class="toggles">
    <PfToggle
      v-model="email"
      label="Email о новых релизах"
      hint="присылаем когда деплой успешный"
    />
    <PfToggle
      v-model="digest"
      label="Еженедельный дайджест"
      hint="по понедельникам, без выходных"
    />
  </div>
  <p class="hint">Просто toggle, никуда не отправляется — рантайм пока не реализован.</p>
</template>

<style scoped>
.toggles { display: grid; gap: 12px; }

.hint {
  margin: 12px 0 0;
  color: var(--pf-color-muted);
  font-size: 12px;
  font-style: italic;
}
</style>
