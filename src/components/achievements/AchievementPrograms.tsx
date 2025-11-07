import { useTranslations } from '../../i18n/utils';
import { APP_CONFIG } from '../../constants';

interface AchievementProgramsProps {
  lang: keyof typeof import('../../i18n/ui').ui;
}

export default function AchievementPrograms({ lang }: AchievementProgramsProps) {
  const t = useTranslations(lang);
  
  // Build proper URLs that work both locally and on GitHub Pages
  const basePath = APP_CONFIG.basePath || '';
  const langPath = lang === 'en' ? '' : `/${lang}`;

  const programs = [
    {
      id: 'kubestronaut',
      title: t('achievements.kubestronaut.title'),
      description: t('achievements.kubestronaut.description'),
      requirement: t('certifications.card.required'),
      href: `${basePath}${langPath}/achievements/kubestronaut`,
      gradient: 'from-blue-600 to-sky-600',
      borderColor: 'border-blue-500/30',
      iconSrc: `${APP_CONFIG.basePath}/kubestronaut-icon.svg`,
    },
    {
      id: 'golden',
      title: t('achievements.golden.title'),
      description: t('achievements.golden.description'),
      requirement: t('certifications.card.required'),
      href: `${basePath}${langPath}/achievements/golden-kubestronaut`,
      gradient: 'from-amber-600 to-yellow-600',
      borderColor: 'border-amber-500/30',
      iconSrc: `${APP_CONFIG.basePath}/golden-kubestronaut-icon.svg`,
    },
  ];

  return (
    <section id="achievements" className="pt-4 pb-6 sm:pt-6 sm:pb-8 scroll-section">
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-20 3xl:px-32">
        {/* Section Header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-blue-400 to-sky-300 bg-clip-text text-transparent">
              {t('achievements.programs.title')}
            </span>
          </h2>
          <p className="text-sm md:text-base text-gray-300 max-w-3xl mx-auto">
            {t('achievements.programs.subtitle')}
          </p>
        </div>

        {/* Programs Grid */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto md:items-stretch">
          {programs.map((program, index) => (
            <a
              key={program.id}
              href={program.href}
              className="group relative bg-gradient-to-br from-blue-900/30 via-indigo-900/20 to-blue-950/40 backdrop-blur-sm rounded-2xl p-8 border-2 border-blue-700/40 hover:border-blue-500/70 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-400/30 hover:-translate-y-2 flex overflow-hidden"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Animated background gradient on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-indigo-600/10 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              {/* Glow effect */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: 'radial-gradient(circle at center, rgba(59, 130, 246, 0.1) 0%, transparent 70%)',
                  boxShadow: '0 0 60px rgba(59, 130, 246, 0.2)'
                }}
              ></div>

              {/* Decorative corner */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              <div className="flex items-start gap-6 w-full relative z-10">
                {/* Icon with float animation */}
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:animate-float">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-indigo-500/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <img
                      src={program.iconSrc}
                      alt={program.title}
                      className="w-full h-full object-contain drop-shadow-2xl relative z-10 transform group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 flex flex-col">
                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-300 group-hover:to-sky-200 group-hover:bg-clip-text transition-all duration-300">
                    {program.title}
                  </h3>
                  <p className="text-gray-400 text-base leading-relaxed flex-1 group-hover:text-gray-300 transition-colors">
                    {program.description}
                  </p>

                {/* Arrow */}
                <div className="text-gray-500 group-hover:text-blue-400 transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
