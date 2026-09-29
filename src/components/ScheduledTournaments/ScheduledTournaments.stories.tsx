import type { Meta, StoryObj } from '@storybook/react-vite'
import { ScheduledTournaments } from './ScheduledTournaments'

const meta: Meta<typeof ScheduledTournaments> = {
  title: 'Components/ScheduledTournaments',
  component: ScheduledTournaments,
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 600, margin: '0 auto' }}>
        <Story />
      </div>
    ),
  ],
}
export default meta

type Story = StoryObj<typeof ScheduledTournaments>

/** Figma 362:44507 — hero tile on the left, two small stacked tiles
 *  on the right. */
export const Default: Story = {}
