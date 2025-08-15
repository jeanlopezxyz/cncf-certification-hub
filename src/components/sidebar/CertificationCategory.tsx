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
  if (!certifications || certifications.length === 0) return null;

  const t = useTranslations(lang as 'en' | 'es' | 'pt');
  const basePath = `${APP_CONFIG.basePath}${lang === 'en' ? '' : '/' + lang}`;
  const [currentPath, setCurrentPath] = useState('');
  
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number>(0);

  useEffect(() => {
    setCurrentPath(window.location.pathname);
  }, []);

  useEffect(() => {
    if (contentRef.current) {
      setHeight(contentRef.current.scrollHeight);
    }
  }, [certifications]);

  return (
    <div className="mb-1">
      <button
        onClick={onToggle}
        className="w-full flex items-center gap-3 text-sm font-medium text-gray-400 hover:text-blue-400 py-3 px-2 rounded-lg hover:bg-slate-800/20 transition-all duration-200 group"
        aria-expanded={isOpen}
        aria-label={`Toggle ${categoryName} category`}
      >
        <span className="w-1 h-1 bg-purple-400 rounded-full flex-shrink-0 ml-2 transition-all duration-200 group-hover:bg-blue-400"></span>
        <span className="flex-1 text-left font-semibold">{t(categoryName) || categoryName}</span>
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-500 font-medium bg-slate-800/30 px-1.5 py-0.5 rounded-md">{certifications.length}</span>
          <div className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
            <ChevronDownIcon className="w-4 h-4" />
          </div>
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
          const isActive = currentPath === certHref || currentPath.includes(`/certifications/${cert.id}`);
          
          return (
            <a
              key={cert.id}
              href={certHref}
              onClick={onLinkClick}
              className={`flex items-center gap-3 text-[13px] transition-all duration-200 py-2 pl-7 pr-2 rounded-lg group relative overflow-hidden ${
                isActive 
                  ? 'text-purple-400 bg-purple-400/10 font-semibold' 
                  : 'text-gray-400 hover:text-blue-400 hover:bg-slate-800/20'
              }`}
              style={{
                animationDelay: isOpen ? `${index * 30}ms` : '0ms',
                animation: isOpen ? 'slideIn 300ms ease-out forwards' : 'none',
                opacity: isOpen ? 1 : 0,
              }}
            >
              {isActive && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-purple-400 rounded-r-full" />
              )}
              <span className={`w-0.5 h-3 rounded-full flex-shrink-0 transition-all duration-200 ${
                isActive 
                  ? 'bg-purple-400 w-1.5 h-1.5' 
                  : 'bg-gray-700 group-hover:bg-blue-400/50'
              }`}></span>
              <span className={`font-medium tracking-wide transition-transform duration-200 ${
                !isActive && 'group-hover:translate-x-1'
              }`}>{cert.acronym}</span>
            </a>
          );
        })}
      </div>
      
      <style jsx>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-10px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  );
}
