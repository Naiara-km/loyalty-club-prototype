import type { Meta, StoryObj } from '@storybook/react-vite'
import { JayJayDanceOverlay } from './JayJayDanceOverlay'

const meta: Meta<typeof JayJayDanceOverlay> = {
  title: 'Components/JayJayDanceOverlay',
  component: JayJayDanceOverlay,
  parameters: { layout: 'fullscreen' },
  args: {
    open: true,
    onClose: () => {},
  },
}
export default meta

type Story = StoryObj<typeof JayJayDanceOverlay>

/** Default white-shirt dance — the only clip bundled today, so red/
 *  green/blue variants below fall back to this video while showing the
 *  per-shirt title and caption. */
export const White: Story = { args: { shirt: 'white' } }

export const Red: Story = { args: { shirt: 'red' } }

export const Green: Story = { args: { shirt: 'green' } }

export const Blue: Story = { args: { shirt: 'blue' } }

/** All three mission shirts collected — the caption changes to the
 *  "every shirt has its own moves" message regardless of which shirt
 *  is currently worn. */
export const AllWon: Story = { args: { shirt: 'blue', allWon: true } }
