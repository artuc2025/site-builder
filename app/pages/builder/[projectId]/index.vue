<template>
  <section class="builder-project">
    <header class="builder-project__header">
      <h1 class="builder-project__title">Project {{ route.params.projectId }}</h1>
      <p class="builder-project__subtitle">
        Configure the layout and content for this project. Everything saves instantly as you work.
      </p>
    </header>
    <div class="builder-project__canvas">
      <p class="builder-project__placeholder">
        Choose a block on the left to begin. Live updates render here on the canvas.
      </p>
    </div>
  </section>
</template>

<script setup lang="ts">
const route = useRoute()

definePageMeta({
  layout: 'builder',
})
</script>

<style scoped lang="scss">
.builder-project {
  color: #f8fafc;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  &__header {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  &__title {
    font-size: 2rem;
    font-weight: 600;
  }

  &__subtitle {
    color: rgb(248 250 252 / 70%);
    margin: 0;
    max-width: 52ch;
  }

  &__canvas {
    background: rgb(15 23 42 / 35%);
    border: 1px dashed rgb(148 163 184 / 50%);
    border-radius: 1rem;
    display: grid;
    flex: 1 1 auto;
    min-height: 420px;
    place-items: center;
  }

  &__placeholder {
    color: rgb(248 250 252 / 45%);
    margin: 0;
  }
}
</style>
