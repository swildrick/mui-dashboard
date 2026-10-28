# Design system

The design system for the dashboard template: one MUI theme built from tokens in `themePrimitives.ts` and component overrides in the customization files. Read this before changing any UI, styling or component code, together with `app/src/design-system.map.json`, which maps each Figma component to its code, Storybook stories, variants, props and tokens.

Paths below are relative to `docs/data/material/getting-started/templates/` unless they start with `app/`.

## Where things live

| What | File |
| --- | --- |
| Color scales, typography, shape, shadows, color schemes | `shared-theme/themePrimitives.ts` |
| Theme assembly (`createTheme`, `ThemeProvider`) | `shared-theme/AppTheme.tsx` |
| Core component overrides | `shared-theme/customizations/{inputs,dataDisplay,feedback,navigation,surfaces}` |
| MUI X overrides (charts, data grid, date pickers, tree view) | `dashboard/theme/customizations/` |
| Color mode controls | `shared-theme/ColorModeIconDropdown.tsx`, `shared-theme/ColorModeSelect.tsx` |
| Dashboard components | `dashboard/components/` |

Every `.tsx`/`.ts` file has a `.js` twin. Change both. `dashboard/theme/customizations/dataGrid` exists only as `.js`.

## Theme setup

`AppTheme` calls `createTheme` with:

- `cssVariables: { colorSchemeSelector: 'data-mui-color-scheme', cssVarPrefix: 'template' }`. Theme values are emitted as `--template-*` CSS variables.
- `colorSchemes` (light and dark), `typography`, `shadows`, `shape` from `themePrimitives`.
- `components`: the five core customization objects, then `themeComponents` passed in by the page. `Dashboard.tsx` passes the charts, data grid, date pickers and tree view customizations this way.

`Dashboard.tsx` renders `<CssBaseline enableColorScheme />` inside `AppTheme`. Color mode is read and set with `useColorScheme()` (`mode`, `systemMode`, `setMode`); the options are `system`, `light` and `dark`.

## Color tokens

Five scales, each with steps 50 to 900, exported from `themePrimitives.ts`:

| Scale | Hue | 50 | 400 | 900 |
| --- | --- | --- | --- | --- |
| `brand` | 210 (blue) | `hsl(210, 100%, 95%)` | `hsl(210, 98%, 48%)` | `hsl(210, 100%, 21%)` |
| `gray` | 220 | `hsl(220, 35%, 97%)` | `hsl(220, 20%, 65%)` | `hsl(220, 35%, 3%)` |
| `green` | 120 | `hsl(120, 80%, 98%)` | `hsl(120, 44%, 53%)` | `hsl(120, 87%, 6%)` |
| `orange` | 45 | `hsl(45, 100%, 97%)` | `hsl(45, 90%, 40%)` | `hsl(45, 93%, 12%)` |
| `red` | 0 | `hsl(0, 100%, 97%)` | `hsl(0, 90%, 40%)` | `hsl(0, 93%, 6%)` |

See the file for every step. `brand` does not get darker step by step: 600 (`hsl(210, 85.7%, 27.5%)`, `#0A4682`) is darker than 700, and 800 is darker than 900.

### Palette roles

| Role | Light | Dark |
| --- | --- | --- |
| `primary` light / main / dark / contrastText | brand 200 / 400 / 700 / 50 | brand 300 / 400 / 700 / 50 |
| `info` light / main / dark / contrastText | brand 100 / 300 / 600 / gray 50 | brand 500 / 700 / 900 / brand 300 |
| `warning` light / main / dark | orange 300 / 400 / 800 | orange 400 / 500 / 700 |
| `error` light / main / dark | red 300 / 400 / 800 | red 400 / 500 / 700 |
| `success` light / main / dark | green 300 / 400 / 800 | green 400 / 500 / 700 |
| `grey` | the `gray` scale | the `gray` scale |
| `divider` | `alpha(gray[300], 0.4)` | `alpha(gray[700], 0.6)` |
| `background.default` | `hsl(0, 0%, 99%)` | gray 900 |
| `background.paper` | `hsl(220, 35%, 97%)` | `hsl(220, 30%, 7%)` |
| `text.primary` | gray 800 | `hsl(0, 0%, 100%)` |
| `text.secondary` | gray 600 | gray 400 |
| `text.warning` | orange 400 | (not set) |
| `action.hover` | `alpha(gray[200], 0.2)` | `alpha(gray[600], 0.2)` |
| `action.selected` | `alpha(gray[200], 0.3)` | `alpha(gray[600], 0.3)` |
| `baseShadow` | two `hsla(220, …)` layers at 0.07 alpha | same layers at 0.7 / 0.8 alpha |

