import type { Faq } from "@/lib/content";
import { Brain } from "./brain";
import { Eyebrow } from "./ui";

/**
 * FAQ built on native <details>, so every answer ships in the HTML.
 * Pair this with faqSchema() on the same page for FAQPage structured data.
 */
export function FaqList({
  faqs,
  heading = "Questions people actually ask",
  eyebrow = "FAQ",
}: {
  faqs: Faq[];
  heading?: string;
  eyebrow?: string;
}) {
  return (
    <div className="grid gap-10 md:grid-cols-[0.8fr_1.2fr]">
      <div className="md:sticky md:top-24 md:self-start">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2 className="text-3xl sm:text-4xl">{heading}</h2>
        <div className="mt-6 hidden md:block">
          <Brain pose="pointing" size={150} bob />
        </div>
      </div>

      <ul className="space-y-3">
        {faqs.map((faq) => (
          <li key={faq.question}>
            <details className="group rounded-2xl border border-ink/10 bg-cream-200/60 px-5 py-4 transition-colors open:bg-cream-200 [&_summary]:list-none">
              <summary className="flex cursor-pointer items-center justify-between gap-4 text-lg font-semibold text-ink">
                {faq.question}
                <span
                  aria-hidden="true"
                  className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-cream text-rust ring-1 ring-ink/10 transition-transform group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="mt-3 text-ink/75">{faq.answer}</p>
            </details>
          </li>
        ))}
      </ul>
    </div>
  );
}
