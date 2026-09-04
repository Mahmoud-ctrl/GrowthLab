import { Container, Kicker } from "./primitives";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion-primitives";
import { ScrollReveal } from "./scroll-reveal";
import { SpotlightCard } from "./spotlight-card";
import { CONTRAST } from "./data";

function XIcon() {
  return (
    <svg viewBox="0 0 12 12" className="h-3 w-3" aria-hidden>
      <path
        d="M2 2l8 8M10 2l-8 8"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 12 12" className="h-3 w-3" aria-hidden>
      <path
        d="M2 6.2l2.8 2.8L10 3.4"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

export function Problem() {
  return (
    <section id="problem" className="scroll-mt-16 py-24 sm:py-32">
      <Container>
        <div className="grid gap-x-8 gap-y-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Kicker>01 / The problem</Kicker>
          </div>
          <div className="lg:col-span-8">
            <Reveal>
              <h2 className="text-balance font-display text-[clamp(2rem,4.6vw,3.1rem)] font-extrabold uppercase leading-[1.03] tracking-[-0.03em] [word-spacing:0.1em] text-ink">
                You studied marketing. But can you actually{" "}
                <span className="text-orange">do</span> marketing?
              </h2>
            </Reveal>
            <ScrollReveal className="mt-6 max-w-xl text-[15px] leading-relaxed text-ink-2">
              A degree teaches you the concepts. It rarely lets you run the work.
              Here is the difference between how you learned marketing and how
              you&apos;ll practise it at GrowthLab.
            </ScrollReveal>
          </div>
        </div>

        <div className="mt-16 grid gap-6 sm:mt-20 sm:gap-8 lg:grid-cols-2">
          {/* left — traditional */}
          <Reveal>
            <SpotlightCard
              spotlightColor="rgba(18, 32, 58, 0.08)"
              className="h-full rounded-2xl bg-white p-7 shadow-xl shadow-black/[0.04] ring-1 ring-black/[0.04] sm:p-9"
            >
              <Kicker className="text-ink-3">{CONTRAST.old.label}</Kicker>
              <RevealGroup className="mt-6 flex flex-col gap-2.5">
                {CONTRAST.old.items.map((item) => (
                  <RevealItem
                    key={item}
                    className="flex items-center gap-3.5 rounded-2xl bg-black/[0.025] px-4 py-3.5"
                  >
                    <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-black/5 text-ink-3">
                      <XIcon />
                    </span>
                    <span className="text-[15px] text-ink-2">{item}</span>
                  </RevealItem>
                ))}
              </RevealGroup>
            </SpotlightCard>
          </Reveal>

          {/* right — growthlab */}
          <Reveal delay={0.08}>
            <SpotlightCard
              spotlightColor="rgba(224, 131, 36, 0.25)"
              className="h-full rounded-2xl bg-[#12203A] p-7 text-paper shadow-xl shadow-black/20 sm:p-9"
            >
              <Kicker className="text-orange-ink">{CONTRAST.new.label}</Kicker>
              <RevealGroup className="mt-6 flex flex-col gap-2.5">
                {CONTRAST.new.items.map((item) => (
                  <RevealItem
                    key={item}
                    className="flex items-center gap-3.5 rounded-2xl bg-white/5 px-4 py-3.5"
                  >
                    <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-orange text-[#12203A]">
                      <CheckIcon />
                    </span>
                    <span className="text-[15px] font-medium tracking-tight text-paper">
                      {item}
                    </span>
                  </RevealItem>
                ))}
              </RevealGroup>
            </SpotlightCard>
          </Reveal>
        </div>

        <ScrollReveal className="mt-12 max-w-2xl font-display text-[clamp(1.2rem,3vw,1.75rem)] font-bold leading-[1.25] tracking-[-0.02em] text-ink sm:mt-16">
          The goal isn&apos;t to give you more information.{" "}
          <span className="text-orange">It&apos;s to give you experience.</span>
        </ScrollReveal>
      </Container>
    </section>
  );
}
