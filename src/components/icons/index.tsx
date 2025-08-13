/**
 * Icon components used throughout the application
 * Centralized to maintain consistency and easy updates
 */

interface IconProps {
  className?: string;
}

export const CertificationIcon = ({ className = 'w-5 h-5' }: IconProps) => (
  <svg
    className={`${className} text-purple-400 mr-3`}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
    />
  </svg>
);

export const AchievementIcon = ({ className = 'w-5 h-5' }: IconProps) => (
  <svg
    className={`${className} text-amber-400 mr-3`}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
    />
  </svg>
);

export const StudyTipsIcon = ({ className = 'w-5 h-5' }: IconProps) => (
  <svg
    className={`${className} text-blue-400 mr-3`}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
    />
  </svg>
);

export const QuickLinksIcon = ({ className = 'w-5 h-5' }: IconProps) => (
  <svg
    className={`${className} text-green-400 mr-3`}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
    />
  </svg>
);

export const ChevronDownIcon = ({ className = 'w-4 h-4' }: IconProps) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
);

export const MenuIcon = ({ className = 'w-5 h-5' }: IconProps) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M4 6h16M4 12h16M4 18h16"
    />
  </svg>
);

export const CloseIcon = ({ className = 'w-5 h-5' }: IconProps) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

export const CollapseIcon = ({ className = 'w-5 h-5' }: IconProps) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7" />
  </svg>
);

export const ExpandIcon = ({ className = 'w-5 h-5' }: IconProps) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7" />
  </svg>
);

export const KubernetesHelmIcon = ({ className = 'w-9 h-9' }: IconProps) => (
  <svg className={className} fill="currentColor" viewBox="0 0 256 256">
    {/* Kubernetes Helm - Ship's Wheel Icon */}
    <g transform="translate(128, 128)">
      {/* Outer ring of the wheel */}
      <circle cx="0" cy="0" r="120" fill="none" stroke="currentColor" strokeWidth="8" />
      <circle cx="0" cy="0" r="100" fill="none" stroke="currentColor" strokeWidth="8" />

      {/* Center hub */}
      <circle cx="0" cy="0" r="25" />

      {/* Spokes of the wheel - 8 spokes */}
      {/* Vertical and horizontal spokes */}
      <rect x="-4" y="-100" width="8" height="200" />
      <rect x="-100" y="-4" width="200" height="8" />

      {/* Diagonal spokes */}
      <rect x="-4" y="-100" width="8" height="200" transform="rotate(45)" />
      <rect x="-4" y="-100" width="8" height="200" transform="rotate(-45)" />

      {/* Handle grips on the outer edge */}
      <circle cx="0" cy="-110" r="12" />
      <circle cx="0" cy="110" r="12" />
      <circle cx="-110" cy="0" r="12" />
      <circle cx="110" cy="0" r="12" />
      <circle cx="78" cy="-78" r="12" />
      <circle cx="-78" cy="-78" r="12" />
      <circle cx="78" cy="78" r="12" />
      <circle cx="-78" cy="78" r="12" />
    </g>
  </svg>
);
