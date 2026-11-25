/**
 * Single source of truth for site-wide config and content.
 * Edit values here and they update across every page, the sitemap,
 * the structured data, and the llms.txt overview.
 */

export const site = {
  name: "Approachable Intelligence",
  shortName: "Approachable Intelligence",
  tagline: "Big Tech Energy. Small Business Soul.",
  // Production domain. Swap if the live domain changes.
  url: "https://approachableintelligence.ai",
  description:
    "Approachable Intelligence builds custom AI workflows, writes the guardrails, and trains the team for engineering firms, architects, and service businesses. Based in Colorado, led by founder Ty Coutts.",
  email: "info@approachableintelligence.ai",
  // Every "book a call" button on the site points here.
  bookingUrl: "https://calendly.com/tycoutts",
  // Name + email capture for the full Skills Library. Used only on /skills-library.
  formUrl: "https://api.leadconnectorhq.com/widget/form/3ukPBytwlePhvbJz1Jok",
  founder: { name: "Ty Coutts", firstName: "Ty", photo: "/founders/ty-lake-face.jpg" },
  serviceAreas: ["Denver", "Roaring Fork Valley", "Colorado"],
  sameAs: [] as string[], // add social profile URLs when ready
} as const;

export type NavLink = { href: string; label: string };

// Primary navigation. The first two are the client-type tabs.
export const nav: NavLink[] = [
  { href: "/industries/engineers-architects", label: "Engineers & Architects" },
  { href: "/industries/service-businesses", label: "Service Businesses" },
  { href: "/#how-we-work", label: "How We Work" },
  { href: "/skills-library", label: "Skills Library" },
  { href: "/about", label: "About" },
];

// Footer navigation, grouped.
export const footerNav: { heading: string; links: NavLink[] }[] = [
  {
    heading: "Who we help",
    links: [
      { href: "/industries/engineers-architects", label: "Engineers & Architects" },
      { href: "/industries/service-businesses", label: "Service Businesses" },
      {
        href: "/industries/engineers-architects#case-study",
        label: "MEP firm case study",
      },
    ],
  },
  {
    heading: "Explore",
    links: [
      { href: "/#what-we-do", label: "What We Do" },
      { href: "/#how-we-work", label: "How We Work" },
      { href: "/skills-library", label: "Skills Library" },
      { href: "/lead-leakage-calculator", label: "Lead Leakage Calculator" },
      { href: "/resources", label: "Resources" },
    ],
  },
  {
    heading: "Company",
    links: [
      { href: "/about", label: "About" },
      { href: "/contact", label: "Contact" },
    ],
  },
];

export const ctaLabel = "Book a Call";
