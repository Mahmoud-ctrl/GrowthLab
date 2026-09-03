import type { Metadata } from "next";
import Link from "next/link";
import { SiWhatsapp } from "react-icons/si";
import { Container } from "@/components/site/primitives";
import { Logo } from "@/components/site/logo";
import { PROGRAM } from "@/components/site/data";
import { ConversionTracking } from "./conversion-tracking";
import { PdfDownload } from "./pdf-download";

export const metadata: Metadata = {
  title: "Thank you",
  // keep it out of search — direct hits would inflate conversion counts
  robots: { index: false, follow: false },
  alternates: { canonical: "/thank-you" },
};

const whatsappHref = `https://wa.me/${PROGRAM.whatsappNumber}?text=${encodeURIComponent(
  PROGRAM.whatsappMessage,
)}`;

export default function ThankYouPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-paper px-5 py-24 text-ink">
      <ConversionTracking />
      <Container>
        <div className="mx-auto max-w-xl text-center">
          <Logo className="mx-auto h-12 w-auto sm:h-14" />

          <p className="kicker mt-10 text-orange">You&apos;re in</p>
          <h1 className="mt-4 font-display text-[clamp(2rem,6vw,3rem)] font-black uppercase leading-[1.02] tracking-[-0.03em]">
            Your program PDF is downloading
          </h1>
          <p className="mx-auto mt-5 max-w-md text-[15px] leading-relaxed text-ink-2">
            The download should start automatically. We&apos;ve also emailed you a
            copy of the full GrowthLab program details, so check your inbox (and
            spam folder) if you don&apos;t see the file.
          </p>

          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
            <PdfDownload />
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 rounded-full border border-ink/20 px-6 py-3 text-[14px] font-semibold text-ink transition-colors hover:border-ink hover:bg-ink hover:text-paper"
            >
              <SiWhatsapp className="size-[16px]" aria-hidden />
              Message us on WhatsApp
            </a>
          </div>

          <Link
            href="/"
            className="mt-8 inline-block text-[12px] font-semibold uppercase tracking-[0.16em] text-ink/60 transition-colors hover:text-ink"
          >
            Back to site
          </Link>
        </div>
      </Container>
    </main>
  );
}
