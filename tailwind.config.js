const plugin = require('tailwindcss/plugin')

const pokemonColors = require('./src/constants/pokemon-colors')

const colors = {
  current: 'currentColor',
  inherit: 'inherit',
  danger: {
    bright: 'var(--color-danger-bright)',
    bright1: 'var(--color-danger-bright1)',
    dim: 'var(--color-danger-dim)',
    dim1: 'var(--color-danger-dim1)',
  },
  neutral: {
    bright: 'var(--color-neutral-bright)',
    bright0: 'var(--color-neutral-bright0)',
    bright1: 'var(--color-neutral-bright1)',
    bright2: 'var(--color-neutral-bright2)',
    dim: 'var(--color-neutral-dim)',
    dim0: 'var(--color-neutral-dim0)',
    dim1: 'var(--color-neutral-dim1)',
    dim2: 'var(--color-neutral-dim2)',
  },
  pokemon: pokemonColors,
  primary: {
    bright: 'var(--color-primary-bright)',
    dim: 'var(--color-primary-dim)',
  },
  secondary: {
    bright: 'var(--color-secondary-bright)',
    dim: 'var(--color-secondary-dim)',
  },
  transparent: 'transparent',
}

/** @param {import('tailwindcss/types/config').PluginAPI} param */
function createPlugin({ addComponents, addVariant, e }) {
  addComponents({
    '.btn': {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '0 0.375rem',
      fontWeight: 600,
      fontSize: '1rem',
      lineHeight: '1.5rem',
      border: 'none',
      outline: 'none',
      borderRadius: '0.25rem',
      cursor: 'pointer',
      '&:disabled': {
        cursor: 'not-allowed',
        opacity: '30%',
      },
      '&:hover:not(:disabled)': {
        filter: 'brightness(80%)',
      },
      '&.btn-solid': {
        color: colors.neutral.dim,
        '&:disabled': {
          opacity: '50%',
        },
        '&.btn-primary': {
          backgroundColor: colors.primary.bright,
        },
        '&.btn-secondary': {
          backgroundColor: colors.secondary.bright,
        },
        '&.btn-danger': {
          backgroundColor: colors.danger.bright,
        },
      },
      '&.btn-text': {
        backgroundColor: colors.transparent,
        '&:hover:not(:disabled)': {
          filter: 'none',
          textDecoration: 'underline',
        },
        '&.btn-primary': {
          color: colors.primary.bright,
        },
        '&.btn-secondary': {
          color: colors.secondary.bright,
        },
        '&.btn-danger': {
          color: colors.danger.bright,
        },
      },
      '&.btn-outline': {
        border: `1px solid ${colors.neutral.bright}`,
        backgroundColor: colors.transparent,
        '&.btn-primary': {
          borderColor: colors.primary.bright,
          color: colors.primary.bright,
        },
        '&.btn-secondary': {
          borderColor: colors.secondary.bright,
          color: colors.secondary.bright,
        },
        '&.btn-danger': {
          borderColor: colors.danger.bright,
          color: colors.danger.bright,
        },
      },
    },
  })

  addVariant('current-page', ({ modifySelectors, separator }) => {
    return modifySelectors(({ className }) => {
      const baseClassName = e(`current-page${separator}${className}`)
      return `.${baseClassName}[aria-current="page"]`
    })
  })

  addVariant('details-open', ({ modifySelectors, separator }) => {
    return modifySelectors(({ className }) => {
      const baseClassName = e(`details-open${separator}${className}`)
      return `details[open] .${baseClassName}`
    })
  })
}

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/utils/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  plugins: [
    require('@tailwindcss/line-clamp'),
    require('tailwind-scrollbar'),
    plugin(createPlugin),
  ],
  theme: {
    extend: {
      colors,
      fill: ({ theme }) => theme('colors'),
      stroke: ({ theme }) => theme('colors'),
      screens: {
        sm: '481px',
        md: '561px',
        lg: '768px',
        xl: '1081px',
      },
      keyframes: {
        pokeball: {
          from: {
            transform: 'rotate(10deg)',
          },
          to: {
            transform: 'rotate(-10deg)',
          },
        },
        'slide-down-accordion': {
          from: {
            maxHeight: '0px',
          },
          to: {
            maxHeight: 'calc(100vh - 400px)',
          },
        },
        'slide-up-accordion': {
          from: {
            maxHeight: 'calc(100vh - 400px)',
            opacity: 1,
          },
          to: {
            maxHeight: '0px',
            opacity: 0,
          },
        },
      },
      animation: {
        pokeball: 'pokeball 300ms ease-in infinite',
        'slide-down-accordion': 'slide-down-accordion 250ms ease-in',
        'slide-up-accordion': 'slide-up-accordion 250ms ease-in',
      },
    },
  },
  variants: {
    extend: {
      stroke: ['dark'],
      fill: ['dark'],
    },
  },
}
