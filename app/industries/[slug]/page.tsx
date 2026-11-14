import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { buildMetadata } from "@/lib/seo";
import { industries, getIndustry } from "@/lib/industries";
import { phases } from "@/lib/content";
import { BookLink } from "@/components/book-link";
import { Blueprint } from "@/components/blueprint";
import { ExtractionDemo } from "@/components/extraction-demo";
import { FeatureCards } from "@/components/feature-cards";
import { Reveal } from "@/components/reveal";
import { JsonLd } from "@/components/json-ld";
import { faqSchema, breadcrumbSchema, industryServiceSchema } from "@/lib/schema";
import { cn } from "@/lib/cn";

// Pre-render every client-type page at build time; anything else is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return industries.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const industry = getIndustry(slug);
  if (!industry) return {};
  return buildMetadata({
    title: industry.metaTitle,
    description: industry.metaDescription,
    path: `/industries/${industry.slug}`,
  });
}

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

const STATUS_STYLE: Record<string, string> = {
  "In use": "bg-sage-bright/18 text-sage-bright",
  Adopted: "bg-sage-bright/18 text-sage-bright",
  "In build": "bg-gold-bright/18 text-gold-pale",
};

export default async function IndustryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const industry = getIndustry(slug);
  if (!industry) notFound();

  const { hero, build, principles, caseStudy, resources, faqs, finalCta } = industry;
  const blueprint = industry.theme === "blueprint";

  return (
    <>
      <JsonLd data={industryServiceSchema(industry)} />
      <JsonLd data={faqSchema(faqs)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: industry.navLabel, path: `/industries/${industry.slug}` },
        ])}
      />

      {/* ---------------------------------------------------------------- */}
      {/* Hero                                                              */}
      {/* ---------------------------------------------------------------- */}
      <header
        className={cn(
          "relative overflow-hidden",
          blueprint ? "blueprint-bg" : "hero-bg",
        )}
      >
        {/* Fade the ground into the page below */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background: blueprint
              ? "radial-gradient(ellipse 80% 70% at 70% 40%, transparent 30%, var(--color-ink) 100%), linear-gradient(180deg, transparent 70%, var(--color-ink))"
              : undefined,
          }}
          aria-hidden="true"
        />
        <div className="relative mx-auto grid grid-cols-1 max-w-[1200px] items-center gap-6 px-6 pb-[clamp(36px,6vw,80px)] pt-[clamp(48px,8vw,110px)] md:px-7 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,.95fr)] lg:gap-10">
          <div>
            <div className="ai-rise flex items-center gap-3">
              <span
                className="ai-pulse h-2 w-2 shrink-0 rounded-full bg-sage-bright"
                aria-hidden="true"
              />
              <span className="text-[12.5px] font-semibold uppercase tracking-[.16em] text-sage-bright">
                {hero.kicker}
              </span>
            </div>
            <h1 className="ai-rise ai-delay-1 mb-6 mt-6 text-[clamp(40px,5.4vw,74px)] leading-[1]">
              {hero.headline}{" "}
              <em className="italic text-gold-pale">{hero.headlineEmphasis}</em>
            </h1>
            <p className="ai-rise ai-delay-2 max-w-[560px] text-[clamp(17px,1.4vw,20px)] leading-[1.6] text-cream/78">
              {hero.body}
            </p>
            <div className="ai-rise ai-delay-3 mt-8 flex flex-col gap-3.5 sm:flex-row sm:flex-wrap">
              <BookLink className="px-[30px] py-[15px] text-[15.5px]" arrow />
              {hero.secondaryCta && (
                <Link
                  href={hero.secondaryCta.href}
                  className="btn-outline px-7 py-3.5 text-[15.5px]"
                >
                  {hero.secondaryCta.label}
                </Link>
              )}
            </div>
          </div>

          {blueprint ? (
            <Blueprint className="mx-auto h-auto w-full max-w-[560px] lg:max-w-none" />
          ) : (
            <div className="grid place-items-center py-4">
              <div className="disc aspect-square w-[min(300px,68%)] shadow-[0_0_0_1px_rgba(224,174,63,.4),0_0_110px_rgba(224,174,63,.22)] lg:w-[min(380px,90%)]">
                <Image
                  src="/roadmap/roadmap-03-alliance.png"
                  alt="Brain mascot sitting on a desk, helping a business owner work"
                  width={446}
                  height={389}
                  priority
                  sizes="380px"
                  className="h-auto w-[80%]"
                />
              </div>
            </div>
          )}
        </div>
      </header>

      {/* ---------------------------------------------------------------- */}
      {/* Watch a workflow run (engineers)                                  */}
      {/* ---------------------------------------------------------------- */}
      {blueprint && (
        <section className="mx-auto max-w-[1200px] px-4 pt-[clamp(40px,6vw,80px)] sm:px-6 md:px-7">
          <Reveal className="mx-auto mb-9 max-w-[720px] px-2 text-center">
            <Kicker className="text-sage-bright">Watch a workflow run</Kicker>
            <h2 className="mb-4 text-[clamp(32px,4vw,54px)] leading-[1.05]">
              One report in. A schedule you can check, out.
            </h2>
            <p className="text-[17px] leading-[1.6] text-cream/72">
              This is the shape of every workflow we build: read the source,
              ask instead of guessing, show the work, and flag the doubts.
            </p>
          </Reveal>
          <Reveal>
            <ExtractionDemo />
          </Reveal>
        </section>
      )}

      {/* ---------------------------------------------------------------- */}
      {/* What we build                                                     */}
      {/* ---------------------------------------------------------------- */}
      <section className="relative overflow-hidden px-6 py-[clamp(72px,9vw,130px)] md:px-7">
        <div
          className="absolute -right-[10%] top-[20%] h-[40vw] w-[40vw] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(216,114,74,.13), transparent 70%)",
          }}
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-[1200px]">
          <Reveal className="mb-9 flex flex-wrap items-end justify-between gap-5 md:mb-11">
            <div className="max-w-[640px]">
              <Kicker className="text-gold-pale">{build.kicker}</Kicker>
              <h2 className="text-[clamp(34px,4.2vw,58px)] leading-[1.03]">
                {build.headline}
              </h2>
            </div>
            <p className="max-w-[400px] text-[17px] leading-[1.6] text-cream/72">
              {build.body}
            </p>
          </Reveal>
          <FeatureCards items={build.items} columns={3} />
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Case study                                                        */}
      {/* ---------------------------------------------------------------- */}
      {caseStudy && (
        <section
          id="case-study"
          className="pillow-lg relative scroll-mt-[40px] px-6 py-[clamp(84px,10vw,140px)] text-[#1B231B] shadow-[0_40px_90px_rgba(27,35,27,.25)] md:px-7"
          style={{
            background:
              "radial-gradient(ellipse 60% 40% at 85% 6%, #FBFBF3, var(--color-cream) 70%)",
          }}
        >
          <div className="mx-auto max-w-[1100px]">
            <Reveal className="max-w-[820px]">
              <Kicker className="text-terra">Case study</Kicker>
              <p className="mb-5 flex flex-wrap items-baseline gap-x-4 gap-y-1">
                <span className="font-display text-[clamp(26px,3vw,36px)] leading-none text-sage">
                  {caseStudy.client}
                </span>
                <span className="text-[13.5px] uppercase tracking-[.12em] text-[#1B231B]/55">
                  {caseStudy.clientDescriptor}
                </span>
              </p>
              <h2 className="text-[clamp(34px,4.6vw,62px)] leading-[1.03] text-[#1B231B]">
                {caseStudy.headline}
              </h2>
            </Reveal>

            <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-16">
              {/* The situation */}
              <Reveal>
                <h3 className="mb-4 text-[13px] font-semibold uppercase tracking-[.16em] text-sage [font-family:var(--font-sans)]">
                  The situation
                </h3>
                <div className="grid gap-4 text-[17px] leading-[1.7] text-[#1B231B]/85">
                  {caseStudy.situation.map((p) => (
                    <p key={p}>{p}</p>
                  ))}
                </div>
                <dl className="mt-9 grid grid-cols-3 gap-4 border-t border-[#1B231B]/15 pt-7">
                  {caseStudy.stats.map((stat) => (
                    <div key={stat.label}>
                      <dd className="font-display text-[clamp(44px,6vw,72px)] leading-none text-terra">
                        {stat.value}
                      </dd>
                      <dt className="mt-2 text-[13px] leading-[1.4] text-[#1B231B]/65">
                        {stat.label}
                      </dt>
                    </div>
                  ))}
                </dl>
              </Reveal>

              {/* The order it happened in */}
              <Reveal>
                <h3 className="mb-5 text-[13px] font-semibold uppercase tracking-[.16em] text-sage [font-family:var(--font-sans)]">
                  The order that worked
                </h3>
                <ol className="relative grid gap-7 pl-9">
                  <span
                    className="rail absolute bottom-2 left-[11px] top-2 w-[3px] rounded-full"
                    aria-hidden="true"
                  />
                  {caseStudy.sequence.map((item) => (
                    <li key={item.step} className="relative">
                      <span
                        className="absolute -left-9 top-1 grid h-[25px] w-[25px] place-items-center rounded-full bg-[#1B231B] text-[11px] font-bold text-cream"
                        aria-hidden="true"
                      >
                        {item.step.replace(/^0/, "")}
                      </span>
                      <h4 className="text-[24px] leading-[1.15] text-[#1B231B]">
                        {item.title}
                      </h4>
                      <p className="mt-1.5 text-[15.5px] leading-[1.65] text-[#1B231B]/78">
                        {item.body}
                      </p>
                    </li>
                  ))}
                </ol>
              </Reveal>
            </div>

            {/* What they have now */}
            <Reveal className="mt-14">
              <h3 className="mb-5 text-[13px] font-semibold uppercase tracking-[.16em] text-sage [font-family:var(--font-sans)]">
                What the firm has now
              </h3>
              <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
                {caseStudy.outcomes.map((outcome) => (
                  <div
                    key={outcome.title}
                    className="rounded-[20px] bg-ink p-6 text-cream shadow-[0_18px_40px_rgba(27,35,27,.18)] sm:p-7"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h4 className="text-[23px] leading-[1.15]">{outcome.title}</h4>
                      {outcome.status && (
                        <span
                          className={cn(
                            "rounded-full px-2.5 py-1 text-[11.5px] font-semibold uppercase tracking-[.1em]",
                            STATUS_STYLE[outcome.status] ?? "bg-cream/12 text-cream/80",
                          )}
                        >
                          {outcome.status}
                        </span>
                      )}
                    </div>
                    <p className="mt-2.5 text-[15px] leading-[1.6] text-cream/75">
                      {outcome.body}
                    </p>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal className="mt-12 flex flex-col items-start gap-4 rounded-[22px] border border-[#1B231B]/15 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
              <p className="max-w-[560px] font-display text-[clamp(22px,2.4vw,30px)] leading-[1.2]">
                Want the same order of operations at your firm?
              </p>
              <BookLink className="shrink-0 px-7 py-3.5 text-[15.5px]" arrow />
            </Reveal>
          </div>
        </section>
      )}

      {/* ---------------------------------------------------------------- */}
      {/* Principles                                                        */}
      {/* ---------------------------------------------------------------- */}
      {principles && (
        <section className="mx-auto max-w-[1200px] px-6 pt-[clamp(84px,10vw,140px)] md:px-7">
          <Reveal className="mb-10 max-w-[760px]">
            <Kicker className="text-sage-bright">{principles.kicker}</Kicker>
            <h2 className="mb-4 text-[clamp(34px,4.2vw,58px)] leading-[1.03]">
              {principles.headline}
            </h2>
            <p className="max-w-[620px] text-[17px] leading-[1.6] text-cream/72">
              {principles.body}
            </p>
          </Reveal>
          <ol className="grid grid-cols-1 gap-x-10 border-t border-cream/14 sm:grid-cols-2 lg:grid-cols-3">
            {principles.items.map((item, i) => (
              <li key={item.title} className="border-b border-cream/14 py-7">
                <Reveal>
                  <p className="font-display text-[15px] text-gold-bright">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-2 text-[25px] leading-[1.15]">{item.title}</h3>
                  <p className="mt-2.5 text-[15.5px] leading-[1.65] text-cream/72">
                    {item.body}
                  </p>
                </Reveal>
              </li>
            ))}
          </ol>
        </section>
      )}

      {/* ---------------------------------------------------------------- */}
      {/* How an engagement runs                                            */}
      {/* ---------------------------------------------------------------- */}
      <section className="mx-auto max-w-[1200px] px-6 pt-[clamp(84px,10vw,140px)] md:px-7">
        <Reveal className="mb-9 max-w-[640px]">
          <Kicker className="text-sage-bright">How an engagement runs</Kicker>
          <h2 className="text-[clamp(34px,4vw,54px)] leading-[1.05]">
            A conversation, then three steps.
          </h2>
        </Reveal>
        <div className="grid grid-cols-1 gap-3.5 md:grid-cols-3">
          {phases.map((phase, i) => (
            <Reveal
              key={phase.id}
              className="rounded-[20px] border border-cream/14 bg-ink-2 p-6 sm:p-7"
            >
              <p
                className={cn(
                  "font-display text-[15px] uppercase tracking-[.14em]",
                  ["text-gold-bright", "text-sage-bright", "text-terra-bright"][i],
                )}
              >
                Step {phase.number} &middot; {phase.kicker}
              </p>
              <h3 className="mt-2.5 text-[28px] leading-[1.1]">{phase.name}</h3>
              <ul className="mt-4 grid gap-2.5 text-[15px] leading-[1.55] text-cream/75">
                {phase.detail.map((line) => (
                  <li key={line} className="flex gap-2.5">
                    <span
                      className="mt-[9px] h-1.5 w-1.5 shrink-0 rotate-45 bg-cream/40"
                      aria-hidden="true"
                    />
                    {line}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Related tools                                                     */}
      {/* ---------------------------------------------------------------- */}
      {resources && (
        <section className="mx-auto max-w-[1200px] px-6 pt-[clamp(72px,9vw,120px)] md:px-7">
          <div className="grid grid-cols-1 gap-3.5 md:grid-cols-2">
            {resources.map((resource, i) => (
              <Reveal
                key={resource.href}
                className="relative overflow-hidden rounded-[24px] p-7 sm:p-9"
              >
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      i % 2 === 0
                        ? "linear-gradient(135deg, var(--color-terra) 0%, #A8572F 60%, var(--color-gold) 140%)"
                        : "linear-gradient(160deg, #617D5F, var(--color-sage) 60%, #46603F)",
                  }}
                  aria-hidden="true"
                />
                <div className="relative">
                  <Kicker className="text-gold-pale">Free tool</Kicker>
                  <h3 className="text-[clamp(28px,3vw,38px)] leading-[1.08]">
                    {resource.title}
                  </h3>
                  <p className="mt-3 max-w-[440px] text-[16.5px] leading-[1.6] text-cream/88">
                    {resource.body}
                  </p>
                  <Link
                    href={resource.href}
                    className="btn-cream mt-6 px-6 py-3 text-[15px]"
                  >
                    {resource.cta}
                    <span aria-hidden="true">&rarr;</span>
                  </Link>
                </div>
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {/* ---------------------------------------------------------------- */}
      {/* FAQ                                                               */}
      {/* ---------------------------------------------------------------- */}
      <section className="mx-auto max-w-[860px] px-6 pt-[clamp(84px,10vw,140px)] md:px-7">
        <Reveal className="mb-8">
          <Kicker className="text-sage-bright">Good questions</Kicker>
          <h2 className="text-[clamp(34px,4vw,54px)] leading-[1.05]">
            The things people ask first.
          </h2>
        </Reveal>
        <div className="border-t border-cream/14">
          {faqs.map((faq) => (
            <details key={faq.question} className="faq group border-b border-cream/14">
              <summary className="flex cursor-pointer list-none items-start justify-between gap-5 py-5 font-display text-[clamp(20px,2.1vw,25px)] leading-[1.25]">
                {faq.question}
                <span
                  className="mt-1 grid h-7 w-7 shrink-0 place-items-center rounded-full border border-cream/30 text-[18px] leading-none text-gold-bright transition-transform duration-300 group-open:rotate-45"
                  aria-hidden="true"
                >
                  +
                </span>
              </summary>
              <p className="max-w-[720px] pb-6 text-[16.5px] leading-[1.7] text-cream/75">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Final CTA                                                         */}
      {/* ---------------------------------------------------------------- */}
      <section
        className="relative overflow-hidden px-6 pb-[clamp(84px,11vw,150px)] pt-[clamp(90px,11vw,150px)] md:px-7"
        style={{
          background:
            "radial-gradient(ellipse 60% 70% at 50% 100%, rgba(224,174,63,.22), transparent 65%), var(--color-ink)",
        }}
      >
        <div className="relative mx-auto max-w-[820px] text-center">
          <h2 className="mb-5 text-[clamp(36px,5.2vw,70px)] leading-[1.02]">
            {finalCta.headline}
          </h2>
          <p className="mx-auto mb-[34px] max-w-[560px] text-[18px] leading-[1.6] text-cream/72">
            {finalCta.body}
          </p>
          <BookLink className="px-[38px] py-[17px] text-[16.5px]" arrow />
        </div>
      </section>
    </>
  );
}
