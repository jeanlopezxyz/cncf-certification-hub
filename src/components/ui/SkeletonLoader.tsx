import React from 'react';

interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'circular' | 'rectangular' | 'rounded';
  width?: string | number;
  height?: string | number;
  lines?: number;
}

const Skeleton: React.FC<SkeletonProps> = ({
  className = '',
  variant = 'text',
  width,
  height,
  lines = 1
}) => {
  const getVariantClasses = () => {
    switch (variant) {
      case 'circular':
        return 'rounded-full';
      case 'rectangular':
        return 'rounded-none';
      case 'rounded':
        return 'rounded-lg';
      default:
        return 'rounded';
    }
  };

  const style: React.CSSProperties = {};
  if (width) style.width = typeof width === 'number' ? `${width}px` : width;
  if (height) style.height = typeof height === 'number' ? `${height}px` : height;

  if (variant === 'text' && lines > 1) {
    return (
      <div className={`space-y-2 ${className}`}>
        {Array.from({ length: lines }, (_, i) => (
          <div
            key={i}
            className={`shimmer rounded ${i === lines - 1 ? 'w-3/4' : 'w-full'}`}
            style={{ height: '1rem' }}
          />
        ))}
      </div>
    );
  }

  return (
    <div
      className={`shimmer ${getVariantClasses()} ${className}`}
      style={style}
    />
  );
};

export const CardSkeleton: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`bg-white dark:bg-dark-bg-secondary border border-gray-200 dark:border-dark-border-primary rounded-xl p-6 ${className}`}>
    <div className="flex items-start justify-between mb-4">
      <div className="flex-1">
        <Skeleton variant="text" width="60%" height="24" className="mb-2" />
        <Skeleton variant="text" lines={2} />
      </div>
      <Skeleton variant="rounded" width="80" height="24" />
    </div>
    
    <div className="space-y-3 mb-4">
      <div className="flex gap-2">
        <Skeleton variant="rounded" width="60" height="24" />
        <Skeleton variant="rounded" width="80" height="24" />
        <Skeleton variant="rounded" width="60" height="24" />
      </div>
    </div>
    
    <div className="pt-4 border-t border-gray-200 dark:border-dark-border-primary">
      <Skeleton variant="text" width="40%" height="20" />
    </div>
  </div>
);

export const GridSkeleton: React.FC<{ items?: number; className?: string }> = ({ 
  items = 6, 
  className = '' 
}) => (
  <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${className}`}>
    {Array.from({ length: items }, (_, i) => (
      <CardSkeleton key={i} />
    ))}
  </div>
);

export const HeroSkeleton: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`relative py-12 overflow-hidden ${className}`}>
    <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-blue-200 dark:from-dark-bg-secondary dark:to-dark-bg-tertiary" />
    <div className="relative z-10 text-center px-4">
      <Skeleton variant="text" width="80%" height="48" className="mx-auto mb-4" />
      <Skeleton variant="text" width="60%" height="24" className="mx-auto mb-6" />
      <div className="flex justify-center gap-4">
        <Skeleton variant="rounded" width="120" height="40" />
        <Skeleton variant="rounded" width="120" height="40" />
      </div>
    </div>
  </div>
);

export const ListSkeleton: React.FC<{ items?: number; className?: string }> = ({ 
  items = 5, 
  className = '' 
}) => (
  <div className={`space-y-4 ${className}`}>
    {Array.from({ length: items }, (_, i) => (
      <div key={i} className="flex items-center gap-4 p-4 bg-white dark:bg-dark-bg-secondary rounded-lg border border-gray-200 dark:border-dark-border-primary">
        <Skeleton variant="circular" width={48} height={48} />
        <div className="flex-1">
          <Skeleton variant="text" width="70%" height="20" className="mb-2" />
          <Skeleton variant="text" width="50%" height="16" />
        </div>
        <Skeleton variant="rounded" width={24} height={24} />
      </div>
    ))}
  </div>
);

export default Skeleton;