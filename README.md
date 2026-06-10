# Approachable Intelligence website

Marketing site for Approachable Intelligence. _Big Tech Energy. Small Business Soul._

Built with **Next.js (App Router) + TypeScript** and **Tailwind CSS v4**, server-rendered for speed, SEO, and AI-search visibility. Deploys to **Vercel**.

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
  page.tsx            Home
  services/page.tsx   How it works (the three-phase process)
  about/page.tsx      About the founders
  resources/          Blog index + [slug] post template
  contact/page.tsx    Contact (embedded intake form)
  sitemap.ts          Auto-generated XML sitemap
  robots.ts           robots.txt (allows AI crawlers)
  opengraph-image.tsx Branded social card
  not-found.tsx       Friendly 404
  globals.css         Design system: colors, fonts, motion
lib/
  site.ts             Site-wide config: name, url, tagline, nav, form URL, contact, service areas
  content.ts          Editable copy: the three phases, FAQs, pain points, founder bios
  posts.ts            Blog registry
  schema.ts           JSON-LD builders (Organization, LocalBusiness, Service, FAQPage, BlogPosting, Breadcrumb)
  seo.ts              Per-page metadata helper (title, description, canonical, OG, Twitter)
components/           Reusable UI (header, footer, mascot, CTA, FAQ, etc.)
content/posts/        Blog post bodies (one .tsx per post)
public/
  mascot/             Brain mascot art
  brand/              Logo files
  founders/           Founder photos (drop ty.jpg / jordyn.jpg here)
  llms.txt            Plain-language overview for AI engines
```

## Editing content

Most copy lives in two files, no component editing needed:

- **`lib/site.ts`** — business name, domain, tagline, navigation, the intake form URL, email, and service areas.
- **`lib/content.ts`** — the three process phases, both FAQ lists, the pain points, and the founder bios.

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

Colors and fonts are defined once in `app/globals.css` (`@theme`). Edit a hex there and it changes everywhere.

| Role | Color | Hex |
|------|-------|-----|
| Base / background | Cream | `#FEFBEA` |
| Ink / text | Deep Navy | `#2A344D` |
| Primary accent (CTAs, links) | Rust | `#B7410E` |
| Highlight | Mustard | `#FFCE1B` |
| Playful pop | Olive | `#9CBB04` |

Fonts: **Fraunces** (display) and **Bricolage Grotesque** (body), self-hosted via `next/font`. Motion is CSS-only and respects `prefers-reduced-motion`, so content always ships in the HTML for crawlers.

## Deploying to Vercel

1. Push this repo to GitHub.
2. Import it in Vercel. The defaults work, no extra config.
3. Set your production domain to `approachableintelligence.ai` (update `site.url` in `lib/site.ts` if it ever changes, since canonicals and schema read from it).

## What still needs to be provided

See `ASSETS.md` for the running checklist of assets, swaps, and where each one goes.
