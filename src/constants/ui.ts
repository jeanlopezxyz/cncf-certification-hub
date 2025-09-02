/**
 * UI Constants
 * Centralizes magic numbers and repeated values
 */

// Z-index layers
export const Z_INDEX = {
  dropdown: 10,
  overlay: 20,
  modal: 30,
  tooltip: 40,
  skipLink: 50,
} as const;

// Animation durations (ms)
export const ANIMATION_DURATION = {
  instant: 0,
  fast: 150,
  normal: 300,
  slow: 500,
  verySlow: 700,
  search: 150,
  hover: 200,
  slide: 300,
  fade: 400,
} as const;

// Component sizes
export const COMPONENT_SIZE = {
  icon: {
    small: 'w-4 h-4',
    normal: 'w-5 h-5',
    large: 'w-6 h-6',
    xlarge: 'w-8 h-8',
  },
  button: {
    small: 'px-3 py-1.5 text-sm',
    normal: 'px-4 py-2 text-base',
    large: 'px-6 py-3 text-lg',
  },
  input: {
    height: 'h-12',
    heightSmall: 'h-10',
    heightLarge: 'h-14',
  },
} as const;

// Grid configurations
export const GRID_CONFIG = {
  certifications: {
    mobile: 'grid-cols-1',
    tablet: 'sm:grid-cols-2',
    desktop: 'lg:grid-cols-3',
    wide: 'xl:grid-cols-4',
  },
  achievements: {
    mobile: 'grid-cols-2',
    tablet: 'sm:grid-cols-3',
    desktop: 'md:grid-cols-4 lg:grid-cols-5',
    wide: 'xl:grid-cols-5',
  },
  cncf: {
    mobile: 'grid-cols-2',
    tablet: 'sm:grid-cols-3',
    desktop: 'md:grid-cols-4 lg:grid-cols-5',
    wide: 'xl:grid-cols-6',
  },
} as const;

// Common spacing values
export const SPACING_VALUES = {
  cardGap: {
    mobile: 'gap-2',
    tablet: 'sm:gap-3',
    desktop: 'md:gap-4',
  },
  sectionGap: {
    mobile: 'gap-4',
    tablet: 'sm:gap-6',
    desktop: 'lg:gap-8',
  },
  pageMargin: {
    mobile: 'mx-4',
    tablet: 'sm:mx-6',
    desktop: 'lg:mx-8',
    wide: 'xl:mx-12',
    ultrawide: '2xl:mx-20 3xl:mx-32',
  },
} as const;

// Timing constants
export const TIMING = {
  debounce: {
    search: 150,
    input: 300,
    scroll: 100,
    resize: 250,
  },
  animation: {
    stagger: 100,
    cardDelay: 50,
    fadeIn: 400,
    slideIn: 300,
  },
  polling: {
    fast: 1000,
    normal: 5000,
    slow: 30000,
  },
} as const;

// Responsive breakpoints (px values)
export const BREAKPOINTS = {
  mobile: 480,
  tablet: 768,
  desktop: 1024,
  wide: 1280,
  ultrawide: 1536,
} as const;

// Common class combinations
export const CLASS_COMBINATIONS = {
  cardBase: 'border-2 transition-all duration-300 rounded-xl overflow-hidden',
  cardHover: 'hover:border-blue-500 hover:shadow-lg transition-all duration-300',
  textGradient: 'text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-sky-400',
  buttonPrimary: 'bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-colors',
  buttonSecondary: 'bg-transparent border-2 border-blue-600 text-blue-400 hover:bg-blue-600 hover:text-white transition-all',
  inputBase: 'border border-slate-700 rounded-lg bg-slate-800 text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none transition-colors',
} as const;