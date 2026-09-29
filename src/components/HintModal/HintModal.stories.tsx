import type { Meta, StoryObj } from '@storybook/react-vite'
import { HintModal } from './HintModal'

const meta: Meta<typeof HintModal> = {
  title: 'Components/HintModal',
  component: HintModal,
  parameters: { layout: 'fullscreen' },
}
export default meta

type Story = StoryObj<typeof HintModal>

/** Figma 337:23136 — opens from the M2 "Need a hint?" CTA and shows
 *  the mission clue plus what the user has to do. Copy is static. */
export const Default: Story = {
  args: {
    open: true,
    onClose: () => {},
  },
}
