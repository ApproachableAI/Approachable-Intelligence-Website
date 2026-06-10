import { cn } from "@/lib/cn";

/**
 * Readable article typography without pulling in a plugin.
 * Styles headings, paragraphs, lists, and links inside the body.
 */
export function Prose({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-none text-lg leading-relaxed text-ink/80",
        "[&>p]:mt-6",
        "[&>h2]:mt-12 [&>h2]:mb-2 [&>h2]:text-3xl [&>h2]:text-ink",
        "[&>h3]:mt-8 [&>h3]:mb-2 [&>h3]:text-2xl [&>h3]:text-ink",
        "[&>ul]:mt-5 [&>ul]:space-y-2 [&>ul]:pl-5 [&>ul>li]:list-disc",
        "[&_a]:font-semibold [&_a]:text-rust [&_a]:underline [&_a]:underline-offset-4",
        "[&_strong]:font-semibold [&_strong]:text-ink",
        "[&_blockquote]:my-8 [&_blockquote]:border-l-4 [&_blockquote]:border-mustard [&_blockquote]:pl-5 [&_blockquote]:font-display [&_blockquote]:text-2xl [&_blockquote]:text-ink",
      )}
    >
      {children}
    </div>
  );
}
