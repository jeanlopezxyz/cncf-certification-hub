import { useState } from 'react';
import { useTranslations } from '../../i18n/utils';
import { certifications } from '../../data/certifications';
import { filterCertificationsByLevel } from '../../utils';
import type { CertificationLevel, Language } from '../../types';
import CertificationCard from './CertificationCard';
import CertificationFilter from './CertificationFilter';

interface CertificationGridProps {
  lang: Language;
}

/**
 * Main certification grid component
 * Displays all certifications with filtering
 */
export default function CertificationGrid({ lang }: CertificationGridProps) {
  const t = useTranslations(lang);
  const [filter, setFilter] = useState<CertificationLevel | 'all'>('all');

  // First filter by level
  const levelFilteredCerts = filterCertificationsByLevel(certifications, filter);

  // Define the order: Kubestronaut certs first, then alphabetical, LFCS last
  const kubestronautIds = ['kcna', 'kcsa', 'cka', 'ckad', 'cks'];

  // Separate certifications into three groups
  const kubestronautCerts = kubestronautIds
    .map(id => levelFilteredCerts.find(cert => cert.id === id))
    .filter((cert): cert is (typeof levelFilteredCerts)[0] => cert !== undefined);

  const lfcsCert = levelFilteredCerts.filter(cert => cert.id === 'lfcs');

  const otherCerts = levelFilteredCerts
    .filter(cert => !kubestronautIds.includes(cert.id) && cert.id !== 'lfcs')
    .sort((a, b) => a.acronym.localeCompare(b.acronym));

  // Combine in the desired order
  const filteredCerts = [...kubestronautCerts, ...otherCerts, ...lfcsCert];

  return (
    <section id="certifications" className="py-20 scroll-section">
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-20 3xl:px-32">
        <CertificationHeader t={t} />

        <CertificationFilter currentFilter={filter} onFilterChange={setFilter} t={t} />

        <div
          key={filter}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 lg:gap-8 mt-12 animate-fade-in"
        >
          {filteredCerts.map((cert, index) => (
            <CertificationCard key={cert.id} certification={cert} lang={lang} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

/**
 * Section header component
 */
function CertificationHeader({ t }: { t: (key: string) => string }) {
  return (
    <div className="text-center mb-12 animate-fade-in-up">
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
        <span className="bg-gradient-to-r from-blue-400 to-sky-300 bg-clip-text text-transparent">
          {t('certifications.title')}
        </span>
      </h2>
    </div>
  );
}
