import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';
import type { RemoteManifest } from '@platform/shared-types';
import { loadRemote } from '../platform/loadRemote';

// Module Federation требует, чтобы импорты были статически анализируемы:
// строки внутри `import('...')` не могут быть переменными. Поэтому держим
// явную таблицу loader'ов, а манифест выбирает из неё по имени.
const loaders: Record<string, () => Promise<unknown>> = {
  dashboard_mfe: () => import('dashboard_mfe/Module'),
  profile_mfe: () => import('profile_mfe/Module'),
  billing_mfe: () => import('billing_mfe/Module'),
};

export function createAppRouter(manifest: RemoteManifest) {
  const remoteRoutes: RouteRecordRaw[] = manifest.remotes
    .filter((r) => loaders[r.name])
    .map((r) => ({
      path: r.routePath,
      component: loadRemote(r.name, loaders[r.name]!),
      meta: { remote: r.name },
    }));

  const firstPath = remoteRoutes[0]?.path ?? '/';

  return createRouter({
    history: createWebHistory(),
    routes: [{ path: '/', redirect: firstPath }, ...remoteRoutes],
  });
}
