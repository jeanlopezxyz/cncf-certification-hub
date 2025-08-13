import { useTranslations, translateCertificationValue } from '../../i18n/utils';
import type { Certification } from '../../data/types';
import { useState, useEffect } from 'react';

interface CertificationDetailProps {
  certification: Certification;
  lang: keyof typeof import('../../i18n/ui').ui;
}

export default function CertificationDetail({ certification, lang }: CertificationDetailProps) {
  const t = useTranslations(lang);
  const [completedDomains, setCompletedDomains] = useState<string[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem(`cert-${certification.id}-domains`);
    if (saved) {
      setCompletedDomains(JSON.parse(saved));
    }
  }, [certification.id]);

  const toggleDomain = (domainName: string) => {
    const updated = completedDomains.includes(domainName)
      ? completedDomains.filter(d => d !== domainName)
      : [...completedDomains, domainName];

    setCompletedDomains(updated);
    localStorage.setItem(`cert-${certification.id}-domains`, JSON.stringify(updated));
  };

  const progress = (completedDomains.length / certification.domains.length) * 100;

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <ol className="flex items-center space-x-2 text-sm">
            <li>
              <a
                href={`/cncf-certification-hub${lang === 'en' ? '' : '/' + lang}`}
                className="text-gray-400 hover:text-white"
              >
                {t('nav.dashboard')}
              </a>
            </li>
            <li className="text-gray-600">/</li>
            <li>
              <a
                href={`/cncf-certification-hub${lang === 'en' ? '' : '/' + lang}#certifications`}
                className="text-gray-400 hover:text-white"
              >
                {t('nav.certifications')}
              </a>
            </li>
            <li className="text-gray-600">/</li>
            <li className="text-white">{certification.acronym}</li>
          </ol>
        </nav>

        {/* Header */}
        <div className="mb-12 animate-fade-in-up">
          <div className="flex items-start justify-between mb-6">
            <div>
              <div className="flex items-center gap-4 mb-4">
                <h1
                  className={`text-5xl font-bold bg-gradient-to-r ${certification.color} bg-clip-text text-transparent`}
                >
                  {certification.acronym}
                </h1>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-semibold bg-gradient-to-r 
                  ${
                    certification.level === 'entry'
                      ? 'from-green-500 to-emerald-600'
                      : certification.level === 'intermediate'
                        ? 'from-blue-500 to-indigo-600'
                        : 'from-red-500 to-rose-600'
                  } text-white`}
                >
                  {t(`cert.level.${certification.level}`)}
                </span>
              </div>
              <h2 className="text-2xl font-semibold mb-2">{certification.name}</h2>
              <p className="text-gray-400 text-lg">{certification.description}</p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-white">${certification.price}</div>
              <div className="text-sm text-gray-400">USD</div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg font-semibold">{t('certification.overallProgress')}</span>
              <span className="text-2xl font-bold">{Math.round(progress)}%</span>
            </div>
            <div className="h-4 bg-gray-800 rounded-full overflow-hidden">
              <div
                className={`h-full bg-gradient-to-r ${certification.color} transition-all duration-1000 ease-out`}
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>

        {/* Meta Information */}
        <div
          className="grid md:grid-cols-4 gap-4 mb-12 animate-fade-in-up"
          style={{ animationDelay: '0.1s' }}
        >
          <div className="bg-gray-900 rounded-lg p-4 border border-gray-800">
            <div className="text-sm text-gray-400 mb-1">{t('certification.examType')}</div>
            <div className="font-semibold">
              {certification.type === 'performance'
                ? t('certification.performanceBased')
                : t('certification.multipleChoiceExam')}
            </div>
          </div>
          <div className="bg-gray-900 rounded-lg p-4 border border-gray-800">
            <div className="text-sm text-gray-400 mb-1">{t('certification.duration')}</div>
            <div className="font-semibold">
              ⏱️ {certification.duration} {t('certification.minutes')}
            </div>
          </div>
          <div className="bg-gray-900 rounded-lg p-4 border border-gray-800">
            <div className="text-sm text-gray-400 mb-1">{t('certification.prerequisites')}</div>
            <div className="font-semibold">
              {certification.prerequisite
                ? translateCertificationValue(certification.prerequisite, lang)
                : t('certification.none')}
            </div>
          </div>
          <div className="bg-gray-900 rounded-lg p-4 border border-gray-800">
            <div className="text-sm text-gray-400 mb-1">{t('certification.requiredFor')}</div>
            <div className="font-semibold">
              {certification.requiredFor
                ?.map(item => translateCertificationValue(item, lang))
                .join(', ') || t('certification.optional')}
            </div>
          </div>
        </div>

        {/* Exam Domains */}
        <div className="mb-12 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          <h3 className="text-2xl font-bold mb-6">{t('certification.examDomains')}</h3>
          <div className="space-y-4">
            {certification.domains.map((domain, index) => (
              <div
                key={domain.name}
                className="bg-gray-900 rounded-xl p-6 border border-gray-800 animate-slide-in-left"
                style={{ animationDelay: `${0.3 + index * 0.1}s` }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold mb-2">{domain.name}</h4>
                    <div className="flex items-center gap-4">
                      <span className="text-sm text-gray-400">
                        {t('certification.weight')}: {domain.weight}%
                      </span>
                      <button
                        onClick={() => toggleDomain(domain.name)}
                        className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                          completedDomains.includes(domain.name)
                            ? 'bg-green-500/20 text-green-400'
                            : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                        }`}
                      >
                        {completedDomains.includes(domain.name) ? '✓ Completed' : 'Mark Complete'}
                      </button>
                    </div>
                  </div>
                  <div
                    className={`text-2xl font-bold ${certification.color.includes('from') ? 'bg-gradient-to-r ' + certification.color + ' bg-clip-text text-transparent' : ''}`}
                  >
                    {domain.weight}%
                  </div>
                </div>
                <div className="space-y-2">
                  {domain.topics.map((topic, topicIndex) => (
                    <div key={topicIndex} className="flex items-start gap-2 text-sm text-gray-400">
                      <span className="text-blue-400 mt-1">→</span>
                      <span>{topic}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Resources */}
        <div
          className="grid md:grid-cols-2 gap-6 animate-fade-in-up"
          style={{ animationDelay: '0.4s' }}
        >
          <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
            <h3 className="text-xl font-bold mb-4">{t('certification.studyResources')}</h3>
            <div className="space-y-3">
              <a
                href={certification.resources.official}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-blue-400 hover:text-blue-300 transition-colors"
              >
                <span>📚</span>
                <span>{t('certification.resource.officialPage')}</span>
                <svg
                  className="w-4 h-4 ml-auto"
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
              {certification.resources.github.map((repo, index) => (
                <a
                  key={index}
                  href={repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors text-sm"
                >
                  <span>📂</span>
                  <span className="truncate">{repo.split('/').slice(-2).join('/')}</span>
                  <svg
                    className="w-4 h-4 ml-auto"
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

          <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
            <h3 className="text-xl font-bold mb-4">{t('certification.sections.practice')}</h3>
            <div className="space-y-3">
              {certification.resources.practice.map((platform, index) => (
                <a
                  key={index}
                  href={platform}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors"
                >
                  <span>🎯</span>
                  <span>
                    {platform.includes('killer')
                      ? t('certification.resource.killersh')
                      : platform.includes('kodekloud')
                        ? t('certification.resource.kodekloud')
                        : platform.includes('killercoda')
                          ? t('certification.resource.killercoda')
                          : t('certification.resource.practiceplatform')}
                  </span>
                  <svg
                    className="w-4 h-4 ml-auto"
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
        </div>
      </div>
    </div>
  );
}
