<script setup lang="ts">
import { PfAvatar, PfCard } from '@platform/ui-kit';
import LoginsList from './components/LoginsList.vue';
import NotificationSettings from './components/NotificationSettings.vue';
import ProfileForm from './components/ProfileForm.vue';
import { useLoginHistory } from './composables/useLoginHistory';
import { useProfileForm } from './composables/useProfileForm';

const { form, dirty, saving, savedAt, save, reset } = useProfileForm();
const { logins } = useLoginHistory();
</script>

<template>
  <section class="profile-page">
    <header>
      <PfAvatar :name="form.displayName" :size="64" />
      <div>
        <h1>{{ form.displayName || 'Profile' }}</h1>
        <p>{{ form.title || '—' }} · {{ form.department || '—' }}</p>
      </div>
    </header>

    <PfCard title="Editable">
      <ProfileForm
        v-model="form"
        :dirty="dirty"
        :saving="saving"
        :saved-at="savedAt"
        @submit="save"
        @reset="reset"
      />
    </PfCard>

    <PfCard title="Уведомления">
      <NotificationSettings />
    </PfCard>

    <PfCard title="Недавние входы">
      <LoginsList :logins="logins" />
    </PfCard>
  </section>
</template>

<style scoped>
.profile-page {
  display: grid;
  gap: 20px;
  padding: 24px;
  max-width: 820px;
}

header {
  display: flex;
  align-items: center;
  gap: 16px;
}
header h1 { margin: 0; font-size: 26px; }
header p {
  margin: 2px 0 0;
  color: var(--pf-color-muted);
  font-size: 13px;
}
</style>
