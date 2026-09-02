import { Container, Kicker } from "./primitives";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion-primitives";
import { CtaButton } from "./cta-button";
import { PROGRAM, PROGRAM_INFO } from "./data";

export function Pricing() {
  return (
    <section id="pricing" className="scroll-mt-16 py-24 sm:py-32">
      <Container>
        <Reveal scale={0.985}>
          <div className="overflow-hidden rounded-xl border border-ink">
            {/* header band */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-ink px-6 py-3 sm:px-8">
              <Kicker>GrowthLab — Founding Cohort</Kicker>
              <Kicker>Limited seats</Kicker>
            </div>

            <div className="grid gap-y-10 sm:grid-cols-12">
              {/* price */}
              <div className="border-ink/20 p-6 sm:col-span-5 sm:border-r sm:p-8">
                <div className="flex items-start gap-2">
                  <span className="mt-2 font-mono text-lg text-ink-3">$</span>
                  <span className="font-display text-[clamp(4rem,12vw,7rem)] font-black leading-[0.85] tracking-[-0.04em] text-ink">
                    {PROGRAM.price}
                  </span>
                </div>
                <p className="mt-1 kicker text-ink-3">one-time · founding rate</p>

                <p className="mt-6 max-w-[15rem] text-[14px] leading-relaxed text-ink-2">
                  {PROGRAM.format}. Sessions every Monday &amp; Wednesday,
                  6:00–8:00&nbsp;PM.
                </p>

                <CtaButton
                  href="#apply"
                  label="Join the Founding Cohort"
                  className="mt-7"
                />
                <p className="mt-4 text-[12px] text-ink-3">
                  Questions? {PROGRAM.contactPhone}
                </p>
              </div>

              {/* quick program info */}
              <div className="p-6 sm:col-span-7 sm:p-8">
                <Kicker>Quick program info</Kicker>
                <RevealGroup stagger={0.05}>
                  <dl className="mt-4">
                    {PROGRAM_INFO.map(([k, v]) => (
                      <RevealItem
                        key={k}
                        className="flex items-baseline justify-between gap-4 border-b border-ink/15 py-3 text-[14px] first:border-t"
                      >
                        <dt className="kicker text-ink-3">{k}</dt>
                        <dd className="text-right font-medium tracking-tight text-ink">
                          {v}
                        </dd>
                      </RevealItem>
                    ))}
                  </dl>
                </RevealGroup>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
