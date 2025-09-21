<template>
  <label :class="wrapperClasses" :for="computedId" :data-state="stateValue">
    <span v-if="label" :id="labelId" class="ui-textarea__label">
      {{ label }}<span v-if="required" aria-hidden="true" class="ui-textarea__required">*</span>
    </span>

    <div class="ui-textarea__control">
      <textarea
        :id="computedId"
        ref="textareaRef"
        v-bind="passthroughAttrs"
        :value="modelValue ?? ''"
        :placeholder="placeholder"
        :rows="rows"
        :maxlength="maxlength"
        :class="textareaClasses"
        :disabled="isDisabled"
        :required="required"
        :aria-invalid="ariaInvalid"
        :aria-describedby="describedBy"
        @input="onInput"
        @focus="onFocus"
        @blur="onBlur"
      ></textarea>
    </div>

    <div class="ui-textarea__footer">
      <p v-if="hint && !error" :id="hintId" class="ui-textarea__hint">
        {{ hint }}
      </p>

      <p v-if="error" :id="errorId" class="ui-textarea__error">
        {{ error }}
      </p>

      <p v-if="showCounter" class="ui-textarea__counter">{{ charactersUsed }} / {{ maxlength }}</p>
    </div>
  </label>
</template>

<script setup lang="ts">
import { computed, nextTick, onMounted, ref, useAttrs, useId, watch } from 'vue'

type TextareaState = 'default' | 'success' | 'error'

defineOptions({
  name: 'UiTextarea',
  inheritAttrs: false,
})

const props = withDefaults(
  defineProps<{
    modelValue?: string | null
    state?: TextareaState
    label?: string
    id?: string
    placeholder?: string
    hint?: string
    error?: string
    disabled?: boolean
    required?: boolean
    autoresize?: boolean
    minRows?: number
    maxRows?: number
    rows?: number
    maxlength?: number
  }>(),
  {
    modelValue: '',
    state: 'default',
    label: '',
    placeholder: '',
    id: undefined,
    hint: '',
    error: '',
    disabled: false,
    required: false,
    autoresize: false,
    minRows: 3,
    maxRows: 12,
    rows: 3,
    maxlength: undefined,
  }
)

const emit = defineEmits<{
  (event: 'update:modelValue', value: string): void
  (event: 'focus', value: FocusEvent): void
  (event: 'blur', value: FocusEvent): void
}>()

const attrs = useAttrs()
const textareaRef = ref<HTMLTextAreaElement | null>(null)
const autoId = useId()

const computedId = computed(() => props.id ?? autoId)
const labelId = computed(() => (props.label ? `${computedId.value}-label` : undefined))
const hintId = computed(() => (props.hint ? `${computedId.value}-hint` : undefined))
const errorId = computed(() => (props.error ? `${computedId.value}-error` : undefined))

const isDisabled = computed(() => props.disabled)
const stateValue = computed(() => (props.error ? 'error' : props.state))

const describedBy = computed(
  () => [hintId.value, errorId.value].filter(Boolean).join(' ') || undefined
)

const wrapperClasses = computed(() => {
  return [
    'ui-textarea',
    `ui-textarea--state-${stateValue.value}`,
    {
      'is-disabled': isDisabled.value,
    },
  ]
})

const textareaClasses = computed(() => {
  return [
    'ui-textarea__field',
    {
      'ui-textarea__field--disabled': isDisabled.value,
    },
  ]
})

const charactersUsed = computed(() => (props.modelValue ? props.modelValue.length : 0))
const showCounter = computed(() => Boolean(props.maxlength))

const ariaInvalid = computed(() =>
  props.error || stateValue.value === 'error' ? 'true' : undefined
)
const rows = computed(() => (props.autoresize ? undefined : props.rows))

const passthroughAttrs = computed(() => {
  const rest = { ...attrs } as Record<string, unknown>
  delete rest.class
  delete rest.style
  return rest
})

function onInput(event: Event) {
  const target = event.target as HTMLTextAreaElement
  emit('update:modelValue', target.value)
  if (props.autoresize) {
    adjustHeight()
  }
}

function onFocus(event: FocusEvent) {
  emit('focus', event)
}

function onBlur(event: FocusEvent) {
  emit('blur', event)
}

function adjustHeight() {
  if (!props.autoresize) {
    return
  }

  const element = textareaRef.value
  if (!element) {
    return
  }

  element.style.height = 'auto'
  const lineHeight = element.scrollHeight
  element.style.height = `${lineHeight}px`

  if (props.maxRows) {
    const maxHeight = props.maxRows * lineHeightPerRow(element)
    if (element.scrollHeight > maxHeight) {
      element.style.height = `${maxHeight}px`
      element.style.overflowY = 'auto'
      return
    }
  }

  if (props.minRows) {
    const minHeight = props.minRows * lineHeightPerRow(element)
    if (element.scrollHeight < minHeight) {
      element.style.height = `${minHeight}px`
    }
  }

  element.style.overflowY = 'hidden'
}

function lineHeightPerRow(element: HTMLTextAreaElement) {
  const computedStyles = window.getComputedStyle(element)
  return parseFloat(computedStyles.lineHeight) || 20
}

watch(
  () => props.modelValue,
  () => {
    if (props.autoresize) {
      nextTick(() => adjustHeight())
    }
  }
)

onMounted(() => {
  if (props.autoresize) {
    adjustHeight()
  }
})
</script>
