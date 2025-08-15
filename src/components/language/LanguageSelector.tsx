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

  const langNames: Record<string, string> = {
    en: 'English',
    es: 'Español',
    pt: 'Português',
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative group flex items-center gap-2 px-3 sm:px-4 py-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 transition-all duration-300 border border-blue-900/30 hover:border-blue-800/50 hover:scale-105 active:scale-95 min-w-[48px] overflow-hidden"
        aria-label={t('aria.selectLanguage')}
      >
        {/* Animated background gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/0 via-blue-600/10 to-blue-600/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
        
        {/* World icon */}
        <div className="text-lg relative z-10 transition-transform duration-300 group-hover:scale-110">
          <WorldIcon className="w-5 h-5 text-blue-300 group-hover:text-white" />
        </div>
        
        {/* Language code */}
        <span className="font-semibold text-sm text-blue-300 group-hover:text-white hidden sm:inline relative z-10 transition-all duration-300">
          {langCodes[currentLang]}
        </span>
        
        {/* Dropdown chevron */}
        <svg
          className={`w-4 h-4 text-blue-400 transition-all duration-300 relative z-10 ${
            isOpen ? 'rotate-180 text-blue-300' : 'group-hover:text-blue-300'
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-3 w-56 rounded-2xl bg-slate-800/95 backdrop-blur-xl shadow-2xl shadow-black/20 border border-blue-800/40 overflow-hidden z-50">
          {/* Header gradient */}
          <div className="h-1 bg-gradient-to-r from-blue-500 via-sky-400 to-blue-500"></div>
          
          <div className="p-2">
            {Object.entries(languages).map(([lang, name], index) => {
              const isActive = currentLang === lang;
              return (
                <button
                  key={lang}
                  onClick={() => {
                    handleLanguageChange(lang);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-300 group relative overflow-hidden ${
                    isActive
                      ? 'bg-gradient-to-r from-blue-600/80 to-blue-700/80 text-white shadow-lg shadow-blue-600/30'
                      : 'hover:bg-slate-700/50 text-gray-300 hover:text-white hover:shadow-md'
                  }`}
                  style={{
                    animationDelay: `${index * 50}ms`,
                    animation: 'slideInFromRight 0.3s ease-out forwards',
                  }}
                >
                  {/* Active item glow effect */}
                  {isActive && (
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-blue-500/30 to-blue-600/20 animate-pulse"></div>
                  )}
                  
                  <div className="flex items-center gap-3 relative z-10">
                    {/* World icon with animations */}
                    <div className={`transition-all duration-300 ${
                      isActive ? 'animate-bounce' : 'group-hover:scale-110'
                    }`}>
                      <WorldIcon className={`w-5 h-5 transition-colors duration-300 ${
                        isActive ? 'text-white' : 'text-gray-400 group-hover:text-white'
                      }`} />
                    </div>
                    
                    <div className="flex flex-col items-start">
                      <span className={`text-sm font-semibold transition-all duration-300 ${
                        isActive ? 'text-white' : 'text-gray-300 group-hover:text-white'
                      }`}>
                        {langNames[lang]}
                      </span>
                      <span className={`text-xs transition-all duration-300 ${
                        isActive ? 'text-blue-200' : 'text-gray-500 group-hover:text-gray-400'
                      }`}>
                        {langCodes[lang]}
                      </span>
                    </div>
                  </div>
                  
                  {/* Active indicator */}
                  {isActive && (
                    <div className="relative z-10 flex items-center gap-1">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  )}
                  
                  {/* Hover shimmer effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                </button>
              );
            })}
          </div>
        </div>
      )}
      
      <style jsx>{`
        @keyframes slideInFromRight {
          0% {
            opacity: 0;
            transform: translateX(20px) scale(0.9);
          }
          100% {
            opacity: 1;
            transform: translateX(0) scale(1);
          }
        }
      `}</style>
    </div>
  );
}
