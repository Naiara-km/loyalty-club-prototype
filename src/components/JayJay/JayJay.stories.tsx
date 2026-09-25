import type { Meta, StoryObj } from '@storybook/react-vite'
import { JayJay } from './JayJay'

const meta: Meta<typeof JayJay> = {
  title: 'Components/JayJay',
  component: JayJay,
}
export default meta

type Story = StoryObj<typeof JayJay>

export const White: Story = { args: { variant: 'white' } }
White.storyName = 'white'

export const Betking: Story = { args: { variant: 'Betking' } }

export const Red: Story = { args: { variant: 'Red' } }

export const Green: Story = { args: { variant: 'Green' } }
