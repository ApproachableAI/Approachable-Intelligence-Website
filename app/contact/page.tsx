import type { Metadata } from "next";
import Image from "next/image";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";
import { BookLink } from "@/components/book-link";
import { JsonLd } from "@/components/json-ld";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = buildMetadata({
  title: "Contact: Book a Call",
  description:
    "Book a 30-minute call with Ty Coutts at Approachable Intelligence. Bring the task you would love to never do again and find out whether AI can take it off your plate.",
  path: "/contact",
});

const EXPECT = [
  "You describe the task or the mess, in your own words.",
  "Ty asks how the work gets done today and who touches it.",
  "You leave with an honest read on whether AI can help, and a sensible first step.",
];

export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ])}
      />

      <section className="hero-bg relative overflow-hidden">
        <div className="mx-auto grid grid-cols-1 max-w-[1100px] gap-10 px-6 pb-[clamp(72px,9vw,130px)] pt-[clamp(52px,8vw,110px)] md:grid-cols-[minmax(0,1.1fr)_minmax(0,.9fr)] md:gap-14 md:px-7">
          <div>
            <p className="ai-rise mb-5 text-[12.5px] font-semibold uppercase tracking-[.16em] text-sage-bright">
              Contact
            </p>
            <h1 className="ai-rise ai-delay-1 text-[clamp(40px,5.4vw,72px)] leading-[1]">
              Thirty minutes.{" "}
              <em className="italic text-gold-pale">One honest answer.</em>
            </h1>
            <p className="ai-rise ai-delay-2 mt-6 max-w-[540px] text-[clamp(17px,1.4vw,20px)] leading-[1.65] text-cream/78">
              Bring the task you would love to never do again. You will find
              out whether a workflow can carry it and what getting there would
              involve.
            </p>
            <div className="ai-rise ai-delay-3 mt-8 flex flex-col gap-3.5 sm:flex-row sm:flex-wrap sm:items-center">
              <BookLink className="px-[34px] py-[17px] text-[16.5px]" arrow>
                Pick a time on Calendly
              </BookLink>
            </div>
            <p className="ai-rise ai-delay-3 mt-7 text-[15.5px] text-cream/70">
              Prefer email?{" "}
              <a
                href={`mailto:${site.email}`}
                className="break-all font-semibold text-cream underline decoration-gold-bright decoration-2 underline-offset-4"
              >
                {site.email}
              </a>
            </p>
          </div>

          <div className="ai-rise ai-delay-2 rounded-[24px] border border-cream/14 bg-ink-2 p-6 sm:p-8">
            <div className="flex items-center gap-4">
              <Image
                src={site.founder.photo}
                alt="Ty Coutts"
                width={72}
                height={72}
                className="h-[72px] w-[72px] rounded-full object-cover ring-2 ring-gold-bright/70"
              />
              <div>
                <p className="font-display text-[24px] leading-none">
                  {site.founder.name}
                </p>
                <p className="mt-1.5 text-[14px] text-cream/60">
                  Founder. You will be talking to Ty directly.
                </p>
              </div>
            </div>
            <p className="mb-4 mt-8 text-[12.5px] font-semibold uppercase tracking-[.16em] text-gold-pale">
              What happens on the call
            </p>
            <ol className="grid gap-4">
              {EXPECT.map((line, i) => (
                <li key={line} className="flex gap-3.5 text-[16px] leading-[1.55] text-cream/82">
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-sage-bright text-[13px] font-bold text-[#1B231B]">
                    {i + 1}
                  </span>
                  {line}
                </li>
              ))}
            </ol>
            <dl className="mt-8 border-t border-cream/12 pt-6 text-[15px]">
              <dt className="text-[12.5px] font-semibold uppercase tracking-[.16em] text-cream/50">
                Service area
              </dt>
              <dd className="mt-1.5 text-cream/80">
                Colorado, around {site.serviceAreas[0]} and the{" "}
                {site.serviceAreas[1]}. Remote everywhere else.
              </dd>
            </dl>
          </div>
        </div>
      </section>
    </>
  );
}
