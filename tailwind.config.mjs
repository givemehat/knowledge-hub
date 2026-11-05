/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Semantic surface tokens
        surface: {
          light: '#FAF8F5',       // Warm off-white
          dark: '#121016',        // Deep obsidian charcoal
          cardLight: '#FFFFFF',
          cardDark: '#1A1722',
          raisedLight: '#F3EFEA',
          raisedDark: '#231F2E',
        },
        // Peach Brand Accent Palette (Warm Golden Peach to Deep Ripe Coral)
        peach: {
          50: '#FFF5F0',        // Softest peach tint
          100: '#FFE8DC',       // Soft peach chip fill
          200: '#FFD2BE',       // Muted peach border / surface
          300: '#FFB295',       // Soft brand highlight
          400: '#FF9E7A',       // Signature warm golden peach (BRAND.themeColor)
          500: '#FF7A59',       // Vibrant primary peach
          600: '#F25C3B',       // Coral peach accent
          700: '#D64522',       // Deep accessible coral
          800: '#A83115',       // High-contrast text on white (6.4:1 WCAG AA)
          900: '#7A220D',       // Deep rich peach
          950: '#421005',
        },
        // Interactive System Indigo / Electric Violet (for links, focused states)
        brand: {
          50: '#F5F3FF',
          100: '#EDE9FE',
          200: '#DDD6FE',
          300: '#C4B5FD',
          400: '#A78BFA',
          500: '#5B3DF5',        // Electric Indigo
          600: '#4829E0',
          700: '#3A1EC4',
          800: '#2E15A3',
          900: '#200D7A',
          950: '#13064F',
        },
        // Indian Heritage Cultural Accents
        saffron: {
          50: '#FFF7ED',
          100: '#FFEDD5',
          200: '#FED7AA',
          300: '#FDBA74',
          400: '#FB923C',
          500: '#FF851A',        // Kesariya / Saffron
          600: '#EA580C',
          700: '#C2410C',
          900: '#7C2D12',
          950: '#431407',
        },
        peacock: {
          50: '#F0FDFA',
          100: '#CCFBF1',
          200: '#99F6E4',
          300: '#5EEAD4',
          400: '#2DD4BF',
          500: '#0E8A8A',        // Peacock Teal
          600: '#0D7474',
          700: '#0A5C5C',
          800: '#084848',
          900: '#042F2E',
          950: '#021C1C',
        },
        kumkum: {
          50: '#FFF1F2',
          100: '#FFE4E6',
          500: '#D62F4B',        // Kumkum Crimson
          600: '#BE123C',
          700: '#9F1239',
        },
        haldi: {
          50: '#FEFCE8',
          100: '#FEF9C3',
          500: '#F5B700',        // Haldi Gold / Amber
          600: '#D97706',
          700: '#B45309',
        },
        // Base compatibility aliases
        darkbg: '#121016',
        darkcard: '#1A1722',
        darkborder: '#2A2536'
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
        hindi: ['"Noto Sans Devanagari"', 'Hind', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace']
      },
      boxShadow: {
        'apple-sm': '0 1px 2px rgba(20, 18, 26, 0.04)',
        'apple-md': '0 4px 16px -2px rgba(20, 18, 26, 0.08), 0 2px 6px -1px rgba(20, 18, 26, 0.04)',
        'apple-lg': '0 12px 32px -4px rgba(20, 18, 26, 0.12), 0 4px 12px -2px rgba(20, 18, 26, 0.06)',
        'dark-glow': '0 0 24px -4px rgba(91, 61, 245, 0.15)',
        'saffron-glow': '0 0 20px -3px rgba(255, 133, 26, 0.25)',
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem'
      }
    },
  },
  plugins: [],
};
