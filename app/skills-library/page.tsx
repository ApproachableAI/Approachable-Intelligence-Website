import Image from "next/image";
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";
import { skills } from "@/lib/skills";
import { Brain } from "@/components/brain";
import { CopySkillButton } from "@/components/copy-skill";

export const metadata: Metadata = buildMetadata({
  title: "The Skills Library — Free AI Skills",
  description:
    "Free copy-paste AI skills from Approachable Intelligence: the Humanizer, Done for the Day, and Prompt Foundations. Teach Claude (or any LLM) how you like to work — no email needed.",
  path: "/skills-library",
});

const HOW_TO = [
  {
    number: "1",
    color: "text-gold",
    title: "Copy a skill",
    body: "Hit the copy button under any skill below. The whole thing lands on your clipboard.",
  },
  {
    number: "2",
    color: "text-sage",
    title: "Paste it into your AI",
    body: "Into a Claude chat, a Claude Project’s instructions, or ChatGPT’s custom instructions — anywhere it can read.",
  },
  {
    number: "3",
    color: "text-rust",
    title: "Say the magic words",
    body: "Each skill tells the AI when to activate — “humanize this,” “done for the day” — and it just works.",
  },
];

/* Card + tag treatments per skill, in order. */
const CARD_STYLES = [
  { card: "bg-card shadow-sm", tag: "bg-sage-200 text-sage-800" },
  { card: "bg-sage-100", tag: "bg-gold-200 text-gold-700" },
  { card: "bg-gold-100", tag: "bg-rust-200 text-rust-700" },
];

export default function SkillsLibraryPage() {
  return (
    <>
      {/* Library header */}
      <header className="mx-auto flex max-w-[1160px] flex-wrap items-center gap-11 px-7 pb-[30px] pt-[60px]">
        <div className="min-w-[300px] flex-[1_1_500px]">
          <span className="ai-rise inline-block rounded-full bg-gold-200 px-3.5 py-1.5 text-xs font-semibold text-gold-700">
            Free &middot; no email needed
          </span>
          <h1 className="ai-rise ai-delay-1 mb-4 mt-[18px] text-[clamp(38px,4.8vw,54px)] leading-[1.08]">
            The Skills Library
          </h1>
          <p className="ai-rise ai-delay-2 max-w-[560px] text-lg leading-[1.65] text-ink/82">
            A <strong>skill</strong>{" "}
            is a reusable set of instructions that
            teaches your AI how you like to work &mdash; so you stop
            re-explaining yourself every morning. These are three from our own
            shelf. Copy them, paste them into Claude (or any LLM), and keep
            them forever.
          </p>
          <div className="ai-rise ai-delay-3 mt-6 flex flex-wrap gap-3.5">
            <a
              href="#skill-humanizer"
              className="inline-flex items-center justify-center rounded-full bg-rust px-6 py-3 text-[15px] font-semibold text-cream transition-colors hover:bg-rust-600 active:bg-rust-700"
            >
              Start with the Humanizer
            </a>
            <a
              href="#full-library"
              className="inline-flex items-center justify-center rounded-full px-6 py-3 text-[15px] font-semibold text-ink ring-2 ring-inset ring-ink/15 transition-all hover:ring-ink/40"
            >
              Get the full library
            </a>
          </div>
        </div>
        <div className="relative mx-auto min-w-[270px] flex-[0_1_340px]">
          <div
            className="absolute left-1/2 top-[52%] h-[290px] w-[290px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-sage-200"
            aria-hidden="true"
          />
          <Brain
            pose="pointing"
            size={300}
            priority
            className="ai-rise ai-delay-1 ai-bob-slow relative mx-auto block w-[min(300px,100%)]"
          />
          <p
            className="absolute -right-1 -top-6 rotate-[4deg] font-display text-[15px] text-sage-700"
            aria-hidden="true"
          >
            the librarian is in
          </p>
        </div>
      </header>

      {/* How to use */}
      <section className="mx-auto max-w-[1160px] px-7 pb-10 pt-5">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-[18px]">
          {HOW_TO.map((step) => (
            <div
              key={step.number}
              className="flex flex-col gap-2 rounded-[26px] bg-neutral-100 p-6 shadow-sm"
            >
              <p className={`font-display text-[26px] ${step.color}`}>
                {step.number}
              </p>
              <h3 className="text-[19px]">{step.title}</h3>
              <p className="text-[14.5px] leading-[1.55] text-ink/75">
                {step.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* The three skills */}
      {skills.map((skill, i) => (
        <section
          key={skill.id}
          id={skill.id}
          className={`mx-auto max-w-[960px] scroll-mt-[90px] px-7 ${
            i === 0 ? "py-9" : "pb-9 pt-2.5"
          }`}
        >
          <div className={`rounded-[34px] p-[38px] ${CARD_STYLES[i].card}`}>
            <div className="mb-1.5 flex flex-wrap items-baseline gap-3">
              <span
                className={`rounded-full px-3 py-[5px] text-[11.5px] font-semibold ${CARD_STYLES[i].tag}`}
              >
                {skill.number}
              </span>
              <h2 className="text-[30px]">{skill.name}</h2>
            </div>
            <p className="mb-[22px] mt-2.5 max-w-[640px] text-base leading-relaxed text-ink/78">
              {skill.intro}
            </p>
            <pre className="mb-[18px] max-h-[380px] overflow-auto whitespace-pre-wrap rounded-[20px] bg-sage-900 px-[26px] py-6 font-mono text-[12.5px] leading-[1.6] text-[#E9EFE4]">
              {skill.text}
            </pre>
            <CopySkillButton text={skill.text} />
          </div>
        </section>
      ))}

      {/* Full library CTA */}
      <section
        id="full-library"
        className="mx-auto mt-10 max-w-[1240px] scroll-mt-[90px] px-5 pb-[90px]"
      >
        <div className="relative flex flex-wrap items-center gap-10 rounded-[40px] bg-sage px-[8%] py-[70px] text-cream">
          <Image
            src="/mascot/brain-standing.png"
            alt=""
            aria-hidden="true"
            width={94}
            height={94}
            className="absolute -top-[70px] right-[10%] h-[94px] w-auto"
          />
          <div className="min-w-[300px] flex-[1_1_480px]">
            <h2 className="mb-4 text-[clamp(30px,3.8vw,44px)] leading-[1.12] text-cream">
              These three are just the top shelf.
            </h2>
            <p className="mb-[26px] max-w-[600px] text-[17.5px] leading-[1.65] text-cream/87">
              The full Approachable Intelligence Skills Library is what we hand
              our clients &mdash; skills for proposals, follow-ups, meeting
              notes, marketing, and the busy work in between. It&rsquo;s free
              too. Just tell us where to send it.
            </p>
            <div className="flex flex-wrap items-center gap-[18px]">
              <a
                href={site.formUrl}
                className="inline-flex items-center justify-center rounded-full bg-cream px-[30px] py-3.5 text-base font-semibold text-rust transition-colors hover:bg-white active:bg-gold-200"
              >
                Get the full library &mdash; free
              </a>
              <span className="text-[13.5px] text-sage-300">
                Name and email. That&rsquo;s it &mdash; no spam, ever.
              </span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
