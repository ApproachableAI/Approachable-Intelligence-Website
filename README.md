# Approachable Intelligence website

Marketing site for Approachable Intelligence. _Big Tech Energy. Small Business Soul._

Built with **Next.js (App Router) + TypeScript** and **Tailwind CSS v4**, server-rendered for speed, SEO, and AI-search visibility. Deploys to **Netlify** (see `netlify.toml`).

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

Other scripts:

```bash
npm run build   # production build
npm start       # serve the production build
npm run lint    # eslint
```

## How the project is laid out

```
app/
  layout.tsx          Root layout: fonts, global metadata, header, footer, Organization + LocalBusiness schema
  page.tsx            Home: hero with the 3D brain, "things we have built" strip, what we do,
                      Maxson case study band, who-we-help tabs, live sync demo, the Roadmap,
                      Skills Library teaser, founder note, final CTA
  industries/[slug]/  Client-type pages (Engineers & Architects, Service Businesses), driven by lib/industries.ts
  about/              About Ty
  contact/            Book a call (Calendly) + email
  skills-library/     The Skills Library: three free copy-paste AI skills
  (legacy)/           Older pages kept on a light "paper" wrapper:
    services/         How it works (the three-phase process)
    resources/        Blog index + [slug] post template
    lead-leakage-calculator/
  sitemap.ts, robots.ts, opengraph-image.tsx, not-found.tsx, globals.css
lib/
  site.ts             Site-wide config: name, url, nav, footer links, booking URL, email, service areas
  content.ts          Editable copy: home page sections, the three phases, FAQs, founder bio
  industries.ts       Client-type pages, including the Maxson Engineering case study
  skills.ts           The three free skills
  posts.ts, schema.ts, seo.ts
components/           Reusable UI (header, footer, demos, scroll reveal, etc.)
content/posts/        Blog post bodies (one .tsx per post)
public/
  brain-field.js      <brain-field> web component: the Three.js particle brain in the hero
  vendor/             Self-hosted three.js build used by the brain
  mascot/, roadmap/, brand/, founders/, llms.txt
```

## Editing content

Most copy lives in data files, no component editing needed:

- **`lib/site.ts`** — business name, domain, navigation, footer links, email, and `bookingUrl`. Every "Book a Call" button on the site reads `bookingUrl` (currently Calendly), so changing it there changes it everywhere.
- **`lib/content.ts`** — every home page section (`home`), the three process phases, FAQ lists, and the founder bio.
- **`lib/industries.ts`** — the client-type pages. Each entry holds its hero, the "what we build" cards, principles, FAQs, and an optional `caseStudy`. The Maxson Engineering case study lives in the `engineers-architects` entry.
- **`lib/skills.ts`** — the three free skills on `/skills-library`.

### Adding a client type

1. Add an entry to `industries` in `lib/industries.ts` (copy the `service-businesses` entry as a starting point).
2. Add its link to `nav` and `footerNav` in `lib/site.ts`.

The page, the home page tab, the sitemap entry, and the structured data are generated from that entry.

## Adding a blog post

1. Copy `content/posts/ai-without-cold-service.tsx` to a new file, e.g. `content/posts/my-post.tsx`.
2. Edit its `meta` (slug, title, description, dates, authors, tags) and the `Body`.
3. Register it in `lib/posts.ts`: import it and add it to the `posts` array (newest first).

That is it. The post gets its own page, metadata, `BlogPosting` schema, a sitemap entry, and a card on `/resources` automatically. Bump `dateUpdated` whenever you revise a post so the visible "Last updated" stays honest.

## Swapping in real assets

- **Founder photo** — `public/founders/ty.jpg`. The current file is 360px square; a larger one (800px or more) will look sharper on the About page.
- **Logo** — the header logo is built from the brain mark plus text so it stays crisp. Raster logo files live in `public/brand/`.

## Design system

Colors and fonts are defined once in `app/globals.css` (`@theme`). Edit a hex there and it changes everywhere. The palette is the v2 "dark sage" system from the September 2026 design handoff.

| Role | Token | Hex |
|------|-------|-----|
| Page ground | `ink` | `#2B3B2C` |
| Cards | `ink-2` | `#354835` |
| Type + hairlines | `cream` | `#F2F2E6` |
| Structural green | `sage` / `sage-bright` | `#506A4F` / `#9EC49A` |
| Primary buttons, kickers | `gold-bright` / `gold-pale` | `#E0AE3F` / `#F0D89A` |
| Warm accent, squiggle | `terra` / `terra-bright` | `#8E4125` / `#D8724A` |

Fonts: **Newsreader** (headings, weight 400, italic for emphasis) and **Figtree** (body), self-hosted via `next/font`. Motion respects `prefers-reduced-motion`. Scroll reveals use a tiny IntersectionObserver component (`components/reveal.tsx`); content still ships in the HTML for crawlers and stays visible without JavaScript.

### The hero brain

`public/brain-field.js` registers the `<brain-field>` web component (a Three.js particle brain). It loads a self-hosted copy of `three@0.160.0` (`public/vendor/`) on demand, pauses when off-screen, and goes static under reduced motion. `components/brain-field.tsx` renders the tag and loads the script.

## Deploying

Netlify builds with `npm run build` using `@netlify/plugin-nextjs` (see `netlify.toml`). Production domain is `approachableintelligence.ai`; update `site.url` in `lib/site.ts` if it ever changes, since canonicals and schema read from it.

## What still needs to be provided

See `ASSETS.md` for the running checklist of assets, swaps, and where each one goes.
