import type { Metadata } from "next";
import { Libre_Caslon_Display, Newsreader, Archivo } from "next/font/google";
import "./jordyn.css";
import { JsonLd } from "@/components/json-ld";
import { personSchema, jordynFaqSchema, profile } from "@/lib/jordyn";

// Display + headlines.
const caslon = Libre_Caslon_Display({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-caslon",
});

// Body text and the italic pull quote.
const newsreader = Newsreader({
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["400", "500", "600"],
  display: "swap",
  variable: "--font-newsreader",
});

// Kickers, labels, and nav.
const archivo = Archivo({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-archivo",
});

export const metadata: Metadata = {
  title: {
    absolute: "Jordyn Moody — Therapist, AI Integration & Marketing | Denver, CO",
  },
  description:
    "Jordyn Moody is a mental health therapist and AI integration specialist in Denver. Founder of Haven Therapy and co-founder of Approachable Intelligence, she helps small businesses adopt AI without losing the human touch.",
  authors: [{ name: profile.name }],
  alternates: { canonical: "/jordyn" },
  openGraph: {
    type: "profile",
    title: "Jordyn Moody — The Human in the Loop",
    description:
      "Therapist, AI integration specialist, and marketer. A decade spent learning how people work, now helping businesses adopt AI without losing what makes them human.",
    url: "/jordyn",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jordyn Moody — The Human in the Loop",
    description:
      "Therapist, AI integration specialist, and marketer, helping businesses adopt AI without losing what makes them human.",
  },
};

export default function JordynLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className={`jm ${caslon.variable} ${newsreader.variable} ${archivo.variable}`}>
      <JsonLd data={personSchema()} />
      <JsonLd data={jordynFaqSchema()} />
      {children}
    </div>
  );
}
