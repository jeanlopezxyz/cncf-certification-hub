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

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative group flex items-center justify-center px-3 sm:px-4 py-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 transition-all duration-300 border border-blue-900/30 hover:border-blue-800/50 hover-scale-small active:scale-95 min-w-[48px]"
        aria-label={t('aria.selectLanguage')}
      >
        <svg
          className="w-5 h-5 text-blue-300 sm:mr-2"
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
        <span className="font-semibold text-sm text-blue-300 hidden sm:inline">
          {langCodes[currentLang]}
        </span>
      </button>

      {isOpen && (
        <div
          className="absolute right-0 mt-2 w-48 rounded-xl bg-slate-800 shadow-2xl border border-blue-900/30 overflow-hidden backdrop-blur-xl animate-fade-in"
          style={{ animationDuration: '0.2s' }}
        >
          <div className="p-1">
            {Object.entries(languages).map(([lang, name], index) => (
              <button
                key={lang}
                onClick={() => {
                  handleLanguageChange(lang);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-all duration-200 animate-slide-in-left ${
                  currentLang === lang
                    ? 'bg-blue-600/80 text-white'
                    : 'hover:bg-slate-700/50 text-gray-400 hover:text-white'
                }`}
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="flex items-center space-x-3">
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center font-semibold text-xs ${
                      currentLang === lang ? 'bg-blue-500 text-white' : 'bg-slate-700 text-gray-400'
                    }`}
                  >
                    {langCodes[lang]}
                  </div>
                  <span className="text-sm font-medium">{name}</span>
                </div>
                {currentLang === lang && (
                  <svg className="w-4 h-4 animate-scale-in" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
