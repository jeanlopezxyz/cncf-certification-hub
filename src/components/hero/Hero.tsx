import { useTranslations } from '../../i18n/utils';

interface HeroProps {
  lang: keyof typeof import('../../i18n/ui').ui;
}

export default function Hero({ lang }: HeroProps) {
  const t = useTranslations(lang);

  return (
    <section className="relative py-8 sm:py-12 overflow-hidden">
      {/* Kubernetes-inspired Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-950 via-blue-900/90 to-blue-950/80" />
      </div>

      {/* Content - Always centered */}
      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-20 3xl:px-32 text-center">
        <div className="animate-fade-in-up" style={{ animationDuration: '0.8s' }}>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-4">
            <span className="bg-gradient-to-r from-blue-400 via-sky-300 to-blue-400 bg-clip-text text-transparent whitespace-pre-line">
              {t('hero.title')}
            </span>
          </h1>

          <p className="text-sm md:text-lg text-gray-300 mb-6 max-w-2xl mx-auto">
            {t('hero.description')}
          </p>

          <div className="flex flex-col sm:flex-row gap-2 justify-center">
            <a
              href="#achievements"
              className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg font-semibold text-sm hover:from-blue-500 hover:to-blue-400 shadow-lg shadow-blue-600/20 transition-all duration-300 hover-scale active:scale-95"
            >
              {t('hero.cta.programs')}
            </a>
            <a
              href="#certifications"
              className="px-5 py-2.5 bg-transparent border-2 border-blue-800/50 text-blue-300 rounded-lg font-semibold text-sm hover:bg-blue-950/30 hover:border-blue-700/50 transition-all duration-300 hover-scale active:scale-95"
            >
              {t('hero.cta.certifications')}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
