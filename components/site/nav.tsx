"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Logo } from "./logo";

const LINKS = [
  { href: "#problem", label: "The Problem" },
  { href: "#what", label: "What It Is" },
  { href: "#curriculum", label: "Curriculum" },
  { href: "#pricing", label: "Pricing" },
];

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

function ArrowGlyph({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      className={cn("h-3.5 w-3.5 stroke-[2]", className)}
      aria-hidden="true"
    >
      <path
        d="M4.5 11.5L11.5 4.5M11.5 4.5H5.5M11.5 4.5V10.5"
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function SiteNav() {
  // starts blended into the hero; condenses into a floating glass bar on scroll
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // close the mobile menu on Escape and when the viewport grows to desktop
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const onMq = () => mq.matches && setOpen(false);
    mq.addEventListener("change", onMq);
    return () => mq.removeEventListener("change", onMq);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const solid = scrolled || open;

  const go = (id: string) => {
    setOpen(false);
    scrollTo(id);
  };

  return (
    <div className="fixed inset-x-0 top-0 z-[100] px-4 sm:px-6">
      <AnimatePresence>
        {open && (
          <motion.div
            aria-hidden
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-[-1] bg-[#12203A]/35 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          />
        )}
      </AnimatePresence>

      <div
        className={cn(
          // backdrop-blur stays constant — transitioning backdrop-filter makes
          // Chrome skip repainting this fixed layer while scrolling
          "mx-auto flex items-center justify-between gap-2 rounded-full px-3 backdrop-blur-sm md:backdrop-blur-md",
          "transition-[max-width,height,margin,background-color,border-color,box-shadow] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
          // geometry condenses on scroll
          scrolled
            ? "mt-4 h-16 max-w-5xl"
            : "mt-0 h-20 max-w-[1320px] sm:h-24",
          // surface turns solid on scroll or while the mobile menu is open —
          // kept opaque enough to read without leaning on the backdrop blur
          solid
            ? "border border-white/60 bg-white/85 shadow-[0_8px_32px_0_rgba(18,32,58,0.08)]"
            : "border border-transparent bg-transparent shadow-none",
        )}
      >
        {/* Brand Logo */}
        <button
          onClick={() => go("top")}
          aria-label="GrowthLab, back to top"
          className="flex shrink-0 items-center rounded-full px-2 py-1.5 transition-transform hover:scale-95 sm:px-3"
        >
          <Logo className="h-9 w-auto sm:h-12" />
        </button>

        {/* Navigation Links — desktop */}
        <nav className="hidden items-center gap-1 md:flex">
          {LINKS.map((l) => (
            <button
              key={l.href}
              onClick={() => go(l.href.slice(1))}
              className="rounded-full px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#12203A]/70 transition-all hover:bg-[#12203A]/[0.05] hover:text-[#12203A]"
            >
              {l.label}
            </button>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-1.5">
          {/* CTA Pill Button */}
          <button
            onClick={() => go("apply")}
            className="group relative flex h-11 items-center gap-2 rounded-full bg-[#12203A] pl-4 pr-1.5 text-xs font-semibold uppercase tracking-wider text-white shadow-sm transition-all duration-300 hover:bg-orange-500 hover:text-white sm:pl-5"
          >
            <span>Apply Now</span>
            <span className="grid h-8 w-8 place-items-center rounded-full bg-white/20 text-white transition-all duration-300 group-hover:bg-white group-hover:text-orange-500">
              <ArrowGlyph />
            </span>
          </button>

          {/* Menu toggle — mobile only */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-nav"
            className="grid size-11 shrink-0 place-items-center rounded-full text-[#12203A] transition hover:bg-[#12203A]/[0.06] md:hidden"
          >
            {open ? (
              <X className="size-5" strokeWidth={2.25} aria-hidden />
            ) : (
              <Menu className="size-5" strokeWidth={2.25} aria-hidden />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu panel */}
      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-nav"
            className="mx-auto mt-2 max-w-md overflow-hidden rounded-3xl border border-white/60 bg-white/95 p-2 shadow-[0_16px_48px_-12px_rgba(18,32,58,0.28)] backdrop-blur-md md:hidden"
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: -10 }}
            animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -10 }}
            transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
          >
            {LINKS.map((l) => (
              <button
                key={l.href}
                onClick={() => go(l.href.slice(1))}
                className="flex w-full items-center justify-between rounded-2xl px-4 py-3.5 text-left font-mono text-[13px] font-medium uppercase tracking-[0.14em] text-[#12203A]/80 transition hover:bg-[#12203A]/[0.05] active:bg-[#12203A]/[0.08]"
              >
                {l.label}
                <span aria-hidden className="text-[#12203A]/25">
                  →
                </span>
              </button>
            ))}

            <div className="mx-2 my-1.5 h-px bg-[#12203A]/10" />

            <button
              onClick={() => go("apply")}
              className="flex w-full items-center justify-between rounded-2xl bg-[#12203A] px-4 py-3.5 text-left text-[13px] font-semibold uppercase tracking-[0.14em] text-white transition hover:bg-[#1c2e52]"
            >
              Apply Now
              <span
                aria-hidden
                className="grid size-7 place-items-center rounded-full bg-orange text-[#12203A]"
              >
                <ArrowGlyph />
              </span>
            </button>
          </motion.nav>
        )}
      </AnimatePresence>
    </div>
  );
}
