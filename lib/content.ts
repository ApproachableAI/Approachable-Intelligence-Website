/**
 * Shared editorial content: the three-phase process, FAQs, pain points,
 * and founder bios. Written in the Approachable Intelligence voice.
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
      "We spend 1-2 hours digging through your current systems to see how your current operation works. Our goal is to find out how your tech could communicate more clearly, any potential bottlenecks, and find the daily 20-30 minute tasks that can be automated and start immediately freeing up your staff and your time",
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
      "AI keeps changing, so we stay on call. We troubleshoot the glitches, refine the roadmap, and fold in what's new and worth your time — partners who know your setup, not a ticket queue.",
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
    body: "Your data lives in five spreadsheets and four apps that don't talk. Double-entry is quietly eating your week.",
  },
  {
    title: "Underused technology",
    body: "You've bought software and AI tools before — they sit unused because they never fit your team's actual day.",
  },
  {
    title: "The personal touch",
    body: "You want to modernize without going cold. Your systems should protect the human approach that got you here.",
  },
];

// Founder bios. Photos live in /public/founders (see asset checklist in README).
export type Founder = {
  name: string;
  role: string;
  photo: string; // path under /public
  credentials: string;
  bio: string[];
};

export const founders: Founder[] = [
  {
    name: "Ty",
    role: "Co-founder",
    photo: "/founders/ty.jpg",
    credentials: "AI integration and web development",
    bio: [
      "Ty builds the systems. He has spent years turning messy, manual workflows into software that quietly does the work in the background.",
      "He is the one who can look at a tangle of apps and see the three changes that would clear your plate. He likes the hard problems and hates busywork, which is the whole point.",
    ],
  },
  {
    name: "Jordyn",
    role: "Co-founder",
    photo: "/founders/jordyn.jpg",
    credentials: "Coaching and human-centered adoption",
    bio: [
      "Jordyn makes sure the humans come along for the ride. New tools only help if people actually use them, and that is her craft.",
      "She translates the tech into plain language, coaches your team through the change, and keeps the warmth in the work. The special sauce stays yours.",
    ],
  },
];
