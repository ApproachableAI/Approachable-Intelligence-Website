import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { phases, painPoints, homeFaqs, founders } from "@/lib/content";
import { Container, Section, Eyebrow } from "@/components/ui";
import { CtaButton } from "@/components/cta-button";
import { Brain } from "@/components/brain";
import { FaqList } from "@/components/faq";
import { CtaBand } from "@/components/cta-band";
import { FounderAvatar } from "@/components/founder-avatar";
import { JsonLd } from "@/components/json-ld";
import { serviceSchema, faqSchema } from "@/lib/schema";

export const metadata: Metadata = buildMetadata({
  title: "AI Integration for Small Service Businesses",
  description:
    "Approachable Intelligence helps small and medium service businesses in Colorado adopt AI and automation without losing the human touch. Big Tech Energy, Small Business Soul.",
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <JsonLd data={serviceSchema()} />
      <JsonLd data={faqSchema(homeFaqs)} />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-mustard/25 blur-3xl" />
          <div className="absolute right-0 top-40 h-80 w-80 rounded-full bg-olive/20 blur-3xl" />
        </div>
        <Container className="grid items-center gap-10 py-16 sm:py-24 md:grid-cols-[1.15fr_0.85fr]">
          <div>
            <p className="ai-rise mb-5 inline-flex items-center gap-2 rounded-full bg-cream-200 px-4 py-1.5 text-sm font-semibold text-ink ring-1 ring-ink/10">
              <span className="h-2 w-2 rounded-full bg-rust" />
              Big Tech Energy. Small Business Soul.
            </p>
            <h1 className="ai-rise ai-delay-1 text-balance text-[2.6rem] leading-[1.02] sm:text-6xl">
              AI for small businesses that{" "}
              <span className="ai-underline">refuse to feel like robots</span>.
            </h1>
            <p className="ai-rise ai-delay-2 mt-6 max-w-xl text-lg text-ink/75 sm:text-xl">
              We help service businesses adopt AI and automation without losing
              the human quality that made them worth calling. We clear the
              busywork off your plate. You keep the special sauce.
            </p>
            <div className="ai-rise ai-delay-3 mt-8 flex flex-wrap items-center gap-4">
              <CtaButton className="group" />
              <Link
                href="/services"
                className="font-semibold text-ink underline-offset-4 hover:text-rust hover:underline"
              >
                See how it works
              </Link>
            </div>
            <div className="ai-rise ai-delay-4 mt-10 flex items-center gap-4">
              <div className="flex -space-x-3">
                {founders.map((f, i) => (
                  <FounderAvatar
                    key={f.name}
                    name={f.name}
                    src={f.photo}
                    size={44}
                    index={i}
                  />
                ))}
              </div>
              <p className="text-sm text-ink/70">
                Built by Ty and Jordyn in Colorado, for businesses that still
                answer the phone.
              </p>
            </div>
          </div>

          <div className="ai-pop ai-delay-2 flex justify-center md:justify-end">
            <div className="relative">
              <div className="absolute inset-0 -z-10 translate-x-3 translate-y-3 rounded-[2.5rem] bg-olive/30" />
              <div className="rounded-[2.5rem] bg-cream-200 p-8 ring-1 ring-ink/10">
                <Brain pose="walking" size={300} priority bob />
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* The junk drawer */}
      <Section className="bg-cream-200/50">
        <Container>
          <div className="ai-reveal max-w-3xl">
            <Eyebrow>The junk drawer</Eyebrow>
            <h2 className="text-3xl sm:text-4xl">
              Every growing business has a digital junk drawer.
            </h2>
            <p className="mt-5 text-lg text-ink/75">
              You know the one. The software you pay for and barely open. The
              spreadsheet only one person understands. The lead that never got a
              callback. It is digital duct tape and invisible labor, holding the
              place together and quietly eating your nights. We open that drawer
              and sort it out.
            </p>
          </div>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {painPoints.map((p) => (
              <div
                key={p.title}
                className="ai-reveal rounded-2xl border border-ink/10 bg-cream p-6"
              >
                <h3 className="text-xl">{p.title}</h3>
                <p className="mt-2 text-ink/70">{p.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Who it's for */}
      <Section>
        <Container className="grid items-center gap-10 md:grid-cols-[1fr_0.9fr]">
          <div className="ai-reveal">
            <Eyebrow>Who it&apos;s for</Eyebrow>
            <h2 className="text-3xl sm:text-4xl">
              For businesses that outgrew their systems.
            </h2>
            <p className="mt-5 text-lg text-ink/75">
              We work with small and medium service businesses where growth made
              the day messier instead of easier. If your team runs on sticky
              notes and four apps that do not talk to each other, and part of you
              worries that automating any of it will make your service feel cold,
              you are exactly who we built this for.
            </p>
            <ul className="mt-6 space-y-2 text-ink/80">
              {[
                "You are doing more volume than your systems were built for.",
                "The same information gets typed into three different places.",
                "Good leads slip through the cracks on a busy week.",
              ].map((line) => (
                <li key={line} className="flex gap-3">
                  <span aria-hidden="true" className="mt-1 text-rust">
                    &#10003;
                  </span>
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="ai-reveal flex justify-center">
            <Brain pose="leaning" size={240} bob />
          </div>
        </Container>
      </Section>

      {/* Three-phase glance */}
      <Section className="bg-ink text-cream">
        <Container>
          <div className="ai-reveal max-w-2xl">
            <Eyebrow className="text-mustard [&_span]:bg-mustard">
              How it works
            </Eyebrow>
            <h2 className="text-3xl text-cream sm:text-4xl">
              Three phases. One calmer business.
            </h2>
            <p className="mt-5 text-lg text-cream/75">
              We start by finding the leaks, then we build the fix and coach your
              team to use it, then we stick around as AI keeps changing. Here is
              the short version.
            </p>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {phases.map((phase) => (
              <div
                key={phase.id}
                className="ai-reveal flex flex-col rounded-2xl bg-cream/5 p-7 ring-1 ring-cream/10"
              >
                <span className="font-display text-5xl text-mustard">
                  {phase.number}
                </span>
                <h3 className="mt-3 text-2xl text-cream">{phase.name}</h3>
                <p className="text-sm font-semibold uppercase tracking-wide text-olive">
                  {phase.kicker}
                </p>
                <p className="mt-4 text-cream/75">{phase.answer}</p>
                <p className="mt-5 border-t border-cream/15 pt-4 text-sm text-cream/90">
                  <span className="font-semibold text-mustard">Result. </span>
                  {phase.result}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-10">
            <Link
              href="/services"
              className="font-semibold text-mustard underline-offset-4 hover:underline"
            >
              See the full process &rarr;
            </Link>
          </div>
        </Container>
      </Section>

      {/* Cold service reassurance */}
      <Section>
        <Container className="max-w-3xl text-center">
          <div className="ai-reveal">
            <Eyebrow className="justify-center">The worry we hear most</Eyebrow>
            <h2 className="text-3xl sm:text-4xl">
              Will automation make my service feel cold?
            </h2>
            <p className="mt-5 text-lg text-ink/75">
              No. Usually the opposite. We automate the parts your customers
              never see, the data entry and the reminders and the follow-ups, so
              your team gets more time for the parts they do see. The human
              moments stay human. The robot work goes to the robots.
            </p>
            <p className="mt-6 font-display text-2xl text-rust sm:text-3xl">
              &ldquo;Technology should strengthen what makes you special, not
              flatten it.&rdquo;
            </p>
          </div>
        </Container>
      </Section>

      {/* Meet the founders */}
      <Section className="bg-cream-200/50">
        <Container className="grid items-center gap-10 md:grid-cols-[0.95fr_1.05fr]">
          <div className="ai-reveal flex justify-center md:justify-start">
            <figure className="relative">
              <div className="absolute inset-0 -z-10 translate-x-3 translate-y-3 rounded-[2.5rem] bg-olive/30" />
              <Image
                src="/founders/founders.jpg"
                alt="Jordyn and Ty, founders of Approachable Intelligence, in the Colorado mountains"
                width={750}
                height={1000}
                className="h-auto w-full max-w-sm rounded-[2.5rem] object-cover ring-1 ring-ink/10"
              />
            </figure>
          </div>
          <div className="ai-reveal">
            <Eyebrow>The humans</Eyebrow>
            <h2 className="text-3xl sm:text-4xl">Hi, we&apos;re Ty and Jordyn.</h2>
            <p className="mt-5 text-lg text-ink/75">
              One of us builds the systems. One of us makes sure the people
              actually use them. We started Approachable Intelligence because we
              kept watching great local businesses get talked into cold,
              one-size-fits-all tech that made them worse at the thing they were
              great at.
            </p>
            <div className="mt-6">
              <Link
                href="/about"
                className="font-semibold text-rust underline-offset-4 hover:underline"
              >
                Meet the founders &rarr;
              </Link>
            </div>
          </div>
        </Container>
      </Section>

      {/* FAQ */}
      <Section>
        <Container>
          <div className="ai-reveal">
            <FaqList faqs={homeFaqs} />
          </div>
        </Container>
      </Section>

      <CtaBand />
    </>
  );
}
