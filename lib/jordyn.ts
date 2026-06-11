/**
 * Jordyn Moody — personal profile content.
 *
 * Single source of truth for the /jordyn editorial profile. Every section of
 * the page maps over the data here, so a role, skill, project, or answer is
 * updated by editing this file, never the markup. The copy is frozen from the
 * approved design and should be changed with care.
 */

export type Lens = "people" | "ai" | "ops";

/** A filter tab on the experience timeline. "all" shows every chapter. */
export type ExperienceFilter = "all" | Lens;

export const lensMeta: Record<Lens, { label: string }> = {
  people: { label: "People & Care" },
  ai: { label: "AI & Marketing" },
  ops: { label: "Operations & Analysis" },
};

export const experienceFilters: { id: ExperienceFilter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "people", label: "People & Care" },
  { id: "ai", label: "AI & Marketing" },
  { id: "ops", label: "Operations & Analysis" },
];

export type Role = {
  year: string;
  lens: Lens;
  role: string;
  org: string;
  description: string;
};

export type FieldNote = { number: string; title: string; body: string };

export type IndexColumn = {
  heading: string;
  items: { name: string; page: string }[];
};

export type WorkPlate = {
  kicker: string;
  title: string;
  description: string;
  href: string;
  cta: string;
  external: boolean;
};

export type QA = { question: string; answer: string };

export const profile = {
  name: "Jordyn Moody",
  monogram: "JM",
  location: "Denver, Colorado",
  updated: "June 2026",
  email: "jordyn@approachableintelligence.ai",
  phoneDisplay: "480.415.2195",
  phoneHref: "+14804152195",
  linkedin: "https://www.linkedin.com/in/jordyn-moody-304340374/",

  // Masthead bar
  masthead: {
    section: "Profile",
    issue: "Issue Nº 01 · 2026",
  },

  // Feature opener
  featureTag: "A Profile · Therapist, AI & Marketing",
  byline: "Denver, Colorado · Updated June 2026",
  // Headline renders as two lines with the final word accented.
  headline: { lineOne: "The human", lineTwo: "in the", accent: "loop" },
  // The opening bio is a self-contained ~55 word answer block. Frozen copy.
  bio: "Jordyn Moody has spent a decade learning how people work, as a fraud investigator, an operations manager, and a mental health therapist. Today she runs a private therapy practice and co-founded an AI consultancy, helping small businesses bring new tools into their work without losing what makes them human.",
  plateCaption: "Plate I",
} as const;

export const nav: { href: string; label: string; cta?: boolean }[] = [
  { href: "#chapters", label: "The Work" },
  { href: "#notes", label: "What She Runs On" },
  { href: "#index", label: "Skills" },
  { href: "#work", label: "Selected Work" },
  { href: "#qa", label: "Q&A" },
  { href: "#contact", label: "Contact", cta: true },
];

export const roles: Role[] = [
  {
    year: "2026 —",
    lens: "ai",
    role: "Co-Founder",
    org: "Approachable Intelligence LLC · Colorado",
    description:
      "Co-founded an AI integration and web consultancy for small and mid-sized service businesses. She leads client discovery and turns business goals into practical AI workflows, content, and websites.",
  },
  {
    year: "2026 —",
    lens: "ai",
    role: "Marketing Coordinator",
    org: "ASLAN Home Lending",
    description:
      "Runs marketing content and campaigns for loan officers, using AI tools to produce more without flattening anyone's voice.",
  },
  {
    year: "2025 —",
    lens: "people",
    role: "Founder & Therapist",
    org: "Haven Therapy, PLLC · Colorado",
    description:
      "Founded and runs a private practice, counseling with Solutions-Focused and Person-Centered approaches and handling every side of the business from intake to compliance.",
  },
  {
    year: "2023 – 25",
    lens: "people",
    role: "Mental Health Therapist",
    org: "Empowered Play",
    description:
      "Delivered play-based therapy, built treatment plans, and completed supervised internship hours toward licensure before stepping into a therapist role.",
  },
  {
    year: "2022 – 24",
    lens: "ops",
    role: "Mortgage Processor",
    org: "ASLAN Home Lending",
    description:
      "Processed residential loans from application to closing, holding a pipeline of files together under deadline across borrowers, loan officers, and underwriters.",
  },
  {
    year: "2021 – 22",
    lens: "ops",
    role: "Executive Assistant",
    org: "VR365 Vacation Rentals · Roslyn, WA",
    description:
      "Kept leadership and daily operations running for a vacation rental company, from scheduling to communications.",
  },
  {
    year: "2020 – 21",
    lens: "people",
    role: "Boys Volleyball Coach",
    org: "Windward School · Los Angeles, CA",
    description:
      "Coached and developed a boys volleyball team, building skill, discipline, and a culture players wanted to show up for.",
  },
  {
    year: "2018 – 20",
    lens: "ops",
    role: "Community Manager",
    org: "The Casey, Windsor Communities · Denver, CO",
    description:
      "Ran the daily operations of an apartment community: leasing, resident relations, staff, budgets, and vendors.",
  },
  {
    year: "2017 – 18",
    lens: "ops",
    role: "Pharmaceutical Sales",
    org: "Field Sales",
    description:
      "Sold to healthcare providers and sharpened the consultative, relationship-first selling she still uses today.",
  },
  {
    year: "2015 – 17",
    lens: "ops",
    role: "Claims Specialist, Special Investigative Unit",
    org: "State Farm Insurance",
    description:
      "Investigated claims for fraud, reading evidence and patterns to support decisions. Where the eye for detail started.",
  },
];

