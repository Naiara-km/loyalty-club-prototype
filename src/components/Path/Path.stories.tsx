import type { Meta, StoryObj } from '@storybook/react-vite'
import { Path } from './Path'

const meta: Meta<typeof Path> = {
  title: 'Components/Path',
  component: Path,
}
export default meta

type Story = StoryObj<typeof Path>

export const Variant1: Story = { args: { variant: '1' } }
Variant1.storyName = '1'

export const Variant2: Story = { args: { variant: '2' } }
Variant2.storyName = '2'

export const Variant3: Story = { args: { variant: '3' } }
Variant3.storyName = '3'

export const VariantAll: Story = { args: { variant: 'all' } }
VariantAll.storyName = 'all'
