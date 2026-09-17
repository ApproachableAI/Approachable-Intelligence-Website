import Image from "next/image";
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";
import { skills, type SkillAccent } from "@/lib/skills";
import { CopySkillButton } from "@/components/copy-skill";
import { Reveal } from "@/components/reveal";
import { cn } from "@/lib/cn";

export const metadata: Metadata = buildMetadata({
  title: "The Skills Library — Free AI Skills",
  description:
    "Free copy-paste AI skills from Approachable Intelligence: the Humanizer, Done for the Day, and Save Template. Teach Claude (or any LLM) how you like to work — no email needed.",
  path: "/skills-library",
});

const HOW_TO = [
  {
    number: "1",
    color: "text-gold-bright",
    title: "Copy a skill",
    body: "Hit the copy button under any skill below. The whole thing lands on your clipboard.",
  },
  {
    number: "2",
    color: "text-sage-bright",
    title: "Paste it into your AI",
    body: "Into a Claude chat, a Claude Project’s instructions, or ChatGPT’s custom instructions — anywhere it can read.",
  },
  {
    number: "3",
    color: "text-terra-bright",
    title: "Say the magic words",
    body: "Each skill tells the AI when to activate — “humanize this,” “done for the day” — and it just works.",
  },
];

const ACCENT_TEXT: Record<SkillAccent, string> = {
  gold: "text-gold-bright",
  sage: "text-sage-bright",
  terra: "text-terra-bright",
};

/* Bold the /save-template command inside the Save Template intro. */
function Intro({ text }: { text: string }) {
  const phrase = "/save-template";
  const at = text.indexOf(phrase);
  if (at < 0) return <>{text}</>;
  return (
    <>
      {text.slice(0, at)}
      <strong className="text-cream">{phrase}</strong>
      {text.slice(at + phrase.length)}
    </>
  );
}

