import Link from "next/link";
import { nav, site } from "@/lib/site";
import { Logo } from "./logo";
import { FormLink } from "./cta-button";

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-8 bg-ink text-cream/90">
      <div className="mx-auto w-full max-w-6xl px-5 py-14 sm:px-8">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <div className="[&_span]:text-cream [&_span_span]:text-mustard">
              <Logo tone="light" />
            </div>
            <p className="mt-4 text-cream/70">{site.tagline}</p>
            <p className="mt-3 text-sm text-cream/60">
              AI integration and automation for service businesses. Based in
              Colorado, working with {site.serviceAreas[0]} and the{" "}
              {site.serviceAreas[1]}.
            </p>
          </div>

          <nav aria-label="Footer" className="flex flex-col gap-3">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-mustard">
              Explore
            </p>
            {nav.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-cream/80 transition-colors hover:text-mustard"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex flex-col items-start gap-4">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-mustard">
              Ready when you are
            </p>
            <FormLink />
            <a
              href={`mailto:${site.email}`}
              className="text-cream/80 transition-colors hover:text-mustard"
            >
              {site.email}
            </a>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-cream/15 pt-6 text-sm text-cream/55 sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {year} {site.name}. All rights reserved.
          </p>
          <p>Made in Colorado, for businesses that still answer the phone.</p>
        </div>
      </div>
    </footer>
  );
}
