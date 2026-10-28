import type * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import NotificationsRoundedIcon from '@mui/icons-material/NotificationsRounded';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded';
import MenuButton from '@templates/dashboard/components/MenuButton';
import { FIGMA_NODES, figmaDesign, figmaDocs } from '../figma';

// Icons the template passes to MenuButton.
const icons = {
  NotificationsRounded: <NotificationsRoundedIcon />,
  MenuRounded: <MenuRoundedIcon />,
  MoreVertRounded: <MoreVertRoundedIcon />,
};

const meta = {
  title: 'Molecules/MenuButton',
  component: MenuButton,
  args: {
    showBadge: false,
    children: 'NotificationsRounded' as unknown as React.ReactNode,
    'aria-label': 'Open notifications',
  },
  argTypes: {
    children: { control: 'select', options: Object.keys(icons), mapping: icons },
  },
  parameters: {
    ...figmaDesign(FIGMA_NODES.MenuButton),
    ...figmaDocs(
      'MenuButton',
      FIGMA_NODES.MenuButton,
      '`dashboard/components/MenuButton.tsx`: an `IconButton size="small"` inside a `Badge color="error" variant="dot"` that shows when `showBadge` is true. ' +
        'Accepts all `IconButton` props; pass `aria-label`. Matches the Figma component (`showBadge` boolean, swappable icon).',
    ),
  },
} satisfies Meta<typeof MenuButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithBadge: Story = {
  name: 'showBadge',
  args: { showBadge: true },
};

/** AppNavbar.tsx */
export const Menu: Story = {
  args: { children: 'MenuRounded' as unknown as React.ReactNode, 'aria-label': 'menu' },
};

/** OptionsMenu.tsx */
export const Options: Story = {
  args: { children: 'MoreVertRounded' as unknown as React.ReactNode, 'aria-label': 'Open menu' },
};
