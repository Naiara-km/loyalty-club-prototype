import type { Meta, StoryObj } from '@storybook/react-vite'
import { LevelsModal } from './LevelsModal'

const meta: Meta<typeof LevelsModal> = {
  title: 'Components/LevelsModal',
  component: LevelsModal,
  parameters: { layout: 'fullscreen' },
}
export default meta

type Story = StoryObj<typeof LevelsModal>

/** Figma 81:14105 — "Your path in the Club" tier explainer that opens
 *  from the Starter progress bar. Content is static (Starter · L1 ·
 *  More to come), so there's just the one story. */
export const Default: Story = {
  args: {
    open: true,
    onClose: () => {},
  },
}
