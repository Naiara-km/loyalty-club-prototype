import type { Meta, StoryObj } from '@storybook/react-vite'
import { CaughtJayJayModal } from './CaughtJayJayModal'

const meta: Meta<typeof CaughtJayJayModal> = {
  title: 'Components/CaughtJayJayModal',
  component: CaughtJayJayModal,
  parameters: { layout: 'fullscreen' },
}
export default meta

type Story = StoryObj<typeof CaughtJayJayModal>

/** Figma 373:54932 — Mission 2 complete dialog with white-shirt Jay
 *  Jay and tilted CAUGHT stamp. */
export const Default: Story = {
  args: {
    open: true,
    onClose: () => console.log('close'),
  },
}
