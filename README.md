# MUI Dashboard

The [Material UI Dashboard template](https://mui.com/material-ui/getting-started/templates/dashboard/) (v9.5.0) running as a standalone Vite app, with a Storybook that documents its design system and links each component to Figma.

- **Live dashboard:** https://swildrick.github.io/mui-dashboard/
- **Storybook:** https://swildrick.github.io/mui-dashboard/storybook/

## What's here

| Path | What it is |
| --- | --- |
| `docs/data/material/getting-started/templates/dashboard` | The Dashboard template from mui/material-ui `v9.5.0`, with a few design-system fixes |
| `docs/data/material/getting-started/templates/shared-theme` | The theme it uses (`themePrimitives.ts`, component customizations) |
| `app/` | Vite app that renders the template, plus Storybook (`app/.storybook`, `app/src/stories`) |
| `app/src/design-system.md` | Tokens, components and usage rules |
| `docs/ds-drift/` | Design-system drift reports |

The template keeps MUI's folder layout so it can be compared with upstream.

## Run locally

Requires Node 20.19 or newer.

```bash
npm --prefix app ci
npm --prefix app run dev          # dashboard on http://localhost:5173
npm --prefix app run storybook    # Storybook on http://localhost:6007
```

## Deploy

Every push to `main` builds the dashboard and Storybook and publishes them to GitHub Pages (`.github/workflows/pages.yml`).

## License

The template code is from [mui/material-ui](https://github.com/mui/material-ui) and is MIT licensed; see [LICENSE](LICENSE).
