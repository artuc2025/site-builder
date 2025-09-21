<template>
  <label :class="wrapperClasses" :for="computedId" :data-state="state">
    <span v-if="label" :id="labelId" class="ui-input__label">
      {{ label }}<span v-if="required" aria-hidden="true" class="ui-input__required">*</span>
    </span>

    <div class="ui-input__control">
      <span v-if="hasPrefix" class="ui-input__affix ui-input__affix--prefix">
        <slot name="prefix">{{ prefix }}</slot>
      </span>

      <input
        :id="computedId"
        ref="inputRef"
        v-bind="passthroughAttrs"
        :type="type"
        :value="modelValue ?? ''"
        :placeholder="placeholder"
        :class="inputClasses"
        :disabled="isDisabled"
        :required="required"
        :aria-invalid="ariaInvalid"
        :aria-describedby="describedBy"
        @input="onInput"
        @focus="onFocus"
        @blur="onBlur"
      />

      <span v-if="hasSuffix" class="ui-input__affix ui-input__affix--suffix">
        <slot name="suffix">{{ suffix }}</slot>
      </span>
    </div>

    <p v-if="hint" :id="hintId" class="ui-input__hint">
      {{ hint }}
    </p>

    <p v-if="error" :id="errorId" class="ui-input__error">
      {{ error }}
    </p>
  </label>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, useAttrs, useId, useSlots } from 'vue'

type InputState = 'default' | 'success' | 'error'

defineOptions({
  name: 'UiInput',
  inheritAttrs: false,
})

const props = withDefaults(
  defineProps<{
    modelValue?: string | number | null
    type?: string
    state?: InputState
    label?: string
    id?: string
    prefix?: string
    suffix?: string
    placeholder?: string
    hint?: string
    error?: string
    disabled?: boolean
    required?: boolean
    autofocus?: boolean
  }>(),
  {
    modelValue: '',
    type: 'text',
    state: 'default',
    label: '',
    id: undefined,
    prefix: '',
    suffix: '',
    placeholder: '',
    hint: '',
    error: '',
    disabled: false,
    required: false,
    autofocus: false,
  }
)

const emit = defineEmits<{
  (event: 'update:modelValue', value: string): void
  (event: 'focus', value: FocusEvent): void
  (event: 'blur', value: FocusEvent): void
}>()

const attrs = useAttrs()
const slots = useSlots()
const inputRef = ref<HTMLInputElement | null>(null)
const autoId = useId()

const computedId = computed(() => props.id ?? autoId)
const labelId = computed(() => (props.label ? `${computedId.value}-label` : undefined))
const hintId = computed(() => (props.hint ? `${computedId.value}-hint` : undefined))
const errorId = computed(() => (props.error ? `${computedId.value}-error` : undefined))

const describedBy = computed(
  () => [hintId.value, errorId.value].filter(Boolean).join(' ') || undefined
)

const isDisabled = computed(() => props.disabled)
const state = computed(() => (props.error ? 'error' : props.state))

const hasPrefix = computed(() => Boolean(props.prefix || slots.prefix))
const hasSuffix = computed(() => Boolean(props.suffix || slots.suffix))

const wrapperClasses = computed(() => {
  return [
    'ui-input',
    `ui-input--state-${state.value}`,
    {
      'is-disabled': isDisabled.value,
      'has-prefix': hasPrefix.value,
      'has-suffix': hasSuffix.value,
    },
  ]
})

const inputClasses = computed(() => {
  return [
    'ui-input__field',
    {
      'ui-input__field--disabled': isDisabled.value,
    },
  ]
})

const ariaInvalid = computed(() => (props.error || state.value === 'error' ? 'true' : undefined))

const passthroughAttrs = computed(() => {
  const rest = { ...attrs } as Record<string, unknown>
  delete rest.class
  delete rest.style
  return rest
})

function onInput(event: Event) {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.value)
}

function onFocus(event: FocusEvent) {
  emit('focus', event)
}

function onBlur(event: FocusEvent) {
  emit('blur', event)
}

onMounted(() => {
  if (props.autofocus) {
    inputRef.value?.focus()
  }
})
</script>
