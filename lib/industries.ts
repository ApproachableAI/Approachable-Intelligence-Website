/**
 * Client-type pages ("tabs"). Each entry becomes /industries/<slug>, a nav
 * tab, a tab in the home page "Who we help" switcher, and a sitemap entry.
 *
 * To add a client type: add an entry here, then add its link to `nav` and
 * `footerNav` in lib/site.ts.
 */
import type { Faq } from "./content";

export type IconName =
  | "workflow"
  | "sync"
  | "shield"
  | "people"
  | "search"
  | "table"
  | "ruler"
  | "doc"
  | "phone"
  | "calendar"
  | "chat"
  | "receipt";

export type Feature = { icon: IconName; title: string; body: string };

export type CaseStudy = {
  client: string;
  clientDescriptor: string;
  headline: string;
  situation: string[];
  /** The order the work happened in. */
  sequence: { step: string; title: string; body: string }[];
  /** What the client has now. */
  outcomes: { title: string; body: string; status?: string }[];
  stats: { value: string; label: string }[];
};

export type Industry = {
  slug: string;
  navLabel: string;
  /** Hero treatment: "blueprint" draws a drafting grid, "glow" is the soft default. */
  theme: "blueprint" | "glow";
  metaTitle: string;
  metaDescription: string;
  hero: {
    kicker: string;
    headline: string;
    headlineEmphasis: string;
    body: string;
    secondaryCta?: { label: string; href: string };
  };
  /** Short pitch + bullets shown in the home page tab switcher. */
  teaser: { summary: string; bullets: string[] };
  build: { kicker: string; headline: string; body: string; items: Feature[] };
  principles?: {
    kicker: string;
    headline: string;
    body: string;
    items: { title: string; body: string }[];
  };
  caseStudy?: CaseStudy;
  /** Extra links to tools elsewhere on the site. */
  resources?: { title: string; body: string; href: string; cta: string }[];
  faqs: Faq[];
  finalCta: { headline: string; body: string };
};

