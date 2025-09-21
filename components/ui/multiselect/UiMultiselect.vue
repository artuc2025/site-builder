<template>
  <label :class="wrapperClasses" :for="triggerId" :data-state="stateValue">
    <span v-if="label" :id="labelId" class="ui-multiselect__label">
      {{ label }}<span v-if="required" aria-hidden="true" class="ui-multiselect__required">*</span>
    </span>

    <div class="ui-multiselect__control">
      <button
        :id="triggerId"
        ref="triggerRef"
        type="button"
        class="ui-multiselect__trigger"
        role="combobox"
        v-bind="passthroughAttrs"
        :aria-expanded="isOpen"
        :aria-controls="listboxId"
        :aria-invalid="ariaInvalid"
        :aria-disabled="isDisabled || undefined"
        :aria-activedescendant="activeOptionId"
        :aria-labelledby="labelId"
        :disabled="isDisabled"
        @click="toggleDropdown"
        @keydown="onTriggerKeydown"
      >
        <span class="ui-multiselect__chips" :data-placeholder="!selectedOptions.length">
          <template v-if="selectedOptions.length">
            <template v-for="option in visibleTags" :key="option.value">
              <span class="ui-multiselect__chip">
                <slot name="tag" :option="option" :remove="() => removeTag(option.value)">
                  {{ option.label }}
                </slot>
                <button
                  type="button"
                  class="ui-multiselect__chip-remove"
                  aria-label="Remove {{ option.label }}"
                  @click.stop="removeTag(option.value)"
                >
                  ×
                </button>
              </span>
            </template>
            <span
              v-if="hiddenTagCount > 0"
              class="ui-multiselect__chip ui-multiselect__chip--counter"
            >
              +{{ hiddenTagCount }}
            </span>
          </template>
          <span v-else class="ui-multiselect__placeholder">
            {{ placeholder ?? 'Select options…' }}
          </span>
        </span>
        <span class="ui-multiselect__icon" aria-hidden="true">▼</span>
      </button>

      <transition name="ui-multiselect-fade">
        <ul
          v-if="isOpen"
          :id="listboxId"
          ref="listboxRef"
          class="ui-multiselect__list"
          role="listbox"
          :aria-labelledby="labelId"
          aria-multiselectable="true"
        >
          <li
            v-for="(option, index) in options"
            :id="optionId(index)"
            :key="option.value"
            :class="optionClasses(option, index)"
            role="option"
            :aria-selected="isSelected(option.value)"
            :aria-disabled="option.disabled || undefined"
            @click="onOptionClick(option, index)"
            @mouseenter="onOptionHover(index)"
          >
            <span class="ui-multiselect__option-label">{{ option.label }}</span>
            <span
              v-if="isSelected(option.value)"
              class="ui-multiselect__option-check"
              aria-hidden="true"
              >✓</span
            >
          </li>

          <li v-if="!options.length" class="ui-multiselect__empty" role="presentation">
            {{ emptyMessage }}
          </li>
        </ul>
      </transition>
    </div>

    <div class="ui-multiselect__footer">
      <p v-if="hint && !error" :id="hintId" class="ui-multiselect__hint">
        {{ hint }}
      </p>

      <p v-if="error" :id="errorId" class="ui-multiselect__error">
        {{ error }}
      </p>
    </div>
  </label>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, useAttrs, useId, watch } from 'vue'

type MultiselectState = 'default' | 'success' | 'error'

type MultiselectOption = {
  label: string
  value: string | number
  disabled?: boolean
}

defineOptions({
  name: 'UiMultiselect',
  inheritAttrs: false,
})

const props = withDefaults(
  defineProps<{
    modelValue?: Array<string | number>
    options?: MultiselectOption[]
    state?: MultiselectState
    label?: string
    placeholder?: string
    hint?: string
    error?: string
    disabled?: boolean
    required?: boolean
    loading?: boolean
    maxTags?: number
    emptyMessage?: string
  }>(),
  {
    modelValue: () => [],
    options: () => [],
    state: 'default',
    label: '',
    placeholder: 'Select options…',
    hint: '',
    error: '',
    disabled: false,
    required: false,
    loading: false,
    maxTags: undefined,
    emptyMessage: 'No options available',
  }
)

const emit = defineEmits<{
  (event: 'update:modelValue', value: Array<string | number>): void
  (event: 'open'): void
  (event: 'close'): void
  (event: 'remove-tag', value: string | number): void
}>()