No `secondary` palette is defined. Button styles `color="secondary"` explicitly with `brand` values (see Components).

## Typography

Font family `Inter, sans-serif`. Sizes use `pxToRem`.

| Variant | Size | Weight | Line height |
| --- | --- | --- | --- |
| h1 | 48px | 600 | 1.2 (letter spacing -0.5) |
| h2 | 36px | 600 | 1.2 |
| h3 | 30px | default | 1.2 |
| h4 | 24px | 600 | 1.5 |
| h5 | 20px | 600 | default |
| h6 | 18px | 600 | default |
| subtitle1 | 18px | default | default |
| subtitle2 | 14px | 500 | default |
| body1 | 14px | default | default |
| body2 | 14px | 400 | default |
| caption | 12px | 400 | default |

body1 and body2 are both 14px. There is no 16px variant; for a 16px icon or text use `theme.typography.pxToRem(16)`.

Variants used in the dashboard: `h4` (page and navbar titles), `h6`, `subtitle2` (card titles), `body1`, `body2`, `caption`.

## Shape, spacing and shadows

- `shape.borderRadius`: 8.
- Spacing: MUI default (8px per unit). Use numbers in `sx` (`p: 1`, `gap: 1.5`) or `theme.spacing(n)` in `styled`.
- `shadows[0]` is `'none'`, `shadows[1]` is `var(--template-palette-baseShadow)`, the rest are MUI defaults.
- `insetHighlightShadow`: `inset 0 2px 5px rgba(255, 255, 255, 0.3)`, for small glossy surfaces such as the brand icon in `AppNavbar`.

## Components

Overrides change the defaults of these MUI components. Do not restyle them locally to get the same effect.

### Defaults

| Component | Default props |
| --- | --- |
| `ButtonBase` | `disableRipple`, `disableTouchRipple` (no ripple on any button) |
| `Checkbox` | `disableRipple`, custom rounded icons |
| `Chip` | `size: 'small'` |
| `Icon` | `fontSize: 'small'` |
| `Select` | `IconComponent`: `UnfoldMoreRoundedIcon` |
| `Link` | `underline: 'none'` |
| `Paper` | `elevation: 0` |
| `Accordion` | `elevation: 0`, `disableGutters` |

### Variants and sizes

- `Button`: `textTransform: 'none'`, no shadow, radius from `shape`. Sizes: small 2.25rem high, medium 2.5rem high.
  - `contained` + `primary`: dark gray gradient (gray 700 to 800) with white text; in dark mode a light gray gradient (gray 100 to 50) with black text.
  - `contained` + `secondary`: brand gradient (brand 400 to 500) with white text.
  - `outlined` (gray 200 border, translucent gray 50 fill) and `text` have a base style plus a separate `secondary` style each.
- `IconButton`: small 2.25rem square, medium 2.5rem square.
- Hover speed: `Button` and `IconButton` transition their colors, borders and shadow over `400ms ease-in`, set in their own overrides. `ButtonBase` also sets `all 400ms ease-in`, but components that define their own transition (Button, IconButton, ListItemButton, Checkbox) override it.
- `OutlinedInput`: small 2.25rem high, medium 2.5rem high.
- `Chip`: pill shape, 600-weight label. `color` `default` (gray), `success` and `error` have custom fills for light and dark.
- `Card`: padding 16, gap 16, 1px `divider` border, no shadow, background gray 50 (gray 800 in dark mode). `variant="outlined"` uses a white background (`alpha(gray[900], 0.4)` in dark mode). `CardContent`, `CardHeader` and `CardActions` have zero padding; the `Card` provides it.

Other overridden components: `List`, `ListItem`, `ListItemText`, `ListSubheader`, `ListItemIcon`, `TablePagination`, `Alert`, `Dialog`, `LinearProgress`, `ToggleButtonGroup`, `ToggleButton`, `InputBase`, `InputAdornment`, `FormLabel`, `MenuItem`, `Menu`, `Drawer`, `PaginationItem`, `Tabs`, `Tab`, `StepConnector`, `StepIcon`, `StepLabel`, `AccordionSummary`, `AccordionDetails`. MUI X: `ChartsAxis`, `ChartsTooltip`, `ChartsLegend`, `ChartsGrid`, `PickerPopper`, `PickersArrowSwitcher`, `PickersCalendarHeader`, `MonthCalendar`, `YearCalendar`, `PickerDay`, `TreeItem`, plus the data grid (`dataGrid.js`).

