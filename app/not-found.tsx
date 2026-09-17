import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
  return (
    <section className="px-7 py-[clamp(80px,10vw,140px)]">
      <div className="mx-auto flex max-w-[720px] flex-col items-center text-center">
        <div className="disc h-[180px] w-[180px] shadow-[0_0_0_1px_rgba(158,196,154,.45),0_0_110px_rgba(158,196,154,.25)]">
          <Image
            src="/mascot/brain-leaning.png"
            alt="Friendly cartoon brain leaning casually with legs crossed"
            width={129}
            height={140}
            className="block h-[140px] w-auto"
          />
        </div>
        <p className="mt-7 font-display text-[64px] leading-none text-gold-bright">
          404
        </p>
        <h1 className="mt-2 text-[clamp(30px,4vw,44px)] leading-[1.05]">
          This page wandered off.
        </h1>
        <p className="mt-4 max-w-md text-lg leading-[1.6] text-cream/72">
          Even a walking brain takes a wrong turn now and then. Let&apos;s get
          you back to somewhere useful.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3.5">
          <Link href="/" className="btn-gold px-7 py-3.5 text-[15.5px]">
            Back home
          </Link>
          <Link href="/#how-we-work" className="btn-outline px-7 py-3.5 text-[15.5px]">
            See how it works
          </Link>
        </div>
      </div>
    </section>
  );
}
