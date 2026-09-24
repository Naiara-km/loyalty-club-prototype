import type { Meta, StoryObj } from '@storybook/react-vite'
import { TimelineDot } from './TimelineDot'

const meta: Meta<typeof TimelineDot> = {
  title: 'Components/TimelineDot',
  component: TimelineDot,
}
export default meta

type Story = StoryObj<typeof TimelineDot>

export const Step1Locked: Story = { args: { state: 'Locked', step: 1 } }
Step1Locked.storyName = 'Step=1, State=Locked'

export const Step1Active: Story = { args: { state: 'Active', step: 1 } }
Step1Active.storyName = 'Step=1, State=Active'

export const Step1Completed: Story = { args: { state: 'Completed', step: 1 } }
Step1Completed.storyName = 'Step=1, State=Completed'

export const Step2Locked: Story = { args: { state: 'Locked', step: 2 } }
Step2Locked.storyName = 'Step=2, State=Locked'

export const Step2Active: Story = { args: { state: 'Active', step: 2 } }
Step2Active.storyName = 'Step=2, State=Active'

export const Step2Completed: Story = { args: { state: 'Completed', step: 2 } }
Step2Completed.storyName = 'Step=2, State=Completed'

export const Step3Locked: Story = { args: { state: 'Locked', step: 3 } }
Step3Locked.storyName = 'Step=3, State=Locked'

export const Step3Active: Story = { args: { state: 'Active', step: 3 } }
Step3Active.storyName = 'Step=3, State=Active'

export const Step3Completed: Story = { args: { state: 'Completed', step: 3 } }
Step3Completed.storyName = 'Step=3, State=Completed'
