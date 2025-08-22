import { useTranslations } from '../../i18n/utils';
import type { Certification, Language } from '../../types';

type BadgeTone = 'orange' | 'sky' | 'blue' | 'indigo' | 'emerald' | 'red';

interface AchievementCertCardProps {
  cert: Certification | undefined;
  certId: string;
  basePath: string;
  lang: Language;
  index: number;
  setSize?: number;
  showArrow?: boolean;
  gradient?: string;
  badge?: { text: string; tone?: BadgeTone };
}

export default function AchievementCertCard({
  cert,
  certId,
  basePath,
  lang,
  index,
  setSize = 5,
  showArrow = false,
  gradient = 'from-blue-900/90 to-blue-950/95',
  badge,
}: AchievementCertCardProps) {
  const t = useTranslations(lang);
  const isCKS = certId === 'cks';

  // Unified badge support (desktop absolute + mobile inline)
  const resolvedBadge = badge || (isCKS ? { text: t('achievements.kubestronaut.requiresCka'), tone: 'orange' as BadgeTone } : undefined);

  const toneToClasses = (tone: BadgeTone) => {
    switch (tone) {
      case 'sky':
        return 'bg-sky-600/30 text-sky-100 border border-sky-500/40';
      case 'blue':
        return 'bg-blue-600/30 text-blue-100 border border-blue-500/40';
      case 'indigo':
        return 'bg-indigo-600/30 text-indigo-100 border border-indigo-500/40';
      case 'emerald':
        return 'bg-emerald-600/30 text-emerald-100 border border-emerald-500/40';
      case 'red':
        return 'bg-red-600/30 text-red-100 border border-red-500/40';
      default:
        return 'bg-orange-600/30 text-orange-100 border border-orange-500/40';
    }
  };

  return (
    <>
      <div
        className="lg:flex-1"
        role="listitem"
        aria-posinset={index + 1}
        aria-setsize={setSize}
      >
      <a
        href={`${basePath}/certifications/${certId}`}
        className="group"
        aria-label={`${t('certifications.card.viewDetails')}: ${cert?.acronym ?? certId}`}
      >
        <div className={`h-full min-h-[240px] sm:min-h-[220px] p-4 sm:p-4 rounded-xl border-2 transition-all duration-300 bg-gradient-to-br ${gradient} border-blue-700/70 hover:border-blue-500 hover:bg-gradient-to-br hover:from-blue-850/95 hover:to-blue-900/100 hover:shadow-lg hover:shadow-blue-500/50 flex relative`}>
          {/* Unified badge (desktop absolute) */}
          {resolvedBadge && (
            <div className="absolute top-2 right-2 z-10 hidden md:block">
              <span className={`text-[10px] font-semibold px-2 py-1 rounded-md ${toneToClasses(resolvedBadge.tone || 'orange')}`}>
                {resolvedBadge.text}
              </span>
            </div>
          )}
          
          <div className={`w-full flex flex-col text-center ${resolvedBadge ? 'md:pt-5' : ''}`}>
            {/* Acronym */}
            <div className="mb-3">
              <div className="text-3xl sm:text-3xl lg:text-3xl xl:text-3xl font-black text-white group-hover:text-blue-100 transition-all duration-200 tracking-tight">
                {cert?.acronym}
              </div>
            </div>

            {/* Unified badge (mobile inline) */}
            {resolvedBadge && (
              <div className="md:hidden mb-2 flex justify-center">
                <span className={`text-[10px] font-semibold px-2 py-1 rounded-md ${toneToClasses(resolvedBadge.tone || 'orange')}`}>
                  {resolvedBadge.text}
                </span>
              </div>
            )}

            {/* Name - Fixed height for alignment */}
            <div className="flex-1 px-2 mb-3 min-h-[3rem]">
              <div className="text-sm sm:text-sm lg:text-sm xl:text-sm text-gray-300 group-hover:text-gray-200 leading-tight transition-colors">
                {cert?.name}
              </div>
            </div>

            {/* Level Only */}
            <div className="mt-auto">
              <div className="flex justify-center">
                <div
                  className={`text-xs font-semibold px-2 py-1 rounded-md border transition-all duration-200 inline-block ${
                    cert?.level === 'entry'
                      ? 'bg-emerald-600/30 text-emerald-300 border-emerald-500/40'
                      : cert?.level === 'intermediate'
                        ? 'bg-amber-600/30 text-amber-300 border-amber-500/40'
                        : 'bg-red-600/30 text-red-300 border-red-500/40'
                  }`}
                >
                  {t(`certifications.level.${cert?.level}`)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </a>
      </div>

      {/* Arrow between cards - only on larger screens */}
      {showArrow && (
        <div className="hidden 2xl:flex items-center justify-center">
          <svg className="w-6 h-6 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      )}
    </>
  );
}
