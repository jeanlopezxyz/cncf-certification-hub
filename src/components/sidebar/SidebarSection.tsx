import { ChevronDownIcon } from '../icons';

interface SidebarSectionProps {
  title: string;
  icon: React.ReactNode;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}

/**
 * Reusable sidebar section component with expand/collapse functionality
 */
export default function SidebarSection({
  title,
  icon,
  isOpen,
  onToggle,
  children,
}: SidebarSectionProps) {
  return (
    <div className="mb-6">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-4 hover:bg-slate-800/30 rounded-xl transition-all duration-200 group"
        aria-expanded={isOpen}
        aria-label={`Toggle ${title} section`}
      >
        <div className="flex items-center gap-3">
          {icon}
          <span className="text-base font-medium text-gray-300 group-hover:text-white transition-colors">
            {title}
          </span>
        </div>
        <div className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}>
          <ChevronDownIcon className="w-4 h-4 text-gray-400" />
        </div>
      </button>

      <div
        className={`mt-3 space-y-2 pl-8 overflow-hidden transition-all duration-300 ${
          isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        {children}
      </div>
    </div>
  );
}
