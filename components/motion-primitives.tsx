"use client";

import * as React from "react";
import {
  motion,
  useReducedMotion,
  type Variants,
  type HTMLMotionProps,
} from "motion/react";
import { cn } from "@/lib/utils";

/**
 * Shared motion language for the site. Matches the hero's paint-time
 * choreography: the same expo curve, comparable travel and duration, so a
 * scroll reveal lower down feels like the same hand as the hero.
 */
export const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;
const REVEAL_DURATION = 0.6;

/**
 * Reveal — a fade + rise on scroll into view. Deliberately understated.
 * Respects prefers-reduced-motion (renders static, fully visible).
 *
 * `blur` adds a short focus-in — keep it for small text runs, not large
 * surfaces (filter repaints the whole box). `scale` eases in from a hair
 * under 1 for cards.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 14,
  scale,
  blur = false,
  as = "div",
  ...rest
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  scale?: number;
  blur?: boolean;
  as?: keyof typeof motion;
} & Omit<HTMLMotionProps<"div">, "children">) {
  const reduce = useReducedMotion();
  const Comp = motion[as] as typeof motion.div;

  if (reduce) {
    const Static = as as React.ElementType;
    return <Static className={className}>{children}</Static>;
  }

  return (
    <Comp
      className={className}
      initial={{
        opacity: 0,
        y,
        ...(scale != null ? { scale } : null),
        ...(blur ? { filter: "blur(6px)" } : null),
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        ...(scale != null ? { scale: 1 } : null),
        ...(blur ? { filter: "blur(0px)" } : null),
      }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: REVEAL_DURATION, delay, ease: EASE_OUT_EXPO }}
      {...rest}
    >
      {children}
    </Comp>
  );
}

/**
 * RevealText — a display heading whose lines lift in one after another rather
 * than all at once. Write it exactly like a normal heading, splitting lines
 * with `<br />`. The scroll trigger sits on the heading itself and the lines
 * animate by variant propagation, so nothing depends on a translated child
 * being measurable. Use only where the breaks are deliberate.
 */
export function RevealText({
  children,
  as = "div",
  className,
  lineClassName,
  delay = 0,
  stagger = 0.09,
  y = 22,
  duration = 0.6,
}: {
  children: React.ReactNode;
  as?: "div" | "h1" | "h2" | "h3" | "h4" | "p" | "span";
  className?: string;
  lineClassName?: string;
  delay?: number;
  stagger?: number;
  y?: number;
  duration?: number;
}) {
  const reduce = useReducedMotion();

  if (reduce) {
    return React.createElement(as, { className }, children);
  }

  // split the children into lines on <br/>; React.Children.toArray keys them
  const lines: React.ReactNode[][] = [[]];
  for (const kid of React.Children.toArray(children)) {
    if (React.isValidElement(kid) && kid.type === "br") {
      lines.push([]);
    } else {
      lines[lines.length - 1].push(kid);
    }
  }

  const MotionTag = motion[as] as typeof motion.div;

  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: stagger, delayChildren: delay } },
      }}
    >
      {lines.map((line, i) => (
        <motion.span
          key={i}
          className={cn("block", lineClassName)}
          variants={{
            hidden: { opacity: 0, y },
            show: {
              opacity: 1,
              y: 0,
              transition: { duration, ease: EASE_OUT_EXPO },
            },
          }}
        >
          {line}
        </motion.span>
      ))}
    </MotionTag>
  );
}

/** Container that staggers direct <RevealItem> children. */
export function RevealGroup({
  children,
  className,
  stagger = 0.06,
}: {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
}) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-50px" }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: stagger } },
      }}
    >
      {children}
    </motion.div>
  );
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE_OUT_EXPO } },
};

export function RevealItem({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div className={className} variants={itemVariants}>
      {children}
    </motion.div>
  );
}
