import type { Metadata } from "next";
import Image from "next/image";
import { buildMetadata } from "@/lib/seo";
import { founders } from "@/lib/content";
import { site } from "@/lib/site";
import { Container, Section, Eyebrow } from "@/components/ui";
import { FounderAvatar } from "@/components/founder-avatar";
import { CtaBand } from "@/components/cta-band";
import { JsonLd } from "@/components/json-ld";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = buildMetadata({
  title: "About Ty and Jordyn, Colorado AI Consultants",
  description:
    "Meet Ty and Jordyn, the founders of Approachable Intelligence. We help Colorado service businesses adopt AI and automation while keeping their work human.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ])}
      />

      {/* Founders' message */}
      <Section>
        <Container className="grid items-center gap-10 md:grid-cols-[1.1fr_0.9fr]">
          <div>
            <Eyebrow>Our story</Eyebrow>
            <h1 className="text-4xl sm:text-5xl">
              We think technology should strengthen what makes you special.
            </h1>
            <p className="mt-6 text-lg text-ink/75">
              We started Approachable Intelligence after watching too many good
              local businesses get sold cold, one-size-fits-all tech. It made
              them worse at the very thing they were great at. We knew there was
              a kinder way to do this.
            </p>
            <p className="mt-4 text-lg text-ink/75">
              Our whole approach is helping people and systems adapt together. We
              bring the big-tech capability. You keep the small-business soul.
              When both move at the same pace, the tools get used and the warmth
              stays put.
            </p>
          </div>
          <div className="flex justify-center">
            <figure className="relative">
              <div className="absolute inset-0 -z-10 translate-x-3 translate-y-3 rounded-[2.5rem] bg-mustard/40" />
              <Image
                src="/founders/founders.jpg"
                alt="Jordyn and Ty, founders of Approachable Intelligence, sitting on a ridge in the Colorado mountains"
                width={750}
                height={1000}
                priority
                className="h-auto w-full max-w-sm rounded-[2.5rem] object-cover ring-1 ring-ink/10"
              />
              <figcaption className="mt-3 text-center text-sm text-ink/55">
                Jordyn and Ty, getting some air away from the screens.
              </figcaption>
            </figure>
          </div>
        </Container>
      </Section>

      {/* Founder bios */}
      <Section className="bg-cream-200/50">
        <Container>
          <Eyebrow>The founders</Eyebrow>
          <h2 className="text-3xl sm:text-4xl">Two people, one promise.</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {founders.map((f, i) => (
              <article
                key={f.name}
                className="ai-reveal rounded-[2rem] border border-ink/10 bg-cream p-7 sm:p-9"
              >
                <div className="flex items-center gap-5">
                  <FounderAvatar name={f.name} src={f.photo} size={96} index={i} />
                  <div>
                    <h3 className="text-2xl">{f.name}</h3>
                    <p className="text-sm font-semibold uppercase tracking-wide text-rust">
                      {f.role}
                    </p>
                    <p className="text-sm text-ink/60">{f.credentials}</p>
                  </div>
                </div>
                <div className="mt-5 space-y-3 text-ink/75">
                  {f.bio.map((para) => (
                    <p key={para}>{para}</p>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </Container>
      </Section>

      {/* Service area */}
      <Section>
        <Container className="max-w-3xl text-center">
          <Eyebrow className="justify-center">Where we work</Eyebrow>
          <h2 className="text-3xl sm:text-4xl">Proudly Colorado-based.</h2>
          <p className="mt-5 text-lg text-ink/75">
            We are based in Colorado and love working with businesses around{" "}
            {site.serviceAreas[0]} and the {site.serviceAreas[1]} in person. We
            also partner with service businesses remotely, so if you are a little
            further out, the conversation is still very much open.
          </p>
        </Container>
      </Section>

      <CtaBand
        title="Let's build something that still feels like you."
        body="Tell us about your business and the parts that keep eating your evenings. We'll take it from there."
      />
    </>
  );
}
