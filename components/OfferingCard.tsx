import type { Offering } from "@/content/offerings";
import { ArrowLink } from "./ui";

export function OfferingCard({ offering, index }: { offering: Offering; index: number }) {
  return (
    <article className="reveal grid gap-8 border-t border-line py-10 lg:grid-cols-12 lg:py-14">
      <div className="lg:col-span-5">
        <p className="font-display text-sm text-ochre">{String(index + 1).padStart(2, "0")}</p>
        <p className="mt-4 text-xs font-semibold uppercase tracking-[0.18em] text-forest">{offering.format}</p>
        <h3 className="mt-3 text-3xl leading-tight sm:text-4xl">{offering.name}</h3>
      </div>
      <div className="flex flex-col gap-8 lg:col-span-6 lg:col-start-7">
        <p className="text-lg leading-relaxed">{offering.summary}</p>
        <div className="grid gap-8 sm:grid-cols-2">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">Who it is for</p>
            <ul className="mt-3 space-y-2 text-sm leading-relaxed">
              {offering.audience.map((a) => (
                <li key={a}>{a}</li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">What people leave with</p>
            <ul className="mt-3 space-y-2 text-sm leading-relaxed">
              {offering.takeaways.map((t) => (
                <li key={t} className="flex gap-2">
                  <span aria-hidden className="mt-2 h-px w-3 shrink-0 bg-ochre" />
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <ArrowLink href={`/work-with-us?type=${offering.inquiryType}&topic=${offering.id}#inquiry`} className="text-forest">
          Ask about {offering.name}
        </ArrowLink>
      </div>
    </article>
  );
}
