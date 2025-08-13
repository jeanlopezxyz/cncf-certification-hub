import React, { Suspense, lazy } from 'react';
import type { ComponentType } from 'react';

interface LazyLoadProps {
  component: () => Promise<{ default: ComponentType<unknown> }>;
  fallback?: React.ReactNode;
  props?: Record<string, unknown>;
}

/**
 * LazyLoad Component
 *
 * Provides lazy loading for React components to improve performance
 * by splitting code and loading components only when needed
 */
export default function LazyLoad({ component, fallback, props = {} }: LazyLoadProps) {
  const LazyComponent = lazy(component);

  const defaultFallback = (
    <div className="flex items-center justify-center p-8">
      <div className="animate-pulse">
        <div className="h-8 w-32 bg-gray-700 rounded"></div>
      </div>
    </div>
  );

  return (
    <Suspense fallback={fallback || defaultFallback}>
      <LazyComponent {...props} />
    </Suspense>
  );
}

/**
 * Hook for performance monitoring
 */
export function usePerformanceMonitor(componentName: string) {
  React.useEffect(() => {
    if (typeof window !== 'undefined' && 'performance' in window) {
      const startTime = performance.now();

      return () => {
        const endTime = performance.now();
        const loadTime = endTime - startTime;

        // Only log in development
        // Performance monitoring is handled by analytics

        // Send metrics to analytics if needed
        if (loadTime > 1000 && typeof window !== 'undefined' && 'gtag' in window) {
          // Send slow performance metrics to analytics
          (window as any).gtag?.('event', 'slow_render', {
            event_category: 'Performance',
            event_label: componentName,
            value: Math.round(loadTime),
          });
        }
      };
    }
  }, [componentName]);
}

/**
 * Intersection Observer hook for lazy loading
 */
export function useIntersectionObserver(
  ref: React.RefObject<HTMLElement>,
  options: IntersectionObserverInit = {}
) {
  const [isIntersecting, setIsIntersecting] = React.useState(false);
  const [hasIntersected, setHasIntersected] = React.useState(false);

  React.useEffect(() => {
    if (!ref.current || hasIntersected) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersecting(true);
          setHasIntersected(true);
        } else {
          setIsIntersecting(false);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '50px',
        ...options,
      }
    );

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, [ref, options, hasIntersected]);

  return { isIntersecting, hasIntersected };
}

/**
 * Component for lazy loading images
 */
export function LazyImage({
  src,
  alt,
  className = '',
  placeholder = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
}: {
  src: string;
  alt: string;
  className?: string;
  placeholder?: string;
}) {
  const imgRef = React.useRef<HTMLImageElement>(null);
  const { hasIntersected } = useIntersectionObserver(imgRef as React.RefObject<HTMLElement>);
  const [isLoaded, setIsLoaded] = React.useState(false);

  return (
    <img
      ref={imgRef}
      src={hasIntersected ? src : placeholder}
      alt={alt}
      className={`${className} ${!isLoaded ? 'blur-sm' : ''} transition-all duration-300`}
      onLoad={() => setIsLoaded(true)}
      loading="lazy"
      decoding="async"
    />
  );
}
