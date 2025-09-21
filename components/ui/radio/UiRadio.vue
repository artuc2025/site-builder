<template>
  <div :class="wrapperClasses">
    <label class="ui-radio__label-wrapper" :for="inputId">
      <span class="ui-radio__control" aria-hidden="true">
        <span class="ui-radio__dot"></span>
      </span>
      <input
        :id="inputId"
        ref="inputRef"
        v-bind="passthroughAttrs"
        class="ui-radio__input"
        type="radio"
        :name="name"
        :value="value"
        :checked="checked"
        :disabled="disabled"
        :aria-checked="checked ? 'true' : 'false'"
        :aria-describedby="describedBy"
        :aria-invalid="ariaInvalid"
        @change="onChange"
        @focus="onFocus"
        @blur="onBlur"
      />
      <span v-if="label" :id="labelId" class="ui-radio__label">{{ label }}</span>
    </label>
    <p v-if="hint && !error" :id="hintId" class="ui-radio__hint">{{ hint }}</p>
    <p v-if="error" :id="errorId" class="ui-radio__error">{{ error }}</p>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, useAttrs, useId } from 'vue'

type RadioState = 'default' | 'success' | 'error'

defineOptions({
  name: 'UiRadio',
  inheritAttrs: false,
})

const props = withDefaults(
  defineProps<{
    modelValue?: string | number | boolean | null
    value: string | number | boolean
    name?: string
    label?: string
    hint?: string
    error?: string
    disabled?: boolean
    state?: RadioState
    id?: string
  }>(),
  {
    modelValue: null,
    name: undefined,
    label: '',
    hint: '',
    error: '',
    disabled: false,
    state: 'default',
    id: undefined,
  }
)

const emit = defineEmits<{
  (event: 'update:modelValue', value: string | number | boolean): void
  (event: 'focus', value: FocusEvent): void
  (event: 'blur', value: FocusEvent): void
}>()

const attrs = useAttrs()
const autoId = useId()
const inputRef = ref<HTMLInputElement | null>(null)

const inputId = computed(() => props.id ?? `${autoId}-radio`)
const labelId = computed(() => (props.label ? `${inputId.value}-label` : undefined))
const hintId = computed(() => (props.hint ? `${inputId.value}-hint` : undefined))
const errorId = computed(() => (props.error ? `${inputId.value}-error` : undefined))

const stateValue = computed(() => (props.error ? 'error' : props.state))
const disabled = computed(() => props.disabled)
const checked = computed(() => props.modelValue === props.value)

const describedBy = computed(
  () => [hintId.value, errorId.value].filter(Boolean).join(' ') || undefined
)
const ariaInvalid = computed(() =>
  props.error || stateValue.value === 'error' ? 'true' : undefined
)

const name = computed(() => props.name)

const wrapperClasses = computed(() => [
  'ui-radio',
  `ui-radio--state-${stateValue.value}`,
  {
    'is-disabled': disabled.value,
    'is-checked': checked.value,
  },
])

const passthroughAttrs = computed(() => {
  const rest = { ...attrs } as Record<string, unknown>
  delete rest.class
  delete rest.style
  delete rest.id
  delete rest.type
  delete rest.name
  delete rest.value
  delete rest.checked
  delete rest.disabled
  return rest
})

function onChange(event: Event) {
  if (disabled.value) {
    return
  }

  const target = event.target as HTMLInputElement
  if (!checked.value && target.checked) {
    emit('update:modelValue', props.value)
  }
}

function onFocus(event: FocusEvent) {
  emit('focus', event)
}

function onBlur(event: FocusEvent) {
  emit('blur', event)
}
</script>
