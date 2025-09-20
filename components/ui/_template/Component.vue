<template>
  <div class="ui-component">
    <!-- TODO: replace with component markup -->
    <slot />
  </div>
</template>

<script setup lang="ts">
// Update component name when duplicating this template
// eslint-disable-next-line vue/multi-word-component-names
const componentName = 'UiComponent'

defineOptions({
  name: componentName,
})

// TODO: define props/emit interface
</script>
