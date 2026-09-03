"use client";

import type { ComponentType, CSSProperties, SVGProps } from "react";
import {
  SiGoogleads,
  SiMeta,
  SiGoogleanalytics,
  SiGooglesearchconsole,
} from "react-icons/si";
import { Container } from "./primitives";

type IconCmp = ComponentType<SVGProps<SVGSVGElement>>;

const TOOLS: { name: string; Icon: IconCmp; color: string }[] = [
  { name: "Google Ads", Icon: SiGoogleads, color: "#4285F4" },
  { name: "Meta Ads", Icon: SiMeta, color: "#0467DF" },
  { name: "GA4", Icon: SiGoogleanalytics, color: "#E37400" },
  { name: "Search Console", Icon: SiGooglesearchconsole, color: "#458CF5" },
];

const delayVar = (seconds: number) => ({ "--gl-delay": `${seconds}s` } as CSSProperties);

/** Splits text into words, each rising up from behind a clip mask on a stagger. */
function WordReveal({
  text,
  className,
  delay = 0,
  stagger = 0.05,
}: {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
}) {
  const words = text.split(" ");
  return (
    <span className={className}>
      {words.flatMap((word, i) => {
        const chip = (
          <span
            key={`w-${i}`}
            className="inline-block overflow-hidden pb-[0.15em] mb-[-0.15em] align-bottom"
          >
            <span className="gl-word" style={delayVar(delay + i * stagger)}>
              {word}
            </span>
          </span>
        );
        // put the gap BETWEEN chips (not trailing inside one, where it gets trimmed)
        return i === 0 ? [chip] : [" ", chip];
      })}
    </span>
  );
}

