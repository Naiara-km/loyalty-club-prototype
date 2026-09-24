import type { Meta, StoryObj } from '@storybook/react-vite'
import { MissionCard } from './MissionCard'

const meta: Meta<typeof MissionCard> = {
  title: 'Components/MissionCard',
  component: MissionCard,
}
export default meta

type Story = StoryObj<typeof MissionCard>

export const Active: Story = { args: { variant: 'Active' } }

export const Pending: Story = { args: { variant: 'pending' } }
Pending.storyName = 'pending'

export const Completed: Story = { args: { variant: 'Completed' } }
