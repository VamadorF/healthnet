import type { Config } from 'tailwindcss';

/**
 * Refined-clinical design system.
 * One hue (clinical teal) + a cool neutral ramp. Color is scarce and
 * always means something: brand = action/identity, semantic = status,
 * role = which of the four worlds you're in (a thin accent, never a fill).
 */
const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Surfaces — cool near-white, elevation by shadow not by hue.
        canvas: '#f2f5f5',
        surface: '#ffffff',
        surfaceMuted: '#eef2f2',
        // Text — four deliberate levels.
        ink: '#13262a',
        inkMuted: '#586b6f',
        inkFaint: '#8a9ea0',
        // Borders — whisper-quiet, findable when needed.
        line: '#e3e9e8',
        lineStrong: '#d0dad9',
        // Brand — surgical-scrub teal.
        brand: {
          DEFAULT: '#0e5e63',
          dark: '#0a474b',
          light: '#e6f1f1',
          soft: '#c1dedd',
        },
        accent: {
          DEFAULT: '#0e5e63',
          soft: '#e6f1f1',
        },
        // Semantic — desaturated, one soft tint each.
        success: { DEFAULT: '#1c7a5c', soft: '#e3f0eb' },
        warning: { DEFAULT: '#a5691d', soft: '#f5ecdc' },
        info: { DEFAULT: '#27688f', soft: '#e3edf3' },
        danger: { DEFAULT: '#b03e2e', soft: '#f5e4e1' },
        // Role — used only as thin accent rails / dots.
        role: {
          admin: '#5b4b8a',
          org: '#27688f',
          spec: '#0e766e',
          patient: '#a9662a',
        },
      },
      fontFamily: {
        sans: ['var(--font-plex-sans)', 'system-ui', 'sans-serif'],
        // Display and body share one crisp grotesque; hierarchy comes
        // from weight + tracking + color, not a second face.
        display: ['var(--font-plex-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-plex-mono)', 'ui-monospace', 'monospace'],
      },
      // One fixed type scale (~1.2 ratio, 14px base) with line-heights
      // baked in. No arbitrary sizes anywhere in the app.
      fontSize: {
        '2xs': ['11px', { lineHeight: '1.45' }],
        xs: ['12px', { lineHeight: '1.5' }],
        sm: ['14px', { lineHeight: '1.55' }],
        base: ['15px', { lineHeight: '1.55' }],
        lg: ['17px', { lineHeight: '1.5' }],
        xl: ['20px', { lineHeight: '1.35' }],
        '2xl': ['24px', { lineHeight: '1.25' }],
        '3xl': ['28px', { lineHeight: '1.18' }],
        '4xl': ['34px', { lineHeight: '1.1' }],
        '5xl': ['44px', { lineHeight: '1.04' }],
      },
      // Exactly three radii in play: 8px controls, 12px containers, full.
      borderRadius: {
        none: '0',
        sm: '8px',
        DEFAULT: '8px',
        md: '8px',
        lg: '8px',
        xl: '12px',
        '2xl': '12px',
        '3xl': '12px',
        full: '9999px',
      },
      transitionTimingFunction: {
        // Custom ease-out — built-in curves are too weak. Applied to
        // every `transition-*` utility by overriding the default.
        DEFAULT: 'cubic-bezier(0.23, 1, 0.32, 1)',
      },
      boxShadow: {
        xs: '0 0 0 1px rgba(19,38,42,0.04)',
        card: '0 0 0 1px rgba(19,38,42,0.04), 0 1px 2px -1px rgba(19,38,42,0.06), 0 2px 6px rgba(19,38,42,0.04)',
        lift: '0 0 0 1px rgba(19,38,42,0.05), 0 4px 12px -2px rgba(19,38,42,0.10), 0 12px 30px -8px rgba(19,38,42,0.12)',
        focus: '0 0 0 3px rgba(14,94,99,0.18)',
      },
      letterSpacing: {
        tightest: '-0.03em',
      },
    },
  },
  plugins: [],
};
export default config;
