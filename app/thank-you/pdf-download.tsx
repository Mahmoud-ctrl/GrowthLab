"use client";

import { useEffect, useRef } from "react";

const PDF_HREF = "/growthlab-founding-cohort-program.pdf";
const PDF_NAME = "GrowthLab Founding Cohort Program.pdf";

/**
 * Starts the program-PDF download automatically once per session on mount, and
 * doubles as the manual fallback link if the browser blocks the auto-click.
 */
export function PdfDownload() {
  const linkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    try {
      if (sessionStorage.getItem("gl_pdf_downloaded") === "1") return;
      sessionStorage.setItem("gl_pdf_downloaded", "1");
    } catch {
      // sessionStorage blocked — fall through and still try the download
    }
    linkRef.current?.click();
  }, []);

  return (
    <a
      ref={linkRef}
      href={PDF_HREF}
      download={PDF_NAME}
      className="inline-flex items-center gap-2.5 rounded-full bg-ink px-6 py-3 text-[14px] font-semibold text-paper transition-colors hover:bg-[#1c2e52]"
    >
      Download the program PDF
    </a>
  );
}
