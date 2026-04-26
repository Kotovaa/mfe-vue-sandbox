import { computed, onMounted, ref } from 'vue';
import { createApiClient, type ApiClient } from '@platform/api-sdk';
import { createStandaloneRuntime } from '@platform/shared-core';
import type { Profile } from '@platform/shared-types';

const empty: Profile = { displayName: '', title: '', department: '', timezone: '' };

export function useProfileForm(
  api: ApiClient = createApiClient(createStandaloneRuntime('profile')),
) {
  const form = ref<Profile>({ ...empty });
  const initial = ref<Profile | null>(null);
  const saving = ref(false);
  const savedAt = ref<number | null>(null);

  onMounted(async () => {
    const p = await api.getProfile();
    form.value = { ...p };
    initial.value = { ...p };
  });

  const dirty = computed(() => {
    if (!initial.value) return false;
    return (Object.keys(form.value) as (keyof Profile)[]).some(
      (k) => form.value[k] !== initial.value![k],
    );
  });

  async function save() {
    if (!dirty.value || saving.value) return;
    saving.value = true;
    try {
      await api.updateProfile({ ...form.value });
      initial.value = { ...form.value };
      savedAt.value = Date.now();
    } finally {
      saving.value = false;
    }
  }

  function reset() {
    if (initial.value) form.value = { ...initial.value };
  }

  return { form, dirty, saving, savedAt, save, reset };
}
