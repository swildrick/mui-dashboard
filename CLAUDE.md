# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Design system: read first

Before changing anything that touches UI, styling, theme, colors, spacing, typography or components, read [app/src/design-system.md](app/src/design-system.md) and follow it. It lists the real tokens, component overrides and usage rules. After the change, run the ds-drift scan (below) and check that no new findings appeared.

Storybook (`app/src/stories/`) documents the same system: one story file per component in the Figma file, each linked to its Figma node, plus a tokens page. When a component's variants, props or styles change, update its story. When Storybook is running, the `storybook` MCP server (`.mcp.json`) exposes its docs and stories.

## Project overview

The MUI Dashboard template (v9.5.0) as a standalone repo, published to GitHub Pages (dashboard at the site root, Storybook at `/storybook/`). The template code started as a sparse checkout of [mui/material-ui](https://github.com/mui/material-ui) at tag `v9.5.0` and keeps MUI's paths:

- `docs/data/material/getting-started/templates/dashboard`: the Dashboard template (React, Material UI, MUI X).
- `docs/data/material/getting-started/templates/shared-theme`: the theme it is built on.

The original MUI checkout is still in this git repo as the local branch `v9.5.0-local` (remote `upstream`, `https://github.com/mui/material-ui.git`); `main` has its own history. The other root files from that checkout (`package.json`, `AGENTS.md`, lint configs, `pnpm-*`) belong to the full MUI monorepo, are not tracked here (the root `.gitignore` is an allowlist) and should be ignored. Do not run `pnpm` or the monorepo scripts.

`app/` is the Vite app that renders the template and holds Storybook. `.claude/` and `.mcp.json` are local only.

## Commands

Run from the repo root.

```bash
npm --prefix app run dev          # dev server (port 5173, or the next free one)
npm --prefix app run build        # production build
npm --prefix app run storybook    # Storybook on http://localhost:6007 (MCP at /mcp)
npm --prefix app run build-storybook  # static Storybook in app/storybook-static
npx --prefix app tsc -p app/tsconfig.json --noEmit   # type-check app and template sources
```

The type-check reports errors for `@mui/x-data-grid-pro` and `@mui/x-date-pickers-pro` imports and for `dashboard/theme/customizations/dataGrid` (JS only). Those packages are not installed; treat any other error as real.

Design system drift report (writes to `docs/ds-drift/`, config in `ds-drift.config.json`):

```bash
"$HOME/.claude/skills/ds-drift/node_modules/.bin/tsx" "$HOME/.claude/skills/ds-drift/scripts/cli.ts" scan --root "$PWD"
```

Deploy: every push to `main` runs `.github/workflows/pages.yml`, which builds with `BASE_PATH=/<repo>/` (read by `app/vite.config.ts`) and Storybook into `app/dist/storybook`, then publishes to GitHub Pages.

## Architecture

- `app/src/main.tsx` renders `Dashboard` from `@templates/dashboard/Dashboard`. `app/vite.config.ts` maps `@templates` to the templates folder, prefers `.tsx`/`.ts` over the `.js` twins, and dedupes React, Emotion and MUI so the template resolves them from `app/node_modules`. `app/tsconfig.json` does the same mapping for TypeScript.
- `dashboard/Dashboard.tsx` wraps the page in `AppTheme` and passes the MUI X customizations (charts, data grid, date pickers, tree view) as `themeComponents`.
- `shared-theme/AppTheme.tsx` builds the theme with CSS variables (`--template-*`), light and dark color schemes from `themePrimitives.ts`, and the core component overrides in `shared-theme/customizations/`.
- Page layout: `SideMenu` (desktop drawer) or `AppNavbar` + `SideMenuMobile` (below `md`), then `Header` and `MainGrid`. `MainGrid` holds the stat cards, charts, data grid and tree view.
- Mock data is in `dashboard/internals/data/gridData`.
- Storybook config is in `app/.storybook/`: `preview.tsx` wraps every story in `AppTheme` (same setup as `Dashboard.tsx`) with a light/dark toolbar toggle. Stories import components from `@templates/...`; Figma node links live in `app/src/stories/figma.ts` (file `bkJTRjUSYRIpiB1AGq73an`).

Versions in `app/`: `@mui/material` and `@mui/icons-material` 9.5.0, `@mui/x-*` 9.14.0, React 19, Vite 8.

## Conventions

- Every template file exists as `.tsx`/`.ts` and as a `.js` twin with the same code minus types. Edit both. `dashboard/theme/customizations/dataGrid` exists only as `.js`.
- Import each MUI component from its own path (`@mui/material/Box`), icons from `@mui/icons-material/<Name>Rounded`.
- Style with `sx` or `styled`, using theme tokens; see the design system doc.
- Match the existing code style: 2-space indent, single quotes, trailing commas. (The repo's Prettier config comes from `@mui/internal-code-infra`, which is not installed here.)
- `docs/ds-drift/` and `ds-drift.config.json` are local reports and config, not part of upstream.
