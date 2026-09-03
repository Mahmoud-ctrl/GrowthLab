import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/site/primitives";
import { Logo } from "@/components/site/logo";
import { ConversionTracking } from "./conversion-tracking";

export const metadata: Metadata = {
  title: "Thank you",
  // keep it out of search — direct hits would inflate conversion counts
  robots: { index: false, follow: false },
  alternates: { canonical: "/thank-you" },
};

const PDF_HREF = "/growthlab-cohort-program.pdf";
const PDF_NAME = "GrowthLab Cohort Program.pdf";

export default function ThankYouPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-paper px-5 py-24 text-ink">
      <ConversionTracking />
      <Container>
        <div className="mx-auto max-w-xl text-center">
          <Logo className="mx-auto h-12 w-auto sm:h-14" />

          <h1 className="mt-10 font-display text-[clamp(1.9rem,5.5vw,2.9rem)] font-black uppercase leading-[1.05] tracking-[-0.03em]">
            Thank You for Your Interest in GrowthLab!
          </h1>

          <p className="mx-auto mt-6 max-w-md text-[15px] leading-relaxed text-ink-2">
            Thank you for filling out the form and taking the first step toward
            joining GrowthLab.
          </p>
          <p className="mx-auto mt-4 max-w-md text-[15px] leading-relaxed text-ink-2">
            You can download the full cohort program PDF now. Your free Digital
            Marketing Strategy Guide is on its way to your inbox &mdash; check
            your spam folder if you don&apos;t see it shortly.
          </p>

          <div className="mt-8">
            <a
              href={PDF_HREF}
              download={PDF_NAME}
              className="inline-flex items-center gap-2.5 rounded-full bg-ink px-6 py-3 text-[14px] font-semibold text-paper transition-colors hover:bg-[#1c2e52]"
            >
              Download the cohort program PDF
            </a>
          </div>

          <h2 className="mt-12 font-display text-[1.15rem] font-bold uppercase tracking-[-0.01em]">
            What happens next?
          </h2>
          <p className="mx-auto mt-3 max-w-md text-[15px] leading-relaxed text-ink-2">
            Someone from GrowthLab team will get in touch with you soon to answer
            any questions and help finalize your registration for the program.
          </p>
          <p className="mx-auto mt-4 max-w-md text-[15px] leading-relaxed text-ink-2">
            We look forward to having you with us!
          </p>

          <Link
            href="/"
            className="mt-10 inline-block text-[12px] font-semibold uppercase tracking-[0.16em] text-ink/60 transition-colors hover:text-ink"
          >
            Back to site
          </Link>
        </div>
      </Container>
    </main>
  );
}
