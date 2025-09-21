import type { Meta, StoryObj } from '@storybook/vue3'

import UiInput from './UiInput.vue'

type UiInputStoryProps = InstanceType<typeof UiInput>['$props'] & {
  modelValue: string
}

const meta: Meta<UiInputStoryProps> = {
  title: 'UI/Input',
  component: UiInput,
  tags: ['autodocs'],
  argTypes: {
    state: {
      control: { type: 'inline-radio' },
      options: ['default', 'success', 'error'],
    },
    modelValue: {
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
    prefix: {
      control: 'text',
    },
    suffix: {
      control: 'text',
    },
    onUpdateModelValue: { action: 'update:modelValue' },
    onFocus: { action: 'focus' },
    onBlur: { action: 'blur' },
  },
  args: {
    label: 'Project name',
    modelValue: '',
    placeholder: 'Enter value…',
    state: 'default',
    hint: 'Used internally to reference your project.',
    error: '',
    disabled: false,
    required: false,
  },
  render: args => ({
    components: { UiInput },
    setup: () => ({ args }),
    template: `
      <UiInput
        v-bind="args"
        @update:modelValue="args.onUpdateModelValue"
        @focus="args.onFocus"
        @blur="args.onBlur"
      />
    `,
  }),
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithPrefixSuffix: Story = {
  args: {
    prefix: 'https://',
    suffix: '.example.com',
    placeholder: 'subdomain',
  },
}

export const Success: Story = {
  args: {
    state: 'success',
    hint: 'Looks good!',
  },
}

export const Error: Story = {
  args: {
    state: 'error',
    error: 'Please enter between 4 and 20 characters.',
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
    modelValue: 'content-builder',
  },
}
