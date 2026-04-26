import { onMounted, ref } from 'vue';
import { createApiClient, type ApiClient } from '@platform/api-sdk';
import { createStandaloneRuntime } from '@platform/shared-core';
import type { LoginEntry } from '@platform/shared-types';

export function useLoginHistory(
  api: ApiClient = createApiClient(createStandaloneRuntime('profile')),
) {
  const logins = ref<LoginEntry[]>([]);

  onMounted(async () => {
    logins.value = await api.getLoginHistory();
  });

  return { logins };
}
