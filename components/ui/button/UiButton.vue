<template>
  <button
    v-bind="attrs"
    :type="type"
    :class="classes"
    :disabled="isDisabled"
    :aria-busy="loading || undefined"
    @click="onClick"
  >
    <span v-if="loading" class="ui-button__spinner" aria-hidden="true" />

    <span v-if="slots.prefix" class="ui-button__prefix">
      <slot name="prefix" />
    </span>

    <span
      v-if="slots.icon && iconPosition === 'start'"
      class="ui-button__icon ui-button__icon--start"
    >
      <slot name="icon" />
    </span>

    <span v-if="hasDefaultContent" class="ui-button__label">
      <slot />
    </span>

    <span v-if="slots.icon && iconPosition === 'end'" class="ui-button__icon ui-button__icon--end">
      <slot name="icon" />
    </span>

    <span v-if="slots.suffix" class="ui-button__suffix">
      <slot name="suffix" />
    </span>
  </button>
</template>

<script setup lang="ts">
import { computed, useAttrs, useSlots } from 'vue'

defineOptions({
  name: 'UiButton',
  inheritAttrs: false,
})

const props = withDefaults(
  defineProps<{
    variant?: 'primary' | 'secondary' | 'ghost' | 'danger'
    size?: 'sm' | 'md' | 'lg'
    type?: 'button' | 'submit' | 'reset'
    block?: boolean
    loading?: boolean
    disabled?: boolean
    iconOnly?: boolean
    iconPosition?: 'start' | 'end'
  }>(),
  {
    variant: 'primary',
    size: 'md',
    type: 'button',
    block: false,
    loading: false,
    disabled: false,
    iconOnly: false,
    iconPosition: 'start',
  }
)

const emit = defineEmits<{
  (event: 'click', value: MouseEvent): void
}>()

const attrs = useAttrs()
const slots = useSlots()

const loading = computed(() => props.loading)
const iconPosition = computed(() => props.iconPosition)
const type = computed(() => props.type)

const hasDefaultContent = computed(() => {
  const slot = slots.default
  if (!slot) {
    return false
  }

  return slot().length > 0
})

const isDisabled = computed(() => props.disabled || props.loading)

const isIconOnly = computed(() => {
  if (props.iconOnly) {
    return true
  }

  const hasLabel = hasDefaultContent.value
  const hasDecorators = Boolean(slots.icon || slots.prefix || slots.suffix)

  return !hasLabel && hasDecorators
})

const classes = computed(() => {
  return [
    'ui-button',
    `ui-button--${props.variant}`,
    `ui-button--size-${props.size}`,
    {
      'is-block': props.block,
      'is-loading': props.loading,
      'is-disabled': isDisabled.value,
      'is-icon-only': isIconOnly.value,
    },
  ]
})

function onClick(event: MouseEvent) {
  if (isDisabled.value) {
    event.preventDefault()
    event.stopPropagation()
    return
  }

  emit('click', event)
}
</script>
