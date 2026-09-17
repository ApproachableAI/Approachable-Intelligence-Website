import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";
import { founders } from "@/lib/content";
import { Container, Section, Eyebrow } from "@/components/ui";
import { FounderAvatar } from "@/components/founder-avatar";
import { FormLink } from "@/components/cta-button";
import { JsonLd } from "@/components/json-ld";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = buildMetadata({
  title: "Contact: Start the Conversation",
  description:
    "Start the conversation with Approachable Intelligence. Tell us about your service business and where it leaks time, and we'll map your AI Deep Dive.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ])}
      />

      <Section>
        <Container className="grid gap-12 md:grid-cols-[0.85fr_1.15fr]">
          {/* Pitch + trust signals */}
          <div>
            <Eyebrow>Start the conversation</Eyebrow>
            <h1 className="text-4xl sm:text-5xl">
              Tell us where it hurts. We&apos;ll find the fix.
            </h1>
            <p className="mt-6 text-lg text-ink/75">
              No long form, no sales gauntlet. Share a little about your business
              and the busywork eating your nights. We read every one of these,
              and we&apos;ll get back to you to set up your Deep Dive.
            </p>

            <div className="mt-10 flex items-center gap-4">
              <div className="flex -space-x-3">
                {founders.map((f, i) => (
                  <FounderAvatar
                    key={f.name}
                    name={f.name}
                    src={f.photo}
                    size={52}
                    index={i}
                  />
                ))}
              </div>
              <p className="text-sm text-ink/70">
                You&apos;ll be talking to Ty and Jordyn directly.
              </p>
            </div>

            <dl className="mt-8 space-y-4 text-ink/80">
              <div>
                <dt className="text-sm font-semibold uppercase tracking-wide text-rust">
                  Service area
                </dt>
                <dd>
                  Colorado, around {site.serviceAreas[0]} and the{" "}
                  {site.serviceAreas[1]}. Remote too.
                </dd>
              </div>
              <div>
                <dt className="text-sm font-semibold uppercase tracking-wide text-rust">
                  Email
                </dt>
                <dd>
                  <a
                    href={`mailto:${site.email}`}
                    className="font-semibold text-ink underline underline-offset-4 hover:text-rust"
                  >
                    {site.email}
                  </a>
                </dd>
              </div>
            </dl>
          </div>

          {/* The intake form */}
          <div className="rounded-[2rem] border border-ink/10 bg-cream-200/50 p-3 sm:p-5">
            <iframe
              src={site.formUrl}
              title="Start the conversation with Approachable Intelligence"
              loading="lazy"
              className="h-[640px] w-full rounded-2xl bg-cream"
            />
            <noscript>
              <p className="p-4 text-center text-ink/70">
                The form needs JavaScript.{" "}
                <a href={site.formUrl} className="font-semibold text-rust underline">
                  Open it in a new tab instead.
                </a>
              </p>
            </noscript>
            <div className="mt-3 text-center">
              <FormLink className="w-full sm:w-auto" />
              <p className="mt-2 text-xs text-ink/55">
                Trouble with the form? The button opens it directly.
              </p>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
