import { impact } from "@/content/impact";
import { publishable } from "@/lib/publish";
import { SourceNote, VerifyBadge } from "./Verify";

/** Big-numeral impact row. Only renders figures that are sourced or confirmed in production. */
export function ImpactStats({ dark = false }: { dark?: boolean }) {
  const items = publishable(impact);
  if (items.length === 0) {
    return <p className={dark ? "text-paper/70" : "text-muted"}>Documented figures will appear here soon.</p>;
  }
  return (
    <dl className={`grid border-t sm:grid-cols-3 ${dark ? "border-paper/20" : "border-line"}`}>
      {items.map((item, i) => (
        <div
          key={item.label}
          className={`reveal flex flex-col gap-3 py-8 sm:px-6 sm:py-10 ${
            i > 0 ? `border-t sm:border-l sm:border-t-0 ${dark ? "border-paper/20" : "border-line"}` : ""
          } sm:first:pl-0`}
        >
          <dt className="order-2 text-base leading-snug">
            {item.label}
            <VerifyBadge status={item.status} note={item.note} />
          </dt>
          <dd className="order-1 font-display text-7xl leading-none text-ochre lg:text-8xl">{item.value}</dd>
          {item.context && (
            <dd className={`order-3 text-sm ${dark ? "text-paper/65" : "text-muted"}`}>{item.context}</dd>
          )}
          <dd className="order-4">
            <SourceNote source={item.source} dark={dark} />
          </dd>
        </div>
      ))}
    </dl>
  );
}
