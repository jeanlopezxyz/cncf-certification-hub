/**
 * Layout dimensions and breakpoints
 */

export const DIMENSIONS = {
  // Container max widths
  containers: {
    maxWidth: '1920px',
    contentWidth: '1400px',
    narrowWidth: '1200px',
  },

  // Component heights
  heights: {
    card: '420px',
    cardMin: '180px',
    sidebar: 'calc(100vh - 5rem)',
    header: '5rem', // 80px
  },

  // Component widths
  widths: {
    sidebar: '16rem', // 256px
    sidebarCollapsed: '4rem', // 64px
  },

  // Spacing
  spacing: {
    page: {
      sm: '1.5rem', // 24px
      md: '2rem', // 32px
      lg: '3rem', // 48px
    },
    section: {
      sm: '1rem', // 16px
      md: '1.5rem', // 24px
      lg: '2rem', // 32px
    },
  },
} as const;

export const BREAKPOINTS = {
  xs: '320px',
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
  '3xl': '1920px',
} as const;
