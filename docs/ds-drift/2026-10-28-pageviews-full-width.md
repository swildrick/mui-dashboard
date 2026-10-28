# Design system drift report

**MUI dashboard template (v9.5.0)** against `@mui/material`, 2026-10-28.
Scope: whole codebase (37 code files, 0 style files).

## Summary

| Alignment score | Gate | Design system adoption | Findings |
| --- | --- | --- | --- |
| 98 / 100 | review | 97% (28 of 29 UI files) | 17 (0 fail, 17 review) |

Compared with 2026-10-28-sessions-full-width (`2026-10-28-sessions-full-width.json`): score 0, 0 new, 0 fixed, 17 unchanged.

The gate is the worst result across dimensions, not the average: one invented component fails the gate even if everything else is clean.

## By dimension

| Dimension | Score | Gate | Findings | Files checked | Change |
| --- | --- | --- | --- | --- | --- |
| Imports | 100 | pass | 0 | 36 | 0 |
| API fidelity | 100 | pass | 0 | 35 | 0 |
| Token discipline | 94 | review | 14 | 22 | 0 |
| Accessibility (static) | 98 | review | 3 | 29 | 0 |

## Hotspots

| File | Findings |
| --- | --- |
| `docs/data/material/getting-started/templates/dashboard/components/CustomizedTreeView.tsx` | 3 |
| `docs/data/material/getting-started/templates/dashboard/components/SideMenu.tsx` | 3 |
| `docs/data/material/getting-started/templates/dashboard/internals/data/gridData.tsx` | 3 |
| `docs/data/material/getting-started/templates/dashboard/components/AppNavbar.tsx` | 1 |
| `docs/data/material/getting-started/templates/dashboard/components/ChartUserByCountry.tsx` | 1 |
| `docs/data/material/getting-started/templates/dashboard/components/Header.tsx` | 1 |
| `docs/data/material/getting-started/templates/dashboard/components/HighlightedCard.tsx` | 1 |
| `docs/data/material/getting-started/templates/dashboard/components/MainGrid.tsx` | 1 |
| `docs/data/material/getting-started/templates/dashboard/components/MenuButton.tsx` | 1 |
| `docs/data/material/getting-started/templates/dashboard/components/SelectContent.tsx` | 1 |

## UI files that do not use the design system

- `docs/data/material/getting-started/templates/dashboard/components/CustomizedDataGrid.tsx`

## Findings

### Hardcoded size (14, review)

A raw px/rem value instead of a spacing or sizing token.

| Where | Detail | Suggested fix |
| --- | --- | --- |
| `docs/data/material/getting-started/templates/dashboard/components/AppNavbar.tsx:49` | `top=var(--template-frame-height, 0px)` | Use a design system spacing/sizing token instead of a raw value for 'top'. |
| `docs/data/material/getting-started/templates/dashboard/components/ChartUserByCountry.tsx:128` | `gap=8px` | Use a design system spacing/sizing token instead of a raw value for 'gap'. |
| `docs/data/material/getting-started/templates/dashboard/components/CustomizedTreeView.tsx:183` | `gap=8px` | Use a design system spacing/sizing token instead of a raw value for 'gap'. |
| `docs/data/material/getting-started/templates/dashboard/components/CustomizedTreeView.tsx:196` | `m=0 -8px` | Use a design system spacing/sizing token instead of a raw value for 'm'. |
| `docs/data/material/getting-started/templates/dashboard/components/CustomizedTreeView.tsx:197` | `pb=8px` | Use a design system spacing/sizing token instead of a raw value for 'pb'. |
| `docs/data/material/getting-started/templates/dashboard/components/Header.tsx:19` | `md=1700px` | Use a design system spacing/sizing token instead of a raw value for 'md'. |
| `docs/data/material/getting-started/templates/dashboard/components/HighlightedCard.tsx:26` | `mb=8px` | Use a design system spacing/sizing token instead of a raw value for 'mb'. |
| `docs/data/material/getting-started/templates/dashboard/components/MainGrid.tsx:49` | `md=1700px` | Use a design system spacing/sizing token instead of a raw value for 'md'. |
| `docs/data/material/getting-started/templates/dashboard/components/SideMenu.tsx:40` | `mt=calc(var(--template-frame-height, 0px) + 4px)` | Use a design system spacing/sizing token instead of a raw value for 'mt'. |
| `docs/data/material/getting-started/templates/dashboard/components/SideMenu.tsx:64` | `borderTop=1px solid` | Use a design system spacing/sizing token instead of a raw value for 'borderTop'. |
| `docs/data/material/getting-started/templates/dashboard/components/SideMenu.tsx:75` | `lineHeight=16px` | Use a design system spacing/sizing token instead of a raw value for 'lineHeight'. |
| `docs/data/material/getting-started/templates/dashboard/internals/data/gridData.tsx:70` | `width=24px` | Use a design system spacing/sizing token instead of a raw value for 'width'. |
| `docs/data/material/getting-started/templates/dashboard/internals/data/gridData.tsx:71` | `height=24px` | Use a design system spacing/sizing token instead of a raw value for 'height'. |
| `docs/data/material/getting-started/templates/dashboard/internals/data/gridData.tsx:72` | `fontSize=0.85rem` | Use a design system spacing/sizing token instead of a raw value for 'fontSize'. |

### Control without an accessible name (3, review)

Screen readers cannot announce it. Add a label or aria-label.

| Where | Detail | Suggested fix |
| --- | --- | --- |
| `docs/data/material/getting-started/templates/dashboard/components/MenuButton.tsx:19` | `IconButton` | Associate a <label htmlFor> / aria-label, or put the control inside FormField. |
| `docs/data/material/getting-started/templates/dashboard/components/SelectContent.tsx:37` | `Select` | Associate a <label htmlFor> / aria-label, or put the control inside FormField. |
| `docs/data/material/getting-started/templates/shared-theme/ColorModeSelect.tsx:11` | `Select` | Associate a <label htmlFor> / aria-label, or put the control inside FormField. |

## How this was measured

Static checks only, no model calls: imports, API fidelity (components and props against the real exports of the design system package), token discipline (hardcoded colors and sizes) and static accessibility. Checks are adapted from [open-design-system-bench](https://github.com/christophhdesign/open-design-system-bench) (MIT). A dimension that could not be measured shows n/a and is left out of the score, never counted as a pass.
