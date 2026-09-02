"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { FileText, X } from "lucide-react";

/**
 * Floating reminder of the lead-magnet. Appears once you're past the hero,
 * bows out when you reach the form (or dismiss it). No continuous animation —
 * one entrance, one nudge.
 */
export function BonusBadge() {
  const reduce = useReducedMotion();
  const [past, setPast] = useState(false);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const onScroll = () => setPast(window.scrollY > window.innerHeight * 0.9);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const apply = document.getElementById("apply");
    const io = apply
      ? new IntersectionObserver(([e]) => e.isIntersecting && setGone(true), {
          rootMargin: "-25% 0px",
        })
      : undefined;
    io && apply && io.observe(apply);

    return () => {
      window.removeEventListener("scroll", onScroll);
      io?.disconnect();
    };
  }, []);

  const go = () =>
    document.getElementById("apply")?.scrollIntoView({ behavior: "smooth" });

  return (
    <AnimatePresence>
      {past && !gone && (
        <motion.div
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 24 }}
          animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
          exit={reduce ? { opacity: 0 } : { opacity: 0, y: 24 }}
          transition={{ type: "spring", stiffness: 320, damping: 30 }}
          className="fixed bottom-4 right-4 z-[90] sm:bottom-6 sm:right-6"
        >
          <div className="flex items-center gap-2 rounded-full border border-white/10 bg-ink py-2 pl-2 pr-2.5 text-paper shadow-[0_14px_44px_-10px_rgba(18,32,58,0.5)]">
            <button
              type="button"
              onClick={go}
              className="ring-editorial flex items-center gap-2.5 rounded-full text-left"
            >
              <motion.span
                animate={
                  reduce ? undefined : { scale: [1, 1.12, 1, 1.12, 1] }
                }
                transition={{ delay: 1, duration: 1.1, times: [0, 0.25, 0.5, 0.75, 1] }}
                className="grid size-9 shrink-0 place-items-center rounded-full bg-orange text-ink"
              >
                <FileText className="size-[17px]" strokeWidth={2} aria-hidden />
              </motion.span>
              <span className="leading-tight">
                <span className="block font-mono text-[9.5px] uppercase tracking-[0.18em] text-orange-ink">
                  Free bonus PDF
                </span>
                <span className="block max-w-[52vw] truncate text-[12.5px] font-semibold tracking-tight sm:max-w-none">
                  Anatomy of a Real Campaign
                </span>
              </span>
            </button>
            <button
              type="button"
              onClick={() => setGone(true)}
              aria-label="Hide"
              className="grid size-6 shrink-0 place-items-center rounded-full text-paper/40 transition-colors hover:bg-white/10 hover:text-paper"
            >
              <X className="size-3.5" aria-hidden />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
