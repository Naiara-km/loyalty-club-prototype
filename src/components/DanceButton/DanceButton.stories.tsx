import type { Meta, StoryObj } from '@storybook/react-vite'
import { DanceButton } from './DanceButton'

const meta: Meta<typeof DanceButton> = {
  title: 'Components/DanceButton',
  component: DanceButton,
}
export default meta

type Story = StoryObj<typeof DanceButton>

export const Active: Story = { args: { variant: 'Active' } }

export const Pending: Story = { args: { variant: 'Pending' } }
