/**
 * Shared editorial content: the three-phase process, FAQs, pain points,
 * and the founder bio. Written in the Approachable Intelligence voice.
 * Edit copy here once and it shows up everywhere it is used.
 */

export type Phase = {
  id: string;
  number: string;
  name: string;
  kicker: string;
  answer: string; // a tight 40 to 60 word lead answer
  detail: string[];
  result: string;
};

export const phases: Phase[] = [
  {
    id: "deep-dive",
    number: "01",
    name: "The Deep Dive",
    kicker: "The 48-hour blueprint",
    answer:
      "We spend 1–2 hours digging through your current systems to see how your operation actually works. Our goal is to find out how your tech could communicate more clearly, spot the bottlenecks, and find the daily 20–30 minute tasks that can be automated — immediately freeing up your staff and your time.",
    detail: [
      "We look at the tools you already pay for and barely use.",
      "We trace a lead from first hello to paid invoice and mark every spot it can fall through.",
      "We name the busywork that quietly steals your evenings.",
    ],
    result:
      "a raw, honest map of what to delete, what to automate, and what to protect — yours whether you build with us or not.",
  },
  {
    id: "the-build",
    number: "02",
    name: "The Build",
    kicker: "Setup & buy-in",
    answer:
      "We install the automated architecture your business needs — and coach the humans who use it. The tech matters, but adoption is what makes it stick, so your team learns the new rhythm with us in the room.",
    detail: [
      "We set up the automations that handle the repetitive work.",
      "We train your people in plain language, at their pace.",
      "We tune everything to how you already talk to your customers.",
    ],
    result:
      "no more hot-gluing workflows together. The business just runs smoother.",
  },
  {
    id: "the-alliance",
    number: "03",
    name: "The Alliance",
    kicker: "Ongoing support",
    answer:
      "AI keeps changing, so we stay on call. We troubleshoot the glitches, refine the roadmap, and fold in what’s new and worth your time. You get a partner who already knows your setup.",
    detail: [
      "We keep an eye on what is new so you do not have to.",
      "We adjust the roadmap as your business grows.",
      "We pick up the phone when something needs a human.",
    ],
    result:
      "a business that runs on rhythm and flow, so you can actually go home.",
  },
];

export type Faq = { question: string; answer: string };

// Home page FAQ (broad, top-of-funnel questions).
export const homeFaqs: Faq[] = [
  {
    question: "How does an AI consultant help a small service business?",
    answer:
      "An AI consultant finds the repetitive work that slows your team down and hands it to software, so your people spend more time with customers. For a small service business that usually means faster lead follow-up, less double-entry, and fewer balls dropped, without hiring more staff.",
  },
  {
    question: "Will automating my business make my service feel cold?",
    answer:
      "No. Good automation removes the busywork so your team has more time for the human moments that win you referrals. We automate the parts customers never see, like data entry and reminders, and we protect the parts they feel, like a real person who knows their name.",
  },
  {
    question: "What does an AI integration project actually involve?",
    answer:
      "It starts with a two-hour Deep Dive to map where your business leaks time and money. Then we build the automations and coach your team to use them. After that we stay on as ongoing partners, refining the setup as AI and your business both change.",
  },
  {
    question: "Do I need to be technical to work with you?",
    answer:
      "Not at all. We talk in plain language and handle the technical side ourselves. Your job is to know your business and your customers. Our job is to translate that into systems your whole team can use without a manual.",
  },
];

// Services page FAQ (deeper, consideration-stage questions).
export const servicesFaqs: Faq[] = [
  {
    question: "How long does an AI integration project take?",
    answer:
      "The Deep Dive blueprint takes 48 hours from our two-hour session. The Build depends on what we find, though most service businesses see their first automations running within a few weeks. The Alliance is ongoing, for as long as it is useful to you.",
  },
  {
    question: "What kind of businesses do you work with?",
    answer:
      "Small and medium service businesses that have outgrown their systems. Think the team juggling spreadsheets, sticky notes, and four apps that do not talk to each other. If growth has made your day messier instead of easier, you are who we built this for.",
  },
  {
    question: "What if my data is a mess and spread everywhere?",
    answer:
      "That is the normal starting point, not a problem. Scattered data and double-entry are exactly what the Deep Dive is built to surface. We map where everything lives, then bring it together so your team stops re-typing the same information into five different places.",
  },
  {
    question: "Are you based in Colorado, and do you work remotely?",
    answer:
      "Yes and yes. We are based in Colorado, around Denver and the Roaring Fork Valley, and we love working with local businesses in person. We also work with service businesses remotely, so distance does not have to stop the conversation.",
  },
];

// Pain points we solve, used on Home and Services.
export const painPoints: { title: string; body: string }[] = [
  {
    title: "Operational bottlenecks",
    body: "Growth has created a manual mess — and somehow you became the connector between sales, operations, and your team.",
  },
  {
    title: "System fragmentation",
    body: "Your data lives in five spreadsheets and four apps that don’t talk. Double-entry is quietly eating your week.",
  },
  {
    title: "Underused technology",
    body: "You’ve bought software and AI tools before — they sit unused because they never fit your team’s actual day.",
  },
  {
    title: "The personal touch",
    body: "You want to modernize without going cold. Your systems should protect the human approach that got you here.",
  },
];

// Founder bio. Photo lives in /public/founders.
export type Founder = {
  name: string;
  role: string;
  photo: string; // path under /public
  credentials: string;
  bio: string[];
};

