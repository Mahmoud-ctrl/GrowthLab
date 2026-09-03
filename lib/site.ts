import { PROGRAM } from "@/components/site/data";

/**
 * Canonical origin for the site. Override per environment with
 * NEXT_PUBLIC_SITE_URL (no trailing slash), e.g. https://growthlabme.com.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://growthlabme.com"
).replace(/\/$/, "");

export const abs = (path = "/") => new URL(path, SITE_URL).toString();

/** One-line elevator pitch reused across metadata + structured data. */
export const SITE_DESCRIPTION =
  "An 8-week online digital marketing agency experience. Learn strategy, content, paid ads and analytics by working on a real client project with a team, then present a full strategy. 32 hours of expert training. Upcoming Cohort 2026.";

export const SITE_NAME = PROGRAM.name;

/** TODO: confirm exact cohort dates with the client — the visible copy currently
 *  says "September – October 2026"; these ISO dates drive the Course rich result. */
export const COHORT_START = "2026-09-14";
export const COHORT_END = "2026-11-06";

export const SOCIAL_LINKS = [PROGRAM.instagramUrl, PROGRAM.tiktokUrl];