export default function SkillsLibraryPage() {
  return (
    <>
      {/* Library header */}
      <header
        className="relative overflow-hidden"
        style={{
          background:
            "radial-gradient(ellipse 50% 60% at 80% 30%, rgba(172,124,24,.28), transparent 60%), radial-gradient(ellipse 40% 50% at 10% 100%, rgba(80,106,79,.4), transparent 60%), var(--color-ink)",
        }}
      >
        <div className="mx-auto grid max-w-[1200px] grid-cols-[repeat(auto-fit,minmax(300px,1fr))] items-center gap-12 px-7 pb-[60px] pt-[clamp(70px,9vw,120px)]">
          <div>
            <p className="ai-rise-fast mb-[18px] text-[12.5px] font-semibold uppercase tracking-[.16em] text-gold-bright">
              Free &middot; no email needed
            </p>
            <h1 className="ai-rise-fast ai-delay-1 mb-[22px] text-[clamp(44px,5.6vw,76px)] leading-[.98]">
              The Skills <em className="italic text-gold-pale">Library.</em>
            </h1>
            <p className="ai-rise-fast ai-delay-2 max-w-[560px] text-[18px] leading-[1.65] text-cream/72">
              A <strong className="text-cream">skill</strong> is a reusable set
              of instructions that teaches your AI how you like to work &mdash;
              so you stop re-explaining yourself every morning. These are three
              from our own shelf. Copy them, paste them into Claude (or any
              LLM), and keep them forever.
            </p>
            <div className="ai-rise-fast ai-delay-3 mt-[30px] flex flex-wrap gap-3.5">
              <a href="#skill-1" className="btn-gold px-7 py-3.5 text-[15px]">
                Start with the Humanizer
              </a>
              <a
                href="#full-library"
                className="btn-outline px-[26px] py-[13px] text-[15px]"
              >
                Get the full library
              </a>
            </div>
          </div>
          <div className="grid place-items-center">
            <div className="disc aspect-square w-[min(340px,100%)] shadow-[0_0_0_1px_rgba(224,174,63,.4),0_0_110px_rgba(224,174,63,.22)]">
              <Image
                src="/mascot/brain-pointing.png"
                alt="Friendly cartoon brain pointing the way"
                width={300}
                height={297}
                priority
                sizes="340px"
                className="h-auto w-[78%]"
              />
            </div>
          </div>
        </div>
      </header>

      {/* How to use */}
      <section className="mx-auto max-w-[1200px] px-7 pb-[50px] pt-2.5">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-3.5">
          {HOW_TO.map((step) => (
            <div
              key={step.number}
              className="grid gap-2 rounded-[18px] border border-cream/14 bg-ink-2 p-[26px]"
            >
              <p className={cn("font-display text-[30px]", step.color)}>
                {step.number}
              </p>
              <h3 className="text-[21px]">{step.title}</h3>
              <p className="text-[14.5px] leading-[1.6] text-cream/72">
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
          className={cn(
            "mx-auto max-w-[980px] scroll-mt-[90px] px-7",
            i === 0 ? "py-[30px]" : "pb-[30px] pt-2.5",
          )}
        >
          <div
            className={cn(
              "rounded-[22px] p-[clamp(26px,4vw,40px)]",
              skill.accent === "sage"
                ? "border border-cream/20 shadow-[0_30px_70px_rgba(20,30,20,.35)]"
                : "border border-cream/14 bg-ink-2",
            )}
            style={
              skill.accent === "sage"
                ? {
                    background:
                      "linear-gradient(160deg, #617D5F, var(--color-sage) 60%, #46603F)",
                  }
                : undefined
            }
          >
            <div className="mb-2 flex flex-wrap items-baseline justify-between gap-3">
              <h2 className="text-[clamp(30px,3.2vw,40px)]">{skill.name}</h2>
              <span
                className={cn(
                  "text-[12px] font-semibold uppercase tracking-[.14em]",
                  ACCENT_TEXT[skill.accent],
                )}
              >
                {skill.number}
              </span>
            </div>
            <p className="mb-[22px] mt-2 max-w-[640px] text-[16px] leading-[1.6] text-cream/72">
              <Intro text={skill.intro} />
            </p>
            <pre className="mb-[18px] max-h-[380px] overflow-auto whitespace-pre-wrap rounded-[14px] border border-cream/14 bg-ink px-[26px] py-6 font-mono text-[12.5px] leading-[1.6] text-[#DDE5D6]">
              {skill.text}
            </pre>
            <CopySkillButton text={skill.text} />
          </div>
        </section>
      ))}

      {/* Full library CTA */}
      <section
        id="full-library"
        className="mx-auto mt-[60px] max-w-[1240px] scroll-mt-[90px] px-5 pb-[90px]"
      >
        <div
          className="relative grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] items-center gap-10 overflow-visible rounded-[28px] px-[8%] py-[clamp(48px,6vw,80px)]"
          style={{
            background:
              "linear-gradient(135deg, var(--color-terra) 0%, #A8572F 55%, var(--color-gold) 130%)",
          }}
        >
          <Reveal
            variant="peek"
            className="absolute -top-14 right-[8%] grid h-28 w-28 place-items-center rounded-full bg-cream shadow-[0_12px_30px_rgba(43,59,44,.4)]"
            aria-hidden="true"
          >
            <Image
              src="/mascot/brain-standing.png"
              alt=""
              width={84}
              height={86}
              className="h-[86px] w-auto"
            />
          </Reveal>
          <div>
            <h2 className="mb-4 text-[clamp(34px,4vw,54px)] leading-[1.05]">
              These three are just the top shelf.
            </h2>
            <p className="max-w-[600px] text-[17.5px] leading-[1.65] text-cream/88">
              The full Approachable Intelligence Skills Library is what we hand
              our clients &mdash; skills for proposals, follow-ups, meeting
              notes, marketing, and the busy work in between. It&rsquo;s free
              too. Just tell us where to send it.
            </p>
          </div>
          <div className="grid justify-items-start gap-3.5">
            <a
              href={site.formUrl}
              className="btn-cream px-8 py-4 text-[16px]"
            >
              Get the full library &mdash; free
            </a>
            <span className="text-[13.5px] text-cream/75">
              Name and email. That&rsquo;s it &mdash; no spam, ever.
            </span>
          </div>
        </div>
      </section>
    </>
  );
}
