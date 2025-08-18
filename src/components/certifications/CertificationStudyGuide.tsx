import { useTranslations, translateCertificationValue } from '../../i18n/utils';
import type { Certification } from '../../types';
import { useState } from 'react';

interface CertificationStudyGuideProps {
  certification: Certification;
  lang: keyof typeof import('../../i18n/ui').ui;
}

// Helper functions for safe property access
const hasProperty = (obj: unknown, prop: string): boolean => {
  return typeof obj === 'object' && obj !== null && prop in obj;
};

const getStringProperty = (obj: unknown, prop: string): string | undefined => {
  if (hasProperty(obj, prop)) {
    const value = (obj as Record<string, unknown>)[prop];
    return typeof value === 'string' ? value : undefined;
  }
  return undefined;
};

const getBooleanProperty = (obj: unknown, prop: string): boolean => {
  if (hasProperty(obj, prop)) {
    const value = (obj as Record<string, unknown>)[prop];
    return Boolean(value);
  }
  return false;
};

export default function CertificationStudyGuide({
  certification,
  lang,
}: CertificationStudyGuideProps) {
  const t = useTranslations(lang);
  const [activeTab, setActiveTab] = useState<'overview' | 'domains' | 'resources' | 'path'>(
    'overview'
  );
  const [expandedDomains, setExpandedDomains] = useState<string[]>([]);
  const [expandedResourceCategories, setExpandedResourceCategories] = useState<string[]>([]);
  const [activeResourceTab, setActiveResourceTab] = useState<
    'essential' | 'practice' | 'learning' | 'community'
  >('essential');
  const [expandedStudyPhases, setExpandedStudyPhases] = useState<string[]>([]);

  const toggleExpandDomain = (domainName: string) => {
    setExpandedDomains(prev =>
      prev.includes(domainName) ? prev.filter(d => d !== domainName) : [...prev, domainName]
    );
  };

  const toggleResourceCategory = (categoryId: string) => {
    setExpandedResourceCategories(prev =>
      prev.includes(categoryId) ? prev.filter(c => c !== categoryId) : [...prev, categoryId]
    );
  };

  const toggleStudyPhase = (phaseId: string) => {
    setExpandedStudyPhases(prev =>
      prev.includes(phaseId) ? prev.filter(p => p !== phaseId) : [...prev, phaseId]
    );
  };

  // Study sections with organized resources
  const studySections = [
    {
      id: 'official',
      title: t('certification.sections.official'),
      type: 'official' as const,
      resources: [
        {
          title: t('certification.resource.officialPage'),
          url: certification.resources.official,
          description: t('certification.resource.officialDesc'),
        },
      ],
    },
    {
      id: 'books',
      title: t('certification.sections.books'),
      type: 'books' as const,
      resources: certification.resources.books || [],
    },
    {
      id: 'courses',
      title: t('certification.sections.courses'),
      type: 'courses' as const,
      resources: certification.resources.courses || [],
    },
    {
      id: 'videos',
      title: t('certification.sections.videos'),
      type: 'videos' as const,
      resources: certification.resources.videos || [],
    },
    {
      id: 'practice',
      title: t('certification.sections.practice'),
      type: 'practice' as const,
      resources: certification.resources.practice.map(url => ({
        title: url.includes('killer')
          ? t('certification.resource.killersh')
          : url.includes('kodekloud')
            ? t('certification.resource.kodekloud')
            : url.includes('killercoda')
              ? t('certification.resource.killercoda')
              : t('certification.resource.practiceplatform'),
        url,
        description: url.includes('killer')
          ? t('certification.resource.killershDesc')
          : url.includes('kodekloud')
            ? t('certification.resource.kodekloudDesc')
            : url.includes('killercoda')
              ? t('certification.resource.killercodaDesc')
              : t('certification.resource.practiceDesc'),
        isPaid: url.includes('killer.sh') || url.includes('kodekloud'),
      })),
    },
    {
      id: 'github',
      title: t('certification.sections.github'),
      type: 'github' as const,
      resources: certification.resources.github.map(url => ({
        title: url.split('/').slice(-2).join('/'),
        url,
        description: t('certification.resource.githubDesc'),
      })),
    },
    {
      id: 'blogs',
      title: t('certification.sections.blogs'),
      type: 'blogs',
      resources: certification.resources.blogs || [],
    },
    {
      id: 'documentation',
      title: t('certification.sections.documentation'),
      type: 'documentation',
      resources: certification.resources.documentation || [],
    },
    {
      id: 'tools',
      title: t('certification.sections.tools'),
      type: 'tools',
      resources: certification.resources.tools || [],
    },
    {
      id: 'communities',
      title: t('certification.sections.communities'),
      type: 'communities',
      resources: certification.resources.communities || [],
    },
  ].filter(section => section.resources.length > 0); // Only show sections with resources

  // Study path recommendations
  const studyPath = [
    {
      week: t('certification.studyPath.week1.title'),
      title: t('certification.studyPath.week1.subtitle'),
      tasks: [
        t('certification.studyPath.week1.task1'),
        t('certification.studyPath.week1.task2'),
        t('certification.studyPath.week1.task3'),
        t('certification.studyPath.week1.task4'),
      ],
    },
    {
      week: t('certification.studyPath.week2.title'),
      title: t('certification.studyPath.week2.subtitle'),
      tasks: [
        t('certification.studyPath.week2.task1'),
        t('certification.studyPath.week2.task2'),
        t('certification.studyPath.week2.task3'),
        t('certification.studyPath.week2.task4'),
      ],
    },
    {
      week: t('certification.studyPath.week3.title'),
      title: t('certification.studyPath.week3.subtitle'),
      tasks: [
        t('certification.studyPath.week3.task1'),
        t('certification.studyPath.week3.task2'),
        t('certification.studyPath.week3.task3'),
        t('certification.studyPath.week3.task4'),
      ],
    },
  ];

  return (
    <div className="min-h-screen">
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-20 3xl:px-32 py-6 sm:py-8">
        {/* Header Section */}
        <div className="mb-6 sm:mb-8">
          {/* Certification Header */}
          <div
            className={`relative bg-gradient-to-br ${certification.color} rounded-3xl p-2 text-white shadow-2xl overflow-hidden`}
          >
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-10">
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage:
                    "url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%23ffffff%22 fill-opacity=%220.4%22%3E%3Cpath d=%22M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')",
                }}
              ></div>
            </div>

            <div className="relative bg-gradient-to-r from-blue-950/95 to-blue-900/95 backdrop-blur-sm rounded-2xl p-6 sm:p-8">
              <div className="text-left">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent mb-2">
                  {certification.acronym}
                </h1>
                <h2 className="text-lg sm:text-xl font-semibold text-white">
                  {certification.name}
                </h2>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-6 sm:mb-8 border-b border-gray-800">
          <nav className="flex flex-wrap gap-2 sm:gap-4 lg:gap-8">
            {[
              { id: 'overview', label: t('certification.overview') },
              { id: 'domains', label: t('certification.domains') },
              { id: 'resources', label: t('certification.studyResources') },
              { id: 'path', label: t('certification.studyPath') },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() =>
                  setActiveTab(tab.id as 'overview' | 'domains' | 'resources' | 'path')
                }
                className={`pb-3 sm:pb-4 px-1 sm:px-2 border-b-2 font-medium text-xs sm:text-sm transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-400'
                    : 'border-transparent text-gray-400 hover:text-white hover:border-gray-600'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div>
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="grid lg:grid-cols-3 gap-4 sm:gap-6">
              {/* Left Column - Main Info */}
              <div className="lg:col-span-2 space-y-4 sm:space-y-6">
                {/* Basic Exam Information */}
                <div className="bg-gradient-to-br from-blue-900/40 to-blue-950/50 rounded-xl p-4 sm:p-6 border border-blue-700/50">
                  <h3 className="text-xl font-bold mb-6 text-white flex items-center gap-2">
                    <svg
                      className="w-6 h-6 text-blue-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                      />
                    </svg>
                    {t('certification.examOverview')}
                  </h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Left sub-column */}
                    <div className="space-y-4">
                      <div>
                        <div className="text-sm text-blue-300 font-medium mb-1">
                          {t('certification.examType')}
                        </div>
                        <div className="font-semibold text-white bg-blue-900/30 rounded-lg px-3 py-2 border border-blue-700/30">
                          {certification.type === 'performance'
                            ? t('certification.performance')
                            : t('certification.multipleChoice')}
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-blue-300 font-medium mb-1">
                          {t('certification.duration')}
                        </div>
                        <div className="font-semibold text-white bg-blue-900/30 rounded-lg px-3 py-2 border border-blue-700/30">
                          {certification.duration} {t('certification.minutes')}
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-blue-300 font-medium mb-1">
                          {t('certification.level')}
                        </div>
                        <div className="font-semibold text-white bg-blue-900/30 rounded-lg px-3 py-2 border border-blue-700/30 capitalize">
                          {certification.level === 'entry'
                            ? t('certification.beginner')
                            : certification.level === 'intermediate'
                              ? t('certification.intermediate')
                              : t('certification.advanced')}
                        </div>
                      </div>
                      {certification.kubernetesVersion && (
                        <div>
                          <div className="text-sm text-blue-300 font-medium mb-1">
                            {t('certification.kubernetesVersion')}
                          </div>
                          <div className="font-semibold text-white bg-blue-900/30 rounded-lg px-3 py-2 border border-blue-700/30">
                            {translateCertificationValue(certification.kubernetesVersion, lang)}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Right sub-column */}
                    <div className="space-y-4">
                      {certification.prerequisites && (
                        <div>
                          <div className="text-sm text-blue-300 font-medium mb-1">
                            {t('certification.prerequisites')}
                          </div>
                          <div className="font-semibold text-white bg-amber-900/30 rounded-lg px-3 py-2 border border-amber-700/30">
                            {translateCertificationValue(certification.prerequisites, lang)}
                          </div>
                        </div>
                      )}
                      {certification.examAttempts && (
                        <div>
                          <div className="text-sm text-blue-300 font-medium mb-1">
                            {t('certification.examAttempts')}
                          </div>
                          <div className="font-semibold text-white bg-green-900/30 rounded-lg px-3 py-2 border border-green-700/30">
                            {certification.examAttempts} {t('certification.attemptsIncluded')}
                          </div>
                        </div>
                      )}
                      {certification.requiredFor && (
                        <div>
                          <div className="text-sm text-blue-300 font-medium mb-1">
                            {t('certification.requiredFor')}
                          </div>
                          <div className="font-semibold text-white bg-purple-900/30 rounded-lg px-3 py-2 border border-purple-700/30">
                            {certification.requiredFor
                              .map(item => translateCertificationValue(item, lang))
                              .join(', ')}
                          </div>
                        </div>
                      )}
                      {certification.examFormat && (
                        <div>
                          <div className="text-sm text-blue-300 font-medium mb-1">
                            {t('certification.examFormat')}
                          </div>
                          <div className="font-semibold text-white bg-blue-900/30 rounded-lg px-3 py-2 border border-blue-700/30">
                            {translateCertificationValue(certification.examFormat, lang)}
                          </div>
                        </div>
                      )}
                      {certification.retakePolicy && (
                        <div>
                          <div className="text-sm text-blue-300 font-medium mb-1">
                            {t('certification.retakePolicy')}
                          </div>
                          <div className="font-semibold text-white bg-blue-900/30 rounded-lg px-3 py-2 border border-blue-700/30">
                            {translateCertificationValue(certification.retakePolicy, lang)}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Practice Simulator Section - Only for performance-based exams */}
                {certification.type === 'performance' && certification.simulatorProvider && (
                  <div className="bg-gradient-to-br from-green-900/40 to-emerald-950/50 rounded-xl p-4 sm:p-6 border border-green-700/50">
                    <h3 className="text-xl font-bold mb-4 text-white flex items-center gap-2">
                      <svg
                        className="w-5 h-5 text-green-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                      {t('certification.practiceSimulatorIncluded')}
                    </h3>
                    <div className="bg-green-900/30 rounded-lg p-4 border border-green-700/30">
                      <div className="font-semibold text-green-300 text-lg mb-2">
                        {certification.simulatorProvider}
                      </div>
                      <div className="text-green-100">
                        {t('certification.practiceEnvironmentIncluded')}
                      </div>
                      {certification.simulatorAccess && (
                        <div className="text-sm text-green-200 mt-2 bg-green-800/30 rounded px-3 py-2">
                          <span className="font-medium">{t('certification.access')}:</span>{' '}
                          {translateCertificationValue(certification.simulatorAccess, lang)}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Right Sidebar */}
              <div className="space-y-4 sm:space-y-6">
                {/* Exam Registration */}
                <div className="bg-gradient-to-br from-blue-900/30 to-slate-900 rounded-xl p-4 sm:p-6 border border-blue-800/50 shadow-lg shadow-blue-900/20">
                  <h3 className="text-lg sm:text-xl font-bold mb-4 text-white flex items-center gap-2">
                    <svg
                      className="w-5 h-5 text-blue-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                      />
                    </svg>
                    {t('certification.registerForExam')}
                  </h3>
                  <div className="space-y-3">
                    <a
                      href={certification.resources.official}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-3 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors text-white"
                    >
                      <span className="font-medium">{t('certification.officialRegistration')}</span>
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Domains Tab */}
          {activeTab === 'domains' && (
            <div className="space-y-4">
              {/* Domain Cards Grid */}
              <div className="grid gap-4">
                {certification.domains.map((domain, index) => (
                  <div
                    key={domain.name}
                    className="group relative bg-gradient-to-br from-blue-900/30 via-blue-900/40 to-blue-950/50 rounded-xl border border-blue-700/50 overflow-hidden hover:border-blue-500/50 transition-all duration-300"
                  >
                    {/* Background decoration */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-600/10 to-transparent rounded-full blur-3xl"></div>

                    <button
                      className="relative w-full p-5 text-left transition-all duration-300 hover:bg-blue-900/10"
                      onClick={() => toggleExpandDomain(domain.name)}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-start gap-3">
                            {/* Domain Number */}
                            <div
                              className={`w-10 h-10 rounded-lg bg-gradient-to-br ${
                                index === 0
                                  ? 'from-blue-500 to-blue-600'
                                  : index === 1
                                    ? 'from-purple-500 to-purple-600'
                                    : index === 2
                                      ? 'from-green-500 to-green-600'
                                      : index === 3
                                        ? 'from-orange-500 to-orange-600'
                                        : 'from-pink-500 to-pink-600'
                              } flex items-center justify-center text-white font-bold shadow-lg`}
                            >
                              {index + 1}
                            </div>

                            <div className="flex-1">
                              <h4 className="text-lg font-semibold text-white group-hover:text-blue-300 transition-colors">
                                {domain.name}
                              </h4>

                              {/* Info Pills */}
                              <div className="flex flex-wrap items-center gap-1.5 mt-1.5">
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-blue-900/30 text-blue-300 text-xs rounded-full">
                                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                                  </svg>
                                  {t('certification.weight')}: {domain.weight}%
                                </span>
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-purple-900/30 text-purple-300 text-xs rounded-full">
                                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
                                  </svg>
                                  {domain.topics.length} {t('certification.topics')}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Right Side - Weight & Arrow */}
                        <div className="flex items-center gap-3">
                          {/* Circular Progress */}
                          <div className="relative w-14 h-14">
                            <svg className="w-14 h-14 -rotate-90">
                              <circle
                                cx="28"
                                cy="28"
                                r="24"
                                stroke="currentColor"
                                strokeWidth="4"
                                fill="none"
                                className="text-slate-700"
                              />
                              <circle
                                cx="28"
                                cy="28"
                                r="24"
                                stroke="currentColor"
                                strokeWidth="4"
                                fill="none"
                                strokeDasharray={`${domain.weight * 1.5} 150`}
                                className="text-blue-500"
                              />
                            </svg>
                            <div className="absolute inset-0 flex items-center justify-center">
                              <span className="text-sm font-bold text-white">{domain.weight}%</span>
                            </div>
                          </div>

                          {/* Expand Arrow */}
                          <div
                            className={`p-1 rounded-lg bg-slate-800/50 group-hover:bg-slate-700/50 transition-colors ${
                              expandedDomains.includes(domain.name) ? 'bg-blue-900/30' : ''
                            }`}
                          >
                            <svg
                              className={`w-4 h-4 text-gray-400 transition-transform duration-300 ${
                                expandedDomains.includes(domain.name)
                                  ? 'rotate-180 text-blue-400'
                                  : ''
                              }`}
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 9l-7 7-7-7"
                              />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </button>

                    {/* Expanded Content */}
                    {expandedDomains.includes(domain.name) && (
                      <div className="border-t border-blue-700/50 bg-blue-900/30 px-5 py-4">
                        <div className="grid gap-2.5">
                          {domain.topics.map((topic, topicIndex) => (
                            <div
                              key={topicIndex}
                              className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-slate-800/30 transition-colors"
                            >
                              <div className="w-6 h-6 rounded-full bg-blue-900/30 border border-blue-700/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                                <span className="text-xs text-blue-400">{topicIndex + 1}</span>
                              </div>
                              <span className="text-sm text-gray-300 leading-relaxed">{topic}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Summary Card */}
              <div className="mt-6 bg-gradient-to-r from-blue-900/30 to-sky-900/30 rounded-xl p-4 border border-blue-700/40">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400">{t('certification.totalDomains')}</p>
                    <p className="text-2xl font-bold text-white">{certification.domains.length}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-400">{t('certification.totalTopics')}</p>
                    <p className="text-2xl font-bold text-white">
                      {certification.domains.reduce((acc, d) => acc + d.topics.length, 0)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Resources Tab */}
          {activeTab === 'resources' && (
            <div>
              {/* Sub-tabs for Resources */}
              <div className="flex flex-wrap gap-2 mb-6 bg-slate-900/50 rounded-lg p-2">
                <button
                  onClick={() => setActiveResourceTab('essential')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                    activeResourceTab === 'essential'
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  {t('certification.essential')}
                </button>
                <button
                  onClick={() => setActiveResourceTab('practice')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                    activeResourceTab === 'practice'
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  {t('certification.practice')}
                </button>
                <button
                  onClick={() => setActiveResourceTab('learning')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                    activeResourceTab === 'learning'
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  {t('certification.learning')}
                </button>
                <button
                  onClick={() => setActiveResourceTab('community')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                    activeResourceTab === 'community'
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  {t('certification.community')}
                </button>
              </div>

              {/* Resource Content by Tab */}
              <div className="space-y-4">
                {/* Essential Resources Tab */}
                {activeResourceTab === 'essential' && (
                  <>
                    {studySections
                      .filter(s => ['official', 'books', 'courses'].includes(s.id))
                      .map(section => (
                        <div
                          key={section.id}
                          className="bg-gradient-to-br from-blue-900/40 to-blue-950/50 rounded-xl border border-blue-700/50 overflow-hidden"
                        >
                          <button
                            onClick={() => toggleResourceCategory(section.id)}
                            className="w-full p-4 flex items-center justify-between hover:bg-slate-800/50 transition-colors"
                          >
                            <h4 className="text-lg font-semibold text-white flex items-center gap-3">
                              {section.title}
                              <span className="text-base text-gray-400 font-normal">
                                ({section.resources.length})
                              </span>
                            </h4>
                            <svg
                              className={`w-5 h-5 text-gray-400 transition-transform ${
                                expandedResourceCategories.includes(section.id) ? 'rotate-180' : ''
                              }`}
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 9l-7 7-7-7"
                              />
                            </svg>
                          </button>

                          {expandedResourceCategories.includes(section.id) && (
                            <div className="border-t border-blue-700/50 p-4">
                              <div className="grid gap-3">
                                {section.resources.slice(0, 3).map((resource, index) => (
                                  <a
                                    key={index}
                                    href={resource.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group flex items-start gap-3 p-3 bg-slate-800/50 hover:bg-slate-700/50 rounded-lg transition-all"
                                  >
                                    <div className="flex-1">
                                      <div className="text-base font-medium text-white group-hover:text-blue-400 transition-colors">
                                        {resource.title}
                                      </div>
                                      {getStringProperty(resource, 'author') && (
                                        <div className="text-sm text-gray-500 mt-0.5">
                                          {t('certification.by')}{' '}
                                          {getStringProperty(resource, 'author')}
                                        </div>
                                      )}
                                      <div className="flex flex-wrap items-center gap-2 mt-2">
                                        {getBooleanProperty(resource, 'isPaid') && (
                                          <span className="px-2 py-1 bg-yellow-500/20 text-yellow-400 text-sm rounded">
                                            {t('certification.paid')}
                                          </span>
                                        )}
                                        {getStringProperty(resource, 'difficulty') && (
                                          <span
                                            className={`px-2 py-1 text-sm rounded ${
                                              getStringProperty(resource, 'difficulty') ===
                                              'beginner'
                                                ? 'bg-green-500/20 text-green-400'
                                                : getStringProperty(resource, 'difficulty') ===
                                                    'intermediate'
                                                  ? 'bg-blue-500/20 text-blue-400'
                                                  : 'bg-red-500/20 text-red-400'
                                            }`}
                                          >
                                            {getStringProperty(resource, 'difficulty') ===
                                            'beginner'
                                              ? t('certification.beginner')
                                              : getStringProperty(resource, 'difficulty') ===
                                                  'intermediate'
                                                ? t('certification.intermediate')
                                                : t('certification.advanced')}
                                          </span>
                                        )}
                                        {getStringProperty(resource, 'duration') && (
                                          <span className="text-sm text-gray-400">
                                            {getStringProperty(resource, 'duration')}
                                          </span>
                                        )}
                                      </div>
                                      {resource.description && (
                                        <p className="text-sm text-gray-400 mt-2 line-clamp-2">
                                          {resource.description}
                                        </p>
                                      )}
                                    </div>
                                    <svg
                                      className="w-4 h-4 text-gray-400 group-hover:text-blue-400 flex-shrink-0 mt-1 transition-colors"
                                      fill="none"
                                      stroke="currentColor"
                                      viewBox="0 0 24 24"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                                      />
                                    </svg>
                                  </a>
                                ))}
                                {section.resources.length > 3 && (
                                  <div className="text-center pt-2">
                                    <button className="text-sm text-blue-400 hover:text-blue-300">
                                      {t('certification.showMore')} {section.resources.length - 3}
                                      ...
                                    </button>
                                  </div>
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                  </>
                )}

                {/* Practice Tab */}
                {activeResourceTab === 'practice' && (
                  <>
                    {studySections
                      .filter(s => ['practice', 'github'].includes(s.id))
                      .map(section => (
                        <div
                          key={section.id}
                          className="bg-gradient-to-br from-blue-900/40 to-blue-950/50 rounded-xl border border-blue-700/50 overflow-hidden"
                        >
                          <button
                            onClick={() => toggleResourceCategory(section.id)}
                            className="w-full p-4 flex items-center justify-between hover:bg-slate-800/50 transition-colors"
                          >
                            <h4 className="text-lg font-semibold text-white flex items-center gap-3">
                              {section.title}
                              <span className="text-base text-gray-400 font-normal">
                                ({section.resources.length})
                              </span>
                            </h4>
                            <svg
                              className={`w-5 h-5 text-gray-400 transition-transform ${
                                expandedResourceCategories.includes(section.id) ? 'rotate-180' : ''
                              }`}
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 9l-7 7-7-7"
                              />
                            </svg>
                          </button>

                          {expandedResourceCategories.includes(section.id) && (
                            <div className="border-t border-blue-700/50 p-4">
                              <div className="grid gap-3">
                                {section.resources.map((resource, index) => (
                                  <a
                                    key={index}
                                    href={resource.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group flex items-start gap-3 p-3 bg-slate-800/50 hover:bg-slate-700/50 rounded-lg transition-all"
                                  >
                                    <div className="flex-1">
                                      <div className="text-base font-medium text-white group-hover:text-blue-400 transition-colors">
                                        {resource.title}
                                      </div>
                                      {getBooleanProperty(resource, 'isPaid') && (
                                        <span className="inline-block mt-1 px-2 py-1 bg-yellow-500/20 text-yellow-400 text-sm rounded">
                                          {t('certification.paid')}
                                        </span>
                                      )}
                                      {resource.description && (
                                        <p className="text-sm text-gray-400 mt-2">
                                          {resource.description}
                                        </p>
                                      )}
                                    </div>
                                    <svg
                                      className="w-4 h-4 text-gray-400 group-hover:text-blue-400 flex-shrink-0 mt-1 transition-colors"
                                      fill="none"
                                      stroke="currentColor"
                                      viewBox="0 0 24 24"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                                      />
                                    </svg>
                                  </a>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                  </>
                )}

                {/* Learning Tab */}
                {activeResourceTab === 'learning' && (
                  <>
                    {studySections
                      .filter(s => ['videos', 'blogs', 'documentation'].includes(s.id))
                      .map(section => (
                        <div
                          key={section.id}
                          className="bg-gradient-to-br from-blue-900/40 to-blue-950/50 rounded-xl border border-blue-700/50 overflow-hidden"
                        >
                          <button
                            onClick={() => toggleResourceCategory(section.id)}
                            className="w-full p-4 flex items-center justify-between hover:bg-slate-800/50 transition-colors"
                          >
                            <h4 className="text-lg font-semibold text-white flex items-center gap-3">
                              {section.title}
                              <span className="text-base text-gray-400 font-normal">
                                ({section.resources.length})
                              </span>
                            </h4>
                            <svg
                              className={`w-5 h-5 text-gray-400 transition-transform ${
                                expandedResourceCategories.includes(section.id) ? 'rotate-180' : ''
                              }`}
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 9l-7 7-7-7"
                              />
                            </svg>
                          </button>

                          {expandedResourceCategories.includes(section.id) && (
                            <div className="border-t border-blue-700/50 p-4">
                              <div className="grid gap-3">
                                {section.resources.map((resource, index) => (
                                  <a
                                    key={index}
                                    href={resource.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group flex items-start gap-3 p-3 bg-slate-800/50 hover:bg-slate-700/50 rounded-lg transition-all"
                                  >
                                    <div className="flex-1">
                                      <div className="text-base font-medium text-white group-hover:text-blue-400 transition-colors">
                                        {resource.title}
                                      </div>
                                      {getStringProperty(resource, 'author') && (
                                        <div className="text-sm text-gray-500 mt-0.5">
                                          {t('certification.by')}{' '}
                                          {getStringProperty(resource, 'author')}
                                        </div>
                                      )}
                                      {getStringProperty(resource, 'duration') && (
                                        <span className="text-sm text-gray-400">
                                          {getStringProperty(resource, 'duration')}
                                        </span>
                                      )}
                                      {resource.description && (
                                        <p className="text-sm text-gray-400 mt-2">
                                          {resource.description}
                                        </p>
                                      )}
                                    </div>
                                    <svg
                                      className="w-4 h-4 text-gray-400 group-hover:text-blue-400 flex-shrink-0 mt-1 transition-colors"
                                      fill="none"
                                      stroke="currentColor"
                                      viewBox="0 0 24 24"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                                      />
                                    </svg>
                                  </a>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                  </>
                )}

                {/* Community Tab */}
                {activeResourceTab === 'community' && (
                  <>
                    {studySections
                      .filter(s => ['communities', 'tools'].includes(s.id))
                      .map(section => (
                        <div
                          key={section.id}
                          className="bg-gradient-to-br from-blue-900/40 to-blue-950/50 rounded-xl border border-blue-700/50 overflow-hidden"
                        >
                          <button
                            onClick={() => toggleResourceCategory(section.id)}
                            className="w-full p-4 flex items-center justify-between hover:bg-slate-800/50 transition-colors"
                          >
                            <h4 className="text-lg font-semibold text-white flex items-center gap-3">
                              {section.title}
                              <span className="text-base text-gray-400 font-normal">
                                ({section.resources.length})
                              </span>
                            </h4>
                            <svg
                              className={`w-5 h-5 text-gray-400 transition-transform ${
                                expandedResourceCategories.includes(section.id) ? 'rotate-180' : ''
                              }`}
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 9l-7 7-7-7"
                              />
                            </svg>
                          </button>

                          {expandedResourceCategories.includes(section.id) && (
                            <div className="border-t border-blue-700/50 p-4">
                              <div className="grid gap-3">
                                {section.resources.map((resource, index) => (
                                  <a
                                    key={index}
                                    href={resource.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group flex items-start gap-3 p-3 bg-slate-800/50 hover:bg-slate-700/50 rounded-lg transition-all"
                                  >
                                    <div className="flex-1">
                                      <div className="text-base font-medium text-white group-hover:text-blue-400 transition-colors">
                                        {resource.title}
                                      </div>
                                      {resource.description && (
                                        <p className="text-sm text-gray-400 mt-2">
                                          {resource.description}
                                        </p>
                                      )}
                                    </div>
                                    <svg
                                      className="w-4 h-4 text-gray-400 group-hover:text-blue-400 flex-shrink-0 mt-1 transition-colors"
                                      fill="none"
                                      stroke="currentColor"
                                      viewBox="0 0 24 24"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                                      />
                                    </svg>
                                  </a>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                  </>
                )}
              </div>
            </div>
          )}

          {/* Study Path Tab */}
          {activeTab === 'path' && (
            <div className="space-y-3">
              {studyPath.map((phase, index) => (
                <div
                  key={phase.week}
                  className="bg-gradient-to-br from-blue-900/40 to-blue-950/50 rounded-lg border border-blue-700/50 overflow-hidden"
                >
                  <button
                    className="w-full p-4 hover:bg-slate-800/30 transition-colors text-left"
                    onClick={() => toggleStudyPhase(phase.week)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-white text-sm bg-gradient-to-r ${
                            index === 0
                              ? 'from-green-500 to-emerald-600'
                              : index === 1
                                ? 'from-blue-500 to-indigo-600'
                                : 'from-purple-500 to-pink-600'
                          }`}
                        >
                          {index + 1}
                        </div>
                        <div>
                          <h3 className="text-base font-semibold text-white">{phase.title}</h3>
                          <div className="text-sm text-gray-400">{phase.week}</div>
                        </div>
                      </div>
                      <svg
                        className={`w-4 h-4 text-gray-400 transition-transform ${expandedStudyPhases.includes(phase.week) ? 'rotate-180' : ''}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                  </button>

                  {expandedStudyPhases.includes(phase.week) && (
                    <div className="border-t border-blue-700/50 px-4 pb-4">
                      <ul className="space-y-2 mt-3">
                        {phase.tasks.map((task, taskIndex) => (
                          <li key={taskIndex} className="flex items-start gap-2">
                            <span className="text-green-400 mt-0.5 text-sm">•</span>
                            <span className="text-sm text-gray-300">{task}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
