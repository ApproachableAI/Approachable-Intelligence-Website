import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { phases, painPoints, servicesFaqs } from "@/lib/content";
import { Container, Section, Eyebrow } from "@/components/ui";
import { Brain } from "@/components/brain";
import { FaqList } from "@/components/faq";
import { CtaBand } from "@/components/cta-band";
import { CtaButton } from "@/components/cta-button";
import { JsonLd } from "@/components/json-ld";
import {
  serviceSchema,
  faqSchema,
  breadcrumbSchema,
} from "@/lib/schema";

export const metadata: Metadata = buildMetadata({
  title: "How It Works: Our AI Integration Process",
  description:
    "A three-phase AI integration process for service businesses: the Deep Dive blueprint, the Build with team coaching, and the Alliance for ongoing support as AI evolves.",
  path: "/services",
});

const poseFor = ["pointing", "leaning", "sitting"] as const;

export default function ServicesPage() {
  return (
    <>
      <JsonLd data={serviceSchema()} />
      <JsonLd data={faqSchema(servicesFaqs)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "How it works", path: "/services" },
        ])}
      />

      {/* Intro */}
      <Section>
        <Container className="max-w-3xl">
          <Eyebrow>How it works</Eyebrow>
          <h1 className="text-4xl sm:text-5xl">
            What an AI integration project actually involves.
          </h1>
          <p className="mt-6 text-lg text-ink/75 sm:text-xl">
            It runs in three phases. First we map where your business leaks time
            and money. Then we build the automations and coach your team to use
            them. Then we stay on as partners, refining the setup as AI and your
            business both keep changing. No mystery, no 80-page deck.
          </p>
          <div className="mt-8">
            <CtaButton className="group" />
          </div>
        </Container>
      </Section>

      {/* Phases */}
      <Section className="bg-cream-200/50 pt-4">
        <Container>
          <div className="space-y-6">
            {phases.map((phase, i) => (
              <article
                key={phase.id}
                id={phase.id}
                className="ai-reveal scroll-mt-24 rounded-[2rem] border border-ink/10 bg-cream p-7 sm:p-10"
              >
                <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-start">
                  <div>
                    <div className="flex items-baseline gap-4">
                      <span className="font-display text-5xl text-rust">
                        {phase.number}
                      </span>
                      <div>
                        <h2 className="text-3xl">{phase.name}</h2>
                        <p className="text-sm font-semibold uppercase tracking-wide text-olive-600">
                          {phase.kicker}
                        </p>
                      </div>
                    </div>
                    <p className="mt-5 max-w-2xl text-lg text-ink/75">
                      {phase.answer}
                    </p>
                    <ul className="mt-6 space-y-2 text-ink/80">
                      {phase.detail.map((d) => (
                        <li key={d} className="flex gap-3">
                          <span aria-hidden="true" className="mt-1 text-rust">
                            &#10003;
                          </span>
                          <span>{d}</span>
                        </li>
                      ))}
                    </ul>
                    <p className="mt-6 inline-block rounded-full bg-mustard px-4 py-1.5 text-sm font-semibold text-ink">
                      Result: {phase.result}
                    </p>
                  </div>
                  <div className="hidden md:block">
                    <Brain pose={poseFor[i]} size={160} bob />
                  </div>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </Section>

      {/* Pain points */}
      <Section>
        <Container>
          <div className="ai-reveal max-w-2xl">
            <Eyebrow>What we fix</Eyebrow>
            <h2 className="text-3xl sm:text-4xl">
              The messes we untangle most often.
            </h2>
            <p className="mt-5 text-lg text-ink/75">
              If a few of these sound like your Tuesday, the Deep Dive will pay
              for itself in found time.
            </p>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {painPoints.map((p) => (
              <div
                key={p.title}
                className="ai-reveal rounded-2xl border border-ink/10 bg-cream-200/50 p-6"
              >
                <h3 className="text-xl">{p.title}</h3>
                <p className="mt-2 text-ink/70">{p.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* FAQ */}
      <Section className="bg-cream-200/50">
        <Container>
          <div className="ai-reveal">
            <FaqList
              faqs={servicesFaqs}
              heading="The practical questions"
              eyebrow="Good to know"
            />
          </div>
        </Container>
      </Section>

      <CtaBand
        title="Curious what your blueprint looks like?"
        body="The Deep Dive is two hours and a hard, honest map of where your time is going. Start the conversation and we'll set it up."
      />
    </>
  );
}
