import Link from "next/link";
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { posts, formatDate } from "@/lib/posts";
import { Container, Section, Eyebrow } from "@/components/ui";
import { Brain } from "@/components/brain";
import { CtaBand } from "@/components/cta-band";
import { JsonLd } from "@/components/json-ld";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = buildMetadata({
  title: "Resources: AI for Service Businesses, in Plain Language",
  description:
    "Plain-language guides on AI integration and automation for small service businesses, from the founders of Approachable Intelligence.",
  path: "/resources",
});

export default function ResourcesPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Resources", path: "/resources" },
        ])}
      />

      <Section>
        <Container className="grid items-center gap-8 md:grid-cols-[1.2fr_0.8fr]">
          <div>
            <Eyebrow>Resources</Eyebrow>
            <h1 className="text-4xl sm:text-5xl">
              AI for service businesses, in plain language.
            </h1>
            <p className="mt-6 text-lg text-ink/75">
              No jargon, no hype. Just honest answers to the questions service
              business owners actually ask us about AI, automation, and keeping
              the work human. We add to this as we go.
            </p>
          </div>
          <div className="hidden justify-center md:flex">
            <Brain pose="sitting" size={220} bob />
          </div>
        </Container>
      </Section>

      <Section className="pt-0">
        <Container>
          <Link
            href="/lead-leakage-calculator"
            className="group mb-6 flex flex-col gap-2 rounded-[2rem] bg-deep p-7 text-cream transition-transform hover:-translate-y-0.5 sm:p-9"
          >
            <span className="text-xs font-semibold uppercase tracking-wide text-chartreuse">
              Free tool
            </span>
            <span className="font-display text-2xl font-semibold sm:text-3xl">
              Lead Leakage Calculator
            </span>
            <span className="text-cream/75">
              Put in your own numbers and see what missed replies, forgotten
              follow-ups, and manual handoffs cost you per year. No email
              required.
            </span>
            <span className="mt-2 font-semibold text-mustard">
              Run your numbers &rarr;
            </span>
          </Link>
          <ul className="grid gap-6 md:grid-cols-2">
            {posts.map((post) => (
              <li key={post.slug}>
                <Link
                  href={`/resources/${post.slug}`}
                  className="group flex h-full flex-col rounded-[2rem] border border-ink/10 bg-cream-200/50 p-7 transition-colors hover:bg-cream-200 sm:p-9"
                >
                  <div className="flex flex-wrap gap-2">
                    {post.tags.slice(0, 2).map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-cream px-3 py-1 text-xs font-semibold text-ink/70 ring-1 ring-ink/10"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h2 className="mt-4 text-2xl text-ink group-hover:text-rust sm:text-3xl">
                    {post.title}
                  </h2>
                  <p className="mt-3 flex-1 text-ink/70">{post.excerpt}</p>
                  <p className="mt-6 text-sm text-ink/55">
                    By {post.authors.join(" and ")} &middot;{" "}
                    {formatDate(post.dateUpdated)} &middot; {post.readingMinutes}{" "}
                    min read
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <CtaBand />
    </>
  );
}
