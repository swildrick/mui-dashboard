import type * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import FormControl from '@mui/material/FormControl';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import { FIGMA_NODES, FIGMA_VARIANTS, figmaDesign, figmaDocs } from '../figma';

const adornments = {
  none: undefined,
  SearchRounded: (
    <InputAdornment position="start">
      <SearchRoundedIcon fontSize="small" />
    </InputAdornment>
  ),
};

const meta = {
  title: 'Atoms/OutlinedInput',
  component: OutlinedInput,
  args: {
    size: 'small',
    placeholder: 'Placeholder',
    startAdornment: 'none' as unknown as React.ReactNode,
    inputProps: { 'aria-label': 'Example input' },
  },
  argTypes: {
    size: { control: 'inline-radio', options: ['small', 'medium'] },
    startAdornment: { control: 'select', options: Object.keys(adornments), mapping: adornments },
  },
  decorators: [(Story) => <div style={{ width: 220 }}><Story /></div>],
  parameters: {
    ...figmaDesign(FIGMA_NODES.OutlinedInput),
    ...figmaDocs(
      'OutlinedInput',
      FIGMA_NODES.OutlinedInput,
      'MUI `OutlinedInput` with the overrides in `inputs.tsx`: padding 8px 12px, 1px `divider` border, `background.default` fill, `small` = 2.25rem, `medium` = 2.5rem. ' +
        'Placeholder is gray[500] at 0.7 opacity; `InputAdornment` is gray[500] (gray[400] dark).\n\n' +
        '**Differs from Figma:** `state=hover` and the `startAdornment visible` boolean are Figma-only. ' +
        'The focused style (3px brand[500] outline at 50%, brand[400] border) exists in code but has no Figma variant.',
    ),
  },
} satisfies Meta<typeof OutlinedInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Small: Story = {
  args: { size: 'small' },
  parameters: figmaDesign(FIGMA_VARIANTS.OutlinedInput['size=small, state=default']),
};

export const Medium: Story = {
  args: { size: 'medium' },
  parameters: figmaDesign(FIGMA_VARIANTS.OutlinedInput['size=medium, state=default']),
};

export const WithStartAdornment: Story = {
  name: 'With startAdornment',
  args: { startAdornment: 'SearchRounded' as unknown as React.ReactNode, placeholder: 'Search…' },
};

export const Hover: Story = {
  args: { startAdornment: 'SearchRounded' as unknown as React.ReactNode },
  parameters: { pseudo: { hover: true } },
};

export const Focused: Story = {
  name: 'Focused (not in Figma)',
  render: (args) => (
    <Stack>
      <FormControl focused>
        <OutlinedInput {...args} />
      </FormControl>
    </Stack>
  ),
  args: { startAdornment: 'SearchRounded' as unknown as React.ReactNode },
};
