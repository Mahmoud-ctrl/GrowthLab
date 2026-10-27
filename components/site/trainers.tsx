"use client";

import * as React from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { FaLinkedinIn } from "react-icons/fa6";
import { Container, Kicker } from "./primitives";
import { Reveal } from "@/components/motion-primitives";
import { TRAINERS } from "./data";
import { cn } from "@/lib/utils";

export function Trainers() {
  const trackRef = React.useRef<HTMLUListElement>(null);
  const [edge, setEdge] = React.useState({ start: true, end: false });

  const update = React.useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setEdge({
      start: el.scrollLeft <= 4,
      end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 4,
    });
  }, []);

  React.useEffect(() => {
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [update]);

  const scrollByCard = (dir: 1 | -1) => {
    const el = trackRef.current;
    const card = el?.querySelector("li");
    if (!el || !card) return;
    el.scrollBy({ left: dir * (card.clientWidth + 16), behavior: "smooth" });
  };

  return (
    <section
      id="trainers"
      className="scroll-mt-16 overflow-hidden border-t border-ink bg-paper-2 py-24 sm:py-32"
    >
      <Container>
        <div className="grid gap-x-8 gap-y-8 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Kicker>04 / Your trainers</Kicker>
          </div>
          <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between lg:col-span-8">
            <Reveal>
              <h2 className="text-balance font-display text-[clamp(2rem,4.6vw,3.1rem)] font-extrabold uppercase leading-[1.03] tracking-[-0.03em] [word-spacing:0.1em] text-ink">
                Learn from people who <span className="text-orange">do the work</span>.
              </h2>
            </Reveal>

            <div className="hidden shrink-0 gap-2 sm:flex">
              {([-1, 1] as const).map((dir) => {
                const Icon = dir === -1 ? ArrowLeft : ArrowRight;
                const disabled = dir === -1 ? edge.start : edge.end;
                return (
                  <button
                    key={dir}
                    type="button"
                    onClick={() => scrollByCard(dir)}
                    disabled={disabled}
                    aria-label={dir === -1 ? "Previous trainers" : "Next trainers"}
                    className="grid size-11 place-items-center rounded-full border border-ink/15 text-ink transition hover:border-ink hover:bg-ink hover:text-paper disabled:pointer-events-none disabled:opacity-30"
                  >
                    <Icon className="size-[18px]" strokeWidth={2} aria-hidden />
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </Container>

      {/* full-bleed track, but the first card lines up with the container edge */}
      <ul
        ref={trackRef}
        onScroll={update}
        className="mt-14 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth scroll-px-5 px-5 pb-4 [scrollbar-width:none] sm:mt-16 sm:scroll-px-8 sm:px-8 xl:scroll-px-[calc((100vw-1240px)/2+2rem)] xl:px-[calc((100vw-1240px)/2+2rem)] [&::-webkit-scrollbar]:hidden"
      >
        {TRAINERS.map((t) => {
          // the whole card links to LinkedIn when there is a profile
          const card = cn(
            "group relative flex h-full flex-col items-center overflow-hidden rounded-2xl border border-ink/12 bg-paper px-6 pb-7 pt-8 text-center transition duration-300",
            "before:absolute before:inset-x-0 before:top-0 before:h-[3px] before:origin-left before:scale-x-0 before:bg-orange before:transition-transform before:duration-300",
            "hover:-translate-y-0.5 hover:border-ink/20 hover:shadow-[0_18px_44px_-28px_rgba(18,32,58,0.35)] hover:before:scale-x-100",
            "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange",
          );

          const body = (
            <>
              <div className="relative size-36 overflow-hidden rounded-full ring-1 ring-ink/10 ring-offset-4 ring-offset-paper transition duration-300 group-hover:ring-orange/60">
                <Image
                  src={t.photo}
                  alt={`Portrait of ${t.name}`}
                  fill
                  sizes="144px"
                  className="object-cover"
                />
              </div>

              <h3 className="mt-6 font-display text-lg font-bold tracking-[-0.02em] text-ink">
                {t.name}
              </h3>
              {t.role && (
                <p className="mt-1.5 text-[13.5px] leading-snug text-ink-2">{t.role}</p>
              )}

              {t.linkedin && (
                <span className="mt-auto inline-flex items-center gap-2 pt-5 font-mono text-[11px] uppercase tracking-[0.1em] text-ink-3 transition group-hover:text-orange">
                  <FaLinkedinIn className="size-[13px]" aria-hidden />
                  LinkedIn
                </span>
              )}
            </>
          );

          return (
            <li key={t.name} className="w-[240px] shrink-0 snap-start sm:w-[260px]">
              {t.linkedin ? (
                <a
                  href={`https://www.linkedin.com/in/${t.linkedin}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${t.name}${t.role ? `, ${t.role}` : ""} on LinkedIn`}
                  className={card}
                >
                  {body}
                </a>
              ) : (
                <article className={card}>{body}</article>
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
