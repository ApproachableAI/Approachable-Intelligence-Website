# Asset + content checklist

What is in, what is still needed, and where each piece goes.

## Done

- [x] Brand palette, fonts, hero 3D brain, mascot poses, roadmap illustrations
- [x] Client-type pages: Engineers & Architects, Service Businesses (`lib/industries.ts`)
- [x] Maxson Engineering case study (`lib/industries.ts`, `caseStudy`)
- [x] Every booking button points to Calendly (`lib/site.ts`, `bookingUrl`)
- [x] Skills Library with three free skills (`lib/skills.ts`)
- [x] SEO: titles, meta, canonical, OG/Twitter, sitemap, robots, llms.txt, JSON-LD

## Still to provide

| Item | Where it goes | Notes |
|------|---------------|-------|
| **Maxson sign-off** | `lib/industries.ts` (`caseStudy`) | Confirm the firm is happy to be named, and check each status label ("In use", "In build", "Adopted") and the 2 hours to 20 minutes target before launch |
| **A client quote** | `lib/industries.ts` | A sentence or two from Maxson leadership would strengthen the case study |
| **Larger founder photo** | `public/founders/ty.jpg` | Current file is 360px square |
| **Founder bio detail** | `lib/content.ts` (`founder`) | Real credentials and background help with trust and AI citation |
| **Social profile URLs** | `lib/site.ts` (`sameAs`) | Feeds Organization schema |
| **More client types** | `lib/industries.ts` | Add an entry, then a nav link in `lib/site.ts` |
