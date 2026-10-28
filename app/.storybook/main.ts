import type { StorybookConfig } from '@storybook/react-vite';

// Storybook reuses app/vite.config.ts, so the @templates alias, the .tsx-first
// resolution and the MUI dedupe apply to stories too.
const config: StorybookConfig = {
  stories: ['../src/stories/**/*.mdx', '../src/stories/**/*.stories.@(ts|tsx)'],
  addons: [
    '@storybook/addon-docs',
    '@storybook/addon-designs',
    'storybook-addon-pseudo-states',
    '@storybook/addon-mcp',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  features: {
    // Needed by the Storybook MCP docs tools.
    componentsManifest: true,
  },
};

export default config;
