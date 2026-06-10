import type { ComponentType } from "react";
import {
  meta as coldServiceMeta,
  Body as ColdServiceBody,
} from "@/content/posts/ai-without-cold-service";

/**
 * Blog / Resources registry.
 *
 * To add a post: copy the file in /content/posts, edit its `meta` and body,
 * then import it here and add it to the `posts` array. Newest first.
 */
export type PostMeta = {
  slug: string;
  title: string;
  description: string;
  excerpt: string;
  datePublished: string; // ISO date, e.g. "2026-06-10"
  dateUpdated: string;
  authors: string[];
  tags: string[];
  readingMinutes: number;
};

export type Post = PostMeta & { Body: ComponentType };

export const posts: Post[] = [
  { ...coldServiceMeta, Body: ColdServiceBody },
];

export function getPost(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}

export function formatDate(iso: string): string {
  return new Date(`${iso}T00:00:00`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
