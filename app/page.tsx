import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { site, ctaLabel } from "@/lib/site";
import { phases, painPoints } from "@/lib/content";
import { Brain } from "@/components/brain";
import { JsonLd } from "@/components/json-ld";
import { serviceSchema } from "@/lib/schema";

export const metadata: Metadata = buildMetadata({
  title: "AI Consulting & Automation for Service Businesses",
  description:
    "Approachable Intelligence helps small and medium service businesses put AI to work on the busy work while protecting the personal touch that made them successful. Big Tech Energy, Small Business Soul.",
  path: "/",
});

/* The hand-drawn gold squiggle that underlines a word or two. */
function Squiggle({
  draw = false,
  color = "var(--color-gold)",
  viewBox = "0 0 120 10",
  d = "M2 6 Q 12 0 22 6 T 42 6 T 62 6 T 82 6 T 102 6 T 118 5",
}: {
  draw?: boolean;
  color?: string;
  viewBox?: string;
  d?: string;
}) {
  return (
    <svg
      viewBox={viewBox}
      preserveAspectRatio="none"
      className="absolute -bottom-2 left-0 h-3 w-full overflow-visible"
      aria-hidden="true"
    >
      <path
        d={d}
        fill="none"
        stroke={color}
        strokeWidth="3.5"
        strokeLinecap="round"
        className={draw ? "ai-squiggle" : undefined}
      />
    </svg>
  );
}

/* The dotted curved arrows joining the roadmap steps. */
function RoadmapArrow({ mirrored = false }: { mirrored?: boolean }) {
  return (
    <div className="flex justify-center" aria-hidden="true">
      <svg viewBox="0 0 70 84" className="h-[66px] w-[54px]">
        {mirrored ? (
          <>
            <path
              d="M20 6 C 56 22, 10 44, 42 66"
              fill="none"
              stroke="var(--color-sage-400)"
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray="1 9"
            />
            <path
              d="M42 66 l-12 -4 M42 66 l-1 -13"
              fill="none"
              stroke="var(--color-sage-400)"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </>
        ) : (
          <>
            <path
              d="M50 6 C 14 22, 60 44, 28 66"
              fill="none"
              stroke="var(--color-sage-400)"
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray="1 9"
            />
            <path
              d="M28 66 l12 -4 M28 66 l1 -13"
              fill="none"
              stroke="var(--color-sage-400)"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </>
        )}
      </svg>
    </div>
  );
}

/* Lucide icon paths for the "who we work with" cards, stroke 2.75. */
const WHO_ICONS = [
  // Funnel — operational bottlenecks
  <path key="funnel" d="M22 3H2l8 9.5V19l4 2v-8.5L22 3z" />,
  // Copy — system fragmentation
  <g key="copy">
    <rect x="9" y="9" width="12" height="12" rx="2.5" />
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
  </g>,
  // Zap — underused technology
  <path key="zap" d="M13 2 3 14h9l-1 8 10-12h-9l1-8z" />,
  // Heart — the personal touch
  <path
    key="heart"
    d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 1 0-7.8 7.8l8.8 8.8 8.8-8.8a5.5 5.5 0 0 0 0-7.8z"
  />,
];

const WHO_STYLES = [
  { card: "bg-sage-100", chip: "bg-sage-200", stroke: "var(--color-sage-800)" },
  { card: "bg-gold-100", chip: "bg-gold-200", stroke: "var(--color-gold-700)" },
  {
    card: "bg-neutral-100",
    chip: "bg-neutral-200",
    stroke: "var(--color-sage-700)",
  },
  { card: "bg-rust-100", chip: "bg-rust-200", stroke: "var(--color-rust-700)" },
];

const ROADMAP = [
  {
    image: "/roadmap/roadmap-01-dive.png",
    alt: "Brain mascot diving into a coffee cup",
    circle: "bg-gold-100",
    imageWidth: "w-[76%]",
    number: "text-gold",
    kicker: "text-gold-700",
  },
  {
    image: "/roadmap/roadmap-02-build.png",
    alt: "Brain mascot working at a computer",
    circle: "bg-sage-100",
    imageWidth: "w-[76%]",
    number: "text-sage",
    kicker: "text-sage-700",
  },
  {
    image: "/roadmap/roadmap-03-alliance.png",
    alt: "Brain mascot sitting cross-legged on a desk, helping a man work",
    circle: "bg-rust-100",
    imageWidth: "w-[82%]",
    number: "text-rust",
    kicker: "text-rust-700",
  },
];

