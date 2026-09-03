import type { Metadata, Viewport } from "next";
import { Inter, Archivo, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@/components/analytics";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/site";
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

const TITLE_DEFAULT =
  "GrowthLab: You don't need another marketing course. You need experience.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE_DEFAULT,
    template: "%s · GrowthLab",
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  category: "education",
  keywords: [
    "digital marketing bootcamp",
    "digital marketing course Lebanon",
    "marketing agency experience",
    "online marketing training",
    "learn Meta Ads",
    "learn Google Ads",
    "SEO training",
    "marketing internship alternative",
    "GrowthLab",
    "digital marketing cohort 2026",
  ],
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    url: "/",
    locale: "en_US",
    title: TITLE_DEFAULT,
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: "GrowthLab: Digital Marketing Agency Experience",
    description: SITE_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  colorScheme: "light",
  themeColor: "#f2eee2",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${archivo.variable} ${jbMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-paper text-ink">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
