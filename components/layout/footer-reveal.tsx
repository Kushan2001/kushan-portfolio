"use client";

import { motion, useReducedMotion } from "motion/react";
import type { PropsWithChildren } from "react";

export function FooterReveal({ children }: PropsWithChildren) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      animate={shouldReduceMotion ? { opacity: 1, y: 0 } : undefined}
      initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ amount: 0.15, once: true }}
      whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
    >
      {children}
    </motion.div>
  );
}
