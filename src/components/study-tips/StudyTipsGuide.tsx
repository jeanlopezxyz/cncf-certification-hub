import { useTranslations } from '../../i18n/utils';
import { useState } from 'react';

interface StudyTipsGuideProps {
  tipId: string;
  lang: keyof typeof import('../../i18n/ui').ui;
}

interface SubSection {
  title: string;
  items: string[];
  color?: string;
}

interface TipSection {
  id: string;
  title: string;
  icon: string;
  color: string;
  content: string[];
  subsections?: SubSection[];
}

export default function StudyTipsGuide({ tipId, lang }: StudyTipsGuideProps) {
  const t = useTranslations(lang);
  const [expandedSections, setExpandedSections] = useState<string[]>([]);

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev =>
      prev.includes(sectionId) 
        ? prev.filter(s => s !== sectionId) 
        : [...prev, sectionId]
    );
  };

  // Configuration for each tip page
  const tipConfigurations: Record<string, {
    title: string;
    description: string;
    heroColor: string;
    heroIcon: string;
    sections: TipSection[];
  }> = {
    'exam-preparation': {
      title: t('sidebar.tips.exam'),
      description: t('tips.exam.description'),
      heroColor: 'from-blue-700 via-blue-600 to-sky-600',
      heroIcon: `<path d="M12 14l9-5-9-5-9 5 9 5zm0 2.84l-6.62-3.71L4 14v5c0 .55.45 1 1 1h14c.55 0 1-.45 1-1v-5l-1.38-.87L12 16.84z"></path>`,
      sections: [
        {
          id: 'before',
          title: t('tips.exam.before.title'),
          icon: 'clock',
          color: 'from-blue-500 to-blue-600',
          content: [
            t('tips.exam.before.item1'),
            t('tips.exam.before.item2'),
            t('tips.exam.before.item3'),
            t('tips.exam.before.item4'),
            t('tips.exam.before.item5')
          ]
        },
        {
          id: 'during',
          title: t('tips.exam.during.title'),
          icon: 'check',
          color: 'from-green-500 to-green-600',
          content: [
            t('tips.exam.during.item1'),
            t('tips.exam.during.item2'),
            t('tips.exam.during.item3'),
            t('tips.exam.during.item4'),
            t('tips.exam.during.item5')
          ]
        },
        {
          id: 'performance',
          title: t('tips.exam.performance.title'),
          icon: 'performance',
          color: 'from-purple-500 to-purple-600',
          content: [
            t('tips.exam.performance.item1'),
            t('tips.exam.performance.item2'),
            t('tips.exam.performance.item3'),
            t('tips.exam.performance.item4'),
            t('tips.exam.performance.item5')
          ]
        },
        {
          id: 'general',
          title: t('tips.exam.general.title'),
          icon: 'star',
          color: 'from-orange-500 to-orange-600',
          content: [
            t('tips.exam.general.item1'),
            t('tips.exam.general.item2'),
            t('tips.exam.general.item3'),
            t('tips.exam.general.item4'),
            t('tips.exam.general.item5')
          ]
        }
      ]
    },
    'practice-labs': {
      title: t('sidebar.tips.practiceLabs'),
      description: t('tips.labs.description'),
      heroColor: 'from-purple-700 via-purple-600 to-pink-600',
      heroIcon: `<path d="M8 3v2H6v4c0 2.21 1.79 4 4 4s4-1.79 4-4V5h-2V3H8m0 2h4v4c0 1.1-.9 2-2 2s-2-.9-2-2V5m-5 7v6c0 2.21 1.79 4 4 4h2c2.21 0 4-1.79 4-4v-4h3c1.11 0 2-.89 2-2v-1h2v-2h-2V7h2V5h-2V4c0-1.11-.89-2-2-2h-4v2h4v1h-2v2h2v2h-2v2h-2v2h-3v4c0 1.1-.9 2-2 2H7c-1.1 0-2-.9-2-2v-6H3z"></path>`,
      sections: [
        {
          id: 'setup',
          title: t('tips.labs.setup.title'),
          icon: 'desktop',
          color: 'from-blue-500 to-blue-600',
          content: [
            t('tips.labs.setup.item1'),
            t('tips.labs.setup.item2'),
            t('tips.labs.setup.item3'),
            t('tips.labs.setup.item4'),
            t('tips.labs.setup.item5')
          ]
        },
        {
          id: 'resources',
          title: t('tips.labs.resources.title'),
          icon: 'check',
          color: 'from-green-500 to-green-600',
          content: [],
          subsections: [
            {
              title: t('tips.labs.resources.free'),
              color: 'green',
              items: [
                t('tips.labs.resources.freeItem1'),
                t('tips.labs.resources.freeItem2'),
                t('tips.labs.resources.freeItem3')
              ]
            },
            {
              title: t('tips.labs.resources.paid'),
              color: 'blue',
              items: [
                t('tips.labs.resources.paidItem1'),
                t('tips.labs.resources.paidItem2'),
                t('tips.labs.resources.paidItem3')
              ]
            }
          ]
        },
        {
          id: 'exercises',
          title: t('tips.labs.exercises.title'),
          icon: 'document',
          color: 'from-purple-500 to-purple-600',
          content: [
            t('tips.labs.exercises.item1'),
            t('tips.labs.exercises.item2'),
            t('tips.labs.exercises.item3'),
            t('tips.labs.exercises.item4'),
            t('tips.labs.exercises.item5')
          ]
        },
        {
          id: 'proTips',
          title: t('tips.labs.proTips.title'),
          icon: 'star',
          color: 'from-orange-500 to-orange-600',
          content: [
            t('tips.labs.proTips.item1'),
            t('tips.labs.proTips.item2'),
            t('tips.labs.proTips.item3'),
            t('tips.labs.proTips.item4'),
            t('tips.labs.proTips.item5')
          ]
        }
      ]
    },
    'study-path': {
      title: t('sidebar.tips.path'),
      description: t('tips.path.description'),
      heroColor: 'from-green-700 via-green-600 to-emerald-600',
      heroIcon: `<path d="M22 5.18L10.59 16.6l-4.24-4.24l1.41-1.41l2.83 2.83l10-10L22 5.18zM12 20c-4.41 0-8-3.59-8-8s3.59-8 8-8c1.57 0 3.04.46 4.28 1.25l1.45-1.45C16.1 2.67 14.13 2 12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c1.73 0 3.36-.44 4.78-1.22l-1.5-1.5c-1 .46-2.11.72-3.28.72z"></path>`,
      sections: [
        {
          id: 'week1',
          title: t('certification.studyPath.week1.title'),
          icon: '1',
          color: 'from-blue-500 to-blue-600',
          content: [
            t('certification.studyPath.week1.item1'),
            t('certification.studyPath.week1.item2'),
            t('certification.studyPath.week1.item3'),
            t('certification.studyPath.week1.item4')
          ],
          subsections: [
            {
              title: t('certification.studyPath.week1.focus'),
              items: [t('certification.studyPath.week1.description')]
            }
          ]
        },
        {
          id: 'week3',
          title: t('certification.studyPath.week3.title'),
          icon: '2',
          color: 'from-green-500 to-green-600',
          content: [
            t('certification.studyPath.week3.item1'),
            t('certification.studyPath.week3.item2'),
            t('certification.studyPath.week3.item3'),
            t('certification.studyPath.week3.item4')
          ],
          subsections: [
            {
              title: t('certification.studyPath.week3.focus'),
              items: [t('certification.studyPath.week3.description')]
            }
          ]
        },
        {
          id: 'week5',
          title: t('certification.studyPath.week5.title'),
          icon: '3',
          color: 'from-purple-500 to-purple-600',
          content: [
            t('certification.studyPath.week5.item1'),
            t('certification.studyPath.week5.item2'),
            t('certification.studyPath.week5.item3'),
            t('certification.studyPath.week5.item4')
          ],
          subsections: [
            {
              title: t('certification.studyPath.week5.focus'),
              items: [t('certification.studyPath.week5.description')]
            }
          ]
        },
        {
          id: 'keyTips',
          title: t('tips.path.keyTips.title'),
          icon: 'star',
          color: 'from-orange-500 to-orange-600',
          content: [
            t('tips.path.keyTips.item1'),
            t('tips.path.keyTips.item2'),
            t('tips.path.keyTips.item3'),
            t('tips.path.keyTips.item4'),
            t('tips.path.keyTips.item5')
          ]
        }
      ]
    },
    'time-management': {
      title: t('sidebar.tips.timeManagement'),
      description: t('tips.time.description'),
      heroColor: 'from-orange-700 via-orange-600 to-red-600',
      heroIcon: `<path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"></path>`,
      sections: [
        {
          id: 'planning',
          title: t('tips.time.planning.title'),
          icon: 'calendar',
          color: 'from-blue-500 to-blue-600',
          content: [
            t('tips.time.planning.item1'),
            t('tips.time.planning.item2'),
            t('tips.time.planning.item3'),
            t('tips.time.planning.item4'),
            t('tips.time.planning.item5')
          ]
        },
        {
          id: 'exam',
          title: t('tips.time.exam.title'),
          icon: 'time',
          color: 'from-green-500 to-green-600',
          content: [
            t('tips.time.exam.item1'),
            t('tips.time.exam.item2'),
            t('tips.time.exam.item3')
          ],
          subsections: [
            {
              title: t('tips.time.exam.strategy'),
              color: 'green',
              items: [
                t('tips.time.exam.strategyItem1'),
                t('tips.time.exam.strategyItem2'),
                t('tips.time.exam.strategyItem3')
              ]
            }
          ]
        },
        {
          id: 'techniques',
          title: t('tips.time.techniques.title'),
          icon: 'techniques',
          color: 'from-purple-500 to-purple-600',
          content: [],
          subsections: [
            { title: t('tips.time.techniques.pomodoro'), items: [t('tips.time.techniques.pomodoroDesc')] },
            { title: t('tips.time.techniques.blocks'), items: [t('tips.time.techniques.blocksDesc')] },
            { title: t('tips.time.techniques.active'), items: [t('tips.time.techniques.activeDesc')] },
            { title: t('tips.time.techniques.spaced'), items: [t('tips.time.techniques.spacedDesc')] }
          ]
        },
        {
          id: 'keyTips',
          title: t('tips.time.keyTips.title'),
          icon: 'star',
          color: 'from-yellow-500 to-yellow-600',
          content: [
            t('tips.time.keyTips.item1'),
            t('tips.time.keyTips.item2'),
            t('tips.time.keyTips.item3'),
            t('tips.time.keyTips.item4'),
            t('tips.time.keyTips.item5')
          ]
        }
      ]
    }
  };

  const config = tipConfigurations[tipId as keyof typeof tipConfigurations];

  if (!config) {
    return <div>Study tip not found</div>;
  }

  const renderIcon = (iconType: string, className: string = "w-6 h-6") => {
    const icons = {
      clock: `<path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z" />`,
      check: `<path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z" />`,
      performance: `<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />`,
      star: `<path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />`,
      desktop: `<path d="M20 18c1.1 0 1.99-.9 1.99-2L22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2H0v2h24v-2h-4zM4 6h16v10H4V6z" />`,
      document: `<path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20M10,19L12,15H13L11,19H10M15,10V11H8V10H15M17,14V15H8V14H17Z" />`,
      calendar: `<path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z" />`,
      time: `<path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm4.2 14.2L11 13V7h1.5v5.2l4.5 2.7-.8 1.3z" />`,
      techniques: `<path d="M9 4v1.38c-.83-.33-1.72-.5-2.61-.5-1.79 0-3.58.68-4.95 2.05l3.33 3.33h1.11v1.11c.86.86 1.98 1.31 3.11 1.36V15H6v3c0 1.1.9 2 2 2h10c1.66 0 3-1.34 3-3V4H9zm-1.11 6.41V8.26H5.61L4.57 7.22a5.07 5.07 0 0 1 1.82-.34c1.34 0 2.59.52 3.54 1.46l1.41 1.41-.2.2a2.7 2.7 0 0 1-1.92.8c-.47 0-.93-.12-1.33-.34zM19 17c0 .55-.45 1-1 1s-1-.45-1-1v-2h-6v-2.59c.57-.23 1.1-.57 1.56-1.03l.2-.2L15.59 14H17v-1.41l-6-5.97V6h8v11z" />`
    };
    
    if (iconType in ['1', '2', '3']) {
      return <span className="text-white font-bold">{iconType}</span>;
    }
    
    const iconPath = icons[iconType as keyof typeof icons] || icons.star;
    return <svg className={className} fill="currentColor" viewBox="0 0 24 24" dangerouslySetInnerHTML={{ __html: iconPath }} />;
  };

  return (
    <div className="min-h-screen">
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-20 3xl:px-32 py-6 sm:py-8">
        {/* Header Section - Compact version */}
        <div className="mb-4 sm:mb-6">
          <div className={`relative bg-gradient-to-br ${config.heroColor} rounded-2xl p-3 sm:p-4 lg:p-5 text-white shadow-xl overflow-hidden`}>
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-10">
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: "url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%23ffffff%22 fill-opacity=%220.4%22%3E%3Cpath d=%22M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')"
                }}
              ></div>
            </div>

            <div className="relative text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-white/30 to-blue-400/30 backdrop-blur-sm rounded-xl mb-3 shadow-lg">
                <svg className="w-7 h-7 text-white drop-shadow-lg" fill="currentColor" viewBox="0 0 24 24" dangerouslySetInnerHTML={{ __html: config.heroIcon }} />
              </div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent mb-2">
                {config.title}
              </h1>
              <p className="text-base sm:text-lg text-white/90 max-w-2xl mx-auto">
                {config.description}
              </p>
            </div>
          </div>
        </div>

        {/* Content Sections - Same card design as CertificationStudyGuide */}
        <div className="space-y-4">
          {config.sections.map((section, index) => (
            <div
              key={section.id}
              className="group relative bg-gradient-to-br from-blue-900/30 via-blue-900/40 to-blue-950/50 rounded-xl border border-blue-700/50 overflow-hidden hover:border-blue-500/50 transition-all duration-300"
            >
              {/* Background decoration */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-600/10 to-transparent rounded-full blur-3xl"></div>

              <button
                className="relative w-full p-5 text-left transition-all duration-300 hover:bg-blue-900/10"
                onClick={() => toggleSection(section.id)}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-start gap-3">
                      {/* Section Icon */}
                      <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${section.color} flex items-center justify-center text-white font-bold shadow-lg`}>
                        {renderIcon(section.icon)}
                      </div>

                      <div className="flex-1">
                        <h4 className="text-lg font-semibold text-white group-hover:text-blue-300 transition-colors">
                          {section.title}
                        </h4>
                        
                        {/* Info Pills */}
                        <div className="flex flex-wrap items-center gap-1.5 mt-1.5">
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-blue-900/30 text-blue-300 text-xs font-semibold rounded-md">
                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
                            </svg>
                            {section.content.length + (section.subsections?.reduce((acc: number, sub: SubSection) => acc + sub.items.length, 0) || 0)} {t('certification.tips')}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Expand Arrow */}
                  <div className={`p-1 rounded-lg bg-slate-800/50 group-hover:bg-slate-700/50 transition-colors ${expandedSections.includes(section.id) ? 'bg-blue-900/30' : ''}`}>
                    <svg
                      className={`w-4 h-4 text-gray-400 transition-transform duration-300 ${expandedSections.includes(section.id) ? 'rotate-180 text-blue-400' : ''}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </button>

              {/* Expanded Content */}
              {expandedSections.includes(section.id) && (
                <div className="border-t border-blue-700/50 bg-blue-900/30 px-5 py-4">
                  {/* Subsections */}
                  {section.subsections && section.subsections.map((subsection: SubSection, subIndex: number) => (
                    <div key={subIndex} className="mb-4 last:mb-0">
                      <div className={`bg-${subsection.color || 'blue'}-50 rounded-lg p-4 mb-3`}>
                        <h3 className="font-semibold text-gray-900 mb-2">{subsection.title}</h3>
                        <ul className="space-y-2">
                          {subsection.items.map((item: string, itemIndex: number) => (
                            <li key={itemIndex} className="flex items-start gap-2">
                              <span className={`text-${subsection.color || 'blue'}-500 mt-1`}>•</span>
                              <span className="text-gray-700">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}

                  {/* Main content items */}
                  {section.content.length > 0 && (
                    <div className="grid gap-2.5">
                      {section.content.map((item, itemIndex) => (
                        <div key={itemIndex} className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-slate-800/30 transition-colors">
                          <div className="w-6 h-6 rounded-full bg-blue-900/30 border border-blue-700/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <span className="text-xs text-blue-400">{itemIndex + 1}</span>
                          </div>
                          <span className="text-sm text-gray-300 leading-relaxed">{item}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Summary Card - Similar to CertificationStudyGuide */}
        <div className="mt-6 bg-gradient-to-r from-blue-900/30 to-sky-900/30 rounded-xl p-4 border border-blue-700/40">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">{t('certification.totalSections')}</p>
              <p className="text-2xl font-bold text-white">{config.sections.length}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-400">{t('certification.totalTips')}</p>
              <p className="text-2xl font-bold text-white">
                {config.sections.reduce((acc: number, section: TipSection) => 
                  acc + section.content.length + (section.subsections?.reduce((subAcc: number, sub: SubSection) => subAcc + sub.items.length, 0) || 0), 0
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
