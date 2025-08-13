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
      screens: {
        '3xl': '1920px',
      },
    },
  },
  plugins: [],
  // Optimize for production
  future: {
    hoverOnlyWhenSupported: true,
  },
  // Remove unused styles in production
  corePlugins: {
    preflight: true,
    container: false,
  },
}