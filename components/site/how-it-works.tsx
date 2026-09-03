"use client";

import { useRef } from "react";
import { GraduationCap, Rocket, Presentation, type LucideIcon } from "lucide-react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  type MotionValue,
} from "motion/react";
import { Container, Kicker } from "./primitives";
import { Reveal } from "@/components/motion-primitives";
import { ScrollReveal } from "./scroll-reveal";
import { HOW_IT_WORKS } from "./data";

const STEP_ICONS: LucideIcon[] = [GraduationCap, Rocket, Presentation];

// where each connector finishes filling along the section's scroll progress (0–1)
const LOCK_AT = [0.08, 0.5, 0.85];

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

function Step({
  index,
  isLast,
  progress,
  reduce,
  tag,
  title,
  body,
}: {
  index: number;
  isLast: boolean;
  progress: MotionValue<number>;
  reduce: boolean;
  tag: string;
  title: string;
  body: string;
}) {
  const Icon = STEP_ICONS[index] ?? GraduationCap;
  const from = LOCK_AT[index] ?? index / LOCK_AT.length;
  const to = LOCK_AT[index + 1] ?? 1;
  // connector below this icon fills toward the next one as you scroll
  const segFill = useTransform(progress, [from, to], [0, 1]);

  return (
    <div className="flex gap-6 pb-16 last:pb-0 sm:gap-8 sm:pb-24">
      {/* icon + connecting rail */}
      <div className="flex w-14 shrink-0 flex-col items-center">
        <div className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-orange text-ink shadow-[0_10px_24px_-10px_rgba(224,131,36,0.6)]">
          <Icon className="h-[26px] w-[26px]" strokeWidth={2} aria-hidden />
        </div>

        {!isLast && (
          <div className="relative mt-4 w-0.5 flex-1 bg-ink/15">
            <motion.div
              aria-hidden
              style={{ scaleY: reduce ? 1 : segFill }}
              className="absolute inset-0 origin-top bg-orange"
            />
          </div>
        )}
      </div>

      {/* text */}
      <div className="min-w-0 pt-1.5">
        <span className="kicker text-orange">{tag}</span>
        <h3 className="mt-2.5 font-display text-[1.4rem] font-bold leading-tight tracking-[-0.02em] text-ink sm:text-[1.75rem]">
          {title}
        </h3>
        <ScrollReveal className="mt-3 max-w-lg text-[15px] leading-relaxed text-ink-2">
          {body}
        </ScrollReveal>
      </div>
    </div>
  );
}

export function HowItWorks() {
  const reduce = useReducedMotion() ?? false;
  const trackRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start center", "end center"],
  });

  return (
    <section id="how" className="scroll-mt-16 py-24 sm:py-32">
      <Container>
        <div className="grid gap-x-8 gap-y-14 lg:grid-cols-12">
          {/* left — heading stays pinned while the steps scroll */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <Kicker>03 / How it works</Kicker>
              <Reveal>
                <h2 className="mt-4 text-balance font-display text-[clamp(2rem,4.6vw,3.1rem)] font-extrabold uppercase leading-[1.03] tracking-[-0.03em] text-ink">
                  Learn it. Apply it.{" "}
                  <span className="text-orange">Deliver it.</span>
                </h2>
              </Reveal>
              <ScrollReveal className="mt-5 max-w-sm text-[15px] leading-relaxed text-ink-2">
                Learn. Apply. Deliver. Every week, you’ll follow the real agency
                workflow from training to final client presentation.
              </ScrollReveal>
              <Reveal className="mt-8" delay={0.1}>
                <motion.button
                  onClick={() => scrollTo("apply")}
                  whileHover={reduce ? undefined : { y: -2 }}
                  whileTap={reduce ? undefined : { scale: 0.97 }}
                  transition={{ type: "spring", stiffness: 420, damping: 26 }}
                  className="group inline-flex items-center gap-2.5 rounded-full bg-ink px-7 py-4 text-sm font-semibold text-paper shadow-[0_12px_32px_-12px_rgba(18,32,58,0.4)] transition-[background-color,box-shadow] duration-200 hover:bg-[#1c2e52] hover:shadow-[0_16px_40px_-10px_rgba(18,32,58,0.45)]"
                >
                  Download the 8-week curriculum
                  <span
                    aria-hidden
                    className="transition-transform duration-200 group-hover:translate-x-1"
                  >
                    →
                  </span>
                </motion.button>
              </Reveal>
            </div>
          </div>

          {/* right — connected stepper, rail inks in on scroll */}
          <div ref={trackRef} className="lg:col-span-7 lg:pt-2">
            {HOW_IT_WORKS.map((c, i) => (
              <Step
                key={c.tag}
                index={i}
                isLast={i === HOW_IT_WORKS.length - 1}
                progress={scrollYProgress}
                reduce={reduce}
                tag={c.tag}
                title={c.title}
                body={c.body}
              />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
