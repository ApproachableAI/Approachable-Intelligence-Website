/**
 * The inner pages that predate the v2 redesign (services, about, resources,
 * contact, calculator) were written for a cream ground with dark ink text.
 * This layout keeps them on that light "paper" under the new dark chrome
 * until they get their own redesign pass.
 */
export default function LegacyLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <div className="legacy-light">{children}</div>;
}
