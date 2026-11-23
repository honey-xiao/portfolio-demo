import { IBM_Plex_Mono, Pixelify_Sans, Space_Grotesk, VT323 } from "next/font/google";

/*
 * Site fonts. Imported by the root layout (and later by Storybook's preview).
 * Each font exposes a CSS variable; globals.css maps them to the font tokens.
 * Space Grotesk and VT323 have no Cyrillic on Google Fonts, so they load Latin only.
 * JetBrains Mono (decorative, old cmd.exe lines) is intentionally not a token.
 */

/** Pixel headings and the big "Portfolio" title. Token: font-pixel */
export const pixelify = Pixelify_Sans({
  subsets: ["latin", "latin-ext", "cyrillic"],
  variable: "--font-pixelify",
  display: "swap",
});

/** Readable text: positioning, descriptions, buttons. Token: font-sans */
export const spaceGrotesk = Space_Grotesk({
  subsets: ["latin", "latin-ext"],
  variable: "--font-space-grotesk",
  display: "swap",
});

/** Monospace captions: byline, project paths. Token: font-mono */
export const plexMono = IBM_Plex_Mono({
  subsets: ["latin", "latin-ext", "cyrillic"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
  display: "swap",
});

/** Terminal window title. Token: font-terminal */
export const vt323 = VT323({
  subsets: ["latin", "latin-ext"],
  weight: "400",
  variable: "--font-vt323",
  display: "swap",
});

/** All font variables, for the className of <html> (or a Storybook decorator). */
export const fontVariables = [pixelify, spaceGrotesk, plexMono, vt323]
  .map((font) => font.variable)
  .join(" ");
