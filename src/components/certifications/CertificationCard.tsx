import { useTranslations, translateCertificationValue } from '../../i18n/utils';
import { buildCertificationUrl } from '../../utils';
import type { Certification, Language } from '../../types';
import { CardTitle, CardSubtitle } from '../ui/Typography';
import { LevelBadge, PrerequisiteBadge } from '../ui/Badge';
import { useFadeInUpStagger } from '../../hooks/useStaggeredAnimation';

interface CertificationCardProps {
  certification: Certification;
  lang: Language;
  index: number;
}

/**
 * Simplified certification card without flip animation
 */
export default function CertificationCard({
  certification: cert,
  lang,
  index,
}: CertificationCardProps) {
  const t = useTranslations(lang);
  const certUrl = buildCertificationUrl(cert.id, lang);
  const animationProps = useFadeInUpStagger(index);

  return (
    <a
      href={certUrl}
      className={`block group ${animationProps.className}`}
      style={animationProps.style}
    >
      <div
        className="h-full bg-gradient-to-br from-white via-blue-50/30 to-indigo-50/50 dark:from-slate-900/80 dark:via-slate-800/60 dark:to-slate-900/80 backdrop-blur-sm border border-gray-200/80 dark:border-slate-700/50 rounded-2xl p-6 sm:p-7 hover:border-blue-400/60 dark:hover:border-blue-500/60 hover:shadow-2xl hover:shadow-blue-500/20 dark:hover:shadow-blue-900/40 transition-all duration-500 relative flex flex-col group overflow-hidden hover:-translate-y-2"
        style={{
          transform: 'translateZ(0)',
          backfaceVisibility: 'hidden',
        }}
      >
        {/* Animated gradient background on hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-indigo-500/5 to-purple-500/5 dark:from-blue-500/10 dark:via-indigo-500/10 dark:to-purple-500/10"></div>
        </div>

        {/* Enhanced glow effect on hover */}
        <div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none"
          style={{
            background: 'radial-gradient(circle at center, rgba(59, 130, 246, 0.15) 0%, transparent 70%)',
            boxShadow: '0 0 80px rgba(59, 130, 246, 0.3), inset 0 0 40px rgba(59, 130, 246, 0.1)',
          }}
        />

        {/* Corner accent */}
        <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-blue-500/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        {/* Prerequisite Badge - Top right corner with proper spacing */}
        {cert.prerequisite && (
          <div className="absolute top-3 right-3 z-10 max-w-[140px]">
            <PrerequisiteBadge size="normal">
              {translateCertificationValue(cert.prerequisite, lang)}
            </PrerequisiteBadge>
          </div>
        )}

        {/* Header Section - Flexible height */}
        <div className="mb-4">
          <div className="flex items-start justify-between">
            <div className="flex-1" style={{ paddingRight: cert.prerequisite ? '150px' : '20px' }}>
              <CardTitle className="bg-gradient-to-r from-blue-400 to-sky-400 bg-clip-text text-transparent block">
                {cert.acronym}
              </CardTitle>
              <CardSubtitle className="mt-2 line-clamp-2 min-h-[2.5rem]">
                {cert.name}
              </CardSubtitle>
            </div>
          </div>
        </div>

        {/* Primary Tags Section - Responsive layout */}
        <div className="mb-4">
          <div className="flex flex-wrap gap-2">
            {/* Level */}
            <LevelBadge level={cert.level} size="normal" className="px-3 py-1.5 whitespace-nowrap">
              {t(`certifications.level.${cert.level}`)}
            </LevelBadge>

            {/* Exam Type - Hide on very small screens if needed */}
            <span
              className={`text-xs px-3 py-1.5 rounded-md font-semibold whitespace-nowrap ${
                cert.type === 'performance'
                  ? 'bg-purple-900/40 text-purple-200 border border-purple-700/50'
                  : 'bg-blue-900/40 text-blue-200 border border-blue-700/50'
              }`}
            >
              {t(
                `certifications.type.${cert.type === 'performance' ? 'handsOn' : 'multipleChoice'}`
              )}
            </span>

            {/* Duration - On new line if needed */}
            <span className="text-xs bg-slate-900/40 px-3 py-1.5 rounded-md text-slate-200 border border-slate-700/50 font-semibold whitespace-nowrap">
              {cert.duration} {t('certifications.card.min')}
            </span>
          </div>
        </div>

        {/* Achievement Badges Section - Flexible with minimum height */}
        <div className="mb-4 min-h-[60px] flex-1">
          {cert.requiredFor && cert.requiredFor.length > 0 ? (
            <>
              <div className="text-xs text-gray-400 mb-1.5 font-medium">
                {t('certifications.requiredFor')}
              </div>
              <div className="flex flex-wrap gap-2">
                {cert.requiredFor.map((badge: string) => (
                  <span
                    key={badge}
                    className={`text-xs px-3 py-1.5 rounded-md font-semibold inline-flex items-center gap-1 ${
                      badge === 'Kubestronaut'
                        ? 'bg-blue-900/40 text-blue-200 border border-blue-700/50'
                        : 'bg-amber-900/40 text-amber-200 border border-amber-700/50'
                    }`}
                  >
                    <svg className="w-2.5 sm:w-3 h-2.5 sm:h-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.293l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="whitespace-nowrap">{translateCertificationValue(badge, lang)}</span>
                  </span>
                ))}
              </div>
            </>
          ) : (
            <div></div>
          )}
        </div>

        {/* View Details Link - Always at bottom */}
        <div className="mt-auto pt-4 border-t border-gray-200 dark:border-dark-border-primary">
          <div className="flex items-center justify-between mt-3">
            <span className="text-sm font-medium text-gray-600 dark:text-dark-text-tertiary group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-all duration-300">
              {t('certifications.card.viewDetails')}
            </span>
            <svg
              className="w-4 h-4 text-blue-500 group-hover:text-blue-600 group-hover:translate-x-1 transition-all duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>
    </a>
  );
}
