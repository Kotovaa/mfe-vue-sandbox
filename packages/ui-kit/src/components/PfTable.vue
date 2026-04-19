<script setup lang="ts">
defineProps<{
  columns: Array<{ key: string; label: string }>;
  rows: Array<Record<string, string | number>>;
}>();
</script>

<template>
  <table class="pf-table">
    <thead>
      <tr>
        <th v-for="column in columns" :key="column.key">{{ column.label }}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(row, rowIndex) in rows" :key="rowIndex">
        <td v-for="column in columns" :key="column.key">{{ row[column.key] }}</td>
      </tr>
    </tbody>
  </table>
</template>
