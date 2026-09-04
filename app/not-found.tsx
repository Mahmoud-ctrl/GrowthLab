import type { Metadata } from "next";
import Link from "next/link";
import { Logo } from "@/components/site/logo";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-paper px-5 py-24 text-center text-ink">
      <Logo className="mx-auto h-12 w-auto sm:h-14" />
      <p className="kicker mt-10 text-orange">404</p>
      <h1 className="mt-4 font-display text-[clamp(2rem,6vw,3rem)] font-black uppercase leading-[1.02] tracking-[-0.03em] [word-spacing:0.1em]">
        Page not found
      </h1>
      <p className="mx-auto mt-5 max-w-sm text-[15px] leading-relaxed text-ink-2">
        That page doesn&apos;t exist. Head back to the main page for the full
        program details.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center gap-2.5 rounded-full bg-ink px-6 py-3 text-[14px] font-semibold text-paper transition-colors hover:bg-[#1c2e52]"
      >
        Back to site
      </Link>
    </main>
  );
}