export const pullQuote = {
  before: "AI won't take people's jobs any time soon. The people who learn to use it ",
  emphasis: "well",
  after:
    " will move faster than the ones who don't. My work is to make that leap feel approachable.",
  attribution: "Jordyn Moody · on why she does this",
} as const;

export const fieldNotes: FieldNote[] = [
  {
    number: "01",
    title: "People first, always",
    body: "Every role traces back to one skill: figuring out what a person actually needs and meeting them there.",
  },
  {
    number: "02",
    title: "Curiosity as a discipline",
    body: "Around a hundred books a year. Learning is a daily habit, which is how a therapist ends up fluent in AI.",
  },
  {
    number: "03",
    title: "Solutions over spirals",
    body: "Trained in Solutions-Focused therapy. She would rather find the next workable step than rehearse the problem.",
  },
  {
    number: "04",
    title: "Steady under pressure",
    body: "Fraud claims, mortgage deadlines, a brand-new practice. She has learned to stay calm and keep the work moving.",
  },
  {
    number: "05",
    title: "Build, then ship",
    body: "One therapy practice founded, one AI consultancy co-founded. She likes making real things people can use.",
  },
  {
    number: "06",
    title: "Honest about the fit",
    body: "Pharmaceutical sales lasted a year. She knows what suits her now, and brings that clarity to the people she works with.",
  },
];

export const skillsIndex: IndexColumn[] = [
  {
    heading: "People & Clinical",
    items: [
      { name: "Solutions-Focused Therapy", page: "i" },
      { name: "Person-Centered Therapy", page: "ii" },
      { name: "Clinical assessment", page: "iii" },
      { name: "Case management", page: "iv" },
      { name: "Coaching & conflict resolution", page: "v" },
    ],
  },
  {
    heading: "AI & Marketing",
    items: [
      { name: "AI tool integration", page: "vi" },
      { name: "Prompt engineering", page: "vii" },
      { name: "Workflow automation", page: "viii" },
      { name: "Content & brand strategy", page: "ix" },
      { name: "Web project coordination", page: "x" },
    ],
  },
  {
    heading: "Operations & Analysis",
    items: [
      { name: "Process management", page: "xi" },
      { name: "Investigation & fraud analysis", page: "xii" },
      { name: "Statistics", page: "xiii" },
      { name: "Executive support", page: "xiv" },
      { name: "Vendor & budget management", page: "xv" },
    ],
  },
];

export const selectedWork: WorkPlate[] = [
  {
    kicker: "Co-Founder · AI & Web",
    title: "Approachable Intelligence",
    description:
      "An AI and web consultancy for service businesses. Big tech energy, small business soul.",
    href: "https://approachableintelligence.ai",
    cta: "Visit ↗",
    external: true,
  },
  {
    kicker: "Founder · Therapy",
    title: "Haven Therapy, PLLC",
    description:
      "A private mental health practice built on solutions-focused, person-centered care.",
    href: "#",
    cta: "Add your link ↗",
    external: true,
  },
  {
    kicker: "Client Build",
    title: "Add a project",
    description:
      "Drop in a site you built for a client. Replace this plate's title, copy, and link.",
    href: "#",
    cta: "Add your link ↗",
    external: true,
  },
];

