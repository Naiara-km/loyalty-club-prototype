import type { Meta, StoryObj } from '@storybook/react-vite'
import { LatestWinners } from './LatestWinners'

const meta: Meta<typeof LatestWinners> = {
  title: 'Components/LatestWinners',
  component: LatestWinners,
  parameters: { layout: 'fullscreen' },
}
export default meta

type Story = StoryObj<typeof LatestWinners>

/** Figma 362:44517 — three winner cards, colour-coded per badge. */
export const Default: Story = {}
