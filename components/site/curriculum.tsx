"use client";

import * as React from "react";
import { animate, useInView, useReducedMotion } from "motion/react";
import { CURRICULUM } from "./data";
import { Container, Kicker } from "./primitives";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion-primitives";
import { ScrollReveal } from "./scroll-reveal";
import { cn } from "@/lib/utils";

const EASE = [0.16, 1, 0.3, 1] as const;

/** Counts from 0 → `to` once it scrolls into view. Static under reduced-motion. */
function CountUp({ to }: { to: number }) {
  const reduce = useReducedMotion();
  const ref = React.useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const [val, setVal] = React.useState(0);

  React.useEffect(() => {
    if (reduce || !inView) return;
    const controls = animate(0, to, {
      duration: 1.1,
      ease: EASE,
      onUpdate: (v) => setVal(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, to, reduce]);

  return <span ref={ref}>{reduce ? to : val}</span>;
}

const STATS = [
  { n: 16, label: "Trainings" },
  { n: 8, label: "Deliverables" },
  { n: 8, label: "Weeks" },
];

export function Curriculum() {
  return (
    <section id="curriculum" className="scroll-mt-16 py-24 sm:py-32">
      <Container>
        <div className="grid gap-x-8 gap-y-8 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Kicker>04 / The 8 weeks</Kicker>
          </div>
          <div className="lg:col-span-8">
            <Reveal>
              <h2 className="text-balance font-display text-[clamp(2rem,4.6vw,3.1rem)] font-extrabold uppercase leading-[1.03] tracking-[-0.03em] text-ink">
                From “where do I start?” to{" "}
                <span className="text-orange">“here&apos;s the strategy.”</span>
              </h2>
            </Reveal>
            <ScrollReveal className="mt-5 max-w-lg text-[15px] leading-relaxed text-ink-2">
              Eight weeks, eight phases of a real engagement — one focus per week,
              building from business discovery to a finished strategy.
            </ScrollReveal>

            <Reveal className="mt-8" delay={0.1}>
              <dl className="flex flex-wrap items-baseline gap-x-7 gap-y-4">
                {STATS.map((s, i) => (
                  <div
                    key={s.label}
                    className={cn(
                      "flex items-baseline gap-2",
                      i > 0 && "border-l border-ink/15 pl-7",
                    )}
                  >
                    <dd className="font-display text-3xl font-black tabular-nums text-orange">
                      <CountUp to={s.n} />
                    </dd>
                    <dt className="kicker text-ink-3">{s.label}</dt>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </div>

        <Reveal className="mt-14 sm:mt-16">
          {/* ledger header */}
          <div className="hidden grid-cols-12 gap-8 border-b border-ink pb-3 sm:grid">
            <Kicker className="col-span-1">Wk</Kicker>
            <Kicker className="col-span-4">Phase</Kicker>
            <Kicker className="col-span-7">Focus</Kicker>
          </div>

          <RevealGroup className="border-t border-ink/20 sm:border-t-0">
            {CURRICULUM.map((week) => (
              <RevealItem key={week.n}>
                <div className="grid grid-cols-12 items-baseline gap-x-4 gap-y-1 border-b border-ink/15 py-5 sm:gap-8">
                  <span className="col-span-2 font-display text-2xl font-black tabular-nums text-orange sm:col-span-1 sm:text-xl">
                    {String(week.n).padStart(2, "0")}
                  </span>
                  <span className="col-span-10 font-display text-lg font-bold tracking-[-0.02em] text-ink sm:col-span-4">
                    {week.phase}
                  </span>
                  <span className="col-span-10 col-start-3 text-[13px] leading-relaxed text-ink-2 sm:col-span-7 sm:col-start-auto">
                    {week.focus}
                  </span>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </Reveal>
      </Container>
    </section>
  );
}
