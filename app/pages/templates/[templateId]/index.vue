<template>
  <section class="template-details">
    <h1 class="template-details__title">Шаблон {{ route.params.templateId }} (заглушка)</h1>
    <p class="template-details__hint">Просмотр сведений о шаблоне появится здесь позже.</p>
  </section>
</template>

<script setup lang="ts">
const route = useRoute()
// TODO: Fetch template details once the gallery data layer is available.
</script>
