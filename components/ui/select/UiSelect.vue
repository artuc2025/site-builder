<template>
  <div :class="wrapperClasses" :data-state="stateValue">
    <span v-if="label" :id="labelId" class="ui-select__label">
      {{ label }}<span v-if="required" aria-hidden="true" class="ui-select__required">*</span>
    </span>

    <div class="ui-select__control">
      <button
        ref="triggerRef"
        type="button"
        class="ui-select__trigger"
        role="combobox"
        :aria-expanded="isOpen"
        :aria-controls="listboxId"
        :aria-disabled="isDisabled || undefined"
        :aria-activedescendant="activeOptionId"
        :aria-labelledby="labelId"
        :disabled="isDisabled"
        @click="toggleDropdown"
        @keydown="onTriggerKeydown"
      >
        <span class="ui-select__value" :data-placeholder="!selectedOption">
          {{ selectedOption?.label ?? placeholder ?? 'Select…' }}
        </span>
        <span class="ui-select__icon" aria-hidden="true">▼</span>
      </button>

      <transition name="ui-select-fade">
        <ul
          v-if="isOpen"
          :id="listboxId"
          ref="listboxRef"
          class="ui-select__list"
          role="listbox"
          :aria-labelledby="labelId"
        >
          <li
            v-for="(option, index) in options"
            :id="optionId(index)"
            :key="option.value"
            :class="optionClasses(option, index)"
            role="option"
            :aria-selected="option.value === modelValue"
            :aria-disabled="option.disabled || undefined"
            @click="onOptionClick(option, index)"
            @mouseenter="onOptionHover(index)"
          >
            <span class="ui-select__option-label">{{ option.label }}</span>
            <span
              v-if="option.value === modelValue"
              class="ui-select__option-check"
              aria-hidden="true"
              >✓</span
            >
          </li>

          <li v-if="!options.length" class="ui-select__empty" role="presentation">
            {{ emptyMessage }}
          </li>
        </ul>
      </transition>
    </div>

    <p v-if="hint && !error" :id="hintId" class="ui-select__hint">
      {{ hint }}
    </p>

    <p v-if="error" :id="errorId" class="ui-select__error">
      {{ error }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, useId, watch } from 'vue'

type SelectState = 'default' | 'success' | 'error'

type SelectOption = {
  label: string
  value: string | number
  disabled?: boolean
}

defineOptions({
  name: 'UiSelect',
  inheritAttrs: false,
})

const props = withDefaults(
  defineProps<{
    modelValue?: string | number | null
    options?: SelectOption[]
    state?: SelectState
    label?: string
    placeholder?: string
    hint?: string
    error?: string
    disabled?: boolean
    required?: boolean
    loading?: boolean
    emptyMessage?: string
  }>(),
  {
    modelValue: null,
    options: () => [],
    state: 'default',
    label: '',
    placeholder: 'Select…',
    hint: '',
    error: '',
    disabled: false,
    required: false,
    loading: false,
    emptyMessage: 'No options available',
  }
)

const emit = defineEmits<{
  (event: 'update:modelValue', value: string | number | null): void
  (event: 'open'): void
  (event: 'close'): void
}>()

const triggerRef = ref<HTMLButtonElement | null>(null)
const listboxRef = ref<HTMLUListElement | null>(null)
const highlightedIndex = ref<number>(-1)
const isOpen = ref(false)

const autoId = useId()
const baseId = computed(() => (props.label || props.placeholder ? autoId : `ui-select-${autoId}`))
const listboxId = computed(() => `${baseId.value}-listbox`)
const labelId = computed(() => (props.label ? `${baseId.value}-label` : undefined))
const hintId = computed(() => (props.hint ? `${baseId.value}-hint` : undefined))
const errorId = computed(() => (props.error ? `${baseId.value}-error` : undefined))

const isDisabled = computed(() => props.disabled || props.loading)
const stateValue = computed(() => (props.error ? 'error' : props.state))

const selectedOption = computed(() =>
  props.options.find(option => option.value === props.modelValue)
)
const activeOptionId = computed(() =>
  highlightedIndex.value >= 0 ? optionId(highlightedIndex.value) : undefined
)

const wrapperClasses = computed(() => [
  'ui-select',
  `ui-select--state-${stateValue.value}`,
  {
    'is-disabled': isDisabled.value,
    'is-open': isOpen.value,
    'has-value': Boolean(selectedOption.value),
  },
])

