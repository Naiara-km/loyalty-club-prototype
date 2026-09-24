import type { Meta, StoryObj } from '@storybook/react-vite'
import { Missions } from './Missions'

const meta: Meta<typeof Missions> = {
  title: 'Components/Missions',
  component: Missions,
  decorators: [
    (Story) => (
      <div style={{ padding: '24px 16px' }}>
        <Story />
      </div>
    ),
  ],
}
export default meta

type Story = StoryObj<typeof Missions>

export const Default: Story = {}
