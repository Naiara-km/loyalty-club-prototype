import type { Meta, StoryObj } from '@storybook/react-vite'
import { ScheduledLeagues } from './ScheduledLeagues'

const meta: Meta<typeof ScheduledLeagues> = {
  title: 'Components/ScheduledLeagues',
  component: ScheduledLeagues,
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 600, margin: '0 auto', padding: 16 }}>
        <Story />
      </div>
    ),
  ],
}
export default meta

type Story = StoryObj<typeof ScheduledLeagues>

/** Figma 362:44063 — 2-column grid, two large tiles on the left,
 *  three 76px tiles on the right. */
export const Default: Story = {}
