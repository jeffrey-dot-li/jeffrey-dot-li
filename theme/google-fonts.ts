const fallbacks
= {
  display: ['Segoe UI', 'Tahoma', 'Geneva', 'Verdana', 'sans-serif'],
  cursive: ['Brush Script MT', 'cursive'],
  serif: ['Times New Roman', 'Times', 'serif'],
  sans: ['Arial', 'Helvetica', 'sans-serif'],
  mono: ['Courier New', 'Courier', 'monospace'],
} as const;

export const googleFonts
= {
  'Open Sans': {
    name: 'Open Sans',
    fromGoogle: true,
    weights: [200, 300, 400, 500, 600, 700],
    roles: [],
    fallbacks: fallbacks.sans,
  },
  'Roboto': {
    name: 'Roboto',
    fromGoogle: true,
    weights: [],
    roles: [],
    fallbacks: fallbacks.sans,
  },
  'Oswald': {
    name: 'Oswald',
    fromGoogle: true,
    weights: [],
    roles: [],
    fallbacks: fallbacks.display,
  },
  'Inter': {
    name: 'Inter',
    fromGoogle: true,
    weights: [],
    roles: [],
    fallbacks: fallbacks.display,
  },
  'Krona One': {
    name: 'Krona One',
    fromGoogle: true,
    weights: [],
    roles: [],
    fallbacks: fallbacks.display,
  },
  'Expletus Sans': {
    name: 'Expletus Sans',
    fromGoogle: true,
    weights: [],
    roles: ['banner', 'display', 'accent'],
    fallbacks: fallbacks.display,
  },
  'Quicksand': {
    name: 'Quicksand',
    fromGoogle: true,
    weights: [],
    roles: ['content', 'round', 'sans-serif'],
    fallbacks: fallbacks.display,
  },
} as const;

export const localFonts
= {
  'Pesta Stencil': {
    name: 'Pesta Stencil',
    fromGoogle: false,
    weights: ['regular', 'bold'],
    roles: ['display', 'banner', 'round'],
    fallbacks: fallbacks.display,
  },
} as const;
