import * as React from 'react';
import {
  colorSchemes,
  typography,
  shape,
  shadows,
  insetHighlightShadow,
} from '@templates/shared-theme/themePrimitives';

// Plain HTML (no MUI) because MDX docs pages are not wrapped in the story decorators.

const cell: React.CSSProperties = { padding: '6px 12px', borderBottom: '1px solid #e5e7eb', verticalAlign: 'middle', fontSize: 13 };
const mono: React.CSSProperties = { fontFamily: 'ui-monospace, Menlo, monospace', fontSize: 12 };

function Swatch({ color }: { color: string }) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
      <span style={{ width: 32, height: 20, borderRadius: 4, background: color, border: '1px solid rgba(0,0,0,0.12)', display: 'inline-block' }} />
      <span style={mono}>{color}</span>
    </span>
  );
}

type Palette = Record<string, unknown>;

function flatten(palette: Palette, prefix = ''): Record<string, string> {
  const out: Record<string, string> = {};
  for (const [key, value] of Object.entries(palette)) {
    if (key === 'grey') continue; // identical to the gray scale
    const path = prefix ? `${prefix}.${key}` : key;
    if (typeof value === 'string') out[path] = value;
    else if (value && typeof value === 'object') Object.assign(out, flatten(value as Palette, path));
  }
  return out;
}

/** palette roles from colorSchemes, light and dark side by side. */
export function PaletteTable() {
  const light = flatten(colorSchemes.light.palette as Palette);
  const dark = flatten(colorSchemes.dark.palette as Palette);
  const keys = Array.from(new Set([...Object.keys(light), ...Object.keys(dark)])).filter((k) => k !== 'baseShadow');
  return (
    <table style={{ borderCollapse: 'collapse', width: '100%' }}>
      <thead>
        <tr>
          <th style={{ ...cell, textAlign: 'left' }}>palette.*</th>
          <th style={{ ...cell, textAlign: 'left' }}>light</th>
          <th style={{ ...cell, textAlign: 'left' }}>dark</th>
        </tr>
      </thead>
      <tbody>
        {keys.map((k) => (
          <tr key={k}>
            <td style={{ ...cell, ...mono }}>{k}</td>
            <td style={cell}>{light[k] ? <Swatch color={light[k]} /> : '(not set)'}</td>
            <td style={cell}>{dark[k] ? <Swatch color={dark[k]} /> : '(not set)'}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

const variants = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'subtitle1', 'subtitle2', 'body1', 'body2', 'caption'] as const;

/** typography variants exactly as set in themePrimitives.ts. */
export function TypographyTable() {
  return (
    <table style={{ borderCollapse: 'collapse', width: '100%' }}>
      <tbody>
        {variants.map((v) => {
          const style = typography[v] as React.CSSProperties;
          return (
            <tr key={v}>
              <td style={{ ...cell, ...mono, width: 120 }}>{v}</td>
              <td style={{ ...cell, ...mono, width: 240, color: '#6b7280' }}>
                {Object.entries(style).map(([prop, val]) => `${prop}: ${val}`).join(', ')}
              </td>
              <td style={cell}>
                <span style={{ fontFamily: typography.fontFamily, ...style }}>The quick brown fox</span>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

// theme.spacing steps used in the dashboard template; MUI's default unit is 8px.
const spacingSteps = [0.25, 0.5, 1, 1.5, 2, 3, 5];

export function SpacingTable() {
  return (
    <table style={{ borderCollapse: 'collapse' }}>
      <tbody>
        {spacingSteps.map((n) => (
          <tr key={n}>
            <td style={{ ...cell, ...mono, width: 160 }}>theme.spacing({n})</td>
            <td style={{ ...cell, ...mono, width: 60 }}>{n * 8}px</td>
            <td style={cell}>
              <span style={{ display: 'inline-block', height: 12, width: n * 8, background: '#3b82f6', borderRadius: 2 }} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export function ShapeAndShadows() {
  const box = (extra: React.CSSProperties): React.CSSProperties => ({
    width: 120, height: 72, borderRadius: shape.borderRadius, background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, ...extra,
  });
  return (
    <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
      <figure style={{ margin: 0 }}>
        <div style={box({ border: '1px solid #d1d5db' })}>{shape.borderRadius}px</div>
        <figcaption style={{ ...mono, marginTop: 8 }}>shape.borderRadius</figcaption>
      </figure>
      <figure style={{ margin: 0 }}>
        <div style={box({ boxShadow: colorSchemes.light.palette.baseShadow })}>light</div>
        <figcaption style={{ ...mono, marginTop: 8 }}>palette.baseShadow (light)</figcaption>
      </figure>
      <figure style={{ margin: 0, padding: 12, background: '#0b0d12', borderRadius: 8 }}>
        <div style={box({ background: 'hsl(220, 30%, 7%)', color: '#fff', boxShadow: colorSchemes.dark.palette.baseShadow })}>dark</div>
        <figcaption style={{ ...mono, marginTop: 8, color: '#9ca3af' }}>palette.baseShadow (dark)</figcaption>
      </figure>
      <figure style={{ margin: 0 }}>
        <div style={box({ background: 'hsl(210, 98%, 48%)', color: '#fff', boxShadow: insetHighlightShadow })}>inset</div>
        <figcaption style={{ ...mono, marginTop: 8 }}>insetHighlightShadow</figcaption>
      </figure>
      <figure style={{ margin: 0 }}>
        <div style={box({ border: '1px dashed #d1d5db', ...mono })}>{String(shadows[1])}</div>
        <figcaption style={{ ...mono, marginTop: 8 }}>shadows[1]</figcaption>
      </figure>
    </div>
  );
}
