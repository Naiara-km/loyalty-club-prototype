import type { Meta, StoryObj } from '@storybook/react-vite'
import { JayJayDanceOverlay } from './JayJayDanceOverlay'

const meta: Meta<typeof JayJayDanceOverlay> = {
  title: 'Components/JayJayDanceOverlay',
  component: JayJayDanceOverlay,
  parameters: { layout: 'fullscreen' },
}
export default meta

type Story = StoryObj<typeof JayJayDanceOverlay>

/** Full-screen Jay Jay dance overlay — vibrant animated gradient,
 *  low-density confetti, white panel with the looping dance video.
 *  Auto-closes after 10s. */
export const Open: Story = {
  args: {
    open: true,
    onClose: () => {},
  },
}
