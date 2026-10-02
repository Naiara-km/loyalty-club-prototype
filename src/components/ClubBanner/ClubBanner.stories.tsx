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

/** Figma 493:58147 — all-done empty state. Jay Jay still wears the
 *  Betking shirt but the offer copy swaps to "New missions. Coming
 *  soon..!" with a NEXT MISSIONS badge and three locked tiles. */
export const AllDone: Story = { args: { variant: 'Blue', allDone: true } }
