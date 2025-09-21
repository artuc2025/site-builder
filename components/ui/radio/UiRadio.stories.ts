import type { Meta, StoryObj } from '@storybook/vue3'

import UiRadio from './UiRadio.vue'

type UiRadioStoryProps = InstanceType<typeof UiRadio>['$props'] & {
  modelValue: string | number | boolean | null
  'update:modelValue'?: (value: string | number | boolean) => void
  onFocus?: (event: FocusEvent) => void
  onBlur?: (event: FocusEvent) => void
}

const meta: Meta<UiRadioStoryProps> = {
  title: 'UI/Radio',
  component: UiRadio,
  tags: ['autodocs'],
  argTypes: {
    state: {
      control: { type: 'inline-radio' },
      options: ['default', 'success', 'error'],
    },
    modelValue: {
      control: 'text',
    },
    value: {
      control: 'text',
    },
    name: {
      control: 'text',
    },
    label: {
      control: 'text',
    },
    hint: {
      control: 'text',
    },
    error: {
      control: 'text',
    },
    disabled: {
      control: 'boolean',
    },
    'update:modelValue': { action: 'update:modelValue' },
    onFocus: { action: 'focus' },
    onBlur: { action: 'blur' },
  },
  args: {
    modelValue: 'option-a',
    value: 'option-a',
    name: 'radio-demo',
    label: 'Option A',
    hint: '',
    error: '',
    disabled: false,
    state: 'default',
  },
  render: args => ({
    components: { UiRadio },
    setup: () => ({ args }),
    template: `
      <UiRadio
        v-bind="args"
        @update:modelValue="args['update:modelValue']?.($event)"
        @focus="args.onFocus?.($event)"
        @blur="args.onBlur?.($event)"
      />
    `,
  }),
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Checked: Story = {
  args: {
    modelValue: 'option-a',
    value: 'option-a',
  },
}

export const Unchecked: Story = {
  args: {
    modelValue: 'option-b',
    value: 'option-a',
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
  },
}

export const Error: Story = {
  args: {
    state: 'error',
    error: 'Select one of the options.',
  },
}
