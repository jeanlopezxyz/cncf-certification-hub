import { useTranslations } from '../../i18n/utils';
import { APP_CONFIG } from '../../constants';

interface AchievementProgramsProps {
  lang: keyof typeof import('../../i18n/ui').ui;
}

export default function AchievementPrograms({ lang }: AchievementProgramsProps) {
  const t = useTranslations(lang);

  const programs = [
    {
      id: 'kubestronaut',
      title: t('achievements.kubestronaut.title'),
      description: t('achievements.kubestronaut.description'),
      requirement: t('certifications.card.required'),
      href: `/achievements/kubestronaut`,
      gradient: 'from-blue-600 to-sky-600',
      borderColor: 'border-blue-500/30',
      iconSrc: `${APP_CONFIG.basePath}/kubestronaut-icon.svg`,
    },
    {
      id: 'golden',
      title: t('achievements.golden.title'),
      description: t('achievements.golden.description'),
      requirement: t('certifications.card.required'),
      href: `/achievements/golden-kubestronaut`,
      gradient: 'from-amber-600 to-yellow-600',
      borderColor: 'border-amber-500/30',
      iconSrc: `${APP_CONFIG.basePath}/golden-kubestronaut-icon.svg`,
    },
  ];

  return (
    <section id="achievements" className="py-12 sm:py-16 scroll-section">
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
          {programs.map(program => (
            <a
              key={program.id}
              href={program.href}
              className="group relative bg-gradient-to-br from-blue-900/40 to-blue-950/50 rounded-2xl p-6 border-2 border-blue-700/50 hover:border-blue-500/60 transition-all duration-300 hover:shadow-xl hover:shadow-blue-400/20 hover:scale-105 flex"
            >
              <div className="flex items-start gap-4 w-full">
                {/* Icon */}
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl flex items-center justify-center flex-shrink-0">
                  <img
                    src={program.iconSrc}
                    alt={program.title}
                    className="w-full h-full object-contain drop-shadow-lg"
                  />
                </div>

                {/* Content */}
                <div className="flex-1 flex flex-col">
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-300 transition-colors">
                    {program.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed flex-1">
                    {program.description}
                  </p>
                </div>

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
