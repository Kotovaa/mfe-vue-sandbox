import '@platform/ui-kit/styles.css';
import { createApp } from 'vue';
import App from './App.vue';
import { bootstrapRuntime, runtimeKey } from './platform/runtime';
import { loadRemoteManifest } from './platform/manifest';
import { createAppRouter } from './router';

// Грузим манифест ДО маунта — иначе vite-plugin-federation попытается
// прочитать window.__REMOTES__ и получит undefined.
async function bootstrap() {
  const manifest = await loadRemoteManifest();
  const router = createAppRouter(manifest);
  const runtime = bootstrapRuntime();

  runtime.events.on('navigation:requested', ({ path }) => {
    void router.push(path);
  });

  createApp(App).provide(runtimeKey, runtime).use(router).mount('#app');
}

void bootstrap();
