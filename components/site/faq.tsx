"use client";

import * as React from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Container, Kicker } from "./primitives";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion-primitives";
import { FAQ } from "./data";

const EASE = [0.16, 1, 0.3, 1] as const;

export function Faq() {
  const [open, setOpen] = React.useState<number | null>(0);
  const reduce = useReducedMotion();

  return (
    <section id="faq" className="scroll-mt-16 py-24 sm:py-32">
      <Container>
        <div className="grid gap-x-8 gap-y-8 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Kicker>06 / FAQ</Kicker>
          </div>
          <div className="lg:col-span-8">
            <Reveal>
              <h2 className="text-balance font-display text-[clamp(2rem,4.6vw,3.1rem)] font-extrabold uppercase leading-[1.03] tracking-[-0.03em] text-ink">
                Questions, answered.
              </h2>
            </Reveal>

            <RevealGroup className="mt-10 border-t border-ink/15">
              {FAQ.map((item, i) => {
                const isOpen = open === i;
                return (
                  <RevealItem key={item.q} className="border-b border-ink/15">
                    <h3>
                      <button
                        type="button"
                        id={`faq-q-${i}`}
                        aria-expanded={isOpen}
                        aria-controls={`faq-a-${i}`}
                        onClick={() => setOpen(isOpen ? null : i)}
                        className="group flex w-full items-start justify-between gap-6 py-5 text-left"
                      >
                        <span className="font-display text-lg font-bold tracking-[-0.02em] text-ink transition-colors group-hover:text-orange">
                          {item.q}
                        </span>
                        <span
                          aria-hidden
                          className={`mt-0.5 grid size-6 shrink-0 place-items-center text-orange transition-transform duration-300 ${
                            isOpen ? "rotate-45" : ""
                          }`}
                        >
                          <svg
                            viewBox="0 0 16 16"
                            className="size-4"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2.5}
                            strokeLinecap="round"
                          >
                            <path d="M8 2v12M2 8h12" />
                          </svg>
                        </span>
                      </button>
                    </h3>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          key="panel"
                          id={`faq-a-${i}`}
                          role="region"
                          aria-labelledby={`faq-q-${i}`}
                          initial={reduce ? false : { height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
                          transition={{ duration: 0.28, ease: EASE }}
                          className="overflow-hidden"
                        >
                          <p className="max-w-xl pb-6 pr-8 text-[15px] leading-relaxed text-ink-2">
                            {item.a}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </RevealItem>
                );
              })}
            </RevealGroup>
          </div>
        </div>
      </Container>
    </section>
  );
}
