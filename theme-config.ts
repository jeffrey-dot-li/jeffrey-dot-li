import { googleFonts, localFonts } from './theme/google-fonts';
export const projectFonts
= {
  content: googleFonts.Quicksand,
  banner: localFonts['Pesta Stencil'],
  title: googleFonts.Oswald,
  display: googleFonts['Baloo Da'],
} as const;

// Custom project theme colors.
export const projectColors: {[name: string]: string } = {

} as const;
