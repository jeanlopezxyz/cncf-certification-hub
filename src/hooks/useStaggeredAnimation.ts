/**
 * Custom hook for staggered animations
 * Eliminates repeated animation delay logic
 */

import { ANIMATION_DELAYS } from '../constants/animations';

interface StaggeredAnimationOptions {
  baseDelay?: number;
  multiplier?: number;
  maxDelay?: number;
  easing?: string;
}

export function useStaggeredAnimation(
  index: number,
  options: StaggeredAnimationOptions = {}
) {
  const {
    baseDelay = 0,
    multiplier = ANIMATION_DELAYS.cardStagger || 100,
    maxDelay = 1000,
    easing = 'ease-out'
  } = options;

  const delay = Math.min(baseDelay + (index * multiplier), maxDelay);

  return {
    animationDelay: `${delay}ms`,
    style: {
      animationDelay: `${delay}ms`,
      animationTimingFunction: easing,
    },
    cssAnimationDelay: delay,
  };
}

/**
 * Hook for fade-in-up animations with staggering
 */
export function useFadeInUpStagger(index: number, duration = 600) {
  const { animationDelay } = useStaggeredAnimation(index);
  
  return {
    className: 'animate-fade-in-up',
    style: {
      animationDelay,
      animationDuration: `${duration}ms`,
    },
  };
}

/**
 * Hook for scale-in animations with staggering
 */
export function useScaleInStagger(index: number, duration = 300) {
  const { animationDelay } = useStaggeredAnimation(index);
  
  return {
    className: 'animate-scale-in',
    style: {
      animationDelay,
      animationDuration: `${duration}ms`,
    },
  };
}

/**
 * Hook for slide-in animations with staggering
 */
export function useSlideInStagger(index: number, direction: 'left' | 'right' = 'left', duration = 500) {
  const { animationDelay } = useStaggeredAnimation(index);
  
  return {
    className: `animate-slide-in-${direction}`,
    style: {
      animationDelay,
      animationDuration: `${duration}ms`,
    },
  };
}