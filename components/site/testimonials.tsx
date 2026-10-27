"use client";

import * as React from "react";
import { useInView, useReducedMotion } from "motion/react";
import { Star } from "lucide-react";
import { Container, Kicker } from "./primitives";
import { Reveal } from "@/components/motion-primitives";
import { TESTIMONIALS } from "./data";
import { cn } from "@/lib/utils";

const EASE_CSS = "cubic-bezier(0.16, 1, 0.3, 1)";
const TURN_MS = 900;
const AUTOPLAY_MS = 5000;
const SWIPE_PX = 40;

/*
 * The reviewer list sits on a wheel. Each review appears twice around it
 * (8 slots, 45° apart) so the active name has a visible neighbour above and
 * below on the arc. `step` only ever counts up or down, so the wheel always
 * turns the short way and never jumps when the list wraps.
 *
 * The turn is a pair of CSS transitions — the wheel rotates one way, every
 * item counter-rotates the other with the same timing so its text stays
 * upright — so the compositor animates it with no per-frame JS.
 */
const SLOTS = TESTIMONIALS.length * 2;
const SLOT_DEG = 360 / SLOTS;
const RADIUS = 130;
const AVATAR = 56;

const wrap = (n: number, m: number) => ((n % m) + m) % m;

/** signed shortest distance from `from` to `to` around the wheel */
function slotDistance(from: number, to: number) {
  const d = wrap(to - from, SLOTS);
  return d > SLOTS / 2 ? d - SLOTS : d;
}

function Stars({ rating, className }: { rating: number; className?: string }) {
  return (
    <div
      className={cn("flex items-center gap-0.5", className)}
      role="img"
      aria-label={`${rating} out of 5 stars`}
    >
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          className={cn(
            "size-3.5",
            i < rating ? "fill-orange text-orange" : "fill-ink/10 text-ink/10",
          )}
          strokeWidth={1.5}
          aria-hidden
        />
      ))}
    </div>
  );
}

