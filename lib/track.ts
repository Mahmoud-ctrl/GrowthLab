/**
 * Meta Pixel custom events. Safe to call anywhere: no-ops during SSR and until
 * the pixel script is live (`fbq` undefined). The name is passed verbatim to
 * `trackCustom`, so it shows up under that exact name in Events Manager.
 */
declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

export function trackEvent(name: string, params?: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  window.fbq?.("trackCustom", name, params);
}
