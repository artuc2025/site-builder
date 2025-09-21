import type { Meta, StoryObj } from '@storybook/vue3'

import UiTextarea from './UiTextarea.vue'

type UiTextareaStoryProps = InstanceType<typeof UiTextarea>['$props'] & {
  modelValue: string
  'update:modelValue'?: (value: string) => void
}

const meta: Meta<UiTextareaStoryProps> = {
  title: 'UI/Textarea',
  component: UiTextarea,
  tags: ['autodocs'],
  argTypes: {
    state: {
      control: { type: 'inline-radio' },
      options: ['default', 'success', 'error'],
    },
    modelValue: {
      control: 'text',
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
    autoresize: {
      control: 'boolean',
    },
    minRows: {
      control: 'number',
    },
    maxRows: {
      control: 'number',
    },
    maxlength: {
      control: 'number',
    },
    'update:modelValue': { action: 'update:modelValue' },
    focus: { action: 'focus' },
    blur: { action: 'blur' },
  },
  args: {
    label: 'Project overview',
    modelValue: 'Describe the scope and main goals of this project.',
    placeholder: 'Share context for the team…',
    hint: 'Markdown is supported.',
    error: '',
    disabled: false,
    autoresize: false,
    minRows: 3,
    maxRows: 12,
    maxlength: 280,
    state: 'default',
  },
  render: args => ({
    components: { UiTextarea },
    setup: () => ({ args }),
    template: `
      <UiTextarea
        v-bind="args"
        @update:modelValue="args['update:modelValue']?.($event)"
        @focus="args.focus?.($event)"
        @blur="args.blur?.($event)"
      />
    `,
  }),
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Autoresize: Story = {
  args: {
    autoresize: true,
    modelValue:
      'Heading\n\n- Bullet one\n- Bullet two\n\nProvide as much context as you need here.',
  },
}

export const Error: Story = {
  args: {
    state: 'error',
    error: 'This field is required.',
    modelValue: '',
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
    modelValue: 'The textarea is disabled.',
  },
}

export const Counter: Story = {
  args: {
    maxlength: 120,
    modelValue: 'Keep track of your content length with a visible counter.',
  },
}
