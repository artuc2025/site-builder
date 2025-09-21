import type { Meta, StoryObj } from '@storybook/vue3'

import UiSwitch from './UiSwitch.vue'

type UiSwitchStoryProps = InstanceType<typeof UiSwitch>['$props'] & {
  modelValue: boolean
  'update:modelValue'?: (value: boolean) => void
  onFocus?: (event: FocusEvent) => void
  onBlur?: (event: FocusEvent) => void
}

const meta: Meta<UiSwitchStoryProps> = {
  title: 'UI/Switch',
  component: UiSwitch,
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
    loading: {
      control: 'boolean',
    },
    'update:modelValue': { action: 'update:modelValue' },
    onFocus: { action: 'focus' },
    onBlur: { action: 'blur' },
  },
  args: {
    modelValue: false,
    label: 'Enable notifications',
    hint: '',
    error: '',
    disabled: false,
    loading: false,
    state: 'default',
  },
  render: args => ({
    components: { UiSwitch },
    setup: () => ({ args }),
    template: `
      <UiSwitch
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

export const On: Story = {
  args: {
    modelValue: true,
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
    modelValue: true,
  },
}

export const Loading: Story = {
  args: {
    loading: true,
  },
}

export const Error: Story = {
  args: {
    state: 'error',
    error: 'Turn this setting off before proceeding.',
  },
}
