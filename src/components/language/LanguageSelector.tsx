import { useState, useRef, useEffect } from 'react';
import { languages } from '../../i18n/ui';
import { useTranslations } from '../../i18n/utils';

interface LanguageSelectorProps {
  currentLang: string;
}

export default function LanguageSelector({ currentLang }: LanguageSelectorProps) {
  const t = useTranslations(currentLang as 'en' | 'es' | 'pt');
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLanguageChange = (lang: string) => {
    const path = window.location.pathname;
    const segments = path.split('/').filter(Boolean);

    // Remove base path if exists
    if (segments[0] === 'cncf-certification-hub') {
      segments.shift();
    }

    // Remove current language if it exists
    if (segments[0] && Object.keys(languages).includes(segments[0])) {
      segments.shift();
    }

    // Build new path with base
    let newPath = '/cncf-certification-hub';
    if (lang !== 'en') {
      newPath += '/' + lang;
    }
    if (segments.length > 0) {
      newPath += '/' + segments.join('/');
    }

    // Add trailing slash for index pages
    if (segments.length === 0 || segments[0] === '') {
      newPath += '/';
    }

    window.location.href = newPath;
  };

  const langCodes: Record<string, string> = {
    en: 'EN',
    es: 'ES',
    pt: 'PT',
  };

  const langNames: Record<string, string> = {
    en: 'English',
    es: 'Español',
    pt: 'Português',
  };

  const WorldIcon = ({ className }: { className?: string }) => (
    <svg 
      className={className}
      fill="none" 
      stroke="currentColor" 
      viewBox="0 0 24 24"
    >
      <path 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        strokeWidth={2} 
        d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
      />
    </svg>
  );

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center w-10 h-10 bg-white/10 dark:bg-gray-700 border border-white/20 dark:border-gray-600 rounded-lg hover:bg-white/20 dark:hover:bg-gray-600 transition-all duration-300 text-blue-100 dark:text-gray-200"
        aria-label={t('aria.selectLanguage')}
      >
        <span className="text-sm font-bold">{langCodes[currentLang]}</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-3 w-48 rounded-xl bg-white dark:bg-slate-800 shadow-2xl border border-gray-200 dark:border-slate-600 overflow-hidden z-50">
          <div className="p-2">
            {Object.entries(languages).map(([lang, name]) => {
              const isActive = currentLang === lang;
              return (
                <button
                  key={lang}
                  onClick={() => {
                    handleLanguageChange(lang);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 ${
                    isActive
                      ? 'bg-blue-600 text-white'
                      : 'hover:bg-gray-100 dark:hover:bg-slate-700 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  <div className="flex items-center justify-center w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-lg">
                    <span className="text-sm font-bold text-blue-600 dark:text-blue-300">{langCodes[lang]}</span>
                  </div>
                  <div className="flex-1">
                    <span className="font-medium text-sm">{langNames[lang]}</span>
                  </div>
                  {isActive && (
                    <div className="ml-auto w-2 h-2 bg-green-400 rounded-full"></div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}