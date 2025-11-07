import { useTranslations } from '../../i18n/utils';
import { HeroText, BodyText, ButtonText } from '../ui/Typography';

interface HeroProps {
  lang: keyof typeof import('../../i18n/ui').ui;
}

export default function Hero({ lang }: HeroProps) {
  const t = useTranslations(lang);

  return (
    <section className="relative py-16 sm:py-24 overflow-hidden">
      {/* Enhanced Background with animated gradient */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 dark:from-[#242145] dark:via-[#1A1735] dark:to-[#130F25] animate-gradient" />

        {/* Animated mesh gradient overlay */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
          <div className="absolute top-0 -right-4 w-72 h-72 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
        </div>

        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>

        {/* Glow effects */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/30 rounded-full filter blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-500/30 rounded-full filter blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>
      </div>

      {/* Content - Always centered */}
      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-20 3xl:px-32 text-center">
        <div className="animate-fade-in-up" style={{ animationDuration: '0.8s' }}>
          {/* Floating badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-white/10 backdrop-blur-lg rounded-full border border-white/20 shadow-lg">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="text-sm font-semibold text-white">16 CNCF Certifications Available</span>
          </div>

          <HeroText className="mb-6 whitespace-pre-line drop-shadow-2xl">
            {t('hero.title')}
          </HeroText>

          <BodyText className="text-base md:text-xl mb-8 max-w-3xl mx-auto text-white/90 leading-relaxed drop-shadow-lg" muted>
            {t('hero.description')}
          </BodyText>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="#achievements"
              className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 text-white rounded-xl shadow-2xl shadow-blue-600/50 transition-all duration-300 hover:shadow-blue-500/60 hover:scale-105 active:scale-95 font-semibold overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2">
                <ButtonText>{t('hero.cta.programs')}</ButtonText>
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            </a>
            <a
              href="#certifications"
              className="group px-8 py-4 bg-white/10 backdrop-blur-lg border-2 border-white/30 text-white rounded-xl transition-all duration-300 hover:bg-white/20 hover:border-white/50 hover:shadow-xl hover:shadow-white/20 hover:scale-105 active:scale-95 font-semibold"
            >
              <span className="flex items-center gap-2">
                <ButtonText className="text-white">{t('hero.cta.certifications')}</ButtonText>
                <svg className="w-5 h-5 group-hover:rotate-45 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </a>
          </div>

          {/* Stats section */}
          <div className="mt-12 flex flex-wrap justify-center gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-1">16+</div>
              <div className="text-sm text-white/70">Certifications</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-1">3</div>
              <div className="text-sm text-white/70">Languages</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-1">100%</div>
              <div className="text-sm text-white/70">Free Resources</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <svg className="w-6 h-6 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
}
