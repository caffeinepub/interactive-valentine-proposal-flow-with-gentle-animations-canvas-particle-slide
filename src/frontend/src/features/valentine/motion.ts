// Animation timing and easing constants for consistent gentle pacing

export const MOTION = {
  // Durations (in milliseconds)
  duration: {
    instant: 200,
    fast: 400,
    normal: 600,
    slow: 1000,
    slower: 1500,
    slowest: 2000,
  },
  
  // Easing functions
  easing: {
    gentle: 'cubic-bezier(0.4, 0, 0.2, 1)',
    smooth: 'cubic-bezier(0.25, 0.1, 0.25, 1)',
    bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
    easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
  },
  
  // Stagger delays for sequential animations
  stagger: {
    short: 100,
    medium: 200,
    long: 400,
  },
  
  // Transition delays
  delay: {
    none: 0,
    short: 300,
    medium: 600,
    long: 1000,
  },
} as const;

// Helper to create smooth transition styles
export function createTransition(
  property: string = 'all',
  duration: number = MOTION.duration.normal,
  easing: string = MOTION.easing.gentle,
  delay: number = 0
): string {
  return `${property} ${duration}ms ${easing} ${delay}ms`;
}
