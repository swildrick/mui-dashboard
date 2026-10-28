import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const workspaceRoot = fileURLToPath(new URL('..', import.meta.url));
const templates = fileURLToPath(
  new URL('../docs/data/material/getting-started/templates', import.meta.url),
);

// The template sources live outside this app (in the sparse checkout), so
// force their bare imports to resolve from this app's node_modules.
const dedupe = [
  'react',
  'react-dom',
  '@emotion/react',
  '@emotion/styled',
  '@mui/material',
  '@mui/icons-material',
  '@mui/x-charts',
  '@mui/x-data-grid',
  '@mui/x-date-pickers',
  '@mui/x-tree-view',
  '@react-spring/web',
  'clsx',
  'dayjs',
  'prop-types',
];

export default defineConfig({
  // GitHub Pages serves the site under /<repo>/; the deploy workflow sets BASE_PATH.
  base: process.env.BASE_PATH ?? '/',
  plugins: [react()],
  resolve: {
    alias: { '@templates': templates },
    // Each template file ships as both .tsx and .js (with JSX); use the TS sources.
    extensions: ['.tsx', '.ts', '.mjs', '.js', '.jsx', '.json'],
    dedupe,
  },
  optimizeDeps: { include: dedupe },
  server: { port: 5173, fs: { allow: [workspaceRoot] } },
});
