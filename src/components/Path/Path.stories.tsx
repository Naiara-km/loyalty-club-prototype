import type { Meta, StoryObj } from '@storybook/react-vite'
import { Path } from './Path'

const meta: Meta<typeof Path> = {
  title: 'Components/Path',
  component: Path,
}
export default meta

type Story = StoryObj<typeof Path>

/** M1 active, M2 and M3 locked. */
export const Variant1: Story = {
  args: {
    dots: [
      { state: 'Active', step: 1 },
      { state: 'Locked' },
      { state: 'Locked' },
    ],
  },
}
Variant1.storyName = '1'

/** M2 active (top after reorder), then M3 locked, then M1 completed. */
export const Variant2: Story = {
  args: {
    dots: [
      { state: 'Active', step: 2 },
      { state: 'Locked' },
      { state: 'Completed' },
    ],
  },
}
Variant2.storyName = '2'

/** M3 active (top), then M2 completed, then M1 completed. */
export const Variant3: Story = {
  args: {
    dots: [
      { state: 'Active', step: 3 },
      { state: 'Completed' },
      { state: 'Completed' },
    ],
  },
}
Variant3.storyName = '3'

/** All three missions completed (newest → oldest, top-to-bottom). */
export const VariantAll: Story = {
  args: {
    dots: [
      { state: 'Completed' },
      { state: 'Completed' },
      { state: 'Completed' },
    ],
  },
}
VariantAll.storyName = 'all'
