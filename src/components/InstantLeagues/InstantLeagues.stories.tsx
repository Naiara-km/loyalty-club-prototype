import type { Meta, StoryObj } from '@storybook/react-vite'
import { InstantLeagues } from './InstantLeagues'

const meta: Meta<typeof InstantLeagues> = {
  title: 'Components/InstantLeagues',
  component: InstantLeagues,
  parameters: { layout: 'fullscreen' },
}
export default meta

type Story = StoryObj<typeof InstantLeagues>

/** Figma 362:44563 — white card, 2×2 gradient tiles with chevron
 *  overlay + PLAY pill per league. */
export const Default: Story = {}
