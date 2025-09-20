<template>
  <div class="builder-layout">
    <header class="builder-layout__topbar">
      <NuxtLink to="/builder" class="builder-layout__brand">Nuxt Builder</NuxtLink>
      <div class="builder-layout__actions">
        <slot name="top-actions">
          <button type="button" class="builder-layout__action" disabled>Сохранить</button>
          <button type="button" class="builder-layout__action" disabled>Предпросмотр</button>
        </slot>
      </div>
    </header>
    <div class="builder-layout__shell">
      <aside class="builder-layout__sidebar">
        <slot name="side-panel">
          <p class="builder-layout__placeholder">Здесь появятся инструменты конструктора.</p>
        </slot>
      </aside>
      <main class="builder-layout__workspace" role="main">
        <slot />
      </main>
      <aside class="builder-layout__inspector">
        <slot name="inspector">
          <p class="builder-layout__placeholder">Здесь появится инспектор блоков.</p>
        </slot>
      </aside>
    </div>
  </div>
</template>

<style scoped lang="scss">
.builder-layout {
  background-color: #0f172a;
  color: #f8fafc;
  display: flex;
  flex-direction: column;
  min-height: 100vh;

  &__topbar {
    align-items: center;
    backdrop-filter: blur(8px);
    background-color: rgb(15 23 42 / 90%);
    border-bottom: 1px solid rgb(148 163 184 / 20%);
    display: flex;
    gap: 1rem;
    justify-content: space-between;
    padding: 1rem 1.5rem;
  }

  &__brand {
    color: inherit;
    font-size: 1.125rem;
    font-weight: 600;
    text-decoration: none;
  }

  &__actions {
    align-items: center;
    display: flex;
    gap: 0.75rem;
  }

  &__action {
    background: rgb(15 23 42 / 40%);
    border: 1px solid rgb(148 163 184 / 40%);
    border-radius: 999px;
    color: inherit;
    cursor: not-allowed;
    padding: 0.5rem 1rem;
  }

  &__shell {
    background-color: rgb(148 163 184 / 20%);
    display: grid;
    flex: 1 1 auto;
    gap: 1px;
    grid-template-columns: 280px minmax(0, 1fr) 320px;
  }

  &__sidebar,
  &__inspector {
    background-color: rgb(15 23 42 / 70%);
    display: flex;
    flex-direction: column;
    padding: 1.5rem;
  }

  &__workspace {
    background-color: #1e293b;
    overflow: auto;
    padding: 1.5rem;
  }

  &__placeholder {
    color: rgb(248 250 252 / 60%);
    font-size: 0.875rem;
    margin: 0;
  }
}
</style>
