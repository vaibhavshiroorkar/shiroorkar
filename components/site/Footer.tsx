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
      <div className="shell flex flex-col gap-6 py-10 md:flex-row md:items-center md:justify-between">
        <Link href="/" className="display text-2xl text-cream" aria-label="Shiroorkar, home">
          Shiroorkar
        </Link>
        <nav aria-label="Footer">
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {site.nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-cream">
                  {item.label}
                </Link>
              </li>
            ))}
            {site.socials.map((s) => (
              <li key={s.url}>
                <a href={s.url} target="_blank" rel="noopener noreferrer" className="hover:text-cream">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <p className="shell border-t border-cream/10 py-5 text-xs text-cream/45">
        &copy; <Year /> Shiroorkar. No legal services are offered here; engagements are kept separate from
        any non-profit work.
      </p>
    </footer>
  );
}
