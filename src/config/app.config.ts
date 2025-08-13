/**
 * Application Configuration
 * Centralized configuration for all app settings
 */

// External URLs
export const EXTERNAL_URLS = {
  github: 'https://github.com',
  githubCNCF: 'https://github.com/cncf/curriculum',
  kubernetes: {
    docs: 'https://kubernetes.io/docs/',
    slack: 'https://slack.k8s.io/',
    discussion: 'https://discuss.kubernetes.io/',
    reddit: 'https://www.reddit.com/r/kubernetes/',
  },
  learning: {
    killerSh: 'https://killer.sh',
    kodekloud: 'https://kodekloud.com',
    killercoda: 'https://killercoda.com',
    acloudGuru: 'https://learn.acloud.guru',
  },
  cncf: {
    certifications: 'https://www.cncf.io/certification/',
    main: 'https://www.cncf.io/',
  },
  fonts: {
    googleapis: 'https://fonts.googleapis.com',
    gstatic: 'https://fonts.gstatic.com',
    googleFontsCss:
      'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Space+Grotesk:wght@400;500;600;700&display=swap',
  },
} as const;

// Color Schemes
export const COLORS = {
  // Background colors
  backgrounds: {
    dark: {
      primary: 'bg-slate-900',
      secondary: 'bg-slate-800',
      tertiary: 'bg-slate-700',
      card: 'bg-slate-900',
      hover: 'bg-slate-800/30',
      transparent: 'bg-slate-800/20',
    },
    gradients: {
      main: 'bg-gradient-to-b from-slate-900 via-slate-925 to-slate-950',
      hero: 'bg-gradient-to-br from-slate-900 via-gray-950 to-blue-950/30',
      section: 'bg-gradient-to-b from-slate-950 to-gray-950',
      button: 'bg-gradient-to-r from-blue-600 to-sky-500',
      text: 'bg-gradient-to-r from-blue-400 to-sky-300',
    },
  },
  // Border colors
  borders: {
    default: 'border-slate-800',
    subtle: 'border-slate-700',
    hover: 'border-blue-800/50',
    transparent: 'border-blue-900/20',
  },
  // Text colors
  text: {
    primary: 'text-gray-100',
    secondary: 'text-gray-300',
    muted: 'text-gray-400',
    dimmed: 'text-gray-500',
    link: 'text-blue-400',
    hover: 'text-white',
  },
  // Badge colors by level
  certificationLevels: {
    entry: 'bg-green-900/50 text-green-300 border border-green-800/50',
    intermediate: 'bg-blue-900/50 text-blue-300 border border-blue-800/50',
    advanced: 'bg-purple-900/50 text-purple-300 border border-purple-800/50',
  },
  // Achievement colors
  achievements: {
    kubestronaut: 'bg-blue-900/50 text-blue-300 border border-blue-800/50',
    golden: 'bg-amber-900/50 text-amber-300 border border-amber-800/50',
  },
} as const;

// Layout dimensions
export const DIMENSIONS = {
  sidebar: {
    width: 'w-64', // 256px
    height: 'h-[calc(100vh-5rem)]',
    mobileTop: 'top-20',
    desktopTop: 'top-20',
  },
  header: {
    height: 'h-20',
  },
  card: {
    height: 'h-[420px]',
  },
  maxWidth: {
    container: 'max-w-7xl',
    content: 'max-w-3xl',
    narrow: 'max-w-2xl',
  },
} as const;

// Animation timings (in ms)
export const ANIMATIONS = {
  fast: 200,
  normal: 300,
  slow: 500,
  verySlow: 600,
  spring: {
    type: 'spring',
    stiffness: 80,
  },
} as const;

// Spacing
export const SPACING = {
  page: {
    paddingY: 'py-20',
    paddingX: 'px-4',
  },
  section: {
    marginBottom: 'mb-12',
    gap: 'gap-6',
  },
  card: {
    padding: 'p-6',
  },
} as const;

// Typography
export const TYPOGRAPHY = {
  fonts: {
    sans: 'Plus Jakarta Sans',
    display: 'Space Grotesk',
  },
  sizes: {
    hero: 'text-4xl md:text-6xl',
    title: 'text-4xl md:text-5xl',
    subtitle: 'text-xl',
    body: 'text-sm',
    small: 'text-xs',
  },
} as const;

// Shadows
export const SHADOWS = {
  card: 'shadow-lg shadow-blue-600/30',
  button: 'shadow-md shadow-blue-600/20',
  sidebar: 'shadow-2xl shadow-black/50',
} as const;
