import { site } from "@/content/site";

/* One row: the two-line description on the left, social links on the right. */
export function Footer() {
  return (
    <footer className="relative bg-stage-deep text-sm text-cream/60">
      {/* Soft top edge: fades whatever sits above into the footer without changing its size. */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-full h-16 bg-gradient-to-b from-transparent to-stage-deep" />
      <div className="shell flex flex-col gap-6 py-10 md:flex-row md:items-center md:justify-between">
        <p className="font-semibold leading-snug text-cream/85">
          <span className="md:whitespace-nowrap">The work and public voice of {site.person}.</span>{" "}
          <br className="hidden md:block" />
          <span className="md:whitespace-nowrap">Speaking, workshops and environmental collaborations.</span>
        </p>
        <ul className="flex flex-wrap gap-x-6 gap-y-2">
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
