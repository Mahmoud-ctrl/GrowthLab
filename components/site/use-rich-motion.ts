"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";

/**
 * Gate for JS-driven, per-frame animations (scroll-linked reveals, blur
 * filters). Returns `false` on the server and on the first client render, then
 * `true` only after mount on a wide viewport with motion allowed.
 *
 * Components fall back to plain, static markup otherwise — which is also their
 * final layout, so the desktop upgrade causes no shift. This keeps phones off
 * the expensive path entirely (matches the user's "remove text animations on
 * mobile" ask) and speeds hydration for everyone.
 */
export function useRichMotion() {
  const reduced = useReducedMotion();
  const [rich, setRich] = useState(false);

  useEffect(() => {
    if (reduced) {
      setRich(false);
      return;
    }
    const mq = window.matchMedia("(min-width: 768px)");
    const update = () => setRich(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [reduced]);

  return rich;
}
