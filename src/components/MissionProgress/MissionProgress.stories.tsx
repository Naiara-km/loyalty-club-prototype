import type { Meta, StoryObj } from '@storybook/react-vite'
import { MissionProgress } from './MissionProgress'

const meta: Meta<typeof MissionProgress> = {
  title: 'Components/MissionProgress',
  component: MissionProgress,
}
export default meta

type Story = StoryObj<typeof MissionProgress>

export const Start: Story = { args: { variant: 'Start' } }

export const Mission1: Story = { args: { variant: 'Mission 1' } }
Mission1.storyName = 'Mission 1'

export const Mission2: Story = { args: { variant: 'Mission 2' } }
Mission2.storyName = 'Mission 2'

export const Mission3: Story = { args: { variant: 'Mission 3' } }
Mission3.storyName = 'Mission 3'
