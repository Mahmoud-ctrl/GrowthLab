import { Container, Kicker } from "./primitives";
import { RevealText } from "@/components/motion-primitives";
import BlurText from "./BlurText";
import { THE_EXPERIENCE } from "./data";

const BEATS = THE_EXPERIENCE.join(" ");
const BEAT_WORDS = BEATS.split(" ").length;

export function Experience() {
  return (
    <section className="border-t border-ink bg-ink py-24 text-paper sm:py-32">
      <Container>
        <Kicker className="text-paper/45">07 / The experience</Kicker>

        <RevealText
          as="h2"
          className="mt-5 font-display text-[clamp(2.25rem,6vw,4rem)] font-black uppercase leading-[0.95] tracking-[-0.035em]"
        >
          For 8 weeks, you&apos;re not a student.
          <br />
          You&apos;re <span className="text-orange-ink">the agency</span>.
        </RevealText>

        <div className="mt-10 max-w-3xl font-display text-[clamp(1.25rem,3.4vw,2rem)] font-bold leading-[1.35] tracking-[-0.02em]">
          <BlurText
            text={BEATS}
            delay={50}
            animateBy="words"
            className="text-paper"
            rootMargin="-40px 0px"
          />
          <BlurText
            text="Just like a real marketing team."
            delay={50}
            startDelay={BEAT_WORDS * 50}
            animateBy="words"
            className="text-paper/55"
            rootMargin="-40px 0px"
          />
        </div>
      </Container>
    </section>
  );
}
