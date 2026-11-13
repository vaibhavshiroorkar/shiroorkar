import Link from "next/link";
import { site } from "@/content/site";

// Cache Components forbids reading the clock during prerender; cache the year with the page.
async function Year() {
  "use cache";
  return <>{new Date().getFullYear()}</>;
}

export function Footer() {
  return (
    <footer className="bg-stage-deep text-cream/70">
      <div className="shell grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <p className="display text-5xl text-cream">Shiroorkar</p>
          <p className="mt-4 max-w-xs text-sm leading-relaxed">
            The work and public voice of {site.person}. Speaking, workshops and environmental
            collaborations.
          </p>
        </div>
        <nav aria-label="Footer" className="text-sm">
          <ul className="space-y-2.5">
            {site.nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-cream">
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/work-with-us" className="hover:text-cream">
                Invite
              </Link>
            </li>
          </ul>
        </nav>
        <ul className="space-y-2.5 text-sm">
          {site.socials.map((s) => (
            <li key={s.url}>
              <a href={s.url} target="_blank" rel="noopener noreferrer" className="hover:text-cream">
                {s.label}
              </a>
            </li>
          ))}
          <li>
            <a href={`mailto:${site.email}`} className="break-all hover:text-cream">
              {site.email}
            </a>
          </li>
        </ul>
      </div>
      <div className="shell flex flex-col gap-2 border-t border-cream/10 py-6 text-xs text-cream/50 md:flex-row md:justify-between">
        <p>
          &copy; <Year /> Shiroorkar
        </p>
        <p className="max-w-xl md:text-right">
          Engagements arranged here are kept separate from any non-profit or voluntary work. No
          legal services are offered through this website.
        </p>
      </div>
    </footer>
  );
}
