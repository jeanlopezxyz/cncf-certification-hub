import React from 'react';
import { useTranslations } from '../../i18n/utils';
import type { Language } from '../../types';
import { LevelBadge, PrerequisiteBadge } from '../ui/Badge';

interface CertificationGridProps {
  certIds: string[];
  certifications: any[];
  basePath: string;
  lang: Language;
  gridClass?: string;
  role?: string;
  'aria-label'?: string;
  variant?: 'kubestronaut' | 'cncf';
}

export default function CertificationGrid({
  certIds,
  certifications,
  basePath,
  lang,
  gridClass = "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5",
  role = "list",
  'aria-label': ariaLabel,
  variant = 'kubestronaut'
}: CertificationGridProps) {
  const t = useTranslations(lang);

  const getVariantStyles = () => {
    if (variant === 'cncf') {
      return {
        background: "from-blue-800/30 to-indigo-900/40",
        hoverBackground: "hover:from-blue-700/40 hover:to-indigo-800/50",
        textColor: "text-blue-300",
        hoverTextColor: "group-hover:text-blue-200",
        gridClass: "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6"
      };
    }
    
    return {
      background: "from-blue-900/90 to-blue-950/95",
      hoverBackground: "hover:from-blue-850/95 hover:to-blue-900/100",
      textColor: "text-white",
      hoverTextColor: "group-hover:text-blue-100",
      gridClass
    };
  };

  const styles = getVariantStyles();

  return (
    <div
      className={`grid ${styles.gridClass} gap-2 sm:gap-3`}
      role={role}
      aria-label={ariaLabel}
    >
      {certIds.map((certId, index) => {
        const cert = certifications.find(c => c.id === certId);
        const isCKS = certId === 'cks';

        return (
          <a
            key={certId}
            href={`${basePath}/certifications/${certId}`}
            className="group block"
            role="listitem"
            aria-posinset={index + 1}
            aria-setsize={certIds.length}
            aria-label={`${t('certifications.card.viewDetails')}: ${cert?.acronym ?? certId}`}
          >
            <div className={`h-full min-h-[240px] sm:min-h-[220px] p-4 sm:p-4 rounded-xl border-2 transition-all duration-300 bg-gradient-to-br ${styles.background} border-blue-700/70 hover:border-blue-500 hover:bg-gradient-to-br ${styles.hoverBackground} hover:shadow-lg hover:shadow-blue-500/50 flex relative`}>
              {/* Badge for CKS */}
              {isCKS && (
                <div className="absolute top-2 right-2 z-10 hidden md:block">
                  <span className="text-[10px] font-semibold px-2 py-1 rounded-md bg-orange-600/30 text-orange-100 border border-orange-500/40">
                    {t('achievements.kubestronaut.requiresCka')}
                  </span>
                </div>
              )}
              
              <div className={`w-full flex flex-col text-center ${isCKS ? 'md:pt-5' : ''}`}>
                {/* Acronym */}
                <div className="mb-3">
                  <div className={`${variant === 'cncf' ? 'text-3xl sm:text-3xl lg:text-2xl xl:text-3xl' : 'text-3xl sm:text-3xl lg:text-3xl xl:text-3xl'} font-black ${styles.textColor} ${styles.hoverTextColor} transition-all duration-200 tracking-tight`}>
                    {cert?.acronym}
                  </div>
                </div>

                {/* Badge for mobile CKS */}
                {isCKS && (
                  <div className="md:hidden mb-2 flex justify-center">
                    <span className="text-[10px] font-semibold px-2 py-1 rounded-md bg-orange-600/30 text-orange-100 border border-orange-500/40">
                      {t('achievements.kubestronaut.requiresCka')}
                    </span>
                  </div>
                )}

                {/* Name - Fixed height for alignment */}
                <div className="flex-1 px-2 mb-3 min-h-[3rem]">
                  <div className={`${variant === 'cncf' ? 'text-sm sm:text-sm lg:text-xs xl:text-sm text-gray-400' : 'text-sm sm:text-sm lg:text-sm xl:text-sm text-gray-300 group-hover:text-gray-200'} text-center leading-tight transition-colors`}>
                    {cert?.name}
                  </div>
                </div>

                {/* Level Badge */}
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
        );
      })}
    </div>
  );
}