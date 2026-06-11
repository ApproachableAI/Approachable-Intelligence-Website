import { CtaButton } from "./cta-button";
import { Brain } from "./brain";
import { Container } from "./ui";

/** Repeatable closing call-to-action band. */
export function CtaBand({
  title = "Let's clear your plate.",
  body = "Two hours and a Deep Dive is all it takes to see where your business is leaking time. No jargon, no pressure, just a straight look at what we'd fix first.",
}: {
  title?: string;
  body?: string;
}) {
  return (
    <section className="py-16 sm:py-24">
      <Container>
        <div className="relative overflow-hidden rounded-[2rem] bg-deep px-6 py-14 text-cream sm:px-14">
          <div className="absolute -right-6 -top-8 h-40 w-40 rounded-full bg-rust/20 blur-2xl" />
          <div className="absolute -bottom-10 left-10 h-32 w-32 rounded-full bg-olive/20 blur-2xl" />
          <div className="relative flex flex-col items-center gap-8 text-center md:flex-row md:items-center md:justify-between md:text-left">
            <div className="max-w-xl">
              <h2 className="text-3xl text-cream sm:text-4xl">{title}</h2>
              <p className="mt-4 text-lg text-cream/75">{body}</p>
              <div className="mt-8 flex justify-center md:justify-start">
                <CtaButton className="group" />
              </div>
            </div>
            <Brain pose="standing" size={170} bob tone="light" className="shrink-0" />
          </div>
        </div>
      </Container>
    </section>
  );
}
