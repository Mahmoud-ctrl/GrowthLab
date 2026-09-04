import {
  Award,
  BriefcaseBusiness,
  Building2,
  ClipboardCheck,
  Wrench,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import { Container, Kicker } from "./primitives";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion-primitives";
import { BENEFITS } from "./data";
import { cn } from "@/lib/utils";

const ICONS: LucideIcon[] = [
  Award,
  BriefcaseBusiness,
  Building2,
  ClipboardCheck,
  Wrench,
  Workflow,
];

/** The anchor card — renders the credential itself, not a description of it. */
function CertificateCard({ caption }: { caption: string }) {
  return (
    <RevealItem
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-2xl border border-ink/12 bg-paper p-6 transition duration-300 sm:col-span-2 sm:p-7 lg:col-span-1 lg:row-span-2",
        "before:absolute before:inset-x-0 before:top-0 before:h-[3px] before:origin-left before:scale-x-0 before:bg-orange before:transition-transform before:duration-300",
        "hover:-translate-y-0.5 hover:border-ink/20 hover:shadow-[0_18px_44px_-28px_rgba(18,32,58,0.35)] hover:before:scale-x-100",
      )}
    >
      <div className="flex items-center justify-between">
        <span className="font-mono text-[13px] font-medium tabular-nums text-ink-3">
          01
        </span>
        <span className="grid size-10 shrink-0 place-items-center rounded-full bg-orange/10 text-orange ring-1 ring-orange/15 transition-transform duration-300 group-hover:scale-105">
          <Award className="size-[18px]" strokeWidth={2} aria-hidden />
        </span>
      </div>

      <h3 className="mt-6 font-display text-lg font-bold tracking-[-0.02em] text-ink">
        Certificate of Completion
      </h3>

      <p className="mt-2 max-w-md text-[14px] leading-relaxed text-ink-2">
        {caption}
      </p>
    </RevealItem>
  );
}

export function Benefits() {
  return (
    <section
      id="benefits"
      className="scroll-mt-16 border-t border-ink bg-paper-2 py-24 sm:py-32"
    >
      <Container>
        <div className="grid gap-x-8 gap-y-8 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Kicker>05 / What you keep</Kicker>
          </div>
          <div className="lg:col-span-8">
            <Reveal>
              <h2 className="text-balance font-display text-[clamp(2rem,4.6vw,3.1rem)] font-extrabold uppercase leading-[1.03] tracking-[-0.03em] [word-spacing:0.1em] text-ink">
                8 weeks later, you won&apos;t leave{" "}
                <span className="text-orange">empty-handed</span>.
              </h2>
            </Reveal>
          </div>
        </div>

        <RevealGroup className="mt-14 grid grid-cols-1 gap-4 sm:mt-16 sm:grid-cols-2 lg:grid-cols-3">
          {BENEFITS.map((b, i) => {
            if (i === 0)
              return <CertificateCard key={b.title} caption={b.body} />;

            const Icon = ICONS[i] ?? Award;
            const wide = b.span === "lg";

            const chips = b.facets && (
              <ul
                className={cn(
                  "flex flex-wrap gap-2",
                  wide
                    ? "mt-5 sm:mt-0 sm:w-[38%] sm:shrink-0 sm:content-center sm:border-l sm:border-ink/12 sm:pl-8"
                    : "mt-4",
                )}
              >
                {b.facets.map((f) => (
                  <li
                    key={f}
                    className="rounded-full border border-ink/12 bg-ink/[0.02] px-2.5 py-1 font-mono text-[11px] uppercase tracking-[0.1em] text-ink-3"
                  >
                    {f}
                  </li>
                ))}
              </ul>
            );

            return (
              <RevealItem
                key={b.title}
                className={cn(
                  "group relative flex h-full flex-col overflow-hidden rounded-2xl border border-ink/12 bg-paper p-6 transition duration-300 sm:p-7",
                  "before:absolute before:inset-x-0 before:top-0 before:h-[3px] before:origin-left before:scale-x-0 before:bg-orange before:transition-transform before:duration-300",
                  "hover:-translate-y-0.5 hover:border-ink/20 hover:shadow-[0_18px_44px_-28px_rgba(18,32,58,0.35)] hover:before:scale-x-100",
                  wide
                    ? "sm:col-span-2 sm:flex-row sm:items-center sm:gap-8 lg:col-span-3"
                    : "min-h-[208px]",
                )}
              >
                <div className={cn(wide && "sm:flex-1")}>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[13px] font-medium tabular-nums text-ink-3">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="grid size-10 shrink-0 place-items-center rounded-full bg-orange/10 text-orange ring-1 ring-orange/15 transition-transform duration-300 group-hover:scale-105">
                      <Icon className="size-[18px]" strokeWidth={2} aria-hidden />
                    </span>
                  </div>

                  <h3 className="mt-6 font-display text-lg font-bold tracking-[-0.02em] text-ink">
                    {b.title}
                  </h3>
                  <p
                    className={cn(
                      "mt-2 text-[14px] leading-relaxed text-ink-2",
                      wide ? "max-w-xl" : "max-w-md",
                    )}
                  >
                    {b.body}
                  </p>

                  {!wide && chips}
                </div>

                {wide && chips}
              </RevealItem>
            );
          })}
        </RevealGroup>
      </Container>
    </section>
  );
}
