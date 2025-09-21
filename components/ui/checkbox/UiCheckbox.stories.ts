import type { Meta, StoryObj } from '@storybook/vue3'

import UiCheckbox from './UiCheckbox.vue'

type UiCheckboxStoryProps = InstanceType<typeof UiCheckbox>['$props'] & {
  modelValue: boolean
  'update:modelValue'?: (value: boolean) => void
  onFocus?: (event: FocusEvent) => void
  onBlur?: (event: FocusEvent) => void
}

const meta: Meta<UiCheckboxStoryProps> = {
  title: 'UI/Checkbox',
  component: UiCheckbox,
  tags: ['autodocs'],
  argTypes: {
    state: {
      control: { type: 'inline-radio' },
      options: ['default', 'success', 'error'],
    },
    modelValue: {
      control: 'boolean',
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
    indeterminate: {
      control: 'boolean',
    },
    'update:modelValue': { action: 'update:modelValue' },
    onFocus: { action: 'focus' },
    onBlur: { action: 'blur' },
  },
  args: {
    modelValue: false,
    label: 'Notify me about updates',
    hint: 'We only send notifications about major releases.',
    error: '',
    disabled: false,
    indeterminate: false,
    state: 'default',
  },
  render: args => ({
    components: { UiCheckbox },
    setup: () => ({ args }),
    template: `
      <UiCheckbox
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
    modelValue: true,
  },
}

export const Indeterminate: Story = {
  args: {
    indeterminate: true,
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
    modelValue: true,
  },
}

export const Error: Story = {
  args: {
    state: 'error',
    error: 'You must accept the terms to continue.',
  },
}
