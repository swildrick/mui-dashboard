import type { Meta, StoryObj } from '@storybook/react-vite';
import Search from '@templates/dashboard/components/Search';
import { FIGMA_NODES, figmaDesign, figmaDocs } from '../figma';

const meta = {
  title: 'Molecules/Search',
  component: Search,
  parameters: {
    ...figmaDesign(FIGMA_NODES.Search),
    ...figmaDocs(
      'Search',
      FIGMA_NODES.Search,
      '`dashboard/components/Search.tsx`: `FormControl` with `OutlinedInput size="small"`, placeholder "Search…", a `SearchRounded` start adornment colored `text.primary`, and `aria-label="search"`. No props.\n\n' +
        '**Differs from Figma:** the code width is `25ch` from `md` up and 100% below; Figma uses a fixed 220px. The focused state exists in code but not in Figma.',
    ),
  },
} satisfies Meta<typeof Search>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Focused: Story = {
  name: 'Focused (not in Figma)',
  play: async ({ canvasElement }) => {
    canvasElement.querySelector('input')?.focus();
  },
};
