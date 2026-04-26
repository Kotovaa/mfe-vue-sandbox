import vue from '@vitejs/plugin-vue';
import federation from '@originjs/vite-plugin-federation';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [
    vue(),
    federation({
      name: 'profile_mfe',
      filename: 'remoteEntry.js',
      exposes: {
        './Module': './src/RemoteModule.vue',
      },
      shared: ['vue', '@platform/shared-core', '@platform/api-sdk', '@platform/ui-kit'],
    }),
  ],
  server: { port: 5175 },
  preview: { port: 4175 },
  build: { target: 'esnext', modulePreload: false, cssCodeSplit: false },
});
