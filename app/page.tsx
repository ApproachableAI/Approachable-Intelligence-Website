import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { site, ctaLabel } from "@/lib/site";
import { home, phases } from "@/lib/content";
import { skills } from "@/lib/skills";
import { BrainField } from "@/components/brain-field";
import { SyncDemo } from "@/components/sync-demo";
import { WhoCards } from "@/components/who-cards";
import { Reveal } from "@/components/reveal";
import { JsonLd } from "@/components/json-ld";
import { serviceSchema } from "@/lib/schema";
import { cn } from "@/lib/cn";

export const metadata: Metadata = buildMetadata({
  title: "AI Consulting & Automation for Small Businesses",
  description:
    "Approachable Intelligence puts AI to work on the follow-ups, the double-entry, and the scheduling, so small businesses can protect the personal touch that made them successful. Big Tech Energy. Small Business Soul.",
  path: "/",
});

/* Small uppercase label above a heading. */
function Kicker({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "mb-4 text-[12.5px] font-semibold uppercase tracking-[.16em]",
        className,
      )}
    >
      {children}
    </p>
  );
}

/* Illustration + accent per roadmap step: gold, sage, terracotta. */
const ROADMAP = [
  {
    image: "/roadmap/roadmap-01-dive.png",
    alt: "Brain mascot diving into a coffee cup",
    width: 345,
    height: 354,
    imageWidth: "w-[74%]",
    ring: "0 0 0 1px rgba(224,174,63,.4), 0 0 90px rgba(224,174,63,.18)",
    kicker: "text-gold-bright",
    result: "text-gold-pale",
  },
  {
    image: "/roadmap/roadmap-02-build.png",
    alt: "Brain mascot working at a computer",
    width: 357,
    height: 306,
    imageWidth: "w-[74%]",
    ring: "0 0 0 1px rgba(158,196,154,.45), 0 0 90px rgba(158,196,154,.18)",
    kicker: "text-sage-bright",
    result: "text-sage-bright",
  },
  {
    image: "/roadmap/roadmap-03-alliance.png",
    alt: "Brain mascot sitting cross-legged on a desk, helping a man work",
    width: 446,
    height: 389,
    imageWidth: "w-[80%]",
    ring: "0 0 0 1px rgba(216,114,74,.45), 0 0 90px rgba(216,114,74,.18)",
    kicker: "text-terra-bright",
    result: "text-terra-pale",
  },
];

/* Wraps one phrase of a sentence in <strong>. */
function Emphasize({ text, phrase }: { text: string; phrase: string }) {
  const at = text.indexOf(phrase);
  if (at < 0) return <>{text}</>;
  return (
    <>
      {text.slice(0, at)}
      <strong>{phrase}</strong>
      {text.slice(at + phrase.length)}
    </>
  );
}

