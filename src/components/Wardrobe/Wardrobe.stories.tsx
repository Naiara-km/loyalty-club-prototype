import type { Meta, StoryObj } from '@storybook/react-vite'
import { Wardrobe } from './Wardrobe'

const meta: Meta<typeof Wardrobe> = {
  title: 'Components/Wardrobe',
  component: Wardrobe,
}
export default meta

type Story = StoryObj<typeof Wardrobe>

export const Locked: Story = { args: { variant: 'Locked' } }

export const Selected: Story = { args: { variant: 'Selected' } }

export const Available: Story = { args: { variant: 'Available' } }

export const Won: Story = { args: { variant: 'Won' } }
