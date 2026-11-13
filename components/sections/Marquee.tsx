/** A slow line of press and film mentions. Text only: no third-party logos. */
export function Marquee({ items }: { items: string[] }) {
  const row = (hidden: boolean) => (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 items-center">
      {items.map((item) => (
        <li key={item} className="flex items-center">
          <span className="display whitespace-nowrap px-8 text-[clamp(2.5rem,6vw,5rem)] text-cream">{item}</span>
          <svg viewBox="0 0 20 20" className="size-5 shrink-0 text-ochre" aria-hidden>
            <path d="M10 0l2.6 7.4L20 10l-7.4 2.6L10 20l-2.6-7.4L0 10l7.4-2.6z" fill="currentColor" />
          </svg>
        </li>
      ))}
    </ul>
  );
  return (
    <section aria-label="Press and recognition" className="marquee grain overflow-hidden bg-stage py-10">
      <div className="marquee-track relative z-10 flex w-max">
        {row(false)}
        {row(true)}
      </div>
    </section>
  );
}
