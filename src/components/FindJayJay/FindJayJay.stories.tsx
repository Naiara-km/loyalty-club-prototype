import type { Meta, StoryObj } from '@storybook/react-vite'
import { FindJayJay } from './FindJayJay'

const meta: Meta<typeof FindJayJay> = {
  title: 'Components/FindJayJay',
  component: FindJayJay,
  parameters: { layout: 'fullscreen' },
}
export default meta

type Story = StoryObj<typeof FindJayJay>

/** Figma 362:44558 — head-crop of Jay Jay on the left, TAP TO CATCH
 *  highlight pill on the right. */
export const Default: Story = {
  args: {
    onCatch: () => console.log('Jay Jay caught'),
  },
}
