import type { Meta, StoryObj } from '@storybook/vue3'

import UiButton from './UiButton.vue'

type ButtonStoryProps = {
  defaultSlot: string
}

const meta: Meta<ButtonStoryProps> = {
  title: 'UI/Button',
  component: UiButton,
  tags: ['autodocs'],
  argTypes: {
    defaultSlot: {
      control: 'text',
      description: 'Text rendered inside the default slot',
    },
  },
  args: {
    defaultSlot: 'Click me',
  },
  render: args => ({
    components: { UiButton },
    setup: () => ({ args }),
    template: '<UiButton>{{ args.defaultSlot }}</UiButton>',
  }),
}

export default meta

type Story = StoryObj<typeof meta>

export const Primary: Story = {}

export const WithLongLabel: Story = {
  args: {
    defaultSlot: 'Add media assets',
  },
}
