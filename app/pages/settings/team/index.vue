<template>
  <section class="settings-team">
    <header class="settings-team__header">
      <h1 class="settings-team__title">Команда</h1>
      <p class="settings-team__subtitle">
        Управление участниками и правами доступа появится в этой секции позже.
      </p>
    </header>
    <p class="settings-team__placeholder">
      Заглушка управления командой. Здесь будут приглашения, роли и статус участников.
    </p>
  </section>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'settings',
})
</script>

<style scoped lang="scss">
.settings-team {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  &__header {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  &__title {
    font-size: 1.75rem;
    font-weight: 600;
    margin: 0;
  }

  &__subtitle {
    color: rgb(15 23 42 / 60%);
    margin: 0;
  }

  &__placeholder {
    color: rgb(15 23 42 / 60%);
    margin: 0;
    max-width: 52ch;
  }
}
</style>
