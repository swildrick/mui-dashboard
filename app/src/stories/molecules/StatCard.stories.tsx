import type { Meta, StoryObj } from '@storybook/react-vite';
import StatCard from '@templates/dashboard/components/StatCard';
import { FIGMA_NODES, FIGMA_VARIANTS, figmaDesign, figmaDocs } from '../figma';

// Sample data copied from the `data` array in dashboard/components/MainGrid.tsx.
const users = [
  200, 24, 220, 260, 240, 380, 100, 240, 280, 240, 300, 340, 320, 360, 340, 380,
  360, 400, 380, 420, 400, 640, 340, 460, 440, 480, 460, 600, 880, 920,
];
const conversions = [
  1640, 1250, 970, 1130, 1050, 900, 720, 1080, 900, 450, 920, 820, 840, 600, 820,
  780, 800, 760, 380, 740, 660, 620, 840, 500, 520, 480, 400, 360, 300, 220,
];
const eventCount = [
  500, 400, 510, 530, 520, 600, 530, 520, 510, 730, 520, 510, 530, 620, 510, 530,
  520, 410, 530, 520, 610, 530, 520, 610, 530, 420, 510, 430, 520, 510,
];

const meta = {
  title: 'Molecules/StatCard',
  component: StatCard,
  args: {
    title: 'Users',
    value: '14k',
    interval: 'Last 30 days',
    trend: 'up',
    data: users,
  },
  argTypes: {
    trend: { control: 'inline-radio', options: ['up', 'down', 'neutral'] },
  },
  decorators: [(Story) => <div style={{ width: 276 }}><Story /></div>],
  parameters: {
    ...figmaDesign(FIGMA_NODES.StatCard),
    ...figmaDocs(
      'StatCard',
      FIGMA_NODES.StatCard,
      '`dashboard/components/StatCard.tsx`: `Card variant="outlined"` with `title` (subtitle2), `value` (h4), a `Chip` for `trend` (`up` success +25%, `down` error -25%, `neutral` default +5%), `interval` (caption) and a `SparkLineChart` of `data`.\n\n' +
        '**Differs from Figma:** in Figma the sparkline is a static vector with a flat 15% area fill (code: live chart with an `AreaGradient`), and there is no `data` property.',
    ),
  },
} satisfies Meta<typeof StatCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Up: Story = {
  args: { title: 'Users', value: '14k', trend: 'up', data: users },
  parameters: figmaDesign(FIGMA_VARIANTS.StatCard['trend=up']),
};

export const Down: Story = {
  args: { title: 'Conversions', value: '325', trend: 'down', data: conversions },
  parameters: figmaDesign(FIGMA_VARIANTS.StatCard['trend=down']),
};

export const Neutral: Story = {
  args: { title: 'Event count', value: '200k', trend: 'neutral', data: eventCount },
  parameters: figmaDesign(FIGMA_VARIANTS.StatCard['trend=neutral']),
};
