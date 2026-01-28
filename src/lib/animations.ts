/**
 * Framer Motion Animation Presets
 *
 * Reusable animation variants for consistent motion design.
 * Respects prefers-reduced-motion automatically via Framer Motion.
 */

import { Variants, Transition } from "framer-motion";

// ============================================
// TRANSITIONS
// ============================================

export const springTransition: Transition = {
  type: "spring",
  stiffness: 300,
  damping: 30,
};

export const smoothTransition: Transition = {
  type: "tween",
  ease: [0.25, 0.1, 0.25, 1], // ease-out-quart
  duration: 0.5,
};

export const quickTransition: Transition = {
  type: "tween",
  ease: "easeOut",
  duration: 0.3,
};

// ============================================
// FADE VARIANTS
// ============================================

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: smoothTransition,
  },
};

export const fadeInUp: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: smoothTransition,
  },
};

export const fadeInDown: Variants = {
  hidden: {
    opacity: 0,
    y: -20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: smoothTransition,
  },
};

export const fadeInScale: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: smoothTransition,
  },
};

// ============================================
// STAGGER VARIANTS
// ============================================

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

export const staggerContainerFast: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.05,
    },
  },
};

export const staggerItem: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: smoothTransition,
  },
};

// ============================================
// HOVER EFFECTS
// ============================================

export const hoverLift = {
  y: -2,
  transition: quickTransition,
};

export const hoverScale = {
  scale: 1.02,
  transition: quickTransition,
};

export const hoverGlow = {
  boxShadow: "0 0 20px var(--biblio-light)",
  transition: quickTransition,
};

export const tapScale = {
  scale: 0.98,
};

// ============================================
// SCROLL REVEAL
// ============================================

export const scrollReveal: Variants = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "tween",
      ease: [0.25, 0.1, 0.25, 1],
      duration: 0.6,
    },
  },
};

export const scrollRevealLeft: Variants = {
  hidden: {
    opacity: 0,
    x: -40,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: smoothTransition,
  },
};

export const scrollRevealRight: Variants = {
  hidden: {
    opacity: 0,
    x: 40,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: smoothTransition,
  },
};

// ============================================
// VIEWPORT OPTIONS
// ============================================

export const viewportOnce = {
  once: true,
  margin: "-100px 0px",
};

export const viewportAlways = {
  once: false,
  margin: "-50px 0px",
};

// ============================================
// COUNTER ANIMATION
// ============================================

export const counterVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.3,
    },
  },
};

// ============================================
// PAGE TRANSITIONS
// ============================================

export const pageTransition: Variants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.3,
      ease: "easeIn",
    },
  },
};

// ============================================
// CARD VARIANTS
// ============================================

export const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
    scale: 0.98,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: smoothTransition,
  },
};

// ============================================
// UTILITY: Create stagger delay
// ============================================

export function getStaggerDelay(index: number, baseDelay = 0.1): number {
  return index * baseDelay;
}