export function Testimonials() {
  const reduce = useReducedMotion();
  const sectionRef = React.useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { amount: 0.3 });
  const [step, setStep] = React.useState(0);
  const [paused, setPaused] = React.useState(false);

  // swipe up → next review, swipe down → previous (touch, pen or mouse drag)
  const swipe = React.useRef<{ y: number; moved: boolean } | null>(null);
  const onPointerDown = (e: React.PointerEvent) => {
    swipe.current = { y: e.clientY, moved: false };
  };
  const onPointerUp = (e: React.PointerEvent) => {
    const s = swipe.current;
    if (!s) return;
    const dy = e.clientY - s.y;
    if (Math.abs(dy) > SWIPE_PX) {
      s.moved = true;
      setStep((n) => n + (dy < 0 ? 1 : -1));
    }
  };
  // a swipe that ends on a name must not also count as a click on it
  const onClickCapture = (e: React.MouseEvent) => {
    if (swipe.current?.moved) {
      e.stopPropagation();
      e.preventDefault();
    }
    swipe.current = null;
  };

  const activeSlot = wrap(step, SLOTS);
  const activeIndex = wrap(step, TESTIMONIALS.length);
  const transition = reduce
    ? "none"
    : `transform ${TURN_MS}ms ${EASE_CSS}, opacity ${TURN_MS}ms ${EASE_CSS}`;

  // only turn while the section is on screen and the tab is visible
  React.useEffect(() => {
    if (reduce || paused || !inView) return;
    const id = window.setTimeout(() => {
      if (!document.hidden) setStep((s) => s + 1);
    }, AUTOPLAY_MS);
    return () => window.clearTimeout(id);
  }, [step, paused, inView, reduce]);

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      className="relative scroll-mt-16 overflow-hidden border-t border-ink bg-paper-2 py-24 sm:py-32"
    >
      {/* the big disc behind the panel, after the reference */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-[240px] top-[58%] size-[560px] -translate-y-1/2 rounded-full bg-gradient-to-br from-orange to-[#c96a12] sm:-left-[200px] sm:size-[640px]"
      />

      <Container className="relative">
        <div className="grid gap-x-8 gap-y-8 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Kicker>07 / In their words</Kicker>
          </div>
          <div className="lg:col-span-8">
            <Reveal>
              <h2 className="text-balance font-display text-[clamp(2rem,4.6vw,3.1rem)] font-extrabold uppercase leading-[1.03] tracking-[-0.03em] [word-spacing:0.1em] text-ink">
                Don&apos;t take <span className="text-orange">our word</span> for it.
              </h2>
            </Reveal>
          </div>
        </div>

        <Reveal className="mt-14 sm:mt-16">
          <div
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onFocus={() => setPaused(true)}
            onBlur={() => setPaused(false)}
            className="grid overflow-hidden rounded-3xl border border-ink/10 bg-paper shadow-[0_40px_80px_-48px_rgba(18,32,58,0.45)] md:grid-cols-12"
          >
            {/* left — reviewers on the arc */}
            <div
              onPointerDown={onPointerDown}
              onPointerUp={onPointerUp}
              onPointerCancel={() => (swipe.current = null)}
              onClickCapture={onClickCapture}
              // vertical drags here turn the wheel instead of scrolling the page
              className="relative h-[320px] cursor-grab touch-pan-x select-none [contain:layout_paint] active:cursor-grabbing md:col-span-5 md:h-[400px]"
            >
              {/* circle centre: the active avatar's centre sits RADIUS to its right */}
              <div
                className="absolute top-1/2 left-10 sm:left-14"
                style={{ marginLeft: AVATAR / 2 - RADIUS }}
              >
                <svg
                  aria-hidden
                  className="pointer-events-none absolute overflow-visible"
                  style={{ left: -RADIUS, top: -RADIUS, width: 2 * RADIUS, height: 2 * RADIUS }}
                  viewBox={`0 0 ${2 * RADIUS} ${2 * RADIUS}`}
                >
                  <circle
                    cx={RADIUS}
                    cy={RADIUS}
                    r={RADIUS}
                    fill="none"
                    className="stroke-ink/15"
                    strokeWidth={1.5}
                  />
                </svg>

                <div
                  className="absolute left-0 top-0 will-change-transform"
                  style={{ transform: `rotate(${-step * SLOT_DEG}deg)`, transition }}
                >
                  {Array.from({ length: SLOTS }, (_, slot) => {
                    const t = TESTIMONIALS[slot % TESTIMONIALS.length];
                    const d = Math.abs(slotDistance(activeSlot, slot));
                    const isActive = d === 0;
                    const visible = d <= 1;
                    const phi = slot * SLOT_DEG;
                    return (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => setStep((s) => s + slotDistance(activeSlot, slot))}
                        tabIndex={visible && !isActive ? 0 : -1}
                        aria-hidden={!visible}
                        aria-label={`Show ${t.name}'s review`}
                        className={cn(
                          "absolute flex items-center gap-4 text-left will-change-transform",
                          !visible && "pointer-events-none",
                        )}
                        style={{
                          left: -AVATAR / 2,
                          top: -AVATAR / 2,
                          transformOrigin: `${AVATAR / 2}px ${AVATAR / 2}px`,
                          transform: `rotate(${phi}deg) translateX(${RADIUS}px) rotate(${step * SLOT_DEG - phi}deg) scale(${isActive ? 1 : 0.72})`,
                          opacity: isActive ? 1 : visible ? 0.6 : 0,
                          transition,
                        }}
                      >
                        <span
                          aria-hidden
                          className={cn(
                            "grid size-14 shrink-0 place-items-center rounded-full font-display text-xl font-bold ring-4 ring-paper transition-colors duration-500",
                            isActive ? "bg-orange text-paper" : "bg-ink/[0.06] text-ink-3",
                          )}
                        >
                          {t.name.charAt(0)}
                        </span>
                        <span className="flex flex-col gap-1">
                          <span
                            className={cn(
                              "whitespace-nowrap font-display text-lg font-bold tracking-[-0.02em] transition-colors duration-500",
                              isActive ? "text-ink" : "text-ink-3",
                            )}
                          >
                            {t.name}
                          </span>
                          <Stars rating={t.rating} />
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* right — every quote stacked in one grid cell, so the panel is
                always as tall as the longest one and never jumps */}
            <div className="relative grid items-center border-t border-ink/10 px-6 py-10 sm:px-10 md:col-span-7 md:border-l md:border-t-0 md:py-14 lg:px-14">
              {TESTIMONIALS.map((t, i) => {
                const on = i === activeIndex;
                return (
                  <figure
                    key={t.name}
                    aria-hidden={!on}
                    className={cn(
                      "[grid-area:1/1] motion-safe:transition-[opacity,transform]",
                      on
                        ? "translate-y-0 opacity-100 duration-500 motion-safe:delay-200"
                        : "pointer-events-none translate-y-4 opacity-0 duration-300",
                    )}
                    style={{ transitionTimingFunction: EASE_CSS }}
                  >
                    <span
                      aria-hidden
                      className="block h-9 font-display text-[80px] font-black leading-[0.8] text-orange/25"
                    >
                      &ldquo;
                    </span>
                    <blockquote className="text-[clamp(1.05rem,1.8vw,1.25rem)] leading-[1.65] text-ink-2">
                      <p>{t.quote}</p>
                    </blockquote>
                    <figcaption className="mt-6 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.1em] text-ink-3">
                      <span className="h-px w-8 bg-orange" aria-hidden />
                      {t.name} · Google review
                    </figcaption>
                  </figure>
                );
              })}
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
