import { useTranslations } from '../../i18n/utils';
import type { Certification, Language } from '../../types';

interface AchievementCertCardProps {
  cert: Certification | undefined;
  certId: string;
  basePath: string;
  lang: Language;
  index: number;
  showArrow?: boolean;
  gradient?: string;
}

export default function AchievementCertCard({ 
  cert, 
  certId, 
  basePath, 
  lang, 
  index, 
  showArrow = false,
  gradient = 'from-blue-900/90 to-blue-950/95'
}: AchievementCertCardProps) {
  const t = useTranslations(lang);
  const isCKS = certId === 'cks';

  return (
    <>
      <a href={`${basePath}/certifications/${certId}`} className="group flex-1 min-w-[45%] sm:min-w-0">
        <div className={`h-full min-h-[240px] sm:min-h-[220px] p-4 sm:p-4 rounded-xl border-2 transition-all duration-300 bg-gradient-to-br ${gradient} border-blue-700/70 hover:border-blue-500 hover:bg-gradient-to-br hover:from-blue-850/95 hover:to-blue-900/100 hover:shadow-lg hover:shadow-blue-500/50 flex`}>
          <div className="w-full flex flex-col text-center">
            {/* Acronym */}
            <div className="mb-3">
              <div className="text-3xl sm:text-3xl lg:text-3xl xl:text-3xl font-black text-white group-hover:text-blue-100 transition-all duration-200 tracking-tight">
                {cert?.acronym}
              </div>
            </div>

            {/* Name - Fixed height for alignment */}
            <div className="flex-1 px-2 mb-3 min-h-[3rem]">
              <div className="text-sm sm:text-sm lg:text-sm xl:text-sm text-gray-300 group-hover:text-gray-200 leading-tight transition-colors">
                {cert?.name}
              </div>
            </div>

            {/* Prerequisites - Clean text only */}
            {isCKS && (
              <div className="mb-2">
                <div className="text-xs font-medium px-2 py-1 rounded-md bg-orange-600/20 text-orange-200 border border-orange-500/40">
                  {t('achievements.kubestronaut.requiresCka')}
                </div>
              </div>
            )}

            {/* Level and Duration */}
            <div className="space-y-2 mt-auto">
              {/* Level */}
              <div className="flex justify-center">
                <div
                  className={`text-xs font-bold px-3 py-1.5 rounded-full border transition-all duration-200 inline-block ${
                    cert?.level === 'entry'
                      ? 'bg-emerald-500/20 text-emerald-200 border-emerald-400/40 group-hover:bg-emerald-500/30'
                      : cert?.level === 'intermediate'
                        ? 'bg-amber-500/20 text-amber-200 border-amber-400/40 group-hover:bg-amber-500/30'
                        : 'bg-red-500/20 text-red-200 border-red-400/40 group-hover:bg-red-500/30'
                  }`}
                >
                  {t(`certifications.level.${cert?.level}`)}
                </div>
              </div>

              {/* Duration */}
              <div className="flex justify-center">
                <div className="text-xs font-medium px-2 py-1 rounded-md bg-slate-700/50 text-slate-300 border border-slate-600/50">
                  {cert?.duration} {t('certifications.card.min')}
                </div>
              </div>
            </div>
          </div>
        </div>
      </a>

      {/* Arrow between cards - only on larger screens */}
      {showArrow && (
        <div className="hidden lg:flex items-center justify-center">
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