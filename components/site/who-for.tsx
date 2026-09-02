import { Check } from "lucide-react";
import { Container, Kicker } from "./primitives";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion-primitives";
import { FOR_YOU } from "./data";

export function WhoFor() {
  return (
    <section id="who" className="scroll-mt-16 py-24 sm:py-32">
      <Container>
        <div className="grid gap-x-8 gap-y-8 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Kicker>06 / Who it&apos;s for</Kicker>
          </div>
          <div className="lg:col-span-8">
            <Reveal>
              <h2 className="text-balance font-display text-[clamp(2rem,4.6vw,3.1rem)] font-extrabold uppercase leading-[1.03] tracking-[-0.03em] text-ink">
                This is for you if…
              </h2>
            </Reveal>

            <RevealGroup className="mt-10 grid grid-cols-1 gap-x-8 sm:grid-cols-2">
              {FOR_YOU.map((item) => (
                <RevealItem
                  key={item}
                  className="flex items-baseline gap-3 border-b border-ink/15 py-4"
                >
                  <Check
                    className="size-4 shrink-0 translate-y-0.5 text-orange"
                    strokeWidth={3}
                    aria-hidden
                  />
                  <span className="text-[15px] leading-relaxed text-ink-2">
                    {item}
                  </span>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </div>
      </Container>
    </section>
  );
}
