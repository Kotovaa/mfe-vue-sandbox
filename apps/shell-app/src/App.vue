<script setup lang="ts">
import { inject, ref } from 'vue';
import { RouterLink, RouterView } from 'vue-router';
import { PfButton } from '@platform/ui-kit';
import { runtimeKey, type ShellRuntime } from './platform/runtime';

const runtime = inject<ShellRuntime>(runtimeKey);
const theme = ref<'light' | 'dark'>('light');

function toggleTheme() {
  theme.value = theme.value === 'light' ? 'dark' : 'light';
  document.documentElement.dataset.theme = theme.value;
}
</script>

<template>
  <div class="shell">
    <aside class="shell__nav">
      <div class="shell__brand">Enterprise Frontend Platform</div>
      <RouterLink to="/dashboard">Dashboard</RouterLink>
      <RouterLink to="/profile">Profile</RouterLink>
      <RouterLink to="/billing">Billing</RouterLink>
    </aside>

    <main class="shell__main">
      <header class="shell__header">
        <div>
          <strong>{{ runtime?.auth.getSession()?.user.displayName }}</strong>
          <span>{{ runtime?.auth.getSession()?.user.tenantId }}</span>
        </div>
        <PfButton variant="secondary" @click="toggleTheme">Theme</PfButton>
      </header>

      <RouterView />
    </main>
  </div>
</template>

<style scoped>
.shell {
  display: grid;
  min-height: 100vh;
  grid-template-columns: 260px 1fr;
}

.shell__nav {
  display: flex;
  flex-direction: column;
  gap: 8px;
  border-right: 1px solid var(--pf-color-border);
  background: var(--pf-color-surface);
  padding: 20px;
}

.shell__brand {
  margin-bottom: 16px;
  font-size: 14px;
  font-weight: 800;
  line-height: 1.3;
}

.shell__nav a {
  border-radius: 6px;
  color: var(--pf-color-muted);
  padding: 10px 12px;
  text-decoration: none;
}

.shell__nav a.router-link-active {
  background: var(--pf-color-surface-muted);
  color: var(--pf-color-text);
  font-weight: 700;
}

.shell__main {
  min-width: 0;
}

.shell__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid var(--pf-color-border);
  background: var(--pf-color-surface);
  padding: 14px 24px;
}

.shell__header div {
  display: grid;
  gap: 2px;
}

.shell__header span {
  color: var(--pf-color-muted);
  font-size: 13px;
}

@media (max-width: 760px) {
  .shell {
    grid-template-columns: 1fr;
  }

  .shell__nav {
    flex-direction: row;
    overflow-x: auto;
  }
}
</style>
