"use client";

import { Fragment, useRef } from "react";
import * as React from "react";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { cn } from "@/lib/utils";
import { useRichMotion } from "./use-rich-motion";

/**
 * ScrollReveal — body copy that resolves word by word as it scrolls up through
 * the viewport: each word ramps from faint + blurred to solid, keyed to scroll
 * progress over the paragraph (the reactbits.dev/text-animations/scroll-reveal
 * effect, built on `motion` rather than GSAP). Headings don't use this.
 *
 * On phones / reduced-motion this renders a plain <p> — the per-word
 * `filter: blur()` writes are the single worst scroll-jank source on mobile.
 *
 * `children` is a string, optionally with one level of <span className> for an
 * accent run.
 */

type Props = {
  children: React.ReactNode;
  className?: string;
  baseOpacity?: number;
  blurStrength?: number;
  /** widen the scroll window for one- or two-word lines so they ramp, not pop */
  shortLine?: boolean;
};

export function ScrollReveal({ children, className, ...rest }: Props) {
  const rich = useRichMotion();
  if (!rich) return <p className={className}>{children}</p>;
  return (
    <ScrollRevealRich className={className} {...rest}>
      {children}
    </ScrollRevealRich>
  );
}

type Token = { text: string; className?: string; space: boolean };

function tokenize(children: React.ReactNode): Token[] {
  const out: Token[] = [];
  const pushText = (str: string, className?: string) => {
    for (const part of str.split(/(\s+)/)) {
      if (part === "") continue;
      out.push({ text: part, className, space: /^\s+$/.test(part) });
    }
  };

  React.Children.toArray(children).forEach((child) => {
    if (typeof child === "string" || typeof child === "number") {
      pushText(String(child));
    } else if (React.isValidElement(child)) {
      const el = child as React.ReactElement<{
        className?: string;
        children?: React.ReactNode;
      }>;
      const inner = React.Children.toArray(el.props.children)
        .map((c) =>
          typeof c === "string" || typeof c === "number" ? String(c) : "",
        )
        .join("");
      pushText(inner, el.props.className);
    }
  });

  return out;
}

function Word({
  children,
  className,
  progress,
  range,
  baseOpacity,
  blurStrength,
}: {
  children: string;
  className?: string;
  progress: MotionValue<number>;
  range: [number, number];
  baseOpacity: number;
  blurStrength: number;
}) {
  const opacity = useTransform(progress, range, [baseOpacity, 1]);
  const blur = useTransform(progress, range, [blurStrength, 0]);
  const filter = useTransform(blur, (v) => (v <= 0.02 ? "none" : `blur(${v}px)`));

  return (
    <motion.span className={cn("inline-block", className)} style={{ opacity, filter }}>
      {children}
    </motion.span>
  );
}

function ScrollRevealRich({
  children,
  className,
  baseOpacity = 0.1,
  blurStrength = 4,
  shortLine = false,
}: Props) {
  const ref = useRef<HTMLParagraphElement>(null);

  const { scrollYProgress } = useScroll(
    shortLine
      ? { target: ref, offset: ["start 0.95", "end 0.45"] }
      : { target: ref, offset: ["start 0.85", "end 0.6"] },
  );

  const tokens = tokenize(children);
  const total = tokens.reduce((n, t) => n + (t.space ? 0 : 1), 0) || 1;

  let wi = -1;
  return (
    <p ref={ref} className={className}>
      {tokens.map((t, i) => {
        if (t.space) return <Fragment key={i}>{t.text}</Fragment>;
        wi += 1;
        const start = wi / total;
        const end = (wi + 1) / total;
        return (
          <Word
            key={i}
            className={t.className}
            progress={scrollYProgress}
            range={[start, end]}
            baseOpacity={baseOpacity}
            blurStrength={blurStrength}
          >
            {t.text}
          </Word>
        );
      })}
    </p>
  );
}
