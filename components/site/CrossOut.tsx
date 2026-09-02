"use client";

import * as React from "react";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

/**
 * Wraps a word and, once it scrolls into view, sweeps a thin horizontal
 * strike-through across it, left to right — the "not this" gesture. Under
 * prefers-reduced-motion the word renders plain, with no overlay.
 */
export function CrossOut({
  children,
  className,
  color = "var(--orange-ink)",
}: {
  children: React.ReactNode;
  className?: string;
  color?: string;
}) {
  const reduce = useReducedMotion();

  return (
    <span className={cn("relative inline-block", className)}>
      {children}
      {!reduce && (
        <motion.span
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-1/2 h-[2px] origin-left -translate-y-1/2 rounded-full"
          style={{ backgroundColor: color }}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.4, ease: "easeOut", delay: 0.2 }}
        />
      )}
    </span>
  );
}
