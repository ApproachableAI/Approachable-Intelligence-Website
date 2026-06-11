# Asset + content checklist

What is in, what is still needed, and exactly where each piece goes.

## Done

- [x] Brand palette (cream, ink, rust, mustard, olive) — `app/globals.css`
- [x] Fonts: Fraunces + Bricolage Grotesque — self-hosted via `next/font`
- [x] Brain mascot, all five poses — walking, pointing, leaning, standing, sitting (`public/mascot/`)
- [x] Logo lockup (brain mark + wordmark, built from text)
- [x] All copy written in brand voice
- [x] SEO: titles, meta, canonical, OG/Twitter, sitemap, robots, llms.txt, JSON-LD
- [x] One starter blog post

- [x] Founder photos — Ty and Jordyn avatars plus the full "meet the founders" shot
- [x] Favicon + apple touch icon from the brain mascot

## Still to provide

| Item | Where it goes | How to turn it on |
|------|---------------|-------------------|
| **Founder credentials** | `lib/content.ts` (`founders[].credentials`) | Edit the text (currently placeholder) |
| **Testimonials / client logos** | not yet placed | Send them and we'll add a trust strip near the CTAs |
| **Social profile URLs** | `lib/site.ts` (`sameAs`) | Add URLs to feed Organization schema |

## Notes

- The other brain poses currently fall back to the walking brain, so the site looks complete while we wait on the art.
- Founder bios in `lib/content.ts` are first-draft placeholders. Tighten them with real detail and credentials when you can, since those E-E-A-T signals help with AI citation.
- Production domain assumed to be `approachableintelligence.ai`. If it changes, update `site.url` in `lib/site.ts`.
