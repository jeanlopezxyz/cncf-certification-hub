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
  currentPath: string;
  onLinkClick?: () => void;
  categoryIcon?: string;
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
  currentPath,
  onLinkClick,
  categoryIcon = '📚',
}: CertificationCategoryProps) {
  const hasCerts = !!(certifications && certifications.length > 0);

  const t = useTranslations(lang as 'en' | 'es' | 'pt');
  const basePath = `${APP_CONFIG.basePath}${lang === 'en' ? '' : '/' + lang}`;
  
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number>(0);

  useEffect(() => {
    if (contentRef.current) {
      setHeight(contentRef.current.scrollHeight);
    }
  }, [certifications, isOpen]);

  // Recalculate height when component mounts or updates
  useEffect(() => {
    const updateHeight = () => {
      if (contentRef.current) {
        setHeight(contentRef.current.scrollHeight);
      }
    };
    
    // Update height immediately
    updateHeight();
    
    // Also update on next frame to ensure all content is rendered
    requestAnimationFrame(updateHeight);
  }, [certifications, isOpen]);

  if (!hasCerts) return null;

  return (
    <div className="mb-1">
      <button
        onClick={onToggle}
        className="w-full flex items-center gap-2 text-sm font-medium text-blue-200 hover:text-white py-2.5 px-3 rounded-lg hover:bg-white/10 transition-all duration-200 group"
        aria-expanded={isOpen}
        aria-label={`Toggle ${categoryName} category`}
      >
        {/* Category indicator */}
        <span className="w-1 h-1 bg-blue-300 rounded-full opacity-60"></span>
        
        <span className={`flex-1 text-left font-medium transition-colors duration-200 ${
          isOpen ? 'text-white' : 'text-blue-200 group-hover:text-white'
        }`}>{t(categoryName) || categoryName}</span>
        <div className="flex items-center">
          <span className={`text-xs px-2 py-0.5 rounded-full transition-all duration-200 ${
            isOpen 
              ? 'bg-white/20 text-white' 
              : 'bg-white/10 text-blue-200'
          }`}>{certifications.length}</span>
        </div>
      </button>

      <div
        ref={contentRef}
        style={{
          maxHeight: isOpen ? 'none' : '0px',
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
              className={`block py-2.5 px-6 text-sm font-medium transition-all duration-200 ${
                isActive 
                  ? 'text-white bg-white/15' 
                  : 'text-blue-200 hover:text-white hover:bg-white/10'
              }`}
            >
              {cert.acronym}
            </a>
          );
        })}
      </div>
    </div>
  );
}
