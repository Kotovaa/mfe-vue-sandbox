<script setup lang="ts">
import { PfCard, PfSpinner, PfTabs } from '@platform/ui-kit';
import { ref } from 'vue';
import DeploysList from './components/DeploysList.vue';
import IncidentBanner from './components/IncidentBanner.vue';
import MetricsGrid from './components/MetricsGrid.vue';
import ReleaseChart from './components/ReleaseChart.vue';
import { useDashboard } from './composables/useDashboard';

const { metrics, deploys, incidents, loading, successRate } = useDashboard();
const tab = ref('overview');

// высоты столбиков для бутафорного «графика»
const bars = [45, 64, 52, 78, 69, 86, 71, 64, 90, 73, 81, 77];
</script>

<template>
  <section class="page">
    <header>
      <p class="kicker">analytics</p>
      <h1>Operational dashboard</h1>
    </header>

    <IncidentBanner v-for="inc in incidents.slice(0, 1)" :key="inc.id" :incident="inc" />

    <PfTabs
      v-model="tab"
      :tabs="[
        { id: 'overview', label: 'Overview' },
        { id: 'releases', label: 'Releases' },
      ]"
    />

    <PfSpinner v-if="loading" label="Загружаем данные…" />

    <template v-else-if="tab === 'overview'">
      <MetricsGrid :metrics="metrics" />
      <PfCard title="Release signal · 12h">
        <ReleaseChart :values="bars" />
      </PfCard>
    </template>

    <template v-else>
      <PfCard :title="`Recent deploys · success rate ${successRate}%`">
        <DeploysList :deploys="deploys" />
      </PfCard>
    </template>
  </section>
</template>

<style scoped>
.page {
  display: grid;
  gap: 20px;
  padding: 24px;
}
.kicker {
  margin: 0 0 4px;
  color: var(--pf-color-muted);
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}
h1 { margin: 0; font-size: 28px; }
</style>
