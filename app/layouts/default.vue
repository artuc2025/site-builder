<template>
  <div class="layout">
    <main class="layout__content" role="main">
      <slot />
    </main>
  </div>
</template>

<style lang="scss">
.layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;

  &__content {
    display: flex;
    flex: 1 0 auto;
    flex-direction: column;
  }
}
</style>
