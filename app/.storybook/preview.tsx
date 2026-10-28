import * as React from 'react';
import type { Decorator, Preview } from '@storybook/react-vite';
import CssBaseline from '@mui/material/CssBaseline';
import { useColorScheme } from '@mui/material/styles';
import AppTheme from '@templates/shared-theme/AppTheme';
import {
  chartsCustomizations,
  dataGridCustomizations,
  datePickersCustomizations,
  treeViewCustomizations,
} from '@templates/dashboard/theme/customizations';

// Same theme setup as dashboard/Dashboard.tsx.
const xThemeComponents = {
  ...chartsCustomizations,
  ...dataGridCustomizations,
  ...datePickersCustomizations,
  ...treeViewCustomizations,
};

function ColorSchemeSync({ mode }: { mode: 'light' | 'dark' }) {
  const { setMode } = useColorScheme();
  React.useEffect(() => {
    setMode(mode);
  }, [mode, setMode]);
  return null;
}

const withAppTheme: Decorator = (Story, context) => (
  <AppTheme themeComponents={xThemeComponents}>
    <CssBaseline enableColorScheme />
    <ColorSchemeSync mode={context.globals.colorScheme ?? 'light'} />
    <Story />
  </AppTheme>
);

const preview: Preview = {
  decorators: [withAppTheme],
  globalTypes: {
    colorScheme: {
      description: 'MUI color scheme (colorSchemes in themePrimitives.ts)',
      toolbar: {
        title: 'Color scheme',
        icon: 'mirror',
        items: [
          { value: 'light', title: 'Light' },
          { value: 'dark', title: 'Dark' },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: {
    colorScheme: 'light',
  },
  parameters: {
    layout: 'centered',
    controls: { expanded: true },
    options: {
      storySort: {
        order: ['Foundations', ['Tokens', 'Icons'], 'Atoms', 'Molecules', 'Organisms'],
      },
    },
  },
  tags: ['autodocs'],
};

export default preview;
