// Links from stories to the Figma design system file.
export const FIGMA_FILE_URL =
  'https://www.figma.com/design/bkJTRjUSYRIpiB1AGq73an/MUI-Dashboard-Design-System-v9.5.0';

export const FIGMA_NODES = {
  Icons: '4:2',
  Button: '5:146',
  IconButton: '6:14',
  OutlinedInput: '6:31',
  Chip: '6:44',
  MenuButton: '7:5',
  Search: '7:11',
  StatCard: '7:53',
  Header: '8:3',
} as const;

export const FIGMA_VARIANTS = {
  Button: {
    'variant=contained, color=primary, size=medium, state=default': '5:14',
    'variant=contained, color=secondary, size=medium, state=default': '5:38',
    'variant=outlined, color=primary, size=medium, state=default': '5:62',
    'variant=outlined, color=secondary, size=medium, state=default': '5:86',
    'variant=text, color=primary, size=medium, state=default': '5:110',
    'variant=text, color=secondary, size=medium, state=default': '5:134',
  },
  IconButton: {
    'size=small, state=default': '6:2',
    'size=medium, state=default': '6:8',
  },
  OutlinedInput: {
    'size=small, state=default': '6:15',
    'size=medium, state=default': '6:23',
  },
  Chip: {
    'color=default, size=small': '6:32',
    'color=success, size=small': '6:36',
    'color=error, size=small': '6:40',
  },
  StatCard: {
    'trend=up': '7:17',
    'trend=down': '7:29',
    'trend=neutral': '7:41',
  },
} as const;

export function figmaUrl(nodeId: string) {
  return `${FIGMA_FILE_URL}?node-id=${nodeId.replace(':', '-')}`;
}

/** `parameters.design` for @storybook/addon-designs. */
export function figmaDesign(nodeId: string) {
  return { design: { type: 'figma' as const, url: figmaUrl(nodeId) } };
}

/** Markdown for a docs description: a link to the Figma node plus notes. */
export function figmaDocs(name: string, nodeId: string, notes = '') {
  return {
    docs: {
      description: {
        component: `[Open ${name} in Figma](${figmaUrl(nodeId)})${notes ? `\n\n${notes}` : ''}`,
      },
    },
  };
}
