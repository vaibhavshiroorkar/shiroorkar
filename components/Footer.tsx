import Link from "next/link";
import { site } from "@/content/site";
import { Wordmark } from "./ui";

// Cache Components forbids reading the clock during prerender; cache the year with the page instead.
async function CopyrightYear() {
  "use cache";
  return <>{new Date().getFullYear()}</>;
}

export function Footer() {
  return (
    <footer className="on-dark bg-ink text-paper">
      <div className="container-page grid gap-12 py-16 lg:grid-cols-12 lg:py-20">
        <div className="lg:col-span-5">
          <Wordmark className="text-paper" />
          <p className="mt-6 max-w-sm font-display text-2xl leading-snug text-paper/90">
            Experience. Responsibility. Impact.
          </p>
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-paper/60">
            The work and public voice of {site.person}, retired Assistant Municipal Commissioner of
            the BMC, advocate and environmental worker.
          </p>
        </div>

        <nav aria-label="Footer" className="grid grid-cols-2 gap-8 text-sm sm:grid-cols-3 lg:col-span-7">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sage">Explore</p>
            <ul className="mt-4 space-y-3">
              {site.nav.slice(0, 3).map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-paper/75 hover:text-paper">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sage">Engage</p>
            <ul className="mt-4 space-y-3">
              <li><Link href="/speaking" className="text-paper/75 hover:text-paper">Speaking & workshops</Link></li>
              <li><Link href="/work-with-us" className="text-paper/75 hover:text-paper">Work with us</Link></li>
              <li><Link href="/contact" className="text-paper/75 hover:text-paper">Contact</Link></li>
            </ul>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sage">Follow</p>
            <ul className="mt-4 space-y-3">
              {site.socials.map((s) => (
                <li key={s.url}>
                  <a href={s.url} target="_blank" rel="noopener noreferrer" className="text-paper/75 hover:text-paper">
                    {s.label}
                  </a>
                </li>
              ))}
              <li>
                <a href={`mailto:${site.email}`} className="break-all text-paper/75 hover:text-paper">
                  {site.email}
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </div>

      <div className="border-t border-paper/10">
        <div className="container-page flex flex-col gap-3 py-6 text-xs leading-relaxed text-paper/50 lg:flex-row lg:justify-between">
          <p>&copy; <CopyrightYear /> {site.brand}. All rights reserved.</p>
          <p className="max-w-2xl lg:text-right">
            Engagements arranged through this site are kept separate from any non-profit or voluntary
            work. No legal services are offered through this website.
          </p>
        </div>
      </div>
    </footer>
  );
}
