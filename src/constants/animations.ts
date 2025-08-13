/**
 * Animation timing and delay constants
 */

export const ANIMATION_DELAYS = {
  // Stagger delays for lists
  cardStagger: 50,
  domainStagger: 100,
  sectionStagger: 200,

  // Transition durations
  fast: 200,
  normal: 300,
  slow: 500,
  verySlow: 600,

  // Specific animations
  cardFlip: 1000,
  progressBar: 700,
} as const;

export const ANIMATION_EASING = {
  default: 'ease-in-out',
  spring: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  smooth: 'cubic-bezier(0.4, 0, 0.2, 1)',
} as const;
