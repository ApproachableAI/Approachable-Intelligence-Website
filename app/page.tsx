import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";
import { home, phases } from "@/lib/content";
import { skills } from "@/lib/skills";
import { BrainField } from "@/components/brain-field";
import { SyncDemo } from "@/components/sync-demo";
import { FeatureCards } from "@/components/feature-cards";
import { IndustryTabs } from "@/components/industry-tabs";
import { TimeShrink } from "@/components/time-shrink";
import { Marquee } from "@/components/marquee";
import { BookLink } from "@/components/book-link";
import { industries } from "@/lib/industries";
import { Reveal } from "@/components/reveal";
import { JsonLd } from "@/components/json-ld";
import { serviceSchema } from "@/lib/schema";
import { cn } from "@/lib/cn";

export const metadata: Metadata = buildMetadata({
  title: "Custom AI Workflows, Guardrails & Training",
  description:
    "Approachable Intelligence builds custom AI workflows around the documents and processes your team already runs, writes the guardrails, and trains your people. For engineers, architects, and service businesses.",
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
  const { hero, built, services, caseStudy, who, demo, roadmap, skillsTeaser, founder, finalCta } =
    home;

  const tabs = industries.map((industry) => ({
    slug: industry.slug,
    label: industry.navLabel,
    summary: industry.teaser.summary,
    bullets: industry.teaser.bullets,
    badge: industry.caseStudy ? `Case study: ${industry.caseStudy.client}` : undefined,
  }));

  return (
    <>
      <JsonLd data={serviceSchema()} />

      {/* ---------------------------------------------------------------- */}
      {/* Hero                                                              */}
      {/* ---------------------------------------------------------------- */}
      <header
        id="top"
        className="hero-bg relative flex flex-col overflow-hidden md:grid md:min-h-[min(calc(100vh-66px),860px)] md:grid-cols-[minmax(0,1fr)]"
      >
        {/* Live particle brain. Phones: its own band under the copy.
            Wide screens: absolute, right ~62vw, behind the copy. */}
        <div
          className="order-2 h-[min(46vh,420px)] min-h-[300px] w-full md:absolute md:inset-0 md:left-auto md:order-none md:h-auto md:min-h-0 md:w-[min(62vw,900px)] md:min-w-[340px]"
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

        <div className="relative mx-auto flex w-full max-w-[1200px] flex-col justify-center px-6 pb-2 pt-[clamp(44px,8vh,120px)] md:px-7 md:pb-20 md:pt-[clamp(60px,10vh,120px)]">
          <div className="max-w-[660px]">
            <div className="ai-rise flex items-center gap-3">
              <span
                className="ai-pulse h-2 w-2 shrink-0 rounded-full bg-sage-bright"
                aria-hidden="true"
              />
              <span className="text-[12.5px] font-semibold uppercase tracking-[.16em] text-sage-bright">
                {hero.kicker}
              </span>
            </div>
            <h1 className="ai-rise ai-delay-1 mb-6 mt-[26px] text-[clamp(44px,6.2vw,84px)] leading-[.98]">
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
            <p className="ai-rise ai-delay-2 max-w-[560px] text-[clamp(17px,1.4vw,20px)] leading-[1.6] text-cream/75">
              {hero.body}
            </p>
            <div className="ai-rise ai-delay-3 mt-[34px] flex flex-col gap-3.5 sm:flex-row sm:flex-wrap">
              <BookLink className="px-[30px] py-[15px] text-[15.5px]" arrow />
              <Link
                href="/industries/engineers-architects#case-study"
                className="btn-outline px-7 py-3.5 text-[15.5px]"
              >
                {hero.secondaryCta}
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* ---------------------------------------------------------------- */}
      {/* Things we have built                                              */}
      {/* ---------------------------------------------------------------- */}
      <section
        aria-label="Things we have built"
        className="border-y border-cream/12 bg-[#263627] py-5 md:py-6"
      >
        <Marquee items={built} />
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* What we do                                                        */}
      {/* ---------------------------------------------------------------- */}
      <section
        id="what-we-do"
        className="relative scroll-mt-[70px] overflow-hidden px-6 py-[clamp(72px,9vw,130px)] md:px-7"
      >
        <div
          className="absolute -left-[10%] top-[10%] h-[40vw] w-[40vw] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(224,174,63,.13), transparent 70%)",
          }}
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-[1200px]">
          <Reveal className="mb-9 flex flex-wrap items-end justify-between gap-5 md:mb-11">
            <div className="max-w-[620px]">
              <Kicker className="text-gold-pale">{services.kicker}</Kicker>
              <h2 className="text-[clamp(34px,4.4vw,60px)] leading-[1.03]">
                {services.headline}
              </h2>
            </div>
            <p className="max-w-[360px] text-[17px] leading-[1.6] text-cream/72">
              {services.body}
            </p>
          </Reveal>
          <FeatureCards items={services.items} />
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Case study band                                                   */}
      {/* ---------------------------------------------------------------- */}
      <section
        className="pillow relative overflow-hidden px-6 py-[clamp(72px,9vw,120px)] text-cream shadow-[0_30px_80px_rgba(20,30,20,.45)] md:px-7"
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
        <div className="relative mx-auto grid grid-cols-1 max-w-[1200px] items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <Kicker className="mb-[18px] text-gold-pale">{caseStudy.kicker}</Kicker>
            <h2 className="text-[clamp(32px,4vw,56px)] leading-[1.04]">
              {caseStudy.headline}
            </h2>
            <p className="mt-5 max-w-[540px] text-[clamp(16.5px,1.35vw,19px)] leading-[1.65] text-cream/88">
              {caseStudy.body}
            </p>
            <Link
              href="/industries/engineers-architects#case-study"
              className="btn-cream mt-8 px-7 py-3.5 text-[15px] !text-sage-deep"
            >
              {caseStudy.cta}
              <span aria-hidden="true">&rarr;</span>
            </Link>
          </Reveal>
          <Reveal className="rounded-[24px] border border-cream/20 bg-[rgba(27,35,27,.38)] p-6 backdrop-blur-sm sm:p-9">
            <p className="mb-2 text-[12.5px] font-semibold uppercase tracking-[.16em] text-cream/70">
              {caseStudy.statLabel}
            </p>
            <TimeShrink from={120} to={20} />
            <p className="mt-5 text-[14.5px] leading-[1.55] text-cream/75">
              {caseStudy.statNote}
            </p>
          </Reveal>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Who we help                                                       */}
      {/* ---------------------------------------------------------------- */}
      <section
        id="who"
        className="mx-auto max-w-[1200px] scroll-mt-[70px] px-6 pt-[clamp(80px,9vw,130px)] md:px-7"
      >
        <Reveal className="mb-9 max-w-[680px]">
          <Kicker className="text-sage-bright">{who.kicker}</Kicker>
          <h2 className="text-[clamp(34px,4vw,54px)] leading-[1.05]">
            {who.headline}
          </h2>
        </Reveal>
        <Reveal>
          <IndustryTabs tabs={tabs} />
        </Reveal>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Live demo: all your systems should talk to each other             */}
      {/* ---------------------------------------------------------------- */}
      <section
        id="demo"
        className="mx-auto max-w-[1200px] scroll-mt-[70px] px-6 pb-10 pt-[clamp(84px,10vw,140px)] md:px-7"
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
      {/* How we work: the Roadmap                                          */}
      {/* ---------------------------------------------------------------- */}
      <section
        id="how-we-work"
        className="mx-auto max-w-[1200px] scroll-mt-[70px] px-6 pb-[30px] pt-[clamp(70px,9vw,120px)] md:px-7"
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
                "grid grid-cols-1 items-center gap-8 py-7 md:grid-cols-2 md:gap-12 md:py-9",
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
                  className="disc aspect-square w-[min(240px,70%)] md:w-[min(340px,100%)]"
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
          className="relative grid grid-cols-1 items-center gap-10 overflow-visible rounded-[28px] px-6 py-[clamp(56px,6vw,80px)] sm:px-[8%] md:grid-cols-2"
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
      {/* Founder note                                                      */}
      {/* ---------------------------------------------------------------- */}
      <section
        id="founder"
        className="pillow-lg relative z-[1] -mb-[60px] mt-[clamp(80px,9vw,120px)] scroll-mt-[70px] px-6 pb-[clamp(110px,12vw,160px)] pt-[clamp(72px,9vw,120px)] text-[#1B231B] shadow-[0_40px_90px_rgba(27,35,27,.25)] md:px-7"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 85% 10%, #FBFBF3, var(--color-cream) 70%)",
        }}
      >
        <div className="mx-auto grid grid-cols-1 max-w-[1040px] items-start gap-10 md:grid-cols-[auto_minmax(0,1fr)] md:gap-16">
          <Reveal className="relative mx-auto w-[min(240px,64vw)] md:mx-0 md:mt-2 md:w-[280px]">
            <div
              className="absolute inset-0 translate-x-3 translate-y-3 rounded-[28px] bg-gold-bright/55"
              aria-hidden="true"
            />
            <Image
              src={site.founder.photo}
              alt={founder.photoAlt}
              width={360}
              height={360}
              sizes="280px"
              className="relative block aspect-square w-full rounded-[28px] object-cover shadow-[0_24px_50px_rgba(27,35,27,.22)]"
            />
          </Reveal>
          <Reveal>
            <Kicker className="text-sage">{founder.kicker}</Kicker>
            <h2 className="mb-[22px] text-[clamp(34px,4vw,54px)] leading-[1.05] text-[#1B231B]">
              {founder.headline}
            </h2>
            <div className="max-w-[580px] text-[16.5px] leading-[1.7] text-[#1B231B]/85">
              {founder.letter.map((paragraph, i) => (
                <p
                  key={i}
                  className={i < founder.letter.length - 1 ? "mb-3.5" : ""}
                >
                  <Emphasize text={paragraph} phrase={site.name} />
                </p>
              ))}
            </div>
            <div className="mt-[26px] flex max-w-[580px] items-end justify-between gap-5">
              <div>
                <p className="mb-1 text-[15px]">{founder.signoff}</p>
                <p className="font-display text-[30px] italic text-sage">
                  {founder.signature}
                </p>
                <p className="mt-1 text-[13.5px] text-[#1B231B]/60">
                  {founder.signatureRole}
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
          </Reveal>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Final CTA                                                         */}
      {/* ---------------------------------------------------------------- */}
      <section
        className="relative overflow-hidden px-6 pb-[clamp(84px,11vw,150px)] pt-[clamp(130px,15vw,210px)] md:px-7"
        style={{
          background:
            "radial-gradient(ellipse 60% 70% at 50% 100%, rgba(224,174,63,.22), transparent 65%), var(--color-ink)",
        }}
      >
        <div className="relative mx-auto max-w-[900px] text-center">
          <div className="disc mx-auto mb-[30px] h-[160px] w-[160px] shadow-[0_0_0_1px_rgba(158,196,154,.45),0_0_110px_rgba(158,196,154,.25)] md:h-[180px] md:w-[180px]">
            <Image
              src="/mascot/brain-sitting.png"
              alt="Brain mascot relaxing in an armchair"
              width={129}
              height={132}
              className="block h-[118px] w-auto md:h-[132px]"
            />
          </div>
          <h2 className="mb-5 text-[clamp(36px,5.4vw,74px)] leading-none">
            {finalCta.headline}
            <br />
            {finalCta.headlineLine2}
          </h2>
          <p className="mx-auto mb-[34px] max-w-[540px] text-[18px] leading-[1.6] text-cream/72">
            {finalCta.body}
          </p>
          <BookLink className="px-[38px] py-[17px] text-[16.5px]" arrow>
            {finalCta.cta}
          </BookLink>
        </div>
      </section>
    </>
  );
}
