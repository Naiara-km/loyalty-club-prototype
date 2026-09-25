import type { Meta, StoryObj } from '@storybook/react-vite'
import { MainCard } from './MainCard'

const meta: Meta<typeof MainCard> = {
  title: 'Components/MainCard',
  component: MainCard,
}
export default meta

type Story = StoryObj<typeof MainCard>

export const Variant03: Story = { args: { variant: '0/3' } }
Variant03.storyName = '0/3'

export const Variant13: Story = { args: { variant: '1/3' } }
Variant13.storyName = '1/3'

export const Variant23: Story = { args: { variant: '2/3' } }
Variant23.storyName = '2/3'

export const Variant33: Story = { args: { variant: '3/3' } }
Variant33.storyName = '3/3'
