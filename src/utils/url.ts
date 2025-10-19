/**
 * Centralized URL building utilities
 * Eliminates scattered URL construction logic
 */

import { APP_CONFIG } from '../constants';
import type { Language } from '../types';

/**
 * Builds the base path with language prefix
 */
export function buildBasePath(lang: Language): string {
  const langPath = lang === 'en' ? '' : `/${lang}`;
  return `${APP_CONFIG.basePath || ''}${langPath}`;
}

/**
 * Builds certification page URL
 */
export function buildCertificationUrl(certId: string, lang: Language): string {
  const basePath = buildBasePath(lang);
  return `${basePath}/certifications/${certId}`;
}

/**
 * Builds achievement page URL
 */
export function buildAchievementUrl(achievementId: string, lang: Language): string {
  const basePath = buildBasePath(lang);
  return `${basePath}/achievements/${achievementId}`;
}

/**
 * Builds study tips page URL
 */
export function buildStudyTipUrl(tipId: string, lang: Language): string {
  const basePath = buildBasePath(lang);
  return `${basePath}/tips/${tipId}`;
}

/**
 * Builds home page URL for language
 */
export function buildHomeUrl(lang: Language): string {
  return buildBasePath(lang) || '/';
}

/**
 * Generic route builder for any path
 */
export function buildRoute(path: string, lang: Language): string {
  const basePath = buildBasePath(lang);
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return `${basePath}/${cleanPath}`;
}

/**
 * Extracts language from current URL
 */
export function extractLanguageFromUrl(url: string): Language {
  const pathname = new URL(url, 'http://localhost').pathname;
  const segments = pathname.split('/').filter(Boolean);
  
  // Remove base path segments
  const baseSegments = (APP_CONFIG.basePath || '').split('/').filter(Boolean);
  const pathSegments = segments.slice(baseSegments.length);
  
  const lang = pathSegments[0] || '';
  return ['es', 'pt'].includes(lang) ? lang as Language : 'en';
}

/**
 * Validates if URL belongs to the current app
 */
export function isInternalUrl(url: string): boolean {
  try {
    const urlObj = new URL(url, window.location.origin);
    return urlObj.origin === window.location.origin && 
           urlObj.pathname.startsWith(APP_CONFIG.basePath || '');
  } catch {
    return false;
  }
}

/**
 * Navigation helper that handles internal vs external links
 */
export function navigateTo(url: string): void {
  if (isInternalUrl(url)) {
    window.location.pathname = url;
  } else {
    window.open(url, '_blank', 'noopener,noreferrer');
  }
}