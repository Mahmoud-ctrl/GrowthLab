import { Container, Kicker } from "./primitives";
import { RevealText } from "@/components/motion-primitives";
import RotatingText from "./RotatingText";
import { THE_EXPERIENCE } from "./data";

// The shared "You'll " lead-in is static; only the verb phrase rotates.
const BEATS = THE_EXPERIENCE.map((s) => s.replace(/^You['’]ll\s+/, ""));

export function Experience() {
  return (
    <section className="border-t border-ink bg-ink py-24 text-paper sm:py-32">
      <Container>
        <Kicker className="text-paper/45">07 / The experience</Kicker>

        <RevealText
          as="h2"
          className="mt-5 font-display text-[clamp(2.25rem,6vw,4rem)] font-black uppercase leading-[0.95] tracking-[-0.035em] [word-spacing:0.1em]"
        >
          For 8 weeks, you&apos;re not a student.
          <br />
          You&apos;re <span className="text-orange-ink">the agency</span>.
        </RevealText>

        <div className="mt-10 max-w-3xl font-display text-[clamp(1.25rem,3.4vw,2rem)] font-bold leading-[1.35] tracking-[-0.02em]">
          <p className="flex flex-wrap items-baseline gap-x-[0.28em] text-paper">
            <span>You&apos;ll</span>
            <RotatingText
              texts={BEATS}
              rotationInterval={1900}
              staggerDuration={0.012}
              staggerFrom="first"
              mainClassName="text-orange-ink"
              splitLevelClassName="overflow-hidden pb-[0.15em] -mb-[0.15em]"
              transition={{ type: "spring", damping: 30, stiffness: 320 }}
              initial={{ y: "110%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "-110%", opacity: 0 }}
            />
          </p>
          <p className="mt-2 text-paper/55">Just like a real marketing team.</p>
        </div>
      </Container>
    </section>
  );
}
