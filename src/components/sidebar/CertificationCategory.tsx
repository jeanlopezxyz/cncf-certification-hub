import type { Certification } from '../../types';
import { APP_CONFIG } from '../../constants';
import { ChevronDownIcon } from '../icons';
import { useTranslations } from '../../i18n/utils';
import { useRef, useEffect, useState } from 'react';

interface CertificationCategoryProps {
  categoryKey: string;
  categoryName: string;
  certifications: Certification[];
  isOpen: boolean;
  onToggle: () => void;
  lang: string;
  onLinkClick?: () => void;
}

/**
 * Component for displaying a category of certifications in the sidebar
 */
export default function CertificationCategory({
  categoryKey: _categoryKey,
  categoryName,
  certifications,
  isOpen,
  onToggle,
  lang,
  onLinkClick,
}: CertificationCategoryProps) {
  const hasCerts = !!(certifications && certifications.length > 0);

  const t = useTranslations(lang as 'en' | 'es' | 'pt');
  const basePath = `${APP_CONFIG.basePath}${lang === 'en' ? '' : '/' + lang}`;
  const [currentPath, setCurrentPath] = useState('');
  
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number>(0);

  useEffect(() => {
    setCurrentPath(window.location.pathname);
  }, [lang]); // Update when language changes
  
  // Also update on navigation
  useEffect(() => {
    const handleRouteChange = () => {
      setCurrentPath(window.location.pathname);
    };
    
    // Listen for Astro page transitions
    document.addEventListener('astro:page-load', handleRouteChange);
    
    return () => {
      document.removeEventListener('astro:page-load', handleRouteChange);
    };
  }, []);

  useEffect(() => {
    if (contentRef.current) {
      setHeight(contentRef.current.scrollHeight);
    }
  }, [certifications]);

  if (!hasCerts) return null;

  return (
    <div className="mb-1">
      <button
        onClick={onToggle}
        className="w-full flex items-center gap-3 text-sm font-medium text-gray-400 hover:text-blue-400 py-3 px-2 rounded-lg hover:bg-slate-800/20 transition-all duration-200 group"
        aria-expanded={isOpen}
        aria-label={`Toggle ${categoryName} category`}
      >
        {/* Category indicator icon */}
        <div className={`transition-transform duration-300 text-blue-400 ${isOpen ? 'rotate-90' : ''}`}>
          <ChevronDownIcon className="w-3 h-3 rotate-[-90deg]" />
        </div>
        
        <span className={`flex-1 text-left font-bold text-gray-200 group-hover:text-white transition-colors duration-200 ${
          isOpen ? 'text-white' : ''
        }`}>{t(categoryName) || categoryName}</span>
        <div className="flex items-center gap-2">
          <span className={`text-xs font-bold px-2 py-0.5 rounded-md transition-all duration-200 ${
            isOpen 
              ? 'bg-blue-500/20 text-blue-300' 
              : 'bg-slate-800/30 text-gray-500'
          }`}>{certifications.length}</span>
        </div>
      </button>

      <div
        ref={contentRef}
        style={{
          maxHeight: isOpen ? `${height}px` : '0px',
          transition: 'max-height 400ms cubic-bezier(0.4, 0, 0.2, 1), opacity 300ms ease-out',
        }}
        className={`space-y-1 overflow-hidden ${
          isOpen ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {certifications.map((cert, index) => {
          const certHref = `${basePath}/certifications/${cert.id}`;
          // More precise matching - only exact match
          const isActive = currentPath === certHref;
          
          return (
            <a
              key={cert.id}
              href={certHref}
              onClick={onLinkClick}
              className={`flex items-center gap-3 text-sm font-semibold transition-all duration-200 py-2.5 px-3 rounded-lg group relative ${
                isActive 
                  ? 'text-blue-400 bg-blue-400/10 font-bold' 
                  : 'text-gray-300 hover:text-blue-300 hover:bg-slate-800/20'
              }`}
              style={{
                animationDelay: isOpen ? `${index * 30}ms` : '0ms',
                opacity: isOpen ? 1 : 0,
                transform: isOpen ? 'translateX(0)' : 'translateX(-10px)',
                transition: `all 300ms ease-out ${index * 30}ms`,
              }}
            >
              {isActive && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-blue-400 rounded-r-full" />
              )}
              <span className={`w-0.5 h-4 rounded-full flex-shrink-0 transition-all duration-200 ${
                isActive 
                  ? 'bg-blue-400 w-2 h-2 rounded-full' 
                  : 'bg-blue-400/40 group-hover:bg-blue-400 group-hover:h-5'
              }`}></span>
              <span className={`tracking-wide transition-transform duration-200 ${
                isActive ? 'font-semibold' : 'group-hover:translate-x-1'
              }`}>{cert.acronym}</span>
            </a>
          );
        })}
      </div>
    </div>
  );
}
