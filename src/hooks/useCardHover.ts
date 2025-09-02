/**
 * Custom hook for consistent card hover effects
 * Eliminates duplicate hover logic across card components
 */

import { useState, useCallback } from 'react';

interface UseCardHoverOptions {
  enableScale?: boolean;
  enableGlow?: boolean;
  scaleAmount?: number;
  duration?: number;
}

export function useCardHover(options: UseCardHoverOptions = {}) {
  const {
    enableScale = true,
    enableGlow = false,
    scaleAmount = 1.02,
    duration = 300,
  } = options;

  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
  }, []);

  const getHoverClasses = () => {
    const classes = ['transition-all'];
    
    if (enableScale) {
      classes.push('hover:scale-105');
    }
    
    if (enableGlow) {
      classes.push('hover:shadow-lg', 'hover:shadow-blue-500/30');
    }
    
    classes.push(`duration-${duration}`);
    
    return classes.join(' ');
  };

  const getHoverStyles = () => {
    return {
      transform: isHovered && enableScale ? `scale(${scaleAmount})` : 'scale(1)',
      transition: `transform ${duration}ms ease-in-out`,
    };
  };

  return {
    isHovered,
    hoverProps: {
      onMouseEnter: handleMouseEnter,
      onMouseLeave: handleMouseLeave,
    },
    hoverClasses: getHoverClasses(),
    hoverStyles: getHoverStyles(),
  };
}

/**
 * Hook for certification card specific hover effects
 */
export function useCertificationCardHover() {
  return useCardHover({
    enableScale: true,
    enableGlow: true,
    scaleAmount: 1.02,
    duration: 300,
  });
}

/**
 * Hook for achievement card hover effects
 */
export function useAchievementCardHover() {
  return useCardHover({
    enableScale: false,
    enableGlow: true,
    duration: 300,
  });
}