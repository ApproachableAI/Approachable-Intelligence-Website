/**
 * JSON-LD structured data builders. These help Google and AI engines
 * understand who we are, where we work, what we offer, and what we publish.
 */
import { site } from "./site";
import { phases, type Faq } from "./content";

const logo = `${site.url}/mascot/brain-walking.png`;

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${site.url}/#organization`,
    name: site.name,
    url: site.url,
    logo,
    email: site.email,
    description: site.description,
    slogan: site.tagline,
    founder: site.founders.map((name) => ({ "@type": "Person", name })),
    areaServed: site.serviceAreas.map((name) => ({
      "@type": "AdministrativeArea",
      name,
    })),
    ...(site.sameAs.length ? { sameAs: site.sameAs } : {}),
  };
}

export function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${site.url}/#localbusiness`,
    name: site.name,
    url: site.url,
    image: logo,
    email: site.email,
    description: site.description,
    address: {
      "@type": "PostalAddress",
      addressRegion: "CO",
      addressCountry: "US",
    },
    areaServed: site.serviceAreas.map((name) => ({
      "@type": "Place",
      name: `${name}, Colorado`,
    })),
    knowsAbout: [
      "AI integration for small business",
      "AI automation",
      "Business process automation",
      "AI adoption coaching",
    ],
  };
}

export function serviceSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "AI integration and automation for service businesses",
    provider: { "@id": `${site.url}/#organization` },
    areaServed: site.serviceAreas.map((name) => ({
      "@type": "AdministrativeArea",
      name,
    })),
    description:
      "A three-phase AI integration service for small and medium service businesses: a Deep Dive blueprint, a hands-on Build with team coaching, and an ongoing Alliance for support as AI evolves.",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "How it works",
      itemListElement: phases.map((p) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: `${p.name} (${p.kicker})`,
          description: p.answer,
        },
      })),
    },
  };
}

export function faqSchema(faqs: Faq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${site.url}${item.path}`,
    })),
  };
}

export function blogPostingSchema(post: {
  title: string;
  description: string;
  slug: string;
  datePublished: string;
  dateModified: string;
  authors: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    url: `${site.url}/resources/${post.slug}`,
    mainEntityOfPage: `${site.url}/resources/${post.slug}`,
    datePublished: post.datePublished,
    dateModified: post.dateModified,
    author: post.authors.map((name) => ({ "@type": "Person", name })),
    publisher: { "@id": `${site.url}/#organization` },
    image: logo,
  };
}
