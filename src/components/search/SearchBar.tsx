import { useState, useRef, useEffect } from 'react';
import { certifications } from '../../data/certifications';
import { CERTIFICATION_CATEGORIES, STUDY_TIPS_ITEMS, ACHIEVEMENTS_ITEMS } from '../../config/sidebar.config';
import { useTranslations } from '../../i18n/utils';
import type { Certification } from '../../types';
import { APP_CONFIG } from '../../constants';

interface SearchBarProps {
  lang: 'en' | 'es' | 'pt';
}

interface SearchSuggestion {
  type: 'certification';
  id: string;
  title: string;
  description: string;
  url: string;
  score: number;
  matchType: 'exact' | 'partial' | 'fuzzy' | 'semantic';
  category?: string;
  level?: string;
  tags?: string[];
}

export default function SearchBar({ lang }: SearchBarProps) {
  const t = useTranslations(lang);
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([]);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const [isFocused, setIsFocused] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsFocused(false);
        setSuggestions([]);
        setFocusedIndex(-1);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Advanced fuzzy search and scoring algorithm
  const calculateFuzzyScore = (text: string, query: string): number => {
    const textLower = text.toLowerCase();
    const queryLower = query.toLowerCase();
    
    // Exact match gets highest score
    if (textLower === queryLower) return 100;
    if (textLower.includes(queryLower)) return 80;
    
    // Calculate fuzzy match score
    let score = 0;
    let queryIndex = 0;
    
    for (let i = 0; i < textLower.length && queryIndex < queryLower.length; i++) {
      if (textLower[i] === queryLower[queryIndex]) {
        score += (queryLower.length - queryIndex) * 2; // Earlier matches get higher scores
        queryIndex++;
      }
    }
    
    // Bonus for word boundary matches
    const words = textLower.split(/\s+/);
    words.forEach(word => {
      if (word.startsWith(queryLower)) score += 15;
      if (word.includes(queryLower)) score += 5;
    });
    
    // Acronym matching bonus
    const acronym = text.split(/\s+/).map(word => word[0]).join('').toLowerCase();
    if (acronym.includes(queryLower)) score += 20;
    
    return Math.min(score, 95); // Cap at 95 to keep exact matches highest
  };

  // Semantic keyword mapping for better search
  const getSemanticKeywords = (query: string): string[] => {
    const semanticMap: Record<string, string[]> = {
      // Kubernetes terms
      'k8s': ['kubernetes', 'container', 'orchestration', 'cka', 'ckad', 'cks'],
      'kubernetes': ['k8s', 'container', 'orchestration', 'pods', 'cka', 'ckad', 'cks'],
      'container': ['kubernetes', 'docker', 'k8s', 'orchestration'],
      'admin': ['cka', 'administrator', 'cluster', 'management'],
      'developer': ['ckad', 'application', 'deployment', 'development'],
      'security': ['cks', 'secure', 'protection', 'hardening', 'kyverno'],
      
      // Technologies
      'prometheus': ['monitoring', 'metrics', 'observability', 'pca'],
      'istio': ['service mesh', 'networking', 'microservices', 'ica'],
      'argo': ['gitops', 'cd', 'continuous deployment', 'capa'],
      'cilium': ['networking', 'ebpf', 'cni', 'cca'],
      'backstage': ['platform', 'developer portal', 'cba'],
      'opentelemetry': ['observability', 'tracing', 'monitoring', 'otca'],
      
      // Concepts
      'beginner': ['entry', 'basic', 'fundamental', 'kcna'],
      'advanced': ['expert', 'professional', 'complex'],
      'intermediate': ['moderate', 'standard'],
      'exam': ['test', 'certification', 'assessment'],
      'practice': ['hands-on', 'lab', 'exercise', 'training'],
      'study': ['learn', 'preparation', 'guide', 'material'],
    };

    const keywords = [query.toLowerCase()];
    Object.entries(semanticMap).forEach(([key, values]) => {
      if (query.toLowerCase().includes(key) || values.some(v => query.toLowerCase().includes(v))) {
        keywords.push(...values);
      }
    });
    
    return [...new Set(keywords)];
  };

  // Real-time search suggestions generator with progressive matching
  const generateSuggestions = (searchQuery: string): SearchSuggestion[] => {
    if (!searchQuery || searchQuery.length < 1) return [];
    
    // Progressive threshold based on query length
    const getThreshold = (queryLength: number) => {
      if (queryLength === 1) return 40; // Higher threshold for single chars
      if (queryLength === 2) return 25; // Medium threshold for 2 chars
      return 15; // Lower threshold for longer queries
    };
    
    const threshold = getThreshold(searchQuery.length);

    const results: SearchSuggestion[] = [];
    const query = searchQuery.toLowerCase().trim();
    const basePath = APP_CONFIG.basePath || '';
    const langPath = lang === 'en' ? '' : `/${lang}`;
    const semanticKeywords = getSemanticKeywords(query);

    // Search certifications with advanced scoring
    certifications.forEach((cert: Certification) => {
      let maxScore = 0;
      let matchType: 'exact' | 'partial' | 'fuzzy' | 'semantic' = 'fuzzy';
      
      // Score different fields with weights
      const scores = {
        acronym: calculateFuzzyScore(cert.acronym, query) * 3, // Acronym gets highest weight
        name: calculateFuzzyScore(cert.name, query) * 2.5,
        description: calculateFuzzyScore(cert.description, query) * 1.5,
        level: calculateFuzzyScore(cert.level, query) * 2,
        domains: Math.max(...cert.domains.map(d => 
          Math.max(
            calculateFuzzyScore(d.name, query) * 2,
            ...d.topics.map(t => calculateFuzzyScore(t, query))
          )
        ))
      };

      maxScore = Math.max(...Object.values(scores));

      // Semantic matching bonus
      semanticKeywords.forEach(keyword => {
        if (keyword !== query) {
          const semanticScore = Math.max(
            calculateFuzzyScore(cert.acronym, keyword) * 0.8,
            calculateFuzzyScore(cert.name, keyword) * 0.7,
            calculateFuzzyScore(cert.level, keyword) * 0.6
          );
          if (semanticScore > 10) {
            maxScore = Math.max(maxScore, semanticScore);
            matchType = 'semantic';
          }
        }
      });

      // Determine match type
      if (cert.acronym.toLowerCase() === query || cert.name.toLowerCase().includes(query)) {
        matchType = 'exact';
      } else if (cert.acronym.toLowerCase().includes(query) || cert.name.toLowerCase().includes(query)) {
        matchType = 'partial';
      }

      if (maxScore > threshold) { // Dynamic threshold based on query length
        const categoryObj = CERTIFICATION_CATEGORIES.find(cat => 
          cat.certificationIds.includes(cert.id)
        );
        const categoryKey = categoryObj?.key || '';
        const categoryName = categoryObj ? t(categoryObj.translationKey) : '';

        // Translate description if it's a translation key
        const description = cert.description.startsWith('cert.') 
          ? t(cert.description) 
          : cert.description;

        results.push({
          type: 'certification',
          id: cert.id,
          title: `${cert.acronym} - ${cert.name}`,
          description: description,
          url: `${basePath}${langPath}/certifications/${cert.id}`,
          score: maxScore,
          matchType,
          category: categoryName,
          level: cert.level,
          tags: [cert.level, categoryKey, cert.type]
        });
      }
    });

    // Only search certifications - no categories, achievements, or tips

    // Sort by score (descending) and limit results
    return results
      .sort((a, b) => {
        // Primary sort: by score
        if (b.score !== a.score) return b.score - a.score;
        
        // Secondary sort: by match type priority
        const matchTypePriority = { exact: 4, partial: 3, semantic: 2, fuzzy: 1 };
        const aPriority = matchTypePriority[a.matchType];
        const bPriority = matchTypePriority[b.matchType];
        if (bPriority !== aPriority) return bPriority - aPriority;
        
        // All results are certifications now, so no type priority needed
        return 0;
      })
      .slice(0, 5); // Limit to 5 results
  };

  // Real-time search with debouncing for better performance
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (query.trim()) {
        const newSuggestions = generateSuggestions(query);
        setSuggestions(newSuggestions);
      } else {
        setSuggestions([]);
      }
      setFocusedIndex(-1);
    }, 150); // Small debounce for real-time feel

    return () => clearTimeout(timeoutId);
  }, [query]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    
    // Immediate update for single character to show instant feedback
    if (value.length === 1 || value.length === 0) {
      if (value.trim()) {
        setSuggestions(generateSuggestions(value));
      } else {
        setSuggestions([]);
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (suggestions.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setFocusedIndex(prev => (prev < suggestions.length - 1 ? prev + 1 : 0));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setFocusedIndex(prev => (prev > 0 ? prev - 1 : suggestions.length - 1));
        break;
      case 'Enter':
        e.preventDefault();
        if (focusedIndex >= 0) {
          window.location.pathname = suggestions[focusedIndex].url;
        }
        break;
      case 'Escape':
        setIsFocused(false);
        setSuggestions([]);
        setFocusedIndex(-1);
        inputRef.current?.blur();
        break;
    }
  };

  const handleSuggestionClick = (suggestion: SearchSuggestion) => {
    // Use window.location.pathname to navigate properly in GitHub Pages
    window.location.pathname = suggestion.url;
  };

  // Highlight matching text in suggestions
  const highlightMatch = (text: string, query: string) => {
    if (!query.trim() || query.length < 2) return text;
    
    try {
      const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
      const parts = text.split(regex);
      
      return parts.map((part, i) => 
        regex.test(part) ? (
          <mark key={i} className="bg-blue-600/30 text-blue-200 px-0.5 rounded">
            {part}
          </mark>
        ) : part
      );
    } catch {
      return text;
    }
  };

  // Certification icon only
  const getCertificationIcon = () => {
    return (
      <svg className="w-4 h-4 transition-transform duration-200" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z" />
        <circle cx="12" cy="12" r="3" fill="none" stroke="currentColor" strokeWidth="2"/>
      </svg>
    );
  };

  // Certification color only
  const getCertificationColor = (matchType?: string, score?: number) => {
    // Color intensity based on match quality
    if (matchType === 'exact') return 'text-blue-300';
    if (matchType === 'partial') return 'text-blue-400';
    if (score && score > 70) return 'text-blue-400';
    return 'text-blue-500';
  };

  return (
    <>
      {/* Mobile Search Button - Only visible on mobile */}
      <button
        onClick={() => {
          setIsExpanded(true);
          setTimeout(() => inputRef.current?.focus(), 100);
        }}
        className="sm:hidden flex items-center justify-center w-10 h-10 bg-slate-800/80 border border-slate-700 rounded-lg hover:bg-slate-700/80 transition-all duration-300"
        aria-label={t('aria.search')}
      >
        <svg className="w-5 h-5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </button>

      {/* Expanded Search for Mobile / Normal Search for Desktop */}
      <div 
        className={`${isExpanded ? 'fixed inset-0 bg-black/50 z-50 sm:relative sm:inset-auto sm:bg-transparent' : 'hidden sm:block'} sm:relative sm:w-full sm:max-w-md sm:mx-auto`}
        ref={containerRef}
      >
        {/* Mobile Search Header - matches main header height */}
        {isExpanded && (
          <div className="sm:hidden fixed top-0 left-0 right-0 h-20 bg-slate-900/95 backdrop-blur-xl border-b border-blue-900/30 shadow-lg shadow-black/10">
            <div className="h-full flex items-center px-2">
              <button
                onClick={() => {
                  setIsExpanded(false);
                  setQuery('');
                  setSuggestions([]);
                }}
                className="flex items-center justify-center w-10 h-10 text-gray-400 hover:text-white rounded-lg hover:bg-slate-700/50 transition-all duration-200"
                aria-label="Close search"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
              </button>
              <div className="flex-1 px-2 relative">
                {/* Search Icon */}
                <div className="absolute left-5 top-1/2 transform -translate-y-1/2 text-blue-400 z-10">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>

                {/* Clear button when there's text */}
                {query && (
                  <button
                    onClick={() => {
                      setQuery('');
                      setSuggestions([]);
                      inputRef.current?.focus();
                    }}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white active:text-blue-400 z-10 p-1.5"
                    type="button"
                    aria-label="Clear search"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}

                {/* Mobile Search Input - matches desktop search bar height */}
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setTimeout(() => setIsFocused(false), 100)}
                  placeholder={t('search.placeholder')}
                  className="w-full h-12 pl-11 pr-10 rounded-xl text-sm border-2 outline-none transition-all duration-300 bg-slate-800/80 border-blue-500/50 text-white placeholder-gray-400 shadow-lg shadow-blue-500/20 focus:border-blue-400 focus:shadow-blue-400/30 focus:bg-slate-800/90 focus:shadow-xl"
                  autoComplete="off"
                  autoCorrect="off"
                  autoCapitalize="off"
                  spellCheck="false"
                />
              </div>
            </div>
          </div>
        )}

        {/* Desktop Search */}
        <div className={`${isExpanded ? 'hidden' : 'hidden sm:block'} relative`}>
          {/* Search Icon */}
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-400 z-10">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>

          {/* Clear button when there's text */}
          {query && (
            <button
              onClick={() => {
                setQuery('');
                setSuggestions([]);
                inputRef.current?.focus();
              }}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white z-10 p-1"
              type="button"
              aria-label="Clear search"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}

          {/* Desktop Search Input */}
          <input
            type="text"
            value={query}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setTimeout(() => setIsFocused(false), 100)}
            placeholder={t('search.placeholder')}
            className="w-full h-12 pl-12 pr-4 rounded-xl text-sm border-2 outline-none transition-all duration-300 bg-slate-800/80 border-blue-500/50 text-white placeholder-gray-400 shadow-lg shadow-blue-500/20 focus:border-blue-400 focus:shadow-blue-400/30 focus:bg-slate-800/90 focus:shadow-xl"
            style={{
              boxShadow: isFocused 
                ? '0 0 20px rgba(59, 130, 246, 0.2), 0 0 40px rgba(59, 130, 246, 0.1)' 
                : '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
            }}
            aria-label={t('aria.search')}
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck="false"
          />

          {/* Glow Effect on Focus */}
          {isFocused && (
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-600/20 via-sky-500/10 to-blue-600/20 -z-10 blur-lg animate-pulse" />
          )}
        </div>

        {/* Search Suggestions */}
        {(isFocused || suggestions.length > 0) && suggestions.length > 0 && (
          <div className={`${isExpanded ? 'fixed top-20 left-2 right-2 mt-2' : 'absolute left-0 right-0 top-full mt-2 sm:mt-3'} bg-slate-800/98 sm:bg-slate-800/95 backdrop-blur-xl rounded-xl sm:rounded-2xl border border-blue-800/40 shadow-2xl shadow-black/20 overflow-hidden z-50 animate-in slide-in-from-top-2 duration-200`}>
          {/* Header gradient */}
          <div className="h-0.5 sm:h-1 bg-gradient-to-r from-blue-500 via-sky-400 to-blue-500" />
          
          <div className="p-1 sm:p-2 max-h-60 sm:max-h-80 overflow-y-auto">
            {suggestions.map((suggestion, index) => (
              <button
                key={`${suggestion.type}-${suggestion.id}`}
                onClick={() => handleSuggestionClick(suggestion)}
                className={`w-full text-left px-3 sm:px-4 py-2 sm:py-3 rounded-lg sm:rounded-xl transition-all duration-200 group relative overflow-hidden ${
                  index === focusedIndex
                    ? 'bg-gradient-to-r from-blue-600/80 to-blue-700/80 text-white shadow-lg shadow-blue-600/30'
                    : 'hover:bg-slate-700/50 text-gray-300 hover:text-white'
                }`}
              >
                {/* Active item glow effect - hidden on mobile */}
                {index === focusedIndex && (
                  <div className="hidden sm:block absolute inset-0 bg-gradient-to-r from-blue-600/20 via-blue-500/30 to-blue-600/20 animate-pulse" />
                )}
                
                <div className="flex items-start gap-2 sm:gap-3 relative z-10">
                  {/* Certification Icon - smaller on mobile */}
                  <div className={`mt-0.5 ${getCertificationColor(suggestion.matchType, suggestion.score)} transition-all duration-200 ${
                    index === focusedIndex ? '' : 'group-hover:scale-110'
                  } flex-shrink-0`}>
                    <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z" />
                      <circle cx="12" cy="12" r="3" fill="none" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    {/* Title */}
                    <div className={`text-sm sm:text-sm font-semibold transition-all duration-200 ${
                      index === focusedIndex ? 'text-white' : 'text-gray-300 group-hover:text-white'
                    }`}>
                      {highlightMatch(suggestion.title, query)}
                    </div>
                    
                    {/* Tags/Meta info */}
                    {(suggestion.level || suggestion.category) && (
                      <div className="flex items-center gap-1 mt-1.5 flex-wrap">
                        {suggestion.level && (
                          <span className="px-1.5 py-0.5 text-xs sm:text-xs bg-slate-700/50 text-gray-400 rounded">
                            {t(`certifications.level.${suggestion.level}`)}
                          </span>
                        )}
                        {suggestion.category && (
                          <span className="px-1.5 py-0.5 text-xs sm:text-xs bg-slate-700/50 text-gray-400 rounded">
                            {suggestion.category}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                  
                  {/* Arrow icon with relevance indicator - hidden on mobile */}
                  <div className="hidden sm:flex flex-col items-center mt-1">
                    <div className="opacity-0 group-hover:opacity-50 transition-opacity duration-200">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    
                    {/* Relevance dots */}
                    <div className="flex gap-0.5 mt-1">
                      {[...Array(3)].map((_, i) => (
                        <div
                          key={i}
                          className={`w-1 h-1 rounded-full transition-colors duration-200 ${
                            i < Math.ceil((suggestion.score / 100) * 3) 
                              ? 'bg-blue-400'
                              : 'bg-gray-600'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                
                {/* Hover shimmer effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
              </button>
            ))}
          </div>
        </div>
      )}

        {/* Backdrop for mobile */}
        {isFocused && suggestions.length > 0 && !isExpanded && (
          <div 
            className="fixed inset-0 bg-black/20 backdrop-blur-sm -z-20 lg:hidden"
            onClick={() => {
              setIsFocused(false);
              setSuggestions([]);
              setFocusedIndex(-1);
            }}
          />
        )}
      </div>
    </>
  );
}