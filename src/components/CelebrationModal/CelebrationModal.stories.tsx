import type { Meta, StoryObj } from '@storybook/react-vite'
import { CelebrationModal } from './CelebrationModal'

const meta: Meta<typeof CelebrationModal> = {
  title: 'Components/CelebrationModal',
  component: CelebrationModal,
  parameters: { layout: 'fullscreen' },
}
export default meta

type Story = StoryObj<typeof CelebrationModal>

/** Figma 270:43201 — first shirt claimed (Green). */
export const Green: Story = {
  args: {
    open: true,
    onClose: () => {},
    shirtColour: 'Green',
    xpAwarded: 100,
    shirtsLeft: 2,
  },
}

/** Second shirt claimed (Red). */
export const Red: Story = {
  args: {
    open: true,
    onClose: () => {},
    shirtColour: 'Red',
    xpAwarded: 100,
    shirtsLeft: 1,
  },
}

/** Final shirt claimed (Blue). */
export const Blue: Story = {
  args: {
    open: true,
    onClose: () => {},
    shirtColour: 'Blue',
    xpAwarded: 300,
    shirtsLeft: 0,
  },
}
