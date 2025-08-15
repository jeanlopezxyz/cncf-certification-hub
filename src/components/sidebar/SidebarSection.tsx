import { ChevronDownIcon } from '../icons';
import { useRef, useEffect, useState } from 'react';

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
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number>(0);

  useEffect(() => {
    if (contentRef.current) {
      setHeight(contentRef.current.scrollHeight);
    }
  }, [children]);

  return (
    <div className="mb-8 last:mb-4">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-3 py-3.5 hover:bg-slate-800/30 rounded-xl transition-all duration-300 ease-out group relative overflow-hidden"
        aria-expanded={isOpen}
        aria-label={`Toggle ${title} section`}
      >
        {/* Hover effect background */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/0 via-blue-600/5 to-blue-600/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-out" />
        
        <div className="flex items-center gap-3.5 relative z-10">
          <div className={`transition-all duration-300 text-lg ${isOpen ? 'text-blue-400 scale-110 rotate-3' : 'text-gray-500'} group-hover:text-blue-400 group-hover:scale-110`}>
            {icon}
          </div>
          <span className={`text-base font-bold tracking-wide transition-all duration-300 ${isOpen ? 'text-white' : 'text-gray-200'} group-hover:text-white group-hover:translate-x-0.5`}>
            {title}
          </span>
        </div>
        <div className={`transition-all duration-500 ease-out ${isOpen ? 'rotate-180 text-blue-400' : 'text-gray-500'} group-hover:text-blue-400`}>
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
