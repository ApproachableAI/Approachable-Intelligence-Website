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
  page.tsx            Home (v2 redesign: hero with the 3D brain, statement band, live sync demo,
                      who we work with, the Roadmap, Skills Library teaser, founders letter, final CTA)
  skills-library/     The Skills Library: three free copy-paste AI skills
  (legacy)/           Older inner pages kept on a light "paper" wrapper until they get a redesign pass:
    services/         How it works (the three-phase process)
    about/            About the founders
    resources/        Blog index + [slug] post template
    contact/          Contact (embedded intake form)
    lead-leakage-calculator/
  sitemap.ts          Auto-generated XML sitemap
  robots.ts           robots.txt (allows AI crawlers)
  opengraph-image.tsx Branded social card
  not-found.tsx       Friendly 404
  globals.css         Design system: colors, fonts, motion
lib/
  site.ts             Site-wide config: name, url, tagline, nav, form URL, contact, service areas
  content.ts          Editable copy: home page sections, the three phases, FAQs, pain points, founder bios
  skills.ts           The three free skills (name, intro, and the verbatim skill text)
  posts.ts            Blog registry
  schema.ts           JSON-LD builders (Organization, LocalBusiness, Service, FAQPage, BlogPosting, Breadcrumb)
  seo.ts              Per-page metadata helper (title, description, canonical, OG, Twitter)
components/           Reusable UI (header, footer, sync demo, scroll reveal, copy button, etc.)
content/posts/        Blog post bodies (one .tsx per post)
public/
  brain-field.js      <brain-field> web component: the Three.js particle brain in the hero
  mascot/             Brain mascot art
  roadmap/            Roadmap illustrations
  brand/              Logo files
  founders/           Founder photos
  llms.txt            Plain-language overview for AI engines
```

## Editing content

Most copy lives in two files, no component editing needed:

- **`lib/site.ts`** — business name, domain, tagline, navigation, the intake form URL, email, and service areas.
- **`lib/content.ts`** — every home page section (`home`), the three process phases, both FAQ lists, the pain points, and the founder bios.
- **`lib/skills.ts`** — the three free skills on `/skills-library`. The `text` field is what visitors copy, so edit it deliberately.

Change a value there and it updates across the pages, the sitemap, and the structured data.

## Adding a blog post

1. Copy `content/posts/ai-without-cold-service.tsx` to a new file, e.g. `content/posts/my-post.tsx`.
2. Edit its `meta` (slug, title, description, dates, authors, tags) and the `Body`.
3. Register it in `lib/posts.ts`: import it and add it to the `posts` array (newest first).

That is it. The post gets its own page, metadata, `BlogPosting` schema, a sitemap entry, and a card on `/resources` automatically. Bump `dateUpdated` whenever you revise a post so the visible "Last updated" stays honest.

## Swapping in real assets

- **Mascot poses** — drop PNGs into `public/mascot/` (`brain-pointing.png`, `brain-leaning.png`, `brain-standing.png`, `brain-sitting.png`), then flip the matching flags to `true` in `components/brain.tsx`. Anything not yet supplied falls back to the walking brain, so nothing breaks.
- **Founder photos** — add `public/founders/ty.jpg` and `public/founders/jordyn.jpg`, then set the flags to `true` in `components/founder-avatar.tsx`. Until then, warm initial badges show in their place.
- **Logo** — the header/footer logo is built from the brain mark plus text so it stays crisp. Raster logo files live in `public/brand/`.
- **Favicon** — replace `app/favicon.ico` with a brain-based icon when ready.

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

`public/brain-field.js` registers the `<brain-field>` web component (a Three.js particle brain). It loads `three@0.160.0` from unpkg on demand, pauses when off-screen, and goes static under reduced motion. `components/brain-field.tsx` renders the tag and loads the script.

## Deploying

Netlify builds with `npm run build` using `@netlify/plugin-nextjs` (see `netlify.toml`). Production domain is `approachableintelligence.ai`; update `site.url` in `lib/site.ts` if it ever changes, since canonicals and schema read from it.

## What still needs to be provided

See `ASSETS.md` for the running checklist of assets, swaps, and where each one goes.