const emptyMessage = computed(() => props.emptyMessage)

const options = computed(() => props.options)

function optionClasses(option: SelectOption, index: number) {
  return [
    'ui-select__option',
    {
      'is-selected': option.value === props.modelValue,
      'is-highlighted': index === highlightedIndex.value,
      'is-disabled': option.disabled,
    },
  ]
}

function optionId(index: number) {
  return `${listboxId.value}-option-${index}`
}

function openDropdown() {
  if (isDisabled.value) {
    return
  }

  if (!isOpen.value) {
    isOpen.value = true
    emit('open')
    nextTickHighlight()
    nextTickScrollIntoView()
    attachClickOutside()
  }
}

function closeDropdown(focusTrigger = false) {
  if (isOpen.value) {
    isOpen.value = false
    highlightedIndex.value = -1
    emit('close')
    detachClickOutside()

    if (focusTrigger) {
      triggerRef.value?.focus()
    }
  }
}

function toggleDropdown() {
  if (isOpen.value) {
    closeDropdown()
  } else {
    openDropdown()
  }
}

function onOptionClick(option: SelectOption, index: number) {
  if (option.disabled) {
    return
  }

  highlightedIndex.value = index
  selectValue(option.value)
}

function onOptionHover(index: number) {
  highlightedIndex.value = index
}

function selectValue(value: string | number | null) {
  if (value !== props.modelValue) {
    emit('update:modelValue', value)
  }

  closeDropdown(true)
}

function moveHighlight(delta: number) {
  if (!options.value.length) {
    highlightedIndex.value = -1
    return
  }

  let newIndex = highlightedIndex.value
  for (let i = 0; i < options.value.length; i++) {
    newIndex = (newIndex + delta + options.value.length) % options.value.length
    const option = options.value[newIndex]
    if (!option.disabled) {
      highlightedIndex.value = newIndex
      nextTickScrollIntoView()
      return
    }
  }
}

function onTriggerKeydown(event: KeyboardEvent) {
  if (isDisabled.value) {
    return
  }

  switch (event.key) {
    case 'ArrowDown':
    case 'Down':
      event.preventDefault()
      if (!isOpen.value) {
        openDropdown()
      }
      moveHighlight(1)
      break
    case 'ArrowUp':
    case 'Up':
      event.preventDefault()
      if (!isOpen.value) {
        openDropdown()
      }
      moveHighlight(-1)
      break
    case 'Enter':
    case ' ': {
      if (!isOpen.value) {
        event.preventDefault()
        openDropdown()
      } else if (highlightedIndex.value >= 0) {
        event.preventDefault()
        const option = options.value[highlightedIndex.value]
        if (option && !option.disabled) {
          selectValue(option.value)
        }
      }
      break
    }
    case 'Escape':
    case 'Esc':
      if (isOpen.value) {
        event.preventDefault()
        closeDropdown(true)
      }
      break
    case 'Tab':
      closeDropdown()
      break
    default:
      break
  }
}

function handleDocumentClick(event: MouseEvent) {
  const target = event.target as Node
  if (!triggerRef.value?.contains(target) && !listboxRef.value?.contains(target)) {
    closeDropdown()
  }
}

function attachClickOutside() {
  document.addEventListener('mousedown', handleDocumentClick)
}

function detachClickOutside() {
  document.removeEventListener('mousedown', handleDocumentClick)
}

function nextTickHighlight() {
  if (selectedOption.value) {
    const selectedIndex = options.value.findIndex(
      option => option.value === selectedOption.value?.value
    )
    highlightedIndex.value = selectedIndex
  } else {
    highlightedIndex.value = options.value.findIndex(option => !option.disabled)
  }
}

function nextTickScrollIntoView() {
  requestAnimationFrame(() => {
    if (highlightedIndex.value < 0) {
      return
    }

    const optionEl = listboxRef.value?.querySelector<HTMLElement>(
      `#${optionId(highlightedIndex.value)}`
    )
    optionEl?.scrollIntoView({ block: 'nearest' })
  })
}

watch(
  () => props.modelValue,
  () => {
    if (!isOpen.value) {
      highlightedIndex.value = options.value.findIndex(option => option.value === props.modelValue)
    }
  }
)

onMounted(() => {
  highlightedIndex.value = options.value.findIndex(option => option.value === props.modelValue)
})

onBeforeUnmount(() => {
  detachClickOutside()
})
</script>
