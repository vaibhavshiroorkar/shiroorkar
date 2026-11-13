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
          <p className="mt-3 text-xs text-cream/40">
            &copy; <Year /> Shiroorkar
          </p>
        </div>
        <div className="md:text-right">
          <p className="max-w-xs leading-relaxed md:ml-auto">
            The work and public voice of {site.person}. Speaking, workshops and environmental
            collaborations.
          </p>
          <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2 md:justify-end">
            {site.socials.map((s) => (
              <li key={s.url}>
                <a href={s.url} target="_blank" rel="noopener noreferrer" className="hover:text-cream">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
