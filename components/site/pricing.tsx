import { Container, Kicker } from "./primitives";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion-primitives";
import { CtaButton } from "./cta-button";
import { PROGRAM } from "./data";

const DETAILS: [string, string][] = [
  ["Cohort", `14 · ${PROGRAM.dates}`],
  ["Schedule", "Mon & Wed · 6–8 PM"],
  ["Format", PROGRAM.format],
  ["Contact", PROGRAM.contactPhone],
];

export function Pricing() {
  return (
    <section id="pricing" className="scroll-mt-16 py-24 sm:py-32">
      <Container>
        <Reveal scale={0.985}>
          <div className="overflow-hidden rounded-xl border border-ink/10 bg-white/50 shadow-sm backdrop-blur-sm">
            {/* header band */}
            <div className="flex flex-wrap items-center justify-between gap-3 bg-ink/5 px-6 py-3 sm:px-8">
              <Kicker>GrowthLab · September Cohort</Kicker>
              <Kicker className="text-red-500">Limited seats</Kicker>
            </div>

            <div className="px-6 pb-9 pt-12 text-center sm:px-8 sm:py-16">
              <h2 className="font-display text-[clamp(2.25rem,6vw,3.75rem)] font-black uppercase leading-[0.95] tracking-[-0.035em] text-ink">
                Join the September cohort
              </h2>

              <div className="mt-10 flex items-start justify-center gap-2">
                <span className="mt-3 font-mono text-xl font-medium text-ink-3 sm:mt-4">$</span>
                <span className="font-display text-[clamp(4rem,15vw,8rem)] font-black leading-[0.8] tracking-[-0.04em] text-ink">
                  {PROGRAM.price}
                </span>
              </div>

              {/* Enhanced CTA Area */}
              <div className="mx-auto mt-9 flex max-w-sm flex-col items-center gap-4">
                <CtaButton
                  href="#apply"
                  label="Apply now"
                  size="lg"
                  className="shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-xl sm:w-auto"
                />
              </div>

              <RevealGroup stagger={0.05}>
                <dl className="mx-auto mt-8 max-w-md border-t border-ink/15 text-left">
                  {DETAILS.map(([k, v]) => (
                    <RevealItem
                      key={k}
                      className="flex flex-col gap-0.5 border-b border-ink/15 py-3 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4"
                    >
                      <dt className="kicker text-ink-3">{k}</dt>
                      <dd className="text-[14px] font-medium tracking-tight text-ink sm:text-right">
                        {v}
                      </dd>
                    </RevealItem>
                  ))}
                </dl>
              </RevealGroup>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}