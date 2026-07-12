import type { Metadata } from "next";
import { site } from "./site";

/**
 * Builds consistent metadata for a page: unique title + description,
 * a self-referencing canonical, and matching Open Graph + Twitter tags.
 */
export function buildMetadata(opts: {
  title: string;
  description: string;
  path: string; // e.g. "/services" or "/" for home
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
}): Metadata {
  const { title, description, path, type = "website" } = opts;
  const canonical = path === "/" ? "/" : path;
  const fullTitle =
    path === "/" ? `${site.name} | ${site.tagline}` : `${title} | ${site.name}`;

  return {
    // The root layout's title template already appends "| site name" to
    // string titles, so subpages pass the bare title to avoid doubling it.
    // The home title is absolute so the template never re-wraps it.
    title: path === "/" ? { absolute: fullTitle } : title,
    description,
    alternates: { canonical },
    openGraph: {
      title: fullTitle,
      description,
      url: canonical,
      siteName: site.name,
      locale: "en_US",
      type,
      ...(type === "article"
        ? {
            publishedTime: opts.publishedTime,
            modifiedTime: opts.modifiedTime,
            authors: opts.authors,
          }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
    },
  };
}
