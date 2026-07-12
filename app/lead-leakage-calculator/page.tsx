import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { Container, Section, Eyebrow } from "@/components/ui";
import { Brain } from "@/components/brain";
import { CtaBand } from "@/components/cta-band";
import { JsonLd } from "@/components/json-ld";
import { breadcrumbSchema } from "@/lib/schema";
import { LeadLeakageCalculator } from "@/components/lead-leakage-calculator";

export const metadata: Metadata = buildMetadata({
  title: "Lead Leakage Calculator: What Slipped Inquiries Cost You",
  description:
    "A free calculator for service businesses. Enter your own numbers and see what missed replies, forgotten follow-ups, and manual handoffs cost you per year. No email required.",
  path: "/lead-leakage-calculator",
});

export default function LeadLeakageCalculatorPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Lead Leakage Calculator", path: "/lead-leakage-calculator" },
        ])}
      />

      <Section>
        <Container className="grid items-center gap-8 md:grid-cols-[1.2fr_0.8fr]">
          <div>
            <Eyebrow>Free tool</Eyebrow>
            <h1 className="text-4xl sm:text-5xl">
              What is lead leakage costing you?
            </h1>
            <p className="mt-6 text-lg text-ink/75">
              Every inquiry that gets a reply two days late, and every follow-up
              that never happens, has a price. Put in your own numbers and see
              what a year of leaks adds up to. No email required to see your
              results.
            </p>
          </div>
          <div className="hidden justify-center md:flex">
            <Brain pose="pointing" size={220} bob />
          </div>
        </Container>
      </Section>

      <Section className="pt-0">
        <Container>
          <LeadLeakageCalculator />
        </Container>
      </Section>

      <Section className="pt-0">
        <Container className="max-w-3xl">
          <h2 className="text-3xl sm:text-4xl">How the math works</h2>
          <p className="mt-5 text-ink/75">
            Nothing hidden, no industry benchmarks smuggled in. Two formulas,
            both using only what you entered:
          </p>
          <ul className="mt-6 space-y-4 text-ink/80">
            <li className="rounded-2xl border border-ink/10 bg-cream-200/50 p-5">
              <strong className="text-ink">Slipped-inquiry revenue.</strong>{" "}
              Inquiries per month &times; 12 &times; the share that slip through
              the cracks &times; your close rate &times; what a new customer is
              worth. In plain terms: the customers you would have won if every
              inquiry got a prompt reply and a real follow-up.
            </li>
            <li className="rounded-2xl border border-ink/10 bg-cream-200/50 p-5">
              <strong className="text-ink">Manual handoff hours.</strong> Hours
              per week your team spends moving information by hand &times; 52
              weeks &times; what an hour is worth to you.
            </li>
          </ul>
          <p className="mt-6 text-ink/75">
            The slip-through number is the one most owners have never measured.
            If you are not sure, start at 10 percent and adjust. Most people who
            go count discover the honest number is not zero.
          </p>
        </Container>
      </Section>

      <CtaBand
        title="The leak is an architecture problem."
        body="Automating a broken process just makes the mess move faster. We map where your inquiries actually go, fix the process first, and then decide what a system should handle. That is what the Deep Dive is for."
      />
    </>
  );
}
