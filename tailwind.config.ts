import type { Config } from 'tailwindcss';
import plugin from 'tailwindcss/plugin';

export default {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}', './content/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          deep: '#0F2B3D',
          deepHover: '#1B3A4B',
          emerald: '#1F6E5C',
          emeraldHover: '#2E8B7A',
          gold: '#D9A441',
          goldHover: '#E8B95F',
          burgundy: '#6B2333',
          paper: '#F4F7F2',
          mist: '#E8F0EC',
          ink: '#1F2A32',
        },
      },
      fontFamily: {
        display: ['var(--font-display)', 'Georgia', 'serif'],
        body: ['var(--font-body)', 'Segoe UI', 'sans-serif'],
      },
      spacing: {
        18: '4.5rem',
        22: '5.5rem',
      },
      borderRadius: {
        '2xl': '1.5rem',
        '3xl': '2rem',
      },
      boxShadow: {
        soft: '0 20px 45px -22px rgba(15, 43, 61, 0.18)',
      },
    },
  },
  plugins: [
    plugin(function ({ addComponents }) {
      addComponents({
        '.btn-cta-primary': {
          '@apply inline-flex items-center justify-center rounded-full bg-brand-emerald px-6 py-3 text-sm font-semibold text-white shadow-soft transition duration-200 hover:bg-brand-emeraldHover': {},
        },
        '.card-surface': {
          '@apply rounded-3xl border border-brand-mist bg-white/90 p-6 shadow-soft': {},
        },
        '.info-banner': {
          '@apply flex items-center gap-3 rounded-full border border-brand-mist bg-brand-paper px-4 py-3 text-sm text-brand-ink': {},
        },
      });
    }),
  ],
} satisfies Config;
