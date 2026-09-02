import { ARC } from "./data";

/**
 * Infinite ticker. Pure CSS transform animation on a 3× row — no rAF loop, no
 * scroll listener, no per-frame JS. Compositor-only, so it costs the main
 * thread nothing. `prefers-reduced-motion` halts it via the global rule in
 * globals.css.
 */
export function ArcMarquee() {
  const row = [...ARC, ...ARC, ...ARC];

  return (
    <div className="overflow-hidden border-b border-ink border-t-2 border-t-orange bg-ink py-5 text-paper sm:mt-24">
      <div className="marquee-mask overflow-hidden">
        <ul className="gl-marquee flex w-max items-center gap-0">
          {row.map((word, i) => (
            <li key={i} className="flex shrink-0 items-baseline gap-2.5 px-7">
              <span className="font-mono text-xs font-medium text-orange-ink">
                {String((i % ARC.length) + 1).padStart(2, "0")}
              </span>
              <span className="font-display text-2xl font-extrabold uppercase tracking-[-0.02em] sm:text-[28px]">
                {word}
              </span>
              <svg
                viewBox="0 0 8 8"
                className="h-2 w-2 shrink-0 self-center text-orange-ink drop-shadow-[0_0_6px_rgba(224,131,36,0.55)]"
                aria-hidden
              >
                <path d="M4 0l1 3 3 1-3 1-1 3-1-3-3-1 3-1z" fill="currentColor" />
              </svg>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
