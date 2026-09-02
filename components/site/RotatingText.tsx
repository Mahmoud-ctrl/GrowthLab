"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type TargetAndTransition,
  type Transition,
} from "motion/react";
import { cn } from "@/lib/utils";

/**
 * RotatingText — a single line that swaps through `texts` in place, each phrase
 * rolling in character by character behind a clip mask (reactbits.dev/
 * text-animations/rotating-text, ported to `motion` + this repo's conventions).
 *
 * Runs on every viewport (it's a light spring, not scroll-linked). Under
 * `prefers-reduced-motion` it renders every phrase once, joined by
 * `staticSeparator` — no per-frame work, no layout shift.
 */

type StaggerFrom = "first" | "last" | "center" | "random" | number;

type RotatingTextProps = {
  texts: string[];
  transition?: Transition;
  initial?: TargetAndTransition;
  animate?: TargetAndTransition;
  exit?: TargetAndTransition;
  rotationInterval?: number;
  staggerDuration?: number;
  staggerFrom?: StaggerFrom;
  loop?: boolean;
  auto?: boolean;
  splitBy?: "characters" | "words" | "lines" | string;
  mainClassName?: string;
  splitLevelClassName?: string;
  elementLevelClassName?: string;
  /** joins every phrase when rich motion is off */
  staticSeparator?: string;
};

type WordUnit = { characters: string[]; needsSpace: boolean };

export default function RotatingText({
  texts,
  transition = { type: "spring", damping: 25, stiffness: 300 },
  initial = { y: "100%", opacity: 0 },
  animate = { y: 0, opacity: 1 },
  exit = { y: "-120%", opacity: 0 },
  rotationInterval = 2000,
  staggerDuration = 0,
  staggerFrom = "first",
  loop = true,
  auto = true,
  splitBy = "characters",
  mainClassName,
  splitLevelClassName,
  elementLevelClassName,
  staticSeparator = " · ",
}: RotatingTextProps) {
  const reduced = useReducedMotion();
  const [index, setIndex] = useState(0);

  const elements = useMemo<WordUnit[]>(() => {
    const current = texts[index] ?? "";
    if (splitBy === "characters") {
      const words = current.split(" ");
      return words.map((word, i) => ({
        characters: Array.from(word),
        needsSpace: i !== words.length - 1,
      }));
    }
    const parts =
      splitBy === "words"
        ? current.split(" ")
        : splitBy === "lines"
          ? current.split("\n")
          : current.split(splitBy);
    return parts.map((part, i) => ({
      characters: [part],
      needsSpace: i !== parts.length - 1,
    }));
  }, [texts, index, splitBy]);

  const totalChars = useMemo(
    () => elements.reduce((sum, w) => sum + w.characters.length, 0),
    [elements],
  );

  const staggerDelay = useCallback(
    (i: number) => {
      if (staggerFrom === "first") return i * staggerDuration;
      if (staggerFrom === "last") return (totalChars - 1 - i) * staggerDuration;
      if (staggerFrom === "center") {
        return Math.abs(Math.floor(totalChars / 2) - i) * staggerDuration;
      }
      if (staggerFrom === "random") {
        return (
          Math.abs(Math.floor(Math.random() * totalChars) - i) * staggerDuration
        );
      }
      return Math.abs((staggerFrom as number) - i) * staggerDuration;
    },
    [staggerFrom, staggerDuration, totalChars],
  );

  const next = useCallback(() => {
    setIndex((prev) =>
      prev === texts.length - 1 ? (loop ? 0 : prev) : prev + 1,
    );
  }, [texts.length, loop]);

  useEffect(() => {
    if (!auto || reduced || texts.length < 2) return;
    const id = setInterval(next, rotationInterval);
    return () => clearInterval(id);
  }, [auto, reduced, texts.length, next, rotationInterval]);

  if (reduced) {
    return (
      <span className={cn("inline", mainClassName)}>
        {texts.join(staticSeparator)}
      </span>
    );
  }

  return (
    <motion.span
      className={cn(
        "relative inline-flex flex-wrap whitespace-pre-wrap",
        mainClassName,
      )}
      layout
      transition={transition}
    >
      <span className="sr-only">{texts[index]}</span>
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={index}
          className="relative inline-flex flex-wrap whitespace-pre-wrap"
          layout
          aria-hidden
        >
          {elements.map((word, wordIndex, arr) => {
            const priorChars = arr
              .slice(0, wordIndex)
              .reduce((sum, w) => sum + w.characters.length, 0);
            return (
              <span
                key={wordIndex}
                className={cn("inline-flex", splitLevelClassName)}
              >
                {word.characters.map((char, charIndex) => (
                  <motion.span
                    key={charIndex}
                    initial={initial}
                    animate={animate}
                    exit={exit}
                    transition={{
                      ...transition,
                      delay: staggerDelay(priorChars + charIndex),
                    }}
                    className={cn("inline-block", elementLevelClassName)}
                  >
                    {char}
                  </motion.span>
                ))}
                {word.needsSpace && <span className="whitespace-pre"> </span>}
              </span>
            );
          })}
        </motion.span>
      </AnimatePresence>
    </motion.span>
  );
}
