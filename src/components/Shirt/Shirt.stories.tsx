import type { Meta, StoryObj } from '@storybook/react-vite'
import { Shirt } from './Shirt'

const meta: Meta<typeof Shirt> = {
  title: 'Components/Shirt',
  component: Shirt,
}
export default meta

type Story = StoryObj<typeof Shirt>

export const Default: Story = { args: { variant: 'Default' } }

export const White: Story = { args: { variant: 'white' } }
White.storyName = 'white'

export const Betking: Story = { args: { variant: 'Betking' } }

export const Red: Story = { args: { variant: 'Red' } }

export const Green: Story = { args: { variant: 'Green' } }

export const Lock: Story = { args: { variant: 'lock' } }
Lock.storyName = 'lock'
