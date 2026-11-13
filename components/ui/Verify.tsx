import type { Source, Status } from "@/content/types";
import { draftMode } from "@/lib/publish";
import { ArrowUpRight } from "./icons";

/** Draft-only marker so editors see what still needs confirming. Never rendered in production. */
export function VerifyBadge({ status, note }: { status: Status; note?: string }) {
  if (!draftMode || status !== "pending") return null;
  return (
    <span
      title={note}
      className="ml-2 inline-block rounded-full bg-ochre px-2 py-0.5 align-middle font-sans text-[10px] font-bold tracking-wide text-stage normal-case"
    >
      to verify
    </span>
  );
}

/** Public citation. Small, quiet and always present where a fact is sourced. */
export function SourceLink({ source, className = "" }: { source?: Source; className?: string }) {
  if (!source) return null;
  return (
    <a
      href={source.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-1 text-xs opacity-70 underline-offset-4 hover:underline hover:opacity-100 ${className}`}
    >
      {source.label}
      <ArrowUpRight className="size-3" />
      <span className="sr-only">(opens in a new tab)</span>
    </a>
  );
}
