import type { Meta, StoryObj } from '@storybook/react-vite'
import { ClubBanner } from './ClubBanner'

const meta: Meta<typeof ClubBanner> = {
  title: 'Components/ClubBanner',
  component: ClubBanner,
}
export default meta

type Story = StoryObj<typeof ClubBanner>

export const White: Story = { args: { variant: 'White' } }

export const Red: Story = { args: { variant: 'Red' } }

export const Green: Story = { args: { variant: 'Green' } }

export const Blue: Story = { args: { variant: 'Blue' } }
