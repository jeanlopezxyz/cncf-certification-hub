import { useTranslations } from '../../i18n/utils';
import { HeroText, BodyText, ButtonText } from '../ui/Typography';

interface HeroProps {
  lang: keyof typeof import('../../i18n/ui').ui;
}

export default function Hero({ lang }: HeroProps) {
  const t = useTranslations(lang);

  return (
    <section className="relative py-8 sm:py-12 overflow-hidden">
      {/* Beautiful Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-indigo-600 to-blue-700 dark:from-[#242145] dark:via-[#1A1735] dark:to-[#130F25]" />
      </div>

      {/* Content - Always centered */}
      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-20 3xl:px-32 text-center">
        <div className="animate-fade-in-up" style={{ animationDuration: '0.8s' }}>
          <HeroText className="mb-4 whitespace-pre-line">
            {t('hero.title')}
          </HeroText>

          <BodyText className="text-sm md:text-lg mb-6 max-w-2xl mx-auto" muted>
            {t('hero.description')}
          </BodyText>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="#achievements"
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg shadow-lg shadow-blue-600/20 transition-all duration-300 hover:from-blue-500 hover:to-blue-400 hover:shadow-xl hover:shadow-blue-500/30 active:scale-95 bounce-on-hover font-medium"
            >
              <ButtonText>{t('hero.cta.programs')}</ButtonText>
            </a>
            <a
              href="#certifications"
              className="px-6 py-3 bg-transparent border-2 border-white/30 text-white rounded-lg transition-all duration-300 hover:bg-white/20 hover:border-white/50 hover:shadow-lg active:scale-95 font-medium backdrop-blur-sm"
            >
              <ButtonText className="text-white">{t('hero.cta.certifications')}</ButtonText>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
