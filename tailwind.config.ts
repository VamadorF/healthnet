import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        canvas: '#f6f4f0',
        ink: '#14212a',
        inkMuted: '#5c6b76',
        brand: {
          DEFAULT: '#0e5e63',
          dark: '#0a4549',
          light: '#e8f3f4',
          soft: '#c5e4e6',
        },
        accent: {
          DEFAULT: '#c45c3e',
          dark: '#a84a30',
          soft: '#f9ebe6',
        },
        surface: '#ffffff',
        line: '#e2ddd4',
        role: {
          admin: '#5b4b8a',
          org: '#2a6f97',
          spec: '#1b7a5a',
          patient: '#b86b25',
        },
      },
      fontFamily: {
        sans: ['var(--font-dm-sans)', 'system-ui', 'sans-serif'],
        display: ['var(--font-instrument)', 'Georgia', 'serif'],
      },
      boxShadow: {
        card: '0 1px 2px rgba(20,33,42,0.04), 0 8px 24px rgba(20,33,42,0.06)',
        lift: '0 12px 40px rgba(20,33,42,0.10)',
      },
      // Curvas de easing del sistema: 'out-soft' para hovers y micro-interacciones,
      // 'out-quart' para desplazamientos (lifts, entradas).
      transitionTimingFunction: {
        'out-soft': 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        'out-quart': 'cubic-bezier(0.25, 1, 0.5, 1)',
      },
    },
  },
  plugins: [],
};
export default config;
