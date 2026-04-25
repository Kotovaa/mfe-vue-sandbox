import { computed, onMounted, ref } from 'vue';
import { createApiClient, type ApiClient } from '@platform/api-sdk';
import { createStandaloneRuntime } from '@platform/shared-core';
import type { DashboardMetric, Deploy, Incident } from '@platform/shared-types';

/**
 * Грузим метрики, инциденты и деплои одним onMount-ом.
 * Если api не передан — поднимаем standalone-рантайм (для dev).
 */
export function useDashboard(api: ApiClient = createApiClient(createStandaloneRuntime('dashboard'))) {
  const metrics = ref<DashboardMetric[]>([]);
  const deploys = ref<Deploy[]>([]);
  const incidents = ref<Incident[]>([]);
  const loading = ref(true);
  const error = ref<unknown>(null);

  async function load() {
    loading.value = true;
    error.value = null;
    try {
      const [m, d, i] = await Promise.all([
        api.getDashboardMetrics(),
        api.getDeploys(),
        api.getIncidents(),
      ]);
      metrics.value = m;
      deploys.value = d;
      incidents.value = i;
    } catch (e) {
      error.value = e;
    } finally {
      loading.value = false;
    }
  }

  onMounted(load);

  const successRate = computed(() => {
    if (!deploys.value.length) return 0;
    const ok = deploys.value.filter((d) => d.status === 'success').length;
    return Math.round((ok / deploys.value.length) * 100);
  });

  return { metrics, deploys, incidents, loading, error, successRate, reload: load };
}
