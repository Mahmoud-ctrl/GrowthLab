"use client";

import * as React from "react";
import { animate, useInView, useReducedMotion } from "motion/react";
import { Container, Kicker } from "./primitives";
import { Reveal } from "@/components/motion-primitives";
import { ScrollReveal } from "./scroll-reveal";

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
  { n: 16, label: "Trainings", caption: "Online – Practical Sessions" },
  { n: 8, label: "Deliverables", caption: "Work on Real Client Projects" },
  { n: 8, label: "Weeks", caption: "Structured, week by week" },
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
              <h2 className="text-balance font-display text-[clamp(2rem,4.6vw,3.1rem)] font-extrabold uppercase leading-[1.03] tracking-[-0.03em] [word-spacing:0.1em] text-ink">
                From “where do I start?” to{" "}
                <span className="text-orange">“here&apos;s the strategy.”</span>
              </h2>
            </Reveal>
            <ScrollReveal className="mt-5 max-w-lg text-[15px] leading-relaxed text-ink-2">
              Eight weeks of real agency-style experience. Learn from industry
              experts, work with your team on a real client project, and
              experience the full marketing workflow, from discovery and strategy
              to execution and final client deliverables.
            </ScrollReveal>

            <Reveal className="mt-10 sm:mt-12" delay={0.1}>
              <dl className="border-y border-ink/15">
                {STATS.map((s) => (
                  <div
                    key={s.label}
                    className="border-b border-ink/15 py-8 last:border-b-0 sm:py-10"
                  >
                    <dd className="font-display text-6xl font-black leading-none tabular-nums text-orange sm:text-7xl">
                      <CountUp to={s.n} />
                    </dd>
                    <dt className="mt-3 font-display text-lg font-bold tracking-[-0.01em] text-ink sm:text-xl">
                      {s.label}
                    </dt>
                    <p className="kicker mt-4 text-ink-3">{s.caption}</p>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
