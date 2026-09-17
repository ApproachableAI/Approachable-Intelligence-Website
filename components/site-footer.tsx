import Link from "next/link";
import Image from "next/image";
import { site, footerNav } from "@/lib/site";

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-cream/14 bg-ink px-5 pb-10 pt-11 sm:px-7">
      <div className="mx-auto flex w-full max-w-[1200px] flex-wrap items-center justify-between gap-8">
        <div className="flex items-center gap-4">
          <Image
            src="/brand/logo-circle.png"
            alt="Approachable Intelligence circular logo"
            width={64}
            height={64}
            className="h-16 w-16 rounded-full"
          />
          <div>
            <p className="font-display text-[18px]">{site.name}, LLC</p>
            <p className="mt-1 text-[13.5px] text-cream/50">{site.tagline}</p>
          </div>
        </div>

        <nav
          aria-label="Footer"
          className="flex flex-wrap gap-[22px] text-[14px]"
        >
          {footerNav.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-cream/72 no-underline transition-colors hover:text-cream"
            >
              {link.label}
            </Link>
          ))}
          <a
            href={`mailto:${site.email}`}
            className="text-cream/72 no-underline transition-colors hover:text-cream"
          >
            {site.email}
          </a>
        </nav>
      </div>
      <p className="mt-[34px] text-center text-[12.5px] text-cream/50">
        &copy; {year} {site.name}. All Rights Reserved.
      </p>
    </footer>
  );
}
