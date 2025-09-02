/**
 * Custom hook for tracking current path
 * Eliminates duplicate path tracking logic across sidebar components
 */

import { useState, useEffect } from 'react';
import type { Language } from '../types';
import { extractLanguageFromUrl } from '../utils/url';

interface UseCurrentPathOptions {
  includeHash?: boolean;
  includeSearch?: boolean;
}

export function useCurrentPath(
  lang: Language,
  options: UseCurrentPathOptions = {}
): {
  currentPath: string;
  isHomePage: boolean;
  isAchievementPage: boolean;
  isCertificationPage: boolean;
  isStudyTipPage: boolean;
  pathSegments: string[];
} {
  const { includeHash = false, includeSearch = false } = options;
  const [currentPath, setCurrentPath] = useState('');

  useEffect(() => {
    const updatePath = () => {
      let path = window.location.pathname;
      
      if (includeSearch && window.location.search) {
        path += window.location.search;
      }
      
      if (includeHash && window.location.hash) {
        path += window.location.hash;
      }
      
      setCurrentPath(path);
    };

    // Initial path
    updatePath();

    // Listen for navigation events
    const handleNavigation = () => {
      // Small delay to ensure DOM is updated
      setTimeout(updatePath, 10);
    };

    // Astro-specific navigation events
    document.addEventListener('astro:page-load', handleNavigation);
    document.addEventListener('astro:after-swap', handleNavigation);
    
    // Standard navigation events (fallback)
    window.addEventListener('popstate', handleNavigation);

    return () => {
      document.removeEventListener('astro:page-load', handleNavigation);
      document.removeEventListener('astro:after-swap', handleNavigation);
      window.removeEventListener('popstate', handleNavigation);
    };
  }, [lang, includeHash, includeSearch]);

  // Derive path information
  const pathSegments = currentPath.split('/').filter(Boolean);
  
  // Remove base path and language segments
  const basePath = process.env.NODE_ENV === 'production' ? 'cncf-certification-hub' : '';
  const relevantSegments = pathSegments.filter(segment => 
    segment !== basePath && segment !== lang
  );

  const isHomePage = relevantSegments.length === 0;
  const isAchievementPage = relevantSegments[0] === 'achievements';
  const isCertificationPage = relevantSegments[0] === 'certifications';
  const isStudyTipPage = relevantSegments[0] === 'tips';

  return {
    currentPath,
    isHomePage,
    isAchievementPage,
    isCertificationPage,
    isStudyTipPage,
    pathSegments: relevantSegments,
  };
}

/**
 * Hook for detecting active navigation items
 */
export function useActiveNavItem(itemPath: string, lang: Language): boolean {
  const { currentPath } = useCurrentPath(lang);
  
  // Normalize paths for comparison
  const normalizePath = (path: string) => {
    return path.replace(/^\/+|\/+$/g, '').toLowerCase();
  };

  const normalizedCurrent = normalizePath(currentPath);
  const normalizedItem = normalizePath(itemPath);

  // Exact match or starts with (for sub-pages)
  return normalizedCurrent === normalizedItem || 
         normalizedCurrent.startsWith(normalizedItem + '/');
}

/**
 * Hook for breadcrumb generation
 */
export function useBreadcrumbs(lang: Language): Array<{ label: string; url: string; isActive: boolean }> {
  const { pathSegments, currentPath } = useCurrentPath(lang);
  
  const breadcrumbs = [];
  let accumulatedPath = '';

  // Add home
  breadcrumbs.push({
    label: 'Home',
    url: `/${lang === 'en' ? '' : lang}`,
    isActive: pathSegments.length === 0,
  });

  // Build breadcrumbs from path segments
  pathSegments.forEach((segment, index) => {
    accumulatedPath += `/${segment}`;
    const isLast = index === pathSegments.length - 1;
    
    breadcrumbs.push({
      label: segment.charAt(0).toUpperCase() + segment.slice(1),
      url: `/${lang === 'en' ? '' : lang}${accumulatedPath}`,
      isActive: isLast,
    });
  });

  return breadcrumbs;
}