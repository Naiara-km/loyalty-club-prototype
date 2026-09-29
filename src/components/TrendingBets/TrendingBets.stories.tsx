import type { Meta, StoryObj } from '@storybook/react-vite'
import { TrendingBets } from './TrendingBets'

const meta: Meta<typeof TrendingBets> = {
  title: 'Components/TrendingBets',
  component: TrendingBets,
  parameters: { layout: 'fullscreen' },
}
export default meta

type Story = StoryObj<typeof TrendingBets>

/** Figma 362:44103 — horizontal snap-scroll of 6 acca tiles. */
export const Default: Story = {}
