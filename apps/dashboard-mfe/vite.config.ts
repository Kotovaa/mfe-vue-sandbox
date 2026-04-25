import vue from '@vitejs/plugin-vue';
import federation from '@originjs/vite-plugin-federation';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [
    vue(),
    federation({
      name: 'dashboard_mfe',
      filename: 'remoteEntry.js',
      exposes: {
        './Module': './src/RemoteModule.vue',
      },
      shared: ['vue', '@platform/shared-core', '@platform/api-sdk', '@platform/ui-kit'],
    }),
  ],
  server: { port: 5174 },
  preview: { port: 4174 },
  build: {
    target: 'esnext',
    modulePreload: false,
    cssCodeSplit: false,
  },
});
