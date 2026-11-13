import Link from "next/link";
import { site } from "@/content/site";

// Cache Components forbids reading the clock during prerender; cache the year with the page.
async function Year() {
  "use cache";
  return <>{new Date().getFullYear()}</>;
}

export function Footer() {
  return (
    <footer className="bg-stage-deep text-sm text-cream/60">
      <div className="shell flex flex-col gap-8 py-12 md:flex-row md:items-end md:justify-between">
        <div>
          <Link href="/" className="display text-4xl text-cream" aria-label="Shiroorkar, home">
            Shiroorkar
          </Link>
          <p className="mt-3 max-w-xs leading-relaxed">
            The work and public voice of {site.person}. Speaking, workshops and environmental
            collaborations.
          </p>
        </div>
        <ul className="flex gap-6">
          {site.socials.map((s) => (
            <li key={s.url}>
              <a href={s.url} target="_blank" rel="noopener noreferrer" className="hover:text-cream">
                {s.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <p className="shell border-t border-cream/10 py-5 text-xs text-cream/40">
        &copy; <Year /> Shiroorkar
      </p>
    </footer>
  );
}
