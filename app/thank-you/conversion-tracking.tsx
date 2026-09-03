"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  }
}

/**
 * Fires the lead conversion once, on mount. This component only renders on
 * /thank-you, so reaching it *is* the conversion — GA4 `generate_lead` and
 * Meta `Lead`. The base tags live in components/analytics.tsx.
 */
export function ConversionTracking() {
  useEffect(() => {
    window.gtag?.("event", "generate_lead", { currency: "USD", value: 0 });
    window.fbq?.("track", "Lead");
  }, []);

  return null;
}
