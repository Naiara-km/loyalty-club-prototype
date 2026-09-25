import type { Meta, StoryObj } from '@storybook/react-vite'
import { MissionCard } from './MissionCard'

const meta: Meta<typeof MissionCard> = {
  title: 'Components/MissionCard',
  component: MissionCard,
  decorators: [
    (Story) => (
      <div style={{ padding: '24px 16px' }}>
        <Story />
      </div>
    ),
  ],
}
export default meta

type Story = StoryObj<typeof MissionCard>

export const Active: Story = { args: { variant: 'Active' } }

/** Active card with the exploratory voxels/isometric-cube texture in
 *  place of the default concentric rings. Prototype only — used for
 *  stakeholder texture reviews. */
export const ActiveVoxels: Story = {
  args: { variant: 'Active', shader: 'voxels' },
}
ActiveVoxels.storyName = 'Active — voxels shader'

export const Pending: Story = { args: { variant: 'pending' } }
Pending.storyName = 'pending'

export const Completed: Story = { args: { variant: 'Completed' } }
