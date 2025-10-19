/**
 * Application-wide constants
 * Core configuration that doesn't change
 */

export const APP_CONFIG = {
  name: 'CNCF Certification Resources Hub',
  shortName: 'CNCF Hub',
  description: 'Study guides & exam prep',
  basePath: '/cncf-certification-hub',
  defaultLanguage: 'en',
} as const;

// Re-export animations for backward compatibility
export { ANIMATIONS as ANIMATION_DURATION } from '../config/app.config';

// Re-export dimensions for backward compatibility
export const SIDEBAR_WIDTH = {
  collapsed: 0,
  expanded: 256, // 16rem = 256px (w-64)
} as const;
