/**
 * Styles Configuration
 * All CSS classes organized by component/feature
 */

export const STYLES = {
  // Layout styles
  layout: {
    container: 'max-w-7xl mx-auto',
    containerWithPadding: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8',
    section: 'py-20 px-4',
    sectionAlt: 'py-12',
    flexCenter: 'flex items-center justify-center',
    flexBetween: 'flex items-center justify-between',
    grid: {
      twoColumns: 'grid md:grid-cols-2 gap-6',
      threeColumns: 'grid md:grid-cols-2 lg:grid-cols-3 gap-6',
      fourColumns: 'grid grid-cols-1 md:grid-cols-4 gap-8',
    },
  },

  // Button styles
  buttons: {
    primary:
      'px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-xl font-semibold text-lg hover:from-blue-500 hover:to-blue-400 shadow-lg shadow-blue-600/20 transition-all duration-300',
    secondary:
      'px-8 py-4 bg-transparent border-2 border-blue-800/50 text-blue-300 rounded-xl font-semibold text-lg hover:bg-blue-950/30 hover:border-blue-700/50 transition-all duration-300',
    filter: {
      active:
        'px-6 py-2 rounded-full font-medium bg-blue-600 text-white shadow-lg shadow-blue-600/30',
      inactive:
        'px-6 py-2 rounded-full font-medium bg-slate-800 text-gray-300 hover:bg-slate-700 hover:text-white',
    },
    icon: 'text-gray-400 hover:text-blue-400 transition-colors p-2',
    collapse:
      'bg-slate-900 text-gray-400 hover:text-white p-2 rounded-r-lg shadow-lg transition-all duration-300',
    mobile:
      'bg-gradient-to-r from-blue-600 to-sky-500 text-white p-3 rounded-xl shadow-lg shadow-blue-600/30',
    viewDetails:
      'inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white font-medium text-sm hover:bg-blue-700 shadow-md shadow-blue-600/20 transition-all duration-300',
    cardBack:
      'w-full text-xs bg-slate-800 hover:bg-slate-700 text-gray-300 py-2 rounded-lg transition-colors',
  },

  // Card styles
  cards: {
    certification: {
      front:
        'absolute inset-0 w-full h-full bg-slate-900 border border-slate-700 rounded-2xl p-6 flex flex-col hover:border-blue-800/50 transition-colors duration-300',
      back: 'absolute inset-0 w-full h-full bg-slate-900 border border-slate-700 rounded-2xl p-6',
      container: 'relative cursor-pointer',
    },
    studyTip:
      'bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-slate-700 transition-all duration-300',
    progress:
      'relative bg-slate-900/50 backdrop-blur-sm border border-blue-900/30 rounded-xl p-6 hover:bg-slate-900/70 hover:border-blue-800/50 transition-all duration-300',
    domain: 'bg-slate-800 rounded-lg p-3 border border-slate-700',
  },

  // Typography styles
  typography: {
    heroTitle: 'text-4xl md:text-6xl font-black mb-6',
    sectionTitle: 'text-4xl md:text-5xl font-bold mb-4',
    cardTitle: 'text-3xl font-bold',
    subtitle: 'text-lg md:text-xl text-gray-300',
    gradient: 'bg-gradient-to-r from-blue-400 to-sky-300 bg-clip-text text-transparent',
    gradientAlt: 'bg-gradient-to-r from-blue-400 to-sky-400 bg-clip-text text-transparent',
    label: 'text-sm font-medium text-gray-300',
    small: 'text-xs text-gray-400',
    muted: 'text-gray-500',
  },

  // Sidebar styles
  sidebar: {
    container:
      'fixed left-0 overflow-y-auto z-40 shadow-2xl shadow-black/50 transition-all duration-300 ease-in-out',
    section: 'mb-4',
    sectionButton:
      'w-full flex items-center justify-between p-3 hover:bg-slate-800/30 rounded-xl transition-all duration-200 group',
    link: 'block text-sm text-gray-400 hover:text-blue-400 hover:bg-slate-800/20 transition-all duration-200 py-1.5 px-2 rounded-lg',
    categoryButton:
      'w-full flex items-center justify-between text-xs font-medium text-gray-400 hover:text-gray-200 mb-1 px-2 py-1 rounded-lg hover:bg-slate-800/20 transition-all duration-200',
    header: 'mb-6 pb-4',
    headerTitle: 'text-xl font-bold text-gray-200',
    headerSubtitle: 'text-sm text-gray-500 mt-1',
  },

  // Badge styles
  badges: {
    level: {
      entry:
        'px-2 py-1 text-xs font-semibold rounded-full bg-green-900/50 text-green-300 border border-green-800/50',
      intermediate:
        'px-2 py-1 text-xs font-semibold rounded-full bg-blue-900/50 text-blue-300 border border-blue-800/50',
      advanced:
        'px-2 py-1 text-xs font-semibold rounded-full bg-purple-900/50 text-purple-300 border border-purple-800/50',
    },
    prerequisite:
      'text-xs bg-orange-900/50 text-orange-300 px-2 py-1 rounded-full border border-orange-800/50',
    achievement: {
      kubestronaut:
        'text-xs px-2 py-1 rounded-full bg-blue-900/50 text-blue-300 border border-blue-800/50',
      golden:
        'text-xs px-2 py-1 rounded-full bg-amber-900/50 text-amber-300 border border-amber-800/50',
    },
    meta: 'text-xs bg-slate-800/80 px-2 py-1 rounded-full text-gray-300',
    count: 'text-xs bg-blue-900/50 text-blue-300 px-2 py-0.5 rounded-full',
  },

  // Progress bar styles
  progress: {
    container: 'w-full bg-slate-700 rounded-full h-1.5',
    bar: 'bg-blue-500 h-1.5 rounded-full',
    largeContainer: 'w-full bg-slate-700 rounded-full h-2',
    largeBar: 'bg-gradient-to-r from-blue-600 to-sky-500 h-2 rounded-full',
  },

  // Navigation styles
  navigation: {
    header: 'fixed top-0 w-full z-50 bg-slate-900/95 backdrop-blur-xl border-b border-blue-900/20',
    headerContainer: 'w-full px-4',
    headerContent: 'flex justify-between items-center h-14',
    logo: 'w-9 h-9 bg-gradient-to-br from-blue-600 to-sky-500 rounded-lg flex items-center justify-center shadow-lg shadow-blue-600/30',
  },

  // Footer styles
  footer: {
    container: 'bg-gray-900 border-t border-gray-800 mt-20',
    content: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12',
    grid: 'grid grid-cols-1 md:grid-cols-4 gap-8',
    divider: 'mt-8 pt-8 border-t border-gray-800 text-center text-sm text-gray-400',
    link: 'text-gray-400 hover:text-white transition-colors',
  },

  // Utility styles
  utilities: {
    hidden: 'hidden',
    hiddenMobile: 'hidden lg:flex',
    hiddenDesktop: 'lg:hidden',
    spacingY: 'space-y-2',
    spacingX: 'space-x-3',
    divider: 'border-t border-slate-700',
    dot: 'w-1 h-1 bg-blue-500 rounded-full',
    dotLarge: 'w-1.5 h-1.5 bg-blue-500 rounded-full',
  },
} as const;