export default function HomePage() {
  return (
    <>
      <JsonLd data={serviceSchema()} />

      {/* Hero */}
      <header
        id="top"
        className="mx-auto flex max-w-[1160px] flex-wrap items-center gap-10 px-7 pb-10 pt-14"
      >
        <div className="min-w-[300px] flex-[1_1_480px]">
          <span className="ai-rise inline-block rounded-full bg-sage-200 px-3.5 py-1.5 text-xs font-semibold text-sage-800">
            AI consulting &amp; automation for service businesses
          </span>
          <h1 className="ai-rise ai-delay-1 mb-[18px] mt-5 text-[clamp(40px,5vw,58px)] leading-[1.06]">
            Clear your plate.
            <br />
            Keep your{" "}
            <span className="relative inline-block whitespace-nowrap">
              special sauce.
              <Squiggle draw />
            </span>
          </h1>
          <p className="ai-rise ai-delay-2 max-w-[540px] text-lg leading-[1.65] text-ink/82">
            We help small and medium service businesses put AI to work on the
            busy work — the follow-ups, the double-entry, the scheduling — while
            protecting the personal touch that made you successful in the first
            place.
          </p>
          <div className="ai-rise ai-delay-3 mt-[26px] flex flex-wrap gap-3.5">
            <a
              href={site.formUrl}
              className="inline-flex items-center justify-center rounded-full bg-rust px-[26px] py-[13px] text-[15px] font-semibold text-cream transition-colors hover:bg-rust-600 active:bg-rust-700"
            >
              {ctaLabel}
            </a>
            <Link
              href="/skills-library"
              className="inline-flex items-center justify-center rounded-full px-[26px] py-[13px] text-[15px] font-semibold text-ink ring-2 ring-inset ring-ink/15 transition-all hover:ring-ink/40"
            >
              Browse the free Skills Library
            </Link>
          </div>
          <p className="ai-rise ai-delay-4 mt-[18px] text-[13.5px] text-ink/60">
            Based in Colorado &middot; Working with service businesses
            everywhere
          </p>
        </div>

        <div className="relative min-h-[400px] min-w-[300px] flex-[0_1_420px]">
          <div
            className="absolute bottom-1.5 left-1/2 h-[340px] w-[340px] -translate-x-1/2 rounded-full bg-sage-200"
            aria-hidden="true"
          />
          <div
            className="absolute right-3 top-1.5 h-[70px] w-[70px] rounded-full bg-gold-200"
            aria-hidden="true"
          />
          <div
            className="absolute left-1 top-16 h-[26px] w-[26px] rounded-full bg-rust-200"
            aria-hidden="true"
          />
          <Image
            src="/roadmap/roadmap-01-dive.png"
            alt="The Approachable Intelligence brain mascot diving into a cup of coffee"
            width={345}
            height={354}
            priority
            className="ai-rise ai-delay-1 ai-bob relative mx-auto mt-[26px] block h-auto w-[min(330px,86%)]"
          />
          <div className="absolute -bottom-1.5 -left-1.5 w-[190px]" aria-hidden="true">
            <svg viewBox="0 0 150 70" className="ml-16 block w-[110px]">
              <path
                d="M10 62 C 30 58 60 40 96 16"
                fill="none"
                stroke="var(--color-rust)"
                strokeWidth="3"
                strokeLinecap="round"
                strokeDasharray="1 9"
              />
              <path
                d="M96 16 l-15 1 M96 16 l-4 14"
                fill="none"
                stroke="var(--color-rust)"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </svg>
            <p className="mt-0.5 -rotate-[4deg] font-display text-[15px] text-rust">
              Let&apos;s &quot;Dive In&quot; together
            </p>
          </div>
        </div>
      </header>

      {/* Statement band */}
      <section className="mx-auto mt-[70px] max-w-[1240px] px-5">
        <div className="relative rounded-[40px] bg-sage px-[8%] pb-[70px] pt-[76px] text-cream">
          <Image
            src="/mascot/brain-standing.png"
            alt=""
            aria-hidden="true"
            width={96}
            height={96}
            className="ai-peek absolute -top-[72px] right-[9%] h-24 w-auto"
          />
          <p className="mb-3.5 text-xs uppercase tracking-[0.16em] text-gold-200">
            Our whole philosophy
          </p>
          <h2 className="mb-5 text-[clamp(34px,4.6vw,54px)] leading-[1.1] text-cream">
            Big Tech Energy.
            <br />
            Small Business{" "}
            <span className="relative inline-block">
              Soul.
              <Squiggle
                color="var(--color-gold-200)"
                viewBox="0 0 90 10"
                d="M2 6 Q 10 0 18 6 T 34 6 T 50 6 T 66 6 T 86 5"
              />
            </span>
          </h2>
          <p className="max-w-[660px] text-lg leading-[1.65] text-cream/88">
            Most AI is &ldquo;digital duct tape&rdquo; &mdash; another tool
            stuck on top of the pile. We build the kind that actually works: it
            clears your plate, un-gunks your systems, and keeps the special
            sauce that makes your business{" "}
            <em className="not-italic text-gold-200">yours</em>.
          </p>
        </div>
      </section>

      {/* Who we work with */}
      <section
        id="who"
        className="mx-auto max-w-[1160px] scroll-mt-20 px-7 pb-2.5 pt-24"
      >
        <div className="ai-reveal max-w-[640px]">
          <h2 className="mb-3 text-[clamp(30px,3.6vw,42px)]">
            Who we work with
          </h2>
          <p className="text-[17px] leading-relaxed text-ink/75">
            Small and medium-sized service businesses that have outgrown their
            current systems. Sound familiar?
          </p>
        </div>
        <div className="mt-[34px] grid grid-cols-[repeat(auto-fit,minmax(255px,1fr))] gap-[18px]">
          {painPoints.map((p, i) => (
            <div
              key={p.title}
              className={`flex flex-col gap-3 rounded-[26px] p-[26px] ${WHO_STYLES[i].card}`}
            >
              <div
                className={`grid h-[42px] w-[42px] place-items-center rounded-full ${WHO_STYLES[i].chip}`}
              >
                <svg
                  width="21"
                  height="21"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke={WHO_STYLES[i].stroke}
                  strokeWidth="2.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  {WHO_ICONS[i]}
                </svg>
              </div>
              <h3 className="text-xl">{p.title}</h3>
              <p className="text-[15px] leading-[1.55] text-ink/78">{p.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How we work — the roadmap */}
      <section
        id="how-we-work"
        className="mx-auto max-w-[1160px] scroll-mt-20 px-7 pb-[30px] pt-24"
      >
        <div className="ai-reveal mx-auto mb-[30px] max-w-[620px] text-center">
          <span className="inline-block rounded-full bg-sage-200 px-3.5 py-1.5 text-xs font-semibold text-sage-800">
            How we work
          </span>
          <h2 className="mb-3 mt-4 text-[clamp(30px,3.6vw,42px)]">
            The Roadmap
          </h2>
          <p className="text-[17px] leading-relaxed text-ink/75">
            Every client starts the same way: a conversation, then three
            unhurried steps:
          </p>
        </div>

        {phases.map((phase, i) => (
          <div key={phase.id}>
            {i > 0 && <RoadmapArrow mirrored={i === 2} />}
            <div
              className={`ai-reveal flex items-center gap-11 py-7 ${
                i === 1 ? "flex-wrap-reverse" : "flex-wrap"
              }`}
            >
              {/* Illustration in its tinted circle; text order alternates. */}
              <div
                className={`mx-auto grid min-w-[270px] flex-[0_1_340px] place-items-center ${
                  i === 1 ? "order-2" : ""
                }`}
              >
                <div
                  className={`grid aspect-square w-[min(320px,100%)] place-items-center rounded-full ${ROADMAP[i].circle}`}
                >
                  <Image
                    src={ROADMAP[i].image}
                    alt={ROADMAP[i].alt}
                    width={446}
                    height={389}
                    className={`h-auto ${ROADMAP[i].imageWidth}`}
                  />
                </div>
              </div>
              <div
                className={`min-w-[300px] flex-[1_1_440px] ${
                  i === 1 ? "order-1" : ""
                }`}
              >
                <p
                  className={`font-display text-[56px] leading-none ${ROADMAP[i].number}`}
                >
                  {phase.number}
                </p>
                <h3 className="mb-1 mt-2.5 text-[28px]">{phase.name}</h3>
                <p
                  className={`mb-3.5 text-[13px] uppercase tracking-[0.1em] ${ROADMAP[i].kicker}`}
                >
                  {phase.kicker}
                </p>
                <p className="mb-3.5 max-w-[540px] text-[16.5px] leading-[1.65]">
                  {phase.answer}
                </p>
                <p className="max-w-[540px] text-[15.5px] leading-[1.55] text-sage-700">
                  <strong className="text-sage-800">The result:</strong>{" "}
                  {phase.result}
                </p>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Skills Library teaser */}
      <section id="skills" className="mx-auto mt-[60px] max-w-[1240px] px-5">
        <div className="relative flex flex-wrap items-center gap-11 rounded-[40px] bg-sage-100 px-[8%] py-16">
          <div className="min-w-[300px] flex-[1_1_460px]">
            <span className="inline-block rounded-full bg-gold-200 px-3.5 py-1.5 text-xs font-semibold text-gold-700">
              Free &middot; steal these
            </span>
            <h2 className="mb-3 mt-4 text-[clamp(30px,3.6vw,42px)]">
              The Skills Library
            </h2>
            <p className="max-w-[560px] text-[17px] leading-[1.65] text-ink/80">
              We teach our clients&rsquo; AI assistants how to work. Now
              we&rsquo;re giving some of that away &mdash; copy-paste skills
              that make Claude (or any LLM) genuinely useful, free.
            </p>
            <ul className="mb-[26px] mt-5 grid max-w-[560px] list-none gap-3 p-0">
              {[
                {
                  color: "text-sage",
                  name: "Humanizer",
                  blurb: "strip the “AI accent” from anything you write.",
                },
                {
                  color: "text-gold",
                  name: "Done for the Day",
                  blurb:
                    "end each workday with a clean recap and tomorrow’s plan.",
                },
                {
                  color: "text-rust",
                  name: "Prompt Foundations",
                  blurb:
                    "the briefing template that gets better answers on the first try.",
                },
              ].map((s) => (
                <li key={s.name} className="flex items-baseline gap-3 text-base">
                  <span className={`font-bold ${s.color}`}>&rarr;</span>
                  <span>
                    <strong>{s.name}</strong> &mdash; {s.blurb}
                  </span>
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap items-center gap-3.5">
              <Link
                href="/skills-library"
                className="inline-flex items-center justify-center rounded-full bg-rust px-[26px] py-[13px] text-[15px] font-semibold text-cream transition-colors hover:bg-rust-600 active:bg-rust-700"
              >
                Open the Skills Library
              </Link>
              <span className="text-[13.5px] text-ink/60">
                No email needed for the first three.
              </span>
            </div>
          </div>
          <div className="relative mx-auto min-w-[260px] flex-[0_1_320px]">
            <div
              className="absolute left-1/2 top-[54%] h-[270px] w-[270px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-card"
              aria-hidden="true"
            />
            <Brain
              pose="pointing"
              size={280}
              className="relative mx-auto block w-[min(280px,100%)]"
            />
            <p
              className="absolute -right-2 -top-[26px] rotate-[4deg] font-display text-[15px] text-sage-700"
              aria-hidden="true"
            >
              the librarian is in
            </p>
          </div>
        </div>
      </section>

      {/* Founders */}
      <section
        id="founders"
        className="mx-auto flex max-w-[1160px] scroll-mt-20 flex-wrap items-center gap-14 px-7 pb-10 pt-[90px]"
      >
        <div className="relative mx-auto min-w-[280px] flex-[0_1_380px]">
          <div
            className="absolute -bottom-[22px] -left-[22px] h-[150px] w-[150px] rounded-full bg-gold-200"
            aria-hidden="true"
          />
          <div
            className="absolute -right-4 -top-5 h-16 w-16 rounded-full bg-sage-200"
            aria-hidden="true"
          />
          <Image
            src="/founders/founders.jpg"
            alt="Ty and Jordyn sitting on a rocky overlook in the mountains"
            width={750}
            height={1000}
            className="washed relative w-full -rotate-[1.5deg] rounded-[32px] shadow-md"
          />
        </div>
        <div className="min-w-[300px] flex-[1_1_480px]">
          <h2 className="mb-[18px] text-[clamp(30px,3.6vw,40px)]">
            A message from the founders.
          </h2>
          <div className="max-w-[580px] space-y-4 text-[16.5px] leading-[1.7] text-ink/88">
            <p>If you&rsquo;re here, you probably built something that matters.</p>
            <p>
              Not just a business, but a company with personality &mdash; where
              relationships matter and customers are treated like people, not
              transactions.
            </p>
            <p>
              Right now, many small and medium-sized businesses feel caught
              between two choices: modernize and risk losing their soul, or
              stay the same and slowly fall behind.
            </p>
            <p>
              We believe there&rsquo;s a better path. Technology should
              strengthen what makes your business special, not replace it.
            </p>
            <p>
              That&rsquo;s why we created{" "}
              <strong>Approachable Intelligence</strong>: to help businesses
              evolve thoughtfully by combining operational strategy, behavioral
              psychology, and modern technology.
            </p>
            <p>
              Because the real challenge isn&rsquo;t just adopting new tools.
              It&rsquo;s helping people and systems adapt together.
            </p>
          </div>
          <div className="mt-[22px] flex items-end gap-4">
            <div>
              <p className="mb-1 text-[15px]">Warmly,</p>
              <p className="font-display text-2xl text-sage-800">
                Ty &amp; Jordyn
              </p>
              <p className="mt-1 text-[13.5px] text-ink/60">
                Founders, Approachable Intelligence
              </p>
            </div>
            <Brain pose="walking" size={52} className="mb-0.5" />
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="mx-auto mt-10 max-w-[1240px] px-5 pb-[90px]">
        <div className="relative flex flex-wrap items-center gap-10 rounded-[40px] bg-sage-800 px-[8%] py-[70px] text-cream">
          <div className="min-w-[300px] flex-[1_1_460px]">
            <h2 className="mb-4 text-[clamp(30px,3.8vw,46px)] leading-[1.12] text-cream">
              Ready to stop drowning in busy work?
            </h2>
            <p className="mb-[26px] max-w-[560px] text-[17.5px] leading-relaxed text-cream/85">
              Let&rsquo;s start with a conversation &mdash; no pitch, no
              jargon, just an honest look at your junk drawer.
            </p>
            <a
              href={site.formUrl}
              className="inline-flex items-center justify-center rounded-full bg-cream px-[30px] py-3.5 text-base font-semibold text-rust transition-colors hover:bg-white active:bg-gold-200"
            >
              Let&rsquo;s Talk
            </a>
          </div>
          <div className="relative mx-auto min-w-[240px] flex-[0_1_280px]">
            <Brain
              pose="sitting"
              size={250}
              className="mx-auto block w-[min(250px,100%)]"
            />
            <div className="absolute -left-[84px] top-2 w-[120px]" aria-hidden="true">
              <p className="mb-0.5 -rotate-[5deg] font-display text-[15px] text-gold-200">
                you, once it&rsquo;s running
              </p>
              <svg viewBox="0 0 110 54" className="ml-[26px] block w-[86px]">
                <path
                  d="M8 8 C 26 40, 60 46, 92 34"
                  fill="none"
                  stroke="var(--color-gold-200)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeDasharray="1 9"
                />
                <path
                  d="M92 34 l-13 -5 M92 34 l-9 10"
                  fill="none"
                  stroke="var(--color-gold-200)"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
