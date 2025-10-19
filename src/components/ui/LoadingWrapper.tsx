import React from 'react';
import { CardSkeleton, GridSkeleton, HeroSkeleton, ListSkeleton } from './SkeletonLoader';

interface LoadingWrapperProps {
  isLoading: boolean;
  children: React.ReactNode;
  type?: 'card' | 'grid' | 'hero' | 'list';
  items?: number;
  className?: string;
  fallback?: React.ReactNode;
}

const LoadingWrapper: React.FC<LoadingWrapperProps> = ({
  isLoading,
  children,
  type = 'card',
  items = 6,
  className = '',
  fallback
}) => {
  if (!isLoading) {
    return <>{children}</>;
  }

  if (fallback) {
    return <>{fallback}</>;
  }

  const renderSkeleton = () => {
    switch (type) {
      case 'grid':
        return <GridSkeleton items={items} className={className} />;
      case 'hero':
        return <HeroSkeleton className={className} />;
      case 'list':
        return <ListSkeleton items={items} className={className} />;
      default:
        return <CardSkeleton className={className} />;
    }
  };

  return (
    <div className={`loading-wrapper ${className}`}>
      {renderSkeleton()}
    </div>
  );
};

export default LoadingWrapper;