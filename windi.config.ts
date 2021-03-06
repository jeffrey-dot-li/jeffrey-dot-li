
import { defineConfig } from 'vite-plugin-windicss';
import typography from 'windicss/plugin/typography';
import { themeHSL } from './theme/colors';
import { fontFamily, colors } from './theme/theme';

export default defineConfig({
  darkMode: 'class',
  plugins: [
    typography(),
  ],
  attributify: true,
  theme: {
    extend: {
      fontFamily,
      colors,
      typography: {
        verse:
        {
          css:
          {
            width: 'max-content',
          },
        },
        DEFAULT: {
          css: {
            maxWidth: '65ch',
            color: 'inherit',
            a: {
              'color': 'inherit',
              'opacity': 0.75,
              'fontWeight': '500',
              'textDecoration': 'none',
              '&:hover': {
                opacity: 1,
                color: themeHSL.bloom.palette[100],
              },
            },
            b: { color: 'inherit' },
            strong: { color: 'inherit' },
            em: { color: 'inherit' },
            h1: { 'color': 'inherit', 'font-weight': 'normal' },
            h2: { color: 'inherit' },
            h3: { color: 'inherit' },
            h4: { color: 'inherit' },
            code: { color: 'inherit' },
          },
        },
      },
    },
  },
});
