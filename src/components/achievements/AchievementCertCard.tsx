import { useTranslations } from '../../i18n/utils';
import type { Certification, Language } from '../../types';
import { CardTitle, CardSubtitle } from '../ui/Typography';
import { LevelBadge, PrerequisiteBadge } from '../ui/Badge';
import { buildCertificationUrl } from '../../utils/url';
import { DIMENSIONS } from '../../config/app.config';

type BadgeTone = 'orange' | 'blue' | 'purple' | 'green' | 'red' | 'amber';

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

  return (
    <>
      <div
        className="w-full"
        role="listitem"
        aria-posinset={index + 1}
        aria-setsize={setSize}
      >
      <a
        href={buildCertificationUrl(certId, lang)}
        className="group"
        aria-label={`${t('certifications.card.viewDetails')}: ${cert?.acronym ?? certId}`}
      >
        <div className={`h-full w-full ${DIMENSIONS.card.minHeight.mobile} ${DIMENSIONS.card.minHeight.tablet} ${DIMENSIONS.card.minHeight.desktop} ${DIMENSIONS.card.padding.mobile} ${DIMENSIONS.card.padding.tablet} ${DIMENSIONS.card.padding.desktop} rounded-lg lg:rounded-xl border-2 transition-all duration-300 bg-gradient-to-br ${gradient} border-blue-700/70 hover:border-blue-500 hover:bg-gradient-to-br hover:from-blue-850/95 hover:to-blue-900/100 hover:shadow-lg hover:shadow-blue-500/50 flex relative`}>
          {/* Unified badge (desktop absolute) */}
          {resolvedBadge && (
            <div className="absolute top-2 right-2 z-10 hidden md:block">
              <PrerequisiteBadge size="small">
                {resolvedBadge.text}
              </PrerequisiteBadge>
            </div>
          )}
          
          <div className={`w-full flex flex-col text-center ${resolvedBadge ? 'md:pt-5' : ''}`}>
            {/* Acronym */}
            <div className="mb-2 md:mb-3">
              <CardTitle className="group-hover:text-blue-100 transition-all duration-200">
                {cert?.acronym}
              </CardTitle>
            </div>

            {/* Unified badge (mobile inline) */}
            {resolvedBadge && (
              <div className="md:hidden mb-2 flex justify-center">
                <PrerequisiteBadge size="small">
                  {resolvedBadge.text}
                </PrerequisiteBadge>
              </div>
            )}

            {/* Name - Fixed height for alignment */}
            <div className="flex-1 px-1 sm:px-1 md:px-2 mb-2 md:mb-3 min-h-[2rem] sm:min-h-[2.5rem] md:min-h-[3rem]">
              <CardSubtitle className="group-hover:text-gray-200 transition-colors text-center">
                {cert?.name}
              </CardSubtitle>
            </div>

            {/* Level Only */}
            <div className="mt-auto">
              <div className="flex justify-center">
                <LevelBadge level={cert?.level || 'entry'} size="small">
                  {t(`certifications.level.${cert?.level}`)}
                </LevelBadge>
              </div>
            </div>
          </div>
        </div>
      </a>
      </div>

    </>
  );
}
