import type { Meta, StoryObj } from '@storybook/react-vite'
import { Chip } from './Chip'

const meta: Meta<typeof Chip> = {
  title: 'Components/Chip',
  component: Chip,
}
export default meta

type Story = StoryObj<typeof Chip>

export const XP: Story = { args: { variant: 'XP', children: '+ 100 XP' } }
XP.storyName = 'XP'

export const Shirt: Story = { args: { variant: 'Shirt', children: 'Shirt 1' } }

export const Disabled: Story = { args: { variant: 'disabled', children: 'Shirt 1' } }
Disabled.storyName = 'disabled'

export const Variant4: Story = { args: { variant: 'Variant4', children: '14 DAYS LEFT' } }
