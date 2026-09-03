"use client";

import { useEffect } from "react";
import { trackEvent } from "@/lib/track";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  }
}

/**
 * Fires the lead conversion once, on mount. This component only renders on
 * /thank-you, so reaching it *is* the conversion:
 *  - GA4 `generate_lead`
 *  - Meta `Lead` (standard event — optimize ads toward this one)
 *  - Meta `ApplicationCompleted` (custom event — the funnel endpoint that
 *    matches ApplyNowClick / ApplicationStarted)
 * The base tags live in components/analytics.tsx.
 */
export function ConversionTracking() {
  useEffect(() => {
    window.gtag?.("event", "generate_lead", { currency: "USD", value: 0 });
    window.fbq?.("track", "Lead");
    trackEvent("ApplicationCompleted");
  }, []);

  return null;
}
