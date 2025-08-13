import { useTranslations, translateCertificationValue } from '../../i18n/utils';
import { buildCertificationUrl } from '../../utils';
import { ANIMATION_DELAYS } from '../../constants/animations';
import type { Certification, Language } from '../../types';

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

  return (
    <a
      href={certUrl}
      className="block animate-fade-in-up group"
      style={{
        animationDelay: `${index * ANIMATION_DELAYS.cardStagger}ms`,
      }}
    >
      <div className="h-full bg-gradient-to-br from-blue-900/40 to-blue-950/50 border border-blue-700/50 rounded-xl p-6 lg:p-7 hover:border-blue-500/60 transition-all duration-300 relative hover:shadow-lg hover:shadow-blue-500/20 hover:scale-[1.02] flex flex-col min-h-[340px]">
        {/* Prerequisite Badge */}
        {cert.prerequisite && (
          <div className="absolute top-4 right-4">
            <span className="text-xs bg-gradient-to-r from-orange-900/40 to-amber-900/40 text-orange-200 px-2.5 py-1 rounded-full border border-orange-700/50 font-semibold">
              {translateCertificationValue(cert.prerequisite, lang)}
            </span>
          </div>
        )}

        {/* Header - Fixed Height Section */}
        <div className="mb-6 min-h-[80px] flex flex-col justify-start">
          <div className="flex items-start justify-between">
            <div className="flex-1 pr-4">
              <span className="text-3xl lg:text-4xl font-black bg-gradient-to-r from-blue-400 to-sky-400 bg-clip-text text-transparent block leading-none">
                {cert.acronym}
              </span>
              <h3 className="text-sm lg:text-base text-gray-300 mt-3 line-clamp-2 leading-relaxed min-h-[40px] flex items-start">
                {cert.name}
              </h3>
            </div>
          </div>
        </div>

        {/* Primary Tags - Fixed Height Section */}
        <div className="mb-5 min-h-[60px] flex flex-col justify-start">
          <div className="flex flex-wrap gap-2.5">
            {/* Level */}
            <span
              className={`text-xs px-3 py-1.5 rounded-full font-medium ${
                cert.level === 'entry'
                  ? 'bg-green-900/40 text-green-200 border border-green-700/50'
                  : cert.level === 'intermediate'
                    ? 'bg-yellow-900/40 text-yellow-200 border border-yellow-700/50'
                    : 'bg-red-900/40 text-red-200 border border-red-700/50'
              }`}
            >
              {t(`certifications.level.${cert.level}`)}
            </span>

            {/* Exam Type */}
            <span
              className={`text-xs px-3 py-1.5 rounded-full font-medium ${
                cert.type === 'performance'
                  ? 'bg-purple-900/40 text-purple-200 border border-purple-700/50'
                  : 'bg-blue-900/40 text-blue-200 border border-blue-700/50'
              }`}
            >
              {t(
                `certifications.type.${cert.type === 'performance' ? 'handsOn' : 'multipleChoice'}`
              )}
            </span>

            {/* Duration */}
            <span className="text-xs bg-slate-900/40 px-3 py-1.5 rounded-full text-slate-200 border border-slate-700/50 font-medium">
              {cert.duration}m
            </span>
          </div>
        </div>

        {/* Achievement Badges - Fixed Height Section */}
        <div className="mb-4 min-h-[80px] flex flex-col justify-start">
          {cert.requiredFor && cert.requiredFor.length > 0 ? (
            <>
              <div className="text-xs text-gray-400 mb-2 font-medium">
                {t('certifications.requiredFor')}
              </div>
              <div className="flex flex-wrap gap-2">
                {cert.requiredFor.map((badge: string) => (
                  <span
                    key={badge}
                    className={`text-xs px-3 py-1.5 rounded-full font-medium inline-flex items-center gap-1 ${
                      badge === 'Kubestronaut'
                        ? 'bg-blue-900/40 text-blue-200 border border-blue-700/50'
                        : 'bg-amber-900/40 text-amber-200 border border-amber-700/50'
                    }`}
                  >
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.293l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {translateCertificationValue(badge, lang)}
                  </span>
                ))}
              </div>
            </>
          ) : (
            <div></div>
          )}
        </div>

        {/* View Details Link - Always at bottom */}
        <div className="mt-auto pt-4 border-t border-blue-700/30">
          <div className="flex items-center justify-between mt-3">
            <span className="text-sm font-medium text-gray-300 group-hover:text-blue-300 transition-colors">
              {t('certifications.card.viewDetails')}
            </span>
            <svg
              className="w-4 h-4 text-blue-400 group-hover:text-blue-300 transition-all group-hover:translate-x-1"
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
