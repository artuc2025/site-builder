<template>
  <div :class="wrapperClasses">
    <label class="ui-checkbox__label-wrapper" :for="inputId">
      <span class="ui-checkbox__control" aria-hidden="true">
        <span class="ui-checkbox__mark"></span>
      </span>
      <input
        :id="inputId"
        ref="inputRef"
        v-bind="passthroughAttrs"
        type="checkbox"
        class="ui-checkbox__input"
        :checked="checked"
        :disabled="disabled"
        :aria-checked="ariaChecked"
        :aria-describedby="describedBy"
        :aria-invalid="ariaInvalid"
        @change="onChange"
        @focus="onFocus"
        @blur="onBlur"
      />
      <span v-if="label" :id="labelId" class="ui-checkbox__label">{{ label }}</span>
    </label>
    <p v-if="hint && !error" :id="hintId" class="ui-checkbox__hint">{{ hint }}</p>
    <p v-if="error" :id="errorId" class="ui-checkbox__error">{{ error }}</p>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, useAttrs, useId, watch } from 'vue'

type CheckboxState = 'default' | 'success' | 'error'

defineOptions({
  name: 'UiCheckbox',
  inheritAttrs: false,
})

const props = withDefaults(
  defineProps<{
    modelValue?: boolean
    label?: string
    hint?: string
    error?: string
    disabled?: boolean
    indeterminate?: boolean
    state?: CheckboxState
    id?: string
  }>(),
  {
    modelValue: false,
    label: '',
    hint: '',
    error: '',
    disabled: false,
    indeterminate: false,
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
const autoId = useId()
const inputRef = ref<HTMLInputElement | null>(null)

const inputId = computed(() => props.id ?? `${autoId}-checkbox`)
const labelId = computed(() => (props.label ? `${inputId.value}-label` : undefined))
const hintId = computed(() => (props.hint ? `${inputId.value}-hint` : undefined))
const errorId = computed(() => (props.error ? `${inputId.value}-error` : undefined))

const stateValue = computed(() => (props.error ? 'error' : props.state))
const checked = computed(() => Boolean(props.modelValue))
const disabled = computed(() => props.disabled)

const describedBy = computed(
  () => [hintId.value, errorId.value].filter(Boolean).join(' ') || undefined
)
const ariaInvalid = computed(() =>
  props.error || stateValue.value === 'error' ? 'true' : undefined
)
const ariaChecked = computed(() =>
  props.indeterminate ? 'mixed' : checked.value ? 'true' : 'false'
)

const wrapperClasses = computed(() => [
  'ui-checkbox',
  `ui-checkbox--state-${stateValue.value}`,
  {
    'is-disabled': disabled.value,
    'is-indeterminate': props.indeterminate,
    'is-checked': checked.value,
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
  () => props.indeterminate,
  value => {
    if (inputRef.value) {
      inputRef.value.indeterminate = Boolean(value)
    }
  },
  { immediate: true }
)

onMounted(() => {
  if (inputRef.value) {
    inputRef.value.indeterminate = Boolean(props.indeterminate)
  }
})

function onChange(event: Event) {
  if (disabled.value) {
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
