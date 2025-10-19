import { useState, useEffect } from 'react';
import { useTranslations } from '../../i18n/utils';
import { certifications } from '../../data/certifications';
import { useOptimizedStorage } from '../../utils/storage';
import { APP_CONFIG } from '../../constants';
import {
  CERTIFICATION_CATEGORIES,
  STUDY_TIPS_ITEMS,
  ACHIEVEMENTS_ITEMS,
  INTERNAL_PAGES_ITEMS,
  QUICK_LINKS_ITEMS,
  groupCertificationsByCategory,
} from '../../config/sidebar.config';
import {
  CertificationIcon,
  AchievementIcon,
  StudyTipsIcon,
  QuickLinksIcon,
} from '../icons';
import SidebarSection from './SidebarSection';
import CertificationCategory from './CertificationCategory';

interface SidebarProps {
  lang: keyof typeof import('../../i18n/ui').ui;
}

export default function Sidebar({ lang }: SidebarProps) {
  const t = useTranslations(lang);
  const storage = useOptimizedStorage();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [currentPath, setCurrentPath] = useState('');
  const [isDesktopCollapsed, setIsDesktopCollapsed] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);
  const [showMobileButton, setShowMobileButton] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [openSections, setOpenSections] = useState<string[]>([]);
  const [openCategories, setOpenCategories] = useState<string[]>([]);

  // Restore state after hydration
  useEffect(() => {
    setIsHydrated(true);
    const savedCollapsed = storage.getItem('sidebarCollapsed');
    if (savedCollapsed === 'true') {
      setIsDesktopCollapsed(true);
    }
    
    // Restore open categories
    const savedCategories = storage.getItem('sidebarOpenCategories');
    if (savedCategories) {
      try {
        const categories = JSON.parse(savedCategories);
        setOpenCategories(categories);
      } catch {
        // If parsing fails, keep default empty state
      }
    }
  }, [storage]);

  // Save collapsed state
  useEffect(() => {
    if (isHydrated) {
      storage.setBatched('sidebarCollapsed', isDesktopCollapsed.toString());
    }
  }, [isDesktopCollapsed, isHydrated, storage]);

  // Save open categories
  useEffect(() => {
    if (isHydrated) {
      storage.setBatched('sidebarOpenCategories', JSON.stringify(openCategories));
    }
  }, [openCategories, isHydrated, storage]);

  // Check current path
  useEffect(() => {
    const path = window.location.pathname;
    setCurrentPath(path);
  }, [lang]);

  // Handle scroll
  useEffect(() => {
    const handleScroll = () => {
      if (typeof window === 'undefined') return;
      const currentScrollY = window.scrollY;
      
      if (currentScrollY < 100) {
        setShowMobileButton(true);
      } else if (currentScrollY > lastScrollY + 10) {
        setShowMobileButton(false);
      } else if (currentScrollY < lastScrollY - 10) {
        setShowMobileButton(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', handleScroll, { passive: true });
      return () => window.removeEventListener('scroll', handleScroll);
    }
    
    return () => {}; // No-op cleanup function for SSR
  }, [lastScrollY]);

  const closeMobileSidebar = () => {
    if (isHydrated && window.innerWidth < 1024) {
      setIsMobileOpen(false);
    }
  };

  const toggleSection = (section: string) => {
    setOpenSections(prev => 
      prev.includes(section) ? prev.filter(s => s !== section) : [...prev, section]
    );
  };

  const toggleCategory = (category: string) => {
    setOpenCategories(prev => 
      prev.includes(category) 
        ? prev.filter(cat => cat !== category)
        : [...prev, category]
    );
  };

  const certificationsByCategory = groupCertificationsByCategory(certifications);

  return (
    <>
      {/* Mobile Toggle Button */}
      <div className={`fixed bottom-4 right-4 z-50 lg:hidden transition-all duration-300 ${
        showMobileButton ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'
      }`}>
        {!isMobileOpen && showMobileButton && (
          <div className="absolute inset-0 rounded-full bg-blue-600 opacity-20 animate-ping" />
        )}

        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className={`relative ${
            isMobileOpen 
              ? 'bg-slate-800/90 hover:bg-slate-700/90' 
              : 'bg-[#1E50D9] dark:bg-[#242145] hover:bg-[#1D4ED8] dark:hover:bg-[#2D1F4F]'
          } text-white p-3 rounded-full shadow-lg backdrop-blur-sm transition-all duration-300 transform hover:scale-105 active:scale-95 border border-white/20`}
          aria-label={t('aria.toggleMobileSidebar')}
        >
          <div className="relative w-5 h-5">
            {isMobileOpen ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            )}
          </div>
        </button>
      </div>

      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div
          role="button"
          tabIndex={0}
          aria-label={t('aria.toggleMobileSidebar')}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 lg:hidden"
          onClick={() => setIsMobileOpen(false)}
          onKeyDown={e => {
            if (e.key === 'Enter' || e.key === ' ' || e.key === 'Escape') {
              setIsMobileOpen(false);
            }
          }}
        />
      )}

      {/* Fixed Sidebar Header - Outside Sidebar Container */}
      <div className="fixed top-0 left-0 w-64 bg-[#1E50D9] dark:bg-[#242145] px-4 py-4 z-50 lg:block hidden">
        <h2 className="text-white font-bold text-xl">CNCF HUB</h2>
      </div>

      {/* Sidebar */}
      <aside
        suppressHydrationWarning
        className={`
          min-h-screen max-h-none z-40 relative
          bg-[#1E50D9] dark:bg-[#242145]
          overflow-y-visible overflow-x-hidden shadow-2xl shadow-black/50
          w-64
          ${isMobileOpen ? 'fixed left-0 top-0 w-64 translate-x-0 z-60' : 'fixed left-0 top-0 -translate-x-full lg:fixed lg:translate-x-0'}
          transition-all duration-300 ease-in-out
        `}
        style={{ paddingTop: '5rem' }}
      >
        {/* Mobile Header - Only on Mobile */}
        {isMobileOpen && (
          <div className="lg:hidden bg-[#1E50D9] dark:bg-[#242145] px-4 py-4 fixed top-0 left-0 w-64 z-60">
            <h2 className="text-white font-bold text-xl">CNCF HUB</h2>
          </div>
        )}

        {/* Navigation Content - IA Studio Format */}
        <div className="px-3 py-6">
          
          {/* ACHIEVEMENT PATHS Section - Collapsible */}
          <SidebarSection
            title={t('sidebar.sections.achievementPaths')}
            icon={<AchievementIcon />}
            isOpen={openSections.includes('achievements')}
            onToggle={() => toggleSection('achievements')}
          >
            {ACHIEVEMENTS_ITEMS.map((item, index) => {
              const basePath = APP_CONFIG.basePath || '';
              const langPath = lang === 'en' ? '' : `/${lang}`;
              const href = `${basePath}${langPath}/${item.href}`;
              const isActive = currentPath === href;

              // Different icons for each achievement
              const achievementIcons = ['🚀', '🏆'];
              
              return (
                <a
                  key={item.id}
                  href={href}
                  onClick={closeMobileSidebar}
                  className={`flex items-center gap-2 py-2.5 px-3 text-sm font-medium transition-all duration-200 ${
                    isActive 
                      ? 'text-white bg-white/15' 
                      : 'text-blue-200 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <span className="w-1 h-1 bg-blue-300 rounded-full opacity-60"></span>
                  <span>{t(item.translationKey)}</span>
                </a>
              );
            })}
          </SidebarSection>

          {/* CERTIFICATIONS Section - Collapsible */}
          <SidebarSection
            title={t('sidebar.certifications')}
            icon={<CertificationIcon />}
            isOpen={openSections.includes('certifications')}
            onToggle={() => toggleSection('certifications')}
          >
            <div className="space-y-1">
              {CERTIFICATION_CATEGORIES.map((category, index) => {
                // Different icons for each category
                const categoryIcons = ['🔵', '🔄', '🌐', '👀', '🏗️', '🔒', '🐧'];
                
                return (
                  <CertificationCategory
                    key={category.key}
                    categoryKey={category.key}
                    categoryName={category.name}
                    certifications={certificationsByCategory[category.key] || []}
                    isOpen={openCategories.includes(category.key)}
                    onToggle={() => toggleCategory(category.key)}
                    lang={lang}
                    currentPath={currentPath}
                    onLinkClick={closeMobileSidebar}
                    categoryIcon={categoryIcons[index]}
                  />
                );
              })}
            </div>
          </SidebarSection>

          {/* STUDY RESOURCES Section - Collapsible */}
          <SidebarSection
            title={t('sidebar.sections.studyResources')}
            icon={<StudyTipsIcon />}
            isOpen={openSections.includes('tips')}
            onToggle={() => toggleSection('tips')}
          >
            {STUDY_TIPS_ITEMS.map((item, index) => {
              const basePath = APP_CONFIG.basePath || '';
              const langPath = lang === 'en' ? '' : `/${lang}`;
              const fullHref = `${basePath}${langPath}/tips/${item.id}`;
              const isActive = currentPath === fullHref;

              // Different icons for each study tip
              const studyIcons = ['📝', '🗺️', '🧪', '⏰'];

              return (
                <a
                  key={item.id}
                  href={fullHref}
                  onClick={closeMobileSidebar}
                  className={`flex items-center gap-2 py-2.5 px-3 text-sm font-medium transition-all duration-200 ${
                    isActive 
                      ? 'text-white bg-white/15' 
                      : 'text-blue-200 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <span className="w-1 h-1 bg-blue-300 rounded-full opacity-60"></span>
                  <span>{t(item.translationKey)}</span>
                </a>
              );
            })}
            
            {/* Technology Stack */}
            {INTERNAL_PAGES_ITEMS.map(item => {
              const basePath = APP_CONFIG.basePath || '';
              const langPath = lang === 'en' ? '' : `/${lang}`;
              const fullHref = `${basePath}${langPath}/${item.href}`;
              const isActive = currentPath === fullHref;

              return (
                <a
                  key={item.id}
                  href={fullHref}
                  onClick={closeMobileSidebar}
                  className={`flex items-center gap-2 py-2.5 px-3 text-sm font-medium transition-all duration-200 ${
                    isActive 
                      ? 'text-white bg-white/15' 
                      : 'text-blue-200 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <span className="w-1 h-1 bg-blue-300 rounded-full opacity-60"></span>
                  <span>{t(item.translationKey)}</span>
                </a>
              );
            })}
          </SidebarSection>

          {/* EXTERNAL RESOURCES Section - Collapsible */}
          <SidebarSection
            title={t('sidebar.sections.externalResources')}
            icon={<QuickLinksIcon />}
            isOpen={openSections.includes('resources')}
            onToggle={() => toggleSection('resources')}
          >
            {QUICK_LINKS_ITEMS.map((item, index) => {
              // Different icons for each external resource
              const externalIcons = ['📚', '🎯', '📖'];
              
              return (
                <a
                  key={item.id}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={closeMobileSidebar}
                  className="flex items-center gap-2 py-2.5 px-3 text-sm font-medium text-blue-200 hover:text-white hover:bg-white/10 transition-all duration-200 group"
                >
                  <span className="w-1 h-1 bg-blue-300 rounded-full opacity-60"></span>
                  <span>{t(item.translationKey)}</span>
                  <svg className="w-2 h-2 ml-auto opacity-50 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              );
            })}
          </SidebarSection>
        </div>
      </aside>
    </>
  );
}