export const founder: Founder = {
  name: "Ty Coutts",
  role: "Founder",
  photo: "/founders/ty-lake-face.jpg",
  credentials: "AI integration, workflow design, and team training",
  bio: [
    "Ty builds the systems and teaches the people who use them. He spends his weeks inside client firms, sitting with the engineers, office managers, and owners who do the work, then turning what they do by hand into workflows they can trust.",
    "He likes hard problems and has no patience for busywork, which is the whole point. When you work with Approachable Intelligence, you work with Ty directly.",
  ],
};

/* ------------------------------------------------------------------ */
/* Home page copy. Edit here, not in the components.                    */
/* ------------------------------------------------------------------ */

export const home = {
  hero: {
    kicker: "Custom AI workflows, guardrails & training",
    headline: "Hours of busywork,",
    headlineEmphasis: "done in minutes.",
    body: "Approachable Intelligence builds AI workflows around the documents and processes your team already runs, writes the rules that keep them safe, and trains your people until the new way of working sticks.",
    secondaryCta: "See the case study",
  },
  // Scrolling strip under the hero: concrete things we have built.
  built: [
    "Submittal pre-review",
    "Load-calc extraction",
    "Ventilation schedules",
    "Proposal drafting",
    "Lead follow-up",
    "One client record",
    "AI use policy",
    "Firm-wide training",
    "Invoice & proposal drafts",
    "Meeting notes into tasks",
  ],
  services: {
    kicker: "What we do",
    headline: "Four things, done properly.",
    body: "Every engagement is some mix of these. You can start with one.",
    items: [
      {
        icon: "workflow",
        title: "Custom AI workflows",
        body: "We take a task your team repeats by hand, like reviewing a submittal or building a proposal, and turn it into a workflow that produces the same reviewable output every time.",
      },
      {
        icon: "sync",
        title: "Systems that talk",
        body: "One clean client record feeding your CRM, invoices, calendar, and follow-ups. Built on the tools you already pay for, so nothing gets ripped out.",
      },
      {
        icon: "shield",
        title: "Policy & guardrails",
        body: "A short, plain AI use policy your staff will read: which tools are approved, what data stays out, and who reviews the output before it leaves the building.",
      },
      {
        icon: "people",
        title: "Training that sticks",
        body: "Live sessions, one-on-ones, and office hours. We measure success by who is still using the tools ninety days after we leave the room.",
      },
    ],
  },
  caseStudy: {
    kicker: "Case study · A local MEP firm",
    headline: "An engineering firm that refused to buy more shelfware.",
    body: "The client is an MEP consulting firm in Colorado. They had watched AI tools get bought, demoed, and abandoned. So we started with policy and training, then built workflows their engineers can check line by line.",
    cta: "Read the case study",
    statLabel: "The design target for one submittal review",
    statNote: "The engineer still checks the critical items. The seal never moves.",
  },
  who: {
    kicker: "Who we help",
    headline: "Built around how your kind of business works.",
  },
  demo: {
    kicker: "What it feels like",
    headline: "All your systems should talk to each other.",
    body: "A common starting place is one central source of truth: a single client record that clean data flows into, and that powers every automation built after it.",
    cardLabel: "Client record sync · live",
    sourcesLabel: "Where data starts",
    outputsLabel: "Updated together",
    hubTitle: "One client record",
    sources: [
      "Websites & landing pages",
      "Accounting software",
      "Sales & operating systems",
      "Calendars & human resources",
    ],
    outputs: [
      "CRM updated",
      "Invoices & proposals drafted",
      "Department chatbots updated",
      "Recursive learning enabled",
    ],
    footnote: "Built on the tools you already pay for, with no rip-and-replace.",
  },
  roadmap: {
    kicker: "How we work",
    headline: "The Roadmap",
    body: "Every client starts the same way: a conversation, then three unhurried steps.",
    resultLabel: "The result:",
  },
  skillsTeaser: {
    kicker: "Free · take them with you",
    headline: "The Skills Library",
    body: "We teach our clients’ AI assistants how to work. Some of that is free: copy-paste skills that make Claude (or any LLM) useful on day one.",
    cta: "Open the Skills Library",
    note: "No email needed for the first three.",
  },
  founder: {
    kicker: "From the founder",
    headline: "The human part is the point.",
    photoAlt: "Ty Coutts, founder of Approachable Intelligence, kneeling beside his dog on a rocky lakeshore",
    letter: [
      "If you’re here, you probably built something that matters. A firm with a reputation, where the work carries your name and customers are treated like people.",
      "The pressure right now is to bolt AI onto everything. I have watched that go badly: tools bought, demoed once, and forgotten. The firms that get real value do it in a different order. They set the rules, teach their people, and only then build.",
      // "Approachable Intelligence" is rendered in bold by the component.
      "That is the work I do at Approachable Intelligence. I sit with your team, learn how the job is done, and build workflows your people can check and trust.",
      "You will work with me directly, from the first call to the last training session.",
    ],
    signoff: "Talk soon,",
    signature: "Ty Coutts",
    signatureRole: "Founder, Approachable Intelligence",
  },
  finalCta: {
    headline: "Pick the task you’d",
    headlineLine2: "love to never do again.",
    body: "Bring it to a 30-minute call. You’ll leave knowing whether AI can take it off your plate, and what it would take to get there.",
    cta: "Book a Call",
  },
} as const;
