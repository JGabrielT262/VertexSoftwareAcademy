"use client";

import { motion, useReducedMotion } from "framer-motion";

export function Reveal({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={reduceMotion ? undefined : { opacity: 0, y: 14, filter: "blur(6px)" }}
      whileInView={
        reduceMotion ? undefined : { opacity: 1, y: 0, filter: "blur(0px)" }
      }
      viewport={reduceMotion ? undefined : { once: true, margin: "-10% 0px -10% 0px" }}
      transition={reduceMotion ? undefined : { duration: 0.45, ease: "easeOut", delay }}
    >
      {children}
    </motion.div>
  );
}

