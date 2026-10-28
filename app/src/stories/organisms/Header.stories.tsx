import type { Meta, StoryObj } from '@storybook/react-vite';
import Box from '@mui/material/Box';
import Header from '@templates/dashboard/components/Header';
import { FIGMA_NODES, figmaDesign, figmaDocs } from '../figma';

const meta = {
  title: 'Organisms/Header',
  component: Header,
  decorators: [
    (Story) => (
      <Box sx={{ px: 3, pb: 2, bgcolor: 'background.default' }}>
        <Story />
      </Box>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
    ...figmaDesign(FIGMA_NODES.Header),
    ...figmaDocs(
      'Header',
      FIGMA_NODES.Header,
      '`dashboard/components/Header.tsx`: `NavbarBreadcrumbs` on the left; `Search`, `CustomDatePicker`, `MenuButton showBadge` and `ColorModeIconDropdown` on the right. No props. ' +
        'Hidden below the `md` breakpoint (900px), so widen the window if the story is empty.\n\n' +
        '**Differs from Figma:** `CustomDatePicker` and `ColorModeIconDropdown` are static buttons in Figma; in code they open a date picker and a System / Light / Dark menu. ' +
        'The color-mode menu and the toolbar color-scheme toggle control the same setting.',
    ),
  },
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
