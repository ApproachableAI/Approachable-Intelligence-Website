import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { buildMetadata } from "@/lib/seo";
import { posts, getPost, formatDate } from "@/lib/posts";
import { Container, Section } from "@/components/ui";
import { Prose } from "@/components/prose";
import { CtaBand } from "@/components/cta-band";
import { FounderAvatar } from "@/components/founder-avatar";
import { JsonLd } from "@/components/json-ld";
import { blogPostingSchema, breadcrumbSchema } from "@/lib/schema";

// Pre-render every post at build time.
export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return buildMetadata({
    title: post.title,
    description: post.description,
    path: `/resources/${post.slug}`,
    type: "article",
    publishedTime: post.datePublished,
    modifiedTime: post.dateUpdated,
    authors: post.authors,
  });
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const { Body } = post;

  return (
    <>
      <JsonLd data={blogPostingSchema({ ...post, dateModified: post.dateUpdated })} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Resources", path: "/resources" },
          { name: post.title, path: `/resources/${post.slug}` },
        ])}
      />

      <Section>
        <Container className="max-w-3xl">
          <Link
            href="/resources"
            className="text-sm font-semibold text-rust underline-offset-4 hover:underline"
          >
            &larr; All resources
          </Link>

          <div className="mt-6 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-cream-200 px-3 py-1 text-xs font-semibold text-ink/70 ring-1 ring-ink/10"
              >
                {tag}
              </span>
            ))}
          </div>

          <h1 className="mt-4 text-balance text-4xl leading-[1.05] sm:text-5xl">
            {post.title}
          </h1>

          {/* Author attribution + last updated (E-E-A-T signals) */}
          <div className="mt-6 flex items-center gap-3 border-y border-ink/10 py-4">
            <div className="flex -space-x-2">
              {post.authors.map((name, i) => (
                <FounderAvatar
                  key={name}
                  name={name}
                  src={`/founders/${name.toLowerCase()}.jpg`}
                  size={40}
                  index={i}
                />
              ))}
            </div>
            <div className="text-sm text-ink/70">
              <p className="font-semibold text-ink">
                {post.authors.join(" and ")}
              </p>
              <p>
                Last updated {formatDate(post.dateUpdated)} &middot;{" "}
                {post.readingMinutes} min read
              </p>
            </div>
          </div>

          <article className="mt-8">
            <Prose>
              <Body />
            </Prose>
          </article>
        </Container>
      </Section>

      <CtaBand />
    </>
  );
}
