import type * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import NotificationsRoundedIcon from '@mui/icons-material/NotificationsRounded';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded';
import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded';
import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';
import { FIGMA_NODES, FIGMA_VARIANTS, figmaDesign, figmaDocs } from '../figma';

// Icons the template renders inside IconButton (directly or through MenuButton / ColorModeIconDropdown).
const icons = {
  NotificationsRounded: <NotificationsRoundedIcon />,
  MenuRounded: <MenuRoundedIcon />,
  MoreVertRounded: <MoreVertRoundedIcon />,
  LightModeRounded: <LightModeRoundedIcon />,
  DarkModeRounded: <DarkModeRoundedIcon />,
};

const meta = {
  title: 'Atoms/IconButton',
  component: IconButton,
  args: {
    size: 'small',
    children: 'NotificationsRounded' as unknown as React.ReactNode,
    'aria-label': 'Open notifications',
  },
  argTypes: {
    size: { control: 'inline-radio', options: ['small', 'medium'] },
    children: { control: 'select', options: Object.keys(icons), mapping: icons },
  },
  parameters: {
    ...figmaDesign(FIGMA_NODES.IconButton),
    ...figmaDocs(
      'IconButton',
      FIGMA_NODES.IconButton,
      'MUI `IconButton` with the overrides in `inputs.tsx`: 1px gray border, `shape.borderRadius`, `small` = 2.25rem square with a 1rem icon, `medium` = 2.5rem square. ' +
        'Icon-only, so always pass `aria-label`.\n\n**Differs from Figma:** `state=hover` is a Figma-only variant (code: CSS `:hover`).',
    ),
  },
} satisfies Meta<typeof IconButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Small: Story = {
  args: { size: 'small' },
  parameters: figmaDesign(FIGMA_VARIANTS.IconButton['size=small, state=default']),
};

export const Medium: Story = {
  args: { size: 'medium' },
  parameters: figmaDesign(FIGMA_VARIANTS.IconButton['size=medium, state=default']),
};

export const Hover: Story = {
  render: () => (
    <Stack direction="row" spacing={2}>
      <IconButton size="small" aria-label="Open notifications">
        <NotificationsRoundedIcon />
      </IconButton>
      <IconButton size="medium" aria-label="Open notifications">
        <NotificationsRoundedIcon />
      </IconButton>
    </Stack>
  ),
  parameters: { pseudo: { hover: true } },
};
