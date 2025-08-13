/**
 * Main i18n configuration file
 * Imports and exports all translations from locale files
 */

import { en } from './locales/en';
import { es } from './locales/es';
import { pt } from './locales/pt';

export const languages = {
  en: 'English',
  es: 'Español',
  pt: 'Português',
};

export const defaultLang = 'en';

// Export the unified translations object
export const ui = {
  en,
  es,
  pt,
} as const;
