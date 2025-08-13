import { ui, defaultLang } from './ui';

export function getLangFromUrl(url: URL) {
  const segments = url.pathname.split('/').filter(Boolean);
  // Remove base path if exists
  if (segments[0] === 'cncf-certification-hub') {
    segments.shift();
  }
  // Check if first segment is a language
  if (segments[0] && segments[0] in ui) {
    return segments[0] as keyof typeof ui;
  }
  return defaultLang;
}

export function useTranslations(lang: keyof typeof ui) {
  return function t(key: string): string {
    const langTranslations = ui[lang] as Record<string, string>;
    const defaultTranslations = ui[defaultLang] as Record<string, string>;
    return langTranslations[key] || defaultTranslations[key] || key;
  };
}

// Helper to translate certification values
export function translateCertificationValue(value: string, lang: keyof typeof ui): string {
  const t = useTranslations(lang);

  // Map common certification values to translation keys
  const valueMap: Record<string, string> = {
    CKA: 'certification.values.cka',
    Kubestronaut: 'certification.values.kubestronaut',
    'Golden Kubestronaut': 'certification.values.goldenKubestronaut',
    'No prerequisites required': 'certification.values.noPrerequisites',
    'CKA certification required': 'certification.values.ckaRequired',
    'Not applicable for multiple-choice exam': 'certification.values.notApplicableMultiple',
    'Not applicable - No hands-on simulator provided':
      'certification.values.notApplicableSimulator',
  };

  return valueMap[value] ? t(valueMap[value]) : value;
}

export function getRouteFromUrl(url: URL): string | undefined {
  const pathname = new URL(url).pathname;
  const parts = pathname?.split('/');
  const path = parts.pop() || parts.pop();
  return path;
}