### Dashboard components

| Component | Role |
| --- | --- |
| `SideMenu` | Desktop permanent drawer, 240px wide: `SelectContent`, `MenuContent`, `CardAlert`, user row with `OptionsMenu` |
| `AppNavbar` | Mobile app bar (hidden from `md` up), brand icon, `ColorModeIconDropdown`, opens `SideMenuMobile` |
| `SideMenuMobile` | Mobile drawer. Props: `open`, `toggleDrawer` |
| `Header` | Breadcrumbs, `Search`, `CustomDatePicker`, notifications `MenuButton`, color mode toggle |
| `MainGrid` | Page body: `StatCard` row, `HighlightedCard`, charts, data grid, tree view, country chart |
| `StatCard` | Props: `title`, `value`, `interval`, `trend` (`'up' \| 'down' \| 'neutral'`), `data` (number[]) |
| `MenuButton` | `IconButton` in a `Badge`. Prop `showBadge`; pass `aria-label` |
| `SelectContent` | Company `Select` with avatar items |
| `MenuContent`, `OptionsMenu`, `NavbarBreadcrumbs`, `Search`, `CardAlert`, `HighlightedCard` | Fixed-content pieces of the shell |
| `SessionsChart`, `PageViewsBarChart`, `ChartUserByCountry` | MUI X charts |
| `CustomizedDataGrid`, `CustomizedTreeView`, `CustomDatePicker` | MUI X data grid, tree view, date picker |
| `internals/components/CustomIcons` | `SitemarkIcon` and flag icons (`IndiaFlag`, `UsaFlag`, `BrazilFlag`, `GlobeFlag`) |

Mock data lives in `dashboard/internals/data/gridData`.

## Usage rules

These follow how the existing code is written.

1. **Read colors through the theme.** In `sx` use palette paths (`color: 'text.secondary'`, `bgcolor: 'background.paper'`, `borderColor: 'divider'`). In `styled` and overrides use `(theme.vars || theme).palette.…` so CSS variables are used when available.
2. **Dark mode with `theme.applyStyles('dark', { … })`**, not by checking `theme.palette.mode` inside styles. (`StatCard` reads `theme.palette.mode` to pick its sparkline color in JS; that is the exception.)
3. **Need a raw scale step?** Import `gray`, `brand`, `green`, `orange` or `red` from `shared-theme/themePrimitives` instead of writing an HSL or hex value.
4. **Spacing in theme units.** `p: 1`, `gap: 2`, `theme.spacing(1.5)`. Borders as `border: 1` with a `borderColor`.
5. **Layout with `Stack` and `Grid`.** `Grid container spacing={2} columns={12}` with `size={{ xs: 12, md: 6 }}`-style breakpoints. Content max width is `{ sm: '100%', md: '1700px' }`.
6. **Cards:** `Card variant="outlined"` for dashboard tiles, with `CardContent` inside. Card titles are `Typography component="h2" variant="subtitle2"`.
7. **Charts take colors from `palette.primary`** (`light`, `main`, `dark`). Trend colors come from `success`, `error` and `grey`.
8. **Status chips:** `Chip` with `color` `success`, `error` or `default`; leave size at the small default.
9. **Import each component from its own path:** `import Box from '@mui/material/Box'`, `import { styled } from '@mui/material/styles'`, icons from `@mui/icons-material/<Name>Rounded`.
10. **Icon-only controls need an accessible name.** Pass `aria-label` to `MenuButton` and `IconButton`; for `Select` use `inputProps={{ 'aria-label': … }}`.
11. **New tokens go in `themePrimitives.ts`** (and its `.js` twin), then are imported where used.

## Known exceptions

These raw values exist today and are not tokens:

- `AppNavbar` brand icon gradient and border (`hsl(210, …)` values).
- `ChartUserByCountry` series colors (`hsl(220, 25%, …)` and `hsl(220, 20%, …)`).
- `internals/components/CustomIcons` logo and flag hex colors.
- `--template-frame-height` is read by `AppNavbar` and `SideMenu` with a `0px` fallback; nothing in this checkout defines it.

## Checking drift

After UI changes, run the ds-drift scan (see `CLAUDE.md`) and compare with the last report in `docs/ds-drift/`.
