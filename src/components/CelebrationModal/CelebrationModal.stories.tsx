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
    title: 'Congrats King!',
    subtitle: 'Club Green Shirt is yours',
    xpAwarded: 100,
    rewardTail: '2 shirts left',
    buttonLabel: 'NEXT MISSION',
  },
}

/** Second shirt claimed (Red). */
export const Red: Story = {
  args: {
    open: true,
    onClose: () => {},
    shirtColour: 'Red',
    title: 'Congrats King!',
    subtitle: 'Club Red Shirt is yours',
    xpAwarded: 100,
    rewardTail: '1 shirt left',
    buttonLabel: 'NEXT MISSION',
  },
}

/** Figma 186:28774 — final claim (Blue / Betking). Different copy: no
 *  subtitle, "Level 2 reached!" bold tail, CLOSE button. */
export const FullCollection: Story = {
  args: {
    open: true,
    onClose: () => {},
    shirtColour: 'Blue',
    title: 'Congrats King! You have the full collection!',
    xpAwarded: 300,
    rewardTail: 'Level 2 reached!',
    rewardTailBold: true,
    buttonLabel: 'CLOSE',
  },
}
