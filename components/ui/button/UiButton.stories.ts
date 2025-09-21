import type { Meta, StoryObj } from '@storybook/vue3'

import UiButton from './UiButton.vue'

type UiButtonStoryProps = InstanceType<typeof UiButton>['$props'] & {
  defaultSlot: string
  prefix?: string
  suffix?: string
  icon?: string
  onClick?: (event: MouseEvent) => void
}

const meta: Meta<UiButtonStoryProps> = {
  title: 'UI/Button',
  component: UiButton,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'ghost', 'danger'],
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
    },
    block: { control: 'boolean' },
    loading: { control: 'boolean' },
    disabled: { control: 'boolean' },
    iconOnly: { control: 'boolean' },
    iconPosition: {
      control: { type: 'inline-radio' },
      options: ['start', 'end'],
    },
    defaultSlot: {
      control: 'text',
      description: 'Content rendered inside the button label',
    },
    prefix: {
      control: 'text',
      description: 'Optional text rendered in the prefix slot',
    },
    suffix: {
      control: 'text',
      description: 'Optional text rendered in the suffix slot',
    },
    icon: {
      control: 'text',
      description: 'Emoji or text rendered in the icon slot',
    },
    onClick: { action: 'clicked' },
  },
  args: {
    variant: 'primary',
    size: 'md',
    block: false,
    loading: false,
    disabled: false,
    iconOnly: false,
    iconPosition: 'start',
    defaultSlot: 'Click me',
  },
  render: args => ({
    components: { UiButton },
    setup: () => ({ args }),
    template: `
      <UiButton
        v-bind="args"
        @click="args.onClick?.($event)"
      >
        <template v-if="args.prefix" #prefix>{{ args.prefix }}</template>
        <template v-if="args.icon" #icon>{{ args.icon }}</template>
        <template v-if="args.suffix" #suffix>{{ args.suffix }}</template>
        {{ args.defaultSlot }}
      </UiButton>
    `,
  }),
}

export default meta

type Story = StoryObj<typeof meta>

export const Primary: Story = {}

export const Secondary: Story = {
  args: {
    variant: 'secondary',
  },
}

export const Danger: Story = {
  args: {
    variant: 'danger',
  },
}

export const Ghost: Story = {
  args: {
    variant: 'ghost',
  },
}

export const WithIcon: Story = {
  args: {
    icon: '🚀',
  },
}

export const Loading: Story = {
  args: {
    loading: true,
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
  },
}

export const Block: Story = {
  args: {
    block: true,
    defaultSlot: 'Full width action',
  },
}

export const Sizes: Story = {
  render: args => ({
    components: { UiButton },
    setup: () => ({ args }),
    template: `
      <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
        <UiButton v-bind="args" size="sm">Small</UiButton>
        <UiButton v-bind="args" size="md">Medium</UiButton>
        <UiButton v-bind="args" size="lg">Large</UiButton>
      </div>
    `,
  }),
  args: {
    defaultSlot: 'Primary',
  },
}
