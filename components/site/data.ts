export const PROGRAM = {
  name: "GrowthLab",
  tagline: "Bridging Education & Industry",
  program: "Digital Marketing Agency Experience",
  cohort: "Upcoming Cohort",
  dates: "September – October 2026",
  format: "8 Weeks · Online",
  liveHours: 32,
  weeks: 8,
  trainings: 16,
  price: 300,
  schedule: "Mondays & Wednesdays · 6:00–8:00 PM",
  contactPhone: "03 412 557",
  /** International format, digits only — used for the wa.me link. TODO: confirm the doctor's number. */
  whatsappNumber: "9613412557",
  whatsappMessage: "Hi, I'd like to know more about the GrowthLab program.",
  email: "info@growthlabme.com",
  instagramUrl: "https://www.instagram.com/growthlabme",
  tiktokUrl: "https://www.tiktok.com/@growthlablebanon",
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
    body: "You’ll work with a real client, tackle their actual marketing challenges, and build solutions that can be put into practice; not just another case study.",
  },
  {
    title: "Strategy",
    body: "Understand the client, research their market and audience, and build a marketing strategy you’ll put into action.",
  },
  {
    title: "Content",
    body: "Turn your strategy into execution by creating the copy, creatives, and landing pages for your client’s campaign",
  },
  {
    title: "Campaigns",
    body: "Put your strategy into action by launching real campaigns on Google and Meta with real budgets and measurable targets",
  },
  {
    title: "Analytics",
    body: "Monitor campaign performance, analyze the results, and optimize your strategy based on what’s working and what needs to improve.",
  },
  {
    title: "Final presentation",
    body: "Present your results and strategic recommendations directly to the client, just like a real agency.",
  },
];

/** §4 — Learn it. Apply it. Deliver it. */
export const HOW_IT_WORKS = [
  {
    tag: "Learn",
    title: "Live expert-led training",
    body: "16 hands-on sessions led by industry practitioners, covering strategy, content, paid media, SEO, and analytics. Every session connects directly to your real client project. Mondays & Wednesdays, 6–8 PM.",
  },
  {
    tag: "Work",
    title: "Apply What You Learn Immediately",
    body: "Put every new skill into practice on your real client project, working with your team from research and strategy to execution and analysis.",
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
        title: "SEO, GEO & Search Visibility: The Essentials",
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
    body: "Proof that you didn’t just complete a course, you gained hands-on experience working on a real client project.",
    span: "lg",
  },
  {
    title: "A professional portfolio",
    body: "Build a portfolio that demonstrates what you can actually do, not just what you’ve studied.",
    span: "sm",
  },
  {
    title: "Real-world experience",
    body: "Experience how a real marketing team works, from client brief to strategy, execution, and results.",
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
    body: "Collaborate, meet deadlines, receive feedback, and present your work, just like you would in a real marketing team.",
    span: "lg",
    facets: ["Collaboration", "Deadlines", "Feedback", "Presentations"],
  },
];

/** §9 — FAQ. The "who it's for" copy now lives in the final entry. */
export const FAQ: { q: string; a: string }[] = [
  {
    q: "Do I need experience to apply?",
    a: "No. You’re trained from the ground up, then apply each skill on a real client project the same week.",
  },
  {
    q: "How do I apply?",
    a: "Fill in the form on this page with your name, email and phone. We’ll email you the full program breakdown and follow up with enrollment and payment details to secure your seat.",
  },
  {
    q: "Is it online or in person?",
    a: "Online Learning. Real-World Workshops. Join online sessions every Monday and Wednesday, 6:00–8:00 PM, with selected face-to-face workshops and collaborative team work on your real client project throughout the program.",
  },
  {
    q: "How much time will it take?",
    a: "4 hours of online training each week, complemented by team project work and face-to-face workshops, 32 hours of structured learning across 8 weeks.",
  },
  {
    q: "What if I miss a session?",
    a: "The occasional miss is fine. But your team counts on you each week, so consistent attendance is what makes it worth it.",
  },
  {
    q: "What do I actually walk away with?",
    a: "A full marketing strategy and campaign proposal for a real client, a portfolio piece, a certificate, and hands-on experience across strategy, content, social, ads and analytics.",
  },
  {
    q: "Who is it for?",
    a: "Anyone who studied marketing but can’t apply it yet, or wants real practice and confidence before the job market, and something more hands-on than a course.",
  },
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
  ["Format", "Online"],
  ["Online training", "32 hours"],
  ["Seats", "Limited"],
  ["Price", "$300"],
];
