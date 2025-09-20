<template>
  <section class="settings-publishing">
    <header class="settings-publishing__header">
      <h1 class="settings-publishing__title">Публикация</h1>
      <p class="settings-publishing__subtitle">
        Настройки публикации и доменов появятся здесь после интеграции.
      </p>
    </header>
    <p class="settings-publishing__placeholder">
      Заглушка формы публикации. Добавь сюда пробные элементы для отладки лайаута.
    </p>
  </section>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'settings',
})
</script>

<style scoped lang="scss">
.settings-publishing {
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
