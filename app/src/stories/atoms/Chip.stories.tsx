import type { Meta, StoryObj } from '@storybook/react-vite';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import { FIGMA_NODES, FIGMA_VARIANTS, figmaDesign, figmaDocs } from '../figma';

const colors = ['default', 'success', 'error'] as const;

const meta = {
  title: 'Atoms/Chip',
  component: Chip,
  args: {
    label: 'Chip',
    color: 'default',
    size: 'small',
  },
  argTypes: {
    color: { control: 'inline-radio', options: colors },
    size: { control: 'inline-radio', options: ['small', 'medium'] },
  },
  parameters: {
    ...figmaDesign(FIGMA_NODES.Chip),
    ...figmaDocs(
      'Chip',
      FIGMA_NODES.Chip,
      'MUI `Chip` with the overrides in `dataDisplay.tsx`: `defaultProps.size` is `small`, 1px border, 999px radius, 600-weight label at caption size. ' +
        'The theme styles `default`, `success` and `error`.\n\n' +
        '**Differs from Figma:** the code also styles a chip icon for each color; the Figma Chip has no icon property. The template never passes an icon, so it is not shown here.',
    ),
  },
} satisfies Meta<typeof Chip>;

export default meta;
type Story = StoryObj<typeof meta>;

const v = FIGMA_VARIANTS.Chip;

export const Default: Story = {
  args: { color: 'default', label: '+5%' },
  parameters: figmaDesign(v['color=default, size=small']),
};

export const Success: Story = {
  args: { color: 'success', label: '+25%' },
  parameters: figmaDesign(v['color=success, size=small']),
};

export const ErrorColor: Story = {
  name: 'Error',
  args: { color: 'error', label: '-25%' },
  parameters: figmaDesign(v['color=error, size=small']),
};

export const AllColorsAndSizes: Story = {
  name: 'All colors and sizes',
  render: () => (
    <Stack spacing={2}>
      {(['small', 'medium'] as const).map((size) => (
        <Stack key={size} direction="row" spacing={2}>
          {colors.map((color) => (
            <Chip key={color} color={color} size={size} label={`${color} / ${size}`} />
          ))}
        </Stack>
      ))}
    </Stack>
  ),
};
