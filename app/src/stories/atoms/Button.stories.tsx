import type { Meta, StoryObj } from '@storybook/react-vite';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import CalendarTodayRoundedIcon from '@mui/icons-material/CalendarTodayRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import { FIGMA_NODES, FIGMA_VARIANTS, figmaDesign, figmaDocs } from '../figma';

// Icons the template passes to Button.
const icons = {
  none: undefined,
  CalendarTodayRounded: <CalendarTodayRoundedIcon fontSize="small" />,
  ChevronRightRounded: <ChevronRightRoundedIcon />,
  LogoutRounded: <LogoutRoundedIcon />,
};

const variants = ['contained', 'outlined', 'text'] as const;
const colors = ['primary', 'secondary'] as const;
const sizes = ['small', 'medium'] as const;

const meta = {
  title: 'Atoms/Button',
  component: Button,
  args: {
    children: 'Button',
    variant: 'contained',
    color: 'primary',
    size: 'medium',
    disabled: false,
    fullWidth: false,
  },
  argTypes: {
    variant: { control: 'inline-radio', options: variants },
    color: { control: 'inline-radio', options: colors },
    size: { control: 'inline-radio', options: sizes },
    startIcon: { control: 'select', options: Object.keys(icons), mapping: icons },
    endIcon: { control: 'select', options: Object.keys(icons), mapping: icons },
  },
  parameters: {
    ...figmaDesign(FIGMA_NODES.Button),
    ...figmaDocs(
      'Button',
      FIGMA_NODES.Button,
      'MUI `Button` with the overrides in `shared-theme/customizations/inputs.tsx`. ' +
        'The theme styles `contained`, `outlined` and `text` in `primary` and `secondary`, at `small` (2.25rem) and `medium` (2.5rem). ' +
        'Other colors and `size="large"` are not styled by the theme and are left out.\n\n' +
        '**Differs from Figma:** Figma has a `state=hover` variant (code: CSS `:hover`, shown here with pseudo-states) and `startIcon visible` / `endIcon visible` booleans (code: passing the icon shows it). ' +
        'The code also has inset box shadows on contained buttons, `fullWidth` and `disabled`, which Figma does not model.',
    ),
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

function Grid({ size }: { size: (typeof sizes)[number] }) {
  return (
    <Stack spacing={2}>
      {variants.map((variant) => (
        <Stack key={variant} direction="row" spacing={2} sx={{ alignItems: 'center' }}>
          <Typography variant="caption" sx={{ width: 72, color: 'text.secondary' }}>
            {variant}
          </Typography>
          {colors.map((color) => (
            <Button key={color} variant={variant} color={color} size={size}>
              {color}
            </Button>
          ))}
        </Stack>
      ))}
    </Stack>
  );
}

export const AllVariantsSmall: Story = {
  name: 'All variants (small)',
  render: () => <Grid size="small" />,
};

export const AllVariantsMedium: Story = {
  name: 'All variants (medium)',
  render: () => <Grid size="medium" />,
};

const v = FIGMA_VARIANTS.Button;

export const ContainedPrimary: Story = {
  args: { variant: 'contained', color: 'primary' },
  parameters: figmaDesign(v['variant=contained, color=primary, size=medium, state=default']),
};

export const ContainedSecondary: Story = {
  args: { variant: 'contained', color: 'secondary' },
  parameters: figmaDesign(v['variant=contained, color=secondary, size=medium, state=default']),
};

export const OutlinedPrimary: Story = {
  args: { variant: 'outlined', color: 'primary' },
  parameters: figmaDesign(v['variant=outlined, color=primary, size=medium, state=default']),
};

export const OutlinedSecondary: Story = {
  args: { variant: 'outlined', color: 'secondary' },
  parameters: figmaDesign(v['variant=outlined, color=secondary, size=medium, state=default']),
};

export const TextPrimary: Story = {
  args: { variant: 'text', color: 'primary' },
  parameters: figmaDesign(v['variant=text, color=primary, size=medium, state=default']),
};

export const TextSecondary: Story = {
  args: { variant: 'text', color: 'secondary' },
  parameters: figmaDesign(v['variant=text, color=secondary, size=medium, state=default']),
};

export const WithIcons: Story = {
  name: 'With startIcon / endIcon',
  render: () => (
    <Stack direction="row" spacing={2}>
      {/* CustomDatePicker.tsx */}
      <Button variant="outlined" size="small" startIcon={<CalendarTodayRoundedIcon fontSize="small" />}>
        Apr 17, 2023
      </Button>
      {/* HighlightedCard.tsx */}
      <Button variant="contained" size="small" color="primary" endIcon={<ChevronRightRoundedIcon />}>
        Get insights
      </Button>
    </Stack>
  ),
};

export const Hover: Story = {
  render: () => <Grid size="medium" />,
  parameters: { pseudo: { hover: true } },
};

export const Disabled: Story = {
  name: 'Disabled (not in Figma)',
  render: () => (
    <Stack direction="row" spacing={2}>
      {variants.map((variant) => (
        <Button key={variant} variant={variant} disabled>
          {variant}
        </Button>
      ))}
    </Stack>
  ),
  parameters: {
    docs: {
      description: {
        story: 'The theme does not override disabled styles, so these use MUI defaults. No Figma variant exists.',
      },
    },
  },
};