export default function HomePage() {
  const { hero, statement, demo, who, roadmap, skillsTeaser, founders, finalCta } =
    home;

  return (
    <>
      <JsonLd data={serviceSchema()} />

      {/* ---------------------------------------------------------------- */}
      {/* Hero                                                              */}
      {/* ---------------------------------------------------------------- */}
      <header
        id="top"
        className="hero-bg relative flex flex-col overflow-hidden md:grid md:min-h-[calc(100vh-66px)] md:grid-cols-[minmax(0,1fr)]"
      >
        {/* Live particle brain. Phones: its own band under the copy (the
            statement band overlaps the bottom 70px, hence the padding).
            Wide screens: absolute, right ~62vw, behind the copy. */}
        <div
          className="order-2 h-[min(60vh,560px)] min-h-[360px] w-full pb-[70px] md:absolute md:inset-0 md:left-auto md:order-none md:h-auto md:min-h-0 md:w-[min(62vw,900px)] md:min-w-[340px] md:pb-0"
          aria-hidden="true"
        >
          <BrainField density="7500" densityMobile="3600" />
        </div>
        {/* Left→right fade so the copy stays legible over the brain (wide screens) */}
        <div
          className="absolute inset-0 hidden md:block"
          style={{
            background:
              "linear-gradient(90deg, var(--color-ink) 30%, rgba(43,59,44,.6) 55%, transparent 75%)",
          }}
          aria-hidden="true"
        />

        <div className="relative mx-auto flex w-full max-w-[1200px] flex-col justify-center px-7 pb-4 pt-[clamp(48px,8vh,120px)] md:pb-20 md:pt-[clamp(60px,10vh,120px)]">
          <div className="max-w-[640px]">
            <div className="ai-rise flex items-center gap-3">
              <span
                className="ai-pulse h-2 w-2 rounded-full bg-sage-bright"
                aria-hidden="true"
              />
              <span className="text-[12.5px] font-semibold uppercase tracking-[.16em] text-sage-bright">
                {hero.kicker}
              </span>
            </div>
            <h1 className="ai-rise ai-delay-1 mb-6 mt-[26px] text-[clamp(46px,6.2vw,84px)] leading-[.98]">
              {hero.headline}
              <br />
              <em className="relative inline-block italic text-gold-pale">
                {hero.headlineEmphasis}
                <svg
                  viewBox="0 0 120 10"
                  preserveAspectRatio="none"
                  className="absolute -bottom-1.5 left-0 h-3 w-full overflow-visible"
                  aria-hidden="true"
                >
                  <path
                    d="M2 6 Q 12 0 22 6 T 42 6 T 62 6 T 82 6 T 102 6 T 118 5"
                    fill="none"
                    stroke="var(--color-terra-bright)"
                    strokeWidth="3"
                    strokeLinecap="round"
                    className="ai-squiggle"
                  />
                </svg>
              </em>
            </h1>
            <p className="ai-rise ai-delay-2 max-w-[540px] text-[clamp(17px,1.4vw,20px)] leading-[1.6] text-cream/72">
              {hero.body}
            </p>
            <div className="ai-rise ai-delay-3 mt-[34px] flex flex-wrap gap-3.5">
              <a
                href={site.formUrl}
                className="btn-gold px-[30px] py-[15px] text-[15.5px]"
              >
                {ctaLabel}
              </a>
              <a href="#demo" className="btn-outline px-7 py-3.5 text-[15.5px]">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="var(--color-cream)"
                  aria-hidden="true"
                >
                  <path d="M7 4v16l13-8z" />
                </svg>
                {hero.secondaryCta}
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* ---------------------------------------------------------------- */}
      {/* Statement band                                                    */}
      {/* ---------------------------------------------------------------- */}
      <section
        className="pillow relative -mt-[70px] overflow-hidden px-7 py-[clamp(80px,10vw,130px)] text-cream shadow-[0_-30px_80px_rgba(43,59,44,.5)]"
        style={{
          background:
            "linear-gradient(160deg, #617D5F, var(--color-sage) 60%, #46603F)",
        }}
      >
        <div
          className="absolute -right-[6%] -top-[20%] h-[46vw] w-[46vw] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(242,242,230,.14), transparent 70%)",
          }}
          aria-hidden="true"
        />
        <div className="relative mx-auto grid max-w-[1200px] grid-cols-[repeat(auto-fit,minmax(300px,1fr))] items-end gap-12">
          <div>
            <Kicker className="mb-[18px] text-gold-pale">
              {statement.kicker}
            </Kicker>
            <h2 className="text-[clamp(44px,6vw,92px)] leading-[.95]">
              {statement.headline}
              <br />
              <em className="italic text-gold-pale">
                {statement.headlineEmphasis}
              </em>
            </h2>
          </div>
          <p className="max-w-[520px] text-[clamp(17px,1.4vw,20px)] leading-[1.6] text-cream/88">
            {statement.body}{" "}
            <strong className="text-gold-pale">{statement.bodyEmphasis}</strong>.
          </p>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Live demo: all your systems should talk to each other             */}
      {/* ---------------------------------------------------------------- */}
      <section
        id="demo"
        className="mx-auto max-w-[1200px] scroll-mt-[70px] px-7 pb-10 pt-[clamp(90px,10vw,140px)]"
      >
        <Reveal className="mx-auto mb-11 max-w-[700px] text-center">
          <Kicker className="text-sage-bright">{demo.kicker}</Kicker>
          <h2 className="mb-[18px] text-[clamp(34px,4vw,54px)] leading-[1.05]">
            {demo.headline}
          </h2>
          <p className="text-[17px] leading-[1.6] text-cream/72">{demo.body}</p>
        </Reveal>
        <SyncDemo />
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Who we work with                                                  */}
      {/* ---------------------------------------------------------------- */}
      <section
        id="who"
        className="relative mt-[clamp(70px,8vw,110px)] scroll-mt-[70px] overflow-hidden px-7 py-[clamp(80px,9vw,120px)]"
        style={{
          background:
            "linear-gradient(180deg, var(--color-ink) 0%, #3B5A3B 30%, #3B5A3B 70%, var(--color-ink) 100%)",
        }}
      >
        <div
          className="absolute -left-[10%] top-[10%] h-[40vw] w-[40vw] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(224,174,63,.18), transparent 70%)",
          }}
          aria-hidden="true"
        />
        <div
          className="absolute -right-[10%] bottom-0 h-[40vw] w-[40vw] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(216,114,74,.18), transparent 70%)",
          }}
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-[1200px]">
          <Reveal className="mb-10 flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-[560px]">
              <Kicker className="text-gold-pale">{who.kicker}</Kicker>
              <h2 className="text-[clamp(34px,4vw,54px)] leading-[1.05]">
                {who.headline}
              </h2>
            </div>
            <p className="max-w-[380px] text-[17px] leading-[1.6] text-cream/72">
              {who.aside}
            </p>
          </Reveal>

          <WhoCards />
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* How we work: the Roadmap                                          */}
      {/* ---------------------------------------------------------------- */}
      <section
        id="how-we-work"
        className="mx-auto max-w-[1200px] scroll-mt-[70px] px-7 pb-[30px] pt-[clamp(80px,9vw,120px)]"
      >
        <Reveal className="mb-5 max-w-[640px]">
          <Kicker className="text-sage-bright">{roadmap.kicker}</Kicker>
          <h2 className="mb-4 text-[clamp(34px,4vw,54px)] leading-[1.05]">
            {roadmap.headline}
          </h2>
          <p className="text-[17px] leading-[1.6] text-cream/72">
            {roadmap.body}
          </p>
        </Reveal>

        {phases.map((phase, i) => {
          const art = ROADMAP[i];
          const flipped = i % 2 === 1;
          return (
            <Reveal
              key={phase.id}
              className={cn(
                "grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] items-center gap-12 py-9",
                i === 0 && "mt-5",
              )}
            >
              {/* Illustration comes first when stacked; rows alternate on wide screens */}
              <div
                className={cn(
                  "grid place-items-center",
                  flipped && "order-first md:order-last",
                )}
              >
                <div
                  className="disc aspect-square w-[min(340px,100%)]"
                  style={{ boxShadow: art.ring }}
                >
                  <Image
                    src={art.image}
                    alt={art.alt}
                    width={art.width}
                    height={art.height}
                    sizes="340px"
                    className={cn("h-auto", art.imageWidth)}
                  />
                </div>
              </div>
              <div>
                <p
                  className={cn(
                    "mb-3 font-display text-[15px] uppercase tracking-[.14em]",
                    art.kicker,
                  )}
                >
                  Step {phase.number} &middot; {phase.kicker}
                </p>
                <h3 className="mb-4 text-[clamp(30px,3vw,42px)] leading-[1.05]">
                  {phase.name}
                </h3>
                <p className="mb-3.5 max-w-[520px] text-[16.5px] leading-[1.65] text-cream/72">
                  {phase.answer}
                </p>
                <p
                  className={cn(
                    "max-w-[520px] text-[15.5px] leading-[1.55]",
                    art.result,
                  )}
                >
                  <strong className="text-cream">{roadmap.resultLabel}</strong>{" "}
                  {phase.result}
                </p>
              </div>
            </Reveal>
          );
        })}
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Skills Library teaser                                             */}
      {/* ---------------------------------------------------------------- */}
      <section
        id="skills"
        className="mx-auto mt-[clamp(70px,8vw,110px)] max-w-[1240px] px-5"
      >
        <div
          className="relative grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] items-center gap-10 overflow-visible rounded-[28px] px-[8%] py-[clamp(48px,6vw,80px)]"
          style={{
            background:
              "linear-gradient(135deg, var(--color-terra) 0%, #A8572F 55%, var(--color-gold) 130%)",
          }}
        >
          {/* Standing mascot peeking over the top-right edge */}
          <Reveal
            variant="peek"
            className="absolute -top-14 right-[8%] grid h-28 w-28 place-items-center rounded-full bg-cream shadow-[0_12px_30px_rgba(43,59,44,.4)]"
            aria-hidden="true"
          >
            <Image
              src="/mascot/brain-standing.png"
              alt=""
              width={84}
              height={86}
              className="h-[86px] w-auto"
            />
          </Reveal>

          <div>
            <Kicker className="text-gold-pale">{skillsTeaser.kicker}</Kicker>
            <h2 className="mb-4 text-[clamp(34px,4vw,54px)] leading-[1.05]">
              {skillsTeaser.headline}
            </h2>
            <p className="mb-[22px] max-w-[520px] text-[17px] leading-[1.65] text-cream/88">
              {skillsTeaser.body}
            </p>
            <div className="flex flex-wrap items-center gap-3.5">
              <Link
                href="/skills-library"
                className="btn-cream px-7 py-3.5 text-[15px]"
              >
                {skillsTeaser.cta}
              </Link>
              <span className="text-[13.5px] text-cream/75">
                {skillsTeaser.note}
              </span>
            </div>
          </div>

          <ul className="grid gap-2.5">
            {skills.map((skill) => (
              <li
                key={skill.id}
                className="flex items-center justify-between gap-3.5 rounded-[14px] border border-cream/18 bg-[rgba(43,59,44,.32)] px-[18px] py-4"
              >
                <span>
                  <strong className="block text-[15.5px]">{skill.teaser}</strong>
                  <span className="text-[13.5px] text-cream/75">
                    {skill.blurb}
                  </span>
                </span>
                <span className="text-[12px] tracking-[.1em] text-gold-pale">
                  {skill.marker}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Founders                                                          */}
      {/* ---------------------------------------------------------------- */}
      <section
        id="founders"
        className="pillow-lg relative z-[1] -mb-[60px] mt-[clamp(80px,9vw,120px)] scroll-mt-[70px] px-7 pb-[clamp(120px,12vw,160px)] pt-[clamp(80px,9vw,120px)] text-[#1B231B] shadow-[0_40px_90px_rgba(27,35,27,.25)]"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 85% 10%, #FBFBF3, var(--color-cream) 70%)",
        }}
      >
        <div className="mx-auto grid max-w-[1200px] grid-cols-[repeat(auto-fit,minmax(300px,1fr))] items-center gap-16">
          <div className="relative">
            <Image
              src="/founders/founders.jpg"
              alt={founders.photoAlt}
              width={750}
              height={1000}
              sizes="(min-width: 768px) 50vw, 100vw"
              className="block w-full rounded-[22px] shadow-[0_30px_60px_rgba(27,35,27,.2)]"
            />
          </div>
          <div>
            <Kicker className="text-sage">{founders.kicker}</Kicker>
            <h2 className="mb-[22px] text-[clamp(34px,4vw,54px)] leading-[1.05] text-[#1B231B]">
              {founders.headline}
            </h2>
            <div className="max-w-[560px] text-[16.5px] leading-[1.7] text-[#1B231B]/85">
              {founders.letter.map((paragraph, i) => (
                <p
                  key={i}
                  className={i < founders.letter.length - 1 ? "mb-3.5" : ""}
                >
                  <Emphasize text={paragraph} phrase={site.name} />
                </p>
              ))}
            </div>
            <div className="mt-[26px] flex max-w-[560px] items-end justify-between gap-5">
              <div>
                <p className="mb-1 text-[15px]">{founders.signoff}</p>
                <p className="font-display text-[30px] italic text-sage">
                  {founders.signature}
                </p>
                <p className="mt-1 text-[13.5px] text-[#1B231B]/60">
                  {founders.signatureRole}
                </p>
              </div>
              <Image
                src="/mascot/brain-leaning.png"
                alt=""
                aria-hidden="true"
                width={96}
                height={104}
                className="h-[104px] w-auto flex-none"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Final CTA                                                         */}
      {/* ---------------------------------------------------------------- */}
      <section
        className="relative overflow-hidden px-7 pb-[clamp(90px,11vw,150px)] pt-[clamp(140px,15vw,210px)]"
        style={{
          background:
            "radial-gradient(ellipse 60% 70% at 50% 100%, rgba(224,174,63,.22), transparent 65%), var(--color-ink)",
        }}
      >
        <div className="relative mx-auto max-w-[900px] text-center">
          <div className="disc mx-auto mb-[30px] h-[180px] w-[180px] shadow-[0_0_0_1px_rgba(158,196,154,.45),0_0_110px_rgba(158,196,154,.25)]">
            <Image
              src="/mascot/brain-sitting.png"
              alt="Brain mascot relaxing in an armchair"
              width={129}
              height={132}
              className="block h-[132px] w-auto"
            />
          </div>
          <h2 className="mb-5 text-[clamp(38px,5.4vw,74px)] leading-none">
            {finalCta.headline}
            <br />
            {finalCta.headlineLine2}
          </h2>
          <p className="mx-auto mb-[34px] max-w-[540px] text-[18px] leading-[1.6] text-cream/72">
            {finalCta.body}
          </p>
          <a
            href={site.formUrl}
            className="btn-gold px-[38px] py-[17px] text-[16.5px]"
          >
            {finalCta.cta}
          </a>
        </div>
      </section>
    </>
  );
}
