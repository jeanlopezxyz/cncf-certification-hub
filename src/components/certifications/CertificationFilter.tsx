import type { CertificationLevel } from '../../types';

interface CertificationFilterProps {
  currentFilter: CertificationLevel | 'all';
  onFilterChange: (filter: CertificationLevel | 'all') => void;
  t: (key: string) => string;
}

export default function CertificationFilter({
  currentFilter,
  onFilterChange,
  t,
}: CertificationFilterProps) {
  const filters: Array<{ value: CertificationLevel | 'all'; label: string }> = [
    { value: 'all', label: t('certifications.filter.all') },
    { value: 'entry', label: t('certifications.filter.entry') },
    { value: 'intermediate', label: t('certifications.filter.intermediate') },
    { value: 'advanced', label: t('certifications.filter.advanced') },
  ];

  return (
    <div className="flex flex-wrap gap-2 justify-center mb-8">
      {filters.map(({ value, label }) => (
        <button
          key={value}
          onClick={() => onFilterChange(value)}
          className={`px-4 py-2 rounded-lg font-medium transition-all ${
            currentFilter === value
              ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg'
              : 'bg-slate-800/50 text-gray-400 hover:bg-slate-700 hover:text-white'
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
