/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Semantic surface tokens
        surface: {
          light: '#FAF8F5',       // Warm off-white (Apple-inspired warm neutral)
          dark: '#121016',        // Soft deep charcoal
          cardLight: '#FFFFFF',
          cardDark: '#1A1722',
          raisedLight: '#F3EFEA',
          raisedDark: '#231F2E',
        },
        // Primary electric violet (Gen-Z Tech)
        violet: {
          50: '#F5F3FF',
          100: '#EDE9FE',
          500: '#5B3DF5',
          600: '#4829E0',
          700: '#3A1EC4',
          900: '#200D7A',
        },
        // Indian Heritage Cultural Accents (used tastefully and sparingly)
        saffron: {
          50: '#FFF7ED',
          100: '#FFEDD5',
          500: '#FF851A',        // Kesariya / Saffron
          600: '#EA580C',
        },
        teal: {
          50: '#F0FDFA',
          100: '#CCFBF1',
          500: '#0E8A8A',        // Peacock Teal
          600: '#0D7474',
        },
        kumkum: {
          50: '#FFF1F2',
          500: '#D62F4B',        // Kumkum Red
          600: '#BE123C',
        },
        haldi: {
          50: '#FEFCE8',
          500: '#F5B700',        // Haldi Gold / Amber
          600: '#D97706',
        },
        // Legacy compatibility
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
