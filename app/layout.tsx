import type { Metadata } from "next";
import { Inter, Archivo, JetBrains_Mono } from "next/font/google";
import "./globals.css";

// Reading face.
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

// Poster face — the single display voice. Only the weights the headings
// actually use (audited: no `font-display` element is lighter than 700).
const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  weight: ["700", "800", "900"],
  display: "swap",
});

// The ledger: labels, indices, stats, nav. 400 for bare mono, 500 for .kicker.
// Not preloaded — it only sets small labels, never anything near the LCP.
const jbMono = JetBrains_Mono({
  variable: "--font-jbmono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  title: "GrowthLab — You don't need another marketing course. You need experience.",
  description:
    "An 8-week digital marketing agency experience where you learn by working on a real client project. 32 hours of live expert training. Founding Cohort: September – October 2026.",
  openGraph: {
    title: "GrowthLab — Founding Cohort",
    description:
      "8 weeks. Real client project. 32 hours of live training. Learn digital marketing by doing agency work.",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${archivo.variable} ${jbMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-paper text-ink">
        {children}
      </body>
    </html>
  );
}
