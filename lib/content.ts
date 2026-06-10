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
      "We spend two focused hours digging through your digital junk drawer. We find where leads leak out, where manual duct tape holds things together, and where invisible labor eats your nights. You walk away with a raw, honest map of what to delete, what to automate, and what to protect.",
    detail: [
      "We look at the tools you already pay for and barely use.",
      "We trace a lead from first hello to paid invoice and mark every spot it can fall through.",
      "We name the busywork that quietly steals your evenings.",
    ],
    result:
      "A clear blueprint you own, whether you build it with us or not.",
  },
  {
    id: "the-build",
    number: "02",
    name: "The Build",
    kicker: "Setup and buy-in",
    answer:
      "We install the automated architecture and we coach the humans who use it. The tech matters, but adoption is what makes it stick. Your team learns the new rhythm with us in the room, so the systems get used instead of ignored. You stop hot-gluing workflows together.",
    detail: [
      "We set up the automations that handle the repetitive work.",
      "We train your people in plain language, at their pace.",
      "We tune everything to how you already talk to your customers.",
    ],
    result:
      "A business that runs smoother, with a team that actually trusts the tools.",
  },
  {
    id: "the-alliance",
    number: "03",
    name: "The Alliance",
    kicker: "Ongoing support",
    answer:
      "AI keeps changing, so we stay on call. We troubleshoot, we refine the roadmap, and we fold in what is new and worth your time. You get partners who know your setup, not a ticket queue. The business runs on rhythm and flow, and you get to go home.",
    detail: [
      "We keep an eye on what is new so you do not have to.",
      "We adjust the roadmap as your business grows.",
      "We pick up the phone when something needs a human.",
    ],
    result:
      "A calmer business that keeps improving, with help a message away.",
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
    body: "The work piles up at the same few steps, and it always seems to need you.",
  },
  {
    title: "Scattered data and double-entry",
    body: "The same customer info gets typed into the CRM, the invoice, and a spreadsheet.",
  },
  {
    title: "Underused software",
    body: "You pay for tools and AI features nobody on the team has time to figure out.",
  },
  {
    title: "The fear of cold service",
    body: "You worry that automating anything will make your business feel like everyone else's.",
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