export const qa: QA[] = [
  {
    question: "What do you actually do?",
    answer:
      "I'm a mental health therapist and an AI integration specialist. I run a private practice, Haven Therapy, and co-founded Approachable Intelligence, where we help small and mid-sized service businesses adopt AI while keeping the human quality that makes them worth choosing.",
  },
  {
    question: "How does a therapist end up in AI?",
    answer:
      "The thread is people. Therapy taught me to find what someone really needs and build toward it. That's the same instinct behind good AI integration, except the client is a business and the tool is software. The career looks scattered until you notice it's all the same job.",
  },
  {
    question: "What kind of therapy do you practice?",
    answer:
      "Solutions-Focused and Person-Centered. Both start from where a person is and move forward from there, rather than getting stuck circling the problem.",
  },
  {
    question: "What's your take on AI and jobs?",
    answer:
      "AI won't replace people any time soon. The people who learn to use it well will simply move faster than the ones who don't. My job is to make that shift feel approachable instead of frightening.",
  },
];

export const video = {
  label: "[ Reel · Coming Soon ]",
  caption: "A short hello is on the way. Record one on Loom or YouTube, then drop the embed URL here.",
  // Set to a YouTube or Loom embed URL to swap the placeholder for the film.
  embedUrl: "" as string,
} as const;

export const colophon = {
  closeLine:
    "Building something, hiring, or just curious how AI could fit your work? I'd love to hear from you.",
  metaLeft: "Jordyn Moody · Denver, Colorado",
  metaRight: "Profile · Issue Nº 01 · Set in Caslon & Newsreader",
} as const;

/** Numbered section headers and their standfirst leads. */
export const sections = {
  chapters: {
    no: "01",
    title: "The work, in chapters",
    lead: "The jobs below don't line up in a tidy way, and that's sort of the point. The same few instincts keep surfacing no matter the title, whether she's reading a client in a therapy room, holding a mortgage pipeline together under deadline, or figuring out where AI fits a business. Filter for the part you're hiring for.",
  },
  notes: {
    no: "02",
    title: "What she runs on",
    lead: "Strip the job titles away and the same working habits keep showing up. Here are a few of them.",
  },
  index: {
    no: "03",
    title: "An index of skills",
    lead: "Grouped the way the index at the back of a book would be, across the three kinds of work she does.",
  },
  work: {
    no: "04",
    title: "Selected work",
    lead: "A few of the things she's built and runs, with room for more. Swap in your own links and add or pull plates as you like.",
  },
  qa: {
    no: "05",
    title: "In conversation",
    lead: "A short Q&A, for the people and the search engines alike.",
  },
  film: {
    no: "06",
    title: "On the record",
    lead: "A short hello, in her own voice. Record one on Loom or YouTube, then paste the embed link.",
  },
  contact: { no: "07", title: "Let's talk" },
} as const;

/**
 * Person structured data, ported from the approved profile. Helps Google and
 * AI engines understand who Jordyn is, where she works, and what she knows.
 */
export function personSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Jordyn Moody",
    jobTitle:
      "Mental Health Therapist, AI Integration Specialist, Marketing Coordinator",
    description:
      "Mental health therapist and AI integration specialist based in Denver, Colorado. Founder of Haven Therapy and co-founder of Approachable Intelligence.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Denver",
      addressRegion: "CO",
      addressCountry: "US",
    },
    email: profile.email,
    telephone: "+1-480-415-2195",
    worksFor: [
      { "@type": "Organization", name: "Approachable Intelligence LLC" },
      { "@type": "Organization", name: "Haven Therapy, PLLC" },
      { "@type": "Organization", name: "ASLAN Home Lending" },
    ],
    alumniOf: [
      { "@type": "CollegeOrUniversity", name: "Grand Canyon University" },
      { "@type": "CollegeOrUniversity", name: "Colorado Mesa University" },
    ],
    knowsAbout: [
      "AI integration",
      "Solutions-Focused Therapy",
      "Person-Centered Therapy",
      "Marketing",
      "Mental Health Counseling",
      "Operations",
      "Investigation",
    ],
    sameAs: [profile.linkedin],
  };
}

/** FAQ structured data, generated from the visible Q&A so the two stay in sync. */
export function jordynFaqSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: qa.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}
