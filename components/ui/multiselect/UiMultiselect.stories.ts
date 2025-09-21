import type { Meta, StoryObj } from '@storybook/vue3'

import UiMultiselect from './UiMultiselect.vue'

const baseOptions = [
  { label: 'Design', value: 'design' },
  { label: 'Development', value: 'development' },
  { label: 'Marketing', value: 'marketing' },
  { label: 'Operations', value: 'operations' },
  { label: 'Finance', value: 'finance' },
]

type UiMultiselectStoryProps = InstanceType<typeof UiMultiselect>['$props'] & {
  modelValue: Array<string | number>
  'update:modelValue'?: (value: Array<string | number>) => void
  open?: () => void
  close?: () => void
  'remove-tag'?: (value: string | number) => void
}

const meta: Meta<UiMultiselectStoryProps> = {
  title: 'UI/Multiselect',
  component: UiMultiselect,
  tags: ['autodocs'],
  argTypes: {
    state: {
      control: { type: 'inline-radio' },
      options: ['default', 'success', 'error'],
    },
    modelValue: {
      control: 'object',
    },
    options: {
      control: 'object',
    },
    placeholder: {
      control: 'text',
    },
    hint: {
      control: 'text',
    },
    error: {
      control: 'text',
    },
    maxTags: {
      control: 'number',
    },
    'update:modelValue': { action: 'update:modelValue' },
    open: { action: 'open' },
    close: { action: 'close' },
    'remove-tag': { action: 'remove-tag' },
  },
  args: {
    label: 'Assign teams',
    modelValue: ['design', 'development'],
    options: baseOptions,
    placeholder: 'Select teams…',
    hint: 'Choose one or more teams to collaborate.',
    error: '',
    disabled: false,
    loading: false,
    state: 'default',
    maxTags: undefined,
  },
  render: args => ({
    components: { UiMultiselect },
    setup: () => ({ args }),
    template: `
      <UiMultiselect
        v-bind="args"
        @update:modelValue="args['update:modelValue']?.($event)"
        @open="args.open?.()"
        @close="args.close?.()"
        @remove-tag="args['remove-tag']?.($event)"
      />
    `,
  }),
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const MaxTwoTags: Story = {
  args: {
    maxTags: 2,
    modelValue: ['design', 'development', 'marketing'],
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
    modelValue: ['operations'],
  },
}

export const Error: Story = {
  args: {
    state: 'error',
    error: 'Select at least two teams.',
    modelValue: [],
  },
}

export const Loading: Story = {
  args: {
    loading: true,
  },
}

export const Empty: Story = {
  args: {
    options: [],
    emptyMessage: 'No teams available.',
    modelValue: [],
  },
}
