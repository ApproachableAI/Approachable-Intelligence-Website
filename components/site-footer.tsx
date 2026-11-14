import Link from "next/link";
import Image from "next/image";
import { site, footerNav } from "@/lib/site";
import { BookLink } from "./book-link";

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-cream/14 bg-ink px-6 pb-10 pt-14 sm:px-7">
      <div className="mx-auto grid grid-cols-1 w-full max-w-[1200px] gap-12 lg:grid-cols-[1.2fr_2fr]">
        <div>
          <div className="flex items-center gap-4">
            <Image
              src="/brand/logo-circle.png"
              alt="Approachable Intelligence circular logo"
              width={64}
              height={64}
              className="h-16 w-16 rounded-full"
            />
            <div>
              <p className="font-display text-[19px]">{site.name}, LLC</p>
              <p className="mt-1 text-[13.5px] text-cream/55">{site.tagline}</p>
            </div>
          </div>
          <p className="mt-6 max-w-[360px] text-[14.5px] leading-[1.6] text-cream/65">
            Custom AI workflows, guardrails, and training. Based in Colorado,
            working with firms everywhere.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3">
            <BookLink className="px-5 py-2.5 text-[14px]" arrow />
            <a
              href={`mailto:${site.email}`}
              className="break-all text-[14px] text-cream/72 underline decoration-cream/25 underline-offset-4 transition-colors hover:text-cream"
            >
              {site.email}
            </a>
          </div>
        </div>

        <nav
          aria-label="Footer"
          className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3"
        >
          {footerNav.map((group) => (
            <div key={group.heading}>
              <p className="mb-4 text-[12px] font-semibold uppercase tracking-[.16em] text-sage-bright">
                {group.heading}
              </p>
              <ul className="grid gap-3 text-[14.5px]">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-cream/72 no-underline transition-colors hover:text-cream"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>
      <p className="mx-auto mt-12 max-w-[1200px] border-t border-cream/10 pt-6 text-[12.5px] text-cream/50">
        &copy; {year} {site.name}, LLC. All rights reserved.
      </p>
    </footer>
  );
}
