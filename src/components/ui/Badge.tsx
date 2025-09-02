import React from 'react';

// Unified badge types
type BadgeVariant = 'level' | 'prerequisite' | 'status' | 'count';
type BadgeLevel = 'entry' | 'intermediate' | 'advanced';
type BadgeSize = 'small' | 'normal' | 'large';

interface BadgeProps {
  variant: BadgeVariant;
  level?: BadgeLevel;
  size?: BadgeSize;
  children: React.ReactNode;
  className?: string;
}

const Badge: React.FC<BadgeProps> = ({ 
  variant, 
  level, 
  size = 'normal', 
  children, 
  className = '' 
}) => {
  const getVariantClasses = () => {
    switch (variant) {
      case 'level':
        const levelColors = {
          entry: 'bg-emerald-600/30 text-emerald-300 border-emerald-500/40',
          intermediate: 'bg-amber-600/30 text-amber-300 border-amber-500/40',
          advanced: 'bg-red-600/30 text-red-300 border-red-500/40',
        };
        return levelColors[level || 'entry'];
      
      case 'prerequisite':
        return 'bg-orange-600/30 text-orange-100 border-orange-500/40';
      
      case 'status':
        return 'bg-blue-600/30 text-blue-100 border-blue-500/40';
      
      case 'count':
        return 'bg-purple-600/30 text-purple-300 border-purple-500/40';
      
      default:
        return 'bg-gray-600/30 text-gray-300 border-gray-500/40';
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case 'small':
        return 'text-[10px] md:text-xs px-1.5 md:px-2 py-0.5 md:py-1 rounded-sm md:rounded-md';
      case 'large':
        return 'text-sm md:text-base px-3 md:px-4 py-1.5 md:py-2 rounded-md md:rounded-lg';
      default:
        return 'text-xs px-2 py-1 rounded-md';
    }
  };

  return (
    <span
      className={`
        inline-block font-semibold border transition-all duration-200
        ${getVariantClasses()}
        ${getSizeClasses()}
        ${className}
      `.trim().replace(/\s+/g, ' ')}
    >
      {children}
    </span>
  );
};

// Specialized badge components for common use cases
export const LevelBadge: React.FC<{ 
  level: BadgeLevel; 
  size?: BadgeSize; 
  className?: string;
  children?: React.ReactNode;
}> = ({
  level,
  size,
  className,
  children
}) => (
  <Badge variant="level" level={level} size={size} className={className}>
    {children || (level === 'entry' ? 'Entry' : level === 'intermediate' ? 'Intermediate' : 'Advanced')}
  </Badge>
);

export const PrerequisiteBadge: React.FC<{ children: React.ReactNode; size?: BadgeSize }> = ({
  children,
  size = 'small'
}) => (
  <Badge variant="prerequisite" size={size}>
    {children}
  </Badge>
);

export const StatusBadge: React.FC<{ children: React.ReactNode; size?: BadgeSize }> = ({
  children,
  size
}) => (
  <Badge variant="status" size={size}>
    {children}
  </Badge>
);

export default Badge;