# Asset + content checklist

What is in, what is still needed, and exactly where each piece goes.

## Done

- [x] Brand palette (cream, ink, rust, mustard, olive) — `app/globals.css`
- [x] Fonts: Fraunces + Bricolage Grotesque — self-hosted via `next/font`
- [x] Walking brain mascot — `public/mascot/brain-walking.png`
- [x] Logo lockup (brain mark + wordmark, built from text)
- [x] All copy written in brand voice
- [x] SEO: titles, meta, canonical, OG/Twitter, sitemap, robots, llms.txt, JSON-LD
- [x] One starter blog post

## Still to provide

| Item | Where it goes | How to turn it on |
|------|---------------|-------------------|
| **Founder photo: Ty** | `public/founders/ty.jpg` | Set `Ty: true` in `components/founder-avatar.tsx` |
| **Founder photo: Jordyn** | `public/founders/jordyn.jpg` | Set `Jordyn: true` in `components/founder-avatar.tsx` |
| **Mascot: pointing** | `public/mascot/brain-pointing.png` | Set `pointing: true` in `components/brain.tsx` |
| **Mascot: leaning** | `public/mascot/brain-leaning.png` | Set `leaning: true` in `components/brain.tsx` |
| **Mascot: standing/waving** | `public/mascot/brain-standing.png` | Set `standing: true` in `components/brain.tsx` |
| **Mascot: sitting (armchair, glasses)** | `public/mascot/brain-sitting.png` | Set `sitting: true` in `components/brain.tsx` |
| **Favicon** | `app/favicon.ico` | Replace the file |
| **Founder credentials** | `lib/content.ts` (`founders[].credentials`) | Edit the text (currently placeholder) |
| **Testimonials / client logos** | not yet placed | Send them and we'll add a trust strip near the CTAs |
| **Social profile URLs** | `lib/site.ts` (`sameAs`) | Add URLs to feed Organization schema |

## Notes

- The other brain poses currently fall back to the walking brain, so the site looks complete while we wait on the art.
- Founder bios in `lib/content.ts` are first-draft placeholders. Tighten them with real detail and credentials when you can, since those E-E-A-T signals help with AI citation.
- Production domain assumed to be `approachableintelligence.ai`. If it changes, update `site.url` in `lib/site.ts`.