export function Hero() {
  return (
    <section
      id="top"
      className="relative isolate overflow-hidden bg-paper text-ink pt-32 pb-10 sm:pt-40 sm:pb-14"
    >
      {/* Ambient background */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        {/* precision grid, faded from the top */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#12203a08_1px,transparent_1px),linear-gradient(to_bottom,#12203a08_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_70%_55%_at_50%_0%,#000_60%,transparent_100%)]" />
      </div>

      <div className="relative z-10">
        <div className="mx-auto grid max-w-[1240px] grid-cols-1 items-center gap-12 px-5 sm:px-8 lg:grid-cols-[0.95fr_1.05fr] lg:gap-10">
          <div
            className="gl-kv-in relative order-last mx-auto w-full max-w-[460px] lg:order-first lg:max-w-none"
            style={delayVar(0.45)}
          >
            <div
              aria-hidden
              className="pointer-events-none absolute -inset-6 bg-[radial-gradient(ellipse_50%_45%_at_45%_45%,rgba(224,131,36,0.16),transparent_70%)]"
            />
            <div
              role="img"
              aria-label="A hand holding a phone showing a marketing campaign dashboard with total ad spend, conversions, and per-platform performance across Google, Meta, and TikTok Ads"
              className="relative aspect-square bg-paper bg-[url('/hero-phone.webp')] bg-cover bg-left bg-no-repeat [background-blend-mode:multiply] lg:aspect-[10/11]"
            >
              <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-b from-transparent to-paper"
              />
            </div>
          </div>

          {/* Text column */}
          <div className="text-left">
            <h1 className="mt-4 tracking-tight text-ink">
              <span className="mt-3 block text-[2.55rem] font-extrabold uppercase leading-[0.94] tracking-tight sm:text-[4.25rem] lg:hidden">
                <WordReveal
                  text="You don't need another marketing course."
                  delay={0.2}
                  stagger={0.05}
                  className="block"
                />
                <WordReveal
                  text="You need real"
                  delay={0.5}
                  stagger={0.05}
                  className="mt-[0.6em] block"
                />
                <WordReveal
                  text="Agency experience."
                  delay={0.64}
                  stagger={0.06}
                  className="mt-1 block whitespace-nowrap text-[0.72em] font-serif font-normal italic tracking-normal text-orange"
                />
              </span>

              {/* desktop — original layout */}
              <span className="hidden lg:block">
                <WordReveal
                  text="You don't need another marketing course."
                  delay={0.05}
                  stagger={0.028}
                  className="block text-balance text-lg font-medium tracking-tight text-ink sm:text-2xl lg:text-3xl"
                />
                <span className="mt-3 block text-4xl font-extrabold uppercase leading-[0.94] tracking-tight sm:text-6xl lg:text-[4.25rem]">
                  <WordReveal text="You need real" delay={0.2} stagger={0.05} />{" "}
                  <WordReveal
                    text="agency experience."
                    delay={0.38}
                    stagger={0.06}
                    className="font-serif font-normal italic lowercase tracking-normal text-orange underline decoration-orange/30 underline-offset-8"
                  />
                </span>
              </span>
            </h1>

            <p
              className="gl-fade-blur mt-7 max-w-xl text-lg font-normal leading-relaxed text-ink"
              style={delayVar(0.55)}
            >
              An 8-week hands-on experience where you work on real client projects, learn from
              industry experts, and build the practical skills and experience you need to start your
              career in digital marketing.
            </p>

            <div className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:gap-5">
              <div className="gl-rise-fade" style={delayVar(0.68)}>
                <button
                  onClick={() =>
                    document.getElementById("apply")?.scrollIntoView({ behavior: "smooth" })
                  }
                  className="group relative inline-flex h-16 items-center gap-5 rounded-full bg-ink pl-8 pr-3 text-sm font-semibold tracking-wide text-white shadow-[0_12px_32px_-8px_rgba(18,32,58,0.3)] transition-all duration-300 hover:bg-[#1c2e52] hover:shadow-[0_16px_40px_-6px_rgba(18,32,58,0.4)] hover:scale-[1.02] active:scale-[0.98]"
                >
                  <span className="whitespace-nowrap text-[15px] font-semibold text-white">Apply now</span>
                  <div className="grid h-11 w-11 place-items-center rounded-full bg-orange text-white shadow-md transition-transform duration-300 group-hover:rotate-45">
                    <svg viewBox="0 0 16 16" className="h-[18px] w-[18px] stroke-[2]" aria-hidden="true">
                      <path
                        d="M4.5 11.5L11.5 4.5M11.5 4.5H5.5M11.5 4.5V10.5"
                        stroke="currentColor"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </button>
              </div>

              <div className="gl-rise-fade" style={delayVar(0.78)}>
                <button
                  onClick={() =>
                    document.getElementById("curriculum")?.scrollIntoView({ behavior: "smooth" })
                  }
                  className="group inline-flex items-center gap-2 px-5 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-ink/70 transition-all duration-200 hover:text-ink"
                >
                  <span>See the 8-week breakdown</span>
                  <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Tool showcase */}
        <Container>
          <div className="gl-fade-blur mx-auto mt-16 max-w-2xl sm:mt-24" style={delayVar(0.8)}>
            <div className="rounded-2xl border border-ink/[0.06] bg-white/50 p-5 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] backdrop-blur-md">
              <span className="mb-3.5 block text-center text-[10px] font-bold uppercase tracking-[0.25em] text-ink/40">
                Master Execution On
              </span>
              <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5">
                {TOOLS.map(({ name, Icon, color }) => (
                  <div
                    key={name}
                    className="group flex items-center gap-2 rounded-full border border-ink/10 bg-white/70 px-3 py-1.5 transition-colors hover:border-ink/20"
                  >
                    <Icon
                      aria-hidden
                      style={{ color }}
                      className="h-4 w-4 shrink-0 transition-transform duration-300 group-hover:scale-110"
                    />
                    <span className="text-[11px] font-semibold text-ink/80 sm:text-xs">
                      {name}
                    </span>
                  </div>
                ))}
                <div className="flex items-center rounded-full border border-ink/10 bg-white/70 px-3 py-1.5">
                  <span className="text-[11px] font-semibold text-ink/50 sm:text-xs">
                    And more
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
}
