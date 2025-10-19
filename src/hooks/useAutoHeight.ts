/**
 * Custom hook for automatic height calculation
 * Eliminates duplicate height tracking logic in sidebar components
 */

import { useRef, useState, useEffect } from 'react';
import type { RefObject } from 'react';

interface UseAutoHeightOptions {
  initialHeight?: number;
  minHeight?: number;
  maxHeight?: number;
  includeMargin?: boolean;
}

export function useAutoHeight(
  dependencies: unknown[] = [],
  options: UseAutoHeightOptions = {}
): {
  contentRef: RefObject<HTMLDivElement | null>;
  height: number;
  style: { height: string; overflow: string };
} {
  const {
    initialHeight = 0,
    minHeight = 0,
    maxHeight = Infinity,
    includeMargin = false,
  } = options;

  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number>(initialHeight);

  useEffect(() => {
    const updateHeight = () => {
      if (contentRef.current) {
        const element = contentRef.current;
        let calculatedHeight = element.scrollHeight;

        // Include margin if requested
        if (includeMargin) {
          const computedStyle = window.getComputedStyle(element);
          const marginTop = parseInt(computedStyle.marginTop) || 0;
          const marginBottom = parseInt(computedStyle.marginBottom) || 0;
          calculatedHeight += marginTop + marginBottom;
        }

        // Apply min/max constraints
        calculatedHeight = Math.max(minHeight, Math.min(maxHeight, calculatedHeight));
        
        setHeight(calculatedHeight);
      }
    };

    updateHeight();

    // Also update on window resize
    const handleResize = () => {
      requestAnimationFrame(updateHeight);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, dependencies);

  return {
    contentRef,
    height,
    style: {
      height: `${height}px`,
      overflow: 'hidden',
    },
  };
}

/**
 * Hook for collapsible sections with smooth animations
 */
export function useCollapsibleHeight(
  isExpanded: boolean,
  dependencies: unknown[] = []
): {
  contentRef: RefObject<HTMLDivElement | null>;
  wrapperStyle: React.CSSProperties;
  isAnimating: boolean;
} {
  const { contentRef, height } = useAutoHeight([isExpanded, ...dependencies]);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (contentRef.current) {
      setIsAnimating(true);
      const timer = setTimeout(() => setIsAnimating(false), 300);
      return () => clearTimeout(timer);
    }
    return () => {}; // No-op cleanup function
  }, [isExpanded]);

  return {
    contentRef,
    wrapperStyle: {
      height: isExpanded ? `${height}px` : '0px',
      overflow: 'hidden',
      transition: 'height 0.3s ease-in-out',
    },
    isAnimating,
  };
}

/**
 * Hook for measuring element dimensions
 */
export function useElementDimensions(): {
  ref: RefObject<HTMLDivElement | null>;
  dimensions: { width: number; height: number };
} {
  const ref = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateDimensions = () => {
      if (ref.current) {
        const { offsetWidth, offsetHeight } = ref.current;
        setDimensions({ width: offsetWidth, height: offsetHeight });
      }
    };

    updateDimensions();

    const resizeObserver = new ResizeObserver(updateDimensions);
    if (ref.current) {
      resizeObserver.observe(ref.current);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  return { ref, dimensions };
}