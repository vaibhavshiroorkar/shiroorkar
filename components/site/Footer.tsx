import Link from "next/link";
import { site } from "@/content/site";

// Cache Components forbids reading the clock during prerender; cache the year with the page.
async function Year() {
  "use cache";
  return <>{new Date().getFullYear()}</>;
}

/*
 * Two rows on desktop: logo and description share the first, copyright and socials
 * the second, so each right-hand item lines up with its left-hand partner.
 */
export function Footer() {
  return (
    <footer className="bg-stage-deep text-sm text-cream/60">
      <div className="shell grid gap-x-10 gap-y-4 py-12 md:grid-cols-[auto_1fr] md:items-center">
        <Link href="/" className="display text-4xl text-cream" aria-label="Shiroorkar, home">
          Shiroorkar
        </Link>
        <p className="font-semibold leading-snug text-cream/85 md:text-right">
          <span className="md:whitespace-nowrap">The work and public voice of {site.person}.</span>{" "}
          <br className="hidden md:block" />
          <span className="md:whitespace-nowrap">Speaking, workshops and environmental collaborations.</span>
        </p>
        <p className="order-last text-xs text-cream/40 md:order-none">
          &copy; <Year /> Shiroorkar
        </p>
        <ul className="flex flex-wrap gap-x-6 gap-y-2 md:justify-end">
          {site.socials.map((s) => (
            <li key={s.url}>
              <a href={s.url} target="_blank" rel="noopener noreferrer" className="hover:text-cream">
                {s.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
