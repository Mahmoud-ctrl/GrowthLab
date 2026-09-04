import { Container, Kicker } from "./primitives";
import { Reveal } from "@/components/motion-primitives";
import { CrossOut } from "./CrossOut";
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
              <h2 className="text-balance font-display text-[clamp(2rem,4.6vw,3.1rem)] font-extrabold uppercase leading-[1.03] tracking-[-0.03em] [word-spacing:0.1em] text-ink">
                So… what exactly is{" "}
                <span className="text-orange">GrowthLab</span>?
              </h2>
            </Reveal>
            <Reveal delay={0.08} className="mt-6">
              <div className="rounded-2xl bg-ink p-7 shadow-[0_28px_64px_-24px_rgba(18,32,58,0.5)] sm:p-9">
                <p className="max-w-xl font-display text-lg font-bold leading-[1.45] tracking-[-0.01em] text-paper-on-ink sm:text-xl">
                  Not a <CrossOut>classroom</CrossOut>. Not a <CrossOut>pre-recorded course</CrossOut>.
                  GrowthLab is a{" "}
                  <span className="text-orange-ink">
                    hands-on learning experience that bridges the gap
                  </span>{" "}
                  between marketing knowledge and real-world practice.
                </p>
              </div>
            </Reveal>
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
