"use client";

import { useEffect } from "react";
import { trackEvent } from "@/lib/track";

/**
 * Fires a Meta Pixel custom event once — the first time the element with
 * `targetId` scrolls into view. Renders nothing.
 */
export function ViewTracker({
  event,
  targetId,
}: {
  event: string;
  targetId: string;
}) {
  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    const el = document.getElementById(targetId);
    if (!el) return;

    let fired = false;
    const io = new IntersectionObserver((entries) => {
      if (fired || !entries.some((e) => e.isIntersecting)) return;
      fired = true;
      trackEvent(event);
      io.disconnect();
    });
    io.observe(el);
    return () => io.disconnect();
  }, [event, targetId]);

  return null;
}
