const fallbacks
= {
  display: ['Segoe UI', 'Tahoma', 'Geneva', 'Verdana', 'sans-serif'],
  cursive: ['Brush Script MT', 'cursive'],
  serif: ['Times New Roman', 'Times', 'serif'],
  sans: ['Arial', 'Helvetica', 'sans-serif'],
  mono: ['Courier New', 'Courier', 'monospace'],
} as const;

const googleFonts
= {
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

const localFonts
= {
  'Pesta Stencil': {
    name: 'Pesta Stencil',
    fromGoogle: false,
    weights: ['regular', 'bold'],
    roles: ['display', 'banner', 'round'],
    fallbacks: fallbacks.display,
  },
};

export const projectFonts
= {
  content: googleFonts.Quicksand,
  banner: localFonts['Pesta Stencil'],
} as const;

const replaceSpaces = (s: string, c = ''): string => s.replace(/\s+/g, c);

const googleFontsLink = `${Object.values(projectFonts).filter(v => v.fromGoogle).reduce(
  (prev, current) => `${prev}family=${replaceSpaces(current.name, '+')}&`,
  'https://fonts.googleapis.com/css2?',
)}display=swap`;

export default googleFontsLink;

export const FontFamilyReference = Object.fromEntries(Object.entries(projectFonts).map(([k, v]) => [k, [v.name, ...v.fallbacks]]));
