"use client";

import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";
import { trackEvent } from "@/lib/track";

/**
 * The site's primary pill CTA. Colours transition on CSS; the lift and press
 * are spring-driven so the button feels physical rather than timed. The inner
 * arrow nudges on group-hover (separate element — no transform conflict).
 */
export function CtaButton({
  href,
  label,
  className,
  size = "md",
  track,
  trackParams,
}: {
  href: string;
  label: string;
  className?: string;
  size?: "md" | "lg";
  /** Meta Pixel custom event to fire on click. */
  track?: string;
  trackParams?: Record<string, unknown>;
}) {
  const reduce = useReducedMotion();
  const dims =
    size === "lg"
      ? { box: "h-[56px] pl-8", dot: "size-10" }
      : { box: "h-[54px] pl-7", dot: "size-9" };

  return (
    <motion.a
      href={href}
      onClick={track ? () => trackEvent(track, trackParams) : undefined}
      className={cn(
        "ring-editorial group inline-flex items-center gap-3 rounded-full bg-ink pr-2 text-sm font-semibold tracking-tight text-paper transition-colors duration-200 hover:bg-[#1c2e52]",
        dims.box,
        className,
      )}
      whileHover={reduce ? undefined : { y: -2 }}
      whileTap={reduce ? undefined : { scale: 0.97 }}
      transition={{ type: "spring", stiffness: 420, damping: 26 }}
    >
      {label}
      <span
        className={cn(
          "grid place-items-center rounded-full bg-orange text-ink transition-transform duration-200 group-hover:translate-x-0.5",
          dims.dot,
        )}
      >
        <svg viewBox="0 0 10 10" className="h-2.5 w-2.5" aria-hidden>
          <path
            d="M1 5h7M5 1l4 4-4 4"
            stroke="currentColor"
            strokeWidth="1.8"
            fill="none"
          />
        </svg>
      </span>
    </motion.a>
  );
}
