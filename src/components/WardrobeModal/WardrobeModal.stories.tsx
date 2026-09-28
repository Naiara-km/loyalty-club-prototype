import type { Meta, StoryObj } from '@storybook/react-vite'
import { WardrobeModal } from './WardrobeModal'
import type { ShirtSlot } from '../../state/clubState'

/** Full slot lineup — matches ClubState.wardrobe.slots ordering after
 *  the M1=Red / M2=Green / M3=Blue Figma alignment. */
const buildSlots = (won: [boolean, boolean, boolean]): [
  ShirtSlot,
  ShirtSlot,
  ShirtSlot,
  ShirtSlot,
] => [
  { id: 0, colour: 'White', won: true },
  { id: 1, colour: 'Red', won: won[0] },
  { id: 2, colour: 'Green', won: won[1] },
  { id: 3, colour: 'Blue', won: won[2] },
]

const meta: Meta<typeof WardrobeModal> = {
  title: 'Components/WardrobeModal',
  component: WardrobeModal,
  parameters: { layout: 'fullscreen' },
}
export default meta

type Story = StoryObj<typeof WardrobeModal>

/** Figma 186:29922 — only the default white shirt is available. */
export const OnlyWhite: Story = {
  args: {
    open: true,
    onClose: () => {},
    onWear: () => {},
    slots: buildSlots([false, false, false]),
    wearing: 0,
  },
}
OnlyWhite.storyName = 'Only white'

/** Figma 186:30310 — after M1: white + red available. */
export const WhiteAndRed: Story = {
  args: {
    open: true,
    onClose: () => {},
    onWear: () => {},
    slots: buildSlots([true, false, false]),
    wearing: 0,
  },
}
WhiteAndRed.storyName = 'White + red'

/** Figma 186:30733 — after M2: white + red + green available. */
export const ThreeAvailable: Story = {
  args: {
    open: true,
    onClose: () => {},
    onWear: () => {},
    slots: buildSlots([true, true, false]),
    wearing: 0,
  },
}
ThreeAvailable.storyName = 'White + red + green'

/** Figma 186:31152 — all four shirts available after M3. */
export const AllShirts: Story = {
  args: {
    open: true,
    onClose: () => {},
    onWear: () => {},
    slots: buildSlots([true, true, true]),
    wearing: 0,
  },
}
AllShirts.storyName = 'All shirts'
