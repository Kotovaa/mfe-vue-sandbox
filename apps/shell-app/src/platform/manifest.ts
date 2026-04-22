import type { RemoteManifest } from '@platform/shared-types';

declare global {
  interface Window {
    /**
     * Хост проставляет URL'ы remote-ов сюда до того, как Vite-федерация
     * попытается их подгрузить. См. ремоуты в `vite.config.ts` —
     * они читают именно отсюда через Promise-обёртку.
     */
    __REMOTES__?: Record<string, string>;
  }
}

const FALLBACK: RemoteManifest = {
  version: 'fallback',
  remotes: [
    { name: 'dashboard_mfe', url: 'http://localhost:4174/assets/remoteEntry.js', routePath: '/dashboard', module: 'Module' },
    { name: 'profile_mfe',   url: 'http://localhost:4175/assets/remoteEntry.js', routePath: '/profile',   module: 'Module' },
    { name: 'billing_mfe',   url: 'http://localhost:4176/assets/remoteEntry.js', routePath: '/billing',   module: 'Module' },
  ],
};

/**
 * Тянет /remotes.json и расставляет URL-ы в window.__REMOTES__,
 * чтобы шиммированные remote-ы из vite.config резолвились динамически.
 * Если манифест недоступен — кидает в консоль ворнинг и берёт FALLBACK.
 */
export async function loadRemoteManifest(url = '/remotes.json'): Promise<RemoteManifest> {
  let manifest: RemoteManifest;
  try {
    const res = await fetch(url, { cache: 'no-cache' });
    if (!res.ok) throw new Error(`manifest http ${res.status}`);
    manifest = (await res.json()) as RemoteManifest;
  } catch (e) {
    console.warn('[shell] не смог прочитать remote manifest, fallback на статику', e);
    manifest = FALLBACK;
  }

  window.__REMOTES__ = Object.fromEntries(manifest.remotes.map((r) => [r.name, r.url]));
  return manifest;
}
