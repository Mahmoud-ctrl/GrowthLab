"use client";

import {
  useCallback,
  useLayoutEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from "react";
import { useReducedMotion } from "motion/react";
import { useRichMotion } from "./use-rich-motion";
import {
  Handshake,
  Users,
  Target,
  PenTool,
  Megaphone,
  LineChart,
  Presentation,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

export type DepthCarouselItem = {
  title: string;
  body: string;
};

/**
 * Icons live here rather than in `data.ts` — a lucide component isn't a plain
 * object, so it can't cross the server→client prop boundary. Keyed by title.
 */
const STEP_ICONS: Record<string, LucideIcon> = {
  "Real client": Handshake,
  "Your agency team": Users,
  Strategy: Target,
  Content: PenTool,
  Campaigns: Megaphone,
  Analytics: LineChart,
  "Final presentation": Presentation,
};

/**
 * A depth carousel: the active card sits centred and in focus while the rest
 * recede behind it with perspective, scale, blur and a dimming tint. Move with
 * the arrows, the dots, arrow keys, a horizontal drag, or by clicking a card
 * that isn't in front. Built on plain CSS transforms + transitions — no GSAP.
 */
export function DepthCarousel({
  items,
  className,
}: {
  items: DepthCarouselItem[];
  className?: string;
}) {
  const count = items.length;
  const reduce = useReducedMotion();
  // per-card blur() is costly on phones — skip it there, keep scale/brightness
  const rich = useRichMotion();

  const rootRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [metrics, setMetrics] = useState({ cardW: 280, cardH: 320, spread: 196, depth: 168 });

  // size the stage against its container so it holds up from mobile to wide
  useLayoutEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const measure = () => {
      const w = el.clientWidth;
      // On phones the card must carry the full body copy, so give it most of
      // the width and a taller ratio; the wider desktop stage can stay compact.
      const narrow = w < 480;
      const cardW = narrow
        ? Math.min(w * 0.88, 340)
        : Math.max(240, Math.min(w * 0.64, 340));
      setMetrics({
        cardW,
        cardH: Math.round(cardW * (narrow ? 1.34 : 1.04)),
        spread: Math.round(cardW * (narrow ? 0.84 : 0.7)),
        depth: Math.round(cardW * 0.55),
      });
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const go = useCallback(
    (dir: number) => setActive((a) => (a + dir + count) % count),
    [count],
  );

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      go(-1);
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      go(1);
    }
  };

  // pointer drag → step once past a threshold
  const drag = useRef<{ x: number; done: boolean } | null>(null);
  const onPointerDown = (e: ReactPointerEvent) => {
    drag.current = { x: e.clientX, done: false };
  };
  const onPointerMove = (e: ReactPointerEvent) => {
    const d = drag.current;
    if (!d || d.done) return;
    const dx = e.clientX - d.x;
    if (Math.abs(dx) > 48) {
      d.done = true;
      go(dx < 0 ? 1 : -1);
    }
  };
  const endDrag = () => {
    drag.current = null;
  };

  const { cardW, cardH, spread, depth } = metrics;
  const visible = 2;
  const transition = reduce
    ? "none"
    : "transform 620ms cubic-bezier(0.16,1,0.3,1), opacity 620ms ease, filter 620ms ease";

  return (
    <div className={cn("select-none overflow-x-clip", className)}>
      <div
        ref={rootRef}
        role="group"
        aria-roledescription="carousel"
        aria-label="How an engagement runs"
        tabIndex={0}
        onKeyDown={onKeyDown}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onPointerLeave={endDrag}
        className="relative mx-auto w-full touch-pan-y outline-none"
        style={{ height: cardH + 44, perspective: 1500 }}
      >
        <div
          className="absolute inset-0"
          style={{ transformStyle: "preserve-3d" }}
        >
          {items.map((item, i) => {
            let d = ((i - active) % count + count) % count;
            if (d > count / 2) d -= count;
            const az = Math.abs(d);
            const shown = az <= visible;
            const isActive = d === 0;

            const tx = d * spread;
            const tz = -az * depth;
            const ry = Math.max(-1, Math.min(1, d)) * -20;
            const scale = Math.max(0.74, 1 - az * 0.12);
            const opacity = shown ? Math.max(0.5, 1 - az * 0.2) : 0;
            const blurPx = rich ? Math.min(az * 1.8, 4.5) : 0;
            const brightness = Math.max(0.7, 1 - az * 0.1);
            const Icon = STEP_ICONS[item.title] ?? Sparkles;

            return (
              <button
                key={item.title}
                type="button"
                tabIndex={isActive ? 0 : -1}
                aria-hidden={!isActive}
                aria-label={`Step ${i + 1} of ${count}: ${item.title}`}
                onClick={() => !isActive && shown && setActive(i)}
                className={cn(
                  "absolute left-1/2 top-1/2 flex flex-col justify-between overflow-hidden rounded-2xl border p-6 text-left sm:p-7",
                  isActive
                    ? "cursor-default border-transparent bg-ink text-paper-on-ink shadow-[0_28px_64px_-24px_rgba(18,32,58,0.5)]"
                    : "cursor-pointer border-ink/20 bg-paper text-ink shadow-[0_14px_36px_-20px_rgba(18,32,58,0.3)] hover:border-ink",
                )}
                style={{
                  width: cardW,
                  height: cardH,
                  transform: `translate3d(-50%, -50%, 0) translateX(${tx}px) translateZ(${tz}px) rotateY(${ry}deg) scale(${scale})`,
                  opacity,
                  filter: blurPx
                    ? `brightness(${brightness}) blur(${blurPx}px)`
                    : `brightness(${brightness})`,
                  zIndex: 100 - az,
                  pointerEvents: shown && opacity > 0.1 ? "auto" : "none",
                  transition,
                }}
              >
                {/* oversized glyph bleeding off the corner */}
                <Icon
                  aria-hidden
                  strokeWidth={0.75}
                  className={cn(
                    "pointer-events-none absolute -bottom-10 -right-8 h-48 w-48",
                    isActive ? "text-paper-on-ink/[0.06]" : "text-ink/[0.05]",
                  )}
                />

                {/* one numbering treatment: prominent index, quiet total */}
                <div className="flex items-baseline gap-1 font-display font-black tabular-nums leading-none">
                  <span
                    className={cn(
                      "text-4xl",
                      isActive ? "text-orange-ink" : "text-orange",
                    )}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span
                    className={cn(
                      "text-base font-bold",
                      isActive ? "text-paper-on-ink-2" : "text-ink-3",
                    )}
                  >
                    /{String(count).padStart(2, "0")}
                  </span>
                </div>

                <div className="mt-auto pt-6">
                  <Icon
                    aria-hidden
                    strokeWidth={1.5}
                    className={cn(
                      "mb-4 h-10 w-10",
                      isActive ? "text-orange-ink" : "text-ink-3",
                    )}
                  />
                  <h3
                    className={cn(
                      "font-display text-xl font-extrabold uppercase leading-tight tracking-[0.01em]",
                      isActive ? "text-paper-on-ink" : "text-ink",
                    )}
                  >
                    {item.title}
                  </h3>
                  <p
                    className={cn(
                      "mt-2 text-[14px] leading-relaxed",
                      isActive ? "text-paper-on-ink-2" : "text-ink-2",
                    )}
                  >
                    {item.body}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* controls */}
      <div className="mt-8 flex items-center justify-center gap-4 sm:gap-5">
        <button
          type="button"
          onClick={() => go(-1)}
          aria-label="Previous step"
          className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-ink/25 text-ink transition-colors hover:bg-ink hover:text-paper"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
            <path d="M15 5l-7 7 7 7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        <div className="flex items-center gap-2 px-1" role="tablist" aria-label="Steps">
          {items.map((item, i) => (
            <button
              key={item.title}
              type="button"
              role="tab"
              aria-selected={active === i}
              aria-label={`Go to step ${i + 1}: ${item.title}`}
              onClick={() => setActive(i)}
              className={cn(
                // thin bar, but a ~40px tap target via the pseudo-element
                "relative h-1.5 rounded-full transition-all duration-300 after:absolute after:-inset-x-1.5 after:-inset-y-4 after:content-['']",
                active === i ? "w-7 bg-orange" : "w-1.5 bg-ink/25 hover:bg-ink/40",
              )}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={() => go(1)}
          aria-label="Next step"
          className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-ink/25 text-ink transition-colors hover:bg-ink hover:text-paper"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
            <path d="M9 5l7 7-7 7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </div>
  );
}
