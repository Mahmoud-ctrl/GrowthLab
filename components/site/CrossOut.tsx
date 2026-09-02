"use client";

import * as React from "react";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

/**
 * Wraps a word or short phrase and, once it scrolls into view, sweeps a thin
 * horizontal strike-through across it, left to right — the "not this" gesture.
 * The phrase is kept on one line so the overlay tracks a single-line box (a
 * wrapped phrase would put the bar in the line gap). Under prefers-reduced-
 * motion the text renders plain, with no overlay.
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
    <span className={cn("relative inline-block whitespace-nowrap", className)}>
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
