import Link from "next/link";
import Image from "next/image";
import { site } from "@/lib/site";

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-ink/15 px-5 pb-10 pt-11 sm:px-7">
      <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-8">
        <div className="flex items-center gap-4">
          <Image
            src="/brand/logo-circle.png"
            alt="Approachable Intelligence circular logo"
            width={72}
            height={72}
            className="h-[72px] w-[72px] rounded-full"
          />
          <div>
            <p className="font-display text-[17px]">{site.name}, LLC</p>
            <p className="mt-1 text-[13.5px] text-ink/60">{site.tagline}</p>
          </div>
        </div>

        <nav
          aria-label="Footer"
          className="flex flex-wrap gap-[22px] text-[14px]"
        >
          <Link
            href="/"
            className="text-rust no-underline transition-colors hover:text-rust-600"
          >
            Home
          </Link>
          <Link
            href="/#how-we-work"
            className="text-rust no-underline transition-colors hover:text-rust-600"
          >
            How We Work
          </Link>
          <Link
            href="/skills-library"
            className="text-rust no-underline transition-colors hover:text-rust-600"
          >
            Skills Library
          </Link>
          <a
            href={`mailto:${site.email}`}
            className="text-rust no-underline transition-colors hover:text-rust-600"
          >
            {site.email}
          </a>
        </nav>
      </div>
      <p className="mt-[34px] text-center text-[12.5px] text-ink/60">
        &copy; {year} {site.name}. All Rights Reserved.
      </p>
    </footer>
  );
}
