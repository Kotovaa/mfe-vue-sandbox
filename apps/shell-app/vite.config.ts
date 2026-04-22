import vue from '@vitejs/plugin-vue';
import federation from '@originjs/vite-plugin-federation';
import { defineConfig } from 'vite';

// URL до remoteEntry.js достаём из window.__REMOTES__, который проставляет
// loadRemoteManifest() до маунта приложения. Так shell может узнать про
// ремоуты в рантайме, не пересобирая себя при каждом изменении адресов.
const dynamicRemote = (name: string) => ({
  external: `Promise.resolve(window.__REMOTES__?.['${name}'])`,
  externalType: 'promise' as const,
  format: 'esm' as const,
  from: 'vite' as const,
});

export default defineConfig({
  plugins: [
    vue(),
    federation({
      name: 'shell_app',
      remotes: {
        dashboard_mfe: dynamicRemote('dashboard_mfe'),
        profile_mfe: dynamicRemote('profile_mfe'),
        billing_mfe: dynamicRemote('billing_mfe'),
      },
      shared: ['vue', 'vue-router', '@platform/shared-core', '@platform/api-sdk', '@platform/ui-kit'],
    }),
  ],
  server: { port: 5173 },
  preview: { port: 4173 },
  build: {
    target: 'esnext',
    modulePreload: false,
    cssCodeSplit: false,
  },
});
