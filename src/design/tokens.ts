/**
 * IT — Italian Trattoria · Design Tokens
 *
 * Derived from Phase 1 research:
 * - R2: keep the existing green "IT" monogram as primary equity
 * - R3: regional-Italy story spine — color must support map regions
 * - R4: cream-and-charcoal as dominant chrome (Don Angie / Via Carota DNA)
 * - R5: editorial discipline — sparing color, photography carries warmth
 *
 * Calabrian DNA palette:
 *   monogram green   — primary brand (existing equity)
 *   peperoncino      — vermilion red, Calabria's signature pepper
 *   bergamot         — mustard yellow, Calabrian citrus
 *   ionian           — sea green-blue, Calabrian coast
 *   olive            — supporting neutral
 *
 * Chrome:
 *   carta            — warm cream (page background)
 *   caffè            — deep charcoal (text + dominant)
 *   inchiostro       — true black (rare, hero type)
 */

export const palette = {
  // Brand equity
  monogram: '#1F4D2E',       // existing IT logo green, deepened for digital contrast
  monogramSoft: '#2E6B45',   // hover / softer variant
  monogramTint: '#E8EFE9',   // tinted background

  // Calabrian accents (used sparingly)
  peperoncino: '#C8362B',
  peperoncinoSoft: '#E76A60',
  bergamot: '#E8B23A',
  bergamotSoft: '#F2CD78',
  ionian: '#1F4E55',
  ionianSoft: '#3C7984',
  olive: '#7A8348',

  // Chrome — dominant
  carta: '#F4EDE0',          // warm cream, body background
  cartaDeep: '#E8DFCC',      // section dividers
  caffe: '#1A1614',          // primary text + chrome
  caffeSoft: '#3A3530',      // secondary text
  caffeMute: '#6B655E',      // tertiary text / hints
  inchiostro: '#0A0908',     // hero type only

  // Supporting
  terracotta: '#B5654A',
  basilico: '#4A6840',
} as const;

export const palettePairs = {
  textOnCarta: palette.caffe,
  textOnCaffe: palette.carta,
  textOnMonogram: palette.carta,
  borderSoft: palette.cartaDeep,
  borderStrong: palette.caffeMute,
} as const;

export const type = {
  // Display: editorial serif — first choice is PP Editorial New, fallback chain to system serif
  // (Free fallback for the mockup: 'Instrument Serif' from Google Fonts — has the right character)
  display: {
    fontFamily: '"Instrument Serif", "PP Editorial New", "GT Sectra", Georgia, serif',
    weights: { regular: 400, italic: 400 },
  },
  // Body: neutral sans, already in scaffold
  body: {
    fontFamily: '"Geist", "Söhne", "Inter", system-ui, sans-serif',
    weights: { regular: 400, medium: 500, semibold: 600, bold: 700 },
  },
  // Mono: prices, system labels, Calabrian dialect callouts
  mono: {
    fontFamily: '"Geist Mono", "JetBrains Mono", "IBM Plex Mono", monospace',
    weights: { regular: 400, medium: 500 },
  },
} as const;

export const scale = {
  // Fluid type — editorial hero needs to BREATHE
  hero: 'clamp(3.5rem, 1.5rem + 8vw, 9.5rem)',     // ~56px → ~152px
  display: 'clamp(2.5rem, 1.5rem + 4.5vw, 6rem)',
  h1: 'clamp(2rem, 1.5rem + 2vw, 3.5rem)',
  h2: 'clamp(1.5rem, 1.25rem + 1.25vw, 2.5rem)',
  h3: 'clamp(1.25rem, 1.125rem + 0.625vw, 1.75rem)',
  body: 'clamp(1rem, 0.95rem + 0.25vw, 1.125rem)',
  small: '0.875rem',
  micro: '0.75rem',
} as const;

export const space = {
  // Editorial spacing — bigger than default Tailwind
  section: 'clamp(4rem, 3rem + 5vw, 10rem)',
  sectionTight: 'clamp(2.5rem, 2rem + 2.5vw, 5rem)',
  gutter: 'clamp(1.25rem, 1rem + 1.5vw, 2.5rem)',
} as const;

export const radius = {
  // Small radii feel more editorial than rounded
  sm: '2px',
  md: '4px',
  lg: '8px',
  full: '9999px',
} as const;

export const motion = {
  // Brief: cubic-bezier(0.22, 1, 0.36, 1) as default
  ease: {
    default: 'cubic-bezier(0.22, 1, 0.36, 1)',
    out: 'cubic-bezier(0.16, 1, 0.3, 1)',
    in: 'cubic-bezier(0.32, 0, 0.67, 0)',
  },
  duration: {
    fast: '150ms',
    normal: '300ms',
    slow: '600ms',
    hero: '900ms',
  },
} as const;

export const breakpoint = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const;

export type Palette = typeof palette;
export type Type = typeof type;
