import { FAQ, PROGRAM } from "@/components/site/data";
import {
  abs,
  COHORT_END,
  COHORT_START,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_URL,
} from "@/lib/site";

/**
 * JSON-LD for the landing page: Organization + WebSite + Course (with a
 * CourseInstance) + FAQPage, linked by @id in a single @graph.
 */
export function StructuredData() {
  const organization = {
    "@type": ["Organization", "EducationalOrganization"],
    "@id": `${SITE_URL}/#organization`,
    name: SITE_NAME,
    url: `${SITE_URL}/`,
    logo: {
      "@type": "ImageObject",
      url: abs("/assets/growthlab-logo.webp"),
    },
    description: PROGRAM.tagline,
    email: PROGRAM.email,
    telephone: PROGRAM.contactPhone,
    sameAs: [PROGRAM.instagramUrl, PROGRAM.tiktokUrl],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      telephone: PROGRAM.contactPhone,
      email: PROGRAM.email,
      availableLanguage: ["en"],
    },
  };

  const website = {
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: `${SITE_URL}/`,
    name: SITE_NAME,
    description: SITE_DESCRIPTION,
    inLanguage: "en",
    publisher: { "@id": `${SITE_URL}/#organization` },
  };

  const offer = {
    "@type": "Offer",
    category: "Paid",
    price: PROGRAM.price,
    priceCurrency: "USD",
    availability: "https://schema.org/LimitedAvailability",
    url: `${SITE_URL}/#apply`,
  };

  const course = {
    "@type": "Course",
    "@id": `${SITE_URL}/#course`,
    name: `${SITE_NAME}: Digital Marketing Agency Experience`,
    description: SITE_DESCRIPTION,
    url: `${SITE_URL}/`,
    inLanguage: "en",
    provider: { "@id": `${SITE_URL}/#organization` },
    educationalCredentialAwarded: "Certificate of Completion",
    timeRequired: "PT32H",
    teaches: [
      "Digital marketing strategy",
      "Brand positioning and messaging",
      "Content strategy and creation",
      "Social media marketing",
      "Meta Ads",
      "Google Ads",
      "SEO",
      "Marketing analytics and reporting",
    ],
    offers: offer,
    hasCourseInstance: {
      "@type": "CourseInstance",
      name: `${PROGRAM.cohort} 2026`,
      courseMode: "online",
      courseWorkload: "PT4H",
      startDate: COHORT_START,
      endDate: COHORT_END,
      courseSchedule: {
        "@type": "Schedule",
        repeatFrequency: "P1W",
        byDay: [
          "https://schema.org/Monday",
          "https://schema.org/Wednesday",
        ],
        startTime: "18:00",
        endTime: "20:00",
      },
      location: {
        "@type": "VirtualLocation",
        url: `${SITE_URL}/`,
      },
      organizer: { "@id": `${SITE_URL}/#organization` },
      offers: offer,
    },
  };

  const faqPage = {
    "@type": "FAQPage",
    "@id": `${SITE_URL}/#faq`,
    mainEntity: FAQ.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  const graph = {
    "@context": "https://schema.org",
    "@graph": [organization, website, course, faqPage],
  };

  return (
    <script
      type="application/ld+json"
      // static, first-party data; escape "<" so it can't break out of the tag
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(graph).replace(/</g, "\\u003c"),
      }}
    />
  );
}
