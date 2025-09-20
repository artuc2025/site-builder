<template>
  <section class="settings-page">
    <header class="settings-page__header">
      <h1 class="settings-page__title">Настройки проекта</h1>
      <p class="settings-page__subtitle">
        Выберите раздел слева, чтобы изменить параметры проекта.
      </p>
    </header>
    <p class="settings-page__placeholder">
      Здесь появится обзор настроек проекта и быстрые ссылки на важные разделы.
    </p>
  </section>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'settings',
})
</script>

<style scoped lang="scss">
.settings-page {
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
    max-width: 48ch;
  }
}
</style>
