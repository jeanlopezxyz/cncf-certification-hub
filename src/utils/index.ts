/**
 * Consolidated utility functions
 * Only includes functions that are actually being used in the application
 */

import { APP_CONFIG } from '../constants';
import type { Certification, CertificationLevel, Language } from '../types';

/**
 * Filter certifications by level
 * Used in: CertificationGrid
 */
export function filterCertificationsByLevel(
  certifications: Certification[],
  level: CertificationLevel | 'all'
): Certification[] {
  if (level === 'all') return certifications;
  return certifications.filter(cert => cert.level === level);
}

/**
 * Build a localized URL path
 * Used internally by buildCertificationUrl
 */
function buildLocalizedPath(path: string, lang: Language): string {
  const basePath = APP_CONFIG.basePath;
  const langPrefix = lang === 'en' ? '' : `/${lang}`;
  return `${basePath}${langPrefix}${path}`;
}

/**
 * Build certification detail URL
 * Used in: CertificationCard
 */
export function buildCertificationUrl(certId: string, lang: Language): string {
  return buildLocalizedPath(`/certifications/${certId}`, lang);
}
