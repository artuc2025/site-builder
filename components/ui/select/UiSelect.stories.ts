import type { Meta, StoryObj } from '@storybook/vue3'

import UiSelect from './UiSelect.vue'

const baseOptions = [
  { label: 'Design', value: 'design' },
  { label: 'Development', value: 'development' },
  { label: 'Marketing', value: 'marketing' },
  { label: 'Operations', value: 'operations' },
]

type UiSelectStoryProps = InstanceType<typeof UiSelect>['$props'] & {
  modelValue: string | number | null
  'update:modelValue'?: (value: string | number | null) => void
  open?: () => void
  close?: () => void
}

const meta: Meta<UiSelectStoryProps> = {
  title: 'UI/Select',
  component: UiSelect,
  tags: ['autodocs'],
  argTypes: {
    state: {
      control: { type: 'inline-radio' },
      options: ['default', 'success', 'error'],
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
    'update:modelValue': { action: 'update:modelValue' },
    open: { action: 'open' },
    close: { action: 'close' },
  },
  args: {
    label: 'Select a team',
    modelValue: null,
    placeholder: 'Choose team…',
    options: baseOptions,
    hint: 'Used to route tasks to the right people.',
    error: '',
    disabled: false,
    loading: false,
    state: 'default',
  },
  render: args => ({
    components: { UiSelect },
    setup: () => ({ args }),
    template: `
      <UiSelect
        v-bind="args"
        @update:modelValue="args['update:modelValue']?.($event)"
        @open="args.open?.()"
        @close="args.close?.()"
      />
    `,
  }),
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Preselected: Story = {
  args: {
    modelValue: 'development',
  },
}

export const WithDisabledOptions: Story = {
  args: {
    options: [
      { label: 'Design', value: 'design' },
      { label: 'Development', value: 'development', disabled: true },
      { label: 'Marketing', value: 'marketing' },
    ],
  },
}

export const Success: Story = {
  args: {
    state: 'success',
    hint: 'Team looks good.',
  },
}

export const Error: Story = {
  args: {
    state: 'error',
    error: 'Please pick a team before continuing.',
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
    modelValue: 'design',
  },
}

export const Empty: Story = {
  args: {
    options: [],
    emptyMessage: 'Nothing to select here yet.',
  },
}