export const industries: Industry[] = [
  /* ---------------------------------------------------------------- */
  /* Engineers & Architects                                            */
  /* ---------------------------------------------------------------- */
  {
    slug: "engineers-architects",
    navLabel: "Engineers & Architects",
    theme: "blueprint",
    metaTitle: "AI Workflows for Engineers & Architects",
    metaDescription:
      "Custom AI workflows for engineering and architecture firms: submittal pre-review, load-calc extraction, code-driven schedules, proposals, AI policy, and training. See the Maxson Engineering case study.",
    hero: {
      kicker: "For engineering & architecture firms",
      headline: "AI that works like a sharp junior engineer.",
      headlineEmphasis: "You keep the stamp.",
      body: "We build workflows that read the reports, specs, and submittals your team reads by hand, pull out what matters, and flag what looks wrong. Every output is written to be checked by the person who signs it.",
      secondaryCta: { label: "Read the Maxson case study", href: "#case-study" },
    },
    teaser: {
      summary:
        "Workflows for the document-heavy middle of a project, built so the engineer of record can check every line.",
      bullets: [
        "Submittal pre-review against your specs and drawings",
        "Load-calc reports turned into equipment schedules",
        "Code-driven schedules with an independent back-check",
        "A firm AI policy and training your staff will use",
      ],
    },
    build: {
      kicker: "What we build for AEC firms",
      headline: "The document-heavy middle of a project.",
      body: "These are the jobs that eat a senior person’s week and follow the same pattern every time. Each one becomes a workflow with a named owner inside your firm.",
      items: [
        {
          icon: "search",
          title: "Submittal pre-review",
          body: "An 80-page product package checked item by item against the spec section and the drawings, with page-anchored findings drafted in your review letter format.",
        },
        {
          icon: "table",
          title: "Load-calc extraction",
          body: "A load calculation report turned into an equipment selection schedule, a room-by-room reference, and a closeout report with every anomaly flagged by severity.",
        },
        {
          icon: "ruler",
          title: "Code-driven schedules",
          body: "Ventilation schedules populated from the load-calc data, with each room classified and every number independently back-checked before an engineer sees it.",
        },
        {
          icon: "doc",
          title: "Proposals & fee letters",
          body: "First drafts in your firm’s exact format, built from the client’s notes and your past scopes, with a spot-check list for the person who sends it.",
        },
        {
          icon: "shield",
          title: "AI use policy",
          body: "Two pages your staff will read: the approved tools, the data that never goes in, and where professional responsibility sits.",
        },
        {
          icon: "people",
          title: "Firm-wide training",
          body: "Sessions that start with how the technology works, because engineers need to understand a tool before they will trust it.",
        },
      ],
    },
    principles: {
      kicker: "How we build for licensed professionals",
      headline: "Built for people who stake a license on being right.",
      body: "A tool that is confidently wrong is worse than no tool. These rules shape every workflow we hand to an engineering or architecture firm.",
      items: [
        {
          title: "Flag, don’t fabricate",
          body: "When the source can’t answer a question, the workflow asks the engineer. It never fills a gap with a plausible guess.",
        },
        {
          title: "The AI is never the last set of eyes",
          body: "We treat every output as the work of a capable junior with three to five years of experience. A senior person reviews it before it goes anywhere.",
        },
        {
          title: "Same input, same output",
          body: "A defined workflow behaves the same way on every run. That repeatability is what makes an output something you can review and sign.",
        },
        {
          title: "Every run starts clean",
          body: "No memory carries from one project to the next, so one building’s assumptions can’t leak into another’s.",
        },
        {
          title: "Your files stay in your environment",
          body: "Client documents are referenced where they live and never copied into ours.",
        },
        {
          title: "You own the platform",
          body: "The workflow logic lives in plain files your firm controls. If you change AI vendors, the workflows come with you.",
        },
      ],
    },
    caseStudy: {
      client: "Maxson Engineering",
      clientDescriptor: "MEP consulting engineers · Colorado",
      headline: "A firm that had been burned by shelfware, and the order that fixed it.",
      situation: [
        "Maxson Engineering designs mechanical, electrical, and plumbing systems. Like most firms their size, they had watched software get bought, demoed, and quietly abandoned. Leadership’s first question was whether anyone would still be using this in six months.",
        "So the engagement took a different shape. Instead of a report delivered and left behind, Approachable Intelligence works alongside the firm as an embedded partner, with a weekly check-in and a domain expert inside Maxson who owns each workflow.",
      ],
      sequence: [
        {
          step: "01",
          title: "Policy first",
          body: "A plain AI use policy built on three rules: the right tool, the right data, and the right review. Leadership introduced it to the firm in their own words.",
        },
        {
          step: "02",
          title: "Tools in everyone’s hands",
          body: "One firm-approved AI platform behind the company sign-in, replacing a patchwork of personal accounts.",
        },
        {
          step: "03",
          title: "Training for the whole firm",
          body: "A three-session program: what the technology is, how to work with it, and what was being built for them. A survey beforehand, one-on-one time, and office hours after.",
        },
        {
          step: "04",
          title: "Then the workflows",
          body: "Custom builds on the firm’s own project documents, each one narrow, production-quality, and owned by a senior engineer before the next one starts.",
        },
      ],
      outcomes: [
        {
          title: "Load-calc extraction",
          status: "In use",
          body: "One load calculation report in. An equipment selection schedule, a room-by-room breakdown, a severity-flagged closeout report, and a design-decisions log out.",
        },
        {
          title: "Ventilation schedules",
          status: "In use",
          body: "The firm’s ventilation workbook populated from the extraction, each room classified, and every figure back-checked before review.",
        },
        {
          title: "Submittal pre-review",
          status: "In build",
          body: "Product packages checked against the spec and drawings, with findings drafted in the firm’s own review letter format for the engineer to confirm.",
        },
        {
          title: "A written AI policy",
          status: "Adopted",
          body: "Three rules the whole firm follows, and a clear answer to who is responsible for what the tools produce.",
        },
      ],
      stats: [
        { value: "3", label: "firm-wide training sessions" },
        { value: "4", label: "deliverables from one load-calc report" },
        { value: "0", label: "client files copied out of the firm’s environment" },
      ],
    },
    faqs: [
      {
        question: "Can AI do engineering work?",
        answer:
          "It can do the extraction, cross-checking, and first-draft work that surrounds engineering judgment, and it does that quickly. The judgment stays with a licensed person. We design every workflow so the output shows its assumptions and flags its doubts, which makes it reviewable in a fraction of the time the manual version took.",
      },
      {
        question: "Who is responsible for what the AI produces?",
        answer:
          "The same person who is responsible today. An AI output is a draft until a qualified person verifies it, and the seal carries the same obligations whether or not a tool assisted. The policy we write with you states this in plain language.",
      },
      {
        question: "Where do our project files go?",
        answer:
          "They stay in your environment. Workflows read documents where they already live. We keep client source files out of our own systems, and we help you decide which project data should never enter an AI tool at all.",
      },
      {
        question: "We have contract or security requirements. Can we still do this?",
        answer:
          "Usually, yes, and those requirements shape the plan from the first week. Because the workflow logic is kept separate from any one AI vendor, the same workflow can run on whichever platform your contracts allow.",
      },
      {
        question: "Our staff are skeptical. Will they use it?",
        answer:
          "Skepticism from careful professionals is healthy, and we plan for it. Training starts with how the technology works and where it fails, shown live on real examples. We count success by who is still using the tools three months later.",
      },
    ],
    finalCta: {
      headline: "Which document eats your week?",
      body: "Bring one to a 30-minute call: a submittal, a report, a schedule you rebuild on every project. You’ll leave knowing whether a workflow can carry it.",
    },
  },

  /* ---------------------------------------------------------------- */
  /* Service Businesses                                                */
  /* ---------------------------------------------------------------- */
  {
    slug: "service-businesses",
    navLabel: "Service Businesses",
    theme: "glow",
    metaTitle: "AI & Automation for Service Businesses",
    metaDescription:
      "AI and automation for small and medium service businesses: faster lead follow-up, one clean client record, drafted invoices and proposals, and training for the team. Based in Colorado.",
    hero: {
      kicker: "For small & medium service businesses",
      headline: "Smarter systems,",
      headlineEmphasis: "earlier dinners.",
      body: "We put AI to work on the follow-ups, the double-entry, and the scheduling, so you can protect the personal touch that built your business and still make it home for dinner.",
      secondaryCta: {
        label: "Find your lead leakage",
        href: "/lead-leakage-calculator",
      },
    },
    teaser: {
      summary:
        "For owners who became the connector between sales, operations, and the team, and would like their evenings back.",
      bullets: [
        "Leads answered in minutes, every time",
        "One client record feeding every tool you use",
        "Invoices, proposals, and reminders drafted for you",
        "Training in plain language, at your team’s pace",
      ],
    },
    build: {
      kicker: "What we build for service businesses",
      headline: "The work your customers never see.",
      body: "We automate what happens behind the counter and leave the human moments to your people.",
      items: [
        {
          icon: "phone",
          title: "Lead follow-up",
          body: "Every inquiry gets a fast, friendly reply and lands in your pipeline with nothing retyped.",
        },
        {
          icon: "sync",
          title: "One client record",
          body: "Your website, CRM, accounting, and calendar share a single source of truth, which ends the double-entry.",
        },
        {
          icon: "calendar",
          title: "Scheduling & reminders",
          body: "Bookings, confirmations, and nudges go out on their own, written in the way you already talk to customers.",
        },
        {
          icon: "receipt",
          title: "Invoices & proposals",
          body: "Drafted from the job details and ready for you to review and send.",
        },
        {
          icon: "chat",
          title: "Assistants that know your business",
          body: "Internal chat assistants that answer staff questions from your own procedures and price lists.",
        },
        {
          icon: "people",
          title: "Team coaching",
          body: "New tools only help when people use them, so we train your team in the room until the new rhythm sticks.",
        },
      ],
    },
    resources: [
      {
        title: "Lead Leakage Calculator",
        body: "Put a dollar figure on the leads that slip away between the first hello and the paid invoice.",
        href: "/lead-leakage-calculator",
        cta: "Run the numbers",
      },
      {
        title: "The Skills Library",
        body: "Three free copy-paste skills that make Claude, or any AI assistant, useful on day one.",
        href: "/skills-library",
        cta: "Open the library",
      },
    ],
    faqs: [
      {
        question: "Will automating my business make my service feel cold?",
        answer:
          "It shouldn’t, when it’s done with care. We automate the parts customers never see, like data entry and reminders, and protect the parts they feel, like a real person who knows their name. Your team ends up with more time for those moments.",
      },
      {
        question: "Do I need to be technical to work with you?",
        answer:
          "You don’t. We talk in plain language and handle the technical side. Your job is to know your business and your customers.",
      },
      {
        question: "What if my data is a mess and spread everywhere?",
        answer:
          "That is the normal starting point. Scattered data and double-entry are what the Deep Dive is built to surface. We map where everything lives, then bring it together so your team stops retyping the same information into five places.",
      },
      {
        question: "How long does a project take?",
        answer:
          "The Deep Dive blueprint arrives 48 hours after a two-hour session. The Build depends on what we find, and most service businesses see their first automations running within a few weeks.",
      },
    ],
    finalCta: {
      headline: "Ready to stop drowning in busywork?",
      body: "Start with a 30-minute conversation and an honest look at where your week goes.",
    },
  },
];

export function getIndustry(slug: string): Industry | undefined {
  return industries.find((i) => i.slug === slug);
}
