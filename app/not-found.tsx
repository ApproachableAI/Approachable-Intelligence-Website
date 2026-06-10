import Link from "next/link";
import { Container, Section } from "@/components/ui";
import { Brain } from "@/components/brain";
import { CtaButton } from "@/components/cta-button";

export default function NotFound() {
  return (
    <Section>
      <Container className="flex flex-col items-center py-16 text-center">
        <Brain pose="leaning" size={200} bob />
        <p className="mt-6 font-display text-6xl text-rust">404</p>
        <h1 className="mt-2 text-3xl sm:text-4xl">
          This page wandered off.
        </h1>
        <p className="mt-4 max-w-md text-lg text-ink/75">
          Even a walking brain takes a wrong turn now and then. Let&apos;s get you
          back to somewhere useful.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <CtaButton label="Back home" href="/" className="group" />
          <Link
            href="/services"
            className="font-semibold text-ink underline-offset-4 hover:text-rust hover:underline"
          >
            See how it works
          </Link>
        </div>
      </Container>
    </Section>
  );
}
