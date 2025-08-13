import type { Certification } from '../../types';
import { APP_CONFIG } from '../../constants';
import { ChevronDownIcon } from '../icons';
import { useTranslations } from '../../i18n/utils';

interface CertificationCategoryProps {
  categoryKey: string;
  categoryName: string;
  certifications: Certification[];
  isOpen: boolean;
  onToggle: () => void;
  lang: string;
  onLinkClick?: () => void;
}

/**
 * Component for displaying a category of certifications in the sidebar
 */
export default function CertificationCategory({
  categoryKey: _categoryKey,
  categoryName,
  certifications,
  isOpen,
  onToggle,
  lang,
  onLinkClick,
}: CertificationCategoryProps) {
  if (!certifications || certifications.length === 0) return null;

  const t = useTranslations(lang as 'en' | 'es' | 'pt');
  const basePath = `${APP_CONFIG.basePath}${lang === 'en' ? '' : '/' + lang}`;

  return (
    <div>
      <button
        onClick={onToggle}
        className="w-full flex items-center gap-3 text-sm font-medium text-gray-400 hover:text-blue-400 py-3 px-2 rounded-lg hover:bg-slate-800/20 transition-all duration-200"
        aria-expanded={isOpen}
        aria-label={`Toggle ${categoryName} category`}
      >
        <span className="w-1 h-1 bg-purple-400 rounded-full flex-shrink-0 ml-2"></span>
        <span className="flex-1 text-left">{t(categoryName) || categoryName}</span>
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-500">{certifications.length}</span>
          <div className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}>
            <ChevronDownIcon className="w-3 h-3" />
          </div>
        </div>
      </button>

      <div
        className={`space-y-1 overflow-hidden transition-all duration-300 ${
          isOpen ? 'max-h-[300px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        {certifications.map(cert => (
          <a
            key={cert.id}
            href={`${basePath}/certifications/${cert.id}`}
            onClick={onLinkClick}
            className="flex items-center gap-3 text-sm text-gray-400 hover:text-blue-400 transition-all duration-200 py-2 px-2 rounded-lg hover:bg-slate-800/20"
          >
            <span className="w-1 h-1 bg-purple-400 rounded-full flex-shrink-0 ml-8"></span>
            <span>{cert.acronym}</span>
          </a>
        ))}
      </div>
    </div>
  );
}
