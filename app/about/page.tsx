import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { founder } from "@/lib/content";
import { site } from "@/lib/site";
import { BookLink } from "@/components/book-link";
import { Reveal } from "@/components/reveal";
import { JsonLd } from "@/components/json-ld";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = buildMetadata({
  title: "About Ty Coutts, Founder",
  description:
    "Meet Ty Coutts, founder of Approachable Intelligence. Ty builds custom AI workflows and trains the teams who use them, for engineering firms, architects, and service businesses in Colorado and beyond.",
  path: "/about",
});

const BELIEFS = [
  {
    title: "Adoption is the product",
    body: "A tool nobody opens is worth nothing. If it won’t get used, it doesn’t get built.",
  },
  {
    title: "Automate the predictable, protect the human",
    body: "Software takes the repeat work. Judgment, relationships, and the final sign-off stay with your people.",
  },
  {
    title: "Start narrow, prove fast",
    body: "One workflow, working properly on your real files, before anything gets wider.",
  },
  {
    title: "You own what gets built",
    body: "The logic lives in plain files your business controls, and it survives a change of AI vendor.",
  },
];

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ])}
      />

      <header className="hero-bg relative overflow-hidden">
        <div className="mx-auto grid grid-cols-1 max-w-[1100px] items-center gap-10 px-6 pb-[clamp(56px,7vw,100px)] pt-[clamp(52px,8vw,110px)] md:grid-cols-[minmax(0,1.2fr)_minmax(0,.8fr)] md:gap-16 md:px-7">
          <div>
            <p className="ai-rise mb-5 text-[12.5px] font-semibold uppercase tracking-[.16em] text-sage-bright">
              About
            </p>
            <h1 className="ai-rise ai-delay-1 text-[clamp(40px,5.4vw,72px)] leading-[1]">
              One person, in the room,{" "}
              <em className="italic text-gold-pale">doing the work.</em>
            </h1>
            <p className="ai-rise ai-delay-2 mt-6 max-w-[560px] text-[clamp(17px,1.4vw,20px)] leading-[1.65] text-cream/78">
              Approachable Intelligence is led by {founder.name}. There are no
              account managers and no handoffs. The person on your first call
              is the person who builds your workflows and trains your team.
            </p>
            <div className="ai-rise ai-delay-3 mt-8 flex flex-col gap-3.5 sm:flex-row sm:flex-wrap">
              <BookLink className="px-[30px] py-[15px] text-[15.5px]" arrow />
              <Link
                href="/industries/engineers-architects#case-study"
                className="btn-outline px-7 py-3.5 text-[15.5px]"
              >
                See the work
              </Link>
            </div>
          </div>
          <div className="ai-rise ai-delay-2 relative mx-auto w-[min(280px,70vw)] md:w-full md:max-w-[340px]">
            <div
              className="absolute inset-0 translate-x-3.5 translate-y-3.5 rounded-[32px] bg-gold-bright/45"
              aria-hidden="true"
            />
            <Image
              src={founder.photo}
              alt="Ty Coutts, founder of Approachable Intelligence, smiling in front of a mountain valley"
              width={360}
              height={360}
              priority
              sizes="340px"
              className="relative block aspect-square w-full rounded-[32px] object-cover"
            />
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-[1100px] px-6 pt-[clamp(64px,8vw,110px)] md:px-7">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-[minmax(0,.8fr)_minmax(0,1.2fr)] md:gap-16">
          <Reveal>
            <p className="mb-4 text-[12.5px] font-semibold uppercase tracking-[.16em] text-gold-pale">
              {founder.role}
            </p>
            <h2 className="text-[clamp(34px,4vw,52px)] leading-[1.05]">
              {founder.name}
            </h2>
            <p className="mt-3 text-[15px] text-cream/60">{founder.credentials}</p>
          </Reveal>
          <Reveal className="grid gap-4 text-[17.5px] leading-[1.7] text-cream/82">
            {founder.bio.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            <p>
              The company started from a simple frustration: good businesses
              being sold cold, one-size-fits-all technology that made them
              worse at the thing they were great at. The answer was to move
              slower at the start, learn how the work is done, and build
              around it.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-[1100px] px-6 pt-[clamp(72px,9vw,120px)] md:px-7">
        <Reveal className="mb-8 max-w-[620px]">
          <p className="mb-4 text-[12.5px] font-semibold uppercase tracking-[.16em] text-sage-bright">
            Operating principles
          </p>
          <h2 className="text-[clamp(34px,4vw,52px)] leading-[1.05]">
            What every engagement runs on.
          </h2>
        </Reveal>
        <ol className="grid grid-cols-1 gap-x-10 border-t border-cream/14 sm:grid-cols-2">
          {BELIEFS.map((belief, i) => (
            <li key={belief.title} className="border-b border-cream/14 py-7">
              <Reveal>
                <p className="font-display text-[15px] text-gold-bright">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-2 text-[26px] leading-[1.15]">{belief.title}</h3>
                <p className="mt-2.5 max-w-[440px] text-[16px] leading-[1.65] text-cream/72">
                  {belief.body}
                </p>
              </Reveal>
            </li>
          ))}
        </ol>
      </section>

      <section className="mx-auto max-w-[1100px] px-6 pb-[clamp(84px,10vw,140px)] pt-[clamp(72px,9vw,120px)] md:px-7">
        <Reveal
          className="relative overflow-hidden rounded-[28px] px-6 py-[clamp(44px,6vw,72px)] sm:px-[8%]"
        >
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(160deg, #617D5F, var(--color-sage) 60%, #46603F)",
            }}
            aria-hidden="true"
          />
          <div className="relative grid grid-cols-1 items-center gap-8 md:grid-cols-[minmax(0,1fr)_auto]">
            <div>
              <p className="mb-4 text-[12.5px] font-semibold uppercase tracking-[.16em] text-gold-pale">
                Where we work
              </p>
              <h2 className="text-[clamp(30px,3.6vw,46px)] leading-[1.06]">
                Colorado-based, and happy to travel or work remotely.
              </h2>
              <p className="mt-4 max-w-[560px] text-[17px] leading-[1.65] text-cream/88">
                In person around {site.serviceAreas[0]} and the{" "}
                {site.serviceAreas[1]}, and remote with firms anywhere.
              </p>
            </div>
            <BookLink variant="cream" className="px-8 py-4 text-[16px] !text-sage-deep" arrow />
          </div>
        </Reveal>
      </section>
    </>
  );
}
