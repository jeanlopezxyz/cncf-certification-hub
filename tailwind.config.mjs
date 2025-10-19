/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/layouts/**/*.{astro,js,ts,jsx,tsx}',
    './src/pages/**/*.{astro,js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        slate: {
          925: '#0a0f1f',
          950: '#02040a'
        },
        // Enhanced dark mode colors with better contrast
        gray: {
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          850: '#1a202c',
          900: '#111827',
          950: '#030712'
        },
        // High contrast dark theme colors
        dark: {
          bg: {
            primary: '#0a0b1e',
            secondary: '#141328',
            tertiary: '#1e1b3a'
          },
          text: {
            primary: '#f8fafc',
            secondary: '#e2e8f0',
            tertiary: '#cbd5e1',
            muted: '#94a3b8'
          },
          border: {
            primary: '#334155',
            secondary: '#475569',
            accent: '#64748b'
          }
        }
      },
      screens: {
        '3xl': '1920px',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
}