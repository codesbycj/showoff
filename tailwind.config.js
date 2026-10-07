/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      // Every showcase re-themes by overriding these CSS variables in
      // src/global.css (or on a wrapper via `vars()`), so components never
      // hardcode a palette.
      colors: {
        bg: 'rgb(var(--color-bg) / <alpha-value>)',
        surface: 'rgb(var(--color-surface) / <alpha-value>)',
        elevated: 'rgb(var(--color-elevated) / <alpha-value>)',
        border: 'rgb(var(--color-border) / <alpha-value>)',
        fg: 'rgb(var(--color-fg) / <alpha-value>)',
        muted: 'rgb(var(--color-muted) / <alpha-value>)',
        subtle: 'rgb(var(--color-subtle) / <alpha-value>)',
        accent: 'rgb(var(--color-accent) / <alpha-value>)',
        'accent-fg': 'rgb(var(--color-accent-fg) / <alpha-value>)',
        success: 'rgb(var(--color-success) / <alpha-value>)',
        warning: 'rgb(var(--color-warning) / <alpha-value>)',
        danger: 'rgb(var(--color-danger) / <alpha-value>)',
      },
      // Named per face: RN picks a weight by family name, and 'font-medium'
      // etc. are already taken by Tailwind's font-weight utilities.
      fontFamily: {
        sans: ['var(--font-sans)'],
        'sans-medium': ['var(--font-sans-medium)'],
        'sans-semibold': ['var(--font-sans-semibold)'],
        'sans-bold': ['var(--font-sans-bold)'],
        hand: ['var(--font-hand)'],
        mono: ['var(--font-mono)'],
      },
      borderRadius: {
        xs: '6px',
        '4xl': '32px',
        '5xl': '40px',
      },
      spacing: {
        4.5: '18px',
        13: '52px',
        18: '72px',
      },
      fontSize: {
        '2xs': ['10px', { lineHeight: '14px' }],
      },
    },
  },
  plugins: [],
};
