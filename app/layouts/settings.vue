<template>
  <div class="settings-layout">
    <aside class="settings-layout__sidebar">
      <slot name="navigation">
        <nav class="settings-layout__nav" aria-label="Навигация по настройкам">
          <NuxtLink to="/settings/general" class="settings-layout__link">Общие</NuxtLink>
          <NuxtLink to="/settings/publishing" class="settings-layout__link">Публикация</NuxtLink>
          <NuxtLink to="/settings/team" class="settings-layout__link">Команда</NuxtLink>
        </nav>
      </slot>
    </aside>
    <section class="settings-layout__content">
      <header class="settings-layout__header">
        <slot name="header" />
      </header>
      <div class="settings-layout__body">
        <slot />
      </div>
    </section>
  </div>
</template>

<style scoped lang="scss">
.settings-layout {
  background-color: #f8fafc;
  color: #0f172a;
  display: grid;
  grid-template-columns: 260px minmax(0, 1fr);
  min-height: 100vh;

  &__sidebar {
    background-color: #fff;
    border-right: 1px solid rgb(15 23 42 / 8%);
    padding: 2rem 1.5rem;
  }

  &__nav {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  &__link {
    align-items: center;
    border-radius: 0.5rem;
    color: inherit;
    display: inline-flex;
    gap: 0.5rem;
    padding: 0.5rem 0.75rem;
    text-decoration: none;
    transition: background-color 0.2s ease;

    &:hover,
    &.router-link-active {
      background-color: rgb(15 23 42 / 8%);
      font-weight: 600;
    }
  }

  &__content {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    padding: 2rem 2.5rem;
  }

  &__header {
    min-height: 3rem;
  }

  &__body {
    background-color: #fff;
    border-radius: 1rem;
    box-shadow: 0 10px 30px rgb(15 23 42 / 8%);
    flex: 1 1 auto;
    padding: 2rem;
  }
}
</style>
