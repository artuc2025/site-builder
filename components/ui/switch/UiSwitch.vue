<template>
  <label :class="wrapperClasses" :for="inputId">
    <input
      :id="inputId"
      ref="inputRef"
      v-bind="passthroughAttrs"
      class="ui-switch__input"
      type="checkbox"
      :checked="checked"
      :disabled="disabled"
      :aria-checked="ariaChecked"
      :aria-labelledby="labelId"
      :aria-describedby="describedBy"
      :aria-invalid="ariaInvalid"
      role="switch"
      @change="onChange"
      @focus="onFocus"
      @blur="onBlur"
    />
    <span class="ui-switch__track" aria-hidden="true">
      <span class="ui-switch__thumb"></span>
    </span>
    <span v-if="label" :id="labelId" class="ui-switch__label">{{ label }}</span>
  </label>
  <p v-if="hint && !error" :id="hintId" class="ui-switch__hint">{{ hint }}</p>
  <p v-if="error" :id="errorId" class="ui-switch__error">{{ error }}</p>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, useAttrs, useId, watch } from 'vue'

type SwitchState = 'default' | 'success' | 'error'

defineOptions({
  name: 'UiSwitch',
  inheritAttrs: false,
})

const props = withDefaults(
  defineProps<{
    modelValue?: boolean
    label?: string
    hint?: string
    error?: string
    disabled?: boolean
    loading?: boolean
    state?: SwitchState
    id?: string
  }>(),
  {
    modelValue: false,
    label: '',
    hint: '',
    error: '',
    disabled: false,
    loading: false,
    state: 'default',
    id: undefined,
  }
)

const emit = defineEmits<{
  (event: 'update:modelValue', value: boolean): void
  (event: 'focus', value: FocusEvent): void
  (event: 'blur', value: FocusEvent): void
}>()

const attrs = useAttrs()
const inputRef = ref<HTMLInputElement | null>(null)
const autoId = useId()

const inputId = computed(() => props.id ?? `${autoId}-switch`)
const labelId = computed(() => (props.label ? `${inputId.value}-label` : undefined))
const hintId = computed(() => (props.hint ? `${inputId.value}-hint` : undefined))
const errorId = computed(() => (props.error ? `${inputId.value}-error` : undefined))

const stateValue = computed(() => (props.error ? 'error' : props.state))
const checked = computed(() => Boolean(props.modelValue))
const disabled = computed(() => props.disabled || props.loading)

const describedBy = computed(
  () => [hintId.value, errorId.value].filter(Boolean).join(' ') || undefined
)
const ariaInvalid = computed(() =>
  props.error || stateValue.value === 'error' ? 'true' : undefined
)
const ariaChecked = computed(() => (checked.value ? 'true' : 'false'))

const wrapperClasses = computed(() => [
  'ui-switch',
  `ui-switch--state-${stateValue.value}`,
  {
    'is-disabled': disabled.value,
    'is-checked': checked.value,
    'is-loading': props.loading,
  },
])

const passthroughAttrs = computed(() => {
  const rest = { ...attrs } as Record<string, unknown>
  delete rest.class
  delete rest.style
  delete rest.id
  delete rest.type
  delete rest.checked
  delete rest.disabled
  return rest
})

watch(
  () => props.loading,
  value => {
    if (inputRef.value) {
      inputRef.value.indeterminate = Boolean(value)
    }
  },
  { immediate: true }
)

onMounted(() => {
  if (inputRef.value) {
    inputRef.value.indeterminate = Boolean(props.loading)
  }
})

function onChange(event: Event) {
  if (disabled.value || props.loading) {
    event.preventDefault()
    return
  }

  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.checked)
}

function onFocus(event: FocusEvent) {
  emit('focus', event)
}

function onBlur(event: FocusEvent) {
  emit('blur', event)
}
</script>
