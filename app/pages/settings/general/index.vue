<template>
  <section class="settings-general">
    <header class="settings-general__header">
      <h1 class="settings-general__title">Общие настройки</h1>
      <p class="settings-general__subtitle">Основные параметры проекта появятся в этой секции.</p>
    </header>
    <p class="settings-general__placeholder">
      Заглушка формы общих настроек. В будущем здесь будут название сайта, язык и базовые настройки.
    </p>
  </section>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'settings',
})
</script>

<style scoped lang="scss">
.settings-general {
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
