import { ChevronDownIcon } from '../icons';
import { useRef, useEffect, useState } from 'react';

interface SidebarSectionProps {
  title: string;
  icon: React.ReactNode;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
  isCollapsed?: boolean;
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
  isCollapsed = false,
}: SidebarSectionProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number>(0);

  useEffect(() => {
    if (contentRef.current) {
      setHeight(contentRef.current.scrollHeight);
    }
  }, [children]);

  // Icon-only mode when collapsed - Exactly aligned with hamburger
  if (isCollapsed) {
    return (
      <div className="mb-2 px-4">
        <div className="flex justify-center">
          <button
            onClick={onToggle}
            className="p-2 hover:bg-white/15 rounded-lg transition-all duration-200 group"
            aria-expanded={isOpen}
            aria-label={title}
            title={title}
          >
            <div className={`text-lg transition-colors ${isOpen ? 'text-white' : 'text-indigo-200'} group-hover:text-white`}>
              {icon}
            </div>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-4">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-2 py-2.5 hover:bg-white/10 rounded-lg transition-all duration-200 group relative"
        aria-expanded={isOpen}
        aria-label={`Toggle ${title} section`}
      >
        <div className="flex items-center gap-1.5">
          <div className={`text-base transition-colors ${isOpen ? 'text-white' : 'text-blue-200'} group-hover:text-white`}>
            {icon}
          </div>
          <span className={`font-medium text-sm transition-colors ${isOpen ? 'text-white' : 'text-blue-100'} group-hover:text-white`}>
            {title}
          </span>
        </div>
        <div className={`transition-transform duration-200 ${isOpen ? 'rotate-180 text-white' : 'text-blue-200'} group-hover:text-white`}>
          <ChevronDownIcon className="w-4 h-4" />
        </div>
      </button>

      <div
        ref={contentRef}
        style={{
          maxHeight: isOpen ? `${height}px` : '0px',
          transition: 'max-height 400ms cubic-bezier(0.4, 0, 0.2, 1), opacity 300ms ease-out, transform 300ms ease-out',
        }}
        className={`mt-2 space-y-1 pl-11 pr-2 overflow-hidden ${
          isOpen ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform -translate-y-2'
        }`}
      >
        {children}
      </div>
    </div>
  );
}
