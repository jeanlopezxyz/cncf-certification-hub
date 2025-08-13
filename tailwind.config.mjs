/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/layouts/**/*.{astro,js,ts,jsx,tsx}',
    './src/pages/**/*.{astro,js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        slate: {
          925: '#0a0f1f',
          950: '#02040a'
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