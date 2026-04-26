<script setup lang="ts">
import { PfButton, PfInput } from '@platform/ui-kit';
import type { Profile } from '@platform/shared-types';

const form = defineModel<Profile>({ required: true });

defineProps<{
  dirty: boolean;
  saving: boolean;
  savedAt: number | null;
}>();

defineEmits<{
  submit: [];
  reset: [];
}>();
</script>

<template>
  <form @submit.prevent="$emit('submit')">
    <div class="row">
      <PfInput v-model="form.displayName" label="Display name" />
      <PfInput v-model="form.title" label="Title" />
    </div>
    <div class="row">
      <PfInput v-model="form.department" label="Department" />
      <PfInput v-model="form.timezone" label="Timezone" />
    </div>

    <footer>
      <span v-if="savedAt" class="saved">
        Сохранено · {{ new Date(savedAt).toLocaleTimeString() }}
      </span>
      <PfButton variant="ghost" :disabled="!dirty" @click="$emit('reset')">Отменить</PfButton>
      <PfButton type="submit" :disabled="!dirty" :loading="saving">Сохранить</PfButton>
    </footer>
  </form>
</template>

<style scoped>
form { display: grid; gap: 16px; }

.row {
  display: grid;
  gap: 12px;
  grid-template-columns: 1fr 1fr;
}
@media (max-width: 600px) {
  .row { grid-template-columns: 1fr; }
}

footer {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 12px;
}
.saved {
  margin-right: auto;
  color: var(--pf-color-success);
  font-size: 13px;
}
</style>