const attrs = useAttrs()
const triggerRef = ref<HTMLButtonElement | null>(null)
const listboxRef = ref<HTMLUListElement | null>(null)
const highlightedIndex = ref<number>(-1)
const isOpen = ref(false)

const autoId = useId()
const baseId = computed(() =>
  props.label || props.placeholder ? autoId : `ui-multiselect-${autoId}`
)
const listboxId = computed(() => `${baseId.value}-listbox`)
const triggerId = computed(() => `${baseId.value}-trigger`)
const labelId = computed(() => (props.label ? `${baseId.value}-label` : undefined))
const hintId = computed(() => (props.hint ? `${baseId.value}-hint` : undefined))
const errorId = computed(() => (props.error ? `${baseId.value}-error` : undefined))

const isDisabled = computed(() => props.disabled || props.loading)
const stateValue = computed(() => (props.error ? 'error' : props.state))

const options = computed(() => props.options)
const selectedValues = computed(() => props.modelValue ?? [])
const selectedOptions = computed(() => {
  return selectedValues.value
    .map(value => options.value.find(option => option.value === value))
    .filter((option): option is MultiselectOption => Boolean(option))
})

const visibleTags = computed(() => {
  if (!props.maxTags || selectedOptions.value.length <= props.maxTags) {
    return selectedOptions.value
  }

  return selectedOptions.value.slice(0, props.maxTags)
})

const hiddenTagCount = computed(() => {
  if (!props.maxTags) {
    return 0
  }

  return Math.max(0, selectedOptions.value.length - props.maxTags)
})

const activeOptionId = computed(() =>
  highlightedIndex.value >= 0 ? optionId(highlightedIndex.value) : undefined
)
const emptyMessage = computed(() => props.emptyMessage)

const wrapperClasses = computed(() => [
  'ui-multiselect',
  `ui-multiselect--state-${stateValue.value}`,
  {
    'is-disabled': isDisabled.value,
    'is-open': isOpen.value,
    'has-value': selectedOptions.value.length > 0,
  },
])

const ariaInvalid = computed(() =>
  props.error || stateValue.value === 'error' ? 'true' : undefined
)

const passthroughAttrs = computed(() => {
  const rest = { ...attrs } as Record<string, unknown>
  delete rest.class
  delete rest.style
  return rest
})

function isSelected(value: string | number) {
  return selectedValues.value.includes(value)
}

function optionId(index: number) {
  return `${listboxId.value}-option-${index}`
}

function optionClasses(option: MultiselectOption, index: number) {
  return [
    'ui-multiselect__option',
    {
      'is-selected': isSelected(option.value),
      'is-highlighted': index === highlightedIndex.value,
      'is-disabled': option.disabled,
    },
  ]
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

function onOptionClick(option: MultiselectOption, index: number) {
  if (option.disabled) {
    return
  }

  highlightedIndex.value = index
  toggleValue(option.value)
}

function onOptionHover(index: number) {
  highlightedIndex.value = index
}

function toggleValue(value: string | number) {
  const current = selectedValues.value
  const exists = current.includes(value)
  let next: Array<string | number>

  if (exists) {
    next = current.filter(item => item !== value)
    emit('remove-tag', value)
  } else {
    next = [...current, value]
  }

  emit('update:modelValue', next)
}

function removeTag(value: string | number) {
  if (!isSelected(value)) {
    return
  }

  const next = selectedValues.value.filter(item => item !== value)
  emit('remove-tag', value)
  emit('update:modelValue', next)
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
        moveHighlight(0)
      } else if (highlightedIndex.value >= 0) {
        event.preventDefault()
        const option = options.value[highlightedIndex.value]
        if (option && !option.disabled) {
          toggleValue(option.value)
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
  if (selectedValues.value.length) {
    const firstSelected = selectedValues.value[0]
    const selectedIndex = options.value.findIndex(option => option.value === firstSelected)
    highlightedIndex.value =
      selectedIndex >= 0 ? selectedIndex : options.value.findIndex(option => !option.disabled)
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
    if (isOpen.value) {
      nextTickHighlight()
      nextTickScrollIntoView()
    }
  }
)

onMounted(() => {
  nextTickHighlight()
})

onBeforeUnmount(() => {
  detachClickOutside()
})
</script>
