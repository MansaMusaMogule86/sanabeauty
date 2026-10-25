import React from 'react';
import { motion, AnimatePresence, useReducedMotion, type Variants } from 'motion/react';

interface PageTransitionProps {
  routeKey: string;
  children: React.ReactNode;
}

export const PageTransition: React.FC<PageTransitionProps> = ({ routeKey, children }) => {
  const shouldReduceMotion = useReducedMotion();

  const variants: Variants = {
    initial: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : 8,
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.32,
        ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
      },
    },
    exit: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : -6,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.2,
        ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
      },
    },
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={routeKey}
        initial="initial"
        animate="animate"
        exit="exit"
        variants={variants}
        className="w-full flex-1"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};
