export const PROGRAM = {
  name: "GrowthLab",
  tagline: "Bridging Education & Industry",
  program: "Digital Marketing Agency Experience",
  cohort: "Founding Cohort",
  dates: "September – October 2026",
  format: "8 Weeks · Hybrid",
  liveHours: 32,
  weeks: 8,
  trainings: 16,
  price: 300,
  schedule: "Mondays & Wednesdays · 6:00–8:00 PM",
  contactPhone: "03 412 557",
};

/** The eight-week arc, one verb per week. */
export const ARC = [
  "Discover",
  "Define",
  "Plan",
  "Create",
  "Build",
  "Acquire",
  "Measure",
  "Optimize",
];

/** §2 — the split: how you learned vs. how you'll work here. */
export const CONTRAST = {
  old: {
    label: "Traditional learning",
    items: [
      "Attend classes",
      "Take notes",
      "Study concepts",
      "Finish without experience",
    ],
  },
  new: {
    label: "GrowthLab",
    items: [
      "Research real businesses",
      "Work in a team",
      "Build real strategies",
      "Present to a client",
    ],
  },
};

/** §3 — what a real engagement runs through, start to finish. */
export const PIPELINE: { title: string; body: string }[] = [
  {
    title: "Real client",
    body: "A live business hands your team a brief and a real problem to solve — not a case study.",
  },
  {
    title: "Your agency team",
    body: "You're placed in a small pod with defined roles, the way an agency floor actually works.",
  },
  {
    title: "Strategy",
    body: "Research the market, define the audience, and set the plan you'll execute against.",
  },
  {
    title: "Content",
    body: "Produce the assets the campaign needs — copy, creative, and landing pages.",
  },
  {
    title: "Campaigns",
    body: "Launch across Google, Meta and TikTok with real budget and real targets.",
  },
  {
    title: "Analytics",
    body: "Read the numbers every week, cut what's failing, and double down on what works.",
  },
  {
    title: "Final presentation",
    body: "Present results and recommendations to the client, agency-style.",
  },
];

/** §4 — Learn it. Apply it. Deliver it. */
export const HOW_IT_WORKS = [
  {
    tag: "Learn",
    title: "Live expert-led training",
    body: "16 sessions with practitioners — strategy, content, paid media and analytics — Monday and Wednesday, 6–8 PM.",
  },
  {
    tag: "Work",
    title: "Apply it the same week",
    body: "Everything you learn goes straight onto a real client project with your team — research, planning, creating, analysing.",
  },
  {
    tag: "Present",
    title: "Deliver the strategy",
    body: "You finish with a complete digital marketing strategy and campaign proposal, presented to the client like an agency would.",
  },
];

export type Week = {
  n: number;
  phase: string;
  focus: string;
  trainings: { title: string; day: string; topics: string }[];
  deliverable: string;
};

