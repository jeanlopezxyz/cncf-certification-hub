/**
 * Unified Certification Card Component
 * Consolidates all card variations while maintaining exact functionality
 */

import React from 'react';
import { useTranslations, translateCertificationValue } from '../../i18n/utils';
import type { Certification, Language } from '../../types';
import { CardTitle, CardSubtitle } from './Typography';
import { LevelBadge, PrerequisiteBadge } from './Badge';
import { buildCertificationUrl } from '../../utils/url';
import { useFadeInUpStagger } from '../../hooks/useStaggeredAnimation';
import { DIMENSIONS } from '../../config/app.config';
import BaseCard from './BaseCard';

type CertCardVariant = 'detailed' | 'achievement' | 'compact';

interface CertCardProps {
  cert: Certification;
  lang: Language;
  variant?: CertCardVariant;
  index?: number;
  showAnimation?: boolean;
  customGradient?: string;
  badge?: {
    text: string;
    show: boolean;
  };
  className?: string;
  // Achievement-specific props
  setSize?: number;
  showArrow?: boolean;
}

const CertCard: React.FC<CertCardProps> = ({
  cert,
  lang,
  variant = 'detailed',
  index = 0,
  showAnimation = true,
  customGradient,
  badge,
  className = '',
  setSize,
  showArrow,
}) => {
  const t = useTranslations(lang);
  const animationProps = showAnimation ? useFadeInUpStagger(index) : { className: '', style: {} };
  const certUrl = buildCertificationUrl(cert.id, lang);

  // Variant-specific configurations
  const getVariantConfig = () => {
    switch (variant) {
      case 'detailed':
        return {
          cardVariant: 'certification' as const,
          size: 'large' as const,
          showGlowEffect: true,
          showPrerequisite: true,
          showExamType: true,
          titleSize: 'text-3xl sm:text-3xl lg:text-4xl',
          subtitleSize: 'text-sm sm:text-sm lg:text-base',
          padding: 'p-5 sm:p-6',
          minHeight: '',
          badgePosition: 'absolute top-3 right-3',
          contentPadding: 'pr-36', // Space for badge
        };
      
      case 'achievement':
        return {
          cardVariant: 'achievement' as const,
          size: 'normal' as const,
          showGlowEffect: false,
          showPrerequisite: false,
          showExamType: false,
          titleSize: 'text-2xl md:text-3xl',
          subtitleSize: 'text-xs md:text-sm',
          padding: `${DIMENSIONS.card.padding.mobile} ${DIMENSIONS.card.padding.tablet} ${DIMENSIONS.card.padding.desktop}`,
          minHeight: `${DIMENSIONS.card.minHeight.mobile} ${DIMENSIONS.card.minHeight.tablet} ${DIMENSIONS.card.minHeight.desktop}`,
          badgePosition: 'absolute top-2 right-2',
          contentPadding: badge?.show ? 'md:pt-5' : '',
        };
      
      case 'compact':
        return {
          cardVariant: 'certification' as const,
          size: 'compact' as const,
          showGlowEffect: false,
          showPrerequisite: false,
          showExamType: false,
          titleSize: 'text-xl md:text-2xl',
          subtitleSize: 'text-xs md:text-sm',
          padding: 'p-3 md:p-4',
          minHeight: 'min-h-[180px]',
          badgePosition: 'absolute top-2 right-2',
          contentPadding: '',
        };
    }
  };

  const config = getVariantConfig();
  const isCKS = cert.id === 'cks';
  const shouldShowBadge = badge?.show || (variant === 'achievement' && isCKS);

  // Render glow effect for detailed variant
  const GlowEffect = () => {
    if (!config.showGlowEffect) return null;
    
    return (
      <div 
        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at center, transparent 0%, rgba(59, 130, 246, 0.1) 100%)',
          boxShadow: '0 0 40px rgba(59, 130, 246, 0.3), inset 0 0 20px rgba(59, 130, 246, 0.05)',
        }}
      />
    );
  };

  // Render prerequisite badge
  const PrerequisiteSection = () => {
    if (!shouldShowBadge) return null;

    const badgeText = badge?.text || (isCKS ? t('achievements.kubestronaut.requiresCka') : '');
    
    return (
      <>
        {/* Desktop badge */}
        <div className={`${config.badgePosition} z-10 hidden md:block max-w-[140px]`}>
          <PrerequisiteBadge size={variant === 'achievement' ? 'small' : 'normal'}>
            {badgeText}
          </PrerequisiteBadge>
        </div>
        
        {/* Mobile badge (only for achievement variant) */}
        {variant === 'achievement' && (
          <div className="md:hidden mb-2 flex justify-center">
            <PrerequisiteBadge size="small">
              {badgeText}
            </PrerequisiteBadge>
          </div>
        )}
      </>
    );
  };

  // Render exam type badge for detailed variant
  const ExamTypeSection = () => {
    if (!config.showExamType) return null;
    
    return (
      <span
        className={`text-xs px-3 py-1.5 rounded-md font-semibold whitespace-nowrap ${
          cert.type === 'performance'
            ? 'bg-purple-900/40 text-purple-200 border border-purple-700/50'
            : 'bg-green-900/40 text-green-200 border border-green-700/50'
        }`}
      >
        {cert.type === 'performance' ? t('certifications.type.performance') : t('certifications.type.multipleChoice')}
      </span>
    );
  };

  return (
    <div
      className={variant === 'achievement' ? 'w-full' : ''}
      role={variant === 'achievement' ? 'listitem' : undefined}
      aria-posinset={variant === 'achievement' ? index + 1 : undefined}
      aria-setsize={variant === 'achievement' ? setSize : undefined}
    >
      <a
        href={certUrl}
        className={`${variant === 'detailed' ? 'block' : 'group'} ${animationProps.className || ''}`}
        style={animationProps.style || {}}
        aria-label={`${t('certifications.card.viewDetails')}: ${cert?.acronym ?? cert.id}`}
      >
        <BaseCard 
          variant={config.cardVariant}
          size={config.size}
          gradient={customGradient}
          className={`h-full ${config.minHeight} ${config.padding} flex relative ${className}`}
        >
          <GlowEffect />
          <PrerequisiteSection />
          
          <div className={`w-full flex flex-col ${variant === 'achievement' ? 'text-center' : 'text-left'} ${config.contentPadding}`}>
            {/* Title Section */}
            <div className="mb-3">
              <CardTitle className={`${config.titleSize} ${variant === 'detailed' ? 'bg-gradient-to-r from-blue-400 to-sky-400 bg-clip-text text-transparent' : 'text-white group-hover:text-blue-100'} transition-all duration-200 tracking-tight`}>
                {cert.acronym}
              </CardTitle>
            </div>

            {variant === 'achievement' && shouldShowBadge && (
              <div className="md:hidden mb-2 flex justify-center">
                <PrerequisiteBadge size="small">
                  {badge?.text || t('achievements.kubestronaut.requiresCka')}
                </PrerequisiteBadge>
              </div>
            )}

            {/* Subtitle/Description */}
            <div className={`flex-1 ${variant === 'detailed' ? 'line-clamp-2' : ''} ${variant === 'achievement' ? 'px-1 sm:px-1 md:px-2' : ''} mb-2 md:mb-3 ${variant === 'achievement' ? 'min-h-[2rem] sm:min-h-[2.5rem] md:min-h-[3rem]' : 'min-h-[2.5rem]'}`}>
              <CardSubtitle className={`${config.subtitleSize} ${variant === 'detailed' ? 'mt-2' : ''} ${variant === 'achievement' ? 'group-hover:text-gray-200 text-center' : ''} transition-colors`}>
                {cert.name}
              </CardSubtitle>
            </div>

            {/* Tags Section */}
            <div className={`${variant === 'detailed' ? 'mb-4' : 'mt-auto'}`}>
              <div className={`flex ${variant === 'detailed' ? 'flex-wrap gap-2' : 'justify-center'}`}>
                {/* Level Badge */}
                <LevelBadge 
                  level={cert.level} 
                  size={variant === 'achievement' ? 'small' : 'normal'}
                  className={variant === 'detailed' ? 'px-3 py-1.5 whitespace-nowrap' : ''}
                >
                  {t(`certifications.level.${cert.level}`)}
                </LevelBadge>
                
                {/* Exam Type (only for detailed) */}
                <ExamTypeSection />
              </div>
            </div>
          </div>
        </BaseCard>
      </a>
    </div>
  );
};

export default CertCard;