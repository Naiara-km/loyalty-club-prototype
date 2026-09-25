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

/** Default Active card — repeating chevron texture (forward-motion
 *  wash) over the gold gradient. Tune --club-chevron-opacity and
 *  --club-chevron-color in the browser dev-tools to iterate. */
export const Active: Story = {
  args: { variant: 'Active', shader: 'chevron' },
}

/** Active card with a single large right-pointing chevron behind the
 *  chips and right end of the button. Comparable to the repeating
 *  variant — pick one after side-by-side review. */
export const ActiveSingleChevron: Story = {
  args: { variant: 'Active', shader: 'chevron', texture: 'single' },
}
ActiveSingleChevron.storyName = 'Active — single chevron'

/** Active card with the exploratory voxels/isometric-cube texture in
 *  place of the default concentric rings. Prototype only — used for
 *  stakeholder texture reviews. */
export const ActiveVoxels: Story = {
  args: { variant: 'Active', shader: 'voxels' },
}
ActiveVoxels.storyName = 'Active — voxels shader'

/** Active card with a white dot-grid overlay in place of the default
 *  rings. Approximates <Shader><DotGrid color="#ffffff"/></Shader>. */
export const ActiveDotGrid: Story = {
  args: { variant: 'Active', shader: 'dot-grid' },
}
ActiveDotGrid.storyName = 'Active — dot-grid shader'

/** Active card with a solid #ffc400 wash at 30% opacity. Stand-in for
 *  <Shader><Aurora intensity={80}/></Shader> — collapses the aurora
 *  effect to a flat colour overlay per stakeholder request. */
export const ActiveAurora: Story = {
  args: { variant: 'Active', shader: 'aurora' },
}
ActiveAurora.storyName = 'Active — aurora shader'

export const Pending: Story = { args: { variant: 'pending' } }
Pending.storyName = 'pending'

export const Completed: Story = { args: { variant: 'Completed' } }