export const CURRICULUM: Week[] = [
  {
    n: 1,
    phase: "Discover",
    focus: "Understand the business & customer",
    trainings: [
      {
        title: "Digital Marketing Strategy & Business Discovery",
        day: "Monday",
        topics:
          "Business objectives · Business model · Market · Customer · Goals · KPIs · Marketing audit",
      },
      {
        title: "Consumer Behavior, Target Audience & Personas",
        day: "Wednesday",
        topics:
          "Customer needs · Pain points · Motivations · Buying triggers · Objections · Personas · Customer journey",
      },
    ],
    deliverable: "Client & market discovery + customer persona",
  },
  {
    n: 2,
    phase: "Define",
    focus: "Analyze the market & build positioning",
    trainings: [
      {
        title: "Market & Competitor Analysis",
        day: "Monday",
        topics:
          "Direct/indirect competitors · Positioning · Offers · Content · Social · Websites · Ads · Market gaps",
      },
      {
        title: "Brand Positioning, USP & Messaging",
        day: "Wednesday",
        topics:
          "Value proposition · USP · Competitive advantage · Brand personality · Messaging pillars · Tone of voice",
      },
    ],
    deliverable: "Competitor analysis + positioning & messaging",
  },
  {
    n: 3,
    phase: "Plan",
    focus: "Build the customer journey & content strategy",
    trainings: [
      {
        title: "Customer Journey, Funnels & Conversion Strategy",
        day: "Monday",
        topics:
          "Awareness → Consideration → Conversion → Retention · Funnel structure · Lead gen · Landing pages · CTAs · CRO basics",
      },
      {
        title: "Content Strategy & Content Calendar",
        day: "Wednesday",
        topics:
          "Content objectives · Content pillars · Formats · Editorial planning · Monthly calendar · Content KPIs",
      },
    ],
    deliverable: "Customer funnel + content strategy & calendar",
  },
  {
    n: 4,
    phase: "Create",
    focus: "Social media & content creation",
    trainings: [
      {
        title: "Social Media Management & Community Building",
        day: "Monday",
        topics:
          "Platform strategy · Profiles · Posting · Engagement · Community management · DMs · Reviews · Crisis basics",
      },
      {
        title: "Content Creation & Visual Communication",
        day: "Wednesday",
        topics:
          "Canva · CapCut · Reels · Carousels · Basic photo/video · Visual consistency · Creative briefs",
      },
    ],
    deliverable: "Social media plan + sample content package",
  },
  {
    n: 5,
    phase: "Build",
    focus: "Website, landing pages & search visibility",
    trainings: [
      {
        title: "Website, UX/UI & Landing Pages",
        day: "Monday",
        topics:
          "Website objectives · User journey · Sitemap · UX/UI basics · Landing pages · CTAs · Forms · Conversion principles",
      },
      {
        title: "SEO, GEO & Search Visibility — The Essentials",
        day: "Wednesday",
        topics:
          "Keyword research · Search intent · On-page SEO · Search Console · SEO tools · GEO/AEO · AI search visibility",
      },
    ],
    deliverable: "Website/landing-page structure + basic search strategy",
  },
  {
    n: 6,
    phase: "Acquire",
    focus: "Meta Ads & Google Ads",
    trainings: [
      {
        title: "Meta Ads: From Strategy to Campaign",
        day: "Monday",
        topics:
          "Campaign objectives · Audiences · Creative · Ad structure · Budget · Retargeting · KPIs · Optimization",
      },
      {
        title: "Google Ads & Paid Search Essentials",
        day: "Wednesday",
        topics:
          "Search intent · Keywords · Campaign structure · Ad copy · Landing pages · Budget · Conversion basics",
      },
    ],
    deliverable: "Paid media strategy + campaign proposal",
  },
  {
    n: 7,
    phase: "Measure",
    focus: "Analytics, reporting & conversion",
    trainings: [
      {
        title: "Analytics, KPIs & Marketing Reporting",
        day: "Monday",
        topics:
          "GA4 · Meta insights · Traffic · Engagement · Leads · Conv. rate · CPL · CAC · ROAS · ROI · Dashboards",
      },
      {
        title: "Email, CRM, Lead Nurturing & Retention",
        day: "Wednesday",
        topics:
          "Lead capture · Email sequences · Follow-up · CRM basics · Retention · Reviews · Referrals · CLV",
      },
    ],
    deliverable: "KPI dashboard + reporting & optimization recommendations",
  },
  {
    n: 8,
    phase: "Optimize",
    focus: "Integrate everything & present your strategy",
    trainings: [
      {
        title: "Campaign Integration, Optimization & Client Strategy Review",
        day: "Monday",
        topics:
          "Connect strategy → content → social → website → funnel → paid → analytics · Optimize · Reallocate · Recommend",
      },
      {
        title: "Final Agency Presentation",
        day: "Wednesday",
        topics:
          "Team presentations · Client strategy · Campaign proposal · Performance KPIs · Coach feedback · Final evaluation",
      },
    ],
    deliverable: "Complete Digital Marketing Strategy & Campaign Proposal",
  },
];

export type Benefit = {
  title: string;
  body: string;
  span: "lg" | "sm";
  /** concrete facets pulled from the body — rendered as tags */
  facets?: string[];
};

/** §8 — what you walk away with. */
export const BENEFITS: Benefit[] = [
  {
    title: "Certificate",
    body: "Proof of your GrowthLab experience — a real engagement, not a course you sat through.",
    span: "lg",
  },
  {
    title: "A professional portfolio",
    body: "Work you can confidently put in front of a hiring manager.",
    span: "sm",
  },
  {
    title: "Real-world experience",
    body: "You see how a marketing team actually works, from the inside.",
    span: "sm",
  },
  {
    title: "A complete project",
    body: "A full digital marketing strategy and campaign proposal for a real client.",
    span: "sm",
  },
  {
    title: "Practical skills",
    body: "Hands-on across strategy, content, social, ads, analytics and more.",
    span: "sm",
    facets: ["Strategy", "Content", "Social", "Ads", "Analytics"],
  },
  {
    title: "Agency workflow experience",
    body: "Collaboration, deadlines, feedback and presentations — the operating rhythm, not just the tactics.",
    span: "lg",
    facets: ["Collaboration", "Deadlines", "Feedback", "Presentations"],
  },
];

/** §9 — who this is for. */
export const FOR_YOU = [
  "You studied marketing but don’t know how to apply it",
  "You’re a student who wants practical experience",
  "You want to build confidence before entering the job market",
  "You want to understand how all areas of marketing connect",
  "You’re tired of learning theory without doing the work",
  "You want something more hands-on than a traditional course",
];

/** §10 — for eight weeks, you're the agency. */
export const THE_EXPERIENCE = [
  "You’ll research.",
  "You’ll brainstorm.",
  "You’ll disagree.",
  "You’ll create.",
  "You’ll meet deadlines.",
  "You’ll get feedback.",
  "You’ll fix mistakes.",
  "You’ll present ideas.",
];

/** §11 — quick program info. */
export const PROGRAM_INFO: [string, string][] = [
  ["Duration", "8 weeks"],
  ["Dates", "September – October 2026"],
  ["Schedule", "Mondays & Wednesdays · 6–8 PM"],
  ["Format", "Hybrid"],
  ["Live training", "32 hours"],
  ["Seats", "Limited"],
  ["Price", "$300"],
];
