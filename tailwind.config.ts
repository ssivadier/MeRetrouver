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
        btn: ['var(--font-display)', 'Segoe UI', 'sans-serif'],
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
          '@apply inline-flex items-center justify-center rounded-full bg-brand-emerald px-6 py-3 font-btn text-sm font-semibold text-white shadow-soft transition duration-300 ease-out hover:bg-brand-emeraldHover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-emerald/40': {},
        },
        '.card-surface': {
          '@apply rounded-3xl border border-brand-mist bg-white/90 p-6 shadow-soft transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-brand-emerald/30': {},
        },
        '.info-banner': {
          '@apply flex items-center gap-3 rounded-full border border-brand-mist bg-brand-paper px-4 py-3 text-sm text-brand-ink': {},
        },
        '.page-shell': {
          '@apply mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-10 sm:px-6 sm:py-12 lg:px-8 lg:py-16': {},
        },
        '.page-section': {
          '@apply rounded-[2rem] border border-brand-mist bg-white/90 p-8 shadow-soft transition-all duration-300 ease-out sm:p-10 lg:p-12': {},
        },
      });
    }),
  ],
} satisfies Config;
