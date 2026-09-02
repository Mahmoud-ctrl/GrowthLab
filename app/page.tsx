import { SiteNav } from "@/components/site/nav";
import { Hero } from "@/components/site/hero";
import { ArcMarquee } from "@/components/site/marquee";
import { Problem } from "@/components/site/problem";
import { WhatIs } from "@/components/site/what-is";
import { HowItWorks } from "@/components/site/how-it-works";
import { Curriculum } from "@/components/site/curriculum";
import { Benefits } from "@/components/site/benefits";
import { Faq } from "@/components/site/faq";
import { Experience } from "@/components/site/experience";
import { Pricing } from "@/components/site/pricing";
import { LeadForm } from "@/components/site/lead-form";
import { SiteFooter } from "@/components/site/footer";
import { BonusBadge } from "@/components/site/bonus-badge";

export default function Home() {
  return (
    <>
      <SiteNav />
      <main className="flex flex-1 flex-col">
        <Hero />
        <ArcMarquee />
        <Problem />
        <WhatIs />
        <HowItWorks />
        <Curriculum />
        <Benefits />
        <Faq />
        <Experience />
        <Pricing />
        <LeadForm />
      </main>
      <SiteFooter />
      <BonusBadge />
    </>
  );
}
