<template>
  <section class="builder-page">
    <header class="builder-page__header">
      <h1 class="builder-page__title">Builder stub</h1>
    </header>
    <div class="builder-page__body">
      <p class="builder-page__text">Placeholder for the upcoming builder experience.</p>
    </div>
  </section>
</template>

<style scoped lang="scss">
.builder-page {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 2rem;

  &__header {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  &__title {
    font-size: 2rem;
    font-weight: 600;
  }

  &__body {
    border: 1px dashed currentcolor;
    border-radius: 0.75rem;
    padding: 1.5rem;
  }

  &__text {
    color: rgb(0 0 0 / 60%);
    margin: 0;
  }
}
</style>
