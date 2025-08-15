import { useState, useEffect } from 'react';
import { useTranslations } from '../../i18n/utils';
import { certifications } from '../../data/certifications';
import { APP_CONFIG, SIDEBAR_WIDTH } from '../../constants';
import {
  CERTIFICATION_CATEGORIES,
  STUDY_TIPS_ITEMS,
  ACHIEVEMENTS_ITEMS,
  QUICK_LINKS_ITEMS,
  groupCertificationsByCategory,
} from '../../config/sidebar.config';
import {
  CertificationIcon,
  AchievementIcon,
  StudyTipsIcon,
  QuickLinksIcon,
  CollapseIcon,
  ExpandIcon,
} from '../icons';
import SidebarSection from './SidebarSection';
import CertificationCategory from './CertificationCategory';

interface SidebarProps {
  lang: keyof typeof import('../../i18n/ui').ui;
}

/**
 * Main sidebar component
 * Provides navigation for certifications, achievements, study tips, and resources
 */
export default function Sidebar({ lang }: SidebarProps) {
  const t = useTranslations(lang);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isHomePage, setIsHomePage] = useState(false);
  const [currentPath, setCurrentPath] = useState('');

  // Initialize collapsed state from localStorage (avoid hydration mismatch)
  const [isDesktopCollapsed, setIsDesktopCollapsed] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);

  // Restore state after hydration
  useEffect(() => {
    setIsHydrated(true);
    
    // Restore collapsed state
    const savedCollapsed = localStorage.getItem('sidebarCollapsed');
    if (savedCollapsed === 'true') {
      setIsDesktopCollapsed(true);
    }
    
    // Restore open sections if they exist
    const savedSections = localStorage.getItem('sidebarOpenSections');
    if (savedSections) {
      try {
        const parsed = JSON.parse(savedSections);
        if (Array.isArray(parsed)) {
          setOpenSections(parsed);
        }
      } catch (e) {
        // If parsing fails, keep default empty state
      }
    }
    
    // Restore open categories if they exist
    const savedCategories = localStorage.getItem('sidebarOpenCategories');
    if (savedCategories) {
      try {
        const parsed = JSON.parse(savedCategories);
        if (Array.isArray(parsed)) {
          setOpenCategories(parsed);
        }
      } catch (e) {
        // If parsing fails, keep default empty state
      }
    }
  }, []);

  // Initialize state from localStorage or use defaults (empty arrays)
  const [openSections, setOpenSections] = useState<string[]>([]);
  const [openCategories, setOpenCategories] = useState<string[]>([]);

  // Check if we're on the home page and track current path
  useEffect(() => {
    const path = window.location.pathname;
    setCurrentPath(path);
    const homePagePattern = /^\/(cncf-certification-hub)?(\/?(es|pt)?)?$/;
    setIsHomePage(homePagePattern.test(path));
    
    // Ensure state is maintained when language changes
    // Re-restore state from localStorage to ensure consistency
    if (isHydrated) {
      const savedSections = localStorage.getItem('sidebarOpenSections');
      if (savedSections) {
        try {
          const parsed = JSON.parse(savedSections);
          if (Array.isArray(parsed)) {
            setOpenSections(parsed);
          }
        } catch (e) {
          // Keep current state if parsing fails
        }
      }
      
      const savedCategories = localStorage.getItem('sidebarOpenCategories');
      if (savedCategories) {
        try {
          const parsed = JSON.parse(savedCategories);
          if (Array.isArray(parsed)) {
            setOpenCategories(parsed);
          }
        } catch (e) {
          // Keep current state if parsing fails
        }
      }
    }
  }, [isHydrated]); // Re-run when hydrated state or navigation changes

  // Close mobile sidebar on route change
  useEffect(() => {
    const handleRouteChange = () => {
      setIsMobileOpen(false);
    };

    // Listen for popstate events (browser back/forward)
    window.addEventListener('popstate', handleRouteChange);

    // Listen for Astro page transitions
    document.addEventListener('astro:page-load', handleRouteChange);

    return () => {
      window.removeEventListener('popstate', handleRouteChange);
      document.removeEventListener('astro:page-load', handleRouteChange);
    };
  }, []);

  // Save collapsed state to localStorage when it changes (only after hydration)
  useEffect(() => {
    if (isHydrated) {
      // Only save if the value actually changed
      const currentSaved = localStorage.getItem('sidebarCollapsed');
      const newValue = isDesktopCollapsed.toString();

      if (currentSaved !== newValue) {
        localStorage.setItem('sidebarCollapsed', newValue);
      }
    }
  }, [isDesktopCollapsed, isHydrated]);

  // Listen for logo click event to expand sidebar and collapse sections
  useEffect(() => {
    const handleExpandSidebar = (e: CustomEvent) => {
      // Expand sidebar
      setIsDesktopCollapsed(false);

        // Collapse all sections if requested
        if (e.detail?.collapseAllSections) {
          setOpenSections([]);
          setOpenCategories([]);
        }
      };

    document.addEventListener('expandSidebar', handleExpandSidebar as EventListener);

    return () => {
      document.removeEventListener('expandSidebar', handleExpandSidebar as EventListener);
    };
  }, []);

  // Save open sections to localStorage when they change
  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem('sidebarOpenSections', JSON.stringify(openSections));
    }
  }, [openSections, isHydrated]);

  // Save open categories to localStorage when they change
  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem('sidebarOpenCategories', JSON.stringify(openCategories));
    }
  }, [openCategories, isHydrated]);

  const toggleSection = (section: string) => {
    setOpenSections(prev => {
      const newSections = prev.includes(section)
        ? prev.filter(s => s !== section)
        : [...prev, section];
      return newSections;
    });
  };

  const toggleCategory = (category: string) => {
    setOpenCategories(prev => {
      // If clicking on an already open category, close it
      const isOpen = prev.includes(category);
      const newCategories = isOpen ? [] : [category];
      return newCategories;
    });
  };

  const certificationsByCategory = groupCertificationsByCategory(certifications);

  // Function to close mobile sidebar
  const closeMobileSidebar = () => {
    if (isHydrated && window.innerWidth < 1024) {
      setIsMobileOpen(false);
    }
  };

  return (
    <>
      {/* Mobile Toggle Button - Show on all pages with sidebar */}
      <div className="fixed bottom-6 right-6 z-50 lg:hidden">
          {/* Pulse animation ring */}
          {!isMobileOpen && (
            <div className="absolute inset-0 rounded-full bg-blue-600 opacity-25 animate-ping" />
          )}

          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className={`relative ${isMobileOpen ? 'bg-slate-800 hover:bg-slate-700' : 'bg-gradient-to-r from-blue-600 to-sky-600 hover:from-blue-700 hover:to-sky-700'} text-white p-4 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-110 active:scale-95 border-2 ${isMobileOpen ? 'border-slate-700' : 'border-blue-500/30'}`}
            aria-label={t('aria.toggleMobileSidebar')}
          >
            <div className="relative w-6 h-6">
              {isMobileOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <>
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16m-7 6h7"
                    />
                  </svg>
                  <span className="absolute -top-1 -right-1 flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
                  </span>
                </>
              )}
            </div>
          </button>
        </div>

      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Desktop Collapse Toggle */}
      <button
        onClick={() => {
          setIsDesktopCollapsed(!isDesktopCollapsed);
          // Immediately update wrapper margins when button is clicked
          const wrapper = document.getElementById('main-wrapper');
          if (wrapper) {
            const willCollapse = !isDesktopCollapsed;
            wrapper.classList.toggle('lg:ml-0', willCollapse);
            wrapper.classList.toggle('lg:ml-80', !willCollapse);
          }
        }}
        className="hidden lg:flex fixed left-0 top-32 z-40 bg-slate-900 text-gray-400 hover:text-white p-2 rounded-r-lg shadow-lg transition-all duration-300 ease-in-out"
        style={{ left: isDesktopCollapsed ? '0' : `${SIDEBAR_WIDTH.expanded}px` }}
        aria-label={t('aria.toggleSidebarCollapse')}
      >
        {isDesktopCollapsed ? <ExpandIcon /> : <CollapseIcon />}
      </button>

      {/* Sidebar */}
      <aside
        suppressHydrationWarning
        className={`
          fixed left-0 top-20 h-[calc(100vh-5rem)] z-30
          bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950
          overflow-y-auto overflow-x-hidden shadow-2xl shadow-black/50
          w-80
          ${isMobileOpen ? 'translate-x-0 z-40' : '-translate-x-full'}
          ${isDesktopCollapsed ? 'lg:-translate-x-full' : 'lg:translate-x-0'}
          transition-transform duration-300 ease-in-out
        `}
      >
        <div className="px-5 py-6">
          {/* Achievements Section */}
          <SidebarSection
            title={t('sidebar.achievements')}
            icon={<AchievementIcon />}
            isOpen={openSections.includes('achievements')}
            onToggle={() => toggleSection('achievements')}
          >
            {ACHIEVEMENTS_ITEMS.map(item => {
              // Build the correct URL with base path and language
              const basePath = APP_CONFIG.basePath || '';
              const langPath = lang === 'en' ? '' : `/${lang}`;
              // No slash before item.href since it doesn't start with /
              const href = `${basePath}${langPath}/${item.href}`;
              const isActive = currentPath === href || currentPath.includes(`/${item.href}`);

              return (
                <a
                  key={item.id}
                  href={href}
                  onClick={closeMobileSidebar}
                  className={`flex items-center gap-3 text-sm font-semibold transition-all duration-200 py-2.5 px-3 rounded-lg group relative ${
                    isActive 
                      ? 'text-blue-400 bg-blue-400/10 shadow-lg shadow-blue-400/20 font-bold' 
                      : 'text-gray-300 hover:text-blue-300 hover:bg-slate-800/20'
                  }`}
                >
                  {isActive && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-blue-400 rounded-r-full shadow-lg shadow-blue-400/50" />
                  )}
                  <span className={`w-0.5 h-4 rounded-full flex-shrink-0 transition-all duration-200 ${
                    isActive 
                      ? 'bg-blue-400 w-2 h-2 rounded-full shadow-md shadow-blue-400/50' 
                      : 'bg-blue-400/40 group-hover:bg-blue-400 group-hover:h-5'
                  }`}></span>
                  <span className={`tracking-wide transition-transform duration-200 ${
                    isActive ? 'font-semibold' : 'group-hover:translate-x-1'
                  }`}>{t(item.translationKey)}</span>
                </a>
              );
            })}
          </SidebarSection>

          {/* Certifications Section */}
          <SidebarSection
            title={t('sidebar.certifications')}
            icon={<CertificationIcon />}
            isOpen={openSections.includes('certifications')}
            onToggle={() => toggleSection('certifications')}
          >
            <div className="space-y-2">
              {CERTIFICATION_CATEGORIES.map(category => (
                <CertificationCategory
                  key={category.key}
                  categoryKey={category.key}
                  categoryName={category.name}
                  certifications={certificationsByCategory[category.key]}
                  isOpen={openCategories.includes(category.key)}
                  onToggle={() => toggleCategory(category.key)}
                  lang={lang}
                  onLinkClick={closeMobileSidebar}
                />
              ))}
            </div>
          </SidebarSection>

          {/* Study Tips Section */}
          <SidebarSection
            title={t('sidebar.tips')}
            icon={<StudyTipsIcon />}
            isOpen={openSections.includes('tips')}
            onToggle={() => toggleSection('tips')}
          >
            {STUDY_TIPS_ITEMS.map(item => {
              const basePath = APP_CONFIG.basePath || '';
              const langPath = lang === 'en' ? '' : `/${lang}`;
              const fullHref = `${basePath}${langPath}/tips/${item.id}`;
              const isActive = currentPath === fullHref || currentPath.includes(`/tips/${item.id}`);

              return (
                <a
                  key={item.id}
                  href={fullHref}
                  onClick={closeMobileSidebar}
                  className={`flex items-center gap-3 text-sm font-semibold transition-all duration-200 py-2.5 px-3 rounded-lg group relative ${
                    isActive 
                      ? 'text-blue-400 bg-blue-400/10 shadow-lg shadow-blue-400/20 font-bold' 
                      : 'text-gray-300 hover:text-blue-400 hover:bg-slate-800/20'
                  }`}
                >
                  {isActive && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-blue-400 rounded-r-full shadow-lg shadow-blue-400/50" />
                  )}
                  <span className={`w-0.5 h-4 rounded-full flex-shrink-0 transition-all duration-200 ${
                    isActive 
                      ? 'bg-blue-400 w-2 h-2 rounded-full shadow-md shadow-blue-400/50' 
                      : 'bg-blue-400/40 group-hover:bg-blue-400 group-hover:h-5'
                  }`}></span>
                  <span className={`tracking-wide transition-transform duration-200 ${
                    isActive ? 'font-semibold' : 'group-hover:translate-x-1'
                  }`}>{t(item.translationKey)}</span>
                </a>
              );
            })}
          </SidebarSection>

          {/* Quick Links Section */}
          <SidebarSection
            title={t('sidebar.quickLinks')}
            icon={<QuickLinksIcon />}
            isOpen={openSections.includes('resources')}
            onToggle={() => toggleSection('resources')}
          >
            {QUICK_LINKS_ITEMS.map(item => (
              <a
                key={item.id}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={closeMobileSidebar}
                className="flex items-center gap-3 text-sm font-semibold text-gray-300 hover:text-blue-400 transition-all duration-200 py-2.5 px-3 rounded-lg hover:bg-slate-800/20 group"
              >
                <span className="w-0.5 h-4 bg-green-400/40 rounded-full flex-shrink-0 group-hover:bg-green-400 group-hover:h-5 transition-all duration-200"></span>
                <span className="tracking-wide group-hover:translate-x-1 transition-transform duration-200 font-semibold">{t(item.translationKey)}</span>
                <svg className="w-3 h-3 ml-auto opacity-0 group-hover:opacity-50 transition-opacity duration-200" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z"></path>
                  <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z"></path>
                </svg>
              </a>
            ))}
          </SidebarSection>
        </div>
      </aside>
    </>
  );
}
