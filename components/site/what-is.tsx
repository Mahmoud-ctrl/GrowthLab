import { Container, Kicker } from "./primitives";
import { Reveal } from "@/components/motion-primitives";
import { ScrollReveal } from "./scroll-reveal";
import { DepthCarousel } from "./depth-carousel";
import { PIPELINE } from "./data";

export function WhatIs() {
  return (
    <section
      id="what"
      className="scroll-mt-16 border-t border-ink bg-paper-2 py-24 sm:py-32"
    >
      <Container>
        <div className="grid gap-x-8 gap-y-8 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Kicker>02 / What it is</Kicker>
          </div>
          <div className="lg:col-span-8">
            <Reveal>
              <h2 className="text-balance font-display text-[clamp(2rem,4.6vw,3.1rem)] font-extrabold uppercase leading-[1.03] tracking-[-0.03em] text-ink">
                So… what exactly is GrowthLab?
              </h2>
            </Reveal>
            <ScrollReveal className="mt-5 max-w-xl text-[15px] leading-relaxed text-ink-2">
              Not a classroom. Not another online course. GrowthLab is a simulated
              digital marketing agency where you learn marketing by actually doing
              the work. From Day&nbsp;1 you&apos;re on a team with a real client —
              researching, planning, creating, analysing and presenting like a
              real agency.
            </ScrollReveal>
          </div>
        </div>

        <Reveal className="mt-10 sm:mt-12">
          <Kicker className="block">How an engagement runs</Kicker>
          <DepthCarousel items={PIPELINE} className="mt-4 sm:mt-6" />
        </Reveal>
      </Container>
    </section>
  );
}
