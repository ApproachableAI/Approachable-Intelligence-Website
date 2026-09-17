import type { Metadata } from "next";
import { Newsreader, Figtree } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/site";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { JsonLd } from "@/components/json-ld";
import { organizationSchema, localBusinessSchema } from "@/lib/schema";

// Heading face: a warm editorial serif. Weight 400, italic for emphasis words.
// The optical-size axis keeps big display sizes crisp and small kickers sturdy.
const newsreader = Newsreader({
  subsets: ["latin"],
  weight: "variable",
  style: ["normal", "italic"],
  axes: ["opsz"],
  display: "swap",
  variable: "--font-newsreader",
});

// Body + UI face. Friendly geometric sans, easy to read at small sizes.
const figtree = Figtree({
  subsets: ["latin"],
  weight: "variable",
  display: "swap",
  variable: "--font-figtree",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | ${site.tagline}`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: "Ty" }, { name: "Jordyn" }],
  creator: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: "en_US",
    url: site.url,
    title: `${site.name} | ${site.tagline}`,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} | ${site.tagline}`,
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1,
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${newsreader.variable} ${figtree.variable} h-full`}
    >
      <body className="flex min-h-full flex-col bg-ink text-cream antialiased">
        {/* Scroll reveals rely on JS; keep everything visible without it */}
        <noscript>
          <style>{`.reveal,.reveal-peek{opacity:1;transform:none}`}</style>
        </noscript>
        {/* Keyboard users can jump straight to content */}
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[70] focus:rounded-full focus:bg-gold-bright focus:px-5 focus:py-2 focus:text-ink"
        >
          Skip to content
        </a>
        <JsonLd data={organizationSchema()} />
        <JsonLd data={localBusinessSchema()} />
        <SiteHeader />
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
